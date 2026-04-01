// =====================================================
// UniCalc — IBCC A/O Level Equivalency Calculator
// =====================================================

(() => {
    'use strict';

    // ===== GRADE DATA =====

    const GRADES_CAMBRIDGE = ['A*', 'A', 'B', 'C', 'D', 'E'];
    const GRADES_EDEXCEL = ['9', '8', '7', '6', '5', '4', '3', '2'];

    const FIXED_MARKS = { 'A': 85, 'B': 75, 'C': 65, 'D': 55, 'E': 45 };

    const EDEXCEL_MAP = {
        '9': 'A*', '8': 'A*', '7': 'A', '6': 'B', '5': 'B', '4': 'C', '3': 'D', '2': 'E'
    };

    // A* marks by session year, level, and subject (from IBCC annual publications)
    const A_STAR = {
        '2025': {
            'o-level': {
                'Mathematics': 94, 'Additional Mathematics': 94, 'Physics': 94,
                'Chemistry': 94, 'Biology': 94, 'Islamiyat': 94, 'Computer Science': 94,
                'English': 93, 'Urdu': 93, 'Pakistan Studies': 93, '_default': 94
            },
            'a-level': {
                'Physics': 95, 'Chemistry': 94, 'Biology': 94, 'Mathematics': 94,
                'Further Mathematics': 94, 'Computer Science': 93, '_default': 94
            }
        },
        '2024': {
            'o-level': {
                'Mathematics': 95, 'Additional Mathematics': 95, 'Physics': 94,
                'Chemistry': 94, 'Biology': 94, 'Islamiyat': 94, 'Computer Science': 94,
                'English': 93, 'Urdu': 93, 'Pakistan Studies': 93, '_default': 93
            },
            'a-level': {
                'Physics': 93, 'Chemistry': 93, 'Biology': 94, 'Mathematics': 94,
                'Computer Science': 93, '_default': 93
            }
        },
        '2023': {
            'o-level': {
                'Mathematics': 95, 'Islamiyat': 95, 'Urdu': 93, '_default': 94
            },
            'a-level': {
                'Physics': 95, '_default': 94
            }
        }
    };

    // ===== SUBJECT LISTS =====

    const O_COMPULSORY_PK = ['English', 'Mathematics', 'Urdu', 'Islamiyat', 'Pakistan Studies'];
    const O_COMPULSORY_OS = ['English', 'Mathematics'];

    const O_ELECTIVES = [
        'Physics', 'Chemistry', 'Biology', 'Computer Science',
        'Additional Mathematics', 'Accounting', 'Business Studies',
        'Economics', 'Art & Design', 'Sociology', 'Geography',
        'History', 'Environmental Management', 'Food & Nutrition',
        'Travel & Tourism', 'Global Perspectives', 'Foreign Language',
        'Urdu', 'Islamiyat', 'Pakistan Studies'
    ];

    const A_SUBJECTS = [
        'Physics', 'Chemistry', 'Biology', 'Mathematics',
        'Further Mathematics', 'Computer Science', 'Accounting',
        'Business', 'Economics', 'Psychology', 'Sociology',
        'English', 'Law', 'Art & Design', 'Thinking Skills',
        'Media Studies', 'Urdu'
    ];

    const STREAMS = {
        'Pre-Medical': ['Biology', 'Chemistry', 'Physics'],
        'Pre-Engineering': ['Mathematics', 'Physics', 'Chemistry'],
        'Computer Science': ['Mathematics', 'Physics', 'Computer Science'],
        'Commerce': ['Accounting', 'Business', 'Economics']
    };

    // ===== STATE =====

    let mode = 'pakistan';
    let board = 'cambridge';
    let oSession = '2025';
    let aSession = '2025';
    let calcMode = 'both'; // 'both', 'o-only', 'a-only'
    let oLevelRows = [];
    let aLevelRows = [];
    let nextId = 0;
    let hasCalculated = false;

    // ===== HELPERS =====

    function id() { return ++nextId; }

    function getMarks(grade, subject, level) {
        if (!grade) return null;
        let effective = grade;
        if (board === 'edexcel' && EDEXCEL_MAP[grade]) {
            effective = EDEXCEL_MAP[grade];
        }
        if (effective === 'A*') {
            const sessionYear = level === 'a-level' ? aSession : oSession;
            const s = A_STAR[sessionYear] || A_STAR['2025'];
            const l = s[level] || {};
            return l[subject] || l['_default'] || 90;
        }
        return FIXED_MARKS[effective] || 0;
    }

    function getCompulsory() {
        return mode === 'pakistan' ? O_COMPULSORY_PK : O_COMPULSORY_OS;
    }

    function getRequiredOCount() {
        return mode === 'pakistan' ? 8 : 5;
    }

    function getElectivesFor(compulsory) {
        return O_ELECTIVES.filter(s => !compulsory.includes(s));
    }

    function getGrades() {
        return board === 'cambridge' ? GRADES_CAMBRIDGE : GRADES_EDEXCEL;
    }

    function getGradeLabel(g) {
        if (board === 'edexcel') {
            const letter = EDEXCEL_MAP[g];
            return `${g} (${letter})`;
        }
        return g;
    }

    function detectStream(subjects) {
        const names = subjects.map(s => s.name).filter(Boolean);
        for (const [stream, required] of Object.entries(STREAMS)) {
            if (required.every(r => names.includes(r))) return stream;
        }
        return 'General / Humanities';
    }

    function bestOf(subjects, count, locked) {
        const lockedSubs = subjects.filter(s => locked.includes(s.name) && s.grade);
        const electives = subjects.filter(s => !locked.includes(s.name) && s.grade);
        electives.sort((a, b) => (getMarks(b.grade, b.name, b.level) || 0) - (getMarks(a.grade, a.name, a.level) || 0));
        const remaining = count - lockedSubs.length;
        const selected = [...lockedSubs, ...electives.slice(0, Math.max(0, remaining))];
        return selected;
    }

    // ===== CUSTOM DROPDOWN =====

    function createDropdown(options, selectedValue, placeholder, onChange, disabled) {
        // options: [{value, label}]
        const wrap = document.createElement('div');
        wrap.className = 'eq-dropdown' + (disabled ? ' eq-dropdown-disabled' : '');

        const trigger = document.createElement('div');
        trigger.className = 'eq-dd-trigger';

        const triggerText = document.createElement('span');
        triggerText.className = 'eq-dd-text';
        const selected = options.find(o => o.value === selectedValue);
        triggerText.textContent = selected ? selected.label : placeholder;
        if (!selected) triggerText.classList.add('eq-dd-placeholder');

        const arrow = document.createElement('span');
        arrow.className = 'eq-dd-arrow';
        arrow.innerHTML = '&#9660;';

        trigger.appendChild(triggerText);
        trigger.appendChild(arrow);

        const menu = document.createElement('div');
        menu.className = 'eq-dd-menu';

        function buildMenu() {
            menu.innerHTML = '';
            options.forEach(opt => {
                const item = document.createElement('div');
                item.className = 'eq-dd-option' + (opt.value === selectedValue ? ' selected' : '');
                item.textContent = opt.label;
                item.dataset.value = opt.value;
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectedValue = opt.value;
                    triggerText.textContent = opt.label;
                    triggerText.classList.remove('eq-dd-placeholder');
                    menu.querySelectorAll('.eq-dd-option').forEach(o => o.classList.remove('selected'));
                    item.classList.add('selected');
                    wrap.classList.remove('open');
                    if (onChange) onChange(opt.value);
                });
                menu.appendChild(item);
            });
        }

        buildMenu();

        if (!disabled) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close all other dropdowns first
                document.querySelectorAll('.eq-dropdown.open').forEach(d => {
                    if (d !== wrap) d.classList.remove('open');
                });
                wrap.classList.toggle('open');

                // Scroll selected item into view
                if (wrap.classList.contains('open')) {
                    const sel = menu.querySelector('.selected');
                    if (sel) sel.scrollIntoView({ block: 'nearest' });
                }
            });
        }

        wrap.appendChild(trigger);
        wrap.appendChild(menu);

        // Public API for updating options
        wrap._update = function(newOptions, newValue) {
            selectedValue = newValue;
            options = newOptions;
            const sel = options.find(o => o.value === selectedValue);
            triggerText.textContent = sel ? sel.label : placeholder;
            triggerText.classList.toggle('eq-dd-placeholder', !sel);
            buildMenu();
        };

        wrap._getValue = function() { return selectedValue; };

        return wrap;
    }

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.eq-dropdown.open').forEach(d => d.classList.remove('open'));
    });

    // ===== DOM =====

    const $ = sel => document.querySelector(sel);
    const $$ = sel => document.querySelectorAll(sel);

    function createSubjectRow(rowData, level, isLocked) {
        const div = document.createElement('div');
        div.className = 'eq-subject-row' + (isLocked ? ' eq-locked' : '');
        div.dataset.id = rowData.id;

        const subjectList = level === 'o-level'
            ? (isLocked ? [rowData.name] : getElectivesFor(getCompulsory()))
            : A_SUBJECTS;

        const usedSubjects = (level === 'o-level' ? oLevelRows : aLevelRows)
            .filter(r => r.id !== rowData.id && r.name)
            .map(r => r.name);

        const availableSubjects = subjectList.filter(s => !usedSubjects.includes(s));

        const grades = getGrades();
        const marks = rowData.grade ? getMarks(rowData.grade, rowData.name, level) : null;

        // Subject dropdown
        const subjectOptions = isLocked
            ? [{ value: rowData.name, label: rowData.name }]
            : [{ value: '', label: 'Select Subject' }, ...availableSubjects.map(s => ({ value: s, label: s }))];

        const subjectDD = createDropdown(subjectOptions, rowData.name, 'Select Subject', (val) => {
            rowData.name = val;
            updateMarksEl();
            refreshAvailableSubjects(level);
        }, isLocked);
        subjectDD.classList.add('eq-dd-subject');

        // Grade dropdown
        const gradeOptions = [{ value: '', label: 'Grade' }, ...grades.map(g => ({ value: g, label: getGradeLabel(g) }))];
        const gradeDD = createDropdown(gradeOptions, rowData.grade, 'Grade', (val) => {
            rowData.grade = val;
            updateMarksEl();
        }, false);
        gradeDD.classList.add('eq-dd-grade');

        // Marks display
        const marksEl = document.createElement('div');
        marksEl.className = 'eq-marks-display' + (marks !== null ? ' eq-marks-active' : '');
        marksEl.textContent = marks !== null ? marks : '—';

        function updateMarksEl() {
            const m = rowData.grade && rowData.name ? getMarks(rowData.grade, rowData.name, level) : null;
            marksEl.textContent = m !== null ? m : '—';
            marksEl.classList.toggle('eq-marks-active', m !== null);
        }

        // Action button
        let actionEl;
        if (!isLocked) {
            actionEl = document.createElement('button');
            actionEl.type = 'button';
            actionEl.className = 'eq-remove-btn';
            actionEl.setAttribute('aria-label', 'Remove subject');
            actionEl.title = 'Remove subject';
            actionEl.innerHTML = '&times;';
            actionEl.addEventListener('click', () => {
                const rows = level === 'o-level' ? oLevelRows : aLevelRows;
                const min = level === 'o-level' ? getRequiredOCount() : 3;
                if (rows.length <= min) return;
                const idx = rows.findIndex(r => r.id === rowData.id);
                if (idx !== -1) rows.splice(idx, 1);
                div.remove();
                updateSubjectCounts();
                refreshAvailableSubjects(level);
                updateRemoveButtons(level);
            });
        } else {
            actionEl = document.createElement('div');
            actionEl.className = 'eq-lock-icon';
            actionEl.title = 'Compulsory subject';
            actionEl.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
        }

        div.appendChild(subjectDD);
        div.appendChild(gradeDD);
        div.appendChild(marksEl);
        div.appendChild(actionEl);

        // Store references for refresh
        div._subjectDD = subjectDD;
        div._gradeDD = gradeDD;
        div._marksEl = marksEl;
        div._updateMarks = updateMarksEl;

        return div;
    }

    function updateRemoveButtons(level) {
        const rows = level === 'o-level' ? oLevelRows : aLevelRows;
        const min = level === 'o-level' ? getRequiredOCount() : 3;
        const container = level === 'o-level' ? $('#oLevelList') : $('#aLevelList');
        if (!container) return;
        const atMin = rows.length <= min;
        container.querySelectorAll('.eq-remove-btn').forEach(btn => {
            btn.style.visibility = atMin ? 'hidden' : 'visible';
        });
    }

    function refreshAvailableSubjects(level) {
        const rows = level === 'o-level' ? oLevelRows : aLevelRows;
        const container = level === 'o-level' ? $('#oLevelList') : $('#aLevelList');
        if (!container) return;

        const usedNames = rows.filter(r => r.name).map(r => r.name);
        const subjectList = level === 'o-level' ? getElectivesFor(getCompulsory()) : A_SUBJECTS;

        container.querySelectorAll('.eq-subject-row:not(.eq-locked)').forEach(rowEl => {
            const rowId = parseInt(rowEl.dataset.id);
            const rowData = rows.find(r => r.id === rowId);
            const dd = rowEl._subjectDD;
            if (!dd || !rowData) return;

            const currentVal = rowData.name;
            const available = subjectList.filter(s => !usedNames.includes(s) || s === currentVal);
            const options = [{ value: '', label: 'Select Subject' }, ...available.map(s => ({ value: s, label: s }))];
            dd._update(options, currentVal);
        });
    }

    function updateSubjectCounts() {
        const oCount = oLevelRows.filter(r => r.grade && r.name).length;
        const oReq = getRequiredOCount();
        const oBadge = $('#oLevelCount');
        if (oBadge) {
            oBadge.textContent = `${oCount} / ${oReq} subjects`;
            oBadge.className = 'eq-count-badge' + (oCount >= oReq ? ' eq-count-ok' : oCount > 0 ? ' eq-count-partial' : '');
        }

        if (calcMode !== 'o-only') {
            const aCount = aLevelRows.filter(r => r.grade && r.name).length;
            const aBadge = $('#aLevelCount');
            if (aBadge) {
                aBadge.textContent = `${aCount} / 3 subjects`;
                aBadge.className = 'eq-count-badge' + (aCount >= 3 ? ' eq-count-ok' : aCount > 0 ? ' eq-count-partial' : '');
            }
        }
    }

    function renderOLevelSubjects() {
        const list = $('#oLevelList');
        if (!list) return;
        list.innerHTML = '';
        oLevelRows.forEach(row => {
            const isLocked = getCompulsory().includes(row.name);
            list.appendChild(createSubjectRow(row, 'o-level', isLocked));
        });
        updateSubjectCounts();
        updateRemoveButtons('o-level');
    }

    function renderALevelSubjects() {
        const list = $('#aLevelList');
        if (!list) return;
        list.innerHTML = '';
        aLevelRows.forEach(row => {
            list.appendChild(createSubjectRow(row, 'a-level', false));
        });
        updateSubjectCounts();
        updateRemoveButtons('a-level');
    }

    function initSubjects() {
        oLevelRows = [];
        const comp = getCompulsory();
        comp.forEach(name => {
            oLevelRows.push({ id: id(), name, grade: '', level: 'o-level' });
        });
        const electiveCount = getRequiredOCount() - comp.length;
        for (let i = 0; i < electiveCount; i++) {
            oLevelRows.push({ id: id(), name: '', grade: '', level: 'o-level' });
        }

        aLevelRows = [];
        for (let i = 0; i < 3; i++) {
            aLevelRows.push({ id: id(), name: '', grade: '', level: 'a-level' });
        }

        renderOLevelSubjects();
        renderALevelSubjects();
    }

    // ===== CALCULATION =====

    function calculate() {
        let result = {
            oLevel: null,
            aLevel: null,
            combined: null,
            stream: null
        };

        // O-Level calculation (for 'both' and 'o-only')
        if (calcMode !== 'a-only') {
            const oRequired = getRequiredOCount();
            const oFilled = oLevelRows.filter(r => r.name && r.grade);

            if (oFilled.length < oRequired) {
                showError(`Please fill at least ${oRequired} O-Level subjects with grades.`);
                return null;
            }

            const comp = getCompulsory();
            const filledNames = oFilled.map(r => r.name);
            const missingComp = comp.filter(c => !filledNames.includes(c) || !oFilled.find(r => r.name === c && r.grade));
            if (missingComp.length > 0) {
                showError(`Missing compulsory subject${missingComp.length > 1 ? 's' : ''}: ${missingComp.join(', ')}`);
                return null;
            }

            const oSelected = bestOf(
                oFilled.map(r => ({ ...r, marks: getMarks(r.grade, r.name, 'o-level') })),
                oRequired,
                comp
            );

            const oTotal = oSelected.reduce((sum, s) => sum + (getMarks(s.grade, s.name, 'o-level') || 0), 0);
            const oMax = oRequired * 100;
            const oEquiv = (oTotal / oMax) * 900;
            const oPct = (oTotal / oMax) * 100;

            result.oLevel = {
                subjects: oSelected,
                rawTotal: oTotal,
                rawMax: oMax,
                equivTotal: Math.round(oEquiv * 100) / 100,
                equivMax: 900,
                percentage: Math.round(oPct * 100) / 100,
                allFilled: oFilled,
                extraCount: Math.max(0, oFilled.length - oRequired)
            };
        }

        // A-Level calculation (for 'both' and 'a-only')
        if (calcMode !== 'o-only') {
            const aFilled = aLevelRows.filter(r => r.name && r.grade);
            if (aFilled.length < 3) {
                showError('Please fill at least 3 A-Level subjects with grades.');
                return null;
            }

            const aSorted = aFilled
                .map(r => ({ ...r, marks: getMarks(r.grade, r.name, 'a-level') }))
                .sort((a, b) => b.marks - a.marks);
            const aSelected = aSorted.slice(0, 3);

            const aTotal = aSelected.reduce((sum, s) => sum + s.marks, 0);
            const aMax = 300;

            result.aLevel = {
                subjects: aSelected,
                rawTotal: aTotal,
                rawMax: aMax,
                percentage: Math.round((aTotal / aMax) * 100 * 100) / 100,
                allFilled: aFilled,
                extraCount: Math.max(0, aFilled.length - 3)
            };

            result.stream = detectStream(aSelected);
        }

        // Combined calculation (only for 'both')
        if (calcMode === 'both' && result.oLevel && result.aLevel) {
            const combinedTotal = result.oLevel.rawTotal + result.aLevel.rawTotal;
            const combinedMax = result.oLevel.rawMax + result.aLevel.rawMax;
            const combinedPct = (combinedTotal / combinedMax) * 100;

            const hsscTotal = (combinedTotal / combinedMax) * 1100;

            result.combined = {
                total: combinedTotal,
                max: combinedMax,
                percentage: Math.round(combinedPct * 100) / 100,
                oLevelShare: Math.round((result.oLevel.rawTotal / combinedTotal) * 100 * 10) / 10,
                hsscTotal: Math.round(hsscTotal * 100) / 100,
                hsscMax: 1100
            };
        }

        return result;
    }

    function showError(msg) {
        const err = $('#eqError');
        if (err) {
            err.textContent = msg;
            err.style.display = 'block';
            err.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => { err.style.display = 'none'; }, 5000);
        }
    }

    // ===== RESULTS RENDERING =====

    function renderResults(result) {
        const container = $('#eqResults');
        if (!container) return;

        const hasALevel = result.aLevel !== null;
        const hasOLevel = result.oLevel !== null;
        const hasBoth = hasALevel && hasOLevel;

        let mainPct, mainTotal, mainMax, mainLabel;

        if (hasBoth) {
            mainPct = result.combined.percentage;
            mainTotal = result.combined.hsscTotal;
            mainMax = result.combined.hsscMax;
            mainLabel = 'HSSC (FSc) Equivalent';
        } else if (hasOLevel) {
            mainPct = result.oLevel.percentage;
            mainTotal = result.oLevel.equivTotal;
            mainMax = result.oLevel.equivMax;
            mainLabel = 'SSC (Matric) Equivalent';
        } else {
            mainPct = result.aLevel.percentage;
            mainTotal = result.aLevel.rawTotal;
            mainMax = result.aLevel.rawMax;
            mainLabel = 'A-Level Equivalent';
        }

        let oSubjectRows = '';
        if (hasOLevel) {
            oSubjectRows = result.oLevel.subjects.map(s =>
                `<div class="eq-result-row">
                    <span class="eq-result-subject">${s.name}</span>
                    <span class="eq-result-grade">${s.grade}</span>
                    <span class="eq-result-marks">${getMarks(s.grade, s.name, 'o-level')}/100</span>
                </div>`
            ).join('');
        }

        let aSubjectRows = '';
        if (hasALevel) {
            aSubjectRows = result.aLevel.subjects.map(s =>
                `<div class="eq-result-row">
                    <span class="eq-result-subject">${s.name}</span>
                    <span class="eq-result-grade">${s.grade}</span>
                    <span class="eq-result-marks">${getMarks(s.grade, s.name, 'a-level')}/100</span>
                </div>`
            ).join('');
        }

        let bestOfNote = '';
        if (hasOLevel && result.oLevel.extraCount > 0) {
            bestOfNote += `<div class="eq-info-note">Best ${getRequiredOCount()} of ${result.oLevel.allFilled.length} O-Level subjects selected for highest total.</div>`;
        }
        if (hasALevel && result.aLevel.extraCount > 0) {
            bestOfNote += `<div class="eq-info-note">Best 3 of ${result.aLevel.allFilled.length} A-Level subjects selected for highest total.</div>`;
        }

        const oBreakdownHtml = hasOLevel ? `
                <div class="eq-breakdown-section">
                    <h4>O-Level Breakdown</h4>
                    <div class="eq-result-table">
                        <div class="eq-result-row eq-result-header">
                            <span>Subject</span>
                            <span>Grade</span>
                            <span>Marks</span>
                        </div>
                        ${oSubjectRows}
                        <div class="eq-result-row eq-result-total">
                            <span>Total</span>
                            <span></span>
                            <span>${result.oLevel.rawTotal} / ${result.oLevel.rawMax}</span>
                        </div>
                    </div>
                    <div class="eq-matric-equiv">
                        Matric Equivalent: <strong>${result.oLevel.equivTotal} / ${result.oLevel.equivMax}</strong> (${result.oLevel.percentage}%)
                    </div>
                </div>` : '';

        const aBreakdownHtml = hasALevel ? `
                <div class="eq-breakdown-section">
                    <h4>A-Level Breakdown</h4>
                    <div class="eq-result-table">
                        <div class="eq-result-row eq-result-header">
                            <span>Subject</span>
                            <span>Grade</span>
                            <span>Marks</span>
                        </div>
                        ${aSubjectRows}
                        <div class="eq-result-row eq-result-total">
                            <span>Total</span>
                            <span></span>
                            <span>${result.aLevel.rawTotal} / ${result.aLevel.rawMax}</span>
                        </div>
                    </div>
                </div>` : '';

        const oShare = hasBoth ? result.combined.oLevelShare : 0;
        const aShare = hasBoth ? (100 - oShare) : 0;

        const rawMax = hasBoth ? result.combined.max : 0;
        const contribHtml = hasBoth ? `
                <div class="eq-breakdown-section">
                    <h4>Contribution Breakdown</h4>
                    <div class="eq-contrib">
                        <div class="eq-contrib-row">
                            <div class="eq-contrib-info">
                                <span class="eq-contrib-label">O-Levels (${result.oLevel.rawMax}/${rawMax})</span>
                                <span class="eq-contrib-pct">${oShare.toFixed(1)}%</span>
                            </div>
                            <div class="eq-contrib-bar">
                                <div class="eq-contrib-fill eq-contrib-o" style="width: ${(result.oLevel.rawMax / rawMax * 100)}%"></div>
                            </div>
                        </div>
                        <div class="eq-contrib-row">
                            <div class="eq-contrib-info">
                                <span class="eq-contrib-label">A-Levels (${result.aLevel.rawMax}/${rawMax})</span>
                                <span class="eq-contrib-pct">${aShare.toFixed(1)}%</span>
                            </div>
                            <div class="eq-contrib-bar">
                                <div class="eq-contrib-fill eq-contrib-a" style="width: ${(result.aLevel.rawMax / rawMax * 100)}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="eq-insight">
                        Your O-Level marks make up <strong>${(result.oLevel.rawMax / rawMax * 100).toFixed(1)}%</strong> of your total equivalency.
                        ${result.oLevel.rawMax / rawMax > 0.7 ? 'This is why O-Level performance is crucial for A-Level students.' : ''}
                    </div>
                </div>` : '';

        container.innerHTML = `
            <div class="eq-results-inner">
                <div class="eq-results-header">
                    <h3>Your IBCC Equivalency</h3>
                </div>

                <div class="eq-main-result">
                    <div class="eq-circle-wrap">
                        <svg class="eq-progress-ring" viewBox="0 0 200 200">
                            <circle class="eq-ring-bg" cx="100" cy="100" r="85"></circle>
                            <circle class="eq-ring-fill" cx="100" cy="100" r="85" id="eqProgressCircle"></circle>
                        </svg>
                        <div class="eq-circle-content">
                            <span class="eq-circle-value" id="eqMainValue">0.00</span>
                            <span class="eq-circle-unit">%</span>
                            <span class="eq-circle-label">${mainLabel}</span>
                        </div>
                    </div>
                    <div class="eq-main-marks">${mainTotal} / ${mainMax} marks</div>
                    ${hasALevel && result.stream ? `<div class="eq-stream-badge">${result.stream}</div>` : ''}
                </div>

                ${bestOfNote}
                ${oBreakdownHtml}
                ${aBreakdownHtml}
                ${contribHtml}

                <div class="eq-actions">
                    <button type="button" class="btn btn-outline" id="eqEditBtn">Edit Grades</button>
                </div>
            </div>
        `;

        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        requestAnimationFrame(() => {
            const circle = document.getElementById('eqProgressCircle');
            const valueEl = document.getElementById('eqMainValue');
            if (circle) {
                const circumference = 2 * Math.PI * 85;
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = circumference;
                requestAnimationFrame(() => {
                    const offset = circumference - (mainPct / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                });
            }
            if (valueEl) {
                animateValue(valueEl, 0, mainPct, 1200);
            }
        });

        const editBtn = document.getElementById('eqEditBtn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                container.style.display = 'none';
                $('#eqForm').style.display = 'block';
                $('#eqForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    function animateValue(el, start, end, duration) {
        const startTime = performance.now();
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            el.textContent = (start + (end - start) * ease).toFixed(2);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // ===== EVENT BINDING =====

    function init() {
        $$('input[name="eqMode"]').forEach(el => {
            el.addEventListener('change', () => {
                mode = el.value;
                const oReqLabel = $('#oLevelRequired');
                if (oReqLabel) {
                    oReqLabel.textContent = mode === 'pakistan'
                        ? '8 subjects (5 compulsory + 3 elective)'
                        : '5 subjects (2 compulsory + 3 elective)';
                }
                initSubjects();
            });
        });

        $$('input[name="eqBoard"]').forEach(el => {
            el.addEventListener('change', () => {
                board = el.value;
                renderOLevelSubjects();
                renderALevelSubjects();
            });
        });

        const sessionOptions = [{ value: '2025', label: '2025' }, { value: '2024', label: '2024' }, { value: '2023', label: '2023' }];

        const oSessionWrap = $('#oSessionWrap');
        if (oSessionWrap) {
            oSessionWrap.appendChild(createDropdown(sessionOptions, '2025', '2025', (val) => {
                oSession = val;
                $('#oLevelList').querySelectorAll('.eq-subject-row').forEach(r => { if (r._updateMarks) r._updateMarks(); });
            }, false));
        }

        const aSessionWrap = $('#aSessionWrap');
        if (aSessionWrap) {
            aSessionWrap.appendChild(createDropdown(sessionOptions, '2025', '2025', (val) => {
                aSession = val;
                $('#aLevelList').querySelectorAll('.eq-subject-row').forEach(r => { if (r._updateMarks) r._updateMarks(); });
            }, false));
        }

        $$('input[name="eqCalcMode"]').forEach(el => {
            el.addEventListener('change', () => {
                calcMode = el.value;
                const oSection = $('#oLevelSection');
                const aSection = $('#aLevelSection');
                const oaDivider = $('#oaDivider');
                if (oSection) oSection.style.display = calcMode === 'a-only' ? 'none' : 'block';
                if (aSection) aSection.style.display = calcMode === 'o-only' ? 'none' : 'block';
                if (oaDivider) oaDivider.style.display = calcMode === 'both' ? 'block' : 'none';
            });
        });

        const addOBtn = $('#addOLevel');
        if (addOBtn) {
            addOBtn.addEventListener('click', () => {
                const row = { id: id(), name: '', grade: '', level: 'o-level' };
                oLevelRows.push(row);
                const list = $('#oLevelList');
                if (list) {
                    list.appendChild(createSubjectRow(row, 'o-level', false));
                    updateSubjectCounts();
                    updateRemoveButtons('o-level');
                }
            });
        }

        const addABtn = $('#addALevel');
        if (addABtn) {
            addABtn.addEventListener('click', () => {
                const row = { id: id(), name: '', grade: '', level: 'a-level' };
                aLevelRows.push(row);
                const list = $('#aLevelList');
                if (list) {
                    list.appendChild(createSubjectRow(row, 'a-level', false));
                    updateSubjectCounts();
                    updateRemoveButtons('a-level');
                }
            });
        }

        const calcBtn = $('#eqCalculateBtn');
        if (calcBtn) {
            calcBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const err = $('#eqError');
                if (err) err.style.display = 'none';

                const result = calculate();
                if (result) {
                    hasCalculated = true;
                    $('#eqForm').style.display = 'none';
                    renderResults(result);
                }
            });
        }

        initSubjects();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
