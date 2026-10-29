// scratch/apply_section15.js
const fs = require('fs');

const mainLines = fs.readFileSync('js/main.js', 'utf8').split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < mainLines.length; i++) {
  if (mainLines[i].includes('15. PORTALS (ADMIN, FACULTY, STUDENT)')) {
    startIndex = i - 1; // Include the preceding /* ===== line
  }
  if (mainLines[i].includes('16. UNIFIED CONTENT DATA DICTIONARY')) {
    endIndex = i - 1; // Preceding /* ===== line of Section 16
    break;
  }
}

console.log(`Replacing lines ${startIndex + 1} to ${endIndex}`);

const newSection15 = fs.readFileSync('scratch/section15_expanded.js', 'utf8');

const updatedLines = [
  ...mainLines.slice(0, startIndex),
  newSection15,
  ...mainLines.slice(endIndex)
];

fs.writeFileSync('js/main.js', updatedLines.join('\n'), 'utf8');
console.log('Successfully updated js/main.js');
