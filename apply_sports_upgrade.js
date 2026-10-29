const fs = require('fs');

const s12to14 = fs.readFileSync('scratch/sections_12_to_14.js', 'utf8');
const sportsCleaned = fs.readFileSync('scratch/sports_yesterday_cleaned.js', 'utf8');

const anchor = '/* ==========================================================================\n   14. DEPARTMENT OF PHYSICAL EDUCATION';
const idx = s12to14.indexOf(anchor);

if (idx === -1) {
  console.error('Could not find anchor in sections_12_to_14.js!');
  process.exit(1);
}

const newS12to14 = s12to14.slice(0, idx) + sportsCleaned;
fs.writeFileSync('scratch/sections_12_to_14.js', newS12to14, 'utf8');
console.log('Successfully updated scratch/sections_12_to_14.js with dual-track sports engine!');
