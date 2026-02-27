// =====================================================
// UniCalc — University Configurations (Shared)
// Used by both calculator.js and predictor.js
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
        weights: { matric: 0.10, inter: 0.05, test: 0.85 },
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
    uet: {
        shortName: 'UET',
        longName: 'University of Engineering & Technology',
        description: 'UET ECAT aggregate calculator with the official 17/50/33 formula for all campuses including Taxila.',
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
    },
    uhs: {
        shortName: 'UHS',
        longName: 'University of Health Sciences',
        description: 'Calculate your UHS/MDCAT aggregate for Punjab medical & dental colleges with the official 10/40/50 formula.',
        metaDescription: 'UHS MDCAT merit calculator for all Punjab government and private medical colleges.',
        programs: [
            'MBBS',
            'BDS'
        ],
        weights: { matric: 0.10, inter: 0.40, test: 0.50 },
        testMax: 200,
        hideTestTypePills: true
    },
    nums: {
        shortName: 'NUMS',
        longName: 'National University of Medical Sciences',
        description: 'Calculate your NUMS aggregate for AMC and affiliated medical colleges with the 10/40/50 formula.',
        metaDescription: 'NUMS merit calculator for Army Medical College and all affiliated colleges.',
        programs: [
            'MBBS',
            'BDS'
        ],
        weights: { matric: 0.10, inter: 0.40, test: 0.50 },
        testMax: 150,
        hideTestTypePills: true
    }
};
