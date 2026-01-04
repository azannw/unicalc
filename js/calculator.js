// =====================================================
// UniCalc — Calculator Logic v3 (Dynamic University Support)
// =====================================================

const calculatorConfigs = {
    fast: {
        shortName: 'FAST',
        longName: 'FAST National University',
        description: 'Calculate your FAST aggregate with the verified 10/40/50 matric, inter and NU test split.',
        metaDescription: 'FAST merit calculator covering all campuses and programs with the official 10/40/50 weighting.',
        programs: [
            'Computing Programs (CS, SE, AI, DS, Cyber)',
            'Engineering Programs (EE, Civil, Power)',
            'Business Programs (BBA, AFM)'
        ],
        weights: { matric: 0.10, inter: 0.40, test: 0.50 },
        testMax: 100
    },
    nust: {
        shortName: 'NUST',
        longName: 'National University of Sciences & Technology',
        description: 'Compute your NET / SAT aggregate for NUST engineering, SEECS and business schools.',
        metaDescription: 'NUST NET calculator with the official 10/15/75 weighting.',
        programs: [
            'Engineering Schools (SMME, CEME, SEECS)',
            'Computing & AI Programs',
            'Business & Social Sciences'
        ],
        weights: { matric: 0.10, inter: 0.15, test: 0.75 },
        testMax: 200
    },
    itu: {
        shortName: 'ITU',
        longName: 'Information Technology University',
        description: 'Plan your admission strategy for ITU Lahore with the 15/35/50 split.',
        metaDescription: 'ITU merit calculator for CS, DS and EE programs.',
        programs: [
            'Computer Science & Data Science',
            'Electrical Engineering',
            'Business & Management'
        ],
        weights: { matric: 0.15, inter: 0.35, test: 0.50 },
        testMax: 100
    },
    comsats: {
        shortName: 'COMSATS',
        longName: 'COMSATS University Islamabad',
        description: 'Accurate COMSATS aggregate calculator for all campuses and programs.',
        metaDescription: 'COMSATS merit calculator with the official 10/40/50 weight split.',
        programs: [
            'Computing Programs (CS, SE, Cyber)',
            'Engineering Programs',
            'Business Programs'
        ],
        weights: { matric: 0.10, inter: 0.40, test: 0.50 },
        testMax: 100
    },
    giki: {
        shortName: 'GIKI',
        longName: 'Ghulam Ishaq Khan Institute',
        description: 'GIKI aggregate calculator with the 10/0/85 matric and admission test formula (no inter weightage).',
        metaDescription: 'GIKI merit calculator with admission test weightage.',
        programs: [
            'Engineering & Sciences',
            'Computer Systems & AI',
            'Management Sciences'
        ],
        weights: { matric: 0.10, inter: 0.00, test: 0.85 },
        testMax: 200
    },
    pieas: {
        shortName: 'PIEAS',
        longName: 'Pakistan Institute of Engineering & Applied Sciences',
        description: 'PIEAS merit calculator using the official 15/25/60 distribution.',
        metaDescription: 'PIEAS aggregate calculator for engineering and applied sciences.',
        programs: [
            'Engineering Disciplines',
            'Applied & Nuclear Sciences',
            'Computer & Information Sciences'
        ],
        weights: { matric: 0.15, inter: 0.25, test: 0.60 },
        testMax: 100
    },
    lums: {
        shortName: 'LUMS',
        longName: 'Lahore University of Management Sciences',
        description: 'LUMS aggregate calculator blending academics with test scores.',
        metaDescription: 'LUMS merit calculator for SSE and SDSB applicants.',
        programs: [
            'Syed Babar Ali School of Science & Engineering',
            'SDSB Business & Accounting',
            'Humanities & Social Sciences'
        ],
        weights: { matric: 0.10, inter: 0.30, test: 0.60 },
        testMax: 1600
    },
    uet: {
        shortName: 'UET',
        longName: 'University of Engineering & Technology',
        description: 'UET ECAT aggregate calculator with the official 17/50/33 formula.',
        metaDescription: 'UET merit calculator with ECAT weightings.',
        programs: [
            'Engineering Programs',
            'Architecture & Planning',
            'Computer & Industrial Disciplines'
        ],
        weights: { matric: 0.17, inter: 0.50, test: 0.33 },
        testMax: 400
    },
    ned: {
        shortName: 'NED',
        longName: 'NED University of Engineering & Technology',
        description: 'NED aggregate calculator with the official 0/40/60 formula.',
        metaDescription: 'NED engineering merit calculator.',
        programs: [
            'Engineering Programs',
            'Technology Programs',
            'Architecture & Planning'
        ],
        weights: { matric: 0.00, inter: 0.40, test: 0.60 },
        testMax: 100
    },
    ist: {
        shortName: 'IST',
        longName: 'Institute of Space Technology',
        description: 'IST aggregate calculator with the 40/60/0 formula (no entry test for BS CS).',
        metaDescription: 'IST merit calculator - matric and inter based.',
        programs: [
            'BS Computer Science',
            'Aerospace & Avionics',
            'Space Science & Engineering'
        ],
        weights: { matric: 0.40, inter: 0.60, test: 0.00 },
        testMax: 0
    },
    nutech: {
        shortName: 'NUTECH',
        longName: 'National University of Technology',
        description: 'NUTECH aggregate calculator with the official 10/20/70 formula.',
        metaDescription: 'NUTECH merit calculator for technology-driven programs.',
        programs: [
            'Engineering Technologies',
            'Computing & AI',
            'Business & Management'
        ],
        weights: { matric: 0.10, inter: 0.20, test: 0.70 },
        testMax: 200
    },
    pucit: {
        shortName: 'PUCIT',
        longName: 'Punjab University College of Information Technology',
        description: 'PUCIT aggregate calculator for CS, SE and IT aspirants.',
        metaDescription: 'PUCIT merit calculator for main and new campus.',
        programs: [
            'Computer Science (Hons)',
            'Software Engineering',
            'Information Technology'
        ],
        weights: { matric: 0.20, inter: 0.30, test: 0.50 },
        testMax: 100
    },
    air: {
        shortName: 'AIR',
        longName: 'Air University',
        description: 'Air University aggregate calculator with the official 15/35/50 formula for CS programs.',
        metaDescription: 'Air University merit calculator with AU admission test support.',
        programs: [
            'Engineering & Avionics',
            'Computing & Cyber Security',
            'Management Sciences'
        ],
        weights: { matric: 0.15, inter: 0.35, test: 0.50 },
        testMax: 100
    },
    bahria: {
        shortName: 'Bahria',
        longName: 'Bahria University',
        description: 'Bahria University aggregate calculator with the official 0/50/50 formula.',
        metaDescription: 'Bahria merit calculator for engineering, computing and business.',
        programs: [
            'Engineering & Maritime Studies',
            'Computing & AI',
            'Business & Media Studies'
        ],
        weights: { matric: 0.00, inter: 0.50, test: 0.50 },
        testMax: 100
    },
    qau: {
        shortName: 'QAU',
        longName: 'Quaid-i-Azam University',
        description: 'QAU aggregate calculator with 30/70/0 formula (no entry test required).',
        metaDescription: 'QAU merit calculator for BS programs.',
        programs: [
            'Natural Sciences',
            'Computer & Mathematical Sciences',
            'Management Sciences'
        ],
        weights: { matric: 0.30, inter: 0.70, test: 0.00 },
        testMax: 0
    },
    iba: {
        shortName: 'IBA',
        longName: 'Institute of Business Administration',
        description: 'IBA aggregate calculator for BBA, BS Economics and CS.',
        metaDescription: 'IBA Karachi merit calculator with aptitude test weighting.',
        programs: [
            'Business Administration',
            'Economics & Finance',
            'Computer Science & Math'
        ],
        weights: { matric: 0.20, inter: 0.30, test: 0.50 },
        testMax: 100
    },
    iiu: {
        shortName: 'IIU',
        longName: 'International Islamic University',
        description: 'IIU aggregate calculator with the official 0/40/60 formula.',
        metaDescription: 'IIUI merit calculator for all programs.',
        programs: [
            'Computer Science',
            'Software Engineering',
            'Information Technology'
        ],
        weights: { matric: 0.00, inter: 0.40, test: 0.60 },
        testMax: 100
    },
    pu: {
        shortName: 'PU',
        longName: 'University of the Punjab',
        description: 'PU aggregate calculator with the official 25/50/25 formula.',
        metaDescription: 'Punjab University merit calculator for all programs.',
        programs: [
            'Computing Programs',
            'Engineering Programs',
            'Business Programs'
        ],
        weights: { matric: 0.25, inter: 0.50, test: 0.25 },
        testMax: 100
    }
};

let currentCalculatorConfig = null;
const defaultWeights = { matric: 0.10, inter: 0.40, test: 0.50 };

document.addEventListener('DOMContentLoaded', () => {
    currentCalculatorConfig = resolveCalculatorConfig();
    applyCalculatorContent(currentCalculatorConfig);
    initTabs();
    initCalculator();
    setupInputListeners();
});

function resolveCalculatorConfig() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('uni')?.toLowerCase();
    return calculatorConfigs[slug] || calculatorConfigs.fast;
}

// === Tab System ===
function initTabs() {
    const tabBtns = document.querySelectorAll('.calc-tab');
    const tabContents = document.querySelectorAll('.calc-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            const content = document.getElementById(tabId);
            content?.classList.add('active');
        });
    });
}

function applyCalculatorContent(config) {
    if (!config) return;
    document.title = `${config.shortName} Aggregate Calculator — UniCalc`;
    const metaDesc = document.querySelector('meta[name="description"]');
    metaDesc?.setAttribute('content', config.metaDescription);

    const breadcrumb = document.getElementById('breadcrumbCurrent');
    if (breadcrumb) breadcrumb.textContent = config.longName;

    const heroTitle = document.getElementById('calculatorHeading');
    if (heroTitle) {
        heroTitle.innerHTML = `
            <span class="line-wrapper"><span class="line-reveal">${config.shortName}</span></span>
            <span class="line-wrapper"><span class="line-reveal">Aggregate</span></span>
            <span class="line-wrapper"><span class="line-reveal text-outline">Calculator</span></span>
        `;
    }

    const subtitle = document.getElementById('calculatorSubtitle');
    if (subtitle) subtitle.textContent = config.description;

    const programSelect = document.getElementById('programSelect');
    if (programSelect && Array.isArray(config.programs)) {
        programSelect.innerHTML = config.programs
            .map((label, index) => `<option value="${config.shortName.toLowerCase()}-${index}">${label}</option>`)
            .join('');
    }

    applyWeightLabels(config.weights || defaultWeights);

    const testTotalInput = document.getElementById('testTotal');
    if (testTotalInput) {
        const base = config.testMax || 100;
        testTotalInput.value = base;
        testTotalInput.dataset.baseTotal = base;
    }
}

function applyWeightLabels(weights) {
    const matricPercent = formatWeight(weights.matric ?? defaultWeights.matric);
    const interPercent = formatWeight(weights.inter ?? defaultWeights.inter);
    const testPercent = formatWeight(weights.test ?? defaultWeights.test);

    const weightMatric = document.getElementById('weightMatric');
    const weightInter = document.getElementById('weightInter');
    const weightTest = document.getElementById('weightTest');

    if (weightMatric) weightMatric.textContent = matricPercent;
    if (weightInter) weightInter.textContent = interPercent;
    if (weightTest) weightTest.textContent = testPercent;

    const hintMatric = document.getElementById('hintMatric');
    const hintInter = document.getElementById('hintInter');
    const hintTest = document.getElementById('hintTest');

    if (hintMatric) hintMatric.textContent = `Contributes ${matricPercent} to your aggregate score`;
    if (hintInter) hintInter.textContent = `Contributes ${interPercent} to your aggregate score`;
    if (hintTest) hintTest.textContent = `Contributes ${testPercent} to your aggregate score`;
}

function formatWeight(value) {
    return `${Math.round((value || 0) * 100)}%`;
}

// === Calculator Logic ===
function initCalculator() {
    const form = document.getElementById('calcForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateAggregate();
    });

    const editBtn = document.getElementById('editBtn');
    editBtn?.addEventListener('click', () => {
        const calcTab = document.querySelector('[data-tab="calculator"]');
        calcTab?.click();
    });
}

function setupInputListeners() {
    const testTypeInputs = document.querySelectorAll('input[name="testType"]');
    const testTotalInput = document.getElementById('testTotal');

    testTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (!testTotalInput) return;
            if (input.value === 'sat') {
                testTotalInput.value = 1600;
            } else if (input.value === 'nat') {
                testTotalInput.value = 100;
            } else {
                const base = testTotalInput.dataset.baseTotal || currentCalculatorConfig?.testMax || 100;
                testTotalInput.value = base;
            }
        });
    });
}

function calculateAggregate() {
    const weights = currentCalculatorConfig?.weights || defaultWeights;

    const matricObtained = parseFloat(document.getElementById('matricObtained')?.value) || 0;
    const matricTotal = parseFloat(document.getElementById('matricTotal')?.value) || 1100;

    const interObtained = parseFloat(document.getElementById('interObtained')?.value) || 0;
    const interTotal = parseFloat(document.getElementById('interTotal')?.value) || 1100;

    const testObtained = parseFloat(document.getElementById('testObtained')?.value) || 0;
    const testTotal = parseFloat(document.getElementById('testTotal')?.value) || 100;

    const matricPerc = (matricObtained / Math.max(matricTotal, 1)) * 100;
    const interPerc = (interObtained / Math.max(interTotal, 1)) * 100;
    const testPerc = (testObtained / Math.max(testTotal, 1)) * 100;

    const aggMatric = matricPerc * (weights.matric ?? defaultWeights.matric);
    const aggInter = interPerc * (weights.inter ?? defaultWeights.inter);
    const aggTest = testPerc * (weights.test ?? defaultWeights.test);

    const totalAggregate = aggMatric + aggInter + aggTest;
    displayResults(totalAggregate, aggMatric, aggInter, aggTest);
}

function displayResults(total, matric, inter, test) {
    const bdMatric = document.getElementById('bdMatric');
    const bdInter = document.getElementById('bdInter');
    const bdTest = document.getElementById('bdTest');

    if (bdMatric) bdMatric.textContent = `${matric.toFixed(2)}%`;
    if (bdInter) bdInter.textContent = `${inter.toFixed(2)}%`;
    if (bdTest) bdTest.textContent = `${test.toFixed(2)}%`;

    const safeTotal = total || 0.0001;
    animateBreakdownBar('breakdownMatric', safePercentage(matric, safeTotal));
    animateBreakdownBar('breakdownInter', safePercentage(inter, safeTotal));
    animateBreakdownBar('breakdownTest', safePercentage(test, safeTotal));

    const progressCircle = document.getElementById('progressCircle');
    const aggregateValue = document.getElementById('aggregateValue');
    const aggregateStatus = document.getElementById('aggregateStatus');

    const resultsTabBtn = document.getElementById('resultsTab');
    if (resultsTabBtn) {
        resultsTabBtn.disabled = false;
        resultsTabBtn.click();
        
        // Scroll to top of calculator container to show results
        const calcContainer = document.querySelector('.calc-main-container');
        if (calcContainer) {
            // Small delay to ensure tab switch is complete
            setTimeout(() => {
                calcContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                // Offset for fixed header
                window.scrollBy(0, -100);
            }, 100);
        }
    }

    const circumference = 534;
    const offset = circumference - (Math.max(Math.min(total, 100), 0) / 100) * circumference;

    if (progressCircle) {
        progressCircle.style.strokeDashoffset = circumference;
        setTimeout(() => {
            progressCircle.style.strokeDashoffset = offset;
        }, 100);
    }

    animateValue(aggregateValue, 0, Math.max(Math.min(total, 100), 0), 1500);
    updateStatusBadge(aggregateStatus, total);
    updatePrediction(total, currentCalculatorConfig?.shortName);
}

function safePercentage(part, total) {
    if (!total) return 0;
    return Math.max(0, Math.min(100, (part / total) * 100));
}

function animateValue(element, start, end, duration) {
    if (!element) return;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = start + (end - start) * ease;
        element.textContent = currentVal.toFixed(2);
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function animateBreakdownBar(id, percentage) {
    const bar = document.getElementById(id);
    if (!bar) return;
    const safe = Math.max(0, Math.min(100, percentage || 0));
    bar.style.width = '0%';
    setTimeout(() => {
        bar.style.width = safe + '%';
    }, 200);
}

function updateStatusBadge(element, aggregate) {
    if (!element) return;
    let statusClass = 'low';
    let statusText = 'Very Low';

    if (aggregate >= 75) {
        statusClass = 'high';
        statusText = 'High';
    } else if (aggregate >= 65) {
        statusClass = 'medium';
        statusText = 'Medium';
    }

    element.innerHTML = `<span class="status-badge ${statusClass}">${statusText}</span>`;
}

function updatePrediction(aggregate, universityName = 'your target university') {
    const predictionCard = document.getElementById('predictionCard');
    if (!predictionCard) return;
    const predictionContent = predictionCard.querySelector('.prediction-content');
    if (!predictionContent) return;

    let predictionText;
    if (aggregate >= 75) {
        predictionText = `Excellent chances at ${universityName}.`;
    } else if (aggregate >= 70) {
        predictionText = `Good chances — ${universityName} is within reach.`;
    } else if (aggregate >= 65) {
        predictionText = `Borderline chances. Apply broadly and keep ${universityName} on the list.`;
    } else {
        predictionText = `Strengthen your profile or consider alternate campuses alongside ${universityName}.`;
    }

    predictionContent.innerHTML = `<p class="prediction-text">${predictionText}</p>`;
}

// === Dynamic Merit & Pattern Rendering ===

function renderMeritData(universityId) {
    const container = document.getElementById('meritContainer');
    if (!container) return;

    const uniMerit = getMeritDataById(universityId);

    if (!uniMerit || !uniMerit.campuses || uniMerit.campuses.length === 0) {
        container.innerHTML = `
            <div class="merit-header">
                <h3>2024 Merit Data</h3>
                <p class="merit-subtitle">Merit data not available for this university</p>
            </div>
            <div class="merit-empty">
                <p>No merit data available. Please check the official university website for the latest information.</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="merit-header">
            <h3>2024 Merit - ${uniMerit.name}</h3>
            <p class="merit-subtitle">Closing aggregates for all campuses and programs</p>
        </div>
    `;

    uniMerit.campuses.forEach(campus => {
        html += `
            <div class="merit-campus-section">
                <h4 class="merit-campus-title">${campus.campus}</h4>
                <div class="merit-table-wrapper">
                    <table class="merit-table">
                        <thead>
                            <tr>
                                <th>Program</th>
                                <th>Merit</th>
                                ${campus.programs.some(p => p.shift) ? '<th>Shift</th>' : ''}
                                ${campus.programs.some(p => p.category) ? '<th>Category</th>' : ''}
                            </tr>
                        </thead>
                        <tbody>
        `;

        campus.programs.forEach(program => {
            const meritValue = formatMeritDisplay(program.merit);
            html += `
                <tr>
                    <td>${program.name}</td>
                    <td class="merit-value-cell">${meritValue}</td>
                    ${campus.programs.some(p => p.shift) ? `<td>${program.shift || '-'}</td>` : ''}
                    ${campus.programs.some(p => p.category) ? `<td>${program.category || '-'}</td>` : ''}
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });

    html += `
        <div class="merit-note">
            <strong>Note:</strong> Merit data is from the 2024 admissions cycle. Actual merit may vary based on the number of applicants and seats available.
        </div>
    `;

    container.innerHTML = html;
}

function formatMeritDisplay(merit) {
    if (typeof merit === 'number') {
        return merit.toFixed(2) + '%';
    }
    if (typeof merit === 'string') {
        // If it already has % or is a rank/range, return as-is
        if (merit.includes('%') || merit.includes('#') || merit.includes('/') || merit.includes('-') || merit.includes('Top')) {
            return merit;
        }
        return merit + '%';
    }
    return merit;
}

function renderTestPattern(universityId) {
    const container = document.getElementById('patternContainer');
    if (!container) return;

    const pattern = getTestPatternById(universityId);

    if (!pattern) {
        container.innerHTML = `
            <div class="pattern-header">
                <div class="pattern-icon">#</div>
                <h3>Entry Test Pattern</h3>
            </div>
            <div class="pattern-empty">
                <p>Test pattern data not available for this university. Please check the official university website.</p>
            </div>
        `;
        return;
    }

    const testData = pattern.pattern;

    // Handle case where no test is required
    if (testData.totalMCQs === 0) {
        container.innerHTML = `
            <div class="pattern-header">
                <div class="pattern-icon">#</div>
                <h3>${pattern.name}</h3>
            </div>
            <div class="pattern-no-test">
                <p class="no-test-message">No entry test required</p>
                ${testData.notes ? `<p class="pattern-alt-note">${testData.notes}</p>` : ''}
            </div>
        `;
        return;
    }

    let subjectListHtml = '';
    if (testData.subjects && testData.subjects.length > 0) {
        subjectListHtml = `
            <div class="subject-section">
                <h4>Subject Distribution</h4>
                <div class="subject-list">
                    ${testData.subjects.map(subject => `
                        <div class="subject-item">
                            <span class="subject-name">${subject.name}</span>
                            <span class="subject-count">${subject.mcqs} MCQs</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Build tags
    let tagsHtml = '<div class="pattern-tags">';
    if (testData.hasNegativeMarking) {
        tagsHtml += '<span class="pattern-tag negative">Negative Marking</span>';
    } else {
        tagsHtml += '<span class="pattern-tag positive">No Negative Marking</span>';
    }
    if (testData.allowsCalculator) {
        tagsHtml += '<span class="pattern-tag positive">Calculator Allowed</span>';
    } else {
        tagsHtml += '<span class="pattern-tag negative">No Calculator</span>';
    }
    if (testData.isComputerBased) {
        tagsHtml += '<span class="pattern-tag info">Computer Based</span>';
    } else {
        tagsHtml += '<span class="pattern-tag info">Paper Based</span>';
    }
    tagsHtml += '</div>';

    container.innerHTML = `
        <div class="pattern-header">
            <div class="pattern-icon">#</div>
            <h3>${pattern.name}</h3>
        </div>

        <div class="pattern-grid">
            <div class="pattern-card">
                <span class="pattern-label">Total MCQs</span>
                <span class="pattern-value">${testData.totalMCQs}</span>
            </div>
            <div class="pattern-card">
                <span class="pattern-label">Duration</span>
                <span class="pattern-value">${testData.duration}</span>
            </div>
            <div class="pattern-card">
                <span class="pattern-label">Total Marks</span>
                <span class="pattern-value">${testData.totalMarks}</span>
            </div>
        </div>

        ${subjectListHtml}

        ${tagsHtml}

        ${testData.notes ? `
        <div class="pattern-note">
            <strong>Note:</strong> ${testData.notes}
        </div>
        ` : `
        <div class="pattern-note">
            <strong>Note:</strong> Test patterns may change. Always verify the latest information from the official university website.
        </div>
        `}
    `;
}

// Update formula card with dynamic values
function updateFormulaCard(config) {
    const formulaCard = document.querySelector('.formula-card p');
    if (!formulaCard || !config) return;

    const matric = Math.round((config.weights.matric || 0) * 100);
    const inter = Math.round((config.weights.inter || 0) * 100);
    const test = Math.round((config.weights.test || 0) * 100);

    let formulaText = `Based on the ${config.longName} admission formula:<br><strong>`;

    const parts = [];
    if (matric > 0) parts.push(`Matric (${matric}%)`);
    if (inter > 0) parts.push(`Intermediate (${inter}%)`);
    if (test > 0) parts.push(`Entry Test (${test}%)`);

    formulaText += parts.join(' + ') + '</strong>';
    formulaCard.innerHTML = formulaText;
}

// Update breakdown labels with dynamic weights
function updateBreakdownLabels(config) {
    if (!config) return;

    const matricLabel = document.querySelector('.breakdown-item:nth-child(1) .breakdown-label');
    const interLabel = document.querySelector('.breakdown-item:nth-child(2) .breakdown-label');
    const testLabel = document.querySelector('.breakdown-item:nth-child(3) .breakdown-label');

    const matric = Math.round((config.weights.matric || 0) * 100);
    const inter = Math.round((config.weights.inter || 0) * 100);
    const test = Math.round((config.weights.test || 0) * 100);

    if (matricLabel) matricLabel.textContent = `Matric (${matric}%)`;
    if (interLabel) interLabel.textContent = `Intermediate (${inter}%)`;
    if (testLabel) testLabel.textContent = `Entry Test (${test}%)`;
}

// Get the university ID from URL (supports both ?uni=fast and /calculator/fast/ paths)
function getUniversityId() {
    // First check query parameter
    const params = new URLSearchParams(window.location.search);
    const uniParam = params.get('uni')?.toLowerCase();
    if (uniParam) return uniParam;

    // Then check URL path (e.g., /calculator/fast/)
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const calcIndex = pathParts.indexOf('calculator');
    if (calcIndex !== -1 && pathParts[calcIndex + 1]) {
        const uniFromPath = pathParts[calcIndex + 1].toLowerCase();
        // Exclude special pages like nu-marks
        if (uniFromPath !== 'nu-marks' && calculatorConfigs[uniFromPath]) {
            return uniFromPath;
        }
    }

    return 'fast';
}

// Initialize dynamic content
function initDynamicContent() {
    const universityId = getUniversityId();
    renderMeritData(universityId);
    renderTestPattern(universityId);
    updateFormulaCard(currentCalculatorConfig);
    updateBreakdownLabels(currentCalculatorConfig);
    updateNuCalcBanner(universityId);
}

// Show/hide NU calc banner based on university
function updateNuCalcBanner(universityId) {
    const nuBanner = document.getElementById('nuCalcBanner') || document.querySelector('.nu-calc-banner');
    if (!nuBanner) return;

    // Only show for FAST university
    if (universityId === 'fast') {
        nuBanner.style.display = 'flex';
    } else {
        nuBanner.style.display = 'none';
    }
}

// Call initDynamicContent after DOM loads
document.addEventListener('DOMContentLoaded', initDynamicContent);

console.log('Calculator Engine v3 Initialized.');
