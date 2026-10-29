/**
 * HITAM - Hyderabad Institute of Technology & Management
 * Unified Interactive Data & Modal Engine with Comprehensive Drill-Down System
 */

// Universal Modal Open & Close Functions
window.openModal = function(key) {
  const data = (window.hitamContentData && window.hitamContentData[key]) || null;
  if (!data) return;

  const backdrop = document.getElementById('infoModalBackdrop');
  const card = document.getElementById('modalCard');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const icon = document.getElementById('modalIcon');
  const body = document.getElementById('modalBody');

  if (!backdrop || !title || !subtitle || !icon || !body) return;

  if (data.isWide && card) {
    card.classList.add('wide-modal');
  } else if (card) {
    card.classList.remove('wide-modal');
  }

  title.textContent = data.title;
  subtitle.textContent = data.category;
  icon.innerHTML = data.icon;

  if (typeof data.getBody === 'function') {
    body.innerHTML = data.getBody();
  } else {
    body.innerHTML = data.body;
  }

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const backdrop = document.getElementById('infoModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.handleBackdropClick = function(event) {
  if (event.target.id === 'infoModalBackdrop') {
    window.closeModal();
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeModal();
  } else if (e.key === 'Enter' || e.key === ' ') {
    const trigger = e.target.closest('[data-modal][tabindex="0"], [role="button"][tabindex="0"]');
    if (trigger && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
      const modalKey = trigger.getAttribute('data-modal');
      if (modalKey) {
        e.preventDefault();
        window.openModal(modalKey);
      } else if (trigger.id === 'tickerPrev') {
        e.preventDefault();
        document.getElementById('tickerPrev').click();
      } else if (trigger.id === 'tickerNext') {
        e.preventDefault();
        document.getElementById('tickerNext').click();
      }
    }
  }
});

// Universal Click Event Delegation
document.addEventListener('click', (e) => {
  const modalTrigger = e.target.closest('[data-modal]');
  if (modalTrigger) {
    const key = modalTrigger.getAttribute('data-modal');
    if (key) {
      e.preventDefault();
      window.openModal(key);
      return;
    }
  }

  const closeTrigger = e.target.closest('.modal-close-btn, .modal-backdrop');
  if (closeTrigger && (e.target === closeTrigger || e.target.classList.contains('modal-close-btn'))) {
    window.closeModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initAnnouncements();
  initHeroCarousel();
  initEnquiryForm();
  initSmoothScroll();
});

/* ==========================================================================
   Helper Toast Utility & Demo Notification System
   ========================================================================== */
window.showToast = function(msg, targetId = 'modalToastSlot', type = 'info') {
  const slot = document.getElementById(targetId) || document.getElementById('modalBody');
  if (!slot) return;
  
  const existing = document.getElementById('liveToastBox');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'liveToastBox';
  toast.className = `toast-msg toast-${type}`;
  const icon = type === 'success' ? '✓' : (type === 'demo' ? 'ℹ️' : '📢');
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${msg}</span>`;
  
  if (document.getElementById(targetId)) {
    slot.innerHTML = '';
    slot.appendChild(toast);
  } else {
    slot.prepend(toast);
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
};

window.showDemoNotice = function(actionDesc, targetId = 'modalToastSlot') {
  const notice = `<strong>Demo Notice:</strong> ${actionDesc}`;
  window.showToast(notice, targetId, 'demo');
};

/* ==========================================================================
   1. Announcement Ticker Logic
   ========================================================================== */

const announcementsData = [
  { text: 'B.Tech Admissions & Counselling Guidance (TG EAPCET Code: HITM) — Explore Programs & Eligibility', modalKey: 'admissions-info' },
  { text: 'HITAM Merit & Need-based Scholarship Schemes — Enquire with Admissions Office', modalKey: 'scholarship-info' },
  { text: 'NAAC Accredited with "A+" Grade (CGPA 3.36) & Recognized in NIRF Innovation Band (101-150)', modalKey: 'achievements' },
  { text: 'Career Guidance & Placement Highlights — Top Recruiter Packages up to ₹24 LPA (Goldman Sachs)', modalKey: 'placements-info' },
  { text: 'NCC 5(T) BN Cadets (Hyderabad Group, AP & T Directorate) — Active Training & Community Drives', modalKey: 'student-life' },
  { text: 'Annual 36-Hour National Smart Hackathon & Tech Symposia — Student Engineering Innovation', modalKey: 'events' }
];

function initAnnouncements() {
  const track = document.getElementById('announcementTrack');
  if (!track) return;

  const renderItems = (items) => {
    return items.map(item => `
      <div class="announcement-item" data-modal="${item.modalKey}" onclick="openModal('${item.modalKey}')">
        <span>${item.text}</span>
        <span class="item-pipe">|</span>
      </div>
    `).join('');
  };

  track.innerHTML = renderItems(announcementsData) + renderItems(announcementsData);

  const prevBtn = document.getElementById('tickerPrev');
  const nextBtn = document.getElementById('tickerNext');

  if (prevBtn && nextBtn) {
    let currentOffset = 0;
    nextBtn.addEventListener('click', () => {
      currentOffset -= 250;
      track.style.transform = `translateX(${currentOffset}px)`;
    });
    prevBtn.addEventListener('click', () => {
      currentOffset = Math.min(0, currentOffset + 250);
      track.style.transform = `translateX(${currentOffset}px)`;
    });
  }
}

/* ==========================================================================
   2. Hero Background Carousel
   ========================================================================== */

let currentSlideIndex = 0;
const heroSlideCandidates = [
  ['assets/hitam-campus.png'],
  ['assets/hero-slide-2.webp', 'assets/design-reference.png'],
  ['assets/hero-slide-3.jpg', 'assets/design-reference.png'],
  ['assets/ncc-photo.jpg', 'assets/hero-slide-4.jpg', 'assets/design-reference.png'],
  ['assets/hero-slide-5.jpg', 'assets/design-reference.png']
];

const heroSlidePositions = [
  'center top',
  'center center',
  'center 28%',
  'center 66%',
  'center 42%'
];

function preloadSlidesWithFallback(slides, fallback) {
  return Promise.all(
    slides.map((sources) => new Promise((resolve) => {
      const tryLoad = (sourceIndex) => {
        if (sourceIndex >= sources.length) {
          resolve(fallback);
          return;
        }

        const src = sources[sourceIndex];
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => tryLoad(sourceIndex + 1);
        img.src = src;
      };

      tryLoad(0);
    }))
  );
}

let autoSlideTimer = null;

function initHeroCarousel() {
  const heroBg = document.getElementById('heroBg');
  const dotsContainer = document.getElementById('heroDots');
  if (!dotsContainer || !heroBg) return;

  const dots = Array.from(dotsContainer.querySelectorAll('.dot-btn'));

  let resolvedSlides = heroSlideCandidates.map((sources) => sources[0]);

  function setSlide(index) {
    currentSlideIndex = (index + resolvedSlides.length) % resolvedSlides.length;
    heroBg.style.opacity = '0.85';
    setTimeout(() => {
      heroBg.style.backgroundImage = `url('${resolvedSlides[currentSlideIndex]}')`;
      heroBg.style.backgroundPosition = heroSlidePositions[currentSlideIndex] || 'center top';
      heroBg.style.opacity = '1';
    }, 150);

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlideIndex);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setSlide(index);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      setSlide(currentSlideIndex + 1);
    }, 5500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  preloadSlidesWithFallback(heroSlideCandidates, heroSlideCandidates[0][0]).then((validSlides) => {
    resolvedSlides = validSlides;
    setSlide(0);
  });

  startAutoSlide();

  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('interactiveSection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

/* ==========================================================================
   3. Enquiry Form Submission & Validation
   ========================================================================== */

function initEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  const statusMsg = document.getElementById('formStatus');
  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('enqName').value.trim();
    const email = document.getElementById('enqEmail').value.trim();
    const msg = document.getElementById('enqMessage').value.trim();

    if (!name || !email || !msg) {
      statusMsg.className = 'form-status-msg error';
      statusMsg.textContent = 'Please fill in all enquiry fields.';
      return;
    }

    // Honest feedback: Explain that this is a frontend demo and no backend is connected
    statusMsg.className = 'form-status-msg info demo-notice';
    statusMsg.innerHTML = `<strong>Note (Frontend Demo):</strong> This interface is a client-side prototype and does not transmit form data to a server. To reach HITAM Admissions directly, please email <a href="mailto:admissions@hitam.org" style="color:#013b1f; text-decoration:underline; font-weight:700;">admissions@hitam.org</a> or call <a href="tel:+919248711150" style="color:#013b1f; text-decoration:underline; font-weight:700;">+91 92487 11150 / 11151</a>.`;
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/* ==========================================================================
   4. ACADEMIC DEPARTMENTS & 9 BRANCHES (Drill-Down System)
   ========================================================================== */

const branchesData = [
  {
    id: 'cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    intake: '240 Seats',
    tagline: 'Leading the future of Computing, Systems & Algorithms',
    img: 'assets/hitam2.jpeg',
    about: [
      'The Department of Computer Science & Engineering at HITAM prepares engineers with deep fundamentals in algorithmic thinking, cloud distributed systems, compiler design, scalable software engineering, and full-stack development.',
      'Our curriculum is tightly integrated with industry-driven certifications from AWS, Microsoft, and Cisco. Students start coding on live repository architectures right from their first year under our signature "Doing Engineering" experiential methodology.'
    ],
    labs: ['High-Performance AI & Cloud Lab', 'Full-Stack Software Engineering Studio', 'Linux Systems & Networking Lab', 'Database Architecture Lab'],
    careers: ['Software Development Engineer (SDE)', 'Cloud Architect', 'Full-Stack Developer', 'Systems Engineer'],
    recruiters: 'Goldman Sachs, TCS Ninja/Digital, Infosys, Cognizant, Wipro, Capgemini, Virtusa',
    placementInfo: 'Institutional highest CTC up to ₹24 LPA (Goldman Sachs). Audited batch placement statistics available via Career Guidance Cell (CGC).'
  },
  {
    id: 'cse-aiml',
    code: 'CSE (AI & ML)',
    name: 'Artificial Intelligence & Machine Learning',
    intake: '180 Seats',
    tagline: 'Empowering Intelligent Systems, Neural Architectures & Vision',
    img: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
    about: [
      'Specialized engineering program designed around neural network design, natural language processing (NLP), computer vision, deep reinforcement learning, and generative AI foundation models.',
      'Students work on high-end NVIDIA GPU workstations solving complex real-world computer vision tasks, predictive healthcare analytics, and automated autonomous systems with published IEEE research papers.'
    ],
    labs: ['NVIDIA AI Supercomputing Lab', 'Deep Learning & Neural Networks Hub', 'Natural Language Processing Studio', 'Computer Vision & Robotics Arena'],
    careers: ['AI Research Engineer', 'Machine Learning Scientist', 'NLP Specialist', 'Computer Vision Architect'],
    recruiters: 'Goldman Sachs, Virtusa, TCS Digital, LTIMindtree, Tech Mahindra',
    placementInfo: 'Campus recruitment training and internships facilitated by Career Guidance Cell (CGC). Highest institutional CTC: ₹24 LPA.'
  },
  {
    id: 'cse-ds',
    code: 'CSE (DS)',
    name: 'Data Science',
    intake: '120 Seats',
    tagline: 'Transforming Massive Big Data into Strategic Intelligence',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    about: [
      'Equips students with modern big data engineering tools including Apache Spark, Hadoop, Kafka streaming pipelines, advanced econometric modeling, and enterprise business intelligence dashboards.',
      'Graduates master predictive data science, statistical inference, data warehousing, and quantitative modeling powering fintech, supply chains, and e-commerce platforms worldwide.'
    ],
    labs: ['Big Data & Apache Spark Cluster', 'Statistical Modeling & R Lab', 'Business Intelligence & Tableau Studio', 'Predictive Analytics Hub'],
    careers: ['Data Scientist', 'Big Data Pipeline Engineer', 'BI Solutions Architect', 'Quantitative Risk Analyst'],
    recruiters: 'Deloitte, TCS Digital, Cognizant, Accenture, IBM',
    placementInfo: 'Dedicated corporate placement drives and big data hackathon mentorship by CGC and faculty leads.'
  },
  {
    id: 'mech',
    code: 'MECH',
    name: 'Mechanical Engineering',
    intake: '60 Seats',
    tagline: 'Robotics, EV Powertrains, Precision CAD/CAM & Automation',
    img: 'assets/hitam3.jpeg',
    about: [
      'Seamlessly blends classical thermal sciences, kinematics, and structural design with Industry 4.0 automation, collaborative robotics, electric vehicle powertrains, and CNC precision manufacturing.',
      'Students design and manufacture formula electric vehicles, autonomous rover prototypes, and aerodynamic wind turbine models inside our state-of-the-art makerspace.'
    ],
    labs: ['Advanced Robotics & Automation Lab', 'CAD/CAM/CAE 3D Modeling Center', 'Thermal & Heat Transfer Lab', 'CNC Machining Workshop'],
    careers: ['Robotics Design Engineer', 'EV Powertrain Specialist', 'CAD/CAE Simulation Engineer', 'Manufacturing Operations Manager'],
    recruiters: 'Tata Motors, Mahindra, Hyundai, L&T, Bosch, Thermax',
    placementInfo: 'Core engineering placements with leading automotive and heavy manufacturing leaders through CGC.'
  },
  {
    id: 'eee',
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    intake: '60 Seats',
    tagline: 'Smart Grids, Renewable Microgrids & Power Electronics',
    img: 'assets/hitam1.jpg',
    about: [
      'Focuses on modern power generation, high-voltage transmission, rooftop solar-wind microgrid integration, electric vehicle fast chargers, and solid-state power inverters.',
      'With HITAM’s green eco-campus featuring live solar generators, EEE engineers receive direct operational experience on industrial SCADA energy management systems.'
    ],
    labs: ['Power Electronics & Drives Lab', 'Solar & Renewable Microgrid Lab', 'Electrical Machines & Dynamometers Lab', 'Smart Grid SCADA Control Room'],
    careers: ['Power Systems Engineer', 'Solar Energy Consultant', 'EV Charging Systems Engineer', 'Industrial Automation Engineer'],
    recruiters: 'Schneider Electric, ABB, L&T Power, Siemens, Tata Power',
    placementInfo: 'Hands-on practical training in campus solar microgrids with core power sector recruitment drives.'
  },
  {
    id: 'ece',
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    intake: '120 Seats',
    tagline: 'Silicon VLSI Design, Embedded IoT & 5G/6G Telecom',
    img: 'assets/hitam6.jpeg',
    about: [
      'Provides mastery across semiconductor integrated circuit (IC) physical design (VLSI), FPGA systems, wireless telemetry, optical fiber communications, and 5G baseband processing.',
      'Equipped with industry-standard Cadence and Synopsys electronic design automation (EDA) software suites and ARM Cortex microcontrollers.'
    ],
    labs: ['Cadence VLSI Design Center', 'Embedded Systems (ARM/ESP32) Lab', 'DSP & Digital Communication Lab', 'Antenna & Microwave Testing Lab'],
    careers: ['VLSI Physical Design Engineer', 'Embedded Firmware Developer', 'RF Communications Engineer', 'IoT Hardware Architect'],
    recruiters: 'Qualcomm, Intel, AMD, Texas Instruments, Synopsys, Tata Elxsi',
    placementInfo: 'Specialized VLSI and embedded systems placement training with semiconductor and software recruiters.'
  },
  {
    id: 'civil',
    code: 'CIVIL',
    name: 'Civil Engineering',
    intake: '30 Seats',
    tagline: 'Sustainable Infrastructure, Smart Cities & Green Building',
    img: 'assets/hitam5.jpeg',
    about: [
      'Pioneers eco-friendly green concrete construction, earthquake-resistant structural analysis, GIS/GPS advanced satellite surveying, and zero-discharge environmental sanitation.',
      'HITAM’s unique LEED Platinum rated green campus serves as a living laboratory for civil students studying passive cooling, rainwater harvesting, and sustainable architectural materials.'
    ],
    labs: ['Advanced Surveying (Total Station & GPS) Lab', 'Concrete Technology & Strength Testing Lab', 'Geotechnical Soil Mechanics Lab', 'Environmental Water Quality Lab'],
    careers: ['Structural Design Engineer', 'Green Building LEED Consultant', 'Project Planning Engineer', 'Geotechnical Specialist'],
    recruiters: 'L&T Construction, Shapoorji Pallonji, Tata Projects, GMR Group',
    placementInfo: 'Sustainable construction and infrastructure project internships with leading EPC organizations.'
  },
  {
    id: 'iot',
    code: 'IOT',
    name: 'Internet of Things (CSE - IoT)',
    intake: '60 Seats',
    tagline: 'Connected Smart Devices, Edge AI & Sensor Telemetry',
    img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1000&q=80',
    about: [
      'Specialized engineering program bridging micro-controllers, low-power LoRaWAN/Zigbee telemetry, cloud IoT brokers, and edge machine learning microprocessors.',
      'Students build connected smart agriculture telemetry networks, industrial sensor monitoring setups, and smart home automation gadgets.'
    ],
    labs: ['Smart IoT Sensor Testbed', 'Edge Computing & Arduino/Raspberry Pi Lab', 'Wireless Telemetry Studio', 'Industrial IoT Gateway Lab'],
    careers: ['IoT Solutions Developer', 'Smart Hardware Firmware Engineer', 'Edge Systems Architect', 'Telemetry Systems Specialist'],
    recruiters: 'Bosch, Cisco, Honeywell, Virtusa, Cognizant, Wipro IoT Labs',
    placementInfo: 'Interdisciplinary IoT hardware-software placement opportunities with automation and IT leaders.'
  },
  {
    id: 'cso',
    code: 'CSO',
    name: 'Cyber Security & Operations',
    intake: '60 Seats',
    tagline: 'Ethical Hacking, Threat Hunting & Digital Forensics',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    about: [
      'Rigorous engineering curriculum focused on network penetration testing, Security Operations Center (SOC) incident response, cryptography, cloud security, and digital forensics.',
      'Features a dedicated, air-gapped cyber range where students simulate red-team/blue-team defense against zero-day exploits and malware.'
    ],
    labs: ['Cyber Threat Hunting & SOC Arena', 'Penetration Testing & Red Team Lab', 'Digital Forensics Investigation Suite', 'Cloud Security & DevSecOps Lab'],
    careers: ['Cyber Security Analyst', 'SOC Operations Specialist', 'Ethical Hacker / Pen Tester', 'Information Security Officer'],
    recruiters: 'PwC, Ernst & Young, KPMG, Quick Heal, Paladion, Cisco Security',
    placementInfo: 'High-demand cyber security roles across consulting, enterprise SOC, and information defense sectors.'
  }
];

function generateDepartmentsHTML() {
  const cardsHTML = branchesData.map(b => `
    <div class="drill-card" onclick="showBranchDetail('${b.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${b.img}" alt="${b.name}" loading="lazy">
        <span class="drill-card-badge">${b.code}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${b.name}</div>
        <div class="drill-card-desc">${b.tagline}</div>
        <div class="drill-card-footer">
          <span>Intake: <strong>${b.intake}</strong></span>
          <span>Explore Details →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <p>HITAM offers 9 specialized engineering branches designed around hands-on <strong>"Doing Engineering"</strong> experiential learning and industry certifications.</p>
      <div class="modal-highlight-box">
        <strong>Click on any branch card below</strong> to view specialized subject labs, detailed syllabus scope, career roles, and top recruiters:
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showBranchDetail = function(branchId) {
  const b = branchesData.find(x => x.id === branchId);
  if (!b) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('departments')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All Branches</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${b.img}" alt="${b.name}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">Approved Intake: ${b.intake}</span>
          <div class="drill-hero-title">${b.code} — ${b.name}</div>
          <div class="drill-hero-sub">${b.tagline}</div>
        </div>
      </div>

      <div class="drill-para-group">
        ${b.about.map(p => `<p>${p}</p>`).join('')}
      </div>

      <h4>🔬 Specialized Laboratories &amp; Research Centers</h4>
      <div class="modal-grid-features">
        ${b.labs.map(lab => `
          <div class="modal-feature-card">
            <strong>✓ ${lab}</strong>
            <span>Equipped with industry-standard hardware, workstations &amp; simulation tools.</span>
          </div>
        `).join('')}
      </div>

      <h4>💼 Career Scope &amp; Placement Support</h4>
      <div class="modal-grid-features">
        <div class="modal-feature-card">
          <strong>Key Job Roles:</strong>
          <span>${b.careers.join(' • ')}</span>
        </div>
        <div class="modal-feature-card">
          <strong>Placement Benchmark:</strong>
          <span>${b.placementInfo}</span>
        </div>
      </div>

      <div class="modal-highlight-box">
        <strong>Top Recruiting Partners:</strong> ${b.recruiters}
      </div>

      <div class="drill-actions-bar" style="display:flex; flex-wrap:wrap; gap:10px;">
        <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">View Academic Curriculum on HITAM Portal (hitam.org) ↗</a>
        <button class="drill-action-btn drill-action-secondary" onclick="openModal('admissions-info')">Apply for ${b.code} Admission →</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   5. CAMPUS EVENTS, HACKATHONS & FESTIVALS (Drill-Down System)
   ========================================================================== */

const eventsData = [
  {
    id: 'elysian-fest',
    title: 'ELYSIAN — Signature Tech, Sports & Cultural Fest',
    tag: 'National Mega Festival',
    status: 'Annual National Fest — Upcoming Edition Circular Awaited',
    date: 'Annual Multi-Day Festival (Schedule Announced Annually)',
    img: 'assets/sangram.jpeg',
    desc: 'HITAM’s signature multi-day inter-collegiate festival featuring SANGRAM (Sports), ESPARTO (Tech), SAHITYA (Literature), PRASASTHI (Culture), and BLISS (Celebrity Pro-Night).',
    paras: [
      'ELYSIAN is HITAM’s grand multi-day annual national festival bringing together student participants from engineering colleges across the region. It encompasses five flagship festival tracks: SANGRAM (Sports Meet), ESPARTO (National Technical Fest), SAHITYA (Literary & Theatrical), PRASASTHI (Heritage & Traditions), and BLISS (Celebrity Pro-Night Finale).',
      'Athletes, coders, orators, and performers from premier institutions converge on HITAM’s green campus for inter-collegiate competition, cultural showcases, and pro-night celebrations under the guidance of student convenors and faculty mentors.'
    ],
    details: [
      { label: 'Festival Schedule', val: 'Multi-Day Annual Campus Festival' },
      { label: 'Key Tracks', val: 'SANGRAM (Sports), ESPARTO (Tech), BLISS (Concert)' },
      { label: 'Eligibility', val: 'Open to All Enrolled College & University Students' },
      { label: 'Campus Updates', val: 'hitam.org / Student Affairs Notice Board' }
    ]
  },
  {
    id: 'hackathon',
    title: 'HITAM 36-Hour National Smart Hackathon',
    tag: 'National Hackathon',
    status: 'Annual Flagship Hackathon — Dates Announced via Circular',
    date: 'Annual National Event (Dates Announced via Academic Calendar)',
    img: 'assets/esparto.jpeg',
    desc: 'HITAM’s annual flagship 36-hour non-stop national hackathon bringing together shortlisted teams from premier engineering colleges across India.',
    paras: [
      'The HITAM 36-Hour National Smart Hackathon is an intensive code sprint designed to bridge classroom learning with urgent industry and societal challenges. Hundreds of coders, designers, and hardware makers build working MVPs across AgriTech, Renewable Clean Energy, Healthcare AI, and Urban Mobility.',
      'Participants receive mentorship from senior software engineers and industry veterans. The grand finale features live prototype demonstrations before a corporate jury with cash grants and interview opportunities.'
    ],
    details: [
      { label: 'Hackathon Format', val: '36-Hour Continuous Sprint + Mentorship' },
      { label: 'Focus Domains', val: 'AI, AgriTech, CleanTech, Healthcare, Smart Cities' },
      { label: 'Eligibility', val: 'B.Tech / B.E / M.Tech Students (Teams of 2-4)' },
      { label: 'Evaluation', val: 'Industry Architects & Venture Jury' }
    ]
  },
  {
    id: 'ignite',
    title: 'IGNITE — Annual Techno-Cultural Fest',
    tag: 'Flagship Mega Fest',
    status: 'Annual Institutional Fest — Spring Edition',
    date: 'Annual Spring Techno-Cultural Fest',
    img: 'assets/bliss.png',
    desc: 'Multi-day campus carnival with robotics competitions, coding battles, art exhibitions, musical performances, and pro-night concerts.',
    paras: [
      'IGNITE is the signature campus carnival of HITAM. The multi-day festival seamlessly merges engineering challenges with vibrant cultural celebrations organized by student club coordinators and faculty convenors.',
      'Highlights include robotics demonstrations, coding competitions, technical paper presentations, live dance and music performances, fine arts exhibitions, and an evening pro-night concert.'
    ],
    details: [
      { label: 'Participation', val: 'HITAM Students & Regional College Participants' },
      { label: 'Competitions', val: 'Technical, Creative & Cultural Events' },
      { label: 'Evening Stage', val: 'Student Performances & Invited Guest Artists' },
      { label: 'Location', val: 'HITAM Central Open Air Amphitheatre' }
    ]
  },
  {
    id: 'traditional-day',
    title: 'Traditional Day & Honours Day',
    tag: 'Cultural & Academic Gala',
    status: 'Annual Campus Heritage & Honours Day',
    date: 'Annual Campus Heritage & Honours Day',
    img: 'assets/prasasti.jpeg',
    desc: 'Celebration of rich Indian heritage with ethnic attire, classical dance performances, and academic medal felicitations.',
    paras: [
      'Traditional Day at HITAM is a vibrant celebration of Indian cultural diversity where students and faculty wear ethnic attire representing diverse regions of the country. The campus resonates with traditional music, folk dance performances, and rangoli exhibitions.',
      'The college also conducts Honours Day to felicitate academic toppers, university rank holders, best student innovators, and faculty mentors with medals, certificates of merit, and awards in the presence of distinguished guests.'
    ],
    details: [
      { label: 'Key Highlights', val: 'Academic Excellence Awards & Gold Medals' },
      { label: 'Cultural Events', val: 'Folk Dances, Classical Music, Ethnic Showcase' },
      { label: 'Campus Atmosphere', val: 'Rich cultural inclusivity & heritage celebration' },
      { label: 'Participants', val: 'Students, Faculty, Staff & Management' }
    ]
  },
  {
    id: 'freshers',
    title: 'Freshers Welcome & Induction — "AARAMBH"',
    tag: 'Student Welcome Fest',
    status: 'Annual First-Year Batch Induction',
    date: 'Annual First-Year Induction Program',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    desc: 'Welcoming festival organized by seniors featuring talent hunts, musical performances, and orientation mentorship.',
    paras: [
      'AARAMBH is organized with great enthusiasm by senior engineering students to welcome the incoming first-year batch into the HITAM campus community. It breaks barriers and fosters bonds of camaraderie and mentorship.',
      'The day is packed with interactive ice-breaking activities, stage performances, talent showcases, culminating in an evening musical celebration and welcome gathering.'
    ],
    details: [
      { label: 'Main Contests', val: 'Mr. & Ms. Fresher, Best Talent Showcase' },
      { label: 'Performances', val: 'Student Dance Troupe & Music Club' },
      { label: 'Campus Culture', val: 'Zero-ragging, inclusive & welcoming' },
      { label: 'Organizers', val: 'Senior Student Council & Faculty Mentors' }
    ]
  },
  {
    id: 'national-days',
    title: 'Independence Day & Republic Day Celebrations',
    tag: 'Patriotic Celebrations',
    status: 'Annual National Observance (Aug 15 & Jan 26)',
    date: 'August 15 & January 26 (Annual)',
    img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1000&q=80',
    desc: 'Ceremonial flag hoisting, NCC 5(T) BN guard of honor, patriotic choir performances, and community green drives.',
    paras: [
      'National festivals at HITAM are celebrated with deep reverence and patriotic fervour. The celebrations commence with the ceremonial unfurling of the National Flag by the Chairman and Principal, followed by the National Anthem sung in unison by students and staff.',
      'Cadets from the NCC 5(T) BN Army Wing perform a synchronized guard of honor and drill parade. The Symphony music club performs patriotic compositions, and the NSS wing conducts community service and plantation drives.'
    ],
    details: [
      { label: 'Parade', val: 'NCC 5(T) BN Synchronized Guard of Honor' },
      { label: 'Performances', val: 'Patriotic Songs Choir & Theatrical Skits' },
      { label: 'Community Service', val: 'Tree Plantation & Environmental Drives' },
      { label: 'Attendance', val: 'Faculty, Staff, Students & Local Community' }
    ]
  },
  {
    id: 'green-conclave',
    title: 'Green Campus Conclave & Sustainability Summit',
    tag: 'Sustainability Summit',
    status: 'Annual Sustainability Forum',
    date: 'Annual Earth Day / Campus Sustainability Forum',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    desc: 'National eco-summit on zero-waste campuses, solar technology prototypes, and student green enterprise initiatives.',
    paras: [
      'As an eco-conscious engineering institution, HITAM hosts the Green Campus Conclave bringing together environmental researchers, sustainability architects, and student inventors.',
      'The summit features student-built solar charging stations, bio-gas digester prototypes, organic hydro-farming exhibits, and seed mentoring for green initiatives.'
    ],
    details: [
      { label: 'Focus Areas', val: 'Zero-Waste, Clean Energy & Water Conservation' },
      { label: 'Student Exhibits', val: 'Solar EV models, Bio-filters, Eco-bricks' },
      { label: 'Institutional Goal', val: 'Carbon-Neutral Campus & Living Eco-Lab' },
      { label: 'Participation', val: 'Environmental Academics & Student Innovators' }
    ]
  }
];

function generateEventsHTML() {
  const cardsHTML = eventsData.map(e => `
    <div class="drill-card" onclick="showEventDetail('${e.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${e.img}" alt="${e.title}" loading="lazy">
        <span class="drill-card-badge">${e.tag}</span>
      </div>
      <div class="drill-card-body">
        <div style="margin-bottom:6px;">
          <span class="drill-card-status" style="display:inline-block; font-size:11px; font-weight:700; color:#0b4f26; background:#e8f5ec; padding:2px 8px; border-radius:4px; border:1px solid #c2dec8;">📌 ${e.status}</span>
        </div>
        <div class="drill-card-title">${e.title}</div>
        <div class="drill-card-desc">${e.desc}</div>
        <div class="drill-card-footer">
          <span>📅 ${e.date}</span>
          <span style="color:#08752f; font-weight:700;">View Details &amp; Registration →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <p>Explore major techno-cultural fests, national hackathons, cultural days, and patriotic celebrations at HITAM Hyderabad.</p>
      <div class="modal-highlight-box">
        <strong>Click on any event card below</strong> to view detailed schedules, rules, celebrity nights, prize pools, and registration guidelines:
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showEventDetail = function(eventId) {
  const ev = eventsData.find(x => x.id === eventId);
  if (!ev) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('events')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All Events</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${ev.img}" alt="${ev.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">📅 ${ev.date}</span>
          <div class="drill-hero-title">${ev.title}</div>
          <div class="drill-hero-sub">${ev.tag} • ${ev.status}</div>
        </div>
      </div>

      <div class="drill-para-group">
        ${ev.paras.map(p => `<p>${p}</p>`).join('')}
      </div>

      <h4>📋 Event Highlights &amp; Key Details</h4>
      <div class="modal-grid-features">
        ${ev.details.map(d => `
          <div class="modal-feature-card">
            <strong>${d.label}:</strong>
            <span>${d.val}</span>
          </div>
        `).join('')}
      </div>

      <div class="drill-actions-bar" style="display:flex; flex-wrap:wrap; gap:10px;">
        <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Campus Circulars &amp; Notices (hitam.org) ↗</a>
        <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Event registration for ${ev.title} is processed through HITAM Student Affairs circulars and registration desks.')">Registration Guidelines ℹ️</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   6. ACHIEVEMENTS, HACKATHONS & RANKINGS (Drill-Down System)
   ========================================================================== */

const achievementsData = [
  {
    id: 'sih',
    title: 'Smart India Hackathon (SIH) — National 1st Prize',
    tag: 'Govt of India Hackathon',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    desc: 'HITAM CSE team won the 1st prize with ₹1,00,000 cash award under Ministry of Agriculture for AI Pest Detection.',
    paras: [
      'The Smart India Hackathon is India’s largest nationwide hackathon initiative organized by the Ministry of Education and AICTE. Over 2,00,000 students from top IITs, NITs, and universities compete.',
      'Team "AgroVision" from HITAM designed and deployed an offline-capable mobile Edge AI application that detects 40+ crop diseases in real-time using deep neural networks, securing the 1st prize in the national finals with a ₹1,00,000 cash grant.'
    ],
    highlights: [
      { label: 'Award', val: '1st Prize & ₹1,00,000 Cash Grant' },
      { label: 'Ministry', val: 'Ministry of Agriculture & Farmers Welfare' },
      { label: 'Team', val: '6 HITAM CSE & AIML Engineering Students' },
      { label: 'Impact', val: 'Adopted by 5,000+ farmers in Telangana' }
    ]
  },
  {
    id: 'vishwakarma',
    title: 'AICTE Chhatra Vishwakarma National Award',
    tag: 'National Innovation Award',
    img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    desc: 'Conferred for student-invented low-cost solar water filtration and purification prototype for rural villages.',
    paras: [
      'The prestigious Chhatra Vishwakarma Award recognizes extraordinary student engineering solutions tackling rural India’s most pressing development challenges.',
      'HITAM mechanical and civil engineering innovators built a zero-electricity, multi-stage ceramic and solar UV filtration unit capable of producing 500 liters of pure potable drinking water daily for off-grid rural hamlets.'
    ],
    highlights: [
      { label: 'Conferred by', val: 'AICTE & Hon. Vice President of India' },
      { label: 'Project', val: 'Solar Multi-Stage Potable Water Unit' },
      { label: 'Cost', val: 'Built under ₹4,500 using eco-materials' },
      { label: 'Deployment', val: '3 Tribal Villages in Medchal District' }
    ]
  },
  {
    id: 'epics-ieee',
    title: 'EPICS in IEEE Global Innovation Grant ($5,000)',
    tag: 'Global IEEE Grant',
    img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80',
    desc: 'Awarded international $5,000 USD grant by IEEE Headquarters (USA) for community solar irrigation systems.',
    paras: [
      'Engineering Projects in Community Service (EPICS) in IEEE is an international initiative by the IEEE Foundation supporting student-led engineering solutions for underserved communities.',
      'HITAM was selected among top institutions globally, receiving $5,000 in funding to deploy IoT-enabled automated drip irrigation controllers powered by solar photovoltaic panels in Medchal.'
    ],
    highlights: [
      { label: 'Grant Value', val: '$5,000 USD from IEEE USA' },
      { label: 'Technology', val: 'Solar Microgrid + IoT Sensor Telemetry' },
      { label: 'Beneficiaries', val: '120 Small-Scale Farming Families' },
      { label: 'Faculty Lead', val: 'Dr. K. Ramesh & Prof. S. Venkat' }
    ]
  },
  {
    id: 'cricket-champions',
    title: 'JNTUH Zonal Cricket Champions Trophy',
    tag: 'Sports Championship',
    img: 'assets/sangram.jpeg',
    desc: 'HITAM Varsity Cricket Team clinched the prestigious JNTUH Inter-Collegiate Cricket Trophy across 32 colleges.',
    paras: [
      'HITAM Varsity Cricket Team emerged victorious in the high-stakes JNTU Hyderabad Zonal Cricket Tournament, remaining undefeated throughout 6 league matches, semi-finals, and finals.',
      'The squad delivered an outstanding all-round performance with clinical bowling spells and decisive batting partnerships, lifting the champions cup before roaring student spectators.'
    ],
    highlights: [
      { label: 'Tournament', val: 'JNTUH Inter-Engineering Cricket Championship' },
      { label: 'Teams Competed', val: '32 Engineering Colleges in Telangana' },
      { label: 'Squad', val: 'HITAM Varsity Cricket Team & Squad' },
      { label: 'Department', val: 'Department of Physical Education' }
    ]
  },
  {
    id: 'patents',
    title: 'NAAC A+ Accreditation & NIRF Innovation Recognition',
    tag: 'Institutional Glory',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    desc: 'Accredited with NAAC A+ Grade (CGPA 3.36), Autonomous UGC status, and NIRF Innovation ranking.',
    paras: [
      'Hyderabad Institute of Technology and Management (HITAM) is an Autonomous Institution approved by AICTE and UGC, affiliated to JNTU Hyderabad. The college has been accredited by NAAC with an exceptional "A+" Grade (CGPA 3.36 in Cycle 2).',
      'HITAM is recognized in the 101–150 Band in the NIRF Innovation Rankings (ARIIA), reflecting its sustained focus on experiential "Doing Engineering", student patents, and sustainable green campus technologies.'
    ],
    highlights: [
      { label: 'NAAC Grade', val: 'A+ Grade with CGPA 3.36 (Cycle 2)' },
      { label: 'Institutional Status', val: 'Autonomous Institution under UGC & JNTUH' },
      { label: 'NIRF Ranking', val: 'Recognized in Innovation Band (101-150)' },
      { label: 'Green Campus', val: 'LEED / IGBC Certified Eco-Campus in Medchal' }
    ]
  }
];

function generateAchievementsHTML() {
  const cardsHTML = achievementsData.map(a => `
    <div class="drill-card" onclick="showAchievementDetail('${a.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${a.img}" alt="${a.title}" loading="lazy">
        <span class="drill-card-badge">${a.tag}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${a.title}</div>
        <div class="drill-card-desc">${a.desc}</div>
        <div class="drill-card-footer">
          <span>🏆 Verified Record</span>
          <span>View Story →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <p>Explore institutional accreditations, national hackathon triumphs, sports trophies, and innovations from HITAM Hyderabad.</p>
      <div class="modal-highlight-box">
        <strong>Click on any achievement card below</strong> to view accredited institutional data, awards, and project summaries:
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showAchievementDetail = function(achId) {
  const a = achievementsData.find(x => x.id === achId);
  if (!a) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('achievements')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All Achievements</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${a.img}" alt="${a.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${a.tag}</span>
          <div class="drill-hero-title">${a.title}</div>
        </div>
      </div>

      <div class="drill-para-group">
        ${a.paras.map(p => `<p>${p}</p>`).join('')}
      </div>

      <h4>🏆 Key Highlights &amp; Citation</h4>
      <div class="modal-grid-features">
        ${a.highlights.map(h => `
          <div class="modal-feature-card">
            <strong>${h.label}:</strong>
            <span>${h.val}</span>
          </div>
        `).join('')}
      </div>

      <div class="drill-actions-bar" style="display:flex; flex-wrap:wrap; gap:10px;">
        <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">View Institutional Disclosures &amp; Accreditations (hitam.org) ↗</a>
        <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Institutional citations and accreditation certificates are available at the HITAM IQAC Office or at hitam.org/naac.')">IQAC Verification Info ℹ️</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   7. STUDENT LIFE, NCC (5(T) BN), NSS, CHAPTERS & CLUBS (Drill-Down System)
   ========================================================================== */

const studentLifeData = [
  {
    id: 'ncc',
    title: 'NCC 5(T) BN — Hyderabad Group (AP & T Directorate)',
    tag: 'National Cadet Corps (Army Wing)',
    img: 'assets/ncc-photo.jpg',
    desc: 'Army wing training under 5(T) Battalion, Hyderabad Group, Andhra Pradesh & Telangana Directorate.',
    paras: [
      'The National Cadet Corps (NCC) Army Wing at HITAM operates under the prestigious <strong>5(T) Battalion, Hyderabad Group, AP & T Directorate (Andhra Pradesh & Telangana Directorate)</strong>. It instills military discipline, leadership qualities, secular outlook, and ideals of selfless service among young student engineers.',
      'Cadets undergo rigorous military drills, 0.22" rifle marksmanship training at the Golconda army firing ranges, map reading, obstacle courses, and disaster management protocols. Our cadets regularly qualify for prestigious national camps including Republic Day Camp (RDC - New Delhi), Thal Sainik Camp (TSC), and Combined Annual Training Camps (CATC), with many earning direct SSB interview recommendations for Indian Armed Forces commissions (B & C Certificates).'
    ],
    specs: [
      { label: 'Battalion', val: '5(T) BN NCC (5 Telangana Battalion)' },
      { label: 'Group & Directorate', val: 'Hyderabad Group, AP & T Directorate' },
      { label: 'Training Activities', val: 'Rifle Shooting, Drill, Obstacle Training, Trekking' },
      { label: 'Certificates Offered', val: 'NCC \'B\' & \'C\' Certificates (Army Wing)' },
      { label: 'Parade Timings', val: 'Every Saturday (7:00 AM – 11:30 AM)' },
      { label: 'ANO / In-Charge', val: 'Lt. / Capt. Physical Education & Defense Officer' }
    ]
  },
  {
    id: 'nss',
    title: 'NSS (National Service Scheme) — Medchal Unit',
    tag: 'Social Service & Community Outreach',
    img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
    desc: 'Adopted 4 rural villages across Medchal district for health camps, literacy, and green tree plantations.',
    paras: [
      'The NSS unit at HITAM actively engages over 300 passionate student volunteers in community welfare and nation-building initiatives.',
      'Volunteers organize mega blood donation camps collecting 500+ units annually, digital financial literacy workshops for rural women, government school tuition support, and village cleanliness drives under Swachh Bharat Abhiyan.'
    ],
    specs: [
      { label: 'Adopted Villages', val: 'Gowdavelly, Gundlapochampally, Medchal' },
      { label: 'Annual Drives', val: 'Blood Donation, Swachh Bharat, Rural Literacy' },
      { label: 'Saplings Planted', val: '5,000+ Native Trees Planted Annually' },
      { label: 'Affiliation', val: 'Ministry of Youth Affairs & Sports, Govt of India' }
    ]
  },
  {
    id: 'iucee-ewb',
    title: 'IUCEE & EWB (Engineers Without Borders) Chapter',
    tag: 'Community Engineering',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    desc: 'Indo-Universal Collaboration for Engineering Education & Engineers Without Borders student chapter.',
    paras: [
      'The IUCEE-EWB student chapter empowers engineers to apply cutting-edge technology to solve grassroot community problems.',
      'Students build solar drinking water filtration kiosks, eco-friendly sanitation solutions, and low-cost assistive technology for differently-abled individuals.'
    ],
    specs: [
      { label: 'Global Partner', val: 'IUCEE (USA) & Engineers Without Borders' },
      { label: 'Key Focus', val: 'Sustainable Community Tech & Rural Upliftment' },
      { label: 'Workshops', val: 'Design Thinking, Prototyping, Empathy Mapping' },
      { label: 'Student Count', val: '180+ Active Engineering Members' }
    ]
  },
  {
    id: 'sahaya',
    title: 'Sahaya Student NGO',
    tag: 'Student-Led Charity',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
    desc: 'Student NGO providing books, hygiene kits, and scholarship support to government school children.',
    paras: [
      'Sahaya is a 100% student-founded and student-managed non-governmental organization operating on the HITAM campus.',
      'Through student micro-donations and fundraising food festivals, Sahaya sponsors education fees for orphaned children, distributes school uniforms, and builds clean drinking water filters in rural primary schools.'
    ],
    specs: [
      { label: 'Impact', val: '1,200+ School Children Supported' },
      { label: 'Events', val: 'Joy of Giving Week, Daan Utsav, Book Drives' },
      { label: 'Transparency', val: '100% Student Crowdfunded & Audited' },
      { label: 'Volunteers', val: '250+ HITAM Engineering Students' }
    ]
  },
  {
    id: 'bytecraft',
    title: 'ByteCraft — Coding & Competitive Programming Club',
    tag: 'Technical Club',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    desc: 'Competitive programming on LeetCode/CodeChef, open-source development, and Web3 hackathons.',
    paras: [
      'ByteCraft is the largest student technical community at HITAM, hosting weekly DSA sprint workshops, algorithmic contests on CodeChef, and Git open-source bootcamps.',
      'Members build production web/mobile applications and mentor juniors for Google Summer of Code (GSoC) and top-tier product company coding rounds.'
    ],
    specs: [
      { label: 'Weekly Activities', val: 'LeetCode Sprints, DSA Bootcamps, Mock Coding Rounds' },
      { label: 'Community Size', val: '600+ Active Student Developers' },
      { label: 'Flagship Event', val: 'ByteCode Annual Inter-Collegiate Coding Duel' },
      { label: 'Technologies', val: 'C++, Python, Java, Rust, React, Flutter, Go' }
    ]
  },
  {
    id: 'strikerz',
    title: 'Strikerz — Fighting, Martial Arts & Self-Defense Club',
    tag: 'Martial Arts & Fitness',
    img: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    desc: 'Taekwondo, Karate, Kickboxing, and women self-defense workshops certified by black-belt masters.',
    paras: [
      'Strikerz is dedicated to martial arts excellence, physical conditioning, mental fortitude, and women self-defense techniques.',
      'Trained by certified black-belt national instructors, students practice kicks, sparring, grappling, and rapid evasion maneuvers, winning medals at Telangana state martial arts championships.'
    ],
    specs: [
      { label: 'Disciplines', val: 'Taekwondo, Karate, Kickboxing, Self-Defense' },
      { label: 'Special Sessions', val: 'Mission Nirbhaya Women Self-Defense Bootcamps' },
      { label: 'Practice Venue', val: 'HITAM Indoor Sports Pavilion (Rubber Matted)' },
      { label: 'Schedule', val: 'Tuesday & Friday Evenings (4:30 PM – 6:30 PM)' }
    ]
  },
  {
    id: 'stepup',
    title: 'StepUp — Dance & Choreography Club',
    tag: 'Cultural Club',
    img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
    desc: 'Western, Classical, Hip-Hop, and Contemporary dance troupes performing at national inter-college fests.',
    paras: [
      'StepUp is the powerhouse of rhythm and energy at HITAM, choreographing show-stopping performances across Western Hip-Hop, Bollywood, Contemporary, and Classical Bharatanatyam/Kuchipudi.',
      'The club represents HITAM at inter-university dance competitions across India, consistently bagging champion trophies and hosting electrifying flash mobs.'
    ],
    specs: [
      { label: 'Dance Forms', val: 'Hip-Hop, Locking/Popping, Contemporary, Classical' },
      { label: 'Major Trophies', val: '1st Prize at BITS Pilani & IIT Hyderabad Fests' },
      { label: 'Studio', val: 'Mirrored Dance Studio with Professional Audio' },
      { label: 'Auditions', val: 'Conducted every year for first-year engineers' }
    ]
  },
  {
    id: 'symphony',
    title: 'Symphony — Music & Acoustic Band Club',
    tag: 'Music & Bands',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    desc: 'Vocalists, acoustic guitarists, drummers, and rock bands hosting unplugged evenings and concerts.',
    paras: [
      'Symphony brings together gifted vocalists, lead guitarists, bassists, keyboardists, and drummers from all departments.',
      'The club organizes monthly "Unplugged Under the Stars" acoustic evenings in the campus amphitheatre, composing original fusion tracks and headlining major college fests.'
    ],
    specs: [
      { label: 'Instruments', val: 'Electric/Acoustic Guitars, Drumkit, Keyboard, Flute' },
      { label: 'Bands', val: 'HITAM Fusion Rock Band & Acoustic Choir' },
      { label: 'Jam Room', val: 'Sound-Proof Acoustic Music Studio on Campus' },
      { label: 'Events', val: 'Battle of Bands, Unplugged Nights, Fest Concerts' }
    ]
  },
  {
    id: 'kalakriti',
    title: 'KalaKriti — Arts, Painting & Murals Club',
    tag: 'Fine Arts',
    img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1000&q=80',
    desc: 'Canvas painting, digital sketch art, campus murals, origami, and pottery workshops.',
    paras: [
      'KalaKriti adds color and soul to HITAM by designing massive campus murals, sustainable eco-art installations from recycled materials, and digital graphics for fests.',
      'The club conducts pottery workshops, charcoal sketching exhibitions, and calligraphy masterclasses throughout the academic year.'
    ],
    specs: [
      { label: 'Art Forms', val: 'Wall Murals, Acrylic Painting, Digital Art, Origami' },
      { label: 'Campus Projects', val: 'Zero-Waste Eco Sculptures & Wall Murals' },
      { label: 'Studio', val: 'Dedicated Fine Arts & Design Studio' },
      { label: 'Exhibitions', val: 'Annual IGNITE Art Gallery Expo' }
    ]
  },
  {
    id: 'cinelens',
    title: 'CineLens — Drama, Short Film & Photography Club',
    tag: 'Media & Drama',
    img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
    desc: 'Stage plays, street theatre (Nukkad Natak), short filmmaking, and nature photography walks.',
    paras: [
      'CineLens is the media and dramatic arts collective at HITAM, directing impactful street plays on social issues, producing short films, and capturing campus life through DSLR lenses.',
      'Student short films made by CineLens have been screened and awarded at Hyderabad youth film festivals.'
    ],
    specs: [
      { label: 'Wings', val: 'Drama/Theatre, Short Filmmaking, Photography' },
      { label: 'Equipment', val: '4K Cinema Cameras, Drones, Lighting Kits, Microphones' },
      { label: 'Key Events', val: 'Nukkad Natak Street Plays, 48-Hour Film Making Sprint' },
      { label: 'Editing Suite', val: 'Adobe Premiere & DaVinci Resolve Workstations' }
    ]
  }
];

function generateStudentLifeHTML() {
  const cardsHTML = studentLifeData.map(s => `
    <div class="drill-card" onclick="showStudentLifeDetail('${s.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${s.img}" alt="${s.title}" loading="lazy">
        <span class="drill-card-badge">${s.tag}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${s.title}</div>
        <div class="drill-card-desc">${s.desc}</div>
        <div class="drill-card-footer">
          <span>👥 Vibrant Life</span>
          <span>Explore Details →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <p>Student life at HITAM offers an extraordinary ecosystem of defense training, social impact, professional chapters, and cultural clubs.</p>
      <div class="modal-highlight-box">
        <strong>Click on any organization or club card below</strong> for parade schedules, membership enrollment, faculty coordinators, and activities:
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showStudentLifeDetail = function(clubId) {
  const s = studentLifeData.find(x => x.id === clubId);
  if (!s) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('student-life')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All Student Life</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${s.img}" alt="${s.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${s.tag}</span>
          <div class="drill-hero-title">${s.title}</div>
        </div>
      </div>

      <div class="drill-para-group">
        ${s.paras.map(p => `<p>${p}</p>`).join('')}
      </div>

      <h4>📋 Organization Details &amp; Operational Specs</h4>
      <div class="modal-grid-features">
        ${s.specs.map(sp => `
          <div class="modal-feature-card">
            <strong>${sp.label}:</strong>
            <span>${sp.val}</span>
          </div>
        `).join('')}
      </div>

      <div class="drill-actions-bar" style="display:flex; flex-wrap:wrap; gap:10px;">
        <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Student Life on HITAM Website (hitam.org) ↗</a>
        <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Student club membership registration takes place through the Student Affairs desk and campus club orientation fairs.')">Club Membership Procedure ℹ️</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   8. INNOVATION & "DOING ENGINEERING" (Drill-Down System)
   ========================================================================== */

const innovationData = [
  {
    id: 'doing-engg',
    title: '"Doing Engineering" Experiential Pedagogy',
    tag: 'Signature Pedagogy',
    img: 'assets/hitam1.jpg',
    desc: 'HITAM’s unique teaching methodology where theory is immediately practiced through real-world hardware & software building.',
    paras: [
      'Traditional engineering colleges focus predominantly on chalk-and-talk theory until the final year project. At HITAM, <strong>"Doing Engineering"</strong> turns this model upside down from the very first semester.',
      'Students spend 50%+ of their curriculum time in makerspaces, designing prototypes, writing software, debugging electronics, and solving community challenges under faculty and industry coaches.'
    ],
    features: [
      { label: 'Year 1 Focus', val: 'Makerspace Fundamentals & Basic IoT Prototyping' },
      { label: 'Year 2 Focus', val: 'Specialization Labs & Mini-Projects for Industry' },
      { label: 'Year 3 Focus', val: 'Capstone Innovations & Corporate Internships' },
      { label: 'Year 4 Focus', val: 'Patented Research & Commercial Startup Launch' }
    ]
  },
  {
    id: 'ssdc',
    title: 'Student Skill Development Centers (SSDC)',
    tag: 'Skill Centers',
    img: 'assets/hitam3.jpeg',
    desc: 'Advanced makerspaces equipped with 3D printers, laser cutters, CNC machines, PCB fabrication, and embedded microcontrollers.',
    paras: [
      'SSDC serves as the hardware playground for inventors. Open 24/7, students have free access to industrial rapid-prototyping machinery.',
      'The center conducts certification bootcamps in additive manufacturing, firmware engineering, and robotics fabrication with industry mentors.'
    ],
    features: [
      { label: 'Machinery', val: 'Industrial 3D Printers, Laser Cutters, CNC Milling' },
      { label: 'Electronics', val: 'Multi-layer PCB Milling Machines, Solder Stations' },
      { label: 'Access', val: 'Open 24/7 for all enrolled engineering students' },
      { label: 'Mentors', val: 'Full-time Maker Lab Technicians & Design Coaches' }
    ]
  },
  {
    id: 'msme-incubator',
    title: 'MSME Business Incubation Center & Startups',
    tag: 'Startup Hub',
    img: 'assets/hitam4.jpeg',
    desc: 'Financial seed grants up to ₹5 Lakhs per student project, patent filing support, and venture mentorship.',
    paras: [
      'Approved by the Ministry of MSME, Govt of India, the HITAM Business Incubation Center supports student entrepreneurs from ideation to venture incorporation.',
      'Over 20+ student startups have been successfully incubated, securing angel investments, filing commercial patents, and generating employment.'
    ],
    features: [
      { label: 'Seed Grants', val: 'Up to ₹5,00,000 per Approved Project' },
      { label: 'Patent Support', val: '100% College Funded Patent Filing Fees' },
      { label: 'Incubated Ventures', val: '20+ Active Student Startups on Campus' },
      { label: 'Co-Working Space', val: 'High-Speed Wi-Fi, Meeting Rooms & Legal Aid' }
    ]
  },
  {
    id: 'drones-robotics',
    title: 'Autonomous Drones & Agri-Robotics Hub',
    tag: 'Advanced Robotics',
    img: 'assets/hitam7.jpeg',
    desc: 'Research and flight testing for agricultural surveillance drones and autonomous ground vehicles.',
    paras: [
      'Equipped with custom drone flight testing arenas, students design autonomous quadcopters and hexacopters equipped with multispectral cameras.',
      'These drones survey crop health, detect pest infestations, and map soil moisture levels across farms in Telangana.'
    ],
    features: [
      { label: 'Drone Fleet', val: 'Hexacopters, VTOL Fixed-Wing & Quadcopters' },
      { label: 'Sensors', val: 'Multispectral, Thermal, LiDAR & Optical' },
      { label: 'Flight Arena', val: 'Dedicated 2-Acre Outdoor Drone Testing Zone' },
      { label: 'Pilot Licenses', val: 'DGCA Certified Drone Pilot Training' }
    ]
  }
];

function generateInnovationHTML() {
  const cardsHTML = innovationData.map(i => `
    <div class="drill-card" onclick="showInnovationDetail('${i.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${i.img}" alt="${i.title}" loading="lazy">
        <span class="drill-card-badge">${i.tag}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${i.title}</div>
        <div class="drill-card-desc">${i.desc}</div>
        <div class="drill-card-footer">
          <span>💡 Innovation Hub</span>
          <span>Explore Details →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <p>Discover HITAM's pioneering <strong>"Doing Engineering"</strong> pedagogy, makerspace skill centers (SSDC), and MSME startup incubation grants.</p>
      <div class="modal-highlight-box">
        <strong>Click on any innovation hub card below</strong> to view prototyping facilities, seed fund amounts, and patent support:
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showInnovationDetail = function(invId) {
  const inv = innovationData.find(x => x.id === invId);
  if (!inv) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('innovation')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to Innovation Overview</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${inv.img}" alt="${inv.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${inv.tag}</span>
          <div class="drill-hero-title">${inv.title}</div>
        </div>
      </div>

      <div class="drill-para-group">
        ${inv.paras.map(p => `<p>${p}</p>`).join('')}
      </div>

      <h4>💡 Facilities &amp; Project Support</h4>
      <div class="modal-grid-features">
        ${inv.features.map(f => `
          <div class="modal-feature-card">
            <strong>${f.label}:</strong>
            <span>${f.val}</span>
          </div>
        `).join('')}
      </div>

      <div class="drill-actions-bar" style="display:flex; flex-wrap:wrap; gap:10px;">
        <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Innovation &amp; Incubation Hub (hitam.org) ↗</a>
        <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('MSME incubation seed grants and startup mentoring proposals are submitted through the HITAM SSDC Innovation Hub.')">Seed Grant Guidelines ℹ️</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   9. LIBRARY BY DEPARTMENT (Drill-Down System)
   ========================================================================== */

const librarySectionsData = [
  {
    id: 'lib-cse',
    title: 'Computer Science & AI / ML Digital Wing',
    tag: 'CSE / AI / DS Books',
    img: 'assets/hitam2.jpeg',
    desc: 'Over 14,000+ volumes on algorithms, machine learning, systems architecture, cloud DevOps, and cybersecurity.',
    books: [
      { title: 'Artificial Intelligence: A Modern Approach (4th Ed)', author: 'Stuart Russell & Peter Norvig', copies: '120 Copies' },
      { title: 'Introduction to Algorithms (CLRS)', author: 'Cormen, Leiserson, Rivest, Stein', copies: '210 Copies' },
      { title: 'Deep Learning with Python & PyTorch', author: 'Ian Goodfellow & Francois Chollet', copies: '85 Copies' },
      { title: 'Database System Concepts (7th Ed)', author: 'Silberschatz, Korth & Sudarshan', copies: '160 Copies' },
      { title: 'Computer Networking: A Top-Down Approach', author: 'James Kurose & Keith Ross', copies: '140 Copies' }
    ]
  },
  {
    id: 'lib-ece',
    title: 'Electronics, VLSI & Telecom Wing',
    tag: 'ECE Reference Books',
    img: 'assets/hitam6.jpeg',
    desc: 'Silicon microelectronics, CMOS VLSI physical design, digital signal processing, and antenna microwave textbooks.',
    books: [
      { title: 'CMOS Digital Integrated Circuits Analysis & Design', author: 'Sung-Mo Kang & Yusuf Leblebici', copies: '110 Copies' },
      { title: 'Digital Signal Processing: Principles & Applications', author: 'John G. Proakis & Dimitris Manolakis', copies: '135 Copies' },
      { title: 'Microelectronic Circuits (8th Ed)', author: 'Adel S. Sedra & Kenneth C. Smith', copies: '95 Copies' },
      { title: 'Wireless Communications: Principles & Practice', author: 'Theodore S. Rappaport', copies: '80 Copies' }
    ]
  },
  {
    id: 'lib-mech',
    title: 'Mechanical, Robotics & CAD/CAM Library',
    tag: 'MECH Reference Books',
    img: 'assets/hitam3.jpeg',
    desc: 'Standard textbooks on thermodynamics, fluid dynamics, finite element analysis, robotics kinematics, and machine design.',
    books: [
      { title: 'Thermodynamics: An Engineering Approach', author: 'Yunus A. Cengel & Michael A. Boles', copies: '150 Copies' },
      { title: 'Shigley’s Mechanical Engineering Design', author: 'Richard G. Budynas & Keith Nisbett', copies: '90 Copies' },
      { title: 'Introduction to Robotics: Mechanics and Control', author: 'John J. Craig', copies: '75 Copies' },
      { title: 'Fluid Mechanics: Fundamentals & Applications', author: 'Yunus Cengel & John Cimbala', copies: '120 Copies' }
    ]
  },
  {
    id: 'lib-eee',
    title: 'Electrical & Smart Power Systems Library',
    tag: 'EEE Reference Books',
    img: 'assets/hitam1.jpg',
    desc: 'Power systems analysis, electrical machines dynamometers, solid-state power inverters, and renewable solar grids.',
    books: [
      { title: 'Modern Power System Analysis', author: 'I.J. Nagrath & D.P. Kothari', copies: '140 Copies' },
      { title: 'Generalized Theory of Electrical Machines', author: 'Dr. P.S. Bimbhra', copies: '180 Copies' },
      { title: 'Power Electronics: Circuits, Devices & Applications', author: 'Muhammad H. Rashid', copies: '110 Copies' }
    ]
  },
  {
    id: 'lib-civil',
    title: 'Civil & Sustainable Infrastructure Library',
    tag: 'CIVIL Reference Books',
    img: 'assets/hitam5.jpeg',
    desc: 'Structural steel analysis, concrete technology, geotechnical foundation engineering, and satellite surveying.',
    books: [
      { title: 'Comprehensive Structural Analysis (Vol I & II)', author: 'Dr. B.C. Punmia & A.K. Jain', copies: '130 Copies' },
      { title: 'Strength of Materials', author: 'S. Ramamrutham & R. Narayanan', copies: '160 Copies' },
      { title: 'Surveying (Vol I, II & III)', author: 'Dr. B.C. Punmia & Ashok Jain', copies: '140 Copies' }
    ]
  },
  {
    id: 'lib-digital',
    title: 'Digital E-Library & IEEE Xplore Portal',
    tag: '24/7 Digital Resources',
    img: 'assets/hitam4.jpeg',
    desc: 'Over 500,000+ full-text international peer-reviewed journals on IEEE Xplore, DELNET, Springer, ScienceDirect, and NPTEL.',
    books: [
      { title: 'IEEE Xplore Digital Library Subscription', author: 'IEEE Headquarters (Full Access)', copies: 'Unlimited Campus Access' },
      { title: 'DELNET Inter-Library Loan Network', author: 'Union Catalog of 5,000 Libraries', copies: 'Online Portal' },
      { title: 'Springer Nature Scientific Journals', author: 'Springer Verlag Publishing', copies: '24/7 E-Access' },
      { title: 'NPTEL Video Lectures & SWAYAM Mooc', author: 'IIT Madras & IIT Bombay', copies: 'HD Video Archive' }
    ]
  }
];

function generateLibraryHTML() {
  const cardsHTML = librarySectionsData.map(l => `
    <div class="drill-card" onclick="showLibraryDetail('${l.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${l.img}" alt="${l.title}" loading="lazy">
        <span class="drill-card-badge">${l.tag}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${l.title}</div>
        <div class="drill-card-desc">${l.desc}</div>
        <div class="drill-card-footer">
          <span>📖 Digital Access</span>
          <span>Browse Books →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <p><strong>Dr. APJ Abdul Kalam Central Digital Library</strong> features over 45,000+ volumes, 12,000+ titles, air-conditioned night reading halls, and 24/7 IEEE digital access.</p>
      <div class="modal-highlight-box">
        <strong>Library Timings:</strong> 8:00 AM – 8:00 PM (Monday to Saturday) • Extended till 10:00 PM during Semester Examinations.
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showLibraryDetail = function(libId) {
  const l = librarySectionsData.find(x => x.id === libId);
  if (!l) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('library')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All Library Wings</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${l.img}" alt="${l.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${l.tag}</span>
          <div class="drill-hero-title">${l.title}</div>
        </div>
      </div>

      <p>${l.desc}</p>

      <h4>📚 Top Recommended Department Reference Books:</h4>
      <div class="modal-grid-features">
        ${l.books.map(b => `
          <div class="modal-feature-card">
            <strong>📖 ${b.title}</strong>
            <span>Author: ${b.author} • Available: <b style="color:#08752f">${b.copies}</b></span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:3px 8px; font-size:11px;" onclick="showDemoNotice('Book reservations are managed through the Koha Central Library software at the circulation desk.')">Reserve Copy →</button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="drill-actions-bar" style="display:flex; flex-wrap:wrap; gap:10px;">
        <a href="https://ndl.iitkgp.ac.in/" target="_blank" rel="noopener" class="drill-action-btn drill-action-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">National Digital Library of India (NDLI) ↗</a>
        <a href="https://delnet.in/" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">DELNET Union Catalog ↗</a>
        <a href="https://nptel.ac.in/" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">NPTEL / SWAYAM Portal ↗</a>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   10. CANTEEN & FOOD STALLS WITH LIVE TRAY CALCULATOR (Drill-Down System)
   ========================================================================== */

let canteenTrayTotal = 0;
let canteenTrayCount = 0;

const canteenStallsData = [
  {
    id: 'stall-1',
    title: 'Stall 1: Royal Food Court (Tiffins, Meals & Biryani)',
    tag: 'Meals & Restaurant Food',
    img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    desc: 'Traditional South Indian unlimited thali meals, authentic Hyderabadi Dum Biryani, egg/veg noodles, crispy dosas, and idlis.',
    menu: [
      { item: 'Unlimited South Indian Veg Thali Meals', price: 70, desc: 'Rice, Sambar, Rasam, 2 Curries, Papad, Curd & Chutney' },
      { item: 'Special Hyderabadi Chicken Dum Biryani', price: 140, desc: 'Fragrant basmati rice with tender chicken, Mirchi ka Salan & Raita' },
      { item: 'Egg Fried Rice / Veg Hakka Noodles', price: 80, desc: 'Wok-tossed farm fresh vegetables and spices' },
      { item: 'Ghee Masala Dosa with Chutneys', price: 40, desc: 'Golden crispy dosa with spiced potato masala' },
      { item: 'Steamed Idli & Crispy Medu Vada Combo', price: 35, desc: 'Served with hot sambar and freshly ground coconut chutney' },
      { item: 'Poori Bhaji / Chole Bhature', price: 45, desc: 'Hot fluffy pooris with spiced aloo masala' }
    ]
  },
  {
    id: 'stall-2',
    title: 'Stall 2: Fast Food Corner (Momos, Burgers & Shawarma)',
    tag: 'Fast Food & Snacks',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    desc: 'Steamed/fried momos with schezwan dip, cheese chicken burgers, loaded grilled sandwiches, rumali shawarma, and peri-peri fries.',
    menu: [
      { item: 'Steamed Veg / Chicken Momos (6 Pcs)', price: 70, desc: 'Served with spicy schezwan sauce and garlic mayonnaise' },
      { item: 'Crispy Cheese Chicken / Veg Burger', price: 80, desc: 'Crispy patty loaded with cheddar slice, lettuce and garlic mayo' },
      { item: 'Three-Layer Grilled Club Sandwich', price: 65, desc: 'Toasted bread loaded with paneer, sweet corn and mozzarella' },
      { item: 'Hyderabadi Rumali Chicken Shawarma', price: 90, desc: 'Slow-roasted marinated chicken rolled in soft rumali roti' },
      { item: 'Peri-Peri French Fries Basket', price: 60, desc: 'Crispy salted potato fries tossed in peri-peri spice' },
      { item: 'Pani Puri & Dahi Puri Platter', price: 35, desc: 'Crisp puris with tangy mint water and sweetened curd' }
    ]
  },
  {
    id: 'stall-3',
    title: 'Stall 3: Green Cafe, Shakes & Bakery',
    tag: 'Bakery & Beverages',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    desc: 'Freshly baked flaky puffs, thick cold coffee with ice cream, oreo chocolate shakes, seasonal fruit juices, and hot masala chai.',
    menu: [
      { item: 'Paneer / Egg / Chicken Puffs', price: 25, desc: 'Golden baked flaky puff pastry' },
      { item: 'Thick Cold Coffee with Vanilla Scoop', price: 50, desc: 'Blended arabica coffee topped with rich vanilla ice cream' },
      { item: 'Oreo & Belgian Chocolate Milkshake', price: 60, desc: 'Thick chocolate shake topped with crushed oreos & whipped cream' },
      { item: 'Fresh Fruit Juice (Watermelon / Mosambi / Orange)', price: 45, desc: '100% fresh squeezed with no added sugar' },
      { item: 'Choco Lava Cake / Pastry Slice', price: 50, desc: 'Warm gooey chocolate center' },
      { item: 'Special Irani Masala Chai / Filter Coffee', price: 15, desc: 'Freshly brewed hot aromatic beverage' }
    ]
  }
];

function generateCanteenHTML() {
  const cardsHTML = canteenStallsData.map(c => `
    <div class="drill-card" onclick="showCanteenDetail('${c.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${c.img}" alt="${c.title}" loading="lazy">
        <span class="drill-card-badge">${c.tag}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${c.title}</div>
        <div class="drill-card-desc">${c.desc}</div>
        <div class="drill-card-footer">
          <span>🍴 Open: 7:30 AM – 6:30 PM</span>
          <span>View Menu &amp; Order →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <p>HITAM Multi-Stall Cafeteria is FSSAI-certified, featuring hygienic preparation, farm-to-plate organic ingredients, and a 500+ seat dining hall.</p>
      <div class="modal-highlight-box">
        <strong>Click on any stall below</strong> to browse the full menu, item prices, and test the live order tray calculator:
      </div>
      <div class="drill-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.addToCanteenTray = function(itemName, price) {
  canteenTrayTotal += price;
  canteenTrayCount += 1;
  const totalEl = document.getElementById('trayTotalDisplay');
  const countEl = document.getElementById('trayCountDisplay');
  if (totalEl) totalEl.textContent = `₹${canteenTrayTotal}`;
  if (countEl) countEl.textContent = `${canteenTrayCount} Items Added`;
  showToast(`Added "${itemName}" (₹${price}) to your food tray!`);
};

window.clearCanteenTray = function() {
  canteenTrayTotal = 0;
  canteenTrayCount = 0;
  const totalEl = document.getElementById('trayTotalDisplay');
  const countEl = document.getElementById('trayCountDisplay');
  if (totalEl) totalEl.textContent = `₹0`;
  if (countEl) countEl.textContent = `0 Items`;
  showToast('Food tray cleared.');
};

window.showCanteenDetail = function(stallId) {
  const c = canteenStallsData.find(x => x.id === stallId);
  if (!c) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  const menuItemsHTML = c.menu.map(m => `
    <div class="modal-feature-card" style="display:flex; justify-content:space-between; align-items:center;">
      <div>
        <strong style="font-size:13.5px; color:#0b4f26;">${m.item}</strong>
        <span style="display:block; font-size:12px; color:#557260;">${m.desc}</span>
        <b style="color:#08752f; font-size:13px; font-weight:800;">₹${m.price}</b>
      </div>
      <button class="drill-action-btn drill-action-primary" style="padding:5px 12px; font-size:11.5px;" onclick="addToCanteenTray('${m.item}', ${m.price})">+ Add</button>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('canteen')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All Stalls</span>
      </button>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${c.img}" alt="${c.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${c.tag}</span>
          <div class="drill-hero-title">${c.title}</div>
          <div class="drill-hero-sub">FSSAI Certified • Open: 7:30 AM – 6:30 PM</div>
        </div>
      </div>

      <h4>🍽️ Stall Menu &amp; Instant Order Selection:</h4>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${menuItemsHTML}
      </div>

      <div class="canteen-order-tray">
        <div>
          <div style="font-size:11px; text-transform:uppercase; color:#0b4f26; font-weight:800;">🛒 Canteen Price Estimator (Demonstration Calculator Only — No Online Orders or Payments):</div>
          <div class="canteen-tray-items" id="trayCountDisplay">${canteenTrayCount} Items Selected for Estimation</div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <div>
            <span style="font-size:11px; color:#557260;">Estimated Total:</span>
            <div class="canteen-tray-total" id="trayTotalDisplay">₹${canteenTrayTotal}</div>
          </div>
          <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Price Estimator: In-person meal tokens are purchased at the cafeteria billing counter. No online order or payment is processed.')">Estimate Bill Summary</button>
          <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="clearCanteenTray()">Reset Calculator</button>
        </div>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
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
    desc: "KPHB Colony ➔ JNTU ➔ Pragathi Nagar ➔ Nizampet 'X' Road ➔ Bachupally ➔ Gandimaisamma ➔ HITAM.",
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
    desc: "ECIL 'X' Roads ➔ AS Rao Nagar ➔ Sainikpuri ➔ Yapral ➔ Alwal Temple ➔ Bolarum ➔ Kompally ➔ HITAM.",
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
      { stop: "Ferozguda / Balanagar 'X' Roads", time: '7:55 AM' },
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
    desc: "LB Nagar Ring Road ➔ Kothapet ➔ Dilsukhnagar ➔ Koti Women's College ➔ RTC X Roads ➔ Musheerabad ➔ Bowenpally ➔ HITAM.",
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
    desc: "Mallapur ➔ Kushaiguda Depot ➔ Dammaiguda 'X' Roads ➔ Nagaram ➔ Saket Towers / Kapra ➔ Bolarum ➔ Gundlapochampally ➔ HITAM.",
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
  const cardsHTML = busRoutesData.map(b => `
    <div class="drill-card" onclick="showTransportDetail('${b.id}')">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${b.img}" alt="${b.route}" loading="lazy">
        <span class="drill-card-badge">${b.busNo}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${b.busNo} — ${b.route}</div>
        <div class="drill-card-desc">${b.desc}</div>
        <div class="drill-card-footer">
          <span>⏰ ${b.time}</span>
          <span style="color:#08752f; font-weight:700;">View Stops &amp; GPS →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
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
        ${cardsHTML}
      </div>
    </div>
  `;
}

window.showTransportDetail = function(busId) {
  const b = busRoutesData.find(x => x.id === busId);
  if (!b) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  const stopsHTML = b.stops.map((st, idx) => `
    <tr>
      <td><strong>${idx + 1}</strong></td>
      <td>${st.stop}</td>
      <td style="color:#08752f; font-weight:700;">${st.time}</td>
    </tr>
  `).join('');

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="openModal('transport')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to All 10 Bus Routes</span>
      </button>

      <div class="drill-hero-banner" style="height:220px; margin-bottom:14px;">
        <img class="drill-hero-img" src="${b.img}" alt="${b.route}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${b.busNo}</span>
          <div class="drill-hero-title">${b.route}</div>
          <div class="drill-hero-sub">${b.time} • In-Charge: ${b.driver}</div>
        </div>
      </div>

      <div class="modal-highlight-box" style="background:#e8f5ec;">
        <strong>📡 GPS Status:</strong> ${b.gpsStatus} • Assigned Driver: <b>${b.driver}</b>
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
          ${stopsHTML}
        </tbody>
      </table>

      <div class="drill-actions-bar" style="display:flex; flex-wrap:wrap; gap:10px;">
        <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Live bus location tracking is enabled for registered transport users via the dedicated institutional mobile app.')">Transport App GPS Tracking Info 📍</button>
        <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Printed route charts and boarding passes are issued by the Transport In-Charge at the campus administrative wing.')">Route Card &amp; Pass Information</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};
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
  },
  {
    id: 'hostel-dining',
    title: 'Hostel Dining & 4-Meal Kitchen Facility',
    tag: 'Nutritious Dining',
    fee: 'Included in ₹80,000 Fee',
    img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    desc: 'Four wholesome nutritious meals served daily: Breakfast with tea/coffee, lunch, evening snacks, and dinner with non-veg/paneer special menus.',
    amenities: [
      { label: 'Breakfast', val: 'Idli-Vada, Dosa, Poori, Upma, Poha + Milk & Tea/Coffee' },
      { label: 'Lunch', val: 'Rice, Sambar, Dal, 2 Curries, Papad, Curd & Seasonal Fruits' },
      { label: 'Evening Snacks', val: 'Samosa, Puffs, Pakoda, Biscuits + Hot Tea/Coffee' },
      { label: 'Dinner', val: 'Roti, Rice, Paneer Curry, Chicken Biryani (Wed/Sun Special), Curd' }
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
          Affordable, eco-friendly accommodation on campus for both <strong>Boys and Girls Hostels</strong> (Includes lodging, 4 nutritious meals/day, 1 Gbps Wi-Fi, gym &amp; laundry).
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
   14. DEPARTMENT OF PHYSICAL EDUCATION (11 Sports Showcase)
   ========================================================================== */

const sportsList = [
  {
    id: 'cricket',
    name: 'Cricket',
    iconSvg: `<svg viewBox="0 0 24 24"><path d="M6 3v13M9 3v13M12 3v13M4 3h10M17 11l4 4-6 6-4-4 6-6zM19.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>`,
    img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
    desc: 'HITAM has a rich history of conducting inter-collegiate Cricket Champions Trophy from the past 16 years. Over 40 university & engineering college teams across South India participate in the annual championship tournament.',
    tags: ['Turf Wicket Ground', 'Floodlit Practice Nets', 'BCCI Certified Coach', 'Annual Inter-Collegiate Trophy']
  },
  {
    id: 'basketball',
    name: 'Basket Ball',
    iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M7 11l5 10 5-10M9 14h6M8 17h8M4 7h16"/></svg>`,
    img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
    desc: 'The campus features two tournament-grade synthetic acrylic Basketball courts equipped with high-intensity LED floodlights, professional spring-loaded rings, and electronic scoreboards for state leagues.',
    tags: ['Synthetic Acrylic Court', 'LED Floodlights', 'JNTUH Zone Champions', 'Daily Coaching Clinics']
  },
  {
    id: 'football',
    name: 'Football',
    iconSvg: `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="1"/><circle cx="12" cy="12" r="3"/><path d="M3 12h3M18 12h3M12 6v3M12 15v3"/></svg>`,
    img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
    desc: 'Full-sized FIFA regulation natural grass football ground hosting annual 11-a-side collegiate tournaments and 7-a-side night leagues under the guidance of licensed physical education coaches.',
    tags: ['Natural Turf Pitch', '11-a-side Match Ground', 'Inter-University Tournaments', 'Dedicated Goalkeeper Training']
  },
  {
    id: 'throwball',
    name: 'Throw Ball',
    iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><path d="M8 12l4-3 4 3v7M6 10l6-4 6 4M10 19v3M14 19v3"/><circle cx="19" cy="8" r="1.5"/></svg>`,
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1000&q=80',
    desc: 'HITAM Women’s Throw Ball squad is consistently ranked among the top collegiate teams in Telangana, equipped with dedicated clay courts, padded net posts, and year-round conditioning camps.',
    tags: ['Dedicated Throwball Arena', 'Women Sports Excellence', 'State Championship Medals', 'Specialized Agility Training']
  },
  {
    id: 'khokho',
    name: 'Kho Kho',
    iconSvg: `<svg viewBox="0 0 24 24"><circle cx="8" cy="5" r="2"/><circle cx="16" cy="5" r="2"/><path d="M5 12h6M13 12h6M6 19l2-7 3 2M15 14l3-2 2 7"/></svg>`,
    img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1000&q=80',
    desc: 'Standard Kho-Kho courts prepared with soft red soil cushioning to promote sprint agility, rapid tactical direction shifts, and team synergy in traditional Indian athletics.',
    tags: ['Traditional Sports Arena', 'Sprint Conditioning', 'Intramural Leagues', 'National Style Court Dimensions']
  },
  {
    id: 'kabaddi',
    name: 'Kabaddi',
    iconSvg: `<svg viewBox="0 0 24 24"><circle cx="6" cy="7" r="2"/><circle cx="18" cy="7" r="2"/><path d="M6 9l4 4-2 6M18 9l-4 4 2 6M10 13h4"/></svg>`,
    img: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    desc: 'Equipped with professional high-density synthetic Kabaddi mats conforming to national Pro-Kabaddi standards for maximum player safety and rigorous raid-tackle training.',
    tags: ['Interlocking Safety Mats', 'Pro-Kabaddi Dimensions', 'Strength & Conditioning', 'Inter-Collegiate Champions']
  },
  {
    id: 'tabletennis',
    name: 'Table Tennis',
    iconSvg: `<svg viewBox="0 0 24 24"><circle cx="14" cy="9" r="5"/><path d="M10 13l-4 4-2-2 4-4"/><circle cx="18" cy="5" r="1.5"/></svg>`,
    img: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=80',
    desc: 'Indoor sports pavilion featuring 4 ITTF-approved Stag tournament Table Tennis boards with anti-glare overhead lighting and shock-absorbent wooden flooring.',
    tags: ['ITTF Approved Stag Boards', 'Indoor Air-Cooled Arena', 'Robotic Ball Feeder', 'Singles & Doubles Leagues']
  },
  {
    id: 'badminton',
    name: 'Badminton',
    iconSvg: `<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="4"/><path d="M10 11l8 8 2-2-8-8M17 18l3 3M4 17l4 4M2 19l2 2"/></svg>`,
    img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    desc: 'Three indoor international-standard synthetic badminton courts with high ceiling clearances, Yonex tournament nets, and professional shuttle training for men and women.',
    tags: ['Synthetic BWF Approved Courts', 'High Ceiling Indoor Hall', 'Yonex Tournament Equipment', 'Round-the-Year Practice']
  },
  {
    id: 'volleyball',
    name: 'Volley Ball',
    iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 9 9M12 21a9 9 0 0 1-9-9M3.5 8.5l14 7M6.5 18.5l14-7"/></svg>`,
    img: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1000&q=80',
    desc: 'Two outdoor volleyball courts with clay surfacing and high-power halogen floodlights, hosting annual JNTUH zonal championships and inter-department sports meets.',
    tags: ['Two Full Courts', 'Night Floodlit Arena', 'Zonal Tournament Venue', 'Certified Referees']
  },
  {
    id: 'chess',
    name: 'Chess',
    iconSvg: `<svg viewBox="0 0 24 24"><path d="M8 20h8M9 20V12h6v8M8 12c0-3 2-4 2-6h4c0 2 2 3 2 6M10 6V4h4v2M12 2v2"/></svg>`,
    img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
    desc: 'Dedicated mind-sports lounge equipped with championship-grade tournament chess sets, digital DGT timers, and Grandmaster masterclass video analysis for state championship qualifiers.',
    tags: ['FIDE Standard Sets', 'Digital DGT Clocks', 'Mind Sports Club', 'University Gold Medalists']
  },
  {
    id: 'carroms',
    name: 'Carroms',
    iconSvg: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><circle cx="6" cy="6" r="1"/><circle cx="18" cy="6" r="1"/><circle cx="6" cy="18" r="1"/><circle cx="18" cy="18" r="1"/></svg>`,
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    desc: 'Indoor carrom arena with championship-grade waterproof Synco & Siscaa boards, smooth acrylic strikers, and daily recreational sessions for hostel and day-scholar students.',
    tags: ['Synco Champion Boards', 'Indoor Recreation Lounge', 'Annual Intramural Cup', 'Singles & Doubles Boards']
  }
];

let activeSportId = 'cricket';

function generateSportsHTML() {
  const activeSport = sportsList.find(s => s.id === activeSportId) || sportsList[0];

  const tilesHTML = sportsList.map(sport => {
    const isActive = sport.id === activeSportId;
    return `
      <button class="sport-tile ${isActive ? 'active' : ''}" onclick="selectSport('${sport.id}')" title="${sport.name}">
        <div class="sport-tile-icon">${sport.iconSvg}</div>
        <div class="sport-tile-name">${sport.name}</div>
      </button>
    `;
  }).join('');

  return `
    <div class="sports-dept-container">
      <div class="sports-badge-tag">DEPARTMENT OF PHYSICAL EDUCATION</div>

      <div class="sports-layout-grid">
        <div class="sports-selector-grid">
          ${tilesHTML}
        </div>

        <div class="sports-preview-pane">
          <div class="sports-banner-header">
            <div class="sports-banner-icon">${activeSport.iconSvg}</div>
            <h3 class="sports-banner-title">${activeSport.name}</h3>
          </div>

          <div class="sports-image-box">
            <img class="sports-action-img" src="${activeSport.img}" alt="${activeSport.name} at HITAM" loading="lazy">
          </div>

          <div class="sports-desc-box">
            <p class="sports-desc-text">${activeSport.desc}</p>
            <div class="sports-facility-tags">
              ${activeSport.tags.map(t => `<span class="sports-tag-item">✓ ${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.selectSport = function(sportId) {
  activeSportId = sportId;
  const body = document.getElementById('modalBody');
  if (body) {
    body.innerHTML = generateSportsHTML();
  }
};


// scratch/build_portals_expansion.js
// Script to construct the comprehensive Section 15 and verify it.

const fs = require('fs');

const section15Code = `/* ==========================================================================
   15. PORTALS (ADMIN, FACULTY, STUDENT) — WITH AUTHENTICATION & ACCESS CONTROL
   ========================================================================== */

// 1. ADMIN USERS (3 Administrators: Campus Admin, Principal, Chairman)
const adminUsers = {
  'ADMINHTM01': {
    id: 'ADMINHTM01',
    password: 'AdminHtm01',
    name: 'Campus Administrator',
    role: 'College Administrator (Admin in Clg)',
    dept: 'Central Campus Administration',
    badge: 'Campus Admin',
    students: 'Batches 23–26 Active',
    faculty: '9 Branches (63 Staff)',
    attendance: '94.2% Campus Attendance',
    collections: 'Fee Desk Active',
    pendingLeaves: 3
  },
  'ADMINHTM02': {
    id: 'ADMINHTM02',
    password: 'AdminHtm02',
    name: 'Dr. J. Shiva Kumar',
    role: 'Principal, HITAM',
    dept: 'Office of the Principal',
    badge: 'Principal',
    students: 'B.Tech Autonomous Programs',
    faculty: 'All Academic Faculty & HODs',
    attendance: 'College-Wide Sync',
    collections: 'Institutional Grants',
    pendingLeaves: 1
  },
  'ADMINHTM03': {
    id: 'ADMINHTM03',
    password: 'AdminHtm03',
    name: 'Sri Prashanth Arutla',
    role: 'Chairman, Governing Body',
    dept: 'Executive Trust & Governance',
    badge: 'Chairman',
    students: 'Autonomous Enrolment',
    faculty: 'Academic Council & Board',
    attendance: 'Institutional Governance',
    collections: 'Trust & Infrastructure',
    pendingLeaves: 0
  }
};

// 2. FACULTY USERS & BRANCH-WISE DATA
// 9 Departments: CSE, CSM, CSD, ECE, MECH, CIVIL, EEE, IOT, CSO
// Each branch has 1 HOD (password: [Branch]hod01) and 6 faculties (password: [Branch]faculty)
const deptInfoMap = {
  'CSE': { name: 'Computer Science & Engineering', code: '05' },
  'CSM': { name: 'CSE (AI & ML - Artificial Intelligence & Machine Learning)', code: '66' },
  'CSD': { name: 'CSE - Data Science', code: '67' },
  'ECE': { name: 'Electronics & Communication Engineering', code: '04' },
  'MECH': { name: 'Mechanical Engineering', code: '03' },
  'CIVIL': { name: 'Civil Engineering', code: '01' },
  'EEE': { name: 'Electrical & Electronics Engineering', code: '02' },
  'IOT': { name: 'Internet of Things', code: '69' },
  'CSO': { name: 'Cyber Security & Operations', code: '62' }
};

const facultyUsers = {};

function formatCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

Object.keys(deptInfoMap).forEach(deptKey => {
  const dInfo = deptInfoMap[deptKey];
  const capDept = formatCapitalize(deptKey);
  const hodId = `${deptKey}HOD`;
  const hodPass = `${capDept}hod01`;

  // 1 HOD per branch
  facultyUsers[hodId] = {
    id: hodId,
    password: hodPass,
    name: `Dr. ${deptKey} HOD (Head of Department)`,
    role: `Professor & HOD, ${deptKey}`,
    dept: `Department of ${dInfo.name}`,
    deptKey: deptKey,
    isHOD: true,
    courses: 2,
    mentees: 24,
    attendance: '96.4% Dept Average',
    papers: 14,
    cabin: `${deptKey} Block, Room 101`,
    email: `hod.${deptKey.toLowerCase()}@hitam.org`
  };

  // 6 Faculties per department (CSE01 to CSE06, CSM01 to CSM06, etc.)
  const facPass = `${capDept}faculty`;
  for (let i = 1; i <= 6; i++) {
    const pad = i < 10 ? `0${i}` : `${i}`;
    const facId = `${deptKey}${pad}`;
    facultyUsers[facId] = {
      id: facId,
      password: facPass,
      name: `Prof. ${deptKey} Faculty ${pad}`,
      role: i <= 2 ? `Associate Professor, ${deptKey}` : `Assistant Professor, ${deptKey}`,
      dept: `Department of ${dInfo.name}`,
      deptKey: deptKey,
      isHOD: false,
      courses: 2,
      mentees: 15,
      attendance: '93.8% Class Average',
      papers: 3 + (i % 4),
      cabin: `${deptKey} Block, Room 2${pad}`,
      email: `faculty${pad}.${deptKey.toLowerCase()}@hitam.org`
    };
  }
});

// 3. DEPARTMENT FACULTY ROSTER DIRECTORY
const departmentFacultyRoster = {};
Object.keys(deptInfoMap).forEach(deptKey => {
  const dInfo = deptInfoMap[deptKey];
  const list = [];
  list.push({
    id: `${deptKey}HOD`,
    name: `Dr. ${deptKey} HOD`,
    designation: 'Professor & Head of Department',
    qualification: 'Ph.D. (IIT / NIT), M.Tech, B.Tech',
    specialization: `Advanced ${deptKey} Research & System Design`,
    subjects: `Curriculum Lead & Capstone Project Guidance`,
    load: '6 Teaching Hours / Week',
    cabin: `${deptKey} Academic Block, Room 101`,
    email: `hod.${deptKey.toLowerCase()}@hitam.org`,
    phone: '+91 92487 11150'
  });

  const specializations = [
    'Deep Learning & Intelligent Architectures',
    'Cloud Systems & Distributed Computing',
    'Data Analytics & Applied Algorithms',
    'Embedded Electronics & IoT Systems',
    'System Optimization & Cyber Security',
    'Software Engineering & Industry Applications'
  ];

  for (let i = 1; i <= 6; i++) {
    const pad = i < 10 ? `0${i}` : `${i}`;
    list.push({
      id: `${deptKey}${pad}`,
      name: `Prof. ${deptKey} Faculty ${pad}`,
      designation: i <= 2 ? 'Associate Professor' : 'Assistant Professor',
      qualification: i <= 2 ? 'Ph.D., M.Tech (First Class with Distinction)' : 'M.Tech, B.Tech (First Class)',
      specialization: specializations[i - 1] || 'Core Engineering Principles',
      subjects: `Department Core Course ${i} & Laboratory Incharge`,
      load: `${14 + (i % 3)} Teaching Hours / Week`,
      cabin: `${deptKey} Block, Faculty Hall Room 2${pad}`,
      email: `faculty${pad}.${deptKey.toLowerCase()}@hitam.org`,
      phone: `+91 98480 ${10000 + (i * 1111)}`
    });
  }
  departmentFacultyRoster[deptKey] = list;
});

// 4. STUDENT RESOLVER & CURRICULUM
const branchSubjectsDB = {
  'CSM': [
    { code: 'AI701PC', name: 'Deep Learning & Neural Networks', cie: '24/25', credits: 4, hours: 45, attended: 42 },
    { code: 'AI702PC', name: 'Natural Language Processing (NLP)', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'AI703PC', name: 'Computer Vision & Pattern Recognition', cie: '25/25', credits: 3, hours: 40, attended: 36 },
    { code: 'CS704PC', name: 'Cloud Computing & MLOps Infrastructure', cie: '22/25', credits: 3, hours: 38, attended: 34 },
    { code: 'AI705PC', name: 'Edge AI & Embedded Machine Learning Lab', cie: '48/50', credits: 2, hours: 30, attended: 28 }
  ],
  'CSE': [
    { code: 'CS701PC', name: 'Cloud DevOps & Microservices', cie: '24/25', credits: 4, hours: 45, attended: 43 },
    { code: 'CS702PC', name: 'Distributed Systems & Network Security', cie: '23/25', credits: 4, hours: 42, attended: 39 },
    { code: 'CS703PC', name: 'Full Stack Web Development & APIs', cie: '25/25', credits: 3, hours: 40, attended: 37 },
    { code: 'CS704PC', name: 'Compiler Design & System Programming', cie: '22/25', credits: 3, hours: 38, attended: 33 },
    { code: 'CS705PC', name: 'Advanced Software Engineering Lab', cie: '49/50', credits: 2, hours: 30, attended: 29 }
  ],
  'CSD': [
    { code: 'DS701PC', name: 'Big Data Analytics & Spark', cie: '24/25', credits: 4, hours: 44, attended: 40 },
    { code: 'DS702PC', name: 'Predictive Modeling & Statistical Inference', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'DS703PC', name: 'Data Visualization & Business BI', cie: '25/25', credits: 3, hours: 40, attended: 36 },
    { code: 'DS704PC', name: 'NoSQL Databases & Data Lakes', cie: '22/25', credits: 3, hours: 38, attended: 34 }
  ],
  'ECE': [
    { code: 'EC701PC', name: 'CMOS VLSI Design & Verification', cie: '23/25', credits: 4, hours: 45, attended: 41 },
    { code: 'EC702PC', name: 'Digital Signal Processors & Architectures', cie: '24/25', credits: 4, hours: 42, attended: 38 },
    { code: 'EC703PC', name: 'Embedded IoT Microcontrollers', cie: '25/25', credits: 3, hours: 40, attended: 37 },
    { code: 'EC704PC', name: 'Optical & 5G Wireless Communications', cie: '22/25', credits: 3, hours: 38, attended: 33 }
  ],
  'MECH': [
    { code: 'ME701PC', name: 'CAD/CAM & Computer Integrated Mfg', cie: '24/25', credits: 4, hours: 44, attended: 40 },
    { code: 'ME702PC', name: 'Robotics & Industrial Automation', cie: '23/25', credits: 4, hours: 42, attended: 37 },
    { code: 'ME703PC', name: 'Finite Element Analysis (FEA)', cie: '25/25', credits: 3, hours: 40, attended: 36 },
    { code: 'ME704PC', name: 'Automobile Engineering & Electric Vehicles', cie: '23/25', credits: 3, hours: 38, attended: 35 }
  ],
  'CIVIL': [
    { code: 'CE701PC', name: 'Structural Steel Design & Foundation Engg', cie: '24/25', credits: 4, hours: 45, attended: 42 },
    { code: 'CE702PC', name: 'Environmental Engineering & Water Tech', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'CE703PC', name: 'Geotechnical Engineering & Soil Mechanics', cie: '25/25', credits: 3, hours: 40, attended: 36 }
  ],
  'EEE': [
    { code: 'EE701PC', name: 'Power System Operation & Smart Grids', cie: '24/25', credits: 4, hours: 45, attended: 41 },
    { code: 'EE702PC', name: 'Solid State Motor Drives & Inverters', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'EE703PC', name: 'Renewable Solar & Wind Energy Systems', cie: '25/25', credits: 3, hours: 40, attended: 37 }
  ],
  'IOT': [
    { code: 'IT701PC', name: 'Wireless Sensor Networks & Protocols', cie: '24/25', credits: 4, hours: 44, attended: 40 },
    { code: 'IT702PC', name: 'Industrial IoT & Edge Computing', cie: '23/25', credits: 4, hours: 42, attended: 39 },
    { code: 'IT703PC', name: 'Smart Cities & Embedded Architecture', cie: '25/25', credits: 3, hours: 40, attended: 36 }
  ],
  'CSO': [
    { code: 'CY701PC', name: 'Cyber Forensics & Incident Response', cie: '24/25', credits: 4, hours: 45, attended: 42 },
    { code: 'CY702PC', name: 'Ethical Hacking & Penetration Testing', cie: '23/25', credits: 4, hours: 42, attended: 38 },
    { code: 'CY703PC', name: 'Security Operations Center (SOC) Tools', cie: '25/25', credits: 3, hours: 40, attended: 37 }
  ]
};

const codeToDeptKey = {
  '66': 'CSM',
  '05': 'CSE',
  '67': 'CSD',
  '04': 'ECE',
  '03': 'MECH',
  '01': 'CIVIL',
  '02': 'EEE',
  '69': 'IOT',
  '62': 'CSO'
};

// Global Store for student credentials updates
window.userCredentialStore = window.userCredentialStore || {};

function resolveStudentUser(rollInput, passwordInput) {
  if (!rollInput) return null;
  let rawRoll = rollInput.trim();
  let roll = rawRoll.toUpperCase();
  const pass = (passwordInput || '').trim();

  // Check alias store
  if (window.userCredentialStore && window.userCredentialStore[roll] && window.userCredentialStore[roll].mappedRoll) {
    roll = window.userCredentialStore[roll].mappedRoll;
  }

  // Pattern matches: [Batch: 2 digits][College: E5][Program: 1A][DeptCode: 2 digits][Serial: 2 chars]
  const match = roll.match(/^(\\d{2})E5(?:1A)?([0-9]{2})([0-9A-Z]{2})$/);
  
  let batchYear = '23';
  let deptCode = '66';
  let serial = '19';
  let isStandardJNTU = false;

  if (match) {
    batchYear = match[1];
    deptCode = match[2];
    serial = match[3];
    isStandardJNTU = true;
  } else if (roll.includes('6619')) {
    deptCode = '66';
    serial = '19';
    batchYear = roll.slice(0, 2) || '23';
    isStandardJNTU = true;
  } else if (roll.startsWith('23') || roll.startsWith('24') || roll.startsWith('25') || roll.startsWith('26')) {
    batchYear = roll.slice(0, 2);
    deptCode = '05';
    serial = '01';
    isStandardJNTU = true;
  }

  if (!isStandardJNTU) {
    return { error: 'UNKNOWN_USER', roll: roll };
  }

  const deptKey = codeToDeptKey[deptCode] || 'CSM';
  const dInfo = deptInfoMap[deptKey] || { name: 'Computer Science & Engineering', code: '05' };

  // Password verification with credential store check:
  let storedCred = window.userCredentialStore ? window.userCredentialStore[roll] : null;
  let activePassword = storedCred ? storedCred.password : null;

  let isPasswordValid = false;
  if (activePassword) {
    if (pass === activePassword || pass.toLowerCase() === activePassword.toLowerCase()) {
      isPasswordValid = true;
    }
  } else {
    const passLower = pass.toLowerCase();
    const rollLower = roll.toLowerCase();
    if (serial === '19' && deptCode === '66') {
      if (passLower === `${batchYear}e51a66619` || passLower === `${batchYear}e51a6619` || passLower === rollLower || pass === roll) {
        isPasswordValid = true;
      }
    } else {
      if (passLower === rollLower || pass === roll) {
        isPasswordValid = true;
      }
    }
  }

  if (!isPasswordValid) {
    const expectedHint = activePassword ? 'Your updated password' : 
      ((serial === '19' && deptCode === '66') ? `${batchYear}e51a66619` : roll.toLowerCase());
    return { error: 'WRONG_PASSWORD', roll: roll, expectedHint: expectedHint };
  }

  let yearSemText = 'IV Year / Semester VII (Batch 2023–2027)';
  if (batchYear === '24') yearSemText = 'III Year / Semester V (Batch 2024–2028)';
  if (batchYear === '25') yearSemText = 'II Year / Semester III (Batch 2025–2029)';
  if (batchYear === '26') yearSemText = 'I Year / Semester I (Batch 2026–2030)';

  const subjects = branchSubjectsDB[deptKey] || branchSubjectsDB['CSM'];

  // Determine section (Serial <= 15 -> Sec A, else Sec B)
  const serialNum = parseInt(serial, 10);
  const section = (!isNaN(serialNum) && serialNum > 15) ? 'Section B' : 'Section A';

  return {
    success: true,
    roll: roll,
    batch: batchYear,
    deptCode: deptCode,
    deptKey: deptKey,
    name: (storedCred && storedCred.alias) ? `Student (${storedCred.alias} — ${roll})` : `Student (${roll} — ${deptKey})`,
    branch: `B.Tech in ${dInfo.name} (${deptKey})`,
    yearSem: yearSemText,
    section: section,
    cgpa: '8.82 / 10.0 (CGPA)',
    attendance: '89.4% (Eligible for Examinations)',
    backlogs: '0 Active Backlogs',
    feeDue: 'All Fees Paid / Cleared',
    subjects: subjects,
    mentor: `Dr. ${deptKey} HOD (Office: ${deptKey} Block 101)`,
    contact: '+91 98480 12345'
  };
}

// Fallback studentUsers dictionary
const studentUsers = {
  '23E51A6619': resolveStudentUser('23E51A6619', '23e51a66619'),
  '24E51A6619': resolveStudentUser('24E51A6619', '24e51a66619'),
  '25E51A6619': resolveStudentUser('25E51A6619', '25e51a66619'),
  '26E51A6619': resolveStudentUser('26E51A6619', '26e51a66619'),
  '23E51A0501': resolveStudentUser('23E51A0501', '23e51a0501')
};

// 5. PORTAL ACCESS GOVERNANCE STATE (Admin Management Center)
window.portalAccessState = {
  globalFaculty: true,
  globalStudent: true,
  departments: {
    'CSE': { faculty: true, student: true, name: 'Computer Science & Engineering' },
    'CSM': { faculty: true, student: true, name: 'CSE (AI & ML) [Code: 66]' },
    'CSD': { faculty: true, student: true, name: 'CSE (Data Science) [Code: 67]' },
    'ECE': { faculty: true, student: true, name: 'Electronics & Communication [Code: 04]' },
    'MECH': { faculty: true, student: true, name: 'Mechanical Engineering [Code: 03]' },
    'CIVIL': { faculty: true, student: true, name: 'Civil Engineering [Code: 01]' },
    'EEE': { faculty: true, student: true, name: 'Electrical & Electronics [Code: 02]' },
    'IOT': { faculty: true, student: true, name: 'Internet of Things [Code: 69]' },
    'CSO': { faculty: true, student: true, name: 'Cyber Security & Operations [Code: 62]' }
  },
  batches: {
    '23': true,
    '24': true,
    '25': true,
    '26': true
  },
  userOverrides: {}
};

// Admin Handlers
window.adminToggleGlobal = function(portalType, currentAdminId) {
  if (portalType === 'faculty') {
    window.portalAccessState.globalFaculty = !window.portalAccessState.globalFaculty;
    const status = window.portalAccessState.globalFaculty ? 'GRANTED (Active)' : 'SUSPENDED';
    showDemoNotice(`Administrator Action: Faculty Portal global access is now ${status}.`);
  } else {
    window.portalAccessState.globalStudent = !window.portalAccessState.globalStudent;
    const status = window.portalAccessState.globalStudent ? 'GRANTED (Active)' : 'SUSPENDED';
    showDemoNotice(`Administrator Action: Student Portal global access is now ${status}.`);
  }
  window.authenticatePortal('admin', currentAdminId);
};

window.adminToggleDept = function(deptKey, accessType, currentAdminId) {
  if (window.portalAccessState.departments[deptKey]) {
    const cur = window.portalAccessState.departments[deptKey][accessType];
    window.portalAccessState.departments[deptKey][accessType] = !cur;
    const status = !cur ? 'GRANTED' : 'SUSPENDED';
    showDemoNotice(`Updated: ${deptKey} ${accessType.toUpperCase()} access set to ${status}.`);
    window.authenticatePortal('admin', currentAdminId);
  }
};

window.adminToggleBatch = function(batchYear, currentAdminId) {
  const cur = window.portalAccessState.batches[batchYear] !== false;
  window.portalAccessState.batches[batchYear] = !cur;
  const status = !cur ? 'GRANTED' : 'SUSPENDED';
  showDemoNotice(`Updated: Batch 20${batchYear} student portal access set to ${status}.`);
  window.authenticatePortal('admin', currentAdminId);
};

window.adminSetUserOverride = function(grant, currentAdminId) {
  const input = document.getElementById('adminTargetUserOverride');
  if (!input || !input.value.trim()) {
    showDemoNotice('Please enter a target Student Roll Number or Faculty Employee ID.');
    return;
  }
  const targetId = input.value.trim().toUpperCase();
  window.portalAccessState.userOverrides[targetId] = grant;
  const status = grant ? 'ACCESS GRANTED' : 'ACCESS REVOKED / SUSPENDED';
  showDemoNotice(`Admin Policy Enforced: ${targetId} -> ${status}.`);
  window.authenticatePortal('admin', currentAdminId);
};

window.adminResetAllAccess = function(currentAdminId) {
  window.portalAccessState.globalFaculty = true;
  window.portalAccessState.globalStudent = true;
  Object.keys(window.portalAccessState.departments).forEach(k => {
    window.portalAccessState.departments[k].faculty = true;
    window.portalAccessState.departments[k].student = true;
  });
  window.portalAccessState.batches = { '23': true, '24': true, '25': true, '26': true };
  window.portalAccessState.userOverrides = {};
  showDemoNotice('Administrator Action: All Portal permissions restored to FULL ACCESS.');
  window.authenticatePortal('admin', currentAdminId);
};

window.adminApproveLeave = function() {
  showDemoNotice('Faculty leave workflow: Approval registered in prototype database.');
};

window.adminIssueNotice = function() {
  showDemoNotice('Circular broadcasts are issued through the Office of the Principal and JNTUH autonomous channels.');
};

window.adminReconcileBank = function() {
  showDemoNotice('Bank reconciliation is restricted to authorized Accounts Department finance personnel.');
};

// 6. SHARED STATE STORES FOR FACULTY & STUDENT OPERATIONS

// Dynamic Student Roster Generator for any Branch, Year, Section
const sampleStudentNames = [
  'Aarav Sharma', 'Pooja Reddy', 'Vikram Varma', 'Sneha Patel', 
  'Rohit Kulkarni', 'Ananya Rao', 'Rahul Deshmukh', 'Kavya Nair', 
  'Sai Teja', 'Bhavana Joshi', 'Gautam Iyer', 'Naveen Goud',
  'Meera Krishnan', 'Harshith Reddy', 'Divya Chawla'
];

window.getStudentsForClass = function(deptKey, batchYear, section) {
  const code = (deptInfoMap[deptKey] || { code: '05' }).code;
  const isSecA = section === 'A' || section === 'Section A';
  const startSerial = isSecA ? 1 : 16;
  const students = [];

  for (let i = 0; i < 12; i++) {
    const sNum = startSerial + i;
    const pad = sNum < 10 ? `0${sNum}` : `${sNum}`;
    const roll = `${batchYear}E51A${code}${pad}`;
    const name = sampleStudentNames[i % sampleStudentNames.length];
    students.push({
      roll: roll,
      name: name,
      branch: deptKey,
      year: batchYear,
      section: isSecA ? 'A' : 'B',
      cgpa: (8.1 + ((i * 13) % 18) / 10).toFixed(2),
      attendancePct: (85 + ((i * 7) % 14)),
      mentor: `Dr. ${deptKey} HOD`,
      contact: `+91 98480 ${20000 + sNum * 123}`
    });
  }

  // Ensure 23E51A6619 is present in CSM Batch 23 Section B
  if (deptKey === 'CSM' && batchYear === '23' && !isSecA) {
    if (!students.find(s => s.roll === '23E51A6619')) {
      students[3] = {
        roll: '23E51A6619',
        name: 'Student (23E51A6619 — CSM)',
        branch: 'CSM',
        year: '23',
        section: 'B',
        cgpa: '8.82',
        attendancePct: 89.4,
        mentor: 'Dr. CSM HOD',
        contact: '+91 98480 12345'
      };
    }
  }

  return students;
};

// State stores
window.facultyAttendanceDB = window.facultyAttendanceDB || {};
window.facultyMarksDB = window.facultyMarksDB || {};
window.studentComplaintsDB = window.studentComplaintsDB || [
  {
    id: 'TKT-2026-0182',
    category: 'Infrastructure & Labs',
    subject: 'High-speed Wi-Fi access in Central Library 3rd floor',
    date: '2026-10-15',
    urgency: 'Normal',
    status: 'Resolved',
    remarks: 'Additional Aruba Access Point installed by IT cell.'
  },
  {
    id: 'TKT-2026-0245',
    category: 'Campus Transport',
    subject: 'Bus Route 4 (Miyapur - Campus) AC filter maintenance',
    date: '2026-10-22',
    urgency: 'High',
    status: 'Under Review',
    remarks: 'Transport supervisor assigned for bus inspection.'
  }
];
window.studentFeedbackDB = window.studentFeedbackDB || [];

// Active Tab Trackers
window.activeFacultyTab = window.activeFacultyTab || 'attendance';
window.activeStudentTab = window.activeStudentTab || 'details';
window.currentFacultyFilters = window.currentFacultyFilters || {
  branch: 'CSE',
  year: '23',
  section: 'A',
  cieAssessment: 'ciea1'
};

// 7. FACULTY TAB SWITCHING & RENDERING
window.facultySwitchTab = function(tabName, facultyId) {
  window.activeFacultyTab = tabName;
  window.authenticatePortal('faculty', facultyId);
};

window.facultyChangeAttendanceFilter = function(facultyId) {
  const bEl = document.getElementById('facFilterBranch');
  const yEl = document.getElementById('facFilterYear');
  const sEl = document.getElementById('facFilterSec');
  if (bEl) window.currentFacultyFilters.branch = bEl.value;
  if (yEl) window.currentFacultyFilters.year = yEl.value;
  if (sEl) window.currentFacultyFilters.section = sEl.value;
  window.facultySwitchTab('attendance', facultyId);
};

window.toggleFacultyAttendance = function(btn, roll, deptKey, batchYear, section) {
  const attKey = `${deptKey}_${batchYear}_${section}`;
  window.facultyAttendanceDB[attKey] = window.facultyAttendanceDB[attKey] || {};

  if (btn.classList.contains('present')) {
    btn.classList.remove('present');
    btn.classList.add('absent');
    btn.textContent = 'Absent';
    window.facultyAttendanceDB[attKey][roll] = false;
    showDemoNotice(`Marked ${roll} as Absent.`);
  } else {
    btn.classList.remove('absent');
    btn.classList.add('present');
    btn.textContent = 'Present';
    window.facultyAttendanceDB[attKey][roll] = true;
    showDemoNotice(`Marked ${roll} as Present.`);
  }
};

window.facultyMarkAllAttendance = function(present, facultyId) {
  const f = window.currentFacultyFilters;
  const attKey = `${f.branch}_${f.year}_${f.section}`;
  window.facultyAttendanceDB[attKey] = window.facultyAttendanceDB[attKey] || {};
  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  students.forEach(st => {
    window.facultyAttendanceDB[attKey][st.roll] = present;
  });
  showDemoNotice(`All ${students.length} students marked ${present ? 'PRESENT' : 'ABSENT'}.`);
  window.facultySwitchTab('attendance', facultyId);
};

window.facultySaveAttendance = function(facultyId) {
  const f = window.currentFacultyFilters;
  const attKey = `${f.branch}_${f.year}_${f.section}`;
  const records = window.facultyAttendanceDB[attKey] || {};
  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  let pCount = 0;
  students.forEach(st => {
    if (records[st.roll] !== false) pCount++;
  });
  const aCount = students.length - pCount;
  showDemoNotice(`Attendance Register Saved: ${pCount} Present, ${aCount} Absent for ${f.branch} Batch 20${f.year} Sec ${f.section}.`);
};

window.facultySendAlert = function(facultyId) {
  showDemoNotice('Automated SMS alerts dispatched to registered parent contact numbers for absentees.');
};

window.facultyChangeMarksFilter = function(facultyId) {
  const bEl = document.getElementById('facMarksBranch');
  const yEl = document.getElementById('facMarksYear');
  const sEl = document.getElementById('facMarksSec');
  const aEl = document.getElementById('facMarksAssessment');

  if (bEl) window.currentFacultyFilters.branch = bEl.value;
  if (yEl) window.currentFacultyFilters.year = yEl.value;
  if (sEl) {
    window.currentFacultyFilters.section = sEl.value;
    // Default assessment based on section
    if (sEl.value === 'A') {
      if (!['ciea1', 'ciea2', 'ciea3'].includes(window.currentFacultyFilters.cieAssessment)) {
        window.currentFacultyFilters.cieAssessment = 'ciea1';
      }
    } else {
      if (!['cieb1', 'cieb2', 'cieb3'].includes(window.currentFacultyFilters.cieAssessment)) {
        window.currentFacultyFilters.cieAssessment = 'cieb1';
      }
    }
  }
  if (aEl) window.currentFacultyFilters.cieAssessment = aEl.value;

  window.facultySwitchTab('marks', facultyId);
};

window.facultyRecalculateRowGrade = function(roll) {
  const input = document.getElementById(`marks_${roll}`);
  const badge = document.getElementById(`grade_${roll}`);
  if (!input || !badge) return;
  const val = parseFloat(input.value) || 0;
  let grade = 'F (Remedial)';
  let bg = '#fee2e2';
  let color = '#991b1b';

  if (val >= 23) { grade = 'O (Outstanding)'; bg = '#dcfce7'; color = '#15803d'; }
  else if (val >= 20) { grade = 'A+ (Excellent)'; bg = '#f0fdf4'; color = '#166534'; }
  else if (val >= 17) { grade = 'A (Very Good)'; bg = '#ecfdf5'; color = '#047857'; }
  else if (val >= 14) { grade = 'B+ (Good)'; bg = '#fef3c7'; color = '#92400e'; }
  else if (val >= 12) { grade = 'B (Above Average)'; bg = '#fef9c3'; color = '#854d0e'; }

  badge.textContent = grade;
  badge.style.background = bg;
  badge.style.color = color;
};

window.facultySaveMarks = function(facultyId) {
  const f = window.currentFacultyFilters;
  const marksKey = `${f.branch}_${f.year}_${f.section}_${f.cieAssessment}`;
  window.facultyMarksDB[marksKey] = window.facultyMarksDB[marksKey] || {};

  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  students.forEach(st => {
    const input = document.getElementById(`marks_${st.roll}`);
    if (input) {
      const val = parseFloat(input.value) || 0;
      window.facultyMarksDB[marksKey][st.roll] = val;
    }
  });

  showDemoNotice(`CIE Marks successfully saved & uploaded for ${f.branch} Sec ${f.section} [${f.cieAssessment.toUpperCase()}].`);
};

window.facultyCalculateClassAnalytics = function(facultyId) {
  const f = window.currentFacultyFilters;
  const marksKey = `${f.branch}_${f.year}_${f.section}_${f.cieAssessment}`;
  const scores = window.facultyMarksDB[marksKey] || {};
  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  
  let total = 0;
  let max = 0;
  let min = 25;
  let passed = 0;

  students.forEach(st => {
    const val = (scores[st.roll] !== undefined) ? scores[st.roll] : (20 + (parseInt(st.roll.slice(-2), 10) % 5));
    total += val;
    if (val > max) max = val;
    if (val < min) min = val;
    if (val >= 12) passed++;
  });

  const avg = (total / students.length).toFixed(1);
  const passPct = ((passed / students.length) * 100).toFixed(0);

  const container = document.getElementById('marksAnalyticsBox');
  if (container) {
    container.innerHTML = `
      <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:10px 14px; margin-top:12px; display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; text-align:center;">
        <div><strong style="color:#15803d; font-size:16px;">${avg} / 25</strong><div style="font-size:11px; color:#64748b;">Class Average</div></div>
        <div><strong style="color:#0f172a; font-size:16px;">${max} / 25</strong><div style="font-size:11px; color:#64748b;">Highest Score</div></div>
        <div><strong style="color:#0f172a; font-size:16px;">${min} / 25</strong><div style="font-size:11px; color:#64748b;">Lowest Score</div></div>
        <div><strong style="color:#15803d; font-size:16px;">${passPct}%</strong><div style="font-size:11px; color:#64748b;">CIE Pass Rate</div></div>
      </div>
    `;
  }
  showDemoNotice('CIE Class Analytics computed across all enrolled students.');
};

window.facultyExportMarksCSV = function(facultyId) {
  const f = window.currentFacultyFilters;
  showDemoNotice(`Export Generated: ${f.branch}_Batch${f.year}_Sec${f.section}_${f.cieAssessment.toUpperCase()}.csv ready.`);
};

window.facultySubmitActionReport = function() {
  showDemoNotice('Faculty Self-Appraisal & Action Taken Report submitted to HOD and Academic Dean.');
};

// 8. STUDENT TAB SWITCHING & RENDERING
window.studentSwitchTab = function(tabName, roll) {
  window.activeStudentTab = tabName;
  window.authenticatePortal('student', roll);
};

window.studentSelectRating = function(metric, val) {
  for (let i = 1; i <= 5; i++) {
    const chip = document.getElementById(`rate_${metric}_${i}`);
    if (chip) {
      if (i === val) chip.classList.add('active');
      else chip.classList.remove('active');
    }
  }
};

window.studentSubmitFeedback = function(roll) {
  const crsEl = document.getElementById('studentFeedbackCourse');
  const commentEl = document.getElementById('studentFeedbackComment');
  const course = crsEl ? crsEl.value : 'General Course Feedback';
  const comment = commentEl ? commentEl.value.trim() : '';

  window.studentFeedbackDB.push({
    course: course,
    roll: roll,
    date: new Date().toISOString().slice(0, 10),
    rating: 5,
    comment: comment || 'Satisfied with curriculum delivery.'
  });

  if (commentEl) commentEl.value = '';
  showDemoNotice(`Feedback submitted for ${course}. Thank you for your constructive evaluation!`);
  window.studentSwitchTab('feedback', roll);
};

window.studentSubmitComplaint = function(roll) {
  const catEl = document.getElementById('complaintCategory');
  const urgEl = document.getElementById('complaintUrgency');
  const subEl = document.getElementById('complaintSubject');
  const descEl = document.getElementById('complaintDesc');

  if (!subEl || !subEl.value.trim()) {
    showDemoNotice('Please enter a complaint subject line.');
    return;
  }

  const newTicket = {
    id: `TKT-2026-0${Math.floor(300 + Math.random() * 699)}`,
    category: catEl ? catEl.value : 'Academic',
    subject: subEl.value.trim(),
    urgency: urgEl ? urgEl.value : 'Normal',
    date: new Date().toISOString().slice(0, 10),
    status: 'Under Review',
    remarks: 'Assigned to Dean of Student Affairs / Campus Maintenance Officer.'
  };

  window.studentComplaintsDB.unshift(newTicket);
  showDemoNotice(`Grievance ticket ${newTicket.id} registered. You can track status below.`);
  window.studentSwitchTab('complaints', roll);
};

window.studentUpdateCredentials = function(roll) {
  const curPassEl = document.getElementById('credCurrentPass');
  const newPassEl = document.getElementById('credNewPass');
  const confPassEl = document.getElementById('credConfirmPass');
  const aliasEl = document.getElementById('credAlias');

  if (!curPassEl || !newPassEl || !confPassEl) return;

  const curPass = curPassEl.value.trim();
  const newPass = newPassEl.value.trim();
  const confPass = confPassEl.value.trim();
  const alias = aliasEl ? aliasEl.value.trim() : '';

  // Validate current password
  const testRes = resolveStudentUser(roll, curPass);
  if (!testRes || testRes.error) {
    showDemoNotice('Current password does not match. Please verify credentials.');
    return;
  }

  if (newPass.length < 6) {
    showDemoNotice('New password must be at least 6 characters long.');
    return;
  }

  if (newPass !== confPass) {
    showDemoNotice('New password and confirm password do not match.');
    return;
  }

  // Store new credentials
  window.userCredentialStore[roll] = {
    password: newPass,
    alias: alias || roll
  };

  if (alias) {
    window.userCredentialStore[alias.toUpperCase()] = {
      mappedRoll: roll,
      password: newPass
    };
  }

  showDemoNotice(`Credentials successfully updated! Your new password is now active.`);
  window.studentSwitchTab('credentials', roll);
};

// 9. SIGN IN FORM GENERATION
function generatePortalLoginHTML(portalType) {
  let title = '';
  let idLabel = '';
  let defaultId = '';
  let defaultPass = '';
  let presetsHTML = '';

  if (portalType === 'admin') {
    title = 'HITAM Administrative Portal';
    idLabel = 'Admin Username (ADMINHTM01 to ADMINHTM03)';
    defaultId = 'ADMINHTM01';
    defaultPass = 'AdminHtm01';
    presetsHTML = `
      <div class="portal-user-presets-row">
        <span style="font-size:11px; color:#557260; align-self:center;">Profiles:</span>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ADMINHTM01', 'AdminHtm01')">ADMINHTM01 (Campus Admin)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ADMINHTM02', 'AdminHtm02')">ADMINHTM02 (Principal)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ADMINHTM03', 'AdminHtm03')">ADMINHTM03 (Chairman)</button>
      </div>
    `;
  } else if (portalType === 'faculty') {
    title = 'HITAM Faculty Portal';
    idLabel = 'Faculty Employee Code / HOD ID';
    defaultId = 'CSEHOD';
    defaultPass = 'Csehod01';
    presetsHTML = `
      <div class="portal-user-presets-row" style="flex-wrap:wrap; gap:6px;">
        <span style="font-size:11px; color:#557260; align-self:center;">Profiles:</span>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('CSEHOD', 'Csehod01')">CSEHOD (HOD CSE)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('CSE01', 'Csefaculty')">CSE01 (CSE Faculty)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('CSMHOD', 'Csmhod01')">CSMHOD (HOD CSM)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('CSM01', 'Csmfaculty')">CSM01 (CSM Faculty)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ECEHOD', 'Ecehod01')">ECEHOD (HOD ECE)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('ECE01', 'Ecefaculty')">ECE01 (ECE Faculty)</button>
      </div>
    `;
  } else {
    title = 'HITAM Student Portal';
    idLabel = 'Student Roll Number (Batches 23 to 26)';
    defaultId = '23E51A6619';
    defaultPass = '23e51a66619';
    presetsHTML = `
      <div class="portal-user-presets-row" style="flex-wrap:wrap; gap:6px;">
        <span style="font-size:11px; color:#557260; align-self:center;">Profiles:</span>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('23E51A6619', '23e51a66619')">23E51A6619 (CSM Batch 23)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('24E51A6619', '24e51a66619')">24E51A6619 (CSM Batch 24)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('25E51A6619', '25e51a66619')">25E51A6619 (CSM Batch 25)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('26E51A6619', '26e51a66619')">26E51A6619 (CSM Batch 26)</button>
        <button type="button" class="preset-chip" onclick="setPortalLoginUser('23E51A0501', '23e51a0501')">23E51A0501 (CSE Batch 23)</button>
      </div>
    `;
  }

  return `
    <div>
      <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🔐 <strong>Authenticated Portal Access:</strong> Enter your registered credentials below or select a profile shortcut to sign in.
      </div>

      <div class="portal-login-card">
        <h4 style="margin-top:0; color:#013b1f;">🔐 ${title} — Sign In</h4>
        <form onsubmit="event.preventDefault(); authenticatePortal('${portalType}');">
          <div class="portal-field-group">
            <label>${idLabel}</label>
            <input type="text" id="portalLoginId" value="" placeholder="e.g., ${defaultId}" required>
          </div>
          ${presetsHTML}
          <div class="portal-field-group" style="margin-top:10px;">
            <label>Password</label>
            <input type="password" id="portalPassword" placeholder="Enter password (e.g. ${defaultPass})" required autocomplete="off">
            <div style="font-size:11px; color:#64748b; margin-top:3px;">
              ${portalType === 'admin' ? 'Admins 01–03: AdminHtm01 / AdminHtm02 / AdminHtm03' : 
                (portalType === 'faculty' ? 'HODs: [Branch]hod01 (e.g. Csehod01) • Faculty: [Branch]faculty (e.g. Csefaculty)' : 
                'CSM 6619: 23e51a66619 • Other Students: your roll number in lowercase')}
            </div>
          </div>
          <div class="portal-btn-row">
            <button type="submit" class="modal-action-btn primary-btn">Sign In to Dashboard →</button>
          </div>
        </form>
      </div>

      <div class="modal-highlight-box" style="margin-top:14px;">
        <strong>Quick Sign-In:</strong> Click on any profile chip above to automatically load credentials and test administrative controls, department attendance, or student records.
      </div>

      <div style="margin-top:16px; text-align:center;">
        <a href="https://www.hitam.org" target="_blank" rel="noopener" style="font-size:12.5px; color:#013b1f; text-decoration:underline; font-weight:700;">Visit HITAM Institutional Portal (hitam.org) ↗</a>
      </div>
    </div>
  `;
}

window.setPortalLoginUser = function(userId, password) {
  const inputId = document.getElementById('portalLoginId');
  const inputPass = document.getElementById('portalPassword');
  if (inputId) inputId.value = userId;
  if (inputPass && password) inputPass.value = password;
  showDemoNotice(`Loaded credentials for: ${userId}`);
};

// 10. ERROR & ACCESS STATUS SCREENS
function renderPortalUnknownId(portalType, userId) {
  const body = document.getElementById('modalBody');
  if (!body) return;

  const safeId = (userId || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const typeLabel = portalType === 'admin' ? 'Administrative' : (portalType === 'faculty' ? 'Faculty' : 'Student');

  body.innerHTML = `
    <div class="drill-detail-view" style="padding:28px 18px; text-align:center;">
      <div style="font-size:48px; margin-bottom:12px;">🔒</div>
      <h3 style="color:#b91c1c; margin-top:0; margin-bottom:8px;">Access Identifier Not Recognized</h3>
      <p style="font-size:13.5px; color:#475569; max-width:540px; margin:0 auto 16px; line-height:1.6;">
        The identifier <strong>"${safeId || '(empty)'}"</strong> does not match any registered account in the ${typeLabel} Portal.
      </p>
      <div class="portal-demo-banner" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:12px 16px; border-radius:6px; font-size:12.5px; text-align:left; max-width:540px; margin:0 auto 18px; line-height:1.5;">
        ⚠️ <strong>Verification Policy:</strong> Access requires a registered account ID (Admins: ADMINHTM01–03, Faculty: e.g. CSEHOD, CSE01–06, Students: Roll numbers like 23E51A6619).
      </div>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('${portalType}-portal')">← Back to Sign In Form</button>
        <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">Visit HITAM Portal (hitam.org) ↗</a>
      </div>
    </div>
  `;
}

function renderPortalWrongPassword(portalType, userId, hint) {
  const body = document.getElementById('modalBody');
  if (!body) return;

  const safeId = (userId || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  body.innerHTML = `
    <div class="drill-detail-view" style="padding:28px 18px; text-align:center;">
      <div style="font-size:48px; margin-bottom:12px;">🔑</div>
      <h3 style="color:#b91c1c; margin-top:0; margin-bottom:8px;">Incorrect Password</h3>
      <p style="font-size:13.5px; color:#475569; max-width:540px; margin:0 auto 16px; line-height:1.6;">
        The password entered for <strong>"${safeId}"</strong> is incorrect.
      </p>
      <div class="portal-demo-banner" style="background:#fff7ed; border:1px solid #fed7aa; color:#9a3412; padding:12px 16px; border-radius:6px; font-size:12.5px; text-align:left; max-width:540px; margin:0 auto 18px; line-height:1.5;">
        💡 <strong>Password Reminder:</strong> ${hint ? `Expected format: <code>${hint}</code>` : 'Please check your capitalization and credentials.'}
      </div>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('${portalType}-portal')">← Retry Sign In</button>
      </div>
    </div>
  `;
}

function renderPortalAccessDenied(portalType, reason) {
  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view" style="padding:28px 18px; text-align:center;">
      <div style="font-size:48px; margin-bottom:12px;">🚫</div>
      <h3 style="color:#b91c1c; margin-top:0; margin-bottom:8px;">Access Suspended by Administrator</h3>
      <p style="font-size:13.5px; color:#475569; max-width:540px; margin:0 auto 16px; line-height:1.6;">
        ${reason}
      </p>
      <div class="portal-demo-banner" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:12px 16px; border-radius:6px; font-size:12.5px; text-align:left; max-width:540px; margin:0 auto 18px; line-height:1.5;">
        🛡️ <strong>Governance Notice:</strong> Portal access for this account has been restricted via the Administrative Portal Governance Console.
      </div>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('${portalType}-portal')">← Back to Portal Home</button>
        <button class="drill-action-btn drill-action-secondary" onclick="openModal('admin-portal')">Admin Sign In →</button>
      </div>
    </div>
  `;
}

// 11. HALL TICKET & RECEIPT HELPERS
window.studentShowHallTicket = function(roll) {
  const st = resolveStudentUser(roll, roll.toLowerCase()) || studentUsers[roll];
  if (!st || st.error) {
    showDemoNotice('Hall ticket record not available for this roll number.');
    return;
  }

  const subjectsRows = st.subjects.map((sub, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${sub.code}</strong></td>
      <td>${sub.name}</td>
      <td>Morning (10:00 AM – 1:00 PM)</td>
      <td>Verified (Regular)</td>
    </tr>
  `).join('');

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view">
      <button class="sub-back-btn" onclick="authenticatePortal('student', '${st.roll}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to Student Dashboard</span>
      </button>

      <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
        🎟️ <strong>Autonomous Examination Admit Card:</strong> Examination hall tickets are issued by the autonomous examination branch.
      </div>

      <div class="hall-ticket-container">
        <div class="ht-header">
          <div class="ht-title">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
          <div class="ht-sub">AUTONOMOUS REGULAR EXAMINATION — ADMIT CARD / HALL TICKET</div>
        </div>

        <div class="ht-meta-grid">
          <div><strong>Student Name:</strong> ${st.name}</div>
          <div><strong>Hall Ticket No:</strong> <span style="color:#08752f; font-weight:800">${st.roll}</span></div>
          <div><strong>Course &amp; Program:</strong> ${st.branch}</div>
          <div><strong>Academic Year:</strong> ${st.yearSem}</div>
          <div><strong>Exam Center:</strong> HITAM Campus Center (Code: HITM)</div>
        </div>

        <table class="ht-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Exam Timing</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${subjectsRows}
          </tbody>
        </table>

        <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:11px; color:#557260;">* Stamped digital copy. Examination hall ticket verified.</div>
          <button class="drill-action-btn drill-action-primary" onclick="window.print()">🖨️ Print Hall Ticket</button>
        </div>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

window.studentViewMemoInfo = function(roll) {
  showDemoNotice('Stamped semester grade sheets (memos) are issued by the HITAM Autonomous Examination Section.');
};

window.studentViewReceiptInfo = function(roll) {
  showDemoNotice('Stamped fee receipts are issued by the HITAM Accounts Section upon verification.');
};

window.studentApplyBonafide = function(roll) {
  showDemoNotice('Bonafide certificate application recorded for student desk processing.');
};

window.studentApplyLeave = function(roll) {
  showDemoNotice('Leave application submitted to Mentor and HOD for attendance condonation review.');
};

// 12. MAIN PORTAL AUTHENTICATION & DASHBOARD RENDERER
window.authenticatePortal = function(portalType, overrideId = null) {
  const loginInput = document.getElementById('portalLoginId');
  const passInput = document.getElementById('portalPassword');
  
  const userId = overrideId || (loginInput ? loginInput.value.trim().toUpperCase() : null);
  const password = passInput ? passInput.value.trim() : '';
  const body = document.getElementById('modalBody');
  if (!body) return;

  if (!userId) {
    showDemoNotice('Please enter an account username or roll number.');
    return;
  }

  // A. ADMIN AUTHENTICATION
  if (portalType === 'admin') {
    const user = adminUsers[userId];
    if (!user) {
      renderPortalUnknownId('admin', userId);
      return;
    }

    // Verify Password if not overridden
    if (!overrideId) {
      if (!password) {
        showDemoNotice('Please enter the administrator password.');
        return;
      }
      const passLower = password.toLowerCase();
      const expectedLower = user.password.toLowerCase();
      if (passLower !== expectedLower && passLower !== 'adminhtm01') {
        renderPortalWrongPassword('admin', userId, user.password);
        return;
      }
    }

    // Generate Branch Rows for Admin Access Management
    const deptRowsHTML = Object.keys(window.portalAccessState.departments).map(deptKey => {
      const d = window.portalAccessState.departments[deptKey];
      const facStatus = d.faculty;
      const stuStatus = d.student;
      return `
        <tr>
          <td><strong>${deptKey}</strong> <span style="font-size:11px; color:#64748b;">(${d.name})</span></td>
          <td>
            <button class="drill-action-btn ${facStatus ? 'drill-action-primary' : 'drill-action-secondary'}" 
                    style="padding:3px 8px; font-size:11px;" 
                    onclick="adminToggleDept('${deptKey}', 'faculty', '${user.id}')">
              ${facStatus ? '✅ Allowed' : '🚫 Suspended'}
            </button>
          </td>
          <td>
            <button class="drill-action-btn ${stuStatus ? 'drill-action-primary' : 'drill-action-secondary'}" 
                    style="padding:3px 8px; font-size:11px;" 
                    onclick="adminToggleDept('${deptKey}', 'student', '${user.id}')">
              ${stuStatus ? '✅ Allowed' : '🚫 Suspended'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Generate Batch Access Buttons
    const batchButtonsHTML = ['23', '24', '25', '26'].map(bYear => {
      const isAllowed = window.portalAccessState.batches[bYear] !== false;
      return `
        <button class="drill-action-btn ${isAllowed ? 'drill-action-primary' : 'drill-action-secondary'}" 
                style="padding:4px 10px; font-size:11.5px;" 
                onclick="adminToggleBatch('${bYear}', '${user.id}')">
          Batch 20${bYear}: ${isAllowed ? '✅ Access Active' : '🚫 Suspended'}
        </button>
      `;
    }).join('');

    // Render Admin Dashboard
    body.innerHTML = `
      <div class="portal-dashboard-wrap">
        <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
          🛡️ <strong>Administrative Governance Console:</strong> Signed in as <b>${user.name}</b> (${user.badge}).
        </div>

        <div class="portal-profile-bar">
          <div class="portal-user-info">
            <div class="portal-avatar">AD</div>
            <div>
              <div class="portal-user-name">${user.name}</div>
              <div class="portal-user-meta">${user.role} • ID: <b>${user.id}</b> • ${user.dept}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="https://www.hitam.org" target="_blank" rel="noopener" class="portal-logout-btn" style="text-decoration:none; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; display:inline-flex; align-items:center; gap:4px;">HITAM Portal ↗</a>
            <button class="portal-logout-btn" onclick="openModal('admin-portal')">Sign Out</button>
          </div>
        </div>

        <div class="portal-kpi-grid">
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.students}</div><div class="portal-kpi-lbl">Student Enrolment</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.faculty}</div><div class="portal-kpi-lbl">Active Faculty &amp; HODs</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val" style="color:#08752f">${user.attendance}</div><div class="portal-kpi-lbl">Attendance Rate</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.collections}</div><div class="portal-kpi-lbl">Finance &amp; Collections</div></div>
        </div>

        <!-- ADMIN PORTAL ACCESS CONTROL PANEL -->
        <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:16px; margin:18px 0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <h4 style="margin:0; color:#065f46; font-size:15px; display:flex; align-items:center; gap:6px;">
              <span>🛡️</span> Portal Access Control &amp; Permissions Manager
            </h4>
            <button class="drill-action-btn drill-action-secondary" style="font-size:11px; padding:3px 8px;" onclick="adminResetAllAccess('${user.id}')">Reset All Permissions (Full Access)</button>
          </div>
          <p style="font-size:12px; color:#166534; margin:0 0 12px 0;">
            As an Administrator, you can grant, suspend, or configure live portal access for Faculty and Students across all 9 departments and batches.
          </p>

          <!-- Master Global Switches -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
            <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13px; color:#0f172a; display:block;">Faculty Portal Master Switch</strong>
                <span style="font-size:11.5px; color:#64748b;">Global access for all 9 departments</span>
              </div>
              <button class="drill-action-btn ${window.portalAccessState.globalFaculty ? 'drill-action-primary' : 'drill-action-secondary'}" 
                      onclick="adminToggleGlobal('faculty', '${user.id}')">
                ${window.portalAccessState.globalFaculty ? '✅ Granted (Active)' : '🚫 Suspended'}
              </button>
            </div>

            <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13px; color:#0f172a; display:block;">Student Portal Master Switch</strong>
                <span style="font-size:11.5px; color:#64748b;">Global access for all Batches 23–26</span>
              </div>
              <button class="drill-action-btn ${window.portalAccessState.globalStudent ? 'drill-action-primary' : 'drill-action-secondary'}" 
                      onclick="adminToggleGlobal('student', '${user.id}')">
                ${window.portalAccessState.globalStudent ? '✅ Granted (Active)' : '🚫 Suspended'}
              </button>
            </div>
          </div>

          <!-- Student Batch Access Controls -->
          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:14px;">
            <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:6px;">🎓 Manage Student Batch Permissions:</strong>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${batchButtonsHTML}
            </div>
          </div>

          <!-- Department Access Matrix -->
          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:14px;">
            <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:8px;">🏛️ Department-Wise Portal Access Matrix (9 Engineering Branches):</strong>
            <div style="overflow-x:auto;">
              <table class="ht-table" style="font-size:12px; width:100%;">
                <thead>
                  <tr>
                    <th>Branch / Department</th>
                    <th>Faculty Portal Access</th>
                    <th>Student Portal Access</th>
                  </tr>
                </thead>
                <tbody>
                  ${deptRowsHTML}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Targeted User Override -->
          <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px;">
            <strong style="font-size:12.5px; color:#0f172a; display:block; margin-bottom:6px;">👤 Individual Account Access Override:</strong>
            <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
              <input type="text" id="adminTargetUserOverride" placeholder="Enter Roll No or Employee ID (e.g. 23E51A6619 or CSE01)" 
                     style="flex:1; min-width:240px; padding:6px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12px;">
              <button class="drill-action-btn drill-action-primary" style="padding:6px 12px; font-size:12px;" onclick="adminSetUserOverride(true, '${user.id}')">Grant Access</button>
              <button class="drill-action-btn drill-action-secondary" style="padding:6px 12px; font-size:12px;" onclick="adminSetUserOverride(false, '${user.id}')">Revoke Access</button>
            </div>
          </div>
        </div>

        <h4>📊 Admin Governance Demonstration Tools:</h4>
        <div class="modal-grid-features">
          <div class="modal-feature-card">
            <strong>📝 B.Tech Admissions &amp; Enrolment</strong>
            <span>Seats allotted under Convener (TG EAPCET) &amp; Management quota.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11px;" onclick="showDemoNotice('Admissions queue review is simulated for UI preview.')">Review Admissions Queue →</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>👥 Faculty Leaves &amp; Substitution</strong>
            <span>${user.pendingLeaves} Leave requests in sample queue.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 10px; font-size:11px;" onclick="adminApproveLeave()">✓ Approve Pending Leaves</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>💰 Accounts &amp; Bank Reconciliation</strong>
            <span>Institutional financial reconciliation module mockup.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11px;" onclick="adminReconcileBank()">Reconcile Day's Fees →</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>📜 Circulars &amp; Accreditation Reports</strong>
            <span>Broadcast institutional notices and review NAAC/NIRF audit disclosures.</span>
            <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="adminIssueNotice()">Broadcast Notice</button>
              <a href="https://www.hitam.org" target="_blank" rel="noopener" class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px; text-decoration:none; display:inline-flex; align-items:center;">NAAC Disclosures (hitam.org) ↗</a>
            </div>
          </div>
        </div>
        <div id="modalToastSlot"></div>
      </div>
    `;
    return;
  }

  // B. FACULTY AUTHENTICATION & MULTI-MODULE DASHBOARD
  if (portalType === 'faculty') {
    if (!window.portalAccessState.globalFaculty) {
      renderPortalAccessDenied('faculty', 'Faculty Portal access has been globally suspended by Institutional Administration.');
      return;
    }

    if (window.portalAccessState.userOverrides[userId] === false) {
      renderPortalAccessDenied('faculty', `Access for Faculty ID ${userId} has been suspended by Admin.`);
      return;
    }

    const user = facultyUsers[userId];
    if (!user) {
      renderPortalUnknownId('faculty', userId);
      return;
    }

    const deptKey = user.deptKey;
    if (window.portalAccessState.departments[deptKey] && !window.portalAccessState.departments[deptKey].faculty) {
      renderPortalAccessDenied('faculty', `Faculty Portal access for the ${user.dept} is currently disabled by Admin.`);
      return;
    }

    if (!overrideId) {
      if (!password) {
        showDemoNotice('Please enter your faculty password.');
        return;
      }
      const passLower = password.toLowerCase();
      const expectedLower = user.password.toLowerCase();
      if (passLower !== expectedLower) {
        renderPortalWrongPassword('faculty', userId, user.password);
        return;
      }
    }

    // Default filters
    if (!window.currentFacultyFilters.branch) {
      window.currentFacultyFilters.branch = deptKey;
    }

    const activeTab = window.activeFacultyTab || 'attendance';

    // RENDER TAB CONTENT
    let tabContentHTML = '';

    // 1. ATTENDANCE TAB
    if (activeTab === 'attendance') {
      const f = window.currentFacultyFilters;
      const attKey = `${f.branch}_${f.year}_${f.section}`;
      window.facultyAttendanceDB[attKey] = window.facultyAttendanceDB[attKey] || {};
      const classStudents = window.getStudentsForClass(f.branch, f.year, f.section);

      const studentRowsHTML = classStudents.map(st => {
        const isPresent = window.facultyAttendanceDB[attKey][st.roll] !== false;
        return `
          <tr>
            <td><strong>${st.roll}</strong></td>
            <td>${st.name}</td>
            <td>Batch 20${st.year}</td>
            <td>Sec ${st.section}</td>
            <td>
              <button class="toggle-att-btn ${isPresent ? 'present' : 'absent'}" 
                      onclick="toggleFacultyAttendance(this, '${st.roll}', '${f.branch}', '${f.year}', '${f.section}')">
                ${isPresent ? 'Present' : 'Absent'}
              </button>
            </td>
          </tr>
        `;
      }).join('');

      const branchOptions = Object.keys(deptInfoMap).map(k => 
        `<option value="${k}" ${f.branch === k ? 'selected' : ''}>${k} - ${deptInfoMap[k].name}</option>`
      ).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📋</span> Multi-Branch Class Attendance Register
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Select Branch, Batch Year, and Section to view and record period attendance.
          </p>

          <!-- Attendance Filter Bar -->
          <div class="portal-filter-bar">
            <div class="portal-filter-group" style="flex:2; min-width:180px;">
              <label>Branch / Department:</label>
              <select id="facFilterBranch" class="portal-filter-select" onchange="facultyChangeAttendanceFilter('${user.id}')">
                ${branchOptions}
              </select>
            </div>

            <div class="portal-filter-group">
              <label>Batch / Year:</label>
              <select id="facFilterYear" class="portal-filter-select" onchange="facultyChangeAttendanceFilter('${user.id}')">
                <option value="23" ${f.year === '23' ? 'selected' : ''}>Batch 2023 (IV Year)</option>
                <option value="24" ${f.year === '24' ? 'selected' : ''}>Batch 2024 (III Year)</option>
                <option value="25" ${f.year === '25' ? 'selected' : ''}>Batch 2025 (II Year)</option>
                <option value="26" ${f.year === '26' ? 'selected' : ''}>Batch 2026 (I Year)</option>
              </select>
            </div>

            <div class="portal-filter-group">
              <label>Section:</label>
              <select id="facFilterSec" class="portal-filter-select" onchange="facultyChangeAttendanceFilter('${user.id}')">
                <option value="A" ${f.section === 'A' ? 'selected' : ''}>Section A</option>
                <option value="B" ${f.section === 'B' ? 'selected' : ''}>Section B</option>
              </select>
            </div>

            <div style="margin-left:auto; display:flex; gap:6px; flex-wrap:wrap; align-self:flex-end;">
              <button class="drill-action-btn drill-action-primary" style="padding:6px 10px; font-size:11px;" onclick="facultyMarkAllAttendance(true, '${user.id}')">✓ Mark All Present</button>
              <button class="drill-action-btn drill-action-secondary" style="padding:6px 10px; font-size:11px;" onclick="facultyMarkAllAttendance(false, '${user.id}')">✕ Mark All Absent</button>
            </div>
          </div>

          <!-- Attendance Table -->
          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>Roll Identifier</th>
                  <th>Student Name</th>
                  <th>Batch</th>
                  <th>Section</th>
                  <th>Attendance Status (Click to Toggle)</th>
                </tr>
              </thead>
              <tbody>
                ${studentRowsHTML}
              </tbody>
            </table>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; flex-wrap:wrap; gap:8px;">
            <button class="drill-action-btn drill-action-primary" style="padding:8px 16px; font-weight:800;" onclick="facultySaveAttendance('${user.id}')">💾 Save Attendance Register →</button>
            <button class="drill-action-btn drill-action-secondary" style="padding:8px 14px;" onclick="facultySendAlert('${user.id}')">📱 Send Parent SMS Alerts for Absentees</button>
          </div>
        </div>
      `;
    }

    // 2. UPLOAD MARKS TAB (ciea1, ciea2, ciea3, cieb1, cieb2, cieb3)
    else if (activeTab === 'marks') {
      const f = window.currentFacultyFilters;
      const isSecA = f.section === 'A';
      const cieKey = f.cieAssessment;
      const marksStoreKey = `${f.branch}_${f.year}_${f.section}_${cieKey}`;
      window.facultyMarksDB[marksStoreKey] = window.facultyMarksDB[marksStoreKey] || {};

      const classStudents = window.getStudentsForClass(f.branch, f.year, f.section);

      const branchOptions = Object.keys(deptInfoMap).map(k => 
        `<option value="${k}" ${f.branch === k ? 'selected' : ''}>${k} - ${deptInfoMap[k].name}</option>`
      ).join('');

      const assessmentOptions = isSecA ? `
        <option value="ciea1" ${cieKey === 'ciea1' ? 'selected' : ''}>CIE-1 (Mid-1 Exam + Assignment 1) [ciea1]</option>
        <option value="ciea2" ${cieKey === 'ciea2' ? 'selected' : ''}>CIE-2 (Mid-2 Exam + Assignment 2) [ciea2]</option>
        <option value="ciea3" ${cieKey === 'ciea3' ? 'selected' : ''}>CIE-3 (Lab Internal / Viva) [ciea3]</option>
      ` : `
        <option value="cieb1" ${cieKey === 'cieb1' ? 'selected' : ''}>CIE-1 (Mid-1 Exam + Assignment 1) [cieb1]</option>
        <option value="cieb2" ${cieKey === 'cieb2' ? 'selected' : ''}>CIE-2 (Mid-2 Exam + Assignment 2) [cieb2]</option>
        <option value="cieb3" ${cieKey === 'cieb3' ? 'selected' : ''}>CIE-3 (Lab Internal / Viva) [cieb3]</option>
      `;

      const marksRowsHTML = classStudents.map((st, idx) => {
        const storedScore = window.facultyMarksDB[marksStoreKey][st.roll];
        const defaultScore = storedScore !== undefined ? storedScore : (20 + (parseInt(st.roll.slice(-2), 10) % 5));
        
        let grade = 'A+ (Excellent)';
        let bg = '#f0fdf4';
        let color = '#166534';
        if (defaultScore >= 23) { grade = 'O (Outstanding)'; bg = '#dcfce7'; color = '#15803d'; }
        else if (defaultScore < 17) { grade = 'B+ (Good)'; bg = '#fef3c7'; color = '#92400e'; }

        return `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${st.roll}</strong></td>
            <td>${st.name}</td>
            <td>25</td>
            <td>
              <input type="number" min="0" max="25" class="cie-marks-input" id="marks_${st.roll}" 
                     value="${defaultScore}" oninput="facultyRecalculateRowGrade('${st.roll}')">
            </td>
            <td>
              <span id="grade_${st.roll}" style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px; background:${bg}; color:${color};">
                ${grade}
              </span>
            </td>
          </tr>
        `;
      }).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📊</span> Continuous Internal Evaluation (CIE) Marks Upload Desk
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Upload and verify CIE internal assessments: <b>ciea1, ciea2, ciea3</b> for Section A and <b>cieb1, cieb2, cieb3</b> for Section B.
          </p>

          <!-- CIE Marks Filter Bar -->
          <div class="portal-filter-bar">
            <div class="portal-filter-group" style="flex:2; min-width:160px;">
              <label>Branch / Department:</label>
              <select id="facMarksBranch" class="portal-filter-select" onchange="facultyChangeMarksFilter('${user.id}')">
                ${branchOptions}
              </select>
            </div>

            <div class="portal-filter-group">
              <label>Batch / Year:</label>
              <select id="facMarksYear" class="portal-filter-select" onchange="facultyChangeMarksFilter('${user.id}')">
                <option value="23" ${f.year === '23' ? 'selected' : ''}>Batch 2023 (IV Year)</option>
                <option value="24" ${f.year === '24' ? 'selected' : ''}>Batch 2024 (III Year)</option>
                <option value="25" ${f.year === '25' ? 'selected' : ''}>Batch 2025 (II Year)</option>
                <option value="26" ${f.year === '26' ? 'selected' : ''}>Batch 2026 (I Year)</option>
              </select>
            </div>

            <div class="portal-filter-group">
              <label>Section:</label>
              <select id="facMarksSec" class="portal-filter-select" onchange="facultyChangeMarksFilter('${user.id}')">
                <option value="A" ${f.section === 'A' ? 'selected' : ''}>Section A</option>
                <option value="B" ${f.section === 'B' ? 'selected' : ''}>Section B</option>
              </select>
            </div>

            <div class="portal-filter-group" style="flex:2; min-width:200px;">
              <label>CIE Assessment Component:</label>
              <select id="facMarksAssessment" class="portal-filter-select" onchange="facultyChangeMarksFilter('${user.id}')">
                ${assessmentOptions}
              </select>
            </div>
          </div>

          <!-- Marks Table -->
          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Roll Identifier</th>
                  <th>Student Name</th>
                  <th>Max Score</th>
                  <th>Marks Scored (Editable)</th>
                  <th>Computed Grade</th>
                </tr>
              </thead>
              <tbody>
                ${marksRowsHTML}
              </tbody>
            </table>
          </div>

          <div id="marksAnalyticsBox"></div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="drill-action-btn drill-action-primary" style="padding:8px 16px; font-weight:800;" onclick="facultySaveMarks('${user.id}')">💾 Save &amp; Upload CIE Marks →</button>
              <button class="drill-action-btn drill-action-secondary" style="padding:8px 12px;" onclick="facultyCalculateClassAnalytics('${user.id}')">📈 Calculate Class Analytics</button>
            </div>
            <button class="drill-action-btn drill-action-secondary" style="padding:8px 12px;" onclick="facultyExportMarksCSV('${user.id}')">📥 Export Marks CSV</button>
          </div>
        </div>
      `;
    }

    // 3. STUDENT DETAILS TAB
    else if (activeTab === 'students') {
      const f = window.currentFacultyFilters;
      const classStudents = window.getStudentsForClass(f.branch, f.year, f.section);
      const studentCardsHTML = classStudents.map(st => `
        <tr>
          <td><strong>${st.roll}</strong></td>
          <td>${st.name}</td>
          <td>${st.branch}</td>
          <td>Batch 20${st.year} (${st.section})</td>
          <td><span style="font-weight:700; color:#08752f;">${st.attendancePct}%</span></td>
          <td>${st.cgpa}</td>
          <td>${st.mentor}</td>
          <td><span style="font-size:11px; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px; font-weight:700;">Active / Regular</span></td>
        </tr>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>👥</span> Student Academic Roster &amp; Profiles (${f.branch} - Batch 20${f.year})
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Comprehensive academic standing, attendance rate, CGPA records, and mentor assignments.
          </p>

          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>Roll Identifier</th>
                  <th>Student Name</th>
                  <th>Branch</th>
                  <th>Year &amp; Sec</th>
                  <th>Attendance</th>
                  <th>CGPA</th>
                  <th>Assigned Mentor</th>
                  <th>Enrolment Status</th>
                </tr>
              </thead>
              <tbody>
                ${studentCardsHTML}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 4. FACULTY DETAILS TAB
    else if (activeTab === 'faculty-dir') {
      const roster = departmentFacultyRoster[deptKey] || departmentFacultyRoster['CSE'];
      const facultyCardsHTML = roster.map(m => `
        <div style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:12px 14px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:6px;">
            <div>
              <strong style="font-size:14px; color:#013b1f;">${m.name}</strong>
              <div style="font-size:12px; color:#08752f; font-weight:700;">${m.designation} • ${m.id}</div>
              <div style="font-size:11.5px; color:#64748b; margin-top:2px;">${m.qualification}</div>
            </div>
            <span style="font-size:11px; background:#e8f5ec; color:#086d2a; padding:3px 8px; border-radius:4px; font-weight:700;">${m.load}</span>
          </div>
          <div style="margin-top:8px; font-size:12px; display:grid; grid-template-columns:1fr 1fr; gap:6px;">
            <div><strong>Specialization:</strong> ${m.specialization}</div>
            <div><strong>Cabin Room:</strong> ${m.cabin}</div>
            <div><strong>Subjects:</strong> ${m.subjects}</div>
            <div><strong>Email:</strong> ${m.email}</div>
          </div>
        </div>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>👨‍🏫</span> Department Faculty Directory &amp; Academic Colleagues (${deptKey})
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            1 Head of Department (HOD) and 6 Department Faculty Members with teaching workload and research specializations.
          </p>
          ${facultyCardsHTML}
        </div>
      `;
    }

    // 5. FEEDBACK TAB
    else if (activeTab === 'feedback') {
      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>⭐</span> Student Course &amp; Teaching Feedback Analytics
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Continuous institutional evaluation feedback submitted anonymously by enrolled students.
          </p>

          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:16px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <div style="font-size:12px; color:#166534; font-weight:700;">Overall Teaching Effectiveness Score:</div>
              <div style="font-size:32px; font-weight:900; color:#065f46;">4.82 <span style="font-size:16px; font-weight:600; color:#166534;">/ 5.0</span></div>
              <div style="font-size:11px; color:#557260;">Based on 142 student evaluations for current academic semester.</div>
            </div>
            <div style="min-width:240px; font-size:12px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span>Subject Mastery:</span><strong>4.9 / 5.0</strong></div>
              <div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span>Clarity &amp; Pacing:</span><strong>4.7 / 5.0</strong></div>
              <div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span>Lab &amp; Project Guidance:</span><strong>4.9 / 5.0</strong></div>
              <div style="display:flex; justify-content:space-between;"><span>Doubt Clarification:</span><strong>4.8 / 5.0</strong></div>
            </div>
          </div>

          <h5 style="margin:14px 0 8px 0; color:#013b1f;">Recent Anonymized Student Comments:</h5>
          <div style="display:flex; flex-direction:column; gap:8px; font-size:12.5px;">
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:3px solid #08752f; padding:8px 12px; border-radius:4px;">
              "Explains complex algorithms using practical code demos and real-world industrial case studies."
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:3px solid #08752f; padding:8px 12px; border-radius:4px;">
              "Very approachable during lab sessions and project mentoring; helps clear doubts patiently."
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:3px solid #08752f; padding:8px 12px; border-radius:4px;">
              "Provides prompt evaluation on assignments and sample question banks before autonomous CIE mid exams."
            </div>
          </div>

          <div style="margin-top:16px;">
            <button class="drill-action-btn drill-action-primary" onclick="facultySubmitActionReport()">Submit Faculty Action Taken Report →</button>
          </div>
        </div>
      `;
    }

    // 6. TIMETABLE TAB
    else if (activeTab === 'timetable') {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const ttRowsHTML = days.map((day, dIdx) => `
        <tr>
          <td class="day-col">${day}</td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${deptKey} Core-1</span><span class="timetable-slot-meta">Sec A • Room 204</span></span></td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${deptKey} Core-2</span><span class="timetable-slot-meta">Sec B • Room 205</span></span></td>
          <td><span class="timetable-slot-cell lab"><span class="timetable-slot-sub">Project Lab</span><span class="timetable-slot-meta">Sec A • Lab 3</span></span></td>
          <td style="background:#f1f5f9; font-weight:700; color:#64748b; font-size:10px;">LUNCH</td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">Tutorial / Doubt</span><span class="timetable-slot-meta">Sec B • Room 204</span></span></td>
          <td><span class="timetable-slot-cell lab"><span class="timetable-slot-sub">CIE Mentoring</span><span class="timetable-slot-meta">Mentees</span></span></td>
        </tr>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <div>
              <h4 style="margin:0; color:#013b1f;">🗓️ Weekly Faculty Teaching Schedule &amp; Timetable</h4>
              <span style="font-size:12px; color:#557260;">Academic Year 2026–27 • Department of ${deptInfoMap[deptKey].name}</span>
            </div>
            <button class="drill-action-btn drill-action-secondary" onclick="window.print()">🖨️ Print Timetable</button>
          </div>

          <div style="overflow-x:auto;">
            <table class="timetable-grid-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>P1 (09:30 - 10:30)</th>
                  <th>P2 (10:30 - 11:30)</th>
                  <th>P3 (11:30 - 12:30)</th>
                  <th>12:30 - 01:15</th>
                  <th>P4 (01:15 - 02:15)</th>
                  <th>P5 (02:15 - 03:15)</th>
                </tr>
              </thead>
              <tbody>
                ${ttRowsHTML}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Render Full Faculty Portal View with Tabs
    body.innerHTML = `
      <div class="portal-dashboard-wrap">
        <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
          👨‍🏫 <strong>Faculty Portal View:</strong> Logged in as <b>${user.name}</b> (${user.id}) • ${user.dept}.
        </div>

        <div class="portal-profile-bar">
          <div class="portal-user-info">
            <div class="portal-avatar">FC</div>
            <div>
              <div class="portal-user-name">${user.name}</div>
              <div class="portal-user-meta">${user.role} • ID: <b>${user.id}</b> • ${user.cabin}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="https://www.hitam.org" target="_blank" rel="noopener" class="portal-logout-btn" style="text-decoration:none; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; display:inline-flex; align-items:center; gap:4px;">HITAM Portal ↗</a>
            <button class="portal-logout-btn" onclick="openModal('faculty-portal')">Sign Out</button>
          </div>
        </div>

        <!-- 6 FACULTY TABS (NEW REQUESTED STRUCTURE) -->
        <div class="portal-nav-tabs">
          <button class="portal-tab-btn ${activeTab === 'attendance' ? 'active' : ''}" onclick="facultySwitchTab('attendance', '${user.id}')">
            📋 Attendance (All Branches &amp; Years)
          </button>
          <button class="portal-tab-btn ${activeTab === 'marks' ? 'active' : ''}" onclick="facultySwitchTab('marks', '${user.id}')">
            📊 Upload Marks (ciea1..3, cieb1..3)
          </button>
          <button class="portal-tab-btn ${activeTab === 'students' ? 'active' : ''}" onclick="facultySwitchTab('students', '${user.id}')">
            👥 Student Details
          </button>
          <button class="portal-tab-btn ${activeTab === 'faculty-dir' ? 'active' : ''}" onclick="facultySwitchTab('faculty-dir', '${user.id}')">
            👨‍🏫 Faculty Details
          </button>
          <button class="portal-tab-btn ${activeTab === 'feedback' ? 'active' : ''}" onclick="facultySwitchTab('feedback', '${user.id}')">
            ⭐ Feedback
          </button>
          <button class="portal-tab-btn ${activeTab === 'timetable' ? 'active' : ''}" onclick="facultySwitchTab('timetable', '${user.id}')">
            🗓️ Timetable
          </button>
        </div>

        <!-- Active Tab Container -->
        <div id="facultyTabContainer">
          ${tabContentHTML}
        </div>

        <div id="modalToastSlot"></div>
      </div>
    `;
    return;
  }

  // C. STUDENT AUTHENTICATION & MULTI-MODULE DASHBOARD
  if (portalType === 'student') {
    if (!window.portalAccessState.globalStudent) {
      renderPortalAccessDenied('student', 'Student Portal access has been globally suspended by Institutional Administration.');
      return;
    }

    if (window.portalAccessState.userOverrides[userId] === false) {
      renderPortalAccessDenied('student', `Student Portal access for Roll Number ${userId} has been suspended by Admin.`);
      return;
    }

    // Resolve student user
    const studentUser = resolveStudentUser(userId, overrideId ? (userId.includes('6619') ? '23e51a66619' : userId.toLowerCase()) : password);
    
    if (!studentUser || studentUser.error === 'UNKNOWN_USER') {
      renderPortalUnknownId('student', userId);
      return;
    }

    if (studentUser.error === 'WRONG_PASSWORD') {
      renderPortalWrongPassword('student', userId, studentUser.expectedHint);
      return;
    }

    const batch = studentUser.batch;
    if (window.portalAccessState.batches[batch] === false) {
      renderPortalAccessDenied('student', `Student Portal access for Batch 20${batch} is currently disabled by Admin.`);
      return;
    }

    const deptKey = studentUser.deptKey;
    if (window.portalAccessState.departments[deptKey] && !window.portalAccessState.departments[deptKey].student) {
      renderPortalAccessDenied('student', `Student Portal access for ${studentUser.branch} is currently disabled by Admin.`);
      return;
    }

    const activeTab = window.activeStudentTab || 'details';
    let tabContentHTML = '';

    // 1. STUDENT DETAILS TAB
    if (activeTab === 'details') {
      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>👤</span> Comprehensive Student Profile
          </h4>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px; margin-bottom:14px;">
            <div><strong>Student Roll Number:</strong> <span style="color:#08752f; font-weight:800;">${studentUser.roll}</span></div>
            <div><strong>Enrolment Program:</strong> ${studentUser.branch}</div>
            <div><strong>Academic Standing:</strong> ${studentUser.yearSem}</div>
            <div><strong>Assigned Section:</strong> ${studentUser.section}</div>
            <div><strong>Cumulative CGPA:</strong> <span style="color:#08752f; font-weight:800;">${studentUser.cgpa}</span></div>
            <div><strong>Attendance Record:</strong> ${studentUser.attendance}</div>
            <div><strong>Active Backlogs:</strong> ${studentUser.backlogs}</div>
            <div><strong>Fee Clearance:</strong> ${studentUser.feeDue}</div>
            <div><strong>Assigned Faculty Mentor:</strong> ${studentUser.mentor}</div>
            <div><strong>Institutional Email:</strong> ${studentUser.roll.toLowerCase()}@hitam.org</div>
            <div><strong>Contact Number:</strong> ${studentUser.contact}</div>
            <div><strong>Examination Hall Ticket:</strong> <span style="color:#15803d; font-weight:700;">Verified (Autonomous Center)</span></div>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:16px;">
            <button class="drill-action-btn drill-action-primary" onclick="studentShowHallTicket('${studentUser.roll}')">🎟️ View Autonomous Hall Ticket →</button>
            <button class="drill-action-btn drill-action-secondary" onclick="studentApplyBonafide('${studentUser.roll}')">📄 Request Bonafide Guidelines</button>
            <button class="drill-action-btn drill-action-secondary" onclick="window.print()">🖨️ Print Profile Card</button>
          </div>
        </div>
      `;
    }

    // 2. ATTENDANCE TAB
    else if (activeTab === 'attendance') {
      const subjectRowsHTML = studentUser.subjects.map(s => {
        const pct = ((s.attended / s.hours) * 100).toFixed(1);
        const isGood = parseFloat(pct) >= 75.0;
        return `
          <tr>
            <td><strong>${s.code}</strong></td>
            <td>${s.name}</td>
            <td>${s.hours}</td>
            <td>${s.attended}</td>
            <td><strong style="color:${isGood ? '#08752f' : '#b91c1c'}">${pct}%</strong></td>
            <td>
              <span style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px; background:${isGood ? '#dcfce7' : '#fee2e2'}; color:${isGood ? '#15803d' : '#991b1b'};">
                ${isGood ? 'Eligible' : 'Shortage Alert'}
              </span>
            </td>
          </tr>
        `;
      }).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📊</span> Subject-Wise Attendance Breakdown &amp; Exam Eligibility
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Minimum 75% cumulative attendance required for autonomous semester examination eligibility.
          </p>

          <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="color:#166534; font-size:14px;">Overall Cumulative Attendance: 89.4%</strong>
              <div style="font-size:11.5px; color:#15803d;">Status: Good Standing (Eligible without condonation)</div>
            </div>
            <button class="drill-action-btn drill-action-secondary" onclick="studentApplyLeave('${studentUser.roll}')">Apply for Medical Condonation</button>
          </div>

          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Hours Held</th>
                  <th>Attended</th>
                  <th>Percentage</th>
                  <th>Exam Status</th>
                </tr>
              </thead>
              <tbody>
                ${subjectRowsHTML}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 3. TIMETABLE TAB
    else if (activeTab === 'timetable') {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const ttRowsHTML = days.map((day, dIdx) => `
        <tr>
          <td class="day-col">${day}</td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${studentUser.subjects[0]?.code || 'CORE-1'}</span><span class="timetable-slot-meta">${deptKey} Block 301</span></span></td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${studentUser.subjects[1]?.code || 'CORE-2'}</span><span class="timetable-slot-meta">${deptKey} Block 302</span></span></td>
          <td><span class="timetable-slot-cell lab"><span class="timetable-slot-sub">${studentUser.subjects[4]?.code || 'LAB'}</span><span class="timetable-slot-meta">AI Lab 2</span></span></td>
          <td style="background:#f1f5f9; font-weight:700; color:#64748b; font-size:10px;">LUNCH</td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${studentUser.subjects[2]?.code || 'CORE-3'}</span><span class="timetable-slot-meta">${deptKey} Block 301</span></span></td>
          <td><span class="timetable-slot-cell"><span class="timetable-slot-sub">${studentUser.subjects[3]?.code || 'CORE-4'}</span><span class="timetable-slot-meta">Seminar Hall</span></span></td>
        </tr>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <div>
              <h4 style="margin:0; color:#013b1f;">🗓️ Weekly Student Class Schedule &amp; Timetable</h4>
              <span style="font-size:12px; color:#557260;">${studentUser.branch} • ${studentUser.yearSem} (${studentUser.section})</span>
            </div>
            <button class="drill-action-btn drill-action-secondary" onclick="window.print()">🖨️ Print Timetable</button>
          </div>

          <div style="overflow-x:auto;">
            <table class="timetable-grid-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>P1 (09:30 - 10:30)</th>
                  <th>P2 (10:30 - 11:30)</th>
                  <th>P3 (11:30 - 12:30)</th>
                  <th>12:30 - 01:15</th>
                  <th>P4 (01:15 - 02:15)</th>
                  <th>P5 (02:15 - 03:15)</th>
                </tr>
              </thead>
              <tbody>
                ${ttRowsHTML}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 4. FEE DETAILS TAB
    else if (activeTab === 'fees') {
      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>💰</span> Institutional Fee Ledger &amp; Payment Receipts
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Itemized breakdown of tuition fee, autonomous exam fees, and transaction verification.
          </p>

          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:14px; text-align:center;">
            <div style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:12px;">
              <div style="font-size:11px; color:#64748b;">Total Annual Dues</div>
              <strong style="font-size:18px; color:#0f172a;">₹1,14,500</strong>
            </div>
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-size:11px; color:#166534;">Total Amount Paid</div>
              <strong style="font-size:18px; color:#15803d;">₹1,14,500</strong>
            </div>
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-size:11px; color:#166534;">Outstanding Due Balance</div>
              <strong style="font-size:18px; color:#15803d;">₹0 (Cleared)</strong>
            </div>
          </div>

          <table class="portal-data-table">
            <thead>
              <tr>
                <th>Receipt Number</th>
                <th>Payment Date</th>
                <th>Fee Particulars</th>
                <th>Amount (₹)</th>
                <th>Payment Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>HTM/REC/2026/04812</strong></td>
                <td>12-Jul-2026</td>
                <td>Annual Tuition &amp; Lab Development Fee</td>
                <td>₹1,12,000</td>
                <td>Net Banking / RTGS</td>
                <td><span style="font-size:11px; background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:4px; font-weight:700;">Paid / Settled</span></td>
              </tr>
              <tr>
                <td><strong>HTM/REC/2026/09124</strong></td>
                <td>18-Aug-2026</td>
                <td>Autonomous Examination &amp; Valuation Fee</td>
                <td>₹2,500</td>
                <td>UPI Portal Desk</td>
                <td><span style="font-size:11px; background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:4px; font-weight:700;">Paid / Settled</span></td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top:14px;">
            <button class="drill-action-btn drill-action-primary" onclick="studentViewReceiptInfo('${studentUser.roll}')">🧾 View / Print Stamped Fee Receipt</button>
          </div>
        </div>
      `;
    }

    // 5. MARKS TAB (ciea1, ciea2, ciea3, cieb1, cieb2, cieb3)
    else if (activeTab === 'marks') {
      const isSecA = studentUser.section.includes('A');
      const marksRowsHTML = studentUser.subjects.map(s => `
        <tr>
          <td><strong>${s.code}</strong></td>
          <td>${s.name}</td>
          <td>23 / 25</td>
          <td>24 / 25</td>
          <td>24 / 25</td>
          <td><strong>${s.cie}</strong></td>
          <td>${s.credits}</td>
          <td><span style="font-size:11px; font-weight:700; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px;">O (Outstanding)</span></td>
        </tr>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📝</span> Continuous Internal Evaluation (CIE) Marks &amp; GPA Summary
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            ${isSecA ? 'Section A CIE Evaluation Components: ciea1 (Mid 1), ciea2 (Mid 2), ciea3 (Lab/Quiz).' : 'Section B CIE Evaluation Components: cieb1 (Mid 1), cieb2 (Mid 2), cieb3 (Lab/Quiz).'}
          </p>

          <div style="overflow-x:auto;">
            <table class="portal-data-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>${isSecA ? 'ciea1' : 'cieb1'} (25)</th>
                  <th>${isSecA ? 'ciea2' : 'cieb2'} (25)</th>
                  <th>${isSecA ? 'ciea3' : 'cieb3'} (25)</th>
                  <th>Internal Total</th>
                  <th>Credits</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                ${marksRowsHTML}
              </tbody>
            </table>
          </div>

          <div style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:12px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <strong>Cumulative Grade Point Average (CGPA):</strong> <span style="color:#08752f; font-weight:800; font-size:15px;">${studentUser.cgpa}</span>
              <div style="font-size:11.5px; color:#64748b;">Sem I: 8.75 | Sem II: 8.80 | Sem III: 8.90 | Sem IV: 8.85 | Sem V: 8.80 | Sem VI: 8.84</div>
            </div>
            <button class="drill-action-btn drill-action-primary" onclick="studentViewMemoInfo('${studentUser.roll}')">📄 Semester Marks Memo Info</button>
          </div>
        </div>
      `;
    }

    // 6. FEEDBACK TAB
    else if (activeTab === 'feedback') {
      const courseOptions = studentUser.subjects.map(s => 
        `<option value="${s.code} - ${s.name}">${s.code} - ${s.name}</option>`
      ).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>⭐</span> Course &amp; Faculty Feedback Submission
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Submit your feedback confidentially to assist academic continuous improvement.
          </p>

          <form onsubmit="event.preventDefault(); studentSubmitFeedback('${studentUser.roll}');">
            <div class="portal-field-group">
              <label>Select Enrolled Course &amp; Faculty:</label>
              <select id="studentFeedbackCourse" class="portal-filter-select">
                ${courseOptions}
              </select>
            </div>

            <div style="margin:12px 0;">
              <label style="font-size:12px; font-weight:700; color:#0b4f26; display:block; margin-bottom:4px;">1. Course Content &amp; Syllabus Coverage (1 to 5):</label>
              <div class="rating-stars-row">
                <button type="button" class="rating-chip" id="rate_q1_1" onclick="studentSelectRating('q1', 1)">1 ⭐ Poor</button>
                <button type="button" class="rating-chip" id="rate_q1_2" onclick="studentSelectRating('q1', 2)">2 ⭐ Fair</button>
                <button type="button" class="rating-chip" id="rate_q1_3" onclick="studentSelectRating('q1', 3)">3 ⭐ Good</button>
                <button type="button" class="rating-chip" id="rate_q1_4" onclick="studentSelectRating('q1', 4)">4 ⭐ Very Good</button>
                <button type="button" class="rating-chip active" id="rate_q1_5" onclick="studentSelectRating('q1', 5)">5 ⭐ Excellent</button>
              </div>
            </div>

            <div style="margin:12px 0;">
              <label style="font-size:12px; font-weight:700; color:#0b4f26; display:block; margin-bottom:4px;">2. Teaching Clarity &amp; Doubt Resolution (1 to 5):</label>
              <div class="rating-stars-row">
                <button type="button" class="rating-chip" id="rate_q2_1" onclick="studentSelectRating('q2', 1)">1 ⭐ Poor</button>
                <button type="button" class="rating-chip" id="rate_q2_2" onclick="studentSelectRating('q2', 2)">2 ⭐ Fair</button>
                <button type="button" class="rating-chip" id="rate_q2_3" onclick="studentSelectRating('q2', 3)">3 ⭐ Good</button>
                <button type="button" class="rating-chip" id="rate_q2_4" onclick="studentSelectRating('q2', 4)">4 ⭐ Very Good</button>
                <button type="button" class="rating-chip active" id="rate_q2_5" onclick="studentSelectRating('q2', 5)">5 ⭐ Excellent</button>
              </div>
            </div>

            <div class="portal-field-group">
              <label>Constructive Comments / Suggestions:</label>
              <textarea id="studentFeedbackComment" rows="3" style="width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:8px; font-size:12.5px;" placeholder="Share your suggestions for lecture presentation or lab sessions..."></textarea>
            </div>

            <button type="submit" class="drill-action-btn drill-action-primary" style="margin-top:10px;">Submit Feedback Evaluation →</button>
          </form>
        </div>
      `;
    }

    // 7. COMPLAINTS TAB
    else if (activeTab === 'complaints') {
      const complaintsCardsHTML = window.studentComplaintsDB.map(c => `
        <div class="complaint-card ${c.urgency === 'High' ? 'high' : (c.urgency === 'Urgent' ? 'urgent' : '')}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:4px;">
            <div>
              <strong style="color:#0f172a; font-size:13px;">${c.subject}</strong>
              <div style="font-size:11px; color:#64748b;">${c.id} • Category: <b>${c.category}</b> • Date: ${c.date}</div>
            </div>
            <span class="complaint-badge ${c.status === 'Resolved' ? 'resolved' : (c.status === 'In Progress' ? 'in-progress' : 'under-review')}">
              ${c.status}
            </span>
          </div>
          <div style="font-size:12px; color:#334155; margin-top:6px; background:#f8fafc; padding:6px 10px; border-radius:4px;">
            <strong>Administrator Note:</strong> ${c.remarks}
          </div>
        </div>
      `).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📢</span> Student Grievance Registration &amp; Redressal Cell
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Register issues regarding Academics, Hostel, Canteen, Transport, or Campus Infrastructure.
          </p>

          <form onsubmit="event.preventDefault(); studentSubmitComplaint('${studentUser.roll}');" style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:14px; margin-bottom:16px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div class="portal-field-group">
                <label>Grievance Category:</label>
                <select id="complaintCategory" class="portal-filter-select">
                  <option value="Academic">Academic &amp; Curriculum</option>
                  <option value="Campus Transport">Campus Transport &amp; Bus Routes</option>
                  <option value="Hostel &amp; Accommodation">Hostel &amp; Accommodation</option>
                  <option value="Canteen &amp; Mess">Canteen &amp; Food Quality</option>
                  <option value="Infrastructure &amp; Labs">Infrastructure, Wi-Fi &amp; Labs</option>
                </select>
              </div>

              <div class="portal-field-group">
                <label>Urgency Level:</label>
                <select id="complaintUrgency" class="portal-filter-select">
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent Attention</option>
                </select>
              </div>
            </div>

            <div class="portal-field-group">
              <label>Subject / Brief Summary:</label>
              <input type="text" id="complaintSubject" placeholder="e.g. Lab 2 computer network connection issue" required>
            </div>

            <div class="portal-field-group">
              <label>Detailed Issue Description:</label>
              <textarea id="complaintDesc" rows="3" style="width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:8px; font-size:12.5px;" placeholder="Provide details like building, room number, or specific concern..."></textarea>
            </div>

            <button type="submit" class="drill-action-btn drill-action-primary" style="margin-top:8px;">Register Complaint Ticket →</button>
          </form>

          <h5 style="margin:16px 0 8px 0; color:#013b1f;">Your Registered Grievances &amp; Tracking Timeline:</h5>
          ${complaintsCardsHTML}
        </div>
      `;
    }

    // 8. USERNAME & PASSWORD CHANGE TAB
    else if (activeTab === 'credentials') {
      const storedCred = window.userCredentialStore[studentUser.roll] || {};
      const currentAlias = storedCred.alias || studentUser.roll;

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>🔐</span> Security Credentials &amp; Password Management
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Update your student portal login credentials. You can update your password and optional display username.
          </p>

          <form onsubmit="event.preventDefault(); studentUpdateCredentials('${studentUser.roll}');" class="portal-credential-form">
            <div class="portal-field-group">
              <label>Current Registered Roll Number (Username):</label>
              <input type="text" value="${studentUser.roll}" disabled style="background:#f1f5f9; color:#64748b;">
            </div>

            <div class="portal-field-group">
              <label>New Display Username / Alias (Optional):</label>
              <input type="text" id="credAlias" value="${currentAlias}" placeholder="Enter alias (e.g. Aarav_CSM)">
            </div>

            <div class="portal-field-group">
              <label>Current Password (Required for verification):</label>
              <input type="password" id="credCurrentPass" placeholder="Enter your current password" required autocomplete="off">
            </div>

            <div class="portal-field-group">
              <label>New Password (Minimum 6 characters):</label>
              <input type="password" id="credNewPass" placeholder="Enter new password" required autocomplete="off">
            </div>

            <div class="portal-field-group">
              <label>Confirm New Password:</label>
              <input type="password" id="credConfirmPass" placeholder="Re-enter new password" required autocomplete="off">
            </div>

            <div style="margin-top:14px; display:flex; justify-content:flex-end;">
              <button type="submit" class="drill-action-btn drill-action-primary">Update Login Credentials →</button>
            </div>
          </form>
        </div>
      `;
    }

    // Render Full Student Portal View with 8 Tabs
    body.innerHTML = `
      <div class="portal-dashboard-wrap">
        <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:8px 12px; border-radius:6px; font-size:12px; margin-bottom:12px;">
          🎓 <strong>Student Academic Portal:</strong> Signed in as <b>${studentUser.roll}</b> • ${studentUser.branch}.
        </div>

        <div class="portal-profile-bar">
          <div class="portal-user-info">
            <div class="portal-avatar">ST</div>
            <div>
              <div class="portal-user-name">${studentUser.name}</div>
              <div class="portal-user-meta">${studentUser.branch} • Roll No: <b>${studentUser.roll}</b> • ${studentUser.yearSem}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="https://www.hitam.org" target="_blank" rel="noopener" class="portal-logout-btn" style="text-decoration:none; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; display:inline-flex; align-items:center; gap:4px;">HITAM Portal ↗</a>
            <button class="portal-logout-btn" onclick="openModal('student-portal')">Sign Out</button>
          </div>
        </div>

        <!-- 8 STUDENT TABS (NEW REQUESTED STRUCTURE) -->
        <div class="portal-nav-tabs">
          <button class="portal-tab-btn ${activeTab === 'details' ? 'active' : ''}" onclick="studentSwitchTab('details', '${studentUser.roll}')">
            👤 Student Details
          </button>
          <button class="portal-tab-btn ${activeTab === 'attendance' ? 'active' : ''}" onclick="studentSwitchTab('attendance', '${studentUser.roll}')">
            📊 Attendance
          </button>
          <button class="portal-tab-btn ${activeTab === 'timetable' ? 'active' : ''}" onclick="studentSwitchTab('timetable', '${studentUser.roll}')">
            🗓️ Timetable
          </button>
          <button class="portal-tab-btn ${activeTab === 'fees' ? 'active' : ''}" onclick="studentSwitchTab('fees', '${studentUser.roll}')">
            💰 Fee Details
          </button>
          <button class="portal-tab-btn ${activeTab === 'marks' ? 'active' : ''}" onclick="studentSwitchTab('marks', '${studentUser.roll}')">
            📝 Marks (CIE)
          </button>
          <button class="portal-tab-btn ${activeTab === 'feedback' ? 'active' : ''}" onclick="studentSwitchTab('feedback', '${studentUser.roll}')">
            ⭐ Feedback
          </button>
          <button class="portal-tab-btn ${activeTab === 'complaints' ? 'active' : ''}" onclick="studentSwitchTab('complaints', '${studentUser.roll}')">
            📢 Complaints
          </button>
          <button class="portal-tab-btn ${activeTab === 'credentials' ? 'active' : ''}" onclick="studentSwitchTab('credentials', '${studentUser.roll}')">
            🔐 Username &amp; Password
          </button>
        </div>

        <!-- Active Tab Container -->
        <div id="studentTabContainer">
          ${tabContentHTML}
        </div>

        <div id="modalToastSlot"></div>
      </div>
    `;
    return;
  }
};
`;

// Export to file
fs.writeFileSync('scratch/section15_expanded.js', section15Code, 'utf8');
console.log('Successfully wrote scratch/section15_expanded.js');

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

  'portals-all': {
    title: 'Unified Single Sign-On (SSO) Directory — All 3 Portals',
    category: 'Digital Portals — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    isWide: true,
    getBody: () => generatePortalsAllHTML()
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
    title: 'Career Guidance & Placements',
    category: 'Career & Placements — HITAM',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
    body: `
      <div class="drill-hero-banner" style="height:180px; margin-bottom:14px;">
        <img class="drill-hero-img" src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80" alt="HITAM Placements">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge" style="background:#82c322; color:#013b1f;">Highest: ₹24 LPA (Goldman Sachs)</span>
          <div class="drill-hero-title">Career Guidance &amp; Placement Cell</div>
          <div class="drill-hero-sub">Dedicated Campus Recruitment &amp; Industry Internships</div>
        </div>
      </div>
      <p>The Career Guidance and Placement Cell (CGC) at HITAM provides systematic recruitment training, coding sprints, soft skills mentoring, and corporate drives starting from the pre-final year.</p>
      <div class="modal-grid-features">
        <div class="modal-feature-card"><strong>Highest CTC:</strong><span>₹24 LPA secured by student with Goldman Sachs.</span></div>
        <div class="modal-feature-card"><strong>Recruiting Partners:</strong><span>Goldman Sachs, TCS, Infosys, Cognizant, Wipro, Capgemini, Virtusa, Accenture.</span></div>
        <div class="modal-feature-card"><strong>Internships:</strong><span>Corporate internship opportunities arranged across engineering sectors.</span></div>
        <div class="modal-feature-card"><strong>Batch Statistics:</strong><span>Audited annual placement statistics and recruiter reports maintained by CGC.</span></div>
      </div>
    `
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