// =====================================================
// UniCalc — University Configurations (Shared)
// Used by both calculator.js and predictor.js
// =====================================================

const calculatorConfigs = {
    fast: {
        shortName: 'FAST',
        longName: 'FAST National University',
        description: 'Calculate your FAST aggregate with the verified formula.',
        metaDescription: 'FAST merit calculator covering all campuses and programs with official weighting — Computing 10/40/50, Engineering 17/50/33.',
        programs: [
            'Computing Programs (CS, SE, AI, DS, Cyber)',
            'Engineering Programs (EE, CE, EL, Civil)',
            'Business Programs (BBA, AFM)'
        ],
        weights: { matric: 0.10, inter: 0.40, test: 0.50 },
        programWeights: {
            0: { matric: 0.10, inter: 0.40, test: 0.50 }, // Computing: 10% SSC / 40% HSSC / 50% Test
            1: { matric: 0.17, inter: 0.50, test: 0.33 }, // Engineering: 17% SSC / 50% HSSC / 33% Test
            2: { matric: 0.10, inter: 0.40, test: 0.50 }  // Business: 10% SSC / 40% HSSC / 50% Test
        },
        testMax: 100,
        hasALevelSplit: true
    },
    nust: {
        shortName: 'NUST',
        longName: 'National University of Sciences & Technology',
        description: 'Compute your NET aggregate for NUST with the verified formula.',
        metaDescription: 'NUST NET calculator with the official 10/15/75 weighting (FSc/Gap) and 25/0/75 for Immediate A-Level students.',
        programs: [
            'Engineering Schools (SMME, CEME, SEECS)',
            'Computing & AI Programs',
            'Business & Social Sciences'
        ],
        weights: { matric: 0.10, inter: 0.15, test: 0.75 },
        eduSystemWeights: {
            'fsc':              { matric: 0.10, inter: 0.15, test: 0.75 }, // Standard FSc: 10% SSC / 15% HSSC / 75% NET
            'alevel-immediate': { matric: 0.25, inter: 0.00, test: 0.75 }, // Immediate A-Level: 25% O-Level / 0% A-Level / 75% NET
            'alevel-gap':       { matric: 0.10, inter: 0.15, test: 0.75 }  // Gap-Year A-Level: treated same as FSc
        },
        testMax: 200,
        hideTestTypePills: false,
        hasALevelSplit: true
    },
    itu: {
        shortName: 'ITU',
        longName: 'Information Technology University',
        description: 'Calculate your ITU aggregate with the verified formula.',
        metaDescription: 'ITU merit calculator — FSc 15/35/50, Immediate A-Level 35/0/65, Gap-Year A-Level 15/35/50. Accepts ECAT, NAT, SAT.',
        programs: [
            'Computer Science & Data Science',
            'Electrical Engineering',
            'Business & Management'
        ],
        weights: { matric: 0.15, inter: 0.35, test: 0.50 },
        eduSystemWeights: {
            'fsc':              { matric: 0.15, inter: 0.35, test: 0.50 }, // FSc: 15% SSC / 35% HSSC / 50% Test
            'alevel-immediate': { matric: 0.35, inter: 0.00, test: 0.65 }, // Immediate A-Level: 35% O-Level / 0% A-Level / 65% Test
            'alevel-gap':       { matric: 0.15, inter: 0.35, test: 0.50 }  // Gap-Year A-Level: same as FSc
        },
        testMax: 100,
        hasALevelSplit: true
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
        description: 'Calculate your GIKI aggregate with the verified formula.',
        metaDescription: 'GIKI merit calculator with admission test weightage.',
        programs: [
            'Engineering & Sciences',
            'Computer Systems & AI',
            'Management Sciences'
        ],
        weights: { matric: 0, inter: 0.15, test: 0.85 },
        testMax: 200,
        hideTestTypePills: false
    },
    pieas: {
        shortName: 'PIEAS',
        longName: 'Pakistan Institute of Engineering & Applied Sciences',
        description: 'Calculate your PIEAS aggregate with the verified formula.',
        metaDescription: 'PIEAS aggregate calculator — FSc 15/25/60, Result-Awaited A-Level 40/0/60, Completed A-Level 15/25/60.',
        programs: [
            'Engineering Disciplines',
            'Applied & Nuclear Sciences',
            'Computer & Information Sciences'
        ],
        weights: { matric: 0.15, inter: 0.25, test: 0.60 },
        eduSystemWeights: {
            'fsc':              { matric: 0.15, inter: 0.25, test: 0.60 }, // FSc: 15% Matric / 25% HSSC / 60% Test
            'alevel-immediate': { matric: 0.40, inter: 0.00, test: 0.60 }, // Result-Awaited A-Level: 40% O-Level / 0% A-Level / 60% Test
            'alevel-gap':       { matric: 0.15, inter: 0.25, test: 0.60 }  // Completed A-Level: 15% O-Level / 25% A-Level / 60% Test
        },
        testMax: 100,
        hasALevelSplit: true
    },
    uet: {
        shortName: 'UET',
        longName: 'University of Engineering & Technology',
        description: 'Calculate your UET ECAT aggregate with the verified formula.',
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
        description: 'Calculate your NED aggregate with the verified formula.',
        metaDescription: 'NED merit calculator with the official 0/40/60 formula, gap-year deduction, and Hafiz-e-Quran bonus.',
        programs: [
            'Engineering Programs',
            'Technology Programs',
            'Architecture & Planning'
        ],
        weights: { matric: 0, inter: 0.40, test: 0.60 },
        eduSystemWeights: {
            'fsc':              { matric: 0, inter: 0.40, test: 0.60 },
            'alevel-immediate': { matric: 0, inter: 0.40, test: 0.60 },
            'alevel-gap':       { matric: 0, inter: 0.40, test: 0.60 }  // Same weights, 0.91% deducted from total
        },
        testMax: 100,
        hideTestTypePills: true,
        hasALevelSplit: true,
        gapYearDeduction: 0.91,       // Deducted from total aggregate for gap-year students (FSc or A-Level)
        hafizHsscBonus: 1.82          // Added to HSSC/A-Level equivalency percentage (not total aggregate)
    },
    ist: {
        shortName: 'IST',
        longName: 'Institute of Space Technology',
        description: 'Calculate your IST aggregate with the verified formula.',
        metaDescription: 'IST merit calculator — FSc 20/40/40, A-Level 40/0/60.',
        programs: [
            'BS Computer Science',
            'Aerospace & Avionics',
            'Space Science & Engineering'
        ],
        weights: { matric: 0.20, inter: 0.40, test: 0.40 },
        eduSystemWeights: {
            'fsc':              { matric: 0.20, inter: 0.40, test: 0.40 }, // FSc: 20% Matric / 40% HSSC / 40% Test
            'alevel-immediate': { matric: 0.40, inter: 0.00, test: 0.60 }, // A-Level Immediate: 40% O-Level / 0% A-Level / 60% Test
            'alevel-gap':       { matric: 0.40, inter: 0.00, test: 0.60 }  // A-Level Gap Year: same as Immediate
        },
        testMax: 100,
        hideTestTypePills: true,
        hasALevelSplit: true
    },
    nutech: {
        shortName: 'NUTECH',
        longName: 'National University of Technology',
        description: 'Calculate your NUTECH aggregate with the verified formula.',
        metaDescription: 'NUTECH merit calculator for technology-driven programs.',
        programs: [
            'Engineering Technologies',
            'Computing & AI',
            'Business & Management'
        ],
        weights: { matric: 0.10, inter: 0.20, test: 0.70 },
        testMax: 200,
        hideTestTypePills: false
    },
    pucit: {
        shortName: 'PUCIT',
        longName: 'Punjab University College of Information Technology',
        description: 'Calculate your PUCIT aggregate with the verified formula.',
        metaDescription: 'PUCIT merit calculator for main and new campus.',
        programs: [
            'Computer Science (Hons)',
            'Software Engineering',
            'Information Technology'
        ],
        useAcademicPoolFormula: true,
        academicWeightage: 0.75,
        testWeightage: 0.25,
        matricPoolFraction: 0.25,
        weights: { matric: 0.25, inter: 0.35, test: 0.40 },
        testMax: 100,
        hideTestTypePills: true
    },
    air: {
        shortName: 'AIR',
        longName: 'Air University',
        description: 'Calculate your Air University aggregate with the verified formula.',
        metaDescription: 'Air University merit calculator with AU admission test support.',
        programs: [
            'Engineering & Avionics',
            'Computing & Cyber Security',
            'Management Sciences'
        ],
        weights: { matric: 0.10, inter: 0.50, test: 0.40 },
        programWeights: {
            0: { matric: 0.10, inter: 0.50, test: 0.40 },
            1: { matric: 0.15, inter: 0.35, test: 0.50 },
            2: { matric: 0.15, inter: 0.35, test: 0.50 }
        },
        testMax: 100
    },
    bahria: {
        shortName: 'Bahria',
        longName: 'Bahria University',
        description: 'Calculate your Bahria University aggregate with the verified formula.',
        metaDescription: 'Bahria merit calculator for engineering, computing and business.',
        programs: [
            'Engineering & Maritime Studies',
            'Computing & AI',
            'Business & Media Studies'
        ],
        weights: { matric: 0.10, inter: 0.30, test: 0.60 },
        testMax: 100
    },
    pu: {
        shortName: 'PU',
        longName: 'University of the Punjab',
        description: 'Calculate your PU aggregate with the verified formula.',
        metaDescription: 'Punjab University merit calculator for all programs.',
        programs: [
            'Engineering Programs',
            'Science Programs'
        ],
        useAcademicPoolFormula: true,
        academicWeightage: 0.75,
        testWeightage: 0.25,
        matricPoolFraction: 0.25,
        weights: { matric: 0.25, inter: 0.35, test: 0.40 },
        testMax: 100,
        hideTestTypePills: true
    },
    uhs: {
        shortName: 'UHS',
        longName: 'University of Health Sciences',
        description: 'Calculate your UHS/MDCAT aggregate with the verified formula.',
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
        description: 'Calculate your NUMS aggregate with the verified formula.',
        metaDescription: 'NUMS merit calculator for Army Medical College and all affiliated colleges.',
        programs: [
            'MBBS',
            'BDS'
        ],
        weights: { matric: 0.10, inter: 0.40, test: 0.50 },
        testMax: 200,
        hideTestTypePills: true
    },
    iiu: {
        shortName: 'IIU',
        longName: 'International Islamic University',
        description: 'Calculate your IIU aggregate with the verified formula.',
        metaDescription: 'IIU merit calculator for engineering and computing programs.',
        programs: [
            'Engineering Programs',
            'Computing Programs',
            'Business Programs'
        ],
        weights: { matric: 0.10, inter: 0.20, test: 0.70 },
        testMax: 100,
        hideTestTypePills: true,
        hasALevelSplit: true
    }
};
