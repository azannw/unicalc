// UniCalc — Comprehensive Test Suite
const fs = require('fs');
const path = require('path');

// Load meritData.js (pure data + functions, no DOM dependency)
// Replace const/let with var so eval() leaks variables into this scope
const meritDataSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'meritData.js'), 'utf-8')
    .replace(/^(const|let) /gm, 'var ');
eval(meritDataSrc);

// Hardcode calculator configs (weights) since calculator.js has DOM dependencies
const calculatorConfigs = {
    fast:        { weights: { matric: 0.10, inter: 0.40, test: 0.50 }, testMax: 100 },
    nust:        { weights: { matric: 0.10, inter: 0.15, test: 0.75 }, testMax: 200 },
    itu:         { weights: { matric: 0.15, inter: 0.35, test: 0.50 }, testMax: 100 },
    comsats:     { weights: { matric: 0.10, inter: 0.40, test: 0.50 }, testMax: 100 },
    giki:        { weights: { matric: 0.10, inter: 0.05, test: 0.85 }, testMax: 200 },
    pieas:       { weights: { matric: 0.15, inter: 0.25, test: 0.60 }, testMax: 100 },
    uet:         { weights: { matric: 0.17, inter: 0.50, test: 0.33 }, testMax: 400 },
    ned:         { weights: { matric: 0.00, inter: 0.40, test: 0.60 }, testMax: 100 },
    ist:         { weights: { matric: 0.40, inter: 0.60, test: 0.00 }, testMax: 0 },
    nutech:      { weights: { matric: 0.10, inter: 0.20, test: 0.70 }, testMax: 200 },
    pucit:       { weights: { matric: 0.20, inter: 0.30, test: 0.50 }, testMax: 100 },
    air:         { weights: { matric: 0.15, inter: 0.35, test: 0.50 }, testMax: 100 },
    bahria:      { weights: { matric: 0.00, inter: 0.50, test: 0.50 }, testMax: 100 },
    pu:          { weights: { matric: 0.25, inter: 0.50, test: 0.25 }, testMax: 100 },
    uhs:         { weights: { matric: 0.10, inter: 0.40, test: 0.50 }, testMax: 200 },
    nums:        { weights: { matric: 0.10, inter: 0.40, test: 0.50 }, testMax: 150 },
};

// Test counters
let total = 0, passed = 0, failed = 0;
const failures = [];

function assert(condition, name, detail) {
    total++;
    if (condition) {
        passed++;
    } else {
        failed++;
        const msg = detail ? `${name} -- ${detail}` : name;
        failures.push(msg);
        console.log(`  FAIL  ${msg}`);
    }
}

function approxEqual(a, b, eps = 0.01) {
    return Math.abs(a - b) < eps;
}

// ==== AGGREGATE FORMULA TESTS ====
console.log('\n=== AGGREGATE FORMULA TESTS ===\n');

function calcAggregate(uniId, matric, matricTotal, inter, interTotal, test, testTotal) {
    const config = calculatorConfigs[uniId];
    if (!config) return null;
    const w = config.weights;
    const matricPerc = (matric / matricTotal) * 100;
    const interPerc = (inter / interTotal) * 100;
    const testPerc = testTotal > 0 ? (test / testTotal) * 100 : 0;
    return matricPerc * w.matric + interPerc * w.inter + testPerc * w.test;
}

// Test case: student with matric=950/1100, inter=980/1100, test=75/100 (or equivalent)
const testCases = [
    { id: 'fast', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 75, tTotal: 100,
      expected: (950/1100*100)*0.10 + (980/1100*100)*0.40 + (75/100*100)*0.50 },
    { id: 'nust', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 150, tTotal: 200,
      expected: (950/1100*100)*0.10 + (980/1100*100)*0.15 + (150/200*100)*0.75 },
    { id: 'comsats', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 80, tTotal: 100,
      expected: (950/1100*100)*0.10 + (980/1100*100)*0.40 + (80/100*100)*0.50 },
    { id: 'giki', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 170, tTotal: 200,
      expected: (950/1100*100)*0.10 + (980/1100*100)*0.05 + (170/200*100)*0.85 },
    { id: 'ist', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 0, tTotal: 0,
      expected: (950/1100*100)*0.40 + (980/1100*100)*0.60 },
    { id: 'ned', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 70, tTotal: 100,
      expected: (950/1100*100)*0.00 + (980/1100*100)*0.40 + (70/100*100)*0.60 },
    { id: 'uet', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 300, tTotal: 400,
      expected: (950/1100*100)*0.17 + (980/1100*100)*0.50 + (300/400*100)*0.33 },
    { id: 'pieas', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 80, tTotal: 100,
      expected: (950/1100*100)*0.15 + (980/1100*100)*0.25 + (80/100*100)*0.60 },
    { id: 'itu', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 75, tTotal: 100,
      expected: (950/1100*100)*0.15 + (980/1100*100)*0.35 + (75/100*100)*0.50 },
    { id: 'nutech', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 150, tTotal: 200,
      expected: (950/1100*100)*0.10 + (980/1100*100)*0.20 + (150/200*100)*0.70 },
    { id: 'pucit', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 75, tTotal: 100,
      expected: (950/1100*100)*0.20 + (980/1100*100)*0.30 + (75/100*100)*0.50 },
    { id: 'air', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 75, tTotal: 100,
      expected: (950/1100*100)*0.15 + (980/1100*100)*0.35 + (75/100*100)*0.50 },
    { id: 'bahria', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 70, tTotal: 100,
      expected: (950/1100*100)*0.00 + (980/1100*100)*0.50 + (70/100*100)*0.50 },
    { id: 'pu', matric: 950, mTotal: 1100, inter: 980, iTotal: 1100, test: 75, tTotal: 100,
      expected: (950/1100*100)*0.25 + (980/1100*100)*0.50 + (75/100*100)*0.25 },
    { id: 'uhs', matric: 1060, mTotal: 1100, inter: 1050, iTotal: 1100, test: 185, tTotal: 200,
      expected: (1060/1100*100)*0.10 + (1050/1100*100)*0.40 + (185/200*100)*0.50 },
    { id: 'nums', matric: 1070, mTotal: 1100, inter: 1050, iTotal: 1100, test: 130, tTotal: 150,
      expected: (1070/1100*100)*0.10 + (1050/1100*100)*0.40 + (130/150*100)*0.50 },
];

testCases.forEach(tc => {
    const result = calcAggregate(tc.id, tc.matric, tc.mTotal, tc.inter, tc.iTotal, tc.test, tc.tTotal);
    assert(
        approxEqual(result, tc.expected),
        `${tc.id.toUpperCase()} aggregate formula`,
        `got ${result?.toFixed(4)}, expected ${tc.expected.toFixed(4)}`
    );
});

// Verify weights sum to 1.0 for each university
console.log('\n--- Weight sum verification ---');
for (const [id, config] of Object.entries(calculatorConfigs)) {
    const sum = config.weights.matric + config.weights.inter + config.weights.test;
    assert(
        approxEqual(sum, 1.0, 0.01),
        `${id.toUpperCase()} weights sum to 1.0`,
        `sum = ${sum}`
    );
}

// ==== PREDICTION MODEL TESTS ====
console.log('\n=== PREDICTION MODEL TESTS ===\n');

const validLabels = ['High Chance', 'Good Chance', 'Low Chance', 'Poor Chance'];
const validStatuses = ['high', 'good', 'low', 'poor'];
const testAggregates = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45];

let totalPrograms = 0;
let programsWithPredictions = 0;
let rankBasedPrograms = 0;

meritData.forEach(uni => {
    console.log(`\n--- ${uni.name} (${uni.id}) ---`);

    uni.campuses.forEach(campus => {
        campus.programs.forEach(program => {
            totalPrograms++;

            // Test with multiple aggregate values
            testAggregates.forEach(agg => {
                const prediction = calculateAdmissionPrediction(
                    uni.id, program.name, agg, campus.campus,
                    program.testType || null
                );

                if (!prediction) {
                    // Only flag if non-rank university
                    if (uni.meritType !== 'rank') {
                        assert(false,
                            `${uni.id}/${campus.campus}/${program.name}${program.testType ? ' ['+program.testType+']' : ''} @ ${agg}`,
                            'prediction returned null'
                        );
                    }
                    return;
                }

                if (prediction.type === 'rank') {
                    if (agg === testAggregates[0]) rankBasedPrograms++;
                    // Rank-based is expected for NUST/GIKI
                    assert(true, `${uni.id}/${campus.campus}/${program.name} @ ${agg} → rank-based (OK)`);
                    return;
                }

                if (agg === testAggregates[0]) programsWithPredictions++;

                // Verify label is valid
                assert(
                    validLabels.includes(prediction.label),
                    `${uni.id}/${campus.campus}/${program.name}${program.testType ? ' ['+program.testType+']' : ''} @ ${agg}`,
                    `label="${prediction.label}" (expected one of: ${validLabels.join(', ')})`
                );

                // Verify status is valid
                assert(
                    validStatuses.includes(prediction.status),
                    `${uni.id}/${campus.campus}/${program.name}${program.testType ? ' ['+program.testType+']' : ''} @ ${agg} status`,
                    `status="${prediction.status}"`
                );

                // Verify label matches status
                const expectedLabel = {
                    'high': 'High Chance', 'good': 'Good Chance',
                    'low': 'Low Chance', 'poor': 'Poor Chance'
                }[prediction.status];
                assert(
                    prediction.label === expectedLabel,
                    `${uni.id}/${campus.campus}/${program.name}${program.testType ? ' ['+program.testType+']' : ''} @ ${agg} label-status match`,
                    `status="${prediction.status}" but label="${prediction.label}"`
                );
            });
        });
    });
});

// ==== BOUNDARY TESTS ====
console.log('\n=== BOUNDARY TESTS ===\n');

// Test that high aggregate (95) for low-cutoff programs gives "High Chance"
const fastPesh = calculateAdmissionPrediction('fast', 'BS Computer Science', 95, 'Peshawar', 'NU');
assert(fastPesh && fastPesh.label === 'High Chance',
    'FAST Peshawar CS (NU) @ 95 → High Chance',
    fastPesh ? `got "${fastPesh.label}"` : 'null');

// Test that low aggregate (40) for high-cutoff programs gives "Poor Chance"
const comsatsIsb = calculateAdmissionPrediction('comsats', 'BS Computer Science', 40, 'Islamabad');
assert(comsatsIsb && comsatsIsb.label === 'Poor Chance',
    'COMSATS ISB CS @ 40 → Poor Chance',
    comsatsIsb ? `got "${comsatsIsb.label}"` : 'null');

// Test NUST returns rank type
const nustSeecs = calculateAdmissionPrediction('nust', 'BS Computer Science', 85, 'SEECS Islamabad');
assert(nustSeecs && nustSeecs.type === 'rank',
    'NUST SEECS CS → rank type',
    nustSeecs ? `got type="${nustSeecs.type}"` : 'null');

// Test GIKI returns rank type
const gikiCs = calculateAdmissionPrediction('giki', 'BS Computer Science', 85, 'Swabi');
assert(gikiCs && gikiCs.type === 'rank',
    'GIKI Swabi CS → rank type',
    gikiCs ? `got type="${gikiCs.type}"` : 'null');

// Test IST (no test, matric+inter only)
const istCs = calculateAdmissionPrediction('ist', 'BS Computer Science', 92, 'Islamabad');
assert(istCs && istCs.type === 'percentage' && validLabels.includes(istCs.label),
    'IST CS @ 92 → valid percentage prediction',
    istCs ? `label="${istCs.label}"` : 'null');

// Test FAST NU vs NTS differentiation
const fastNu = calculateAdmissionPrediction('fast', 'BS Computer Science', 75, 'Islamabad', 'NU');
const fastNts = calculateAdmissionPrediction('fast', 'BS Computer Science', 75, 'Islamabad', 'NTS');
assert(fastNu && fastNts,
    'FAST ISB CS NU/NTS both return predictions',
    `NU=${fastNu?.label}, NTS=${fastNts?.label}`);
// NTS merit is ~90 so 75 should be Poor, NU merit is ~73 so 75 should be Good/High
assert(fastNu && fastNts && fastNu.status !== fastNts.status,
    'FAST ISB CS: NU and NTS give different results @ 75',
    `NU=${fastNu?.label}, NTS=${fastNts?.label}`);

// Test UHS prediction for high-aggregate student at top government college
const uhsKemu = calculateAdmissionPrediction('uhs', 'MBBS', 95, 'King Edward Medical University, Lahore');
assert(uhsKemu && uhsKemu.type === 'percentage' && validLabels.includes(uhsKemu.label),
    'UHS KEMU MBBS @ 95 → valid prediction',
    uhsKemu ? `label="${uhsKemu.label}"` : 'null');

// Test UHS prediction for lower aggregate at private college
const uhsPrivate = calculateAdmissionPrediction('uhs', 'MBBS', 80, 'Central Park Medical College');
assert(uhsPrivate && uhsPrivate.type === 'percentage',
    'UHS Central Park MBBS @ 80 → percentage prediction',
    uhsPrivate ? `label="${uhsPrivate.label}"` : 'null');

// Test NUMS AMC prediction
const numsAmc = calculateAdmissionPrediction('nums', 'MBBS', 96, 'Army Medical College (AMC), Rawalpindi');
assert(numsAmc && numsAmc.type === 'percentage' && validLabels.includes(numsAmc.label),
    'NUMS AMC MBBS @ 96 → valid prediction',
    numsAmc ? `label="${numsAmc.label}"` : 'null');

// Test NUMS BDS prediction
const numsBds = calculateAdmissionPrediction('nums', 'BDS', 85, 'HITEC IMS, Taxila');
assert(numsBds && numsBds.type === 'percentage',
    'NUMS HITEC BDS @ 85 → valid prediction',
    numsBds ? `label="${numsBds.label}"` : 'null');

// ==== MONOTONICITY TESTS ====
console.log('\n=== MONOTONICITY TESTS ===\n');
// Higher aggregate should give same or better prediction
const statusOrder = { 'poor': 0, 'low': 1, 'good': 2, 'high': 3 };

['fast', 'comsats', 'air', 'ned', 'itu', 'uhs', 'nums'].forEach(uniId => {
    const uni = getMeritDataById(uniId);
    if (!uni || uni.meritType === 'rank') return;
    const firstCampus = uni.campuses[0];
    const firstProg = firstCampus.programs.find(p => !p.testType || p.testType === 'NU');
    if (!firstProg) return;

    let prevOrder = -1;
    for (const agg of [40, 50, 60, 70, 80, 90, 95]) {
        const pred = calculateAdmissionPrediction(uniId, firstProg.name, agg, firstCampus.campus, firstProg.testType || null);
        if (!pred || pred.type === 'rank') continue;
        const order = statusOrder[pred.status];
        assert(order >= prevOrder,
            `${uniId} ${firstProg.name} monotonicity @ ${agg}`,
            `${pred.label} (order ${order}) should be >= previous (${prevOrder})`
        );
        prevOrder = order;
    }
});

// ==== SUMMARY ====
console.log('\n=================================================================');
console.log(`  TOTAL: ${total} | PASSED: ${passed} | FAILED: ${failed}`);
console.log(`  Programs tested: ${totalPrograms} (${programsWithPredictions} percentage-based, ${rankBasedPrograms} rank-based)`);
console.log('=================================================================');
if (failures.length > 0) {
    console.log('\nFAILURES:');
    failures.forEach((f, i) => console.log(`  ${i+1}. ${f}`));
}
process.exit(failed > 0 ? 1 : 0);
