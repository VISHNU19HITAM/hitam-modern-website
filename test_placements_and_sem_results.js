const fs = require('fs');

function makeElement(id = '') {
  return {
    id: id,
    innerHTML: '',
    innerText: '',
    textContent: '',
    value: '',
    style: {},
    dataset: {},
    classList: {
      _classes: new Set(),
      contains(c) { return this._classes.has(c); },
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      toggle(c, force) {
        if (force === undefined) {
          if (this.contains(c)) this.remove(c); else this.add(c);
        } else if (force) {
          this.add(c);
        } else {
          this.remove(c);
        }
      }
    },
    setAttribute(k, v) { this[k] = v; },
    getAttribute(k) { return this[k] || null; },
    appendChild() {},
    focus() {},
    remove() {},
    scrollIntoView() {}
  };
}

global.window = global;
global.document = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) this.elements[id] = makeElement(id);
    return this.elements[id];
  },
  createElement(tag) { return makeElement(tag); },
  querySelectorAll(sel) {
    return [];
  },
  querySelector(sel) { return null; },
  addEventListener() {},
  body: makeElement('body')
};

global.showToast = function(msg) {};
global.showDemoNotice = function(msg) {};
global.openModal = function(key) {
  if (global.window.hitamContentData && global.window.hitamContentData[key]) {
    const entry = global.window.hitamContentData[key];
    const html = entry.getBody ? entry.getBody() : entry.body;
    global.document.getElementById('modalBody').innerHTML = html;
  }
};

eval(fs.readFileSync('js/main.js', 'utf8'));

console.log('=== VERIFYING PLACEMENTS & EXAM PORTAL (YEARS 2020-2026 & 20 COMPANIES) ===\n');

let passes = 0;
let fails = 0;

function assert(cond, msg) {
  if (cond) {
    console.log('  [PASS]', msg);
    passes++;
  } else {
    console.error('  [FAIL]', msg);
    fails++;
  }
}

// 1. Verify index.html navigation links
const indexHTML = fs.readFileSync('index.html', 'utf8');
assert(indexHTML.includes("openModal('placements')") && indexHTML.includes('data-modal="placements"'), 'index.html Column 1 contains Placements navigation item');
assert(indexHTML.includes("openModal('exam-portal')") && indexHTML.includes('data-modal="exam-portal"'), 'index.html Column 3 contains Exam Portal navigation item');

// 2. Verify Placements Modal & Content Data
assert(!!window.hitamContentData['placements'], 'window.hitamContentData contains placements entry');
assert(typeof window.generatePlacementsHTML === 'function', 'generatePlacementsHTML function is available');

const placementsHTML = window.generatePlacementsHTML('records', '2026');
assert(placementsHTML.includes('CAREER GUIDANCE &amp; PLACEMENT CELL (CGC)'), 'Placements banner rendered');
assert(placementsHTML.includes('₹24.00 LPA') && placementsHTML.includes('Highest Package'), 'Highest package metric ₹24.00 LPA present in 2026');
assert(placementsHTML.includes('₹6.40 LPA') && placementsHTML.includes('Average Package'), 'Average package metric ₹6.40 LPA present in 2026');
assert(placementsHTML.includes('538+') && placementsHTML.includes('Students Placed'), 'Total placed metric 538+ present in 2026');
assert(placementsHTML.includes('94.2%') && placementsHTML.includes('Placement Record'), 'Placement record 94.2% present');

// 3. Verify user name "Bhukya Vishnu" is completely removed from Placements Roster
assert(!placementsHTML.includes('Bhukya') && !placementsHTML.includes('Vishnu'), 'User name Bhukya Vishnu is completely removed from placements roster');

// 4. Verify Highest Package Achiever Spotlight for Batch 2026
assert(placementsHTML.includes('Highest Package Achiever • Batch of 2026'), 'Highest package achiever spotlight rendered for 2026');
assert(placementsHTML.includes('P. Vignesh Reddy'), 'Achiever P. Vignesh Reddy displayed in spotlight');
assert(placementsHTML.includes('Goldman Sachs') && placementsHTML.includes('₹24.00 LPA'), 'Goldman Sachs offer ₹24.00 LPA displayed in spotlight');

// 5. Test Year Switching across 2020 to 2026
const yearsToTest = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
yearsToTest.forEach(y => {
  const yearHTML = window.generatePlacementsHTML('records', y);
  const stats = window.hitamPlacementBatchStats[y];
  assert(yearHTML.includes(`Batch of ${y}`), `Batch of ${y} pill rendered`);
  assert(yearHTML.includes(`${stats.totalPlaced}`), `Total placed count ${stats.totalPlaced} for ${y} rendered`);
  assert(yearHTML.includes(stats.highestCTC), `Highest package ${stats.highestCTC} for ${y} rendered`);
  assert(yearHTML.includes(stats.topStudent), `Top achiever ${stats.topStudent} for ${y} rendered`);
  assert(yearHTML.includes(stats.topCompany), `Top company ${stats.topCompany} for ${y} rendered`);
});

// Specifically check 2020 click
const html2020 = window.generatePlacementsHTML('records', '2020');
assert(html2020.includes('342') && html2020.includes('G. Tarun') && html2020.includes('₹11.00 LPA'), 'Clicking 2020 displays 342 placed, G. Tarun, and ₹11.00 LPA');
assert(html2020.includes('P. Meghana') && html2020.includes('Cognizant'), 'Student P. Meghana placed at Cognizant shown for 2020');

// 6. Verify 20 Top Recruiting Companies & Logos Tab
assert(window.hitamRecruitersData.length === 20, 'Exactly 20 recruiting partner companies registered');
const recruitersTabHTML = window.generatePlacementsHTML('recruiters');
const expectedCompanies = [
  'Goldman Sachs', 'Amazon AWS', 'Microsoft', 'Google Cloud', 'Darwinbox',
  'Cisco Systems', 'Oracle', 'ServiceNow', 'IBM India', 'Infosys',
  'TCS Digital', 'Capgemini', 'Virtusa', 'Cognizant', 'Wipro',
  'Accenture Solutions', 'Tech Mahindra', 'Hexaware Technologies',
  'L&T Technology Services', 'Robert Bosch'
];
expectedCompanies.forEach(comp => {
  assert(recruitersTabHTML.includes(comp.split(' ')[0]), `Recruiter ${comp} present with logo and details`);
});

// 7. Verify Student Placement Registration Desk Tab
const regTabHTML = window.generatePlacementsHTML('registration');
assert(regTabHTML.includes('Student Campus Placement Registration Desk'), 'Placement registration desk header rendered');
assert(regTabHTML.includes('cgcPlacementRegistrationForm'), 'Registration form present');
assert(regTabHTML.includes('cgcRegRoll'), 'Hall ticket / roll number input present');
assert(regTabHTML.includes('cgcRegName'), 'Student name input present');
assert(regTabHTML.includes('cgcRegBranch'), 'Department / branch dropdown present');
assert(regTabHTML.includes('cgcRegCGPA'), 'Cumulative CGPA input present');
assert(regTabHTML.includes('cgcRegUndertaking'), 'CGC placement code of conduct undertaking present');

// 8. Test Student Placement Registration Submission & Instant Slip Generation
document.getElementById('cgcRegRoll').value = '23E51A6619';
document.getElementById('cgcRegName').value = 'Bhukya Vishnu';
document.getElementById('cgcRegBranch').value = 'CSE (AI & ML)';
document.getElementById('cgcRegCGPA').value = '8.85';
document.getElementById('cgcRegBacklogs').value = '0';
document.getElementById('cgcRegSkills').value = 'Python, PyTorch, Full Stack, AWS';
document.getElementById('cgcRegTrack').value = 'Super Dream Product / FinTech';
document.getElementById('cgcRegUndertaking').checked = true;

const initialRegistrationsCount = window.placementRegistrationsDB.length;
window.handlePlacementRegistrationSubmit();

assert(window.placementRegistrationsDB.length === initialRegistrationsCount + 1, 'Placement registration record added to database');
const slipHTML = document.getElementById('cgcRegistrationSlipSlot').innerHTML;
assert(slipHTML.includes('PLACEMENT DRIVE REGISTRATION CONFIRMATION SLIP'), 'Confirmation acknowledgment slip rendered');
assert(slipHTML.includes('Bhukya Vishnu'), 'Candidate name rendered on confirmation slip');
assert(slipHTML.includes('23E51A6619'), 'Hall ticket roll number rendered on confirmation slip');
assert(slipHTML.includes('VERIFIED &amp; ENROLLED') || slipHTML.includes('VERIFIED & ENROLLED'), 'Enrollment status verified on slip');
assert(slipHTML.includes('CGC-REG-2026-'), 'Registration ID with CGC-REG-2026 prefix generated');
assert(slipHTML.includes('Print Slip'), 'Print slip button present');

// 9. Verify Autonomous Exam Portal Dashboard & Login
assert(!!window.hitamContentData['exam-portal'], 'window.hitamContentData contains exam-portal entry');
const examLoginHTML = window.hitamContentData['exam-portal'].getBody();
assert(examLoginHTML.includes('Autonomous Exam Portal'), 'Exam Portal title rendered');
assert(examLoginHTML.includes('Student Hall Ticket / Roll Number'), 'Roll number input label present');
assert(examLoginHTML.includes('portalPassword'), 'Password input present');
assert(!examLoginHTML.includes('value="23e51a66619"'), 'Credentials strictly hidden on login screen');

// 10. Test Exam Portal Authentication with Valid Student
document.getElementById('portalLoginId').value = '23E51A6619';
document.getElementById('portalPassword').value = '23e51a66619';
window.authenticateExamPortal('23E51A6619', 'results');

const memoBody = document.getElementById('modalBody').innerHTML;
assert(memoBody.includes('HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT'), 'College name rendered on grade memo');
assert(memoBody.includes('OFFICE OF THE CONTROLLER OF EXAMINATIONS'), 'Controller of Examinations office title present');
assert(memoBody.includes('PROVISIONAL SEMESTER GRADE MEMORANDUM'), 'Provisional grade memorandum title present');
assert(memoBody.includes('BHUKYA VISHNU'), 'Student Name BHUKYA VISHNU rendered on exam memo');
assert(memoBody.includes('23E51A6619'), 'Hall ticket 23E51A6619 rendered on exam memo');

// 11. Verify Directory Overviews (Boxes View for "View More")
const colLifeAllHTML = window.generateCollegeLifeAllHTML();
assert(colLifeAllHTML.includes('Career Guidance') && colLifeAllHTML.includes("openModal('placements')"), 'College Life Directory includes Placements box');
assert((colLifeAllHTML.match(/class="drill-card"/g) || []).length === 6, 'College Life Directory displays all 6 categories');

const portalsAllHTML = window.generatePortalsAllHTML();
assert(portalsAllHTML.includes('Autonomous Exam Portal') && portalsAllHTML.includes("openModal('exam-portal')"), 'Portals Directory includes Exam Portal box');
assert((portalsAllHTML.match(/class="drill-card"/g) || []).length === 4, 'Portals Directory displays all 4 portals');

// 12. Verify Zero Occurrences of the Word "official"
let officialCount = 0;
['index.html', 'css/style.css', 'js/main.js'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/official/gi);
  if (m) officialCount += m.length;
});
assert(officialCount === 0, 'Zero occurrences of the word official across all project files');

console.log(`\n=== PLACEMENTS & EXAM PORTAL SUITE: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
