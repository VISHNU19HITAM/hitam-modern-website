const fs = require('fs');

const p1 = fs.readFileSync('scratch/part1_clean.js', 'utf8');
const p2 = fs.readFileSync('scratch/sections_12_to_14.js', 'utf8');
const p3 = fs.readFileSync('scratch/section15_clean_base.js', 'utf8');
const p5 = fs.readFileSync('scratch/part5_clean.js', 'utf8');

const full = p1 + '\n' + p2 + '\n' + p3 + '\n' + p5;

fs.writeFileSync('scratch/test_assembled.js', full, 'utf8');

const { execSync } = require('child_process');
try {
  execSync('node -c scratch/test_assembled.js');
  console.log('Full assembled syntax is 100% VALID!');
} catch (e) {
  console.log('Syntax error:', e.message);
}
