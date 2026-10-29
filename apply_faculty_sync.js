const fs = require('fs');
let s15 = fs.readFileSync('scratch/section15_expanded.js', 'utf8');

const start = s15.indexOf('window.facultyChangeMarksFilter =');
const end = s15.indexOf('window.facultyCalculateClassAnalytics =');

if (start === -1 || end === -1) {
  console.error('Could not find start or end positions!');
  process.exit(1);
}

const replacement = `window.facultyChangeMarksFilter = function(facultyId) {
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
};

`;

s15 = s15.slice(0, start) + replacement + s15.slice(end);

// Remove photo property in resolveStudentUser
s15 = s15.replace("photo: 'assets/student-profile.png',", "photo: '',");

fs.writeFileSync('scratch/section15_expanded.js', s15, 'utf8');
console.log('Successfully applied faculty sync and removed student photo reference');
