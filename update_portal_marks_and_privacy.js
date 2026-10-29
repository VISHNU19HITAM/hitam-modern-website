const fs = require('fs');

console.log('Reading scratch/section15_expanded.js...');
let code = fs.readFileSync('scratch/section15_expanded.js', 'utf8');

// 1. Add window.studentMarksDB and window.getStudentMarks right near facultyMarksDB
const marksDBCode = `
window.studentMarksDB = window.studentMarksDB || {
  '23E51A6619': {
    ciea1: 23,
    cieb1: 24,
    ciec1: 22,
    ciea2: 24,
    cieb2: 25,
    ciec2: 23
  }
};

window.getStudentMarks = function(roll) {
  window.studentMarksDB = window.studentMarksDB || {};
  if (!window.studentMarksDB[roll]) {
    const s = parseInt((roll || '1').slice(-2), 10) || 1;
    window.studentMarksDB[roll] = {
      ciea1: 20 + (s % 5),
      cieb1: 21 + ((s + 1) % 5),
      ciec1: 22 + ((s + 2) % 4),
      ciea2: 21 + ((s + 3) % 5),
      cieb2: 22 + ((s + 4) % 4),
      ciec2: 23 + ((s + 1) % 3)
    };
  }
  return window.studentMarksDB[roll];
};
`;

code = code.replace('window.facultyMarksDB = window.facultyMarksDB || {};', 'window.facultyMarksDB = window.facultyMarksDB || {};\n' + marksDBCode);

// 2. Update facultyChangeMarksFilter and facultySaveMarks
const oldFacultyMarksHandlersTarget = `window.facultyChangeMarksFilter = function(facultyId) {
  const bEl = document.getElementById('facMarksBranch');
  const yEl = document.getElementById('facMarksYear');
  const sEl = document.getElementById('facMarksSec');
  const aEl = document.getElementById('facMarksAssessment');

  if (bEl) window.currentFacultyFilters.branch = bEl.value;
  if (yEl) window.currentFacultyFilters.year = yEl.value;
  if (sEl) {
    window.currentFacultyFilters.section = sEl.value;
    // Default assessment based on section
    if (sEl.value === 'A') {
      if (!['ciea1', 'ciea2', 'ciea3'].includes(window.currentFacultyFilters.cieAssessment)) {
        window.currentFacultyFilters.cieAssessment = 'ciea1';
      }
    } else {
      if (!['cieb1', 'cieb2', 'cieb3'].includes(window.currentFacultyFilters.cieAssessment)) {
        window.currentFacultyFilters.cieAssessment = 'cieb1';
      }
    }
  }
  if (aEl) window.currentFacultyFilters.cieAssessment = aEl.value;

  window.facultySwitchTab('marks', facultyId);
};

window.facultyRecalculateRowGrade = function(roll) {
  const input = document.getElementById(\`marks_\${roll}\`);
  const badge = document.getElementById(\`grade_\${roll}\`);
  if (!input || !badge) return;

  const val = parseFloat(input.value) || 0;
  let grade = 'F (Remedial)';
  let bg = '#fee2e2';
  let color = '#991b1b';

  if (val >= 23) { grade = 'O (Outstanding)'; bg = '#dcfce7'; color = '#15803d'; }
  else if (val >= 20) { grade = 'A+ (Excellent)'; bg = '#f0fdf4'; color = '#166534'; }
  else if (val >= 17) { grade = 'A (Very Good)'; bg = '#ecfdf5'; color = '#047857'; }
  else if (val >= 14) { grade = 'B+ (Good)'; bg = '#fef3c7'; color = '#92400e'; }
  else if (val >= 12) { grade = 'B (Above Average)'; bg = '#fef9c3'; color = '#854d0e'; }

  badge.textContent = grade;
  badge.style.background = bg;
  badge.style.color = color;
};

window.facultySaveMarks = function(facultyId) {
  const f = window.currentFacultyFilters;
  const marksKey = \`\${f.branch}_\${f.year}_\${f.section}_\${f.cieAssessment}\`;
  window.facultyMarksDB[marksKey] = window.facultyMarksDB[marksKey] || {};

  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  students.forEach(st => {
    const input = document.getElementById(\`marks_\${st.roll}\`);
    if (input) {
      const val = parseFloat(input.value) || 0;
      window.facultyMarksDB[marksKey][st.roll] = val;
    }
  });

  showDemoNotice(\`CIE Marks successfully saved & uploaded for \${f.branch} Sec \${f.section} [\${f.cieAssessment.toUpperCase()}].\`);
};`;

const newFacultyMarksHandlers = `window.facultyChangeMarksFilter = function(facultyId) {
  const bEl = document.getElementById('facMarksBranch');
  const yEl = document.getElementById('facMarksYear');
  const sEl = document.getElementById('facMarksSec');
  const aEl = document.getElementById('facMarksAssessment');

  if (bEl) window.currentFacultyFilters.branch = bEl.value;
  if (yEl) window.currentFacultyFilters.year = yEl.value;
  if (sEl) window.currentFacultyFilters.section = sEl.value;
  if (aEl) window.currentFacultyFilters.cieAssessment = aEl.value;

  const validAssessments = ['ciea1', 'cieb1', 'ciec1', 'ciea2', 'cieb2', 'ciec2'];
  if (!validAssessments.includes(window.currentFacultyFilters.cieAssessment)) {
    window.currentFacultyFilters.cieAssessment = 'ciea1';
  }

  window.facultySwitchTab('marks', facultyId);
};

window.facultyRecalculateRowGrade = function(roll) {
  const input = document.getElementById(\`marks_\${roll}\`);
  const badge = document.getElementById(\`grade_\${roll}\`);
  if (!input || !badge) return;

  const val = parseFloat(input.value) || 0;
  let grade = 'F (Remedial)';
  let bg = '#fee2e2';
  let color = '#991b1b';

  if (val >= 23) { grade = 'O (Outstanding)'; bg = '#dcfce7'; color = '#15803d'; }
  else if (val >= 20) { grade = 'A+ (Excellent)'; bg = '#f0fdf4'; color = '#166534'; }
  else if (val >= 17) { grade = 'A (Very Good)'; bg = '#ecfdf5'; color = '#047857'; }
  else if (val >= 14) { grade = 'B+ (Good)'; bg = '#fef3c7'; color = '#92400e'; }
  else if (val >= 12) { grade = 'B (Above Average)'; bg = '#fef9c3'; color = '#854d0e'; }

  badge.textContent = grade;
  badge.style.background = bg;
  badge.style.color = color;
};

window.facultySaveMarks = function(facultyId) {
  const f = window.currentFacultyFilters;
  const comp = f.cieAssessment;
  const marksKey = \`\${f.branch}_\${f.year}_\${f.section}_\${comp}\`;
  window.facultyMarksDB[marksKey] = window.facultyMarksDB[marksKey] || {};

  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  students.forEach(st => {
    const input = document.getElementById(\`marks_\${st.roll}\`);
    if (input) {
      const val = Math.max(0, Math.min(25, parseFloat(input.value) || 0));
      window.facultyMarksDB[marksKey][st.roll] = val;
      const sMarks = window.getStudentMarks(st.roll);
      sMarks[comp] = val;
    }
  });

  showToast(\`CIE Marks for [\${comp.toUpperCase()}] saved & updated in Student Portal.\`);
  showDemoNotice(\`Faculty Upload Confirmed: Saved \${comp.toUpperCase()} marks for \${f.branch} Sec \${f.section}. Live update applied to Student Portal.\`);
};`;

code = code.replace(oldFacultyMarksHandlersTarget, newFacultyMarksHandlers);

// 3. Update generatePortalLoginHTML to hide credentials
const oldLoginFnStart = code.indexOf('// 9. SIGN IN FORM GENERATION');
const oldLoginFnEnd = code.indexOf('// 10. ERROR & ACCESS STATUS SCREENS');

const newLoginHTMLCode = `// 9. SIGN IN FORM GENERATION (Credentials Hidden for Privacy & Security)
window.generatePortalLoginHTML = function generatePortalLoginHTML(portalType) {
  let title = '';
  let idLabel = '';
  let idPlaceholder = '';

  if (portalType === 'admin') {
    title = 'HITAM Administrative Portal';
    idLabel = 'Administrator Username';
    idPlaceholder = 'e.g. ADMINHTM01';
  } else if (portalType === 'faculty') {
    title = 'HITAM Faculty Portal';
    idLabel = 'Faculty Employee Code / HOD ID';
    idPlaceholder = 'e.g. CSEHOD or CSE01';
  } else {
    title = 'HITAM Student Portal';
    idLabel = 'Student Roll Number / Hall Ticket No';
    idPlaceholder = 'e.g. 23E51A6619';
  }

  return \`
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🔐 <strong>Secure Portal Access:</strong> Enter your registered account identifier and password to sign in.
      </div>

      <div class="portal-login-card">
        <h4 style="margin-top:0; color:#013b1f;">🔐 \${title} — Sign In</h4>
        <form onsubmit="event.preventDefault(); authenticatePortal('\${portalType}');">
          <div class="portal-field-group">
            <label>\${idLabel}</label>
            <input type="text" id="portalLoginId" value="" placeholder="\${idPlaceholder}" required autocomplete="username">
          </div>
          <div class="portal-field-group" style="margin-top:12px;">
            <label>Password</label>
            <input type="password" id="portalPassword" placeholder="Enter password" required autocomplete="current-password">
          </div>
          <div class="portal-btn-row">
            <button type="submit" class="modal-action-btn primary-btn">Sign In to Dashboard →</button>
          </div>
        </form>
      </div>

      <div class="modal-highlight-box" style="margin-top:14px; font-size:12px; color:#475569;">
        🔒 <strong>Confidential Credentials Policy:</strong> Access is restricted to authorized institute members. Passwords and credentials are confidential.
      </div>

      <div style="margin-top:16px; text-align:center;">
        <a href="https://www.hitam.org" target="_blank" rel="noopener" style="font-size:12.5px; color:#013b1f; text-decoration:underline; font-weight:700;">Visit HITAM Institutional Portal (hitam.org) ↗</a>
      </div>
    </div>
  \`;
}

window.setPortalLoginUser = function(userId, password) {
  const inputId = document.getElementById('portalLoginId');
  const inputPass = document.getElementById('portalPassword');
  if (inputId) inputId.value = userId;
  if (inputPass && password) inputPass.value = password;
  showDemoNotice(\`Selected account: \${userId}\`);
};

`;

code = code.slice(0, oldLoginFnStart) + newLoginHTMLCode + code.slice(oldLoginFnEnd);

// 4. Update renderPortalWrongPassword to hide password reminder hint
code = code.replace(
  '💡 <strong>Password Reminder:</strong> ${hint ? `Expected format: <code>${hint}</code>` : \'Please check your capitalization and credentials.\'}',
  '💡 <strong>Security Notice:</strong> Please verify your password spelling, capitalization, and registered credentials.'
);

// 5. Update Faculty Upload Marks tab assessment dropdown to include Mid 1 (ciea1, cieb1, ciec1) & Mid 2 (ciea2, cieb2, ciec2)
const oldAssessmentOptionsTarget = `      const assessmentOptions = isSecA ? \`
        <option value="ciea1" \${cieKey === 'ciea1' ? 'selected' : ''}>CIE-1 (Mid-1 Exam + Assignment 1) [ciea1]</option>
        <option value="ciea2" \${cieKey === 'ciea2' ? 'selected' : ''}>CIE-2 (Mid-2 Exam + Assignment 2) [ciea2]</option>
        <option value="ciea3" \${cieKey === 'ciea3' ? 'selected' : ''}>CIE-3 (Lab Internal / Viva) [ciea3]</option>
      \` : \`
        <option value="cieb1" \${cieKey === 'cieb1' ? 'selected' : ''}>CIE-1 (Mid-1 Exam + Assignment 1) [cieb1]</option>
        <option value="cieb2" \${cieKey === 'cieb2' ? 'selected' : ''}>CIE-2 (Mid-2 Exam + Assignment 2) [cieb2]</option>
        <option value="cieb3" \${cieKey === 'cieb3' ? 'selected' : ''}>CIE-3 (Lab Internal / Viva) [cieb3]</option>
      \`;`;

const newAssessmentOptions = `      const assessmentOptions = \`
        <optgroup label="Mid-Semester 1 Internal Assessment Components">
          <option value="ciea1" \${cieKey === 'ciea1' ? 'selected' : ''}>Mid-1 Theory Exam [ciea1] (Max 25)</option>
          <option value="cieb1" \${cieKey === 'cieb1' ? 'selected' : ''}>Mid-1 Assignment [cieb1] (Max 25)</option>
          <option value="ciec1" \${cieKey === 'ciec1' ? 'selected' : ''}>Mid-1 Quiz &amp; Activity [ciec1] (Max 25)</option>
        </optgroup>
        <optgroup label="Mid-Semester 2 Internal Assessment Components">
          <option value="ciea2" \${cieKey === 'ciea2' ? 'selected' : ''}>Mid-2 Theory Exam [ciea2] (Max 25)</option>
          <option value="cieb2" \${cieKey === 'cieb2' ? 'selected' : ''}>Mid-2 Assignment [cieb2] (Max 25)</option>
          <option value="ciec2" \${cieKey === 'ciec2' ? 'selected' : ''}>Mid-2 Quiz &amp; Activity [ciec2] (Max 25)</option>
        </optgroup>
      \`;`;

code = code.replace(oldAssessmentOptionsTarget, newAssessmentOptions);

// Also update initial score reading in faculty marks row
code = code.replace(
  `        const storedScore = window.facultyMarksDB[marksStoreKey][st.roll];
        const defaultScore = storedScore !== undefined ? storedScore : (20 + (parseInt(st.roll.slice(-2), 10) % 5));`,
  `        const sMarks = window.getStudentMarks(st.roll);
        const storedScore = window.facultyMarksDB[marksStoreKey] ? window.facultyMarksDB[marksStoreKey][st.roll] : undefined;
        const defaultScore = storedScore !== undefined ? storedScore : (sMarks[cieKey] !== undefined ? sMarks[cieKey] : 22);`
);

// 6. Update Student Details Tab: "just info and add performance" & "remove my photo in student portal"
const sDetailsStart = code.indexOf('// 1. STUDENT DETAILS TAB');
const sAttendanceStart = code.indexOf('// 2. ATTENDANCE TAB');

const newStudentDetailsContent = `// 1. STUDENT DETAILS TAB (Info + Academic Performance Record)
    if (activeTab === 'details') {
      const marks = window.getStudentMarks(studentUser.roll);
      const mid1Avg = ((marks.ciea1 + marks.cieb1 + marks.ciec1) / 3).toFixed(1);
      const mid2Avg = ((marks.ciea2 + marks.cieb2 + marks.ciec2) / 3).toFixed(1);
      const overallCie = ((parseFloat(mid1Avg) + parseFloat(mid2Avg)) / 2).toFixed(1);

      tabContentHTML = \`
        <div class="erp-section-title">STUDENT PROFILE &amp; PERFORMANCE</div>

        <!-- 1. STUDENT INFO / BIO-DATA -->
        <div class="erp-accordion-item" style="border:1px solid #c8e4cf; border-radius:6px; margin-bottom:14px; overflow:hidden;">
          <div class="erp-accordion-header" style="background:#08752f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>👤</span> BIO-DATA &amp; STUDENT INFORMATION
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
              <div><span class="lbl">Examination Status:</span> <strong style="color:#15803d;">Verified (Autonomous Center)</strong></div>
              <div><span class="lbl">Cumulative CGPA:</span> <strong style="color:#08752f;">\${studentUser.cgpa}</strong></div>
              <div><span class="lbl">Attendance Record:</span> <strong>\${studentUser.attendance}</strong></div>
              <div><span class="lbl">Active Backlogs:</span> <strong>\${studentUser.backlogs}</strong></div>
              <div><span class="lbl">Fee Clearance:</span> <strong>\${studentUser.feeDue}</strong></div>
            </div>
          </div>
        </div>

        <!-- 2. ACADEMIC PERFORMANCE (LIVE CIE EVALUATION & SEMESTER RECORDS) -->
        <div class="erp-accordion-item" style="border:1px solid #c8e4cf; border-radius:6px; margin-bottom:16px; overflow:hidden;">
          <div class="erp-accordion-header" style="background:#013b1f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>📊</span> ACADEMIC PERFORMANCE SUMMARY &amp; CIE EVALUATION
            </span>
            <span style="font-size:11px; opacity:0.9;">Real-Time Faculty Sync</span>
          </div>
          <div class="erp-accordion-body" style="display:block; padding:16px; background:#fafffa;">
            <!-- Key Standing Pills -->
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; text-align:center; margin-bottom:14px;">
              <div class="erp-kpi-pill"><span class="val">8.84</span><span class="lbl">Current SGPA</span></div>
              <div class="erp-kpi-pill"><span class="val" style="color:#08752f;">\${studentUser.cgpa.slice(0,4)}</span><span class="lbl">Cumulative CGPA</span></div>
              <div class="erp-kpi-pill"><span class="val">128 / 160</span><span class="lbl">Credits Earned</span></div>
              <div class="erp-kpi-pill"><span class="val" style="color:#15803d;">89.4%</span><span class="lbl">Attendance</span></div>
            </div>

            <!-- Live CIE Internal Marks Sync Box -->
            <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:12px;">
              <div style="font-weight:700; font-size:12.5px; color:#166534; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>🎯 Continuous Internal Evaluation (CIE) Marks — Live Faculty Roster</span>
                <span style="color:#08752f; font-weight:800;">CIE Average: \${overallCie} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px 10px;">
                  <strong style="color:#166534; font-size:12px; display:block; margin-bottom:4px;">Mid-Semester 1 (Average: \${mid1Avg}/25):</strong>
                  <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#334155;">
                    <span>ciea1: <b>\${marks.ciea1}/25</b></span>
                    <span>cieb1: <b>\${marks.cieb1}/25</b></span>
                    <span>ciec1: <b>\${marks.ciec1}/25</b></span>
                  </div>
                </div>
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px 10px;">
                  <strong style="color:#166534; font-size:12px; display:block; margin-bottom:4px;">Mid-Semester 2 (Average: \${mid2Avg}/25):</strong>
                  <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#334155;">
                    <span>ciea2: <b>\${marks.ciea2}/25</b></span>
                    <span>cieb2: <b>\${marks.cieb2}/25</b></span>
                    <span>ciec2: <b>\${marks.ciec2}/25</b></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Semester History Table -->
            <div style="font-size:12px; font-weight:700; color:#1e293b; margin:10px 0 6px 0;">Past Semester Results History:</div>
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

        <!-- ACTION BUTTONS -->
        <div class="erp-btn-row">
          <button type="button" class="erp-btn" onclick="window.print()">Print</button>
          <button type="button" class="erp-btn" onclick="showDemoNotice('Exporting Student Profile record to CSV/PDF format...')">Export</button>
          <button type="button" class="erp-btn" style="background:#0f5132;" onclick="studentShowHallTicket('\${studentUser.roll}')">🎟️ View Autonomous Hall Ticket →</button>
          <button type="button" class="erp-btn" style="background:#334155;" onclick="studentApplyBonafide('\${studentUser.roll}')">📄 Request Bonafide Guidelines</button>
        </div>
      \`;
    }
`;

code = code.slice(0, sDetailsStart) + newStudentDetailsContent + '\n    ' + code.slice(sAttendanceStart);

// 7. Update Student Marks Tab to show live Mid-1 & Mid-2 components
const sMarksStart = code.indexOf('// 5. MARKS TAB');
const sFeedbackStart = code.indexOf('// 6. FEEDBACK TAB');

const newStudentMarksContent = `// 5. MARKS TAB (Live Synchronized Mid-1 & Mid-2 CIE Evaluations)
    else if (activeTab === 'marks') {
      const marks = window.getStudentMarks(studentUser.roll);
      const mid1Avg = ((marks.ciea1 + marks.cieb1 + marks.ciec1) / 3).toFixed(1);
      const mid2Avg = ((marks.ciea2 + marks.cieb2 + marks.ciec2) / 3).toFixed(1);
      const overallCie = ((parseFloat(mid1Avg) + parseFloat(mid2Avg)) / 2).toFixed(1);

      const marksRowsHTML = studentUser.subjects.map((s, idx) => {
        const delta = (idx % 3) - 1;
        const subCiea1 = Math.min(25, Math.max(0, marks.ciea1 + delta));
        const subCieb1 = Math.min(25, Math.max(0, marks.cieb1 + delta));
        const subCiec1 = Math.min(25, Math.max(0, marks.ciec1 + delta));
        const subMid1 = ((subCiea1 + subCieb1 + subCiec1) / 3).toFixed(1);

        const subCiea2 = Math.min(25, Math.max(0, marks.ciea2 + delta));
        const subCieb2 = Math.min(25, Math.max(0, marks.cieb2 + delta));
        const subCiec2 = Math.min(25, Math.max(0, marks.ciec2 + delta));
        const subMid2 = ((subCiea2 + subCieb2 + subCiec2) / 3).toFixed(1);

        const subOverall = ((parseFloat(subMid1) + parseFloat(subMid2)) / 2).toFixed(1);
        const gradeStr = subOverall >= 23 ? 'O (Outstanding)' : (subOverall >= 20 ? 'A+ (Excellent)' : 'A (Very Good)');

        return \`
          <tr>
            <td><strong>\${s.code}</strong></td>
            <td>\${s.name}</td>
            <td>\${subCiea1}</td>
            <td>\${subCieb1}</td>
            <td>\${subCiec1}</td>
            <td><strong style="color:#08752f;">\${subMid1}</strong></td>
            <td>\${subCiea2}</td>
            <td>\${subCieb2}</td>
            <td>\${subCiec2}</td>
            <td><strong style="color:#08752f;">\${subMid2}</strong></td>
            <td><strong style="color:#013b1f; font-size:13px;">\${subOverall} / 25</strong></td>
            <td>\${s.credits}</td>
            <td><span style="font-size:11px; font-weight:700; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px;">\${gradeStr}</span></td>
          </tr>
        \`;
      }).join('');

      tabContentHTML = \`
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📝</span> Continuous Internal Evaluation (CIE) Marks &amp; GPA Summary
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Live faculty evaluation sync: Mid-1 (ciea1, cieb1, ciec1) and Mid-2 (ciea2, cieb2, ciec2).
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-weight:700; color:#166534; font-size:13px; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>Mid-Semester 1 Internal Evaluation</span>
                <span style="color:#08752f;">Average: \${mid1Avg} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center;">
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciea1 (Exam)</span>
                  <strong style="color:#0f172a; font-size:15px;">\${marks.ciea1} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">cieb1 (Assignment)</span>
                  <strong style="color:#0f172a; font-size:15px;">\${marks.cieb1} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciec1 (Quiz / Viva)</span>
                  <strong style="color:#0f172a; font-size:15px;">\${marks.ciec1} / 25</strong>
                </div>
              </div>
            </div>

            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-weight:700; color:#166534; font-size:13px; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>Mid-Semester 2 Internal Evaluation</span>
                <span style="color:#08752f;">Average: \${mid2Avg} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center;">
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciea2 (Exam)</span>
                  <strong style="color:#0f172a; font-size:15px;">\${marks.ciea2} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">cieb2 (Assignment)</span>
                  <strong style="color:#0f172a; font-size:15px;">\${marks.cieb2} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciec2 (Quiz / Viva)</span>
                  <strong style="color:#0f172a; font-size:15px;">\${marks.ciec2} / 25</strong>
                </div>
              </div>
            </div>
          </div>

          <div style="overflow-x:auto;">
            <table class="portal-data-table" style="font-size:11.5px;">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>ciea1</th>
                  <th>cieb1</th>
                  <th>ciec1</th>
                  <th>Mid-1</th>
                  <th>ciea2</th>
                  <th>cieb2</th>
                  <th>ciec2</th>
                  <th>Mid-2</th>
                  <th>CIE Total</th>
                  <th>Credits</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                \${marksRowsHTML}
              </tbody>
            </table>
          </div>

          <div style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:12px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <strong>Cumulative Grade Point Average (CGPA):</strong> <span style="color:#08752f; font-weight:800; font-size:15px;">\${studentUser.cgpa}</span>
              <div style="font-size:11.5px; color:#64748b;">Sem I: 8.75 | Sem II: 8.80 | Sem III: 8.90 | Sem IV: 8.85 | Sem V: 8.80 | Sem VI: 8.84</div>
            </div>
            <button class="drill-action-btn drill-action-primary" onclick="studentViewMemoInfo('\${studentUser.roll}')">📄 Semester Marks Memo Info</button>
          </div>
        </div>
      \`;
    }
`;

code = code.slice(0, sMarksStart) + newStudentMarksContent + '\n    ' + code.slice(sFeedbackStart);

// 8. Remove personal student photo from the Student ERP header
const oldHeaderPhotoCode = `<div class="hitam-erp-user-photo" title="Student Profile Photo">
            <img src="\${studentUser.photo || 'assets/student-profile.png'}" alt="Student Photo" class="hitam-erp-photo-img">
          </div>`;

const newHeaderBadgeCode = `<div class="hitam-erp-user-badge" style="background:#e8f5ec; color:#0b4f26; font-size:12px; font-weight:700; padding:8px 14px; border-radius:6px; border:1px solid #bbf7d0; display:flex; align-items:center; gap:6px;">
            <span>🎓</span> Autonomous Student
          </div>`;

code = code.replace(oldHeaderPhotoCode, newHeaderBadgeCode);

fs.writeFileSync('scratch/section15_expanded.js', code, 'utf8');
console.log('Successfully updated scratch/section15_expanded.js with marks synchronization, hidden credentials, and removed student photo!');
