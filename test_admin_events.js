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
      contains(c) { return this._classes.has(c); },
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); }
    },
    setAttribute() {},
    getAttribute() { return null; },
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
    if (!this.elements[id]) {
      this.elements[id] = makeElement(id);
    }
    return this.elements[id];
  },
  createElement(tag) { return makeElement(tag); },
  querySelectorAll() { return []; },
  querySelector() { return null; },
  addEventListener() {},
  body: makeElement('body')
};

global.showToast = function(msg) {};
global.showDemoNotice = function(msg) {};
global.openModal = function(key) {};

eval(fs.readFileSync('js/main.js', 'utf8'));

console.log('=== STARTING ADMIN EVENT MANAGEMENT TEST SUITE ===\n');

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

// 1. Authenticate Admin ADMINHTM01
console.log('--- 1. Testing Admin Authentication & Event Management Dashboard ---');
document.getElementById('portalLoginId').value = 'ADMINHTM01';
document.getElementById('portalPassword').value = 'AdminHtm01';
window.authenticatePortal('admin');

let body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Campus Administrator'), 'Admin ADMINHTM01 signed in successfully');
assert(body.includes('Campus Events Management Console'), 'Campus Events Management Console rendered in Admin view');
assert(body.includes('Create New Event'), 'Create New Event button rendered');
assert(body.includes('ELYSIAN'), 'Default event ELYSIAN listed in Admin events roster');
assert(body.includes('HITAM 36-Hour National Smart Hackathon'), 'Default event Smart Hackathon listed in Admin events roster');
assert(body.includes('IGNITE'), 'Default event IGNITE listed in Admin events roster');

const initialEventCount = window.eventsData.length;
assert(initialEventCount >= 7, `Initial eventsData roster has ${initialEventCount} campus events`);

// 2. Open Event Form
console.log('\n--- 2. Testing Event Creation Form ---');
window.adminToggleCreateEventForm('ADMINHTM01');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('adminEventFormContainer'), 'Event Form Container rendered upon clicking Create New Event');
assert(body.includes('Create &amp; Publish New Campus Event') || body.includes('Create & Publish New Campus Event'), 'Create & Publish New Campus Event form header displayed');

// 3. Create a New Campus Event
console.log('\n--- 3. Testing Adding / Publishing a New Campus Event ---');
document.getElementById('adminEventTitle').value = 'HITAM National AI & Robotics Challenge 2026';
document.getElementById('adminEventTag').value = 'National Hackathon';
document.getElementById('adminEventStatus').value = 'Registration Open (Active)';
document.getElementById('adminEventDate').value = 'December 18–20, 2026';
document.getElementById('adminEventImg').value = 'assets/esparto.jpeg';
document.getElementById('adminEventVenue').value = 'HITAM Robotics & Automation Center';
document.getElementById('adminEventEligibility').value = 'Engineering Students from All Institutions';
document.getElementById('adminEventDesc').value = '36-Hour National Robotics & Transformer AI Sprint with live hardware testbeds.';
document.getElementById('adminEventParas').value = 'Full-fledged robotics hackathon with industry prizes.\n\nLive mentoring by leading AI researchers.';

window.adminSaveEvent('ADMINHTM01');
body = document.getElementById('modalBody').innerHTML;

assert(window.eventsData.length === initialEventCount + 1, 'window.eventsData length incremented by 1');
const createdEvent = window.eventsData[0];
assert(createdEvent.title === 'HITAM National AI & Robotics Challenge 2026', 'New event is placed at the top of window.eventsData');
assert(createdEvent.date === 'December 18–20, 2026', 'New event preserves date');
assert(body.includes('HITAM National AI &amp; Robotics Challenge 2026') || body.includes('HITAM National AI & Robotics Challenge 2026'), 'New event rendered in Admin events list');

// 4. Verify Public Events Modal Reflects the New Event
console.log('\n--- 4. Testing Public Events Modal Synchronization ---');
const publicHTML = generateEventsHTML();
assert(publicHTML.includes('HITAM National AI & Robotics Challenge 2026') || publicHTML.includes('HITAM National AI &amp; Robotics Challenge 2026'), 'Public generateEventsHTML includes newly created event');
assert(publicHTML.includes('December 18–20, 2026'), 'Public generateEventsHTML displays the new event date');

// 5. Edit Existing Event
console.log('\n--- 5. Testing Editing an Event ---');
window.adminEditEvent(createdEvent.id, 'ADMINHTM01');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Edit Campus Event'), 'Form switches to Edit Mode');

// Update fields
document.getElementById('adminEventTitle').value = 'HITAM National AI & Robotics Grand Championship 2026';
document.getElementById('adminEventDate').value = 'December 22–24, 2026';
document.getElementById('adminEventStatus').value = 'Annual Flagship Event — Dates Announced';
window.adminSaveEvent('ADMINHTM01');

const updatedEvent = window.eventsData.find(x => x.id === createdEvent.id);
assert(updatedEvent && updatedEvent.title === 'HITAM National AI & Robotics Grand Championship 2026', 'Event title updated in window.eventsData');
assert(updatedEvent && updatedEvent.date === 'December 22–24, 2026', 'Event date updated in window.eventsData');

const updatedPublicHTML = generateEventsHTML();
assert(updatedPublicHTML.includes('Grand Championship 2026'), 'Public modal reflects updated event title');
assert(updatedPublicHTML.includes('December 22–24, 2026'), 'Public modal reflects updated event date');

// 6. Test Quick Status Toggle
console.log('\n--- 6. Testing Quick Status Toggle ---');
const prevStatus = updatedEvent.status;
window.adminToggleEventStatus(updatedEvent.id, 'ADMINHTM01');
const toggledEvent = window.eventsData.find(x => x.id === createdEvent.id);
assert(toggledEvent.status !== prevStatus, `Status toggled from "${prevStatus}" to "${toggledEvent.status}"`);

// 7. Test Remove / Delete Event
console.log('\n--- 7. Testing Event Removal / Deletion ---');
window.adminDeleteEvent(createdEvent.id, 'ADMINHTM01');
assert(window.eventsData.length === initialEventCount, 'window.eventsData decremented back to initial count');
assert(!window.eventsData.some(x => x.id === createdEvent.id), 'Deleted event no longer exists in window.eventsData');

body = document.getElementById('modalBody').innerHTML;
assert(!body.includes('Grand Championship 2026'), 'Deleted event no longer rendered in Admin events list');

const postDeletePublicHTML = generateEventsHTML();
assert(!postDeletePublicHTML.includes('Grand Championship 2026'), 'Deleted event no longer rendered in Public events modal');

// 8. Test Navigation Between Admin Tabs
console.log('\n--- 8. Testing Admin Module Tab Switching ---');
window.adminSwitchTab('access', 'ADMINHTM01');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Department-Wise Portal Access Matrix'), 'Switched to Access Control tab');

window.adminSwitchTab('governance', 'ADMINHTM01');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('B.Tech Admissions &amp; Enrolment') || body.includes('Admissions & Enrolment'), 'Switched to Governance tab');

window.adminSwitchTab('events', 'ADMINHTM01');
body = document.getElementById('modalBody').innerHTML;
assert(body.includes('Campus Events Management Console'), 'Switched back to Events Manager tab');

// 9. Zero occurrences of the word official
console.log('\n--- 9. Verifying Zero Occurrences of the Word "official" ---');
let officialCount = 0;
['index.html', 'css/style.css', 'js/main.js'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/official/gi);
  if (m) officialCount += m.length;
});
assert(officialCount === 0, 'Zero occurrences of the word official across all files');

console.log(`\n=== ADMIN EVENT TEST SUITE: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
