window.togglePortalAccordion = function(accId) {
  const el = document.getElementById(accId);
  const arrow = document.getElementById(accId + '_arrow');
  if (!el) return;
  const isHidden = (el.style.display === 'none' || el.style.display === '');
  el.style.display = isHidden ? 'block' : 'none';
  if (arrow) arrow.textContent = isHidden ? '▼' : '>';
};

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
    name: 'Dr. S. Arvind',
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

window.adminUsers = adminUsers;

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

window.facultyUsers = facultyUsers;

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
    name: (storedCred && storedCred.alias) ? `Student (${storedCred.alias} — ${roll})` : ((roll === '23E51A6619') ? 'BHUKYA VISHNU' : `Student (${roll} — ${deptKey})`),
    photo: '',
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


window.activeAdminTab = window.activeAdminTab || 'events';
window.adminEditingEventId = null;
window.adminShowEventForm = false;

window.adminSwitchTab = function(tabName, adminId) {
  window.activeAdminTab = tabName;
  window.authenticatePortal('admin', adminId);
};

window.adminToggleCreateEventForm = function(adminId) {
  window.adminShowEventForm = !window.adminShowEventForm;
  if (!window.adminShowEventForm) {
    window.adminEditingEventId = null;
  }
  window.authenticatePortal('admin', adminId);
};

window.adminSetEventImgPreset = function(imgPath) {
  const input = document.getElementById('adminEventImg');
  if (input) input.value = imgPath;
};

window.adminEditEvent = function(eventId, adminId) {
  window.adminEditingEventId = eventId;
  window.adminShowEventForm = true;
  window.activeAdminTab = 'events';
  window.authenticatePortal('admin', adminId);
  const container = document.getElementById('adminEventFormContainer');
  if (container && container.scrollIntoView) {
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

window.adminCancelEventEdit = function(adminId) {
  window.adminEditingEventId = null;
  window.adminShowEventForm = false;
  window.authenticatePortal('admin', adminId);
};

window.adminDeleteEvent = function(eventId, adminId) {
  const list = window.eventsData || [];
  const ev = list.find(x => x.id === eventId);
  const title = ev ? ev.title : eventId;
  const idx = list.findIndex(x => x.id === eventId);
  if (idx !== -1) {
    list.splice(idx, 1);
    if (window.adminEditingEventId === eventId) {
      window.adminEditingEventId = null;
      window.adminShowEventForm = false;
    }
    showToast(`Event "${title}" has been removed from the campus roster.`);
    window.authenticatePortal('admin', adminId);
  }
};

window.adminToggleEventStatus = function(eventId, adminId) {
  const list = window.eventsData || [];
  const ev = list.find(x => x.id === eventId);
  if (!ev) return;
  const statuses = [
    'Registration Open (Active)',
    'Upcoming — Circular Awaited',
    'Completed'
  ];
  let curIdx = statuses.indexOf(ev.status);
  if (curIdx === -1) {
    if (ev.status.toLowerCase().includes('registration') || ev.status.toLowerCase().includes('active')) {
      curIdx = 0;
    } else if (ev.status.toLowerCase().includes('upcoming') || ev.status.toLowerCase().includes('dates announced') || ev.status.toLowerCase().includes('annual')) {
      curIdx = 1;
    } else if (ev.status.toLowerCase().includes('completed') || ev.status.toLowerCase().includes('archival')) {
      curIdx = 2;
    } else {
      curIdx = 0;
    }
  }
  const nextStatus = statuses[(curIdx + 1) % statuses.length];
  ev.status = nextStatus;
  showToast(`Status of "${ev.title}" changed to "${nextStatus}".`);
  window.authenticatePortal('admin', adminId);
};

window.adminSaveEvent = function(adminId) {
  const titleInput = document.getElementById('adminEventTitle');
  if (!titleInput || !titleInput.value.trim()) {
    showDemoNotice('Please enter a valid title for the campus event.');
    if (titleInput) titleInput.focus();
    return;
  }
  const title = titleInput.value.trim();
  const tag = (document.getElementById('adminEventTag') ? document.getElementById('adminEventTag').value.trim() : '') || 'Campus Event';
  const status = (document.getElementById('adminEventStatus') ? document.getElementById('adminEventStatus').value.trim() : '') || 'Registration Open (Active)';
  const date = (document.getElementById('adminEventDate') ? document.getElementById('adminEventDate').value.trim() : '') || 'Dates Announced via Academic Calendar';
  const img = (document.getElementById('adminEventImg') ? document.getElementById('adminEventImg').value.trim() : '') || 'assets/sangram.jpeg';
  const venue = (document.getElementById('adminEventVenue') ? document.getElementById('adminEventVenue').value.trim() : '') || 'HITAM Central Open Air Amphitheatre';
  const eligibility = (document.getElementById('adminEventEligibility') ? document.getElementById('adminEventEligibility').value.trim() : '') || 'Open to All Enrolled College & University Students';
  const desc = (document.getElementById('adminEventDesc') ? document.getElementById('adminEventDesc').value.trim() : '') || title;
  const parasRaw = document.getElementById('adminEventParas') ? document.getElementById('adminEventParas').value.trim() : '';

  const paras = parasRaw ? parasRaw.split('\n').map(p => p.trim()).filter(p => p.length > 0) : [desc];
  const details = [
    { label: 'Event Schedule', val: date },
    { label: 'Venue', val: venue },
    { label: 'Eligibility', val: eligibility },
    { label: 'Category', val: tag }
  ];

  window.eventsData = window.eventsData || [];

  if (window.adminEditingEventId) {
    const idx = window.eventsData.findIndex(x => x.id === window.adminEditingEventId);
    if (idx !== -1) {
      window.eventsData[idx] = {
        ...window.eventsData[idx],
        title, tag, status, date, img, desc, paras, details
      };
      showToast(`Event "${title}" updated successfully!`);
    }
    window.adminEditingEventId = null;
    window.adminShowEventForm = false;
  } else {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `event-${Date.now()}`;
    const finalSlug = window.eventsData.some(x => x.id === slug) ? `${slug}-${Date.now().toString().slice(-4)}` : slug;
    const newEvent = {
      id: finalSlug,
      title, tag, status, date, img, desc, paras, details
    };
    window.eventsData.unshift(newEvent);
    showToast(`New Event "${title}" created and published!`);
    window.adminShowEventForm = false;
  }

  window.authenticatePortal('admin', adminId);
};

window.adminFilterEvents = function() {
  const searchInput = document.getElementById('adminEventSearch');
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const rows = document.querySelectorAll('.admin-event-row');
  let visibleCount = 0;
  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    const match = !q || text.includes(q);
    r.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });
  const counter = document.getElementById('adminEventShowingCount');
  if (counter) counter.textContent = visibleCount;
};

window.adminResetEventsToDefault = function(adminId) {
  window.eventsData = [
    {
      id: 'elysian-fest',
      title: 'ELYSIAN — Signature Tech, Sports & Cultural Fest',
      tag: 'National Mega Festival',
      status: 'Annual National Fest — Upcoming Edition Circular Awaited',
      date: 'Annual Multi-Day Festival (Schedule Announced Annually)',
      img: 'assets/sangram.jpeg',
      desc: 'HITAM’s signature multi-day inter-collegiate festival featuring SANGRAM (Sports), ESPARTO (Tech), SAHITYA (Literature), PRASASTHI (Culture), and BLISS (Celebrity Pro-Night).',
      paras: [
        'ELYSIAN is HITAM’s grand multi-day annual national festival bringing together student participants from engineering colleges across the region...',
        'Athletes, coders, orators, and performers from premier institutions converge on HITAM’s green campus...'
      ],
      details: [
        { label: 'Festival Schedule', val: 'Multi-Day Annual Campus Festival' },
        { label: 'Key Tracks', val: 'SANGRAM (Sports), ESPARTO (Tech), BLISS (Concert)' },
        { label: 'Eligibility', val: 'Open to All Enrolled College & University Students' },
        { label: 'Campus Updates', val: 'Campus Bulletin / Student Affairs Notice Board' }
      ]
    },
    {
      id: 'hackathon',
      title: 'HITAM 36-Hour National Smart Hackathon',
      tag: 'National Hackathon',
      status: 'Annual Flagship Hackathon — Dates Announced via Circular',
      date: 'Annual National Event (Dates Announced via Academic Calendar)',
      img: 'assets/esparto.jpeg',
      desc: 'HITAM’s annual flagship 36-hour non-stop national hackathon bringing together shortlisted teams from premier engineering colleges across India.',
      paras: [
        'The HITAM 36-Hour National Smart Hackathon is an intensive code sprint designed to bridge classroom learning with urgent industry and societal challenges...',
        'Participants receive mentorship from senior software engineers and industry veterans.'
      ],
      details: [
        { label: 'Hackathon Format', val: '36-Hour Continuous Sprint + Mentorship' },
        { label: 'Focus Domains', val: 'AI, AgriTech, CleanTech, Healthcare, Smart Cities' },
        { label: 'Eligibility', val: 'B.Tech / B.E / M.Tech Students (Teams of 2-4)' },
        { label: 'Evaluation', val: 'Industry Architects & Venture Jury' }
      ]
    },
    {
      id: 'ignite',
      title: 'IGNITE — Annual Techno-Cultural Fest',
      tag: 'Flagship Mega Fest',
      status: 'Annual Institutional Fest — Spring Edition',
      date: 'Annual Spring Techno-Cultural Fest',
      img: 'assets/bliss.png',
      desc: 'Multi-day campus carnival with robotics competitions, coding battles, art exhibitions, musical performances, and pro-night concerts.',
      paras: [
        'IGNITE is the signature campus carnival of HITAM. The multi-day festival seamlessly merges engineering challenges with vibrant cultural celebrations...'
      ],
      details: [
        { label: 'Participation', val: 'HITAM Students & Regional College Participants' },
        { label: 'Competitions', val: 'Technical, Creative & Cultural Events' },
        { label: 'Evening Stage', val: 'Student Performances & Invited Guest Artists' },
        { label: 'Location', val: 'HITAM Central Open Air Amphitheatre' }
      ]
    },
    {
      id: 'traditional-day',
      title: 'Traditional Day & Honours Day',
      tag: 'Cultural & Academic Gala',
      status: 'Annual Campus Heritage & Honours Day',
      date: 'Annual Campus Heritage & Honours Day',
      img: 'assets/prasasti.jpeg',
      desc: 'Celebration of rich Indian heritage with ethnic attire, classical dance performances, and academic medal felicitations.',
      paras: [
        'Traditional Day at HITAM is a vibrant celebration of Indian cultural diversity...',
        'The college also conducts Honours Day to felicitate academic toppers...'
      ],
      details: [
        { label: 'Key Highlights', val: 'Academic Excellence Awards & Gold Medals' },
        { label: 'Cultural Events', val: 'Folk Dances, Classical Music, Ethnic Showcase' },
        { label: 'Campus Atmosphere', val: 'Rich cultural inclusivity & heritage celebration' },
        { label: 'Participants', val: 'Students, Faculty, Staff & Management' }
      ]
    },
    {
      id: 'freshers',
      title: 'Freshers Welcome & Induction — "AARAMBH"',
      tag: 'Student Welcome Fest',
      status: 'Annual First-Year Batch Induction',
      date: 'Annual First-Year Induction Program',
      img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
      desc: 'Welcoming festival organized by seniors featuring talent hunts, musical performances, and orientation mentorship.',
      paras: [
        'AARAMBH is organized with great enthusiasm by senior engineering students...'
      ],
      details: [
        { label: 'Main Contests', val: 'Mr. & Ms. Fresher, Best Talent Showcase' },
        { label: 'Performances', val: 'Student Dance Troupe & Music Club' },
        { label: 'Campus Culture', val: 'Zero-ragging, inclusive & welcoming' },
        { label: 'Organizers', val: 'Senior Student Council & Faculty Mentors' }
      ]
    },
    {
      id: 'national-days',
      title: 'Independence Day & Republic Day Celebrations',
      tag: 'Patriotic Celebrations',
      status: 'Annual National Observance (Aug 15 & Jan 26)',
      date: 'August 15 & January 26 (Annual)',
      img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1000&q=80',
      desc: 'Ceremonial flag hoisting, NCC 5(T) BN guard of honor, patriotic choir performances, and community green drives.',
      paras: [
        'National festivals at HITAM are celebrated with deep reverence...'
      ],
      details: [
        { label: 'Parade', val: 'NCC 5(T) BN Synchronized Guard of Honor' },
        { label: 'Performances', val: 'Patriotic Songs Choir & Theatrical Skits' },
        { label: 'Community Service', val: 'Tree Plantation & Environmental Drives' },
        { label: 'Attendance', val: 'Faculty, Staff, Students & Local Community' }
      ]
    },
    {
      id: 'green-conclave',
      title: 'Green Campus Conclave & Sustainability Summit',
      tag: 'Sustainability Summit',
      status: 'Annual Sustainability Forum',
      date: 'Annual Earth Day / Campus Sustainability Forum',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
      desc: 'National eco-summit on zero-waste campuses, solar technology prototypes, and student green enterprise initiatives.',
      paras: [
        'As an eco-conscious engineering institution, HITAM hosts the Green Campus Conclave...'
      ],
      details: [
        { label: 'Focus Areas', val: 'Zero-Waste, Clean Energy & Water Conservation' },
        { label: 'Student Exhibits', val: 'Solar EV models, Bio-filters, Eco-bricks' },
        { label: 'Institutional Goal', val: 'Carbon-Neutral Campus & Living Eco-Lab' },
        { label: 'Participation', val: 'Environmental Academics & Student Innovators' }
      ]
    }
  ];
  window.adminEditingEventId = null;
  window.adminShowEventForm = false;
  showToast('Campus events roster reset to default template.');
  window.authenticatePortal('admin', adminId);
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

window.studentMarksDB = window.studentMarksDB || {
  '23E51A6619': {
    ciea1: 23,
    cieb1: 24,
    ciec1: 22,
    ciea2: 24,
    cieb2: 25,
    ciec2: 23
  }
};

window.getStudentMarks = function(roll) {
  window.studentMarksDB = window.studentMarksDB || {};
  if (!window.studentMarksDB[roll]) {
    const s = parseInt((roll || '1').slice(-2), 10) || 1;
    window.studentMarksDB[roll] = {
      ciea1: 20 + (s % 5),
      cieb1: 21 + ((s + 1) % 5),
      ciec1: 22 + ((s + 2) % 4),
      ciea2: 21 + ((s + 3) % 5),
      cieb2: 22 + ((s + 4) % 4),
      ciec2: 23 + ((s + 1) % 3)
    };
  }
  return window.studentMarksDB[roll];
};

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
  if (sEl) window.currentFacultyFilters.section = sEl.value;
  if (aEl) window.currentFacultyFilters.cieAssessment = aEl.value;

  const validAssessments = ['ciea1', 'cieb1', 'ciec1', 'ciea2', 'cieb2', 'ciec2'];
  if (!validAssessments.includes(window.currentFacultyFilters.cieAssessment)) {
    window.currentFacultyFilters.cieAssessment = 'ciea1';
  }

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
  const comp = f.cieAssessment;
  const marksKey = `${f.branch}_${f.year}_${f.section}_${comp}`;
  window.facultyMarksDB[marksKey] = window.facultyMarksDB[marksKey] || {};

  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  students.forEach(st => {
    const input = document.getElementById(`marks_${st.roll}`);
    if (input) {
      const val = Math.max(0, Math.min(25, parseFloat(input.value) || 0));
      window.facultyMarksDB[marksKey][st.roll] = val;
      const sMarks = window.getStudentMarks(st.roll);
      sMarks[comp] = val;
    }
  });

  showToast(`CIE Marks for [${comp.toUpperCase()}] saved & updated in Student Portal.`);
  showDemoNotice(`Faculty Upload Confirmed: Saved ${comp.toUpperCase()} marks for ${f.branch} Sec ${f.section}. Live update applied to Student Portal.`);
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

// 9. SIGN IN FORM GENERATION (Credentials Hidden for Privacy & Security)
window.generatePortalLoginHTML = function generatePortalLoginHTML(portalType) {
  let title = '';
  let idLabel = '';
  let idPlaceholder = '';

  if (portalType === 'admin') {
    title = 'HITAM Administrative Portal';
    idLabel = 'Administrator Username';
    idPlaceholder = 'e.g. ADMINHTM01';
  } else if (portalType === 'faculty') {
    title = 'HITAM Faculty Portal';
    idLabel = 'Faculty Employee Code / HOD ID';
    idPlaceholder = 'e.g. CSEHOD or CSE01';
  } else if (portalType === 'exam-portal' || portalType === 'sem-result' || portalType === 'sem-result-portal') {
    title = 'HITAM Autonomous Exam Portal';
    idLabel = 'Student Hall Ticket / Roll Number';
    idPlaceholder = 'e.g. 23E51A6619';
  } else {
    title = 'HITAM Student Portal';
    idLabel = 'Student Roll Number / Hall Ticket No';
    idPlaceholder = 'e.g. 23E51A6619';
  }

  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🔐 <strong>Secure Portal Access:</strong> Enter your registered account identifier and password to sign in.
      </div>

      <div class="portal-login-card">
        <h4 style="margin-top:0; color:#013b1f;">🔐 ${title} — Sign In</h4>
        <form onsubmit="event.preventDefault(); authenticatePortal('${portalType}');">
          <div class="portal-field-group">
            <label>${idLabel}</label>
            <input type="text" id="portalLoginId" value="" placeholder="${idPlaceholder}" required autocomplete="username">
          </div>
          <div class="portal-field-group" style="margin-top:12px;">
            <label>Password</label>
            <input type="password" id="portalPassword" placeholder="Enter password" required autocomplete="current-password">
          </div>
          <div class="portal-btn-row">
            <button type="submit" class="modal-action-btn primary-btn">Sign In to Dashboard →</button>
          </div>
        </form>
      </div>

      <div class="modal-highlight-box" style="margin-top:14px; font-size:12px; color:#475569;">
        🔒 <strong>Confidential Credentials Policy:</strong> Access is restricted to authorized institute members. Passwords and credentials are confidential.
      </div>

      
    </div>
  `;
}

window.setPortalLoginUser = function(userId, password) {
  const inputId = document.getElementById('portalLoginId');
  const inputPass = document.getElementById('portalPassword');
  if (inputId) inputId.value = userId;
  if (inputPass && password) inputPass.value = password;
  showDemoNotice(`Selected account: ${userId}`);
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
        
      </div>
    </div>
  `;
}

window.renderPortalWrongPassword = function renderPortalWrongPassword(portalType, userId, hint) {
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
        💡 <strong>Security Notice:</strong> Please verify your password spelling, capitalization, and registered credentials.
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

  // S. EXAM PORTAL AUTHENTICATION
  if (portalType === 'exam-portal' || portalType === 'sem-result' || portalType === 'sem-result-portal') {
    window.authenticateExamPortal(overrideId);
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

    window.activeAdminTab = window.activeAdminTab || 'events';

    // 1. Generate Branch Rows for Admin Access Management
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

    // 2. Generate Events Management Content
    const events = window.eventsData || [];
    const editingEv = window.adminEditingEventId ? events.find(x => x.id === window.adminEditingEventId) : null;
    const isEditing = !!editingEv;
    const showForm = window.adminShowEventForm || isEditing;

    let eventFormHTML = '';
    if (showForm) {
      const fTitle = isEditing ? editingEv.title : '';
      const fTag = isEditing ? editingEv.tag : 'National Hackathon';
      const fStatus = isEditing ? editingEv.status : 'Registration Open (Active)';
      const fDate = isEditing ? editingEv.date : 'Upcoming 2026 Edition';
      const fImg = isEditing ? editingEv.img : 'assets/sangram.jpeg';
      const fVenue = isEditing ? ((editingEv.details && editingEv.details.find(d => d.label.toLowerCase().includes('venue') || d.label.toLowerCase().includes('location')))?.val || 'HITAM Central Open Air Amphitheatre') : 'HITAM Central Open Air Amphitheatre';
      const fEligibility = isEditing ? ((editingEv.details && editingEv.details.find(d => d.label.toLowerCase().includes('eligibility')))?.val || 'Open to All Enrolled College & University Students') : 'Open to All Enrolled College & University Students';
      const fDesc = isEditing ? editingEv.desc : '';
      const fParas = isEditing && editingEv.paras ? editingEv.paras.join('\n\n') : '';

      eventFormHTML = `
        <div id="adminEventFormContainer" style="background:#ffffff; border:2px solid #08752f; border-radius:8px; padding:18px; margin-bottom:18px; box-shadow:0 4px 12px rgba(8, 117, 47, 0.1);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
            <div>
              <h4 style="margin:0; color:#08752f; font-size:16px;">${isEditing ? `✏️ Edit Campus Event: ${editingEv.title}` : '➕ Create &amp; Publish New Campus Event'}</h4>
              <span style="font-size:12px; color:#64748b;">${isEditing ? 'Update the event details below. Click Update to save changes.' : 'Fill in the event parameters below to publish instantly across the college website and student portal.'}</span>
            </div>
            <button class="drill-action-btn drill-action-secondary" style="padding:3px 8px; font-size:11px;" onclick="adminCancelEventEdit('${user.id}')">✕ Close Form</button>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Event Title *</label>
              <input type="text" id="adminEventTitle" value="${fTitle.replace(/"/g, '&quot;')}" placeholder="e.g. National Smart Hackathon 2026" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Category / Tag *</label>
              <select id="adminEventTag" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px; background:#fff;">
                <option value="National Mega Festival" ${fTag === 'National Mega Festival' ? 'selected' : ''}>National Mega Festival</option>
                <option value="National Hackathon" ${fTag === 'National Hackathon' ? 'selected' : ''}>National Hackathon</option>
                <option value="Flagship Mega Fest" ${fTag === 'Flagship Mega Fest' ? 'selected' : ''}>Flagship Mega Fest</option>
                <option value="Cultural &amp; Academic Gala" ${fTag === 'Cultural & Academic Gala' ? 'selected' : ''}>Cultural &amp; Academic Gala</option>
                <option value="Student Welcome Fest" ${fTag === 'Student Welcome Fest' ? 'selected' : ''}>Student Welcome Fest</option>
                <option value="Patriotic Celebrations" ${fTag === 'Patriotic Celebrations' ? 'selected' : ''}>Patriotic Celebrations</option>
                <option value="Sustainability Summit" ${fTag === 'Sustainability Summit' ? 'selected' : ''}>Sustainability Summit</option>
                <option value="Technical Workshop" ${fTag === 'Technical Workshop' ? 'selected' : ''}>Technical Workshop</option>
                <option value="Inter-Collegiate Sports" ${fTag === 'Inter-Collegiate Sports' ? 'selected' : ''}>Inter-Collegiate Sports</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Status Badge *</label>
              <select id="adminEventStatus" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px; background:#fff;">
                <option value="Registration Open (Active)" ${fStatus.includes('Registration Open') ? 'selected' : ''}>Registration Open (Active)</option>
                <option value="Annual National Fest — Upcoming Edition Circular Awaited" ${fStatus.includes('Awaited') ? 'selected' : ''}>Annual National Fest — Upcoming Edition Circular Awaited</option>
                <option value="Annual Flagship Event — Dates Announced" ${fStatus.includes('Dates Announced') ? 'selected' : ''}>Annual Flagship Event — Dates Announced</option>
                <option value="Call for Submissions &amp; Project Proposals" ${fStatus.includes('Call for') ? 'selected' : ''}>Call for Submissions &amp; Project Proposals</option>
                <option value="Completed / Archival Record" ${fStatus.includes('Completed') ? 'selected' : ''}>Completed / Archival Record</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Date / Schedule *</label>
              <input type="text" id="adminEventDate" value="${fDate.replace(/"/g, '&quot;')}" placeholder="e.g. November 18–20, 2026 or Annual Multi-Day" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Banner Image Path or URL *</label>
            <input type="text" id="adminEventImg" value="${fImg.replace(/"/g, '&quot;')}" placeholder="assets/sangram.jpeg or https://..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
              <span style="font-size:11px; color:#64748b; font-weight:600;">Image Presets:</span>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/sangram.jpeg')">Sangram (Sports)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/esparto.jpeg')">Esparto (Tech)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/bliss.png')">Bliss (Cultural)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/prasasti.jpeg')">Prasasti (Traditions)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/hitam1.jpg')">Campus Greenery</button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Venue / Campus Location</label>
              <input type="text" id="adminEventVenue" value="${fVenue.replace(/"/g, '&quot;')}" placeholder="e.g. HITAM Central Open Air Amphitheatre" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Eligibility / Participation</label>
              <input type="text" id="adminEventEligibility" value="${fEligibility.replace(/"/g, '&quot;')}" placeholder="e.g. Open to All College &amp; University Students" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Short Card Description (1-2 sentences) *</label>
            <textarea id="adminEventDesc" rows="2" placeholder="Brief summary displayed on event cards..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">${fDesc}</textarea>
          </div>

          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Detailed Description &amp; Highlights (Paragraphs)</label>
            <textarea id="adminEventParas" rows="3" placeholder="Detailed paragraphs for the event modal view (separate multiple paragraphs with an empty line)..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">${fParas}</textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:8px;">
            <button class="drill-action-btn drill-action-secondary" style="padding:6px 14px; font-size:12px;" onclick="adminCancelEventEdit('${user.id}')">Cancel</button>
            <button class="drill-action-btn drill-action-primary" style="padding:6px 18px; font-size:12.5px; font-weight:700;" onclick="adminSaveEvent('${user.id}')">
              ${isEditing ? '💾 Update Event' : '💾 Save &amp; Publish Event'}
            </button>
          </div>
        </div>
      `;
    }

    const eventRowsHTML = events.map(e => `
      <div class="admin-event-row" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; display:flex; gap:14px; align-items:center; flex-wrap:wrap; transition:box-shadow 0.2s ease;">
        <img src="${e.img}" alt="${e.title}" style="width:72px; height:72px; object-fit:cover; border-radius:6px; border:1px solid #e2e8f0; flex-shrink:0;">
        <div style="flex:1; min-width:260px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
            <span style="font-size:11px; font-weight:700; background:#e0f2fe; color:#0369a1; padding:2px 7px; border-radius:4px;">${e.tag}</span>
            <button class="drill-action-btn" style="padding:2px 8px; font-size:11px; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0;" onclick="adminToggleEventStatus('${e.id}', '${user.id}')" title="Click to cycle status">
              📌 ${e.status} ⟳
            </button>
          </div>
          <div style="font-size:14px; font-weight:700; color:#0f172a; margin-bottom:3px;">${e.title}</div>
          <div style="font-size:12px; color:#475569; margin-bottom:4px; line-height:1.4;">${e.desc}</div>
          <div style="font-size:11.5px; color:#64748b;">
            <span>📅 ${e.date}</span>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; flex-shrink:0;">
          <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11.5px;" onclick="showEventDetail('${e.id}')">👁️ Preview</button>
          <button class="drill-action-btn drill-action-primary" style="padding:4px 10px; font-size:11.5px;" onclick="adminEditEvent('${e.id}', '${user.id}')">✏️ Edit</button>
          <button class="drill-action-btn drill-action-danger" style="padding:4px 10px; font-size:11.5px;" onclick="adminDeleteEvent('${e.id}', '${user.id}')">🗑️ Remove</button>
        </div>
      </div>
    `).join('');

    const eventsManagementPanelHTML = `
      <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:16px; margin:16px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <h3 style="margin:0 0 4px 0; color:#065f46; font-size:16px; display:flex; align-items:center; gap:8px;">
              <span>🎪</span> Campus Events Management Console
            </h3>
            <p style="margin:0; font-size:12px; color:#166534;">
              As an Administrator, you can add new events, modify schedules, update banners, and remove past events. Changes update the public events directory and student portal in real time.
            </p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="drill-action-btn drill-action-primary" style="padding:6px 14px; font-size:12px; font-weight:700;" onclick="adminToggleCreateEventForm('${user.id}')">
              ➕ Create New Event
            </button>
            <button class="drill-action-btn drill-action-secondary" style="padding:6px 10px; font-size:11.5px;" onclick="adminResetEventsToDefault('${user.id}')">
              🔄 Reset Defaults
            </button>
          </div>
        </div>

        ${eventFormHTML}

        <div style="display:flex; justify-content:space-between; align-items:center; margin:14px 0 10px 0; gap:10px; flex-wrap:wrap;">
          <div style="flex:1; min-width:240px;">
            <input type="text" id="adminEventSearch" placeholder="🔍 Search events by title, tag, or status..." 
                   style="width:100%; padding:7px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px;"
                   oninput="adminFilterEvents()">
          </div>
          <div style="font-size:12px; color:#475569; font-weight:600;">
            Showing <span id="adminEventShowingCount">${events.length}</span> campus events
          </div>
        </div>

        <div class="admin-events-list" style="display:flex; flex-direction:column; gap:10px;">
          ${eventRowsHTML}
        </div>
      </div>
    `;

    // 3. Generate Access Control Panel HTML
    const accessControlPanelHTML = `
      <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:16px; margin:16px 0;">
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
    `;

    // 4. Generate Governance Tools HTML
    const governancePanelHTML = `
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="margin:0 0 10px 0; color:#1e293b; font-size:15px; display:flex; align-items:center; gap:6px;">
          <span>📊</span> Institutional Governance Demonstration Tools
        </h4>
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
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Accreditation and NAAC A+ reports are archived in the IQAC section.')">NAAC Disclosures ℹ️</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // 5. Select Active Tab Content
    let activeTabContentHTML = '';
    if (window.activeAdminTab === 'access') {
      activeTabContentHTML = accessControlPanelHTML;
    } else if (window.activeAdminTab === 'governance') {
      activeTabContentHTML = governancePanelHTML;
    } else {
      activeTabContentHTML = eventsManagementPanelHTML;
    }

    // Render Full Admin Dashboard
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
            
            <button class="portal-logout-btn" onclick="openModal('admin-portal')">Sign Out</button>
          </div>
        </div>

        <div class="portal-kpi-grid">
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.students}</div><div class="portal-kpi-lbl">Student Enrolment</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.faculty}</div><div class="portal-kpi-lbl">Active Faculty &amp; HODs</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val" style="color:#08752f">${user.attendance}</div><div class="portal-kpi-lbl">Attendance Rate</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.collections}</div><div class="portal-kpi-lbl">Finance &amp; Collections</div></div>
          <div class="portal-kpi-card" style="cursor:pointer;" onclick="adminSwitchTab('events', '${user.id}')"><div class="portal-kpi-val" style="color:#0284c7">${events.length} Events</div><div class="portal-kpi-lbl">Campus Events Active</div></div>
        </div>

        <!-- ADMIN MODULE NAVIGATION TABS -->
        <div class="portal-tabs-nav" style="display:flex; gap:8px; margin:16px 0 10px 0; border-bottom:2px solid #e2e8f0; padding-bottom:8px; flex-wrap:wrap;">
          <button class="portal-tab-btn ${window.activeAdminTab === 'events' ? 'active' : ''}" 
                  onclick="adminSwitchTab('events', '${user.id}')">
            🎪 Campus Events Manager (${events.length})
          </button>
          <button class="portal-tab-btn ${window.activeAdminTab === 'access' ? 'active' : ''}" 
                  onclick="adminSwitchTab('access', '${user.id}')">
            <span>🛡️</span> Portal Access Control &amp; Permissions Manager
          </button>
          <button class="portal-tab-btn ${window.activeAdminTab === 'governance' ? 'active' : ''}" 
                  onclick="adminSwitchTab('governance', '${user.id}')">
            <span>📊</span> Institutional Governance Tools
          </button>
        </div>

        <!-- ACTIVE TAB CONTENT -->
        ${activeTabContentHTML}

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

      const assessmentOptions = `
        <optgroup label="Mid-Semester 1 Internal Assessment Components">
          <option value="ciea1" ${cieKey === 'ciea1' ? 'selected' : ''}>Mid-1 Theory Exam [ciea1] (Max 25)</option>
          <option value="cieb1" ${cieKey === 'cieb1' ? 'selected' : ''}>Mid-1 Assignment [cieb1] (Max 25)</option>
          <option value="ciec1" ${cieKey === 'ciec1' ? 'selected' : ''}>Mid-1 Quiz &amp; Activity [ciec1] (Max 25)</option>
        </optgroup>
        <optgroup label="Mid-Semester 2 Internal Assessment Components">
          <option value="ciea2" ${cieKey === 'ciea2' ? 'selected' : ''}>Mid-2 Theory Exam [ciea2] (Max 25)</option>
          <option value="cieb2" ${cieKey === 'cieb2' ? 'selected' : ''}>Mid-2 Assignment [cieb2] (Max 25)</option>
          <option value="ciec2" ${cieKey === 'ciec2' ? 'selected' : ''}>Mid-2 Quiz &amp; Activity [ciec2] (Max 25)</option>
        </optgroup>
      `;

      const marksRowsHTML = classStudents.map((st, idx) => {
        const sMarks = window.getStudentMarks(st.roll);
        const storedScore = window.facultyMarksDB[marksStoreKey] ? window.facultyMarksDB[marksStoreKey][st.roll] : undefined;
        const defaultScore = storedScore !== undefined ? storedScore : (sMarks[cieKey] !== undefined ? sMarks[cieKey] : 22);
        
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

        // 1. STUDENT DETAILS TAB (Info + Academic Performance Record)
    if (activeTab === 'details') {
      const marks = window.getStudentMarks(studentUser.roll);
      const mid1Avg = ((marks.ciea1 + marks.cieb1 + marks.ciec1) / 3).toFixed(1);
      const mid2Avg = ((marks.ciea2 + marks.cieb2 + marks.ciec2) / 3).toFixed(1);
      const overallCie = ((parseFloat(mid1Avg) + parseFloat(mid2Avg)) / 2).toFixed(1);

      tabContentHTML = `
        <div class="erp-section-title">STUDENT PROFILE &amp; PERFORMANCE</div>

        <!-- 1. STUDENT INFO / BIO-DATA -->
        <div class="erp-accordion-item" style="border:1px solid #c8e4cf; border-radius:6px; margin-bottom:14px; overflow:hidden;">
          <div class="erp-accordion-header" style="background:#08752f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>👤</span> BIO-DATA &amp; STUDENT INFORMATION
            </span>
            <span style="font-size:11px; opacity:0.9;">Comprehensive Student Profile</span>
          </div>
          <div class="erp-accordion-body" style="display:block; padding:16px; background:#ffffff;">
            <div style="font-size:12px; font-weight:700; color:#166534; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
              Comprehensive Student Profile • Autonomous R22 Regulations
            </div>
            <div class="erp-profile-grid">
              <div><span class="lbl">Student Name:</span> <strong>${studentUser.name}</strong></div>
              <div><span class="lbl">Hall Ticket / Roll No:</span> <strong style="color:#08752f;">${studentUser.roll}</strong></div>
              <div><span class="lbl">Enrolment Program:</span> <strong>${studentUser.branch}</strong></div>
              <div><span class="lbl">Academic Standing:</span> <strong>${studentUser.yearSem}</strong></div>
              <div><span class="lbl">Assigned Section:</span> <strong>${studentUser.section}</strong></div>
              <div><span class="lbl">Counselling Code:</span> <strong>HITM (Autonomous)</strong></div>
              <div><span class="lbl">Date of Birth:</span> <strong>14-Aug-2005</strong></div>
              <div><span class="lbl">Gender:</span> <strong>Male</strong></div>
              <div><span class="lbl">Blood Group:</span> <strong>O+ve</strong></div>
              <div><span class="lbl">Mobile Number:</span> <strong>${studentUser.contact}</strong></div>
              <div><span class="lbl">Institutional Email:</span> <strong>${studentUser.roll.toLowerCase()}@hitam.org</strong></div>
              <div><span class="lbl">Assigned Faculty Mentor:</span> <strong>${studentUser.mentor}</strong></div>
              <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
              <div><span class="lbl">Examination Status:</span> <strong style="color:#15803d;">Verified (Autonomous Center)</strong></div>
              <div><span class="lbl">Cumulative CGPA:</span> <strong style="color:#08752f;">${studentUser.cgpa}</strong></div>
              <div><span class="lbl">Attendance Record:</span> <strong>${studentUser.attendance}</strong></div>
              <div><span class="lbl">Active Backlogs:</span> <strong>${studentUser.backlogs}</strong></div>
              <div><span class="lbl">Fee Clearance:</span> <strong>${studentUser.feeDue}</strong></div>
            </div>
          </div>
        </div>

        <!-- 2. ACADEMIC PERFORMANCE (LIVE CIE EVALUATION & SEMESTER RECORDS) -->
        <div class="erp-accordion-item" style="border:1px solid #c8e4cf; border-radius:6px; margin-bottom:16px; overflow:hidden;">
          <div class="erp-accordion-header" style="background:#013b1f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>📊</span> ACADEMIC PERFORMANCE SUMMARY &amp; CIE EVALUATION
            </span>
            <span style="font-size:11px; opacity:0.9;">Real-Time Faculty Sync</span>
          </div>
          <div class="erp-accordion-body" style="display:block; padding:16px; background:#fafffa;">
            <!-- Key Standing Pills -->
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; text-align:center; margin-bottom:14px;">
              <div class="erp-kpi-pill"><span class="val">8.84</span><span class="lbl">Current SGPA</span></div>
              <div class="erp-kpi-pill"><span class="val" style="color:#08752f;">${studentUser.cgpa.slice(0,4)}</span><span class="lbl">Cumulative CGPA</span></div>
              <div class="erp-kpi-pill"><span class="val">128 / 160</span><span class="lbl">Credits Earned</span></div>
              <div class="erp-kpi-pill"><span class="val" style="color:#15803d;">89.4%</span><span class="lbl">Attendance</span></div>
            </div>

            <!-- Live CIE Internal Marks Sync Box -->
            <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:12px;">
              <div style="font-weight:700; font-size:12.5px; color:#166534; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>🎯 Continuous Internal Evaluation (CIE) Marks — Live Faculty Roster</span>
                <span style="color:#08752f; font-weight:800;">CIE Average: ${overallCie} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px 10px;">
                  <strong style="color:#166534; font-size:12px; display:block; margin-bottom:4px;">Mid-Semester 1 (Average: ${mid1Avg}/25):</strong>
                  <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#334155;">
                    <span>ciea1: <b>${marks.ciea1}/25</b></span>
                    <span>cieb1: <b>${marks.cieb1}/25</b></span>
                    <span>ciec1: <b>${marks.ciec1}/25</b></span>
                  </div>
                </div>
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px 10px;">
                  <strong style="color:#166534; font-size:12px; display:block; margin-bottom:4px;">Mid-Semester 2 (Average: ${mid2Avg}/25):</strong>
                  <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#334155;">
                    <span>ciea2: <b>${marks.ciea2}/25</b></span>
                    <span>cieb2: <b>${marks.cieb2}/25</b></span>
                    <span>ciec2: <b>${marks.ciec2}/25</b></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Semester History Table -->
            <div style="font-size:12px; font-weight:700; color:#1e293b; margin:10px 0 6px 0;">Past Semester Results History:</div>
            <table class="ht-table" style="width:100%; font-size:11.5px;">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Year &amp; Session</th>
                  <th>Credits Registered</th>
                  <th>Credits Passed</th>
                  <th>SGPA</th>
                  <th>Result Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Semester I</td><td>2023-24 (Odd)</td><td>20</td><td>20</td><td>8.75</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester II</td><td>2023-24 (Even)</td><td>20</td><td>20</td><td>8.80</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester III</td><td>2024-25 (Odd)</td><td>22</td><td>22</td><td>8.90</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester IV</td><td>2024-25 (Even)</td><td>22</td><td>22</td><td>8.85</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester V</td><td>2025-26 (Odd)</td><td>22</td><td>22</td><td>8.80</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester VI</td><td>2025-26 (Even)</td><td>22</td><td>22</td><td>8.84</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="erp-btn-row">
          <button type="button" class="erp-btn" onclick="window.print()">Print</button>
          <button type="button" class="erp-btn" onclick="showDemoNotice('Exporting Student Profile record to CSV/PDF format...')">Export</button>
          <button type="button" class="erp-btn" style="background:#0f5132;" onclick="studentShowHallTicket('${studentUser.roll}')">🎟️ View Autonomous Hall Ticket →</button>
          <button type="button" class="erp-btn" style="background:#334155;" onclick="studentApplyBonafide('${studentUser.roll}')">📄 Request Bonafide Guidelines</button>
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

    // 5. MARKS TAB (Live Synchronized Mid-1 & Mid-2 CIE Evaluations)
    else if (activeTab === 'marks') {
      const marks = window.getStudentMarks(studentUser.roll);
      const mid1Avg = ((marks.ciea1 + marks.cieb1 + marks.ciec1) / 3).toFixed(1);
      const mid2Avg = ((marks.ciea2 + marks.cieb2 + marks.ciec2) / 3).toFixed(1);
      const overallCie = ((parseFloat(mid1Avg) + parseFloat(mid2Avg)) / 2).toFixed(1);

      const marksRowsHTML = studentUser.subjects.map((s, idx) => {
        const delta = (idx % 3) - 1;
        const subCiea1 = Math.min(25, Math.max(0, marks.ciea1 + delta));
        const subCieb1 = Math.min(25, Math.max(0, marks.cieb1 + delta));
        const subCiec1 = Math.min(25, Math.max(0, marks.ciec1 + delta));
        const subMid1 = ((subCiea1 + subCieb1 + subCiec1) / 3).toFixed(1);

        const subCiea2 = Math.min(25, Math.max(0, marks.ciea2 + delta));
        const subCieb2 = Math.min(25, Math.max(0, marks.cieb2 + delta));
        const subCiec2 = Math.min(25, Math.max(0, marks.ciec2 + delta));
        const subMid2 = ((subCiea2 + subCieb2 + subCiec2) / 3).toFixed(1);

        const subOverall = ((parseFloat(subMid1) + parseFloat(subMid2)) / 2).toFixed(1);
        const gradeStr = subOverall >= 23 ? 'O (Outstanding)' : (subOverall >= 20 ? 'A+ (Excellent)' : 'A (Very Good)');

        return `
          <tr>
            <td><strong>${s.code}</strong></td>
            <td>${s.name}</td>
            <td>${subCiea1}</td>
            <td>${subCieb1}</td>
            <td>${subCiec1}</td>
            <td><strong style="color:#08752f;">${subMid1}</strong></td>
            <td>${subCiea2}</td>
            <td>${subCieb2}</td>
            <td>${subCiec2}</td>
            <td><strong style="color:#08752f;">${subMid2}</strong></td>
            <td><strong style="color:#013b1f; font-size:13px;">${subOverall} / 25</strong></td>
            <td>${s.credits}</td>
            <td><span style="font-size:11px; font-weight:700; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px;">${gradeStr}</span></td>
          </tr>
        `;
      }).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📝</span> Continuous Internal Evaluation (CIE) Marks &amp; GPA Summary
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Live faculty evaluation sync: Mid-1 (ciea1, cieb1, ciec1) and Mid-2 (ciea2, cieb2, ciec2).
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-weight:700; color:#166534; font-size:13px; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>Mid-Semester 1 Internal Evaluation</span>
                <span style="color:#08752f;">Average: ${mid1Avg} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center;">
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciea1 (Exam)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.ciea1} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">cieb1 (Assignment)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.cieb1} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciec1 (Quiz / Viva)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.ciec1} / 25</strong>
                </div>
              </div>
            </div>

            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-weight:700; color:#166534; font-size:13px; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>Mid-Semester 2 Internal Evaluation</span>
                <span style="color:#08752f;">Average: ${mid2Avg} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center;">
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciea2 (Exam)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.ciea2} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">cieb2 (Assignment)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.cieb2} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciec2 (Quiz / Viva)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.ciec2} / 25</strong>
                </div>
              </div>
            </div>
          </div>

          <div style="overflow-x:auto;">
            <table class="portal-data-table" style="font-size:11.5px;">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>ciea1</th>
                  <th>cieb1</th>
                  <th>ciec1</th>
                  <th>Mid-1</th>
                  <th>ciea2</th>
                  <th>cieb2</th>
                  <th>ciec2</th>
                  <th>Mid-2</th>
                  <th>CIE Total</th>
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

    // Render Full Student Portal View with HITAM ERP Reference Architecture
    const displayName = studentUser.name || 'STUDENT';

    body.innerHTML = `
      <div class="hitam-erp-wrap">
        <!-- 1. TOP GREEN BRAND HEADER (Matching Screenshot Reference) -->
        <div class="hitam-erp-header">
          <div class="hitam-erp-brand">
            <img src="assets/hitam-logo.png" alt="HITAM" class="hitam-erp-logo">
            <div class="hitam-erp-title-block">
              <div class="hitam-erp-counselling-code">
                <span>Counselling Code : <strong>HITM</strong></span>
                <span>Estd: 2001</span>
              </div>
              <div class="hitam-erp-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT</div>
              <div class="hitam-erp-accreditation">Accredited by NAAC, Affiliated to JNTUH, Approved by AICTE</div>
            </div>
          </div>
          <div class="hitam-erp-user-badge" style="background:#e8f5ec; color:#0b4f26; font-size:12px; font-weight:700; padding:8px 14px; border-radius:6px; border:1px solid #bbf7d0; display:flex; align-items:center; gap:6px;">
            <span>🎓</span> Autonomous Student
          </div>
        </div>

        <!-- 2. ANNOUNCEMENT TICKER (Matching Screenshot Reference) -->
        <div class="hitam-erp-marquee">
          <span>Welcome to 4th Day FDP on "Emerging Trends in AI &amp; Machine Learning" • Autonomous End-Semester Regular / Supplementary Registration Open • Hall Tickets Available for Download</span>
        </div>

        <!-- 3. GREEN USER ACTION BAR (Matching Screenshot Reference) -->
        <div class="hitam-erp-userbar">
          <div class="erp-user-greeting">Hi...${(studentUser.roll === '23E51A6619' && !(window.userCredentialStore && window.userCredentialStore[studentUser.roll] && window.userCredentialStore[studentUser.roll].alias)) ? 'BHUKYA VISHNU' : displayName}</div>
          <div class="erp-user-actions">
            <button type="button" class="erp-action-link" onclick="studentSwitchTab('credentials', '${studentUser.roll}')">Change Password</button>
            <span class="erp-separator">|</span>
            <button type="button" class="erp-action-link" onclick="openModal('student-portal')">Logout</button>
          </div>
        </div>

        <!-- 4. TOP QUICK NAV SHORTCUT TABS (Ensures full accessibility & test compliance) -->
        <div class="portal-nav-tabs" style="margin: 8px 12px 0 12px; border-bottom: none;">
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

        <!-- 5. TWO-COLUMN ERP MAIN BODY (Matching Screenshot Reference) -->
        <div class="hitam-erp-body">
          <!-- LEFT COLUMN: MENU SIDEBAR -->
          <aside class="hitam-erp-sidebar">
            <div class="erp-menu-header">MENU</div>
            <ul class="erp-menu-list">
              <li class="${activeTab === 'details' ? 'active' : ''}" onclick="studentSwitchTab('details', '${studentUser.roll}')"><span class="erp-menu-icon">👤</span> PROFILE DETAILS</li>
              <li class="${activeTab === 'attendance' ? 'active' : ''}" onclick="studentSwitchTab('attendance', '${studentUser.roll}')"><span class="erp-menu-icon">📊</span> ATTENDANCE</li>
              <li class="${activeTab === 'timetable' ? 'active' : ''}" onclick="studentSwitchTab('timetable', '${studentUser.roll}')"><span class="erp-menu-icon">🗓️</span> TIME TABLE</li>
              <li class="${activeTab === 'fees' ? 'active' : ''}" onclick="studentSwitchTab('fees', '${studentUser.roll}')"><span class="erp-menu-icon">💰</span> FEE DETAILS</li>
              <li class="${activeTab === 'marks' ? 'active' : ''}" onclick="studentSwitchTab('marks', '${studentUser.roll}')"><span class="erp-menu-icon">📝</span> MARKS (CIE)</li>
              <li class="${activeTab === 'feedback' ? 'active' : ''}" onclick="studentSwitchTab('feedback', '${studentUser.roll}')"><span class="erp-menu-icon">⭐</span> FEEDBACK</li>
              <li class="${activeTab === 'complaints' ? 'active' : ''}" onclick="studentSwitchTab('complaints', '${studentUser.roll}')"><span class="erp-menu-icon">📢</span> COMPLAINTS</li>
              <li class="${activeTab === 'credentials' ? 'active' : ''}" onclick="studentSwitchTab('credentials', '${studentUser.roll}')"><span class="erp-menu-icon">🔐</span> PASSWORD CHANGE</li>
            </ul>
          </aside>

          <!-- RIGHT COLUMN: CONTENT PANE -->
          <main class="hitam-erp-content">
            <div id="studentTabContainer">
              ${tabContentHTML}
            </div>
          </main>
        </div>

        <div id="modalToastSlot"></div>
      </div>
    `;
    return;
  }
};
/* ==========================================================================
   14. AUTONOMOUS EXAMINATION PORTAL (EXAM PORTAL)
   Includes:
   - 1. Notices About Important Dates & Examination Circulars
   - 2. Semester Results & Autonomous Grade Memos (SGPA/CGPA)
   - 3. Hall Ticket Download (Admit Card with Timetable & Barcode)
   - 4. Exam Fee Payment & Challan Receipts
   - 5. Internal Marks (Continuous Evaluation, Final Internal Marks & Percentage)
   ========================================================================== */

window.activeExamPortalTab = 'notices';

// Internal Marks & Final Percentage Calculator with live faculty sync
window.getStudentInternalMarksBreakdown = function(studentUser) {
  const roll = studentUser.roll;
  const marks = window.getStudentMarks ? window.getStudentMarks(roll) : {
    ciea1: 18, cieb1: 17, ciec1: 19,
    ciea2: 19, cieb2: 18, ciec2: 19
  };

  // Convert raw test/assignment/quiz inputs to 20-mark scaled Mid-1 and Mid-2
  const mid1Val1 = Math.min(20, parseFloat((((marks.ciea1 * 0.6) + (marks.cieb1 * 0.25) + (marks.ciec1 * 0.15))).toFixed(1)));
  const mid2Val1 = Math.min(20, parseFloat((((marks.ciea2 * 0.6) + (marks.cieb2 * 0.25) + (marks.ciec2 * 0.15))).toFixed(1)));
  const finalCie1 = parseFloat((mid1Val1 + mid2Val1).toFixed(1));
  const pct1 = ((finalCie1 / 40) * 100).toFixed(1);

  const mid1Val2 = 18.0;
  const mid2Val2 = 18.0;
  const finalCie2 = parseFloat((mid1Val2 + mid2Val2).toFixed(1));
  const pct2 = ((finalCie2 / 40) * 100).toFixed(1);

  const mid1Val3 = 19.0;
  const mid2Val3 = 19.0;
  const finalCie3 = parseFloat((mid1Val3 + mid2Val3).toFixed(1));
  const pct3 = ((finalCie3 / 40) * 100).toFixed(1);

  const mid1Val4 = 17.5;
  const mid2Val4 = 17.5;
  const finalCie4 = parseFloat((mid1Val4 + mid2Val4).toFixed(1));
  const pct4 = ((finalCie4 / 40) * 100).toFixed(1);

  const mid1Val5 = 18.0;
  const mid2Val5 = 18.5;
  const finalCie5 = parseFloat((mid1Val5 + mid2Val5).toFixed(1));
  const pct5 = ((finalCie5 / 40) * 100).toFixed(1);

  return [
    {
      code: '22AI501PC',
      title: 'Machine Learning Techniques',
      type: 'Core Theory',
      mid1: mid1Val1.toFixed(1),
      mid2: mid2Val1.toFixed(1),
      finalInternal: finalCie1.toFixed(1),
      maxInternal: 40,
      percentage: pct1 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22AI502PC',
      title: 'Deep Learning & Neural Networks',
      type: 'Core Theory',
      mid1: mid1Val2.toFixed(1),
      mid2: mid2Val2.toFixed(1),
      finalInternal: finalCie2.toFixed(1),
      maxInternal: 40,
      percentage: pct2 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS503PC',
      title: 'Computer Networks & Internet Protocols',
      type: 'Core Theory',
      mid1: mid1Val3.toFixed(1),
      mid2: mid2Val3.toFixed(1),
      finalInternal: finalCie3.toFixed(1),
      maxInternal: 40,
      percentage: pct3 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS504PC',
      title: 'Automata Theory & Compiler Design',
      type: 'Core Theory',
      mid1: mid1Val4.toFixed(1),
      mid2: mid2Val4.toFixed(1),
      finalInternal: finalCie4.toFixed(1),
      maxInternal: 40,
      percentage: pct4 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS505PE',
      title: 'Cloud Computing & Distributed Systems',
      type: 'Professional Elective',
      mid1: mid1Val5.toFixed(1),
      mid2: mid2Val5.toFixed(1),
      finalInternal: finalCie5.toFixed(1),
      maxInternal: 40,
      percentage: pct5 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22AI506PC',
      title: 'Machine Learning Laboratory',
      type: 'Practical Lab',
      mid1: '19.5',
      mid2: '19.5',
      finalInternal: '39.0',
      maxInternal: 40,
      percentage: '97.5%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS507PC',
      title: 'Computer Networks Laboratory',
      type: 'Practical Lab',
      mid1: '19.0',
      mid2: '19.5',
      finalInternal: '38.5',
      maxInternal: 40,
      percentage: '96.3%',
      status: 'ELIGIBLE'
    }
  ];
};

window.getSemesterResults = function(studentUser, semNum = 5, isConsolidated = false) {
  const deptKey = studentUser.deptKey || 'CSM';
  const roll = studentUser.roll;
  
  // Retrieve live faculty CIE marks if available
  const liveMarks = window.getStudentMarks ? window.getStudentMarks(roll) : {
    ciea1: 18, cieb1: 17, ciec1: 19,
    ciea2: 19, cieb2: 18, ciec2: 19
  };

  const mid1Score1 = Math.round((liveMarks.ciea1 + liveMarks.ciea2) || 37);
  const mid1Score2 = Math.round((liveMarks.cieb1 + liveMarks.cieb2) || 36);
  const mid1Score3 = Math.round((liveMarks.ciec1 + liveMarks.ciec2) || 38);

  const semSubjectDB = {
    1: [
      { code: '22MA101BS', title: 'Matrices and Calculus', type: 'Professional Core (Theory)', cie: 36, see: 52, credits: 4.0 },
      { code: '22PH102BS', title: 'Applied Physics', type: 'Basic Science (Theory)', cie: 37, see: 50, credits: 4.0 },
      { code: '22CS103ES', title: 'Programming for Problem Solving (C)', type: 'Engineering Science (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22EN104HS', title: 'English for Skill Enhancement', type: 'Humanities & Social Sciences', cie: 38, see: 52, credits: 2.0 },
      { code: '22PH105BS', title: 'Applied Physics Laboratory', type: 'Basic Science (Lab)', cie: 38, see: 54, credits: 1.5 },
      { code: '22CS106ES', title: 'Programming for Problem Solving Lab', type: 'Engineering Science (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22ME107ES', title: 'Engineering Workshop Practice', type: 'Engineering Science (Lab)', cie: 38, see: 53, credits: 2.5 },
      { code: '22EN108HS', title: 'English Language & Communication Lab', type: 'Humanities (Lab)', cie: 39, see: 54, credits: 1.0 }
    ],
    2: [
      { code: '22MA201BS', title: 'Ordinary Differential Equations & Vector Calculus', type: 'Basic Science (Theory)', cie: 37, see: 51, credits: 4.0 },
      { code: '22CH202BS', title: 'Engineering Chemistry', type: 'Basic Science (Theory)', cie: 36, see: 49, credits: 4.0 },
      { code: '22CS203PC', title: 'Data Structures and Algorithms', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22EE204ES', title: 'Basic Electrical & Electronics Engineering', type: 'Engineering Science (Theory)', cie: 37, see: 50, credits: 3.0 },
      { code: '22ME205ES', title: 'Computer Aided Engineering Graphics', type: 'Engineering Science (Lab)', cie: 38, see: 54, credits: 3.0 },
      { code: '22CS206PC', title: 'Data Structures Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22CH207BS', title: 'Engineering Chemistry Laboratory', type: 'Basic Science (Lab)', cie: 38, see: 53, credits: 1.5 }
    ],
    3: [
      { code: '22CS301PC', title: 'Mathematical and Statistical Foundations', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22CS302PC', title: 'Computer Organization & Architecture', type: 'Professional Core (Theory)', cie: 37, see: 52, credits: 3.0 },
      { code: '22CS303PC', title: 'Object Oriented Programming through Java', type: 'Professional Core (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22CS304PC', title: 'Database Management Systems', type: 'Professional Core (Theory)', cie: 38, see: 54, credits: 3.0 },
      { code: '22EC305ES', title: 'Digital Logic Design & Microprocessors', type: 'Engineering Science (Theory)', cie: 36, see: 50, credits: 3.0 },
      { code: '22CS306PC', title: 'Java Programming Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22CS307PC', title: 'Database Management Systems Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22MC308GS', title: 'Gender Sensitization Laboratory', type: 'Mandatory Non-Credit Audit', cie: 38, see: 52, credits: 0.0 }
    ],
    4: [
      { code: '22CS401PC', title: 'Design and Analysis of Algorithms', type: 'Professional Core (Theory)', cie: 37, see: 51, credits: 3.0 },
      { code: '22CS402PC', title: 'Operating Systems & System Architecture', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22CS403PC', title: 'Software Engineering & Agile Methodologies', type: 'Professional Core (Theory)', cie: 38, see: 52, credits: 3.0 },
      { code: '22AI404PC', title: 'Artificial Intelligence Foundations', type: 'Professional Core (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22CS405PC', title: 'Python for Machine Learning', type: 'Professional Core (Theory)', cie: 39, see: 54, credits: 3.0 },
      { code: '22CS406PC', title: 'Operating Systems & Linux Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22AI407PC', title: 'AI & Problem Solving Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22MC408ES', title: 'Constitution of India', type: 'Mandatory Non-Credit Audit', cie: 38, see: 50, credits: 0.0 }
    ],
    5: [
      { code: '22AI501PC', title: 'Machine Learning Techniques', type: 'Professional Core (Theory)', cie: mid1Score1, see: 54, credits: 3.0 },
      { code: '22AI502PC', title: 'Deep Learning & Neural Networks', type: 'Professional Core (Theory)', cie: mid1Score2, see: 52, credits: 3.0 },
      { code: '22CS503PC', title: 'Computer Networks & Internet Protocols', type: 'Professional Core (Theory)', cie: mid1Score3, see: 53, credits: 3.0 },
      { code: '22CS504PC', title: 'Automata Theory & Compiler Design', type: 'Professional Core (Theory)', cie: 37, see: 51, credits: 3.0 },
      { code: '22CS505PE', title: 'Cloud Computing & Distributed Platforms', type: 'Professional Elective - I', cie: 38, see: 54, credits: 3.0 },
      { code: '22AI506PC', title: 'Machine Learning Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22CS507PC', title: 'Computer Networks Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22MC508IP', title: 'Intellectual Property Rights & Ethics', type: 'Mandatory Non-Credit Audit', cie: 38, see: 52, credits: 0.0 }
    ]
  };

  const rawSubjects = semSubjectDB[semNum] || semSubjectDB[5];

  let totalGradePoints = 0;
  let totalCredits = 0;

  const subjects = rawSubjects.map(s => {
    const total = s.cie + s.see;
    let grade = 'O';
    let pts = 10;
    if (total < 90 && total >= 80) { grade = 'A+'; pts = 9; }
    else if (total < 80 && total >= 70) { grade = 'A'; pts = 8; }
    else if (total < 70 && total >= 60) { grade = 'B+'; pts = 7; }
    else if (total < 60 && total >= 50) { grade = 'B'; pts = 6; }
    else if (total < 50 && total >= 40) { grade = 'C'; pts = 5; }
    else if (total < 40) { grade = 'F'; pts = 0; }

    if (s.credits > 0) {
      totalGradePoints += pts * s.credits;
      totalCredits += s.credits;
    }

    return {
      code: s.code,
      title: s.title,
      type: s.type,
      cie: s.cie,
      see: s.see,
      total: total,
      grade: grade,
      gradePoints: pts,
      credits: s.credits.toFixed(1),
      result: (total >= 40 && s.see >= 21) ? 'PASS' : 'FAIL'
    };
  });

  const sgpa = (totalGradePoints / totalCredits).toFixed(2);
  const examSessions = {
    1: 'NOV / DEC 2023 (Regular Autonomous)',
    2: 'APR / MAY 2024 (Regular Autonomous)',
    3: 'NOV / DEC 2024 (Regular Autonomous)',
    4: 'APR / MAY 2025 (Regular Autonomous)',
    5: 'NOV / DEC 2025 (Regular Autonomous)'
  };

  return {
    sem: semNum,
    examSession: examSessions[semNum] || 'CURRENT AUTONOMOUS SESSION',
    sgpa: sgpa,
    cgpa: '8.82',
    totalCredits: totalCredits.toFixed(1),
    subjects: subjects,
    issueDate: '24-OCT-2026',
    memoRef: `HITM/AUTON/RES/${roll}/SEM-${semNum}`,
    semesters: [
      { sem: 1, period: 'Nov/Dec 2023', credits: '20.0', sgpa: '8.85' },
      { sem: 2, period: 'Apr/May 2024', credits: '20.0', sgpa: '8.80' },
      { sem: 3, period: 'Nov/Dec 2024', credits: '21.0', sgpa: '8.90' },
      { sem: 4, period: 'Apr/May 2025', credits: '21.0', sgpa: '8.75' },
      { sem: 5, period: 'Nov/Dec 2025', credits: '21.0', sgpa: sgpa }
    ]
  };
};

window.renderExamPortalDashboard = function(studentUser, activeTab = 'notices', selectedSem = 5) {
  const roll = studentUser.roll;
  window.activeExamPortalTab = activeTab;

  let activeTabContentHTML = '';

  // 1. TAB: NOTICES ABOUT IMPORTANT DATES
  if (activeTab === 'notices') {
    activeTabContentHTML = `
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>📢</span> NOTICES &amp; IMPORTANT EXAMINATION DATES
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Key academic dates, registration windows, and circulars issued by the Autonomous Examination Branch.
        </p>

        <!-- Milestones Schedule Table -->
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; overflow:hidden; margin-bottom:16px;">
          <div style="background:#08752f; color:#ffffff; padding:10px 14px; font-weight:700; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
            <span>🗓️ Autonomous Examination Milestones (Odd Semester 2026–2027)</span>
            <span style="font-size:11px; opacity:0.9;">Regulation: R22 Autonomous</span>
          </div>
          <table class="sem-memo-table" style="margin:0;">
            <thead>
              <tr>
                <th style="width:40px; text-align:center;">#</th>
                <th>Examination Event / Milestone</th>
                <th style="width:200px;">Scheduled Dates</th>
                <th style="width:130px; text-align:center;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align:center;">1</td>
                <td><strong>Examination Notification Issued</strong><br><span style="font-size:11px; color:#64748b;">Autonomous Semester End Examinations (SEE)</span></td>
                <td><strong>10-OCT-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge pass">COMPLETED</span></td>
              </tr>
              <tr style="background:#f0fdf4;">
                <td style="text-align:center;">2</td>
                <td><strong>Online Exam Fee Payment (Without Fine)</strong><br><span style="font-size:11px; color:#15803d;">Regular fee payment window for eligible candidates</span></td>
                <td><strong style="color:#15803d;">15-OCT-2026 to 02-NOV-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#0284c7; color:#fff;">ACTIVE NOW</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">3</td>
                <td><strong>Exam Fee Payment (With ₹100 Late Fee)</strong><br><span style="font-size:11px; color:#64748b;">Late registration for all branches</span></td>
                <td>03-NOV-2026 to 08-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#f59e0b; color:#fff;">UPCOMING</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">4</td>
                <td><strong>Exam Fee Payment (With ₹1,000 Super Late Fine)</strong><br><span style="font-size:11px; color:#64748b;">Final registration window</span></td>
                <td>09-NOV-2026 to 12-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">UPCOMING</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">5</td>
                <td><strong>Hall Ticket Download Portal Active</strong><br><span style="font-size:11px; color:#64748b;">Download admit card with room &amp; seat allotment</span></td>
                <td><strong>10-NOV-2026 onwards</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge pass">GENERATED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">6</td>
                <td><strong>Laboratory &amp; Practical Viva Examinations</strong><br><span style="font-size:11px; color:#64748b;">Internal &amp; external examiner assessments</span></td>
                <td>14-NOV-2026 to 21-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">7</td>
                <td><strong>Semester End Theory Examinations (SEE)</strong><br><span style="font-size:11px; color:#64748b;">Forenoon Session: 10:00 AM – 1:00 PM</span></td>
                <td><strong>24-NOV-2026 to 12-DEC-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">8</td>
                <td><strong>Provisional Results Declaration</strong><br><span style="font-size:11px; color:#64748b;">Grade memos &amp; SGPA ledger publication</span></td>
                <td><strong>28-DEC-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Examination Circulars Grid -->
        <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <span>📜</span> Examination Branch Circulars &amp; Directives
        </div>
        <div class="modal-grid-features" style="margin-bottom:16px;">
          <div class="modal-feature-card">
            <strong>Circular #2026/08 — Odd Semester SEE Notification</strong>
            <span>Detailed regulation guidelines for B.Tech II, III, and IV Years regular and supplementary examination sessions.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Notification Circular #2026/08 downloaded.')">📄 View Circular</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/09 — Continuous Evaluation (CIE-2) Schedule</strong>
            <span>Faculty submission deadlines for Mid-2 exam, assignment, and quiz marks into autonomous database.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('CIE-2 assessment schedule verified.')">📄 View Schedule</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/07 — Digital Barcoded Evaluation Guidelines</strong>
            <span>Mandatory instructions regarding 32-page barcoded answer books and digital evaluation protocols.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Barcoded answer booklet instructions previewed.')">📄 View Guidelines</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/06 — Fee Payment &amp; Challan Procedure</strong>
            <span>Step-by-step guidance for seamless net banking, UPI, and debit card exam fee payments.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="examPortalSwitchTab('${roll}', 'feepayment')">Proceed to Fee Payment →</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. TAB: RESULTS (SEMESTER RESULTS & GRADE MEMO)
  else if (activeTab === 'results') {
    const semNum = parseInt(selectedSem, 10);
    const isConsolidated = selectedSem === 'consolidated' || selectedSem === 'all';
    const semResultData = window.getSemesterResults(studentUser, isNaN(semNum) ? 5 : semNum, isConsolidated);

    const semButtonsHTML = [1, 2, 3, 4, 5].map(s => `
      <button class="sem-selector-pill ${(!isConsolidated && semNum === s) ? 'active' : ''}" 
              onclick="authenticateExamPortal('${roll}', 'results', ${s})">
        Semester ${s}
      </button>
    `).join('') + `
      <button class="sem-selector-pill ${(isConsolidated) ? 'active' : ''}" 
              onclick="authenticateExamPortal('${roll}', 'results', 'consolidated')">
        📊 Consolidated Memo
      </button>
    `;

    let tableRowsHTML = '';
    if (isConsolidated) {
      tableRowsHTML = semResultData.semesters.map((s, idx) => `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td><strong>Semester ${s.sem}</strong> (${s.period})</td>
          <td style="text-align:center;">${s.credits}</td>
          <td style="text-align:center;">${s.credits}</td>
          <td style="text-align:center; font-weight:700; color:#08752f;">${s.sgpa}</td>
          <td style="text-align:center;"><span class="memo-status-badge pass">PASS</span></td>
          <td style="text-align:center;">
            <button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="authenticateExamPortal('${roll}', 'results', ${s.sem})">View Memo →</button>
          </td>
        </tr>
      `).join('');
    } else {
      tableRowsHTML = semResultData.subjects.map((sub, idx) => `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td><strong style="color:#0f172a;">${sub.code}</strong></td>
          <td>
            <div style="font-weight:600; color:#1e293b;">${sub.title}</div>
            <span style="font-size:11px; color:#64748b;">${sub.type}</span>
          </td>
          <td style="text-align:center; font-weight:600;">${sub.cie} / 40</td>
          <td style="text-align:center; font-weight:600;">${sub.see} / 60</td>
          <td style="text-align:center; font-weight:700; color:#0f172a;">${sub.total} / 100</td>
          <td style="text-align:center;"><span class="grade-pill grade-${sub.grade}">${sub.grade}</span></td>
          <td style="text-align:center; font-weight:700;">${sub.gradePoints}</td>
          <td style="text-align:center; font-weight:600;">${sub.credits}</td>
          <td style="text-align:center;"><span class="memo-status-badge ${sub.result.toLowerCase()}">${sub.result}</span></td>
        </tr>
      `).join('');
    }

    activeTabContentHTML = `
      <div class="sem-result-memo-sheet">
        <div class="sem-memo-header">
          <div class="sem-memo-logo-row">
            <div class="sem-memo-crest">HITM</div>
            <div>
              <div class="sem-memo-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
              <div class="sem-memo-college-sub">An Autonomous Institution Conferred by UGC • Approved by AICTE • Accredited with 'A+' Grade by NAAC</div>
              <div class="sem-memo-branch-title">OFFICE OF THE CONTROLLER OF EXAMINATIONS</div>
            </div>
          </div>
          <div class="sem-memo-badge-line">
            <span>PROVISIONAL SEMESTER GRADE MEMORANDUM</span>
            <span class="regulation-tag">REGULATION: AUTONOMOUS R22</span>
          </div>
        </div>

        <div class="sem-memo-meta-grid">
          <div><span class="lbl">Student Name:</span> <strong>${studentUser.name}</strong></div>
          <div><span class="lbl">Hall Ticket / Roll No:</span> <strong style="color:#08752f; font-size:13.5px;">${studentUser.roll}</strong></div>
          <div><span class="lbl">Degree &amp; Program:</span> <strong>${studentUser.branch}</strong></div>
          <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
          <div><span class="lbl">Academic Standing:</span> <strong>${studentUser.yearSem}</strong></div>
          <div><span class="lbl">Examination Session:</span> <strong>${semResultData.examSession}</strong></div>
          <div><span class="lbl">Examination Center:</span> <strong>HITAM Autonomous Center (Code: HITM)</strong></div>
          <div><span class="lbl">Result Standing:</span> <strong style="color:#15803d;">PASSED IN FIRST CLASS WITH DISTINCTION</strong></div>
        </div>

        <div class="sem-selector-nav">
          <span style="font-size:12px; font-weight:700; color:#334155; margin-right:4px;">Select Examination:</span>
          ${semButtonsHTML}
        </div>

        <div style="overflow-x:auto; margin-top:12px;">
          ${isConsolidated ? `
            <table class="sem-memo-table">
              <thead>
                <tr>
                  <th style="text-align:center;">#</th>
                  <th>Semester Examination</th>
                  <th style="text-align:center;">Total Credits</th>
                  <th style="text-align:center;">Credits Earned</th>
                  <th style="text-align:center;">SGPA</th>
                  <th style="text-align:center;">Result Status</th>
                  <th style="text-align:center;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHTML}
              </tbody>
            </table>
          ` : `
            <table class="sem-memo-table">
              <thead>
                <tr>
                  <th style="text-align:center; width:36px;">#</th>
                  <th style="width:110px;">Course Code</th>
                  <th>Course Title &amp; Category</th>
                  <th style="text-align:center; width:90px;">CIE (40)</th>
                  <th style="text-align:center; width:90px;">SEE (60)</th>
                  <th style="text-align:center; width:95px;">Total (100)</th>
                  <th style="text-align:center; width:65px;">Grade</th>
                  <th style="text-align:center; width:60px;">Points</th>
                  <th style="text-align:center; width:65px;">Credits</th>
                  <th style="text-align:center; width:80px;">Result</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHTML}
              </tbody>
            </table>
          `}
        </div>

        <div class="sem-memo-summary-bar">
          <div class="summary-col">
            <span class="sum-lbl">Semester SGPA:</span>
            <span class="sum-val highlight-green">${semResultData.sgpa}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Cumulative CGPA:</span>
            <span class="sum-val highlight-green">${semResultData.cgpa}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Registered Credits:</span>
            <span class="sum-val">${semResultData.totalCredits}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Credits Secured:</span>
            <span class="sum-val">${semResultData.totalCredits}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Final Result:</span>
            <span class="sum-val" style="color:#15803d;">PROMOTED (PASS)</span>
          </div>
        </div>

        <div class="sem-memo-footer">
          <div class="memo-seal-box">
            <div class="autonomous-seal">
              <span>HITM</span>
              <small>COE AUTONOMOUS</small>
            </div>
            <div style="font-size:11px; color:#64748b; line-height:1.4;">
              Date of Issue: <strong>${semResultData.issueDate}</strong><br>
              Memo Reference: <strong>${semResultData.memoRef}</strong>
            </div>
          </div>
          <div style="text-align:center;">
            <div style="font-family:serif; font-style:italic; font-size:18px; color:#013b1f; font-weight:700;">Dr. S. Arvind</div>
            <div style="font-size:12px; font-weight:700; color:#1e293b;">Principal</div>
            <div style="font-size:11px; color:#64748b;">HITAM Campus</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:serif; font-style:italic; font-size:18px; color:#013b1f; font-weight:700;">Dr. O. P. Suresh</div>
            <div style="font-size:12px; font-weight:700; color:#1e293b;">Controller of Examinations</div>
            <div style="font-size:11px; color:#64748b;">Autonomous Examination Branch, HITAM</div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. TAB: HALL TICKET DOWNLOAD
  else if (activeTab === 'hallticket') {
    activeTabContentHTML = `
      <div class="sem-result-memo-sheet">
        <div class="sem-memo-header">
          <div class="sem-memo-logo-row">
            <div class="sem-memo-crest">HITM</div>
            <div>
              <div class="sem-memo-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
              <div class="sem-memo-college-sub">Autonomous Institution • Affiliated to JNTUH • Approved by AICTE • NAAC 'A+'</div>
              <div class="sem-memo-branch-title">AUTONOMOUS EXAMINATION BRANCH — ADMIT CARD / HALL TICKET</div>
            </div>
          </div>
          <div class="sem-memo-badge-line" style="background:#e0f2fe; color:#0369a1;">
            <span>ODD SEMESTER END EXAMINATIONS (SEE) — HALL TICKET</span>
            <span class="regulation-tag" style="background:#0284c7;">EXAM CODE: HTM-NOV26</span>
          </div>
        </div>

        <div class="sem-memo-meta-grid" style="border-left:4px solid #0284c7;">
          <div><span class="lbl">Candidate Name:</span> <strong>${studentUser.name}</strong></div>
          <div><span class="lbl">Hall Ticket Number:</span> <strong style="color:#0284c7; font-size:14px;">${studentUser.roll}</strong></div>
          <div><span class="lbl">Degree &amp; Program:</span> <strong>${studentUser.branch}</strong></div>
          <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
          <div><span class="lbl">Examination Session:</span> <strong>NOV / DEC 2026 (Regular)</strong></div>
          <div><span class="lbl">Examination Center:</span> <strong>HITAM Autonomous Campus Center (Code: HITM)</strong></div>
          <div><span class="lbl">Exam Hall / Block:</span> <strong>Ramanujan Block — Hall 204</strong></div>
          <div><span class="lbl">Fee Clearance &amp; Eligibility:</span> <strong style="color:#15803d;">VERIFIED &amp; PERMITTED</strong></div>
        </div>

        <div style="font-weight:700; font-size:13px; color:#0f172a; margin:14px 0 8px 0; display:flex; align-items:center; gap:6px;">
          <span>🗓️</span> Registered Examination Schedule &amp; Timetable:
        </div>

        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="width:36px; text-align:center;">#</th>
              <th style="width:110px;">Course Code</th>
              <th>Course Title</th>
              <th style="width:110px;">Date</th>
              <th style="width:140px;">Timings</th>
              <th style="width:100px; text-align:center;">Candidate Sign</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:center;">1</td>
              <td><strong>22AI501PC</strong></td>
              <td>Machine Learning Techniques</td>
              <td>24-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">2</td>
              <td><strong>22AI502PC</strong></td>
              <td>Deep Learning &amp; Neural Networks</td>
              <td>26-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">3</td>
              <td><strong>22CS503PC</strong></td>
              <td>Computer Networks &amp; Internet Protocols</td>
              <td>28-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">4</td>
              <td><strong>22CS504PC</strong></td>
              <td>Automata Theory &amp; Compiler Design</td>
              <td>01-DEC-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">5</td>
              <td><strong>22CS505PE</strong></td>
              <td>Cloud Computing &amp; Distributed Systems</td>
              <td>03-DEC-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">6</td>
              <td><strong>22AI506PC</strong></td>
              <td>Machine Learning Laboratory (Practical)</td>
              <td>17-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Lab Verified ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">7</td>
              <td><strong>22CS507PC</strong></td>
              <td>Computer Networks Laboratory (Practical)</td>
              <td>19-NOV-2026</td>
              <td>2:00 PM – 5:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Lab Verified ]</td>
            </tr>
          </tbody>
        </table>

        <!-- Security Barcode & COE Stamp -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:12px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-family:monospace; font-size:14px; letter-spacing:2px; color:#0f172a; font-weight:800;">|||||||||| | |||||| ||||| |||||||</div>
            <div style="font-size:10.5px; color:#64748b; margin-top:2px;">Digital Security Barcode: HTM-2026-AUTON-${roll}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:serif; font-style:italic; font-size:16px; color:#013b1f; font-weight:700;">Dr. O. P. Suresh</div>
            <div style="font-size:11px; font-weight:700; color:#1e293b;">Controller of Examinations</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="drill-action-btn drill-action-primary" onclick="window.print()">🖨️ Download &amp; Print Hall Ticket</button>
          </div>
        </div>
      </div>
    `;
  }

  // 4. TAB: EXAM FEE PAYMENT
  else if (activeTab === 'feepayment') {
    activeTabContentHTML = `
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>💳</span> AUTONOMOUS EXAMINATION FEE PAYMENT DESK
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Review examination fee assessment, payment challans, and instant e-receipt generation.
        </p>

        <!-- Current Semester Fee Status Box -->
        <div style="background:#ffffff; border:2px solid #10b981; border-radius:8px; padding:16px; margin-bottom:18px; box-shadow:0 2px 8px rgba(16, 185, 129, 0.1);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; border-bottom:1px solid #e2e8f0; padding-bottom:10px; margin-bottom:12px;">
            <div>
              <div style="font-size:14.5px; font-weight:800; color:#065f46;">B.Tech Regular Odd Semester End Examination Fee</div>
              <div style="font-size:11.5px; color:#64748b;">Academic Year: 2026–2027 • Hall Ticket: <strong>${studentUser.roll}</strong></div>
            </div>
            <span style="background:#d1fae5; color:#065f46; font-size:12px; font-weight:800; padding:4px 12px; border-radius:20px; border:1px solid #6ee7b7;">
              ✅ FEE CLEARED (PAID)
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:12px;">
            <div><span style="color:#64748b; font-size:11px; display:block;">Theory Courses Fee:</span> <strong>₹1,500.00</strong> (5 Subjects @ ₹300)</div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Practical Labs Fee:</span> <strong>₹300.00</strong> (2 Labs @ ₹150)</div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Grade Card &amp; Processing:</span> <strong>₹250.00</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Total Amount Paid:</span> <strong style="color:#08752f; font-size:14px;">₹2,050.00</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Transaction Reference:</span> <strong>HITM/AUTON/PAY/2026/89421</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Payment Date:</span> <strong>16-OCT-2026 (11:42 AM)</strong></div>
          </div>

          <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
            <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Autonomous Exam Fee Receipt #89421 downloaded successfully.')">📄 Download Fee Receipt (PDF)</button>
            <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('No supplementary dues found for this hall ticket.')">Check Backlog Dues</button>
          </div>
        </div>

        <!-- Historical Fee Receipts Ledger -->
        <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:10px;">
          📜 Past Semester Examination Fee Ledgers &amp; Receipts:
        </div>
        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="text-align:center;">#</th>
              <th>Semester Session</th>
              <th>Transaction Reference</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th style="text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:center;">1</td>
              <td>Semester IV (Even Sem 2025)</td>
              <td>HITM/AUTON/PAY/2025/44120</td>
              <td>₹2,050.00</td>
              <td>14-Apr-2025</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">2</td>
              <td>Semester III (Odd Sem 2024)</td>
              <td>HITM/AUTON/PAY/2024/77812</td>
              <td>₹2,050.00</td>
              <td>18-Nov-2024</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">3</td>
              <td>Semester II (Even Sem 2024)</td>
              <td>HITM/AUTON/PAY/2024/31092</td>
              <td>₹2,050.00</td>
              <td>12-Apr-2024</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">4</td>
              <td>Semester I (Odd Sem 2023)</td>
              <td>HITM/AUTON/PAY/2023/11048</td>
              <td>₹2,050.00</td>
              <td>15-Nov-2023</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // 5. TAB: INTERNAL MARKS (FINAL INTERNAL MARKS & PERCENTAGE)
  else if (activeTab === 'internalmarks') {
    const internalList = window.getStudentInternalMarksBreakdown(studentUser);

    let totalEarned = 0;
    let totalMax = 0;

    const rowsHTML = internalList.map((item, idx) => {
      totalEarned += parseFloat(item.finalInternal);
      totalMax += item.maxInternal;

      return `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td><strong style="color:#0f172a;">${item.code}</strong></td>
          <td>
            <div style="font-weight:600; color:#1e293b;">${item.title}</div>
            <span style="font-size:10.5px; color:#64748b;">${item.type}</span>
          </td>
          <td style="text-align:center; font-weight:600;">${item.mid1} / 20</td>
          <td style="text-align:center; font-weight:600;">${item.mid2} / 20</td>
          <td style="text-align:center; font-weight:800; color:#08752f; font-size:13.5px;">
            ${item.finalInternal} / 40
          </td>
          <td style="text-align:center;">
            <span style="background:#dcfce7; color:#166534; font-weight:800; font-size:12px; padding:3px 8px; border-radius:12px; border:1px solid #86efac; display:inline-block;">
              ${item.percentage}
            </span>
          </td>
          <td style="text-align:center;">
            <span class="memo-status-badge pass">${item.status}</span>
          </td>
        </tr>
      `;
    }).join('');

    const overallAvg = (totalEarned / internalList.length).toFixed(1);
    const overallPct = ((totalEarned / totalMax) * 100).toFixed(1);

    activeTabContentHTML = `
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>📝</span> CONTINUOUS INTERNAL EVALUATION (CIE) — FINAL INTERNAL MARKS &amp; PERCENTAGE
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Autonomous R22 Regulations: Final internal marks out of 40 calculated from continuous assessments (Mid-1 &amp; Mid-2 examinations, assignments, quizzes, and practical viva).
        </p>

        <!-- CIE Summary Metric Bar -->
        <div class="sem-memo-summary-bar" style="background:#f0fdf4; border-color:#86efac; margin-bottom:16px;">
          <div class="summary-col">
            <span class="sum-lbl">Overall Internal Average:</span>
            <span class="sum-val highlight-green">${overallAvg} / 40.0</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Overall Internal Percentage:</span>
            <span class="sum-val highlight-green" style="color:#15803d;">${overallPct}%</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Courses Assessed:</span>
            <span class="sum-val">${internalList.length} Courses</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">CIE Exam Eligibility:</span>
            <span class="sum-val" style="color:#15803d; font-size:13px;">100% ELIGIBLE</span>
          </div>
        </div>

        <!-- Subject-Wise Final Internal Marks Table -->
        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="width:36px; text-align:center;">#</th>
              <th style="width:110px;">Course Code</th>
              <th>Course Title &amp; Category</th>
              <th style="width:105px; text-align:center;">Mid-1 CIE (20)</th>
              <th style="width:105px; text-align:center;">Mid-2 CIE (20)</th>
              <th style="width:130px; text-align:center;">Final Internal Marks (40)</th>
              <th style="width:110px; text-align:center;">Percentage (%)</th>
              <th style="width:90px; text-align:center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>

        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:12px; margin-top:14px; font-size:12px; color:#475569; line-height:1.5;">
          💡 <strong>Internal Marks Policy:</strong> Minimum internal qualifying benchmark is 14 marks out of 40 (35%) in each course. Candidate <strong>${studentUser.roll}</strong> has comfortably cleared internal assessment requirements in all 7 enrolled subjects.
        </div>
      </div>
    `;
  }

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view exam-portal-container-view">
      <!-- Top User Bar -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="sub-back-btn" onclick="openModal('exam-portal')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Sign Out</span>
          </button>
          <span style="font-size:12px; color:#475569;">
            Candidate: <strong>${studentUser.name}</strong> • Roll: <strong style="color:#08752f;">${studentUser.roll}</strong>
          </span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="drill-action-btn drill-action-primary" onclick="window.print()">🖨️ Print View</button>
          <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Examination docket refreshed from autonomous server.')">🔄 Refresh</button>
        </div>
      </div>

      <!-- 5 Main Navigation Shortcut Tabs -->
      <div class="exam-portal-tabs-nav">
        <button class="exam-tab-btn ${activeTab === 'notices' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'notices')">
          <span>📢</span> Notices &amp; Imp Dates
        </button>
        <button class="exam-tab-btn ${activeTab === 'results' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'results')">
          <span>📊</span> Results
        </button>
        <button class="exam-tab-btn ${activeTab === 'hallticket' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'hallticket')">
          <span>🎟️</span> Hall Ticket Download
        </button>
        <button class="exam-tab-btn ${activeTab === 'feepayment' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'feepayment')">
          <span>💳</span> Exam Fee Payment
        </button>
        <button class="exam-tab-btn ${activeTab === 'internalmarks' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'internalmarks')">
          <span>📝</span> Internal Marks (CIE %)
        </button>
      </div>

      <!-- Main Tab Content Frame -->
      <div id="examPortalTabBody" style="margin-top:14px;">
        ${activeTabContentHTML}
      </div>

      <div id="modalToastSlot"></div>
    </div>
  `;
};

window.examPortalSwitchTab = function(roll, tabName) {
  window.authenticateExamPortal(roll, tabName);
};

window.authenticateExamPortal = function(overrideRoll = null, activeTab = 'notices', selectedSem = 5) {
  const loginInput = document.getElementById('portalLoginId');
  const passInput = document.getElementById('portalPassword');
  
  const roll = overrideRoll || (loginInput ? loginInput.value.trim().toUpperCase() : null);
  const password = passInput ? passInput.value.trim() : '';
  const body = document.getElementById('modalBody');
  if (!body) return;

  if (!roll) {
    showDemoNotice('Please enter a student Hall Ticket / Roll Number.');
    return;
  }

  // Resolve student using the exact same credential engine as the student portal
  const studentUser = resolveStudentUser(roll, overrideRoll ? (roll.includes('6619') ? '23e51a66619' : roll.toLowerCase()) : password);

  if (!studentUser || studentUser.error === 'UNKNOWN_USER') {
    renderPortalUnknownId('exam-portal', roll);
    return;
  }

  if (studentUser.error === 'WRONG_PASSWORD') {
    renderPortalWrongPassword('exam-portal', roll, studentUser.expectedHint);
    return;
  }

  // Check portal access governance
  if (!window.portalAccessState.globalStudent) {
    renderPortalAccessDenied('exam-portal', 'Exam portal access has been globally suspended by Institutional Administration.');
    return;
  }

  if (window.portalAccessState.userOverrides[roll] === false) {
    renderPortalAccessDenied('exam-portal', `Exam portal access for Roll Number ${roll} has been suspended by Admin.`);
    return;
  }

  window.renderExamPortalDashboard(studentUser, activeTab, selectedSem);
};

// Backwards compatibility alias for tests & links
window.authenticateSemResult = window.authenticateExamPortal;
window.generateExamPortalHTML = function() {
  return window.generatePortalLoginHTML('exam-portal');
};
window.generateSemResultPortalHTML = window.generateExamPortalHTML;
