// scratch/test_dual_track_sports.js
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

global.showToast = function(msg) { console.log('  [TOAST]:', msg); };
global.showDemoNotice = function(msg) { console.log('  [DEMO NOTICE]:', msg); };

// Load main.js
const mainCode = fs.readFileSync('js/main.js', 'utf8');
eval(mainCode);

console.log('=== STARTING DUAL-TRACK SPORTS TEST SUITE ===\n');

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

// 1. VERIFY MODAL REGISTRY FOR SPORTS
console.log('--- 1. Testing Sports Modal in window.hitamContentData ---');
assert(window.hitamContentData['sports'] !== undefined, 'hitamContentData has sports entry');
assert(typeof window.hitamContentData['sports'].getBody === 'function', 'sports getBody function exists');

// 2. TEST INITIAL RENDER (TRACK 1: HITAM INTRA-COLLEGE)
console.log('\n--- 2. Testing Track 1: HITAM Intra-College Sports ---');
window.activeSportsTrack = 'hitam';
window.activeSportId = 'cricket';
let sportsHTML = window.hitamContentData['sports'].getBody();

assert(sportsHTML.includes('HITAM Intra-College Sports'), 'Track 1 title present');
assert(sportsHTML.includes('Only HITAM students can play branch-wise'), 'Track 1 branch-wise description present');
assert(sportsHTML.includes('HITAM Inter-Branch Championship (Intra-College)'), 'HITAM banner present');
assert(sportsHTML.includes('LOCK') || sportsHTML.includes('HITAM Students Only'), 'HITAM Students Only badge present');
assert(sportsHTML.includes('9 Competing HITAM Engineering Branches'), '9 Competing branches box present');
assert(sportsHTML.includes('CSE (Titans)'), 'CSE Titans listed');
assert(sportsHTML.includes('Mechanical (Dynamos)'), 'Mechanical Dynamos listed');
assert(sportsHTML.includes('Register My Branch Team (HITAM Students)'), 'Branch team registration button present');
assert(sportsHTML.includes('View Branch Points Table'), 'Branch points table button present');

// 3. TEST SELECTING DIFFERENT SPORTS
console.log('\n--- 3. Testing Switching Sports ---');
const sportsToTest = ['football', 'basketball', 'volleyball', 'kabaddi', 'throwball', 'badminton', 'tabletennis', 'chess', 'carroms'];
sportsToTest.forEach(sp => {
  window.selectSport(sp);
  const updatedHTML = window.generateSportsHTML();
  assert(updatedHTML.includes(sp), `Sport ${sp} successfully selected and displayed`);
});

// 4. TEST TRACK 2: ELYSIAN SANGRAM (OUTSIDE COLLEGES WELCOME)
console.log('\n--- 4. Testing Track 2: ELYSIAN — SANGRAM Fest ---');
window.switchSportsTrack('elysian');
sportsHTML = window.generateSportsHTML();

assert(sportsHTML.includes('ELYSIAN — SANGRAM'), 'Track 2 Elysian Sangram title present');
assert(sportsHTML.includes('Open for outside colleges to enroll &amp; play') || sportsHTML.includes('Open for outside colleges'), 'Track 2 description present');
assert(sportsHTML.includes('₹2,00,000+ Cash Pool') || sportsHTML.includes('₹2,00,000+ in total cash awards'), 'Cash pool amount displayed');
assert(sportsHTML.includes('Visiting &amp; Enrolling Colleges at SANGRAM'), 'Visiting colleges box present');
assert(sportsHTML.includes('CBIT') || sportsHTML.includes('Chaitanya Bharathi'), 'External colleges (CBIT) listed');
assert(sportsHTML.includes('Register Outside College Team'), 'Outside college registration button present');
assert(sportsHTML.includes('Book Visiting Team Hostel Accommodation'), 'Visiting team hostel booking button present');

// 5. TEST BRANCH REGISTRATION INTERACTIVE WORKFLOW
console.log('\n--- 5. Testing Branch Registration Workflow ---');
window.switchSportsTrack('hitam');
window.selectSport('cricket');
window.openBranchRegistration('cricket', 'Cricket');

const slot = document.getElementById('sportsInteractiveSlot');
assert(slot.innerHTML.includes('Register HITAM Branch Team for Cricket'), 'Branch registration form rendered');
assert(slot.innerHTML.includes('branchRegSelect'), 'Branch dropdown rendered');
assert(slot.innerHTML.includes('captainNameInput'), 'Captain name input rendered');
assert(slot.innerHTML.includes('rollNumberInput'), 'Roll number input rendered');

// Submit
window.submitBranchRegistration('Cricket');
assert(slot.innerHTML === '', 'Slot cleared after successful submission');

// 6. TEST OUTSIDE COLLEGE REGISTRATION FOR ELYSIAN SANGRAM
console.log('\n--- 6. Testing Outside College Registration for SANGRAM ---');
window.switchSportsTrack('elysian');
window.openExternalCollegeRegistration('cricket', 'Cricket');

assert(slot.innerHTML.includes('Outside College Entry Registration — SANGRAM'), 'Outside college registration form rendered');
assert(slot.innerHTML.includes('extCollegeName'), 'External college name input rendered');
assert(slot.innerHTML.includes('extCaptainName'), 'External captain name input rendered');

// Submit
window.submitExternalRegistration('Cricket');
assert(slot.innerHTML === '', 'Slot cleared after external registration');

// 7. TEST BRANCH POINTS TABLE
console.log('\n--- 7. Testing Branch Points Table ---');
window.switchSportsTrack('hitam');
window.showBranchPointsTable();

assert(slot.innerHTML.includes('HITAM Inter-Branch Champions Rolling Trophy (Standings)'), 'Points table header rendered');
assert(slot.innerHTML.includes('Computer Science &amp; Engineering (CSE)'), 'CSE in points table');
assert(slot.innerHTML.includes('46'), 'CSE points rendered');
assert(slot.innerHTML.includes('CSE (AI &amp; ML)'), 'CSE AIML in points table');
assert(slot.innerHTML.includes('Mechanical Engineering (MECH)'), 'MECH in points table');

// 8. TEST VISITING HOSTEL REQUEST
console.log('\n--- 8. Testing Visiting Team Hostel Request ---');
window.requestElysianHostel('Cricket');

// 9. VERIFY ZERO OCCURRENCES OF THE WORD "OFFICIAL"
console.log('\n--- 9. Verifying Zero Occurrences of the Word "official" ---');
const files = ['index.html', 'css/style.css', 'js/main.js'];
let totalOfficial = 0;
files.forEach(f => {
  const cnt = (fs.readFileSync(f, 'utf8').match(/official/gi) || []).length;
  totalOfficial += cnt;
});
assert(totalOfficial === 0, `Zero occurrences of the word official across all files (found: ${totalOfficial})`);

console.log(`\n=== DUAL-TRACK SPORTS SUITE: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
