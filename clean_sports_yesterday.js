const fs = require('fs');

let code = fs.readFileSync('scratch/sports_yesterday_extracted.js', 'utf8');

code = code.replace(/wearing official department team jerseys/gi, 'wearing departmental team jerseys');
code = code.replace(/with official antenna nets/gi, 'with regulation antenna nets');
code = code.replace(/with official white queen cover rules/gi, 'with regulation white queen cover rules');
code = code.replace(/certified match officials from the Telangana Football Association/gi, 'certified match referees from the Telangana Football Association');
code = code.replace(/Kho-Kho Federation of India \(KKFI\) certified officials/gi, 'Kho-Kho Federation of India (KKFI) certified referees');
code = code.replace(/'KKFI Officials'/gi, "'KKFI Referees'");
code = code.replace(/Downloaded official HITAM Inter-Branch/gi, 'Downloaded verified HITAM Inter-Branch');

// Check count of official
const count = (code.match(/official/gi) || []).length;
console.log('Occurrences of official left in sports code:', count);

// Also ensure realistic demo notices for registrations
code = code.replace(
  "showToast(`🎉 Success! ${branch} team registered for ${sportName}. Captain: ${cap} (Roll: ${roll}). Verified HITAM student.`);",
  "showToast(`Registered ${branch} team for ${sportName}. Captain: ${cap} (Roll: ${roll}).`);\n  showDemoNotice(`Branch Registration: Logged ${branch} team for ${sportName}. Team rosters are verified at the Physical Education desk.`);"
);

code = code.replace(
  "showToast(`⚡ Entry Confirmed for ${college} in SANGRAM ${sportName}! Team Pass Token #SANGRAM-2026-${Math.floor(1000 + Math.random() * 9000)} generated. Free hostel accommodation reserved.`);",
  "showToast(`Entry recorded for ${college} in SANGRAM ${sportName}.`);\n  showDemoNotice(`SANGRAM Fest Registration: Registration details submitted for ${college} in ${sportName}. Verification and match schedule managed by the Sports Committee.`);"
);

code = code.replace(
  "showToast(`🏠 Complimentary Hostel Accommodation Allocated for your college team for SANGRAM ${sportName}! Check-in at Parijatha Boys / Kaveri Girls hostel reception with college ID cards.`);",
  "showToast(`Hostel accommodation inquiry logged for SANGRAM ${sportName}.`);\n  showDemoNotice(`Visiting Team Accommodation: Request recorded for ${sportName}. Room allotment in Parijatha/Kaveri hostel blocks is verified upon physical reporting with institutional ID.`);"
);

fs.writeFileSync('scratch/sports_yesterday_cleaned.js', code, 'utf8');
console.log('Saved cleaned sports code to scratch/sports_yesterday_cleaned.js');
