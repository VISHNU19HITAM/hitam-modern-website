const fs = require('fs');

console.log('Building clean ERP Section 15...');
let code = fs.readFileSync('scratch/section15_pristine.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Add window.togglePortalAccordion at the top
const toggleFn = `
window.togglePortalAccordion = function(accId) {
  const el = document.getElementById(accId);
  const arrow = document.getElementById(accId + '_arrow');
  if (!el) return;
  const isHidden = (el.style.display === 'none' || el.style.display === '');
  el.style.display = isHidden ? 'block' : 'none';
  if (arrow) arrow.textContent = isHidden ? '▼' : '>';
};
`;
code = toggleFn + '\n' + code;

// 2. Update resolveStudentUser
code = code.replace(
  "name: (storedCred && storedCred.alias) ? `Student (${storedCred.alias} — ${roll})` : `Student (${roll} — ${deptKey})`,",
  "name: (storedCred && storedCred.alias) ? `Student (${storedCred.alias} — ${roll})` : ((roll === '23E51A6619') ? 'BHUKYA VISHNU' : `Student (${roll} — ${deptKey})`),\n    photo: 'assets/student-profile.png',"
);

// 3. Index-based replace for activeTab === 'details'
const startDetails = code.indexOf('// 1. STUDENT DETAILS TAB');
const endDetails = code.indexOf('// 2. ATTENDANCE TAB');

if (startDetails === -1 || endDetails === -1) {
  throw new Error('Details indices not found!');
}

const newDetails = `// 1. STUDENT DETAILS TAB
    if (activeTab === 'details') {
      tabContentHTML = \`
        <div class="erp-section-title">STUDENT PROFILE</div>

        <div class="erp-accordion-group">
          <!-- 1. BIO-DATA -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_biodata')">
              <span><span id="acc_biodata_arrow" class="arrow">▼</span> &nbsp; BIO-DATA</span>
              <span style="font-size:10px; opacity:0.85;">Comprehensive Student Profile</span>
            </div>
            <div id="acc_biodata" class="erp-accordion-body" style="display:block;">
              <div style="font-size:12px; font-weight:700; color:#166534; margin-bottom:8px;">Comprehensive Student Profile</div>
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
                <div><span class="lbl">Father's Name:</span> <strong>B. Ramulu</strong></div>
                <div><span class="lbl">Mother's Name:</span> <strong>B. Savitri</strong></div>
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

          <!-- 2. PERFORMANCE (Present) -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_perf_present')">
              <span><span id="acc_perf_present_arrow" class="arrow">▼</span> &nbsp; PERFORMANCE (Present)</span>
              <span style="font-size:10px; opacity:0.85;">Current Semester Standing</span>
            </div>
            <div id="acc_perf_present" class="erp-accordion-body" style="display:block;">
              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; text-align:center;">
                <div class="erp-kpi-pill"><span class="val">8.84</span><span class="lbl">Current SGPA</span></div>
                <div class="erp-kpi-pill"><span class="val" style="color:#08752f;">\${studentUser.cgpa.slice(0,4)}</span><span class="lbl">Cumulative CGPA</span></div>
                <div class="erp-kpi-pill"><span class="val">128 / 160</span><span class="lbl">Credits Earned</span></div>
                <div class="erp-kpi-pill"><span class="val" style="color:#15803d;">89.4%</span><span class="lbl">Attendance</span></div>
              </div>
              <div style="margin-top:10px; font-size:11.5px; color:#475569;">
                <strong>Academic Standing:</strong> Passed with Distinction. Regular student in good academic standing under Autonomous R22 Regulations.
              </div>
            </div>
          </div>

          <!-- 3. PERFORMANCE (Past) -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_perf_past')">
              <span><span id="acc_perf_past_arrow" class="arrow">&gt;</span> &nbsp; PERFORMANCE (Past)</span>
              <span style="font-size:10px; opacity:0.85;">Semester History (Sem I to VI)</span>
            </div>
            <div id="acc_perf_past" class="erp-accordion-body" style="display:none;">
              <table class="ht-table" style="width:100%; font-size:11.5px;">
                <thead>
                  <tr>
                    <th>Semester</th>
                    <th>Year &amp; Session</th>
                    <th>Credits Registered</th>
                    <th>Credits Passed</th>
                    <th>SGPA</th>
                    <th>Result Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Semester I</td><td>2023-24 (Odd)</td><td>20</td><td>20</td><td>8.75</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                  <tr><td>Semester II</td><td>2023-24 (Even)</td><td>20</td><td>20</td><td>8.80</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                  <tr><td>Semester III</td><td>2024-25 (Odd)</td><td>22</td><td>22</td><td>8.90</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                  <tr><td>Semester IV</td><td>2024-25 (Even)</td><td>22</td><td>22</td><td>8.85</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                  <tr><td>Semester V</td><td>2025-26 (Odd)</td><td>22</td><td>22</td><td>8.80</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                  <tr><td>Semester VI</td><td>2025-26 (Even)</td><td>22</td><td>22</td><td>8.84</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4. FEE DETAILS -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_fee_details')">
              <span><span id="acc_fee_details_arrow" class="arrow">&gt;</span> &nbsp; FEE DETAILS</span>
              <span style="font-size:10px; opacity:0.85;">Annual Tuition &amp; Exams</span>
            </div>
            <div id="acc_fee_details" class="erp-accordion-body" style="display:none;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                  <div>Total Tuition &amp; Lab Fee: <strong>₹1,12,000</strong> (Paid)</div>
                  <div>Autonomous Examination Fee: <strong>₹2,500</strong> (Paid)</div>
                  <div>Total Paid: <strong style="color:#08752f;">₹1,14,500</strong> | Outstanding Due Balance: <strong style="color:#08752f;">₹0.00 (Cleared)</strong></div>
                </div>
                <button class="erp-btn" onclick="studentSwitchTab('fees', '\${studentUser.roll}')">Open Full Fee Ledger →</button>
              </div>
            </div>
          </div>

          <!-- 5. BACKLOGS -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_backlogs')">
              <span><span id="acc_backlogs_arrow" class="arrow">&gt;</span> &nbsp; BACKLOGS</span>
              <span style="font-size:10px; opacity:0.85;">0 Active Backlogs</span>
            </div>
            <div id="acc_backlogs" class="erp-accordion-body" style="display:none;">
              <div style="display:flex; align-items:center; gap:8px; color:#15803d; font-weight:700;">
                <span>✅</span> No Active Backlogs. All enrolled theory and practical courses cleared in first attempt.
              </div>
            </div>
          </div>

          <!-- 6. OUTINGS -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_outings')">
              <span><span id="acc_outings_arrow" class="arrow">&gt;</span> &nbsp; OUTINGS</span>
              <span style="font-size:10px; opacity:0.85;">Gate Pass Status</span>
            </div>
            <div id="acc_outings" class="erp-accordion-body" style="display:none;">
              <table class="ht-table" style="width:100%; font-size:11.5px;">
                <thead>
                  <tr>
                    <th>Pass ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Out Time</th>
                    <th>In Time</th>
                    <th>Purpose</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GP-2026-0814</td>
                    <td>Day Outing</td>
                    <td>18-Oct-2026</td>
                    <td>04:30 PM</td>
                    <td>08:15 PM</td>
                    <td>Academic Hackathon Prep / Project Study</td>
                    <td><span style="color:#15803d; font-weight:700;">Approved &amp; Returned</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 7. COUNSELING DETAILS -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_counseling')">
              <span><span id="acc_counseling_arrow" class="arrow">&gt;</span> &nbsp; COUNSELING DETAILS</span>
              <span style="font-size:10px; opacity:0.85;">Mentorship Log</span>
            </div>
            <div id="acc_counseling" class="erp-accordion-body" style="display:none;">
              <div style="font-size:12px; color:#1e293b;">
                <div><strong>Assigned Proctor / Faculty Mentor:</strong> \${studentUser.mentor}</div>
                <div style="margin-top:6px;"><strong>Proctor Assessment:</strong> "Consistent academic standing with 8.82 CGPA. Demonstrated exceptional hands-on initiative in deep learning projects and collegiate symposiums. Recommended for advanced placement training."</div>
                <div style="margin-top:4px; font-size:11px; color:#64748b;">Total Mentorship Interactions: 4 Sessions (All Conducted &amp; Verified)</div>
              </div>
            </div>
          </div>

          <!-- 8. DISCIPLINARY ACTION -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_disciplinary')">
              <span><span id="acc_disciplinary_arrow" class="arrow">&gt;</span> &nbsp; DISCIPLINARY ACTION</span>
              <span style="font-size:10px; opacity:0.85;">Code of Conduct</span>
            </div>
            <div id="acc_disciplinary" class="erp-accordion-body" style="display:none;">
              <div style="color:#15803d; font-weight:700; font-size:12px;">
                ✅ Clean Institutional Record. No disciplinary notices, warnings, or code-of-conduct violations recorded.
              </div>
            </div>
          </div>

          <!-- 9. SPF Band Performance -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_spf')">
              <span><span id="acc_spf_arrow" class="arrow">&gt;</span> &nbsp; SPF Band Performance</span>
              <span style="font-size:10px; opacity:0.85;">Band A — Exemplary</span>
            </div>
            <div id="acc_spf" class="erp-accordion-body" style="display:none;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                  <div style="font-size:14px; font-weight:800; color:#15803d;">SPF Band A — Exemplary (Top 5% Cohort)</div>
                  <div style="font-size:11.5px; color:#475569;">Calculated on Academics (60%), Project Innovation (20%), Attendance (10%), and Extracurricular Leadership (10%).</div>
                </div>
                <div style="background:#eaf6ec; padding:6px 12px; border-radius:6px; font-weight:700; color:#166534; font-size:12px;">18 / 20 Skill Credits</div>
              </div>
            </div>
          </div>

          <!-- 10. Career Counselling -->
          <div class="erp-accordion-item">
            <div class="erp-accordion-header" onclick="togglePortalAccordion('acc_career')">
              <span><span id="acc_career_arrow" class="arrow">&gt;</span> &nbsp; Career Counselling</span>
              <span style="font-size:10.5px; opacity:0.9;">Placement Cell Guidance</span>
            </div>
            <div id="acc_career" class="erp-accordion-body" style="display:none;">
              <div style="font-size:12px; color:#1e293b;">
                <div><strong>Campus Placement Status:</strong> Registered &amp; Eligible for Day-1 Campus Drives</div>
                <div><strong>Campus Recruitment Training (CRT):</strong> Modules Completed (Quantitative Aptitude, DSA, AI/ML Coding, Mock Technical Interviews)</div>
                <div><strong>Target Engineering Domains:</strong> Machine Learning Engineer, Data Scientist, Full Stack Developer</div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM ACTION BUTTONS: [Print] [Export] -->
        <div class="erp-btn-row">
          <button type="button" class="erp-btn" onclick="window.print()">Print</button>
          <button type="button" class="erp-btn" onclick="showDemoNotice('Exporting Student Profile record to CSV/PDF format...')">Export</button>
          <button type="button" class="erp-btn" style="background:#0f5132;" onclick="studentShowHallTicket('\${studentUser.roll}')">🎟️ View Autonomous Hall Ticket →</button>
          <button type="button" class="erp-btn" style="background:#334155;" onclick="studentApplyBonafide('\${studentUser.roll}')">📄 Request Bonafide Guidelines</button>
        </div>
      \`;
    }

    `;

code = code.slice(0, startDetails) + newDetails + code.slice(endDetails);

// 4. Index-based replace for outer student wrapper
const startOuter = code.indexOf('// Render Full Student Portal View with 8 Tabs');
const endOuter = code.lastIndexOf('<div id="modalToastSlot"></div>');

if (startOuter === -1 || endOuter === -1) {
  throw new Error('Outer wrapper indices not found!');
}

// Find closing \`; after endOuter
const endBlock = code.indexOf('return;\n  }', endOuter);

const newOuter = `// Render Full Student Portal View with HITAM ERP Reference Architecture
    const displayName = studentUser.name || 'STUDENT';

    body.innerHTML = \`
      <div class="hitam-erp-wrap">
        <!-- 1. TOP GREEN BRAND HEADER (Matching Screenshot Reference) -->
        <div class="hitam-erp-header">
          <div class="hitam-erp-brand">
            <img src="assets/hitam-logo.png" alt="HITAM" class="hitam-erp-logo">
            <div class="hitam-erp-title-block">
              <div class="hitam-erp-counselling-code">
                <span>Counselling Code : <strong>HITM</strong></span>
                <span>Estd: 2001</span>
              </div>
              <div class="hitam-erp-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT</div>
              <div class="hitam-erp-accreditation">Accredited by NAAC, Affiliated to JNTUH, Approved by AICTE</div>
            </div>
          </div>
          <div class="hitam-erp-user-photo" title="Student Profile Photo">
            <img src="\${studentUser.photo || 'assets/student-profile.png'}" alt="Student Photo" class="hitam-erp-photo-img">
          </div>
        </div>

        <!-- 2. ANNOUNCEMENT TICKER (Matching Screenshot Reference) -->
        <div class="hitam-erp-marquee">
          <span>Welcome to 4th Day FDP on "Emerging Trends in AI &amp; Machine Learning" • Autonomous End-Semester Regular / Supplementary Registration Open • Hall Tickets Available for Download</span>
        </div>

        <!-- 3. GREEN USER ACTION BAR (Matching Screenshot Reference) -->
        <div class="hitam-erp-userbar">
          <div class="erp-user-greeting">Hi...\${(studentUser.roll === '23E51A6619' && !(window.userCredentialStore && window.userCredentialStore[studentUser.roll] && window.userCredentialStore[studentUser.roll].alias)) ? 'BHUKYA VISHNU' : displayName}</div>
          <div class="erp-user-actions">
            <button type="button" class="erp-action-link" onclick="studentSwitchTab('credentials', '\${studentUser.roll}')">Change Password</button>
            <span class="erp-separator">|</span>
            <button type="button" class="erp-action-link" onclick="openModal('student-portal')">Logout</button>
          </div>
        </div>

        <!-- 4. TOP QUICK NAV SHORTCUT TABS (Ensures full accessibility & test compliance) -->
        <div class="portal-nav-tabs" style="margin: 8px 12px 0 12px; border-bottom: none;">
          <button class="portal-tab-btn \${activeTab === 'details' ? 'active' : ''}" onclick="studentSwitchTab('details', '\${studentUser.roll}')">
            👤 Student Details
          </button>
          <button class="portal-tab-btn \${activeTab === 'attendance' ? 'active' : ''}" onclick="studentSwitchTab('attendance', '\${studentUser.roll}')">
            📊 Attendance
          </button>
          <button class="portal-tab-btn \${activeTab === 'timetable' ? 'active' : ''}" onclick="studentSwitchTab('timetable', '\${studentUser.roll}')">
            🗓️ Timetable
          </button>
          <button class="portal-tab-btn \${activeTab === 'fees' ? 'active' : ''}" onclick="studentSwitchTab('fees', '\${studentUser.roll}')">
            💰 Fee Details
          </button>
          <button class="portal-tab-btn \${activeTab === 'marks' ? 'active' : ''}" onclick="studentSwitchTab('marks', '\${studentUser.roll}')">
            📝 Marks (CIE)
          </button>
          <button class="portal-tab-btn \${activeTab === 'feedback' ? 'active' : ''}" onclick="studentSwitchTab('feedback', '\${studentUser.roll}')">
            ⭐ Feedback
          </button>
          <button class="portal-tab-btn \${activeTab === 'complaints' ? 'active' : ''}" onclick="studentSwitchTab('complaints', '\${studentUser.roll}')">
            📢 Complaints
          </button>
          <button class="portal-tab-btn \${activeTab === 'credentials' ? 'active' : ''}" onclick="studentSwitchTab('credentials', '\${studentUser.roll}')">
            🔐 Username &amp; Password
          </button>
        </div>

        <!-- 5. TWO-COLUMN ERP MAIN BODY (Matching Screenshot Reference) -->
        <div class="hitam-erp-body">
          <!-- LEFT COLUMN: MENU SIDEBAR -->
          <aside class="hitam-erp-sidebar">
            <div class="erp-menu-header">MENU</div>
            <ul class="erp-menu-list">
              <li class="\${activeTab === 'academic-cal' ? 'active' : ''}" onclick="studentSwitchTab('academic-cal', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> ACADEMIC CALENDER</li>
              <li class="\${activeTab === 'academic-reg' ? 'active' : ''}" onclick="studentSwitchTab('academic-reg', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> ACADEMIC REGISTER</li>
              <li class="\${activeTab === 'assignments' ? 'active' : ''}" onclick="studentSwitchTab('assignments', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> ASSIGNMENTS REPORT</li>
              <li class="\${activeTab === 'attendance' ? 'active' : ''}" onclick="studentSwitchTab('attendance', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> ATTENDANCE</li>
              <li class="\${activeTab === 'backlogs' ? 'active' : ''}" onclick="studentSwitchTab('backlogs', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> BACKLOGS</li>
              <li class="\${activeTab === 'book-search' ? 'active' : ''}" onclick="studentSwitchTab('book-search', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> BOOK SEARCH</li>
              <li class="\${activeTab === 'credentials' ? 'active' : ''}" onclick="studentSwitchTab('credentials', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> CHANGE MOBILE NO/E-MAIL</li>
              <li class="\${activeTab === 'assignments' ? 'active' : ''}" onclick="studentSwitchTab('assignments', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> CLASS ASSIGNMENTS</li>
              <li class="\${activeTab === 'directory' ? 'active' : ''}" onclick="studentSwitchTab('directory', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> DIRECTORY</li>
              <li class="\${activeTab === 'exam-schedule' ? 'active' : ''}" onclick="studentSwitchTab('exam-schedule', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> EXAM-SCHEDULE</li>
              <li class="\${activeTab === 'fees' ? 'active' : ''}" onclick="studentSwitchTab('fees', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> FEE DETAILS</li>
              <li class="\${activeTab === 'feedback' ? 'active' : ''}" onclick="studentSwitchTab('feedback', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> FEEDBACK</li>
              <li class="\${activeTab === 'hostel-req' ? 'active' : ''}" onclick="studentSwitchTab('hostel-req', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> HOSTEL REQUEST</li>
              <li class="\${activeTab === 'lesson-plan' ? 'active' : ''}" onclick="studentSwitchTab('lesson-plan', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> LESSON PLAN</li>
              <li class="\${activeTab === 'library-books' ? 'active' : ''}" onclick="studentSwitchTab('library-books', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> LIBRARY BOOKS</li>
              <li class="\${activeTab === 'marks' ? 'active' : ''}" onclick="studentSwitchTab('marks', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> MARKS</li>
              <li class="\${activeTab === 'complaints' ? 'active' : ''}" onclick="studentSwitchTab('complaints', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> OBSERVATION/SUGGESTION</li>
              <li class="\${activeTab === 'fees' ? 'active' : ''}" onclick="studentSwitchTab('fees', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> ONLINE PAYMENT</li>
              <li class="\${activeTab === 'details' ? 'active' : ''}" onclick="studentSwitchTab('details', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> PROFILE</li>
              <li class="\${activeTab === 'projects' ? 'active' : ''}" onclick="studentSwitchTab('projects', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> PROJECT SEARCH</li>
              <li class="\${activeTab === 'resources' ? 'active' : ''}" onclick="studentSwitchTab('resources', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> RESOURCES</li>
              <li class="\${activeTab === 'timetable' ? 'active' : ''}" onclick="studentSwitchTab('timetable', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> TIME TABLE</li>
              <li class="\${activeTab === 'topics' ? 'active' : ''}" onclick="studentSwitchTab('topics', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> TOPICS COVERED</li>
              <li class="\${activeTab === 'transport-req' ? 'active' : ''}" onclick="studentSwitchTab('transport-req', '\${studentUser.roll}')"><span class="erp-menu-icon">+</span> TRANSPORT REQUEST</li>
            </ul>
          </aside>

          <!-- RIGHT COLUMN: CONTENT PANE -->
          <main class="hitam-erp-content">
            <div id="studentTabContainer">
              \${tabContentHTML}
            </div>
          </main>
        </div>

        <div id="modalToastSlot"></div>
      </div>
    \`;
    return;
  }
};
`;

code = code.slice(0, startOuter) + newOuter;

fs.writeFileSync('scratch/section15_expanded.js', code, 'utf8');
console.log('Successfully wrote scratch/section15_expanded.js!');
