# University Admission Calculator

A comprehensive web application designed to calculate university admission merit and aggregate scores for Pakistani universities. This tool helps students evaluate their chances of admission across multiple institutions with accurate, up-to-date merit calculation formulas.

## Overview

The University Admission Calculator provides students with a reliable platform to calculate their merit scores for over 15 top Pakistani universities. The application supports both FSc and A-Level educational backgrounds and includes specialized calculations for different academic programs.

## Key Features

**Multi-University Support**: Compatible with 15+ prestigious Pakistani universities including FAST-NUCES, NUST, ITU, COMSATS, GIKI, PIEAS, and others.

**Real-Time Calculations**: Instant merit calculation using officially verified formulas for each institution.

**Educational System Flexibility**: Full support for both FSc (Pre-Engineering/Pre-Medical) and A-Level students with appropriate grade conversions.

**Program-Specific Calculations**: Dedicated merit calculations for Computer Science, Engineering, Business Administration, and other specialized programs.

**Responsive Interface**: Optimized for all devices including desktop computers, tablets, and mobile phones.

**User-Friendly Design**: Clean, intuitive interface that guides users through the calculation process step by step.

## Supported Institutions

The calculator currently supports merit calculations for the following universities:

* FAST National University of Computer and Emerging Sciences
* National University of Sciences and Technology (NUST)
* Information Technology University (ITU)
* COMSATS University Islamabad
* Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI)
* Pakistan Institute of Engineering and Applied Sciences (PIEAS)
* University of Engineering and Technology Lahore (UET)
* Quaid-i-Azam University Islamabad (QAU)
* University of the Punjab (PU)
* NED University of Engineering and Technology
* AIR University Islamabad
* Bahria University
* Institute of Space Technology (IST)
* National University of Technology (NUTECH)
* International Islamic University Islamabad (IIUI)

## Technical Architecture

**Frontend Framework**: React 18 with TypeScript for type safety and modern development practices.

**Styling Solution**: Tailwind CSS for utility-first styling and responsive design.

**Build System**: Vite for fast development and optimized production builds.

**Animation Library**: Framer Motion for smooth user interface transitions.

**Icon System**: Lucide React for consistent iconography.

**Deployment Ready**: Configured for deployment on Vercel, Netlify, or similar platforms.

## Installation and Setup

### System Requirements

* Node.js version 16.0 or higher
* npm (Node Package Manager) or yarn

### Local Development Setup

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/university-admission-calculator.git
cd university-admission-calculator
```

Install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Access the application by opening your web browser and navigating to `http://localhost:5173`.

### Production Build

To create a production-ready build:

```bash
npm run build
```

The optimized files will be generated in the `dist` directory and are ready for deployment to any static hosting service.

## Application Usage

### Step-by-Step Guide

1. **University Selection**: Browse and select your target university from the comprehensive list of supported institutions.

2. **Program Selection**: Choose the specific academic program you wish to apply for (e.g., Computer Science, Electrical Engineering, Business Administration).

3. **Academic Records Input**: Enter your academic scores:
   * Matriculation (SSC) marks and total marks
   * Intermediate (HSSC) or A-Level grades and subjects
   * Entry test scores (if applicable)

4. **Merit Calculation**: The system automatically calculates your merit score using the official university formula.

5. **Results Analysis**: Review your calculated merit score along with additional insights about your admission prospects.

## Merit Calculation Methodologies

Each university employs specific weightage formulas for merit calculation. Below are examples of the calculation methods used:

### FAST National University of Computer and Emerging Sciences

**Computer Science Programs**:
* Matriculation: 10% weightage
* Intermediate/A-Level: 40% weightage  
* Entry Test: 50% weightage

**Engineering Programs**:
* Matriculation: 17% weightage
* Intermediate: 50% weightage
* Entry Test: 33% weightage

**Business Programs**:
* Matriculation: 10% weightage
* Intermediate: 40% weightage
* Entry Test: 50% weightage

### National University of Sciences and Technology (NUST)

Merit calculation based on the NUST Entry Test (NET) with program-specific weightages for Engineering and Computing disciplines.

### Information Technology University (ITU)

**All Programs**:
* Matriculation: 15% weightage
* Intermediate: 35% weightage
* Entry Test: 50% weightage

## Contributing to the Project

We welcome contributions from the community. Whether you want to report bugs, suggest new features, or contribute code improvements, your input is valuable.

### Contribution Guidelines

Before submitting contributions, please ensure you follow these guidelines:

* Maintain consistency with the existing codebase style and conventions
* Include comprehensive comments for complex algorithms or business logic
* Update relevant documentation when introducing new features
* Thoroughly test all changes before submission
* Submit pull requests with clear descriptions of changes made

### Reporting Issues

If you encounter bugs or have feature requests, please use the GitHub Issues section to report them. Provide detailed information including:

* Steps to reproduce the issue
* Expected vs actual behavior
* Browser and operating system information
* Screenshots if applicable

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── calculator/      # Calculator-specific components
│   ├── common/          # Shared UI components
│   ├── pages/           # Page-level components
│   └── university/      # University-related components
├── data/                # Static data and configuration
│   ├── meritData.ts     # Merit calculation formulas
│   ├── universities.ts  # University information
│   └── testPatterns.ts  # Entry test patterns
├── types/               # TypeScript type definitions
└── utils/               # Utility functions and helpers
```

## License Information

This project is released under the MIT License. See the LICENSE file in the repository root for complete license terms and conditions.

## Acknowledgments

This project exists thanks to the following:

* Pakistani university admission offices for providing transparent merit calculation formulas
* The open-source community for developing the tools and libraries that make this project possible
* Students and educators who provide feedback and suggestions for continuous improvement
* Contributors who dedicate their time to enhancing the platform

## Support and Contact

For technical support, feature requests, or general inquiries:

* Submit issues through the GitHub repository issue tracker
* Review existing documentation and FAQ sections before requesting support
* Contribute to discussions in the project's community forums

This project is maintained by a dedicated team committed to helping Pakistani students navigate the university admission process with accurate, reliable tools.
