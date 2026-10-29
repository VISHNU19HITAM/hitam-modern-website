/* ==========================================================================
   16. UNIFIED CONTENT DATA DICTIONARY
   ========================================================================== */

window.hitamContentData = {
  // COLLEGE LIFE
  'departments': {
    title: 'Academic Departments & 9 Branches',
    category: 'College Life — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M9 11v6M15 11v6M12 11v6"/></svg>`,
    isWide: true,
    getBody: () => generateDepartmentsHTML()
  },

  'events': {
    title: 'Campus Events, Hackathons & Festivals',
    category: 'College Life — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    isWide: true,
    getBody: () => generateEventsHTML()
  },

  'achievements': {
    title: 'Institutional Rankings & Achievements',
    category: 'College Life — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34M7 4h10v6a5 5 0 0 1-10 0V4z"/></svg>`,
    isWide: true,
    getBody: () => generateAchievementsHTML()
  },

  'student-life': {
    title: 'Student Life, NCC (5(T) BN), NSS & Clubs',
    category: 'College Life — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    isWide: true,
    getBody: () => generateStudentLifeHTML()
  },

  'innovation': {
    title: 'Innovation, "Doing Engineering" & Startups',
    category: 'College Life — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/></svg>`,
    isWide: true,
    getBody: () => generateInnovationHTML()
  },

    'placements': {
    title: 'Career Guidance & Placements — Corporate Recruitment & Placed Students',
    category: 'College Life — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
    isWide: true,
    getBody: () => generatePlacementsHTML()
  },

  'college-life-all': {
    title: 'College Life Overview Directory — All 5 Categories',
    category: 'College Life — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9z"/></svg>`,
    isWide: true,
    getBody: () => generateCollegeLifeAllHTML()
  },

  // CAMPUS SERVICES
  'library': {
    title: 'Dr. APJ Abdul Kalam Central Digital Library',
    category: 'Campus Services — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    isWide: true,
    getBody: () => generateLibraryHTML()
  },

  'canteen': {
    title: 'HITAM Cafeteria & Multi-Stall Food Court',
    category: 'Campus Services — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`,
    isWide: true,
    getBody: () => generateCanteenHTML()
  },

  'transport': {
    title: 'HITAM Campus Bus Fleet & 10 City Routes',
    category: 'Campus Services — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="14" rx="2"></rect><path d="M7 17v3M17 17v3M3 10h18M8 6h.01M16 6h.01"/></svg>`,
    isWide: true,
    getBody: () => generateTransportHTML()
  },

  'labs': {
    title: 'Department Research Laboratories & Centers',
    category: 'Campus Services — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31L4.08 19.26A2 2 0 0 0 5.76 22h12.48a2 2 0 0 0 1.68-2.74L14 9.31V2M8.5 2h7M7 16h10"/></svg>`,
    isWide: true,
    getBody: () => generateLabsHTML()
  },

  'hostel': {
    title: 'Eco-Friendly Campus Hostels (Boys & Girls)',
    category: 'Campus Services — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    isWide: true,
    getBody: () => generateHostelHTML()
  },

  'sports': {
    title: 'Department of Physical Education & 11 Sports',
    category: 'Campus Sports & Athletics — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"/></svg>`,
    isWide: true,
    getBody: () => generateSportsHTML()
  },

  'campus-services-all': {
    title: 'Campus Facilities Overview Directory — All 6 Facilities',
    category: 'Campus Services — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2L2 7h20L12 2z"/></svg>`,
    isWide: true,
    getBody: () => generateCampusServicesAllHTML()
  },

  // PORTALS
  'admin-portal': {
    title: 'HITAM Enterprise Admin Portal',
    category: 'Digital Governance — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    isWide: true,
    getBody: () => generatePortalLoginHTML('admin')
  },

  'faculty-portal': {
    title: 'HITAM Faculty LMS & Academic Portal',
    category: 'Academic Portal — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    isWide: true,
    getBody: () => generatePortalLoginHTML('faculty')
  },

  'student-portal': {
    title: 'HITAM Student ERP & Academics Portal',
    category: 'Student Portal — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 0 1 .665 6.479A11.952 11.952 0 0 0 12 20.055a11.952 11.952 0 0 0-6.824-2.998 12.078 12.078 0 0 1 .665-6.479L12 14z"></path></svg>`,
    isWide: true,
    getBody: () => generatePortalLoginHTML('student')
  },

      'exam-portal': {
    title: 'HITAM Autonomous Exam Portal — Results, Hall Tickets & CIE',
    category: 'Examination Portal — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
    isWide: true,
    getBody: () => generateExamPortalHTML()
  },

  'sem-result-portal': {
    title: 'HITAM Autonomous Exam Portal — Results, Hall Tickets & CIE',
    category: 'Examination Portal — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
    isWide: true,
    getBody: () => generateExamPortalHTML()
  },

  'portals-all': {
    title: 'Unified Single Sign-On (SSO) Directory — All 3 Portals',
    category: 'Digital Portals — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    isWide: true,
    getBody: () => generatePortalsAllHTML()
  },

  // ITP (3+2) INTERNATIONAL PROGRAM & OVERSEAS DESK
  'itp-overview': {
    title: 'Integrated Twinning Program (ITP 3+2) — Academic Pathway',
    category: 'Global Degree Program — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    isWide: true,
    getBody: () => generateITPOverviewHTML()
  },

  'itp-partners': {
    title: 'Global Partner Universities (USA & Germany)',
    category: 'International Collaborations — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    isWide: true,
    getBody: () => generateITPPartnersHTML()
  },

  'itp-departments': {
    title: 'Eligible Departments & MS Specializations',
    category: 'Curriculum & Degree Mapping — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    isWide: true,
    getBody: () => generateITPDepartmentsHTML()
  },

  'itp-fees': {
    title: 'ITP Fee Structure & International Scholarship Aid',
    category: 'Financial Transparency — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/></svg>`,
    isWide: true,
    getBody: () => generateITPFeesHTML()
  },

  'itp-services': {
    title: 'Overseas MS Student Remote Services Desk',
    category: 'Alumni & Global Mobility — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    isWide: true,
    getBody: () => generateITPServicesHTML()
  },

  'itp-all': {
    title: 'ITP (3+2) International Program Directory — All 5 Modules',
    category: 'International Transfer Program — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    isWide: true,
    getBody: () => generateITPAllHTML()
  },

  // HERO STATS
  'students-info': {
    title: '5000+ Vibrant Student Community',
    category: 'Campus Statistics — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    body: `
      <div class="drill-hero-banner" style="height:180px; margin-bottom:14px;">
        <img class="drill-hero-img" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80" alt="Students at HITAM">
        <div class="drill-hero-overlay">
          <div class="drill-hero-title">5,000+ Future-Ready Engineers</div>
          <div class="drill-hero-sub">Representing 18+ Indian States &amp; International Chapters</div>
        </div>
      </div>
      <p>HITAM is home to over 5,000 enthusiastic engineering students representing diverse cultures and regions across India. Our students excel in national hackathons, collegiate robotics competitions, cultural fests, and global placements.</p>
      <div class="modal-grid-features">
        <div class="modal-feature-card"><strong>Diversity:</strong><span>Students from 18+ Indian states and union territories.</span></div>
        <div class="modal-feature-card"><strong>Gender Ratio:</strong><span>40% women engineers in STEM fields.</span></div>
        <div class="modal-feature-card"><strong>Mentorship:</strong><span>15:1 Student-to-Faculty mentor ratio for personalized counseling.</span></div>
        <div class="modal-feature-card"><strong>Success:</strong><span>High rate of higher education admits in US, UK, and Germany universities.</span></div>
      </div>
    `
  },

  'faculty-info': {
    title: '120+ Distinguished Faculty',
    category: 'Academic Excellence — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9z"/></svg>`,
    body: `
      <div class="drill-hero-banner" style="height:180px; margin-bottom:14px;">
        <img class="drill-hero-img" src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80" alt="HITAM Faculty">
        <div class="drill-hero-overlay">
          <div class="drill-hero-title">Distinguished Academic Mentors</div>
          <div class="drill-hero-sub">Ph.D. Researchers, Industry Veterans &amp; Patent Holders</div>
        </div>
      </div>
      <p>Our faculty members bring rich research pedigrees, industrial experience, and passionate teaching credentials from premier institutions including IITs and NITs.</p>
      <div class="modal-grid-features">
        <div class="modal-feature-card"><strong>Ph.D. Holders:</strong><span>45%+ doctorate faculty actively publishing in IEEE, Scopus &amp; SCI journals.</span></div>
        <div class="modal-feature-card"><strong>Industry Veterans:</strong><span>Faculty with 10+ years corporate experience in top MNCs.</span></div>
        <div class="modal-feature-card"><strong>Patents:</strong><span>Over 50+ published research patents in sustainable technologies.</span></div>
        <div class="modal-feature-card"><strong>Pedagogy:</strong><span>Certified in IUCEE (Indo-Universal Collaboration for Engineering Education).</span></div>
      </div>
    `
  },

  'programs-info': {
    title: '25+ Undergraduate & Specialization Programs',
    category: 'Academics — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z"/></svg>`,
    body: `
      <div class="drill-hero-banner" style="height:180px; margin-bottom:14px;">
        <img class="drill-hero-img" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80" alt="HITAM Academic Programs">
        <div class="drill-hero-overlay">
          <div class="drill-hero-title">Future-Ready Engineering Degrees</div>
          <div class="drill-hero-sub">AI, Data Science, VLSI, Robotics, Green Energy</div>
        </div>
      </div>
      <p>Curriculum structured around future-ready technologies, interdisciplinary minors, honors degrees, and hands-on capstone projects.</p>
      <div class="modal-grid-features">
        <div class="modal-feature-card"><strong>Emerging Tech:</strong><span>AI, ML, Data Science, Cyber Security, IoT, Cloud Computing.</span></div>
        <div class="modal-feature-card"><strong>Core Engineering:</strong><span>ECE, Mechanical, Electrical &amp; Electronics, Civil.</span></div>
        <div class="modal-feature-card"><strong>Honors Tracks:</strong><span>Robotics &amp; Automation, EV Powertrains, Smart Grid Systems.</span></div>
        <div class="modal-feature-card"><strong>Industry Certifications:</strong><span>AWS Cloud, Cisco CCNA, Salesforce, Microsoft Azure.</span></div>
      </div>
    `
  },

  'placements-info': {
    title: 'Career Guidance & Placements — Corporate Recruitment & Placed Students',
    category: 'Career & Placements — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
    isWide: true,
    getBody: () => generatePlacementsHTML()
  },

  'admissions-info': {
    title: 'B.Tech Admissions & Counselling Guidance',
    category: 'Admissions & Enrolment — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z"/></svg>`,
    body: `
      <p>Admissions to B.Tech four-year undergraduate engineering degree programs are conducted under Convener Quota (TG EAPCET) and Management / NRI Quota following TSCHE and JNTUH norms.</p>
      <div class="modal-highlight-box">
        <strong>TG EAPCET Counselling Code:</strong> <span style="color:#08752f; font-weight:800">HITM</span> | Hyderabad Institute of Technology and Management
      </div>
      <div class="modal-grid-features">
        <div class="modal-feature-card"><strong>Academic Eligibility:</strong><span>10+2 / Intermediate with Mathematics, Physics &amp; Chemistry (minimum 45% aggregate; 40% for reserved categories).</span></div>
        <div class="modal-feature-card"><strong>Admissions Helpdesk:</strong><span>+91 92487 11150 / 11151 • admissions@hitam.org</span></div>
        <div class="modal-feature-card"><strong>Campus Location:</strong><span>Gowdavelly (V), Near Kompally, Medchal, Medchal-Malkajgiri Dist, Telangana – 501401.</span></div>
        <div class="modal-feature-card"><strong>Institutional Status:</strong><span>UGC Autonomous, Affiliated to JNTU Hyderabad, Approved by AICTE, NAAC A+ Grade.</span></div>
      </div>
    `
  },

  'scholarship-info': {
    title: 'Merit & Need-Based Scholarships',
    category: 'Financial Aid & Grants — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/></svg>`,
    body: `
      <p>HITAM supports deserving students through various merit-based concessions, institutional grants, and government fee reimbursement coordination.</p>
      <div class="modal-grid-features">
        <div class="modal-feature-card"><strong>TG EAPCET Rank Concessions:</strong><span>Tuition fee concessions for top-ranking state rankers (subject to annual policy).</span></div>
        <div class="modal-feature-card"><strong>Sports &amp; Extracurricular Grants:</strong><span>Concessions for state and national medal-winning student athletes.</span></div>
        <div class="modal-feature-card"><strong>Women in STEM Concessions:</strong><span>Special encouragement initiatives for meritorious female engineering candidates.</span></div>
        <div class="modal-feature-card"><strong>Govt Reimbursement:</strong><span>Full facilitation for Telangana State e-PASS post-matric scholarship schemes.</span></div>
      </div>
    `
  }
};