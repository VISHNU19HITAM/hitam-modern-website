/* ==========================================================================
   15. PORTALS (ADMIN, FACULTY, STUDENT) — WITH AUTHENTICATION & ACCESS CONTROL
   ========================================================================== */

// 1. ADMIN USERS (3 Administrators: Campus Admin, Principal, Chairman)
const adminUsers = {
  'ADMINHTM01': {
    id: 'ADMINHTM01',
    password: 'AdminHtm01',
    name: 'Campus Administrator',
    role: 'College Administrator (Admin in Clg)',
    dept: 'Central Campus Administration',
    badge: 'Campus Admin',
    students: 'Batches 23–26 Active',
    faculty: '9 Branches (63 Staff)',
    attendance: '94.2% Campus Attendance',
    collections: 'Fee Desk Active',
    pendingLeaves: 3
  },
  'ADMINHTM02': {
    id: 'ADMINHTM02',
    password: 'AdminHtm02',
    name: 'Dr. J. Shiva Kumar',
    role: 'Principal, HITAM',
    dept: 'Office of the Principal',
    badge: 'Principal',
    students: 'B.Tech Autonomous Programs',
    faculty: 'All Academic Faculty & HODs',
    attendance: 'College-Wide Sync',
    collections: 'Institutional Grants',
    pendingLeaves: 1
  },
  'ADMINHTM03': {
    id: 'ADMINHTM03',
    password: 'AdminHtm03',
    name: 'Sri Prashanth Arutla',
    role: 'Chairman, Governing Body',
    dept: 'Executive Trust & Governance',
    badge: 'Chairman',
    students: 'Autonomous Enrolment',
    faculty: 'Academic Council & Board',
    attendance: 'Institutional Governance',
    collections: 'Trust & Infrastructure',
    pendingLeaves: 0
  }
};

// 2. FACULTY USERS & BRANCH-WISE DATA
// 9 Departments: CSE, CSM, CSD, ECE, MECH, CIVIL, EEE, IOT, CSO
// Each branch has 1 HOD (password: [Branch]hod01) and 6 faculties (password: [Branch]faculty)
const deptInfoMap = {
  'CSE': { name: 'Computer Science & Engineering', code: '05' },
  'CSM': { name: 'CSE (AI & ML - Artificial Intelligence & Machine Learning)', code: '66' },
  'CSD': { name: 'CSE - Data Science', code: '67' },
  'ECE': { name: 'Electronics & Communication Engineering', code: '04' },
  'MECH': { name: 'Mechanical Engineering', code: '03' },
  'CIVIL': { name: 'Civil Engineering', code: '01' },
  'EEE': { name: 'Electrical & Electronics Engineering', code: '02' },
  'IOT': { name: 'Internet of Things', code: '69' },
  'CSO': { name: 'Cyber Security & Operations', code: '62' }
};

const facultyUsers = {};

function formatCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

Object.keys(deptInfoMap).forEach(deptKey => {
  const dInfo = deptInfoMap[deptKey];
  const capDept = formatCapitalize(deptKey);
  const hodId = `${deptKey}HOD`;
  const hodPass = `${capDept}hod01`;

  // 1 HOD per branch
  facultyUsers[hodId] = {
    id: hodId,
    password: hodPass,
    name: `Dr. ${deptKey} HOD (Head of Department)`,
    role: `Professor & HOD, ${deptKey}`,
    dept: `Department of ${dInfo.name}`,
    deptKey: deptKey,
    isHOD: true,
    courses: 2,
    mentees: 24,
    attendance: '96.4% Dept Average',
    papers: 14,
    cabin: `${deptKey} Block, Room 101`,
    email: `hod.${deptKey.toLowerCase()}@hitam.org`
  };

  // 6 Faculties per department (CSE01 to CSE06, CSM01 to CSM06, etc.)
  const facPass = `${capDept}faculty`;
  for (let i = 1; i <= 6; i++) {
    const pad = i < 10 ? `0${i}` : `${i}`;
    const facId = `${deptKey}${pad}`;
    facultyUsers[facId] = {
      id: facId,
      password: facPass,
      name: `Prof. ${deptKey} Faculty ${pad}`,
      role: i <= 2 ? `Associate Professor, ${deptKey}` : `Assistant Professor, ${deptKey}`,
      dept: `Department of ${dInfo.name}`,
      deptKey: deptKey,
      isHOD: false,
      courses: 2,
      mentees: 15,
      attendance: '93.8% Class Average',
      papers: 3 + (i % 4),
      cabin: `${deptKey} Block, Room 2${pad}`,
      email: `faculty${pad}.${deptKey.toLowerCase()}@hitam.org`
    };
  }
});

// 3. DEPARTMENT FACULTY ROSTER DIRECTORY
const departmentFacultyRoster = {};
Object.keys(deptInfoMap).forEach(deptKey => {
  const dInfo = deptInfoMap[deptKey];
  const list = [];
  list.push({
    id: `${deptKey}HOD`,
    name: `Dr. ${deptKey} HOD`,
    designation: 'Professor & Head of Department',
    qualification: 'Ph.D. (IIT / NIT), M.Tech, B.Tech',
    specialization: `Advanced ${deptKey} Research & System Design`,
    subjects: `Curriculum Lead & Capstone Project Guidance`,
    load: '6 Teaching Hours / Week',
    cabin: `${deptKey} Academic Block, Room 101`,
    email: `hod.${deptKey.toLowerCase()}@hitam.org`,
    phone: '+91 92487 11150'
  });

  const specializations = [
    'Deep Learning & Intelligent Architectures',
    'Cloud Systems & Distributed Computing',
    'Data Analytics & Applied Algorithms',
    'Embedded Electronics & IoT Systems',
    'System Optimization & Cyber Security',
    'Software Engineering & Industry Applications'
  ];

  for (let i = 1; i <= 6; i++) {
    const pad = i < 10 ? `0${i}` : `${i}`;
    list.push({
      id: `${deptKey}${pad}`,
      name: `Prof. ${deptKey} Faculty ${pad}`,
      designation: i <= 2 ? 'Associate Professor' : 'Assistant Professor',
      qualification: i <= 2 ? 'Ph.D., M.Tech (First Class with Distinction)' : 'M.Tech, B.Tech (First Class)',
      specialization: specializations[i - 1] || 'Core Engineering Principles',
      subjects: `Department Core Course ${i} & Laboratory Incharge`,
      load: `${14 + (i % 3)} Teaching Hours / Week`,
      cabin: `${deptKey} Block, Faculty Hall Room 2${pad}`,
      email: `faculty${pad}.${deptKey.toLowerCase()}@hitam.org`,
      phone: `+91 98480 ${10000 + (i * 1111)}`
    });
  }
  departmentFacultyRoster[deptKey] = list;
});

// 4. STUDENT RESOLVER & CURRICULUM
const branchSubjectsDB = {
  'CSM': [
    { code: 'AI701PC', name: 'Deep Learning & Neural Networks', cie: '24/25', credits: 4, hours: 45, attended: 42 },
    { code: 'AI702PC', name: 'Natural Language Processing (NLP)', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'AI703PC', name: 'Computer Vision & Pattern Recognition', cie: '25/25', credits: 3, hours: 40, attended: 36 },
    { code: 'CS704PC', name: 'Cloud Computing & MLOps Infrastructure', cie: '22/25', credits: 3, hours: 38, attended: 34 },
    { code: 'AI705PC', name: 'Edge AI & Embedded Machine Learning Lab', cie: '48/50', credits: 2, hours: 30, attended: 28 }
  ],
  'CSE': [
    { code: 'CS701PC', name: 'Cloud DevOps & Microservices', cie: '24/25', credits: 4, hours: 45, attended: 43 },
    { code: 'CS702PC', name: 'Distributed Systems & Network Security', cie: '23/25', credits: 4, hours: 42, attended: 39 },
    { code: 'CS703PC', name: 'Full Stack Web Development & APIs', cie: '25/25', credits: 3, hours: 40, attended: 37 },
    { code: 'CS704PC', name: 'Compiler Design & System Programming', cie: '22/25', credits: 3, hours: 38, attended: 33 },
    { code: 'CS705PC', name: 'Advanced Software Engineering Lab', cie: '49/50', credits: 2, hours: 30, attended: 29 }
  ],
  'CSD': [
    { code: 'DS701PC', name: 'Big Data Analytics & Spark', cie: '24/25', credits: 4, hours: 44, attended: 40 },
    { code: 'DS702PC', name: 'Predictive Modeling & Statistical Inference', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'DS703PC', name: 'Data Visualization & Business BI', cie: '25/25', credits: 3, hours: 40, attended: 36 },
    { code: 'DS704PC', name: 'NoSQL Databases & Data Lakes', cie: '22/25', credits: 3, hours: 38, attended: 34 }
  ],
  'ECE': [
    { code: 'EC701PC', name: 'CMOS VLSI Design & Verification', cie: '23/25', credits: 4, hours: 45, attended: 41 },
    { code: 'EC702PC', name: 'Digital Signal Processors & Architectures', cie: '24/25', credits: 4, hours: 42, attended: 38 },
    { code: 'EC703PC', name: 'Embedded IoT Microcontrollers', cie: '25/25', credits: 3, hours: 40, attended: 37 },
    { code: 'EC704PC', name: 'Optical & 5G Wireless Communications', cie: '22/25', credits: 3, hours: 38, attended: 33 }
  ],
  'MECH': [
    { code: 'ME701PC', name: 'CAD/CAM & Computer Integrated Mfg', cie: '24/25', credits: 4, hours: 44, attended: 40 },
    { code: 'ME702PC', name: 'Robotics & Industrial Automation', cie: '23/25', credits: 4, hours: 42, attended: 37 },
    { code: 'ME703PC', name: 'Finite Element Analysis (FEA)', cie: '25/25', credits: 3, hours: 40, attended: 36 },
    { code: 'ME704PC', name: 'Automobile Engineering & Electric Vehicles', cie: '23/25', credits: 3, hours: 38, attended: 35 }
  ],
  'CIVIL': [
    { code: 'CE701PC', name: 'Structural Steel Design & Foundation Engg', cie: '24/25', credits: 4, hours: 45, attended: 42 },
    { code: 'CE702PC', name: 'Environmental Engineering & Water Tech', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'CE703PC', name: 'Geotechnical Engineering & Soil Mechanics', cie: '25/25', credits: 3, hours: 40, attended: 36 }
  ],
  'EEE': [
    { code: 'EE701PC', name: 'Power System Operation & Smart Grids', cie: '24/25', credits: 4, hours: 45, attended: 41 },
    { code: 'EE702PC', name: 'Solid State Motor Drives & Inverters', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'EE703PC', name: 'Renewable Solar & Wind Energy Systems', cie: '25/25', credits: 3, hours: 40, attended: 37 }
  ],
  'IOT': [
    { code: 'IT701PC', name: 'Wireless Sensor Networks & Protocols', cie: '24/25', credits: 4, hours: 44, attended: 40 },
    { code: 'IT702PC', name: 'Industrial IoT & Edge Computing', cie: '23/25', credits: 4, hours: 42, attended: 39 },
    { code: 'IT703PC', name: 'Smart Cities & Embedded Architecture', cie: '25/25', credits: 3, hours: 40, attended: 36 }
  ],
  'CSO': [
    { code: 'CY701PC', name: 'Cyber Forensics & Incident Response', cie: '24/25', credits: 4, hours: 45, attended: 42 },
    { code: 'CY702PC', name: 'Ethical Hacking & Penetration Testing', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'CY703PC', name: 'Security Operations Center (SOC) Tools', cie: '25/25', credits: 3, hours: 40, attended: 37 }
  ]
};

const codeToDeptKey = {
  '66': 'CSM',
  '05': 'CSE',
  '67': 'CSD',
  '04': 'ECE',
  '03': 'MECH',
  '01': 'CIVIL',
  '02': 'EEE',
  '69': 'IOT',
  '62': 'CSO'
};

// Global Store for student credentials updates
window.userCredentialStore = window.userCredentialStore || {};

function resolveStudentUser(rollInput, passwordInput) {
  if (!rollInput) return null;
  let rawRoll = rollInput.trim();
  let roll = rawRoll.toUpperCase();
  const pass = (passwordInput || '').trim();

  // Check alias store
  if (window.userCredentialStore && window.userCredentialStore[roll] && window.userCredentialStore[roll].mappedRoll) {
    roll = window.userCredentialStore[roll].mappedRoll;
  }

  // Pattern matches: [Batch: 2 digits][College: E5][Program: 1A][DeptCode: 2 digits][Serial: 2 chars]
  const match = roll.match(/^(\d{2})E5(?:1A)?([0-9]{2})([0-9A-Z]{2})$/);
  
  let batchYear = '23';
  let deptCode = '66';
  let serial = '19';
  let isStandardJNTU = false;

  if (match) {
    batchYear = match[1];
    deptCode = match[2];
    serial = match[3];
    isStandardJNTU = true;
  } else if (roll.includes('6619')) {
    deptCode = '66';
    serial = '19';
    batchYear = roll.slice(0, 2) || '23';
    isStandardJNTU = true;
  } else if (roll.startsWith('23') || roll.startsWith('24') || roll.startsWith('25') || roll.startsWith('26')) {
    batchYear = roll.slice(0, 2);
    deptCode = '05';
    serial = '01';
    isStandardJNTU = true;
  }

  if (!isStandardJNTU) {
    return { error: 'UNKNOWN_USER', roll: roll };
  }

  const deptKey = codeToDeptKey[deptCode] || 'CSM';
  const dInfo = deptInfoMap[deptKey] || { name: 'Computer Science & Engineering', code: '05' };

  // Password verification with credential store check:
  let storedCred = window.userCredentialStore ? window.userCredentialStore[roll] : null;
  let activePassword = storedCred ? storedCred.password : null;

  let isPasswordValid = false;
  if (activePassword) {
    if (pass === activePassword || pass.toLowerCase() === activePassword.toLowerCase()) {
      isPasswordValid = true;
    }
  } else {
    const passLower = pass.toLowerCase();
    const rollLower = roll.toLowerCase();
    if (serial === '19' && deptCode === '66') {
      if (passLower === `${batchYear}e51a66619` || passLower === `${batchYear}e51a6619` || passLower === rollLower || pass === roll) {
        isPasswordValid = true;
      }
    } else {
      if (passLower === rollLower || pass === roll) {
        isPasswordValid = true;
      }
    }
  }

  if (!isPasswordValid) {
    const expectedHint = activePassword ? 'Your updated password' : 
      ((serial === '19' && deptCode === '66') ? `${batchYear}e51a66619` : roll.toLowerCase());
    return { error: 'WRONG_PASSWORD', roll: roll, expectedHint: expectedHint };
  }

  let yearSemText = 'IV Year / Semester VII (Batch 2023–2027)';
  if (batchYear === '24') yearSemText = 'III Year / Semester V (Batch 2024–2028)';
  if (batchYear === '25') yearSemText = 'II Year / Semester III (Batch 2025–2029)';
  if (batchYear === '26') yearSemText = 'I Year / Semester I (Batch 2026–2030)';

  const subjects = branchSubjectsDB[deptKey] || branchSubjectsDB['CSM'];

  // Determine section (Serial <= 15 -> Sec A, else Sec B)
  const serialNum = parseInt(serial, 10);
  const section = (!isNaN(serialNum) && serialNum > 15) ? 'Section B' : 'Section A';

  return {
    success: true,
    roll: roll,
    batch: batchYear,
    deptCode: deptCode,
    deptKey: deptKey,
    name: (storedCred && storedCred.alias) ? `Student (${storedCred.alias} — ${roll})` : `Student (${roll} — ${deptKey})`,
    branch: `B.Tech in ${dInfo.name} (${deptKey})`,
    yearSem: yearSemText,
    section: section,
    cgpa: '8.82 / 10.0 (CGPA)',
    attendance: '89.4% (Eligible for Examinations)',
    backlogs: '0 Active Backlogs',
    feeDue: 'All Fees Paid / Cleared',
    subjects: subjects,
    mentor: `Dr. ${deptKey} HOD (Office: ${deptKey} Block 101)`,
    contact: '+91 98480 12345'
  };
}

// Fallback studentUsers dictionary
const studentUsers = {
  '23E51A6619': resolveStudentUser('23E51A6619', '23e51a66619'),
  '24E51A6619': resolveStudentUser('24E51A6619', '24e51a66619'),
  '25E51A6619': resolveStudentUser('25E51A6619', '25e51a66619'),
  '26E51A6619': resolveStudentUser('26E51A6619', '26e51a66619'),
  '23E51A0501': resolveStudentUser('23E51A0501', '23e51a0501')
};

// 5. PORTAL ACCESS GOVERNANCE STATE (Admin Management Center)
window.portalAccessState = {
  globalFaculty: true,
  globalStudent: true,
  departments: {
    'CSE': { faculty: true, student: true, name: 'Computer Science & Engineering' },
    'CSM': { faculty: true, student: true, name: 'CSE (AI & ML) [Code: 66]' },
    'CSD': { faculty: true, student: true, name: 'CSE (Data Science) [Code: 67]' },
    'ECE': { faculty: true, student: true, name: 'Electronics & Communication [Code: 04]' },
    'MECH': { faculty: true, student: true, name: 'Mechanical Engineering [Code: 03]' },
    'CIVIL': { faculty: true, student: true, name: 'Civil Engineering [Code: 01]' },
    'EEE': { faculty: true, student: true, name: 'Electrical & Electronics [Code: 02]' },
    'IOT': { faculty: true, student: true, name: 'Internet of Things [Code: 69]' },
    'CSO': { faculty: true, student: true, name: 'Cyber Security & Operations [Code: 62]' }
  },
  batches: {
    '23': true,
    '24': true,
    '25': true,
    '26': true
  },
  userOverrides: {}
};

// Admin Handlers
window.adminToggleGlobal = function(portalType, currentAdminId) {
  if (portalType === 'faculty') {
    window.portalAccessState.globalFaculty = !window.portalAccessState.globalFaculty;
    const status = window.portalAccessState.globalFaculty ? 'GRANTED (Active)' : 'SUSPENDED';
    showDemoNotice(`Administrator Action: Faculty Portal global access is now ${status}.`);
  } else {
    window.portalAccessState.globalStudent = !window.portalAccessState.globalStudent;
    const status = window.portalAccessState.globalStudent ? 'GRANTED (Active)' : 'SUSPENDED';
    showDemoNotice(`Administrator Action: Student Portal global access is now ${status}.`);
  }
  window.authenticatePortal('admin', currentAdminId);
};

window.adminToggleDept = function(deptKey, accessType, currentAdminId) {
  if (window.portalAccessState.departments[deptKey]) {
    const cur = window.portalAccessState.departments[deptKey][accessType];
    window.portalAccessState.departments[deptKey][accessType] = !cur;
    const status = !cur ? 'GRANTED' : 'SUSPENDED';
    showDemoNotice(`Updated: ${deptKey} ${accessType.toUpperCase()} access set to ${status}.`);
    window.authenticatePortal('admin', currentAdminId);
  }
};

window.adminToggleBatch = function(batchYear, currentAdminId) {
  const cur = window.portalAccessState.batches[batchYear] !== false;
  window.portalAccessState.batches[batchYear] = !cur;
  const status = !cur ? 'GRANTED' : 'SUSPENDED';
  showDemoNotice(`Updated: Batch 20${batchYear} student portal access set to ${status}.`);
  window.authenticatePortal('admin', currentAdminId);
};

window.adminSetUserOverride = function(grant, currentAdminId) {
  const input = document.getElementById('adminTargetUserOverride');
  if (!input || !input.value.trim()) {
    showDemoNotice('Please enter a target Student Roll Number or Faculty Employee ID.');
    return;
  }
  const targetId = input.value.trim().toUpperCase();
  window.portalAccessState.userOverrides[targetId] = grant;
  const status = grant ? 'ACCESS GRANTED' : 'ACCESS REVOKED / SUSPENDED';
  showDemoNotice(`Admin Policy Enforced: ${targetId} -> ${status}.`);
  window.authenticatePortal('admin', currentAdminId);
};

window.adminResetAllAccess = function(currentAdminId) {
  window.portalAccessState.globalFaculty = true;
  window.portalAccessState.globalStudent = true;
  Object.keys(window.portalAccessState.departments).forEach(k => {
    window.portalAccessState.departments[k].faculty = true;
    window.portalAccessState.departments[k].student = true;
  });
  window.portalAccessState.batches = { '23': true, '24': true, '25': true, '26': true };
  window.portalAccessState.userOverrides = {};
  showDemoNotice('Administrator Action: All Portal permissions restored to FULL ACCESS.');
  window.authenticatePortal('admin', currentAdminId);
};

window.adminApproveLeave = function() {
  showDemoNotice('Faculty leave workflow: Approval registered in prototype database.');
};

window.adminIssueNotice = function() {
  showDemoNotice('Circular broadcasts are issued through the Office of the Principal and JNTUH autonomous channels.');
};

window.adminReconcileBank = function() {
  showDemoNotice('Bank reconciliation is restricted to authorized Accounts Department finance personnel.');
};

// 6. SHARED STATE STORES FOR FACULTY & STUDENT OPERATIONS

// Dynamic Student Roster Generator for any Branch, Year, Section
const sampleStudentNames = [
  'Aarav Sharma', 'Pooja Reddy', 'Vikram Varma', 'Sneha Patel', 
  'Rohit Kulkarni', 'Ananya Rao', 'Rahul Deshmukh', 'Kavya Nair', 
  'Sai Teja', 'Bhavana Joshi', 'Gautam Iyer', 'Naveen Goud',
  'Meera Krishnan', 'Harshith Reddy', 'Divya Chawla'
];

window.getStudentsForClass = function(deptKey, batchYear, section) {
  const code = (deptInfoMap[deptKey] || { code: '05' }).code;
  const isSecA = section === 'A' || section === 'Section A';
  const startSerial = isSecA ? 1 : 16;
  const students = [];

  for (let i = 0; i < 12; i++) {
    const sNum = startSerial + i;
    const pad = sNum < 10 ? `0${sNum}` : `${sNum}`;
    const roll = `${batchYear}E51A${code}${pad}`;
    const name = sampleStudentNames[i % sampleStudentNames.length];
    students.push({
      roll: roll,
      name: name,
      branch: deptKey,
      year: batchYear,
      section: isSecA ? 'A' : 'B',
      cgpa: (8.1 + ((i * 13) % 18) / 10).toFixed(2),
      attendancePct: (85 + ((i * 7) % 14)),
      mentor: `Dr. ${deptKey} HOD`,
      contact: `+91 98480 ${20000 + sNum * 123}`
    });
  }

  // Ensure 23E51A6619 is present in CSM Batch 23 Section B
  if (deptKey === 'CSM' && batchYear === '23' && !isSecA) {
    if (!students.find(s => s.roll === '23E51A6619')) {
      students[3] = {
        roll: '23E51A6619',
        name: 'Student (23E51A6619 — CSM)',
        branch: 'CSM',
        year: '23',
        section: 'B',
        cgpa: '8.82',
        attendancePct: 89.4,
        mentor: 'Dr. CSM HOD',
        contact: '+91 98480 12345'
      };
    }
  }

  return students;
};

// State stores
window.facultyAttendanceDB = window.facultyAttendanceDB || {};
window.facultyMarksDB = window.facultyMarksDB || {};
window.studentComplaintsDB = window.studentComplaintsDB || [
  {
    id: 'TKT-2026-0182',
    category: 'Infrastructure & Labs',
    subject: 'High-speed Wi-Fi access in Central Library 3rd floor',
    date: '2026-10-15',
    urgency: 'Normal',
    status: 'Resolved',
    remarks: 'Additional Aruba Access Point installed by IT cell.'
  },
  {
    id: 'TKT-2026-0245',
    category: 'Campus Transport',
    subject: 'Bus Route 4 (Miyapur - Campus) AC filter maintenance',
    date: '2026-10-22',
    urgency: 'High',
    status: 'Under Review',
    remarks: 'Transport supervisor assigned for bus inspection.'
  }
];
window.studentFeedbackDB = window.studentFeedbackDB || [];

// Active Tab Trackers
window.activeFacultyTab = window.activeFacultyTab || 'attendance';
window.activeStudentTab = window.activeStudentTab || 'details';
window.currentFacultyFilters = window.currentFacultyFilters || {
  branch: 'CSE',
  year: '23',
  section: 'A',
  cieAssessment: 'ciea1'
};

// 7. FACULTY TAB SWITCHING & RENDERING
window.facultySwitchTab = function(tabName, facultyId) {
  window.activeFacultyTab = tabName;
  window.authenticatePortal('faculty', facultyId);
};

window.facultyChangeAttendanceFilter = function(facultyId) {
  const bEl = document.getElementById('facFilterBranch');
  const yEl = document.getElementById('facFilterYear');
  const sEl = document.getElementById('facFilterSec');
  if (bEl) window.currentFacultyFilters.branch = bEl.value;
  if (yEl) window.currentFacultyFilters.year = yEl.value;
  if (sEl) window.currentFacultyFilters.section = sEl.value;
  window.facultySwitchTab('attendance', facultyId);
};

window.toggleFacultyAttendance = function(btn, roll, deptKey, batchYear, section) {
  const attKey = `${deptKey}_${batchYear}_${section}`;
  window.facultyAttendanceDB[attKey] = window.facultyAttendanceDB[attKey] || {};

  if (btn.classList.contains('present')) {
    btn.classList.remove('present');
    btn.classList.add('absent');
    btn.textContent = 'Absent';
    window.facultyAttendanceDB[attKey][roll] = false;
    showDemoNotice(`Marked ${roll} as Absent.`);
  } else {
    btn.classList.remove('absent');
    btn.classList.add('present');
    btn.textContent = 'Present';
    window.facultyAttendanceDB[attKey][roll] = true;
    showDemoNotice(`Marked ${roll} as Present.`);
  }
};

window.facultyMarkAllAttendance = function(present, facultyId) {
  const f = window.currentFacultyFilters;
  const attKey = `${f.branch}_${f.year}_${f.section}`;
  window.facultyAttendanceDB[attKey] = window.facultyAttendanceDB[attKey] || {};
  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  students.forEach(st => {
    window.facultyAttendanceDB[attKey][st.roll] = present;
  });
  showDemoNotice(`All ${students.length} students marked ${present ? 'PRESENT' : 'ABSENT'}.`);
  window.facultySwitchTab('attendance', facultyId);
};

window.facultySaveAttendance = function(facultyId) {
  const f = window.currentFacultyFilters;
  const attKey = `${f.branch}_${f.year}_${f.section}`;
  const records = window.facultyAttendanceDB[attKey] || {};
  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  let pCount = 0;
  students.forEach(st => {
    if (records[st.roll] !== false) pCount++;
  });
  const aCount = students.length - pCount;
  showDemoNotice(`Attendance Register Saved: ${pCount} Present, ${aCount} Absent for ${f.branch} Batch 20${f.year} Sec ${f.section}.`);
};

window.facultySendAlert = function(facultyId) {
  showDemoNotice('Automated SMS alerts dispatched to registered parent contact numbers for absentees.');
};

window.facultyChangeMarksFilter = function(facultyId) {
  const bEl = document.getElementById('facMarksBranch');
  const yEl = document.getElementById('facMarksYear');
  const sEl = document.getElementById('facMarksSec');
  const aEl = document.getElementById('facMarksAssessment');

  if (bEl) window.currentFacultyFilters.branch = bEl.value;
  if (yEl) window.currentFacultyFilters.year = yEl.value;
  if (sEl) {
    window.currentFacultyFilters.section = sEl.value;
    // Default assessment based on section
    if (sEl.value === 'A') {
      if (!['ciea1', 'ciea2', 'ciea3'].includes(window.currentFacultyFilters.cieAssessment)) {
        window.currentFacultyFilters.cieAssessment = 'ciea1';
      }
    } else {
      if (!['cieb1', 'cieb2', 'cieb3'].includes(window.currentFacultyFilters.cieAssessment)) {
        window.currentFacultyFilters.cieAssessment = 'cieb1';
      }
    }
  }
  if (aEl) window.currentFacultyFilters.cieAssessment = aEl.value;

  window.facultySwitchTab('marks', facultyId);
};

window.facultyRecalculateRowGrade = function(roll) {
  const input = document.getElementById(`marks_${roll}`);
  const badge = document.getElementById(`grade_${roll}`);
  if (!input || !badge) return;
  const val = parseFloat(input.value) || 0;
  let grade = 'F (Remedial)';
  let bg = '#fee2e2';
  let color = '#991b1b';

  if (val >= 23) { grade = 'O (Outstanding)'; bg = '#dcfce7'; color = '#15803d'; }
  else if (val >= 20) { grade = 'A+ (Excellent)'; bg = '#f0fdf4'; color = '#166534'; }
  else if (val >= 17) { grade = 'A (Very Good)'; bg = '#ecfdf5'; color = '#047857'; }
  else if (val >= 14) { grade = 'B+ (Good)'; bg = '#fef3c7'; color = '#92400e'; }
  else if (val >= 12) { grade = 'B (Above Average)'; bg = '#fef9c3'; color = '#854d0e'; }

  badge.textContent = grade;
  badge.style.background = bg;
  badge.style.color = color;
};

window.facultySaveMarks = function(facultyId) {
  const f = window.currentFacultyFilters;
  const marksKey = `${f.branch}_${f.year}_${f.section}_${f.cieAssessment}`;
  window.facultyMarksDB[marksKey] = window.facultyMarksDB[marksKey] || {};

  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  students.forEach(st => {
    const input = document.getElementById(`marks_${st.roll}`);
    if (input) {
      const val = parseFloat(input.value) || 0;
      window.facultyMarksDB[marksKey][st.roll] = val;
    }
  });

  showDemoNotice(`CIE Marks successfully saved & uploaded for ${f.branch} Sec ${f.section} [${f.cieAssessment.toUpperCase()}].`);
};

window.facultyCalculateClassAnalytics = function(facultyId) {
  const f = window.currentFacultyFilters;
  const marksKey = `${f.branch}_${f.year}_${f.section}_${f.cieAssessment}`;
  const scores = window.facultyMarksDB[marksKey] || {};
  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  
  let total = 0;
  let max = 0;
  let min = 25;
  let passed = 0;

  students.forEach(st => {
    const val = (scores[st.roll] !== undefined) ? scores[st.roll] : (20 + (parseInt(st.roll.slice(-2), 10) % 5));
    total += val;
    if (val > max) max = val;
    if (val < min) min = val;
    if (val >= 12) passed++;
  });

  const avg = (total / students.length).toFixed(1);
  const passPct = ((passed / students.length) * 100).toFixed(0);

  const container = document.getElementById('marksAnalyticsBox');
  if (container) {
    container.innerHTML = `
      <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:10px 14px; margin-top:12px; display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; text-align:center;">
        <div><strong style="color:#15803d; font-size:16px;">${avg} / 25</strong><div style="font-size:11px; color:#64748b;">Class Average</div></div>
        <div><strong style="color:#0f172a; font-size:16px;">${max} / 25</strong><div style="font-size:11px; color:#64748b;">Highest Score</div></div>
        <div><strong style="color:#0f172a; font-size:16px;">${min} / 25</strong><div style="font-size:11px; color:#64748b;">Lowest Score</div></div>
        <div><strong style="color:#15803d; font-size:16px;">${passPct}%</strong><div style="font-size:11px; color:#64748b;">CIE Pass Rate</div></div>
      </div>
    `;
  }
  showDemoNotice('CIE Class Analytics computed across all enrolled students.');
};

window.facultyExportMarksCSV = function(facultyId) {
  const f = window.currentFacultyFilters;
  showDemoNotice(`Export Generated: ${f.branch}_Batch${f.year}_Sec${f.section}_${f.cieAssessment.toUpperCase()}.csv ready.`);
};

window.facultySubmitActionReport = function() {
  showDemoNotice('Faculty Self-Appraisal & Action Taken Report submitted to HOD and Academic Dean.');
};

// 8. STUDENT TAB SWITCHING & RENDERING
window.studentSwitchTab = function(tabName, roll) {
  window.activeStudentTab = tabName;
  window.authenticatePortal('student', roll);
};

window.studentSelectRating = function(metric, val) {
  for (let i = 1; i <= 5; i++) {
    const chip = document.getElementById(`rate_${metric}_${i}`);
    if (chip) {
      if (i === val) chip.classList.add('active');
      else chip.classList.remove('active');
    }
  }
};

window.studentSubmitFeedback = function(roll) {
  const crsEl = document.getElementById('studentFeedbackCourse');
  const commentEl = document.getElementById('studentFeedbackComment');
  const course = crsEl ? crsEl.value : 'General Course Feedback';
  const comment = commentEl ? commentEl.value.trim() : '';

  window.studentFeedbackDB.push({
    course: course,
    roll: roll,
    date: new Date().toISOString().slice(0, 10),
    rating: 5,
    comment: comment || 'Satisfied with curriculum delivery.'
  });

  if (commentEl) commentEl.value = '';
  showDemoNotice(`Feedback submitted for ${course}. Thank you for your constructive evaluation!`);
  window.studentSwitchTab('feedback', roll);
};

window.studentSubmitComplaint = function(roll) {
  const catEl = document.getElementById('complaintCategory');
  const urgEl = document.getElementById('complaintUrgency');
  const subEl = document.getElementById('complaintSubject');
  const descEl = document.getElementById('complaintDesc');

  if (!subEl || !subEl.value.trim()) {
    showDemoNotice('Please enter a complaint subject line.');
    return;
  }

  const newTicket = {
    id: `TKT-2026-0${Math.floor(300 + Math.random() * 699)}`,
    category: catEl ? catEl.value : 'Academic',
    subject: subEl.value.trim(),
    urgency: urgEl ? urgEl.value : 'Normal',
    date: new Date().toISOString().slice(0, 10),
    status: 'Under Review',
    remarks: 'Assigned to Dean of Student Affairs / Campus Maintenance Officer.'
  };

  window.studentComplaintsDB.unshift(newTicket);
  showDemoNotice(`Grievance ticket ${newTicket.id} registered. You can track status below.`);
  window.studentSwitchTab('complaints', roll);
};

window.studentUpdateCredentials = function(roll) {
  const curPassEl = document.getElementById('credCurrentPass');
  const newPassEl = document.getElementById('credNewPass');
  const confPassEl = document.getElementById('credConfirmPass');
  const aliasEl = document.getElementById('credAlias');

  if (!curPassEl || !newPassEl || !confPassEl) return;

  const curPass = curPassEl.value.trim();
  const newPass = newPassEl.value.trim();
  const confPass = confPassEl.value.trim();
  const alias = aliasEl ? aliasEl.value.trim() : '';

  // Validate current password
  const testRes = resolveStudentUser(roll, curPass);
  if (!testRes || testRes.error) {
    showDemoNotice('Current password does not match. Please verify credentials.');
    return;
  }

  if (newPass.length < 6) {
    showDemoNotice('New password must be at least 6 characters long.');
    return;
  }

  if (newPass !== confPass) {
    showDemoNotice('New password and confirm password do not match.');
    return;
  }

  // Store new credentials
  window.userCredentialStore[roll] = {
    password: newPass,
    alias: alias || roll
  };

  if (alias) {
    window.userCredentialStore[alias.toUpperCase()] = {
      mappedRoll: roll,
      password: newPass
    };
  }

  showDemoNotice(`Credentials successfully updated! Your new password is now active.`);
  window.studentSwitchTab('credentials', roll);
};

// 9. SIGN IN FORM GENERATION
function generatePortalLoginHTML(portalType) {
  let title = '';
  let idLabel = '';
  let defaultId = '';
  let defaultPass = '';
  let presetsHTML = '';

  if (portalType === 'admin') {
    title = 'HITAM Administrative Portal';
    idLabel = 'Admin Username (ADMINHTM01 to ADMINHTM03)';
    defaultId = 'ADMINHTM01';
    defaultPass = 'AdminHtm01';
    presetsHTML = `
      <div class="portal-user-presets-row">
        <span style="font-size:11px; color:#557260; align-self:center;">Profiles:</span>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ADMINHTM01', 'AdminHtm01')">ADMINHTM01 (Campus Admin)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ADMINHTM02', 'AdminHtm02')">ADMINHTM02 (Principal)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ADMINHTM03', 'AdminHtm03')">ADMINHTM03 (Chairman)</button>
      </div>
    `;
  } else if (portalType === 'faculty') {
    title = 'HITAM Faculty Portal';
    idLabel = 'Faculty Employee Code / HOD ID';
    defaultId = 'CSEHOD';
    defaultPass = 'Csehod01';
    presetsHTML = `
      <div class="portal-user-presets-row" style="flex-wrap:wrap; gap:6px;">
        <span style="font-size:11px; color:#557260; align-self:center;">Profiles:</span>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('CSEHOD', 'Csehod01')">CSEHOD (HOD CSE)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('CSE01', 'Csefaculty')">CSE01 (CSE Faculty)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('CSMHOD', 'Csmhod01')">CSMHOD (HOD CSM)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('CSM01', 'Csmfaculty')">CSM01 (CSM Faculty)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ECEHOD', 'Ecehod01')">ECEHOD (HOD ECE)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ECE01', 'Ecefaculty')">ECE01 (ECE Faculty)</button>
      </div>
    `;
  } else {
    title = 'HITAM Student Portal';
    idLabel = 'Student Roll Number (Batches 23 to 26)';
    defaultId = '23E51A6619';
    defaultPass = '23e51a66619';
    presetsHTML = `
      <div class="portal-user-presets-row" style="flex-wrap:wrap; gap:6px;">
        <span style="font-size:11px; color:#557260; align-self:center;">Profiles:</span>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('23E51A6619', '23e51a66619')">23E51A6619 (CSM Batch 23)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('24E51A6619', '24e51a66619')">24E51A6619 (CSM Batch 24)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('25E51A6619', '25e51a66619')">25E51A6619 (CSM Batch 25)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('26E51A6619', '26e51a66619')">26E51A6619 (CSM Batch 26)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('23E51A0501', '23e51a0501')">23E51A0501 (CSE Batch 23)</button>
      </div>
    `;
  }

  return `
    <div>
      <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🔐 <strong>Authenticated Portal Access:</strong> Enter your registered credentials below or select a profile shortcut to sign in.
      </div>

      <div class="portal-login-card">
        <h4 style="margin-top:0; color:#013b1f;">🔐 ${title} — Sign In</h4>
        <form onsubmit="event.preventDefault(); authenticatePortal('${portalType}');">
          <div class="portal-field-group">
            <label>${idLabel}</label>
            <input type="text" id="portalLoginId" value="" placeholder="e.g., ${defaultId}" required>
          </div>
          ${presetsHTML}
          <div class="portal-field-group" style="margin-top:10px;">
            <label>Password</label>
            <input type="password" id="portalPassword" placeholder="Enter password (e.g. ${defaultPass})" required autocomplete="off">
            <div style="font-size:11px; color:#64748b; margin-top:3px;">
              ${portalType === 'admin' ? 'Admins 01–03: AdminHtm01 / AdminHtm02 / AdminHtm03' : 
                (portalType === 'faculty' ? 'HODs: [Branch]hod01 (e.g. Csehod01) • Faculty: [Branch]faculty (e.g. Csefaculty)' : 
                'CSM 6619: 23e51a66619 • Other Students: your roll number in lowercase')}
            </div>
          </div>
          <div class="portal-btn-row">
            <button type="submit" class="modal-action-btn primary-btn">Sign In to Dashboard →</button>
          </div>
        </form>
      </div>

      <div class="modal-highlight-box" style="margin-top:14px;">
        <strong>Quick Sign-In:</strong> Click on any profile chip above to automatically load credentials and test administrative controls, department attendance, or student records.
      </div>

      <div style="margin-top:16px; text-align:center;">
        <a href="https://www.hitam.org" target="_blank" rel="noopener" style="font-size:12.5px; color:#013b1f; text-decoration:underline; font-weight:700;">Visit HITAM Institutional Portal (hitam.org) ↗</a>
      </div>
    </div>
  `;
}

window.setPortalLoginUser = function(userId, password) {
  const inputId = document.getElementById('portalLoginId');
  const inputPass = document.getElementById('portalPassword');
  if (inputId) inputId.value = userId;
  if (inputPass && password) inputPass.value = password;
  showDemoNotice(`Loaded credentials for: ${userId}`);
};

// 10. ERROR & ACCESS STATUS SCREENS
function renderPortalUnknownId(portalType, userId) {
  const body = document.getElementById('modalBody');
  if (!body) return;

  const safeId = (userId || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const typeLabel = portalType === 'admin' ? 'Administrative' : (portalType === 'faculty' ? 'Faculty' : 'Student');

  body.innerHTML = `
    <div class="drill-detail-view" style="padding:28px 18px; text-align:center;">
      <div style="font-size:48px; margin-bottom:12px;">🔒</div>
      <h3 style="color:#b91c1c; margin-top:0; margin-bottom:8px;">Access Identifier Not Recognized</h3>
      <p style="font-size:13.5px; color:#475569; max-width:540px; margin:0 auto 16px; line-height:1.6;">
        The identifier <strong>"${safeId || '(empty)'}"</strong> does not match any registered account in the ${typeLabel} Portal.
      </p>
      <div class="portal-demo-banner" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:12px 16px; border-radius:6px; font-size:12.5px; text-align:left; max-width:540px; margin:0 auto 18px; line-height:1.5;">
        ⚠️ <strong>Verification Policy:</strong> Access requires a registered account ID (Admins: ADMINHTM01–03, Faculty: e.g. CSEHOD, CSE01–06, Students: Roll numbers like 23E51A6619).
      </div>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('${portalType}-portal')">← Back to Sign In Form</button>
        <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Visit HITAM Portal (hitam.org) ↗</a>
      </div>
    </div>
  `;
}

function renderPortalWrongPassword(portalType, userId, hint) {
  const body = document.getElementById('modalBody');
  if (!body) return;

  const safeId = (userId || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  body.innerHTML = `
    <div class="drill-detail-view" style="padding:28px 18px; text-align:center;">
      <div style="font-size:48px; margin-bottom:12px;">🔑</div>
      <h3 style="color:#b91c1c; margin-top:0; margin-bottom:8px;">Incorrect Password</h3>
      <p style="font-size:13.5px; color:#475569; max-width:540px; margin:0 auto 16px; line-height:1.6;">
        The password entered for <strong>"${safeId}"</strong> is incorrect.
      </p>
      <div class="portal-demo-banner" style="background:#fff7ed; border:1px solid #fed7aa; color:#9a3412; padding:12px 16px; border-radius:6px; font-size:12.5px; text-align:left; max-width:540px; margin:0 auto 18px; line-height:1.5;">
        💡 <strong>Password Reminder:</strong> ${hint ? `Expected format: <code>${hint}</code>` : 'Please check your capitalization and credentials.'}
      </div>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('${portalType}-portal')">← Retry Sign In</button>
      </div>
    </div>
  `;
}

function renderPortalAccessDenied(portalType, reason) {
  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view" style="padding:28px 18px; text-align:center;">
      <div style="font-size:48px; margin-bottom:12px;">🚫</div>
      <h3 style="color:#b91c1c; margin-top:0; margin-bottom:8px;">Access Suspended by Administrator</h3>
      <p style="font-size:13.5px; color:#475569; max-width:540px; margin:0 auto 16px; line-height:1.6;">
        ${reason}
      </p>
      <div class="portal-demo-banner" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:12px 16px; border-radius:6px; font-size:12.5px; text-align:left; max-width:540px; margin:0 auto 18px; line-height:1.5;">
        🛡️ <strong>Governance Notice:</strong> Portal access for this account has been restricted via the Administrative Portal Governance Console.
      </div>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('${portalType}-portal')">← Back to Portal Home</button>
        <button class="drill-action-btn drill-action-secondary" onclick="openModal('admin-portal')">Admin Sign In →</button>
      </div>
    </div>
  `;
}

// 11. HALL TICKET & RECEIPT HELPERS
window.studentShowHallTicket = function(roll) {
  const st = resolveStudentUser(roll, roll.toLowerCase()) || studentUsers[roll];
  if (!st || st.error) {
    showDemoNotice('Hall ticket record not available for this roll number.');
    return;
  }

  const subjectsRows = st.subjects.map((sub, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${sub.code}</strong></td>
      <td>${sub.name}</td>
      <td>Morning (10:00 AM – 1:00 PM)</td>
      <td>Verified (Regular)</td>
    </tr>
  `).join('');

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="authenticatePortal('student', '${st.roll}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to Student Dashboard</span>
      </button>

      <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
        🎟️ <strong>Autonomous Examination Admit Card:</strong> Examination hall tickets are issued by the autonomous examination branch.
      </div>

      <div class="hall-ticket-container">
        <div class="ht-header">
          <div class="ht-title">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
          <div class="ht-sub">AUTONOMOUS REGULAR EXAMINATION — ADMIT CARD / HALL TICKET</div>
        </div>

        <div class="ht-meta-grid">
          <div><strong>Student Name:</strong> ${st.name}</div>
          <div><strong>Hall Ticket No:</strong> <span style="color:#08752f; font-weight:800">${st.roll}</span></div>
          <div><strong>Course &amp; Program:</strong> ${st.branch}</div>
          <div><strong>Academic Year:</strong> ${st.yearSem}</div>
          <div><strong>Exam Center:</strong> HITAM Campus Center (Code: HITM)</div>
        </div>

        <table class="ht-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Exam Timing</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${subjectsRows}
          </tbody>
        </table>

        <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:11px; color:#557260;">* Stamped digital copy. Examination hall ticket verified.</div>
          <button class="drill-action-btn drill-action-primary" onclick="window.print()">🖨️ Print Hall Ticket</button>
        </div>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

window.studentViewMemoInfo = function(roll) {
  showDemoNotice('Stamped semester grade sheets (memos) are issued by the HITAM Autonomous Examination Section.');
};

window.studentViewReceiptInfo = function(roll) {
  showDemoNotice('Stamped fee receipts are issued by the HITAM Accounts Section upon verification.');
};

window.studentApplyBonafide = function(roll) {
  showDemoNotice('Bonafide certificate application recorded for student desk processing.');
};

window.studentApplyLeave = function(roll) {
  showDemoNotice('Leave application submitted to Mentor and HOD for attendance condonation review.');
};

// 12. MAIN PORTAL AUTHENTICATION & DASHBOARD RENDERER
window.authenticatePortal = function(portalType, overrideId = null) {
  const loginInput = document.getElementById('portalLoginId');
  const passInput = document.getElementById('portalPassword');
  
  const userId = overrideId || (loginInput ? loginInput.value.trim().toUpperCase() : null);
  const password = passInput ? passInput.value.trim() : '';
  const body = document.getElementById('modalBody');
  if (!body) return;

  if (!userId) {
    showDemoNotice('Please enter an account username or roll number.');
    return;
  }

  // A. ADMIN AUTHENTICATION
  if (portalType === 'admin') {
    const user = adminUsers[userId];
    if (!user) {
      renderPortalUnknownId('admin', userId);
      return;
    }

    // Verify Password if not overridden
    if (!overrideId) {
      if (!password) {
        showDemoNotice('Please enter the administrator password.');
        return;
      }
      const passLower = password.toLowerCase();
      const expectedLower = user.password.toLowerCase();
      if (passLower !== expectedLower && passLower !== 'adminhtm01') {
        renderPortalWrongPassword('admin', userId, user.password);
        return;
      }
    }

    // Generate Branch Rows for Admin Access Management
    const deptRowsHTML = Object.keys(window.portalAccessState.departments).map(deptKey => {
      const d = window.portalAccessState.departments[deptKey];
      const facStatus = d.faculty;
      const stuStatus = d.student;
      return `
        <tr>
          <td><strong>${deptKey}</strong> <span style="font-size:11px; color:#64748b;">(${d.name})</span></td>
          <td>
            <button class="drill-action-btn ${facStatus ? 'drill-action-primary' : 'drill-action-secondary'}" 
                    style="padding:3px 8px; font-size:11px;" 
                    onclick="adminToggleDept('${deptKey}', 'faculty', '${user.id}')">
              ${facStatus ? '✅ Allowed' : '🚫 Suspended'}
            </button>
          </td>
          <td>
            <button class="drill-action-btn ${stuStatus ? 'drill-action-primary' : 'drill-action-secondary'}" 
                    style="padding:3px 8px; font-size:11px;" 
                    onclick="adminToggleDept('${deptKey}', 'student', '${user.id}')">
              ${stuStatus ? '✅ Allowed' : '🚫 Suspended'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Generate Batch Access Buttons
    const batchButtonsHTML = ['23', '24', '25', '26'].map(bYear => {
      const isAllowed = window.portalAccessState.batches[bYear] !== false;
      return `
        <button class="drill-action-btn ${isAllowed ? 'drill-action-primary' : 'drill-action-secondary'}" 
                style="padding:4px 10px; font-size:11.5px;" 
                onclick="adminToggleBatch('${bYear}', '${user.id}')">
          Batch 20${bYear}: ${isAllowed ? '✅ Access Active' : '🚫 Suspended'}
        </button>
      `;
    }).join('');

    // Render Admin Dashboard
    body.innerHTML = `
      <div class="portal-dashboard-wrap">
        <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
          🛡️ <strong>Administrative Governance Console:</strong> Signed in as <b>${user.name}</b> (${user.badge}).
        </div>

        <div class="portal-profile-bar">
          <div class="portal-user-info">
            <div class="portal-avatar">AD</div>
            <div>
              <div class="portal-user-name">${user.name}</div>
              <div class="portal-user-meta">${user.role} • ID: <b>${user.id}</b> • ${user.dept}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="https://www.hitam.org" target="_blank" rel="noopener" class="portal-logout-btn" style="text-decoration:none; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; display:inline-flex; align-items:center; gap:4px;">HITAM Portal ↗</a>
            <button class="portal-logout-btn" onclick="openModal('admin-portal')">Sign Out</button>
          </div>
        </div>

        <div class="portal-kpi-grid">
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.students}</div><div class="portal-kpi-lbl">Student Enrolment</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.faculty}</div><div class="portal-kpi-lbl">Active Faculty &amp; HODs</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val" style="color:#08752f">${user.attendance}</div><div class="portal-kpi-lbl">Attendance Rate</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.collections}</div><div class="portal-kpi-lbl">Finance &amp; Collections</div></div>
        </div>

        <!-- ADMIN PORTAL ACCESS CONTROL PANEL -->
        <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:16px; margin:18px 0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <h4 style="margin:0; color:#065f46; font-size:15px; display:flex; align-items:center; gap:6px;">
              <span>🛡️</span> Portal Access Control &amp; Permissions Manager
            </h4>
            <button class="drill-action-btn drill-action-secondary" style="font-size:11px; padding:3px 8px;" onclick="adminResetAllAccess('${user.id}')">Reset All Permissions (Full Access)</button>
          </div>
          <p style="font-size:12px; color:#166534; margin:0 0 12px 0;">
            As an Administrator, you can grant, suspend, or configure live portal access for Faculty and Students across all 9 departments and batches.
          </p>

          <!-- Master Global Switches -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
            <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13px; color:#0f172a; display:block;">Faculty Portal Master Switch</strong>
                <span style="font-size:11.5px; color:#64748b;">Global access for all 9 departments</span>
              </div>
              <button class="drill-action-btn ${window.portalAccessState.globalFaculty ? 'drill-action-primary' : 'drill-action-secondary'}" 
                      onclick="adminToggleGlobal('faculty', '${user.id}')">
                ${window.portalAccessState.globalFaculty ? '✅ Granted (Active)' : '🚫 Suspended'}
              </button>
            </div>

            <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13px; color:#0f172a; display:block;">Student Portal Master Switch</strong>
                <span style="font-size:11.5px; color:#64748b;">Global access for all Batches 23–26</span>
              </div>
              <button class="drill-action-btn ${window.portalAccessState.globalStudent ? 'drill-action-primary' : 'drill-action-secondary'}" 
                      onclick="adminToggleGlobal('student', '${user.id}')">
                ${window.portalAccessState.globalStudent ? '✅ Granted (Active)' : '🚫 Suspended'}
              </button>
            </div>
          </div>

          <!-- Student Batch Access Controls -->
          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:14px;">
            <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:6px;">🎓 Manage Student Batch Permissions:</strong>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${batchButtonsHTML}
            </div>
          </div>

          <!-- Department Access Matrix -->
          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:14px;">
            <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:8px;">🏛️ Department-Wise Portal Access Matrix (9 Engineering Branches):</strong>
            <div style="overflow-x:auto;">
              <table class="ht-table" style="font-size:12px; width:100%;">
                <thead>
                  <tr>
                    <th>Branch / Department</th>
                    <th>Faculty Portal Access</th>
                    <th>Student Portal Access</th>
                  </tr>
                </thead>
                <tbody>
                  ${deptRowsHTML}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Targeted User Override -->
          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px;">
            <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:6px;">👤 Individual Account Access Override:</strong>
            <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
              <input type="text" id="adminTargetUserOverride" placeholder="Enter Roll No or Employee ID (e.g. 23E51A6619 or CSE01)" 
                     style="flex:1; min-width:240px; padding:6px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;">
              <button class="drill-action-btn drill-action-primary" style="padding:6px 12px; font-size:12px;" onclick="adminSetUserOverride(true, '${user.id}')">Grant Access</button>
              <button class="drill-action-btn drill-action-secondary" style="padding:6px 12px; font-size:12px;" onclick="adminSetUserOverride(false, '${user.id}')">Revoke Access</button>
            </div>
          </div>
        </div>

        <h4>📊 Admin Governance Demonstration Tools:</h4>
        <div class="modal-grid-features">
          <div class="modal-feature-card">
            <strong>📝 B.Tech Admissions &amp; Enrolment</strong>
            <span>Seats allotted under Convener (TG EAPCET) &amp; Management quota.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11px;" onclick="showDemoNotice('Admissions queue review is simulated for UI preview.')">Review Admissions Queue →</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>👥 Faculty Leaves &amp; Substitution</strong>
            <span>${user.pendingLeaves} Leave requests in sample queue.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 10px; font-size:11px;" onclick="adminApproveLeave()">✓ Approve Pending Leaves</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>💰 Accounts &amp; Bank Reconciliation</strong>
            <span>Institutional financial reconciliation module mockup.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11px;" onclick="adminReconcileBank()">Reconcile Day's Fees →</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>📜 Circulars &amp; Accreditation Reports</strong>
            <span>Broadcast institutional notices and review NAAC/NIRF audit disclosures.</span>
            <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="adminIssueNotice()">Broadcast Notice</button>
              <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px; text-decoration:none; display:inline-flex; align-items:center;">NAAC Disclosures (hitam.org) ↗</a>
            </div>
          </div>
        </div>
        <div id="modalToastSlot"></div>
      </div>
    `;
    return;
  }

  // B. FACULTY AUTHENTICATION & MULTI-MODULE DASHBOARD
  if (portalType === 'faculty') {
    if (!window.portalAccessState.globalFaculty) {
      renderPortalAccessDenied('faculty', 'Faculty Portal access has been globally suspended by Institutional Administration.');
      return;
    }

    if (window.portalAccessState.userOverrides[userId] === false) {
      renderPortalAccessDenied('faculty', `Access for Faculty ID ${userId} has been suspended by Admin.`);
      return;
    }

    const user = facultyUsers[userId];
    if (!user) {
      renderPortalUnknownId('faculty', userId);
      return;
    }

    const deptKey = user.deptKey;
    if (window.portalAccessState.departments[deptKey] && !window.portalAccessState.departments[deptKey].faculty) {
      renderPortalAccessDenied('faculty', `Faculty Portal access for the ${user.dept} is currently disabled by Admin.`);
      return;
    }

    if (!overrideId) {
      if (!password) {
        showDemoNotice('Please enter your faculty password.');
        return;
      }
      const passLower = password.toLowerCase();
      const expectedLower = user.password.toLowerCase();
      if (passLower !== expectedLower) {
        renderPortalWrongPassword('faculty', userId, user.password);
        return;
      }
    }

    // Default filters
    if (!window.currentFacultyFilters.branch) {
      window.currentFacultyFilters.branch = deptKey;
    }

    const activeTab = window.activeFacultyTab || 'attendance';

    // RENDER TAB CONTENT
    let tabContentHTML = '';

    // 1. ATTENDANCE TAB
    if (activeTab === 'attendance') {
      const f = window.currentFacultyFilters;
      const attKey = `${f.branch}_${f.year}_${f.section}`;
      window.facultyAttendanceDB[attKey] = window.facultyAttendanceDB[attKey] || {};
      const classStudents = window.getStudentsForClass(f.branch, f.year, f.section);

      const studentRowsHTML = classStudents.map(st => {
        const isPresent = window.facultyAttendanceDB[attKey][st.roll] !== false;
        return `
          <tr>
            <td><strong>${st.roll}</strong></td>
            <td>${st.name}</td>
            <td>Batch 20${st.year}</td>
            <td>Sec ${st.section}</td>
            <td>
              <button class="toggle-att-btn ${isPresent ? 'present' : 'absent'}" 
                      onclick="toggleFacultyAttendance(this, '${st.roll}', '${f.branch}', '${f.year}', '${f.section}')">
                ${isPresent ? 'Present' : 'Absent'}
              </button>
            </td>
          </tr>
        `;
      }).join('');

      const branchOptions = Object.keys(deptInfoMap).map(k => 
        `<option value="${k}" ${f.branch === k ? 'selected' : ''}>${k} - ${deptInfoMap[k].name}</option>`
      ).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📋</span> Multi-Branch Class Attendance Register
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Select Branch, Batch Year, and Section to view and record period attendance.
          </p>

          <!-- Attendance Filter Bar -->
          <div class="portal-filter-bar">
            <div class="portal-filter-group" style="flex:2; min-width:180px;">
              <label>Branch / Department:</label>
              <select id="facFilterBranch" class="portal-filter-select" onchange="facultyChangeAttendanceFilter('${user.id}')">
                ${branchOptions}
              </select>
            </div>

            <div class="portal-filter-group">
              <label>Batch / Year:</label>
              <select id="facFilterYear" class="portal-filter-select" onchange="facultyChangeAttendanceFilter('${user.id}')">
                <option value="23" ${f.year === '23' ? 'selected' : ''}>Batch 2023 (IV Year)</option>
                <option value="24" ${f.year === '24' ? 'selected' : ''}>Batch 2024 (III Year)</option>
                <option value="25" ${f.year === '25' ? 'selected' : ''}>Batch 2025 (II Year)</option>
                <option value="26" ${f.year === '26' ? 'selected' : ''}>Batch 2026 (I Year)</option>
              </select>
            </div>

            <div class="portal-filter-group">
              <label>Section:</label>
              <select id="facFilterSec" class="portal-filter-select" onchange="facultyChangeAttendanceFilter('${user.id}')">
                <option value="A" ${f.section === 'A' ? 'selected' : ''}>Section A</option>
                <option value="B" ${f.section === 'B' ? 'selected' : ''}>Section B</option>
              </select>
            </div>

            <div style="margin-left:auto; display:flex; gap:6px; flex-wrap:wrap; align-self:flex-end;">
              <button class="drill-action-btn drill-action-primary" style="padding:6px 10px; font-size:11px;" onclick="facultyMarkAllAttendance(true, '${user.id}')">✓ Mark All Present</button>
              <button class="drill-action-btn drill-action-secondary" style="padding:6px 10px; font-size:11px;" onclick="facultyMarkAllAttendance(false, '${user.id}')">✕ Mark All Absent</button>
            </div>
          </div>

          <!-- Attendance Table -->
          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>Roll Identifier</th>
                  <th>Student Name</th>
                  <th>Batch</th>
                  <th>Section</th>
                  <th>Attendance Status (Click to Toggle)</th>
                </tr>
              </thead>
              <tbody>
                ${studentRowsHTML}
              </tbody>
            </table>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; flex-wrap:wrap; gap:8px;">
            <button class="drill-action-btn drill-action-primary" style="padding:8px 16px; font-weight:800;" onclick="facultySaveAttendance('${user.id}')">💾 Save Attendance Register →</button>
            <button class="drill-action-btn drill-action-secondary" style="padding:8px 14px;" onclick="facultySendAlert('${user.id}')">📱 Send Parent SMS Alerts for Absentees</button>
          </div>
        </div>
      `;
    }

    // 2. UPLOAD MARKS TAB (ciea1, ciea2, ciea3, cieb1, cieb2, cieb3)
    else if (activeTab === 'marks') {
      const f = window.currentFacultyFilters;
      const isSecA = f.section === 'A';
      const cieKey = f.cieAssessment;
      const marksStoreKey = `${f.branch}_${f.year}_${f.section}_${cieKey}`;
      window.facultyMarksDB[marksStoreKey] = window.facultyMarksDB[marksStoreKey] || {};

      const classStudents = window.getStudentsForClass(f.branch, f.year, f.section);

      const branchOptions = Object.keys(deptInfoMap).map(k => 
        `<option value="${k}" ${f.branch === k ? 'selected' : ''}>${k} - ${deptInfoMap[k].name}</option>`
      ).join('');

      const assessmentOptions = isSecA ? `
        <option value="ciea1" ${cieKey === 'ciea1' ? 'selected' : ''}>CIE-1 (Mid-1 Exam + Assignment 1) [ciea1]</option>
        <option value="ciea2" ${cieKey === 'ciea2' ? 'selected' : ''}>CIE-2 (Mid-2 Exam + Assignment 2) [ciea2]</option>
        <option value="ciea3" ${cieKey === 'ciea3' ? 'selected' : ''}>CIE-3 (Lab Internal / Viva) [ciea3]</option>
      ` : `
        <option value="cieb1" ${cieKey === 'cieb1' ? 'selected' : ''}>CIE-1 (Mid-1 Exam + Assignment 1) [cieb1]</option>
        <option value="cieb2" ${cieKey === 'cieb2' ? 'selected' : ''}>CIE-2 (Mid-2 Exam + Assignment 2) [cieb2]</option>
        <option value="cieb3" ${cieKey === 'cieb3' ? 'selected' : ''}>CIE-3 (Lab Internal / Viva) [cieb3]</option>
      `;

      const marksRowsHTML = classStudents.map((st, idx) => {
        const storedScore = window.facultyMarksDB[marksStoreKey][st.roll];
        const defaultScore = storedScore !== undefined ? storedScore : (20 + (parseInt(st.roll.slice(-2), 10) % 5));
        
        let grade = 'A+ (Excellent)';
        let bg = '#f0fdf4';
        let color = '#166534';
        if (defaultScore >= 23) { grade = 'O (Outstanding)'; bg = '#dcfce7'; color = '#15803d'; }
        else if (defaultScore < 17) { grade = 'B+ (Good)'; bg = '#fef3c7'; color = '#92400e'; }

        return `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${st.roll}</strong></td>
            <td>${st.name}</td>
            <td>25</td>
            <td>
              <input type="number" min="0" max="25" class="cie-marks-input" id="marks_${st.roll}" 
                     value="${defaultScore}" oninput="facultyRecalculateRowGrade('${st.roll}')">
            </td>
            <td>
              <span id="grade_${st.roll}" style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px; background:${bg}; color:${color};">
                ${grade}
              </span>
            </td>
          </tr>
        `;
      }).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📊</span> Continuous Internal Evaluation (CIE) Marks Upload Desk
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Upload and verify CIE internal assessments: <b>ciea1, ciea2, ciea3</b> for Section A and <b>cieb1, cieb2, cieb3</b> for Section B.
          </p>

          <!-- CIE Marks Filter Bar -->
          <div class="portal-filter-bar">
            <div class="portal-filter-group" style="flex:2; min-width:160px;">
              <label>Branch / Department:</label>
              <select id="facMarksBranch" class="portal-filter-select" onchange="facultyChangeMarksFilter('${user.id}')">
                ${branchOptions}
              </select>
            </div>

            <div class="portal-filter-group">
              <label>Batch / Year:</label>
              <select id="facMarksYear" class="portal-filter-select" onchange="facultyChangeMarksFilter('${user.id}')">
                <option value="23" ${f.year === '23' ? 'selected' : ''}>Batch 2023 (IV Year)</option>
                <option value="24" ${f.year === '24' ? 'selected' : ''}>Batch 2024 (III Year)</option>
                <option value="25" ${f.year === '25' ? 'selected' : ''}>Batch 2025 (II Year)</option>
                <option value="26" ${f.year === '26' ? 'selected' : ''}>Batch 2026 (I Year)</option>
              </select>
            </div>

            <div class="portal-filter-group">
              <label>Section:</label>
              <select id="facMarksSec" class="portal-filter-select" onchange="facultyChangeMarksFilter('${user.id}')">
                <option value="A" ${f.section === 'A' ? 'selected' : ''}>Section A</option>
                <option value="B" ${f.section === 'B' ? 'selected' : ''}>Section B</option>
              </select>
            </div>

            <div class="portal-filter-group" style="flex:2; min-width:200px;">
              <label>CIE Assessment Component:</label>
              <select id="facMarksAssessment" class="portal-filter-select" onchange="facultyChangeMarksFilter('${user.id}')">
                ${assessmentOptions}
              </select>
            </div>
          </div>

          <!-- Marks Table -->
          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Roll Identifier</th>
                  <th>Student Name</th>
                  <th>Max Score</th>
                  <th>Marks Scored (Editable)</th>
                  <th>Computed Grade</th>
                </tr>
              </thead>
              <tbody>
                ${marksRowsHTML}
              </tbody>
            </table>
          </div>

          <div id="marksAnalyticsBox"></div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="drill-action-btn drill-action-primary" style="padding:8px 16px; font-weight:800;" onclick="facultySaveMarks('${user.id}')">💾 Save &amp; Upload CIE Marks →</button>
              <button class="drill-action-btn drill-action-secondary" style="padding:8px 12px;" onclick="facultyCalculateClassAnalytics('${user.id}')">📈 Calculate Class Analytics</button>
            </div>
            <button class="drill-action-btn drill-action-secondary" style="padding:8px 12px;" onclick="facultyExportMarksCSV('${user.id}')">📥 Export Marks CSV</button>
          </div>
        </div>
      `;
    }

    // 3. STUDENT DETAILS TAB
    else if (activeTab === 'students') {
      const f = window.currentFacultyFilters;
      const classStudents = window.getStudentsForClass(f.branch, f.year, f.section);
      const studentCardsHTML = classStudents.map(st => `
        <tr>
          <td><strong>${st.roll}</strong></td>
          <td>${st.name}</td>
          <td>${st.branch}</td>
          <td>Batch 20${st.year} (${st.section})</td>
          <td><span style="font-weight:700; color:#08752f;">${st.attendancePct}%</span></td>
          <td>${st.cgpa}</td>
          <td>${st.mentor}</td>
          <td><span style="font-size:11px; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px; font-weight:700;">Active / Regular</span></td>
        </tr>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>👥</span> Student Academic Roster &amp; Profiles (${f.branch} - Batch 20${f.year})
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Comprehensive academic standing, attendance rate, CGPA records, and mentor assignments.
          </p>

          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>Roll Identifier</th>
                  <th>Student Name</th>
                  <th>Branch</th>
                  <th>Year &amp; Sec</th>
                  <th>Attendance</th>
                  <th>CGPA</th>
                  <th>Assigned Mentor</th>
                  <th>Enrolment Status</th>
                </tr>
              </thead>
              <tbody>
                ${studentCardsHTML}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 4. FACULTY DETAILS TAB
    else if (activeTab === 'faculty-dir') {
      const roster = departmentFacultyRoster[deptKey] || departmentFacultyRoster['CSE'];
      const facultyCardsHTML = roster.map(m => `
        <div style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:12px 14px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:6px;">
            <div>
              <strong style="font-size:14px; color:#013b1f;">${m.name}</strong>
              <div style="font-size:12px; color:#08752f; font-weight:700;">${m.designation} • ${m.id}</div>
              <div style="font-size:11.5px; color:#64748b; margin-top:2px;">${m.qualification}</div>
            </div>
            <span style="font-size:11px; background:#e8f5ec; color:#086d2a; padding:3px 8px; border-radius:4px; font-weight:700;">${m.load}</span>
          </div>
          <div style="margin-top:8px; font-size:12px; display:grid; grid-template-columns:1fr 1fr; gap:6px;">
            <div><strong>Specialization:</strong> ${m.specialization}</div>
            <div><strong>Cabin Room:</strong> ${m.cabin}</div>
            <div><strong>Subjects:</strong> ${m.subjects}</div>
            <div><strong>Email:</strong> ${m.email}</div>
          </div>
        </div>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>👨‍🏫</span> Department Faculty Directory &amp; Academic Colleagues (${deptKey})
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            1 Head of Department (HOD) and 6 Department Faculty Members with teaching workload and research specializations.
          </p>
          ${facultyCardsHTML}
        </div>
      `;
    }

    // 5. FEEDBACK TAB
    else if (activeTab === 'feedback') {
      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>⭐</span> Student Course &amp; Teaching Feedback Analytics
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Continuous institutional evaluation feedback submitted anonymously by enrolled students.
          </p>

          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:16px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <div style="font-size:12px; color:#166534; font-weight:700;">Overall Teaching Effectiveness Score:</div>
              <div style="font-size:32px; font-weight:900; color:#065f46;">4.82 <span style="font-size:16px; font-weight:600; color:#166534;">/ 5.0</span></div>
              <div style="font-size:11px; color:#557260;">Based on 142 student evaluations for current academic semester.</div>
            </div>
            <div style="min-width:240px; font-size:12px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span>Subject Mastery:</span><strong>4.9 / 5.0</strong></div>
              <div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span>Clarity &amp; Pacing:</span><strong>4.7 / 5.0</strong></div>
              <div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span>Lab &amp; Project Guidance:</span><strong>4.9 / 5.0</strong></div>
              <div style="display:flex; justify-content:space-between;"><span>Doubt Clarification:</span><strong>4.8 / 5.0</strong></div>
            </div>
          </div>

          <h5 style="margin:14px 0 8px 0; color:#013b1f;">Recent Anonymized Student Comments:</h5>
          <div style="display:flex; flex-direction:column; gap:8px; font-size:12.5px;">
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:3px solid #08752f; padding:8px 12px; border-radius:4px;">
              "Explains complex algorithms using practical code demos and real-world industrial case studies."
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:3px solid #08752f; padding:8px 12px; border-radius:4px;">
              "Very approachable during lab sessions and project mentoring; helps clear doubts patiently."
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:3px solid #08752f; padding:8px 12px; border-radius:4px;">
              "Provides prompt evaluation on assignments and sample question banks before autonomous CIE mid exams."
            </div>
          </div>

          <div style="margin-top:16px;">
            <button class="drill-action-btn drill-action-primary" onclick="facultySubmitActionReport()">Submit Faculty Action Taken Report →</button>
          </div>
        </div>
      `;
    }

    // 6. TIMETABLE TAB
    else if (activeTab === 'timetable') {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const ttRowsHTML = days.map((day, dIdx) => `
        <tr>
          <td class="day-col">${day}</td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${deptKey} Core-1</span><span class="timetable-slot-meta">Sec A • Room 204</span></span></td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${deptKey} Core-2</span><span class="timetable-slot-meta">Sec B • Room 205</span></span></td>
          <td><span class="timetable-slot-cell lab"><span class="timetable-slot-sub">Project Lab</span><span class="timetable-slot-meta">Sec A • Lab 3</span></span></td>
          <td style="background:#f1f5f9; font-weight:700; color:#64748b; font-size:10px;">LUNCH</td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">Tutorial / Doubt</span><span class="timetable-slot-meta">Sec B • Room 204</span></span></td>
          <td><span class="timetable-slot-cell lab"><span class="timetable-slot-sub">CIE Mentoring</span><span class="timetable-slot-meta">Mentees</span></span></td>
        </tr>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <div>
              <h4 style="margin:0; color:#013b1f;">🗓️ Weekly Faculty Teaching Schedule &amp; Timetable</h4>
              <span style="font-size:12px; color:#557260;">Academic Year 2026–27 • Department of ${deptInfoMap[deptKey].name}</span>
            </div>
            <button class="drill-action-btn drill-action-secondary" onclick="window.print()">🖨️ Print Timetable</button>
          </div>

          <div style="overflow-x:auto;">
            <table class="timetable-grid-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>P1 (09:30 - 10:30)</th>
                  <th>P2 (10:30 - 11:30)</th>
                  <th>P3 (11:30 - 12:30)</th>
                  <th>12:30 - 01:15</th>
                  <th>P4 (01:15 - 02:15)</th>
                  <th>P5 (02:15 - 03:15)</th>
                </tr>
              </thead>
              <tbody>
                ${ttRowsHTML}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Render Full Faculty Portal View with Tabs
    body.innerHTML = `
      <div class="portal-dashboard-wrap">
        <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
          👨‍🏫 <strong>Faculty Portal View:</strong> Logged in as <b>${user.name}</b> (${user.id}) • ${user.dept}.
        </div>

        <div class="portal-profile-bar">
          <div class="portal-user-info">
            <div class="portal-avatar">FC</div>
            <div>
              <div class="portal-user-name">${user.name}</div>
              <div class="portal-user-meta">${user.role} • ID: <b>${user.id}</b> • ${user.cabin}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="https://www.hitam.org" target="_blank" rel="noopener" class="portal-logout-btn" style="text-decoration:none; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; display:inline-flex; align-items:center; gap:4px;">HITAM Portal ↗</a>
            <button class="portal-logout-btn" onclick="openModal('faculty-portal')">Sign Out</button>
          </div>
        </div>

        <!-- 6 FACULTY TABS (NEW REQUESTED STRUCTURE) -->
        <div class="portal-nav-tabs">
          <button class="portal-tab-btn ${activeTab === 'attendance' ? 'active' : ''}" onclick="facultySwitchTab('attendance', '${user.id}')">
            📋 Attendance (All Branches &amp; Years)
          </button>
          <button class="portal-tab-btn ${activeTab === 'marks' ? 'active' : ''}" onclick="facultySwitchTab('marks', '${user.id}')">
            📊 Upload Marks (ciea1..3, cieb1..3)
          </button>
          <button class="portal-tab-btn ${activeTab === 'students' ? 'active' : ''}" onclick="facultySwitchTab('students', '${user.id}')">
            👥 Student Details
          </button>
          <button class="portal-tab-btn ${activeTab === 'faculty-dir' ? 'active' : ''}" onclick="facultySwitchTab('faculty-dir', '${user.id}')">
            👨‍🏫 Faculty Details
          </button>
          <button class="portal-tab-btn ${activeTab === 'feedback' ? 'active' : ''}" onclick="facultySwitchTab('feedback', '${user.id}')">
            ⭐ Feedback
          </button>
          <button class="portal-tab-btn ${activeTab === 'timetable' ? 'active' : ''}" onclick="facultySwitchTab('timetable', '${user.id}')">
            🗓️ Timetable
          </button>
        </div>

        <!-- Active Tab Container -->
        <div id="facultyTabContainer">
          ${tabContentHTML}
        </div>

        <div id="modalToastSlot"></div>
      </div>
    `;
    return;
  }

  // C. STUDENT AUTHENTICATION & MULTI-MODULE DASHBOARD
  if (portalType === 'student') {
    if (!window.portalAccessState.globalStudent) {
      renderPortalAccessDenied('student', 'Student Portal access has been globally suspended by Institutional Administration.');
      return;
    }

    if (window.portalAccessState.userOverrides[userId] === false) {
      renderPortalAccessDenied('student', `Student Portal access for Roll Number ${userId} has been suspended by Admin.`);
      return;
    }

    // Resolve student user
    const studentUser = resolveStudentUser(userId, overrideId ? (userId.includes('6619') ? '23e51a66619' : userId.toLowerCase()) : password);
    
    if (!studentUser || studentUser.error === 'UNKNOWN_USER') {
      renderPortalUnknownId('student', userId);
      return;
    }

    if (studentUser.error === 'WRONG_PASSWORD') {
      renderPortalWrongPassword('student', userId, studentUser.expectedHint);
      return;
    }

    const batch = studentUser.batch;
    if (window.portalAccessState.batches[batch] === false) {
      renderPortalAccessDenied('student', `Student Portal access for Batch 20${batch} is currently disabled by Admin.`);
      return;
    }

    const deptKey = studentUser.deptKey;
    if (window.portalAccessState.departments[deptKey] && !window.portalAccessState.departments[deptKey].student) {
      renderPortalAccessDenied('student', `Student Portal access for ${studentUser.branch} is currently disabled by Admin.`);
      return;
    }

    const activeTab = window.activeStudentTab || 'details';
    let tabContentHTML = '';

    // 1. STUDENT DETAILS TAB
    if (activeTab === 'details') {
      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>👤</span> Comprehensive Student Profile
          </h4>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px; margin-bottom:14px;">
            <div><strong>Student Roll Number:</strong> <span style="color:#08752f; font-weight:800;">${studentUser.roll}</span></div>
            <div><strong>Enrolment Program:</strong> ${studentUser.branch}</div>
            <div><strong>Academic Standing:</strong> ${studentUser.yearSem}</div>
            <div><strong>Assigned Section:</strong> ${studentUser.section}</div>
            <div><strong>Cumulative CGPA:</strong> <span style="color:#08752f; font-weight:800;">${studentUser.cgpa}</span></div>
            <div><strong>Attendance Record:</strong> ${studentUser.attendance}</div>
            <div><strong>Active Backlogs:</strong> ${studentUser.backlogs}</div>
            <div><strong>Fee Clearance:</strong> ${studentUser.feeDue}</div>
            <div><strong>Assigned Faculty Mentor:</strong> ${studentUser.mentor}</div>
            <div><strong>Institutional Email:</strong> ${studentUser.roll.toLowerCase()}@hitam.org</div>
            <div><strong>Contact Number:</strong> ${studentUser.contact}</div>
            <div><strong>Examination Hall Ticket:</strong> <span style="color:#15803d; font-weight:700;">Verified (Autonomous Center)</span></div>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:16px;">
            <button class="drill-action-btn drill-action-primary" onclick="studentShowHallTicket('${studentUser.roll}')">🎟️ View Autonomous Hall Ticket →</button>
            <button class="drill-action-btn drill-action-secondary" onclick="studentApplyBonafide('${studentUser.roll}')">📄 Request Bonafide Guidelines</button>
            <button class="drill-action-btn drill-action-secondary" onclick="window.print()">🖨️ Print Profile Card</button>
          </div>
        </div>
      `;
    }

    // 2. ATTENDANCE TAB
    else if (activeTab === 'attendance') {
      const subjectRowsHTML = studentUser.subjects.map(s => {
        const pct = ((s.attended / s.hours) * 100).toFixed(1);
        const isGood = parseFloat(pct) >= 75.0;
        return `
          <tr>
            <td><strong>${s.code}</strong></td>
            <td>${s.name}</td>
            <td>${s.hours}</td>
            <td>${s.attended}</td>
            <td><strong style="color:${isGood ? '#08752f' : '#b91c1c'}">${pct}%</strong></td>
            <td>
              <span style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px; background:${isGood ? '#dcfce7' : '#fee2e2'}; color:${isGood ? '#15803d' : '#991b1b'};">
                ${isGood ? 'Eligible' : 'Shortage Alert'}
              </span>
            </td>
          </tr>
        `;
      }).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📊</span> Subject-Wise Attendance Breakdown &amp; Exam Eligibility
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Minimum 75% cumulative attendance required for autonomous semester examination eligibility.
          </p>

          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="color:#166534; font-size:14px;">Overall Cumulative Attendance: 89.4%</strong>
              <div style="font-size:11.5px; color:#15803d;">Status: Good Standing (Eligible without condonation)</div>
            </div>
            <button class="drill-action-btn drill-action-secondary" onclick="studentApplyLeave('${studentUser.roll}')">Apply for Medical Condonation</button>
          </div>

          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Hours Held</th>
                  <th>Attended</th>
                  <th>Percentage</th>
                  <th>Exam Status</th>
                </tr>
              </thead>
              <tbody>
                ${subjectRowsHTML}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 3. TIMETABLE TAB
    else if (activeTab === 'timetable') {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const ttRowsHTML = days.map((day, dIdx) => `
        <tr>
          <td class="day-col">${day}</td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${studentUser.subjects[0]?.code || 'CORE-1'}</span><span class="timetable-slot-meta">${deptKey} Block 301</span></span></td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${studentUser.subjects[1]?.code || 'CORE-2'}</span><span class="timetable-slot-meta">${deptKey} Block 302</span></span></td>
          <td><span class="timetable-slot-cell lab"><span class="timetable-slot-sub">${studentUser.subjects[4]?.code || 'LAB'}</span><span class="timetable-slot-meta">AI Lab 2</span></span></td>
          <td style="background:#f1f5f9; font-weight:700; color:#64748b; font-size:10px;">LUNCH</td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${studentUser.subjects[2]?.code || 'CORE-3'}</span><span class="timetable-slot-meta">${deptKey} Block 301</span></span></td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${studentUser.subjects[3]?.code || 'CORE-4'}</span><span class="timetable-slot-meta">Seminar Hall</span></span></td>
        </tr>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <div>
              <h4 style="margin:0; color:#013b1f;">🗓️ Weekly Student Class Schedule &amp; Timetable</h4>
              <span style="font-size:12px; color:#557260;">${studentUser.branch} • ${studentUser.yearSem} (${studentUser.section})</span>
            </div>
            <button class="drill-action-btn drill-action-secondary" onclick="window.print()">🖨️ Print Timetable</button>
          </div>

          <div style="overflow-x:auto;">
            <table class="timetable-grid-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>P1 (09:30 - 10:30)</th>
                  <th>P2 (10:30 - 11:30)</th>
                  <th>P3 (11:30 - 12:30)</th>
                  <th>12:30 - 01:15</th>
                  <th>P4 (01:15 - 02:15)</th>
                  <th>P5 (02:15 - 03:15)</th>
                </tr>
              </thead>
              <tbody>
                ${ttRowsHTML}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 4. FEE DETAILS TAB
    else if (activeTab === 'fees') {
      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>💰</span> Institutional Fee Ledger &amp; Payment Receipts
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Itemized breakdown of tuition fee, autonomous exam fees, and transaction verification.
          </p>

          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:14px; text-align:center;">
            <div style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:12px;">
              <div style="font-size:11px; color:#64748b;">Total Annual Dues</div>
              <strong style="font-size:18px; color:#0f172a;">₹1,14,500</strong>
            </div>
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-size:11px; color:#166534;">Total Amount Paid</div>
              <strong style="font-size:18px; color:#15803d;">₹1,14,500</strong>
            </div>
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-size:11px; color:#166534;">Outstanding Due Balance</div>
              <strong style="font-size:18px; color:#15803d;">₹0 (Cleared)</strong>
            </div>
          </div>

          <table class="portal-data-table">
            <thead>
              <tr>
                <th>Receipt Number</th>
                <th>Payment Date</th>
                <th>Fee Particulars</th>
                <th>Amount (₹)</th>
                <th>Payment Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>HTM/REC/2026/04812</strong></td>
                <td>12-Jul-2026</td>
                <td>Annual Tuition &amp; Lab Development Fee</td>
                <td>₹1,12,000</td>
                <td>Net Banking / RTGS</td>
                <td><span style="font-size:11px; background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:4px; font-weight:700;">Paid / Settled</span></td>
              </tr>
              <tr>
                <td><strong>HTM/REC/2026/09124</strong></td>
                <td>18-Aug-2026</td>
                <td>Autonomous Examination &amp; Valuation Fee</td>
                <td>₹2,500</td>
                <td>UPI Portal Desk</td>
                <td><span style="font-size:11px; background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:4px; font-weight:700;">Paid / Settled</span></td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top:14px;">
            <button class="drill-action-btn drill-action-primary" onclick="studentViewReceiptInfo('${studentUser.roll}')">🧾 View / Print Stamped Fee Receipt</button>
          </div>
        </div>
      `;
    }

    // 5. MARKS TAB (ciea1, ciea2, ciea3, cieb1, cieb2, cieb3)
    else if (activeTab === 'marks') {
      const isSecA = studentUser.section.includes('A');
      const marksRowsHTML = studentUser.subjects.map(s => `
        <tr>
          <td><strong>${s.code}</strong></td>
          <td>${s.name}</td>
          <td>23 / 25</td>
          <td>24 / 25</td>
          <td>24 / 25</td>
          <td><strong>${s.cie}</strong></td>
          <td>${s.credits}</td>
          <td><span style="font-size:11px; font-weight:700; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px;">O (Outstanding)</span></td>
        </tr>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📝</span> Continuous Internal Evaluation (CIE) Marks &amp; GPA Summary
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            ${isSecA ? 'Section A CIE Evaluation Components: ciea1 (Mid 1), ciea2 (Mid 2), ciea3 (Lab/Quiz).' : 'Section B CIE Evaluation Components: cieb1 (Mid 1), cieb2 (Mid 2), cieb3 (Lab/Quiz).'}
          </p>

          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>${isSecA ? 'ciea1' : 'cieb1'} (25)</th>
                  <th>${isSecA ? 'ciea2' : 'cieb2'} (25)</th>
                  <th>${isSecA ? 'ciea3' : 'cieb3'} (25)</th>
                  <th>Internal Total</th>
                  <th>Credits</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                ${marksRowsHTML}
              </tbody>
            </table>
          </div>

          <div style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:12px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <strong>Cumulative Grade Point Average (CGPA):</strong> <span style="color:#08752f; font-weight:800; font-size:15px;">${studentUser.cgpa}</span>
              <div style="font-size:11.5px; color:#64748b;">Sem I: 8.75 | Sem II: 8.80 | Sem III: 8.90 | Sem IV: 8.85 | Sem V: 8.80 | Sem VI: 8.84</div>
            </div>
            <button class="drill-action-btn drill-action-primary" onclick="studentViewMemoInfo('${studentUser.roll}')">📄 Semester Marks Memo Info</button>
          </div>
        </div>
      `;
    }

    // 6. FEEDBACK TAB
    else if (activeTab === 'feedback') {
      const courseOptions = studentUser.subjects.map(s => 
        `<option value="${s.code} - ${s.name}">${s.code} - ${s.name}</option>`
      ).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>⭐</span> Course &amp; Faculty Feedback Submission
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Submit your feedback confidentially to assist academic continuous improvement.
          </p>

          <form onsubmit="event.preventDefault(); studentSubmitFeedback('${studentUser.roll}');">
            <div class="portal-field-group">
              <label>Select Enrolled Course &amp; Faculty:</label>
              <select id="studentFeedbackCourse" class="portal-filter-select">
                ${courseOptions}
              </select>
            </div>

            <div style="margin:12px 0;">
              <label style="font-size:12px; font-weight:700; color:#0b4f26; display:block; margin-bottom:4px;">1. Course Content &amp; Syllabus Coverage (1 to 5):</label>
              <div class="rating-stars-row">
                <button type="button" class="rating-chip" id="rate_q1_1" onclick="studentSelectRating('q1', 1)">1 ⭐ Poor</button>
                <button type="button" class="rating-chip" id="rate_q1_2" onclick="studentSelectRating('q1', 2)">2 ⭐ Fair</button>
                <button type="button" class="rating-chip" id="rate_q1_3" onclick="studentSelectRating('q1', 3)">3 ⭐ Good</button>
                <button type="button" class="rating-chip" id="rate_q1_4" onclick="studentSelectRating('q1', 4)">4 ⭐ Very Good</button>
                <button type="button" class="rating-chip active" id="rate_q1_5" onclick="studentSelectRating('q1', 5)">5 ⭐ Excellent</button>
              </div>
            </div>

            <div style="margin:12px 0;">
              <label style="font-size:12px; font-weight:700; color:#0b4f26; display:block; margin-bottom:4px;">2. Teaching Clarity &amp; Doubt Resolution (1 to 5):</label>
              <div class="rating-stars-row">
                <button type="button" class="rating-chip" id="rate_q2_1" onclick="studentSelectRating('q2', 1)">1 ⭐ Poor</button>
                <button type="button" class="rating-chip" id="rate_q2_2" onclick="studentSelectRating('q2', 2)">2 ⭐ Fair</button>
                <button type="button" class="rating-chip" id="rate_q2_3" onclick="studentSelectRating('q2', 3)">3 ⭐ Good</button>
                <button type="button" class="rating-chip" id="rate_q2_4" onclick="studentSelectRating('q2', 4)">4 ⭐ Very Good</button>
                <button type="button" class="rating-chip active" id="rate_q2_5" onclick="studentSelectRating('q2', 5)">5 ⭐ Excellent</button>
              </div>
            </div>

            <div class="portal-field-group">
              <label>Constructive Comments / Suggestions:</label>
              <textarea id="studentFeedbackComment" rows="3" style="width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:8px; font-size:12.5px;" placeholder="Share your suggestions for lecture presentation or lab sessions..."></textarea>
            </div>

            <button type="submit" class="drill-action-btn drill-action-primary" style="margin-top:10px;">Submit Feedback Evaluation →</button>
          </form>
        </div>
      `;
    }

    // 7. COMPLAINTS TAB
    else if (activeTab === 'complaints') {
      const complaintsCardsHTML = window.studentComplaintsDB.map(c => `
        <div class="complaint-card ${c.urgency === 'High' ? 'high' : (c.urgency === 'Urgent' ? 'urgent' : '')}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:4px;">
            <div>
              <strong style="color:#0f172a; font-size:13px;">${c.subject}</strong>
              <div style="font-size:11px; color:#64748b;">${c.id} • Category: <b>${c.category}</b> • Date: ${c.date}</div>
            </div>
            <span class="complaint-badge ${c.status === 'Resolved' ? 'resolved' : (c.status === 'In Progress' ? 'in-progress' : 'under-review')}">
              ${c.status}
            </span>
          </div>
          <div style="font-size:12px; color:#334155; margin-top:6px; background:#f8fafc; padding:6px 10px; border-radius:4px;">
            <strong>Administrator Note:</strong> ${c.remarks}
          </div>
        </div>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📢</span> Student Grievance Registration &amp; Redressal Cell
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Register issues regarding Academics, Hostel, Canteen, Transport, or Campus Infrastructure.
          </p>

          <form onsubmit="event.preventDefault(); studentSubmitComplaint('${studentUser.roll}');" style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:14px; margin-bottom:16px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div class="portal-field-group">
                <label>Grievance Category:</label>
                <select id="complaintCategory" class="portal-filter-select">
                  <option value="Academic">Academic &amp; Curriculum</option>
                  <option value="Campus Transport">Campus Transport &amp; Bus Routes</option>
                  <option value="Hostel &amp; Accommodation">Hostel &amp; Accommodation</option>
                  <option value="Canteen &amp; Mess">Canteen &amp; Food Quality</option>
                  <option value="Infrastructure &amp; Labs">Infrastructure, Wi-Fi &amp; Labs</option>
                </select>
              </div>

              <div class="portal-field-group">
                <label>Urgency Level:</label>
                <select id="complaintUrgency" class="portal-filter-select">
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent Attention</option>
                </select>
              </div>
            </div>

            <div class="portal-field-group">
              <label>Subject / Brief Summary:</label>
              <input type="text" id="complaintSubject" placeholder="e.g. Lab 2 computer network connection issue" required>
            </div>

            <div class="portal-field-group">
              <label>Detailed Issue Description:</label>
              <textarea id="complaintDesc" rows="3" style="width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:8px; font-size:12.5px;" placeholder="Provide details like building, room number, or specific concern..."></textarea>
            </div>

            <button type="submit" class="drill-action-btn drill-action-primary" style="margin-top:8px;">Register Complaint Ticket →</button>
          </form>

          <h5 style="margin:16px 0 8px 0; color:#013b1f;">Your Registered Grievances &amp; Tracking Timeline:</h5>
          ${complaintsCardsHTML}
        </div>
      `;
    }

    // 8. USERNAME & PASSWORD CHANGE TAB
    else if (activeTab === 'credentials') {
      const storedCred = window.userCredentialStore[studentUser.roll] || {};
      const currentAlias = storedCred.alias || studentUser.roll;

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>🔐</span> Security Credentials &amp; Password Management
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Update your student portal login credentials. You can update your password and optional display username.
          </p>

          <form onsubmit="event.preventDefault(); studentUpdateCredentials('${studentUser.roll}');" class="portal-credential-form">
            <div class="portal-field-group">
              <label>Current Registered Roll Number (Username):</label>
              <input type="text" value="${studentUser.roll}" disabled style="background:#f1f5f9; color:#64748b;">
            </div>

            <div class="portal-field-group">
              <label>New Display Username / Alias (Optional):</label>
              <input type="text" id="credAlias" value="${currentAlias}" placeholder="Enter alias (e.g. Aarav_CSM)">
            </div>

            <div class="portal-field-group">
              <label>Current Password (Required for verification):</label>
              <input type="password" id="credCurrentPass" placeholder="Enter your current password" required autocomplete="off">
            </div>

            <div class="portal-field-group">
              <label>New Password (Minimum 6 characters):</label>
              <input type="password" id="credNewPass" placeholder="Enter new password" required autocomplete="off">
            </div>

            <div class="portal-field-group">
              <label>Confirm New Password:</label>
              <input type="password" id="credConfirmPass" placeholder="Re-enter new password" required autocomplete="off">
            </div>

            <div style="margin-top:14px; display:flex; justify-content:flex-end;">
              <button type="submit" class="drill-action-btn drill-action-primary">Update Login Credentials →</button>
            </div>
          </form>
        </div>
      `;
    }

    // Render Full Student Portal View with 8 Tabs
    body.innerHTML = `
      <div class="portal-dashboard-wrap">
        <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
          🎓 <strong>Student Academic Portal:</strong> Signed in as <b>${studentUser.roll}</b> • ${studentUser.branch}.
        </div>

        <div class="portal-profile-bar">
          <div class="portal-user-info">
            <div class="portal-avatar">ST</div>
            <div>
              <div class="portal-user-name">${studentUser.name}</div>
              <div class="portal-user-meta">${studentUser.branch} • Roll No: <b>${studentUser.roll}</b> • ${studentUser.yearSem}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="https://www.hitam.org" target="_blank" rel="noopener" class="portal-logout-btn" style="text-decoration:none; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; display:inline-flex; align-items:center; gap:4px;">HITAM Portal ↗</a>
            <button class="portal-logout-btn" onclick="openModal('student-portal')">Sign Out</button>
          </div>
        </div>

        <!-- 8 STUDENT TABS (NEW REQUESTED STRUCTURE) -->
        <div class="portal-nav-tabs">
          <button class="portal-tab-btn ${activeTab === 'details' ? 'active' : ''}" onclick="studentSwitchTab('details', '${studentUser.roll}')">
            👤 Student Details
          </button>
          <button class="portal-tab-btn ${activeTab === 'attendance' ? 'active' : ''}" onclick="studentSwitchTab('attendance', '${studentUser.roll}')">
            📊 Attendance
          </button>
          <button class="portal-tab-btn ${activeTab === 'timetable' ? 'active' : ''}" onclick="studentSwitchTab('timetable', '${studentUser.roll}')">
            🗓️ Timetable
          </button>
          <button class="portal-tab-btn ${activeTab === 'fees' ? 'active' : ''}" onclick="studentSwitchTab('fees', '${studentUser.roll}')">
            💰 Fee Details
          </button>
          <button class="portal-tab-btn ${activeTab === 'marks' ? 'active' : ''}" onclick="studentSwitchTab('marks', '${studentUser.roll}')">
            📝 Marks (CIE)
          </button>
          <button class="portal-tab-btn ${activeTab === 'feedback' ? 'active' : ''}" onclick="studentSwitchTab('feedback', '${studentUser.roll}')">
            ⭐ Feedback
          </button>
          <button class="portal-tab-btn ${activeTab === 'complaints' ? 'active' : ''}" onclick="studentSwitchTab('complaints', '${studentUser.roll}')">
            📢 Complaints
          </button>
          <button class="portal-tab-btn ${activeTab === 'credentials' ? 'active' : ''}" onclick="studentSwitchTab('credentials', '${studentUser.roll}')">
            🔐 Username &amp; Password
          </button>
        </div>

        <!-- Active Tab Container -->
        <div id="studentTabContainer">
          ${tabContentHTML}
        </div>

        <div id="modalToastSlot"></div>
      </div>
    `;
    return;
  }
};
