const fs = require('fs');

// 1. Clean scratch/part1_clean.js
let part1 = fs.readFileSync('scratch/part1_clean.js', 'utf8');

part1 = part1.replace(
  /<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">View Academic Curriculum on HITAM Portal \(hitam\.org\) ↗<\/a>/g,
  `<button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Academic curriculum syllabus is available in the Central Digital Library.')">View Academic Syllabus 📚</button>`
);

part1 = part1.replace(
  /'hitam\.org \/ Student Affairs Notice Board'/g,
  `'Campus Bulletin / Student Affairs Notice Board'`
);

part1 = part1.replace(
  /<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Campus Circulars &amp; Notices \(hitam\.org\) ↗<\/a>/g,
  `<button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Event circulars and schedules are published on the Campus Notice Board.')">Campus Circulars &amp; Notices 📢</button>`
);

part1 = part1.replace(
  /<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">View Institutional Disclosures &amp; Accreditations \(hitam\.org\) ↗<\/a>/g,
  `<button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Institutional accreditations and NAAC A+ certifications are verified by the IQAC Cell.')">Institutional Disclosures 🏆</button>`
);

part1 = part1.replace(/ or at hitam\.org\/naac\./g, '.');

part1 = part1.replace(
  /<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Student Life on HITAM Website \(hitam\.org\) ↗<\/a>/g,
  `<button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Student life and activity circulars are posted on campus cultural display boards.')">Student Life Activities 🎨</button>`
);

part1 = part1.replace(
  /<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Innovation &amp; Incubation Hub \(hitam\.org\) ↗<\/a>/g,
  `<button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Incubation proposals and seed grant applications are submitted through the HITAM SSDC Innovation Hub.')">Innovation Hub Guidelines 🚀</button>`
);

fs.writeFileSync('scratch/part1_clean.js', part1, 'utf8');
console.log('part1_clean.js updated');

// 2. Clean scratch/section15_expanded.js
let sec15 = fs.readFileSync('scratch/section15_expanded.js', 'utf8');

sec15 = sec15.replace(
  /<div style="margin-top:16px; text-align:center;">\s*<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" style="font-size:12\.5px; color:#013b1f; text-decoration:underline; font-weight:700;">Visit HITAM Institutional Portal \(hitam\.org\) ↗<\/a>\s*<\/div>/g,
  ''
);

sec15 = sec15.replace(
  /<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Visit HITAM Portal \(hitam\.org\) ↗<\/a>/g,
  ''
);

sec15 = sec15.replace(
  /<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px; text-decoration:none; display:inline-flex; align-items:center;">NAAC Disclosures \(hitam\.org\) ↗<\/a>/g,
  `<button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Accreditation and NAAC A+ reports are archived in the IQAC section.')">NAAC Disclosures ℹ️</button>`
);

sec15 = sec15.replace(
  /<a href="https:\/\/www\.hitam\.org" target="_blank" rel="noopener" class="portal-logout-btn" style="text-decoration:none; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; display:inline-flex; align-items:center; gap:4px;">HITAM Portal ↗<\/a>/g,
  ''
);

sec15 = sec15.replace(
  /'hitam\.org \/ Student Affairs Notice Board'/g,
  `'Campus Bulletin / Student Affairs Notice Board'`
);

fs.writeFileSync('scratch/section15_expanded.js', sec15, 'utf8');
console.log('section15_expanded.js updated');
