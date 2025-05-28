export interface ProgramMerit {
  name: string;
  merit: number | string;
  campus?: string;
  shift?: 'Morning' | 'Evening';
  category?: string;
  seats?: number;
}

export interface CampusMerit {
  campus: string;
  programs: ProgramMerit[];
}

export interface UniversityMerit {
  id: string;
  name: string;
  campuses: CampusMerit[];
}

const meritData: UniversityMerit[] = [
  {
    id: "fast",
    name: "FAST National University",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 75 },
          { name: "BS Artificial Intelligence", merit: 74 },
          { name: "BS Cyber Security", merit: 71 },
          { name: "BS Data Science", merit: 72 },
          { name: "BS Software Engineering", merit: 73 }
        ]
      },
      {
        campus: "Lahore",
        programs: [
          { name: "BS Computer Science", merit: 76 },
          { name: "BS Data Science", merit: 74 },
          { name: "BS Software Engineering", merit: 76 }
        ]
      },
      {
        campus: "Karachi",
        programs: [
          { name: "BS Computer Science", merit: 68 },
          { name: "BS Artificial Intelligence", merit: 67 },
          { name: "BS Cyber Security", merit: 66 },
          { name: "BS Data Science", merit: 66 },
          { name: "BS Software Engineering", merit: 66 }
        ]
      },
      {
        campus: "Peshawar",
        programs: [
          { name: "BS Computer Science", merit: 58 },
          { name: "BS Artificial Intelligence", merit: 62 },
          { name: "BS Software Engineering", merit: 59 }
        ]
      },
      {
        campus: "CFD",
        programs: [
          { name: "BS Computer Science", merit: 67 },
          { name: "BS Artificial Intelligence", merit: 62 },
          { name: "BS Software Engineering", merit: 66 }
        ]
      }
    ]
  },
  {
    id: "nust",
    name: "NUST",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: "447/5360", campus: "SEECS" },
          { name: "BS Artificial Intelligence", merit: "566/12369", campus: "SEECS" },
          { name: "BS Software Engineering", merit: "378/1262", campus: "SEECS" }
        ]
      }
    ]
  },
  {
    id: "giki",
    name: "GIKI",
    campuses: [
      {
        campus: "Swabi",
        programs: [
          { name: "BS Computer Science", merit: "#324" },
          { name: "BS Artificial Intelligence", merit: "#499" },
          { name: "BS Cyber Security", merit: "#958" },
          { name: "BS Data Science", merit: "#1008" },
          { name: "BS Software Engineering", merit: "#566" },
          { name: "BS Computer Engineering", merit: "#1101" }
        ]
      }
    ]
  },
  {
    id: "comsats",
    name: "COMSATS University",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 88.28 },
          { name: "BS Artificial Intelligence", merit: 87.28 },
          { name: "BS Cyber Security", merit: 86.04 },
          { name: "BS Data Science", merit: 86.16 },
          { name: "BS Software Engineering", merit: 86.32 }
        ]
      },
      {
        campus: "Lahore",
        programs: [
          { name: "BS Computer Science", merit: 88.21 },
          { name: "BS Computer Engineering", merit: 83.84 },
          { name: "BS Software Engineering", merit: 86.60 }
        ]
      },
      {
        campus: "Abbottabad",
        programs: [
          { name: "BS Computer Science", merit: 81.2 },
          { name: "BS Software Engineering", merit: 80.01 }
        ]
      },
      {
        campus: "Wah",
        programs: [
          { name: "BS Computer Science", merit: 80 },
          { name: "BS Software Engineering", merit: 80 },
          { name: "BS Artificial Intelligence", merit: 80 }
        ]
      },
      {
        campus: "Attock",
        programs: [
          { name: "BS Computer Science", merit: "80-82" },
          { name: "BS Software Engineering", merit: "78-80" },
          { name: "BS Artificial Intelligence", merit: 79 }
        ]
      },
      {
        campus: "Sahiwal",
        programs: [
          { name: "BS Computer Science", merit: "80-82" },
          { name: "BS Software Engineering", merit: "78-80" },
          { name: "BS Artificial Intelligence", merit: "79-81" }
        ]
      },
      {
        campus: "Vehari",
        programs: [
          { name: "BS Computer Science", merit: "80-82" },
          { name: "BS Software Engineering", merit: "78-80" }
        ]
      }
    ]
  },
  {
    id: "ist",
    name: "Institute of Space Technology",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 90 }
        ]
      }
    ]
  },
  {
    id: "iiu",
    name: "International Islamic University",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: "85-88" },
          { name: "BS Software Engineering", merit: "83-88" },
          { name: "BS Information Technology", merit: "80-83" }
        ]
      }
    ]
  },
  {
    id: "qau",
    name: "Quaid-e-Azam University",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 93 },
          { name: "BS Information Technology", merit: 92 }
        ]
      }
    ]
  },
  {
    id: "pu",
    name: "Punjab University",
    campuses: [
      {
        campus: "Old Campus",
        programs: [
          { name: "BS Computer Science", merit: 90.17 },
          { name: "BS Software Engineering", merit: 89.62 },
          { name: "BS Information Technology", merit: 88.48 },
          { name: "BS Data Science", merit: 88.79, shift: "Morning" }
        ]
      },
      {
        campus: "New Campus",
        programs: [
          { name: "BS Software Engineering", merit: 89.89 },
          { name: "BS Computer Science", merit: 90.68 },
          { name: "BS Information Technology", merit: 88.56 }
        ]
      }
    ]
  },
  {
    id: "bahria",
    name: "Bahria University",
    campuses: [
      {
        campus: "E-8 Islamabad",
        programs: [
          { name: "BS Computer Science", merit: "85-87" },
          { name: "BS Information Technology", merit: "82-84" }
        ]
      },
      {
        campus: "H-11 Islamabad",
        programs: [
          { name: "BS Computer Science", merit: "85-87" },
          { name: "BS Software Engineering", merit: "82-84" }
        ]
      }
    ]
  },
  {
    id: "pieas",
    name: "PIEAS",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computing & Information Sciences", merit: 90.6 }
        ]
      }
    ]
  },
  {
    id: "ned",
    name: "NED University",
    campuses: [
      {
        campus: "Karachi",
        programs: [
          { name: "BS Computer Science & IT", merit: 84 },
          { name: "BS Data Science", merit: 86 },
          { name: "BS Cyber Security", merit: 84 },
          { name: "BS Software Engineering", merit: 87 },
          { name: "BS Artificial Intelligence", merit: 86 }
        ]
      }
    ]
  },
  {
    id: "nutech",
    name: "NUTECH",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 87 },
          { name: "BS Information Technology", merit: 86 }
        ]
      }
    ]
  },
  {
    id: "air",
    name: "Air University",
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 81.68, shift: "Morning" },
          { name: "BS Computer Science", merit: 69.45, shift: "Evening" },
          { name: "BS Artificial Intelligence", merit: 79.25 },
          { name: "BS Cyber Security", merit: 79.48, shift: "Morning" },
          { name: "BS Cyber Security", merit: 70.48, shift: "Evening" },
          { name: "BS Data Science", merit: 79.91 },
          { name: "BS Software Engineering", merit: 79.04 }
        ]
      }
    ]
  },
  {
    id: "uet-taxila",
    name: "UET Taxila",
    campuses: [
      {
        campus: "Main Campus",
        programs: [
          { name: "BS Software Engineering", merit: 79.43 },
          { name: "BS Computer Science", merit: 77.97 },
          { name: "BS Computer", merit: 75.05 },
          { name: "BS Computer Science (Pre-Medical)", merit: 78.18 }
        ]
      }
    ]
  },
  {
    id: "uet",
    name: "UET Lahore",
    campuses: [
      {
        campus: "Main Campus",
        programs: [
          { name: "BS Computer Science", merit: 81.83, category: "Open Merit" },
          { name: "BS Computer Science", merit: 66.40, category: "Non-Merit" },
          { name: "BS Artificial Intelligence", merit: 71.29 },
          { name: "BS Data Science", merit: 54.37 },
          { name: "BS Information Systems Technology", merit: 56.18 },
          { name: "BS Applied Computing", merit: 55.76 }
        ]
      },
      {
        campus: "KSK Campus",
        programs: [
          { name: "BS Computer Science", merit: 77.44, category: "Open Merit" },
          { name: "BS Computer Science", merit: 66.11, category: "Non-Merit" },
          { name: "BS Software Engineering", merit: 81.04, category: "Open Merit" },
          { name: "BS Software Engineering", merit: 59.21, category: "Non-Merit" }
        ]
      },
      {
        campus: "Faisalabad Campus",
        programs: [
          { name: "BS Computer Science", merit: 76.31, category: "Open Merit" }
        ]
      },
      {
        campus: "Narowal Campus",
        programs: [
          { name: "BS Computer Science", merit: 72.30, category: "Open Merit" }
        ]
      },
      {
        campus: "RCET Gujranwala",
        programs: [
          { name: "BS Computer Science", merit: 72.04, category: "Open Merit" }
        ]
      }
    ]
  }
];

export default meritData; 