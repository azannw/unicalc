// =====================================================
// COMPREHENSIVE TEST SUITE — IBCC Equivalency Calculator
// 100+ test cases covering every edge case
// =====================================================

// ===== EXTRACT CORE LOGIC =====
const FIXED_MARKS = { 'A': 85, 'B': 75, 'C': 65, 'D': 55, 'E': 45 };
const EDEXCEL_MAP = { '9': 'A*', '8': 'A*', '7': 'A', '6': 'B', '5': 'B', '4': 'C', '3': 'D', '2': 'E' };
const A_STAR = {
    '2025': {
        'o-level': { 'Mathematics': 95, 'Additional Mathematics': 95, 'Physics': 95, 'Chemistry': 94, 'Biology': 94, 'Islamiyat': 94, 'Computer Science': 94, 'English': 93, 'Urdu': 93, 'Pakistan Studies': 93, '_default': 93 },
        'a-level': { 'Physics': 95, 'Chemistry': 94, 'Biology': 94, 'Mathematics': 94, 'Further Mathematics': 94, 'Computer Science': 93, '_default': 93 }
    },
    '2024': {
        'o-level': { 'Mathematics': 95, 'Additional Mathematics': 95, 'Physics': 94, 'Chemistry': 94, 'Biology': 94, 'Islamiyat': 94, 'Computer Science': 94, 'English': 93, 'Urdu': 93, 'Pakistan Studies': 93, '_default': 93 },
        'a-level': { 'Physics': 95, 'Chemistry': 94, 'Biology': 94, 'Mathematics': 94, 'Computer Science': 93, '_default': 93 }
    },
    '2023': {
        'o-level': { 'Mathematics': 95, 'Islamiyat': 95, 'Physics': 94, 'Chemistry': 94, 'Biology': 94, 'Computer Science': 94, 'English': 93, 'Urdu': 93, 'Pakistan Studies': 93, '_default': 94 },
        'a-level': { 'Physics': 95, 'Chemistry': 94, 'Biology': 94, 'Mathematics': 94, 'Computer Science': 93, '_default': 93 }
    }
};
const O_COMPULSORY_PK = ['English', 'Mathematics', 'Urdu', 'Islamiyat', 'Pakistan Studies'];
const O_COMPULSORY_OS = ['English', 'Mathematics'];
const O_ELECTIVES = ['Physics','Chemistry','Biology','Computer Science','Additional Mathematics','Accounting','Business Studies','Economics','Art & Design','Sociology','Geography','History','Environmental Management','Food & Nutrition','Travel & Tourism','Global Perspectives','Foreign Language','Urdu','Islamiyat','Pakistan Studies'];
const A_SUBJECTS = ['Physics','Chemistry','Biology','Mathematics','Further Mathematics','Computer Science','Accounting','Business','Economics','Psychology','Sociology','English','Law','Art & Design','Thinking Skills','Media Studies','Urdu'];
const STREAMS = {
    'Pre-Medical': ['Biology', 'Chemistry', 'Physics'],
    'Pre-Engineering': ['Mathematics', 'Physics', 'Chemistry'],
    'Computer Science': ['Mathematics', 'Physics', 'Computer Science'],
    'Commerce': ['Accounting', 'Business', 'Economics']
};

let mode, board, session;
function getMarks(grade, subject, level) {
    if (!grade) return null;
    let effective = grade;
    if (board === 'edexcel' && EDEXCEL_MAP[grade]) effective = EDEXCEL_MAP[grade];
    if (effective === 'A*') { const s = A_STAR[session] || A_STAR['2025']; const l = s[level] || {}; return l[subject] || l['_default'] || 90; }
    return FIXED_MARKS[effective] || 0;
}
function getCompulsory() { return mode === 'pakistan' ? O_COMPULSORY_PK : O_COMPULSORY_OS; }
function getRequiredOCount() { return mode === 'pakistan' ? 8 : 5; }
function getElectivesFor(c) { return O_ELECTIVES.filter(s => !c.includes(s)); }
function detectStream(subjects) {
    const names = subjects.map(s => s.name).filter(Boolean);
    for (const [stream, required] of Object.entries(STREAMS)) { if (required.every(r => names.includes(r))) return stream; }
    return 'General / Humanities';
}
function bestOf(subjects, count, locked) {
    const lockedSubs = subjects.filter(s => locked.includes(s.name) && s.grade);
    const electives = subjects.filter(s => !locked.includes(s.name) && s.grade);
    electives.sort((a, b) => (getMarks(b.grade, b.name, b.level) || 0) - (getMarks(a.grade, a.name, a.level) || 0));
    return [...lockedSubs, ...electives.slice(0, Math.max(0, count - lockedSubs.length))];
}
function calculate(oRows, aRows) {
    const oRequired = getRequiredOCount();
    const oFilled = oRows.filter(r => r.name && r.grade);
    if (oFilled.length < oRequired) return { error: 'Not enough O-Level subjects: ' + oFilled.length + '/' + oRequired };
    const comp = getCompulsory();
    const missingComp = comp.filter(c => !oFilled.find(r => r.name === c && r.grade));
    if (missingComp.length > 0) return { error: 'Missing compulsory: ' + missingComp.join(', ') };
    const oSelected = bestOf(oFilled.map(r => ({ ...r, marks: getMarks(r.grade, r.name, 'o-level') })), oRequired, comp);
    const oTotal = oSelected.reduce((sum, s) => sum + (getMarks(s.grade, s.name, 'o-level') || 0), 0);
    const oMax = oRequired * 100;
    let result = {
        oLevel: { subjects: oSelected, rawTotal: oTotal, rawMax: oMax,
            equivTotal: Math.round((oTotal / oMax) * 1100 * 100) / 100, equivMax: 1100,
            percentage: Math.round((oTotal / oMax) * 100 * 100) / 100,
            allFilled: oFilled, extraCount: Math.max(0, oFilled.length - oRequired) },
        aLevel: null, combined: null, stream: null
    };
    if (aRows !== null && aRows !== undefined) {
        const aFilled = aRows.filter(r => r.name && r.grade);
        if (aFilled.length < 3) return { error: 'Not enough A-Level subjects: ' + aFilled.length + '/3' };
        const aSorted = aFilled.map(r => ({ ...r, marks: getMarks(r.grade, r.name, 'a-level') })).sort((a, b) => b.marks - a.marks);
        const aSelected = aSorted.slice(0, 3);
        const aTotal = aSelected.reduce((sum, s) => sum + s.marks, 0);
        const combinedTotal = oTotal + aTotal;
        const combinedMax = oMax + 300;
        result.aLevel = { subjects: aSelected, rawTotal: aTotal, rawMax: 300,
            percentage: Math.round((aTotal / 300) * 100 * 100) / 100,
            allFilled: aFilled, extraCount: Math.max(0, aFilled.length - 3) };
        result.combined = { total: combinedTotal, max: combinedMax,
            percentage: Math.round((combinedTotal / combinedMax) * 100 * 100) / 100,
            oLevelShare: Math.round((oTotal / combinedTotal) * 100 * 10) / 10 };
        result.stream = detectStream(aSelected);
    }
    return result;
}

// ===== TEST FRAMEWORK =====
let passed = 0, failed = 0, total = 0;
function test(name, fn) {
    total++;
    try { fn(); passed++; console.log('  \x1b[32mPASS\x1b[0m ' + name); }
    catch (e) { failed++; console.log('  \x1b[31mFAIL\x1b[0m ' + name); console.log('       \x1b[33m' + e.message + '\x1b[0m'); }
}
function eq(a, b, l) { if (a !== b) throw new Error((l ? l + ': ' : '') + 'Expected ' + JSON.stringify(b) + ', got ' + JSON.stringify(a)); }
function approx(a, b, t, l) { if (Math.abs(a - b) > t) throw new Error((l ? l + ': ' : '') + 'Expected ~' + b + ' ±' + t + ', got ' + a); }
function sub(n, g, lv) { return { name: n, grade: g, level: lv || 'o-level' }; }

// ═══════════════════════════════════════════════════════
console.log('\n\x1b[1m══ 1. GRADE-TO-MARKS CONVERSION (Cambridge, 2025) ══\x1b[0m');
mode = 'pakistan'; board = 'cambridge'; session = '2025';
test('A* English O-Lvl → 93',       () => eq(getMarks('A*','English','o-level'), 93));
test('A* Mathematics O-Lvl → 95',   () => eq(getMarks('A*','Mathematics','o-level'), 95));
test('A* Physics O-Lvl → 95',       () => eq(getMarks('A*','Physics','o-level'), 95));
test('A* Chemistry O-Lvl → 94',     () => eq(getMarks('A*','Chemistry','o-level'), 94));
test('A* Biology O-Lvl → 94',       () => eq(getMarks('A*','Biology','o-level'), 94));
test('A* Urdu O-Lvl → 93',          () => eq(getMarks('A*','Urdu','o-level'), 93));
test('A* Islamiyat O-Lvl → 94',     () => eq(getMarks('A*','Islamiyat','o-level'), 94));
test('A* Pak Studies O-Lvl → 93',   () => eq(getMarks('A*','Pakistan Studies','o-level'), 93));
test('A* Comp Sci O-Lvl → 94',      () => eq(getMarks('A*','Computer Science','o-level'), 94));
test('A* Add Math O-Lvl → 95',      () => eq(getMarks('A*','Additional Mathematics','o-level'), 95));
test('A* unknown O-Lvl → 93 (def)', () => eq(getMarks('A*','Art & Design','o-level'), 93));
test('A → 85 (fixed)',              () => eq(getMarks('A','English','o-level'), 85));
test('B → 75 (fixed)',              () => eq(getMarks('B','English','o-level'), 75));
test('C → 65 (fixed)',              () => eq(getMarks('C','English','o-level'), 65));
test('D → 55 (fixed)',              () => eq(getMarks('D','English','o-level'), 55));
test('E → 45 (fixed)',              () => eq(getMarks('E','English','o-level'), 45));
test('A* Physics A-Lvl → 95',       () => eq(getMarks('A*','Physics','a-level'), 95));
test('A* Chemistry A-Lvl → 94',     () => eq(getMarks('A*','Chemistry','a-level'), 94));
test('A* Biology A-Lvl → 94',       () => eq(getMarks('A*','Biology','a-level'), 94));
test('A* Mathematics A-Lvl → 94',   () => eq(getMarks('A*','Mathematics','a-level'), 94));
test('A* Further Math A-Lvl → 94',  () => eq(getMarks('A*','Further Mathematics','a-level'), 94));
test('A* Comp Sci A-Lvl → 93',      () => eq(getMarks('A*','Computer Science','a-level'), 93));
test('A* unknown A-Lvl → 93 (def)', () => eq(getMarks('A*','Law','a-level'), 93));

console.log('\n\x1b[1m══ 2. SESSION YEAR VARIATIONS ══\x1b[0m');
session = '2024';
test('2024: A* Physics O → 94',        () => eq(getMarks('A*','Physics','o-level'), 94));
test('2024: A* Math O → 95 (same)',     () => eq(getMarks('A*','Mathematics','o-level'), 95));
test('2024: A grade still 85',          () => eq(getMarks('A','Physics','o-level'), 85));
session = '2023';
test('2023: A* Islamiyat O → 95',       () => eq(getMarks('A*','Islamiyat','o-level'), 95));
test('2023: A* Physics O → 94',         () => eq(getMarks('A*','Physics','o-level'), 94));
test('2023: default A* O → 94',         () => eq(getMarks('A*','Sociology','o-level'), 94));
session = '9999';
test('Unknown session → fallback 2025', () => eq(getMarks('A*','Physics','o-level'), 95));
session = '2025';

console.log('\n\x1b[1m══ 3. EDEXCEL 9-1 MAPPING ══\x1b[0m');
board = 'edexcel';
test('9 → A* → 93 (English)',  () => eq(getMarks('9','English','o-level'), 93));
test('8 → A* → 95 (Math)',     () => eq(getMarks('8','Mathematics','o-level'), 95));
test('9 → A* → 95 (Physics)',  () => eq(getMarks('9','Physics','o-level'), 95));
test('7 → A → 85',             () => eq(getMarks('7','Mathematics','o-level'), 85));
test('6 → B → 75',             () => eq(getMarks('6','Physics','o-level'), 75));
test('5 → B → 75',             () => eq(getMarks('5','Physics','o-level'), 75));
test('4 → C → 65',             () => eq(getMarks('4','Chemistry','o-level'), 65));
test('3 → D → 55',             () => eq(getMarks('3','Biology','o-level'), 55));
test('2 → E → 45',             () => eq(getMarks('2','English','o-level'), 45));
test('1 → unmapped → 0',       () => eq(getMarks('1','English','o-level'), 0));
board = 'cambridge';

console.log('\n\x1b[1m══ 4. NULL / EMPTY / INVALID GRADES ══\x1b[0m');
test('Empty string → null',    () => eq(getMarks('','English','o-level'), null));
test('Null → null',            () => eq(getMarks(null,'English','o-level'), null));
test('Undefined → null',       () => eq(getMarks(undefined,'English','o-level'), null));
test('"F" → 0',               () => eq(getMarks('F','English','o-level'), 0));
test('"G" → 0',               () => eq(getMarks('G','English','o-level'), 0));
test('"U" → 0',               () => eq(getMarks('U','English','o-level'), 0));
test('lowercase "a" → 0',     () => eq(getMarks('a','English','o-level'), 0));
test('lowercase "a*" → 0',    () => eq(getMarks('a*','English','o-level'), 0));
test('random "XYZ" → 0',      () => eq(getMarks('XYZ','English','o-level'), 0));
test('numeric "85" → 0',      () => eq(getMarks('85','English','o-level'), 0));

console.log('\n\x1b[1m══ 5. O-LEVEL MATRIC EQUIVALENCY (PK) ══\x1b[0m');
mode = 'pakistan'; board = 'cambridge'; session = '2025';
test('All A*s → 751/800 → 1032.63/1100 → 93.88%', () => { const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Urdu','A*'),sub('Islamiyat','A*'),sub('Pakistan Studies','A*'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*')], null); eq(r.oLevel.rawTotal, 751); approx(r.oLevel.equivTotal, 1032.63, 0.01); approx(r.oLevel.percentage, 93.88, 0.01); });
test('All As → 680/800 → 935/1100 → 85%', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','A'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')], null); eq(r.oLevel.rawTotal, 680); eq(r.oLevel.equivTotal, 935); eq(r.oLevel.percentage, 85); });
test('All Bs → 600/800 → 825/1100 → 75%', () => { const r = calculate([sub('English','B'),sub('Mathematics','B'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','B'),sub('Physics','B'),sub('Chemistry','B'),sub('Biology','B')], null); eq(r.oLevel.rawTotal, 600); eq(r.oLevel.equivTotal, 825); eq(r.oLevel.percentage, 75); });
test('All Cs → 520/800 → 715/1100 → 65%', () => { const r = calculate([sub('English','C'),sub('Mathematics','C'),sub('Urdu','C'),sub('Islamiyat','C'),sub('Pakistan Studies','C'),sub('Physics','C'),sub('Chemistry','C'),sub('Biology','C')], null); eq(r.oLevel.rawTotal, 520); eq(r.oLevel.percentage, 65); });
test('All Ds → 440/800 → 55%', () => { const r = calculate([sub('English','D'),sub('Mathematics','D'),sub('Urdu','D'),sub('Islamiyat','D'),sub('Pakistan Studies','D'),sub('Physics','D'),sub('Chemistry','D'),sub('Biology','D')], null); eq(r.oLevel.rawTotal, 440); eq(r.oLevel.percentage, 55); });
test('All Es → 360/800 → 45%', () => { const r = calculate([sub('English','E'),sub('Mathematics','E'),sub('Urdu','E'),sub('Islamiyat','E'),sub('Pakistan Studies','E'),sub('Physics','E'),sub('Chemistry','E'),sub('Biology','E')], null); eq(r.oLevel.rawTotal, 360); eq(r.oLevel.percentage, 45); });
test('Mixed → 660/800 → 82.5%', () => { const r = calculate([sub('English','A'),sub('Mathematics','A*'),sub('Urdu','B'),sub('Islamiyat','A'),sub('Pakistan Studies','B'),sub('Physics','A*'),sub('Chemistry','A'),sub('Biology','C')], null); eq(r.oLevel.rawTotal, 660); eq(r.oLevel.percentage, 82.5); });

console.log('\n\x1b[1m══ 6. O-LEVEL MATRIC EQUIVALENCY (OVERSEAS) ══\x1b[0m');
mode = 'overseas';
test('OS compulsory = [English, Maths]', () => { eq(getCompulsory().length, 2); eq(getRequiredOCount(), 5); });
test('All A*s → 471/500 → 1036.2/1100', () => { const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*')], null); eq(r.oLevel.rawTotal, 471); eq(r.oLevel.rawMax, 500); approx(r.oLevel.equivTotal, 1036.2, 0.01); });
test('All As → 425/500 → 935/1100', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')], null); eq(r.oLevel.rawTotal, 425); eq(r.oLevel.equivTotal, 935); });
test('Urdu/Isl/PS available as electives', () => { const el = getElectivesFor(getCompulsory()); eq(el.includes('Urdu'), true); eq(el.includes('Islamiyat'), true); eq(el.includes('Pakistan Studies'), true); });
test('Can use Urdu/Isl as electives', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C')], null); eq(!!r.error, false); eq(r.oLevel.rawTotal, 385); });
mode = 'pakistan';

console.log('\n\x1b[1m══ 7. COMBINED HSSC EQUIVALENCY ══\x1b[0m');
mode = 'pakistan'; board = 'cambridge'; session = '2025';
test('All A*s → O=751+A=283 → 1034/1100 → 94%', () => { const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Urdu','A*'),sub('Islamiyat','A*'),sub('Pakistan Studies','A*'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*')],[sub('Physics','A*','a-level'),sub('Chemistry','A*','a-level'),sub('Mathematics','A*','a-level')]); eq(r.combined.total, 1034); eq(r.combined.max, 1100); approx(r.combined.percentage, 94, 0.01); eq(r.aLevel.rawTotal, 283); });
test('All As → O=680+A=255 → 935/1100 → 85%', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','A'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')],[sub('Physics','A','a-level'),sub('Chemistry','A','a-level'),sub('Biology','A','a-level')]); eq(r.combined.total, 935); eq(r.combined.percentage, 85); });
test('All Es → O=360+A=135 → 495/1100 → 45%', () => { const r = calculate([sub('English','E'),sub('Mathematics','E'),sub('Urdu','E'),sub('Islamiyat','E'),sub('Pakistan Studies','E'),sub('Physics','E'),sub('Chemistry','E'),sub('Biology','E')],[sub('Physics','E','a-level'),sub('Chemistry','E','a-level'),sub('Biology','E','a-level')]); eq(r.combined.total, 495); eq(r.combined.percentage, 45); });
test('Weak O + Strong A → 610+283=893', () => { const r = calculate([sub('English','B'),sub('Mathematics','A'),sub('Urdu','C'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')],[sub('Physics','A*','a-level'),sub('Chemistry','A*','a-level'),sub('Biology','A*','a-level')]); eq(r.oLevel.rawTotal, 610); eq(r.aLevel.rawTotal, 283); eq(r.combined.total, 893); });
test('Strong O + Weak A → 751+135=886', () => { const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Urdu','A*'),sub('Islamiyat','A*'),sub('Pakistan Studies','A*'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*')],[sub('Physics','E','a-level'),sub('Chemistry','E','a-level'),sub('Biology','E','a-level')]); eq(r.combined.total, 886); approx(r.combined.percentage, 80.55, 0.01); });
test('Overseas combined → 688/800 → 86%', () => { mode='overseas'; const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')],[sub('Physics','A*','a-level'),sub('Chemistry','A','a-level'),sub('Biology','B','a-level')]); eq(r.combined.total, 688); eq(r.combined.max, 800); eq(r.combined.percentage, 86); mode='pakistan'; });

console.log('\n\x1b[1m══ 8. CONTRIBUTION WEIGHT ══\x1b[0m');
test('PK: O-Level share ~72.7%', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','A'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')],[sub('Physics','A','a-level'),sub('Chemistry','A','a-level'),sub('Biology','A','a-level')]); approx(r.combined.oLevelShare, 72.7, 0.2); });
test('OS: O-Level share ~62.5%', () => { mode='overseas'; const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')],[sub('Physics','A','a-level'),sub('Chemistry','A','a-level'),sub('Biology','A','a-level')]); approx(r.combined.oLevelShare, 62.5, 0.1); mode='pakistan'; });

console.log('\n\x1b[1m══ 9. STREAM DETECTION ══\x1b[0m');
test('Pre-Medical', ()      => eq(detectStream([{name:'Biology'},{name:'Chemistry'},{name:'Physics'}]), 'Pre-Medical'));
test('Pre-Engineering', ()   => eq(detectStream([{name:'Mathematics'},{name:'Physics'},{name:'Chemistry'}]), 'Pre-Engineering'));
test('Computer Science', ()  => eq(detectStream([{name:'Mathematics'},{name:'Physics'},{name:'Computer Science'}]), 'Computer Science'));
test('Commerce', ()          => eq(detectStream([{name:'Accounting'},{name:'Business'},{name:'Economics'}]), 'Commerce'));
test('General (random)', ()  => eq(detectStream([{name:'Psychology'},{name:'Sociology'},{name:'Law'}]), 'General / Humanities'));
test('Partial match → General', () => eq(detectStream([{name:'Mathematics'},{name:'Physics'},{name:'Economics'}]), 'General / Humanities'));
test('Empty → General', ()   => eq(detectStream([{name:''},{name:''},{name:''}]), 'General / Humanities'));
test('Full calc → Pre-Eng',  () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')],[sub('Mathematics','A*','a-level'),sub('Physics','A','a-level'),sub('Chemistry','B','a-level')]); eq(r.stream, 'Pre-Engineering'); });
test('Full calc → Pre-Med',  () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')],[sub('Biology','A*','a-level'),sub('Chemistry','A','a-level'),sub('Physics','B','a-level')]); eq(r.stream, 'Pre-Medical'); });
test('Full calc → Commerce', () => { const r = calculate([sub('English','B'),sub('Mathematics','A'),sub('Urdu','C'),sub('Islamiyat','C'),sub('Pakistan Studies','B'),sub('Accounting','A*'),sub('Business Studies','A'),sub('Economics','A')],[sub('Accounting','A*','a-level'),sub('Business','A','a-level'),sub('Economics','A','a-level')]); eq(r.stream, 'Commerce'); });

console.log('\n\x1b[1m══ 10. BEST-OF SELECTION ══\x1b[0m');
test('Best 8/10: drops 2 lowest electives', () => { const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Urdu','A*'),sub('Islamiyat','A*'),sub('Pakistan Studies','A*'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*'),sub('Computer Science','D'),sub('Economics','E')], null); eq(r.oLevel.rawTotal, 751); eq(r.oLevel.extraCount, 2); eq(r.oLevel.subjects.map(s=>s.name).includes('Computer Science'), false); });
test('Best 8/9: CS(A=85) over Bio(B=75)', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','B'),sub('Computer Science','A')], null); eq(r.oLevel.extraCount, 1); eq(r.oLevel.subjects.map(s=>s.name).includes('Computer Science'), true); eq(r.oLevel.subjects.map(s=>s.name).includes('Biology'), false); });
test('Best 8/8: no extra', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')], null); eq(r.oLevel.extraCount, 0); eq(r.oLevel.subjects.length, 8); });
test('Best 3/4 A-Lvl: drops Bio(C)', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')],[sub('Physics','A*','a-level'),sub('Chemistry','A','a-level'),sub('Mathematics','A*','a-level'),sub('Biology','C','a-level')]); eq(r.aLevel.rawTotal, 274); eq(r.aLevel.extraCount, 1); eq(r.aLevel.subjects.map(s=>s.name).includes('Biology'), false); });
test('Best 3/5 A-Lvl: drops 2 lowest', () => { const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Urdu','A*'),sub('Islamiyat','A*'),sub('Pakistan Studies','A*'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*')],[sub('Physics','A*','a-level'),sub('Chemistry','B','a-level'),sub('Mathematics','A','a-level'),sub('Biology','A*','a-level'),sub('Computer Science','C','a-level')]); eq(r.aLevel.rawTotal, 274); eq(r.aLevel.extraCount, 2); });
test('Compulsory kept even if low', () => { const r = calculate([sub('English','E'),sub('Mathematics','E'),sub('Urdu','E'),sub('Islamiyat','E'),sub('Pakistan Studies','E'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*'),sub('Computer Science','A*'),sub('Accounting','A*')], null); eq(r.oLevel.rawTotal, 225+95+94+94); eq(r.oLevel.subjects.map(s=>s.name).includes('English'), true); eq(r.oLevel.extraCount, 2); });
test('OS best 5/7: drops 2', () => { mode='overseas'; const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*'),sub('Computer Science','B'),sub('Economics','C')], null); eq(r.oLevel.rawTotal, 471); eq(r.oLevel.extraCount, 2); mode='pakistan'; });

console.log('\n\x1b[1m══ 11. VALIDATION ERRORS ══\x1b[0m');
mode = 'pakistan'; board = 'cambridge'; session = '2025';
test('5/8 O-Lvl → error', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C')], null); eq(!!r.error, true); eq(r.error.includes('5/8'), true); });
test('7/8 O-Lvl → error', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A')], null); eq(!!r.error, true); });
test('0 subjects → error', () => { eq(!!calculate([], null).error, true); });
test('Missing Urdu → error', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Physics','A'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Chemistry','A'),sub('Biology','B'),sub('Computer Science','B')], null); eq(r.error.includes('Urdu'), true); });
test('Missing Isl+PS → error (both listed)', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A'),sub('Computer Science','B'),sub('Economics','B')], null); eq(r.error.includes('Islamiyat'), true); eq(r.error.includes('Pakistan Studies'), true); });
test('2/3 A-Lvl → error', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')],[sub('Physics','A*','a-level'),sub('Chemistry','A','a-level')]); eq(r.error.includes('2/3'), true); });
test('1/3 A-Lvl → error', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')],[sub('Physics','A*','a-level')]); eq(r.error.includes('1/3'), true); });
test('0/3 A-Lvl → error', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')],[]); eq(r.error.includes('0/3'), true); });
test('No name + grade → ignored', () => { eq(!!calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),{name:'',grade:'A*',level:'o-level'}], null).error, true); });
test('Name + no grade → ignored', () => { eq(!!calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','B'),sub('Islamiyat','B'),sub('Pakistan Studies','C'),sub('Physics','A'),sub('Chemistry','A'),{name:'Biology',grade:'',level:'o-level'}], null).error, true); });
test('OS: no error w/o Urdu/Isl/PS', () => { mode='overseas'; eq(!!calculate([sub('English','A'),sub('Mathematics','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','B')], null).error, false); mode='pakistan'; });
test('OS: error if English missing', () => { mode='overseas'; eq(calculate([sub('Physics','A'),sub('Mathematics','A'),sub('Chemistry','A'),sub('Biology','A'),sub('Computer Science','B')], null).error.includes('English'), true); mode='pakistan'; });
test('OS: error if Maths missing', () => { mode='overseas'; eq(calculate([sub('English','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A'),sub('Computer Science','B')], null).error.includes('Mathematics'), true); mode='pakistan'; });

console.log('\n\x1b[1m══ 12. EDEXCEL END-TO-END ══\x1b[0m');
board = 'edexcel'; mode = 'pakistan';
test('All 9s → 751 (same as Cambridge A*s)', () => { eq(calculate([sub('English','9'),sub('Mathematics','9'),sub('Urdu','9'),sub('Islamiyat','9'),sub('Pakistan Studies','9'),sub('Physics','9'),sub('Chemistry','9'),sub('Biology','9')], null).oLevel.rawTotal, 751); });
test('All 7s → 680 (same as As)', () => { eq(calculate([sub('English','7'),sub('Mathematics','7'),sub('Urdu','7'),sub('Islamiyat','7'),sub('Pakistan Studies','7'),sub('Physics','7'),sub('Chemistry','7'),sub('Biology','7')], null).oLevel.rawTotal, 680); });
test('Mixed 9-1 → 630', () => { eq(calculate([sub('English','7'),sub('Mathematics','9'),sub('Urdu','6'),sub('Islamiyat','5'),sub('Pakistan Studies','4'),sub('Physics','8'),sub('Chemistry','7'),sub('Biology','3')], null).oLevel.rawTotal, 630); });
board = 'cambridge';

console.log('\n\x1b[1m══ 13. SUBJECT LIST INTEGRITY ══\x1b[0m');
test('PK compulsory = 5', () => eq(O_COMPULSORY_PK.length, 5));
test('OS compulsory = 2', () => eq(O_COMPULSORY_OS.length, 2));
test('O-Lvl electives ≥ 15', () => eq(O_ELECTIVES.length >= 15, true));
test('A-Lvl subjects ≥ 15', () => eq(A_SUBJECTS.length >= 15, true));
test('No dupe O electives', () => eq(new Set(O_ELECTIVES).size, O_ELECTIVES.length));
test('No dupe A subjects', () => eq(new Set(A_SUBJECTS).size, A_SUBJECTS.length));
test('Eng/Math not in electives', () => { eq(O_ELECTIVES.includes('English'), false); eq(O_ELECTIVES.includes('Mathematics'), false); });
test('All stream subjects in A list', () => { Object.values(STREAMS).flat().forEach(s => eq(A_SUBJECTS.includes(s), true, s)); });

console.log('\n\x1b[1m══ 14. EDGE CASES & BOUNDARIES ══\x1b[0m');
mode = 'pakistan'; board = 'cambridge'; session = '2025';
test('Exact 8 O-Lvl works', () => { eq(!!calculate([sub('English','E'),sub('Mathematics','E'),sub('Urdu','E'),sub('Islamiyat','E'),sub('Pakistan Studies','E'),sub('Physics','E'),sub('Chemistry','E'),sub('Biology','E')], null).error, false); });
test('Exact 5 O-Lvl OS works', () => { mode='overseas'; eq(!!calculate([sub('English','E'),sub('Mathematics','E'),sub('Physics','E'),sub('Chemistry','E'),sub('Biology','E')], null).error, false); mode='pakistan'; });
test('Exact 3 A-Lvl works', () => { eq(!!calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','A'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')],[sub('Physics','E','a-level'),sub('Chemistry','E','a-level'),sub('Biology','E','a-level')]).error, false); });
test('O-Level only → no combined/stream', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','A'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')], null); eq(r.aLevel, null); eq(r.combined, null); eq(r.stream, null); });
test('Matric formula: (raw/max)*1100', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','A'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')], null); eq(r.oLevel.equivTotal, 935); eq(r.oLevel.equivMax, 1100); });
test('PK combined max = 1100', () => { const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Urdu','A'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')],[sub('Physics','A','a-level'),sub('Chemistry','A','a-level'),sub('Biology','A','a-level')]); eq(r.combined.max, 1100); });
test('OS combined max = 800', () => { mode='overseas'; const r = calculate([sub('English','A'),sub('Mathematics','A'),sub('Physics','A'),sub('Chemistry','A'),sub('Biology','A')],[sub('Physics','A','a-level'),sub('Chemistry','A','a-level'),sub('Biology','A','a-level')]); eq(r.combined.max, 800); mode='pakistan'; });

console.log('\n\x1b[1m══ 15. REAL-WORLD SCENARIOS ══\x1b[0m');
mode = 'pakistan'; board = 'cambridge'; session = '2025';
test('NUST Pre-Eng applicant → 973/1100 → 88.45%', () => { const r = calculate([sub('English','A'),sub('Mathematics','A*'),sub('Urdu','B'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Computer Science','A')],[sub('Mathematics','A*','a-level'),sub('Physics','A*','a-level'),sub('Chemistry','A','a-level')]); eq(r.combined.total, 973); approx(r.combined.percentage, 88.45, 0.01); eq(r.stream, 'Pre-Engineering'); });
test('FAST CS applicant → 835/1100 → 75.91%', () => { const r = calculate([sub('English','B'),sub('Mathematics','A'),sub('Urdu','C'),sub('Islamiyat','C'),sub('Pakistan Studies','C'),sub('Physics','B'),sub('Chemistry','B'),sub('Computer Science','A')],[sub('Mathematics','A','a-level'),sub('Physics','B','a-level'),sub('Computer Science','A','a-level')]); eq(r.combined.total, 835); approx(r.combined.percentage, 75.91, 0.01); eq(r.stream, 'Computer Science'); });
test('Medical student → 998/1100 → 90.73%', () => { const r = calculate([sub('English','A*'),sub('Mathematics','A'),sub('Urdu','A'),sub('Islamiyat','A*'),sub('Pakistan Studies','A'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*')],[sub('Biology','A*','a-level'),sub('Chemistry','A*','a-level'),sub('Physics','A','a-level')]); eq(r.combined.total, 998); approx(r.combined.percentage, 90.73, 0.01); eq(r.stream, 'Pre-Medical'); });
test('Struggling student → 545/1100 → 49.55%', () => { const r = calculate([sub('English','D'),sub('Mathematics','D'),sub('Urdu','E'),sub('Islamiyat','E'),sub('Pakistan Studies','E'),sub('Physics','D'),sub('Chemistry','D'),sub('Biology','E')],[sub('Physics','D','a-level'),sub('Chemistry','E','a-level'),sub('Biology','E','a-level')]); eq(r.combined.total, 545); approx(r.combined.percentage, 49.55, 0.01); });
test('10 O-Lvls + 4 A-Lvls (best-of both)', () => { const r = calculate([sub('English','A*'),sub('Mathematics','A*'),sub('Urdu','A'),sub('Islamiyat','A'),sub('Pakistan Studies','A'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*'),sub('Computer Science','A'),sub('Additional Mathematics','A*')],[sub('Physics','A*','a-level'),sub('Chemistry','A*','a-level'),sub('Mathematics','A*','a-level'),sub('Biology','B','a-level')]); eq(r.oLevel.rawTotal, 727); eq(r.aLevel.rawTotal, 283); eq(r.combined.total, 1010); });

console.log('\n\x1b[1m══ 16. CROSS-SESSION CONSISTENCY ══\x1b[0m');
test('Same grades, diff session → diff A* totals', () => {
    const o = [sub('English','A*'),sub('Mathematics','A*'),sub('Urdu','A*'),sub('Islamiyat','A*'),sub('Pakistan Studies','A*'),sub('Physics','A*'),sub('Chemistry','A*'),sub('Biology','A*')];
    session='2025'; const t25 = calculate(o, null).oLevel.rawTotal;
    session='2024'; const t24 = calculate(o, null).oLevel.rawTotal;
    session='2023'; const t23 = calculate(o, null).oLevel.rawTotal;
    eq(t25 !== t24, true, '2025≠2024'); eq(t23 !== t24, true, '2023≠2024');
    session = '2025';
});
test('Fixed grades session-independent', () => {
    session='2023'; eq(getMarks('A','Physics','o-level'), 85); eq(getMarks('B','Physics','o-level'), 75);
    session='2024'; eq(getMarks('A','Physics','o-level'), 85); eq(getMarks('D','Physics','o-level'), 55);
    session='2025';
});

// ═══════════════════════════════════════════════════════
console.log('\n\x1b[1m══════════════════════════════════════════');
console.log(' FINAL RESULTS');
console.log('══════════════════════════════════════════\x1b[0m');
console.log('  Total:  \x1b[1m' + total + '\x1b[0m');
console.log('  Passed: \x1b[32m\x1b[1m' + passed + '\x1b[0m');
console.log('  Failed: ' + (failed > 0 ? '\x1b[31m\x1b[1m' : '\x1b[32m\x1b[1m') + failed + '\x1b[0m');
console.log('══════════════════════════════════════════');
if (failed === 0) console.log('  \x1b[32m\x1b[1m✓ ALL ' + total + ' TESTS PASSED\x1b[0m');
else console.log('  \x1b[31m\x1b[1m✗ ' + failed + ' TEST(S) FAILED\x1b[0m');
console.log('══════════════════════════════════════════\n');
process.exit(failed > 0 ? 1 : 0);
