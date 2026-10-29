const fs = require('fs');

// 1. Update scratch/part5_clean.js
let part5 = fs.readFileSync('scratch/part5_clean.js', 'utf8');

const examPortalEntry = `  'exam-portal': {
    title: 'HITAM Autonomous Exam Portal — Results, Hall Tickets & CIE',
    category: 'Examination Portal — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>\`,
    isWide: true,
    getBody: () => generateExamPortalHTML()
  },\n\n`;

part5 = part5.replace(
  /'sem-result-portal':\s*\{[\s\S]*?getBody:\s*\(\)\s*=>[\s\S]*?\n\s*\},/m,
  examPortalEntry + `  'sem-result-portal': {
    title: 'HITAM Autonomous Exam Portal — Results, Hall Tickets & CIE',
    category: 'Examination Portal — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>\`,
    isWide: true,
    getBody: () => generateExamPortalHTML()
  },`
);

fs.writeFileSync('scratch/part5_clean.js', part5, 'utf8');
console.log('scratch/part5_clean.js updated.');

// 2. Update scratch/assemble_clean_main.js
let assemble = fs.readFileSync('scratch/assemble_clean_main.js', 'utf8');

assemble = assemble.replace(
  /\{\s*id:\s*'sem-result-portal'[\s\S]*?action:\s*"openModal\('sem-result-portal'\)"\s*\}/m,
  `{
      id: 'exam-portal',
      title: 'Autonomous Exam Portal',
      badge: 'Autonomous COE • Results & Hall Tickets',
      img: 'assets/hitam4.jpeg',
      meta: 'Notices, Results, Hall Tickets, Fee & CIE',
      desc: 'Autonomous examination circulars, important dates, provisional semester results, hall ticket download, fee payment, and continuous internal marks.',
      action: "openModal('exam-portal')"
    }`
);

assemble = assemble.replace(
  /Access Administrative, Faculty, Student, or Semester Results Portals below/,
  'Access Administrative, Faculty, Student, or Exam Portals below'
);

fs.writeFileSync('scratch/assemble_clean_main.js', assemble, 'utf8');
console.log('scratch/assemble_clean_main.js updated.');
