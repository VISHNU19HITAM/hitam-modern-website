// scratch/update_exam_portal.js
const fs = require('fs');

let sec15 = fs.readFileSync('scratch/section15_expanded.js', 'utf8');

// 1. Update generatePortalLoginHTML title & check
sec15 = sec15.replace(
  /\}\s*else\s*if\s*\(\s*portalType\s*===\s*'sem-result'[\s\S]*?idPlaceholder\s*=\s*'e\.g\.\s*23E51A6619';\s*\}/m,
  `} else if (portalType === 'exam-portal' || portalType === 'sem-result' || portalType === 'sem-result-portal') {
    title = 'HITAM Autonomous Exam Portal';
    idLabel = 'Student Hall Ticket / Roll Number';
    idPlaceholder = 'e.g. 23E51A6619';
  }`
);

// 2. Update authenticatePortal hook
sec15 = sec15.replace(
  /\/\/\s*S\.\s*SEMESTER\s*RESULT\s*PORTAL\s*AUTHENTICATION[\s\S]*?return;\s*\}/m,
  `// S. EXAM PORTAL AUTHENTICATION
  if (portalType === 'exam-portal' || portalType === 'sem-result' || portalType === 'sem-result-portal') {
    window.authenticateExamPortal(overrideId);
    return;
  }`
);

// 3. Find Section 14 marker
const sec14Index = sec15.indexOf('/* ==========================================================================\n   14. AUTONOMOUS EXAMINATION BRANCH');
if (sec14Index !== -1) {
  sec15 = sec15.slice(0, sec14Index).trim();
}

const newSection14 = `
/* ==========================================================================
   14. AUTONOMOUS EXAMINATION PORTAL (EXAM PORTAL)
   Includes:
   - 1. Notices About Important Dates & Examination Circulars
   - 2. Semester Results & Autonomous Grade Memos (SGPA/CGPA)
   - 3. Hall Ticket Download (Admit Card with Timetable & Barcode)
   - 4. Exam Fee Payment & Challan Receipts
   - 5. Internal Marks (Continuous Evaluation, Final Internal Marks & Percentage)
   ========================================================================== */

window.activeExamPortalTab = 'notices';

// Internal Marks & Final Percentage Calculator with live faculty sync
window.getStudentInternalMarksBreakdown = function(studentUser) {
  const roll = studentUser.roll;
  const marks = window.getStudentMarks ? window.getStudentMarks(roll) : {
    ciea1: 18, cieb1: 17, ciec1: 19,
    ciea2: 19, cieb2: 18, ciec2: 19
  };

  // Convert raw test/assignment/quiz inputs to 20-mark scaled Mid-1 and Mid-2
  const mid1Val1 = Math.min(20, parseFloat((((marks.ciea1 * 0.6) + (marks.cieb1 * 0.25) + (marks.ciec1 * 0.15))).toFixed(1)));
  const mid2Val1 = Math.min(20, parseFloat((((marks.ciea2 * 0.6) + (marks.cieb2 * 0.25) + (marks.ciec2 * 0.15))).toFixed(1)));
  const finalCie1 = parseFloat((mid1Val1 + mid2Val1).toFixed(1));
  const pct1 = ((finalCie1 / 40) * 100).toFixed(1);

  const mid1Val2 = 18.0;
  const mid2Val2 = 18.0;
  const finalCie2 = parseFloat((mid1Val2 + mid2Val2).toFixed(1));
  const pct2 = ((finalCie2 / 40) * 100).toFixed(1);

  const mid1Val3 = 19.0;
  const mid2Val3 = 19.0;
  const finalCie3 = parseFloat((mid1Val3 + mid2Val3).toFixed(1));
  const pct3 = ((finalCie3 / 40) * 100).toFixed(1);

  const mid1Val4 = 17.5;
  const mid2Val4 = 17.5;
  const finalCie4 = parseFloat((mid1Val4 + mid2Val4).toFixed(1));
  const pct4 = ((finalCie4 / 40) * 100).toFixed(1);

  const mid1Val5 = 18.0;
  const mid2Val5 = 18.5;
  const finalCie5 = parseFloat((mid1Val5 + mid2Val5).toFixed(1));
  const pct5 = ((finalCie5 / 40) * 100).toFixed(1);

  return [
    {
      code: '22AI501PC',
      title: 'Machine Learning Techniques',
      type: 'Core Theory',
      mid1: mid1Val1.toFixed(1),
      mid2: mid2Val1.toFixed(1),
      finalInternal: finalCie1.toFixed(1),
      maxInternal: 40,
      percentage: pct1 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22AI502PC',
      title: 'Deep Learning & Neural Networks',
      type: 'Core Theory',
      mid1: mid1Val2.toFixed(1),
      mid2: mid2Val2.toFixed(1),
      finalInternal: finalCie2.toFixed(1),
      maxInternal: 40,
      percentage: pct2 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS503PC',
      title: 'Computer Networks & Internet Protocols',
      type: 'Core Theory',
      mid1: mid1Val3.toFixed(1),
      mid2: mid2Val3.toFixed(1),
      finalInternal: finalCie3.toFixed(1),
      maxInternal: 40,
      percentage: pct3 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS504PC',
      title: 'Automata Theory & Compiler Design',
      type: 'Core Theory',
      mid1: mid1Val4.toFixed(1),
      mid2: mid2Val4.toFixed(1),
      finalInternal: finalCie4.toFixed(1),
      maxInternal: 40,
      percentage: pct4 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS505PE',
      title: 'Cloud Computing & Distributed Systems',
      type: 'Professional Elective',
      mid1: mid1Val5.toFixed(1),
      mid2: mid2Val5.toFixed(1),
      finalInternal: finalCie5.toFixed(1),
      maxInternal: 40,
      percentage: pct5 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22AI506PC',
      title: 'Machine Learning Laboratory',
      type: 'Practical Lab',
      mid1: '19.5',
      mid2: '19.5',
      finalInternal: '39.0',
      maxInternal: 40,
      percentage: '97.5%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS507PC',
      title: 'Computer Networks Laboratory',
      type: 'Practical Lab',
      mid1: '19.0',
      mid2: '19.5',
      finalInternal: '38.5',
      maxInternal: 40,
      percentage: '96.3%',
      status: 'ELIGIBLE'
    }
  ];
};

window.getSemesterResults = function(studentUser, semNum = 5, isConsolidated = false) {
  const deptKey = studentUser.deptKey || 'CSM';
  const roll = studentUser.roll;
  
  // Retrieve live faculty CIE marks if available
  const liveMarks = window.getStudentMarks ? window.getStudentMarks(roll) : {
    ciea1: 18, cieb1: 17, ciec1: 19,
    ciea2: 19, cieb2: 18, ciec2: 19
  };

  const mid1Score1 = Math.round((liveMarks.ciea1 + liveMarks.ciea2) || 37);
  const mid1Score2 = Math.round((liveMarks.cieb1 + liveMarks.cieb2) || 36);
  const mid1Score3 = Math.round((liveMarks.ciec1 + liveMarks.ciec2) || 38);

  const semSubjectDB = {
    1: [
      { code: '22MA101BS', title: 'Matrices and Calculus', type: 'Professional Core (Theory)', cie: 36, see: 52, credits: 4.0 },
      { code: '22PH102BS', title: 'Applied Physics', type: 'Basic Science (Theory)', cie: 37, see: 50, credits: 4.0 },
      { code: '22CS103ES', title: 'Programming for Problem Solving (C)', type: 'Engineering Science (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22EN104HS', title: 'English for Skill Enhancement', type: 'Humanities & Social Sciences', cie: 38, see: 52, credits: 2.0 },
      { code: '22PH105BS', title: 'Applied Physics Laboratory', type: 'Basic Science (Lab)', cie: 38, see: 54, credits: 1.5 },
      { code: '22CS106ES', title: 'Programming for Problem Solving Lab', type: 'Engineering Science (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22ME107ES', title: 'Engineering Workshop Practice', type: 'Engineering Science (Lab)', cie: 38, see: 53, credits: 2.5 },
      { code: '22EN108HS', title: 'English Language & Communication Lab', type: 'Humanities (Lab)', cie: 39, see: 54, credits: 1.0 }
    ],
    2: [
      { code: '22MA201BS', title: 'Ordinary Differential Equations & Vector Calculus', type: 'Basic Science (Theory)', cie: 37, see: 51, credits: 4.0 },
      { code: '22CH202BS', title: 'Engineering Chemistry', type: 'Basic Science (Theory)', cie: 36, see: 49, credits: 4.0 },
      { code: '22CS203PC', title: 'Data Structures and Algorithms', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22EE204ES', title: 'Basic Electrical & Electronics Engineering', type: 'Engineering Science (Theory)', cie: 37, see: 50, credits: 3.0 },
      { code: '22ME205ES', title: 'Computer Aided Engineering Graphics', type: 'Engineering Science (Lab)', cie: 38, see: 54, credits: 3.0 },
      { code: '22CS206PC', title: 'Data Structures Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22CH207BS', title: 'Engineering Chemistry Laboratory', type: 'Basic Science (Lab)', cie: 38, see: 53, credits: 1.5 }
    ],
    3: [
      { code: '22CS301PC', title: 'Mathematical and Statistical Foundations', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22CS302PC', title: 'Computer Organization & Architecture', type: 'Professional Core (Theory)', cie: 37, see: 52, credits: 3.0 },
      { code: '22CS303PC', title: 'Object Oriented Programming through Java', type: 'Professional Core (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22CS304PC', title: 'Database Management Systems', type: 'Professional Core (Theory)', cie: 38, see: 54, credits: 3.0 },
      { code: '22EC305ES', title: 'Digital Logic Design & Microprocessors', type: 'Engineering Science (Theory)', cie: 36, see: 50, credits: 3.0 },
      { code: '22CS306PC', title: 'Java Programming Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22CS307PC', title: 'Database Management Systems Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22MC308GS', title: 'Gender Sensitization Laboratory', type: 'Mandatory Non-Credit Audit', cie: 38, see: 52, credits: 0.0 }
    ],
    4: [
      { code: '22CS401PC', title: 'Design and Analysis of Algorithms', type: 'Professional Core (Theory)', cie: 37, see: 51, credits: 3.0 },
      { code: '22CS402PC', title: 'Operating Systems & System Architecture', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22CS403PC', title: 'Software Engineering & Agile Methodologies', type: 'Professional Core (Theory)', cie: 38, see: 52, credits: 3.0 },
      { code: '22AI404PC', title: 'Artificial Intelligence Foundations', type: 'Professional Core (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22CS405PC', title: 'Python for Machine Learning', type: 'Professional Core (Theory)', cie: 39, see: 54, credits: 3.0 },
      { code: '22CS406PC', title: 'Operating Systems & Linux Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22AI407PC', title: 'AI & Problem Solving Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22MC408ES', title: 'Constitution of India', type: 'Mandatory Non-Credit Audit', cie: 38, see: 50, credits: 0.0 }
    ],
    5: [
      { code: '22AI501PC', title: 'Machine Learning Techniques', type: 'Professional Core (Theory)', cie: mid1Score1, see: 54, credits: 3.0 },
      { code: '22AI502PC', title: 'Deep Learning & Neural Networks', type: 'Professional Core (Theory)', cie: mid1Score2, see: 52, credits: 3.0 },
      { code: '22CS503PC', title: 'Computer Networks & Internet Protocols', type: 'Professional Core (Theory)', cie: mid1Score3, see: 53, credits: 3.0 },
      { code: '22CS504PC', title: 'Automata Theory & Compiler Design', type: 'Professional Core (Theory)', cie: 37, see: 51, credits: 3.0 },
      { code: '22CS505PE', title: 'Cloud Computing & Distributed Platforms', type: 'Professional Elective - I', cie: 38, see: 54, credits: 3.0 },
      { code: '22AI506PC', title: 'Machine Learning Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22CS507PC', title: 'Computer Networks Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22MC508IP', title: 'Intellectual Property Rights & Ethics', type: 'Mandatory Non-Credit Audit', cie: 38, see: 52, credits: 0.0 }
    ]
  };

  const rawSubjects = semSubjectDB[semNum] || semSubjectDB[5];

  let totalGradePoints = 0;
  let totalCredits = 0;

  const subjects = rawSubjects.map(s => {
    const total = s.cie + s.see;
    let grade = 'O';
    let pts = 10;
    if (total < 90 && total >= 80) { grade = 'A+'; pts = 9; }
    else if (total < 80 && total >= 70) { grade = 'A'; pts = 8; }
    else if (total < 70 && total >= 60) { grade = 'B+'; pts = 7; }
    else if (total < 60 && total >= 50) { grade = 'B'; pts = 6; }
    else if (total < 50 && total >= 40) { grade = 'C'; pts = 5; }
    else if (total < 40) { grade = 'F'; pts = 0; }

    if (s.credits > 0) {
      totalGradePoints += pts * s.credits;
      totalCredits += s.credits;
    }

    return {
      code: s.code,
      title: s.title,
      type: s.type,
      cie: s.cie,
      see: s.see,
      total: total,
      grade: grade,
      gradePoints: pts,
      credits: s.credits.toFixed(1),
      result: (total >= 40 && s.see >= 21) ? 'PASS' : 'FAIL'
    };
  });

  const sgpa = (totalGradePoints / totalCredits).toFixed(2);
  const examSessions = {
    1: 'NOV / DEC 2023 (Regular Autonomous)',
    2: 'APR / MAY 2024 (Regular Autonomous)',
    3: 'NOV / DEC 2024 (Regular Autonomous)',
    4: 'APR / MAY 2025 (Regular Autonomous)',
    5: 'NOV / DEC 2025 (Regular Autonomous)'
  };

  return {
    sem: semNum,
    examSession: examSessions[semNum] || 'CURRENT AUTONOMOUS SESSION',
    sgpa: sgpa,
    cgpa: '8.82',
    totalCredits: totalCredits.toFixed(1),
    subjects: subjects,
    issueDate: '24-OCT-2026',
    memoRef: \`HITM/AUTON/RES/\${roll}/SEM-\${semNum}\`,
    semesters: [
      { sem: 1, period: 'Nov/Dec 2023', credits: '20.0', sgpa: '8.85' },
      { sem: 2, period: 'Apr/May 2024', credits: '20.0', sgpa: '8.80' },
      { sem: 3, period: 'Nov/Dec 2024', credits: '21.0', sgpa: '8.90' },
      { sem: 4, period: 'Apr/May 2025', credits: '21.0', sgpa: '8.75' },
      { sem: 5, period: 'Nov/Dec 2025', credits: '21.0', sgpa: sgpa }
    ]
  };
};

window.renderExamPortalDashboard = function(studentUser, activeTab = 'notices', selectedSem = 5) {
  const roll = studentUser.roll;
  window.activeExamPortalTab = activeTab;

  let activeTabContentHTML = '';

  // 1. TAB: NOTICES ABOUT IMPORTANT DATES
  if (activeTab === 'notices') {
    activeTabContentHTML = \`
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>📢</span> NOTICES &amp; IMPORTANT EXAMINATION DATES
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Key academic dates, registration windows, and circulars issued by the Autonomous Examination Branch.
        </p>

        <!-- Milestones Schedule Table -->
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; overflow:hidden; margin-bottom:16px;">
          <div style="background:#08752f; color:#ffffff; padding:10px 14px; font-weight:700; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
            <span>🗓️ Autonomous Examination Milestones (Odd Semester 2026–2027)</span>
            <span style="font-size:11px; opacity:0.9;">Regulation: R22 Autonomous</span>
          </div>
          <table class="sem-memo-table" style="margin:0;">
            <thead>
              <tr>
                <th style="width:40px; text-align:center;">#</th>
                <th>Examination Event / Milestone</th>
                <th style="width:200px;">Scheduled Dates</th>
                <th style="width:130px; text-align:center;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align:center;">1</td>
                <td><strong>Examination Notification Issued</strong><br><span style="font-size:11px; color:#64748b;">Autonomous Semester End Examinations (SEE)</span></td>
                <td><strong>10-OCT-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge pass">COMPLETED</span></td>
              </tr>
              <tr style="background:#f0fdf4;">
                <td style="text-align:center;">2</td>
                <td><strong>Online Exam Fee Payment (Without Fine)</strong><br><span style="font-size:11px; color:#15803d;">Regular fee payment window for eligible candidates</span></td>
                <td><strong style="color:#15803d;">15-OCT-2026 to 02-NOV-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#0284c7; color:#fff;">ACTIVE NOW</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">3</td>
                <td><strong>Exam Fee Payment (With ₹100 Late Fee)</strong><br><span style="font-size:11px; color:#64748b;">Late registration for all branches</span></td>
                <td>03-NOV-2026 to 08-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#f59e0b; color:#fff;">UPCOMING</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">4</td>
                <td><strong>Exam Fee Payment (With ₹1,000 Super Late Fine)</strong><br><span style="font-size:11px; color:#64748b;">Final registration window</span></td>
                <td>09-NOV-2026 to 12-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">UPCOMING</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">5</td>
                <td><strong>Hall Ticket Download Portal Active</strong><br><span style="font-size:11px; color:#64748b;">Download admit card with room &amp; seat allotment</span></td>
                <td><strong>10-NOV-2026 onwards</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge pass">GENERATED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">6</td>
                <td><strong>Laboratory &amp; Practical Viva Examinations</strong><br><span style="font-size:11px; color:#64748b;">Internal &amp; external examiner assessments</span></td>
                <td>14-NOV-2026 to 21-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">7</td>
                <td><strong>Semester End Theory Examinations (SEE)</strong><br><span style="font-size:11px; color:#64748b;">Forenoon Session: 10:00 AM – 1:00 PM</span></td>
                <td><strong>24-NOV-2026 to 12-DEC-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">8</td>
                <td><strong>Provisional Results Declaration</strong><br><span style="font-size:11px; color:#64748b;">Grade memos &amp; SGPA ledger publication</span></td>
                <td><strong>28-DEC-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Examination Circulars Grid -->
        <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <span>📜</span> Examination Branch Circulars &amp; Directives
        </div>
        <div class="modal-grid-features" style="margin-bottom:16px;">
          <div class="modal-feature-card">
            <strong>Circular #2026/08 — Odd Semester SEE Notification</strong>
            <span>Detailed regulation guidelines for B.Tech II, III, and IV Years regular and supplementary examination sessions.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Notification Circular #2026/08 downloaded.')">📄 View Circular</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/09 — Continuous Evaluation (CIE-2) Schedule</strong>
            <span>Faculty submission deadlines for Mid-2 exam, assignment, and quiz marks into autonomous database.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('CIE-2 assessment schedule verified.')">📄 View Schedule</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/07 — Digital Barcoded Evaluation Guidelines</strong>
            <span>Mandatory instructions regarding 32-page barcoded answer books and digital evaluation protocols.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Barcoded answer booklet instructions previewed.')">📄 View Guidelines</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/06 — Fee Payment &amp; Challan Procedure</strong>
            <span>Step-by-step guidance for seamless net banking, UPI, and debit card exam fee payments.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="examPortalSwitchTab('\${roll}', 'feepayment')">Proceed to Fee Payment →</button>
            </div>
          </div>
        </div>
      </div>
    \`;
  }

  // 2. TAB: RESULTS (SEMESTER RESULTS & GRADE MEMO)
  else if (activeTab === 'results') {
    const semNum = parseInt(selectedSem, 10);
    const isConsolidated = selectedSem === 'consolidated' || selectedSem === 'all';
    const semResultData = window.getSemesterResults(studentUser, isNaN(semNum) ? 5 : semNum, isConsolidated);

    const semButtonsHTML = [1, 2, 3, 4, 5].map(s => \`
      <button class="sem-selector-pill \${(!isConsolidated && semNum === s) ? 'active' : ''}" 
              onclick="authenticateExamPortal('\${roll}', 'results', \${s})">
        Semester \${s}
      </button>
    \`).join('') + \`
      <button class="sem-selector-pill \${(isConsolidated) ? 'active' : ''}" 
              onclick="authenticateExamPortal('\${roll}', 'results', 'consolidated')">
        📊 Consolidated Memo
      </button>
    \`;

    let tableRowsHTML = '';
    if (isConsolidated) {
      tableRowsHTML = semResultData.semesters.map((s, idx) => \`
        <tr>
          <td style="text-align:center;">\${idx + 1}</td>
          <td><strong>Semester \${s.sem}</strong> (\${s.period})</td>
          <td style="text-align:center;">\${s.credits}</td>
          <td style="text-align:center;">\${s.credits}</td>
          <td style="text-align:center; font-weight:700; color:#08752f;">\${s.sgpa}</td>
          <td style="text-align:center;"><span class="memo-status-badge pass">PASS</span></td>
          <td style="text-align:center;">
            <button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="authenticateExamPortal('\${roll}', 'results', \${s.sem})">View Memo →</button>
          </td>
        </tr>
      \`).join('');
    } else {
      tableRowsHTML = semResultData.subjects.map((sub, idx) => \`
        <tr>
          <td style="text-align:center;">\${idx + 1}</td>
          <td><strong style="color:#0f172a;">\${sub.code}</strong></td>
          <td>
            <div style="font-weight:600; color:#1e293b;">\${sub.title}</div>
            <span style="font-size:11px; color:#64748b;">\${sub.type}</span>
          </td>
          <td style="text-align:center; font-weight:600;">\${sub.cie} / 40</td>
          <td style="text-align:center; font-weight:600;">\${sub.see} / 60</td>
          <td style="text-align:center; font-weight:700; color:#0f172a;">\${sub.total} / 100</td>
          <td style="text-align:center;"><span class="grade-pill grade-\${sub.grade}">\${sub.grade}</span></td>
          <td style="text-align:center; font-weight:700;">\${sub.gradePoints}</td>
          <td style="text-align:center; font-weight:600;">\${sub.credits}</td>
          <td style="text-align:center;"><span class="memo-status-badge \${sub.result.toLowerCase()}">\${sub.result}</span></td>
        </tr>
      \`).join('');
    }

    activeTabContentHTML = \`
      <div class="sem-result-memo-sheet">
        <div class="sem-memo-header">
          <div class="sem-memo-logo-row">
            <div class="sem-memo-crest">HITM</div>
            <div>
              <div class="sem-memo-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
              <div class="sem-memo-college-sub">An Autonomous Institution Conferred by UGC • Approved by AICTE • Accredited with 'A+' Grade by NAAC</div>
              <div class="sem-memo-branch-title">OFFICE OF THE CONTROLLER OF EXAMINATIONS</div>
            </div>
          </div>
          <div class="sem-memo-badge-line">
            <span>PROVISIONAL SEMESTER GRADE MEMORANDUM</span>
            <span class="regulation-tag">REGULATION: AUTONOMOUS R22</span>
          </div>
        </div>

        <div class="sem-memo-meta-grid">
          <div><span class="lbl">Student Name:</span> <strong>\${studentUser.name}</strong></div>
          <div><span class="lbl">Hall Ticket / Roll No:</span> <strong style="color:#08752f; font-size:13.5px;">\${studentUser.roll}</strong></div>
          <div><span class="lbl">Degree &amp; Program:</span> <strong>\${studentUser.branch}</strong></div>
          <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
          <div><span class="lbl">Academic Standing:</span> <strong>\${studentUser.yearSem}</strong></div>
          <div><span class="lbl">Examination Session:</span> <strong>\${semResultData.examSession}</strong></div>
          <div><span class="lbl">Examination Center:</span> <strong>HITAM Autonomous Center (Code: HITM)</strong></div>
          <div><span class="lbl">Result Standing:</span> <strong style="color:#15803d;">PASSED IN FIRST CLASS WITH DISTINCTION</strong></div>
        </div>

        <div class="sem-selector-nav">
          <span style="font-size:12px; font-weight:700; color:#334155; margin-right:4px;">Select Examination:</span>
          \${semButtonsHTML}
        </div>

        <div style="overflow-x:auto; margin-top:12px;">
          \${isConsolidated ? \`
            <table class="sem-memo-table">
              <thead>
                <tr>
                  <th style="text-align:center;">#</th>
                  <th>Semester Examination</th>
                  <th style="text-align:center;">Total Credits</th>
                  <th style="text-align:center;">Credits Earned</th>
                  <th style="text-align:center;">SGPA</th>
                  <th style="text-align:center;">Result Status</th>
                  <th style="text-align:center;">Action</th>
                </tr>
              </thead>
              <tbody>
                \${tableRowsHTML}
              </tbody>
            </table>
          \` : \`
            <table class="sem-memo-table">
              <thead>
                <tr>
                  <th style="text-align:center; width:36px;">#</th>
                  <th style="width:110px;">Course Code</th>
                  <th>Course Title &amp; Category</th>
                  <th style="text-align:center; width:90px;">CIE (40)</th>
                  <th style="text-align:center; width:90px;">SEE (60)</th>
                  <th style="text-align:center; width:95px;">Total (100)</th>
                  <th style="text-align:center; width:65px;">Grade</th>
                  <th style="text-align:center; width:60px;">Points</th>
                  <th style="text-align:center; width:65px;">Credits</th>
                  <th style="text-align:center; width:80px;">Result</th>
                </tr>
              </thead>
              <tbody>
                \${tableRowsHTML}
              </tbody>
            </table>
          \`}
        </div>

        <div class="sem-memo-summary-bar">
          <div class="summary-col">
            <span class="sum-lbl">Semester SGPA:</span>
            <span class="sum-val highlight-green">\${semResultData.sgpa}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Cumulative CGPA:</span>
            <span class="sum-val highlight-green">\${semResultData.cgpa}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Registered Credits:</span>
            <span class="sum-val">\${semResultData.totalCredits}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Credits Secured:</span>
            <span class="sum-val">\${semResultData.totalCredits}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Final Result:</span>
            <span class="sum-val" style="color:#15803d;">PROMOTED (PASS)</span>
          </div>
        </div>

        <div class="sem-memo-footer">
          <div class="memo-seal-box">
            <div class="autonomous-seal">
              <span>HITM</span>
              <small>COE AUTONOMOUS</small>
            </div>
            <div style="font-size:11px; color:#64748b; line-height:1.4;">
              Date of Issue: <strong>\${semResultData.issueDate}</strong><br>
              Memo Reference: <strong>\${semResultData.memoRef}</strong>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:serif; font-style:italic; font-size:18px; color:#013b1f; font-weight:700;">Dr. J. Ramana Murthy</div>
            <div style="font-size:12px; font-weight:700; color:#1e293b;">Controller of Examinations</div>
            <div style="font-size:11px; color:#64748b;">Autonomous Examination Branch, HITAM</div>
          </div>
        </div>
      </div>
    \`;
  }

  // 3. TAB: HALL TICKET DOWNLOAD
  else if (activeTab === 'hallticket') {
    activeTabContentHTML = \`
      <div class="sem-result-memo-sheet">
        <div class="sem-memo-header">
          <div class="sem-memo-logo-row">
            <div class="sem-memo-crest">HITM</div>
            <div>
              <div class="sem-memo-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
              <div class="sem-memo-college-sub">Autonomous Institution • Affiliated to JNTUH • Approved by AICTE • NAAC 'A+'</div>
              <div class="sem-memo-branch-title">AUTONOMOUS EXAMINATION BRANCH — ADMIT CARD / HALL TICKET</div>
            </div>
          </div>
          <div class="sem-memo-badge-line" style="background:#e0f2fe; color:#0369a1;">
            <span>ODD SEMESTER END EXAMINATIONS (SEE) — HALL TICKET</span>
            <span class="regulation-tag" style="background:#0284c7;">EXAM CODE: HTM-NOV26</span>
          </div>
        </div>

        <div class="sem-memo-meta-grid" style="border-left:4px solid #0284c7;">
          <div><span class="lbl">Candidate Name:</span> <strong>\${studentUser.name}</strong></div>
          <div><span class="lbl">Hall Ticket Number:</span> <strong style="color:#0284c7; font-size:14px;">\${studentUser.roll}</strong></div>
          <div><span class="lbl">Degree &amp; Program:</span> <strong>\${studentUser.branch}</strong></div>
          <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
          <div><span class="lbl">Examination Session:</span> <strong>NOV / DEC 2026 (Regular)</strong></div>
          <div><span class="lbl">Examination Center:</span> <strong>HITAM Autonomous Campus Center (Code: HITM)</strong></div>
          <div><span class="lbl">Exam Hall / Block:</span> <strong>Ramanujan Block — Hall 204</strong></div>
          <div><span class="lbl">Fee Clearance &amp; Eligibility:</span> <strong style="color:#15803d;">VERIFIED &amp; PERMITTED</strong></div>
        </div>

        <div style="font-weight:700; font-size:13px; color:#0f172a; margin:14px 0 8px 0; display:flex; align-items:center; gap:6px;">
          <span>🗓️</span> Registered Examination Schedule &amp; Timetable:
        </div>

        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="width:36px; text-align:center;">#</th>
              <th style="width:110px;">Course Code</th>
              <th>Course Title</th>
              <th style="width:110px;">Date</th>
              <th style="width:140px;">Timings</th>
              <th style="width:100px; text-align:center;">Candidate Sign</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:center;">1</td>
              <td><strong>22AI501PC</strong></td>
              <td>Machine Learning Techniques</td>
              <td>24-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">2</td>
              <td><strong>22AI502PC</strong></td>
              <td>Deep Learning &amp; Neural Networks</td>
              <td>26-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">3</td>
              <td><strong>22CS503PC</strong></td>
              <td>Computer Networks &amp; Internet Protocols</td>
              <td>28-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">4</td>
              <td><strong>22CS504PC</strong></td>
              <td>Automata Theory &amp; Compiler Design</td>
              <td>01-DEC-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">5</td>
              <td><strong>22CS505PE</strong></td>
              <td>Cloud Computing &amp; Distributed Systems</td>
              <td>03-DEC-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">6</td>
              <td><strong>22AI506PC</strong></td>
              <td>Machine Learning Laboratory (Practical)</td>
              <td>17-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Lab Verified ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">7</td>
              <td><strong>22CS507PC</strong></td>
              <td>Computer Networks Laboratory (Practical)</td>
              <td>19-NOV-2026</td>
              <td>2:00 PM – 5:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Lab Verified ]</td>
            </tr>
          </tbody>
        </table>

        <!-- Security Barcode & COE Stamp -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:12px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-family:monospace; font-size:14px; letter-spacing:2px; color:#0f172a; font-weight:800;">|||||||||| | |||||| ||||| |||||||</div>
            <div style="font-size:10.5px; color:#64748b; margin-top:2px;">Digital Security Barcode: HTM-2026-AUTON-\${roll}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="drill-action-btn drill-action-primary" onclick="window.print()">🖨️ Download &amp; Print Hall Ticket</button>
          </div>
        </div>
      </div>
    \`;
  }

  // 4. TAB: EXAM FEE PAYMENT
  else if (activeTab === 'feepayment') {
    activeTabContentHTML = \`
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>💳</span> AUTONOMOUS EXAMINATION FEE PAYMENT DESK
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Review examination fee assessment, payment challans, and instant e-receipt generation.
        </p>

        <!-- Current Semester Fee Status Box -->
        <div style="background:#ffffff; border:2px solid #10b981; border-radius:8px; padding:16px; margin-bottom:18px; box-shadow:0 2px 8px rgba(16, 185, 129, 0.1);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; border-bottom:1px solid #e2e8f0; padding-bottom:10px; margin-bottom:12px;">
            <div>
              <div style="font-size:14.5px; font-weight:800; color:#065f46;">B.Tech Regular Odd Semester End Examination Fee</div>
              <div style="font-size:11.5px; color:#64748b;">Academic Year: 2026–2027 • Hall Ticket: <strong>\${studentUser.roll}</strong></div>
            </div>
            <span style="background:#d1fae5; color:#065f46; font-size:12px; font-weight:800; padding:4px 12px; border-radius:20px; border:1px solid #6ee7b7;">
              ✅ FEE CLEARED (PAID)
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:12px;">
            <div><span style="color:#64748b; font-size:11px; display:block;">Theory Courses Fee:</span> <strong>₹1,500.00</strong> (5 Subjects @ ₹300)</div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Practical Labs Fee:</span> <strong>₹300.00</strong> (2 Labs @ ₹150)</div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Grade Card &amp; Processing:</span> <strong>₹250.00</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Total Amount Paid:</span> <strong style="color:#08752f; font-size:14px;">₹2,050.00</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Transaction Reference:</span> <strong>HITM/AUTON/PAY/2026/89421</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Payment Date:</span> <strong>16-OCT-2026 (11:42 AM)</strong></div>
          </div>

          <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
            <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Autonomous Exam Fee Receipt #89421 downloaded successfully.')">📄 Download Fee Receipt (PDF)</button>
            <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('No supplementary dues found for this hall ticket.')">Check Backlog Dues</button>
          </div>
        </div>

        <!-- Historical Fee Receipts Ledger -->
        <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:10px;">
          📜 Past Semester Examination Fee Ledgers &amp; Receipts:
        </div>
        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="text-align:center;">#</th>
              <th>Semester Session</th>
              <th>Transaction Reference</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th style="text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:center;">1</td>
              <td>Semester IV (Even Sem 2025)</td>
              <td>HITM/AUTON/PAY/2025/44120</td>
              <td>₹2,050.00</td>
              <td>14-Apr-2025</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">2</td>
              <td>Semester III (Odd Sem 2024)</td>
              <td>HITM/AUTON/PAY/2024/77812</td>
              <td>₹2,050.00</td>
              <td>18-Nov-2024</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">3</td>
              <td>Semester II (Even Sem 2024)</td>
              <td>HITM/AUTON/PAY/2024/31092</td>
              <td>₹2,050.00</td>
              <td>12-Apr-2024</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">4</td>
              <td>Semester I (Odd Sem 2023)</td>
              <td>HITM/AUTON/PAY/2023/11048</td>
              <td>₹2,050.00</td>
              <td>15-Nov-2023</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    \`;
  }

  // 5. TAB: INTERNAL MARKS (FINAL INTERNAL MARKS & PERCENTAGE)
  else if (activeTab === 'internalmarks') {
    const internalList = window.getStudentInternalMarksBreakdown(studentUser);

    let totalEarned = 0;
    let totalMax = 0;

    const rowsHTML = internalList.map((item, idx) => {
      totalEarned += parseFloat(item.finalInternal);
      totalMax += item.maxInternal;

      return \`
        <tr>
          <td style="text-align:center;">\${idx + 1}</td>
          <td><strong style="color:#0f172a;">\${item.code}</strong></td>
          <td>
            <div style="font-weight:600; color:#1e293b;">\${item.title}</div>
            <span style="font-size:10.5px; color:#64748b;">\${item.type}</span>
          </td>
          <td style="text-align:center; font-weight:600;">\${item.mid1} / 20</td>
          <td style="text-align:center; font-weight:600;">\${item.mid2} / 20</td>
          <td style="text-align:center; font-weight:800; color:#08752f; font-size:13.5px;">
            \${item.finalInternal} / 40
          </td>
          <td style="text-align:center;">
            <span style="background:#dcfce7; color:#166534; font-weight:800; font-size:12px; padding:3px 8px; border-radius:12px; border:1px solid #86efac; display:inline-block;">
              \${item.percentage}
            </span>
          </td>
          <td style="text-align:center;">
            <span class="memo-status-badge pass">\${item.status}</span>
          </td>
        </tr>
      \`;
    }).join('');

    const overallAvg = (totalEarned / internalList.length).toFixed(1);
    const overallPct = ((totalEarned / totalMax) * 100).toFixed(1);

    activeTabContentHTML = \`
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>📝</span> CONTINUOUS INTERNAL EVALUATION (CIE) — FINAL INTERNAL MARKS &amp; PERCENTAGE
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Autonomous R22 Regulations: Final internal marks out of 40 calculated from continuous assessments (Mid-1 &amp; Mid-2 examinations, assignments, quizzes, and practical viva).
        </p>

        <!-- CIE Summary Metric Bar -->
        <div class="sem-memo-summary-bar" style="background:#f0fdf4; border-color:#86efac; margin-bottom:16px;">
          <div class="summary-col">
            <span class="sum-lbl">Overall Internal Average:</span>
            <span class="sum-val highlight-green">\${overallAvg} / 40.0</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Overall Internal Percentage:</span>
            <span class="sum-val highlight-green" style="color:#15803d;">\${overallPct}%</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Courses Assessed:</span>
            <span class="sum-val">\${internalList.length} Courses</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">CIE Exam Eligibility:</span>
            <span class="sum-val" style="color:#15803d; font-size:13px;">100% ELIGIBLE</span>
          </div>
        </div>

        <!-- Subject-Wise Final Internal Marks Table -->
        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="width:36px; text-align:center;">#</th>
              <th style="width:110px;">Course Code</th>
              <th>Course Title &amp; Category</th>
              <th style="width:105px; text-align:center;">Mid-1 CIE (20)</th>
              <th style="width:105px; text-align:center;">Mid-2 CIE (20)</th>
              <th style="width:130px; text-align:center;">Final Internal Marks (40)</th>
              <th style="width:110px; text-align:center;">Percentage (%)</th>
              <th style="width:90px; text-align:center;">Status</th>
            </tr>
          </thead>
          <tbody>
            \${rowsHTML}
          </tbody>
        </table>

        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:12px; margin-top:14px; font-size:12px; color:#475569; line-height:1.5;">
          💡 <strong>Internal Marks Policy:</strong> Minimum internal qualifying benchmark is 14 marks out of 40 (35%) in each course. Candidate <strong>\${studentUser.roll}</strong> has comfortably cleared internal assessment requirements in all 7 enrolled subjects.
        </div>
      </div>
    \`;
  }

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = \`
    <div class="drill-detail-view exam-portal-container-view">
      <!-- Top User Bar -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="sub-back-btn" onclick="openModal('exam-portal')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Sign Out</span>
          </button>
          <span style="font-size:12px; color:#475569;">
            Candidate: <strong>\${studentUser.name}</strong> • Roll: <strong style="color:#08752f;">\${studentUser.roll}</strong>
          </span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="drill-action-btn drill-action-primary" onclick="window.print()">🖨️ Print View</button>
          <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Examination docket refreshed from autonomous server.')">🔄 Refresh</button>
        </div>
      </div>

      <!-- 5 Main Navigation Shortcut Tabs -->
      <div class="exam-portal-tabs-nav">
        <button class="exam-tab-btn \${activeTab === 'notices' ? 'active' : ''}" onclick="examPortalSwitchTab('\${roll}', 'notices')">
          <span>📢</span> Notices &amp; Imp Dates
        </button>
        <button class="exam-tab-btn \${activeTab === 'results' ? 'active' : ''}" onclick="examPortalSwitchTab('\${roll}', 'results')">
          <span>📊</span> Results
        </button>
        <button class="exam-tab-btn \${activeTab === 'hallticket' ? 'active' : ''}" onclick="examPortalSwitchTab('\${roll}', 'hallticket')">
          <span>🎟️</span> Hall Ticket Download
        </button>
        <button class="exam-tab-btn \${activeTab === 'feepayment' ? 'active' : ''}" onclick="examPortalSwitchTab('\${roll}', 'feepayment')">
          <span>💳</span> Exam Fee Payment
        </button>
        <button class="exam-tab-btn \${activeTab === 'internalmarks' ? 'active' : ''}" onclick="examPortalSwitchTab('\${roll}', 'internalmarks')">
          <span>📝</span> Internal Marks (CIE %)
        </button>
      </div>

      <!-- Main Tab Content Frame -->
      <div id="examPortalTabBody" style="margin-top:14px;">
        \${activeTabContentHTML}
      </div>

      <div id="modalToastSlot"></div>
    </div>
  \`;
};

window.examPortalSwitchTab = function(roll, tabName) {
  window.authenticateExamPortal(roll, tabName);
};

window.authenticateExamPortal = function(overrideRoll = null, activeTab = 'notices', selectedSem = 5) {
  const loginInput = document.getElementById('portalLoginId');
  const passInput = document.getElementById('portalPassword');
  
  const roll = overrideRoll || (loginInput ? loginInput.value.trim().toUpperCase() : null);
  const password = passInput ? passInput.value.trim() : '';
  const body = document.getElementById('modalBody');
  if (!body) return;

  if (!roll) {
    showDemoNotice('Please enter a student Hall Ticket / Roll Number.');
    return;
  }

  // Resolve student using the exact same credential engine as the student portal
  const studentUser = resolveStudentUser(roll, overrideRoll ? (roll.includes('6619') ? '23e51a66619' : roll.toLowerCase()) : password);

  if (!studentUser || studentUser.error === 'UNKNOWN_USER') {
    renderPortalUnknownId('exam-portal', roll);
    return;
  }

  if (studentUser.error === 'WRONG_PASSWORD') {
    renderPortalWrongPassword('exam-portal', roll, studentUser.expectedHint);
    return;
  }

  // Check portal access governance
  if (!window.portalAccessState.globalStudent) {
    renderPortalAccessDenied('exam-portal', 'Exam portal access has been globally suspended by Institutional Administration.');
    return;
  }

  if (window.portalAccessState.userOverrides[roll] === false) {
    renderPortalAccessDenied('exam-portal', \`Exam portal access for Roll Number \${roll} has been suspended by Admin.\`);
    return;
  }

  window.renderExamPortalDashboard(studentUser, activeTab, selectedSem);
};

// Backwards compatibility alias for tests & links
window.authenticateSemResult = window.authenticateExamPortal;
window.generateExamPortalHTML = function() {
  return window.generatePortalLoginHTML('exam-portal');
};
window.generateSemResultPortalHTML = window.generateExamPortalHTML;
`;

sec15 = sec15 + '\n' + newSection14.trim() + '\n';
fs.writeFileSync('scratch/section15_expanded.js', sec15, 'utf8');
console.log('Successfully updated scratch/section15_expanded.js with 5-tab Exam Portal!');
