// scratch/test_live_marks_sync_and_privacy.js
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

console.log('=== STARTING LIVE MARKS SYNC & PRIVACY TEST SUITE ===\n');

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

// 1. VERIFY CREDENTIAL PRIVACY IN ALL LOGIN SCREENS
console.log('--- 1. Testing Hidden Credentials on Login Screens ---');
['admin', 'faculty', 'student'].forEach(pType => {
  const loginHTML = window.generatePortalLoginHTML(pType);
  assert(!loginHTML.includes('AdminHtm01'), `Admin credentials hidden in ${pType} login view`);
  assert(!loginHTML.includes('Csehod01'), `Faculty credentials hidden in ${pType} login view`);
  assert(!loginHTML.includes('Csefaculty'), `Faculty credentials hidden in ${pType} login view`);
  assert(!loginHTML.includes('23e51a66619'), `Student credentials hidden in ${pType} login view`);
  assert(!loginHTML.includes('setPortalLoginUser'), `Quick-fill preset buttons removed from ${pType} login view`);
  assert(loginHTML.includes('type="password"'), `Password field properly masked in ${pType} login view`);
  assert(loginHTML.includes('Confidential Credentials Policy'), `Confidential policy displayed in ${pType} login view`);
});

// Test renderPortalWrongPassword does not leak password
window.renderPortalWrongPassword('faculty', 'CSEHOD');
const wrongPassHTML = document.getElementById('modalBody').innerHTML;
assert(!wrongPassHTML.includes('Csehod01'), 'Wrong password error screen does not leak expected password');
assert(wrongPassHTML.includes('Security Notice'), 'Wrong password error screen shows generic security notice');

// 2. VERIFY FACULTIES ACROSS ALL 9 BRANCHES / DEPARTMENTS
console.log('\n--- 2. Testing Faculty Accounts Across All Branches ---');
const branches = ['CSE', 'CSM', 'CSD', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IOT', 'CSO'];
branches.forEach(dept => {
  const hodId = `${dept}HOD`;
  assert(window.facultyUsers[hodId] !== undefined, `HOD account exists for ${dept} (${hodId})`);
  assert(window.facultyUsers[hodId].deptKey === dept, `HOD belongs to ${dept}`);
  
  for (let i = 1; i <= 6; i++) {
    const facId = `${dept}0${i}`;
    assert(window.facultyUsers[facId] !== undefined, `Faculty ${facId} exists in department ${dept}`);
    assert(window.facultyUsers[facId].deptKey === dept, `Faculty ${facId} belongs to ${dept}`);
  }
});

// 3. VERIFY FACULTY ASSESSMENT COMPONENTS (ciea1..3 & cieb1..3)
console.log('\n--- 3. Testing Faculty Assessment Components ---');
document.getElementById('portalLoginId').value = 'CSMHOD';
document.getElementById('portalPassword').value = 'Csmhod01';
window.authenticatePortal('faculty');
window.facultySwitchTab('marks', 'CSMHOD');

let facultyMarksView = document.getElementById('modalBody').innerHTML;
assert(facultyMarksView.includes('value="ciea1"'), 'Assessment option ciea1 (Mid-1 Exam) present');
assert(facultyMarksView.includes('value="cieb1"'), 'Assessment option cieb1 (Mid-1 Assignment) present');
assert(facultyMarksView.includes('value="ciec1"'), 'Assessment option ciec1 (Mid-1 Quiz) present');
assert(facultyMarksView.includes('value="ciea2"'), 'Assessment option ciea2 (Mid-2 Exam) present');
assert(facultyMarksView.includes('value="cieb2"'), 'Assessment option cieb2 (Mid-2 Assignment) present');
assert(facultyMarksView.includes('value="ciec2"'), 'Assessment option ciec2 (Mid-2 Quiz) present');

// 4. TEST LIVE SYNCHRONIZATION: FACULTY UPDATES MARKS -> REFLECTED IN STUDENT PORTAL
console.log('\n--- 4. Testing Live Marks Synchronization (Faculty -> Student) ---');

// Set faculty filters to CSM, Year 23, Section B (where 23E51A6619 is enrolled)
window.currentFacultyFilters.branch = 'CSM';
window.currentFacultyFilters.year = '23';
window.currentFacultyFilters.section = 'B';

// Faculty updates Mid-1 components for 23E51A6619
window.currentFacultyFilters.cieAssessment = 'ciea1';
window.facultySwitchTab('marks', 'CSMHOD');
document.getElementById('marks_23E51A6619').value = '25';
window.facultySaveMarks('CSMHOD');

window.currentFacultyFilters.cieAssessment = 'cieb1';
window.facultySwitchTab('marks', 'CSMHOD');
document.getElementById('marks_23E51A6619').value = '24';
window.facultySaveMarks('CSMHOD');

window.currentFacultyFilters.cieAssessment = 'ciec1';
window.facultySwitchTab('marks', 'CSMHOD');
document.getElementById('marks_23E51A6619').value = '23';
window.facultySaveMarks('CSMHOD');

// Faculty updates Mid-2 components for 23E51A6619
window.currentFacultyFilters.cieAssessment = 'ciea2';
window.facultySwitchTab('marks', 'CSMHOD');
document.getElementById('marks_23E51A6619').value = '22';
window.facultySaveMarks('CSMHOD');

window.currentFacultyFilters.cieAssessment = 'cieb2';
window.facultySwitchTab('marks', 'CSMHOD');
document.getElementById('marks_23E51A6619').value = '25';
window.facultySaveMarks('CSMHOD');

window.currentFacultyFilters.cieAssessment = 'ciec2';
window.facultySwitchTab('marks', 'CSMHOD');
document.getElementById('marks_23E51A6619').value = '24';
window.facultySaveMarks('CSMHOD');

const syncedMarks = window.getStudentMarks('23E51A6619');
assert(syncedMarks.ciea1 === 25, 'window.studentMarksDB updated ciea1 to 25');
assert(syncedMarks.cieb1 === 24, 'window.studentMarksDB updated cieb1 to 24');
assert(syncedMarks.ciec1 === 23, 'window.studentMarksDB updated ciec1 to 23');
assert(syncedMarks.ciea2 === 22, 'window.studentMarksDB updated ciea2 to 22');
assert(syncedMarks.cieb2 === 25, 'window.studentMarksDB updated cieb2 to 25');
assert(syncedMarks.ciec2 === 24, 'window.studentMarksDB updated ciec2 to 24');

// Now sign in as Student 23E51A6619
document.getElementById('portalLoginId').value = '23E51A6619';
document.getElementById('portalPassword').value = '23e51a66619';
window.authenticatePortal('student');

// Check Header: Photo removed & Badge present
const studentHeaderHTML = document.getElementById('modalBody').innerHTML;
assert(!studentHeaderHTML.includes('assets/student-profile.png'), 'Personal photo completely removed from Student Portal');
assert(studentHeaderHTML.includes('Autonomous Student'), 'Autonomous Student badge rendered in header');

// Check Details Tab: Info (Bio-Data) + Academic Performance with live sync
window.studentSwitchTab('details', '23E51A6619');
const detailsHTML = document.getElementById('modalBody').innerHTML;
assert(detailsHTML.includes('BIO-DATA &amp; STUDENT INFORMATION'), 'Bio-Data & Student Information rendered');
assert(detailsHTML.includes('ACADEMIC PERFORMANCE SUMMARY &amp; CIE EVALUATION'), 'Academic Performance Summary rendered');
assert(detailsHTML.includes('25/25') && detailsHTML.includes('ciea1'), 'Live updated ciea1 (25/25) displayed in Details performance card');
assert(detailsHTML.includes('24/25') && detailsHTML.includes('cieb1'), 'Live updated cieb1 (24/25) displayed in Details performance card');
assert(detailsHTML.includes('Past Semester Results History'), 'Semester history table rendered in Details tab');

// Check Marks Tab: Full Mid-1 & Mid-2 components breakdown
window.studentSwitchTab('marks', '23E51A6619');
const marksHTML = document.getElementById('modalBody').innerHTML;
assert(marksHTML.includes('25 / 25') && marksHTML.includes('ciea1 (Exam)'), 'Marks tab displays ciea1 = 25/25');
assert(marksHTML.includes('24 / 25') && marksHTML.includes('cieb1 (Assignment)'), 'Marks tab displays cieb1 = 24/25');
assert(marksHTML.includes('23 / 25') && marksHTML.includes('ciec1 (Quiz / Viva)'), 'Marks tab displays ciec1 = 23/25');
assert(marksHTML.includes('22 / 25') && marksHTML.includes('ciea2 (Exam)'), 'Marks tab displays ciea2 = 22/25');
assert(marksHTML.includes('25 / 25') && marksHTML.includes('cieb2 (Assignment)'), 'Marks tab displays cieb2 = 25/25');
assert(marksHTML.includes('24 / 25') && marksHTML.includes('ciec2 (Quiz / Viva)'), 'Marks tab displays ciec2 = 24/25');

console.log(`\n=== SUITE COMPLETED: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
