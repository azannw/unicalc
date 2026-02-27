// =====================================================
// UniCalc — Calculator Logic v3 (Dynamic University Support)
// Requires: universityConfigs.js (defines calculatorConfigs)
// =====================================================

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
    const uniId = getUniversityId();
    return calculatorConfigs[uniId] || calculatorConfigs.fast;
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

    // Hide test type pills for universities that use a single dedicated test (e.g. MDCAT, NUMS)
    const testTypeSection = document.getElementById('testTypeSection');
    if (testTypeSection) {
        testTypeSection.style.display = config.hideTestTypePills ? 'none' : '';
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

    const universityId = getUniversityId();
    const uniMerit = getMeritDataById(universityId);

    // Determine selected test type for filtering (NU/NTS for FAST etc.)
    let selectedTestType = null;
    if (uniMerit && uniMerit.hasTestTypes) {
        const testTypeRadio = document.querySelector('input[name="testType"]:checked');
        if (testTypeRadio) {
            if (testTypeRadio.value === 'nat') selectedTestType = 'NTS';
            else selectedTestType = 'NU'; // "uni" and "sat" both default to NU
        }
    }

    // Try to get program-level predictions for all programs
    if (uniMerit && uniMerit.campuses && uniMerit.campuses.length > 0) {
        let html = '';
        let hasPredictions = false;

        if (selectedTestType) {
            html += `<div class="prediction-test-label">Showing predictions for <strong>${selectedTestType}</strong> test merits</div>`;
        }

        uniMerit.campuses.forEach(campus => {
            const campusPredictions = [];
            campus.programs.forEach(program => {
                // Filter by test type if applicable
                if (selectedTestType && program.testType && program.testType !== selectedTestType) return;

                const prediction = calculateAdmissionPrediction(universityId, program.name, aggregate, campus.campus);
                if (prediction && prediction.type === 'percentage') {
                    campusPredictions.push({ program: program.name, shift: program.shift, category: program.category, testType: program.testType, ...prediction });
                    hasPredictions = true;
                }
            });

            if (campusPredictions.length > 0) {
                html += `<div class="prediction-campus">
                    <h5 class="prediction-campus-title">${campus.campus}</h5>
                    <div class="prediction-programs">`;
                campusPredictions.forEach(p => {
                    let programLabel = p.program;
                    if (p.shift) programLabel += ` (${p.shift})`;
                    else if (p.category) programLabel += ` (${p.category})`;
                    const statusClass = p.status;
                    html += `<div class="prediction-program-row">
                        <span class="prediction-program-name">${programLabel}</span>
                        <span class="prediction-probability ${statusClass}">${p.label}</span>
                    </div>`;
                });
                html += `</div></div>`;
            }
        });

        if (hasPredictions) {
            const trendNote = '<p class="prediction-note">Based on statistical analysis of historical merit trends.</p>';
            predictionContent.innerHTML = html + trendNote;
            return;
        }

        // Check if rank-based
        if (uniMerit.meritType === 'rank') {
            predictionContent.innerHTML = `<p class="prediction-text">This university uses rank-based merit. Compare your entry test rank against the closing ranks in the Merit tab.</p>`;
            return;
        }
    }

    // Fallback: generic prediction
    let predictionText;
    if (aggregate >= 85) {
        predictionText = `Strong aggregate for ${universityName}. Check specific program cutoffs in the Merit tab.`;
    } else if (aggregate >= 75) {
        predictionText = `Competitive aggregate for ${universityName}. Check program-specific cutoffs.`;
    } else if (aggregate >= 65) {
        predictionText = `Borderline for top programs at ${universityName}. Consider multiple options.`;
    } else {
        predictionText = `Explore alternate campuses or programs at ${universityName}.`;
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
                <h3>Merit Data</h3>
                <p class="merit-subtitle">Merit data not available for this university</p>
            </div>
            <div class="merit-empty">
                <p>No merit data available. Please check the official university website for the latest information.</p>
            </div>
        `;
        return;
    }

    const meritYear = uniMerit.year || 2024;
    const meritTypeLabel = uniMerit.meritType === 'rank' ? 'Closing Rank' : 'Closing Aggregate';
    const hasTestTypes = uniMerit.hasTestTypes || false;

    // Determine max history length across all programs
    let maxHistory = 1;
    uniMerit.campuses.forEach(campus => {
        campus.programs.forEach(program => {
            if (program.history && program.history.length > maxHistory) {
                maxHistory = Math.min(program.history.length, 3);
            }
        });
    });

    // Generate year headers
    const yearHeaders = [];
    for (let i = 0; i < maxHistory; i++) {
        yearHeaders.push(meritYear - i);
    }

    // Build campus filter — use dropdown for many campuses, pills for few
    const campusNames = uniMerit.campuses.map(c => c.campus);
    let campusFilterHtml = '';
    if (campusNames.length > 1 && campusNames.length <= 8) {
        campusFilterHtml = `
            <div class="merit-campus-filter">
                <button class="merit-filter-btn active" data-campus="all">All Campuses</button>
                ${campusNames.map(name => `<button class="merit-filter-btn" data-campus="${name}">${name}</button>`).join('')}
            </div>
        `;
    } else if (campusNames.length > 8) {
        campusFilterHtml = `
            <div class="merit-campus-filter">
                <div class="select-wrapper">
                    <select class="merit-filter-select form-select" data-campus-select>
                        <option value="all">All Colleges (${campusNames.length})</option>
                        ${campusNames.map(name => `<option value="${name}">${name}</option>`).join('')}
                    </select>
                    <span class="select-arrow">&#9660;</span>
                </div>
            </div>
        `;
    }

    let html = `
        <div class="merit-header">
            <h3>Merit Data — ${uniMerit.name}</h3>
            <p class="merit-subtitle">${meritTypeLabel} ${maxHistory > 1 ? `(${yearHeaders[yearHeaders.length - 1]}–${yearHeaders[0]})` : `(${meritYear})`}</p>
        </div>
        ${campusFilterHtml}
    `;

    uniMerit.campuses.forEach(campus => {
        const hasShift = campus.programs.some(p => p.shift);
        const hasCategory = campus.programs.some(p => p.category);

        html += `
            <div class="merit-campus-section" data-campus-name="${campus.campus}">
                <h4 class="merit-campus-title">${campus.campus}</h4>
                <div class="merit-table-wrapper">
                    <table class="merit-table">
                        <thead>
                            <tr>
                                <th>Program</th>
                                ${hasTestTypes ? '<th>Test</th>' : ''}
                                ${hasShift ? '<th>Shift</th>' : ''}
                                ${hasCategory ? '<th>Category</th>' : ''}
                                ${yearHeaders.map(y => `<th>${y}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
        `;

        campus.programs.forEach(program => {
            const history = program.history || [program.merit];
            html += `<tr>
                    <td>${program.name}</td>
                    ${hasTestTypes ? `<td><span class="merit-test-badge">${program.testType || '-'}</span></td>` : ''}
                    ${hasShift ? `<td>${program.shift || '-'}</td>` : ''}
                    ${hasCategory ? `<td>${program.category || '-'}</td>` : ''}`;
            for (let i = 0; i < maxHistory; i++) {
                const val = i < history.length ? formatMeritDisplay(history[i]) : '—';
                html += `<td class="merit-value-cell">${val}</td>`;
            }
            html += `</tr>`;
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
            <strong>Note:</strong> Merit shown is the closing merit from official records. Actual cutoffs may vary each year.
        </div>
    `;

    container.innerHTML = html;

    // Attach campus filter handlers — pill buttons
    const filterBtns = container.querySelectorAll('.merit-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedCampus = btn.dataset.campus;
            const sections = container.querySelectorAll('.merit-campus-section');
            sections.forEach(section => {
                if (selectedCampus === 'all' || section.dataset.campusName === selectedCampus) {
                    section.style.display = '';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // Attach campus filter handler — dropdown select
    const filterSelect = container.querySelector('[data-campus-select]');
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const selectedCampus = filterSelect.value;
            const sections = container.querySelectorAll('.merit-campus-section');
            sections.forEach(section => {
                if (selectedCampus === 'all' || section.dataset.campusName === selectedCampus) {
                    section.style.display = '';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
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
