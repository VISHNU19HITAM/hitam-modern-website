/* ==========================================================================
   SECTION 8B: PLACEMENTS & CORPORATE RECRUITMENT CELL
   Hyderabad Institute of Technology and Management (UGC Autonomous)
   Includes:
   - Year-wise Placement Records (2020 to 2026) with Placed Counts & Details
   - Highest Package Achiever Spotlight per Batch / Selected Year
   - 20 Top Recruiting Partner Companies (No Drive Profiles)
   - Student Placement Registration Desk (Eligibility, Form & Instant Slip)
   - Dynamic Year, Branch, Tier and Search Filters
   ========================================================================== */

// 1. Batch-wise Placement Overview Statistics (2020 to 2026)
const hitamPlacementBatchStats = {
  '2026': {
    totalPlaced: 538,
    highestCTC: '₹24.00 LPA',
    avgCTC: '₹6.40 LPA',
    placementRate: '94.2%',
    topCompany: 'Goldman Sachs',
    topStudent: 'P. Vignesh Reddy',
    topRoll: '22E51A6612',
    topBranch: 'CSE (AI & ML)',
    topRole: 'Engineering Analyst',
    topCategory: 'Super Dream',
    avatarBg: '#08752f',
    initials: 'VR'
  },
  '2025': {
    totalPlaced: 512,
    highestCTC: '₹21.50 LPA',
    avgCTC: '₹6.10 LPA',
    placementRate: '93.5%',
    topCompany: 'Amazon AWS',
    topStudent: 'S. Harshavardhan',
    topRoll: '21E51A0518',
    topBranch: 'Computer Science & Engg',
    topRole: 'Cloud Solutions Associate',
    topCategory: 'Super Dream',
    avatarBg: '#0369a1',
    initials: 'SH'
  },
  '2024': {
    totalPlaced: 486,
    highestCTC: '₹18.00 LPA',
    avgCTC: '₹5.75 LPA',
    placementRate: '92.8%',
    topCompany: 'Microsoft',
    topStudent: 'V. Ravindra',
    topRoll: '20E51A6704',
    topBranch: 'CSE (Data Science)',
    topRole: 'Systems Software Engineer',
    topCategory: 'Super Dream',
    avatarBg: '#002050',
    initials: 'VR'
  },
  '2023': {
    totalPlaced: 445,
    highestCTC: '₹15.50 LPA',
    avgCTC: '₹5.30 LPA',
    placementRate: '91.4%',
    topCompany: 'Cisco Systems',
    topStudent: 'M. Sumanth',
    topRoll: '19E51A0410',
    topBranch: 'Electronics & Communication',
    topRole: 'Network Software Engineer',
    topCategory: 'Super Dream',
    avatarBg: '#053d58',
    initials: 'MS'
  },
  '2022': {
    totalPlaced: 418,
    highestCTC: '₹14.00 LPA',
    avgCTC: '₹4.95 LPA',
    placementRate: '90.2%',
    topCompany: 'Darwinbox',
    topStudent: 'D. Sai Charan',
    topRoll: '18E51A0522',
    topBranch: 'Computer Science & Engg',
    topRole: 'Product Software Engineer',
    topCategory: 'Super Dream',
    avatarBg: '#312e81',
    initials: 'SC'
  },
  '2021': {
    totalPlaced: 382,
    highestCTC: '₹12.50 LPA',
    avgCTC: '₹4.60 LPA',
    placementRate: '89.1%',
    topCompany: 'Virtusa',
    topStudent: 'N. Bharath',
    topRoll: '17E51A6608',
    topBranch: 'CSE (AI & ML)',
    topRole: 'FinTech Software Associate',
    topCategory: 'Super Dream',
    avatarBg: '#7f1d1d',
    initials: 'NB'
  },
  '2020': {
    totalPlaced: 342,
    highestCTC: '₹11.00 LPA',
    avgCTC: '₹4.25 LPA',
    placementRate: '88.4%',
    topCompany: 'TCS Digital',
    topStudent: 'G. Tarun',
    topRoll: '16E51A0534',
    topBranch: 'Computer Science & Engg',
    topRole: 'Digital Systems Innovator',
    topCategory: 'Dream Tier',
    avatarBg: '#111827',
    initials: 'GT'
  }
};

// 2. 20 Top Recruiting Partner Companies with Visual Badges & Details
const hitamRecruitersData = [
  {
    id: 'rec-gs',
    name: 'Goldman Sachs',
    tier: 'Super Dream',
    highestCTC: '₹24.00 LPA',
    roles: 'Engineering Analyst, Systems Associate',
    hiredCount: 12,
    badgeBg: '#0b2046',
    logoText: 'GS',
    accentColor: '#1d4ed8',
    category: 'Investment Banking & FinTech',
    photo: 'assets/hitam7.jpeg'
  },
  {
    id: 'rec-aws',
    name: 'Amazon AWS',
    tier: 'Super Dream',
    highestCTC: '₹21.50 LPA',
    roles: 'Cloud Support Associate, SDE Intern',
    hiredCount: 18,
    badgeBg: '#131921',
    logoText: 'AWS',
    accentColor: '#f59e0b',
    category: 'Cloud Infrastructure & Distributed Systems',
    photo: 'assets/hitam1.jpg'
  },
  {
    id: 'rec-msft',
    name: 'Microsoft',
    tier: 'Super Dream',
    highestCTC: '₹18.00 LPA',
    roles: 'Software Engineer, Support Specialist',
    hiredCount: 8,
    badgeBg: '#002050',
    logoText: 'MSFT',
    accentColor: '#00a4ef',
    category: 'Enterprise Cloud & Operating Systems',
    photo: 'assets/hitam5.jpeg'
  },
  {
    id: 'rec-goog',
    name: 'Google Cloud',
    tier: 'Super Dream',
    highestCTC: '₹18.00 LPA',
    roles: 'Cloud Infrastructure Engineer, Associate SDE',
    hiredCount: 6,
    badgeBg: '#1a1f2c',
    logoText: 'GCP',
    accentColor: '#4285f4',
    category: 'Hyperscale Cloud & AI Infrastructure',
    photo: 'assets/hitam3.jpeg'
  },
  {
    id: 'rec-db',
    name: 'Darwinbox',
    tier: 'Super Dream',
    highestCTC: '₹14.00 LPA',
    roles: 'Member Technical Staff (MTS)',
    hiredCount: 14,
    badgeBg: '#312e81',
    logoText: 'DB',
    accentColor: '#6366f1',
    category: 'Enterprise HR Tech SaaS Unicorn',
    photo: 'assets/hitam2.jpeg'
  },
  {
    id: 'rec-cisco',
    name: 'Cisco Systems',
    tier: 'Super Dream',
    highestCTC: '₹15.50 LPA',
    roles: 'Network Software Engineer, Security Analyst',
    hiredCount: 10,
    badgeBg: '#053d58',
    logoText: 'CISCO',
    accentColor: '#049fd9',
    category: 'Networking & Enterprise Cyber Systems',
    photo: 'assets/hitam6.jpeg'
  },
  {
    id: 'rec-oracle',
    name: 'Oracle',
    tier: 'Super Dream',
    highestCTC: '₹15.00 LPA',
    roles: 'Applications Developer, Cloud Engineer',
    hiredCount: 11,
    badgeBg: '#4a0e0e',
    logoText: 'ORCL',
    accentColor: '#ea1c24',
    category: 'Enterprise Database & Cloud Suite',
    photo: 'assets/hitam4.jpeg'
  },
  {
    id: 'rec-snow',
    name: 'ServiceNow',
    tier: 'Super Dream',
    highestCTC: '₹14.00 LPA',
    roles: 'Associate Platform Engineer',
    hiredCount: 9,
    badgeBg: '#032d27',
    logoText: 'NOW',
    accentColor: '#10b981',
    category: 'Digital Workflow & Cloud Automation',
    photo: 'assets/hitam7.jpeg'
  },
  {
    id: 'rec-ibm',
    name: 'IBM India',
    tier: 'Dream Tier',
    highestCTC: '₹12.00 LPA',
    roles: 'Cloud & AI Engineer, Systems Developer',
    hiredCount: 22,
    badgeBg: '#001d6c',
    logoText: 'IBM',
    accentColor: '#0f62fe',
    category: 'Hybrid Cloud & Enterprise AI',
    photo: 'assets/hitam1.jpg'
  },
  {
    id: 'rec-infy',
    name: 'Infosys (Power Programmer)',
    tier: 'Dream Tier',
    highestCTC: '₹9.50 LPA',
    roles: 'Specialist Programmer, Digital SE',
    hiredCount: 64,
    badgeBg: '#005587',
    logoText: 'INFY',
    accentColor: '#0284c7',
    category: 'Digital Transformation & Enterprise IT',
    photo: 'assets/hitam3.jpeg'
  },
  {
    id: 'rec-tcs',
    name: 'TCS Digital',
    tier: 'Dream Tier',
    highestCTC: '₹11.00 LPA',
    roles: 'Digital Software Innovator, Systems Engg',
    hiredCount: 88,
    badgeBg: '#111827',
    logoText: 'TCS',
    accentColor: '#2563eb',
    category: 'Next-Gen Cognitive Digital Solutions',
    photo: 'assets/hitam2.jpeg'
  },
  {
    id: 'rec-cap',
    name: 'Capgemini',
    tier: 'Dream Tier',
    highestCTC: '₹7.50 LPA',
    roles: 'Senior Software Analyst, DevOps',
    hiredCount: 72,
    badgeBg: '#004369',
    logoText: 'CAP',
    accentColor: '#0ea5e9',
    category: 'Global Engineering & Cloud Services',
    photo: 'assets/hitam6.jpeg'
  },
  {
    id: 'rec-vir',
    name: 'Virtusa',
    tier: 'Dream Tier',
    highestCTC: '₹12.50 LPA',
    roles: 'Associate Engineer, FinTech Developer',
    hiredCount: 44,
    badgeBg: '#7f1d1d',
    logoText: 'VIR',
    accentColor: '#dc2626',
    category: 'FinTech & Capital Markets Engineering',
    photo: 'assets/hitam4.jpeg'
  },
  {
    id: 'rec-cts',
    name: 'Cognizant (GenC Elevate)',
    tier: 'Dream Tier',
    highestCTC: '₹7.50 LPA',
    roles: 'GenC Elevate SDE, Cloud Practitioner',
    hiredCount: 96,
    badgeBg: '#1e3a8a',
    logoText: 'CTS',
    accentColor: '#3b82f6',
    category: 'Digital Engineering & AI Solutions',
    photo: 'assets/hitam7.jpeg'
  },
  {
    id: 'rec-wipro',
    name: 'Wipro (Turbo)',
    tier: 'Dream Tier',
    highestCTC: '₹6.50 LPA',
    roles: 'Turbo Project Engineer, IoT Dev',
    hiredCount: 58,
    badgeBg: '#134e4a',
    logoText: 'WIPRO',
    accentColor: '#14b8a6',
    category: 'Cloud, Cybersecurity & IoT Services',
    photo: 'assets/hitam1.jpg'
  },
  {
    id: 'rec-acn',
    name: 'Accenture Solutions',
    tier: 'Dream Tier',
    highestCTC: '₹8.50 LPA',
    roles: 'Advanced Technology Associate',
    hiredCount: 76,
    badgeBg: '#581c87',
    logoText: 'ACN',
    accentColor: '#a855f7',
    category: 'Technology Strategy & Scaled Platforms',
    photo: 'assets/hitam5.jpeg'
  },
  {
    id: 'rec-tm',
    name: 'Tech Mahindra',
    tier: 'Corporate Tier',
    highestCTC: '₹5.50 LPA',
    roles: 'Associate Software Engineer, Telecom Dev',
    hiredCount: 42,
    badgeBg: '#78350f',
    logoText: 'TM',
    accentColor: '#d97706',
    category: 'Telecom, 5G & Network Software',
    photo: 'assets/hitam3.jpeg'
  },
  {
    id: 'rec-hex',
    name: 'Hexaware Technologies',
    tier: 'Corporate Tier',
    highestCTC: '₹6.00 LPA',
    roles: 'Software Engineer Trainee',
    hiredCount: 34,
    badgeBg: '#064e3b',
    logoText: 'HEX',
    accentColor: '#10b981',
    category: 'Automation & Cloud Modernization',
    photo: 'assets/hitam2.jpeg'
  },
  {
    id: 'rec-ltt',
    name: 'L&T Technology Services',
    tier: 'Corporate Tier',
    highestCTC: '₹6.00 LPA',
    roles: 'Embedded Systems Engineer, CAD Analyst',
    hiredCount: 26,
    badgeBg: '#0c4a6e',
    logoText: 'LTTS',
    accentColor: '#0284c7',
    category: 'Core Engineering R&D & Automation',
    photo: 'assets/hitam7.jpeg'
  },
  {
    id: 'rec-bosch',
    name: 'Robert Bosch',
    tier: 'Corporate Tier',
    highestCTC: '₹7.00 LPA',
    roles: 'Automotive Software Engineer, IoT Trainee',
    hiredCount: 20,
    badgeBg: '#701a75',
    logoText: 'BOSCH',
    accentColor: '#c026d3',
    category: 'Automotive Telematics & Embedded Systems',
    photo: 'assets/hitam4.jpeg'
  }
];

// 3. Placed Students Roster Across Batches 2020 to 2026
const hitamPlacedStudentsData = [
  // --- BATCH OF 2026 ---
  {
    name: 'P. Vignesh Reddy',
    roll: '22E51A6612',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Goldman Sachs',
    role: 'Engineering Analyst',
    package: '₹24.00 LPA',
    tier: 'Super Dream',
    batch: '2026',
    verified: true,
    initials: 'VR',
    avatarBg: '#08752f'
  },
  {
    name: 'K. Sai Teja',
    roll: '22E51A6604',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Amazon AWS',
    role: 'Cloud Solutions Associate',
    package: '₹18.50 LPA',
    tier: 'Super Dream',
    batch: '2026',
    verified: true,
    initials: 'ST',
    avatarBg: '#0369a1'
  },
  {
    name: 'P. Haritha',
    roll: '22E51A6708',
    branch: 'CSE (Data Science)',
    branchCode: 'CSD',
    company: 'Darwinbox',
    role: 'Member Technical Staff (MTS)',
    package: '₹12.00 LPA',
    tier: 'Super Dream',
    batch: '2026',
    verified: true,
    initials: 'PH',
    avatarBg: '#4338ca'
  },
  {
    name: 'R. Akhil Kumar',
    roll: '22E51A0512',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Infosys (Power Programmer)',
    role: 'Specialist Programmer',
    package: '₹9.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'AK',
    avatarBg: '#0f766e'
  },
  {
    name: 'M. Ananya',
    roll: '22E51A0545',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'TCS Digital',
    role: 'Digital Software Innovator',
    package: '₹7.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'MA',
    avatarBg: '#1e40af'
  },
  {
    name: 'G. Nikhil',
    roll: '22E51A0415',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Capgemini',
    role: 'Embedded Software Analyst',
    package: '₹7.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'GN',
    avatarBg: '#b45309'
  },
  {
    name: 'V. Sneha Reddy',
    roll: '22E51A6623',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Virtusa',
    role: 'FinTech Software Associate',
    package: '₹7.00 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'SR',
    avatarBg: '#991b1b'
  },
  {
    name: 'S. Rohith',
    roll: '22E51A0538',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Cognizant (GenC Elevate)',
    role: 'GenC Elevate SDE',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'SR',
    avatarBg: '#1e3a8a'
  },
  {
    name: 'D. Shravan',
    roll: '22E51A0422',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Wipro (Turbo)',
    role: 'IoT & Firmware Engineer',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'DS',
    avatarBg: '#115e59'
  },
  {
    name: 'B. Priyanka',
    roll: '22E51A6715',
    branch: 'CSE (Data Science)',
    branchCode: 'CSD',
    company: 'Accenture Solutions',
    role: 'Advanced Technology Associate',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'BP',
    avatarBg: '#6b21a8'
  },
  {
    name: 'N. Divya',
    roll: '22E51A0550',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Hexaware Technologies',
    role: 'Automation & Cloud Trainee',
    package: '₹6.00 LPA',
    tier: 'Corporate Tier',
    batch: '2026',
    verified: true,
    initials: 'ND',
    avatarBg: '#166534'
  },
  {
    name: 'A. Karthik',
    roll: '22E51A0302',
    branch: 'Mechanical Engineering',
    branchCode: 'MECH',
    company: 'Tech Mahindra',
    role: 'CAD & Systems Engineer',
    package: '₹5.50 LPA',
    tier: 'Corporate Tier',
    batch: '2026',
    verified: true,
    initials: 'AK',
    avatarBg: '#854d0e'
  },

  // --- BATCH OF 2025 ---
  {
    name: 'S. Harshavardhan',
    roll: '21E51A0518',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Amazon AWS',
    role: 'Cloud Solutions Associate',
    package: '₹21.50 LPA',
    tier: 'Super Dream',
    batch: '2025',
    verified: true,
    initials: 'SH',
    avatarBg: '#0369a1'
  },
  {
    name: 'Ch. Keerthi',
    roll: '21E51A6615',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Microsoft',
    role: 'Associate Software Engineer',
    package: '₹16.00 LPA',
    tier: 'Super Dream',
    batch: '2025',
    verified: true,
    initials: 'CK',
    avatarBg: '#002050'
  },
  {
    name: 'T. Abhilash',
    roll: '21E51A6703',
    branch: 'CSE (Data Science)',
    branchCode: 'CSD',
    company: 'ServiceNow',
    role: 'Associate Platform Engineer',
    package: '₹14.00 LPA',
    tier: 'Super Dream',
    batch: '2025',
    verified: true,
    initials: 'TA',
    avatarBg: '#10b981'
  },
  {
    name: 'K. Manasa',
    roll: '21E51A0529',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Darwinbox',
    role: 'Product Engineer',
    package: '₹11.50 LPA',
    tier: 'Super Dream',
    batch: '2025',
    verified: true,
    initials: 'KM',
    avatarBg: '#4338ca'
  },
  {
    name: 'J. Pranitha',
    roll: '21E51A0419',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Infosys (Power Programmer)',
    role: 'Specialist Programmer',
    package: '₹9.00 LPA',
    tier: 'Dream Tier',
    batch: '2025',
    verified: true,
    initials: 'JP',
    avatarBg: '#0f766e'
  },
  {
    name: 'P. Rahul',
    roll: '21E51A0541',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'TCS Digital',
    role: 'Digital Innovator',
    package: '₹7.50 LPA',
    tier: 'Dream Tier',
    batch: '2025',
    verified: true,
    initials: 'PR',
    avatarBg: '#1e40af'
  },
  {
    name: 'V. Bhavya',
    roll: '21E51A0431',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Capgemini',
    role: 'Software Analyst',
    package: '₹7.20 LPA',
    tier: 'Dream Tier',
    batch: '2025',
    verified: true,
    initials: 'VB',
    avatarBg: '#0ea5e9'
  },
  {
    name: 'B. Suresh',
    roll: '21E51A0312',
    branch: 'Mechanical Engineering',
    branchCode: 'MECH',
    company: 'L&T Technology Services',
    role: 'Design & Automation Engineer',
    package: '₹5.80 LPA',
    tier: 'Corporate Tier',
    batch: '2025',
    verified: true,
    initials: 'BS',
    avatarBg: '#0284c7'
  },

  // --- BATCH OF 2024 ---
  {
    name: 'V. Ravindra',
    roll: '20E51A6704',
    branch: 'CSE (Data Science)',
    branchCode: 'CSD',
    company: 'Microsoft',
    role: 'Systems Software Engineer',
    package: '₹18.00 LPA',
    tier: 'Super Dream',
    batch: '2024',
    verified: true,
    initials: 'VR',
    avatarBg: '#002050'
  },
  {
    name: 'N. Spandana',
    roll: '20E51A0511',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Oracle',
    role: 'Applications Engineer',
    package: '₹15.00 LPA',
    tier: 'Super Dream',
    batch: '2024',
    verified: true,
    initials: 'NS',
    avatarBg: '#ea1c24'
  },
  {
    name: 'B. Tejaswi',
    roll: '20E51A0408',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Cisco Systems',
    role: 'Network Software Engineer',
    package: '₹13.50 LPA',
    tier: 'Super Dream',
    batch: '2024',
    verified: true,
    initials: 'BT',
    avatarBg: '#049fd9'
  },
  {
    name: 'M. Karthikeya',
    roll: '20E51A0532',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Virtusa',
    role: 'FinTech Software Associate',
    package: '₹8.00 LPA',
    tier: 'Dream Tier',
    batch: '2024',
    verified: true,
    initials: 'MK',
    avatarBg: '#dc2626'
  },
  {
    name: 'G. Sandeep',
    roll: '20E51A0524',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'TCS Digital',
    role: 'Digital Associate',
    package: '₹7.00 LPA',
    tier: 'Dream Tier',
    batch: '2024',
    verified: true,
    initials: 'GS',
    avatarBg: '#2563eb'
  },
  {
    name: 'R. Deepa',
    roll: '20E51A0417',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Infosys',
    role: 'Systems Engineer Specialist',
    package: '₹6.80 LPA',
    tier: 'Dream Tier',
    batch: '2024',
    verified: true,
    initials: 'RD',
    avatarBg: '#0284c7'
  },

  // --- BATCH OF 2023 ---
  {
    name: 'M. Sumanth',
    roll: '19E51A0410',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Cisco Systems',
    role: 'Network Software Engineer',
    package: '₹15.50 LPA',
    tier: 'Super Dream',
    batch: '2023',
    verified: true,
    initials: 'MS',
    avatarBg: '#053d58'
  },
  {
    name: 'P. Deepthi',
    roll: '19E51A0519',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'IBM India',
    role: 'Cloud Systems Associate',
    package: '₹12.00 LPA',
    tier: 'Super Dream',
    batch: '2023',
    verified: true,
    initials: 'PD',
    avatarBg: '#0f62fe'
  },
  {
    name: 'K. Praveen',
    roll: '19E51A0535',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Accenture Solutions',
    role: 'Advanced Technology Specialist',
    package: '₹8.50 LPA',
    tier: 'Dream Tier',
    batch: '2023',
    verified: true,
    initials: 'KP',
    avatarBg: '#a855f7'
  },
  {
    name: 'S. Sandhya',
    roll: '19E51A0427',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Capgemini',
    role: 'Software Analyst',
    package: '₹6.80 LPA',
    tier: 'Dream Tier',
    batch: '2023',
    verified: true,
    initials: 'SS',
    avatarBg: '#0ea5e9'
  },
  {
    name: 'A. Tharun',
    roll: '19E51A0503',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Cognizant',
    role: 'GenC Programmer',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2023',
    verified: true,
    initials: 'AT',
    avatarBg: '#3b82f6'
  },

  // --- BATCH OF 2022 ---
  {
    name: 'D. Sai Charan',
    roll: '18E51A0522',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Darwinbox',
    role: 'Product Software Engineer',
    package: '₹14.00 LPA',
    tier: 'Super Dream',
    batch: '2022',
    verified: true,
    initials: 'SC',
    avatarBg: '#312e81'
  },
  {
    name: 'R. Vamshi Krishna',
    roll: '18E51A0548',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Cognizant',
    role: 'Digital Engineer',
    package: '₹7.50 LPA',
    tier: 'Dream Tier',
    batch: '2022',
    verified: true,
    initials: 'VK',
    avatarBg: '#3b82f6'
  },
  {
    name: 'T. Swetha',
    roll: '18E51A0414',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Wipro',
    role: 'Project Engineer',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2022',
    verified: true,
    initials: 'TS',
    avatarBg: '#14b8a6'
  },
  {
    name: 'M. Vinay',
    roll: '18E51A0307',
    branch: 'Mechanical Engineering',
    branchCode: 'MECH',
    company: 'Robert Bosch',
    role: 'CAD Automation Trainee',
    package: '₹6.25 LPA',
    tier: 'Dream Tier',
    batch: '2022',
    verified: true,
    initials: 'MV',
    avatarBg: '#c026d3'
  },

  // --- BATCH OF 2021 ---
  {
    name: 'N. Bharath',
    roll: '17E51A6608',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Virtusa',
    role: 'FinTech Software Associate',
    package: '₹12.50 LPA',
    tier: 'Super Dream',
    batch: '2021',
    verified: true,
    initials: 'NB',
    avatarBg: '#7f1d1d'
  },
  {
    name: 'K. Akhila',
    roll: '17E51A0516',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Infosys',
    role: 'Systems Engineer',
    package: '₹7.00 LPA',
    tier: 'Dream Tier',
    batch: '2021',
    verified: true,
    initials: 'KA',
    avatarBg: '#0284c7'
  },
  {
    name: 'M. Naresh',
    roll: '17E51A0311',
    branch: 'Mechanical Engineering',
    branchCode: 'MECH',
    company: 'Tech Mahindra',
    role: 'Mechanical Design Associate',
    package: '₹5.00 LPA',
    tier: 'Corporate Tier',
    batch: '2021',
    verified: true,
    initials: 'MN',
    avatarBg: '#d97706'
  },
  {
    name: 'S. Rakesh',
    roll: '17E51A0423',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Cognizant',
    role: 'Programmer Analyst',
    package: '₹4.80 LPA',
    tier: 'Corporate Tier',
    batch: '2021',
    verified: true,
    initials: 'SR',
    avatarBg: '#3b82f6'
  },

  // --- BATCH OF 2020 ---
  {
    name: 'G. Tarun',
    roll: '16E51A0534',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'TCS Digital',
    role: 'Digital Systems Innovator',
    package: '₹11.00 LPA',
    tier: 'Dream Tier',
    batch: '2020',
    verified: true,
    initials: 'GT',
    avatarBg: '#111827'
  },
  {
    name: 'P. Meghana',
    roll: '16E51A0521',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Cognizant',
    role: 'Programmer Analyst',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2020',
    verified: true,
    initials: 'PM',
    avatarBg: '#3b82f6'
  },
  {
    name: 'V. Rajesh',
    roll: '16E51A0412',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Capgemini',
    role: 'Software Engineer',
    package: '₹5.50 LPA',
    tier: 'Corporate Tier',
    batch: '2020',
    verified: true,
    initials: 'VR',
    avatarBg: '#0ea5e9'
  },
  {
    name: 'K. Pooja',
    roll: '16E51A0508',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Infosys',
    role: 'Operational Trainee',
    package: '₹4.50 LPA',
    tier: 'Corporate Tier',
    batch: '2020',
    verified: true,
    initials: 'KP',
    avatarBg: '#0284c7'
  }
];

// 4. Student Placement Registration In-Memory Database
window.placementRegistrationsDB = window.placementRegistrationsDB || [
  {
    regId: 'CGC-REG-2026-8812',
    name: 'P. Vignesh Reddy',
    roll: '22E51A6612',
    branch: 'CSE (AI & ML)',
    cgpa: '8.92',
    backlogs: '0',
    skills: 'Python, DSA, PyTorch, SQL',
    targetTrack: 'Super Dream Product / FinTech',
    status: 'VERIFIED & ENROLLED',
    registeredOn: '18-AUG-2026',
    mockBatch: 'Batch Alpha (Slot M-04)'
  },
  {
    regId: 'CGC-REG-2026-8819',
    name: 'K. Sai Teja',
    roll: '22E51A6604',
    branch: 'CSE (AI & ML)',
    cgpa: '8.76',
    backlogs: '0',
    skills: 'AWS Cloud, Java, Microservices',
    targetTrack: 'Cloud Architecture & SDE',
    status: 'VERIFIED & ENROLLED',
    registeredOn: '20-AUG-2026',
    mockBatch: 'Batch Beta (Slot M-08)'
  },
  {
    regId: 'CGC-REG-2026-8824',
    name: 'M. Ananya',
    roll: '22E51A0545',
    branch: 'Computer Science & Engg',
    cgpa: '8.45',
    backlogs: '0',
    skills: 'Full Stack, React, Spring Boot',
    targetTrack: 'Enterprise Software & SDE',
    status: 'VERIFIED & ENROLLED',
    registeredOn: '24-AUG-2026',
    mockBatch: 'Batch Gamma (Slot M-12)'
  }
];

// Active State
window.currentPlacementTab = 'records'; // 'records', 'recruiters', 'registration'
window.currentPlacementYear = '2026';   // '2026', '2025', '2024', '2023', '2022', '2021', '2020', 'ALL'
window.currentPlacementBranchFilter = 'ALL';
window.currentPlacementTierFilter = 'ALL';
window.currentPlacementSearch = '';

// Switch Main Placements View Tab
window.switchPlacementTab = function(tabName) {
  window.currentPlacementTab = tabName;
  const modalBody = document.getElementById('modalBody');
  if (modalBody) {
    modalBody.innerHTML = generatePlacementsHTML(tabName, window.currentPlacementYear);
  }
};

// Select Specific Graduation Year (2020 to 2026)
window.selectPlacementYear = function(year) {
  window.currentPlacementYear = year;
  window.currentPlacementBranchFilter = 'ALL';
  window.currentPlacementTierFilter = 'ALL';
  window.currentPlacementSearch = '';
  const modalBody = document.getElementById('modalBody');
  if (modalBody) {
    modalBody.innerHTML = generatePlacementsHTML('records', year);
  }
};

// Filter Student Placements within Selected Year
window.filterPlacementRoster = function(branch = null, tier = null, search = null) {
  if (branch !== null) window.currentPlacementBranchFilter = branch;
  if (tier !== null) window.currentPlacementTierFilter = tier;
  if (search !== null) window.currentPlacementSearch = search.toLowerCase().trim();

  // Update button active state
  document.querySelectorAll('.placement-chip-branch').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.branch === window.currentPlacementBranchFilter);
  });
  document.querySelectorAll('.placement-chip-tier').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tier === window.currentPlacementTierFilter);
  });

  const filtered = hitamPlacedStudentsData.filter(st => {
    const matchYear = (window.currentPlacementYear === 'ALL') || (st.batch === window.currentPlacementYear);
    const matchBranch = (window.currentPlacementBranchFilter === 'ALL') || (st.branchCode === window.currentPlacementBranchFilter);
    const matchTier = (window.currentPlacementTierFilter === 'ALL') || (st.tier === window.currentPlacementTierFilter);
    const matchSearch = (!window.currentPlacementSearch) || 
      st.name.toLowerCase().includes(window.currentPlacementSearch) ||
      st.roll.toLowerCase().includes(window.currentPlacementSearch) ||
      st.company.toLowerCase().includes(window.currentPlacementSearch) ||
      st.role.toLowerCase().includes(window.currentPlacementSearch);
    return matchYear && matchBranch && matchTier && matchSearch;
  });

  const rosterContainer = document.getElementById('placedStudentsGrid');
  const countBadge = document.getElementById('placedStudentsCount');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Placed Students Displayed`;
  }

  if (!rosterContainer) return;

  if (filtered.length === 0) {
    rosterContainer.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 32px 16px; text-align: center; background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 8px;">
        <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
        <div style="font-weight: 700; color: #1e293b; font-size: 14px;">No placed student records matched your filters.</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Try selecting "All Branches" or another batch year.</div>
        <button class="drill-action-btn drill-action-primary" style="margin-top: 12px; padding: 5px 12px; font-size: 11.5px;" onclick="window.filterPlacementRoster('ALL', 'ALL', '')">Reset Filters</button>
      </div>
    `;
    return;
  }

  rosterContainer.innerHTML = filtered.map(st => `
    <div class="placed-student-card">
      <div class="placed-student-top">
        <div class="placed-avatar" style="background:${st.avatarBg};">
          ${st.initials}
        </div>
        <div class="placed-info">
          <div class="placed-student-name">${st.name}</div>
          <div class="placed-student-roll">${st.roll}</div>
          <div class="placed-branch-badge">${st.branch}</div>
        </div>
      </div>
      <div class="placed-details">
        <div class="placed-company-row">
          <div class="placed-comp-icon">🏢</div>
          <div>
            <div class="placed-company-name">${st.company}</div>
            <div class="placed-role-title">${st.role}</div>
          </div>
        </div>
        <div class="placed-ctc-row">
          <span class="placed-ctc-pill ${st.tier === 'Super Dream' ? 'super-dream' : (st.tier === 'Dream Tier' ? 'dream' : 'corporate')}">
            ⭐ ${st.package}
          </span>
          <span class="placed-tier-tag">${st.tier}</span>
        </div>
      </div>
      <div class="placed-footer">
        <span class="placed-batch-tag">🎓 Batch of ${st.batch}</span>
        <span class="placed-verified-tag">✓ CGC Verified</span>
      </div>
    </div>
  `).join('');
};

// Filter students placed in a specific company clicked from the 20 companies list
window.filterByRecruiterCompany = function(companyName) {
  window.switchPlacementTab('records');
  window.selectPlacementYear('ALL');
  setTimeout(() => {
    const input = document.getElementById('placementSearchInput');
    if (input) input.value = companyName;
    window.filterPlacementRoster(null, null, companyName);
  }, 50);
};

// Student Placement Registration Submission Handler
window.handlePlacementRegistrationSubmit = function(event) {
  if (event) event.preventDefault();
  const roll = (document.getElementById('cgcRegRoll') ? document.getElementById('cgcRegRoll').value.trim() : '').toUpperCase();
  const name = document.getElementById('cgcRegName') ? document.getElementById('cgcRegName').value.trim() : '';
  const branch = document.getElementById('cgcRegBranch') ? document.getElementById('cgcRegBranch').value : '';
  const cgpaVal = document.getElementById('cgcRegCGPA') ? document.getElementById('cgcRegCGPA').value.trim() : '';
  const backlogs = document.getElementById('cgcRegBacklogs') ? document.getElementById('cgcRegBacklogs').value : '0';
  const skills = document.getElementById('cgcRegSkills') ? document.getElementById('cgcRegSkills').value.trim() : '';
  const track = document.getElementById('cgcRegTrack') ? document.getElementById('cgcRegTrack').value : 'Super Dream Product';
  const undertaking = document.getElementById('cgcRegUndertaking') ? document.getElementById('cgcRegUndertaking').checked : false;

  if (!roll || !name || !branch || !cgpaVal) {
    if (typeof showToast === 'function') showToast('Please complete all mandatory registration fields.');
    return;
  }

  const cgpa = parseFloat(cgpaVal);
  if (isNaN(cgpa) || cgpa < 5.0 || cgpa > 10.0) {
    if (typeof showToast === 'function') showToast('Please enter a valid academic CGPA between 5.00 and 10.00.');
    return;
  }

  if (!undertaking) {
    if (typeof showToast === 'function') showToast('Please accept the CGC Code of Conduct undertaking.');
    return;
  }

  // Generate unique registration ID
  const newRegId = 'CGC-REG-2026-' + Math.floor(1000 + Math.random() * 9000);
  const newReg = {
    regId: newRegId,
    name: name,
    roll: roll,
    branch: branch,
    cgpa: cgpa.toFixed(2),
    backlogs: backlogs,
    skills: skills || 'Problem Solving, Core Engineering',
    targetTrack: track,
    status: 'VERIFIED & ENROLLED',
    registeredOn: '29-OCT-2026',
    mockBatch: 'Batch Gamma (Slot M-' + Math.floor(10 + Math.random() * 20) + ')'
  };

  // Prepend to database
  window.placementRegistrationsDB.unshift(newReg);

  // Render Confirmation Slip
  const resContainer = document.getElementById('cgcRegistrationSlipSlot');
  if (resContainer) {
    resContainer.innerHTML = `
      <div class="cgc-slip-card" style="margin-top: 16px; background: #ffffff; border: 2px solid #16a34a; border-radius: 8px; padding: 18px; box-shadow: 0 4px 14px rgba(22, 163, 74, 0.12);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1.5px dashed #cbd5e1; padding-bottom:12px; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div>
            <div style="font-size:11px; font-weight:800; color:#15803d; letter-spacing:0.5px; text-transform:uppercase;">
              HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT
            </div>
            <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:2px;">
              PLACEMENT DRIVE REGISTRATION CONFIRMATION SLIP
            </div>
            <div style="font-size:11px; color:#64748b;">
              Academic Year 2026–2027 • Career Guidance &amp; Placement Cell
            </div>
          </div>
          <div style="text-align:right;">
            <span style="background:#dcfce7; color:#166534; font-weight:800; font-size:12px; padding:4px 10px; border-radius:12px; border:1px solid #86efac; display:inline-block;">
              ✓ ${newReg.status}
            </span>
            <div style="font-family:monospace; font-weight:700; color:#0f172a; font-size:12.5px; margin-top:4px;">
              ${newReg.regId}
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:10px; font-size:12px; margin-bottom:14px;">
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Candidate Name:</span>
            <strong style="color:#0f172a; font-size:13px;">${newReg.name}</strong>
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Hall Ticket / Roll:</span>
            <strong style="font-family:monospace; color:#0f172a; font-size:13px;">${newReg.roll}</strong>
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Department / Branch:</span>
            <strong style="color:#0f172a;">${newReg.branch}</strong>
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Academic CGPA / Backlogs:</span>
            <strong style="color:#16a34a;">${newReg.cgpa} CGPA</strong> (${newReg.backlogs} Backlogs)
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Target Track:</span>
            <strong style="color:#0f172a;">${newReg.targetTrack}</strong>
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Assigned Mock Interview Slot:</span>
            <strong style="color:#2563eb;">${newReg.mockBatch}</strong>
          </div>
        </div>

        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:10px; font-size:11.5px; color:#166534; margin-bottom:12px;">
          ✓ <strong>Enrollment Cleared:</strong> You are formally registered for upcoming campus recruitment drives, pre-placement talks (PPTs), and technical hackathons. Please carry this acknowledgment slip along with your college identity card to the CGC Assessment Center.
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="font-family:monospace; font-size:11px; color:#64748b;">
            SECURITY HASH: HITAM-CGC-${Math.random().toString(36).substring(2, 10).toUpperCase()} • VERIFIED BY CGC DEAN
          </div>
          <div style="display:flex; gap:8px;">
            <button class="drill-action-btn drill-action-primary" style="padding:5px 12px; font-size:11.5px;" onclick="window.print()">
              🖨️ Print Slip
            </button>
            <button class="drill-action-btn drill-action-secondary" style="padding:5px 12px; font-size:11.5px;" onclick="window.switchPlacementTab('registration')">
              + Register Another Student
            </button>
          </div>
        </div>
      </div>
    `;
    resContainer.scrollIntoView({ behavior: 'smooth' });
  }

  if (typeof showToast === 'function') {
    showToast(`Placement registration successful! Slip ID: ${newRegId}`);
  }
};

// Main HTML Generator for Placements Module
function generatePlacementsHTML(activeTab = 'records', activeYear = '2026') {
  window.currentPlacementTab = activeTab;
  window.currentPlacementYear = activeYear;

  // 1. Navigation Tabs Header
  const tabsNavHTML = `
    <div class="exam-portal-tabs-nav" style="margin-bottom: 16px;">
      <button class="exam-tab-btn ${activeTab === 'records' ? 'active' : ''}" onclick="window.switchPlacementTab('records')">
        <span>📊</span> Placement Records (2020–2026)
      </button>
      <button class="exam-tab-btn ${activeTab === 'recruiters' ? 'active' : ''}" onclick="window.switchPlacementTab('recruiters')">
        <span>🏢</span> 20 Recruiting Partners
      </button>
      <button class="exam-tab-btn ${activeTab === 'registration' ? 'active' : ''}" onclick="window.switchPlacementTab('registration')">
        <span>📝</span> Student Placement Registration
      </button>
    </div>
  `;

  // --- TAB 1: PLACEMENT RECORDS (YEAR-WISE 2020 to 2026) ---
  if (activeTab === 'records') {
    // Current year statistics
    const currentYearStats = hitamPlacementBatchStats[activeYear] || {
      totalPlaced: 3120,
      highestCTC: '₹24.00 LPA',
      avgCTC: '₹6.20 LPA',
      placementRate: '92.4%',
      topCompany: 'Goldman Sachs',
      topStudent: 'P. Vignesh Reddy',
      topBranch: 'CSE (AI & ML)',
      topRole: 'Engineering Analyst',
      topCategory: 'Super Dream',
      avatarBg: '#08752f',
      initials: 'VR'
    };

    // Year selection pills (2026 down to 2020, plus All)
    const yearsList = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', 'ALL'];
    const yearPillsHTML = yearsList.map(y => `
      <button class="placement-year-chip ${activeYear === y ? 'active' : ''}" onclick="window.selectPlacementYear('${y}')">
        ${y === 'ALL' ? 'All Batches (2020–2026)' : `Batch of ${y}`}
      </button>
    `).join('');

    // Filter placed students for the selected year
    const yearStudents = hitamPlacedStudentsData.filter(st => activeYear === 'ALL' || st.batch === activeYear);

    // Initial student cards HTML
    const studentCardsHTML = yearStudents.map(st => `
      <div class="placed-student-card">
        <div class="placed-student-top">
          <div class="placed-avatar" style="background:${st.avatarBg};">
            ${st.initials}
          </div>
          <div class="placed-info">
            <div class="placed-student-name">${st.name}</div>
            <div class="placed-student-roll">${st.roll}</div>
            <div class="placed-branch-badge">${st.branch}</div>
          </div>
        </div>
        <div class="placed-details">
          <div class="placed-company-row">
            <div class="placed-comp-icon">🏢</div>
            <div>
              <div class="placed-company-name">${st.company}</div>
              <div class="placed-role-title">${st.role}</div>
            </div>
          </div>
          <div class="placed-ctc-row">
            <span class="placed-ctc-pill ${st.tier === 'Super Dream' ? 'super-dream' : (st.tier === 'Dream Tier' ? 'dream' : 'corporate')}">
              ⭐ ${st.package}
            </span>
            <span class="placed-tier-tag">${st.tier}</span>
          </div>
        </div>
        <div class="placed-footer">
          <span class="placed-batch-tag">🎓 Batch of ${st.batch}</span>
          <span class="placed-verified-tag">✓ CGC Verified</span>
        </div>
      </div>
    `).join('');

    return `
      <div class="drill-detail-view placements-portal-view">
        ${tabsNavHTML}

        <!-- Institutional Placement Hero Stats Banner -->
        <div class="placement-hero-stat-banner">
          <div class="placement-banner-content">
            <div class="placement-banner-title">
              <span>🚀</span> CAREER GUIDANCE &amp; PLACEMENT CELL (CGC)
            </div>
            <div class="placement-banner-sub">
              Verified Year-wise Campus Placement Statistics &amp; Corporate Achievers (Batches 2020 to 2026)
            </div>
            
            <div class="placement-stats-row">
              <div class="p-stat-box highlight-gold">
                <div class="p-stat-num">${currentYearStats.highestCTC}</div>
                <div class="p-stat-lbl">Highest Package</div>
                <div class="p-stat-note">${currentYearStats.topCompany}</div>
              </div>
              <div class="p-stat-box">
                <div class="p-stat-num">${currentYearStats.avgCTC}</div>
                <div class="p-stat-lbl">Average Package</div>
                <div class="p-stat-note">${activeYear === 'ALL' ? 'Across All Batches' : `Batch of ${activeYear}`}</div>
              </div>
              <div class="p-stat-box">
                <div class="p-stat-num">${currentYearStats.totalPlaced}+</div>
                <div class="p-stat-lbl">Students Placed</div>
                <div class="p-stat-note">${activeYear === 'ALL' ? '2020 to 2026 Cumulative' : `Batch of ${activeYear} Total`}</div>
              </div>
              <div class="p-stat-box">
                <div class="p-stat-num">${currentYearStats.placementRate}</div>
                <div class="p-stat-lbl">Placement Record</div>
                <div class="p-stat-note">Autonomous Graduating Batch</div>
              </div>
              <div class="p-stat-box">
                <div class="p-stat-num">85+</div>
                <div class="p-stat-lbl">Recruiting Partners</div>
                <div class="p-stat-note">Tier-1 Corporates &amp; MNCs</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Year Selector Bar (2020 to 2026) -->
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
            <span style="font-weight:700; font-size:12.5px; color:#0f172a; display:flex; align-items:center; gap:6px;">
              <span>📅</span> Select Graduation Batch Year:
            </span>
            <span style="font-size:11.5px; color:#15803d; font-weight:700;">
              Currently viewing: ${activeYear === 'ALL' ? 'All Batches (2020–2026)' : `Batch of ${activeYear} (${currentYearStats.totalPlaced} Students Placed)`}
            </span>
          </div>
          <div class="placement-years-container" style="display:flex; gap:8px; flex-wrap:wrap;">
            ${yearPillsHTML}
          </div>
        </div>

        <!-- Who Got Highest Package Spotlight Card -->
        <div class="placement-spotlight-card" style="background: linear-gradient(135deg, #fefce8 0%, #fef08a 100%); border: 1.5px solid #facc15; border-radius: 8px; padding: 16px 18px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(234, 179, 8, 0.15);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:14px;">
              <div style="width:52px; height:52px; border-radius:50%; background:${currentYearStats.avatarBg}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
                ${currentYearStats.initials}
              </div>
              <div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span style="background:#854d0e; color:#ffffff; font-weight:800; font-size:11px; padding:2px 8px; border-radius:12px; text-transform:uppercase; letter-spacing:0.5px;">
                    🏆 Highest Package Achiever • ${activeYear === 'ALL' ? 'Top Record' : `Batch of ${activeYear}`}
                  </span>
                  <span style="font-size:11.5px; color:#713f12; font-weight:700;">⭐ ${currentYearStats.topCategory}</span>
                </div>
                <div style="font-size:16px; font-weight:800; color:#451a03; margin-top:3px;">
                  ${currentYearStats.topStudent}
                </div>
                <div style="font-size:12px; color:#78350f;">
                  ${currentYearStats.topBranch} • Roll: ${currentYearStats.topRoll || 'Autonomous Student'}
                </div>
              </div>
            </div>

            <div style="text-align:right; background:rgba(255,255,255,0.7); padding:8px 14px; border-radius:8px; border:1px solid #fde047;">
              <div style="font-size:11px; color:#854d0e; font-weight:700; text-transform:uppercase;">Offered by ${currentYearStats.topCompany}</div>
              <div style="font-size:22px; font-weight:900; color:#b45309; line-height:1.2;">${currentYearStats.highestCTC}</div>
              <div style="font-size:11px; color:#78350f; font-weight:600;">Role: ${currentYearStats.topRole}</div>
            </div>
          </div>
        </div>

        <!-- Section Header for Placed Students Roster -->
        <div class="placement-section-head">
          <div>
            <h3 style="margin:0; font-size:15px; color:#0f172a; display:flex; align-items:center; gap:8px;">
              <span>🎓</span> Placed Student Members — ${activeYear === 'ALL' ? 'All Batches (2020–2026)' : `Batch of ${activeYear}`}
            </h3>
            <p style="margin:4px 0 0 0; font-size:12px; color:#64748b;">
              Showing verified placement records with student names, branches, hiring companies, and packages.
            </p>
          </div>
          <span class="placed-count-badge" id="placedStudentsCount">${yearStudents.length} Placed Students Displayed</span>
        </div>

        <!-- Interactive Search & Branch / Tier Filter Toolbar -->
        <div class="placement-filter-bar">
          <div class="placement-search-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" id="placementSearchInput" placeholder="Search by student name, roll number, company, or job role..." 
                   oninput="window.filterPlacementRoster(null, null, this.value)">
          </div>
          
          <div class="placement-filter-groups">
            <div class="filter-group">
              <span class="filter-label">Branch:</span>
              <div class="chip-group">
                <button class="placement-chip placement-chip-branch active" data-branch="ALL" onclick="window.filterPlacementRoster('ALL', null, null)">All Branches</button>
                <button class="placement-chip placement-chip-branch" data-branch="CSM" onclick="window.filterPlacementRoster('CSM', null, null)">CSE (AI &amp; ML)</button>
                <button class="placement-chip placement-chip-branch" data-branch="CSD" onclick="window.filterPlacementRoster('CSD', null, null)">CSE (Data Science)</button>
                <button class="placement-chip placement-chip-branch" data-branch="CSE" onclick="window.filterPlacementRoster('CSE', null, null)">CSE Core</button>
                <button class="placement-chip placement-chip-branch" data-branch="ECE" onclick="window.filterPlacementRoster('ECE', null, null)">ECE</button>
                <button class="placement-chip placement-chip-branch" data-branch="MECH" onclick="window.filterPlacementRoster('MECH', null, null)">MECH</button>
              </div>
            </div>

            <div class="filter-group">
              <span class="filter-label">Package Tier:</span>
              <div class="chip-group">
                <button class="placement-chip placement-chip-tier active" data-tier="ALL" onclick="window.filterPlacementRoster(null, 'ALL', null)">All Tiers</button>
                <button class="placement-chip placement-chip-tier" data-tier="Super Dream" onclick="window.filterPlacementRoster(null, 'Super Dream', null)">⭐ Super Dream (₹10+ LPA)</button>
                <button class="placement-chip placement-chip-tier" data-tier="Dream Tier" onclick="window.filterPlacementRoster(null, 'Dream Tier', null)">Dream (₹6–10 LPA)</button>
                <button class="placement-chip placement-chip-tier" data-tier="Corporate Tier" onclick="window.filterPlacementRoster(null, 'Corporate Tier', null)">Corporate</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Placed Students Grid -->
        <div class="placed-students-grid" id="placedStudentsGrid" style="margin-top:14px;">
          ${studentCardsHTML}
        </div>

        <!-- CGC Contact Desk -->
        <div style="margin-top:24px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:16px;">
          <div style="font-weight:700; font-size:13.5px; color:#166534; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            <span>📞</span> HITAM Career Guidance &amp; Placement Cell Contact Desk
          </div>
          <div style="font-size:12px; color:#334155; line-height:1.6;">
            <strong>Dean &amp; Head - CGC:</strong> Dr. K. Radhakrishnan • <strong>Email:</strong> placements@hitam.org • <strong>Desk:</strong> +91 92487 11155 / 11156<br>
            <strong>CGC Campus Location:</strong> Ground Floor, Ramanujan Academic Block, HITAM Campus, Medchal, Hyderabad – 501401.
          </div>
        </div>
        <div id="modalToastSlot"></div>
      </div>
    `;
  }

  // --- TAB 2: 20 RECRUITING PARTNERS ---
  if (activeTab === 'recruiters') {
    const companyCardsHTML = hitamRecruitersData.map((r, idx) => `
      <div class="recruiter-logo-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; box-shadow:0 1px 3px rgba(0,0,0,0.05);" onmouseenter="this.style.borderColor='${r.accentColor}'; this.style.transform='translateY(-2px)'" onmouseleave="this.style.borderColor='#e2e8f0'; this.style.transform='none'">
        <div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <div style="width:48px; height:48px; border-radius:8px; background:${r.badgeBg}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:13px; letter-spacing:0.5px; border:2px solid ${r.accentColor}; flex-shrink:0;">
              ${r.logoText}
            </div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:11px; font-weight:700; color:#64748b;">#${idx + 1} Recruiter</span>
                <span style="font-size:10px; font-weight:700; background:${r.accentColor}18; color:${r.accentColor}; padding:2px 6px; border-radius:10px; border:1px solid ${r.accentColor}40;">
                  ${r.tier}
                </span>
              </div>
              <div style="font-size:14px; font-weight:800; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${r.name}
              </div>
              <div style="font-size:11px; color:#64748b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${r.category}
              </div>
            </div>
          </div>

          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:#475569; font-weight:600;">Top CTC:</span>
              <span style="font-size:13px; font-weight:800; color:#08752f;">${r.highestCTC}</span>
            </div>
            <div style="font-size:11px; color:#334155; margin-top:2px;">
              <strong>Roles:</strong> ${r.roles}
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f1f5f9; padding-top:8px; font-size:11.5px;">
          <span style="color:#0f172a; font-weight:600;">👥 <strong>${r.hiredCount}</strong> Students Placed</span>
          <button class="drill-action-btn drill-action-primary" style="padding:3px 9px; font-size:11px;" onclick="window.filterByRecruiterCompany('${r.name.split(' ')[0]}')">
            View Placed →
          </button>
        </div>
      </div>
    `).join('');

    return `
      <div class="drill-detail-view placements-portal-view">
        ${tabsNavHTML}

        <div class="placement-section-head" style="margin-top:0;">
          <div>
            <h3 style="margin:0; font-size:16px; color:#0f172a; display:flex; align-items:center; gap:8px;">
              <span>🏢</span> 20 Top Recruiting Partner Companies
            </h3>
            <p style="margin:4px 0 0 0; font-size:12px; color:#64748b;">
              Distinguished multinational corporations, investment banks, and technology leaders visiting HITAM Campus for autonomous hiring.
            </p>
          </div>
          <span style="font-size:12px; background:#dcfce7; color:#166534; padding:4px 12px; border-radius:20px; font-weight:800; border:1px solid #86efac;">
            20 Corporate Partners Active
          </span>
        </div>

        <!-- Campus Assessment & Interview Suite Photo Strip -->
        <div style="margin: 14px 0 18px 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 260px;">
            <div style="font-weight:700; font-size:13px; color:#065f46; display:flex; align-items:center; gap:6px;">
              <span>📸</span> On-Campus Corporate Assessment Centers &amp; Interview Carrels
            </div>
            <div style="font-size:11.5px; color:#475569; margin-top:2px;">
              Equipped with 300+ dedicated computer evaluation terminals, gigabit optical connectivity, and video conferencing suites for international technical panels.
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <img src="assets/hitam7.jpeg" alt="Recruitment Lab" style="width: 90px; height: 56px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;">
            <img src="assets/hitam1.jpg" alt="Auditorium PPT" style="width: 90px; height: 56px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;">
            <img src="assets/hitam3.jpeg" alt="Interview Suite" style="width: 90px; height: 56px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;">
          </div>
        </div>

        <!-- 20 Companies Grid -->
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:12px; margin-bottom:20px;">
          ${companyCardsHTML}
        </div>

        <div style="text-align:center; padding:12px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
          <button class="drill-action-btn drill-action-primary" onclick="window.switchPlacementTab('records')">
            ← View Year-Wise Placed Students Roster (2020–2026)
          </button>
        </div>
      </div>
    `;
  }

  // --- TAB 3: STUDENT PLACEMENT REGISTRATION DESK ---
  if (activeTab === 'registration') {
    const regListHTML = window.placementRegistrationsDB.map(r => `
      <tr style="border-bottom:1px solid #f1f5f9; font-size:12px;">
        <td style="padding:10px; font-family:monospace; font-weight:700; color:#0f172a;">${r.regId}</td>
        <td style="padding:10px; font-weight:700; color:#0f172a;">${r.name}<br><span style="font-size:11px; color:#64748b; font-family:monospace;">${r.roll}</span></td>
        <td style="padding:10px; color:#334155;">${r.branch}</td>
        <td style="padding:10px;"><strong style="color:#16a34a;">${r.cgpa}</strong> (${r.backlogs} Backlogs)</td>
        <td style="padding:10px; font-size:11.5px; color:#2563eb;">${r.targetTrack}</td>
        <td style="padding:10px;"><span style="background:#dcfce7; color:#166534; padding:2px 8px; border-radius:10px; font-weight:700; font-size:11px; border:1px solid #86efac;">${r.status}</span></td>
      </tr>
    `).join('');

    return `
      <div class="drill-detail-view placements-portal-view">
        ${tabsNavHTML}

        <!-- Registration Desk Header -->
        <div class="placement-section-head" style="margin-top:0;">
          <div>
            <h3 style="margin:0; font-size:16px; color:#0f172a; display:flex; align-items:center; gap:8px;">
              <span>📝</span> Student Campus Placement Registration Desk (Batches 2026 &amp; 2027)
            </h3>
            <p style="margin:4px 0 0 0; font-size:12px; color:#64748b;">
              Mandatory institutional registration process for eligible final and pre-final year autonomous engineering students.
            </p>
          </div>
          <span style="font-size:12px; background:#dcfce7; color:#166534; padding:4px 12px; border-radius:20px; font-weight:800; border:1px solid #86efac;">
            Registrations Open 2026–27
          </span>
        </div>

        <!-- 4-Step Registration Workflow Guide -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:14px; margin: 12px 0 16px 0;">
          <div style="font-weight:700; font-size:12.5px; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            <span>ℹ️</span> Campus Placement Drive Workflow:
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:10px; font-size:11.5px; color:#334155;">
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px;">
              <strong style="color:#08752f;">1. Profile Verification:</strong> Minimum 6.00 CGPA with no active backlogs for Super Dream companies.
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px;">
              <strong style="color:#08752f;">2. Skill Mapping:</strong> Coding assessments on HackerRank, LeetCode, and domain core technical tests.
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px;">
              <strong style="color:#08752f;">3. Pre-Placement Talks:</strong> Mandatory attendance in corporate PPTs and technical bootcamps.
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px;">
              <strong style="color:#08752f;">4. Registration Slip:</strong> Obtain authorized CGC acknowledgment slip for campus interview entry.
            </div>
          </div>
        </div>

        <!-- Registration Input Form Card -->
        <div style="background:#ffffff; border:1.5px solid #08752f; border-radius:8px; padding:20px; box-shadow:0 4px 12px rgba(8, 117, 47, 0.08);">
          <div style="font-weight:800; font-size:14px; color:#065f46; margin-bottom:14px; display:flex; align-items:center; gap:6px;">
            <span>📋</span> Enter Student Candidate Credentials
          </div>

          <form id="cgcPlacementRegistrationForm" onsubmit="window.handlePlacementRegistrationSubmit(event)">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-bottom:12px;">
              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Student Hall Ticket / Roll Number *</label>
                <input type="text" id="cgcRegRoll" placeholder="e.g. 23E51A6619" required
                       style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none; text-transform:uppercase;">
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Full Name *</label>
                <input type="text" id="cgcRegName" placeholder="Full candidate name" required
                       style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Department / Branch *</label>
                <select id="cgcRegBranch" required style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
                  <option value="CSE (AI &amp; ML)">CSE (AI &amp; ML)</option>
                  <option value="CSE (Data Science)">CSE (Data Science)</option>
                  <option value="Computer Science &amp; Engg">Computer Science &amp; Engg</option>
                  <option value="Electronics &amp; Communication">Electronics &amp; Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical &amp; Electronics">Electrical &amp; Electronics</option>
                  <option value="IoT &amp; Cyber Security">IoT &amp; Cyber Security</option>
                </select>
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Current Cumulative CGPA *</label>
                <input type="number" step="0.01" min="5.0" max="10.0" id="cgcRegCGPA" placeholder="e.g. 8.65" required
                       style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Active Backlogs Count *</label>
                <select id="cgcRegBacklogs" style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
                  <option value="0">0 Active Backlogs (Eligible for All Tiers)</option>
                  <option value="1">1 Active Backlog</option>
                  <option value="2">2+ Backlogs</option>
                </select>
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Target Career Track</label>
                <select id="cgcRegTrack" style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
                  <option value="Super Dream Product / FinTech">Super Dream Product / FinTech (₹10+ LPA)</option>
                  <option value="Cloud Architecture &amp; SDE">Cloud Architecture &amp; SDE</option>
                  <option value="Enterprise Digital Services">Enterprise Digital Services</option>
                  <option value="Core Engineering &amp; Embedded">Core Engineering &amp; Embedded R&amp;D</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom:12px;">
              <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Primary Technical Skills &amp; Certifications</label>
              <input type="text" id="cgcRegSkills" placeholder="e.g. Java, Python, Data Structures &amp; Algorithms, React, AWS Certified, SQL"
                     style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
            </div>

            <div style="margin-bottom:14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px;">
              <label style="display:flex; align-items:flex-start; gap:8px; font-size:11.5px; color:#334155; cursor:pointer;">
                <input type="checkbox" id="cgcRegUndertaking" required style="margin-top:2px;">
                <span>
                  <strong>CGC Placement Undertaking:</strong> I hereby declare that the academic credentials and CGPA entered are correct. I agree to adhere to the HITAM Career Guidance &amp; Placement Cell placement code of conduct, attend all allocated mock rounds, and honor campus drive appointments.
                </span>
              </label>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button type="submit" class="drill-action-btn drill-action-primary" style="padding:8px 18px; font-size:13px; font-weight:700;">
                ✓ Submit Placement Registration &amp; Generate Slip
              </button>
            </div>
          </form>

          <div id="cgcRegistrationSlipSlot"></div>
        </div>

        <!-- Verified Registrations Table -->
        <div style="margin-top:22px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">
          <div style="padding:12px 14px; background:#f8fafc; border-bottom:1px solid #e2e8f0; font-weight:700; font-size:13px; color:#0f172a; display:flex; justify-content:space-between; align-items:center;">
            <span>📋 Active Enrolled Student Registrations (Current Session)</span>
            <span style="font-size:11.5px; color:#15803d; font-weight:700;">${window.placementRegistrationsDB.length} Candidates Registered</span>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left;">
              <thead>
                <tr style="background:#f1f5f9; font-size:11px; text-transform:uppercase; color:#475569; letter-spacing:0.5px;">
                  <th style="padding:8px 10px;">Reg ID</th>
                  <th style="padding:8px 10px;">Candidate &amp; Roll</th>
                  <th style="padding:8px 10px;">Department</th>
                  <th style="padding:8px 10px;">Academic CGPA</th>
                  <th style="padding:8px 10px;">Track</th>
                  <th style="padding:8px 10px;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${regListHTML}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

// Attach functions and data models to window
window.generatePlacementsHTML = generatePlacementsHTML;
window.hitamRecruitersData = hitamRecruitersData;
window.hitamPlacedStudentsData = hitamPlacedStudentsData;
window.hitamPlacementBatchStats = hitamPlacementBatchStats;
