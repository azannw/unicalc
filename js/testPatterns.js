// =====================================================
// UniCalc — Test Patterns Data
// =====================================================

const testPatterns = [
  {
    id: "pu",
    name: "PU Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Verbal Reasoning", mcqs: 20 },
        { name: "Quantitative Reasoning", mcqs: 20 },
        { name: "Subject Portion", mcqs: 60 }
      ],
      notes: "No negative marking. Answers are marked on bubble sheets (paper-based). A minimum 50% score in the entry test is generally required to qualify."
    }
  },
  {
    id: "pucit",
    name: "PUCIT Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Verbal Reasoning", mcqs: 20 },
        { name: "Quantitative Reasoning", mcqs: 20 },
        { name: "Subject Portion", mcqs: 60 }
      ],
      notes: "No negative marking. Answers are marked on bubble sheets (paper-based). A minimum 50% score in the entry test is generally required to qualify."
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
      ],
      notes: "Computer-based test. No negative marking. Test centers available across Pakistan."
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
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 30 },
        { name: "Physics", mcqs: 30 },
        { name: "English", mcqs: 20 }
      ],
      notes: "Each correct answer: 2.5 marks. No negative marking. No penalty for skipped questions."
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
      ],
      notes: "Paper-based test. No negative marking. Focus on conceptual understanding."
    }
  },
  {
    id: "comsats",
    name: "COMSATS (NTS-NAT)",
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
      ],
      notes: "NTS-NAT test accepted. Subject specific section varies based on program applied."
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
      notes: "IST does not conduct its own entry test. However, the following 8 entry tests are accepted for admission: NAT (NTS), HAT (ETC-HEC), NET (NUST), ECAT (UET Lahore), ETEA (UET Peshawar), MUET (Jamshoro), NED Entry Test, and ACT (USA). Applicants must score a minimum of 33% in the entry test."
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
      notes: "Scientific calculator is allowed. CBT available at Islamabad campus only."
    }
  },
  {
    id: "nutech",
    name: "NUTECH Entry Test (NUET)",
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
      ],
      notes: "Computer-based test. Focus on advanced mathematics concepts."
    }
  },
  {
    id: "fast",
    name: "FAST Entry Test (NU Test)",
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
        { name: "IQ", mcqs: 20 },
        { name: "English", mcqs: 30 }
      ],
      notes: "Negative marking: -0.125 for English, -0.25 for all other sections. NAT/SAT scores also accepted."
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
      ],
      notes: "NTS scores also accepted. Test centers in Islamabad and Multan."
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
      ],
      notes: "NTS scores also accepted. Multiple test dates available."
    }
  },
  {
    id: "uet",
    name: "UET (ECAT)",
    pattern: {
      totalMCQs: 100,
      duration: "1 hour 40 minutes",
      totalMarks: 400,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Mathematics", mcqs: 30 },
        { name: "Physics", mcqs: 30 },
        { name: "Comp. / Chemistry", mcqs: 30 },
        { name: "English", mcqs: 10 }
      ],
      notes: "Computer-based test conducted on campus labs. Each correct answer carries 4 marks. No negative marking."
    }
  },
  {
    id: "itu",
    name: "ITU Entry Test",
    pattern: {
      totalMCQs: 50,
      duration: "90 minutes",
      totalMarks: 100,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Analytical", mcqs: 20 },
        { name: "Mathematics", mcqs: 30 }
      ],
      notes: "SAT-I and NTS scores also accepted. Focus on analytical and mathematical reasoning."
    }
  },
  {
    id: "uhs",
    name: "MDCAT (Medical & Dental College Admission Test)",
    pattern: {
      totalMCQs: 200,
      duration: "3 hours 30 minutes",
      totalMarks: 200,
      isComputerBased: true,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Biology", mcqs: 68 },
        { name: "Chemistry", mcqs: 54 },
        { name: "Physics", mcqs: 54 },
        { name: "English", mcqs: 18 },
        { name: "Logical Reasoning", mcqs: 6 }
      ],
      notes: "Conducted by PMC (Pakistan Medical Commission). 1 mark per MCQ, no negative marking. Required for all Punjab medical/dental college admissions under UHS."
    }
  },
  {
    id: "nums",
    name: "NUMS Entry Test",
    pattern: {
      totalMCQs: 200,
      duration: "3 hours",
      totalMarks: 200,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Biology", mcqs: 65 },
        { name: "Chemistry", mcqs: 40 },
        { name: "Physics", mcqs: 30 },
        { name: "English", mcqs: 15 },
        { name: "Psychological (Qualifying)", mcqs: 50 }
      ],
      notes: "150 academic MCQs scored for aggregate + 50 psychological MCQs (pass/fail qualifying only, not counted in aggregate). Paper-based test. Only the 150 academic marks count toward the admission formula."
    }
  },
  {
    id: "iiu",
    name: "IIU Entry Test",
    pattern: {
      totalMCQs: 100,
      duration: "2 hours",
      totalMarks: 100,
      isComputerBased: false,
      hasNegativeMarking: false,
      allowsCalculator: false,
      subjects: [
        { name: "Physics", mcqs: 40 },
        { name: "Mathematics", mcqs: 40 },
        { name: "English", mcqs: 10 },
        { name: "Chemistry", mcqs: 10 }
      ],
      testTypes: [
        {
          type: "Engineering (BS EE/ME/CE)",
          subjects: [
            { name: "Physics", percentage: "40%" },
            { name: "Mathematics", percentage: "40%" },
            { name: "English", percentage: "10%" },
            { name: "Chemistry", percentage: "10%" }
          ]
        },
        {
          type: "Computer Science / AI / Software Engineering",
          subjects: [
            { name: "English", percentage: "30%" },
            { name: "Analytical", percentage: "20%" },
            { name: "Physics", percentage: "25%" },
            { name: "Mathematics (SSC level)", percentage: "25%" }
          ]
        }
      ],
      notes: "100 MCQs in 2 hours. Engineering test focuses on Physics and Mathematics. CS/AI/SE test focuses on English, Analytical reasoning, Physics and SSC-level Mathematics."
    }
  }
];

// Helper function to get test pattern by university ID
function getTestPatternById(universityId) {
  return testPatterns.find(uni => uni.id === universityId) || null;
}
