// scratch/test_itp_and_overseas_services.js
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

// Load main.js
const mainCode = fs.readFileSync('js/main.js', 'utf8');
eval(mainCode);

console.log('=== STARTING ITP (3+2) & OVERSEAS MS SERVICES TEST SUITE ===\n');

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

// 1. VERIFY INDEX.HTML FOUR-COLUMN GRID STRUCTURE
console.log('--- 1. Testing index.html 4-Column Grid & ITP Section ---');
const indexHTML = fs.readFileSync('index.html', 'utf8');
assert(indexHTML.includes('<h2>ITP (3+2)</h2>'), 'ITP (3+2) column header present in index.html');
assert(indexHTML.includes("openModal('itp-overview')"), 'ITP Overview link present');
assert(indexHTML.includes("openModal('itp-partners')"), 'Partner Universities link present');
assert(indexHTML.includes("openModal('itp-departments')"), 'Departments & MS link present');
assert(indexHTML.includes("openModal('itp-fees')"), 'Fee Structure & Scholarships link present');
assert(indexHTML.includes("openModal('itp-services')"), 'Overseas MS Remote Desk link present');
assert(indexHTML.includes("openModal('itp-all')"), 'ITP View More directory link present');

// 2. VERIFY MODAL REGISTRY FOR ALL 6 ITP MODALS
console.log('\n--- 2. Testing ITP Modal Registry in window.hitamContentData ---');
const requiredModals = ['itp-overview', 'itp-partners', 'itp-departments', 'itp-fees', 'itp-services', 'itp-all'];
requiredModals.forEach(mKey => {
  assert(window.hitamContentData[mKey] !== undefined, `Modal data exists for '${mKey}'`);
  assert(typeof window.hitamContentData[mKey].getBody === 'function', `Modal '${mKey}' has getBody function`);
});

// 3. TEST ITP (3+2) OVERVIEW CONTENT
console.log('\n--- 3. Testing ITP Overview & Roadmap ---');
const overviewHTML = window.hitamContentData['itp-overview'].getBody();
assert(overviewHTML.includes('Integrated Twinning Program (ITP 3+2)'), 'Overview title rendered');
assert(overviewHTML.includes('YEAR 1 (HITAM)') && overviewHTML.includes('YEAR 4 (ABROAD)'), '5-year roadmap rendered');
assert(overviewHTML.includes('Dual Qualifications'), 'Dual qualification explained');
assert(overviewHTML.includes('STEM OPT'), 'STEM OPT highlighted');

// 4. TEST PARTNER UNIVERSITIES & LINKED COUNTRIES
console.log('\n--- 4. Testing Linked Countries & Partner Universities ---');
const partnersHTML = window.hitamContentData['itp-partners'].getBody();
assert(partnersHTML.includes('University of Alabama in Huntsville'), 'UAH partner university listed');
assert(partnersHTML.includes('Milwaukee School of Engineering'), 'MSOE partner university listed');
assert(partnersHTML.includes('George Mason University'), 'GMU partner university listed');
assert(partnersHTML.includes('Knowledge Foundation at Reutlingen University'), 'Reutlingen University (Germany) listed');
assert(partnersHTML.includes('United States of America (USA)'), 'USA country listed');
assert(partnersHTML.includes('Germany (European Union)'), 'Germany country listed');
assert(partnersHTML.includes('3-Year OPT') || partnersHTML.includes('STEM OPT'), 'STEM OPT benefits stated');
assert(partnersHTML.includes('EU Blue Card Track'), 'EU Blue Card track stated');

// 5. TEST DEPARTMENTS & MS SPECIALIZATION MAPPING
console.log('\n--- 5. Testing Eligible Departments & MS Degrees ---');
const deptsHTML = window.hitamContentData['itp-departments'].getBody();
assert(deptsHTML.includes('Computer Science') && deptsHTML.includes('Engineering'), 'CSE department listed');
assert(deptsHTML.includes('Mechanical Engineering'), 'Mechanical Engineering department listed');
assert(deptsHTML.includes('Electronics') && deptsHTML.includes('Communication'), 'ECE department listed');
assert(deptsHTML.includes('MS in Computer Science'), 'MS in CS degree mapped');
assert(deptsHTML.includes('MS in Aerospace Systems Engineering'), 'MS in Aerospace mapped for Mech');
assert(deptsHTML.includes('M.Sc. in Professional Software Engineering'), 'M.Sc. in PSE Germany mapped');

// 6. TEST FEE STRUCTURE & FINANCIAL SAVINGS
console.log('\n--- 6. Testing Fee Structure & 65% Financial Savings ---');
const feesHTML = window.hitamContentData['itp-fees'].getBody();
assert(feesHTML.includes('₹2,50,000'), 'HITAM annual fee ₹2,50,000 stated');
assert(feesHTML.includes('₹7,50,000'), 'HITAM 3-year total fee ₹7,50,000 stated');
assert(feesHTML.includes('₹2,00,000'), 'Offer acceptance advance fee ₹2,00,000 stated');
assert(feesHTML.includes('₹1,00,000'), 'Year 3 transfer fee ₹1,00,000 stated');
assert(feesHTML.includes('65% Financial Savings'), '65% financial savings highlighted');
assert(feesHTML.includes('Traditional 4-Year US B.S.'), 'Comparison with 4-year direct US study shown');
assert(feesHTML.includes('HITAM Merit Scholarship'), 'Merit scholarship aid listed');
assert(feesHTML.includes('Graduate Assistantships (GRA / GTA)'), 'GRA/GTA assistantships listed');

// 7. TEST OVERSEAS MS STUDENT REMOTE SERVICES DESK & LIVE TRACKER
console.log('\n--- 7. Testing Overseas MS Remote Services Desk ---');
const servicesHTML = window.hitamContentData['itp-services'].getBody();
assert(servicesHTML.includes('ITP Overseas Student Remote Services Desk'), 'Remote desk title rendered');
assert(servicesHTML.includes('itpReqName') && servicesHTML.includes('itpReqRoll'), 'Student input fields rendered');
assert(servicesHTML.includes('itpReqUni') && servicesHTML.includes('itpReqService'), 'University and service dropdowns rendered');
assert(servicesHTML.includes('Live Remote Work Request Tracker'), 'Live request tracker rendered');
assert(servicesHTML.includes('ITP-REQ-8812'), 'Seeded ticket 8812 rendered');
assert(servicesHTML.includes('ITP-REQ-8819'), 'Seeded ticket 8819 rendered');
assert(servicesHTML.includes('Dr. K. Radhakrishna'), 'International relations dean contact present');
assert(servicesHTML.includes('international@hitam.org'), 'International desk email present');

// 8. TEST SUBMITTING A NEW REMOTE WORK REQUEST FROM ABROAD
console.log('\n--- 8. Testing Remote Request Submission ---');
const initialTicketsCount = window.itpRemoteRequestsDB.length;

document.getElementById('itpReqName').value = 'Bhukya Vishnu (Overseas)';
document.getElementById('itpReqRoll').value = '23E51A6619';
document.getElementById('itpReqExit').value = '2026';
document.getElementById('itpReqUni').value = 'Milwaukee School of Engineering (USA)';
document.getElementById('itpReqMS').value = 'MS in Software Engineering';
document.getElementById('itpReqContact').value = '+1 (414) 555-8821';
document.getElementById('itpReqService').value = 'Autonomous Certified Transcripts (WES / Sealed Courier Dispatch)';
document.getElementById('itpReqDest').value = 'WES Canada Ref #9021844, Toronto';
document.getElementById('itpReqPriority').value = 'Express Priority (Visa Deadline 48 Hours)';
document.getElementById('itpReqNotes').value = 'Urgent evaluation needed for co-op work authorization.';

window.itpSubmitRemoteRequest({ preventDefault: () => {} });

assert(window.itpRemoteRequestsDB.length === initialTicketsCount + 1, 'Tickets database incremented by 1');
const createdTicket = window.itpRemoteRequestsDB[0];
assert(createdTicket.name === 'Bhukya Vishnu (Overseas)', 'Created ticket preserves student name');
assert(createdTicket.roll === '23E51A6619', 'Created ticket preserves roll number');
assert(createdTicket.ticketId.startsWith('ITP-REQ-'), 'Ticket has valid ITP-REQ prefix');
assert(createdTicket.destination.includes('WES Canada'), 'Created ticket preserves destination');

// 9. TEST MOI DIGITAL CERTIFICATE VIEWER
console.log('\n--- 9. Testing MOI Digital Certificate Viewer ---');
window.itpOpenMOIViewer('ITP-REQ-8819');
const moiHTML = document.getElementById('modalBody').innerHTML;
assert(moiHTML.includes('HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT'), 'College header present on MOI certificate');
assert(moiHTML.includes('TO WHOMSOEVER IT MAY CONCERN'), 'Formal salutation present on MOI certificate');
assert(moiHTML.includes('EXCLUSIVELY IN THE ENGLISH LANGUAGE'), 'English medium declaration present');
assert(moiHTML.includes('Bhukya Vishnu'), 'Student name rendered on MOI certificate');
assert(moiHTML.includes('23E51A6619'), 'Roll number rendered on MOI certificate');
assert(moiHTML.includes('Dr. K. Radhakrishna'), 'Dean signature rendered on MOI certificate');
assert(moiHTML.includes('Dr. S. Arvind'), 'Principal Dr. S. Arvind signature rendered on MOI certificate');

// 10. TEST DISPATCH COURIER TRACKING MODAL
console.log('\n--- 10. Testing Courier Tracking Modal ---');
window.itpOpenDispatchModal('ITP-REQ-8812', 'DHL-940551020088');
const dispatchHTML = document.getElementById('modalBody').innerHTML;
assert(dispatchHTML.includes('DHL-940551020088'), 'AWB tracking number displayed');
assert(dispatchHTML.includes('DHL Express Worldwide'), 'Carrier displayed');
assert(dispatchHTML.includes('Autonomous Attested Transcripts (Sealed)'), 'Contents description displayed');

// 11. TEST ITP-ALL DIRECTORY (5 BOXES)
console.log('\n--- 11. Testing ITP All Directory ---');
const allHTML = window.hitamContentData['itp-all'].getBody();
assert(allHTML.includes('ITP (3+2) Program Overview') && allHTML.includes('Roadmap'), 'Box 1: Overview rendered');
assert(allHTML.includes('Partner Universities') && allHTML.includes('Germany'), 'Box 2: Partners rendered');
assert(allHTML.includes('Eligible Departments') && allHTML.includes('MS Degrees'), 'Box 3: Departments rendered');
assert(allHTML.includes('Fee Structure') && allHTML.includes('Financial Savings'), 'Box 4: Fees rendered');
assert(allHTML.includes('Overseas MS Student Remote Services Desk'), 'Box 5: Remote Desk rendered');

// 12. VERIFY ZERO OCCURRENCES OF THE WORD "OFFICIAL"
console.log('\n--- 12. Verifying Zero Occurrences of the Word "official" ---');
const files = ['index.html', 'css/style.css', 'js/main.js'];
let totalOfficial = 0;
files.forEach(f => {
  const cnt = (fs.readFileSync(f, 'utf8').match(/official/gi) || []).length;
  totalOfficial += cnt;
});
assert(totalOfficial === 0, `Zero occurrences of the word official across all files (found: ${totalOfficial})`);

console.log(`\n=== ITP & OVERSEAS SERVICES SUITE: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
