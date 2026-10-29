// scratch/unescape_labs.js
const fs = require('fs');

const lines = fs.readFileSync('C:/Users/BHUKYAVISHNU/.gemini/antigravity/brain/ad66aa05-1864-4857-9615-c91c85c54982/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

const obj = JSON.parse(lines[107]); // line 108 is index 107
const text = obj.tool_calls ? JSON.stringify(obj.tool_calls) : JSON.stringify(obj);

// Locate '/* ==========================================================================\n   12. SUBJECT RESEARCH LABS'
const startMarker = '/* ==========================================================================\\n   12. SUBJECT RESEARCH LABS';
const endMarker = '/* ==========================================================================\\n   15. PORTALS';

const sIdx = text.indexOf(startMarker);
const eIdx = text.indexOf(endMarker, sIdx);

console.log('sIdx:', sIdx, 'eIdx:', eIdx);

if (sIdx !== -1 && eIdx !== -1) {
  const extractedJSON = text.slice(sIdx, eIdx);
  // Parse JSON-escaped string
  const cleanCode = JSON.parse('"' + extractedJSON + '"');
  fs.writeFileSync('scratch/sections_12_to_14.js', cleanCode, 'utf8');
  console.log('Successfully extracted Sections 12 to 14, length:', cleanCode.length);
} else {
  console.error('Could not find markers');
}
