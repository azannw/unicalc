// =====================================================
// UniCalc — Merit Data (2025/2024/2023)
// Updated with verified data from UniversityCutoffs.json
// =====================================================

const meritData = [
  {
    id: "fast",
    name: "FAST National University",
    year: 2025,
    hasTestTypes: true,
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 73, testType: "NU", history: [73, 75] },
          { name: "BS Computer Science", merit: 90, testType: "NTS", history: [90, 88] },
          { name: "BS Software Engineering", merit: 71.75, testType: "NU", history: [71.75, 73] },
          { name: "BS Software Engineering", merit: 90, testType: "NTS", history: [90, 86] },
          { name: "BS Artificial Intelligence", merit: 73, testType: "NU", history: [73, 74] },
          { name: "BS Artificial Intelligence", merit: 90, testType: "NTS", history: [90, 86] },
          { name: "BS Data Science", merit: 71.5, testType: "NU", history: [71.5, 71.5] },
          { name: "BS Data Science", merit: 90, testType: "NTS", history: [90, 86] },
          { name: "BS Cyber Security", merit: 70.75, testType: "NU", history: [70.75, 71] },
          { name: "BS Cyber Security", merit: 90, testType: "NTS", history: [90, 86] },
          { name: "BS Electrical Engineering", merit: 67.25, testType: "NU", history: [67.25, 65] },
          { name: "BS Electrical Engineering", merit: 75, testType: "NTS", history: [75, 82] },
          { name: "BS Computer Engineering", merit: 73.5, testType: "NU", history: [73.5, 78] },
          { name: "BS Computer Engineering", merit: 85, testType: "NTS", history: [85, 87] }
        ]
      },
      {
        campus: "Lahore",
        programs: [
          { name: "BS Computer Science", merit: 76, testType: "NU", history: [76, 76] },
          { name: "BS Computer Science", merit: 90, testType: "NTS", history: [90, 88] },
          { name: "BS Software Engineering", merit: 74, testType: "NU", history: [74, 76] },
          { name: "BS Software Engineering", merit: 90, testType: "NTS", history: [90, 87] },
          { name: "BS Artificial Intelligence", merit: 76, testType: "NU", history: [76] },
          { name: "BS Artificial Intelligence", merit: 90, testType: "NTS", history: [90] },
          { name: "BS Data Science", merit: 73.75, testType: "NU", history: [73.75, 74] },
          { name: "BS Data Science", merit: 88, testType: "NTS", history: [88, 86] },
          { name: "BS Cyber Security", merit: 73.5, testType: "NU", history: [73.5] },
          { name: "BS Cyber Security", merit: 90, testType: "NTS", history: [90] },
          { name: "BS Electrical Engineering", merit: 66, testType: "NU", history: [66, 68] },
          { name: "BS Electrical Engineering", merit: 75, testType: "NTS", history: [75, 84] }
        ]
      },
      {
        campus: "Karachi",
        programs: [
          { name: "BS Computer Science", merit: 68, testType: "NU", history: [68, 68] },
          { name: "BS Computer Science", merit: 85, testType: "NTS", history: [85, 80] },
          { name: "BS Software Engineering", merit: 66, testType: "NU", history: [66, 66] },
          { name: "BS Software Engineering", merit: 80, testType: "NTS", history: [80, 78] },
          { name: "BS Artificial Intelligence", merit: 65.25, testType: "NU", history: [65.25, 67] },
          { name: "BS Artificial Intelligence", merit: 80, testType: "NTS", history: [80, 80] },
          { name: "BS Data Science", merit: 65.75, testType: "NU", history: [65.75, 66] },
          { name: "BS Data Science", merit: 80, testType: "NTS", history: [80, 78] },
          { name: "BS Cyber Security", merit: 65, testType: "NU", history: [65, 66] },
          { name: "BS Cyber Security", merit: 80, testType: "NTS", history: [80, 79] },
          { name: "BS Electrical Engineering", merit: 63, testType: "NU", history: [63, 60] },
          { name: "BS Electrical Engineering", merit: 70, testType: "NTS", history: [70, 70] }
        ]
      },
      {
        campus: "Peshawar",
        programs: [
          { name: "BS Computer Science", merit: 56.5, testType: "NU", history: [56.5, 58] },
          { name: "BS Computer Science", merit: 80, testType: "NTS", history: [80, 72] },
          { name: "BS Software Engineering", merit: 57.25, testType: "NU", history: [57.25, 59] },
          { name: "BS Software Engineering", merit: 80, testType: "NTS", history: [80, 72] },
          { name: "BS Artificial Intelligence", merit: 57.5, testType: "NU", history: [57.5, 62] },
          { name: "BS Artificial Intelligence", merit: 80, testType: "NTS", history: [80, 80] },
          { name: "BS Computer Engineering", merit: 64, testType: "NU", history: [64, 63] },
          { name: "BS Computer Engineering", merit: 80, testType: "NTS", history: [80, 70] }
        ]
      },
      {
        campus: "CFD (Chiniot-Faisalabad)",
        programs: [
          { name: "BS Computer Science", merit: 45, testType: "NU", history: [45, 67] },
          { name: "BS Computer Science", merit: 85, testType: "NTS", history: [85, 83] },
          { name: "BS Software Engineering", merit: 65, testType: "NU", history: [65, 66] },
          { name: "BS Software Engineering", merit: 85, testType: "NTS", history: [85, 82] },
          { name: "BS Artificial Intelligence", merit: 66, testType: "NU", history: [66, 66] },
          { name: "BS Artificial Intelligence", merit: 85, testType: "NTS", history: [85, 82] },
          { name: "BS Electrical Engineering", merit: 63, testType: "NU", history: [63, 60] },
          { name: "BS Electrical Engineering", merit: 75, testType: "NTS", history: [75, 75] }
        ]
      },
      {
        campus: "Multan",
        programs: [
          { name: "BS Computer Science", merit: 65.5, testType: "NU", history: [65.5] },
          { name: "BS Computer Science", merit: 85, testType: "NTS", history: [85] },
          { name: "BS Software Engineering", merit: 64, testType: "NU", history: [64] },
          { name: "BS Software Engineering", merit: 85, testType: "NTS", history: [85] },
          { name: "BS Artificial Intelligence", merit: 63.5, testType: "NU", history: [63.5] },
          { name: "BS Artificial Intelligence", merit: 85, testType: "NTS", history: [85] }
        ]
      }
    ]
  },
  {
    id: "nust",
    name: "NUST",
    year: 2025,
    meritType: "rank",
    campuses: [
      {
        campus: "SEECS Islamabad",
        programs: [
          { name: "BS Computer Science", merit: "#282", history: ["#282", "#447"] },
          { name: "BS Artificial Intelligence", merit: "#298", history: ["#298", "#566"] },
          { name: "BS Data Science", merit: "#328", history: ["#328", "#652"] },
          { name: "BS Software Engineering", merit: "#115", history: ["#115", "#378"] },
          { name: "BS Computer Engineering", merit: "#327", history: ["#327", "#400"] },
          { name: "BS Electrical Engineering", merit: "#691", history: ["#691", "#2449"] }
        ]
      },
      {
        campus: "EME Rawalpindi",
        programs: [
          { name: "BS Computer Engineering", merit: "#1072", history: ["#1072", "#2746"] },
          { name: "BS Electrical Engineering", merit: "#2914", history: ["#2914", "#6139"] },
          { name: "BS Mechanical Engineering", merit: "#2980", history: ["#2980", "#6204"] },
          { name: "BS Mechatronics Engineering", merit: "#1929", history: ["#1929", "#4830"] }
        ]
      },
      {
        campus: "MCS Rawalpindi",
        programs: [
          { name: "BS Electrical Engineering", merit: "#3432", history: ["#3432", "#7703"] },
          { name: "BS Software Engineering", merit: "#819", history: ["#819", "#1262"] },
          { name: "BS Information Security", merit: "#1351", history: ["#1351", "#2988"] }
        ]
      },
      {
        campus: "NBC Quetta",
        programs: [
          { name: "BS Computer Science", merit: "#1002", history: ["#1002", "#5360"] },
          { name: "BS Artificial Intelligence", merit: "#1214", history: ["#1214", "#12369"] },
          { name: "BE Civil Engineering", merit: "#7440", history: ["#7440", "#14714"] }
        ]
      }
    ]
  },
  {
    id: "giki",
    name: "GIKI",
    year: 2025,
    meritType: "rank",
    campuses: [
      {
        campus: "Swabi",
        programs: [
          { name: "BS Computer Science", merit: "#602", history: ["#602"] },
          { name: "BS Artificial Intelligence", merit: "#670", history: ["#670"] },
          { name: "BS Software Engineering", merit: "#857", history: ["#857"] },
          { name: "BS Cyber Security", merit: "#1340", history: ["#1340"] },
          { name: "BS Data Science", merit: "#1399", history: ["#1399"] },
          { name: "BS Computer Engineering", merit: "#1358", history: ["#1358"] },
          { name: "BS Mechanical Engineering", merit: "#2241", history: ["#2241"] },
          { name: "BS Electrical Engineering", merit: "#2592", history: ["#2592"] },
          { name: "BS Civil Engineering", merit: "#3249", history: ["#3249"] },
          { name: "BS Chemical Engineering", merit: "#3391", history: ["#3391"] },
          { name: "BS Materials Science", merit: "#3374", history: ["#3374"] },
          { name: "BS Management Sciences", merit: "#800", history: ["#800"] }
        ]
      }
    ]
  },
  {
    id: "comsats",
    name: "COMSATS University",
    year: 2025,
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 88.89, history: [88.89, 88.28] },
          { name: "BS Artificial Intelligence", merit: 88.53, history: [88.53, 87.28] },
          { name: "BS Software Engineering", merit: 86.69, history: [86.69, 86.32] },
          { name: "BS Data Science", merit: 87.11, history: [87.11, 86.16] },
          { name: "BS Cyber Security", merit: 87.51, history: [87.51, 86.04] },
          { name: "BS Computer Engineering", merit: 82.14, history: [82.14] },
          { name: "BS Electrical Engineering", merit: 70.68, history: [70.68] }
        ]
      },
      {
        campus: "Lahore",
        programs: [
          { name: "BS Computer Science", merit: 88.18, history: [88.18, 88.21] },
          { name: "BS Software Engineering", merit: 86.39, history: [86.39, 86.60] },
          { name: "BS Artificial Intelligence", merit: 84.52, history: [84.52] },
          { name: "BS Computer Engineering", merit: 84.05, history: [84.05, 83.84] },
          { name: "BS Electrical Engineering", merit: 74.93, history: [74.93] },
          { name: "BS Business Data Analytics", merit: 75.64, history: [75.64] }
        ]
      },
      {
        campus: "Abbottabad",
        programs: [
          { name: "BS Computer Science", merit: 81.2, history: [81.2, 80.5] },
          { name: "BS Software Engineering", merit: 80.01, history: [80.01, 79.5] }
        ]
      },
      {
        campus: "Wah",
        programs: [
          { name: "BS Computer Science", merit: 80, history: [80] },
          { name: "BS Software Engineering", merit: 80, history: [80] },
          { name: "BS Artificial Intelligence", merit: 80, history: [80] }
        ]
      },
      {
        campus: "Attock",
        programs: [
          { name: "BS Computer Science", merit: 80, history: [80] },
          { name: "BS Software Engineering", merit: 79, history: [79] },
          { name: "BS Artificial Intelligence", merit: 79, history: [79] }
        ]
      },
      {
        campus: "Sahiwal",
        programs: [
          { name: "BS Computer Science", merit: 80, history: [80] },
          { name: "BS Software Engineering", merit: 79, history: [79] },
          { name: "BS Artificial Intelligence", merit: 80, history: [80] }
        ]
      },
      {
        campus: "Vehari",
        programs: [
          { name: "BS Computer Science", merit: 80, history: [80] },
          { name: "BS Software Engineering", merit: 78, history: [78] }
        ]
      }
    ]
  },
  {
    id: "ist",
    name: "Institute of Space Technology",
    year: 2025,
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 90.25, history: [90.25] },
          { name: "BS Artificial Intelligence", merit: 86.56, history: [86.56] },
          { name: "BS Data Science", merit: 85.25, history: [85.25] }
        ]
      }
    ]
  },
  {
    id: "pu",
    name: "Punjab University",
    year: 2024,
    campuses: [
      {
        campus: "Old Campus",
        programs: [
          { name: "BS Computer Science", merit: 90.17, history: [90.17] },
          { name: "BS Software Engineering", merit: 89.62, history: [89.62] },
          { name: "BS Information Technology", merit: 88.48, history: [88.48] },
          { name: "BS Data Science", merit: 88.79, shift: "Morning", history: [88.79] }
        ]
      },
      {
        campus: "New Campus",
        programs: [
          { name: "BS Software Engineering", merit: 89.89, history: [89.89] },
          { name: "BS Computer Science", merit: 90.68, history: [90.68] },
          { name: "BS Information Technology", merit: 88.56, history: [88.56] }
        ]
      }
    ]
  },
  {
    id: "pucit",
    name: "Punjab University College of IT",
    year: 2024,
    campuses: [
      {
        campus: "Old Campus",
        programs: [
          { name: "BS Computer Science", merit: 90.17, history: [90.17] },
          { name: "BS Software Engineering", merit: 89.62, history: [89.62] },
          { name: "BS Information Technology", merit: 88.48, history: [88.48] }
        ]
      },
      {
        campus: "New Campus",
        programs: [
          { name: "BS Software Engineering", merit: 89.89, history: [89.89] },
          { name: "BS Computer Science", merit: 90.68, history: [90.68] },
          { name: "BS Information Technology", merit: 88.56, history: [88.56] }
        ]
      }
    ]
  },
  {
    id: "bahria",
    name: "Bahria University",
    year: 2024,
    campuses: [
      {
        campus: "E-8 Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 86, history: [86] },
          { name: "BS Information Technology", merit: 83, history: [83] }
        ]
      },
      {
        campus: "H-11 Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 86, history: [86] },
          { name: "BS Software Engineering", merit: 83, history: [83] }
        ]
      }
    ]
  },
  {
    id: "pieas",
    name: "PIEAS",
    year: 2024,
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computing & Information Sciences", merit: 90.6, history: [90.6] }
        ]
      }
    ]
  },
  {
    id: "ned",
    name: "NED University",
    year: 2025,
    campuses: [
      {
        campus: "Karachi",
        programs: [
          { name: "BE Software Engineering", merit: 87.53, history: [87.53, 86.86, 86.86] },
          { name: "BE Computer Systems Engineering", merit: 85.84, history: [85.84, 83.9, 83.9] },
          { name: "BS Data Science", merit: 86, history: [86] },
          { name: "BS Artificial Intelligence", merit: 86, history: [86] },
          { name: "BE Electronic Engineering", merit: 80.25, history: [80.25, 76.02, 76.82] },
          { name: "BE Electrical Engineering", merit: 80.02, history: [80.02, 79.41, 79.41] },
          { name: "BE Mechanical Engineering", merit: 78.3, history: [78.3, 73.06, 73.86] },
          { name: "BE Civil Engineering", merit: 72.34, history: [72.34, 69, 70.18] },
          { name: "BE Chemical Engineering", merit: 76, history: [76, 71.9, 73.6] },
          { name: "BE Biomedical Engineering", merit: 73.88, history: [73.88, 66.3, 62.77] }
        ]
      }
    ]
  },
  {
    id: "nutech",
    name: "NUTECH",
    year: 2024,
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 87, history: [87] },
          { name: "BS Information Technology", merit: 86, history: [86] }
        ]
      }
    ]
  },
  {
    id: "air",
    name: "Air University",
    year: 2025,
    campuses: [
      {
        campus: "Islamabad (E-9)",
        programs: [
          { name: "BS Computer Science", merit: 84.73, shift: "Morning", history: [84.73, 81.63, 76.5] },
          { name: "BS Computer Science", merit: 77.28, shift: "Evening", history: [77.28, 70.03, 64] },
          { name: "BS Cyber Security", merit: 84.6, shift: "Morning", history: [84.6, 79.43, 72] },
          { name: "BS Cyber Security", merit: 78.39, shift: "Evening", history: [78.39, 70.61, 64] },
          { name: "BS Artificial Intelligence", merit: 84.09, history: [84.09, 79.22, 72] },
          { name: "BS Software Engineering", merit: 83.04, history: [83.04, 78.99, 72] },
          { name: "BS Data Science", merit: 83.39, history: [83.39, 78.79, 72] },
          { name: "BS Information Technology", merit: 81.4, history: [81.4, 77.03, 68] },
          { name: "BS Cyber Forensic & Security", merit: 81.1, history: [81.1, 78, 70] },
          { name: "BS Gaming & Multimedia", merit: 79.5, history: [79.5, 65.06, 60] },
          { name: "BS Embedded Systems", merit: 78.5, history: [78.5, 75, 70] },
          { name: "BS Bio Informatics", merit: 77.8, history: [77.8, 74, 68] },
          { name: "BS Cyber Psychology", merit: 77.7, history: [77.7, 74, 68] },
          { name: "BE Biomedical Engineering", merit: 75.15, history: [75.15, 73.63, 71.7] },
          { name: "BE Computer Engineering", merit: 71.17, history: [71.17, 59.39, 54] },
          { name: "BE Mechatronics Engineering", merit: 70.9, history: [70.9, 57.01, 52] },
          { name: "BE Mechanical Engineering", merit: 70.8, history: [70.8, 57.89, 45] },
          { name: "BE Electrical (Electronics)", merit: 69.12, history: [69.12, 52.45, 45] },
          { name: "BE Electrical (Power)", merit: 67.8, history: [67.8, 50, 45] },
          { name: "BE Electrical (Telecom)", merit: 66.07, history: [66.07, 47, 45] }
        ]
      }
    ]
  },
  {
    id: "uet",
    name: "UET (University of Engineering & Technology)",
    year: 2024,
    campuses: [
      {
        campus: "Lahore (Main Campus)",
        programs: [
          { name: "BS Computer Science", merit: 81.83, category: "Open Merit", history: [81.83] },
          { name: "BS Computer Science", merit: 66.40, category: "Non-Merit", history: [66.4] },
          { name: "BS Artificial Intelligence", merit: 71.29, history: [71.29] },
          { name: "BS Data Science", merit: 54.37, history: [54.37] },
          { name: "BS Information Systems Technology", merit: 56.18, history: [56.18] },
          { name: "BS Applied Computing", merit: 55.76, history: [55.76] }
        ]
      },
      {
        campus: "KSK Campus",
        programs: [
          { name: "BS Computer Science", merit: 77.44, category: "Open Merit", history: [77.44] },
          { name: "BS Computer Science", merit: 66.11, category: "Non-Merit", history: [66.11] },
          { name: "BS Software Engineering", merit: 81.04, category: "Open Merit", history: [81.04] },
          { name: "BS Software Engineering", merit: 59.21, category: "Non-Merit", history: [59.21] }
        ]
      },
      {
        campus: "Taxila Campus",
        programs: [
          { name: "BS Software Engineering", merit: 79.43, history: [79.43] },
          { name: "BS Computer Science", merit: 77.97, history: [77.97] },
          { name: "BS Computer", merit: 75.05, history: [75.05] },
          { name: "BS Computer Science (Pre-Medical)", merit: 78.18, history: [78.18] }
        ]
      },
      {
        campus: "Faisalabad Campus",
        programs: [
          { name: "BS Computer Science", merit: 76.31, category: "Open Merit", history: [76.31] }
        ]
      },
      {
        campus: "Narowal Campus",
        programs: [
          { name: "BS Computer Science", merit: 72.30, category: "Open Merit", history: [72.3] }
        ]
      },
      {
        campus: "RCET Gujranwala",
        programs: [
          { name: "BS Computer Science", merit: 72.04, category: "Open Merit", history: [72.04] }
        ]
      }
    ]
  },
  {
    id: "itu",
    name: "Information Technology University",
    year: 2025,
    campuses: [
      {
        campus: "Lahore",
        programs: [
          { name: "BS Software Engineering", merit: 83.05, history: [83.05] },
          { name: "BS Computer Science", merit: 81.27, history: [81.27] },
          { name: "BS Artificial Intelligence", merit: 80.81, history: [80.81] },
          { name: "BS Computer Engineering", merit: 77, history: [77] },
          { name: "BS Financial Technology", merit: 62.09, history: [62.09] },
          { name: "BS Management & Technology", merit: 61.27, history: [61.27] },
          { name: "BS Electrical Engineering", merit: 60.12, history: [60.12] },
          { name: "BS Economics with Data Science", merit: 53.34, history: [53.34] }
        ]
      }
    ]
  },
  // =====================================================
  // UHS — Punjab Medical Colleges (via MDCAT)
  // =====================================================
  {
    id: "uhs",
    name: "UHS (Punjab Medical Colleges)",
    year: 2024,
    campuses: [
      // ---- Government Medical Colleges ----
      {
        campus: "King Edward Medical University, Lahore",
        programs: [
          { name: "MBBS", merit: 93.53, category: "Government", history: [93.53] }
        ]
      },
      {
        campus: "Rawalpindi Medical University",
        programs: [
          { name: "MBBS", merit: 93.19, category: "Government", history: [93.19] }
        ]
      },
      {
        campus: "Allama Iqbal Medical College, Lahore",
        programs: [
          { name: "MBBS", merit: 92.60, category: "Government", history: [92.60] }
        ]
      },
      {
        campus: "Services Institute (SIMS), Lahore",
        programs: [
          { name: "MBBS", merit: 92.05, category: "Government", history: [92.05] }
        ]
      },
      {
        campus: "Ameer-ud-Din Medical College, Lahore",
        programs: [
          { name: "MBBS", merit: 91.73, category: "Government", history: [91.73] }
        ]
      },
      {
        campus: "Nishtar Medical University, Multan",
        programs: [
          { name: "MBBS", merit: 91.44, category: "Government", history: [91.44] }
        ]
      },
      {
        campus: "Fatima Jinnah Medical University, Lahore",
        programs: [
          { name: "MBBS", merit: 91.30, category: "Government", history: [91.30] }
        ]
      },
      {
        campus: "Punjab Medical College (FMU), Faisalabad",
        programs: [
          { name: "MBBS", merit: 91.12, category: "Government", history: [91.12] }
        ]
      },
      {
        campus: "Gujranwala Medical College",
        programs: [
          { name: "MBBS", merit: 90.97, category: "Government", history: [90.97] }
        ]
      },
      {
        campus: "Quaid-e-Azam Medical College, Bahawalpur",
        programs: [
          { name: "MBBS", merit: 90.75, category: "Government", history: [90.75] }
        ]
      },
      {
        campus: "Khawaja M. Safdar Medical College, Sialkot",
        programs: [
          { name: "MBBS", merit: 90.70, category: "Government", history: [90.70] }
        ]
      },
      {
        campus: "Nawaz Sharif Medical College, Gujrat",
        programs: [
          { name: "MBBS", merit: 90.64, category: "Government", history: [90.64] }
        ]
      },
      {
        campus: "Sargodha Medical College",
        programs: [
          { name: "MBBS", merit: 90.60, category: "Government", history: [90.60] }
        ]
      },
      {
        campus: "Sahiwal Medical College",
        programs: [
          { name: "MBBS", merit: 90.60, category: "Government", history: [90.60] }
        ]
      },
      {
        campus: "Sheikh Zayed Medical College, RYK",
        programs: [
          { name: "MBBS", merit: 90.50, category: "Government", history: [90.50] }
        ]
      },
      {
        campus: "DG Khan Medical College",
        programs: [
          { name: "MBBS", merit: 90.49, category: "Government", history: [90.49] }
        ]
      },
      // ---- Private Medical Colleges ----
      {
        campus: "Al Aleem Medical College, Lahore",
        programs: [
          { name: "MBBS", merit: 92.71, category: "Private", history: [92.71] }
        ]
      },
      {
        campus: "Sharif Medical & Dental College, Lahore",
        programs: [
          { name: "MBBS", merit: 91.66, category: "Private", history: [91.66] }
        ]
      },
      {
        campus: "Shalamar Medical & Dental College, Lahore",
        programs: [
          { name: "MBBS", merit: 90.64, category: "Private", history: [90.64] }
        ]
      },
      {
        campus: "FMH College, Lahore",
        programs: [
          { name: "MBBS", merit: 90.13, category: "Private", history: [90.13] }
        ]
      },
      {
        campus: "Lahore Medical & Dental College",
        programs: [
          { name: "MBBS", merit: 88.69, category: "Private", history: [88.69] }
        ]
      },
      {
        campus: "Rashid Latif Medical College",
        programs: [
          { name: "MBBS", merit: 86.28, category: "Private", history: [86.28] }
        ]
      },
      {
        campus: "Akhtar Saeed Medical & Dental College",
        programs: [
          { name: "MBBS", merit: 81.77, category: "Private", history: [81.77] }
        ]
      },
      {
        campus: "University College of Medicine (UCMD)",
        programs: [
          { name: "MBBS", merit: 79.07, category: "Private", history: [79.07] }
        ]
      },
      {
        campus: "Avicenna Medical College",
        programs: [
          { name: "MBBS", merit: 77.80, category: "Private", history: [77.80] }
        ]
      },
      {
        campus: "Central Park Medical College",
        programs: [
          { name: "MBBS", merit: 77.35, category: "Private", history: [77.35] }
        ]
      }
    ]
  },
  // =====================================================
  // NUMS — Military Medical Colleges
  // =====================================================
  {
    id: "nums",
    name: "NUMS (National University of Medical Sciences)",
    year: 2024,
    campuses: [
      {
        campus: "Army Medical College (AMC), Rawalpindi",
        programs: [
          { name: "MBBS", merit: 95.20, history: [95.20] },
          { name: "BDS", merit: 95.10, history: [95.10] }
        ]
      },
      {
        campus: "CMH Bahawalpur (CIMS)",
        programs: [
          { name: "MBBS", merit: 92.98, history: [92.98] }
        ]
      },
      {
        campus: "CMH Multan (CIMS)",
        programs: [
          { name: "MBBS", merit: 92.25, history: [92.25] },
          { name: "BDS", merit: 89.88, history: [89.88] }
        ]
      },
      {
        campus: "CMH Lahore Medical College",
        programs: [
          { name: "MBBS", merit: 91.99, history: [91.99] },
          { name: "BDS", merit: 87.15, history: [87.15] }
        ]
      },
      {
        campus: "FUMC (Fauji Foundation), Islamabad",
        programs: [
          { name: "MBBS", merit: 90.90, history: [90.90] },
          { name: "BDS", merit: 88.61, history: [88.61] }
        ]
      },
      {
        campus: "CMH Kharian Medical College",
        programs: [
          { name: "MBBS", merit: 90.72, history: [90.72] }
        ]
      },
      {
        campus: "Wah Medical College",
        programs: [
          { name: "MBBS", merit: 90.56, history: [90.56] }
        ]
      },
      {
        campus: "Fazaia Medical College, Islamabad",
        programs: [
          { name: "MBBS", merit: 89.93, history: [89.93] }
        ]
      },
      {
        campus: "HITEC IMS, Taxila",
        programs: [
          { name: "MBBS", merit: 89.72, history: [89.72] },
          { name: "BDS", merit: 83.32, history: [83.32] }
        ]
      },
      {
        campus: "KIMS, Karachi",
        programs: [
          { name: "MBBS", merit: 88.87, history: [88.87] }
        ]
      },
      {
        campus: "BUMDC, Karachi",
        programs: [
          { name: "MBBS", merit: 87.47, history: [87.47] },
          { name: "BDS", merit: 80.78, history: [80.78] }
        ]
      },
      {
        campus: "Fazaia Ruth Pfau, Karachi",
        programs: [
          { name: "MBBS", merit: 86.90, history: [86.90] }
        ]
      },
      {
        campus: "QIMS, Quetta",
        programs: [
          { name: "MBBS", merit: 84.94, history: [84.94] }
        ]
      }
    ]
  }
];

// =====================================================
// Helper Functions
// =====================================================

function getMeritDataById(universityId) {
  return meritData.find(uni => uni.id === universityId) || null;
}

function formatMeritValue(merit) {
  if (typeof merit === 'number') {
    return merit.toFixed(2) + '%';
  }
  return merit;
}

// =====================================================
// Mathematical Admission Prediction Model
// Uses linear regression + normal distribution CDF
// =====================================================

/**
 * Standard normal CDF approximation (Abramowitz & Stegun)
 * Accurate to ~1.5e-7
 */
function normalCDF(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.SQRT2;

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

/**
 * Linear regression on historical data points.
 * history[0] = most recent year, history[1] = year before, etc.
 * Returns { slope, intercept, predicted, residualStd }
 */
function linearRegression(history) {
  const n = history.length;
  if (n < 2) return null;

  // x values: 0 = oldest, n-1 = most recent
  // So history is reversed for regression (oldest first)
  const reversed = [...history].reverse();

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += reversed[i];
    sumXY += i * reversed[i];
    sumX2 += i * i;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Predicted value for next year (x = n)
  const predicted = slope * n + intercept;

  // Calculate residual standard deviation
  let sumResidualSq = 0;
  for (let i = 0; i < n; i++) {
    const predicted_i = slope * i + intercept;
    sumResidualSq += Math.pow(reversed[i] - predicted_i, 2);
  }
  // Use n-1 for unbiased estimate, minimum 1 to avoid division by zero
  const residualStd = Math.sqrt(sumResidualSq / Math.max(n - 1, 1));

  return { slope, intercept, predicted, residualStd };
}

/**
 * Calculate admission probability using statistical model.
 *
 * Model: The next year's merit cutoff is modeled as a normal distribution
 * centered on the linear regression prediction, with spread based on
 * historical residual variance + inherent uncertainty.
 *
 * P(admission) = P(cutoff <= userAggregate) = CDF(userAggregate | predicted, sigma)
 *
 * @param {string} universityId
 * @param {string} programName
 * @param {number} userAggregate
 * @param {string|null} campus
 * @returns {object|null} Prediction result
 */
function calculateAdmissionPrediction(universityId, programName, userAggregate, campus = null, testType = null) {
  const uniData = getMeritDataById(universityId);
  if (!uniData) return null;

  let program = null;
  let matchedCampus = null;
  for (const c of uniData.campuses) {
    if (campus && c.campus !== campus) continue;
    program = c.programs.find(p => {
      if (p.name !== programName) return false;
      if (testType && p.testType && p.testType !== testType) return false;
      return true;
    });
    if (program) {
      matchedCampus = c.campus;
      break;
    }
  }

  if (!program || !program.history) return null;

  // Rank-based universities (NUST, GIKI) - can't do percentage prediction
  if (uniData.meritType === 'rank') {
    return {
      type: 'rank',
      currentMerit: program.merit,
      message: 'Merit is rank-based. Compare your NET/entry test rank against the closing rank shown above.'
    };
  }

  // Extract numeric history values
  const numericHistory = program.history.filter(h => typeof h === 'number');
  if (numericHistory.length === 0) return null;

  const currentMerit = typeof program.merit === 'number' ? program.merit : null;
  const avgMerit = numericHistory.reduce((a, b) => a + b, 0) / numericHistory.length;
  const minMerit = Math.min(...numericHistory);
  const maxMerit = Math.max(...numericHistory);

  let predictedMerit, sigma;

  if (numericHistory.length >= 2) {
    // Use linear regression for trend prediction
    const reg = linearRegression(numericHistory);
    predictedMerit = reg.predicted;

    // Sigma = max of residual std and a minimum uncertainty of 1.5%
    // Also add base uncertainty that scales with how few data points we have
    const dataUncertainty = 3.0 / Math.sqrt(numericHistory.length);
    sigma = Math.max(reg.residualStd, 1.5) + dataUncertainty;
  } else {
    // Single data point - use wider uncertainty
    predictedMerit = numericHistory[0];
    sigma = 4.0;
  }

  // Clamp predicted merit to reasonable range
  predictedMerit = Math.max(0, Math.min(100, predictedMerit));

  // Calculate z-score: how many std devs above the predicted cutoff is the user
  const zScore = (userAggregate - predictedMerit) / sigma;

  // P(admission) = P(cutoff <= userAggregate)
  let probability = normalCDF(zScore);

  // Clamp probability to [0.02, 0.98] to avoid giving false certainty
  probability = Math.max(0.02, Math.min(0.98, probability));
  const probabilityPercent = Math.round(probability * 100);

  // Determine status category with text labels
  let status, label, message;
  if (probabilityPercent >= 80) {
    status = 'high';
    label = 'High Chance';
    message = `Strong chances! Your aggregate is well above the projected cutoff of ~${predictedMerit.toFixed(1)}%.`;
  } else if (probabilityPercent >= 55) {
    status = 'good';
    label = 'Good Chance';
    message = `Good chances. Your aggregate is above the projected cutoff of ~${predictedMerit.toFixed(1)}%.`;
  } else if (probabilityPercent >= 30) {
    status = 'low';
    label = 'Low Chance';
    message = `Borderline. Your aggregate is near the projected cutoff of ~${predictedMerit.toFixed(1)}%. Apply and prepare backup options.`;
  } else {
    status = 'poor';
    label = 'Poor Chance';
    message = `Unlikely. The projected cutoff is ~${predictedMerit.toFixed(1)}%. Consider alternate campuses or programs.`;
  }

  return {
    type: 'percentage',
    currentMerit: currentMerit,
    predictedMerit: predictedMerit.toFixed(2),
    avgMerit: avgMerit.toFixed(2),
    minMerit: minMerit.toFixed(2),
    maxMerit: maxMerit.toFixed(2),
    userAggregate: userAggregate,
    probability: probabilityPercent + '%',
    probabilityRaw: probability,
    label: label,
    status: status,
    message: message,
    sigma: sigma.toFixed(2),
    trend: numericHistory.length >= 2 ? (numericHistory[0] > numericHistory[numericHistory.length - 1] ? 'rising' : 'falling') : 'unknown'
  };
}
