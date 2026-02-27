// =====================================================
// UniCalc — Admission Predictor Engine
// Requires: universityConfigs.js, meritData.js
// =====================================================

const CHANCE_ORDER = ['safe', 'very-likely', 'achievable', 'challenging', 'stretch', 'not-achievable'];
const CHANCE_LABELS = {
    'safe': 'Safe',
    'very-likely': 'Very Likely',
    'achievable': 'Achievable',
    'challenging': 'Challenging',
    'stretch': 'Stretch',
    'not-achievable': 'Not Achievable',
    'rank': 'Rank-Based'
};
const STORAGE_KEY = 'unicalc_predictor';
const MEDICAL_IDS = ['uhs', 'nums'];
const SHORT_LABELS = {
    'safe': 'Safe', 'very-likely': 'Likely', 'achievable': 'Achiev.',
    'challenging': 'Tough', 'stretch': 'Stretch', 'not-achievable': 'Hard', 'rank': 'Rank'
};

let currentResults = null;
let currentFilter = 'all';
let currentCategory = 'engineering';
let currentInputs = null;
let selectedUniversities = new Set();

document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initMobileMenu();
    initUniPicker();
    checkSavedData();
    document.getElementById('shareWhatsApp')?.addEventListener('click', shareWhatsApp);
    document.getElementById('downloadPDF')?.addEventListener('click', downloadPDF);
    document.getElementById('saveImage')?.addEventListener('click', saveImage);
});

function initForm() {
    const form = document.getElementById('predictorForm');
    if (!form) return;
    form.addEventListener('submit', (e) => { e.preventDefault(); runPrediction(); });
    document.querySelectorAll('input[name="eduSystem"]').forEach(radio => {
        radio.addEventListener('change', handleEduSystemChange);
    });
}

function initUniPicker() {
    const grid = document.getElementById('uniGrid');
    if (!grid) return;

    const entries = Object.entries(calculatorConfigs);
    const engEntries = entries.filter(([id]) => !MEDICAL_IDS.includes(id));
    const medEntries = entries.filter(([id]) => MEDICAL_IDS.includes(id));

    let html = '';
    html += '<div class="uni-grid-section"><span class="uni-grid-heading">Engineering & CS</span>';
    html += '<div class="uni-grid-buttons">';
    html += engEntries.map(([id, cfg]) => {
        const active = selectedUniversities.has(id) ? ' active' : '';
        return `<button type="button" class="uni-grid-btn${active}" data-uid="${id}">${cfg.shortName}</button>`;
    }).join('');
    html += '</div></div>';

    if (medEntries.length > 0) {
        html += '<div class="uni-grid-section"><span class="uni-grid-heading">Medical</span>';
        html += '<div class="uni-grid-buttons">';
        html += medEntries.map(([id, cfg]) => {
            const active = selectedUniversities.has(id) ? ' active' : '';
            return `<button type="button" class="uni-grid-btn${active}" data-uid="${id}">${cfg.shortName}</button>`;
        }).join('');
        html += '</div></div>';
    }

    grid.innerHTML = html;

    grid.querySelectorAll('.uni-grid-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const uid = btn.dataset.uid;
            if (selectedUniversities.has(uid)) {
                selectedUniversities.delete(uid);
                btn.classList.remove('active');
            } else {
                selectedUniversities.add(uid);
                btn.classList.add('active');
            }
            if (currentResults) {
                renderSummary();
                renderCategoryTabs();
                renderFilters();
                renderCards();
            }
        });
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navCenter = document.querySelector('.nav-center');
    if (!toggle || !navCenter) return;
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navCenter.classList.toggle('mobile-open');
        document.body.classList.toggle('menu-open');
    });
}

function handleEduSystemChange(e) {
    const isALevel = e.target.value === 'alevel';
    const matricTotal = document.getElementById('matricTotal');
    const interTotal = document.getElementById('interTotal');
    const matricHint = document.getElementById('hintMatric');
    const interHint = document.getElementById('hintInter');
    if (isALevel) {
        matricTotal.value = 600; interTotal.value = 600;
        if (matricHint) matricHint.textContent = 'HEC equivalence of your O-Level marks';
        if (interHint) interHint.textContent = 'HEC equivalence of your A-Level marks';
    } else {
        matricTotal.value = 1100; interTotal.value = 1100;
        if (matricHint) matricHint.textContent = 'SSC / O-Level marks (or HEC equivalence)';
        if (interHint) interHint.textContent = 'HSSC / A-Level marks (or HEC equivalence)';
    }
}

// =====================================================
// Core Prediction Engine
// =====================================================

function runPrediction() {
    const matricObtained = parseFloat(document.getElementById('matricObtained')?.value) || 0;
    const matricTotal = parseFloat(document.getElementById('matricTotal')?.value) || 1100;
    const interObtained = parseFloat(document.getElementById('interObtained')?.value) || 0;
    const interTotal = parseFloat(document.getElementById('interTotal')?.value) || 1100;

    if (matricObtained <= 0 || interObtained <= 0) return;
    if (matricObtained > matricTotal || interObtained > interTotal) return;

    const eduSystem = document.querySelector('input[name="eduSystem"]:checked')?.value || 'fsc';
    currentInputs = { matricObtained, matricTotal, interObtained, interTotal, eduSystem };
    currentResults = calculatePredictions(matricObtained, matricTotal, interObtained, interTotal);
    currentFilter = 'all';

    const hasEngineering = currentResults.some(r => !MEDICAL_IDS.includes(r.id));
    const hasMedical = currentResults.some(r => MEDICAL_IDS.includes(r.id));
    currentCategory = hasEngineering ? 'engineering' : (hasMedical ? 'medical' : 'engineering');

    saveToStorage();
    renderAll();

    const resultsEl = document.getElementById('predictorResults');
    if (resultsEl) {
        resultsEl.classList.add('visible');
        setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
}

function calculatePredictions(matricObtained, matricTotal, interObtained, interTotal) {
    const matricPerc = (matricObtained / Math.max(matricTotal, 1)) * 100;
    const interPerc = (interObtained / Math.max(interTotal, 1)) * 100;
    const results = [];

    for (const [uniId, config] of Object.entries(calculatorConfigs)) {
        const uniMerit = getMeritDataById(uniId);
        if (!uniMerit || !uniMerit.campuses) continue;

        if (uniMerit.meritType === 'rank') {
            results.push({
                id: uniId, config, type: 'rank', overallChance: 'rank',
                programs: [], achievableCount: 0,
                totalCount: uniMerit.campuses.reduce((s, c) => s + c.programs.length, 0)
            });
            continue;
        }

        const partialAggregate = (matricPerc * config.weights.matric) + (interPerc * config.weights.inter);
        const programs = [];

        uniMerit.campuses.forEach(campus => {
            campus.programs.forEach(program => {
                const predicted = getPredictedMerit(program);
                if (predicted === null) return;

                if (config.weights.test === 0) {
                    programs.push({
                        campus: campus.campus, program: program.name,
                        category: program.category || null, shift: program.shift || null,
                        testType: program.testType || null,
                        predictedMerit: predicted, noTest: true,
                        currentAggregate: partialAggregate,
                        requiredTestPerc: 0, requiredTestMarks: 0, testMax: 0,
                        chance: partialAggregate >= predicted ? 'safe' : 'not-achievable'
                    });
                } else {
                    const requiredTestPerc = (predicted - partialAggregate) / config.weights.test;
                    const requiredTestMarks = (requiredTestPerc / 100) * config.testMax;
                    programs.push({
                        campus: campus.campus, program: program.name,
                        category: program.category || null, shift: program.shift || null,
                        testType: program.testType || null,
                        predictedMerit: predicted, noTest: false,
                        currentAggregate: partialAggregate,
                        requiredTestPerc, requiredTestMarks: Math.max(0, requiredTestMarks),
                        testMax: config.testMax,
                        chance: categorizeChance(requiredTestPerc)
                    });
                }
            });
        });

        results.push({
            id: uniId, config, type: 'percentage', partialAggregate, programs,
            overallChance: getOverallChance(programs),
            achievableCount: programs.filter(p => p.chance !== 'not-achievable').length,
            totalCount: programs.length
        });
    }

    results.sort((a, b) => {
        if (a.type === 'rank' && b.type !== 'rank') return 1;
        if (b.type === 'rank' && a.type !== 'rank') return -1;
        const pi = (ch) => CHANCE_ORDER.indexOf(ch);
        const diff = pi(a.overallChance) - pi(b.overallChance);
        return diff !== 0 ? diff : (b.achievableCount - a.achievableCount);
    });

    return results;
}

function getPredictedMerit(program) {
    const numericHistory = (program.history || []).filter(h => typeof h === 'number');
    if (numericHistory.length === 0) return null;
    if (numericHistory.length >= 2) {
        const reg = linearRegression(numericHistory);
        return Math.max(0, Math.min(100, reg.predicted));
    }
    return numericHistory[0];
}

function categorizeChance(requiredTestPerc) {
    if (requiredTestPerc <= 0) return 'safe';
    if (requiredTestPerc <= 50) return 'very-likely';
    if (requiredTestPerc <= 70) return 'achievable';
    if (requiredTestPerc <= 85) return 'challenging';
    if (requiredTestPerc <= 100) return 'stretch';
    return 'not-achievable';
}

function getOverallChance(programs) {
    if (programs.length === 0) return 'not-achievable';
    let best = 'not-achievable';
    for (const p of programs) {
        if (CHANCE_ORDER.indexOf(p.chance) < CHANCE_ORDER.indexOf(best)) best = p.chance;
    }
    return best;
}

function getFilteredResults() {
    if (!currentResults) return [];
    let filtered = currentResults.filter(r =>
        currentCategory === 'medical' ? MEDICAL_IDS.includes(r.id) : !MEDICAL_IDS.includes(r.id)
    );
    if (currentFilter !== 'all') {
        filtered = filtered.filter(r =>
            (r.type === 'rank' && currentFilter === 'rank') ||
            (r.type !== 'rank' && r.overallChance === currentFilter)
        );
    }
    if (selectedUniversities.size > 0) {
        filtered = filtered.filter(r => selectedUniversities.has(r.id));
    }
    return filtered;
}

// =====================================================
// UI Rendering
// =====================================================

function renderAll() {
    renderSummary();
    renderCategoryTabs();
    renderFilters();
    renderCards();
    renderResultCard();
    const cardSection = document.getElementById('resultCardSection');
    if (cardSection) cardSection.classList.add('visible');
}

function renderSummary() {
    const el = document.getElementById('resultsSummary');
    if (!el || !currentInputs) return;

    let catResults = currentResults.filter(r =>
        currentCategory === 'medical' ? MEDICAL_IDS.includes(r.id) : !MEDICAL_IDS.includes(r.id)
    );
    if (selectedUniversities.size > 0) {
        catResults = catResults.filter(r => selectedUniversities.has(r.id));
    }
    const totalUnis = catResults.filter(r => r.type === 'percentage').length;
    const reachableUnis = catResults.filter(r => r.type === 'percentage' && r.overallChance !== 'not-achievable').length;
    const totalPrograms = catResults.reduce((s, r) => s + (r.type === 'percentage' ? r.achievableCount : 0), 0);

    const matricPerc = ((currentInputs.matricObtained / currentInputs.matricTotal) * 100).toFixed(1);
    const interPerc = ((currentInputs.interObtained / currentInputs.interTotal) * 100).toFixed(1);

    el.innerHTML =
        `<div class="summary-stat"><span class="stat-value">${matricPerc}%</span><span class="stat-label">Matric</span></div>` +
        `<div class="summary-stat"><span class="stat-value">${interPerc}%</span><span class="stat-label">Intermediate</span></div>` +
        `<div class="summary-stat"><span class="stat-value">${reachableUnis}/${totalUnis}</span><span class="stat-label">Unis in Reach</span></div>` +
        `<div class="summary-stat"><span class="stat-value">${totalPrograms}</span><span class="stat-label">Programs</span></div>`;
}

function renderCategoryTabs() {
    const el = document.getElementById('categoryTabs');
    if (!el) return;
    let base = currentResults;
    if (selectedUniversities.size > 0) base = base.filter(r => selectedUniversities.has(r.id));
    const engCount = base.filter(r => !MEDICAL_IDS.includes(r.id)).length;
    const medCount = base.filter(r => MEDICAL_IDS.includes(r.id)).length;

    let html = '';
    if (engCount > 0)
        html += `<button class="category-tab ${currentCategory === 'engineering' ? 'active' : ''}" data-cat="engineering">Engineering & CS<span class="tab-count">${engCount}</span></button>`;
    if (medCount > 0)
        html += `<button class="category-tab ${currentCategory === 'medical' ? 'active' : ''}" data-cat="medical">Medical<span class="tab-count">${medCount}</span></button>`;

    el.innerHTML = html;
    el.querySelectorAll('.category-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.cat;
            currentFilter = 'all';
            renderSummary();
            renderCategoryTabs();
            renderFilters();
            renderCards();
        });
    });
}

function renderFilters() {
    const el = document.getElementById('filterBar');
    if (!el) return;

    let catResults = currentResults.filter(r =>
        currentCategory === 'medical' ? MEDICAL_IDS.includes(r.id) : !MEDICAL_IDS.includes(r.id)
    );
    if (selectedUniversities.size > 0) {
        catResults = catResults.filter(r => selectedUniversities.has(r.id));
    }
    const counts = { all: 0, rank: 0 };
    CHANCE_ORDER.forEach(ch => { counts[ch] = 0; });
    catResults.forEach(r => {
        counts.all++;
        if (r.type === 'rank') counts.rank++;
        else counts[r.overallChance] = (counts[r.overallChance] || 0) + 1;
    });

    const filters = [
        { key: 'all', label: 'All' }, { key: 'safe', label: 'Safe' },
        { key: 'very-likely', label: 'Likely' }, { key: 'achievable', label: 'Achievable' },
        { key: 'challenging', label: 'Challenging' }, { key: 'stretch', label: 'Stretch' },
        { key: 'not-achievable', label: 'Hard' }, { key: 'rank', label: 'Rank' },
    ];

    el.innerHTML = filters.filter(f => counts[f.key] > 0).map(f =>
        `<button class="filter-pill ${f.key === currentFilter ? 'active' : ''}" data-filter="${f.key}">${f.label}<span class="filter-count">${counts[f.key]}</span></button>`
    ).join('');

    el.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            el.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards();
        });
    });
}

function renderCards() {
    const grid = document.getElementById('uniCardsGrid');
    if (!grid) return;
    const filtered = getFilteredResults();

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px 16px;color:var(--text-tertiary);font-size:0.88rem;">No universities match this filter.</div>';
        return;
    }

    grid.innerHTML = filtered.map(r => renderUniversityCard(r)).join('');
    grid.querySelectorAll('.uni-card-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.uni-card');
            const wasExpanded = card.classList.contains('expanded');
            card.classList.toggle('expanded');
            header.setAttribute('aria-expanded', !wasExpanded);
            if (!wasExpanded && card.querySelector('.uni-card-detail').innerHTML.trim() === '') {
                const uniId = card.dataset.uniId;
                const result = currentResults.find(r => r.id === uniId);
                if (result) card.querySelector('.uni-card-detail').innerHTML = renderExpandedDetail(result);
            }
        });
    });
}

function renderUniversityCard(result) {
    const { id, config, type, overallChance, achievableCount, totalCount, programs } = result;
    const isRank = type === 'rank';
    const chanceClass = isRank ? 'rank' : overallChance;
    const chanceLabel = isRank ? 'Rank' : (SHORT_LABELS[overallChance] || CHANCE_LABELS[overallChance]);

    let meta = '';
    if (isRank) {
        meta = 'Rank-based merit';
    } else if (achievableCount === 0) {
        meta = `${totalCount} programs — needs higher marks`;
    } else {
        meta = `${achievableCount}/${totalCount} programs achievable`;
    }

    let tapHint = '';
    if (!isRank) tapHint = ' · <span style="color:var(--accent);">Details</span>';

    return `<div class="uni-card ${isRank ? 'rank-card' : ''}" data-uni-id="${id}" data-chance="${chanceClass}">
        <button class="uni-card-header" type="button" aria-expanded="false">
            <span class="uni-short-name">${config.shortName}</span>
            <div class="uni-card-info">
                <div class="uni-long-name">${config.longName}</div>
                <div class="uni-card-meta">${meta}${tapHint}</div>
            </div>
            <span class="chance-badge chance-${chanceClass}">${chanceLabel}</span>
            <span class="uni-expand-icon">&#9662;</span>
        </button>
        <div class="uni-card-detail"></div>
    </div>`;
}

function renderExpandedDetail(result) {
    if (result.type === 'rank') {
        return `<div class="uni-detail-inner">
            <div class="rank-message">
                <strong>${result.config.longName}</strong> uses a rank-based merit system.
                Your entry test rank determines admission. Use the full calculator to compare your rank.
            </div>
            <div class="detail-actions">
                <a href="../calculator/${result.id}/" class="btn-calc-link">
                    Open ${result.config.shortName} Calculator &rarr;
                </a>
            </div>
        </div>`;
    }

    const programs = result.programs;
    if (programs.length === 0) {
        return '<div class="uni-detail-inner"><p style="color:var(--text-tertiary);padding:12px 0;font-size:0.85rem;">No program data available.</p></div>';
    }

    const campusMap = new Map();
    programs.forEach(p => {
        if (!campusMap.has(p.campus)) campusMap.set(p.campus, []);
        campusMap.get(p.campus).push(p);
    });

    const hasTest = result.config.weights.test > 0;
    let html = '<div class="uni-detail-inner">';

    for (const [campus, progs] of campusMap) {
        html += `<div class="campus-group">`;
        html += `<div class="campus-group-title">${campus}</div>`;

        progs.forEach(p => {
            let marksHtml;
            if (p.noTest) {
                marksHtml = p.chance === 'safe'
                    ? '<span style="color:#22c55e;font-weight:600;font-size:0.82rem;">Qualified</span>'
                    : '<span style="color:#ef4444;font-weight:600;font-size:0.82rem;">Below</span>';
            } else {
                const marks = Math.ceil(Math.min(p.requiredTestMarks, p.testMax));
                marksHtml = p.chance === 'not-achievable'
                    ? `<span class="prog-marks" style="color:#ef4444;">&gt;${p.testMax}</span>`
                    : `<span class="prog-marks">${marks}</span><span class="prog-marks-total">/${p.testMax}</span>`;
            }

            let testBadge = '';
            if (p.testType) testBadge = ` <span class="prog-test-badge">${p.testType}</span>`;

            let metaParts = [];
            if (p.shift) metaParts.push(p.shift);
            if (p.category) metaParts.push(p.category);
            metaParts.push(`Cutoff ${p.predictedMerit.toFixed(1)}%`);
            const metaStr = metaParts.join(' · ');

            html += `<div class="program-row">
                <div class="prog-info">
                    <div class="prog-name-text">${p.program}${testBadge}</div>
                    <div class="prog-meta">${metaStr}</div>
                </div>
                <div style="text-align:right;flex-shrink:0;">${marksHtml}</div>
                <div class="prog-chance"><span class="chance-badge chance-${p.chance}">${CHANCE_LABELS[p.chance]}</span></div>
            </div>`;
        });

        html += '</div>';
    }

    const weightStr = `Matric ${Math.round(result.config.weights.matric * 100)}% + Inter ${Math.round(result.config.weights.inter * 100)}% + Test ${Math.round(result.config.weights.test * 100)}%`;
    html += `<div class="detail-formula">${weightStr} &nbsp;·&nbsp; Your partial: ${result.partialAggregate.toFixed(2)}%</div>`;
    html += `<div class="detail-actions"><a href="../calculator/${result.id}/" class="btn-calc-link">Open ${result.config.shortName} Calculator &rarr;</a></div>`;
    html += '</div>';
    return html;
}

// =====================================================
// Result Card (for sharing)
// =====================================================

function renderResultCard() {
    const card = document.getElementById('resultCard');
    if (!card || !currentInputs || !currentResults) return;

    const matricPerc = ((currentInputs.matricObtained / currentInputs.matricTotal) * 100).toFixed(1);
    const interPerc = ((currentInputs.interObtained / currentInputs.interTotal) * 100).toFixed(1);

    const topResults = currentResults
        .filter(r => r.type === 'percentage' && r.overallChance !== 'not-achievable')
        .slice(0, 8);

    const uniRows = topResults.map(r => {
        const best = r.programs.filter(p => p.chance !== 'not-achievable')
            .sort((a, b) => a.requiredTestPerc - b.requiredTestPerc)[0];
        let info = '';
        if (best && best.noTest) info = 'No test needed';
        else if (best) info = `Need ${Math.ceil(best.requiredTestMarks)}/${best.testMax}`;

        return `<div class="result-uni-row">
            <span class="result-uni-name">${r.config.shortName}</span>
            <span class="chance-badge chance-${r.overallChance}" style="font-size:0.6rem;padding:2px 7px;">${CHANCE_LABELS[r.overallChance]}</span>
            <span class="result-uni-info">${info}</span>
        </div>`;
    }).join('');

    const noResults = topResults.length === 0
        ? '<p style="text-align:center;color:var(--text-tertiary);padding:12px;font-size:0.85rem;">No achievable universities found.</p>'
        : '';

    card.innerHTML = `
        <div class="result-card-header">
            <span class="result-card-logo">UniCalc</span>
            <span class="result-card-title">Prediction</span>
        </div>
        <div class="result-card-marks">
            <div class="result-mark-item">
                <div class="result-mark-label">Matric</div>
                <div class="result-mark-value">${currentInputs.matricObtained}/${currentInputs.matricTotal} (${matricPerc}%)</div>
            </div>
            <div class="result-mark-item">
                <div class="result-mark-label">Intermediate</div>
                <div class="result-mark-value">${currentInputs.interObtained}/${currentInputs.interTotal} (${interPerc}%)</div>
            </div>
        </div>
        <div class="result-card-unis">${uniRows}${noResults}</div>
        <div class="result-card-footer">Calculate yours at <strong>unicalc.vercel.app</strong></div>`;
}

// =====================================================
// Sharing
// =====================================================

function shareWhatsApp() {
    if (!currentResults || !currentInputs) return;
    const matricPerc = ((currentInputs.matricObtained / currentInputs.matricTotal) * 100).toFixed(1);
    const interPerc = ((currentInputs.interObtained / currentInputs.interTotal) * 100).toFixed(1);

    let text = `*My UniCalc Prediction*\n\nMatric: ${currentInputs.matricObtained}/${currentInputs.matricTotal} (${matricPerc}%)\nInter: ${currentInputs.interObtained}/${currentInputs.interTotal} (${interPerc}%)\n\n`;

    currentResults.filter(r => r.type === 'percentage' && r.overallChance !== 'not-achievable').slice(0, 6).forEach(r => {
        const best = r.programs.filter(p => p.chance !== 'not-achievable').sort((a, b) => a.requiredTestPerc - b.requiredTestPerc)[0];
        const marks = best && !best.noTest ? `Need ${Math.ceil(best.requiredTestMarks)}/${best.testMax}` : 'Qualified';
        text += `${r.config.shortName} — ${CHANCE_LABELS[r.overallChance]} (${marks})\n`;
    });

    text += `\nCalculate yours: https://unicalc.vercel.app/predictor/`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}

// Lazy-load export libraries on first use
let _html2canvasLoaded = false;
let _jspdfLoaded = false;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

async function ensureHtml2Canvas() {
    if (typeof html2canvas !== 'undefined') return;
    if (!_html2canvasLoaded) {
        _html2canvasLoaded = true;
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    }
}

async function ensureJsPDF() {
    if (typeof jspdf !== 'undefined') return;
    if (!_jspdfLoaded) {
        _jspdfLoaded = true;
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }
}

async function captureCard() {
    const card = document.getElementById('resultCard');
    if (!card) return null;
    await ensureHtml2Canvas();
    if (typeof html2canvas === 'undefined') return null;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return html2canvas(card, { backgroundColor: isLight ? '#ffffff' : '#0a0a0a', scale: 2, useCORS: true, logging: false });
}

async function downloadPDF() {
    await ensureJsPDF();
    const canvas = await captureCard();
    if (!canvas || typeof jspdf === 'undefined') return;
    const { jsPDF } = jspdf;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const imgData = canvas.toDataURL('image/png');
    const pdfImgWidth = 170;
    const pdfImgHeight = (canvas.height / canvas.width) * pdfImgWidth;
    const pdf = new jsPDF('p', 'mm', 'a4');
    if (isLight) {
        pdf.setFillColor(255, 255, 255);
    } else {
        pdf.setFillColor(10, 10, 10);
    }
    pdf.rect(0, 0, 210, 297, 'F');
    pdf.addImage(imgData, 'PNG', 20, 20, pdfImgWidth, pdfImgHeight);
    pdf.setFontSize(9);
    pdf.setTextColor(100);
    pdf.text('Generated by UniCalc — unicalc.vercel.app', 105, 287, { align: 'center' });
    pdf.save('unicalc-prediction.pdf');
}

async function saveImage() {
    const canvas = await captureCard();
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'unicalc-prediction.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// =====================================================
// LocalStorage
// =====================================================

function saveToStorage() {
    if (!currentInputs) return;
    try {
        const data = { inputs: currentInputs, timestamp: Date.now() };
        if (selectedUniversities.size > 0) data.selectedUnis = Array.from(selectedUniversities);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* quota exceeded */ }
}

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (!data.inputs) return null;
        if (Date.now() - (data.timestamp || 0) > 30 * 24 * 60 * 60 * 1000) return null;
        return data;
    } catch (e) { return null; }
}

function checkSavedData() {
    const saved = loadFromStorage();
    if (!saved) return;
    const banner = document.getElementById('restoreBanner');
    if (!banner) return;
    banner.style.display = 'flex';

    document.getElementById('restoreYes')?.addEventListener('click', () => {
        const inp = saved.inputs;
        const eduRadio = document.querySelector(`input[name="eduSystem"][value="${inp.eduSystem}"]`);
        if (eduRadio) { eduRadio.checked = true; eduRadio.dispatchEvent(new Event('change')); }
        document.getElementById('matricObtained').value = inp.matricObtained;
        document.getElementById('matricTotal').value = inp.matricTotal;
        document.getElementById('interObtained').value = inp.interObtained;
        document.getElementById('interTotal').value = inp.interTotal;
        if (saved.selectedUnis && Array.isArray(saved.selectedUnis)) {
            selectedUniversities = new Set(saved.selectedUnis);
            initUniPicker();
        }
        banner.style.display = 'none';
        runPrediction();
    });

    document.getElementById('restoreNo')?.addEventListener('click', () => { banner.style.display = 'none'; });
}
