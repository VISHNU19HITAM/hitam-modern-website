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

console.log('=== STARTING CANTEEN STOCK, COMPLAINTS & FEEDBACK TEST SUITE ===\n');

let passes = 0;
let fails = 0;

function assert(cond, msg) {
  if (cond) { console.log('  [PASS]', msg); passes++; }
  else { console.error('  [FAIL]', msg); fails++; }
}

// 1. Test Main Canteen Modal & Navigation Tabs
console.log('--- 1. Testing Canteen Modal & Navigation Tabs ---');
window.activeCanteenTab = 'stalls';
let canteenHTML = generateCanteenHTML();
assert(canteenHTML.includes('Cafeteria Stalls &amp; Live Stock Menu'), 'Stalls & Live Stock Menu tab rendered');
assert(canteenHTML.includes('Complaint Box &amp; Redressal'), 'Complaint Box tab pill rendered');
assert(canteenHTML.includes('Feedback &amp; Suggestions'), 'Feedback & Suggestions tab pill rendered');
assert(canteenHTML.includes('Stall 1: Royal Food Court'), 'Stall 1 card present');
assert(canteenHTML.includes('Stall 2: Fast Food Corner'), 'Stall 2 card present');
assert(canteenHTML.includes('Stall 3: Green Cafe'), 'Stall 3 card present');

// 2. Test Stall Detail & Stock Tracking
console.log('\n--- 2. Testing Stall Menu & Stock Status (In Stock, 30 pcs, Out of Stock) ---');
window.showCanteenDetail('stall-1');
let detailHTML = document.getElementById('modalBody').innerHTML;

// Verify In Stock items (e.g. 30 pieces)
assert(detailHTML.includes('Unlimited South Indian Veg Thali Meals'), 'Thali meals present');
assert(detailHTML.includes('In Stock (30 pieces available)'), 'Thali meals has 30 pieces in stock badge');
assert(detailHTML.includes('+ Add (30 left)'), 'Thali meals add button reflects 30 pieces left');

// Verify Limited Stock items
assert(detailHTML.includes('Special Hyderabadi Chicken Dum Biryani'), 'Biryani present');
assert(detailHTML.includes('Limited Stock (8 pieces left)'), 'Biryani shows 8 pieces limited stock');

// Verify Out of Stock items
assert(detailHTML.includes('Steamed Idli & Crispy Medu Vada Combo'), 'Idli Vada combo present');
assert(detailHTML.includes('Out of Stock (0 / 30 pcs)'), 'Idli Vada combo marked Out of Stock');
assert(detailHTML.includes('disabled') && detailHTML.includes('Out of Stock'), 'Out of stock item button disabled');

// 3. Test Live Stock Decrement on Adding to Tray
console.log('\n--- 3. Testing Dynamic Stock Decrement & Tray Estimation ---');
// Ghee Masala Dosa has initial stock of 5
const dosaItem = window.canteenStallsData.find(s => s.id === 'stall-1').menu[3];
assert(dosaItem.stock === 5, 'Dosa initial stock is 5');

// Add 1 Dosa
window.addToCanteenTray('stall-1', 3);
assert(dosaItem.stock === 4, 'Stock decremented from 5 to 4');
detailHTML = document.getElementById('modalBody').innerHTML;
assert(detailHTML.includes('Limited Stock (4 pieces left)'), 'DOM updated with 4 pieces left');
assert(detailHTML.includes('+ Add (4 left)'), 'Button text updated with 4 left');

// Decrement remaining 4 pieces until it becomes Out of Stock
window.addToCanteenTray('stall-1', 3); // 3
window.addToCanteenTray('stall-1', 3); // 2
window.addToCanteenTray('stall-1', 3); // 1
window.addToCanteenTray('stall-1', 3); // 0 (Out of stock!)
assert(dosaItem.stock === 0, 'Dosa stock reached 0');
detailHTML = document.getElementById('modalBody').innerHTML;
assert(detailHTML.includes('Out of Stock (0 / 25 pcs)'), 'Dosa now dynamically marked Out of Stock');

// Attempting to add an out-of-stock item should be rejected
const prevTotal = window.canteenTrayTotal;
window.addToCanteenTray('stall-1', 3); // Attempt when stock is 0
assert(window.canteenTrayTotal === prevTotal, 'Cannot add out-of-stock item (total unchanged)');

// 4. Test Canteen Complaint Box
console.log('\n--- 4. Testing Canteen Complaint Box ---');
window.switchCanteenTab('complaints');
detailHTML = document.getElementById('modalBody').innerHTML;
assert(detailHTML.includes('Canteen Grievance &amp; Hygiene Complaint Box'), 'Complaint Box header rendered');
assert(detailHTML.includes('canteenCompCategory'), 'Complaint category selector present');
assert(detailHTML.includes('canteenCompSubject'), 'Complaint subject input present');
assert(detailHTML.includes('canteenCompDesc'), 'Complaint description input present');
assert(detailHTML.includes('CAN-TKT-104') && detailHTML.includes('Resolved'), 'Resolved historical ticket displayed');
assert(detailHTML.includes('CAN-TKT-105') && detailHTML.includes('In Progress'), 'In Progress ticket displayed');

// Submit a new complaint
document.getElementById('canteenCompSubject').value = 'Test hygiene inspection request in dining bay 3';
document.getElementById('canteenCompDesc').value = 'Ensure clean water dispensers and napkin stocks.';
document.getElementById('canteenCompUser').value = 'Bhukya Vishnu (23E51A6619)';
window.submitCanteenComplaint();

detailHTML = document.getElementById('modalBody').innerHTML;
assert(detailHTML.includes('Test hygiene inspection request in dining bay 3'), 'Newly filed complaint appears in complaint list');
assert(detailHTML.includes('Under Review'), 'Newly filed complaint status is Under Review');

// 5. Test Canteen Feedback & Suggestions
console.log('\n--- 5. Testing Canteen Feedback & Suggestions ---');
window.switchCanteenTab('feedback');
detailHTML = document.getElementById('modalBody').innerHTML;
assert(detailHTML.includes('Cafeteria Feedback &amp; New Dish Suggestions'), 'Feedback header rendered');
assert(detailHTML.includes('canteenFbStall'), 'Stall selector present');
assert(detailHTML.includes('crate_taste_5'), '5-star rating chip present');
assert(detailHTML.includes('canteenFbSuggestion'), 'Dish suggestion textarea present');
assert(detailHTML.includes('Student &amp; Faculty Suggestions Board'), 'Suggestions board present');

// Submit new feedback
document.getElementById('canteenFbUser').value = 'Bhukya Vishnu (23E51A6619)';
document.getElementById('canteenFbSuggestion').value = 'Please add fresh organic carrot beetroot juice cups!';
window.canteenSelectRating('taste', 5);
window.canteenSelectRating('hyg', 5);
window.submitCanteenFeedback();

detailHTML = document.getElementById('modalBody').innerHTML;
assert(detailHTML.includes('Please add fresh organic carrot beetroot juice cups!'), 'New suggestion published to community suggestions board');

console.log(`\n=== CANTEEN TEST SUITE COMPLETED: ${passes} PASSED, ${fails} FAILED ===`);
if (fails > 0) process.exit(1);
