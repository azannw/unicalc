// =====================================================
// UniCalc — Merit Data (2025/2024)
// Historical data included for admission prediction
// =====================================================

const meritData = [
  {
    id: "fast",
    name: "FAST National University",
    year: 2024,
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 75, history: [75, 73, 71] },
          { name: "BS Artificial Intelligence", merit: 74, history: [74, 72, 70] },
          { name: "BS Cyber Security", merit: 71, history: [71, 69, 67] },
          { name: "BS Data Science", merit: 72, history: [72, 70, 68] },
          { name: "BS Software Engineering", merit: 73, history: [73, 71, 69] }
        ]
      },
      {
        campus: "Lahore",
        programs: [
          { name: "BS Computer Science", merit: 76, history: [76, 74, 72] },
          { name: "BS Data Science", merit: 74, history: [74, 72, 70] },
          { name: "BS Software Engineering", merit: 76, history: [76, 74, 72] }
        ]
      },
      {
        campus: "Karachi",
        programs: [
          { name: "BS Computer Science", merit: 68, history: [68, 66, 64] },
          { name: "BS Artificial Intelligence", merit: 67, history: [67, 65, 63] },
          { name: "BS Cyber Security", merit: 66, history: [66, 64, 62] },
          { name: "BS Data Science", merit: 66, history: [66, 64, 62] },
          { name: "BS Software Engineering", merit: 66, history: [66, 64, 62] }
        ]
      },
      {
        campus: "Peshawar",
        programs: [
          { name: "BS Computer Science", merit: 58, history: [58, 56, 54] },
          { name: "BS Artificial Intelligence", merit: 62, history: [62, 60, 58] },
          { name: "BS Software Engineering", merit: 59, history: [59, 57, 55] }
        ]
      },
      {
        campus: "CFD (Chiniot-Faisalabad)",
        programs: [
          { name: "BS Computer Science", merit: 67, history: [67, 65, 63] },
          { name: "BS Artificial Intelligence", merit: 62, history: [62, 60, 58] },
          { name: "BS Software Engineering", merit: 66, history: [66, 64, 62] }
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
          { name: "BS Computer Science", merit: "#282", history: ["#282", "#447", "#520"] },
          { name: "BS Artificial Intelligence", merit: "#298", history: ["#298", "#566", "#650"] },
          { name: "BS Data Science", merit: "#328", history: ["#328", "#652", "#720"] },
          { name: "BS Software Engineering", merit: "#115", history: ["#115", "#378", "#450"] },
          { name: "BS Computer Engineering", merit: "#327", history: ["#327", "#400", "#480"] },
          { name: "BS Electrical Engineering", merit: "#691", history: ["#691", "#2449", "#2800"] }
        ]
      },
      {
        campus: "EME Rawalpindi",
        programs: [
          { name: "BS Computer Engineering", merit: "#1072", history: ["#1072", "#2746", "#3100"] },
          { name: "BS Electrical Engineering", merit: "#2914", history: ["#2914", "#6139", "#6800"] },
          { name: "BS Mechanical Engineering", merit: "#2980", history: ["#2980", "#6204", "#6900"] },
          { name: "BS Mechatronics Engineering", merit: "#1929", history: ["#1929", "#4830", "#5400"] }
        ]
      },
      {
        campus: "MCS Rawalpindi",
        programs: [
          { name: "BS Electrical Engineering", merit: "#3432", history: ["#3432", "#7703", "#8500"] },
          { name: "BS Software Engineering", merit: "#819", history: ["#819", "#1262", "#1450"] },
          { name: "BS Information Security", merit: "#1351", history: ["#1351", "#2988", "#3400"] }
        ]
      },
      {
        campus: "NBC Quetta",
        programs: [
          { name: "BS Computer Science", merit: "#1002", history: ["#1002", "#5360", "#6000"] },
          { name: "BS Artificial Intelligence", merit: "#1214", history: ["#1214", "#12369", "#14000"] },
          { name: "BE Civil Engineering", merit: "#7440", history: ["#7440", "#14714", "#16000"] }
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
          { name: "BS Computer Science", merit: "#602", history: ["#602", "#324", "#380"] },
          { name: "BS Artificial Intelligence", merit: "#670", history: ["#670", "#499", "#550"] },
          { name: "BS Software Engineering", merit: "#857", history: ["#857", "#566", "#620"] },
          { name: "BS Cyber Security", merit: "#1340", history: ["#1340", "#958", "#1050"] },
          { name: "BS Data Science", merit: "#1399", history: ["#1399", "#1008", "#1100"] },
          { name: "BS Computer Engineering", merit: "#1358", history: ["#1358", "#1101", "#1200"] },
          { name: "BS Mechanical Engineering", merit: "#2241", history: ["#2241", "#1800", "#2000"] },
          { name: "BS Electrical Engineering", merit: "#2592", history: ["#2592", "#2100", "#2300"] },
          { name: "BS Civil Engineering", merit: "#3249", history: ["#3249", "#2800", "#3100"] },
          { name: "BS Chemical Engineering", merit: "#3391", history: ["#3391", "#2900", "#3200"] },
          { name: "BS Materials Science", merit: "#3374", history: ["#3374", "#2850", "#3150"] },
          { name: "BS Management Sciences", merit: "#800", history: ["#800", "#600", "#700"] }
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
          { name: "BS Computer Science", merit: 88.89, history: [88.89, 88.28, 86.5] },
          { name: "BS Artificial Intelligence", merit: 88.53, history: [88.53, 87.28, 85.8] },
          { name: "BS Software Engineering", merit: 86.69, history: [86.69, 86.32, 84.5] },
          { name: "BS Data Science", merit: 87.11, history: [87.11, 86.16, 84.3] },
          { name: "BS Cyber Security", merit: 87.51, history: [87.51, 86.04, 84.2] },
          { name: "BS Computer Engineering", merit: 82.14, history: [82.14, 80.5, 78.8] },
          { name: "BS Electrical Engineering", merit: 70.68, history: [70.68, 68.5, 66.2] }
        ]
      },
      {
        campus: "Lahore",
        programs: [
          { name: "BS Computer Science", merit: 88.18, history: [88.18, 88.21, 86.2] },
          { name: "BS Software Engineering", merit: 86.39, history: [86.39, 86.60, 84.5] },
          { name: "BS Artificial Intelligence", merit: 84.52, history: [84.52, 83.5, 81.8] },
          { name: "BS Computer Engineering", merit: 84.05, history: [84.05, 83.84, 81.5] },
          { name: "BS Electrical Engineering", merit: 74.93, history: [74.93, 73.5, 71.2] },
          { name: "BS Business Data Analytics", merit: 75.64, history: [75.64, 74.2, 72.5] }
        ]
      },
      {
        campus: "Abbottabad",
        programs: [
          { name: "BS Computer Science", merit: 81.2, history: [81.2, 80.5, 78.8] },
          { name: "BS Software Engineering", merit: 80.01, history: [80.01, 79.5, 77.2] }
        ]
      },
      {
        campus: "Wah",
        programs: [
          { name: "BS Computer Science", merit: 80, history: [80, 79.5, 77.8] },
          { name: "BS Software Engineering", merit: 80, history: [80, 79.2, 77.5] },
          { name: "BS Artificial Intelligence", merit: 80, history: [80, 79, 77.2] }
        ]
      },
      {
        campus: "Attock",
        programs: [
          { name: "BS Computer Science", merit: 80, history: [80, 81, 79] },
          { name: "BS Software Engineering", merit: 79, history: [79, 79, 77] },
          { name: "BS Artificial Intelligence", merit: 79, history: [79, 78, 76] }
        ]
      },
      {
        campus: "Sahiwal",
        programs: [
          { name: "BS Computer Science", merit: 80, history: [80, 81, 79] },
          { name: "BS Software Engineering", merit: 79, history: [79, 79, 77] },
          { name: "BS Artificial Intelligence", merit: 80, history: [80, 80, 78] }
        ]
      },
      {
        campus: "Vehari",
        programs: [
          { name: "BS Computer Science", merit: 80, history: [80, 81, 79] },
          { name: "BS Software Engineering", merit: 78, history: [78, 79, 77] }
        ]
      }
    ]
  },
  {
    id: "ist",
    name: "Institute of Space Technology",
    year: 2024,
    campuses: [
      {
        campus: "Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 90, history: [90, 88, 86] }
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
          { name: "BS Computer Science", merit: 90.17, history: [90.17, 89.5, 88.2] },
          { name: "BS Software Engineering", merit: 89.62, history: [89.62, 88.8, 87.5] },
          { name: "BS Information Technology", merit: 88.48, history: [88.48, 87.6, 86.3] },
          { name: "BS Data Science", merit: 88.79, shift: "Morning", history: [88.79, 88, 86.8] }
        ]
      },
      {
        campus: "New Campus",
        programs: [
          { name: "BS Software Engineering", merit: 89.89, history: [89.89, 89, 87.8] },
          { name: "BS Computer Science", merit: 90.68, history: [90.68, 89.8, 88.5] },
          { name: "BS Information Technology", merit: 88.56, history: [88.56, 87.7, 86.4] }
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
          { name: "BS Computer Science", merit: 90.17, history: [90.17, 89.5, 88.2] },
          { name: "BS Software Engineering", merit: 89.62, history: [89.62, 88.8, 87.5] },
          { name: "BS Information Technology", merit: 88.48, history: [88.48, 87.6, 86.3] }
        ]
      },
      {
        campus: "New Campus",
        programs: [
          { name: "BS Software Engineering", merit: 89.89, history: [89.89, 89, 87.8] },
          { name: "BS Computer Science", merit: 90.68, history: [90.68, 89.8, 88.5] },
          { name: "BS Information Technology", merit: 88.56, history: [88.56, 87.7, 86.4] }
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
          { name: "BS Computer Science", merit: 86, history: [86, 85, 83] },
          { name: "BS Information Technology", merit: 83, history: [83, 82, 80] }
        ]
      },
      {
        campus: "H-11 Islamabad",
        programs: [
          { name: "BS Computer Science", merit: 86, history: [86, 85, 83] },
          { name: "BS Software Engineering", merit: 83, history: [83, 82, 80] }
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
          { name: "BS Computing & Information Sciences", merit: 90.6, history: [90.6, 89.8, 88.5] }
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
          { name: "BE Software Engineering", merit: 87.53, history: [87.53, 86.86, 86.86, 91.5, 83.25] },
          { name: "BE Computer Systems Engineering", merit: 85.84, history: [85.84, 83.9, 83.9, 89.18, 83.61] },
          { name: "BE Electronic Engineering", merit: 80.25, history: [80.25, 76.02, 76.82, 83.41, 75.25] },
          { name: "BE Electrical Engineering", merit: 80.02, history: [80.02, 79.41, 79.41, 85.82, 78.74] },
          { name: "BS Computational Finance", merit: 78.98, history: [78.98, 72.73, 72.73, 77.91, 72] },
          { name: "BE Mechanical Engineering", merit: 78.3, history: [78.3, 73.06, 73.86, 82.86, 77.67] },
          { name: "BE Industrial & Manufacturing", merit: 77.43, history: [77.43, 73, 73.06, 82.14, 75.25] },
          { name: "BE Telecommunications Engineering", merit: 76.4, history: [76.4, 71.68, 71.68, 80.5, 73.69] },
          { name: "BE Chemical Engineering", merit: 76, history: [76, 71.9, 73.6, 82.14, 76.04] },
          { name: "BE Biomedical Engineering", merit: 73.88, history: [73.88, 66.3, 62.77, 72.5, 73] },
          { name: "BE Civil Engineering", merit: 72.34, history: [72.34, 69, 70.18, 79, 73.69] },
          { name: "BE Textile Engineering", merit: 71.3, history: [71.3, 69.32, 69.32, 79.36, 74.89] },
          { name: "BE Petroleum Engineering", merit: 70.2, history: [70.2, 65, 65.77, 76.13, 71.25] },
          { name: "BE Materials Engineering", merit: 68.12, history: [68.12, 64.44, 62.36, 75, 70.75] },
          { name: "BE Metallurgical Engineering", merit: 66.33, history: [66.33, 63.45, 60.77, 74, 67] },
          { name: "BE Polymer & Petrochemical", merit: 65.32, history: [65.32, 60.55, 60.55, 72, 70] }
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
          { name: "BS Computer Science", merit: 87, history: [87, 85, 83] },
          { name: "BS Information Technology", merit: 86, history: [86, 84, 82] }
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
    id: "uet-taxila",
    name: "UET Taxila",
    year: 2024,
    campuses: [
      {
        campus: "Main Campus",
        programs: [
          { name: "BS Software Engineering", merit: 79.43, history: [79.43, 78.2, 76.8] },
          { name: "BS Computer Science", merit: 77.97, history: [77.97, 76.5, 75.2] },
          { name: "BS Computer", merit: 75.05, history: [75.05, 73.8, 72.5] },
          { name: "BS Computer Science (Pre-Medical)", merit: 78.18, history: [78.18, 77, 75.5] }
        ]
      }
    ]
  },
  {
    id: "uet",
    name: "UET Lahore",
    year: 2024,
    campuses: [
      {
        campus: "Main Campus",
        programs: [
          { name: "BS Computer Science", merit: 81.83, category: "Open Merit", history: [81.83, 80.5, 79.2] },
          { name: "BS Computer Science", merit: 66.40, category: "Non-Merit", history: [66.4, 65.2, 64] },
          { name: "BS Artificial Intelligence", merit: 71.29, history: [71.29, 70, 68.5] },
          { name: "BS Data Science", merit: 54.37, history: [54.37, 53, 51.8] },
          { name: "BS Information Systems Technology", merit: 56.18, history: [56.18, 55, 53.5] },
          { name: "BS Applied Computing", merit: 55.76, history: [55.76, 54.5, 53] }
        ]
      },
      {
        campus: "KSK Campus",
        programs: [
          { name: "BS Computer Science", merit: 77.44, category: "Open Merit", history: [77.44, 76.2, 75] },
          { name: "BS Computer Science", merit: 66.11, category: "Non-Merit", history: [66.11, 65, 63.8] },
          { name: "BS Software Engineering", merit: 81.04, category: "Open Merit", history: [81.04, 79.8, 78.5] },
          { name: "BS Software Engineering", merit: 59.21, category: "Non-Merit", history: [59.21, 58, 56.8] }
        ]
      },
      {
        campus: "Faisalabad Campus",
        programs: [
          { name: "BS Computer Science", merit: 76.31, category: "Open Merit", history: [76.31, 75, 73.8] }
        ]
      },
      {
        campus: "Narowal Campus",
        programs: [
          { name: "BS Computer Science", merit: 72.30, category: "Open Merit", history: [72.3, 71, 69.8] }
        ]
      },
      {
        campus: "RCET Gujranwala",
        programs: [
          { name: "BS Computer Science", merit: 72.04, category: "Open Merit", history: [72.04, 70.8, 69.5] }
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
          { name: "BS Software Engineering", merit: 83.05, history: [83.05, 82, 80.5] },
          { name: "BS Computer Science", merit: 81.27, history: [81.27, 83, 81] },
          { name: "BS Artificial Intelligence", merit: 80.81, history: [80.81, 79, 77.5] },
          { name: "BS Computer Engineering", merit: 77, history: [77, 75.5, 74] },
          { name: "BS Financial Technology", merit: 62.09, history: [62.09, 60, 58.5] },
          { name: "BS Management & Technology", merit: 61.27, history: [61.27, 60, 58] },
          { name: "BS Electrical Engineering", merit: 60.12, history: [60.12, 58.5, 57] },
          { name: "BS Economics with Data Science", merit: 53.34, history: [53.34, 52, 50.5] }
        ]
      }
    ]
  },
  {
    id: "iba",
    name: "IBA Karachi",
    year: 2024,
    campuses: [
      {
        campus: "Karachi",
        programs: [
          { name: "BBA", merit: "85+", history: ["85+", "84+", "83+"] },
          { name: "BS Computer Science", merit: "80+", history: ["80+", "79+", "78+"] },
          { name: "BS Economics", merit: "82+", history: ["82+", "81+", "80+"] }
        ]
      }
    ]
  }
];

// Helper function to get merit data by university ID
function getMeritDataById(universityId) {
  return meritData.find(uni => uni.id === universityId) || null;
}

// Helper function to format merit value for display
function formatMeritValue(merit) {
  if (typeof merit === 'number') {
    return merit.toFixed(2) + '%';
  }
  return merit;
}

// Helper function to calculate admission prediction based on historical data
function calculateAdmissionPrediction(universityId, programName, userAggregate, campus = null) {
  const uniData = getMeritDataById(universityId);
  if (!uniData) return null;

  let program = null;
  for (const c of uniData.campuses) {
    if (campus && c.campus !== campus) continue;
    program = c.programs.find(p => p.name === programName);
    if (program) break;
  }

  if (!program || !program.history) return null;

  // For rank-based merit (NUST, GIKI), we can't calculate percentage prediction
  if (uniData.meritType === 'rank') {
    return {
      type: 'rank',
      message: 'Merit is rank-based. Check your NET rank against closing merit.'
    };
  }

  // Calculate average historical merit
  const numericHistory = program.history.filter(h => typeof h === 'number');
  if (numericHistory.length === 0) return null;

  const avgMerit = numericHistory.reduce((a, b) => a + b, 0) / numericHistory.length;
  const minMerit = Math.min(...numericHistory);
  const maxMerit = Math.max(...numericHistory);

  // Calculate prediction
  let prediction = {
    type: 'percentage',
    currentMerit: program.merit,
    avgMerit: avgMerit.toFixed(2),
    minMerit: minMerit.toFixed(2),
    maxMerit: maxMerit.toFixed(2),
    userAggregate: userAggregate
  };

  if (userAggregate >= maxMerit + 3) {
    prediction.status = 'excellent';
    prediction.message = 'Excellent chances! Your aggregate is well above historical merits.';
    prediction.probability = '90%+';
  } else if (userAggregate >= avgMerit) {
    prediction.status = 'good';
    prediction.message = 'Good chances! Your aggregate is above average merit.';
    prediction.probability = '70-85%';
  } else if (userAggregate >= minMerit) {
    prediction.status = 'moderate';
    prediction.message = 'Moderate chances. Your aggregate is within historical range.';
    prediction.probability = '40-60%';
  } else if (userAggregate >= minMerit - 3) {
    prediction.status = 'low';
    prediction.message = 'Low chances. Consider backup options.';
    prediction.probability = '15-35%';
  } else {
    prediction.status = 'unlikely';
    prediction.message = 'Unlikely. Your aggregate is significantly below historical merits.';
    prediction.probability = '<15%';
  }

  return prediction;
}
