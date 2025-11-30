// =====================================================
// UniCalc — Calculator Logic v2
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initCalculator();
    setupInputListeners();
});

// === Tab System ===
function initTabs() {
    const tabBtns = document.querySelectorAll('.calc-tab');
    const tabContents = document.querySelectorAll('.calc-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;

            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to current
            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            const content = document.getElementById(tabId);
            if (content) {
                content.classList.add('active');
            }
        });
    });
}

// === Calculator Logic ===
function initCalculator() {
    const form = document.getElementById('calcForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateAggregate();
    });
    
    // Edit button
    const editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            // Switch back to calculator tab
            const calcTab = document.querySelector('[data-tab="calculator"]');
            if (calcTab) calcTab.click();
        });
    }
}

function setupInputListeners() {
    // Toggle total marks based on test type
    const testTypeInputs = document.querySelectorAll('input[name="testType"]');
    const testTotalInput = document.getElementById('testTotal');
    
    testTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'sat') {
                if (testTotalInput) testTotalInput.value = 1600;
            } else {
                if (testTotalInput) testTotalInput.value = 100;
            }
        });
    });
}

function calculateAggregate() {
    // Get inputs
    const matricObtained = parseFloat(document.getElementById('matricObtained')?.value) || 0;
    const matricTotal = parseFloat(document.getElementById('matricTotal')?.value) || 1100;
    
    const interObtained = parseFloat(document.getElementById('interObtained')?.value) || 0;
    const interTotal = parseFloat(document.getElementById('interTotal')?.value) || 1100;
    
    const testObtained = parseFloat(document.getElementById('testObtained')?.value) || 0;
    const testTotal = parseFloat(document.getElementById('testTotal')?.value) || 100;
    
    // Calculate percentages
    const matricPerc = (matricObtained / matricTotal) * 100;
    const interPerc = (interObtained / interTotal) * 100;
    const testPerc = (testObtained / testTotal) * 100;
    
    // FAST Formula: 10% Matric + 40% Inter + 50% Entry Test
    const weightMatric = 0.10;
    const weightInter = 0.40;
    const weightTest = 0.50;
    
    const aggMatric = matricPerc * weightMatric;
    const aggInter = interPerc * weightInter;
    const aggTest = testPerc * weightTest;
    
    const totalAggregate = aggMatric + aggInter + aggTest;
    
    // Display Results
    displayResults(totalAggregate, aggMatric, aggInter, aggTest);
}

function displayResults(total, matric, inter, test) {
    // Update breakdown values
    const bdMatric = document.getElementById('bdMatric');
    const bdInter = document.getElementById('bdInter');
    const bdTest = document.getElementById('bdTest');
    
    if (bdMatric) bdMatric.textContent = matric.toFixed(2) + '%';
    if (bdInter) bdInter.textContent = inter.toFixed(2) + '%';
    if (bdTest) bdTest.textContent = test.toFixed(2) + '%';
    
    // Update breakdown bars
    animateBreakdownBar('breakdownMatric', (matric / total) * 100);
    animateBreakdownBar('breakdownInter', (inter / total) * 100);
    animateBreakdownBar('breakdownTest', (test / total) * 100);
    
    // Update circular progress
    const progressCircle = document.getElementById('progressCircle');
    const aggregateValue = document.getElementById('aggregateValue');
    const aggregateStatus = document.getElementById('aggregateStatus');
    
    // Enable results tab and switch to it
    const resultsTabBtn = document.getElementById('resultsTab');
    if (resultsTabBtn) {
        resultsTabBtn.disabled = false;
        resultsTabBtn.click();
    }
    
    // Animate progress circle
    const circumference = 534; // 2 * π * 85
    const offset = circumference - (total / 100) * circumference;
    
    if (progressCircle) {
        progressCircle.style.strokeDashoffset = circumference;
        setTimeout(() => {
            progressCircle.style.strokeDashoffset = offset;
        }, 100);
    }
    
    // Animate aggregate value
    animateValue(aggregateValue, 0, total, 1500);
    
    // Update status badge
    updateStatusBadge(aggregateStatus, total);
    
    // Update prediction
    updatePrediction(total);
}

function animateValue(element, start, end, duration) {
    if (!element) return;
    
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // EaseOutQuart
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
    
    bar.style.width = '0%';
    setTimeout(() => {
        bar.style.width = percentage + '%';
    }, 200);
}

function updateStatusBadge(element, aggregate) {
    if (!element) return;
    
    let statusClass, statusText;
    
    if (aggregate >= 75) {
        statusClass = 'high';
        statusText = 'High';
    } else if (aggregate >= 65) {
        statusClass = 'medium';
        statusText = 'Medium';
    } else {
        statusClass = 'low';
        statusText = 'Very Low';
    }
    
    element.innerHTML = `<span class="status-badge ${statusClass}">${statusText}</span>`;
}

function updatePrediction(aggregate) {
    const predictionCard = document.getElementById('predictionCard');
    if (!predictionCard) return;
    
    const predictionContent = predictionCard.querySelector('.prediction-content');
    if (!predictionContent) return;
    
    let predictionText;
    
    if (aggregate >= 75) {
        predictionText = 'Excellent chances! You have a strong aggregate for most programs.';
    } else if (aggregate >= 70) {
        predictionText = 'Good chances. You have a competitive aggregate for many programs.';
    } else if (aggregate >= 65) {
        predictionText = 'Moderate chances. Consider applying to multiple programs and campuses.';
    } else {
        predictionText = 'Consider alternative universities or improving your scores.';
    }
    
    predictionContent.innerHTML = `<p class="prediction-text">${predictionText}</p>`;
}

console.log('Calculator Engine v2 Initialized.');
