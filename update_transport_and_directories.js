// scratch/update_transport_and_directories.js
const fs = require('fs');

const updatedTransportSection = `/* ==========================================================================
   11. TRANSPORT & 10 BUS ROUTES (Drill-Down System)
   ========================================================================== */

const busRoutesData = [
  {
    id: 'bus-1',
    busNo: 'Bus 01',
    route: 'Secunderabad & Suchitra Route',
    time: 'Departs: 7:15 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'Secunderabad Railway Station ➔ Paradise ➔ Tadbund ➔ Bowenpally ➔ Suchitra Circle ➔ Kompally ➔ HITAM Campus.',
    stops: [
      { stop: 'Secunderabad Station (Platform 1)', time: '7:15 AM' },
      { stop: 'Paradise Circle (Opp. Fire Station)', time: '7:25 AM' },
      { stop: 'Tadbund Cross Roads', time: '7:33 AM' },
      { stop: 'Bowenpally Checkpost', time: '7:42 AM' },
      { stop: 'Suchitra Circle (Reliance Smart)', time: '7:55 AM' },
      { stop: 'Kompally (Cineplanet / D-Mart)', time: '8:08 AM' },
      { stop: 'Gundlapochampally Gate', time: '8:20 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. B. Krishna (+91 98480 22334)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  },
  {
    id: 'bus-2',
    busNo: 'Bus 02',
    route: 'Kukatpally & JNTU Route',
    time: 'Departs: 7:25 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'KPHB Colony ➔ JNTU ➔ Pragathi Nagar ➔ Nizampet \'X\' Road ➔ Bachupally ➔ Gandimaisamma ➔ HITAM.',
    stops: [
      { stop: 'KPHB Colony Phase 1 & 4', time: '7:25 AM' },
      { stop: 'JNTU Main Gate (Rythu Bazar)', time: '7:35 AM' },
      { stop: 'Pragathi Nagar Arch', time: '7:44 AM' },
      { stop: 'Nizampet Cross Roads', time: '7:54 AM' },
      { stop: 'Bachupally Cross Road', time: '8:05 AM' },
      { stop: 'Gandimaisamma Junction', time: '8:18 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. T. Ramesh (+91 99890 33445)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  },
  {
    id: 'bus-3',
    busNo: 'Bus 03',
    route: 'Miyapur & Bachupally Route',
    time: 'Departs: 7:30 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'Miyapur Metro ➔ Allwyn Colony ➔ Bollaram Industrial Gate ➔ Bachupally ➔ Bowrampet ➔ Dundigal ➔ HITAM.',
    stops: [
      { stop: 'Miyapur Metro Station', time: '7:30 AM' },
      { stop: 'Allwyn Colony Junction', time: '7:40 AM' },
      { stop: 'Bollaram Industrial Area Gate', time: '7:52 AM' },
      { stop: 'Bachupally Village', time: '8:02 AM' },
      { stop: 'Bowrampet Village', time: '8:12 AM' },
      { stop: 'Dundigal Air Force Gate', time: '8:22 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. S. Naresh (+91 97000 44556)',
    gpsStatus: 'Live GPS Active (On Time)'
  },
  {
    id: 'bus-4',
    busNo: 'Bus 04',
    route: 'ECIL, Sainikpuri & Alwal Route',
    time: 'Departs: 7:10 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'ECIL \'X\' Roads ➔ AS Rao Nagar ➔ Sainikpuri ➔ Yapral ➔ Alwal Temple ➔ Bolarum ➔ Kompally ➔ HITAM.',
    stops: [
      { stop: 'ECIL Cross Roads', time: '7:10 AM' },
      { stop: 'AS Rao Nagar (Radhika Theatre)', time: '7:20 AM' },
      { stop: 'Sainikpuri Club', time: '7:30 AM' },
      { stop: 'Yapral & Balaji Nagar', time: '7:42 AM' },
      { stop: 'Alwal Temple Bus Stop', time: '7:54 AM' },
      { stop: 'Bolarum Railway Gate', time: '8:06 AM' },
      { stop: 'Kompally Bypass', time: '8:18 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. K. Mallesh (+91 96110 55667)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  },
  {
    id: 'bus-5',
    busNo: 'Bus 05',
    route: 'Mehdipatnam, Begumpet & Balanagar Route',
    time: 'Departs: 7:05 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'Mehdipatnam Pillar 12 ➔ Lakdikapul ➔ Punjagutta ➔ Begumpet Airport Road ➔ Balanagar ➔ Jeedimetla ➔ HITAM.',
    stops: [
      { stop: 'Mehdipatnam Pillar 12', time: '7:05 AM' },
      { stop: 'Lakdikapul / Saifabad', time: '7:18 AM' },
      { stop: 'Punjagutta Central', time: '7:28 AM' },
      { stop: 'Begumpet Airport Road', time: '7:40 AM' },
      { stop: 'Ferozguda / Balanagar \'X\' Roads', time: '7:55 AM' },
      { stop: 'Jeedimetla Bus Depot', time: '8:10 AM' },
      { stop: 'Medchal Highway Junction', time: '8:22 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. P. Narsing (+91 98490 66778)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  },
  {
    id: 'bus-6',
    busNo: 'Bus 06',
    route: 'LB Nagar & Dilsukhnagar Route',
    time: 'Departs: 6:55 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'LB Nagar Ring Road ➔ Kothapet ➔ Dilsukhnagar ➔ Koti Women\'s College ➔ RTC X Roads ➔ Musheerabad ➔ Bowenpally ➔ HITAM.',
    stops: [
      { stop: 'LB Nagar Ring Road', time: '6:55 AM' },
      { stop: 'Kothapet Fruit Market', time: '7:05 AM' },
      { stop: 'Dilsukhnagar Bus Depot', time: '7:15 AM' },
      { stop: 'Koti Women’s College', time: '7:28 AM' },
      { stop: 'RTC X Roads (Chikkadpally)', time: '7:42 AM' },
      { stop: 'Musheerabad & Gandhi Hospital', time: '7:52 AM' },
      { stop: 'Bowenpally Overbridge', time: '8:10 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. V. Raju (+91 99480 77889)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  },
  {
    id: 'bus-7',
    busNo: 'Bus 07',
    route: 'Uppal, Tarnaka & Malkajgiri Route',
    time: 'Departs: 7:10 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'Uppal Ring Road ➔ Habsiguda ➔ Tarnaka Flyover ➔ Mettuguda ➔ Malkajgiri Anandbagh ➔ Suchitra ➔ Kompally ➔ HITAM.',
    stops: [
      { stop: 'Uppal Ring Road Metro', time: '7:10 AM' },
      { stop: 'Habsiguda Street No. 8', time: '7:20 AM' },
      { stop: 'Tarnaka Flyover', time: '7:30 AM' },
      { stop: 'Mettuguda Junction', time: '7:40 AM' },
      { stop: 'Malkajgiri Anandbagh', time: '7:52 AM' },
      { stop: 'Suchitra Junction', time: '8:12 AM' },
      { stop: 'Kompally Cineplanet', time: '8:22 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. G. Srinivas (+91 98491 12233)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  },
  {
    id: 'bus-8',
    busNo: 'Bus 08',
    route: 'Lingampally, BHEL & Chandanagar Route',
    time: 'Departs: 7:15 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'Lingampally Station ➔ BHEL Gate ➔ Chandanagar ➔ Madinaguda ➔ Miyapur Allwyn ➔ Suraram ➔ HITAM.',
    stops: [
      { stop: 'Lingampally Railway Station', time: '7:15 AM' },
      { stop: 'BHEL Township Gate', time: '7:25 AM' },
      { stop: 'Chandanagar Bus Stand', time: '7:35 AM' },
      { stop: 'Madinaguda Deepthisri Nagar', time: '7:45 AM' },
      { stop: 'Miyapur Allwyn Junction', time: '7:58 AM' },
      { stop: 'Suraram Colony', time: '8:15 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. M. Anjaiah (+91 97011 23456)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  },
  {
    id: 'bus-9',
    busNo: 'Bus 09',
    route: 'Mallapur, Kushaiguda & Nagaram Route',
    time: 'Departs: 7:05 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'Mallapur ➔ Kushaiguda Depot ➔ Dammaiguda \'X\' Roads ➔ Nagaram ➔ Saket Towers / Kapra ➔ Bolarum ➔ Gundlapochampally ➔ HITAM.',
    stops: [
      { stop: 'Mallapur Main Road', time: '7:05 AM' },
      { stop: 'Kushaiguda Bus Depot', time: '7:18 AM' },
      { stop: 'Dammaiguda Cross Roads', time: '7:30 AM' },
      { stop: 'Nagaram Bus Stop', time: '7:40 AM' },
      { stop: 'Saket Towers / Kapra', time: '7:52 AM' },
      { stop: 'Bolarum Checkpost', time: '8:08 AM' },
      { stop: 'Gundlapochampally', time: '8:22 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. Y. Chandrasekhar (+91 99892 34567)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  },
  {
    id: 'bus-10',
    busNo: 'Bus 10',
    route: 'Medchal, Kandlakoya & Northern Perimeter Route',
    time: 'Departs: 7:40 AM',
    img: 'assets/hitam-bus.jpg',
    desc: 'Medchal Railway Station ➔ Medchal Checkpost ➔ Kandlakoya Oxygen Park ➔ Dabilpur Gate ➔ Gowdavelly ➔ HITAM.',
    stops: [
      { stop: 'Medchal Railway Station Road', time: '7:40 AM' },
      { stop: 'Medchal Checkpost & Bus Stand', time: '7:50 AM' },
      { stop: 'Kandlakoya Oxygen Park', time: '8:02 AM' },
      { stop: 'Dabilpur Gate', time: '8:12 AM' },
      { stop: 'Gowdavelly Village Centre', time: '8:24 AM' },
      { stop: 'HITAM Campus (Arrival)', time: '8:35 AM' }
    ],
    driver: 'Mr. D. Venkatesh (+91 98485 67890)',
    gpsStatus: 'GPS Enabled Fleet (Accessible via Institutional Commuter App for Enrolled Students)'
  }
];

function generateTransportHTML() {
  const cardsHTML = busRoutesData.map(b => \`
    <div class="drill-card" onclick="showTransportDetail('\${b.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="\${b.img}" alt="\${b.route}" loading="lazy">
        <span class="drill-card-badge">\${b.busNo}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">\${b.busNo} — \${b.route}</div>
        <div class="drill-card-desc">\${b.desc}</div>
        <div class="drill-card-footer">
          <span>⏰ \${b.time}</span>
          <span style="color:#08752f; font-weight:700;">View Stops &amp; GPS →</span>
        </div>
      </div>
    </div>
  \`).join('');

  return \`
    <div>
      <!-- Real HITAM College Bus Hero Banner -->
      <div class="drill-hero-banner" style="height:220px; margin-bottom:14px;">
        <img class="drill-hero-img" src="assets/hitam-bus.jpg" alt="HITAM College Bus Fleet">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge" style="background:#82c322; color:#013b1f;">40+ Fleet Buses • 10 Express Routes</span>
          <div class="drill-hero-title">HITAM Institutional Bus Fleet &amp; 10 City Routes</div>
          <div class="drill-hero-sub">Safe, Air-Cooled &amp; Monitored Transit Across All Sectors of Hyderabad &amp; Secunderabad</div>
        </div>
      </div>

      <p>HITAM operates 40+ GPS-tracked air-cooled and standard deluxe buses with mobile app tracking across 10 major city routes throughout Hyderabad, Secunderabad, and Medchal perimeter zones.</p>
      
      <div class="modal-highlight-box">
        <strong>Transport Committee Helpline:</strong> <b>+91 7337554435</b> / <b>+91 92487 11150</b> • Live GPS tracking login provided upon enrollment.
      </div>

      <h4 style="margin:16px 0 10px 0; color:#013b1f;">🚍 Select Any Route Below to View Complete Stop-by-Stop Schedule:</h4>
      <div class="drill-grid">
        \${cardsHTML}
      </div>
    </div>
  \`;
}

window.showTransportDetail = function(busId) {
  const b = busRoutesData.find(x => x.id === busId);
  if (!b) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  const stopsHTML = b.stops.map((st, idx) => \`
    <tr>
      <td><strong>\${idx + 1}</strong></td>
      <td>\${st.stop}</td>
      <td style="color:#08752f; font-weight:700;">\${st.time}</td>
    </tr>
  \`).join('');

  body.innerHTML = \`
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('transport')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All 10 Bus Routes</span>
      </button>

      <div class="drill-hero-banner" style="height:220px; margin-bottom:14px;">
        <img class="drill-hero-img" src="\${b.img}" alt="\${b.route}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">\${b.busNo}</span>
          <div class="drill-hero-title">\${b.route}</div>
          <div class="drill-hero-sub">\${b.time} • In-Charge: \${b.driver}</div>
        </div>
      </div>

      <div class="modal-highlight-box" style="background:#e8f5ec;">
        <strong>📡 GPS Status:</strong> \${b.gpsStatus} • Assigned Driver: <b>\${b.driver}</b>
      </div>

      <h4>🚍 Route Stops &amp; Exact Pickup Timings:</h4>
      <table class="ht-table" style="margin-top:6px;">
        <thead>
          <tr>
            <th style="width:40px;">#</th>
            <th>Bus Stop Name</th>
            <th style="width:120px;">Morning Time</th>
          </tr>
        </thead>
        <tbody>
          \${stopsHTML}
        </tbody>
      </table>

      <div class="drill-actions-bar" style="display:flex; flex-wrap:wrap; gap:10px;">
        <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Live bus location tracking is enabled for registered transport users via the dedicated institutional mobile app.')">Transport App GPS Tracking Info 📍</button>
        <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Printed route charts and boarding passes are issued by the Transport In-Charge at the campus administrative wing.')">Route Card &amp; Pass Information</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  \`;
};`;

// Generator functions for directory overviews (when "View More" is clicked)
const directoryGeneratorFunctions = `
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
        🎓 <strong>HITAM College Life Directory:</strong> Explore all 5 college life categories below in dedicated interactive boxes.
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
        🔐 <strong>HITAM Digital Portals Directory:</strong> Access Administrative, Faculty, or Student Portals below. Select a box to sign in to your dashboard.
      </div>
      <div class="drill-grid">
        \${boxesHTML}
      </div>
    </div>
  \`;
}
`;

let code = fs.readFileSync('js/main.js', 'utf8');

// 1. Replace Section 11 (Transport)
const transportRegex = /\/\* =+\s*11\. TRANSPORT & 8 BUS ROUTES[\s\S]*?window\.showTransportDetail = function\(busId\) \{[\s\S]*?\n\};\n/m;

if (transportRegex.test(code)) {
  code = code.replace(transportRegex, updatedTransportSection + '\n');
  console.log('Successfully replaced Section 11 Transport with 10 routes and real bus image');
} else {
  console.error('Failed to locate Section 11 Transport regex');
}

// 2. Add Directory Generator Functions before Section 16
const sec16Regex = /\/\* =+\r?\n\s*16\. UNIFIED CONTENT DATA DICTIONARY/;
if (sec16Regex.test(code)) {
  code = code.replace(sec16Regex, match => directoryGeneratorFunctions + '\n' + match);
  console.log('Successfully added directory generator functions before Section 16');
} else {
  console.error('Failed to locate Section 16 marker');
}

// 3. Update window.hitamContentData entries:
// Update transport title
code = code.replace(
  /title:\s*'HITAM Campus Bus Fleet & 8 City Routes'/,
  "title: 'HITAM Campus Bus Fleet & 10 City Routes'"
);

// Update campus-services-all getBody
code = code.replace(
  /'campus-services-all':\s*\{[\s\S]*?getBody:\s*\(\)\s*=>\s*generateTransportHTML\(\)\s*\}/,
  `'campus-services-all': {
    title: 'Campus Facilities Overview Directory — All 6 Facilities',
    category: 'Campus Services — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2L2 7h20L12 2z"/></svg>\`,
    isWide: true,
    getBody: () => generateCampusServicesAllHTML()
  }`
);

// Update college-life-all getBody
code = code.replace(
  /'college-life-all':\s*\{[\s\S]*?getBody:\s*\(\)\s*=>\s*generateStudentLifeHTML\(\)\s*\}/,
  `'college-life-all': {
    title: 'College Life Overview Directory — All 5 Categories',
    category: 'College Life — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9z"/></svg>\`,
    isWide: true,
    getBody: () => generateCollegeLifeAllHTML()
  }`
);

// Update portals-all getBody
code = code.replace(
  /'portals-all':\s*\{[\s\S]*?getBody:\s*\(\)\s*=>\s*generatePortalLoginHTML\('student'\)\s*\}/,
  `'portals-all': {
    title: 'Unified Single Sign-On (SSO) Directory — All 3 Portals',
    category: 'Digital Portals — HITAM',
    icon: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>\`,
    isWide: true,
    getBody: () => generatePortalsAllHTML()
  }`
);

fs.writeFileSync('js/main.js', code, 'utf8');
console.log('Successfully updated js/main.js with real bus image, 10 routes, and box-based directories!');
