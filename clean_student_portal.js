const fs = require('fs');

console.log('Reading scratch/section15_expanded.js...');
let code = fs.readFileSync('scratch/section15_expanded.js', 'utf8');

// 1. New Clean Student Details Section (Taking reference from ERP style, keeping only main bio-data & performance summary)
const cleanStudentDetailsHTML = `    // 1. STUDENT DETAILS TAB (Clean Reference-Based Profile - Main Info Only)
    if (activeTab === 'details') {
      tabContentHTML = \`
        <div class="erp-section-title">STUDENT PROFILE</div>

        <!-- MAIN BIO-DATA CARD -->
        <div class="erp-accordion-item" style="border:1px solid #c8e4cf; border-radius:6px; margin-bottom:14px; overflow:hidden;">
          <div class="erp-accordion-header" style="background:#08752f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>👤</span> BIO-DATA &amp; ACADEMIC RECORD
            </span>
            <span style="font-size:11px; opacity:0.9;">Comprehensive Student Profile</span>
          </div>
          <div class="erp-accordion-body" style="display:block; padding:16px; background:#ffffff;">
            <div style="font-size:12px; font-weight:700; color:#166534; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
              Comprehensive Student Profile • Autonomous R22 Regulations
            </div>
            <div class="erp-profile-grid">
              <div><span class="lbl">Student Name:</span> <strong>\${studentUser.name}</strong></div>
              <div><span class="lbl">Hall Ticket / Roll No:</span> <strong style="color:#08752f;">\${studentUser.roll}</strong></div>
              <div><span class="lbl">Enrolment Program:</span> <strong>\${studentUser.branch}</strong></div>
              <div><span class="lbl">Academic Standing:</span> <strong>\${studentUser.yearSem}</strong></div>
              <div><span class="lbl">Assigned Section:</span> <strong>\${studentUser.section}</strong></div>
              <div><span class="lbl">Counselling Code:</span> <strong>HITM (Autonomous)</strong></div>
              <div><span class="lbl">Date of Birth:</span> <strong>14-Aug-2005</strong></div>
              <div><span class="lbl">Gender:</span> <strong>Male</strong></div>
              <div><span class="lbl">Blood Group:</span> <strong>O+ve</strong></div>
              <div><span class="lbl">Mobile Number:</span> <strong>\${studentUser.contact}</strong></div>
              <div><span class="lbl">Institutional Email:</span> <strong>\${studentUser.roll.toLowerCase()}@hitam.org</strong></div>
              <div><span class="lbl">Assigned Faculty Mentor:</span> <strong>\${studentUser.mentor}</strong></div>
              <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
              <div><span class="lbl">Examination Hall Ticket:</span> <strong style="color:#15803d;">Verified (Autonomous Center)</strong></div>
              <div><span class="lbl">Cumulative CGPA:</span> <strong style="color:#08752f;">\${studentUser.cgpa}</strong></div>
              <div><span class="lbl">Attendance Record:</span> <strong>\${studentUser.attendance}</strong></div>
              <div><span class="lbl">Active Backlogs:</span> <strong>\${studentUser.backlogs}</strong></div>
              <div><span class="lbl">Fee Clearance:</span> <strong>\${studentUser.feeDue}</strong></div>
            </div>
          </div>
        </div>

        <!-- PERFORMANCE SUMMARY CARD -->
        <div class="erp-accordion-item" style="border:1px solid #c8e4cf; border-radius:6px; margin-bottom:16px; overflow:hidden;">
          <div class="erp-accordion-header" style="background:#013b1f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>📊</span> ACADEMIC PERFORMANCE SUMMARY
            </span>
            <span style="font-size:11px; opacity:0.9;">Current Semester Standing</span>
          </div>
          <div class="erp-accordion-body" style="display:block; padding:16px; background:#fafffa;">
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; text-align:center;">
              <div class="erp-kpi-pill"><span class="val">8.84</span><span class="lbl">Current SGPA</span></div>
              <div class="erp-kpi-pill"><span class="val" style="color:#08752f;">\${studentUser.cgpa.slice(0,4)}</span><span class="lbl">Cumulative CGPA</span></div>
              <div class="erp-kpi-pill"><span class="val">128 / 160</span><span class="lbl">Credits Earned</span></div>
              <div class="erp-kpi-pill"><span class="val" style="color:#15803d;">89.4%</span><span class="lbl">Attendance</span></div>
            </div>
            <div style="margin-top:12px; font-size:12px; color:#475569; line-height:1.5;">
              <strong>Academic Standing:</strong> Passed with Distinction. Regular student in good academic standing under Autonomous R22 Regulations. All continuous internal evaluations (CIE) verified.
            </div>
          </div>
        </div>

        <!-- BOTTOM ACTION BUTTONS -->
        <div class="erp-btn-row">
          <button type="button" class="erp-btn" onclick="window.print()">Print</button>
          <button type="button" class="erp-btn" onclick="showDemoNotice('Exporting Student Profile record to CSV/PDF format...')">Export</button>
          <button type="button" class="erp-btn" style="background:#0f5132;" onclick="studentShowHallTicket('\${studentUser.roll}')">🎟️ View Autonomous Hall Ticket →</button>
          <button type="button" class="erp-btn" style="background:#334155;" onclick="studentApplyBonafide('\${studentUser.roll}')">📄 Request Bonafide Guidelines</button>
        </div>
      \`;
    }
`;

const s1 = code.indexOf('// 1. STUDENT DETAILS TAB');
const s2 = code.indexOf('// 2. ATTENDANCE TAB');

if (s1 === -1 || s2 === -1) {
  console.error('Could not find Student Details boundaries');
  process.exit(1);
}

code = code.slice(0, s1) + cleanStudentDetailsHTML + '\n    ' + code.slice(s2);

// 2. New Clean Sidebar with Only the 8 Main Items (Matching reference styling, focused on main items)
const cleanSidebarHTML = `<aside class="hitam-erp-sidebar">
            <div class="erp-menu-header">MENU</div>
            <ul class="erp-menu-list">
              <li class="\${activeTab === 'details' ? 'active' : ''}" onclick="studentSwitchTab('details', '\${studentUser.roll}')"><span class="erp-menu-icon">👤</span> PROFILE DETAILS</li>
              <li class="\${activeTab === 'attendance' ? 'active' : ''}" onclick="studentSwitchTab('attendance', '\${studentUser.roll}')"><span class="erp-menu-icon">📊</span> ATTENDANCE</li>
              <li class="\${activeTab === 'timetable' ? 'active' : ''}" onclick="studentSwitchTab('timetable', '\${studentUser.roll}')"><span class="erp-menu-icon">🗓️</span> TIME TABLE</li>
              <li class="\${activeTab === 'fees' ? 'active' : ''}" onclick="studentSwitchTab('fees', '\${studentUser.roll}')"><span class="erp-menu-icon">💰</span> FEE DETAILS</li>
              <li class="\${activeTab === 'marks' ? 'active' : ''}" onclick="studentSwitchTab('marks', '\${studentUser.roll}')"><span class="erp-menu-icon">📝</span> MARKS (CIE)</li>
              <li class="\${activeTab === 'feedback' ? 'active' : ''}" onclick="studentSwitchTab('feedback', '\${studentUser.roll}')"><span class="erp-menu-icon">⭐</span> FEEDBACK</li>
              <li class="\${activeTab === 'complaints' ? 'active' : ''}" onclick="studentSwitchTab('complaints', '\${studentUser.roll}')"><span class="erp-menu-icon">📢</span> COMPLAINTS</li>
              <li class="\${activeTab === 'credentials' ? 'active' : ''}" onclick="studentSwitchTab('credentials', '\${studentUser.roll}')"><span class="erp-menu-icon">🔐</span> PASSWORD CHANGE</li>
            </ul>
          </aside>`;

const s3 = code.indexOf('<aside class="hitam-erp-sidebar">');
const s4 = code.indexOf('</aside>', s3);

if (s3 === -1 || s4 === -1) {
  console.error('Could not find Sidebar boundaries');
  process.exit(1);
}

code = code.slice(0, s3) + cleanSidebarHTML + code.slice(s4 + '</aside>'.length);

fs.writeFileSync('scratch/section15_expanded.js', code, 'utf8');
console.log('Successfully cleaned scratch/section15_expanded.js! Retained main items with ERP reference.');
