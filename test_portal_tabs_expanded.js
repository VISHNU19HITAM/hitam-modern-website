// scratch/test_portal_tabs_expanded.js
const fs = require('fs');

function makeElement(id = '') {
  return {
    id: id,
    innerHTML: '',
    innerText: '',
    textContent: '',
    value: '',
    style: {},
    classList: {
      _classes: new Set(),
      contains(cls) { return this._classes.has(cls); },
      add(cls) { this._classes.add(cls); },
      remove(cls) { this._classes.delete(cls); }
    },
    setAttribute() {},
    getAttribute() { return null; },
    appendChild() {},
    focus() {},
    remove() {}
  };
}

global.window = global;
global.document = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = makeElement(id);
    }
    return this.elements[id];
  },
  createElement(tag) {
    return makeElement(tag);
  },
  querySelectorAll() { return []; },
  querySelector() { return null; },
  addEventListener() {},
  body: makeElement('body')
};

global.showToast = function(msg) {};
global.showDemoNotice = function(msg) {};
global.openModal = function(key) {};

// Load js/main.js
const code = fs.readFileSync('js/main.js', 'utf8');
eval(code);

console.log('=== STARTING EXPANDED PORTALS & TABS TEST SUITE ===\n');

let passes = 0;
let fails = 0;

function assert(condition, message) {
  if (condition) {
    console.log('  [PASS]', message);
    passes++;
  } else {
    console.error('  [FAIL]', message);
    fails++;
  }
}

// 1. ADMIN LOGINS & ACCESS CONTROL
console.log('--- 1. Testing Admin Logins & Governance ---');
['ADMINHTM01', 'ADMINHTM02', 'ADMINHTM03'].forEach(admId => {
  document.getElementById('portalLoginId').value = admId;
  document.getElementById('portalPassword').value = admId === 'ADMINHTM01' ? 'AdminHtm01' : (admId === 'ADMINHTM02' ? 'AdminHtm02' : 'AdminHtm03');
  window.authenticatePortal('admin');
  const body = document.getElementById('modalBody').innerHTML;
  assert(body.includes(admId), `Admin ${admId} signed in successfully`);
  assert(body.includes('Portal Access Control &amp; Permissions Manager'), `Admin ${admId} sees Access Control Manager`);
});

// 2. FACULTY LOGINS FOR ALL BRANCHES
console.log('\n--- 2. Testing Faculty Logins Across Branches ---');
const testFacultyAccounts = [
  { id: 'CSEHOD', pass: 'Csehod01', dept: 'CSE' },
  { id: 'CSE01', pass: 'Csefaculty', dept: 'CSE' },
  { id: 'CSMHOD', pass: 'Csmhod01', dept: 'CSM' },
  { id: 'CSM01', pass: 'Csmfaculty', dept: 'CSM' },
  { id: 'ECEHOD', pass: 'Ecehod01', dept: 'ECE' },
  { id: 'ECE01', pass: 'Ecefaculty', dept: 'ECE' }
];

testFacultyAccounts.forEach(acc => {
  document.getElementById('portalLoginId').value = acc.id;
  document.getElementById('portalPassword').value = acc.pass;
  window.authenticatePortal('faculty');
  const body = document.getElementById('modalBody').innerHTML;
  assert(body.includes(acc.id), `Faculty ${acc.id} signed in successfully`);
  assert(body.includes('Attendance (All Branches &amp; Years)'), `Faculty ${acc.id} sees Attendance tab`);
  assert(body.includes('Upload Marks (ciea1..3, cieb1..3)'), `Faculty ${acc.id} sees Upload Marks tab`);
});

// 3. FACULTY TABS INTERACTION
console.log('\n--- 3. Testing Faculty Tabs & Operations ---');
document.getElementById('portalLoginId').value = 'CSEHOD';
document.getElementById('portalPassword').value = 'Csehod01';
window.authenticatePortal('faculty');

// Tab 1: Attendance
window.facultySwitchTab('attendance', 'CSEHOD');
let body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Multi-Branch Class Attendance Register'), 'Attendance tab rendered');
assert(body.includes('facFilterBranch') && body.includes('facFilterYear') && body.includes('facFilterSec'), 'Attendance filters present');

// Test Attendance toggle & Mark All
window.facultyMarkAllAttendance(true, 'CSEHOD');
window.facultySaveAttendance('CSEHOD');
assert(true, 'facultyMarkAllAttendance and facultySaveAttendance executed');

// Tab 2: Upload Marks (ciea1, ciea2, ciea3, cieb1, cieb2, cieb3)
window.facultySwitchTab('marks', 'CSEHOD');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Continuous Internal Evaluation (CIE) Marks Upload Desk'), 'Upload Marks tab rendered');
assert(body.includes('ciea1') || body.includes('cieb1'), 'CIE assessment components present');

// Change filter to Section B -> should show cieb1, cieb2, cieb3
window.currentFacultyFilters.section = 'B';
window.currentFacultyFilters.cieAssessment = 'cieb1';
window.facultySwitchTab('marks', 'CSEHOD');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('cieb1'), 'Section B shows cieb1 assessment component');

// Test Save Marks & Analytics
window.facultySaveMarks('CSEHOD');
window.facultyCalculateClassAnalytics('CSEHOD');
window.facultyExportMarksCSV('CSEHOD');
assert(true, 'facultySaveMarks, facultyCalculateClassAnalytics, and facultyExportMarksCSV executed');

// Tab 3: Student Details
window.facultySwitchTab('students', 'CSEHOD');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Student Academic Roster &amp; Profiles'), 'Student Details tab rendered');

// Tab 4: Faculty Details
window.facultySwitchTab('faculty-dir', 'CSEHOD');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Department Faculty Directory &amp; Academic Colleagues'), 'Faculty Details tab rendered');
assert(body.includes('Dr. CSE HOD') && body.includes('Prof. CSE Faculty 01'), 'HOD and faculty members listed in Directory');

// Tab 5: Feedback
window.facultySwitchTab('feedback', 'CSEHOD');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Student Course &amp; Teaching Feedback Analytics'), 'Feedback tab rendered');
assert(body.includes('4.82') && body.includes('Subject Mastery'), 'Feedback ratings score rendered');

// Tab 6: Timetable
window.facultySwitchTab('timetable', 'CSEHOD');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Weekly Faculty Teaching Schedule &amp; Timetable'), 'Faculty Timetable tab rendered');
assert(body.includes('Monday') && body.includes('P1 (09:30 - 10:30)'), 'Timetable days and periods rendered');

// 4. STUDENT LOGINS (Batches 23 to 26)
console.log('\n--- 4. Testing Student Logins Across Batches ---');
const testStudents = [
  { roll: '23E51A6619', pass: '23e51a66619', desc: 'CSM Batch 23' },
  { roll: '24E51A6619', pass: '24e51a6619', desc: 'CSM Batch 24' },
  { roll: '25E51A6619', pass: '25e51a6619', desc: 'CSM Batch 25' },
  { roll: '26E51A6619', pass: '26e51a6619', desc: 'CSM Batch 26' },
  { roll: '23E51A0501', pass: '23e51a0501', desc: 'CSE Batch 23' }
];

testStudents.forEach(st => {
  document.getElementById('portalLoginId').value = st.roll;
  document.getElementById('portalPassword').value = st.pass;
  window.authenticatePortal('student');
  body = document.getElementById('modalBody').innerHTML;
  assert(body.includes(st.roll), `Student ${st.roll} (${st.desc}) signed in successfully`);
  assert(body.includes('Student Details') && body.includes('Attendance') && body.includes('Timetable') && body.includes('Fee Details'), `All student tabs displayed for ${st.roll}`);
});

// 5. STUDENT TABS INTERACTION (23E51A6619)
console.log('\n--- 5. Testing All 8 Student Tabs for 23E51A6619 ---');
const roll = '23E51A6619';
document.getElementById('portalLoginId').value = roll;
document.getElementById('portalPassword').value = '23e51a66619';
window.authenticatePortal('student');

// Tab 1: Student Details
window.studentSwitchTab('details', roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Comprehensive Student Profile'), 'Student Details tab rendered');
assert(body.includes('Dr. CSM HOD') && body.includes('Autonomous R22'), 'Student profile details rendered');

// Hall Ticket View
window.studentShowHallTicket(roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('AUTONOMOUS REGULAR EXAMINATION — ADMIT CARD / HALL TICKET'), 'Autonomous Hall Ticket admit card rendered');
window.authenticatePortal('student', roll);

// Tab 2: Attendance
window.studentSwitchTab('attendance', roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Subject-Wise Attendance Breakdown &amp; Exam Eligibility'), 'Attendance tab rendered');
assert(body.includes('89.4%') && body.includes('Eligible'), 'Attendance rate and eligibility badge rendered');

// Tab 3: Timetable
window.studentSwitchTab('timetable', roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Weekly Student Class Schedule &amp; Timetable'), 'Student Timetable tab rendered');

// Tab 4: Fee Details
window.studentSwitchTab('fees', roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Institutional Fee Ledger &amp; Payment Receipts'), 'Fee Details tab rendered');
assert(body.includes('HTM/REC/2026/04812') && body.includes('₹1,14,500'), 'Fee receipt and balance rendered');

// Tab 5: Marks (CIE)
window.studentSwitchTab('marks', roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Continuous Internal Evaluation (CIE) Marks &amp; GPA Summary'), 'Marks (CIE) tab rendered');
assert(body.includes('cieb1') || body.includes('ciea1'), 'CIE components rendered in Marks tab');

// Tab 6: Feedback
window.studentSwitchTab('feedback', roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Course &amp; Faculty Feedback Submission'), 'Feedback tab rendered');
window.studentSelectRating('q1', 4);
window.studentSubmitFeedback(roll);
assert(true, 'studentSelectRating and studentSubmitFeedback executed');

// Tab 7: Complaints
window.studentSwitchTab('complaints', roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Student Grievance Registration &amp; Redressal Cell'), 'Complaints tab rendered');
document.getElementById('complaintSubject').value = 'Test Wi-Fi connectivity in CSE Block Room 302';
window.studentSubmitComplaint(roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Test Wi-Fi connectivity in CSE Block Room 302'), 'Newly submitted complaint appeared in tracking list');

// Tab 8: Username & Password Change
window.studentSwitchTab('credentials', roll);
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Security Credentials &amp; Password Management'), 'Credentials tab rendered');

// Test updating credentials
document.getElementById('credCurrentPass').value = '23e51a66619';
document.getElementById('credNewPass').value = 'NewSecretPass123';
document.getElementById('credConfirmPass').value = 'NewSecretPass123';
document.getElementById('credAlias').value = 'Aarav_CSM';
window.studentUpdateCredentials(roll);

// Verify that the student can now sign in with the new password!
document.getElementById('portalLoginId').value = roll;
document.getElementById('portalPassword').value = 'NewSecretPass123';
window.authenticatePortal('student');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Student (Aarav_CSM — 23E51A6619)'), 'Student authenticated successfully using NEW password and new alias!');

console.log(`\n=== TEST SUITE COMPLETED: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
