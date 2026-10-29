/* ==========================================================================
   12. SUBJECT RESEARCH LABS BY DEPARTMENT (Drill-Down System)
   ========================================================================== */

const labsData = [
  {
    id: 'lab-nvidia',
    title: 'NVIDIA GPU Deep Learning & AI Supercomputing Lab',
    tag: 'CSE / AI / DS',
    img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80',
    desc: 'High-performance NVIDIA RTX workstations for training transformers, neural vision, and LLMs.',
    specs: [
      { label: 'Workstations', val: '40x NVIDIA RTX 4090 (24GB VRAM) & A100 Tensor Workstations' },
      { label: 'Frameworks', val: 'PyTorch, TensorFlow, CUDA 12, Hugging Face Transformers' },
      { label: 'Research Areas', val: 'Medical Imaging AI, Autonomous Navigation, Large Language Models' },
      { label: 'Faculty Lead', val: 'Dr. K. Ramesh, Ph.D. (AI Specialization)' }
    ]
  },
  {
    id: 'lab-apple',
    title: 'Apple iOS & macOS Swift Studio',
    tag: 'Software Studio',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
    desc: 'Dedicated Mac Studio machines for native iOS, watchOS, and iPadOS application development.',
    specs: [
      { label: 'Hardware', val: '35x Apple Mac Studio (M2 Max Chip) with 4K Retina Displays' },
      { label: 'Software', val: 'Xcode 15, Swift UI, CocoaPods, TestFlight, Figma Studio' },
      { label: 'Outcomes', val: '15+ Student Applications Published to Apple App Store' },
      { label: 'Certification', val: 'Apple Authorized Training Curriculum' }
    ]
  },
  {
    id: 'lab-vlsi',
    title: 'Cadence VLSI & FPGA Silicon Design Lab',
    tag: 'ECE / Hardware',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    desc: 'Full-custom ASIC layout design, CMOS physical verification, and Xilinx FPGA synthesis suites.',
    specs: [
      { label: 'EDA Tools', val: 'Cadence Virtuoso, Genus Synthesis, Innovus Implementation' },
      { label: 'FPGA Kits', val: 'Xilinx Artix-7, Zynq-7000 SoC Development Boards' },
      { label: 'Test Gear', val: '100 MHz Mixed-Signal Digital Storage Oscilloscopes, Logic Analyzers' },
      { label: 'Faculty Lead', val: 'Dr. P. Sunitha, Ph.D. (VLSI Physical Design)' }
    ]
  },
  {
    id: 'lab-robotics',
    title: 'Advanced Robotics & Automation Lab (MECH)',
    tag: 'Mechanical / Industry 4.0',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    desc: '6-axis articulated industrial robotic arms, pneumatic actuators, sensor testbeds, and ROS2.',
    specs: [
      { label: 'Robotic Arms', val: 'KUKA 6-Axis Articulated Industrial Robot Arm & Scara Robots' },
      { label: 'Pneumatics', val: 'Festo Electro-Pneumatic Automation Workbenches' },
      { label: 'Software', val: 'ROS 2 (Robot Operating System), MATLAB Simulink, SolidWorks' },
      { label: 'Projects', val: 'Pick-and-Place Vision Robotics, Autonomous Mobile Rovers' }
    ]
  }
];

function generateLabsHTML() {
  const cardsHTML = labsData.map(l => `
    <div class="drill-card" onclick="showLabDetail('${l.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${l.img}" alt="${l.title}" loading="lazy">
        <span class="drill-card-badge">${l.tag}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${l.title}</div>
        <div class="drill-card-desc">${l.desc}</div>
        <div class="drill-card-footer">
          <span>🧪 Research Lab</span>
          <span>View Hardware Specs →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <p>HITAM houses advanced department research centers equipped with enterprise GPUs, silicon EDA design software, and industrial robots.</p>
      <div class="modal-highlight-box">
        <strong>Click on any lab card below</strong> to view hardware configurations, licensed software tools, and active research projects:
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showLabDetail = function(labId) {
  const l = labsData.find(x => x.id === labId);
  if (!l) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('labs')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All Laboratories</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${l.img}" alt="${l.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${l.tag}</span>
          <div class="drill-hero-title">${l.title}</div>
        </div>
      </div>

      <p>${l.desc}</p>

      <h4>🔬 Laboratory Technical Specifications</h4>
      <div class="modal-grid-features">
        ${l.specs.map(s => `
          <div class="modal-feature-card">
            <strong>${s.label}:</strong>
            <span>${s.val}</span>
          </div>
        `).join('')}
      </div>

      <div class="drill-actions-bar">
        <button class="drill-action-btn drill-action-primary" onclick="showToast('Lab experiment manual downloaded!')">Download Lab Manual PDF ↓</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   13. HOSTEL & ACCOMMODATION (Fee: ₹80,000 / Year) (Drill-Down System)
   ========================================================================== */

const hostelWingsData = [
  {
    id: 'hostel-boys',
    title: 'Boys Hostel Campus Wing (Parijatha & Krishna Blocks)',
    tag: 'Boys Accommodation',
    fee: '₹80,000 / Year (All Inclusive)',
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
    desc: 'Spacious naturally ventilated 2, 3, and 4 sharing rooms with attached washrooms, individual study stations, and balconies.',
    amenities: [
      { label: 'Annual Fee', val: '₹80,000 / Year (Lodging, 4 Meals/Day, Wi-Fi & Laundry)' },
      { label: 'Room Sharing', val: '2, 3 and 4 sharing eco-architectural rooms' },
      { label: 'Security', val: '24/7 Security Guards, Biometric Entry & CCTV Monitoring' },
      { label: 'Internet', val: '1 Gbps High-Speed Campus Fiber Wi-Fi' },
      { label: 'Power Backup', val: '24/7 Diesel Generator & Rooftop Solar Backup' },
      { label: 'Warden Contact', val: 'Chief Warden: +91 92487 11155' }
    ]
  },
  {
    id: 'hostel-girls',
    title: 'Girls Hostel Campus Wing (Kaveri & Godavari Blocks)',
    tag: 'Girls Accommodation',
    fee: '₹80,000 / Year (All Inclusive)',
    img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
    desc: 'Secure residential block with 24/7 female wardens, biometric access, air-conditioned study halls, and resident doctor.',
    amenities: [
      { label: 'Annual Fee', val: '₹80,000 / Year (Lodging, 4 Meals/Day, Wi-Fi & Laundry)' },
      { label: 'Safety & Security', val: 'Biometric Gate Access, Female Wardens 24/7, CCTV Surveillance' },
      { label: 'Medical Facility', val: 'Resident Female Nurse & 24/7 Emergency Ambulance on Call' },
      { label: 'Fitness & Sports', val: 'Dedicated Gymnasium, Badminton Court, Table Tennis & TV Lounge' },
      { label: 'Dining', val: 'Hygienic 4-meal buffet dining hall with South & North Indian menu' },
      { label: 'Warden Contact', val: 'Resident Warden: +91 92487 11156' }
    ]
  }
];

function generateHostelHTML() {
  const cardsHTML = hostelWingsData.map(h => `
    <div class="drill-card" onclick="showHostelDetail('${h.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${h.img}" alt="${h.title}" loading="lazy">
        <span class="drill-card-badge">${h.tag}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${h.title}</div>
        <div class="drill-card-desc">${h.desc}</div>
        <div class="drill-card-footer">
          <span style="color:#08752f; font-weight:800;">${h.fee}</span>
          <span>View Facilities →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <div class="modal-highlight-box" style="background:#eef7ed; border-left:5px solid #08752f; padding:16px;">
        <h3 style="color:#08752f; margin-bottom:4px; font-size:18px;">🏠 Annual Hostel Fee: ₹80,000 / Year</h3>
        <p style="margin:0; font-size:13px; color:#1a4628;">
          Affordable, eco-friendly accommodation on campus for both <strong>Boys and Girls Hostels</strong> (Includes lodging, 4 daily meals, 1 Gbps Wi-Fi, gym &amp; laundry).
        </p>
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showHostelDetail = function(hostelId) {
  const h = hostelWingsData.find(x => x.id === hostelId);
  if (!h) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('hostel')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All Hostel Wings</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${h.img}" alt="${h.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${h.fee}</span>
          <div class="drill-hero-title">${h.title}</div>
        </div>
      </div>

      <p>${h.desc}</p>

      <h4>✨ Premium Hostel Facilities &amp; Amenities:</h4>
      <div class="modal-grid-features">
        ${h.amenities.map(a => `
          <div class="modal-feature-card">
            <strong>${a.label}:</strong>
            <span>${a.val}</span>
          </div>
        `).join('')}
      </div>

      <div class="drill-actions-bar">
        <button class="drill-action-btn drill-action-primary" onclick="showToast('Hostel room application initiated! Fee: ₹80,000/yr')">Book Hostel Room Online (₹80,000/yr) →</button>
        <button class="drill-action-btn drill-action-secondary" onclick="showToast('Hostel rules, menu chart & schedule downloaded!')">Download Hostel Menu &amp; Rules ↓</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   14. DEPARTMENT OF PHYSICAL EDUCATION & SPORTS
   DUAL-TRACK SYSTEM:
   1. 🏆 HITAM Intra-College Sports (Branch-Wise, HITAM Students Only)
   2. ⚡ ELYSIAN — SANGRAM (National Inter-Collegiate Fest, All Colleges Welcome)
   ========================================================================== */

const sportsCommonIcons = {
  cricket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v13M9 3v13M12 3v13M4 3h10M17 11l4 4-6 6-4-4 6-6zM19.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>`,
  football: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="1"/><circle cx="12" cy="12" r="3"/><path d="M3 12h3M18 12h3M12 6v3M12 15v3"/></svg>`,
  basketball: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M7 11l5 10 5-10M9 14h6M8 17h8M4 7h16"/></svg>`,
  volleyball: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 9 9M12 21a9 9 0 0 1-9-9M3.5 8.5l14 7M6.5 18.5l14-7"/></svg>`,
  kabaddi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="7" r="2"/><circle cx="18" cy="7" r="2"/><path d="M6 9l4 4-2 6M18 9l-4 4 2 6M10 13h4"/></svg>`,
  throwball: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2.5"/><path d="M8 12l4-3 4 3v7M6 10l6-4 6 4M10 19v3M14 19v3"/><circle cx="19" cy="8" r="1.5"/></svg>`,
  badminton: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="8" r="4"/><path d="M10 11l8 8 2-2-8-8M17 18l3 3M4 17l4 4M2 19l2 2"/></svg>`,
  tabletennis: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="14" cy="9" r="5"/><path d="M10 13l-4 4-2-2 4-4"/><circle cx="18" cy="5" r="1.5"/></svg>`,
  khokho: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="5" r="2"/><circle cx="16" cy="5" r="2"/><path d="M5 12h6M13 12h6M6 19l2-7 3 2M15 14l3-2 2 7"/></svg>`,
  chess: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 20h8M9 20V12h6v8M8 12c0-3 2-4 2-6h4c0 2 2 3 2 6M10 6V4h4v2M12 2v2"/></svg>`,
  carroms: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><circle cx="6" cy="6" r="1"/><circle cx="18" cy="6" r="1"/><circle cx="6" cy="18" r="1"/><circle cx="18" cy="18" r="1"/></svg>`
};

// TRACK 1: HITAM INTRA-COLLEGE SPORTS (Branch-Wise Championship — HITAM Students Only)
const hitamSportsList = [
  {
    id: 'cricket',
    name: 'Cricket',
    title: 'HITAM Inter-Branch T20 Cricket Championship',
    badge: '🏆 Branch-Wise Clash • HITAM Students Only',
    img: 'assets/sangram.jpeg',
    paras: [
      'The Annual HITAM Inter-Branch Cricket Championship is the crowning sporting spectacle for registered HITAM engineers. Strictly contested branch-wise, each of the 9 engineering departments fields their hand-picked 15-player squad wearing departmental team jerseys.',
      'Matches follow a 12-overs-a-side white ball format on HITAM’s regulation turf wicket ground under the supervision of BCCI Level-1 umpires. In accordance with strict intramural eligibility guidelines, only students possessing an active HITAM Roll Number (e.g., 23X91A...) and identity card are permitted to play for their respective department.'
    ],
    defending: 'CSE (AI & ML) Titans (Champions), Mechanical Warriors (Runners-Up)',
    venue: 'HITAM Central Turf Wicket Ground (Gowdavelly Campus)',
    squad: '15 Players per Department (11 on-field + 4 reserves)',
    tags: ['HITAM Students Only', 'Turf Wicket Pitch', '12 Overs White Ball', 'Inter-Branch Rolling Trophy']
  },
  {
    id: 'football',
    name: 'Football',
    title: 'HITAM Inter-Branch 7-a-Side Football Cup',
    badge: '⚽ 7-a-Side Branch League • HITAM Students Only',
    img: 'assets/hitam7.jpeg',
    paras: [
      'Contested on HITAM’s lush green natural turf football arena, the Inter-Branch Football Cup features high-intensity 7-a-side matches with rolling substitutions across two 20-minute halves.',
      'All 9 branches battle through departmental group stages into the semi-finals and championship final. Defending champion CSE Strikers face fierce competition from Civil Builders and ECE United.'
    ],
    defending: 'CSE Strikers (Gold Medalists), Civil Builders (Silver)',
    venue: 'HITAM Green Football Field',
    squad: '12 Players per Department (7 on-field + 5 rolling subs)',
    tags: ['Natural Grass Turf', 'Rolling Substitutions', 'FIFA Rules', 'Department Pride']
  },
  {
    id: 'basketball',
    name: 'Basketball',
    title: 'HITAM Inter-Branch Floodlit Basketball League',
    badge: '🏀 Acrylic Floodlit Court • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Played on HITAM’s tournament-grade synthetic acrylic court equipped with high-intensity LED floodlights, the Inter-Branch Basketball League features fast-paced 4-quarter games.',
      'Departmental teams compete with spring-loaded rims and digital 24-second shot clocks. Strict player verification ensures each team comprises 100% genuine HITAM departmental students.'
    ],
    defending: 'ECE Ballers (Champions), CSE (AI & ML) (Runners-Up)',
    venue: 'HITAM Synthetic Acrylic Floodlit Court',
    squad: '10 Players per Department (5 on-court + 5 rolling subs)',
    tags: ['Synthetic Acrylic Court', 'LED Floodlights', 'Digital Shot Clocks', 'Intramural League']
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    title: 'HITAM Inter-Branch Volleyball Clash (Men & Women)',
    badge: '🏐 Dual Division Clash • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Featuring separate Men’s and Women’s branch divisions, the tournament is held on dual clay courts with regulation antenna nets and certified physical education faculty referees.',
      'Matches are played best-of-3 sets with the 25-point rally scoring system. Civil and Mechanical traditionally dominate the power spikes, while CSE and ECE showcase rapid defensive digs.'
    ],
    defending: 'Civil Spikers (Men’s Champions), ECE Aces (Women’s Champions)',
    venue: 'HITAM Outdoor Clay Volleyball Courts',
    squad: '12 Players per Department (6 on-court + 6 rotations)',
    tags: ['Dual Courts', 'Men & Women Categories', 'Clay Surfacing', 'Rally Point Scoring']
  },
  {
    id: 'kabaddi',
    name: 'Kabaddi',
    title: 'HITAM Inter-Branch Pro-Kabaddi Warriors',
    badge: '🤼 Pro-Mat Arena • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'High-adrenaline raid and tackle clashes played on international-standard interlocking rubber safety mats adhering strictly to Amateur Kabaddi Federation of India rules.',
      'Departmental rivalry reaches fever pitch as Mechanical and Civil brawn meets CSE and ECE agile toe-touches and ankle-holds before hundreds of cheering branch mates.'
    ],
    defending: 'Mechanical Dynamos (Champions), Civil Titans (Runners-Up)',
    venue: 'HITAM Pro-Kabaddi Synthetic Arena',
    squad: '12 Players per Department (7 on-mat + 5 substitutes)',
    tags: ['Pro-Kabaddi Mats', '30-Sec Raid Timers', 'Anti-Skid Safety', 'Inter-Branch Cup']
  },
  {
    id: 'throwball',
    name: 'Throwball',
    title: 'HITAM Women’s Inter-Branch Throwball League',
    badge: '🎯 Women in Engineering • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'A centerpiece of women’s athletics at HITAM, the Women’s Inter-Branch Throwball League showcases tactical team synergy, swift ball transfers, and court agility among female engineering students.',
      'All 9 departments field full women’s squads, playing best-of-3 sets with padded net posts and enthusiastic departmental cheering squads.'
    ],
    defending: 'CSE (Data Science) Queens (Gold), EEE Sparklers (Silver)',
    venue: 'HITAM Central Throwball Clay Court',
    squad: '12 Female Students per Branch (7 on-court + 5 substitutes)',
    tags: ['Women Sports League', 'Clay Court', 'Best-of-3 Sets', 'Branch Pride']
  },
  {
    id: 'badminton',
    name: 'Badminton',
    title: 'HITAM Inter-Branch Indoor Badminton Tournament',
    badge: '🏸 Indoor Pavilion • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Hosted inside the HITAM Sports Pavilion on BWF-approved synthetic badminton courts with high ceiling clearances and non-marking athletic shoes.',
      'Contested across Men’s Singles, Men’s Doubles, Women’s Singles, and Mixed Doubles. Every match win contributes direct points to the overall Department Athletics Shield.'
    ],
    defending: 'CSE Badminton Club (Champions), ECE Smashers (Runners-Up)',
    venue: 'HITAM Indoor Sports Pavilion (Court 1 & 2)',
    squad: '6 Players per Branch (Singles, Doubles & Mixed)',
    tags: ['BWF Synthetic Mats', 'Yonex Tournament Shuttles', 'Mixed Doubles', 'Indoor Air-Cooled']
  },
  {
    id: 'tabletennis',
    name: 'Table Tennis',
    title: 'HITAM Inter-Branch Table Tennis Shield',
    badge: '🏓 ITTF Stag Boards • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Rapid ping pong rallies played on four ITTF-approved Stag tournament tables under glare-free overhead LED lighting in the indoor sports wing.',
      'Singles and doubles ladder format (best of 5 games, 11 points each) testing top-spin loops, backhand chops, and lightning reflexes.'
    ],
    defending: 'ECE Spin Masters (Champions), CSE (AI & ML) (Runners-Up)',
    venue: 'Indoor Table Tennis Arena',
    squad: '4 Players per Branch (Singles & Doubles)',
    tags: ['ITTF Stag Boards', 'Robotic Ball Feeder', 'Best-of-5 Games', 'Singles & Doubles']
  },
  {
    id: 'khokho',
    name: 'Kho Kho',
    title: 'HITAM Inter-Branch Traditional Kho-Kho Cup',
    badge: '🏃 Sprint & Dodge Track • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Traditional Indian athletic chase game emphasizing sprint agility, rapid tactical direction shifts, and departmental team chemistry.',
      'Each team fields 9 chasers and 3 defenders competing in two 9-minute innings on cushioned red soil tracks with certified pole turns.'
    ],
    defending: 'Civil Runners (Champions), Mechanical (Runners-Up)',
    venue: 'HITAM Kho-Kho Red Soil Grounds',
    squad: '12 Players per Branch (9 active + 3 substitutes)',
    tags: ['Traditional Sport', 'Red Soil Cushion', 'Agility & Sprint', 'Branch Championship']
  },
  {
    id: 'chess',
    name: 'Chess',
    title: 'HITAM Inter-Branch Mind Sports Chess Masters',
    badge: '♟️ DGT Digital Clocks • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Conducted in the silent air-conditioned Mind Sports Lounge using FIDE standard chess sets and digital DGT clocks.',
      'Rapid format: 15 minutes + 10 seconds increment per move under Swiss-system pairing. Strategic masterminds from CSE, ECE, and IoT duel across 5 rounds.'
    ],
    defending: 'CSE (AI & ML) Grandmasters (Gold), IoT Strategists (Silver)',
    venue: 'HITAM Mind Sports Lounge (Library 2nd Floor)',
    squad: '4 Players per Branch (Board 1 to 4)',
    tags: ['FIDE Standard Sets', 'DGT Digital Clocks', '15+10 Rapid Control', 'Swiss Pairing']
  },
  {
    id: 'carroms',
    name: 'Carroms',
    title: 'HITAM Inter-Branch Carroms Doubles Duel',
    badge: '🎯 Synco Champion Boards • HITAM Students Only',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Played on tournament-grade waterproof Synco and Siscaa carrom boards with smooth acrylic tournament strikers and boric powder surfacing.',
      'Features Men’s and Women’s branch doubles brackets playing 29-point boards with regulation white queen cover rules.'
    ],
    defending: 'Mechanical Strikers (Champions), Civil (Runners-Up)',
    venue: 'HITAM Indoor Recreation Lounge',
    squad: '4 Players per Branch (2 Doubles Pairs)',
    tags: ['Synco Champion Boards', 'Acrylic Strikers', 'White Queen Rules', 'Intramural Trophy']
  }
];

// TRACK 2: ELYSIAN — SANGRAM (National Inter-Collegiate Sports Fest — Open for All Outside Colleges)
const elysianSportsList = [
  {
    id: 'cricket',
    name: 'Cricket',
    title: 'SANGRAM All-India Inter-Collegiate Cricket Trophy',
    badge: '⚡ Elysian Inter-College • ₹75,000 Cash Purse',
    img: 'assets/sangram.jpeg',
    paras: [
      'SANGRAM is the grand annual inter-collegiate sports championship organized under HITAM’s signature festival <strong>ELYSIAN</strong>. Student-athletes and varsity squads from over 40+ engineering colleges and universities across Hyderabad, Telangana, Andhra Pradesh, and Maharashtra travel to HITAM campus to compete.',
      'The Cricket tournament is a 16-overs white ball knockout played on HITAM’s central turf wicket ground. Outside colleges enroll through elysianhitam.com or the campus registration desk. Visiting college teams receive free on-campus hostel accommodation, cafeteria food passes, and dedicated shuttle pickups from Secunderabad and Miyapur metro stations.'
    ],
    prizes: '🏆 ₹50,000 Cash + Rolling Trophy (Champions) | 🥈 ₹25,000 Cash + Shield (Runners-Up)',
    entryFee: '₹2,500 per Outside College Team (15-player squad + Manager)',
    colleges: ['CBIT Hyderabad', 'VNR VJIET', 'BITS Pilani Hyderabad', 'JNTU College of Engineering (JNTUH)', 'Osmania University (OU)', 'Vasavi College', 'GRIET', 'MLRIT', 'IARE', 'CMR College'],
    venue: 'HITAM Main Turf Wicket Ground (Floodlit for Night Finals)',
    tags: ['Open for All Colleges', '₹75,000 Cash Pool', 'Hostel Stay Provided', 'State Referees', '16 Overs White Ball']
  },
  {
    id: 'football',
    name: 'Football',
    title: 'SANGRAM National Inter-College Football Cup',
    badge: '⚡ Elysian Inter-College • ₹50,000 Cash Purse',
    img: 'assets/hitam1.jpg',
    paras: [
      'The premier 11-a-side inter-collegiate football championship in the region, hosted on HITAM’s full-size FIFA-standard turf arena with certified match referees from the Telangana Football Association.',
      'More than 28 university teams from CBIT, BITS Pilani Hyderabad, VNR VJIET, and Osmania University clash in knockout rounds. Complete kit bags, first-aid sports physio, and refreshments are provided for visiting collegiate teams.'
    ],
    prizes: '🏆 ₹35,000 Cash + Gold Cup (Champions) | 🥈 ₹15,000 Cash + Silver Shield',
    entryFee: '₹2,000 per Outside College Squad (16 players)',
    colleges: ['CBIT', 'BITS Pilani', 'VNR VJIET', 'Vasavi', 'OU College of Engg', 'Vardhaman'],
    venue: 'HITAM Main Natural Grass Football Stadium',
    tags: ['11-a-Side Regulation', '₹50,000 Cash Pool', 'State Physio On-Site', 'Hostel Stay for External Teams']
  },
  {
    id: 'basketball',
    name: 'Basketball',
    title: 'SANGRAM Floodlit Inter-Collegiate Basketball Invitational',
    badge: '⚡ Elysian Inter-College • ₹35,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Played under high-power LED floodlights with full electronic scoring and 24-second shot clocks on HITAM’s synthetic acrylic basketball court.',
      'Drawing premier basketball powerhouses across South India, the tournament follows FIBA tournament standards with accredited referees and energetic courtside commentary.'
    ],
    prizes: '🏆 ₹25,000 Cash + Trophy (Champions) | 🥈 ₹10,000 Cash + Shield',
    entryFee: '₹1,500 per Outside College Team (12 players)',
    colleges: ['BITS Pilani Hyderabad', 'CBIT', 'JNTUH', 'GRIET', 'Anurag University'],
    venue: 'HITAM Synthetic Acrylic Floodlit Basketball Complex',
    tags: ['Acrylic Court', 'LED Floodlights', 'FIBA Rules', '₹35,000 Cash Pool']
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    title: 'SANGRAM Inter-University Volleyball Smash',
    badge: '⚡ Elysian Inter-College • ₹30,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'High-flying collegiate spikers from over 30 engineering colleges battle on HITAM’s halogen floodlit dual volleyball courts.',
      'Best-of-3 sets (25 points each) with the grand final contested as best-of-5 sets. Visiting players receive dining passes and hostel rooms.'
    ],
    prizes: '🏆 ₹20,000 Cash + Winner Cup | 🥈 ₹10,000 Cash + Runner Shield',
    entryFee: '₹1,200 per Outside College Team (12 players)',
    colleges: ['VNR VJIET', 'IARE', 'MLRIT', 'CMR CET', 'CVR College'],
    venue: 'HITAM Dual Clay Courts under Floodlights',
    tags: ['30+ Colleges Competing', 'Halogen Floodlights', 'State Association Referees', '₹30,000 Cash Pool']
  },
  {
    id: 'kabaddi',
    name: 'Kabaddi',
    title: 'SANGRAM All-India Inter-College Pro-Kabaddi Championship',
    badge: '⚡ Elysian Inter-College • ₹35,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'The flagship indigenous contact sport at Elysian, attracting 32 top collegiate kabaddi squads from across Telangana, Andhra Pradesh, and Karnataka.',
      'Played on tournament-grade interlocking safety mats under the direct supervision of certified referees from the Telangana State Kabaddi Association.'
    ],
    prizes: '🏆 ₹25,000 Cash + Championship Belt & Trophy | 🥈 ₹10,000 Cash + Shield',
    entryFee: '₹1,500 per Outside College Team (12 players)',
    colleges: ['OU Campus', 'JNTU Sultanpur', 'MGIT', 'Sreenidhi (SNIST)', 'KITS Warangal'],
    venue: 'HITAM Pro-Kabaddi Indoor Arena',
    tags: ['Interlocking Mats', 'State Association Referees', 'Championship Belt', 'Hostel Lodging']
  },
  {
    id: 'throwball',
    name: 'Throwball',
    title: 'SANGRAM State Inter-College Women’s Throwball Cup',
    badge: '⚡ Elysian Inter-College • ₹22,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'The premier collegiate women’s throwball championship in Hyderabad, drawing over 24 women’s college teams from across the state.',
      'Matches feature intense ball exchanges, swift rotational defense, and enthusiastic support with full accommodation in the HITAM Kaveri Girls Hostel.'
    ],
    prizes: '🏆 ₹15,000 Cash + Rolling Trophy | 🥈 ₹7,000 Cash + Shield',
    entryFee: '₹1,000 per Outside College Team',
    colleges: ['St. Francis College', 'BVRIT Hyderabad (Women)', 'G. Narayanamma (GNITS)', 'CBIT', 'Vasavi'],
    venue: 'HITAM Central Throwball Arena',
    tags: ['Women State Trophy', 'Hostel Accommodation', '24+ College Teams', '₹22,000 Cash Pool']
  },
  {
    id: 'badminton',
    name: 'Badminton',
    title: 'SANGRAM All-India Inter-College Badminton Duals',
    badge: '⚡ Elysian Inter-College • ₹22,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Men’s and Women’s collegiate singles and doubles contested on international BWF-approved synthetic indoor courts at HITAM.',
      'Yonex feather tournament shuttles, digital line scoreboards, and state-level certified chair umpires ensure professional tournament standards.'
    ],
    prizes: '🏆 ₹15,000 Cash + Medals | 🥈 ₹7,000 Cash + Runner Medals',
    entryFee: '₹800 per Singles Entry • ₹1,200 per Doubles Team',
    colleges: ['BITS Pilani Hyderabad', 'IIIT Hyderabad', 'CBIT', 'VNR VJIET', 'GRIET'],
    venue: 'HITAM Sports Pavilion BWF Courts',
    tags: ['BWF Synthetic Courts', 'Yonex Shuttles', 'Singles & Doubles', '₹22,000 Cash Pool']
  },
  {
    id: 'tabletennis',
    name: 'Table Tennis',
    title: 'SANGRAM Inter-College Table Tennis Challenge',
    badge: '⚡ Elysian Inter-College • ₹15,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Top collegiate paddlers duel on four ITTF-approved Stag tournament tables in the air-cooled indoor sports arena.',
      'Best-of-5 games (11 points) knockout bracket with live LED match displays and referee chairs.'
    ],
    prizes: '🏆 ₹10,000 Cash + Winner Trophy | 🥈 ₹5,000 Cash + Runner Shield',
    entryFee: '₹600 per Singles Entry • ₹1,000 per Doubles Team',
    colleges: ['IIIT Hyderabad', 'BITS Pilani', 'CBIT', 'Vasavi', 'JNTUH'],
    venue: 'Indoor Table Tennis Arena',
    tags: ['ITTF Stag Tables', 'Air-Cooled Arena', 'Singles & Doubles', 'Instant Verification']
  },
  {
    id: 'khokho',
    name: 'Kho Kho',
    title: 'SANGRAM South India Inter-University Kho-Kho',
    badge: '⚡ Elysian Inter-College • ₹20,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'A thrilling showcase of traditional sprint agility and team synergy bringing top university teams from across Telangana, Andhra Pradesh, and Karnataka.',
      'Played on regulation cushioned clay tracks under the supervision of Kho-Kho Federation of India (KKFI) certified referees.'
    ],
    prizes: '🏆 ₹14,000 Cash + Trophy | 🥈 ₹6,000 Cash + Shield',
    entryFee: '₹1,000 per Outside College Squad',
    colleges: ['Osmania University', 'Kakatiya University', 'JNTUH CE', 'Telangana University'],
    venue: 'HITAM Kho-Kho Red Soil Grounds',
    tags: ['South India Inter-University', 'KKFI Referees', 'Clay Track', '₹20,000 Cash Pool']
  },
  {
    id: 'chess',
    name: 'Chess',
    title: 'SANGRAM Grandmaster Open Inter-College Chess Championship',
    badge: '⚡ Elysian Inter-College • ₹15,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Open to student chess masters from all universities and engineering institutes across India. Rapid time control: 15 minutes + 10 seconds increment.',
      'Played with FIDE standard wooden boards and digital DGT clocks in the air-conditioned central hall with international arbiters overseeing pairings.'
    ],
    prizes: '🏆 ₹10,000 Cash + Gold Medal | 🥈 ₹5,000 Cash + Silver Medal',
    entryFee: '₹500 per Participant',
    colleges: ['IIIT Hyderabad', 'BITS Pilani', 'IIT Hyderabad', 'CBIT', 'VNR VJIET', 'JNTUH'],
    venue: 'HITAM Air-Conditioned Central Hall',
    tags: ['FIDE Standards', 'DGT Clocks', '15+10 Rapid Control', 'Open to All Colleges']
  },
  {
    id: 'carroms',
    name: 'Carroms',
    title: 'SANGRAM Inter-College Carroms Masters',
    badge: '⚡ Elysian Inter-College • ₹12,000 Cash Purse',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    paras: [
      'Championship carroms duel contested on waterproof Siscaa & Synco tournament boards with acrylic tournament strikers and white queen cover rules.',
      'Draws passionate carrom doubles teams from colleges across the Twin Cities and Telangana districts.'
    ],
    prizes: '🏆 ₹8,000 Cash + Trophy | 🥈 ₹4,000 Cash + Runner Shield',
    entryFee: '₹500 per Participant / Pair',
    colleges: ['CBIT', 'VNR VJIET', 'MLRIT', 'IARE', 'St. Martin\'s'],
    venue: 'HITAM Indoor Recreation Wing',
    tags: ['Siscaa Tournament Boards', 'Doubles Bracket', 'White Queen Rules', '₹12,000 Cash Pool']
  }
];

// Active State for Dual-Track Sports
let activeSportsTrack = 'hitam'; // 'hitam' or 'elysian'
let activeSportId = 'cricket';

window.generateSportsHTML = function generateSportsHTML() {
  const isHitam = activeSportsTrack === 'hitam';
  const currentList = isHitam ? hitamSportsList : elysianSportsList;
  const activeSport = currentList.find(s => s.id === activeSportId) || currentList[0];

  // Chips for all 11 sports
  const chipsHTML = currentList.map(sport => {
    const isActive = sport.id === activeSport.id;
    const icon = sportsCommonIcons[sport.id] || sportsCommonIcons.cricket;
    return `
      <button class="sport-chip-btn ${isHitam ? '' : 'elysian-chip'} ${isActive ? 'active' : ''}" onclick="selectSport('${sport.id}')" title="${sport.name}">
        <span class="sport-chip-icon">${icon}</span>
        <span>${sport.name}</span>
      </button>
    `;
  }).join('');

  // Top Dual-Track Switcher
  const trackSwitcherHTML = `
    <div class="sports-track-tabs">
      <button class="sports-track-tab-btn ${isHitam ? 'active' : ''}" onclick="switchSportsTrack('hitam')">
        <div class="track-tab-icon">🏆</div>
        <div class="track-tab-content">
          <div class="track-tab-title">HITAM Intra-College Sports</div>
          <div class="track-tab-sub">Only HITAM students can play branch-wise</div>
        </div>
      </button>

      <button class="sports-track-tab-btn elysian-tab ${!isHitam ? 'active' : ''}" onclick="switchSportsTrack('elysian')">
        <div class="track-tab-icon">⚡</div>
        <div class="track-tab-content">
          <div class="track-tab-title">ELYSIAN — SANGRAM</div>
          <div class="track-tab-sub">Open for outside colleges to enroll &amp; play</div>
        </div>
      </button>
    </div>
  `;

  // Track Banner
  const trackBannerHTML = isHitam ? `
    <div class="track-banner hitam-banner">
      <div class="track-banner-text">
        <h4>🏆 HITAM Inter-Branch Championship (Intra-College)</h4>
        <p>
          <strong>Exclusive for Enrolled HITAM Students:</strong> All 9 engineering departments (CSE, CSE-AIML, CSE-DS, ECE, MECH, EEE, CIVIL, IoT, CSO) compete head-to-head for the prestigious <strong>Inter-Branch Champions Rolling Trophy</strong>.
        </p>
      </div>
      <div class="track-banner-badges">
        <span class="track-pill-badge hitam-pill">🔒 HITAM Students Only</span>
        <span class="track-pill-badge" style="background:#e0edd9; color:#0b4f26; font-weight:800;">9 Branches</span>
      </div>
    </div>
  ` : `
    <div class="track-banner elysian-banner">
      <div class="track-banner-text">
        <h4>⚡ ELYSIAN '26 — SANGRAM (National Inter-Collegiate Fest)</h4>
        <p>
          <strong>Open to All Outside Colleges &amp; Universities:</strong> Teams from across Hyderabad, Telangana, and South India enroll and travel to the HITAM campus to compete for <strong>₹2,00,000+ in total cash awards</strong> with complimentary campus hostel stay and food passes!
        </p>
      </div>
      <div class="track-banner-badges">
        <span class="track-pill-badge elysian-pill">⚡ Open for All Outside Colleges</span>
        <span class="track-pill-badge" style="background:#0284c7; color:#ffffff; font-weight:800;">₹2,00,000+ Cash Pool</span>
      </div>
    </div>
  `;

  // Specific metadata area
  const specificMetaHTML = isHitam ? `
    <div class="branch-participants-box">
      <strong style="font-size:12.5px; color:#0b4f26;">🏛️ 9 Competing HITAM Engineering Branches:</strong>
      <div class="branch-chips-wrap">
        <span class="branch-name-chip">CSE (Titans)</span>
        <span class="branch-name-chip">CSE - AI &amp; ML (Warriors)</span>
        <span class="branch-name-chip">CSE - Data Science (Hawks)</span>
        <span class="branch-name-chip">ECE (Electrons)</span>
        <span class="branch-name-chip">Mechanical (Dynamos)</span>
        <span class="branch-name-chip">Civil (Builders)</span>
        <span class="branch-name-chip">EEE (Sparklers)</span>
        <span class="branch-name-chip">IoT (Sensors)</span>
        <span class="branch-name-chip">CSO (Cyber)</span>
      </div>
    </div>

    <h4>📋 Branch Tournament Specifications &amp; Format</h4>
    <div class="modal-grid-features">
      <div class="modal-feature-card">
        <strong>Eligibility:</strong>
        <span>Strictly valid HITAM Student ID &amp; Hall Ticket Roll No.</span>
      </div>
      <div class="modal-feature-card">
        <strong>Defending Champions:</strong>
        <span style="color:#08752f; font-weight:700;">${activeSport.defending}</span>
      </div>
      <div class="modal-feature-card">
        <strong>Venue &amp; Timings:</strong>
        <span>${activeSport.venue}</span>
      </div>
      <div class="modal-feature-card">
        <strong>Squad Composition:</strong>
        <span>${activeSport.squad}</span>
      </div>
    </div>

    <div class="drill-actions-bar">
      <button class="drill-action-btn drill-action-primary" onclick="openBranchRegistration('${activeSport.id}', '${activeSport.name}')">Register My Branch Team (HITAM Students) →</button>
      <button class="drill-action-btn drill-action-secondary" onclick="showBranchPointsTable()">View Branch Points Table 📊</button>
      <button class="drill-action-btn drill-action-secondary" onclick="showToast('Downloaded verified HITAM Inter-Branch ${activeSport.name} Rulebook & Fixtures!')">Download Rulebook PDF ↓</button>
    </div>
  ` : `
    <div class="visiting-colleges-box">
      <strong style="font-size:12.5px; color:#0369a1;">🎓 Visiting &amp; Enrolling Colleges at SANGRAM:</strong>
      <div class="branch-chips-wrap">
        ${activeSport.colleges.map(c => `<span class="college-name-chip">🏫 ${c}</span>`).join('')}
        <span class="college-name-chip">+30 More Outside Universities</span>
      </div>
    </div>

    <h4>💰 Cash Awards, Prize Pool &amp; Entry Terms</h4>
    <div class="modal-grid-features">
      <div class="modal-feature-card">
        <strong>Cash Prize Pool:</strong>
        <span style="color:#0284c7; font-weight:800;">${activeSport.prizes}</span>
      </div>
      <div class="modal-feature-card">
        <strong>Entry &amp; Registration Fee:</strong>
        <span style="color:#0f172a; font-weight:700;">${activeSport.entryFee}</span>
      </div>
      <div class="modal-feature-card">
        <strong>Match Ground:</strong>
        <span>${activeSport.venue}</span>
      </div>
      <div class="modal-feature-card">
        <strong>Facilities for Visiting Teams:</strong>
        <span style="color:#0369a1;">Free Hostel Stay (Parijatha &amp; Kaveri blocks), Food Passes &amp; Bus Pickup</span>
      </div>
    </div>

    <div class="drill-actions-bar" style="background:#f0f9ff; border-color:#bae6fd;">
      <button class="drill-action-btn" style="background:linear-gradient(180deg, #0284c7, #0369a1); color:#fff;" onclick="openExternalCollegeRegistration('${activeSport.id}', '${activeSport.name}')">Register Outside College Team (Online Entry) →</button>
      <button class="drill-action-btn drill-action-secondary" onclick="requestElysianHostel('${activeSport.name}')">Book Visiting Team Hostel Accommodation 🏠</button>
      <button class="drill-action-btn drill-action-secondary" onclick="showToast('Downloaded Elysian SANGRAM 2026 ${activeSport.name} Rulebook & Guidelines!')">Download Fest Guidelines PDF ↓</button>
    </div>
  `;

  return `
    <div class="sports-system-container">
      ${trackSwitcherHTML}
      ${trackBannerHTML}

      <div class="sports-chips-grid">
        ${chipsHTML}
      </div>

      <div class="sports-showcase-panel">
        <div class="sports-showcase-hero">
          <img src="${activeSport.img}" alt="${activeSport.name}" loading="lazy">
          <div class="sports-showcase-overlay ${isHitam ? '' : 'elysian-overlay'}">
            <span class="sports-hero-tag ${isHitam ? 'hitam-tag' : 'elysian-tag'}">${activeSport.badge}</span>
            <div class="sports-hero-title">${activeSport.title}</div>
            <div class="sports-hero-meta ${isHitam ? '' : 'elysian-meta'}">${activeSport.tags.join(' • ')}</div>
          </div>
        </div>

        <div class="sports-showcase-body">
          <div class="drill-para-group">
            ${activeSport.paras.map(p => `<p class="sports-para-text">${p}</p>`).join('')}
          </div>

          ${specificMetaHTML}

          <div id="sportsInteractiveSlot"></div>
          <div id="modalToastSlot"></div>
        </div>
      </div>
    </div>
  `;
}

// Function to switch between HITAM Intra-College and Elysian Sangram
window.switchSportsTrack = function(track) {
  activeSportsTrack = track;
  const body = document.getElementById('modalBody');
  if (body) {
    body.innerHTML = generateSportsHTML();
  }
};

// Function to switch selected sport game
window.selectSport = function(sportId) {
  activeSportId = sportId;
  const body = document.getElementById('modalBody');
  if (body) {
    body.innerHTML = generateSportsHTML();
  }
};

// Interactive Form for HITAM Branch Team Registration (HITAM Students Only)
window.openBranchRegistration = function(sportId, sportName) {
  const slot = document.getElementById('sportsInteractiveSlot');
  if (!slot) return;

  slot.innerHTML = `
    <div class="sports-quick-reg-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h4 style="color:#013b1f; margin:0; font-size:15px;">📝 Register HITAM Branch Team for ${sportName}</h4>
        <span style="font-size:11px; font-weight:800; background:#013b1f; color:#82c322; padding:2px 8px; border-radius:4px;">HITAM Students Only</span>
      </div>
      <p style="font-size:12px; color:#4a6855; margin-bottom:12px;">
        Select your engineering department and enter your student credentials. Only verified HITAM students can represent their branch.
      </p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
        <div>
          <label style="display:block; font-size:11.5px; font-weight:700; color:#0b4f26; margin-bottom:4px;">Select Department / Branch:</label>
          <select id="branchRegSelect" style="width:100%; padding:8px 10px; border:1px solid #c2dec8; border-radius:4px; font-size:12.5px; background:#fff;">
            <option value="CSE">Computer Science &amp; Engineering (CSE)</option>
            <option value="CSE-AIML">CSE (Artificial Intelligence &amp; Machine Learning)</option>
            <option value="CSE-DS">CSE (Data Science)</option>
            <option value="ECE">Electronics &amp; Communication (ECE)</option>
            <option value="MECH">Mechanical Engineering (MECH)</option>
            <option value="CIVIL">Civil Engineering (CIVIL)</option>
            <option value="EEE">Electrical &amp; Electronics (EEE)</option>
            <option value="IOT">Internet of Things (IoT)</option>
            <option value="CSO">Cyber Security &amp; Operations (CSO)</option>
          </select>
        </div>

        <div>
          <label style="display:block; font-size:11.5px; font-weight:700; color:#0b4f26; margin-bottom:4px;">Team Captain Name:</label>
          <input type="text" id="captainNameInput" placeholder="e.g., Bhukya Vishnu" value="Bhukya Vishnu" style="width:100%; padding:8px 10px; border:1px solid #c2dec8; border-radius:4px; font-size:12.5px;">
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        <div>
          <label style="display:block; font-size:11.5px; font-weight:700; color:#0b4f26; margin-bottom:4px;">HITAM Student Roll Number:</label>
          <input type="text" id="rollNumberInput" placeholder="e.g., 23X91A0501" value="23X91A0501" style="width:100%; padding:8px 10px; border:1px solid #c2dec8; border-radius:4px; font-size:12.5px;">
        </div>

        <div>
          <label style="display:block; font-size:11.5px; font-weight:700; color:#0b4f26; margin-bottom:4px;">Captain Mobile Phone:</label>
          <input type="text" id="phoneInput" placeholder="+91 9XXXXXXXXX" value="+91 96400 40089" style="width:100%; padding:8px 10px; border:1px solid #c2dec8; border-radius:4px; font-size:12.5px;">
        </div>
      </div>

      <div style="display:flex; gap:10px;">
        <button class="drill-action-btn drill-action-primary" onclick="submitBranchRegistration('${sportName}')">Submit Verified Branch Registration ✓</button>
        <button class="drill-action-btn drill-action-secondary" onclick="document.getElementById('sportsInteractiveSlot').innerHTML=''">Cancel</button>
      </div>
    </div>
  `;
};

window.submitBranchRegistration = function(sportName) {
  const branch = document.getElementById('branchRegSelect') ? document.getElementById('branchRegSelect').value : 'CSE';
  const roll = document.getElementById('rollNumberInput') ? document.getElementById('rollNumberInput').value : '23X91A0501';
  const cap = document.getElementById('captainNameInput') ? document.getElementById('captainNameInput').value : 'Captain';
  
  showToast(`Registered ${branch} team for ${sportName}. Captain: ${cap} (Roll: ${roll}).`);
  showDemoNotice(`Branch Registration: Logged ${branch} team for ${sportName}. Team rosters are verified at the Physical Education desk.`);
  const slot = document.getElementById('sportsInteractiveSlot');
  if (slot) slot.innerHTML = '';
};

// Interactive Form for Outside Colleges registering for ELYSIAN SANGRAM
window.openExternalCollegeRegistration = function(sportId, sportName) {
  const slot = document.getElementById('sportsInteractiveSlot');
  if (!slot) return;

  slot.innerHTML = `
    <div class="sports-quick-reg-card elysian-reg">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h4 style="color:#0369a1; margin:0; font-size:15px;">🏫 Outside College Entry Registration — SANGRAM (${sportName})</h4>
        <span style="font-size:11px; font-weight:800; background:#0284c7; color:#fff; padding:2px 8px; border-radius:4px;">All Outside Colleges</span>
      </div>
      <p style="font-size:12px; color:#0369a1; margin-bottom:12px;">
        Colleges and universities from anywhere in India can enroll their athletic squad. Complimentary hostel accommodation and meal passes will be arranged.
      </p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
        <div>
          <label style="display:block; font-size:11.5px; font-weight:700; color:#0369a1; margin-bottom:4px;">Visiting College / University Name:</label>
          <input type="text" id="extCollegeName" placeholder="e.g., Chaitanya Bharathi Institute of Technology (CBIT)" value="Chaitanya Bharathi Institute of Technology (CBIT)" style="width:100%; padding:8px 10px; border:1px solid #7dd3fc; border-radius:4px; font-size:12.5px; background:#fff;">
        </div>

        <div>
          <label style="display:block; font-size:11.5px; font-weight:700; color:#0369a1; margin-bottom:4px;">City / State:</label>
          <input type="text" id="extCityState" placeholder="e.g., Hyderabad, Telangana" value="Gandipet, Hyderabad" style="width:100%; padding:8px 10px; border:1px solid #7dd3fc; border-radius:4px; font-size:12.5px; background:#fff;">
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
        <div>
          <label style="display:block; font-size:11.5px; font-weight:700; color:#0369a1; margin-bottom:4px;">Sports Secretary / Captain Name:</label>
          <input type="text" id="extCaptainName" placeholder="e.g., K. Vikram Reddy" value="K. Vikram Reddy" style="width:100%; padding:8px 10px; border:1px solid #7dd3fc; border-radius:4px; font-size:12.5px; background:#fff;">
        </div>

        <div>
          <label style="display:block; font-size:11.5px; font-weight:700; color:#0369a1; margin-bottom:4px;">Contact Mobile / WhatsApp:</label>
          <input type="text" id="extPhone" placeholder="+91 9XXXXXXXXX" value="+91 98480 22334" style="width:100%; padding:8px 10px; border:1px solid #7dd3fc; border-radius:4px; font-size:12.5px; background:#fff;">
        </div>
      </div>

      <div style="display:flex; gap:10px;">
        <button class="drill-action-btn" style="background:#0284c7; color:#fff;" onclick="submitExternalRegistration('${sportName}')">Submit Outside College Registration ✓</button>
        <button class="drill-action-btn drill-action-secondary" onclick="document.getElementById('sportsInteractiveSlot').innerHTML=''">Cancel</button>
      </div>
    </div>
  `;
};

window.submitExternalRegistration = function(sportName) {
  const college = document.getElementById('extCollegeName') ? document.getElementById('extCollegeName').value : 'External College';
  const cap = document.getElementById('extCaptainName') ? document.getElementById('extCaptainName').value : 'Captain';
  
  showToast(`Entry recorded for ${college} in SANGRAM ${sportName}.`);
  showDemoNotice(`SANGRAM Fest Registration: Registration details submitted for ${college} in ${sportName}. Verification and match schedule managed by the Sports Committee.`);
  const slot = document.getElementById('sportsInteractiveSlot');
  if (slot) slot.innerHTML = '';
};

// Interactive Branch Points Table Modal/View
window.showBranchPointsTable = function() {
  const slot = document.getElementById('sportsInteractiveSlot');
  if (!slot) return;

  slot.innerHTML = `
    <div style="background:#f4fbf5; border:1px solid #c2e2c7; border-radius:8px; padding:16px; margin-top:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h4 style="margin:0; color:#013b1f;">🏆 HITAM Inter-Branch Champions Rolling Trophy (Standings)</h4>
        <button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="document.getElementById('sportsInteractiveSlot').innerHTML=''">✕ Close</button>
      </div>
      <p style="font-size:12px; color:#4a6855; margin-bottom:10px;">Cumulative points table across all 11 intramural sports (Gold: 10 pts, Silver: 6 pts, Bronze: 4 pts).</p>

      <div class="sports-table-box">
        <table class="ht-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Department / Branch</th>
              <th>Gold</th>
              <th>Silver</th>
              <th>Bronze</th>
              <th>Total Pts</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>#1</strong></td>
              <td><strong>Computer Science &amp; Engineering (CSE)</strong></td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td><strong style="color:#08752f;">46</strong></td>
              <td><span class="sports-status-badge badge-gold">Leading</span></td>
            </tr>
            <tr>
              <td><strong>#2</strong></td>
              <td><strong>CSE (AI &amp; ML)</strong></td>
              <td>2</td>
              <td>3</td>
              <td>1</td>
              <td><strong style="color:#08752f;">42</strong></td>
              <td><span class="sports-status-badge badge-silver">Chasing</span></td>
            </tr>
            <tr>
              <td><strong>#3</strong></td>
              <td><strong>Electronics &amp; Communication (ECE)</strong></td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td><strong style="color:#08752f;">40</strong></td>
              <td><span class="sports-status-badge badge-bronze">Top 3</span></td>
            </tr>
            <tr>
              <td><strong>#4</strong></td>
              <td><strong>Mechanical Engineering (MECH)</strong></td>
              <td>2</td>
              <td>1</td>
              <td>2</td>
              <td><strong>34</strong></td>
              <td><span class="sports-status-badge" style="background:#e2e8f0;">Contender</span></td>
            </tr>
            <tr>
              <td><strong>#5</strong></td>
              <td><strong>Civil Engineering (CIVIL)</strong></td>
              <td>1</td>
              <td>2</td>
              <td>1</td>
              <td><strong>26</strong></td>
              <td><span class="sports-status-badge" style="background:#e2e8f0;">Active</span></td>
            </tr>
            <tr>
              <td><strong>#6</strong></td>
              <td><strong>CSE (Data Science)</strong></td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td><strong>20</strong></td>
              <td><span class="sports-status-badge" style="background:#e2e8f0;">Active</span></td>
            </tr>
            <tr>
              <td><strong>#7</strong></td>
              <td><strong>Electrical &amp; Electronics (EEE)</strong></td>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td><strong>14</strong></td>
              <td><span class="sports-status-badge" style="background:#e2e8f0;">Active</span></td>
            </tr>
            <tr>
              <td><strong>#8</strong></td>
              <td><strong>Internet of Things (IoT)</strong></td>
              <td>0</td>
              <td>0</td>
              <td>2</td>
              <td><strong>8</strong></td>
              <td><span class="sports-status-badge" style="background:#e2e8f0;">Active</span></td>
            </tr>
            <tr>
              <td><strong>#9</strong></td>
              <td><strong>Cyber Security &amp; Operations (CSO)</strong></td>
              <td>0</td>
              <td>0</td>
              <td>1</td>
              <td><strong>4</strong></td>
              <td><span class="sports-status-badge" style="background:#e2e8f0;">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
};

// Interactive Hostel Request for Visiting Outside College Teams
window.requestElysianHostel = function(sportName) {
  showToast(`Hostel accommodation inquiry logged for SANGRAM ${sportName}.`);
  showDemoNotice(`Visiting Team Accommodation: Request recorded for ${sportName}. Room allotment in Parijatha/Kaveri hostel blocks is verified upon physical reporting with institutional ID.`);
};