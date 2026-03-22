// =====================================================
// UniCalc — Predictor Engine Tests
// Run: node tests/test-predictor.js
// =====================================================

const fs = require('fs');
const path = require('path');

const vm = require('vm');

function loadGlobal(filePath) {
    const code = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf-8');
    vm.runInThisContext(code, { filename: filePath });
}

loadGlobal('js/universityConfigs.js');
loadGlobal('js/meritData.js');

// Extract key functions from predictor.js manually (avoid DOM deps)
// We reimplement the pure calculation functions here for testing

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

function reverseCalculate(uniId, matricObtained, matricTotal, interObtained, interTotal) {
    const config = calculatorConfigs[uniId];
    if (!config) return null;

    const uniMerit = getMeritDataById(uniId);
    if (!uniMerit) return null;
    if (uniMerit.meritType === 'rank') return { type: 'rank' };

    const matricPerc = (matricObtained / Math.max(matricTotal, 1)) * 100;
    const interPerc = (interObtained / Math.max(interTotal, 1)) * 100;
    const partialAggregate = (matricPerc * config.weights.matric) + (interPerc * config.weights.inter);

    const results = [];
    uniMerit.campuses.forEach(campus => {
        campus.programs.forEach(program => {
            const predicted = getPredictedMerit(program);
            if (predicted === null) return;

            if (config.weights.test === 0) {
                results.push({
                    campus: campus.campus,
                    program: program.name,
                    predictedMerit: predicted,
                    noTest: true,
                    chance: partialAggregate >= predicted ? 'safe' : 'not-achievable'
                });
            } else {
                const requiredTestPerc = (predicted - partialAggregate) / config.weights.test;
                const requiredTestMarks = (requiredTestPerc / 100) * config.testMax;
                results.push({
                    campus: campus.campus,
                    program: program.name,
                    testType: program.testType || null,
                    predictedMerit: predicted,
                    requiredTestPerc,
                    requiredTestMarks: Math.max(0, requiredTestMarks),
                    testMax: config.testMax,
                    partialAggregate,
                    chance: categorizeChance(requiredTestPerc)
                });
            }
        });
    });

    return { type: 'percentage', partialAggregate, results };
}

// ---- Test Framework ----
let passed = 0;
let failed = 0;
let total = 0;

function assert(condition, msg) {
    total++;
    if (condition) {
        passed++;
    } else {
        failed++;
        console.error(`  FAIL: ${msg}`);
    }
}

function section(title) {
    console.log(`\n--- ${title} ---`);
}

// =====================================================
// TEST CASES
// =====================================================

section('Reverse Calculation Formula');

// Manual verification: FAST with 950/1100 matric, 980/1100 inter
// matricPerc = (950/1100)*100 = 86.36%
// interPerc = (980/1100)*100 = 89.09%
// partialAgg = 86.36*0.10 + 89.09*0.40 = 8.636 + 35.636 = 44.27
// For a program with predicted merit 73:
// requiredTestPerc = (73 - 44.27) / 0.50 = 57.46
// requiredTestMarks = 57.46/100 * 100 = 57.46
{
    const r = reverseCalculate('fast', 950, 1100, 980, 1100);
    assert(r !== null, 'FAST result should not be null');
    assert(r.type === 'percentage', 'FAST should be percentage-based');
    assert(Math.abs(r.partialAggregate - 44.27) < 0.1, `FAST partial aggregate should be ~44.27, got ${r.partialAggregate.toFixed(2)}`);

    // Find FAST ISB BS CS (NU) — merit 73, history [73, 75]
    // predicted = linearRegression([73, 75]).predicted
    // reversed: [75, 73] → slope = (73-75)/1 = -2, intercept = 75, predicted = -2*2 + 75 = 71
    const isbCS_NU = r.results.find(p => p.campus === 'Islamabad' && p.program === 'BS Computer Science' && p.testType === 'NU');
    assert(isbCS_NU !== null, 'Should find FAST ISB BS CS (NU)');
    if (isbCS_NU) {
        const expectedPredicted = 71; // from linear regression of [73, 75]
        assert(Math.abs(isbCS_NU.predictedMerit - expectedPredicted) < 0.5, `Predicted merit should be ~71, got ${isbCS_NU.predictedMerit.toFixed(2)}`);
        const expectedTestPerc = (expectedPredicted - r.partialAggregate) / 0.50;
        assert(Math.abs(isbCS_NU.requiredTestPerc - expectedTestPerc) < 0.5, `Required test % should be ~${expectedTestPerc.toFixed(1)}, got ${isbCS_NU.requiredTestPerc.toFixed(1)}`);
        assert(isbCS_NU.chance === 'very-likely' || isbCS_NU.chance === 'achievable', `Chance for strong student should be achievable or better, got ${isbCS_NU.chance}`);
    }
}

section('All University Configs Have Merit Data');

for (const [uniId, config] of Object.entries(calculatorConfigs)) {
    const meritData = getMeritDataById(uniId);
    assert(meritData !== null, `${config.shortName} (${uniId}) should have merit data`);
}

section('Rank-Based Universities');

{
    const nust = reverseCalculate('nust', 900, 1100, 950, 1100);
    assert(nust !== null, 'NUST result should not be null');
    assert(nust.type === 'rank', 'NUST should return rank type');
}

{
    const giki = reverseCalculate('giki', 900, 1100, 950, 1100);
    assert(giki !== null, 'GIKI result should not be null');
    assert(giki.type === 'rank', 'GIKI should return rank type');
}

section('IST (20/40/40 FSc weights)');

{
    // IST: weights matric=0.20, inter=0.40, test=0.40
    // matric 950/1100 → 86.36%, inter 980/1100 → 89.09%
    // partial = 86.36*0.20 + 89.09*0.40 = 17.27 + 35.64 = 52.91
    const ist = reverseCalculate('ist', 950, 1100, 980, 1100);
    assert(ist !== null, 'IST result should not be null');
    assert(ist.type === 'percentage', 'IST should be percentage type');
    assert(Math.abs(ist.partialAggregate - 52.91) < 0.1, `IST partial should be ~52.91, got ${ist.partialAggregate.toFixed(2)}`);

    // IST BS CS merit is 90.25, testMax 100
    // requiredTestPerc = (90.25 - 52.91) / 0.40 = 93.35 → stretch
    const bscs = ist.results.find(p => p.program === 'BS Computer Science');
    assert(bscs !== null, 'Should find IST BS CS');
    if (bscs) {
        assert(!bscs.noTest, 'IST programs should have a test component (test weight 0.40)');
        assert(bscs.chance === 'stretch', `IST BS CS should be stretch (need ~93% test), got ${bscs.chance}`);
    }

    // IST BS Data Science merit is 85.25
    // requiredTestPerc = (85.25 - 52.91) / 0.40 = 80.85 → challenging
    const bsds = ist.results.find(p => p.program === 'BS Data Science');
    if (bsds) {
        assert(bsds.chance === 'challenging', `IST BS DS should be challenging (need ~81% test), got ${bsds.chance}`);
    }
}

section('High Marks Student (should have many safe/very-likely)');

{
    const r = reverseCalculate('comsats', 1050, 1100, 1080, 1100);
    assert(r !== null && r.type === 'percentage', 'COMSATS should return percentage');
    // matricPerc = 95.45%, interPerc = 98.18%
    // partial = 95.45*0.10 + 98.18*0.40 = 9.545 + 39.272 = 48.82
    const safeCount = r.results.filter(p => p.chance === 'safe' || p.chance === 'very-likely').length;
    assert(safeCount > 0, `High-marks student should have some safe/very-likely programs at COMSATS, got ${safeCount}`);
}

section('Low Marks Student (should have many not-achievable)');

{
    const r = reverseCalculate('pieas', 600, 1100, 650, 1100);
    assert(r !== null && r.type === 'percentage', 'PIEAS should return percentage');
    // matricPerc = 54.5%, interPerc = 59.09%
    // partial = 54.5*0.15 + 59.09*0.25 = 8.18 + 14.77 = 22.95
    // PIEAS cutoff is ~90.6, requiredTestPerc = (90.6 - 22.95) / 0.60 = 112.75 → not achievable
    const notAchievable = r.results.filter(p => p.chance === 'not-achievable').length;
    assert(notAchievable === r.results.length, `Low-marks student should have all not-achievable at PIEAS, got ${notAchievable}/${r.results.length}`);
}

section('Multiple Test Types (FAST)');

{
    const r = reverseCalculate('fast', 950, 1100, 980, 1100);
    const isbPrograms = r.results.filter(p => p.campus === 'Islamabad' && p.program === 'BS Computer Science');
    const nuType = isbPrograms.find(p => p.testType === 'NU');
    const ntsType = isbPrograms.find(p => p.testType === 'NTS');

    assert(nuType !== null, 'Should find FAST ISB BS CS with NU test type');
    assert(ntsType !== null, 'Should find FAST ISB BS CS with NTS test type');

    if (nuType && ntsType) {
        // NTS merit is higher (90) so required test marks should be higher
        assert(ntsType.requiredTestPerc > nuType.requiredTestPerc,
            `NTS required test % (${ntsType.requiredTestPerc.toFixed(1)}) should be > NU (${nuType.requiredTestPerc.toFixed(1)})`);
    }
}

section('Weight Verification');

for (const [uniId, config] of Object.entries(calculatorConfigs)) {
    const sum = config.weights.matric + config.weights.inter + config.weights.test;
    assert(Math.abs(sum - 1.0) < 0.01, `${config.shortName} weights should sum to 1.0, got ${sum.toFixed(3)}`);
}

section('Chance Categorization');

assert(categorizeChance(-5) === 'safe', 'Negative test % → safe');
assert(categorizeChance(0) === 'safe', 'Zero test % → safe');
assert(categorizeChance(30) === 'very-likely', '30% → very-likely');
assert(categorizeChance(50) === 'very-likely', '50% → very-likely');
assert(categorizeChance(60) === 'achievable', '60% → achievable');
assert(categorizeChance(70) === 'achievable', '70% → achievable');
assert(categorizeChance(80) === 'challenging', '80% → challenging');
assert(categorizeChance(85) === 'challenging', '85% → challenging');
assert(categorizeChance(95) === 'stretch', '95% → stretch');
assert(categorizeChance(100) === 'stretch', '100% → stretch');
assert(categorizeChance(110) === 'not-achievable', '110% → not-achievable');

section('Monotonicity: Higher marks → better or equal chances');

{
    const r1 = reverseCalculate('fast', 800, 1100, 850, 1100);
    const r2 = reverseCalculate('fast', 950, 1100, 980, 1100);
    if (r1 && r2 && r1.results.length > 0 && r2.results.length > 0) {
        // For same program, higher marks should need fewer test marks
        const p1 = r1.results[0];
        const p2 = r2.results.find(p => p.campus === p1.campus && p.program === p1.program && p.testType === p1.testType);
        if (p2) {
            assert(p2.requiredTestPerc <= p1.requiredTestPerc,
                `Higher marks should need lower test % (${p2.requiredTestPerc.toFixed(1)} vs ${p1.requiredTestPerc.toFixed(1)})`);
        }
    }
}

section('Medical Universities (UHS, NUMS)');

{
    const uhs = reverseCalculate('uhs', 1050, 1100, 1070, 1100);
    assert(uhs !== null && uhs.type === 'percentage', 'UHS should return percentage');
    assert(uhs.results.length > 0, 'UHS should have program results');
    // UHS testMax is 200 (MDCAT)
    const first = uhs.results[0];
    assert(first.testMax === 200, `UHS testMax should be 200, got ${first.testMax}`);
}

{
    const nums = reverseCalculate('nums', 1050, 1100, 1070, 1100);
    assert(nums !== null && nums.type === 'percentage', 'NUMS should return percentage');
    assert(nums.results.length > 0, 'NUMS should have program results');
    const first = nums.results[0];
    assert(first.testMax === 200, `NUMS testMax should be 200 (MDCAT), got ${first.testMax}`);
}

section('All Universities Produce Valid Results');

for (const [uniId, config] of Object.entries(calculatorConfigs)) {
    const r = reverseCalculate(uniId, 900, 1100, 950, 1100);
    assert(r !== null, `${config.shortName} should produce a result`);
    if (r && r.type === 'percentage') {
        r.results.forEach(p => {
            assert(typeof p.predictedMerit === 'number' && !isNaN(p.predictedMerit),
                `${config.shortName}/${p.campus}/${p.program}: predicted merit should be a valid number`);
            assert(p.predictedMerit >= 0 && p.predictedMerit <= 100,
                `${config.shortName}/${p.campus}/${p.program}: predicted merit ${p.predictedMerit} should be in [0,100]`);
            if (!p.noTest) {
                assert(typeof p.requiredTestMarks === 'number' && !isNaN(p.requiredTestMarks),
                    `${config.shortName}/${p.campus}/${p.program}: required test marks should be a valid number`);
                assert(p.requiredTestMarks >= 0,
                    `${config.shortName}/${p.campus}/${p.program}: required test marks should be >= 0`);
            }
        });
    }
}

// ---- Summary ----
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests: ${total} | Passed: ${passed} | Failed: ${failed}`);
console.log(`${'='.repeat(50)}`);
process.exit(failed > 0 ? 1 : 0);
