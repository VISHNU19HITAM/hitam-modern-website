const fs = require('fs');

let part5 = fs.readFileSync('scratch/part5_clean.js', 'utf8');

// 1. Add placements to College Life
const placementsEntry = `  'placements': {
    title: 'Career Guidance & Placements — Corporate Recruitment & Placed Students',
    category: 'College Life — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>\`,
    isWide: true,
    getBody: () => generatePlacementsHTML()
  },\n\n`;

if (!part5.includes("'placements':")) {
  part5 = part5.replace(
    /'college-life-all':/,
    placementsEntry + "  'college-life-all':"
  );
}

// 2. Add sem-result-portal to Portals
const semResultEntry = `  'sem-result-portal': {
    title: 'HITAM Autonomous Examination Branch — Semester Results Portal',
    category: 'Examination Portal — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>\`,
    isWide: true,
    getBody: () => generateSemResultPortalHTML()
  },\n\n`;

if (!part5.includes("'sem-result-portal':")) {
  part5 = part5.replace(
    /'portals-all':/,
    semResultEntry + "  'portals-all':"
  );
}

// 3. Make placements-info route to generatePlacementsHTML as well
part5 = part5.replace(
  /'placements-info':\s*\{[\s\S]*?body:\s*`[\s\S]*?`\s*\},/m,
  `'placements-info': {
    title: 'Career Guidance & Placements — Corporate Recruitment & Placed Students',
    category: 'Career & Placements — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>\`,
    isWide: true,
    getBody: () => generatePlacementsHTML()
  },`
);

fs.writeFileSync('scratch/part5_clean.js', part5, 'utf8');
console.log('Successfully updated scratch/part5_clean.js');
