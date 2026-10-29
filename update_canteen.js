const fs = require('fs');

console.log('Constructing enhanced Canteen section with stock management, complaint box, and feedback suggestions...');

let part1 = fs.readFileSync('scratch/part1_clean.js', 'utf8');

// Find start and end of Section 10 in part1_clean.js
const sec10Idx = part1.indexOf('10. CANTEEN');
const sec11Idx = part1.indexOf('11. TRANSPORT');

if (sec10Idx === -1 || sec11Idx === -1) {
  console.error('Could not locate Section 10 boundaries in scratch/part1_clean.js');
  process.exit(1);
}

const sec10Start = part1.lastIndexOf('/*', sec10Idx);
const sec11Start = part1.lastIndexOf('/*', sec11Idx);

const newSection10 = `/* ==========================================================================
   10. CANTEEN & FOOD STALLS WITH LIVE STOCK & COMPLAINT/FEEDBACK SYSTEM
   ========================================================================== */

window.canteenTrayTotal = 0;
window.canteenTrayCount = 0;
let canteenTrayTotal = window.canteenTrayTotal;
let canteenTrayCount = window.canteenTrayCount;
window.activeCanteenTab = window.activeCanteenTab || 'stalls';

// Stall Menu Data with authentic stock tracking (In Stock / 30 pieces / Out of Stock)
window.canteenStallsData = [
  {
    id: 'stall-1',
    title: 'Stall 1: Royal Food Court (Tiffins, Meals & Biryani)',
    tag: 'Meals & Restaurant Food',
    img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    desc: 'Traditional South Indian unlimited thali meals, authentic Hyderabadi Dum Biryani, egg/veg noodles, crispy dosas, and idlis.',
    menu: [
      { item: 'Unlimited South Indian Veg Thali Meals', price: 70, stock: 30, maxStock: 30, desc: 'Rice, Sambar, Rasam, 2 Curries, Papad, Curd & Chutney' },
      { item: 'Special Hyderabadi Chicken Dum Biryani', price: 140, stock: 8, maxStock: 30, desc: 'Fragrant basmati rice with tender chicken, Mirchi ka Salan & Raita' },
      { item: 'Egg Fried Rice / Veg Hakka Noodles', price: 80, stock: 30, maxStock: 30, desc: 'Wok-tossed farm fresh vegetables and spices' },
      { item: 'Ghee Masala Dosa with Chutneys', price: 40, stock: 5, maxStock: 25, desc: 'Golden crispy dosa with spiced potato masala' },
      { item: 'Steamed Idli & Crispy Medu Vada Combo', price: 35, stock: 0, maxStock: 30, desc: 'Served with hot sambar and coconut chutney (Morning Batch Ended)' },
      { item: 'Poori Bhaji / Chole Bhature', price: 45, stock: 0, maxStock: 25, desc: 'Hot fluffy pooris with spiced aloo masala (Sold Out for Today)' }
    ]
  },
  {
    id: 'stall-2',
    title: 'Stall 2: Fast Food Corner (Momos, Burgers & Shawarma)',
    tag: 'Fast Food & Snacks',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    desc: 'Steamed/fried momos with schezwan dip, cheese chicken burgers, loaded grilled sandwiches, rumali shawarma, and peri-peri fries.',
    menu: [
      { item: 'Steamed Veg / Chicken Momos (6 Pcs)', price: 70, stock: 30, maxStock: 30, desc: 'Served with spicy schezwan sauce and garlic mayonnaise' },
      { item: 'Crispy Cheese Chicken / Veg Burger', price: 80, stock: 12, maxStock: 25, desc: 'Crispy patty loaded with cheddar slice, lettuce and garlic mayo' },
      { item: 'Three-Layer Grilled Club Sandwich', price: 65, stock: 4, maxStock: 20, desc: 'Toasted bread loaded with paneer, sweet corn and mozzarella' },
      { item: 'Hyderabadi Rumali Chicken Shawarma', price: 90, stock: 0, maxStock: 30, desc: 'Slow-roasted marinated chicken rolled in soft rumali roti (Sold Out for Lunch)' },
      { item: 'Peri-Peri French Fries Basket', price: 60, stock: 30, maxStock: 30, desc: 'Crispy salted potato fries tossed in peri-peri spice' },
      { item: 'Pani Puri & Dahi Puri Platter', price: 35, stock: 0, maxStock: 20, desc: 'Crisp puris with tangy mint water and sweetened curd (Starts at 3:30 PM)' }
    ]
  },
  {
    id: 'stall-3',
    title: 'Stall 3: Green Cafe, Shakes & Bakery',
    tag: 'Bakery & Beverages',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    desc: 'Freshly baked flaky puffs, thick cold coffee with ice cream, oreo chocolate shakes, seasonal fruit juices, and hot masala chai.',
    menu: [
      { item: 'Paneer / Egg / Chicken Puffs', price: 25, stock: 30, maxStock: 30, desc: 'Golden baked flaky puff pastry' },
      { item: 'Thick Cold Coffee with Vanilla Scoop', price: 50, stock: 18, maxStock: 30, desc: 'Blended arabica coffee topped with rich vanilla ice cream' },
      { item: 'Oreo & Belgian Chocolate Milkshake', price: 60, stock: 6, maxStock: 25, desc: 'Thick chocolate shake topped with crushed oreos & whipped cream' },
      { item: 'Fresh Fruit Juice (Watermelon / Mosambi / Orange)', price: 45, stock: 30, maxStock: 30, desc: '100% fresh squeezed with no added sugar' },
      { item: 'Choco Lava Cake / Pastry Slice', price: 50, stock: 0, maxStock: 15, desc: 'Warm gooey chocolate center (Sold Out - Next Oven Batch Tomorrow)' },
      { item: 'Special Irani Masala Chai / Filter Coffee', price: 15, stock: 30, maxStock: 50, desc: 'Freshly brewed hot aromatic beverage' }
    ]
  }
];
const canteenStallsData = window.canteenStallsData;

// Canteen Complaints Database
window.canteenComplaintsDB = window.canteenComplaintsDB || [
  {
    id: 'CAN-TKT-104',
    date: '26-Oct-2026',
    category: 'Food Quality',
    user: 'Student (CSM Batch 23)',
    subject: 'Request hotter sambar during peak lunch hour (12:45 PM)',
    urgency: 'Normal',
    status: 'Resolved',
    remarks: 'Thermal food warmers in Stall 1 adjusted to maintain 75°C. Verified by Canteen Supervisor.'
  },
  {
    id: 'CAN-TKT-105',
    date: '27-Oct-2026',
    category: 'Cleanliness & Hygiene',
    user: 'Student (ECE Batch 24)',
    subject: 'Table cleaning speed in North Dining Bay between class intervals',
    urgency: 'High',
    status: 'In Progress',
    remarks: 'Two additional housekeeping personnel deployed specifically for dining bays between 12:30 and 1:30 PM.'
  },
  {
    id: 'CAN-TKT-106',
    date: '27-Oct-2026',
    category: 'Drinking Water & Facilities',
    user: 'Faculty (CSE Department)',
    subject: 'RO water dispenser sensor tap dripping near Stall 3 exit',
    urgency: 'Normal',
    status: 'Resolved',
    remarks: 'Campus maintenance plumber inspected dispenser unit and replaced sensor gasket.'
  }
];

// Canteen Feedback & Suggestions Database
window.canteenFeedbackDB = window.canteenFeedbackDB || [
  {
    date: '25-Oct-2026',
    user: 'Bhukya Vishnu (23E51A6619 — CSM)',
    dish: 'Stall 1: Hyderabadi Chicken Dum Biryani',
    tasteRating: 5,
    hygieneRating: 5,
    suggestion: 'Authentic Hyderabadi biryani spices and aroma! Please consider adding a self-serve raita refill counter.'
  },
  {
    date: '26-Oct-2026',
    user: 'Faculty Member (Department of ECE)',
    dish: 'Stall 3: Green Cafe & Bakery',
    tasteRating: 4,
    hygieneRating: 5,
    suggestion: 'Excellent cold coffee and fresh fruit juices. Suggest adding fresh tender coconut water and ragi malt options for morning tiffins.'
  },
  {
    date: '27-Oct-2026',
    user: 'Student (Mechanical Batch 24)',
    dish: 'Stall 2: Fast Food Corner',
    tasteRating: 5,
    hygieneRating: 4,
    suggestion: 'Steamed Momos are top quality. Would love to see whole wheat momos and protein boiled corn cups added to the menu.'
  }
];

// Stock Badge Generator
function getCanteenStockBadgeHTML(stock, maxStock) {
  if (stock <= 0) {
    return \`<span class="stock-badge out-of-stock">🚫 Out of Stock (0 / \${maxStock || 30} pcs)</span>\`;
  } else if (stock <= 10) {
    return \`<span class="stock-badge low-stock">⚠️ Limited Stock (\${stock} pieces left)</span>\`;
  } else {
    return \`<span class="stock-badge in-stock">✅ In Stock (\${stock} pieces available)</span>\`;
  }
}

// Tab Switcher for Canteen Modal
window.switchCanteenTab = function(tabName) {
  window.activeCanteenTab = tabName;
  const body = document.getElementById('modalBody');
  if (body) {
    body.innerHTML = generateCanteenHTML();
  }
};

// Main Canteen Modal HTML Generator
function generateCanteenHTML() {
  const activeTab = window.activeCanteenTab || 'stalls';

  // Navigation Tabs Bar
  const navTabsHTML = \`
    <div class="canteen-tabs">
      <button class="canteen-tab-pill \${activeTab === 'stalls' ? 'active' : ''}" onclick="switchCanteenTab('stalls')">
        🍽️ Cafeteria Stalls &amp; Live Stock Menu
      </button>
      <button class="canteen-tab-pill \${activeTab === 'complaints' ? 'active' : ''}" onclick="switchCanteenTab('complaints')">
        📢 Complaint Box &amp; Redressal (\${window.canteenComplaintsDB.length})
      </button>
      <button class="canteen-tab-pill \${activeTab === 'feedback' ? 'active' : ''}" onclick="switchCanteenTab('feedback')">
        ⭐ Feedback &amp; Suggestions (\${window.canteenFeedbackDB.length})
      </button>
    </div>
  \`;

  // TAB 1: STALLS & MENUS
  if (activeTab === 'stalls') {
    const cardsHTML = canteenStallsData.map(c => {
      // Calculate total available and out of stock items for this stall
      let availableCount = 0;
      let outOfStockCount = 0;
      c.menu.forEach(m => {
        if (m.stock > 0) availableCount++;
        else outOfStockCount++;
      });

      return \`
        <div class="drill-card" onclick="showCanteenDetail('\${c.id}')" style="cursor:pointer;">
          <div class="drill-card-img-wrap">
            <img class="drill-card-img" src="\${c.img}" alt="\${c.title}" loading="lazy">
            <span class="drill-card-badge">\${c.tag}</span>
          </div>
          <div class="drill-card-body">
            <div class="drill-card-title">\${c.title}</div>
            <div style="margin: 4px 0 8px 0; display:flex; gap:6px; flex-wrap:wrap;">
              <span class="stock-badge in-stock">\${availableCount} Items In Stock</span>
              \${outOfStockCount > 0 ? \`<span class="stock-badge out-of-stock">\${outOfStockCount} Out of Stock</span>\` : ''}
            </div>
            <div class="drill-card-desc">\${c.desc}</div>
            <div class="drill-card-footer">
              <span>🍴 Open: 7:30 AM – 6:30 PM</span>
              <span style="color:#08752f; font-weight:700;">View Menu &amp; Stock →</span>
            </div>
          </div>
        </div>
      \`;
    }).join('');

    return \`
      <div>
        \${navTabsHTML}
        <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
          🍃 <strong>Green Dining &amp; Live Stock Counters:</strong> HITAM Multi-Stall Cafeteria is FSSAI-certified. Browse menu availability below or use the Complaint Box and Feedback tabs to share input directly with the Canteen Committee.
        </div>
        <div class="drill-grid">
          \${cardsHTML}
        </div>
      </div>
    \`;
  }

  // TAB 2: COMPLAINT BOX
  if (activeTab === 'complaints') {
    const complaintCardsHTML = window.canteenComplaintsDB.map(c => \`
      <div class="complaint-card \${c.urgency === 'High' ? 'high' : (c.urgency === 'Urgent' ? 'urgent' : '')}">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:4px;">
          <div>
            <strong style="color:#0f172a; font-size:13px;">\${c.subject}</strong>
            <div style="font-size:11px; color:#64748b;">\${c.id} • Category: <b>\${c.category}</b> • Date: \${c.date} • Logged by: \${c.user}</div>
          </div>
          <span class="complaint-badge \${c.status === 'Resolved' ? 'resolved' : (c.status === 'In Progress' ? 'in-progress' : 'under-review')}">
            \${c.status}
          </span>
        </div>
        <div style="font-size:12px; color:#334155; margin-top:6px; background:#f8fafc; padding:6px 10px; border-radius:4px;">
          <strong>Committee Action Note:</strong> \${c.remarks}
        </div>
      </div>
    \`).join('');

    return \`
      <div>
        \${navTabsHTML}
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📢</span> Canteen Grievance &amp; Hygiene Complaint Box
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Directly submit feedback regarding food preparation, stall cleanliness, token billing speed, seating, or drinking water. Every ticket is reviewed by the Canteen Food &amp; Hygiene Committee.
          </p>

          <form onsubmit="event.preventDefault(); submitCanteenComplaint();" style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:14px; margin-bottom:16px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div class="portal-field-group">
                <label>Complaint Category:</label>
                <select id="canteenCompCategory" class="portal-filter-select">
                  <option value="Food Quality &amp; Taste">Food Quality &amp; Taste</option>
                  <option value="Cleanliness &amp; Hygiene">Cleanliness &amp; Table Hygiene</option>
                  <option value="Billing &amp; Token Waiting Time">Billing, Tokens &amp; Queue Speed</option>
                  <option value="Drinking Water &amp; Facilities">Drinking Water &amp; Hand Wash Disposal</option>
                  <option value="Portion Size &amp; Pricing">Portion Size &amp; Pricing</option>
                </select>
              </div>

              <div class="portal-field-group">
                <label>Urgency Level:</label>
                <select id="canteenCompUrgency" class="portal-filter-select">
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent / Immediate Attention</option>
                </select>
              </div>
            </div>

            <div class="portal-field-group">
              <label>Your Name / Roll No / ID (Optional):</label>
              <input type="text" id="canteenCompUser" placeholder="e.g. Bhukya Vishnu (23E51A6619) or Student">
            </div>

            <div class="portal-field-group">
              <label>Brief Subject Line:</label>
              <input type="text" id="canteenCompSubject" placeholder="e.g. North dining bay handwash dispenser empty" required>
            </div>

            <div class="portal-field-group">
              <label>Detailed Issue Description:</label>
              <textarea id="canteenCompDesc" rows="3" style="width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:8px; font-size:12.5px;" placeholder="Describe what happened, which stall, or specific table area..." required></textarea>
            </div>

            <button type="submit" class="drill-action-btn drill-action-primary" style="margin-top:8px;">Submit Canteen Complaint Ticket →</button>
          </form>

          <h5 style="margin:16px 0 8px 0; color:#013b1f;">Registered Canteen Grievances &amp; Action Log:</h5>
          \${complaintCardsHTML}
        </div>
      </div>
    \`;
  }

  // TAB 3: FEEDBACK & SUGGESTIONS
  if (activeTab === 'feedback') {
    const feedbackCardsHTML = window.canteenFeedbackDB.map(f => {
      const stars = '⭐'.repeat(f.tasteRating);
      return \`
        <div style="background:#ffffff; border:1px solid #d4ebd8; border-radius:6px; padding:12px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <strong style="color:#0f172a; font-size:13px;">\${f.dish}</strong>
            <span style="font-size:11px; color:#15803d; font-weight:700;">Taste: \${stars} (\${f.tasteRating}/5)</span>
          </div>
          <div style="font-size:11px; color:#64748b; margin:2px 0 6px 0;">Submitted by: <b>\${f.user}</b> • Date: \${f.date}</div>
          <div style="font-size:12px; color:#334155; background:#f0fdf4; border-left:3px solid #16a34a; padding:6px 10px; border-radius:0 4px 4px 0;">
            💡 <em>"\${f.suggestion}"</em>
          </div>
        </div>
      \`;
    }).join('');

    return \`
      <div>
        \${navTabsHTML}
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>⭐</span> Cafeteria Feedback &amp; New Dish Suggestions
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Share your taste evaluation, cleanliness rating, or suggest new healthy dishes and seasonal menu items for our chefs to prepare.
          </p>

          <form onsubmit="event.preventDefault(); submitCanteenFeedback();" style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:14px; margin-bottom:16px;">
            <div class="portal-field-group">
              <label>Select Stall or Menu Service:</label>
              <select id="canteenFbStall" class="portal-filter-select">
                <option value="Stall 1: Royal Food Court (Tiffins &amp; Biryani)">Stall 1: Royal Food Court (Tiffins, Meals &amp; Biryani)</option>
                <option value="Stall 2: Fast Food Corner (Momos &amp; Snacks)">Stall 2: Fast Food Corner (Momos, Burgers &amp; Shawarma)</option>
                <option value="Stall 3: Green Cafe &amp; Bakery">Stall 3: Green Cafe, Shakes &amp; Bakery</option>
                <option value="General Dining &amp; Cafeteria Hall">General Dining &amp; Cafeteria Hall</option>
              </select>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:10px 0;">
              <div>
                <label style="font-size:11.5px; font-weight:700; color:#0b4f26; display:block; margin-bottom:4px;">Food Taste &amp; Freshness:</label>
                <div class="rating-stars-row">
                  <button type="button" class="rating-chip" id="crate_taste_1" onclick="canteenSelectRating('taste', 1)">1 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_taste_2" onclick="canteenSelectRating('taste', 2)">2 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_taste_3" onclick="canteenSelectRating('taste', 3)">3 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_taste_4" onclick="canteenSelectRating('taste', 4)">4 ⭐</button>
                  <button type="button" class="rating-chip active" id="crate_taste_5" onclick="canteenSelectRating('taste', 5)">5 ⭐</button>
                </div>
              </div>

              <div>
                <label style="font-size:11.5px; font-weight:700; color:#0b4f26; display:block; margin-bottom:4px;">Hygiene &amp; Cleanliness:</label>
                <div class="rating-stars-row">
                  <button type="button" class="rating-chip" id="crate_hyg_1" onclick="canteenSelectRating('hyg', 1)">1 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_hyg_2" onclick="canteenSelectRating('hyg', 2)">2 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_hyg_3" onclick="canteenSelectRating('hyg', 3)">3 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_hyg_4" onclick="canteenSelectRating('hyg', 4)">4 ⭐</button>
                  <button type="button" class="rating-chip active" id="crate_hyg_5" onclick="canteenSelectRating('hyg', 5)">5 ⭐</button>
                </div>
              </div>
            </div>

            <div class="portal-field-group">
              <label>Your Name / Student ID:</label>
              <input type="text" id="canteenFbUser" placeholder="e.g. Bhukya Vishnu (23E51A6619)">
            </div>

            <div class="portal-field-group">
              <label>New Dish Idea or Constructive Suggestion:</label>
              <textarea id="canteenFbSuggestion" rows="2" style="width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:8px; font-size:12.5px;" placeholder="Suggest new dishes (e.g. multi-grain dosa, cold brew, fruit bowls) or improvements..." required></textarea>
            </div>

            <button type="submit" class="drill-action-btn drill-action-primary" style="margin-top:8px;">Submit Feedback &amp; Dish Suggestion →</button>
          </form>

          <h5 style="margin:16px 0 8px 0; color:#013b1f;">Student &amp; Faculty Suggestions Board:</h5>
          \${feedbackCardsHTML}
        </div>
      </div>
    \`;
  }

  return '';
}

// Rating chip handler for Canteen
window.canteenRatingsState = { taste: 5, hyg: 5 };
window.canteenSelectRating = function(metric, val) {
  window.canteenRatingsState[metric] = val;
  for (let i = 1; i <= 5; i++) {
    const chip = document.getElementById(\`crate_\${metric}_\${i}\`);
    if (chip) {
      if (i === val) chip.classList.add('active');
      else chip.classList.remove('active');
    }
  }
};

// Complaint submit handler
window.submitCanteenComplaint = function() {
  const catEl = document.getElementById('canteenCompCategory');
  const urgEl = document.getElementById('canteenCompUrgency');
  const userEl = document.getElementById('canteenCompUser');
  const subEl = document.getElementById('canteenCompSubject');
  const descEl = document.getElementById('canteenCompDesc');

  if (!subEl || !subEl.value.trim() || !descEl || !descEl.value.trim()) {
    showDemoNotice('Please provide a subject line and description for your canteen complaint.');
    return;
  }

  const newTicket = {
    id: \`CAN-TKT-\${Math.floor(107 + Math.random() * 892)}\`,
    date: new Date().toISOString().slice(0, 10),
    category: catEl ? catEl.value : 'Food Quality & Taste',
    user: userEl && userEl.value.trim() ? userEl.value.trim() : 'Anonymous Student',
    subject: subEl.value.trim(),
    urgency: urgEl ? urgEl.value : 'Normal',
    status: 'Under Review',
    remarks: 'Acknowledged and assigned to Cafeteria Food & Hygiene Inspection Team.'
  };

  window.canteenComplaintsDB.unshift(newTicket);
  showDemoNotice(\`Complaint ticket \${newTicket.id} registered! Assigned to Canteen Hygiene Committee.\`);
  window.switchCanteenTab('complaints');
};

// Feedback submit handler
window.submitCanteenFeedback = function() {
  const stallEl = document.getElementById('canteenFbStall');
  const userEl = document.getElementById('canteenFbUser');
  const sugEl = document.getElementById('canteenFbSuggestion');

  if (!sugEl || !sugEl.value.trim()) {
    showDemoNotice('Please enter your suggestion or feedback.');
    return;
  }

  const newFeedback = {
    date: new Date().toISOString().slice(0, 10),
    user: userEl && userEl.value.trim() ? userEl.value.trim() : 'Student',
    dish: stallEl ? stallEl.value : 'General Cafeteria',
    tasteRating: window.canteenRatingsState.taste || 5,
    hygieneRating: window.canteenRatingsState.hyg || 5,
    suggestion: sugEl.value.trim()
  };

  window.canteenFeedbackDB.unshift(newFeedback);
  showDemoNotice(\`Thank you! Your feedback for \${newFeedback.dish} has been posted to the Suggestions Board.\`);
  window.switchCanteenTab('feedback');
};

// Add to Tray with Stock Management
window.addToCanteenTray = function(stallId, itemIndex) {
  const stall = canteenStallsData.find(s => s.id === stallId);
  if (!stall || !stall.menu[itemIndex]) return;
  const m = stall.menu[itemIndex];

  if (m.stock <= 0) {
    showToast(\`⚠️ Sorry! "\${m.item}" is currently Out of Stock.\`);
    return;
  }

  // Decrement stock in real-time
  m.stock -= 1;
  canteenTrayTotal += m.price;
  canteenTrayCount += 1;
  window.canteenTrayTotal = canteenTrayTotal;
  window.canteenTrayCount = canteenTrayCount;

  if (m.stock === 0) {
    showToast(\`Added last piece of "\${m.item}"! Item is now Out of Stock (0 left).\`);
  } else if (m.stock <= 5) {
    showToast(\`Added "\${m.item}" (₹\${m.price})! ⚠️ Limited Stock (\${m.stock} pieces left).\`);
  } else {
    showToast(\`Added "\${m.item}" (₹\${m.price})! (\${m.stock} pieces left in stock).\`);
  }

  // Refresh stall view to reflect updated stock badge and buttons
  showCanteenDetail(stallId);
};

// Clear Tray
window.clearCanteenTray = function(stallId = null) {
  canteenTrayTotal = 0;
  canteenTrayCount = 0;
  window.canteenTrayTotal = 0;
  window.canteenTrayCount = 0;
  const totalEl = document.getElementById('trayTotalDisplay');
  const countEl = document.getElementById('trayCountDisplay');
  if (totalEl) totalEl.textContent = \`₹0\`;
  if (countEl) countEl.textContent = \`0 Items Selected for Estimation\`;
  showToast('Food tray calculator cleared.');
};

// Stall Detail View with Live Stock Badges and Direct Buttons
window.showCanteenDetail = function(stallId) {
  const c = canteenStallsData.find(x => x.id === stallId);
  if (!c) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  const menuItemsHTML = c.menu.map((m, idx) => {
    const isOutOfStock = m.stock <= 0;
    const badgeHTML = getCanteenStockBadgeHTML(m.stock, m.maxStock);

    const actionButton = isOutOfStock
      ? \`<button class="drill-action-btn" disabled style="background:#f1f5f9; color:#94a3b8; border:1px solid #cbd5e1; cursor:not-allowed; padding:5px 12px; font-size:11.5px;">Out of Stock</button>\`
      : \`<button class="drill-action-btn drill-action-primary" style="padding:5px 12px; font-size:11.5px;" onclick="addToCanteenTray('\${c.id}', \${idx})">+ Add (\${m.stock} left)</button>\`;

    return \`
      <div class="modal-feature-card" style="display:flex; justify-content:space-between; align-items:center; \${isOutOfStock ? 'opacity:0.75; background:#fbfbfb;' : ''}">
        <div style="flex:1; padding-right:12px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <strong style="font-size:13.5px; color:#0b4f26;">\${m.item}</strong>
            \${badgeHTML}
          </div>
          <span style="display:block; font-size:12px; color:#557260; margin:2px 0;">\${m.desc}</span>
          <b style="color:#08752f; font-size:13px; font-weight:800;">₹\${m.price}</b>
        </div>
        <div>
          \${actionButton}
        </div>
      </div>
    \`;
  }).join('');

  body.innerHTML = \`
    <div class="drill-detail-view">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
        <button class="sub-back-btn" onclick="openModal('canteen')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Back to All Stalls</span>
        </button>

        <div style="display:flex; gap:6px;">
          <button class="drill-action-btn drill-action-secondary" style="font-size:11px; padding:4px 10px;" onclick="switchCanteenTab('complaints')">📢 File Complaint</button>
          <button class="drill-action-btn drill-action-secondary" style="font-size:11px; padding:4px 10px;" onclick="switchCanteenTab('feedback')">⭐ Give Feedback</button>
        </div>
      </div>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="\${c.img}" alt="\${c.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">\${c.tag}</span>
          <div class="drill-hero-title">\${c.title}</div>
          <div class="drill-hero-sub">FSSAI Certified • Open: 7:30 AM – 6:30 PM • Live Counter Stock Tracking</div>
        </div>
      </div>

      <h4>🍽️ Stall Menu with Real-Time Stock Status:</h4>
      <div style="display:flex; flex-direction:column; gap:8px;">
        \${menuItemsHTML}
      </div>

      <div class="canteen-order-tray" style="margin-top:16px;">
        <div>
          <div style="font-size:11px; text-transform:uppercase; color:#0b4f26; font-weight:800;">🛒 Canteen Price Estimator (Demonstration Calculator Only — In-Person Counter Billing):</div>
          <div class="canteen-tray-items" id="trayCountDisplay">\${canteenTrayCount} Items Selected for Estimation</div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <div>
            <span style="font-size:11px; color:#557260;">Estimated Total:</span>
            <div class="canteen-tray-total" id="trayTotalDisplay">₹\${canteenTrayTotal}</div>
          </div>
          <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Price Estimator: In-person meal tokens are purchased at the cafeteria billing counter. No online order or payment is processed.')">Estimate Bill Summary</button>
          <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="clearCanteenTray('\${c.id}')">Reset Calculator</button>
        </div>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  \`;
};
`;

const updatedPart1 = part1.slice(0, sec10Start) + newSection10 + '\n' + part1.slice(sec11Start);

fs.writeFileSync('scratch/part1_clean.js', updatedPart1, 'utf8');
console.log('Successfully updated scratch/part1_clean.js with enhanced Canteen module!');
