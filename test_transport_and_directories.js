// scratch/test_transport_and_directories.js
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

// Load js/main.js
const code = fs.readFileSync('js/main.js', 'utf8');
eval(code);

console.log('=== STARTING TRANSPORT & DIRECTORY BOXES TEST SUITE ===\n');

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

// 1. TEST TRANSPORT MODAL & 10 BUS ROUTES
console.log('--- 1. Testing Transport Modal & 10 Bus Routes ---');
window.openModal('transport');
let modalBody = document.getElementById('modalBody').innerHTML;

assert(modalBody.includes('assets/hitam-bus.jpg'), 'Transport hero banner uses real HITAM college bus photo');
assert(modalBody.includes('10 City Routes') || modalBody.includes('10 Express Routes'), 'Transport header states 10 routes');

// Verify all 10 routes are present
for (let i = 1; i <= 10; i++) {
  const pad = i < 10 ? `0${i}` : `${i}`;
  const busKey = `bus-${i}`;
  const busNo = `Bus ${pad}`;
  assert(modalBody.includes(busNo), `Route card for ${busNo} rendered in grid`);
}

// Test detail drill-down for Bus 01 and Bus 10
window.showTransportDetail('bus-1');
let detailBody = document.getElementById('modalBody').innerHTML;
assert(detailBody.includes('Secunderabad Station') && detailBody.includes('Bowenpally Checkpost'), 'Bus 01 detail stops rendered');
assert(detailBody.includes('assets/hitam-bus.jpg'), 'Bus 01 detail uses real bus image');

window.showTransportDetail('bus-10');
detailBody = document.getElementById('modalBody').innerHTML;
assert(detailBody.includes('Medchal Railway Station') && detailBody.includes('Kandlakoya Oxygen Park'), 'Bus 10 detail stops rendered');

// 2. TEST CAMPUS SERVICES "VIEW MORE" (campus-services-all)
console.log('\n--- 2. Testing Campus Services "View More" (campus-services-all) ---');
window.openModal('campus-services-all');
let allBody = document.getElementById('modalBody').innerHTML;

// Verify it opens ALL services in boxes, NOT just transport
assert(allBody.includes('HITAM Campus Facilities Directory'), 'Campus facilities overview banner rendered');
assert(allBody.includes('Central Digital Library') && allBody.includes("openModal('library')"), 'Box 1: Library card rendered with explore action');
assert(allBody.includes('Cafeteria') && allBody.includes("openModal('canteen')"), 'Box 2: Canteen card rendered with explore action');
assert(allBody.includes('Campus Bus Fleet') && allBody.includes('10 City Routes') && allBody.includes("openModal('transport')"), 'Box 3: Transport card rendered with real bus image and 10 routes');
assert(allBody.includes('Department Research Laboratories') && allBody.includes("openModal('labs')"), 'Box 4: Research Labs card rendered with explore action');
assert(allBody.includes('Eco-Friendly Campus Hostels') && allBody.includes("openModal('hostel')"), 'Box 5: Hostels card rendered with explore action');
assert(allBody.includes('Sports Arena') && allBody.includes("openModal('sports')"), 'Box 6: Sports & Elysian card rendered with explore action');

// 3. TEST COLLEGE LIFE "VIEW MORE" (college-life-all)
console.log('\n--- 3. Testing College Life "View More" (college-life-all) ---');
window.openModal('college-life-all');
let clBody = document.getElementById('modalBody').innerHTML;

assert(clBody.includes('HITAM College Life Directory'), 'College life overview banner rendered');
assert(clBody.includes('Academic Departments') && clBody.includes("openModal('departments')"), 'Box 1: Departments card rendered');
assert(clBody.includes('Campus Events') && clBody.includes("openModal('events')"), 'Box 2: Events card rendered');
assert(clBody.includes('Institutional Rankings') && clBody.includes("openModal('achievements')"), 'Box 3: Achievements card rendered');
assert(clBody.includes('Student Life') && clBody.includes("openModal('student-life')"), 'Box 4: Student Life card rendered');
assert(clBody.includes('Innovation') && clBody.includes("openModal('innovation')"), 'Box 5: Innovation card rendered');

// 4. TEST PORTALS "VIEW MORE" (portals-all)
console.log('\n--- 4. Testing Portals "View More" (portals-all) ---');
window.openModal('portals-all');
let pBody = document.getElementById('modalBody').innerHTML;

assert(pBody.includes('HITAM Digital Portals Directory'), 'Portals directory overview banner rendered');
assert(pBody.includes('Administrative Governance Portal') && pBody.includes("openModal('admin-portal')"), 'Box 1: Admin Portal box rendered');
assert(pBody.includes('Faculty LMS') && pBody.includes("openModal('faculty-portal')"), 'Box 2: Faculty Portal box rendered');
assert(pBody.includes('Student ERP') && pBody.includes("openModal('student-portal')"), 'Box 3: Student Portal box rendered');

console.log(`\n=== TEST SUITE COMPLETED: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
