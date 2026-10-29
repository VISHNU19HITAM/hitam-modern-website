const fs = require('fs');

function makeElement(id = '') {
  return {
    id: id, innerHTML: '', innerText: '', textContent: '', value: '', style: {},
    classList: { _classes: new Set(), contains(c) { return this._classes.has(c); }, add(c) { this._classes.add(c); }, remove(c) { this._classes.delete(c); } },
    setAttribute() {}, getAttribute() { return null; }, appendChild() {}, focus() {}, remove() {}
  };
}

global.window = global;
global.document = {
  elements: {},
  getElementById(id) { if (!this.elements[id]) this.elements[id] = makeElement(id); return this.elements[id]; },
  createElement(tag) { return makeElement(tag); },
  querySelectorAll() { return []; }, querySelector() { return null; }, addEventListener() {}, body: makeElement('body')
};

global.showToast = function(msg) {};
global.showDemoNotice = function(msg) {};
global.openModal = function(key) {};

eval(fs.readFileSync('js/main.js', 'utf8'));

console.log('=== VERIFYING FINAL HITAM ERP PORTAL IMPLEMENTATION ===\n');

let passes = 0;
let fails = 0;

function assert(cond, msg) {
  if (cond) { console.log('  [PASS]', msg); passes++; }
  else { console.error('  [FAIL]', msg); fails++; }
}

// 1. Verify Student Profile Photo
assert(fs.existsSync('assets/student-profile.png'), 'Real student profile photo exists at assets/student-profile.png');

// 2. Authenticate Vishnu 23E51A6619
document.getElementById('portalLoginId').value = '23E51A6619';
document.getElementById('portalPassword').value = '23e51a66619';
window.authenticatePortal('student');

const body = document.getElementById('modalBody').innerHTML;

// Header checks matching reference screenshot
assert(body.includes('hitam-erp-header'), 'HITAM ERP header rendered');
assert(body.includes('Counselling Code : <strong>HITM</strong>'), 'Counselling Code HITM present');
assert(body.includes('HYDERABAD INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT'), 'College name present');
assert(body.includes('Accredited by NAAC, Affiliated to JNTUH, Approved by AICTE'), 'Accreditation present');
assert(!body.includes('assets/student-profile.png'), 'Student personal photo removed from portal header');
assert(body.includes('Autonomous Student'), 'Autonomous Student badge present in header');
assert(body.includes('Welcome to 4th Day FDP'), 'FDP Announcement marquee present');
assert(body.includes('Hi...BHUKYA VISHNU'), 'Hi...BHUKYA VISHNU greeting bar present');
assert(body.includes('Change Password') && body.includes('Logout'), 'Change password and Logout present in userbar');

// Left Sidebar Menu checks (Clean 8 Main Items - Reference Based)
assert(body.includes('hitam-erp-sidebar'), 'Left sidebar MENU container rendered');
assert(body.includes('ATTENDANCE'), 'Menu item ATTENDANCE present');
assert(body.includes('FEE DETAILS'), 'Menu item FEE DETAILS present');
assert(body.includes('FEEDBACK'), 'Menu item FEEDBACK present');
assert(body.includes('MARKS'), 'Menu item MARKS present');
assert(body.includes('TIME TABLE'), 'Menu item TIME TABLE present');
assert(body.includes('COMPLAINTS'), 'Menu item COMPLAINTS present');
assert(body.includes('PASSWORD CHANGE'), 'Menu item PASSWORD CHANGE present');

// Right Pane: STUDENT PROFILE (Clean Bio-Data & Academic Performance Record)
assert(body.includes('STUDENT PROFILE'), 'STUDENT PROFILE title rendered');
assert(body.includes('BIO-DATA'), 'Card: BIO-DATA present');
assert(body.includes('BHUKYA VISHNU'), 'Student Name BHUKYA VISHNU present');
assert(body.includes('23E51A6619'), 'Hall Ticket 23E51A6619 present');
assert(body.includes('Autonomous R22 Regulations'), 'Autonomous R22 Regulations present');
assert(body.includes('Dr. CSM HOD'), 'Mentor Dr. CSM HOD present');
assert(body.includes('ACADEMIC PERFORMANCE SUMMARY'), 'Academic Performance Summary present');
assert(body.includes('Credits Earned'), 'Credits Earned present');

// Verify that bloated unused accordions are removed
assert(!body.includes('SPF Band Performance'), 'Bloated accordion SPF Band Performance removed');
assert(!body.includes('DISCIPLINARY ACTION'), 'Bloated accordion DISCIPLINARY ACTION removed');
assert(!body.includes('OUTINGS'), 'Bloated accordion OUTINGS removed');

// Bottom buttons matching screenshot
assert(body.includes('>Print</button>') && body.includes('>Export</button>'), 'Print and Export buttons present');
assert(body.includes('View Autonomous Hall Ticket'), 'Hall ticket button present');

// Test Accordion Toggle function
const mockAcc = makeElement('acc_test');
const mockArrow = makeElement('acc_test_arrow');
mockArrow.textContent = '>';
document.elements['acc_test'] = mockAcc;
document.elements['acc_test_arrow'] = mockArrow;
mockAcc.style.display = 'none';

window.togglePortalAccordion('acc_test');
assert(mockAcc.style.display === 'block' && mockArrow.textContent === '▼', 'togglePortalAccordion expands collapsed panel');

window.togglePortalAccordion('acc_test');
assert(mockAcc.style.display === 'none' && mockArrow.textContent === '>', 'togglePortalAccordion collapses expanded panel');

// Test switching tabs via menu
window.studentSwitchTab('attendance', '23E51A6619');
let switchedBody = document.getElementById('modalBody').innerHTML;
assert(switchedBody.includes('Subject-Wise Attendance Breakdown &amp; Exam Eligibility'), 'Switched to Attendance tab');

window.studentSwitchTab('timetable', '23E51A6619');
switchedBody = document.getElementById('modalBody').innerHTML;
assert(switchedBody.includes('Weekly Student Class Schedule &amp; Timetable'), 'Switched to Timetable tab');

window.studentSwitchTab('marks', '23E51A6619');
switchedBody = document.getElementById('modalBody').innerHTML;
assert(switchedBody.includes('Continuous Internal Evaluation (CIE) Marks &amp; GPA Summary'), 'Switched to Marks tab');

// Verify Hostel Section (Boys and Girls wings only, Nutrition Dining removed)
const hostelHTML = generateHostelHTML();
const hostelCards = hostelHTML.match(/class="drill-card"/g) || [];
assert(hostelCards.length === 2, 'Hostel section displays exactly 2 wings (Boys & Girls)');
assert(hostelHTML.includes('hostel-boys') && hostelHTML.includes('hostel-girls'), 'Hostel includes Boys and Girls wings');
assert(!hostelHTML.includes('hostel-dining'), 'Hostel section does NOT contain hostel-dining card');
assert(!hostelHTML.includes('Nutritious Dining'), 'Hostel section does NOT contain Nutritious Dining');

// Check official word count
let officialCount = 0;
['index.html', 'css/style.css', 'js/main.js'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/official/gi);
  if (m) officialCount += m.length;
});
assert(officialCount === 0, 'Zero occurrences of the word official across all project files');

console.log(`\n=== FINAL VERIFICATION SUITE: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
