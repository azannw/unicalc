export interface Formula {
  matriculation: number;
  intermediate: number;
  entryTest: number;
}

export interface MinimumCriteria {
  matriculation: number;
  intermediate: number;
  entryTest: number;
}

export interface AdmissionChance {
  min: number;
  max: number;
  rating: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  comment: string;
}

export interface Program {
  id: string;
  name: string;
  testOptions: string[];
  formula: Formula;
  minimumCriteria: MinimumCriteria;
  notes: string;
  admissionChances?: AdmissionChance[];
}

export interface MeritData {
  year: number;
  programs: {
    name: string;
    merit: string;
    seats?: number;
    shift?: string;
  }[];
  source?: string;
  notes?: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  programs: Program[];
  applicationDeadline: string;
  applicationFee: string;
  description: string;
  website: string;
  isImplemented: boolean;
  interestingFacts?: {
    title: string;
    description: string;
    icon: string;
  }[];
  meritData?: MeritData[];
  meritEstimate?: {
    year: number;
    programs: {
      name: string;
      estimate: string;
      confidence: 'high' | 'medium' | 'low';
      trend?: 'up' | 'down' | 'stable';
    }[];
    notes?: string;
  };
}

const universities: University[] = [
  {
    id: "pu",
    name: "University of the Punjab",
    shortName: "PU",
    logo: "/imgs/pu.jpg",
    meritData: [
      {
        year: 2024,
        programs: [
          { name: "BS Computer Science", merit: "81.3%", seats: 200 },
          { name: "BS Information Technology", merit: "79.8%", seats: 150 },
          { name: "BS Software Engineering", merit: "80.5%", seats: 120 },
          { name: "BS Data Science", merit: "80.1%", seats: 100 }
        ],
        source: "PU Admission Office 2024",
        notes: "Merit increased by approximately 1.2% compared to previous year"
      },
      {
        year: 2023,
        programs: [
          { name: "BS Computer Science", merit: "80.1%", seats: 200 },
          { name: "BS Information Technology", merit: "78.6%", seats: 150 },
          { name: "BS Software Engineering", merit: "79.3%", seats: 120 },
          { name: "BS Data Science", merit: "78.9%", seats: 100 }
        ]
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "78.9%", seats: 180 },
          { name: "BS Information Technology", merit: "77.4%", seats: 140 },
          { name: "BS Software Engineering", merit: "78.1%", seats: 110 },
          { name: "BS Data Science", merit: "77.7%", seats: 90 }
        ]
      }
    ],
    programs: [
      {
        id: "bscs",
        name: "BS Computer Science",
        testOptions: ["PU Entry Test"],
        formula: {
          matriculation: 20,
          intermediate: 30,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Comprehensive computer science program with strong theoretical foundation",
        admissionChances: [
          { min: 85, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 75, max: 84, rating: 'High', comment: 'Good chance of admission' },
          { min: 65, max: 74, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 55, max: 64, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 54, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      },
      {
        id: "bsit",
        name: "BS Information Technology",
        testOptions: ["PU Entry Test"],
        formula: {
          matriculation: 20,
          intermediate: 30,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Focuses on practical IT skills and applications",
        admissionChances: [
          { min: 83, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 73, max: 82, rating: 'High', comment: 'Good chance of admission' },
          { min: 63, max: 72, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 53, max: 62, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 52, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      },
      {
        id: "bsse",
        name: "BS Software Engineering",
        testOptions: ["PU Entry Test"],
        formula: {
          matriculation: 20,
          intermediate: 30,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Comprehensive software engineering program with industry focus",
        admissionChances: [
          { min: 84, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 74, max: 83, rating: 'High', comment: 'Good chance of admission' },
          { min: 64, max: 73, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 54, max: 63, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 53, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      },
      {
        id: "bsds",
        name: "BS Data Science",
        testOptions: ["PU Entry Test"],
        formula: {
          matriculation: 20,
          intermediate: 30,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Cutting-edge program in data science and analytics",
        admissionChances: [
          { min: 83, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 73, max: 82, rating: 'High', comment: 'Good chance of admission' },
          { min: 63, max: 72, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 53, max: 62, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 52, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      }
    ],
    applicationDeadline: "Varies by program",
    applicationFee: "PKR 2,000 - 3,000",
    description: "The University of the Punjab, commonly referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. It is the oldest and one of the most prestigious universities in Pakistan.",
    website: "https://pu.edu.pk",
    isImplemented: true,
    interestingFacts: [
      {
        title: "Established in 1882",
        description: "One of the oldest universities in the Indian subcontinent.",
        icon: "🏛️"
      },
      {
        title: "Largest University",
        description: "Largest public sector university in Pakistan with over 30,000 students.",
        icon: "🎓"
      },
      {
        title: "Research Excellence",
        description: "Recognized by HEC in the top category of Pakistani universities.",
        icon: "🔬"
      },
      {
        title: "Alumni Network",
        description: "Strong alumni network including Nobel laureates and leaders in various fields.",
        icon: "🌐"
      }
    ],
    meritEstimate: {
      year: 2025,
      programs: [
        { name: "BS Computer Science", estimate: "82-85%", confidence: 'high', trend: 'up' },
        { name: "BS Information Technology", estimate: "80-83%", confidence: 'high', trend: 'up' },
        { name: "BS Software Engineering", estimate: "81-84%", confidence: 'high', trend: 'up' },
        { name: "BS Data Science", estimate: "81-83%", confidence: 'high', trend: 'up' }
      ],
      notes: "Merit is expected to increase slightly due to growing competition. Evening program merit is typically 2-3% lower than morning programs."
    }
  },
  {
    id: "islamicuni",
    name: "International Islamic University Islamabad",
    shortName: "IIUI",
    logo: "/imgs/iiui.jpg",
    meritData: [
      {
        year: 2024,
        programs: [
          { name: "BS Computer Science", merit: "76.5%", seats: 120 },
          { name: "BS Information Technology", merit: "74.8%", seats: 100 },
          { name: "BS Software Engineering", merit: "75.9%", seats: 80 }
        ],
        source: "IIUI Admission Office 2024",
        notes: "Separate merit lists for male and female campuses"
      },
      {
        year: 2023,
        programs: [
          { name: "BS Computer Science", merit: "75.2%", seats: 120 },
          { name: "BS Information Technology", merit: "73.5%", seats: 100 },
          { name: "BS Software Engineering", merit: "74.6%", seats: 80 }
        ]
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "73.8%", seats: 110 },
          { name: "BS Information Technology", merit: "72.1%", seats: 90 },
          { name: "BS Software Engineering", merit: "73.3%", seats: 70 }
        ]
      }
    ],
    programs: [
      {
        id: "bscs",
        name: "BS Computer Science",
        testOptions: ["IIU Entry Test"],
        formula: {
          matriculation: 20,
          intermediate: 30,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Comprehensive computer science program with a focus on both theoretical and practical aspects.",
        admissionChances: [
          { min: 78, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 68, max: 77, rating: 'High', comment: 'Good chance of admission' },
          { min: 58, max: 67, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 48, max: 57, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 47, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      },
      {
        id: "bsit",
        name: "BS Information Technology",
        testOptions: ["IIU Entry Test"],
        formula: {
          matriculation: 20,
          intermediate: 30,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Focuses on practical IT skills with industry-relevant curriculum.",
        admissionChances: [
          { min: 75, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 65, max: 74, rating: 'High', comment: 'Good chance of admission' },
          { min: 55, max: 64, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 45, max: 54, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 44, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      },
      {
        id: "bsse",
        name: "BS Software Engineering",
        testOptions: ["IIU Entry Test"],
        formula: {
          matriculation: 20,
          intermediate: 30,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Software engineering program with emphasis on modern development practices.",
        admissionChances: [
          { min: 80, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 70, max: 79, rating: 'High', comment: 'Good chance of admission' },
          { min: 60, max: 69, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 50, max: 59, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 49, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      }
    ],
    applicationDeadline: "Varies by program",
    applicationFee: "PKR 2,500 - 3,500",
    description: "International Islamic University Islamabad (IIUI) is a public research university in Islamabad, Pakistan. It is known for its focus on Islamic teachings alongside modern education and research.",
    website: "https://www.iiu.edu.pk",
    isImplemented: true,
    interestingFacts: [
      {
        title: "Established in 1980",
        description: "Founded as an international institution with a focus on Islamic teachings and modern education.",
        icon: "🏛️"
      },
      {
        title: "International Recognition",
        description: "Recognized by the OIC and has students from over 45 countries.",
        icon: "🌍"
      },
      {
        title: "Campus",
        description: "Sprawling campus with separate facilities for male and female students.",
        icon: "🏫"
      }
    ],
    meritEstimate: {
      year: 2025,
      programs: [
        { name: "BS Computer Science", estimate: "75-80%", confidence: 'high', trend: 'stable' },
        { name: "BS Information Technology", estimate: "72-77%", confidence: 'high', trend: 'stable' },
        { name: "BS Software Engineering", estimate: "78-83%", confidence: 'high', trend: 'up' }
      ],
      notes: "Merit varies by program and campus. Female campus merit is generally slightly lower than the male campus."
    }
  },
  {
    id: "pucit",
    name: "Punjab University College of Information Technology",
    shortName: "PUCIT",
    logo: "/imgs/pu.jpg",
    meritData: [
      {
        year: 2024,
        programs: [
          { name: "BS Computer Science", merit: "82.5%", seats: 150 },
          { name: "BS Software Engineering", merit: "80.8%", seats: 120 },
          { name: "BS Information Technology", merit: "79.2%", seats: 100 }
        ],
        source: "PUCIT Admission Office 2024",
        notes: "Merit increased by approximately 1.5% compared to previous year"
      },
      {
        year: 2023,
        programs: [
          { name: "BS Computer Science", merit: "81.0%", seats: 150 },
          { name: "BS Software Engineering", merit: "79.3%", seats: 120 },
          { name: "BS Information Technology", merit: "77.7%", seats: 100 }
        ]
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "79.5%", seats: 140 },
          { name: "BS Software Engineering", merit: "78.0%", seats: 110 },
          { name: "BS Information Technology", merit: "76.2%", seats: 90 }
        ]
      }
    ],
    programs: [
      {
        id: "bscs",
        name: "BS Computer Science",
        testOptions: ["PU Entry Test"],
        formula: {
          matriculation: 0.20,
          intermediate: 0.30,
          entryTest: 0.50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Highly competitive program with focus on computer science fundamentals.",
        admissionChances: [
          { min: 80, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 70, max: 79, rating: 'High', comment: 'Good chance of admission' },
          { min: 60, max: 69, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 50, max: 59, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 49, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      },
      {
        id: "bsswe",
        name: "BS Software Engineering",
        testOptions: ["PU Entry Test"],
        formula: {
          matriculation: 20,
          intermediate: 30,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 40
        },
        notes: "Focuses on software development and engineering principles.",
        admissionChances: [
          { min: 78, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 68, max: 77, rating: 'High', comment: 'Good chance of admission' },
          { min: 58, max: 67, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 48, max: 57, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 47, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      }
    ],
    applicationDeadline: "Varies by program",
    applicationFee: "PKR 1,500 - 3,000",
    description: "PUCIT is one of the oldest and most prestigious IT institutions in Pakistan, offering cutting-edge programs in computer science and information technology.",
    website: "https://pucit.edu.pk",
    isImplemented: true,
    interestingFacts: [
      {
        title: "Established in 1995",
        description: "One of the oldest IT institutions in Pakistan.",
        icon: "🏛️"
      },
      {
        title: "Part of PU",
        description: "Affiliated with the University of the Punjab, the oldest university in Pakistan.",
        icon: "🎓"
      },
      {
        title: "Industry Links",
        description: "Strong connections with IT industry leaders and regular recruitment drives.",
        icon: "🤝"
      }
    ],
    meritEstimate: {
      year: 2025,
      programs: [
        { name: "BS Computer Science", estimate: "82-85%", confidence: 'high', trend: 'up' },
        { name: "BS Software Engineering", estimate: "80-83%", confidence: 'high', trend: 'up' }
      ],
      notes: "Merit is expected to increase slightly due to higher competition."
    }
  },
  {
    id: "quaideazam",
    name: "Quaid-i-Azam University Islamabad",
    shortName: "QAU",
    logo: "/imgs/qau.jpg",
    meritData: [
      {
        year: 2024,
        programs: [
          { name: "BS Computer Science", merit: "84.7%", seats: 100 },
          { name: "BS Information Technology", merit: "82.3%", seats: 80 },
          { name: "BS Software Engineering", merit: "83.5%", seats: 70 }
        ],
        source: "QAU Admission Office 2024",
        notes: "Merit shows an increasing trend due to high demand"
      },
      {
        year: 2023,
        programs: [
          { name: "BS Computer Science", merit: "83.2%", seats: 100 },
          { name: "BS Information Technology", merit: "81.0%", seats: 80 },
          { name: "BS Software Engineering", merit: "82.1%", seats: 70 }
        ]
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "81.8%", seats: 100 },
          { name: "BS Information Technology", merit: "79.5%", seats: 80 },
          { name: "BS Software Engineering", merit: "80.7%", seats: 70 }
        ]
      }
    ],
    programs: [
      {
        id: "bscs",
        name: "BS Computer Science",
        testOptions: ["NTS NAT"],
        formula: {
          matriculation: 0.25,
          intermediate: 0.25,
          entryTest: 0.5
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Focuses on theoretical and applied computer science.",
        admissionChances: [
          { min: 85, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 75, max: 84, rating: 'High', comment: 'Good chance of admission' },
          { min: 65, max: 74, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 55, max: 64, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 54, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      },
      {
        id: "bsit",
        name: "BS Information Technology",
        testOptions: ["NTS NAT"],
        formula: {
          matriculation: 25,
          intermediate: 25,
          entryTest: 50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Focuses on practical IT skills and applications.",
        admissionChances: [
          { min: 83, max: 100, rating: 'Very High', comment: 'Excellent chance of admission' },
          { min: 73, max: 82, rating: 'High', comment: 'Good chance of admission' },
          { min: 63, max: 72, rating: 'Medium', comment: 'Moderate chance of admission' },
          { min: 53, max: 62, rating: 'Low', comment: 'Low chance of admission' },
          { min: 0, max: 52, rating: 'Very Low', comment: 'Unlikely to get admission' }
        ]
      }
    ],
    applicationDeadline: "Varies by program",
    applicationFee: "PKR 2,000 - 3,500",
    description: "Quaid-i-Azam University is a public research university in Islamabad, Pakistan. It is ranked as the top university in Pakistan by QS World University Rankings.",
    website: "https://qau.edu.pk",
    isImplemented: true,
    interestingFacts: [
      {
        title: "Top Ranked",
        description: "Consistently ranked as the top university in Pakistan by HEC.",
        icon: "🏆"
      },
      {
        title: "Research Focus",
        description: "Strong emphasis on research with numerous research centers.",
        icon: "🔬"
      },
      {
        title: "Beautiful Campus",
        description: "Spread over 1,500 acres with scenic views of the Margalla Hills.",
        icon: "🌄"
      }
    ],
    meritEstimate: {
      year: 2025,
      programs: [
        { name: "BS Computer Science", estimate: "84-87%", confidence: 'high', trend: 'up' },
        { name: "BS Information Technology", estimate: "82-85%", confidence: 'high', trend: 'up' }
      ],
      notes: "Merit is expected to remain competitive due to high demand."
    }
  },
  {
    id: "fast",
    name: "FAST National University",
    shortName: "FAST",
    logo: "/imgs/fast.jpg",
    interestingFacts: [
      {
        title: "Founded in 2000",
        description: "Established as one of Pakistan's first IT-focused universities.",
        icon: "🏛️"
      },
      {
        title: "Multiple Campuses",
        description: "Has 7 campuses across Pakistan including Islamabad, Lahore, and Karachi.",
        icon: "🌍"
      },
      {
        title: "Research Focus",
        description: "Strong emphasis on research with multiple research centers and labs.",
        icon: "🔬"
      }
    ],
    meritData: [
      {
        year: 2024,
        programs: [
          { name: "BS Computer Science", merit: "82.5%", seats: 300 },
          { name: "BS Software Engineering", merit: "80.1%", seats: 250 },
          { name: "BS Data Science", merit: "81.2%", seats: 100 },
          { name: "BS Artificial Intelligence", merit: "83.7%", seats: 80 },
          { name: "BS Cyber Security", merit: "82.9%", seats: 70 },
        ],
        source: "FAST University Admissions Office",
        notes: "Merit increased by approximately 2-3% compared to 2023 due to increased competition."
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "80.1%", seats: 300 },
          { name: "BS Software Engineering", merit: "77.8%", seats: 250 },
          { name: "BS Data Science", merit: "78.5%", seats: 100 },
          { name: "BS Artificial Intelligence", merit: "81.0%", seats: 80 },
          { name: "BS Cyber Security", merit: "80.3%", seats: 70 },
        ],
        source: "FAST University Admissions Office"
      }
    ],
    meritEstimate: {
      year: 2025,
      programs: [
        { 
          name: "BS Computer Science", 
          estimate: "83.5-84.5%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Software Engineering", 
          estimate: "81.0-82.0%", 
          confidence: 'medium',
          trend: 'up' 
        },
        { 
          name: "BS Data Science", 
          estimate: "82.0-83.0%", 
          confidence: 'medium',
          trend: 'up' 
        },
        { 
          name: "BS Artificial Intelligence", 
          estimate: "84.5-85.5%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Cyber Security", 
          estimate: "83.5-84.5%", 
          confidence: 'medium',
          trend: 'up' 
        },
      ],
      notes: "Estimates based on previous years' trends and expected increase in competition. AI program shows highest demand growth."
    },
    programs: [
      {
        id: "cs",
        name: "Computing Programs",
        testOptions: ["NU", "NAT", "SAT"],
        formula: {
          matriculation: 0.10,
          intermediate: 0.40,
          entryTest: 0.50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Includes CS, SE, DS, AI and Cybersecurity programs.",
        admissionChances: [
          { min: 85, max: 100, rating: 'Very High', comment: 'Excellent chances in all campuses' },
          { min: 75, max: 84.99, rating: 'High', comment: 'Good chances in most campuses' },
          { min: 70, max: 74.99, rating: 'Medium', comment: 'Reasonable chances in some campuses' },
          { min: 65, max: 69.99, rating: 'Low', comment: 'Limited chances, consider alternative programs' },
          { min: 0, max: 64.99, rating: 'Very Low', comment: 'Consider alternative universities' }
        ]
      },
      {
        id: "eng",
        name: "Engineering",
        testOptions: ["NU", "NAT", "SAT"],
        formula: {
          matriculation: 0.17,
          intermediate: 0.50,
          entryTest: 0.33
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Includes Electrical, Electronic, and Civil Engineering programs. For FSc students: Matric (17%) + Intermediate (50%) + Entry Test (33%).",
        admissionChances: [
          { min: 85, max: 100, rating: 'Very High', comment: 'Excellent chances in all campuses' },
          { min: 75, max: 84.99, rating: 'High', comment: 'Good chances in most campuses' },
          { min: 70, max: 74.99, rating: 'Medium', comment: 'Reasonable chances in some campuses' },
          { min: 65, max: 69.99, rating: 'Low', comment: 'Limited chances, consider alternative programs' },
          { min: 0, max: 64.99, rating: 'Very Low', comment: 'Consider alternative universities' }
        ]
      },
      {
        id: "bus",
        name: "Business",
        testOptions:  ["NU", "NAT", "SAT"],
        formula: {
          matriculation: 0.10,
          intermediate: 0.40,
          entryTest: 0.50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Includes Business Administration, Accounting and Management programs.",
        admissionChances: [
          { min: 83, max: 100, rating: 'Very High', comment: 'Excellent chances in all campuses' },
          { min: 73, max: 82.99, rating: 'High', comment: 'Good chances in most campuses' },
          { min: 68, max: 72.99, rating: 'Medium', comment: 'Reasonable chances in some campuses' },
          { min: 63, max: 67.99, rating: 'Low', comment: 'Limited chances, consider alternative programs' },
          { min: 0, max: 62.99, rating: 'Very Low', comment: 'Consider alternative universities' }
        ]
      }
    ],
    applicationDeadline: "June 4, 2025",
    applicationFee: "PKR 1,500",
    description: "FAST-NUCES is one of Pakistan's premier universities focused on computer science and engineering education.",
    website: "https://www.nu.edu.pk/",
    isImplemented: true
  },
  {
    id: "nust",
    name: "National University of Sciences & Technology",
    shortName: "NUST",
    logo: "/imgs/nust.jpg",
    interestingFacts: [
      {
        title: "Founded in 1991",
        description: "Established as the first engineering university in Pakistan's capital.",
        icon: "🏛️"
      },
      {
        title: "#1 Ranking",
        description: "Consistently ranked as Pakistan's top engineering university by HEC.",
        icon: "🏆"
      },
      {
        title: "Research Powerhouse",
        description: "Home to 15+ research centers and 40+ research groups.",
        icon: "🔬"
      }
    ],
    meritData: [
      {
        year: 2023,
        programs: [
          { name: "BS Computer Science", merit: "84.5%", seats: 300 },
          { name: "BS Software Engineering", merit: "83.2%", seats: 250 },
          { name: "BS Artificial Intelligence", merit: "85.1%", seats: 100 },
          { name: "BS Cyber Security", merit: "83.8%", seats: 80 },
          { name: "BS Electrical Engineering", merit: "82.3%", seats: 200 },
          { name: "BS Mechanical Engineering", merit: "81.7%", seats: 180 },
        ],
        source: "NUST Admissions Office",
        notes: "Merit increased by 1.5-2% compared to 2022"
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "82.8%", seats: 300 },
          { name: "BS Software Engineering", merit: "81.5%", seats: 250 },
          { name: "BS Artificial Intelligence", merit: "83.2%", seats: 100 },
          { name: "BS Cyber Security", merit: "82.1%", seats: 80 },
          { name: "BS Electrical Engineering", merit: "80.8%", seats: 200 },
          { name: "BS Mechanical Engineering", merit: "80.2%", seats: 180 },
        ],
        source: "NUST Admissions Office"
      }
    ],
    meritEstimate: {
      year: 2024,
      programs: [
        { 
          name: "BS Computer Science", 
          estimate: "85.0-86.0%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Software Engineering", 
          estimate: "83.5-84.5%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Artificial Intelligence", 
          estimate: "85.5-86.5%", 
          confidence: 'medium',
          trend: 'up' 
        },
        { 
          name: "BS Cyber Security", 
          estimate: "84.0-85.0%", 
          confidence: 'medium',
          trend: 'up' 
        },
        { 
          name: "BS Electrical Engineering", 
          estimate: "82.5-83.5%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Mechanical Engineering", 
          estimate: "82.0-83.0%", 
          confidence: 'high',
          trend: 'up' 
        },
      ],
      notes: "Expected increase in merit due to growing interest in tech fields"
    },
    programs: [
      {
        id: "cs",
        name: "Computing Programs",
        testOptions: ["NET"],
        formula: {
          matriculation: 0.10,
          intermediate: 0.15,
          entryTest: 0.75
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Includes CS, SE, DS, AI and Cybersecurity programs. For A-Level students: 25% weightage is given to O-Level equivalence marks as per IBCC.",
        admissionChances: [
          { min: 87, max: 100, rating: 'Very High', comment: 'Excellent chances for most programs' },
          { min: 78, max: 86.99, rating: 'High', comment: 'Good chances for many programs' },
          { min: 73, max: 77.99, rating: 'Medium', comment: 'Moderate chances for some programs' },
          { min: 68, max: 72.99, rating: 'Low', comment: 'Limited chances, consider alternative programs' },
          { min: 0, max: 67.99, rating: 'Very Low', comment: 'Consider alternative universities' }
        ]
      },
      {
        id: "eng",
        name: "Engineering",
        testOptions: ["NET"],
        formula: {
          matriculation: 0.10,
          intermediate: 0.15,
          entryTest: 0.75
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All engineering programs follow the same aggregate formula. For A-Level students: 25% weightage is given to O-Level equivalence marks as per IBCC.",
        admissionChances: [
          { min: 88, max: 100, rating: 'Very High', comment: 'Excellent chances for most disciplines' },
          { min: 80, max: 87.99, rating: 'High', comment: 'Good chances for many disciplines' },
          { min: 75, max: 79.99, rating: 'Medium', comment: 'Moderate chances for some disciplines' },
          { min: 70, max: 74.99, rating: 'Low', comment: 'Limited chances, consider alternative programs' },
          { min: 0, max: 69.99, rating: 'Very Low', comment: 'Consider alternative universities' }
        ]
      }
    ],
    applicationDeadline: "May 30, 2025",
    applicationFee: "PKR 5,000",
    description: "NUST is a premier institution of Pakistan, renowned for excellence in science and technology education.",
    website: "https://nust.edu.pk/",
    isImplemented: true
  },
  {
    id: "comsats",
    name: "COMSATS University Islamabad",
    shortName: "COMSATS",
    logo: "/imgs/comsats.jpg",
    interestingFacts: [
      {
        title: "Established in 1998",
        description: "One of Pakistan's fastest-growing public sector universities.",
        icon: "📈"
      },
      {
        title: "Multiple Campuses",
        description: "7 campuses across Pakistan including Islamabad, Lahore, and Abbottabad.",
        icon: "🏫"
      },
      {
        title: "Research Excellence",
        description: "Ranked among top 500 universities in Asia by QS Rankings.",
        icon: "🔍"
      }
    ],
    meritData: [
      {
        year: 2023,
        programs: [
          { name: "BS Computer Science", merit: "78.5%", seats: 400 },
          { name: "BS Software Engineering", merit: "76.8%", seats: 300 },
          { name: "BS Artificial Intelligence", merit: "79.2%", seats: 120 },
          { name: "BS Cyber Security", merit: "77.5%", seats: 100 },
          { name: "BS Electrical Engineering", merit: "75.3%", seats: 250 },
          { name: "BS Mechanical Engineering", merit: "74.8%", seats: 200 },
        ],
        source: "COMSATS Admissions Office",
        notes: "Merit increased by 1-1.5% compared to 2022"
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "77.2%", seats: 400 },
          { name: "BS Software Engineering", merit: "75.5%", seats: 300 },
          { name: "BS Artificial Intelligence", merit: "77.8%", seats: 120 },
          { name: "BS Cyber Security", merit: "76.2%", seats: 100 },
          { name: "BS Electrical Engineering", merit: "74.0%", seats: 250 },
          { name: "BS Mechanical Engineering", merit: "73.5%", seats: 200 },
        ],
        source: "COMSATS Admissions Office"
      }
    ],
    meritEstimate: {
      year: 2024,
      programs: [
        { 
          name: "BS Computer Science", 
          estimate: "79.0-80.0%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Software Engineering", 
          estimate: "77.5-78.5%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Artificial Intelligence", 
          estimate: "79.5-80.5%", 
          confidence: 'medium',
          trend: 'up' 
        },
        { 
          name: "BS Cyber Security", 
          estimate: "78.0-79.0%", 
          confidence: 'medium',
          trend: 'up' 
        },
        { 
          name: "BS Electrical Engineering", 
          estimate: "76.0-77.0%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Mechanical Engineering", 
          estimate: "75.5-76.5%", 
          confidence: 'high',
          trend: 'up' 
        },
      ],
      notes: "Expected moderate increase in merit across all programs"
    },
    programs: [
      {
        id: "cs",
        name: "Computing Programs",
        testOptions: ["NTS-NAT"],
        formula: {
          matriculation: 0.10,
          intermediate: 0.40,
          entryTest: 0.50
        },
        minimumCriteria: {
          matriculation: 50,
          intermediate: 50,
          entryTest: 50
        },
        notes: "Includes CS, SE, DS, AI and related programs.",
        admissionChances: [
          { min: 83, max: 100, rating: 'Very High', comment: 'Excellent chances in all campuses' },
          { min: 73, max: 82.99, rating: 'High', comment: 'Good chances in most campuses' },
          { min: 67, max: 72.99, rating: 'Medium', comment: 'Reasonable chances in some campuses' },
          { min: 60, max: 66.99, rating: 'Low', comment: 'Limited chances, consider alternative programs' },
          { min: 0, max: 59.99, rating: 'Very Low', comment: 'Consider alternative universities' }
        ]
      }
    ],
    applicationDeadline: "July 10, 2025",
    applicationFee: "PKR 2,000",
    description: "COMSATS offers high-quality education in various disciplines with a focus on research and innovation.",
    website: "https://www.comsats.edu.pk/",
    isImplemented: true
  },
  {
    id: "giki",
    name: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
    shortName: "GIKI",
    logo: "/imgs/giki.jpg",
    interestingFacts: [
      {
        title: "Visionary Foundation",
        description: "Established in 1993 by Ghulam Ishaq Khan, former President of Pakistan, with a vision to create a world-class engineering institution.",
        icon: "🎓"
      },
      {
        title: "First Private Engineering University",
        description: "GIKI was Pakistan's first private sector engineering university, setting new standards in technical education.",
        icon: "🏛️"
      },
      {
        title: "International Recognition",
        description: "Consistently ranked among the top engineering universities in Pakistan and recognized in international rankings for engineering and technology.",
        icon: "🌍"
      },
      {
        title: "Research Excellence",
        description: "Home to cutting-edge research centers including the National Center for Artificial Intelligence and the National Center in Big Data & Cloud Computing.",
        icon: "🔬"
      },
      {
        title: "Student Innovation",
        description: "Students have won numerous international competitions including Formula Student UK and International RoboCup.",
        icon: "🏆"
      },
      {
        title: "Alumni Network",
        description: "Strong global alumni network with graduates working at top tech companies like Google, Microsoft, and SpaceX.",
        icon: "🌐"
      },
      {
        title: "Entrepreneurial Hub",
        description: "Hosts 'The Catalyst' - a startup incubator that has helped launch over 50 tech startups.",
        icon: "💡"
      },
      {
        title: "Unique Location",
        description: "Nestled in the scenic hills of Khyber Pakhtunkhwa, offering a peaceful environment for academic pursuits.",
        icon: "🏞️"
      },
      {
        title: "Student Societies",
        description: "Over 24 active student societies including IEEE, ACM, ASME, and AIAA chapters for professional development.",
        icon: "👥"
      },
      {
        title: "Global Collaborations",
        description: "Academic partnerships with top international universities for student exchange and research collaboration.",
        icon: "🤝"
      }
    ],
    meritData: [
      {
        year: 2023,
        programs: [
          { name: "BS Computer Science", merit: "86.2%", seats: 150 },
          { name: "BS Computer Engineering", merit: "85.8%", seats: 120 },
          { name: "BS Artificial Intelligence", merit: "87.1%", seats: 80 },
          { name: "BS Electrical Engineering", merit: "84.5%", seats: 100 },
          { name: "BS Mechanical Engineering", merit: "83.9%", seats: 120 },
          { name: "BS Material Engineering", merit: "82.0%", seats: 80 },
        ],
        source: "GIKI Admissions Office",
        notes: "Merit increased by 1.2-1.8% compared to 2023"
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "84.7%", seats: 150 },
          { name: "BS Computer Engineering", merit: "84.3%", seats: 120 },
          { name: "BS Artificial Intelligence", merit: "85.6%", seats: 80 },
          { name: "BS Electrical Engineering", merit: "83.0%", seats: 100 },
          { name: "BS Mechanical Engineering", merit: "82.4%", seats: 120 },
          { name: "BS Material Engineering", merit: "80.5%", seats: 80 },
        ],
        source: "GIKI Admissions Office"
      }
    ],
    meritEstimate: {
      year: 2024,
      programs: [
        { 
          name: "BS Computer Science", 
          estimate: "87.0-88.0%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Computer Engineering", 
          estimate: "86.5-87.5%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Artificial Intelligence", 
          estimate: "87.8-88.8%", 
          confidence: 'medium',
          trend: 'up' 
        },
        { 
          name: "BS Electrical Engineering", 
          estimate: "85.2-86.2%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Mechanical Engineering", 
          estimate: "84.6-85.6%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Material Engineering", 
          estimate: "82.7-83.7%", 
          confidence: 'medium',
          trend: 'up' 
        },
      ],
      notes: "Expected increase in merit due to growing reputation and limited seats"
    },
    programs: [
      {
        id: "cs",
        name: "Computing Programs",
        testOptions: ["GIKI Entry Test"],
        formula: {
          matriculation: 0.10,
          intermediate: 0.00,
          entryTest: 0.85
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Includes Computer Science and Software Engineering.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ]
      }
    ],
    applicationDeadline: "June 30, 2025",
    applicationFee: "PKR 3,500",
    description: "GIKI is recognized as one of Pakistan's most prestigious engineering institutions.",
    website: "https://www.giki.edu.pk/",
    isImplemented: true
  },
  
  {
    id: "uet",
    name: "University of Engineering & Technology",
    shortName: "UET",
    logo: "/imgs/uet.jpg",
    interestingFacts: [
      {
        title: "Established in 1921",
        description: "One of the oldest engineering institutions in South Asia, originally known as Mughalpura Technical College.",
        icon: "🏛️"
      },
      {
        title: "Historical Significance",
        description: "Played a pivotal role in Pakistan's industrial development since independence.",
        icon: "📜"
      },
      {
        title: "Alumni Network",
        description: "Boasts a strong network of over 50,000 alumni worldwide.",
        icon: "🌐"
      }
    ],
    meritData: [
      {
        year: 2023,
        programs: [
          { name: "BS Computer Science", merit: "83.7%", seats: 200 },
          { name: "BS Software Engineering", merit: "82.5%", seats: 150 },
          { name: "BS Artificial Intelligence", merit: "84.2%", seats: 80 },
          { name: "BS Electrical Engineering", merit: "81.8%", seats: 250 },
          { name: "BS Mechanical Engineering", merit: "81.2%", seats: 300 },
          { name: "BS Civil Engineering", merit: "80.5%", seats: 280 },
        ],
        source: "UET Admissions Office",
        notes: "Merit increased by 1-1.5% compared to 2022"
      },
      {
        year: 2022,
        programs: [
          { name: "BS Computer Science", merit: "82.3%", seats: 200 },
          { name: "BS Software Engineering", merit: "81.1%", seats: 150 },
          { name: "BS Artificial Intelligence", merit: "82.8%", seats: 80 },
          { name: "BS Electrical Engineering", merit: "80.4%", seats: 250 },
          { name: "BS Mechanical Engineering", merit: "79.8%", seats: 300 },
          { name: "BS Civil Engineering", merit: "79.1%", seats: 280 },
        ],
        source: "UET Admissions Office"
      }
    ],
    meritEstimate: {
      year: 2024,
      programs: [
        { 
          name: "BS Computer Science", 
          estimate: "84.5-85.5%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Software Engineering", 
          estimate: "83.0-84.0%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Artificial Intelligence", 
          estimate: "84.8-85.8%", 
          confidence: 'medium',
          trend: 'up' 
        },
        { 
          name: "BS Electrical Engineering", 
          estimate: "82.5-83.5%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Mechanical Engineering", 
          estimate: "81.8-82.8%", 
          confidence: 'high',
          trend: 'up' 
        },
        { 
          name: "BS Civil Engineering", 
          estimate: "81.0-82.0%", 
          confidence: 'medium',
          trend: 'up' 
        },
      ],
      notes: "Expected steady increase in merit across all programs"
    },
    programs: [
      {
        id: "cs",
        name: "Computer Science",
        testOptions: ["ECAT"],
        formula: {
          matriculation: 0.17,
          intermediate: 0.50,
          entryTest: 0.33
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All engineering departments follow the same aggregate formula.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ]
      }
    ],
    applicationDeadline: "July 5, 2025",
    applicationFee: "PKR 2,800",
    description: "UET Lahore is one of Pakistan's oldest and most prestigious engineering institutions.",
    website: "https://www.uet.edu.pk/",
    isImplemented: true
  },
  {
    id: "air",
    name: "Air University",
    shortName: "Air University",
    logo: "/imgs/air.jpg",
    programs: [
      {
        id: "eng",
        name: "Engineering Programs",
        testOptions: ["CBT", "NTS"],
        formula: {
          matriculation: 0.10,
          intermediate: 0.50,
          entryTest: 0.40
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Engineering programs follow this specific formula."
      },
      {
        id: "cs",
        name: "Computer Science",
        testOptions: ["CBT", "NTS"],
        formula: {
          matriculation: 0.15,
          intermediate: 0.35,
          entryTest: 0.50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "Non-Engineering programs including Computer Science follow this formula.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ]
      }
    ],
    applicationDeadline: "June 30, 2025",
    applicationFee: "PKR 2,500",
    description: "Air University offers high-quality education in various engineering and non-engineering disciplines.",
    website: "https://www.au.edu.pk/",
    isImplemented: true
  },
  {
    id: "bahria",
    name: "Bahria University",
    shortName: "Bahria",
    logo: "/imgs/bahria.jpg",
    programs: [
      {
        id: "cs",
        name: "Computer Science",
        testOptions: ["Bahria University Admission Test", "NTS"],
        formula: {
          matriculation: 0.00,
          intermediate: 0.50,
          entryTest: 0.50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All departments, including Computer Science and Business, use the same aggregate formula.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ]
      }
    ],
    applicationDeadline: "July 15, 2025",
    applicationFee: "PKR 2,500",
    description: "Bahria University offers quality education across multiple disciplines.",
    website: "https://www.bahria.edu.pk/",
    isImplemented: true
  },
  {
    id: "iiu",
    name: "International Islamic University",
    shortName: "IIU",
    logo: "/imgs/iiui.jpg",
    programs: [
      {
        id: "cs",
        name: "Computer Science",
        testOptions: ["IIUI Admission Test"],
        formula: {
          matriculation: 0.00,
          intermediate: 0.40,
          entryTest: 0.60
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All departments, including Computer Science and Business, follow the same aggregate formula.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ] 
      }
    ],
    applicationDeadline: "July 25, 2025",
    applicationFee: "PKR 2,000",
    description: "International Islamic University Islamabad offers education in various fields with an Islamic perspective.",
    website: "https://www.iiu.edu.pk/",
    isImplemented: true
  },
  {
    id: "itu",
    name: "Information Technology University",
    shortName: "ITU",
    logo: "/imgs/itu.jpg",
    programs: [
      {
        id: "cs",
        name: "Computer Science",
        testOptions: ["ITU Admission Test", "SAT-I", "NTS"],
        formula: {
          matriculation: 0.15,
          intermediate: 0.35,
          entryTest: 0.50
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All departments, including Computer Science and Business, follow the admission formula: Matric (15%) + Intermediate (35%) + Entry Test (50%). Additional weightage may be given for interview performance.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ]
      }
    ],
    applicationDeadline: "July 10, 2025",
    applicationFee: "PKR 2,500",
    description: "ITU focuses on cutting-edge technology education and research.",
    website: "https://www.itu.edu.pk/",
    isImplemented: true
  },
  {
    id: "pieas",
    name: "Pakistan Institute of Engineering and Applied Sciences",
    shortName: "PIEAS",
    logo: "/imgs/pieas.jpg",
    programs: [
      {
        id: "eng",
        name: "Engineering Programs",
        testOptions: ["PIEAS Admission Test"],
        formula: {
          matriculation: 0.15,
          intermediate: 0.25,
          entryTest: 0.60
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All engineering departments follow the same aggregate formula.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ]
      }
    ],
    applicationDeadline: "June 20, 2025",
    applicationFee: "PKR 3,000",
    description: "PIEAS is a prestigious institution for nuclear engineering and related fields.",
    website: "https://www.pieas.edu.pk/",
    isImplemented: true
  },
  {
    id: "qau",
    name: "Quaid-i-Azam University",
    shortName: "QAU",
    logo: "/imgs/qau.jpg",
    programs: [
      {
        id: "cs",
        name: "All programs",
        testOptions: ["Leave the below section empty as QAU does not require an entry test"],
        formula: {
          matriculation: 0.30,
          intermediate: 0.70,
          entryTest: 0.00
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All departments, including Computer Science and Business, use the same aggregate formula.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ] 
      }
    ],
    applicationDeadline: "July 5, 2025",
    applicationFee: "PKR 2,000",
    description: "QAU is one of Pakistan's top-ranked public research universities.",
    website: "https://www.qau.edu.pk/",
    isImplemented: true
  },
  {
    id: "pu",
    name: "University of the Punjab",
    shortName: "PU",
    logo: "/imgs/pu.jpg",
    programs: [
      {
        id: "cs",
        name: "Computing Programs",
        testOptions: ["PU Entry Test"],
        formula: {
          matriculation: 0.25,
          intermediate: 0.50,
          entryTest: 0.25
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All departments, including Computer Science and Business, follow the same aggregate formula.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ] 
      }
    ],
    applicationDeadline: "August 1, 2025",
    applicationFee: "PKR 1,500",
    description: "University of the Punjab is one of the oldest and largest universities in Pakistan.",
    website: "https://www.pu.edu.pk/",
    isImplemented: true
  },
  {
    id: "ned",
    name: "NED University of Engineering and Technology",
    shortName: "NED",
    logo: "/imgs/ned.jpg",
    programs: [
      {
        id: "eng",
        name: "Engineering & Computing Programs",
        testOptions: ["NED Admission Test"],
        formula: {
          matriculation: 0.00,
          intermediate: 0.40,
          entryTest: 0.60
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 60,
          entryTest: 50
        },
        notes: "All engineering departments adhere to the same aggregate formula. HSSC Part-I or equivalent is used for intermediate component.",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ] 
      }
    ],
    applicationDeadline: "July 15, 2025",
    applicationFee: "PKR 2,500",
    description: "NED University is one of the leading engineering institutions in Pakistan.",
    website: "https://www.neduet.edu.pk/",
    isImplemented: true
  },
  {
    id: "nutech",
    name: "National University of Technology (NUTECH)",
    shortName: "NUTECH",
    logo: "/imgs/nutech.jpg",
    programs: [
      {
        id: "cs",
        name: "Computing Programs",
        testOptions: ["NUET", "SAT"],
        formula: {
          matriculation: 0.10,
          intermediate: 0.20,
          entryTest: 0.70
        },
        minimumCriteria: {
          matriculation: 60,
          intermediate: 50,
          entryTest: 50
        },
        notes: "Applicants must have at least 60% marks in SSC and 50% marks in HSSC or equivalent. NUET is mandatory for all applicants. International students may apply via SAT Subject Tests (Math Level II, Physics, Chemistry).",
        admissionChances: [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ] 
      }
    ],
    applicationDeadline: "July 12, 2025",
    applicationFee: "PKR 2,500",
    description: "NUTECH is a public sector university in Islamabad offering cutting-edge programs in engineering and computing disciplines.",
    website: "https://nutech.edu.pk/",
    isImplemented: true
  },
  {
    "id": "ist",
    "name": "Institute of Space Technology",
    "shortName": "IST",
    "logo": "/imgs/ist.jpg",
    "programs": [
      {
        "id": "cs",
        "name": "Computing Programs",
        "testOptions": [],
        "formula": {
          "matriculation": 0.40,
          "intermediate": 0.60,
          "entryTest": 0.00
        },
        "minimumCriteria": {
          "matriculation": 50,
          "intermediate": 50,
          "entryTest": 0
        },
        "notes": "Applicants must have at least 50% marks in SSC and HSSC or equivalent. No entry test is required for BS Computer Science.",
        "admissionChances": [
          { min: 90, max: 100, rating: 'Very High', comment: 'Excellent chances for admission' },
          { min: 85, max: 89.99, rating: 'High', comment: 'Good chances for admission' },
          { min: 80, max: 84.99, rating: 'Medium', comment: 'Moderate chances for admission' },
          { min: 75, max: 79.99, rating: 'Low', comment: 'Limited chances, consider alternatives' },
          { min: 0, max: 74.99, rating: 'Very Low', comment: 'Very difficult to secure admission' }
        ] 
      }
    ],
    "applicationDeadline": "June 30, 2025",
    "applicationFee": "PKR 2,000",
    "description": "IST is a public sector university in Islamabad offering specialized programs in space science, engineering, and computing disciplines.",
    "website": "https://www.ist.edu.pk/",
    "isImplemented": true
  }
    
];

export default universities;
