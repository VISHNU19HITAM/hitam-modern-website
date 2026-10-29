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
    remove() {}
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
  querySelectorAll(sel) { return []; },
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

console.log('=== VERIFYING AUTONOMOUS EXAM PORTAL (5 MODULES) ===\n');

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

// 1. Verify index.html rename to Exam Portal
const indexHTML = fs.readFileSync('index.html', 'utf8');
assert(indexHTML.includes("openModal('exam-portal')") && indexHTML.includes('data-modal="exam-portal"'), 'index.html Column 3 contains Exam Portal navigation item');
assert(indexHTML.includes('<span>Exam Portal</span>'), 'Navigation link text renamed to Exam Portal');

// 2. Verify Modal Registry in window.hitamContentData
assert(!!window.hitamContentData['exam-portal'], 'window.hitamContentData contains exam-portal entry');
assert(!!window.hitamContentData['sem-result-portal'], 'window.hitamContentData preserves sem-result-portal alias');
assert(typeof window.generateExamPortalHTML === 'function', 'generateExamPortalHTML function is defined');

// 3. Verify Login Screen
const loginHTML = window.generateExamPortalHTML();
assert(loginHTML.includes('HITAM Autonomous Exam Portal'), 'Login screen renders Exam Portal header');
assert(loginHTML.includes('Student Hall Ticket / Roll Number'), 'Roll number input label present');
assert(loginHTML.includes('portalPassword'), 'Password input present');
assert(!loginHTML.includes('value="23e51a66619"'), 'Credentials strictly hidden on login screen');

// 4. Authenticate Vishnu 23E51A6619 to Exam Portal
document.getElementById('portalLoginId').value = '23E51A6619';
document.getElementById('portalPassword').value = '23e51a66619';
window.authenticateExamPortal();

const dashboardBody = document.getElementById('modalBody').innerHTML;
assert(dashboardBody.includes('Candidate: <strong>BHUKYA VISHNU</strong>'), 'Candidate name rendered on dashboard bar');
assert(dashboardBody.includes('23E51A6619'), 'Hall ticket 23E51A6619 rendered on dashboard bar');

// Check 5 navigation shortcut tabs
assert(dashboardBody.includes('Notices &amp; Imp Dates'), 'Tab 1: Notices & Imp Dates button present');
assert(dashboardBody.includes('Results'), 'Tab 2: Results button present');
assert(dashboardBody.includes('Hall Ticket Download'), 'Tab 3: Hall Ticket Download button present');
assert(dashboardBody.includes('Exam Fee Payment'), 'Tab 4: Exam Fee Payment button present');
assert(dashboardBody.includes('Internal Marks (CIE %)'), 'Tab 5: Internal Marks (CIE %) button present');

// 5. Test Module 1: Notices About Important Dates
assert(dashboardBody.includes('NOTICES &amp; IMPORTANT EXAMINATION DATES'), 'Module 1 title rendered');
assert(dashboardBody.includes('Online Exam Fee Payment (Without Fine)'), 'Milestone: Fee payment without fine present');
assert(dashboardBody.includes('15-OCT-2026 to 02-NOV-2026'), 'Milestone date 15-OCT-2026 to 02-NOV-2026 present');
assert(dashboardBody.includes('Semester End Theory Examinations (SEE)'), 'Milestone: Theory examinations present');
assert(dashboardBody.includes('24-NOV-2026 to 12-DEC-2026'), 'Milestone date 24-NOV-2026 to 12-DEC-2026 present');
assert(dashboardBody.includes('Provisional Results Declaration'), 'Milestone: Results declaration present');
assert(dashboardBody.includes('28-DEC-2026'), 'Milestone date 28-DEC-2026 present');
assert(dashboardBody.includes('Odd Semester SEE Notification'), 'Examination circular 2026/08 present');

// 6. Test Module 2: Results (Semester Results & Grade Memos)
window.examPortalSwitchTab('23E51A6619', 'results');
const resultsBody = document.getElementById('modalBody').innerHTML;
assert(resultsBody.includes('PROVISIONAL SEMESTER GRADE MEMORANDUM'), 'Module 2: Grade memorandum rendered');
assert(resultsBody.includes('Machine Learning Techniques'), 'Subject Machine Learning Techniques rendered');
assert(resultsBody.includes('Semester SGPA:'), 'Semester SGPA present in summary bar');
assert(resultsBody.includes('Cumulative CGPA:'), 'Cumulative CGPA present in summary bar');
assert(resultsBody.includes('O. P. Suresh'), 'Controller of Examinations Dr. O. P. Suresh signature block present');
assert(resultsBody.includes('Dr. S. Arvind') && resultsBody.includes('Principal'), 'Principal Dr. S. Arvind signature block present on grade memo');

// 7. Test Module 3: Hall Ticket Download
window.examPortalSwitchTab('23E51A6619', 'hallticket');
const hallTicketBody = document.getElementById('modalBody').innerHTML;
assert(hallTicketBody.includes('AUTONOMOUS EXAMINATION BRANCH — ADMIT CARD / HALL TICKET'), 'Module 3: Admit card / hall ticket header rendered');
assert(hallTicketBody.includes('Candidate Name:</span> <strong>BHUKYA VISHNU</strong>'), 'Candidate name rendered on hall ticket');
assert(hallTicketBody.includes('Hall Ticket Number:</span> <strong style="color:#0284c7; font-size:14px;">23E51A6619</strong>'), 'Hall ticket number rendered');
assert(hallTicketBody.includes('HITAM Autonomous Campus Center (Code: HITM)'), 'Examination center code HITM rendered');
assert(hallTicketBody.includes('Ramanujan Block — Hall 204'), 'Exam hall room allotment rendered');
assert(hallTicketBody.includes('24-NOV-2026') && hallTicketBody.includes('10:00 AM – 1:00 PM'), 'Examination date and timings rendered');
assert(hallTicketBody.includes('Digital Security Barcode'), 'Security barcode rendered');
assert(hallTicketBody.includes('Download &amp; Print Hall Ticket'), 'Download & Print Hall Ticket button present');

// 8. Test Module 4: Exam Fee Payment
window.examPortalSwitchTab('23E51A6619', 'feepayment');
const feeBody = document.getElementById('modalBody').innerHTML;
assert(feeBody.includes('AUTONOMOUS EXAMINATION FEE PAYMENT DESK'), 'Module 4: Exam fee payment desk title rendered');
assert(feeBody.includes('FEE CLEARED (PAID)'), 'Current semester fee status marked PAID');
assert(feeBody.includes('₹2,050.00'), 'Total fee amount ₹2,050.00 present');
assert(feeBody.includes('HITM/AUTON/PAY/2026/89421'), 'Payment transaction reference present');
assert(feeBody.includes('16-OCT-2026'), 'Payment timestamp present');
assert(feeBody.includes('Download Fee Receipt (PDF)'), 'Download fee receipt button present');
assert(feeBody.includes('Past Semester Examination Fee Ledgers'), 'Historical fee ledgers table present');

// 9. Test Module 5: Internal Marks (Final Internal Marks & Percentage)
window.examPortalSwitchTab('23E51A6619', 'internalmarks');
const internalBody = document.getElementById('modalBody').innerHTML;
assert(internalBody.includes('CONTINUOUS INTERNAL EVALUATION (CIE) — FINAL INTERNAL MARKS &amp; PERCENTAGE'), 'Module 5: Internal marks title rendered');
assert(internalBody.includes('Final Internal Marks (40)'), 'Final internal marks column header present');
assert(internalBody.includes('Percentage (%)'), 'Internal percentage column header present');
assert(internalBody.includes('Machine Learning Techniques'), 'Subject Machine Learning Techniques in internal marks table');
assert(internalBody.includes('/ 40'), 'Marks shown out of 40');
assert(internalBody.includes('%'), 'Percentage badge rendered for internal marks');
assert(internalBody.includes('Overall Internal Average:'), 'Overall internal average summary card present');
assert(internalBody.includes('Overall Internal Percentage:'), 'Overall internal percentage summary card present');
assert(internalBody.includes('ELIGIBLE'), 'CIE eligibility status present');

// 10. Test Directory Overview ("View More")
const portalsAllHTML = window.generatePortalsAllHTML();
assert(portalsAllHTML.includes('Autonomous Exam Portal') && portalsAllHTML.includes("openModal('exam-portal')"), 'Portals Directory displays Autonomous Exam Portal');

// 11. Verify Zero Occurrences of the Word "official"
let officialCount = 0;
['index.html', 'css/style.css', 'js/main.js'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/official/gi);
  if (m) officialCount += m.length;
});
assert(officialCount === 0, 'Zero occurrences of the word official across all project files');

console.log(`\n=== AUTONOMOUS EXAM PORTAL SUITE: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
