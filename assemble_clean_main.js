// scratch/assemble_clean_main.js
const fs = require('fs');

// 1. Part 1: From start of file to end of Section 11 (Transport)
const part1 = fs.readFileSync('scratch/part1_clean.js', 'utf8');
console.log('Part 1 lines:', part1.split('\n').length);

// 1B. Part Placements: Section 8B (Career Guidance, Recruiters & Placed Students)
const partPlacements = fs.readFileSync('scratch/section_placements.js', 'utf8');
console.log('Part Placements length:', partPlacements.length);

// 2. Part 2: Sections 12 to 14 (Labs, Hostels, Sports)
const part2 = fs.readFileSync('scratch/sections_12_to_14.js', 'utf8');
console.log('Part 2 length:', part2.length);

// 3. Part 3: Section 15 (Portals - Admin, Faculty 6 tabs, Student 8 tabs, Sem Results Portal)
const part3 = fs.readFileSync('scratch/section15_expanded.js', 'utf8');
console.log('Part 3 length:', part3.length);

// 3B. Part ITP: Section 15B (ITP 3+2 International Program & Overseas MS Remote Services Desk)
const partITP = fs.readFileSync('scratch/section_itp.js', 'utf8');
console.log('Part ITP length:', partITP.length);

// 4. Part 4: Directory Overviews (Boxes for "View More")
const part4 = `
/* ==========================================================================
   DIRECTORY OVERVIEWS (BOXES/CARDS VIEW FOR "VIEW MORE" LINKS)
   ========================================================================== */

function generateCampusServicesAllHTML() {
  const services = [
    {
      id: 'library',
      title: 'Central Digital Library',
      badge: '100,000+ Volumes • IEEE Xplore',
      img: 'assets/hitam1.jpg',
      meta: 'Dr. APJ Abdul Kalam Central Library',
      desc: 'Three-storey air-cooled digital library with DELNET inter-library book exchange, IEEE Xplore, 100+ national journals, and quiet study carrels.',
      time: '⏰ Open: 8:00 AM – 8:00 PM',
      action: "openModal('library')"
    },
    {
      id: 'canteen',
      title: 'Cafeteria & Multi-Stall Food Court',
      badge: 'FSSAI Certified • 6 Food Stalls',
      img: 'assets/hitam2.jpeg',
      meta: 'Multi-Cuisine Dining & Courtyard',
      desc: 'Hygienic vegetarian & multicuisine cafeteria serving South Indian tiffins, lunch thalis, fresh fruit juices, and instant tray bill estimator.',
      time: '⏰ Open: 7:30 AM – 6:30 PM',
      action: "openModal('canteen')"
    },
    {
      id: 'transport',
      title: 'Campus Bus Fleet & 10 City Routes',
      badge: '10 Routes • GPS Monitored',
      img: 'assets/hitam-bus.jpg',
      meta: '40+ Air-Cooled & Deluxe Fleet',
      desc: 'Extensive fleet of 40+ GPS-tracked buses connecting Secunderabad, Kukatpally, Miyapur, ECIL, Mehdipatnam, LB Nagar, Uppal, and Medchal.',
      time: '⏰ Morning & Evening Fleets',
      action: "openModal('transport')"
    },
    {
      id: 'labs',
      title: 'Department Research Laboratories',
      badge: 'Industry R&D Centers',
      img: 'assets/hitam7.jpeg',
      meta: 'NVIDIA AI, Apple Mac & IoT Labs',
      desc: 'NVIDIA RTX Deep Learning AI Supercomputing Lab, Apple Mac Studio Swift Lab, Texas Instruments Embedded IoT, and Festo Robotics Automation.',
      time: '⏰ Hands-on Capstone Centers',
      action: "openModal('labs')"
    },
    {
      id: 'hostel',
      title: 'Eco-Friendly Campus Hostels',
      badge: 'Boys & Girls • Solar Powered',
      img: 'assets/hitam4.jpeg',
      meta: 'Parijatha Boys & Kaveri Girls Blocks',
      desc: 'Green campus residential life with solar water heaters, high-speed Wi-Fi, biometric security, RO drinking water, and indoor recreational rooms.',
      time: '⏰ On-Campus Residential Life',
      action: "openModal('hostel')"
    },
    {
      id: 'sports',
      title: 'Sports Arena & Elysian Sangram Fest',
      badge: '11 Sports • Dual-Track Intramurals',
      img: 'assets/sangram.jpeg',
      meta: 'HITAM Sports & Elysian SANGRAM',
      desc: 'Turf cricket grounds, basketball & volleyball courts, indoor badminton stadium, branch-wise championships, and national collegiate sports fest.',
      time: '⏰ Active Athletics & Mind Sports',
      action: "openModal('sports')"
    }
  ];

  const boxesHTML = services.map(s => \`
    <div class="drill-card" onclick="\${s.action}" style="cursor:pointer;">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="\${s.img}" alt="\${s.title}" loading="lazy">
        <span class="drill-card-badge">\${s.badge}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">\${s.title}</div>
        <div style="font-size:11.5px; color:#08752f; font-weight:700; margin-bottom:4px;">\${s.meta}</div>
        <div class="drill-card-desc">\${s.desc}</div>
        <div class="drill-card-footer">
          <span>\${s.time}</span>
          <span style="color:#08752f; font-weight:700;">Explore Details →</span>
        </div>
      </div>
    </div>
  \`).join('');

  return \`
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🏛️ <strong>HITAM Campus Facilities Directory:</strong> Explore all 6 campus services below in individual interactive boxes. Click any box to view complete detailed schedules, facilities, and contact information.
      </div>
      <div class="drill-grid">
        \${boxesHTML}
      </div>
    </div>
  \`;
}

function generateCollegeLifeAllHTML() {
  const sections = [
    {
      id: 'departments',
      title: 'Academic Departments & 9 Branches',
      badge: '9 B.Tech Programs',
      img: 'assets/hitam3.jpeg',
      meta: 'CSE, AI & ML, Data Science, Core Engg',
      desc: 'Autonomous engineering curriculums designed around experiential learning, capstone projects, and industry certifications.',
      action: "openModal('departments')"
    },
    {
      id: 'events',
      title: 'Campus Events, Hackathons & Festivals',
      badge: 'Annual Fests & Hackathons',
      img: 'assets/bliss.png',
      meta: 'Elysian, Smart Hackathon, IGNITE',
      desc: 'Vibrant student life featuring Elysian cultural festival, National Smart Hackathon, Traditional Day, and Freshers AARAMBH.',
      action: "openModal('events')"
    },
    {
      id: 'achievements',
      title: 'Institutional Rankings & Achievements',
      badge: 'SIH Winner • NAAC A+',
      img: 'assets/prasasti.jpeg',
      meta: 'National Recognition & Research',
      desc: 'Smart India Hackathon 1st prizes, AICTE Lilavati Awards, IEEE EPICS sustainable development projects, and published patents.',
      action: "openModal('achievements')"
    },
    {
      id: 'student-life',
      title: 'Student Life, NCC (5(T) BN), NSS & Clubs',
      badge: 'NCC • NSS • 6 Clubs',
      img: 'assets/ncc-photo.jpg',
      meta: 'Cadet Training, Community & Arts',
      desc: 'NCC 5(T) BN Army Wing, National Service Scheme community outreach, and 6 active student clubs (ByteCraft, Strikerz, Symphony).',
      action: "openModal('student-life')"
    },
    {
      id: 'innovation',
      title: 'Innovation, "Doing Engineering" & Startups',
      badge: 'SSDC Makerspace & MSME',
      img: 'assets/hitam5.jpeg',
      meta: 'Makerspaces & Student Startups',
      desc: 'Signature "Doing Engineering" hands-on methodology, student project incubators, agricultural robotics, and patents.',
      action: "openModal('innovation')"
    },
    {
      id: 'placements',
      title: 'Career Guidance & Placements',
      badge: '₹24 LPA Highest • 85+ Recruiters',
      img: 'assets/hitam7.jpeg',
      meta: 'Goldman Sachs, Amazon, TCS & CGC Cell',
      desc: 'Systematic corporate recruitment drives, placed student achievements, company drive profiles, and top package of ₹24.00 LPA.',
      action: "openModal('placements')"
    }
  ];

  const boxesHTML = sections.map(s => \`
    <div class="drill-card" onclick="\${s.action}" style="cursor:pointer;">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="\${s.img}" alt="\${s.title}" loading="lazy">
        <span class="drill-card-badge">\${s.badge}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">\${s.title}</div>
        <div style="font-size:11.5px; color:#08752f; font-weight:700; margin-bottom:4px;">\${s.meta}</div>
        <div class="drill-card-desc">\${s.desc}</div>
        <div class="drill-card-footer">
          <span>Campus Life</span>
          <span style="color:#08752f; font-weight:700;">Explore Details →</span>
        </div>
      </div>
    </div>
  \`).join('');

  return \`
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🎓 <strong>HITAM College Life Directory:</strong> Explore all 6 college life categories below in dedicated interactive boxes.
      </div>
      <div class="drill-grid">
        \${boxesHTML}
      </div>
    </div>
  \`;
}

function generatePortalsAllHTML() {
  const portals = [
    {
      id: 'admin-portal',
      title: 'Administrative Governance Portal',
      badge: 'Campus Admin • Principal • Chairman',
      img: 'assets/hitam-campus.png',
      meta: 'ADMINHTM01 to ADMINHTM03',
      desc: 'Master permission switches, batch access governance, attendance synchronisation, admissions queues, and accreditation compliance.',
      action: "openModal('admin-portal')"
    },
    {
      id: 'faculty-portal',
      title: 'Faculty LMS & Academic Portal',
      badge: '9 Departments • HODs & Staff',
      img: 'assets/hitam3.jpeg',
      meta: 'Multi-Branch Attendance & CIE Marks',
      desc: 'Multi-branch attendance register, CIE marks upload (ciea1..3 / cieb1..3), student academic roster, faculty directory, feedback analytics, and timetable.',
      action: "openModal('faculty-portal')"
    },
    {
      id: 'student-portal',
      title: 'Student ERP & Academics Portal',
      badge: 'Batches 23 to 26 • All Branches',
      img: 'assets/hitam1.jpg',
      meta: 'Roll Number Authentication',
      desc: 'Academic profile, subject attendance, class timetable, fee receipts & ledger, CIE internal marks, feedback submission, complaints redressal, and credentials update.',
      action: "openModal('student-portal')"
    },
    {
      id: 'exam-portal',
      title: 'Autonomous Exam Portal',
      badge: 'Autonomous COE • Results & Hall Tickets',
      img: 'assets/hitam4.jpeg',
      meta: 'Notices, Results, Hall Tickets, Fee & CIE',
      desc: 'Autonomous examination circulars, important dates, provisional semester results, hall ticket download, fee payment, and continuous internal marks.',
      action: "openModal('exam-portal')"
    }
  ];

  const boxesHTML = portals.map(p => \`
    <div class="drill-card" onclick="\${p.action}" style="cursor:pointer;">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="\${p.img}" alt="\${p.title}" loading="lazy">
        <span class="drill-card-badge">\${p.badge}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">\${p.title}</div>
        <div style="font-size:11.5px; color:#08752f; font-weight:700; margin-bottom:4px;">\${p.meta}</div>
        <div class="drill-card-desc">\${p.desc}</div>
        <div class="drill-card-footer">
          <span>Digital Portals</span>
          <span style="color:#08752f; font-weight:700;">Open Sign In Desk →</span>
        </div>
      </div>
    </div>
  \`).join('');

  return \`
    <div>
      <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🔐 <strong>HITAM Digital Portals Directory:</strong> Access Administrative, Faculty, Student, or Exam Portals below. Select a box to sign in to your dashboard.
      </div>
      <div class="drill-grid">
        \${boxesHTML}
      </div>
    </div>
  \`;
}

window.generateCampusServicesAllHTML = generateCampusServicesAllHTML;
window.generateCollegeLifeAllHTML = generateCollegeLifeAllHTML;
window.generatePortalsAllHTML = generatePortalsAllHTML;
`;

// 5. Part 5: Section 16 window.hitamContentData to end of file
let part5 = fs.readFileSync('scratch/part5_clean.js', 'utf8');
console.log('Part 5 lines:', part5.split('\n').length);

// Ensure titles and getBody in part5 are updated:
part5 = part5.replace(
  /title:\s*'HITAM Campus Bus Fleet & [0-9]+ City Routes'/,
  "title: 'HITAM Campus Bus Fleet & 10 City Routes'"
);

part5 = part5.replace(
  /'campus-services-all':\s*\{[\s\S]*?getBody:\s*\(\)\s*=>[\s\S]*?\n\s*\},/m,
  `'campus-services-all': {
    title: 'Campus Facilities Overview Directory — All 6 Facilities',
    category: 'Campus Services — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2L2 7h20L12 2z"/></svg>\`,
    isWide: true,
    getBody: () => generateCampusServicesAllHTML()
  },`
);

part5 = part5.replace(
  /'college-life-all':\s*\{[\s\S]*?getBody:\s*\(\)\s*=>[\s\S]*?\n\s*\},/m,
  `'college-life-all': {
    title: 'College Life Overview Directory — All 6 Categories',
    category: 'College Life — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9z"/></svg>\`,
    isWide: true,
    getBody: () => generateCollegeLifeAllHTML()
  },`
);

part5 = part5.replace(
  /'portals-all':\s*\{[\s\S]*?getBody:\s*\(\)\s*=>[\s\S]*?\n\s*\},/m,
  `'portals-all': {
    title: 'Unified Single Sign-On (SSO) Directory — All 4 Portals',
    category: 'Digital Portals — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>\`,
    isWide: true,
    getBody: () => generatePortalsAllHTML()
  },`
);

// Assemble
const fullCode = [
  part1.trim(),
  '',
  partPlacements.trim(),
  '',
  part2.trim(),
  '',
  part3.trim(),
  '',
  partITP.trim(),
  '',
  part4.trim(),
  '',
  part5.trim()
].join('\n');

fs.writeFileSync('js/main.js', fullCode, 'utf8');
console.log('Successfully assembled complete js/main.js! Total lines:', fullCode.split('\n').length);
