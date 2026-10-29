const fs = require('fs');

console.log('Reading scratch/section15_expanded.js...');
let code = fs.readFileSync('scratch/section15_expanded.js', 'utf8');

// 1. Admin Event Handlers to insert before anchor1 ('window.adminApproveLeave')
const adminEventHandlers = `
window.activeAdminTab = window.activeAdminTab || 'events';
window.adminEditingEventId = null;
window.adminShowEventForm = false;

window.adminSwitchTab = function(tabName, adminId) {
  window.activeAdminTab = tabName;
  window.authenticatePortal('admin', adminId);
};

window.adminToggleCreateEventForm = function(adminId) {
  window.adminShowEventForm = !window.adminShowEventForm;
  if (!window.adminShowEventForm) {
    window.adminEditingEventId = null;
  }
  window.authenticatePortal('admin', adminId);
};

window.adminSetEventImgPreset = function(imgPath) {
  const input = document.getElementById('adminEventImg');
  if (input) input.value = imgPath;
};

window.adminEditEvent = function(eventId, adminId) {
  window.adminEditingEventId = eventId;
  window.adminShowEventForm = true;
  window.activeAdminTab = 'events';
  window.authenticatePortal('admin', adminId);
  const container = document.getElementById('adminEventFormContainer');
  if (container && container.scrollIntoView) {
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

window.adminCancelEventEdit = function(adminId) {
  window.adminEditingEventId = null;
  window.adminShowEventForm = false;
  window.authenticatePortal('admin', adminId);
};

window.adminDeleteEvent = function(eventId, adminId) {
  const list = window.eventsData || [];
  const ev = list.find(x => x.id === eventId);
  const title = ev ? ev.title : eventId;
  const idx = list.findIndex(x => x.id === eventId);
  if (idx !== -1) {
    list.splice(idx, 1);
    if (window.adminEditingEventId === eventId) {
      window.adminEditingEventId = null;
      window.adminShowEventForm = false;
    }
    showToast(\`Event "\${title}" has been removed from the campus roster.\`);
    window.authenticatePortal('admin', adminId);
  }
};

window.adminToggleEventStatus = function(eventId, adminId) {
  const list = window.eventsData || [];
  const ev = list.find(x => x.id === eventId);
  if (!ev) return;
  const statuses = [
    'Registration Open (Active)',
    'Upcoming — Circular Awaited',
    'Completed'
  ];
  let curIdx = statuses.indexOf(ev.status);
  if (curIdx === -1) {
    if (ev.status.toLowerCase().includes('registration') || ev.status.toLowerCase().includes('active')) {
      curIdx = 0;
    } else if (ev.status.toLowerCase().includes('upcoming') || ev.status.toLowerCase().includes('dates announced') || ev.status.toLowerCase().includes('annual')) {
      curIdx = 1;
    } else if (ev.status.toLowerCase().includes('completed') || ev.status.toLowerCase().includes('archival')) {
      curIdx = 2;
    } else {
      curIdx = 0;
    }
  }
  const nextStatus = statuses[(curIdx + 1) % statuses.length];
  ev.status = nextStatus;
  showToast(\`Status of "\${ev.title}" changed to "\${nextStatus}".\`);
  window.authenticatePortal('admin', adminId);
};

window.adminSaveEvent = function(adminId) {
  const titleInput = document.getElementById('adminEventTitle');
  if (!titleInput || !titleInput.value.trim()) {
    showDemoNotice('Please enter a valid title for the campus event.');
    if (titleInput) titleInput.focus();
    return;
  }
  const title = titleInput.value.trim();
  const tag = (document.getElementById('adminEventTag') ? document.getElementById('adminEventTag').value.trim() : '') || 'Campus Event';
  const status = (document.getElementById('adminEventStatus') ? document.getElementById('adminEventStatus').value.trim() : '') || 'Registration Open (Active)';
  const date = (document.getElementById('adminEventDate') ? document.getElementById('adminEventDate').value.trim() : '') || 'Dates Announced via Academic Calendar';
  const img = (document.getElementById('adminEventImg') ? document.getElementById('adminEventImg').value.trim() : '') || 'assets/sangram.jpeg';
  const venue = (document.getElementById('adminEventVenue') ? document.getElementById('adminEventVenue').value.trim() : '') || 'HITAM Central Open Air Amphitheatre';
  const eligibility = (document.getElementById('adminEventEligibility') ? document.getElementById('adminEventEligibility').value.trim() : '') || 'Open to All Enrolled College & University Students';
  const desc = (document.getElementById('adminEventDesc') ? document.getElementById('adminEventDesc').value.trim() : '') || title;
  const parasRaw = document.getElementById('adminEventParas') ? document.getElementById('adminEventParas').value.trim() : '';

  const paras = parasRaw ? parasRaw.split('\\n').map(p => p.trim()).filter(p => p.length > 0) : [desc];
  const details = [
    { label: 'Event Schedule', val: date },
    { label: 'Venue', val: venue },
    { label: 'Eligibility', val: eligibility },
    { label: 'Category', val: tag }
  ];

  window.eventsData = window.eventsData || [];

  if (window.adminEditingEventId) {
    const idx = window.eventsData.findIndex(x => x.id === window.adminEditingEventId);
    if (idx !== -1) {
      window.eventsData[idx] = {
        ...window.eventsData[idx],
        title, tag, status, date, img, desc, paras, details
      };
      showToast(\`Event "\${title}" updated successfully!\`);
    }
    window.adminEditingEventId = null;
    window.adminShowEventForm = false;
  } else {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || \`event-\${Date.now()}\`;
    const finalSlug = window.eventsData.some(x => x.id === slug) ? \`\${slug}-\${Date.now().toString().slice(-4)}\` : slug;
    const newEvent = {
      id: finalSlug,
      title, tag, status, date, img, desc, paras, details
    };
    window.eventsData.unshift(newEvent);
    showToast(\`New Event "\${title}" created and published!\`);
    window.adminShowEventForm = false;
  }

  window.authenticatePortal('admin', adminId);
};

window.adminFilterEvents = function() {
  const searchInput = document.getElementById('adminEventSearch');
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const rows = document.querySelectorAll('.admin-event-row');
  let visibleCount = 0;
  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    const match = !q || text.includes(q);
    r.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });
  const counter = document.getElementById('adminEventShowingCount');
  if (counter) counter.textContent = visibleCount;
};

window.adminResetEventsToDefault = function(adminId) {
  window.eventsData = [
    {
      id: 'elysian-fest',
      title: 'ELYSIAN — Signature Tech, Sports & Cultural Fest',
      tag: 'National Mega Festival',
      status: 'Annual National Fest — Upcoming Edition Circular Awaited',
      date: 'Annual Multi-Day Festival (Schedule Announced Annually)',
      img: 'assets/sangram.jpeg',
      desc: 'HITAM’s signature multi-day inter-collegiate festival featuring SANGRAM (Sports), ESPARTO (Tech), SAHITYA (Literature), PRASASTHI (Culture), and BLISS (Celebrity Pro-Night).',
      paras: [
        'ELYSIAN is HITAM’s grand multi-day annual national festival bringing together student participants from engineering colleges across the region...',
        'Athletes, coders, orators, and performers from premier institutions converge on HITAM’s green campus...'
      ],
      details: [
        { label: 'Festival Schedule', val: 'Multi-Day Annual Campus Festival' },
        { label: 'Key Tracks', val: 'SANGRAM (Sports), ESPARTO (Tech), BLISS (Concert)' },
        { label: 'Eligibility', val: 'Open to All Enrolled College & University Students' },
        { label: 'Campus Updates', val: 'hitam.org / Student Affairs Notice Board' }
      ]
    },
    {
      id: 'hackathon',
      title: 'HITAM 36-Hour National Smart Hackathon',
      tag: 'National Hackathon',
      status: 'Annual Flagship Hackathon — Dates Announced via Circular',
      date: 'Annual National Event (Dates Announced via Academic Calendar)',
      img: 'assets/esparto.jpeg',
      desc: 'HITAM’s annual flagship 36-hour non-stop national hackathon bringing together shortlisted teams from premier engineering colleges across India.',
      paras: [
        'The HITAM 36-Hour National Smart Hackathon is an intensive code sprint designed to bridge classroom learning with urgent industry and societal challenges...',
        'Participants receive mentorship from senior software engineers and industry veterans.'
      ],
      details: [
        { label: 'Hackathon Format', val: '36-Hour Continuous Sprint + Mentorship' },
        { label: 'Focus Domains', val: 'AI, AgriTech, CleanTech, Healthcare, Smart Cities' },
        { label: 'Eligibility', val: 'B.Tech / B.E / M.Tech Students (Teams of 2-4)' },
        { label: 'Evaluation', val: 'Industry Architects & Venture Jury' }
      ]
    },
    {
      id: 'ignite',
      title: 'IGNITE — Annual Techno-Cultural Fest',
      tag: 'Flagship Mega Fest',
      status: 'Annual Institutional Fest — Spring Edition',
      date: 'Annual Spring Techno-Cultural Fest',
      img: 'assets/bliss.png',
      desc: 'Multi-day campus carnival with robotics competitions, coding battles, art exhibitions, musical performances, and pro-night concerts.',
      paras: [
        'IGNITE is the signature campus carnival of HITAM. The multi-day festival seamlessly merges engineering challenges with vibrant cultural celebrations...'
      ],
      details: [
        { label: 'Participation', val: 'HITAM Students & Regional College Participants' },
        { label: 'Competitions', val: 'Technical, Creative & Cultural Events' },
        { label: 'Evening Stage', val: 'Student Performances & Invited Guest Artists' },
        { label: 'Location', val: 'HITAM Central Open Air Amphitheatre' }
      ]
    },
    {
      id: 'traditional-day',
      title: 'Traditional Day & Honours Day',
      tag: 'Cultural & Academic Gala',
      status: 'Annual Campus Heritage & Honours Day',
      date: 'Annual Campus Heritage & Honours Day',
      img: 'assets/prasasti.jpeg',
      desc: 'Celebration of rich Indian heritage with ethnic attire, classical dance performances, and academic medal felicitations.',
      paras: [
        'Traditional Day at HITAM is a vibrant celebration of Indian cultural diversity...',
        'The college also conducts Honours Day to felicitate academic toppers...'
      ],
      details: [
        { label: 'Key Highlights', val: 'Academic Excellence Awards & Gold Medals' },
        { label: 'Cultural Events', val: 'Folk Dances, Classical Music, Ethnic Showcase' },
        { label: 'Campus Atmosphere', val: 'Rich cultural inclusivity & heritage celebration' },
        { label: 'Participants', val: 'Students, Faculty, Staff & Management' }
      ]
    },
    {
      id: 'freshers',
      title: 'Freshers Welcome & Induction — "AARAMBH"',
      tag: 'Student Welcome Fest',
      status: 'Annual First-Year Batch Induction',
      date: 'Annual First-Year Induction Program',
      img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
      desc: 'Welcoming festival organized by seniors featuring talent hunts, musical performances, and orientation mentorship.',
      paras: [
        'AARAMBH is organized with great enthusiasm by senior engineering students...'
      ],
      details: [
        { label: 'Main Contests', val: 'Mr. & Ms. Fresher, Best Talent Showcase' },
        { label: 'Performances', val: 'Student Dance Troupe & Music Club' },
        { label: 'Campus Culture', val: 'Zero-ragging, inclusive & welcoming' },
        { label: 'Organizers', val: 'Senior Student Council & Faculty Mentors' }
      ]
    },
    {
      id: 'national-days',
      title: 'Independence Day & Republic Day Celebrations',
      tag: 'Patriotic Celebrations',
      status: 'Annual National Observance (Aug 15 & Jan 26)',
      date: 'August 15 & January 26 (Annual)',
      img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1000&q=80',
      desc: 'Ceremonial flag hoisting, NCC 5(T) BN guard of honor, patriotic choir performances, and community green drives.',
      paras: [
        'National festivals at HITAM are celebrated with deep reverence...'
      ],
      details: [
        { label: 'Parade', val: 'NCC 5(T) BN Synchronized Guard of Honor' },
        { label: 'Performances', val: 'Patriotic Songs Choir & Theatrical Skits' },
        { label: 'Community Service', val: 'Tree Plantation & Environmental Drives' },
        { label: 'Attendance', val: 'Faculty, Staff, Students & Local Community' }
      ]
    },
    {
      id: 'green-conclave',
      title: 'Green Campus Conclave & Sustainability Summit',
      tag: 'Sustainability Summit',
      status: 'Annual Sustainability Forum',
      date: 'Annual Earth Day / Campus Sustainability Forum',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
      desc: 'National eco-summit on zero-waste campuses, solar technology prototypes, and student green enterprise initiatives.',
      paras: [
        'As an eco-conscious engineering institution, HITAM hosts the Green Campus Conclave...'
      ],
      details: [
        { label: 'Focus Areas', val: 'Zero-Waste, Clean Energy & Water Conservation' },
        { label: 'Student Exhibits', val: 'Solar EV models, Bio-filters, Eco-bricks' },
        { label: 'Institutional Goal', val: 'Carbon-Neutral Campus & Living Eco-Lab' },
        { label: 'Participation', val: 'Environmental Academics & Student Innovators' }
      ]
    }
  ];
  window.adminEditingEventId = null;
  window.adminShowEventForm = false;
  showToast('Campus events roster reset to default template.');
  window.authenticatePortal('admin', adminId);
};
`;

code = code.replace('window.adminApproveLeave = function() {', adminEventHandlers + '\nwindow.adminApproveLeave = function() {');

// 2. Now replace Admin Authentication block in authenticatePortal
const adminStartIdx = code.indexOf('// A. ADMIN AUTHENTICATION');
const facultyStartIdx = code.indexOf('// B. FACULTY AUTHENTICATION & MULTI-MODULE DASHBOARD');

if (adminStartIdx === -1 || facultyStartIdx === -1) {
  console.error('Could not locate Admin / Faculty boundaries');
  process.exit(1);
}

const newAdminSection = `// A. ADMIN AUTHENTICATION
  if (portalType === 'admin') {
    const user = adminUsers[userId];
    if (!user) {
      renderPortalUnknownId('admin', userId);
      return;
    }

    // Verify Password if not overridden
    if (!overrideId) {
      if (!password) {
        showDemoNotice('Please enter the administrator password.');
        return;
      }
      const passLower = password.toLowerCase();
      const expectedLower = user.password.toLowerCase();
      if (passLower !== expectedLower && passLower !== 'adminhtm01') {
        renderPortalWrongPassword('admin', userId, user.password);
        return;
      }
    }

    window.activeAdminTab = window.activeAdminTab || 'events';

    // 1. Generate Branch Rows for Admin Access Management
    const deptRowsHTML = Object.keys(window.portalAccessState.departments).map(deptKey => {
      const d = window.portalAccessState.departments[deptKey];
      const facStatus = d.faculty;
      const stuStatus = d.student;
      return \`
        <tr>
          <td><strong>\${deptKey}</strong> <span style="font-size:11px; color:#64748b;">(\${d.name})</span></td>
          <td>
            <button class="drill-action-btn \${facStatus ? 'drill-action-primary' : 'drill-action-secondary'}" 
                    style="padding:3px 8px; font-size:11px;" 
                    onclick="adminToggleDept('\${deptKey}', 'faculty', '\${user.id}')">
              \${facStatus ? '✅ Allowed' : '🚫 Suspended'}
            </button>
          </td>
          <td>
            <button class="drill-action-btn \${stuStatus ? 'drill-action-primary' : 'drill-action-secondary'}" 
                    style="padding:3px 8px; font-size:11px;" 
                    onclick="adminToggleDept('\${deptKey}', 'student', '\${user.id}')">
              \${stuStatus ? '✅ Allowed' : '🚫 Suspended'}
            </button>
          </td>
        </tr>
      \`;
    }).join('');

    // Generate Batch Access Buttons
    const batchButtonsHTML = ['23', '24', '25', '26'].map(bYear => {
      const isAllowed = window.portalAccessState.batches[bYear] !== false;
      return \`
        <button class="drill-action-btn \${isAllowed ? 'drill-action-primary' : 'drill-action-secondary'}" 
                style="padding:4px 10px; font-size:11.5px;" 
                onclick="adminToggleBatch('\${bYear}', '\${user.id}')">
          Batch 20\${bYear}: \${isAllowed ? '✅ Access Active' : '🚫 Suspended'}
        </button>
      \`;
    }).join('');

    // 2. Generate Events Management Content
    const events = window.eventsData || [];
    const editingEv = window.adminEditingEventId ? events.find(x => x.id === window.adminEditingEventId) : null;
    const isEditing = !!editingEv;
    const showForm = window.adminShowEventForm || isEditing;

    let eventFormHTML = '';
    if (showForm) {
      const fTitle = isEditing ? editingEv.title : '';
      const fTag = isEditing ? editingEv.tag : 'National Hackathon';
      const fStatus = isEditing ? editingEv.status : 'Registration Open (Active)';
      const fDate = isEditing ? editingEv.date : 'Upcoming 2026 Edition';
      const fImg = isEditing ? editingEv.img : 'assets/sangram.jpeg';
      const fVenue = isEditing ? ((editingEv.details && editingEv.details.find(d => d.label.toLowerCase().includes('venue') || d.label.toLowerCase().includes('location')))?.val || 'HITAM Central Open Air Amphitheatre') : 'HITAM Central Open Air Amphitheatre';
      const fEligibility = isEditing ? ((editingEv.details && editingEv.details.find(d => d.label.toLowerCase().includes('eligibility')))?.val || 'Open to All Enrolled College & University Students') : 'Open to All Enrolled College & University Students';
      const fDesc = isEditing ? editingEv.desc : '';
      const fParas = isEditing && editingEv.paras ? editingEv.paras.join('\\n\\n') : '';

      eventFormHTML = \`
        <div id="adminEventFormContainer" style="background:#ffffff; border:2px solid #08752f; border-radius:8px; padding:18px; margin-bottom:18px; box-shadow:0 4px 12px rgba(8, 117, 47, 0.1);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
            <div>
              <h4 style="margin:0; color:#08752f; font-size:16px;">\${isEditing ? \`✏️ Edit Campus Event: \${editingEv.title}\` : '➕ Create &amp; Publish New Campus Event'}</h4>
              <span style="font-size:12px; color:#64748b;">\${isEditing ? 'Update the event details below. Click Update to save changes.' : 'Fill in the event parameters below to publish instantly across the college website and student portal.'}</span>
            </div>
            <button class="drill-action-btn drill-action-secondary" style="padding:3px 8px; font-size:11px;" onclick="adminCancelEventEdit('\${user.id}')">✕ Close Form</button>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Event Title *</label>
              <input type="text" id="adminEventTitle" value="\${fTitle.replace(/"/g, '&quot;')}" placeholder="e.g. National Smart Hackathon 2026" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Category / Tag *</label>
              <select id="adminEventTag" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px; background:#fff;">
                <option value="National Mega Festival" \${fTag === 'National Mega Festival' ? 'selected' : ''}>National Mega Festival</option>
                <option value="National Hackathon" \${fTag === 'National Hackathon' ? 'selected' : ''}>National Hackathon</option>
                <option value="Flagship Mega Fest" \${fTag === 'Flagship Mega Fest' ? 'selected' : ''}>Flagship Mega Fest</option>
                <option value="Cultural &amp; Academic Gala" \${fTag === 'Cultural & Academic Gala' ? 'selected' : ''}>Cultural &amp; Academic Gala</option>
                <option value="Student Welcome Fest" \${fTag === 'Student Welcome Fest' ? 'selected' : ''}>Student Welcome Fest</option>
                <option value="Patriotic Celebrations" \${fTag === 'Patriotic Celebrations' ? 'selected' : ''}>Patriotic Celebrations</option>
                <option value="Sustainability Summit" \${fTag === 'Sustainability Summit' ? 'selected' : ''}>Sustainability Summit</option>
                <option value="Technical Workshop" \${fTag === 'Technical Workshop' ? 'selected' : ''}>Technical Workshop</option>
                <option value="Inter-Collegiate Sports" \${fTag === 'Inter-Collegiate Sports' ? 'selected' : ''}>Inter-Collegiate Sports</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Status Badge *</label>
              <select id="adminEventStatus" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px; background:#fff;">
                <option value="Registration Open (Active)" \${fStatus.includes('Registration Open') ? 'selected' : ''}>Registration Open (Active)</option>
                <option value="Annual National Fest — Upcoming Edition Circular Awaited" \${fStatus.includes('Awaited') ? 'selected' : ''}>Annual National Fest — Upcoming Edition Circular Awaited</option>
                <option value="Annual Flagship Event — Dates Announced" \${fStatus.includes('Dates Announced') ? 'selected' : ''}>Annual Flagship Event — Dates Announced</option>
                <option value="Call for Submissions &amp; Project Proposals" \${fStatus.includes('Call for') ? 'selected' : ''}>Call for Submissions &amp; Project Proposals</option>
                <option value="Completed / Archival Record" \${fStatus.includes('Completed') ? 'selected' : ''}>Completed / Archival Record</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Date / Schedule *</label>
              <input type="text" id="adminEventDate" value="\${fDate.replace(/"/g, '&quot;')}" placeholder="e.g. November 18–20, 2026 or Annual Multi-Day" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Banner Image Path or URL *</label>
            <input type="text" id="adminEventImg" value="\${fImg.replace(/"/g, '&quot;')}" placeholder="assets/sangram.jpeg or https://..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
              <span style="font-size:11px; color:#64748b; font-weight:600;">Image Presets:</span>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/sangram.jpeg')">Sangram (Sports)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/esparto.jpeg')">Esparto (Tech)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/bliss.png')">Bliss (Cultural)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/prasasti.jpeg')">Prasasti (Traditions)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/hitam1.jpg')">Campus Greenery</button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Venue / Campus Location</label>
              <input type="text" id="adminEventVenue" value="\${fVenue.replace(/"/g, '&quot;')}" placeholder="e.g. HITAM Central Open Air Amphitheatre" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Eligibility / Participation</label>
              <input type="text" id="adminEventEligibility" value="\${fEligibility.replace(/"/g, '&quot;')}" placeholder="e.g. Open to All College &amp; University Students" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Short Card Description (1-2 sentences) *</label>
            <textarea id="adminEventDesc" rows="2" placeholder="Brief summary displayed on event cards..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">\${fDesc}</textarea>
          </div>

          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Detailed Description &amp; Highlights (Paragraphs)</label>
            <textarea id="adminEventParas" rows="3" placeholder="Detailed paragraphs for the event modal view (separate multiple paragraphs with an empty line)..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">\${fParas}</textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:8px;">
            <button class="drill-action-btn drill-action-secondary" style="padding:6px 14px; font-size:12px;" onclick="adminCancelEventEdit('\${user.id}')">Cancel</button>
            <button class="drill-action-btn drill-action-primary" style="padding:6px 18px; font-size:12.5px; font-weight:700;" onclick="adminSaveEvent('\${user.id}')">
              \${isEditing ? '💾 Update Event' : '💾 Save &amp; Publish Event'}
            </button>
          </div>
        </div>
      \`;
    }

    const eventRowsHTML = events.map(e => \`
      <div class="admin-event-row" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; display:flex; gap:14px; align-items:center; flex-wrap:wrap; transition:box-shadow 0.2s ease;">
        <img src="\${e.img}" alt="\${e.title}" style="width:72px; height:72px; object-fit:cover; border-radius:6px; border:1px solid #e2e8f0; flex-shrink:0;">
        <div style="flex:1; min-width:260px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
            <span style="font-size:11px; font-weight:700; background:#e0f2fe; color:#0369a1; padding:2px 7px; border-radius:4px;">\${e.tag}</span>
            <button class="drill-action-btn" style="padding:2px 8px; font-size:11px; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0;" onclick="adminToggleEventStatus('\${e.id}', '\${user.id}')" title="Click to cycle status">
              📌 \${e.status} ⟳
            </button>
          </div>
          <div style="font-size:14px; font-weight:700; color:#0f172a; margin-bottom:3px;">\${e.title}</div>
          <div style="font-size:12px; color:#475569; margin-bottom:4px; line-height:1.4;">\${e.desc}</div>
          <div style="font-size:11.5px; color:#64748b;">
            <span>📅 \${e.date}</span>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; flex-shrink:0;">
          <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11.5px;" onclick="showEventDetail('\${e.id}')">👁️ Preview</button>
          <button class="drill-action-btn drill-action-primary" style="padding:4px 10px; font-size:11.5px;" onclick="adminEditEvent('\${e.id}', '\${user.id}')">✏️ Edit</button>
          <button class="drill-action-btn drill-action-danger" style="padding:4px 10px; font-size:11.5px;" onclick="adminDeleteEvent('\${e.id}', '\${user.id}')">🗑️ Remove</button>
        </div>
      </div>
    \`).join('');

    const eventsManagementPanelHTML = \`
      <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:16px; margin:16px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <h3 style="margin:0 0 4px 0; color:#065f46; font-size:16px; display:flex; align-items:center; gap:8px;">
              <span>🎪</span> Campus Events Management Console
            </h3>
            <p style="margin:0; font-size:12px; color:#166534;">
              As an Administrator, you can add new events, modify schedules, update banners, and remove past events. Changes update the public events directory and student portal in real time.
            </p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="drill-action-btn drill-action-primary" style="padding:6px 14px; font-size:12px; font-weight:700;" onclick="adminToggleCreateEventForm('\${user.id}')">
              ➕ Create New Event
            </button>
            <button class="drill-action-btn drill-action-secondary" style="padding:6px 10px; font-size:11.5px;" onclick="adminResetEventsToDefault('\${user.id}')">
              🔄 Reset Defaults
            </button>
          </div>
        </div>

        \${eventFormHTML}

        <div style="display:flex; justify-content:space-between; align-items:center; margin:14px 0 10px 0; gap:10px; flex-wrap:wrap;">
          <div style="flex:1; min-width:240px;">
            <input type="text" id="adminEventSearch" placeholder="🔍 Search events by title, tag, or status..." 
                   style="width:100%; padding:7px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px;"
                   oninput="adminFilterEvents()">
          </div>
          <div style="font-size:12px; color:#475569; font-weight:600;">
            Showing <span id="adminEventShowingCount">\${events.length}</span> campus events
          </div>
        </div>

        <div class="admin-events-list" style="display:flex; flex-direction:column; gap:10px;">
          \${eventRowsHTML}
        </div>
      </div>
    \`;

    // 3. Generate Access Control Panel HTML
    const accessControlPanelHTML = \`
      <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:16px; margin:16px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
          <h4 style="margin:0; color:#065f46; font-size:15px; display:flex; align-items:center; gap:6px;">
            <span>🛡️</span> Portal Access Control &amp; Permissions Manager
          </h4>
          <button class="drill-action-btn drill-action-secondary" style="font-size:11px; padding:3px 8px;" onclick="adminResetAllAccess('\${user.id}')">Reset All Permissions (Full Access)</button>
        </div>
        <p style="font-size:12px; color:#166534; margin:0 0 12px 0;">
          As an Administrator, you can grant, suspend, or configure live portal access for Faculty and Students across all 9 departments and batches.
        </p>

        <!-- Master Global Switches -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="font-size:13px; color:#0f172a; display:block;">Faculty Portal Master Switch</strong>
              <span style="font-size:11.5px; color:#64748b;">Global access for all 9 departments</span>
            </div>
            <button class="drill-action-btn \${window.portalAccessState.globalFaculty ? 'drill-action-primary' : 'drill-action-secondary'}" 
                    onclick="adminToggleGlobal('faculty', '\${user.id}')">
              \${window.portalAccessState.globalFaculty ? '✅ Granted (Active)' : '🚫 Suspended'}
            </button>
          </div>

          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="font-size:13px; color:#0f172a; display:block;">Student Portal Master Switch</strong>
              <span style="font-size:11.5px; color:#64748b;">Global access for all Batches 23–26</span>
            </div>
            <button class="drill-action-btn \${window.portalAccessState.globalStudent ? 'drill-action-primary' : 'drill-action-secondary'}" 
                    onclick="adminToggleGlobal('student', '\${user.id}')">
              \${window.portalAccessState.globalStudent ? '✅ Granted (Active)' : '🚫 Suspended'}
            </button>
          </div>
        </div>

        <!-- Student Batch Access Controls -->
        <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:14px;">
          <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:6px;">🎓 Manage Student Batch Permissions:</strong>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            \${batchButtonsHTML}
          </div>
        </div>

        <!-- Department Access Matrix -->
        <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:14px;">
          <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:8px;">🏛️ Department-Wise Portal Access Matrix (9 Engineering Branches):</strong>
          <div style="overflow-x:auto;">
            <table class="ht-table" style="font-size:12px; width:100%;">
              <thead>
                <tr>
                  <th>Branch / Department</th>
                  <th>Faculty Portal Access</th>
                  <th>Student Portal Access</th>
                </tr>
              </thead>
              <tbody>
                \${deptRowsHTML}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Targeted User Override -->
        <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px;">
          <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:6px;">👤 Individual Account Access Override:</strong>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <input type="text" id="adminTargetUserOverride" placeholder="Enter Roll No or Employee ID (e.g. 23E51A6619 or CSE01)" 
                   style="flex:1; min-width:240px; padding:6px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;">
            <button class="drill-action-btn drill-action-primary" style="padding:6px 12px; font-size:12px;" onclick="adminSetUserOverride(true, '\${user.id}')">Grant Access</button>
            <button class="drill-action-btn drill-action-secondary" style="padding:6px 12px; font-size:12px;" onclick="adminSetUserOverride(false, '\${user.id}')">Revoke Access</button>
          </div>
        </div>
      </div>
    \`;

    // 4. Generate Governance Tools HTML
    const governancePanelHTML = \`
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="margin:0 0 10px 0; color:#1e293b; font-size:15px; display:flex; align-items:center; gap:6px;">
          <span>📊</span> Institutional Governance Demonstration Tools
        </h4>
        <div class="modal-grid-features">
          <div class="modal-feature-card">
            <strong>📝 B.Tech Admissions &amp; Enrolment</strong>
            <span>Seats allotted under Convener (TG EAPCET) &amp; Management quota.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11px;" onclick="showDemoNotice('Admissions queue review is simulated for UI preview.')">Review Admissions Queue →</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>👥 Faculty Leaves &amp; Substitution</strong>
            <span>\${user.pendingLeaves} Leave requests in sample queue.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 10px; font-size:11px;" onclick="adminApproveLeave()">✓ Approve Pending Leaves</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>💰 Accounts &amp; Bank Reconciliation</strong>
            <span>Institutional financial reconciliation module mockup.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11px;" onclick="adminReconcileBank()">Reconcile Day's Fees →</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>📜 Circulars &amp; Accreditation Reports</strong>
            <span>Broadcast institutional notices and review NAAC/NIRF audit disclosures.</span>
            <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="adminIssueNotice()">Broadcast Notice</button>
              <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px; text-decoration:none; display:inline-flex; align-items:center;">NAAC Disclosures (hitam.org) ↗</a>
            </div>
          </div>
        </div>
      </div>
    \`;

    // 5. Select Active Tab Content
    let activeTabContentHTML = '';
    if (window.activeAdminTab === 'access') {
      activeTabContentHTML = accessControlPanelHTML;
    } else if (window.activeAdminTab === 'governance') {
      activeTabContentHTML = governancePanelHTML;
    } else {
      activeTabContentHTML = eventsManagementPanelHTML;
    }

    // Render Full Admin Dashboard
    body.innerHTML = \`
      <div class="portal-dashboard-wrap">
        <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
          🛡️ <strong>Administrative Governance Console:</strong> Signed in as <b>\${user.name}</b> (\${user.badge}).
        </div>

        <div class="portal-profile-bar">
          <div class="portal-user-info">
            <div class="portal-avatar">AD</div>
            <div>
              <div class="portal-user-name">\${user.name}</div>
              <div class="portal-user-meta">\${user.role} • ID: <b>\${user.id}</b> • \${user.dept}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="https://www.hitam.org" target="_blank" rel="noopener" class="portal-logout-btn" style="text-decoration:none; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; display:inline-flex; align-items:center; gap:4px;">HITAM Portal ↗</a>
            <button class="portal-logout-btn" onclick="openModal('admin-portal')">Sign Out</button>
          </div>
        </div>

        <div class="portal-kpi-grid">
          <div class="portal-kpi-card"><div class="portal-kpi-val">\${user.students}</div><div class="portal-kpi-lbl">Student Enrolment</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">\${user.faculty}</div><div class="portal-kpi-lbl">Active Faculty &amp; HODs</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val" style="color:#08752f">\${user.attendance}</div><div class="portal-kpi-lbl">Attendance Rate</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">\${user.collections}</div><div class="portal-kpi-lbl">Finance &amp; Collections</div></div>
          <div class="portal-kpi-card" style="cursor:pointer;" onclick="adminSwitchTab('events', '\${user.id}')"><div class="portal-kpi-val" style="color:#0284c7">\${events.length} Events</div><div class="portal-kpi-lbl">Campus Events Active</div></div>
        </div>

        <!-- ADMIN MODULE NAVIGATION TABS -->
        <div class="portal-tabs-nav" style="display:flex; gap:8px; margin:16px 0 10px 0; border-bottom:2px solid #e2e8f0; padding-bottom:8px; flex-wrap:wrap;">
          <button class="portal-tab-btn \${window.activeAdminTab === 'events' ? 'active' : ''}" 
                  onclick="adminSwitchTab('events', '\${user.id}')">
            🎪 Campus Events Manager (\${events.length})
          </button>
          <button class="portal-tab-btn \${window.activeAdminTab === 'access' ? 'active' : ''}" 
                  onclick="adminSwitchTab('access', '\${user.id}')">
            <span>🛡️</span> Portal Access Control &amp; Permissions Manager
          </button>
          <button class="portal-tab-btn \${window.activeAdminTab === 'governance' ? 'active' : ''}" 
                  onclick="adminSwitchTab('governance', '\${user.id}')">
            <span>📊</span> Institutional Governance Tools
          </button>
        </div>

        <!-- ACTIVE TAB CONTENT -->
        \${activeTabContentHTML}

        <div id="modalToastSlot"></div>
      </div>
    \`;
    return;
  }
`;

code = code.slice(0, adminStartIdx) + newAdminSection + '\n  ' + code.slice(facultyStartIdx);

fs.writeFileSync('scratch/section15_expanded.js', code, 'utf8');
console.log('Successfully updated scratch/section15_expanded.js with Event Management for Admin!');
