export interface TestPattern {
  totalMCQs: number;
  duration: string;
  totalMarks: number;
  isComputerBased: boolean;
  hasNegativeMarking: boolean;
  allowsCalculator: boolean;
  subjects: {
    name: string;
    mcqs: number;
  }[];
  notes?: string;
}

export interface UniversityTestPattern {
  id: string;
  name: string;
  pattern: TestPattern;
}

const testPatterns: UniversityTestPattern[] = [
  {
    id: "pu",
    name: "PU Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "1 hour 30 minutes",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: true,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 30 },
        { name: "Physics", mcqs: 30 },
        { name: "English", mcqs: 20 },
        { name: "IQ/General Knowledge", mcqs: 20 }
      ],
      notes: "Negative marking: -0.25 for each incorrect answer. Calculators are not allowed. Original CNIC/B-Form is mandatory for the test."
    }
  },
  {
    id: "nust",
    name: "NUST (NET)",
    pattern: {
      totalMCQs: 200,
      duration: "3 hours",
      totalMarks: 200,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 100 },
        { name: "Physics", mcqs: 60 },
        { name: "English", mcqs: 40 }
      ]
    }
  },
  {
    id: "giki",
    name: "GIKI Entry Test",
    pattern: {
      totalMCQs: 80,
      duration: "2 hours",
      totalMarks: 200,
      isComputerBased: true,
      hasNegativeMarking: true,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 30 },
        { name: "Physics", mcqs: 30 },
        { name: "English", mcqs: 30 }
      ]
    }
  },
  {
    id: "pieas",
    name: "PIEAS Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "3 hours",
      totalMarks: 100,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 30 },
        { name: "Physics", mcqs: 30 },
        { name: "Chemistry", mcqs: 30 },
        { name: "English", mcqs: 10 }
      ]
    }
  },
  {
    id: "comsats",
    name: "COMSATS (NTS)",
    pattern: {
      totalMCQs: 90,
      duration: "3 hours",
      totalMarks: 100,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Quantitative", mcqs: 20 },
        { name: "Analytical", mcqs: 20 },
        { name: "English", mcqs: 20 },
        { name: "Subject Specific", mcqs: 30 }
      ]
    }
  },
  {
    id: "pucit",
    name: "PUCIT Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: true,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 40 },
        { name: "Physics", mcqs: 30 },
        { name: "English", mcqs: 20 },
        { name: "IQ/General Knowledge", mcqs: 10 }
      ],
      notes: "Negative marking: 0.25 marks deducted for each wrong answer. The test is conducted online."
    }
  },
  {
    id: "quaideazam",
    name: "QAU Entry Test (NTS-NAT)",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: true,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 30 },
        { name: "Physics", mcqs: 30 },
        { name: "English", mcqs: 20 },
        { name: "IQ/General Knowledge", mcqs: 20 }
      ],
      notes: "Negative marking: 0.25 marks deducted for each wrong answer. The test is conducted by NTS."
    }
  },
  {
    id: "islamicuni",
    name: "IIUI Entry Test",
    pattern: {
      totalMCQs: 120,
      duration: "2.5 hours",
      totalMarks: 120,
      isComputerBased: true,
      hasNegativeMarking: true,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 40 },
        { name: "Physics", mcqs: 30 },
        { name: "English", mcqs: 30 },
        { name: "Islamic Studies", mcqs: 10 },
        { name: "General Knowledge", mcqs: 10 }
      ],
      notes: "Negative marking: 0.25 marks deducted for each wrong answer. Islamic Studies section is compulsory for all candidates."
    }
  },
  {
    id: "ist",
    name: "IST",
    pattern: {
      totalMCQs: 0,
      duration: "N/A",
      totalMarks: 0,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [],
      notes: "Accepts NET, NTS, HAT, ECAT, ETEA, ACT, NED, and MUET scores"
    }
  },
  {
    id: "ned",
    name: "NED Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: true,
      subjects: [
        { name: "Mathematics", mcqs: 25 },
        { name: "Physics", mcqs: 25 },
        { name: "Chemistry", mcqs: 25 },
        { name: "English", mcqs: 25 }
      ],
      notes: "CBT only in Islamabad campus"
    }
  },
  {
    id: "nutech",
    name: "NUTECH Entry Test",
    pattern: {
      totalMCQs: 200,
      duration: "3 hours",
      totalMarks: 200,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Advanced Mathematics", mcqs: 80 },
        { name: "Physics", mcqs: 60 },
        { name: "Chemistry", mcqs: 40 },
        { name: "English", mcqs: 20 }
      ]
    }
  },
  {
    id: "fast",
    name: "FAST Entry Test",
    pattern: {
      totalMCQs: 120,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: true,
      allowsCalculator: false,
      subjects: [
        { name: "Advanced Mathematics", mcqs: 50 },
        { name: "Basic Mathematics", mcqs: 20 },
        { name: "Analytical", mcqs: 20 },
        { name: "English", mcqs: 30 }
      ]
    }
  },
  {
    id: "air",
    name: "Air University Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Quantitative", mcqs: 25 },
        { name: "Analytical", mcqs: 25 },
        { name: "English", mcqs: 20 },
        { name: "Subject Specific", mcqs: 30 }
      ]
    }
  },
  {
    id: "bahria",
    name: "Bahria University Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Quantitative", mcqs: 15 },
        { name: "Analytical", mcqs: 15 },
        { name: "Verbal", mcqs: 30 },
        { name: "Physics", mcqs: 10 },
        { name: "Advanced Mathematics", mcqs: 30 }
      ]
    }
  },
  {
    id: "uet",
    name: "UET (ECAT)",
    pattern: {
      totalMCQs: 100,
      duration: "1 hour 40 minutes",
      totalMarks: 400,
      isComputerBased: false,
      hasNegativeMarking: true,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 30 },
        { name: "Physics", mcqs: 30 },
        { name: "Comp. / Chem.", mcqs: 30 },
        { name: "English", mcqs: 10 }
      ]
    }
  },
  {
    id: "pu",
    name: "Punjab University Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Verbal", mcqs: 20 },
        { name: "Quantitative", mcqs: 20 },
        { name: "Subject Specific", mcqs: 60 }
      ]
    }
  },
  {
    id: "itu",
    name: "ITU Entry Test",
    pattern: {
      totalMCQs: 60,
      duration: "90 minutes",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Analytical", mcqs: 20 },
        { name: "Mathematics", mcqs: 40 }
      ]
    }
  },
  {
    id: "qau",
    name: "Quaid-e-Azam University Test",
    pattern: {
      totalMCQs: 100,
      duration: "100 minutes",
      totalMarks: 100,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Subject Specific", mcqs: 40 },
        { name: "English", mcqs: 30 },
        { name: "Logical Reasoning", mcqs: 30 }
      ]
    }
  },
  {
    id: "iiu",
    name: "IIUI Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "1 hour 40 minutes",
      totalMarks: 100,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Subject Specific", mcqs: 40 },
        { name: "English", mcqs: 30 },
        { name: "Logical Reasoning", mcqs: 30 }
      ]
    }
  }
];

export default testPatterns; 