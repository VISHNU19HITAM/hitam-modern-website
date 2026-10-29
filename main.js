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
        <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Academic curriculum syllabus is available in the Central Digital Library.')">View Academic Syllabus 📚</button>
        <button class="drill-action-btn drill-action-secondary" onclick="openModal('admissions-info')">Apply for ${b.code} Admission →</button>
      </div>
      <div id="modalToastSlot"></div>
    </div>
  `;
};

/* ==========================================================================
   5. CAMPUS EVENTS, HACKATHONS & FESTIVALS (Drill-Down System)
   ========================================================================== */

window.eventsData = window.eventsData || [
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
      { label: 'Campus Updates', val: 'Campus Bulletin / Student Affairs Notice Board' }
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
const eventsData = window.eventsData;

function generateEventsHTML() {
  const cardsHTML = (window.eventsData || eventsData).map(e => `
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
  const ev = (window.eventsData || eventsData).find(x => x.id === eventId);
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
        <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Event circulars and schedules are published on the Campus Notice Board.')">Campus Circulars &amp; Notices 📢</button>
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
        <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Institutional accreditations and NAAC A+ certifications are verified by the IQAC Cell.')">Institutional Disclosures 🏆</button>
        <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Institutional citations and accreditation certificates are available at the HITAM IQAC Office.')">IQAC Verification Info ℹ️</button>
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
        <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Student life and activity circulars are posted on campus cultural display boards.')">Student Life Activities 🎨</button>
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
        <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Incubation proposals and seed grant applications are submitted through the HITAM SSDC Innovation Hub.')">Innovation Hub Guidelines 🚀</button>
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
   10. CANTEEN & FOOD STALLS WITH LIVE STOCK & COMPLAINT/FEEDBACK SYSTEM
   ========================================================================== */

window.canteenTrayTotal = 0;
window.canteenTrayCount = 0;
let canteenTrayTotal = window.canteenTrayTotal;
let canteenTrayCount = window.canteenTrayCount;
window.activeCanteenTab = window.activeCanteenTab || 'stalls';

// Stall Menu Data with authentic stock tracking (In Stock / 30 pieces / Out of Stock)
window.canteenStallsData = [
  {
    id: 'stall-1',
    title: 'Stall 1: Royal Food Court (Tiffins, Meals & Biryani)',
    tag: 'Meals & Restaurant Food',
    img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    desc: 'Traditional South Indian unlimited thali meals, authentic Hyderabadi Dum Biryani, egg/veg noodles, crispy dosas, and idlis.',
    menu: [
      { item: 'Unlimited South Indian Veg Thali Meals', price: 70, stock: 30, maxStock: 30, desc: 'Rice, Sambar, Rasam, 2 Curries, Papad, Curd & Chutney' },
      { item: 'Special Hyderabadi Chicken Dum Biryani', price: 140, stock: 8, maxStock: 30, desc: 'Fragrant basmati rice with tender chicken, Mirchi ka Salan & Raita' },
      { item: 'Egg Fried Rice / Veg Hakka Noodles', price: 80, stock: 30, maxStock: 30, desc: 'Wok-tossed farm fresh vegetables and spices' },
      { item: 'Ghee Masala Dosa with Chutneys', price: 40, stock: 5, maxStock: 25, desc: 'Golden crispy dosa with spiced potato masala' },
      { item: 'Steamed Idli & Crispy Medu Vada Combo', price: 35, stock: 0, maxStock: 30, desc: 'Served with hot sambar and coconut chutney (Morning Batch Ended)' },
      { item: 'Poori Bhaji / Chole Bhature', price: 45, stock: 0, maxStock: 25, desc: 'Hot fluffy pooris with spiced aloo masala (Sold Out for Today)' }
    ]
  },
  {
    id: 'stall-2',
    title: 'Stall 2: Fast Food Corner (Momos, Burgers & Shawarma)',
    tag: 'Fast Food & Snacks',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    desc: 'Steamed/fried momos with schezwan dip, cheese chicken burgers, loaded grilled sandwiches, rumali shawarma, and peri-peri fries.',
    menu: [
      { item: 'Steamed Veg / Chicken Momos (6 Pcs)', price: 70, stock: 30, maxStock: 30, desc: 'Served with spicy schezwan sauce and garlic mayonnaise' },
      { item: 'Crispy Cheese Chicken / Veg Burger', price: 80, stock: 12, maxStock: 25, desc: 'Crispy patty loaded with cheddar slice, lettuce and garlic mayo' },
      { item: 'Three-Layer Grilled Club Sandwich', price: 65, stock: 4, maxStock: 20, desc: 'Toasted bread loaded with paneer, sweet corn and mozzarella' },
      { item: 'Hyderabadi Rumali Chicken Shawarma', price: 90, stock: 0, maxStock: 30, desc: 'Slow-roasted marinated chicken rolled in soft rumali roti (Sold Out for Lunch)' },
      { item: 'Peri-Peri French Fries Basket', price: 60, stock: 30, maxStock: 30, desc: 'Crispy salted potato fries tossed in peri-peri spice' },
      { item: 'Pani Puri & Dahi Puri Platter', price: 35, stock: 0, maxStock: 20, desc: 'Crisp puris with tangy mint water and sweetened curd (Starts at 3:30 PM)' }
    ]
  },
  {
    id: 'stall-3',
    title: 'Stall 3: Green Cafe, Shakes & Bakery',
    tag: 'Bakery & Beverages',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    desc: 'Freshly baked flaky puffs, thick cold coffee with ice cream, oreo chocolate shakes, seasonal fruit juices, and hot masala chai.',
    menu: [
      { item: 'Paneer / Egg / Chicken Puffs', price: 25, stock: 30, maxStock: 30, desc: 'Golden baked flaky puff pastry' },
      { item: 'Thick Cold Coffee with Vanilla Scoop', price: 50, stock: 18, maxStock: 30, desc: 'Blended arabica coffee topped with rich vanilla ice cream' },
      { item: 'Oreo & Belgian Chocolate Milkshake', price: 60, stock: 6, maxStock: 25, desc: 'Thick chocolate shake topped with crushed oreos & whipped cream' },
      { item: 'Fresh Fruit Juice (Watermelon / Mosambi / Orange)', price: 45, stock: 30, maxStock: 30, desc: '100% fresh squeezed with no added sugar' },
      { item: 'Choco Lava Cake / Pastry Slice', price: 50, stock: 0, maxStock: 15, desc: 'Warm gooey chocolate center (Sold Out - Next Oven Batch Tomorrow)' },
      { item: 'Special Irani Masala Chai / Filter Coffee', price: 15, stock: 30, maxStock: 50, desc: 'Freshly brewed hot aromatic beverage' }
    ]
  }
];
const canteenStallsData = window.canteenStallsData;

// Canteen Complaints Database
window.canteenComplaintsDB = window.canteenComplaintsDB || [
  {
    id: 'CAN-TKT-104',
    date: '26-Oct-2026',
    category: 'Food Quality',
    user: 'Student (CSM Batch 23)',
    subject: 'Request hotter sambar during peak lunch hour (12:45 PM)',
    urgency: 'Normal',
    status: 'Resolved',
    remarks: 'Thermal food warmers in Stall 1 adjusted to maintain 75°C. Verified by Canteen Supervisor.'
  },
  {
    id: 'CAN-TKT-105',
    date: '27-Oct-2026',
    category: 'Cleanliness & Hygiene',
    user: 'Student (ECE Batch 24)',
    subject: 'Table cleaning speed in North Dining Bay between class intervals',
    urgency: 'High',
    status: 'In Progress',
    remarks: 'Two additional housekeeping personnel deployed specifically for dining bays between 12:30 and 1:30 PM.'
  },
  {
    id: 'CAN-TKT-106',
    date: '27-Oct-2026',
    category: 'Drinking Water & Facilities',
    user: 'Faculty (CSE Department)',
    subject: 'RO water dispenser sensor tap dripping near Stall 3 exit',
    urgency: 'Normal',
    status: 'Resolved',
    remarks: 'Campus maintenance plumber inspected dispenser unit and replaced sensor gasket.'
  }
];

// Canteen Feedback & Suggestions Database
window.canteenFeedbackDB = window.canteenFeedbackDB || [
  {
    date: '25-Oct-2026',
    user: 'Bhukya Vishnu (23E51A6619 — CSM)',
    dish: 'Stall 1: Hyderabadi Chicken Dum Biryani',
    tasteRating: 5,
    hygieneRating: 5,
    suggestion: 'Authentic Hyderabadi biryani spices and aroma! Please consider adding a self-serve raita refill counter.'
  },
  {
    date: '26-Oct-2026',
    user: 'Faculty Member (Department of ECE)',
    dish: 'Stall 3: Green Cafe & Bakery',
    tasteRating: 4,
    hygieneRating: 5,
    suggestion: 'Excellent cold coffee and fresh fruit juices. Suggest adding fresh tender coconut water and ragi malt options for morning tiffins.'
  },
  {
    date: '27-Oct-2026',
    user: 'Student (Mechanical Batch 24)',
    dish: 'Stall 2: Fast Food Corner',
    tasteRating: 5,
    hygieneRating: 4,
    suggestion: 'Steamed Momos are top quality. Would love to see whole wheat momos and protein boiled corn cups added to the menu.'
  }
];

// Stock Badge Generator
function getCanteenStockBadgeHTML(stock, maxStock) {
  if (stock <= 0) {
    return `<span class="stock-badge out-of-stock">🚫 Out of Stock (0 / ${maxStock || 30} pcs)</span>`;
  } else if (stock <= 10) {
    return `<span class="stock-badge low-stock">⚠️ Limited Stock (${stock} pieces left)</span>`;
  } else {
    return `<span class="stock-badge in-stock">✅ In Stock (${stock} pieces available)</span>`;
  }
}

// Tab Switcher for Canteen Modal
window.switchCanteenTab = function(tabName) {
  window.activeCanteenTab = tabName;
  const body = document.getElementById('modalBody');
  if (body) {
    body.innerHTML = generateCanteenHTML();
  }
};

// Main Canteen Modal HTML Generator
function generateCanteenHTML() {
  const activeTab = window.activeCanteenTab || 'stalls';

  // Navigation Tabs Bar
  const navTabsHTML = `
    <div class="canteen-tabs">
      <button class="canteen-tab-pill ${activeTab === 'stalls' ? 'active' : ''}" onclick="switchCanteenTab('stalls')">
        🍽️ Cafeteria Stalls &amp; Live Stock Menu
      </button>
      <button class="canteen-tab-pill ${activeTab === 'complaints' ? 'active' : ''}" onclick="switchCanteenTab('complaints')">
        📢 Complaint Box &amp; Redressal (${window.canteenComplaintsDB.length})
      </button>
      <button class="canteen-tab-pill ${activeTab === 'feedback' ? 'active' : ''}" onclick="switchCanteenTab('feedback')">
        ⭐ Feedback &amp; Suggestions (${window.canteenFeedbackDB.length})
      </button>
    </div>
  `;

  // TAB 1: STALLS & MENUS
  if (activeTab === 'stalls') {
    const cardsHTML = canteenStallsData.map(c => {
      // Calculate total available and out of stock items for this stall
      let availableCount = 0;
      let outOfStockCount = 0;
      c.menu.forEach(m => {
        if (m.stock > 0) availableCount++;
        else outOfStockCount++;
      });

      return `
        <div class="drill-card" onclick="showCanteenDetail('${c.id}')" style="cursor:pointer;">
          <div class="drill-card-img-wrap">
            <img class="drill-card-img" src="${c.img}" alt="${c.title}" loading="lazy">
            <span class="drill-card-badge">${c.tag}</span>
          </div>
          <div class="drill-card-body">
            <div class="drill-card-title">${c.title}</div>
            <div style="margin: 4px 0 8px 0; display:flex; gap:6px; flex-wrap:wrap;">
              <span class="stock-badge in-stock">${availableCount} Items In Stock</span>
              ${outOfStockCount > 0 ? `<span class="stock-badge out-of-stock">${outOfStockCount} Out of Stock</span>` : ''}
            </div>
            <div class="drill-card-desc">${c.desc}</div>
            <div class="drill-card-footer">
              <span>🍴 Open: 7:30 AM – 6:30 PM</span>
              <span style="color:#08752f; font-weight:700;">View Menu &amp; Stock →</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div>
        ${navTabsHTML}
        <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
          🍃 <strong>Green Dining &amp; Live Stock Counters:</strong> HITAM Multi-Stall Cafeteria is FSSAI-certified. Browse menu availability below or use the Complaint Box and Feedback tabs to share input directly with the Canteen Committee.
        </div>
        <div class="drill-grid">
          ${cardsHTML}
        </div>
      </div>
    `;
  }

  // TAB 2: COMPLAINT BOX
  if (activeTab === 'complaints') {
    const complaintCardsHTML = window.canteenComplaintsDB.map(c => `
      <div class="complaint-card ${c.urgency === 'High' ? 'high' : (c.urgency === 'Urgent' ? 'urgent' : '')}">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:4px;">
          <div>
            <strong style="color:#0f172a; font-size:13px;">${c.subject}</strong>
            <div style="font-size:11px; color:#64748b;">${c.id} • Category: <b>${c.category}</b> • Date: ${c.date} • Logged by: ${c.user}</div>
          </div>
          <span class="complaint-badge ${c.status === 'Resolved' ? 'resolved' : (c.status === 'In Progress' ? 'in-progress' : 'under-review')}">
            ${c.status}
          </span>
        </div>
        <div style="font-size:12px; color:#334155; margin-top:6px; background:#f8fafc; padding:6px 10px; border-radius:4px;">
          <strong>Committee Action Note:</strong> ${c.remarks}
        </div>
      </div>
    `).join('');

    return `
      <div>
        ${navTabsHTML}
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📢</span> Canteen Grievance &amp; Hygiene Complaint Box
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Directly submit feedback regarding food preparation, stall cleanliness, token billing speed, seating, or drinking water. Every ticket is reviewed by the Canteen Food &amp; Hygiene Committee.
          </p>

          <form onsubmit="event.preventDefault(); submitCanteenComplaint();" style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:14px; margin-bottom:16px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div class="portal-field-group">
                <label>Complaint Category:</label>
                <select id="canteenCompCategory" class="portal-filter-select">
                  <option value="Food Quality &amp; Taste">Food Quality &amp; Taste</option>
                  <option value="Cleanliness &amp; Hygiene">Cleanliness &amp; Table Hygiene</option>
                  <option value="Billing &amp; Token Waiting Time">Billing, Tokens &amp; Queue Speed</option>
                  <option value="Drinking Water &amp; Facilities">Drinking Water &amp; Hand Wash Disposal</option>
                  <option value="Portion Size &amp; Pricing">Portion Size &amp; Pricing</option>
                </select>
              </div>

              <div class="portal-field-group">
                <label>Urgency Level:</label>
                <select id="canteenCompUrgency" class="portal-filter-select">
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent / Immediate Attention</option>
                </select>
              </div>
            </div>

            <div class="portal-field-group">
              <label>Your Name / Roll No / ID (Optional):</label>
              <input type="text" id="canteenCompUser" placeholder="e.g. Bhukya Vishnu (23E51A6619) or Student">
            </div>

            <div class="portal-field-group">
              <label>Brief Subject Line:</label>
              <input type="text" id="canteenCompSubject" placeholder="e.g. North dining bay handwash dispenser empty" required>
            </div>

            <div class="portal-field-group">
              <label>Detailed Issue Description:</label>
              <textarea id="canteenCompDesc" rows="3" style="width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:8px; font-size:12.5px;" placeholder="Describe what happened, which stall, or specific table area..." required></textarea>
            </div>

            <button type="submit" class="drill-action-btn drill-action-primary" style="margin-top:8px;">Submit Canteen Complaint Ticket →</button>
          </form>

          <h5 style="margin:16px 0 8px 0; color:#013b1f;">Registered Canteen Grievances &amp; Action Log:</h5>
          ${complaintCardsHTML}
        </div>
      </div>
    `;
  }

  // TAB 3: FEEDBACK & SUGGESTIONS
  if (activeTab === 'feedback') {
    const feedbackCardsHTML = window.canteenFeedbackDB.map(f => {
      const stars = '⭐'.repeat(f.tasteRating);
      return `
        <div style="background:#ffffff; border:1px solid #d4ebd8; border-radius:6px; padding:12px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <strong style="color:#0f172a; font-size:13px;">${f.dish}</strong>
            <span style="font-size:11px; color:#15803d; font-weight:700;">Taste: ${stars} (${f.tasteRating}/5)</span>
          </div>
          <div style="font-size:11px; color:#64748b; margin:2px 0 6px 0;">Submitted by: <b>${f.user}</b> • Date: ${f.date}</div>
          <div style="font-size:12px; color:#334155; background:#f0fdf4; border-left:3px solid #16a34a; padding:6px 10px; border-radius:0 4px 4px 0;">
            💡 <em>"${f.suggestion}"</em>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div>
        ${navTabsHTML}
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>⭐</span> Cafeteria Feedback &amp; New Dish Suggestions
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 14px 0;">
            Share your taste evaluation, cleanliness rating, or suggest new healthy dishes and seasonal menu items for our chefs to prepare.
          </p>

          <form onsubmit="event.preventDefault(); submitCanteenFeedback();" style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:14px; margin-bottom:16px;">
            <div class="portal-field-group">
              <label>Select Stall or Menu Service:</label>
              <select id="canteenFbStall" class="portal-filter-select">
                <option value="Stall 1: Royal Food Court (Tiffins &amp; Biryani)">Stall 1: Royal Food Court (Tiffins, Meals &amp; Biryani)</option>
                <option value="Stall 2: Fast Food Corner (Momos &amp; Snacks)">Stall 2: Fast Food Corner (Momos, Burgers &amp; Shawarma)</option>
                <option value="Stall 3: Green Cafe &amp; Bakery">Stall 3: Green Cafe, Shakes &amp; Bakery</option>
                <option value="General Dining &amp; Cafeteria Hall">General Dining &amp; Cafeteria Hall</option>
              </select>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:10px 0;">
              <div>
                <label style="font-size:11.5px; font-weight:700; color:#0b4f26; display:block; margin-bottom:4px;">Food Taste &amp; Freshness:</label>
                <div class="rating-stars-row">
                  <button type="button" class="rating-chip" id="crate_taste_1" onclick="canteenSelectRating('taste', 1)">1 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_taste_2" onclick="canteenSelectRating('taste', 2)">2 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_taste_3" onclick="canteenSelectRating('taste', 3)">3 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_taste_4" onclick="canteenSelectRating('taste', 4)">4 ⭐</button>
                  <button type="button" class="rating-chip active" id="crate_taste_5" onclick="canteenSelectRating('taste', 5)">5 ⭐</button>
                </div>
              </div>

              <div>
                <label style="font-size:11.5px; font-weight:700; color:#0b4f26; display:block; margin-bottom:4px;">Hygiene &amp; Cleanliness:</label>
                <div class="rating-stars-row">
                  <button type="button" class="rating-chip" id="crate_hyg_1" onclick="canteenSelectRating('hyg', 1)">1 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_hyg_2" onclick="canteenSelectRating('hyg', 2)">2 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_hyg_3" onclick="canteenSelectRating('hyg', 3)">3 ⭐</button>
                  <button type="button" class="rating-chip" id="crate_hyg_4" onclick="canteenSelectRating('hyg', 4)">4 ⭐</button>
                  <button type="button" class="rating-chip active" id="crate_hyg_5" onclick="canteenSelectRating('hyg', 5)">5 ⭐</button>
                </div>
              </div>
            </div>

            <div class="portal-field-group">
              <label>Your Name / Student ID:</label>
              <input type="text" id="canteenFbUser" placeholder="e.g. Bhukya Vishnu (23E51A6619)">
            </div>

            <div class="portal-field-group">
              <label>New Dish Idea or Constructive Suggestion:</label>
              <textarea id="canteenFbSuggestion" rows="2" style="width:100%; border:1px solid #cbd5e1; border-radius:4px; padding:8px; font-size:12.5px;" placeholder="Suggest new dishes (e.g. multi-grain dosa, cold brew, fruit bowls) or improvements..." required></textarea>
            </div>

            <button type="submit" class="drill-action-btn drill-action-primary" style="margin-top:8px;">Submit Feedback &amp; Dish Suggestion →</button>
          </form>

          <h5 style="margin:16px 0 8px 0; color:#013b1f;">Student &amp; Faculty Suggestions Board:</h5>
          ${feedbackCardsHTML}
        </div>
      </div>
    `;
  }

  return '';
}

// Rating chip handler for Canteen
window.canteenRatingsState = { taste: 5, hyg: 5 };
window.canteenSelectRating = function(metric, val) {
  window.canteenRatingsState[metric] = val;
  for (let i = 1; i <= 5; i++) {
    const chip = document.getElementById(`crate_${metric}_${i}`);
    if (chip) {
      if (i === val) chip.classList.add('active');
      else chip.classList.remove('active');
    }
  }
};

// Complaint submit handler
window.submitCanteenComplaint = function() {
  const catEl = document.getElementById('canteenCompCategory');
  const urgEl = document.getElementById('canteenCompUrgency');
  const userEl = document.getElementById('canteenCompUser');
  const subEl = document.getElementById('canteenCompSubject');
  const descEl = document.getElementById('canteenCompDesc');

  if (!subEl || !subEl.value.trim() || !descEl || !descEl.value.trim()) {
    showDemoNotice('Please provide a subject line and description for your canteen complaint.');
    return;
  }

  const newTicket = {
    id: `CAN-TKT-${Math.floor(107 + Math.random() * 892)}`,
    date: new Date().toISOString().slice(0, 10),
    category: catEl ? catEl.value : 'Food Quality & Taste',
    user: userEl && userEl.value.trim() ? userEl.value.trim() : 'Anonymous Student',
    subject: subEl.value.trim(),
    urgency: urgEl ? urgEl.value : 'Normal',
    status: 'Under Review',
    remarks: 'Acknowledged and assigned to Cafeteria Food & Hygiene Inspection Team.'
  };

  window.canteenComplaintsDB.unshift(newTicket);
  showDemoNotice(`Complaint ticket ${newTicket.id} registered! Assigned to Canteen Hygiene Committee.`);
  window.switchCanteenTab('complaints');
};

// Feedback submit handler
window.submitCanteenFeedback = function() {
  const stallEl = document.getElementById('canteenFbStall');
  const userEl = document.getElementById('canteenFbUser');
  const sugEl = document.getElementById('canteenFbSuggestion');

  if (!sugEl || !sugEl.value.trim()) {
    showDemoNotice('Please enter your suggestion or feedback.');
    return;
  }

  const newFeedback = {
    date: new Date().toISOString().slice(0, 10),
    user: userEl && userEl.value.trim() ? userEl.value.trim() : 'Student',
    dish: stallEl ? stallEl.value : 'General Cafeteria',
    tasteRating: window.canteenRatingsState.taste || 5,
    hygieneRating: window.canteenRatingsState.hyg || 5,
    suggestion: sugEl.value.trim()
  };

  window.canteenFeedbackDB.unshift(newFeedback);
  showDemoNotice(`Thank you! Your feedback for ${newFeedback.dish} has been posted to the Suggestions Board.`);
  window.switchCanteenTab('feedback');
};

// Add to Tray with Stock Management
window.addToCanteenTray = function(stallId, itemIndex) {
  const stall = canteenStallsData.find(s => s.id === stallId);
  if (!stall || !stall.menu[itemIndex]) return;
  const m = stall.menu[itemIndex];

  if (m.stock <= 0) {
    showToast(`⚠️ Sorry! "${m.item}" is currently Out of Stock.`);
    return;
  }

  // Decrement stock in real-time
  m.stock -= 1;
  canteenTrayTotal += m.price;
  canteenTrayCount += 1;
  window.canteenTrayTotal = canteenTrayTotal;
  window.canteenTrayCount = canteenTrayCount;

  if (m.stock === 0) {
    showToast(`Added last piece of "${m.item}"! Item is now Out of Stock (0 left).`);
  } else if (m.stock <= 5) {
    showToast(`Added "${m.item}" (₹${m.price})! ⚠️ Limited Stock (${m.stock} pieces left).`);
  } else {
    showToast(`Added "${m.item}" (₹${m.price})! (${m.stock} pieces left in stock).`);
  }

  // Refresh stall view to reflect updated stock badge and buttons
  showCanteenDetail(stallId);
};

// Clear Tray
window.clearCanteenTray = function(stallId = null) {
  canteenTrayTotal = 0;
  canteenTrayCount = 0;
  window.canteenTrayTotal = 0;
  window.canteenTrayCount = 0;
  const totalEl = document.getElementById('trayTotalDisplay');
  const countEl = document.getElementById('trayCountDisplay');
  if (totalEl) totalEl.textContent = `₹0`;
  if (countEl) countEl.textContent = `0 Items Selected for Estimation`;
  showToast('Food tray calculator cleared.');
};

// Stall Detail View with Live Stock Badges and Direct Buttons
window.showCanteenDetail = function(stallId) {
  const c = canteenStallsData.find(x => x.id === stallId);
  if (!c) return;

  const body = document.getElementById('modalBody');
  if (!body) return;

  const menuItemsHTML = c.menu.map((m, idx) => {
    const isOutOfStock = m.stock <= 0;
    const badgeHTML = getCanteenStockBadgeHTML(m.stock, m.maxStock);

    const actionButton = isOutOfStock
      ? `<button class="drill-action-btn" disabled style="background:#f1f5f9; color:#94a3b8; border:1px solid #cbd5e1; cursor:not-allowed; padding:5px 12px; font-size:11.5px;">Out of Stock</button>`
      : `<button class="drill-action-btn drill-action-primary" style="padding:5px 12px; font-size:11.5px;" onclick="addToCanteenTray('${c.id}', ${idx})">+ Add (${m.stock} left)</button>`;

    return `
      <div class="modal-feature-card" style="display:flex; justify-content:space-between; align-items:center; ${isOutOfStock ? 'opacity:0.75; background:#fbfbfb;' : ''}">
        <div style="flex:1; padding-right:12px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <strong style="font-size:13.5px; color:#0b4f26;">${m.item}</strong>
            ${badgeHTML}
          </div>
          <span style="display:block; font-size:12px; color:#557260; margin:2px 0;">${m.desc}</span>
          <b style="color:#08752f; font-size:13px; font-weight:800;">₹${m.price}</b>
        </div>
        <div>
          ${actionButton}
        </div>
      </div>
    `;
  }).join('');

  body.innerHTML = `
    <div class="drill-detail-view">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
        <button class="sub-back-btn" onclick="openModal('canteen')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Back to All Stalls</span>
        </button>

        <div style="display:flex; gap:6px;">
          <button class="drill-action-btn drill-action-secondary" style="font-size:11px; padding:4px 10px;" onclick="switchCanteenTab('complaints')">📢 File Complaint</button>
          <button class="drill-action-btn drill-action-secondary" style="font-size:11px; padding:4px 10px;" onclick="switchCanteenTab('feedback')">⭐ Give Feedback</button>
        </div>
      </div>

      <div class="drill-hero-banner">
        <img class="drill-hero-img" src="${c.img}" alt="${c.title}">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge">${c.tag}</span>
          <div class="drill-hero-title">${c.title}</div>
          <div class="drill-hero-sub">FSSAI Certified • Open: 7:30 AM – 6:30 PM • Live Counter Stock Tracking</div>
        </div>
      </div>

      <h4>🍽️ Stall Menu with Real-Time Stock Status:</h4>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${menuItemsHTML}
      </div>

      <div class="canteen-order-tray" style="margin-top:16px;">
        <div>
          <div style="font-size:11px; text-transform:uppercase; color:#0b4f26; font-weight:800;">🛒 Canteen Price Estimator (Demonstration Calculator Only — In-Person Counter Billing):</div>
          <div class="canteen-tray-items" id="trayCountDisplay">${canteenTrayCount} Items Selected for Estimation</div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <div>
            <span style="font-size:11px; color:#557260;">Estimated Total:</span>
            <div class="canteen-tray-total" id="trayTotalDisplay">₹${canteenTrayTotal}</div>
          </div>
          <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Price Estimator: In-person meal tokens are purchased at the cafeteria billing counter. No online order or payment is processed.')">Estimate Bill Summary</button>
          <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="clearCanteenTray('${c.id}')">Reset Calculator</button>
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
   SECTION 8B: PLACEMENTS & CORPORATE RECRUITMENT CELL
   Hyderabad Institute of Technology and Management (UGC Autonomous)
   Includes:
   - Year-wise Placement Records (2020 to 2026) with Placed Counts & Details
   - Highest Package Achiever Spotlight per Batch / Selected Year
   - 20 Top Recruiting Partner Companies (No Drive Profiles)
   - Student Placement Registration Desk (Eligibility, Form & Instant Slip)
   - Dynamic Year, Branch, Tier and Search Filters
   ========================================================================== */

// 1. Batch-wise Placement Overview Statistics (2020 to 2026)
const hitamPlacementBatchStats = {
  '2026': {
    totalPlaced: 538,
    highestCTC: '₹24.00 LPA',
    avgCTC: '₹6.40 LPA',
    placementRate: '94.2%',
    topCompany: 'Goldman Sachs',
    topStudent: 'P. Vignesh Reddy',
    topRoll: '22E51A6612',
    topBranch: 'CSE (AI & ML)',
    topRole: 'Engineering Analyst',
    topCategory: 'Super Dream',
    avatarBg: '#08752f',
    initials: 'VR'
  },
  '2025': {
    totalPlaced: 512,
    highestCTC: '₹21.50 LPA',
    avgCTC: '₹6.10 LPA',
    placementRate: '93.5%',
    topCompany: 'Amazon AWS',
    topStudent: 'S. Harshavardhan',
    topRoll: '21E51A0518',
    topBranch: 'Computer Science & Engg',
    topRole: 'Cloud Solutions Associate',
    topCategory: 'Super Dream',
    avatarBg: '#0369a1',
    initials: 'SH'
  },
  '2024': {
    totalPlaced: 486,
    highestCTC: '₹18.00 LPA',
    avgCTC: '₹5.75 LPA',
    placementRate: '92.8%',
    topCompany: 'Microsoft',
    topStudent: 'V. Ravindra',
    topRoll: '20E51A6704',
    topBranch: 'CSE (Data Science)',
    topRole: 'Systems Software Engineer',
    topCategory: 'Super Dream',
    avatarBg: '#002050',
    initials: 'VR'
  },
  '2023': {
    totalPlaced: 445,
    highestCTC: '₹15.50 LPA',
    avgCTC: '₹5.30 LPA',
    placementRate: '91.4%',
    topCompany: 'Cisco Systems',
    topStudent: 'M. Sumanth',
    topRoll: '19E51A0410',
    topBranch: 'Electronics & Communication',
    topRole: 'Network Software Engineer',
    topCategory: 'Super Dream',
    avatarBg: '#053d58',
    initials: 'MS'
  },
  '2022': {
    totalPlaced: 418,
    highestCTC: '₹14.00 LPA',
    avgCTC: '₹4.95 LPA',
    placementRate: '90.2%',
    topCompany: 'Darwinbox',
    topStudent: 'D. Sai Charan',
    topRoll: '18E51A0522',
    topBranch: 'Computer Science & Engg',
    topRole: 'Product Software Engineer',
    topCategory: 'Super Dream',
    avatarBg: '#312e81',
    initials: 'SC'
  },
  '2021': {
    totalPlaced: 382,
    highestCTC: '₹12.50 LPA',
    avgCTC: '₹4.60 LPA',
    placementRate: '89.1%',
    topCompany: 'Virtusa',
    topStudent: 'N. Bharath',
    topRoll: '17E51A6608',
    topBranch: 'CSE (AI & ML)',
    topRole: 'FinTech Software Associate',
    topCategory: 'Super Dream',
    avatarBg: '#7f1d1d',
    initials: 'NB'
  },
  '2020': {
    totalPlaced: 342,
    highestCTC: '₹11.00 LPA',
    avgCTC: '₹4.25 LPA',
    placementRate: '88.4%',
    topCompany: 'TCS Digital',
    topStudent: 'G. Tarun',
    topRoll: '16E51A0534',
    topBranch: 'Computer Science & Engg',
    topRole: 'Digital Systems Innovator',
    topCategory: 'Dream Tier',
    avatarBg: '#111827',
    initials: 'GT'
  }
};

// 2. 20 Top Recruiting Partner Companies with Visual Badges & Details
const hitamRecruitersData = [
  {
    id: 'rec-gs',
    name: 'Goldman Sachs',
    tier: 'Super Dream',
    highestCTC: '₹24.00 LPA',
    roles: 'Engineering Analyst, Systems Associate',
    hiredCount: 12,
    badgeBg: '#0b2046',
    logoText: 'GS',
    accentColor: '#1d4ed8',
    category: 'Investment Banking & FinTech',
    photo: 'assets/hitam7.jpeg'
  },
  {
    id: 'rec-aws',
    name: 'Amazon AWS',
    tier: 'Super Dream',
    highestCTC: '₹21.50 LPA',
    roles: 'Cloud Support Associate, SDE Intern',
    hiredCount: 18,
    badgeBg: '#131921',
    logoText: 'AWS',
    accentColor: '#f59e0b',
    category: 'Cloud Infrastructure & Distributed Systems',
    photo: 'assets/hitam1.jpg'
  },
  {
    id: 'rec-msft',
    name: 'Microsoft',
    tier: 'Super Dream',
    highestCTC: '₹18.00 LPA',
    roles: 'Software Engineer, Support Specialist',
    hiredCount: 8,
    badgeBg: '#002050',
    logoText: 'MSFT',
    accentColor: '#00a4ef',
    category: 'Enterprise Cloud & Operating Systems',
    photo: 'assets/hitam5.jpeg'
  },
  {
    id: 'rec-goog',
    name: 'Google Cloud',
    tier: 'Super Dream',
    highestCTC: '₹18.00 LPA',
    roles: 'Cloud Infrastructure Engineer, Associate SDE',
    hiredCount: 6,
    badgeBg: '#1a1f2c',
    logoText: 'GCP',
    accentColor: '#4285f4',
    category: 'Hyperscale Cloud & AI Infrastructure',
    photo: 'assets/hitam3.jpeg'
  },
  {
    id: 'rec-db',
    name: 'Darwinbox',
    tier: 'Super Dream',
    highestCTC: '₹14.00 LPA',
    roles: 'Member Technical Staff (MTS)',
    hiredCount: 14,
    badgeBg: '#312e81',
    logoText: 'DB',
    accentColor: '#6366f1',
    category: 'Enterprise HR Tech SaaS Unicorn',
    photo: 'assets/hitam2.jpeg'
  },
  {
    id: 'rec-cisco',
    name: 'Cisco Systems',
    tier: 'Super Dream',
    highestCTC: '₹15.50 LPA',
    roles: 'Network Software Engineer, Security Analyst',
    hiredCount: 10,
    badgeBg: '#053d58',
    logoText: 'CISCO',
    accentColor: '#049fd9',
    category: 'Networking & Enterprise Cyber Systems',
    photo: 'assets/hitam6.jpeg'
  },
  {
    id: 'rec-oracle',
    name: 'Oracle',
    tier: 'Super Dream',
    highestCTC: '₹15.00 LPA',
    roles: 'Applications Developer, Cloud Engineer',
    hiredCount: 11,
    badgeBg: '#4a0e0e',
    logoText: 'ORCL',
    accentColor: '#ea1c24',
    category: 'Enterprise Database & Cloud Suite',
    photo: 'assets/hitam4.jpeg'
  },
  {
    id: 'rec-snow',
    name: 'ServiceNow',
    tier: 'Super Dream',
    highestCTC: '₹14.00 LPA',
    roles: 'Associate Platform Engineer',
    hiredCount: 9,
    badgeBg: '#032d27',
    logoText: 'NOW',
    accentColor: '#10b981',
    category: 'Digital Workflow & Cloud Automation',
    photo: 'assets/hitam7.jpeg'
  },
  {
    id: 'rec-ibm',
    name: 'IBM India',
    tier: 'Dream Tier',
    highestCTC: '₹12.00 LPA',
    roles: 'Cloud & AI Engineer, Systems Developer',
    hiredCount: 22,
    badgeBg: '#001d6c',
    logoText: 'IBM',
    accentColor: '#0f62fe',
    category: 'Hybrid Cloud & Enterprise AI',
    photo: 'assets/hitam1.jpg'
  },
  {
    id: 'rec-infy',
    name: 'Infosys (Power Programmer)',
    tier: 'Dream Tier',
    highestCTC: '₹9.50 LPA',
    roles: 'Specialist Programmer, Digital SE',
    hiredCount: 64,
    badgeBg: '#005587',
    logoText: 'INFY',
    accentColor: '#0284c7',
    category: 'Digital Transformation & Enterprise IT',
    photo: 'assets/hitam3.jpeg'
  },
  {
    id: 'rec-tcs',
    name: 'TCS Digital',
    tier: 'Dream Tier',
    highestCTC: '₹11.00 LPA',
    roles: 'Digital Software Innovator, Systems Engg',
    hiredCount: 88,
    badgeBg: '#111827',
    logoText: 'TCS',
    accentColor: '#2563eb',
    category: 'Next-Gen Cognitive Digital Solutions',
    photo: 'assets/hitam2.jpeg'
  },
  {
    id: 'rec-cap',
    name: 'Capgemini',
    tier: 'Dream Tier',
    highestCTC: '₹7.50 LPA',
    roles: 'Senior Software Analyst, DevOps',
    hiredCount: 72,
    badgeBg: '#004369',
    logoText: 'CAP',
    accentColor: '#0ea5e9',
    category: 'Global Engineering & Cloud Services',
    photo: 'assets/hitam6.jpeg'
  },
  {
    id: 'rec-vir',
    name: 'Virtusa',
    tier: 'Dream Tier',
    highestCTC: '₹12.50 LPA',
    roles: 'Associate Engineer, FinTech Developer',
    hiredCount: 44,
    badgeBg: '#7f1d1d',
    logoText: 'VIR',
    accentColor: '#dc2626',
    category: 'FinTech & Capital Markets Engineering',
    photo: 'assets/hitam4.jpeg'
  },
  {
    id: 'rec-cts',
    name: 'Cognizant (GenC Elevate)',
    tier: 'Dream Tier',
    highestCTC: '₹7.50 LPA',
    roles: 'GenC Elevate SDE, Cloud Practitioner',
    hiredCount: 96,
    badgeBg: '#1e3a8a',
    logoText: 'CTS',
    accentColor: '#3b82f6',
    category: 'Digital Engineering & AI Solutions',
    photo: 'assets/hitam7.jpeg'
  },
  {
    id: 'rec-wipro',
    name: 'Wipro (Turbo)',
    tier: 'Dream Tier',
    highestCTC: '₹6.50 LPA',
    roles: 'Turbo Project Engineer, IoT Dev',
    hiredCount: 58,
    badgeBg: '#134e4a',
    logoText: 'WIPRO',
    accentColor: '#14b8a6',
    category: 'Cloud, Cybersecurity & IoT Services',
    photo: 'assets/hitam1.jpg'
  },
  {
    id: 'rec-acn',
    name: 'Accenture Solutions',
    tier: 'Dream Tier',
    highestCTC: '₹8.50 LPA',
    roles: 'Advanced Technology Associate',
    hiredCount: 76,
    badgeBg: '#581c87',
    logoText: 'ACN',
    accentColor: '#a855f7',
    category: 'Technology Strategy & Scaled Platforms',
    photo: 'assets/hitam5.jpeg'
  },
  {
    id: 'rec-tm',
    name: 'Tech Mahindra',
    tier: 'Corporate Tier',
    highestCTC: '₹5.50 LPA',
    roles: 'Associate Software Engineer, Telecom Dev',
    hiredCount: 42,
    badgeBg: '#78350f',
    logoText: 'TM',
    accentColor: '#d97706',
    category: 'Telecom, 5G & Network Software',
    photo: 'assets/hitam3.jpeg'
  },
  {
    id: 'rec-hex',
    name: 'Hexaware Technologies',
    tier: 'Corporate Tier',
    highestCTC: '₹6.00 LPA',
    roles: 'Software Engineer Trainee',
    hiredCount: 34,
    badgeBg: '#064e3b',
    logoText: 'HEX',
    accentColor: '#10b981',
    category: 'Automation & Cloud Modernization',
    photo: 'assets/hitam2.jpeg'
  },
  {
    id: 'rec-ltt',
    name: 'L&T Technology Services',
    tier: 'Corporate Tier',
    highestCTC: '₹6.00 LPA',
    roles: 'Embedded Systems Engineer, CAD Analyst',
    hiredCount: 26,
    badgeBg: '#0c4a6e',
    logoText: 'LTTS',
    accentColor: '#0284c7',
    category: 'Core Engineering R&D & Automation',
    photo: 'assets/hitam7.jpeg'
  },
  {
    id: 'rec-bosch',
    name: 'Robert Bosch',
    tier: 'Corporate Tier',
    highestCTC: '₹7.00 LPA',
    roles: 'Automotive Software Engineer, IoT Trainee',
    hiredCount: 20,
    badgeBg: '#701a75',
    logoText: 'BOSCH',
    accentColor: '#c026d3',
    category: 'Automotive Telematics & Embedded Systems',
    photo: 'assets/hitam4.jpeg'
  }
];

// 3. Placed Students Roster Across Batches 2020 to 2026
const hitamPlacedStudentsData = [
  // --- BATCH OF 2026 ---
  {
    name: 'P. Vignesh Reddy',
    roll: '22E51A6612',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Goldman Sachs',
    role: 'Engineering Analyst',
    package: '₹24.00 LPA',
    tier: 'Super Dream',
    batch: '2026',
    verified: true,
    initials: 'VR',
    avatarBg: '#08752f'
  },
  {
    name: 'K. Sai Teja',
    roll: '22E51A6604',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Amazon AWS',
    role: 'Cloud Solutions Associate',
    package: '₹18.50 LPA',
    tier: 'Super Dream',
    batch: '2026',
    verified: true,
    initials: 'ST',
    avatarBg: '#0369a1'
  },
  {
    name: 'P. Haritha',
    roll: '22E51A6708',
    branch: 'CSE (Data Science)',
    branchCode: 'CSD',
    company: 'Darwinbox',
    role: 'Member Technical Staff (MTS)',
    package: '₹12.00 LPA',
    tier: 'Super Dream',
    batch: '2026',
    verified: true,
    initials: 'PH',
    avatarBg: '#4338ca'
  },
  {
    name: 'R. Akhil Kumar',
    roll: '22E51A0512',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Infosys (Power Programmer)',
    role: 'Specialist Programmer',
    package: '₹9.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'AK',
    avatarBg: '#0f766e'
  },
  {
    name: 'M. Ananya',
    roll: '22E51A0545',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'TCS Digital',
    role: 'Digital Software Innovator',
    package: '₹7.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'MA',
    avatarBg: '#1e40af'
  },
  {
    name: 'G. Nikhil',
    roll: '22E51A0415',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Capgemini',
    role: 'Embedded Software Analyst',
    package: '₹7.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'GN',
    avatarBg: '#b45309'
  },
  {
    name: 'V. Sneha Reddy',
    roll: '22E51A6623',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Virtusa',
    role: 'FinTech Software Associate',
    package: '₹7.00 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'SR',
    avatarBg: '#991b1b'
  },
  {
    name: 'S. Rohith',
    roll: '22E51A0538',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Cognizant (GenC Elevate)',
    role: 'GenC Elevate SDE',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'SR',
    avatarBg: '#1e3a8a'
  },
  {
    name: 'D. Shravan',
    roll: '22E51A0422',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Wipro (Turbo)',
    role: 'IoT & Firmware Engineer',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'DS',
    avatarBg: '#115e59'
  },
  {
    name: 'B. Priyanka',
    roll: '22E51A6715',
    branch: 'CSE (Data Science)',
    branchCode: 'CSD',
    company: 'Accenture Solutions',
    role: 'Advanced Technology Associate',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2026',
    verified: true,
    initials: 'BP',
    avatarBg: '#6b21a8'
  },
  {
    name: 'N. Divya',
    roll: '22E51A0550',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Hexaware Technologies',
    role: 'Automation & Cloud Trainee',
    package: '₹6.00 LPA',
    tier: 'Corporate Tier',
    batch: '2026',
    verified: true,
    initials: 'ND',
    avatarBg: '#166534'
  },
  {
    name: 'A. Karthik',
    roll: '22E51A0302',
    branch: 'Mechanical Engineering',
    branchCode: 'MECH',
    company: 'Tech Mahindra',
    role: 'CAD & Systems Engineer',
    package: '₹5.50 LPA',
    tier: 'Corporate Tier',
    batch: '2026',
    verified: true,
    initials: 'AK',
    avatarBg: '#854d0e'
  },

  // --- BATCH OF 2025 ---
  {
    name: 'S. Harshavardhan',
    roll: '21E51A0518',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Amazon AWS',
    role: 'Cloud Solutions Associate',
    package: '₹21.50 LPA',
    tier: 'Super Dream',
    batch: '2025',
    verified: true,
    initials: 'SH',
    avatarBg: '#0369a1'
  },
  {
    name: 'Ch. Keerthi',
    roll: '21E51A6615',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Microsoft',
    role: 'Associate Software Engineer',
    package: '₹16.00 LPA',
    tier: 'Super Dream',
    batch: '2025',
    verified: true,
    initials: 'CK',
    avatarBg: '#002050'
  },
  {
    name: 'T. Abhilash',
    roll: '21E51A6703',
    branch: 'CSE (Data Science)',
    branchCode: 'CSD',
    company: 'ServiceNow',
    role: 'Associate Platform Engineer',
    package: '₹14.00 LPA',
    tier: 'Super Dream',
    batch: '2025',
    verified: true,
    initials: 'TA',
    avatarBg: '#10b981'
  },
  {
    name: 'K. Manasa',
    roll: '21E51A0529',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Darwinbox',
    role: 'Product Engineer',
    package: '₹11.50 LPA',
    tier: 'Super Dream',
    batch: '2025',
    verified: true,
    initials: 'KM',
    avatarBg: '#4338ca'
  },
  {
    name: 'J. Pranitha',
    roll: '21E51A0419',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Infosys (Power Programmer)',
    role: 'Specialist Programmer',
    package: '₹9.00 LPA',
    tier: 'Dream Tier',
    batch: '2025',
    verified: true,
    initials: 'JP',
    avatarBg: '#0f766e'
  },
  {
    name: 'P. Rahul',
    roll: '21E51A0541',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'TCS Digital',
    role: 'Digital Innovator',
    package: '₹7.50 LPA',
    tier: 'Dream Tier',
    batch: '2025',
    verified: true,
    initials: 'PR',
    avatarBg: '#1e40af'
  },
  {
    name: 'V. Bhavya',
    roll: '21E51A0431',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Capgemini',
    role: 'Software Analyst',
    package: '₹7.20 LPA',
    tier: 'Dream Tier',
    batch: '2025',
    verified: true,
    initials: 'VB',
    avatarBg: '#0ea5e9'
  },
  {
    name: 'B. Suresh',
    roll: '21E51A0312',
    branch: 'Mechanical Engineering',
    branchCode: 'MECH',
    company: 'L&T Technology Services',
    role: 'Design & Automation Engineer',
    package: '₹5.80 LPA',
    tier: 'Corporate Tier',
    batch: '2025',
    verified: true,
    initials: 'BS',
    avatarBg: '#0284c7'
  },

  // --- BATCH OF 2024 ---
  {
    name: 'V. Ravindra',
    roll: '20E51A6704',
    branch: 'CSE (Data Science)',
    branchCode: 'CSD',
    company: 'Microsoft',
    role: 'Systems Software Engineer',
    package: '₹18.00 LPA',
    tier: 'Super Dream',
    batch: '2024',
    verified: true,
    initials: 'VR',
    avatarBg: '#002050'
  },
  {
    name: 'N. Spandana',
    roll: '20E51A0511',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Oracle',
    role: 'Applications Engineer',
    package: '₹15.00 LPA',
    tier: 'Super Dream',
    batch: '2024',
    verified: true,
    initials: 'NS',
    avatarBg: '#ea1c24'
  },
  {
    name: 'B. Tejaswi',
    roll: '20E51A0408',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Cisco Systems',
    role: 'Network Software Engineer',
    package: '₹13.50 LPA',
    tier: 'Super Dream',
    batch: '2024',
    verified: true,
    initials: 'BT',
    avatarBg: '#049fd9'
  },
  {
    name: 'M. Karthikeya',
    roll: '20E51A0532',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Virtusa',
    role: 'FinTech Software Associate',
    package: '₹8.00 LPA',
    tier: 'Dream Tier',
    batch: '2024',
    verified: true,
    initials: 'MK',
    avatarBg: '#dc2626'
  },
  {
    name: 'G. Sandeep',
    roll: '20E51A0524',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'TCS Digital',
    role: 'Digital Associate',
    package: '₹7.00 LPA',
    tier: 'Dream Tier',
    batch: '2024',
    verified: true,
    initials: 'GS',
    avatarBg: '#2563eb'
  },
  {
    name: 'R. Deepa',
    roll: '20E51A0417',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Infosys',
    role: 'Systems Engineer Specialist',
    package: '₹6.80 LPA',
    tier: 'Dream Tier',
    batch: '2024',
    verified: true,
    initials: 'RD',
    avatarBg: '#0284c7'
  },

  // --- BATCH OF 2023 ---
  {
    name: 'M. Sumanth',
    roll: '19E51A0410',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Cisco Systems',
    role: 'Network Software Engineer',
    package: '₹15.50 LPA',
    tier: 'Super Dream',
    batch: '2023',
    verified: true,
    initials: 'MS',
    avatarBg: '#053d58'
  },
  {
    name: 'P. Deepthi',
    roll: '19E51A0519',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'IBM India',
    role: 'Cloud Systems Associate',
    package: '₹12.00 LPA',
    tier: 'Super Dream',
    batch: '2023',
    verified: true,
    initials: 'PD',
    avatarBg: '#0f62fe'
  },
  {
    name: 'K. Praveen',
    roll: '19E51A0535',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Accenture Solutions',
    role: 'Advanced Technology Specialist',
    package: '₹8.50 LPA',
    tier: 'Dream Tier',
    batch: '2023',
    verified: true,
    initials: 'KP',
    avatarBg: '#a855f7'
  },
  {
    name: 'S. Sandhya',
    roll: '19E51A0427',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Capgemini',
    role: 'Software Analyst',
    package: '₹6.80 LPA',
    tier: 'Dream Tier',
    batch: '2023',
    verified: true,
    initials: 'SS',
    avatarBg: '#0ea5e9'
  },
  {
    name: 'A. Tharun',
    roll: '19E51A0503',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Cognizant',
    role: 'GenC Programmer',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2023',
    verified: true,
    initials: 'AT',
    avatarBg: '#3b82f6'
  },

  // --- BATCH OF 2022 ---
  {
    name: 'D. Sai Charan',
    roll: '18E51A0522',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Darwinbox',
    role: 'Product Software Engineer',
    package: '₹14.00 LPA',
    tier: 'Super Dream',
    batch: '2022',
    verified: true,
    initials: 'SC',
    avatarBg: '#312e81'
  },
  {
    name: 'R. Vamshi Krishna',
    roll: '18E51A0548',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Cognizant',
    role: 'Digital Engineer',
    package: '₹7.50 LPA',
    tier: 'Dream Tier',
    batch: '2022',
    verified: true,
    initials: 'VK',
    avatarBg: '#3b82f6'
  },
  {
    name: 'T. Swetha',
    roll: '18E51A0414',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Wipro',
    role: 'Project Engineer',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2022',
    verified: true,
    initials: 'TS',
    avatarBg: '#14b8a6'
  },
  {
    name: 'M. Vinay',
    roll: '18E51A0307',
    branch: 'Mechanical Engineering',
    branchCode: 'MECH',
    company: 'Robert Bosch',
    role: 'CAD Automation Trainee',
    package: '₹6.25 LPA',
    tier: 'Dream Tier',
    batch: '2022',
    verified: true,
    initials: 'MV',
    avatarBg: '#c026d3'
  },

  // --- BATCH OF 2021 ---
  {
    name: 'N. Bharath',
    roll: '17E51A6608',
    branch: 'CSE (AI & ML)',
    branchCode: 'CSM',
    company: 'Virtusa',
    role: 'FinTech Software Associate',
    package: '₹12.50 LPA',
    tier: 'Super Dream',
    batch: '2021',
    verified: true,
    initials: 'NB',
    avatarBg: '#7f1d1d'
  },
  {
    name: 'K. Akhila',
    roll: '17E51A0516',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Infosys',
    role: 'Systems Engineer',
    package: '₹7.00 LPA',
    tier: 'Dream Tier',
    batch: '2021',
    verified: true,
    initials: 'KA',
    avatarBg: '#0284c7'
  },
  {
    name: 'M. Naresh',
    roll: '17E51A0311',
    branch: 'Mechanical Engineering',
    branchCode: 'MECH',
    company: 'Tech Mahindra',
    role: 'Mechanical Design Associate',
    package: '₹5.00 LPA',
    tier: 'Corporate Tier',
    batch: '2021',
    verified: true,
    initials: 'MN',
    avatarBg: '#d97706'
  },
  {
    name: 'S. Rakesh',
    roll: '17E51A0423',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Cognizant',
    role: 'Programmer Analyst',
    package: '₹4.80 LPA',
    tier: 'Corporate Tier',
    batch: '2021',
    verified: true,
    initials: 'SR',
    avatarBg: '#3b82f6'
  },

  // --- BATCH OF 2020 ---
  {
    name: 'G. Tarun',
    roll: '16E51A0534',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'TCS Digital',
    role: 'Digital Systems Innovator',
    package: '₹11.00 LPA',
    tier: 'Dream Tier',
    batch: '2020',
    verified: true,
    initials: 'GT',
    avatarBg: '#111827'
  },
  {
    name: 'P. Meghana',
    roll: '16E51A0521',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Cognizant',
    role: 'Programmer Analyst',
    package: '₹6.50 LPA',
    tier: 'Dream Tier',
    batch: '2020',
    verified: true,
    initials: 'PM',
    avatarBg: '#3b82f6'
  },
  {
    name: 'V. Rajesh',
    roll: '16E51A0412',
    branch: 'Electronics & Communication',
    branchCode: 'ECE',
    company: 'Capgemini',
    role: 'Software Engineer',
    package: '₹5.50 LPA',
    tier: 'Corporate Tier',
    batch: '2020',
    verified: true,
    initials: 'VR',
    avatarBg: '#0ea5e9'
  },
  {
    name: 'K. Pooja',
    roll: '16E51A0508',
    branch: 'Computer Science & Engg',
    branchCode: 'CSE',
    company: 'Infosys',
    role: 'Operational Trainee',
    package: '₹4.50 LPA',
    tier: 'Corporate Tier',
    batch: '2020',
    verified: true,
    initials: 'KP',
    avatarBg: '#0284c7'
  }
];

// 4. Student Placement Registration In-Memory Database
window.placementRegistrationsDB = window.placementRegistrationsDB || [
  {
    regId: 'CGC-REG-2026-8812',
    name: 'P. Vignesh Reddy',
    roll: '22E51A6612',
    branch: 'CSE (AI & ML)',
    cgpa: '8.92',
    backlogs: '0',
    skills: 'Python, DSA, PyTorch, SQL',
    targetTrack: 'Super Dream Product / FinTech',
    status: 'VERIFIED & ENROLLED',
    registeredOn: '18-AUG-2026',
    mockBatch: 'Batch Alpha (Slot M-04)'
  },
  {
    regId: 'CGC-REG-2026-8819',
    name: 'K. Sai Teja',
    roll: '22E51A6604',
    branch: 'CSE (AI & ML)',
    cgpa: '8.76',
    backlogs: '0',
    skills: 'AWS Cloud, Java, Microservices',
    targetTrack: 'Cloud Architecture & SDE',
    status: 'VERIFIED & ENROLLED',
    registeredOn: '20-AUG-2026',
    mockBatch: 'Batch Beta (Slot M-08)'
  },
  {
    regId: 'CGC-REG-2026-8824',
    name: 'M. Ananya',
    roll: '22E51A0545',
    branch: 'Computer Science & Engg',
    cgpa: '8.45',
    backlogs: '0',
    skills: 'Full Stack, React, Spring Boot',
    targetTrack: 'Enterprise Software & SDE',
    status: 'VERIFIED & ENROLLED',
    registeredOn: '24-AUG-2026',
    mockBatch: 'Batch Gamma (Slot M-12)'
  }
];

// Active State
window.currentPlacementTab = 'records'; // 'records', 'recruiters', 'registration'
window.currentPlacementYear = '2026';   // '2026', '2025', '2024', '2023', '2022', '2021', '2020', 'ALL'
window.currentPlacementBranchFilter = 'ALL';
window.currentPlacementTierFilter = 'ALL';
window.currentPlacementSearch = '';

// Switch Main Placements View Tab
window.switchPlacementTab = function(tabName) {
  window.currentPlacementTab = tabName;
  const modalBody = document.getElementById('modalBody');
  if (modalBody) {
    modalBody.innerHTML = generatePlacementsHTML(tabName, window.currentPlacementYear);
  }
};

// Select Specific Graduation Year (2020 to 2026)
window.selectPlacementYear = function(year) {
  window.currentPlacementYear = year;
  window.currentPlacementBranchFilter = 'ALL';
  window.currentPlacementTierFilter = 'ALL';
  window.currentPlacementSearch = '';
  const modalBody = document.getElementById('modalBody');
  if (modalBody) {
    modalBody.innerHTML = generatePlacementsHTML('records', year);
  }
};

// Filter Student Placements within Selected Year
window.filterPlacementRoster = function(branch = null, tier = null, search = null) {
  if (branch !== null) window.currentPlacementBranchFilter = branch;
  if (tier !== null) window.currentPlacementTierFilter = tier;
  if (search !== null) window.currentPlacementSearch = search.toLowerCase().trim();

  // Update button active state
  document.querySelectorAll('.placement-chip-branch').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.branch === window.currentPlacementBranchFilter);
  });
  document.querySelectorAll('.placement-chip-tier').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tier === window.currentPlacementTierFilter);
  });

  const filtered = hitamPlacedStudentsData.filter(st => {
    const matchYear = (window.currentPlacementYear === 'ALL') || (st.batch === window.currentPlacementYear);
    const matchBranch = (window.currentPlacementBranchFilter === 'ALL') || (st.branchCode === window.currentPlacementBranchFilter);
    const matchTier = (window.currentPlacementTierFilter === 'ALL') || (st.tier === window.currentPlacementTierFilter);
    const matchSearch = (!window.currentPlacementSearch) || 
      st.name.toLowerCase().includes(window.currentPlacementSearch) ||
      st.roll.toLowerCase().includes(window.currentPlacementSearch) ||
      st.company.toLowerCase().includes(window.currentPlacementSearch) ||
      st.role.toLowerCase().includes(window.currentPlacementSearch);
    return matchYear && matchBranch && matchTier && matchSearch;
  });

  const rosterContainer = document.getElementById('placedStudentsGrid');
  const countBadge = document.getElementById('placedStudentsCount');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Placed Students Displayed`;
  }

  if (!rosterContainer) return;

  if (filtered.length === 0) {
    rosterContainer.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 32px 16px; text-align: center; background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 8px;">
        <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
        <div style="font-weight: 700; color: #1e293b; font-size: 14px;">No placed student records matched your filters.</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Try selecting "All Branches" or another batch year.</div>
        <button class="drill-action-btn drill-action-primary" style="margin-top: 12px; padding: 5px 12px; font-size: 11.5px;" onclick="window.filterPlacementRoster('ALL', 'ALL', '')">Reset Filters</button>
      </div>
    `;
    return;
  }

  rosterContainer.innerHTML = filtered.map(st => `
    <div class="placed-student-card">
      <div class="placed-student-top">
        <div class="placed-avatar" style="background:${st.avatarBg};">
          ${st.initials}
        </div>
        <div class="placed-info">
          <div class="placed-student-name">${st.name}</div>
          <div class="placed-student-roll">${st.roll}</div>
          <div class="placed-branch-badge">${st.branch}</div>
        </div>
      </div>
      <div class="placed-details">
        <div class="placed-company-row">
          <div class="placed-comp-icon">🏢</div>
          <div>
            <div class="placed-company-name">${st.company}</div>
            <div class="placed-role-title">${st.role}</div>
          </div>
        </div>
        <div class="placed-ctc-row">
          <span class="placed-ctc-pill ${st.tier === 'Super Dream' ? 'super-dream' : (st.tier === 'Dream Tier' ? 'dream' : 'corporate')}">
            ⭐ ${st.package}
          </span>
          <span class="placed-tier-tag">${st.tier}</span>
        </div>
      </div>
      <div class="placed-footer">
        <span class="placed-batch-tag">🎓 Batch of ${st.batch}</span>
        <span class="placed-verified-tag">✓ CGC Verified</span>
      </div>
    </div>
  `).join('');
};

// Filter students placed in a specific company clicked from the 20 companies list
window.filterByRecruiterCompany = function(companyName) {
  window.switchPlacementTab('records');
  window.selectPlacementYear('ALL');
  setTimeout(() => {
    const input = document.getElementById('placementSearchInput');
    if (input) input.value = companyName;
    window.filterPlacementRoster(null, null, companyName);
  }, 50);
};

// Student Placement Registration Submission Handler
window.handlePlacementRegistrationSubmit = function(event) {
  if (event) event.preventDefault();
  const roll = (document.getElementById('cgcRegRoll') ? document.getElementById('cgcRegRoll').value.trim() : '').toUpperCase();
  const name = document.getElementById('cgcRegName') ? document.getElementById('cgcRegName').value.trim() : '';
  const branch = document.getElementById('cgcRegBranch') ? document.getElementById('cgcRegBranch').value : '';
  const cgpaVal = document.getElementById('cgcRegCGPA') ? document.getElementById('cgcRegCGPA').value.trim() : '';
  const backlogs = document.getElementById('cgcRegBacklogs') ? document.getElementById('cgcRegBacklogs').value : '0';
  const skills = document.getElementById('cgcRegSkills') ? document.getElementById('cgcRegSkills').value.trim() : '';
  const track = document.getElementById('cgcRegTrack') ? document.getElementById('cgcRegTrack').value : 'Super Dream Product';
  const undertaking = document.getElementById('cgcRegUndertaking') ? document.getElementById('cgcRegUndertaking').checked : false;

  if (!roll || !name || !branch || !cgpaVal) {
    if (typeof showToast === 'function') showToast('Please complete all mandatory registration fields.');
    return;
  }

  const cgpa = parseFloat(cgpaVal);
  if (isNaN(cgpa) || cgpa < 5.0 || cgpa > 10.0) {
    if (typeof showToast === 'function') showToast('Please enter a valid academic CGPA between 5.00 and 10.00.');
    return;
  }

  if (!undertaking) {
    if (typeof showToast === 'function') showToast('Please accept the CGC Code of Conduct undertaking.');
    return;
  }

  // Generate unique registration ID
  const newRegId = 'CGC-REG-2026-' + Math.floor(1000 + Math.random() * 9000);
  const newReg = {
    regId: newRegId,
    name: name,
    roll: roll,
    branch: branch,
    cgpa: cgpa.toFixed(2),
    backlogs: backlogs,
    skills: skills || 'Problem Solving, Core Engineering',
    targetTrack: track,
    status: 'VERIFIED & ENROLLED',
    registeredOn: '29-OCT-2026',
    mockBatch: 'Batch Gamma (Slot M-' + Math.floor(10 + Math.random() * 20) + ')'
  };

  // Prepend to database
  window.placementRegistrationsDB.unshift(newReg);

  // Render Confirmation Slip
  const resContainer = document.getElementById('cgcRegistrationSlipSlot');
  if (resContainer) {
    resContainer.innerHTML = `
      <div class="cgc-slip-card" style="margin-top: 16px; background: #ffffff; border: 2px solid #16a34a; border-radius: 8px; padding: 18px; box-shadow: 0 4px 14px rgba(22, 163, 74, 0.12);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1.5px dashed #cbd5e1; padding-bottom:12px; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div>
            <div style="font-size:11px; font-weight:800; color:#15803d; letter-spacing:0.5px; text-transform:uppercase;">
              HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT
            </div>
            <div style="font-size:15px; font-weight:800; color:#0f172a; margin-top:2px;">
              PLACEMENT DRIVE REGISTRATION CONFIRMATION SLIP
            </div>
            <div style="font-size:11px; color:#64748b;">
              Academic Year 2026–2027 • Career Guidance &amp; Placement Cell
            </div>
          </div>
          <div style="text-align:right;">
            <span style="background:#dcfce7; color:#166534; font-weight:800; font-size:12px; padding:4px 10px; border-radius:12px; border:1px solid #86efac; display:inline-block;">
              ✓ ${newReg.status}
            </span>
            <div style="font-family:monospace; font-weight:700; color:#0f172a; font-size:12.5px; margin-top:4px;">
              ${newReg.regId}
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:10px; font-size:12px; margin-bottom:14px;">
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Candidate Name:</span>
            <strong style="color:#0f172a; font-size:13px;">${newReg.name}</strong>
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Hall Ticket / Roll:</span>
            <strong style="font-family:monospace; color:#0f172a; font-size:13px;">${newReg.roll}</strong>
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Department / Branch:</span>
            <strong style="color:#0f172a;">${newReg.branch}</strong>
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Academic CGPA / Backlogs:</span>
            <strong style="color:#16a34a;">${newReg.cgpa} CGPA</strong> (${newReg.backlogs} Backlogs)
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Target Track:</span>
            <strong style="color:#0f172a;">${newReg.targetTrack}</strong>
          </div>
          <div style="background:#f8fafc; padding:8px 10px; border-radius:6px; border:1px solid #e2e8f0;">
            <span style="color:#64748b; font-size:10.5px; display:block;">Assigned Mock Interview Slot:</span>
            <strong style="color:#2563eb;">${newReg.mockBatch}</strong>
          </div>
        </div>

        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:10px; font-size:11.5px; color:#166534; margin-bottom:12px;">
          ✓ <strong>Enrollment Cleared:</strong> You are formally registered for upcoming campus recruitment drives, pre-placement talks (PPTs), and technical hackathons. Please carry this acknowledgment slip along with your college identity card to the CGC Assessment Center.
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="font-family:monospace; font-size:11px; color:#64748b;">
            SECURITY HASH: HITAM-CGC-${Math.random().toString(36).substring(2, 10).toUpperCase()} • VERIFIED BY CGC DEAN
          </div>
          <div style="display:flex; gap:8px;">
            <button class="drill-action-btn drill-action-primary" style="padding:5px 12px; font-size:11.5px;" onclick="window.print()">
              🖨️ Print Slip
            </button>
            <button class="drill-action-btn drill-action-secondary" style="padding:5px 12px; font-size:11.5px;" onclick="window.switchPlacementTab('registration')">
              + Register Another Student
            </button>
          </div>
        </div>
      </div>
    `;
    resContainer.scrollIntoView({ behavior: 'smooth' });
  }

  if (typeof showToast === 'function') {
    showToast(`Placement registration successful! Slip ID: ${newRegId}`);
  }
};

// Main HTML Generator for Placements Module
function generatePlacementsHTML(activeTab = 'records', activeYear = '2026') {
  window.currentPlacementTab = activeTab;
  window.currentPlacementYear = activeYear;

  // 1. Navigation Tabs Header
  const tabsNavHTML = `
    <div class="exam-portal-tabs-nav" style="margin-bottom: 16px;">
      <button class="exam-tab-btn ${activeTab === 'records' ? 'active' : ''}" onclick="window.switchPlacementTab('records')">
        <span>📊</span> Placement Records (2020–2026)
      </button>
      <button class="exam-tab-btn ${activeTab === 'recruiters' ? 'active' : ''}" onclick="window.switchPlacementTab('recruiters')">
        <span>🏢</span> 20 Recruiting Partners
      </button>
      <button class="exam-tab-btn ${activeTab === 'registration' ? 'active' : ''}" onclick="window.switchPlacementTab('registration')">
        <span>📝</span> Student Placement Registration
      </button>
    </div>
  `;

  // --- TAB 1: PLACEMENT RECORDS (YEAR-WISE 2020 to 2026) ---
  if (activeTab === 'records') {
    // Current year statistics
    const currentYearStats = hitamPlacementBatchStats[activeYear] || {
      totalPlaced: 3120,
      highestCTC: '₹24.00 LPA',
      avgCTC: '₹6.20 LPA',
      placementRate: '92.4%',
      topCompany: 'Goldman Sachs',
      topStudent: 'P. Vignesh Reddy',
      topBranch: 'CSE (AI & ML)',
      topRole: 'Engineering Analyst',
      topCategory: 'Super Dream',
      avatarBg: '#08752f',
      initials: 'VR'
    };

    // Year selection pills (2026 down to 2020, plus All)
    const yearsList = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', 'ALL'];
    const yearPillsHTML = yearsList.map(y => `
      <button class="placement-year-chip ${activeYear === y ? 'active' : ''}" onclick="window.selectPlacementYear('${y}')">
        ${y === 'ALL' ? 'All Batches (2020–2026)' : `Batch of ${y}`}
      </button>
    `).join('');

    // Filter placed students for the selected year
    const yearStudents = hitamPlacedStudentsData.filter(st => activeYear === 'ALL' || st.batch === activeYear);

    // Initial student cards HTML
    const studentCardsHTML = yearStudents.map(st => `
      <div class="placed-student-card">
        <div class="placed-student-top">
          <div class="placed-avatar" style="background:${st.avatarBg};">
            ${st.initials}
          </div>
          <div class="placed-info">
            <div class="placed-student-name">${st.name}</div>
            <div class="placed-student-roll">${st.roll}</div>
            <div class="placed-branch-badge">${st.branch}</div>
          </div>
        </div>
        <div class="placed-details">
          <div class="placed-company-row">
            <div class="placed-comp-icon">🏢</div>
            <div>
              <div class="placed-company-name">${st.company}</div>
              <div class="placed-role-title">${st.role}</div>
            </div>
          </div>
          <div class="placed-ctc-row">
            <span class="placed-ctc-pill ${st.tier === 'Super Dream' ? 'super-dream' : (st.tier === 'Dream Tier' ? 'dream' : 'corporate')}">
              ⭐ ${st.package}
            </span>
            <span class="placed-tier-tag">${st.tier}</span>
          </div>
        </div>
        <div class="placed-footer">
          <span class="placed-batch-tag">🎓 Batch of ${st.batch}</span>
          <span class="placed-verified-tag">✓ CGC Verified</span>
        </div>
      </div>
    `).join('');

    return `
      <div class="drill-detail-view placements-portal-view">
        ${tabsNavHTML}

        <!-- Institutional Placement Hero Stats Banner -->
        <div class="placement-hero-stat-banner">
          <div class="placement-banner-content">
            <div class="placement-banner-title">
              <span>🚀</span> CAREER GUIDANCE &amp; PLACEMENT CELL (CGC)
            </div>
            <div class="placement-banner-sub">
              Verified Year-wise Campus Placement Statistics &amp; Corporate Achievers (Batches 2020 to 2026)
            </div>
            
            <div class="placement-stats-row">
              <div class="p-stat-box highlight-gold">
                <div class="p-stat-num">${currentYearStats.highestCTC}</div>
                <div class="p-stat-lbl">Highest Package</div>
                <div class="p-stat-note">${currentYearStats.topCompany}</div>
              </div>
              <div class="p-stat-box">
                <div class="p-stat-num">${currentYearStats.avgCTC}</div>
                <div class="p-stat-lbl">Average Package</div>
                <div class="p-stat-note">${activeYear === 'ALL' ? 'Across All Batches' : `Batch of ${activeYear}`}</div>
              </div>
              <div class="p-stat-box">
                <div class="p-stat-num">${currentYearStats.totalPlaced}+</div>
                <div class="p-stat-lbl">Students Placed</div>
                <div class="p-stat-note">${activeYear === 'ALL' ? '2020 to 2026 Cumulative' : `Batch of ${activeYear} Total`}</div>
              </div>
              <div class="p-stat-box">
                <div class="p-stat-num">${currentYearStats.placementRate}</div>
                <div class="p-stat-lbl">Placement Record</div>
                <div class="p-stat-note">Autonomous Graduating Batch</div>
              </div>
              <div class="p-stat-box">
                <div class="p-stat-num">85+</div>
                <div class="p-stat-lbl">Recruiting Partners</div>
                <div class="p-stat-note">Tier-1 Corporates &amp; MNCs</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Year Selector Bar (2020 to 2026) -->
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
            <span style="font-weight:700; font-size:12.5px; color:#0f172a; display:flex; align-items:center; gap:6px;">
              <span>📅</span> Select Graduation Batch Year:
            </span>
            <span style="font-size:11.5px; color:#15803d; font-weight:700;">
              Currently viewing: ${activeYear === 'ALL' ? 'All Batches (2020–2026)' : `Batch of ${activeYear} (${currentYearStats.totalPlaced} Students Placed)`}
            </span>
          </div>
          <div class="placement-years-container" style="display:flex; gap:8px; flex-wrap:wrap;">
            ${yearPillsHTML}
          </div>
        </div>

        <!-- Who Got Highest Package Spotlight Card -->
        <div class="placement-spotlight-card" style="background: linear-gradient(135deg, #fefce8 0%, #fef08a 100%); border: 1.5px solid #facc15; border-radius: 8px; padding: 16px 18px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(234, 179, 8, 0.15);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:14px;">
              <div style="width:52px; height:52px; border-radius:50%; background:${currentYearStats.avatarBg}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
                ${currentYearStats.initials}
              </div>
              <div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span style="background:#854d0e; color:#ffffff; font-weight:800; font-size:11px; padding:2px 8px; border-radius:12px; text-transform:uppercase; letter-spacing:0.5px;">
                    🏆 Highest Package Achiever • ${activeYear === 'ALL' ? 'Top Record' : `Batch of ${activeYear}`}
                  </span>
                  <span style="font-size:11.5px; color:#713f12; font-weight:700;">⭐ ${currentYearStats.topCategory}</span>
                </div>
                <div style="font-size:16px; font-weight:800; color:#451a03; margin-top:3px;">
                  ${currentYearStats.topStudent}
                </div>
                <div style="font-size:12px; color:#78350f;">
                  ${currentYearStats.topBranch} • Roll: ${currentYearStats.topRoll || 'Autonomous Student'}
                </div>
              </div>
            </div>

            <div style="text-align:right; background:rgba(255,255,255,0.7); padding:8px 14px; border-radius:8px; border:1px solid #fde047;">
              <div style="font-size:11px; color:#854d0e; font-weight:700; text-transform:uppercase;">Offered by ${currentYearStats.topCompany}</div>
              <div style="font-size:22px; font-weight:900; color:#b45309; line-height:1.2;">${currentYearStats.highestCTC}</div>
              <div style="font-size:11px; color:#78350f; font-weight:600;">Role: ${currentYearStats.topRole}</div>
            </div>
          </div>
        </div>

        <!-- Section Header for Placed Students Roster -->
        <div class="placement-section-head">
          <div>
            <h3 style="margin:0; font-size:15px; color:#0f172a; display:flex; align-items:center; gap:8px;">
              <span>🎓</span> Placed Student Members — ${activeYear === 'ALL' ? 'All Batches (2020–2026)' : `Batch of ${activeYear}`}
            </h3>
            <p style="margin:4px 0 0 0; font-size:12px; color:#64748b;">
              Showing verified placement records with student names, branches, hiring companies, and packages.
            </p>
          </div>
          <span class="placed-count-badge" id="placedStudentsCount">${yearStudents.length} Placed Students Displayed</span>
        </div>

        <!-- Interactive Search & Branch / Tier Filter Toolbar -->
        <div class="placement-filter-bar">
          <div class="placement-search-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" id="placementSearchInput" placeholder="Search by student name, roll number, company, or job role..." 
                   oninput="window.filterPlacementRoster(null, null, this.value)">
          </div>
          
          <div class="placement-filter-groups">
            <div class="filter-group">
              <span class="filter-label">Branch:</span>
              <div class="chip-group">
                <button class="placement-chip placement-chip-branch active" data-branch="ALL" onclick="window.filterPlacementRoster('ALL', null, null)">All Branches</button>
                <button class="placement-chip placement-chip-branch" data-branch="CSM" onclick="window.filterPlacementRoster('CSM', null, null)">CSE (AI &amp; ML)</button>
                <button class="placement-chip placement-chip-branch" data-branch="CSD" onclick="window.filterPlacementRoster('CSD', null, null)">CSE (Data Science)</button>
                <button class="placement-chip placement-chip-branch" data-branch="CSE" onclick="window.filterPlacementRoster('CSE', null, null)">CSE Core</button>
                <button class="placement-chip placement-chip-branch" data-branch="ECE" onclick="window.filterPlacementRoster('ECE', null, null)">ECE</button>
                <button class="placement-chip placement-chip-branch" data-branch="MECH" onclick="window.filterPlacementRoster('MECH', null, null)">MECH</button>
              </div>
            </div>

            <div class="filter-group">
              <span class="filter-label">Package Tier:</span>
              <div class="chip-group">
                <button class="placement-chip placement-chip-tier active" data-tier="ALL" onclick="window.filterPlacementRoster(null, 'ALL', null)">All Tiers</button>
                <button class="placement-chip placement-chip-tier" data-tier="Super Dream" onclick="window.filterPlacementRoster(null, 'Super Dream', null)">⭐ Super Dream (₹10+ LPA)</button>
                <button class="placement-chip placement-chip-tier" data-tier="Dream Tier" onclick="window.filterPlacementRoster(null, 'Dream Tier', null)">Dream (₹6–10 LPA)</button>
                <button class="placement-chip placement-chip-tier" data-tier="Corporate Tier" onclick="window.filterPlacementRoster(null, 'Corporate Tier', null)">Corporate</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Placed Students Grid -->
        <div class="placed-students-grid" id="placedStudentsGrid" style="margin-top:14px;">
          ${studentCardsHTML}
        </div>

        <!-- CGC Contact Desk -->
        <div style="margin-top:24px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:16px;">
          <div style="font-weight:700; font-size:13.5px; color:#166534; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            <span>📞</span> HITAM Career Guidance &amp; Placement Cell Contact Desk
          </div>
          <div style="font-size:12px; color:#334155; line-height:1.6;">
            <strong>Dean &amp; Head - CGC:</strong> Dr. K. Radhakrishnan • <strong>Email:</strong> placements@hitam.org • <strong>Desk:</strong> +91 92487 11155 / 11156<br>
            <strong>CGC Campus Location:</strong> Ground Floor, Ramanujan Academic Block, HITAM Campus, Medchal, Hyderabad – 501401.
          </div>
        </div>
        <div id="modalToastSlot"></div>
      </div>
    `;
  }

  // --- TAB 2: 20 RECRUITING PARTNERS ---
  if (activeTab === 'recruiters') {
    const companyCardsHTML = hitamRecruitersData.map((r, idx) => `
      <div class="recruiter-logo-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; box-shadow:0 1px 3px rgba(0,0,0,0.05);" onmouseenter="this.style.borderColor='${r.accentColor}'; this.style.transform='translateY(-2px)'" onmouseleave="this.style.borderColor='#e2e8f0'; this.style.transform='none'">
        <div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <div style="width:48px; height:48px; border-radius:8px; background:${r.badgeBg}; color:#ffffff; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:13px; letter-spacing:0.5px; border:2px solid ${r.accentColor}; flex-shrink:0;">
              ${r.logoText}
            </div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:11px; font-weight:700; color:#64748b;">#${idx + 1} Recruiter</span>
                <span style="font-size:10px; font-weight:700; background:${r.accentColor}18; color:${r.accentColor}; padding:2px 6px; border-radius:10px; border:1px solid ${r.accentColor}40;">
                  ${r.tier}
                </span>
              </div>
              <div style="font-size:14px; font-weight:800; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${r.name}
              </div>
              <div style="font-size:11px; color:#64748b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${r.category}
              </div>
            </div>
          </div>

          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:#475569; font-weight:600;">Top CTC:</span>
              <span style="font-size:13px; font-weight:800; color:#08752f;">${r.highestCTC}</span>
            </div>
            <div style="font-size:11px; color:#334155; margin-top:2px;">
              <strong>Roles:</strong> ${r.roles}
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f1f5f9; padding-top:8px; font-size:11.5px;">
          <span style="color:#0f172a; font-weight:600;">👥 <strong>${r.hiredCount}</strong> Students Placed</span>
          <button class="drill-action-btn drill-action-primary" style="padding:3px 9px; font-size:11px;" onclick="window.filterByRecruiterCompany('${r.name.split(' ')[0]}')">
            View Placed →
          </button>
        </div>
      </div>
    `).join('');

    return `
      <div class="drill-detail-view placements-portal-view">
        ${tabsNavHTML}

        <div class="placement-section-head" style="margin-top:0;">
          <div>
            <h3 style="margin:0; font-size:16px; color:#0f172a; display:flex; align-items:center; gap:8px;">
              <span>🏢</span> 20 Top Recruiting Partner Companies
            </h3>
            <p style="margin:4px 0 0 0; font-size:12px; color:#64748b;">
              Distinguished multinational corporations, investment banks, and technology leaders visiting HITAM Campus for autonomous hiring.
            </p>
          </div>
          <span style="font-size:12px; background:#dcfce7; color:#166534; padding:4px 12px; border-radius:20px; font-weight:800; border:1px solid #86efac;">
            20 Corporate Partners Active
          </span>
        </div>

        <!-- Campus Assessment & Interview Suite Photo Strip -->
        <div style="margin: 14px 0 18px 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 260px;">
            <div style="font-weight:700; font-size:13px; color:#065f46; display:flex; align-items:center; gap:6px;">
              <span>📸</span> On-Campus Corporate Assessment Centers &amp; Interview Carrels
            </div>
            <div style="font-size:11.5px; color:#475569; margin-top:2px;">
              Equipped with 300+ dedicated computer evaluation terminals, gigabit optical connectivity, and video conferencing suites for international technical panels.
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <img src="assets/hitam7.jpeg" alt="Recruitment Lab" style="width: 90px; height: 56px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;">
            <img src="assets/hitam1.jpg" alt="Auditorium PPT" style="width: 90px; height: 56px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;">
            <img src="assets/hitam3.jpeg" alt="Interview Suite" style="width: 90px; height: 56px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;">
          </div>
        </div>

        <!-- 20 Companies Grid -->
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:12px; margin-bottom:20px;">
          ${companyCardsHTML}
        </div>

        <div style="text-align:center; padding:12px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
          <button class="drill-action-btn drill-action-primary" onclick="window.switchPlacementTab('records')">
            ← View Year-Wise Placed Students Roster (2020–2026)
          </button>
        </div>
      </div>
    `;
  }

  // --- TAB 3: STUDENT PLACEMENT REGISTRATION DESK ---
  if (activeTab === 'registration') {
    const regListHTML = window.placementRegistrationsDB.map(r => `
      <tr style="border-bottom:1px solid #f1f5f9; font-size:12px;">
        <td style="padding:10px; font-family:monospace; font-weight:700; color:#0f172a;">${r.regId}</td>
        <td style="padding:10px; font-weight:700; color:#0f172a;">${r.name}<br><span style="font-size:11px; color:#64748b; font-family:monospace;">${r.roll}</span></td>
        <td style="padding:10px; color:#334155;">${r.branch}</td>
        <td style="padding:10px;"><strong style="color:#16a34a;">${r.cgpa}</strong> (${r.backlogs} Backlogs)</td>
        <td style="padding:10px; font-size:11.5px; color:#2563eb;">${r.targetTrack}</td>
        <td style="padding:10px;"><span style="background:#dcfce7; color:#166534; padding:2px 8px; border-radius:10px; font-weight:700; font-size:11px; border:1px solid #86efac;">${r.status}</span></td>
      </tr>
    `).join('');

    return `
      <div class="drill-detail-view placements-portal-view">
        ${tabsNavHTML}

        <!-- Registration Desk Header -->
        <div class="placement-section-head" style="margin-top:0;">
          <div>
            <h3 style="margin:0; font-size:16px; color:#0f172a; display:flex; align-items:center; gap:8px;">
              <span>📝</span> Student Campus Placement Registration Desk (Batches 2026 &amp; 2027)
            </h3>
            <p style="margin:4px 0 0 0; font-size:12px; color:#64748b;">
              Mandatory institutional registration process for eligible final and pre-final year autonomous engineering students.
            </p>
          </div>
          <span style="font-size:12px; background:#dcfce7; color:#166534; padding:4px 12px; border-radius:20px; font-weight:800; border:1px solid #86efac;">
            Registrations Open 2026–27
          </span>
        </div>

        <!-- 4-Step Registration Workflow Guide -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:14px; margin: 12px 0 16px 0;">
          <div style="font-weight:700; font-size:12.5px; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            <span>ℹ️</span> Campus Placement Drive Workflow:
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:10px; font-size:11.5px; color:#334155;">
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px;">
              <strong style="color:#08752f;">1. Profile Verification:</strong> Minimum 6.00 CGPA with no active backlogs for Super Dream companies.
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px;">
              <strong style="color:#08752f;">2. Skill Mapping:</strong> Coding assessments on HackerRank, LeetCode, and domain core technical tests.
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px;">
              <strong style="color:#08752f;">3. Pre-Placement Talks:</strong> Mandatory attendance in corporate PPTs and technical bootcamps.
            </div>
            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px;">
              <strong style="color:#08752f;">4. Registration Slip:</strong> Obtain authorized CGC acknowledgment slip for campus interview entry.
            </div>
          </div>
        </div>

        <!-- Registration Input Form Card -->
        <div style="background:#ffffff; border:1.5px solid #08752f; border-radius:8px; padding:20px; box-shadow:0 4px 12px rgba(8, 117, 47, 0.08);">
          <div style="font-weight:800; font-size:14px; color:#065f46; margin-bottom:14px; display:flex; align-items:center; gap:6px;">
            <span>📋</span> Enter Student Candidate Credentials
          </div>

          <form id="cgcPlacementRegistrationForm" onsubmit="window.handlePlacementRegistrationSubmit(event)">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-bottom:12px;">
              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Student Hall Ticket / Roll Number *</label>
                <input type="text" id="cgcRegRoll" placeholder="e.g. 23E51A6619" required
                       style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none; text-transform:uppercase;">
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Full Name *</label>
                <input type="text" id="cgcRegName" placeholder="Full candidate name" required
                       style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Department / Branch *</label>
                <select id="cgcRegBranch" required style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
                  <option value="CSE (AI &amp; ML)">CSE (AI &amp; ML)</option>
                  <option value="CSE (Data Science)">CSE (Data Science)</option>
                  <option value="Computer Science &amp; Engg">Computer Science &amp; Engg</option>
                  <option value="Electronics &amp; Communication">Electronics &amp; Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical &amp; Electronics">Electrical &amp; Electronics</option>
                  <option value="IoT &amp; Cyber Security">IoT &amp; Cyber Security</option>
                </select>
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Current Cumulative CGPA *</label>
                <input type="number" step="0.01" min="5.0" max="10.0" id="cgcRegCGPA" placeholder="e.g. 8.65" required
                       style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Active Backlogs Count *</label>
                <select id="cgcRegBacklogs" style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
                  <option value="0">0 Active Backlogs (Eligible for All Tiers)</option>
                  <option value="1">1 Active Backlog</option>
                  <option value="2">2+ Backlogs</option>
                </select>
              </div>

              <div>
                <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Target Career Track</label>
                <select id="cgcRegTrack" style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
                  <option value="Super Dream Product / FinTech">Super Dream Product / FinTech (₹10+ LPA)</option>
                  <option value="Cloud Architecture &amp; SDE">Cloud Architecture &amp; SDE</option>
                  <option value="Enterprise Digital Services">Enterprise Digital Services</option>
                  <option value="Core Engineering &amp; Embedded">Core Engineering &amp; Embedded R&amp;D</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom:12px;">
              <label style="display:block; font-size:11px; font-weight:700; color:#334155; margin-bottom:4px;">Primary Technical Skills &amp; Certifications</label>
              <input type="text" id="cgcRegSkills" placeholder="e.g. Java, Python, Data Structures &amp; Algorithms, React, AWS Certified, SQL"
                     style="width:100%; padding:8px 10px; font-size:12.5px; border:1px solid #cbd5e1; border-radius:6px; outline:none;">
            </div>

            <div style="margin-bottom:14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px;">
              <label style="display:flex; align-items:flex-start; gap:8px; font-size:11.5px; color:#334155; cursor:pointer;">
                <input type="checkbox" id="cgcRegUndertaking" required style="margin-top:2px;">
                <span>
                  <strong>CGC Placement Undertaking:</strong> I hereby declare that the academic credentials and CGPA entered are correct. I agree to adhere to the HITAM Career Guidance &amp; Placement Cell placement code of conduct, attend all allocated mock rounds, and honor campus drive appointments.
                </span>
              </label>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button type="submit" class="drill-action-btn drill-action-primary" style="padding:8px 18px; font-size:13px; font-weight:700;">
                ✓ Submit Placement Registration &amp; Generate Slip
              </button>
            </div>
          </form>

          <div id="cgcRegistrationSlipSlot"></div>
        </div>

        <!-- Verified Registrations Table -->
        <div style="margin-top:22px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">
          <div style="padding:12px 14px; background:#f8fafc; border-bottom:1px solid #e2e8f0; font-weight:700; font-size:13px; color:#0f172a; display:flex; justify-content:space-between; align-items:center;">
            <span>📋 Active Enrolled Student Registrations (Current Session)</span>
            <span style="font-size:11.5px; color:#15803d; font-weight:700;">${window.placementRegistrationsDB.length} Candidates Registered</span>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left;">
              <thead>
                <tr style="background:#f1f5f9; font-size:11px; text-transform:uppercase; color:#475569; letter-spacing:0.5px;">
                  <th style="padding:8px 10px;">Reg ID</th>
                  <th style="padding:8px 10px;">Candidate &amp; Roll</th>
                  <th style="padding:8px 10px;">Department</th>
                  <th style="padding:8px 10px;">Academic CGPA</th>
                  <th style="padding:8px 10px;">Track</th>
                  <th style="padding:8px 10px;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${regListHTML}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

// Attach functions and data models to window
window.generatePlacementsHTML = generatePlacementsHTML;
window.hitamRecruitersData = hitamRecruitersData;
window.hitamPlacedStudentsData = hitamPlacedStudentsData;
window.hitamPlacementBatchStats = hitamPlacementBatchStats;

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

window.togglePortalAccordion = function(accId) {
  const el = document.getElementById(accId);
  const arrow = document.getElementById(accId + '_arrow');
  if (!el) return;
  const isHidden = (el.style.display === 'none' || el.style.display === '');
  el.style.display = isHidden ? 'block' : 'none';
  if (arrow) arrow.textContent = isHidden ? '▼' : '>';
};

/* ==========================================================================
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
    name: 'Dr. S. Arvind',
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

window.adminUsers = adminUsers;

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

window.facultyUsers = facultyUsers;

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
  const match = roll.match(/^(\d{2})E5(?:1A)?([0-9]{2})([0-9A-Z]{2})$/);
  
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
    name: (storedCred && storedCred.alias) ? `Student (${storedCred.alias} — ${roll})` : ((roll === '23E51A6619') ? 'BHUKYA VISHNU' : `Student (${roll} — ${deptKey})`),
    photo: '',
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


window.activeAdminTab = window.activeAdminTab || 'events';
window.adminEditingEventId = null;
window.adminShowEventForm = false;

window.adminSwitchTab = function(tabName, adminId) {
  window.activeAdminTab = tabName;
  window.authenticatePortal('admin', adminId);
};

window.adminToggleCreateEventForm = function(adminId) {
  window.adminShowEventForm = !window.adminShowEventForm;
  if (!window.adminShowEventForm) {
    window.adminEditingEventId = null;
  }
  window.authenticatePortal('admin', adminId);
};

window.adminSetEventImgPreset = function(imgPath) {
  const input = document.getElementById('adminEventImg');
  if (input) input.value = imgPath;
};

window.adminEditEvent = function(eventId, adminId) {
  window.adminEditingEventId = eventId;
  window.adminShowEventForm = true;
  window.activeAdminTab = 'events';
  window.authenticatePortal('admin', adminId);
  const container = document.getElementById('adminEventFormContainer');
  if (container && container.scrollIntoView) {
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

window.adminCancelEventEdit = function(adminId) {
  window.adminEditingEventId = null;
  window.adminShowEventForm = false;
  window.authenticatePortal('admin', adminId);
};

window.adminDeleteEvent = function(eventId, adminId) {
  const list = window.eventsData || [];
  const ev = list.find(x => x.id === eventId);
  const title = ev ? ev.title : eventId;
  const idx = list.findIndex(x => x.id === eventId);
  if (idx !== -1) {
    list.splice(idx, 1);
    if (window.adminEditingEventId === eventId) {
      window.adminEditingEventId = null;
      window.adminShowEventForm = false;
    }
    showToast(`Event "${title}" has been removed from the campus roster.`);
    window.authenticatePortal('admin', adminId);
  }
};

window.adminToggleEventStatus = function(eventId, adminId) {
  const list = window.eventsData || [];
  const ev = list.find(x => x.id === eventId);
  if (!ev) return;
  const statuses = [
    'Registration Open (Active)',
    'Upcoming — Circular Awaited',
    'Completed'
  ];
  let curIdx = statuses.indexOf(ev.status);
  if (curIdx === -1) {
    if (ev.status.toLowerCase().includes('registration') || ev.status.toLowerCase().includes('active')) {
      curIdx = 0;
    } else if (ev.status.toLowerCase().includes('upcoming') || ev.status.toLowerCase().includes('dates announced') || ev.status.toLowerCase().includes('annual')) {
      curIdx = 1;
    } else if (ev.status.toLowerCase().includes('completed') || ev.status.toLowerCase().includes('archival')) {
      curIdx = 2;
    } else {
      curIdx = 0;
    }
  }
  const nextStatus = statuses[(curIdx + 1) % statuses.length];
  ev.status = nextStatus;
  showToast(`Status of "${ev.title}" changed to "${nextStatus}".`);
  window.authenticatePortal('admin', adminId);
};

window.adminSaveEvent = function(adminId) {
  const titleInput = document.getElementById('adminEventTitle');
  if (!titleInput || !titleInput.value.trim()) {
    showDemoNotice('Please enter a valid title for the campus event.');
    if (titleInput) titleInput.focus();
    return;
  }
  const title = titleInput.value.trim();
  const tag = (document.getElementById('adminEventTag') ? document.getElementById('adminEventTag').value.trim() : '') || 'Campus Event';
  const status = (document.getElementById('adminEventStatus') ? document.getElementById('adminEventStatus').value.trim() : '') || 'Registration Open (Active)';
  const date = (document.getElementById('adminEventDate') ? document.getElementById('adminEventDate').value.trim() : '') || 'Dates Announced via Academic Calendar';
  const img = (document.getElementById('adminEventImg') ? document.getElementById('adminEventImg').value.trim() : '') || 'assets/sangram.jpeg';
  const venue = (document.getElementById('adminEventVenue') ? document.getElementById('adminEventVenue').value.trim() : '') || 'HITAM Central Open Air Amphitheatre';
  const eligibility = (document.getElementById('adminEventEligibility') ? document.getElementById('adminEventEligibility').value.trim() : '') || 'Open to All Enrolled College & University Students';
  const desc = (document.getElementById('adminEventDesc') ? document.getElementById('adminEventDesc').value.trim() : '') || title;
  const parasRaw = document.getElementById('adminEventParas') ? document.getElementById('adminEventParas').value.trim() : '';

  const paras = parasRaw ? parasRaw.split('\n').map(p => p.trim()).filter(p => p.length > 0) : [desc];
  const details = [
    { label: 'Event Schedule', val: date },
    { label: 'Venue', val: venue },
    { label: 'Eligibility', val: eligibility },
    { label: 'Category', val: tag }
  ];

  window.eventsData = window.eventsData || [];

  if (window.adminEditingEventId) {
    const idx = window.eventsData.findIndex(x => x.id === window.adminEditingEventId);
    if (idx !== -1) {
      window.eventsData[idx] = {
        ...window.eventsData[idx],
        title, tag, status, date, img, desc, paras, details
      };
      showToast(`Event "${title}" updated successfully!`);
    }
    window.adminEditingEventId = null;
    window.adminShowEventForm = false;
  } else {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `event-${Date.now()}`;
    const finalSlug = window.eventsData.some(x => x.id === slug) ? `${slug}-${Date.now().toString().slice(-4)}` : slug;
    const newEvent = {
      id: finalSlug,
      title, tag, status, date, img, desc, paras, details
    };
    window.eventsData.unshift(newEvent);
    showToast(`New Event "${title}" created and published!`);
    window.adminShowEventForm = false;
  }

  window.authenticatePortal('admin', adminId);
};

window.adminFilterEvents = function() {
  const searchInput = document.getElementById('adminEventSearch');
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const rows = document.querySelectorAll('.admin-event-row');
  let visibleCount = 0;
  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    const match = !q || text.includes(q);
    r.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });
  const counter = document.getElementById('adminEventShowingCount');
  if (counter) counter.textContent = visibleCount;
};

window.adminResetEventsToDefault = function(adminId) {
  window.eventsData = [
    {
      id: 'elysian-fest',
      title: 'ELYSIAN — Signature Tech, Sports & Cultural Fest',
      tag: 'National Mega Festival',
      status: 'Annual National Fest — Upcoming Edition Circular Awaited',
      date: 'Annual Multi-Day Festival (Schedule Announced Annually)',
      img: 'assets/sangram.jpeg',
      desc: 'HITAM’s signature multi-day inter-collegiate festival featuring SANGRAM (Sports), ESPARTO (Tech), SAHITYA (Literature), PRASASTHI (Culture), and BLISS (Celebrity Pro-Night).',
      paras: [
        'ELYSIAN is HITAM’s grand multi-day annual national festival bringing together student participants from engineering colleges across the region...',
        'Athletes, coders, orators, and performers from premier institutions converge on HITAM’s green campus...'
      ],
      details: [
        { label: 'Festival Schedule', val: 'Multi-Day Annual Campus Festival' },
        { label: 'Key Tracks', val: 'SANGRAM (Sports), ESPARTO (Tech), BLISS (Concert)' },
        { label: 'Eligibility', val: 'Open to All Enrolled College & University Students' },
        { label: 'Campus Updates', val: 'Campus Bulletin / Student Affairs Notice Board' }
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
        'The HITAM 36-Hour National Smart Hackathon is an intensive code sprint designed to bridge classroom learning with urgent industry and societal challenges...',
        'Participants receive mentorship from senior software engineers and industry veterans.'
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
        'IGNITE is the signature campus carnival of HITAM. The multi-day festival seamlessly merges engineering challenges with vibrant cultural celebrations...'
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
        'Traditional Day at HITAM is a vibrant celebration of Indian cultural diversity...',
        'The college also conducts Honours Day to felicitate academic toppers...'
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
        'AARAMBH is organized with great enthusiasm by senior engineering students...'
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
        'National festivals at HITAM are celebrated with deep reverence...'
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
        'As an eco-conscious engineering institution, HITAM hosts the Green Campus Conclave...'
      ],
      details: [
        { label: 'Focus Areas', val: 'Zero-Waste, Clean Energy & Water Conservation' },
        { label: 'Student Exhibits', val: 'Solar EV models, Bio-filters, Eco-bricks' },
        { label: 'Institutional Goal', val: 'Carbon-Neutral Campus & Living Eco-Lab' },
        { label: 'Participation', val: 'Environmental Academics & Student Innovators' }
      ]
    }
  ];
  window.adminEditingEventId = null;
  window.adminShowEventForm = false;
  showToast('Campus events roster reset to default template.');
  window.authenticatePortal('admin', adminId);
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

window.studentMarksDB = window.studentMarksDB || {
  '23E51A6619': {
    ciea1: 23,
    cieb1: 24,
    ciec1: 22,
    ciea2: 24,
    cieb2: 25,
    ciec2: 23
  }
};

window.getStudentMarks = function(roll) {
  window.studentMarksDB = window.studentMarksDB || {};
  if (!window.studentMarksDB[roll]) {
    const s = parseInt((roll || '1').slice(-2), 10) || 1;
    window.studentMarksDB[roll] = {
      ciea1: 20 + (s % 5),
      cieb1: 21 + ((s + 1) % 5),
      ciec1: 22 + ((s + 2) % 4),
      ciea2: 21 + ((s + 3) % 5),
      cieb2: 22 + ((s + 4) % 4),
      ciec2: 23 + ((s + 1) % 3)
    };
  }
  return window.studentMarksDB[roll];
};

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
  if (sEl) window.currentFacultyFilters.section = sEl.value;
  if (aEl) window.currentFacultyFilters.cieAssessment = aEl.value;

  const validAssessments = ['ciea1', 'cieb1', 'ciec1', 'ciea2', 'cieb2', 'ciec2'];
  if (!validAssessments.includes(window.currentFacultyFilters.cieAssessment)) {
    window.currentFacultyFilters.cieAssessment = 'ciea1';
  }

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
  const comp = f.cieAssessment;
  const marksKey = `${f.branch}_${f.year}_${f.section}_${comp}`;
  window.facultyMarksDB[marksKey] = window.facultyMarksDB[marksKey] || {};

  const students = window.getStudentsForClass(f.branch, f.year, f.section);
  students.forEach(st => {
    const input = document.getElementById(`marks_${st.roll}`);
    if (input) {
      const val = Math.max(0, Math.min(25, parseFloat(input.value) || 0));
      window.facultyMarksDB[marksKey][st.roll] = val;
      const sMarks = window.getStudentMarks(st.roll);
      sMarks[comp] = val;
    }
  });

  showToast(`CIE Marks for [${comp.toUpperCase()}] saved & updated in Student Portal.`);
  showDemoNotice(`Faculty Upload Confirmed: Saved ${comp.toUpperCase()} marks for ${f.branch} Sec ${f.section}. Live update applied to Student Portal.`);
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

// 9. SIGN IN FORM GENERATION (Credentials Hidden for Privacy & Security)
window.generatePortalLoginHTML = function generatePortalLoginHTML(portalType) {
  let title = '';
  let idLabel = '';
  let idPlaceholder = '';

  if (portalType === 'admin') {
    title = 'HITAM Administrative Portal';
    idLabel = 'Administrator Username';
    idPlaceholder = 'e.g. ADMINHTM01';
  } else if (portalType === 'faculty') {
    title = 'HITAM Faculty Portal';
    idLabel = 'Faculty Employee Code / HOD ID';
    idPlaceholder = 'e.g. CSEHOD or CSE01';
  } else if (portalType === 'exam-portal' || portalType === 'sem-result' || portalType === 'sem-result-portal') {
    title = 'HITAM Autonomous Exam Portal';
    idLabel = 'Student Hall Ticket / Roll Number';
    idPlaceholder = 'e.g. 23E51A6619';
  } else {
    title = 'HITAM Student Portal';
    idLabel = 'Student Roll Number / Hall Ticket No';
    idPlaceholder = 'e.g. 23E51A6619';
  }

  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🔐 <strong>Secure Portal Access:</strong> Enter your registered account identifier and password to sign in.
      </div>

      <div class="portal-login-card">
        <h4 style="margin-top:0; color:#013b1f;">🔐 ${title} — Sign In</h4>
        <form onsubmit="event.preventDefault(); authenticatePortal('${portalType}');">
          <div class="portal-field-group">
            <label>${idLabel}</label>
            <input type="text" id="portalLoginId" value="" placeholder="${idPlaceholder}" required autocomplete="username">
          </div>
          <div class="portal-field-group" style="margin-top:12px;">
            <label>Password</label>
            <input type="password" id="portalPassword" placeholder="Enter password" required autocomplete="current-password">
          </div>
          <div class="portal-btn-row">
            <button type="submit" class="modal-action-btn primary-btn">Sign In to Dashboard →</button>
          </div>
        </form>
      </div>

      <div class="modal-highlight-box" style="margin-top:14px; font-size:12px; color:#475569;">
        🔒 <strong>Confidential Credentials Policy:</strong> Access is restricted to authorized institute members. Passwords and credentials are confidential.
      </div>

      
    </div>
  `;
}

window.setPortalLoginUser = function(userId, password) {
  const inputId = document.getElementById('portalLoginId');
  const inputPass = document.getElementById('portalPassword');
  if (inputId) inputId.value = userId;
  if (inputPass && password) inputPass.value = password;
  showDemoNotice(`Selected account: ${userId}`);
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
        
      </div>
    </div>
  `;
}

window.renderPortalWrongPassword = function renderPortalWrongPassword(portalType, userId, hint) {
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
        💡 <strong>Security Notice:</strong> Please verify your password spelling, capitalization, and registered credentials.
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

  // S. EXAM PORTAL AUTHENTICATION
  if (portalType === 'exam-portal' || portalType === 'sem-result' || portalType === 'sem-result-portal') {
    window.authenticateExamPortal(overrideId);
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

    window.activeAdminTab = window.activeAdminTab || 'events';

    // 1. Generate Branch Rows for Admin Access Management
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

    // 2. Generate Events Management Content
    const events = window.eventsData || [];
    const editingEv = window.adminEditingEventId ? events.find(x => x.id === window.adminEditingEventId) : null;
    const isEditing = !!editingEv;
    const showForm = window.adminShowEventForm || isEditing;

    let eventFormHTML = '';
    if (showForm) {
      const fTitle = isEditing ? editingEv.title : '';
      const fTag = isEditing ? editingEv.tag : 'National Hackathon';
      const fStatus = isEditing ? editingEv.status : 'Registration Open (Active)';
      const fDate = isEditing ? editingEv.date : 'Upcoming 2026 Edition';
      const fImg = isEditing ? editingEv.img : 'assets/sangram.jpeg';
      const fVenue = isEditing ? ((editingEv.details && editingEv.details.find(d => d.label.toLowerCase().includes('venue') || d.label.toLowerCase().includes('location')))?.val || 'HITAM Central Open Air Amphitheatre') : 'HITAM Central Open Air Amphitheatre';
      const fEligibility = isEditing ? ((editingEv.details && editingEv.details.find(d => d.label.toLowerCase().includes('eligibility')))?.val || 'Open to All Enrolled College & University Students') : 'Open to All Enrolled College & University Students';
      const fDesc = isEditing ? editingEv.desc : '';
      const fParas = isEditing && editingEv.paras ? editingEv.paras.join('\n\n') : '';

      eventFormHTML = `
        <div id="adminEventFormContainer" style="background:#ffffff; border:2px solid #08752f; border-radius:8px; padding:18px; margin-bottom:18px; box-shadow:0 4px 12px rgba(8, 117, 47, 0.1);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
            <div>
              <h4 style="margin:0; color:#08752f; font-size:16px;">${isEditing ? `✏️ Edit Campus Event: ${editingEv.title}` : '➕ Create &amp; Publish New Campus Event'}</h4>
              <span style="font-size:12px; color:#64748b;">${isEditing ? 'Update the event details below. Click Update to save changes.' : 'Fill in the event parameters below to publish instantly across the college website and student portal.'}</span>
            </div>
            <button class="drill-action-btn drill-action-secondary" style="padding:3px 8px; font-size:11px;" onclick="adminCancelEventEdit('${user.id}')">✕ Close Form</button>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Event Title *</label>
              <input type="text" id="adminEventTitle" value="${fTitle.replace(/"/g, '&quot;')}" placeholder="e.g. National Smart Hackathon 2026" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Category / Tag *</label>
              <select id="adminEventTag" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px; background:#fff;">
                <option value="National Mega Festival" ${fTag === 'National Mega Festival' ? 'selected' : ''}>National Mega Festival</option>
                <option value="National Hackathon" ${fTag === 'National Hackathon' ? 'selected' : ''}>National Hackathon</option>
                <option value="Flagship Mega Fest" ${fTag === 'Flagship Mega Fest' ? 'selected' : ''}>Flagship Mega Fest</option>
                <option value="Cultural &amp; Academic Gala" ${fTag === 'Cultural & Academic Gala' ? 'selected' : ''}>Cultural &amp; Academic Gala</option>
                <option value="Student Welcome Fest" ${fTag === 'Student Welcome Fest' ? 'selected' : ''}>Student Welcome Fest</option>
                <option value="Patriotic Celebrations" ${fTag === 'Patriotic Celebrations' ? 'selected' : ''}>Patriotic Celebrations</option>
                <option value="Sustainability Summit" ${fTag === 'Sustainability Summit' ? 'selected' : ''}>Sustainability Summit</option>
                <option value="Technical Workshop" ${fTag === 'Technical Workshop' ? 'selected' : ''}>Technical Workshop</option>
                <option value="Inter-Collegiate Sports" ${fTag === 'Inter-Collegiate Sports' ? 'selected' : ''}>Inter-Collegiate Sports</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Status Badge *</label>
              <select id="adminEventStatus" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px; background:#fff;">
                <option value="Registration Open (Active)" ${fStatus.includes('Registration Open') ? 'selected' : ''}>Registration Open (Active)</option>
                <option value="Annual National Fest — Upcoming Edition Circular Awaited" ${fStatus.includes('Awaited') ? 'selected' : ''}>Annual National Fest — Upcoming Edition Circular Awaited</option>
                <option value="Annual Flagship Event — Dates Announced" ${fStatus.includes('Dates Announced') ? 'selected' : ''}>Annual Flagship Event — Dates Announced</option>
                <option value="Call for Submissions &amp; Project Proposals" ${fStatus.includes('Call for') ? 'selected' : ''}>Call for Submissions &amp; Project Proposals</option>
                <option value="Completed / Archival Record" ${fStatus.includes('Completed') ? 'selected' : ''}>Completed / Archival Record</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Date / Schedule *</label>
              <input type="text" id="adminEventDate" value="${fDate.replace(/"/g, '&quot;')}" placeholder="e.g. November 18–20, 2026 or Annual Multi-Day" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Banner Image Path or URL *</label>
            <input type="text" id="adminEventImg" value="${fImg.replace(/"/g, '&quot;')}" placeholder="assets/sangram.jpeg or https://..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
              <span style="font-size:11px; color:#64748b; font-weight:600;">Image Presets:</span>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/sangram.jpeg')">Sangram (Sports)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/esparto.jpeg')">Esparto (Tech)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/bliss.png')">Bliss (Cultural)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/prasasti.jpeg')">Prasasti (Traditions)</button>
              <button type="button" class="preset-chip" style="padding:2px 8px; font-size:11px;" onclick="adminSetEventImgPreset('assets/hitam1.jpg')">Campus Greenery</button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Venue / Campus Location</label>
              <input type="text" id="adminEventVenue" value="${fVenue.replace(/"/g, '&quot;')}" placeholder="e.g. HITAM Central Open Air Amphitheatre" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
            <div>
              <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Eligibility / Participation</label>
              <input type="text" id="adminEventEligibility" value="${fEligibility.replace(/"/g, '&quot;')}" placeholder="e.g. Open to All College &amp; University Students" style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Short Card Description (1-2 sentences) *</label>
            <textarea id="adminEventDesc" rows="2" placeholder="Brief summary displayed on event cards..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">${fDesc}</textarea>
          </div>

          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11.5px; font-weight:700; color:#1e293b; margin-bottom:4px;">Detailed Description &amp; Highlights (Paragraphs)</label>
            <textarea id="adminEventParas" rows="3" placeholder="Detailed paragraphs for the event modal view (separate multiple paragraphs with an empty line)..." style="width:100%; padding:7px 10px; border:1px solid #cbd5e1; border-radius:4px; font-size:12.5px;">${fParas}</textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:8px;">
            <button class="drill-action-btn drill-action-secondary" style="padding:6px 14px; font-size:12px;" onclick="adminCancelEventEdit('${user.id}')">Cancel</button>
            <button class="drill-action-btn drill-action-primary" style="padding:6px 18px; font-size:12.5px; font-weight:700;" onclick="adminSaveEvent('${user.id}')">
              ${isEditing ? '💾 Update Event' : '💾 Save &amp; Publish Event'}
            </button>
          </div>
        </div>
      `;
    }

    const eventRowsHTML = events.map(e => `
      <div class="admin-event-row" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; display:flex; gap:14px; align-items:center; flex-wrap:wrap; transition:box-shadow 0.2s ease;">
        <img src="${e.img}" alt="${e.title}" style="width:72px; height:72px; object-fit:cover; border-radius:6px; border:1px solid #e2e8f0; flex-shrink:0;">
        <div style="flex:1; min-width:260px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
            <span style="font-size:11px; font-weight:700; background:#e0f2fe; color:#0369a1; padding:2px 7px; border-radius:4px;">${e.tag}</span>
            <button class="drill-action-btn" style="padding:2px 8px; font-size:11px; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0;" onclick="adminToggleEventStatus('${e.id}', '${user.id}')" title="Click to cycle status">
              📌 ${e.status} ⟳
            </button>
          </div>
          <div style="font-size:14px; font-weight:700; color:#0f172a; margin-bottom:3px;">${e.title}</div>
          <div style="font-size:12px; color:#475569; margin-bottom:4px; line-height:1.4;">${e.desc}</div>
          <div style="font-size:11.5px; color:#64748b;">
            <span>📅 ${e.date}</span>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; flex-shrink:0;">
          <button class="drill-action-btn drill-action-secondary" style="padding:4px 10px; font-size:11.5px;" onclick="showEventDetail('${e.id}')">👁️ Preview</button>
          <button class="drill-action-btn drill-action-primary" style="padding:4px 10px; font-size:11.5px;" onclick="adminEditEvent('${e.id}', '${user.id}')">✏️ Edit</button>
          <button class="drill-action-btn drill-action-danger" style="padding:4px 10px; font-size:11.5px;" onclick="adminDeleteEvent('${e.id}', '${user.id}')">🗑️ Remove</button>
        </div>
      </div>
    `).join('');

    const eventsManagementPanelHTML = `
      <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:16px; margin:16px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <h3 style="margin:0 0 4px 0; color:#065f46; font-size:16px; display:flex; align-items:center; gap:8px;">
              <span>🎪</span> Campus Events Management Console
            </h3>
            <p style="margin:0; font-size:12px; color:#166534;">
              As an Administrator, you can add new events, modify schedules, update banners, and remove past events. Changes update the public events directory and student portal in real time.
            </p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="drill-action-btn drill-action-primary" style="padding:6px 14px; font-size:12px; font-weight:700;" onclick="adminToggleCreateEventForm('${user.id}')">
              ➕ Create New Event
            </button>
            <button class="drill-action-btn drill-action-secondary" style="padding:6px 10px; font-size:11.5px;" onclick="adminResetEventsToDefault('${user.id}')">
              🔄 Reset Defaults
            </button>
          </div>
        </div>

        ${eventFormHTML}

        <div style="display:flex; justify-content:space-between; align-items:center; margin:14px 0 10px 0; gap:10px; flex-wrap:wrap;">
          <div style="flex:1; min-width:240px;">
            <input type="text" id="adminEventSearch" placeholder="🔍 Search events by title, tag, or status..." 
                   style="width:100%; padding:7px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:12px;"
                   oninput="adminFilterEvents()">
          </div>
          <div style="font-size:12px; color:#475569; font-weight:600;">
            Showing <span id="adminEventShowingCount">${events.length}</span> campus events
          </div>
        </div>

        <div class="admin-events-list" style="display:flex; flex-direction:column; gap:10px;">
          ${eventRowsHTML}
        </div>
      </div>
    `;

    // 3. Generate Access Control Panel HTML
    const accessControlPanelHTML = `
      <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:8px; padding:16px; margin:16px 0;">
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
    `;

    // 4. Generate Governance Tools HTML
    const governancePanelHTML = `
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="margin:0 0 10px 0; color:#1e293b; font-size:15px; display:flex; align-items:center; gap:6px;">
          <span>📊</span> Institutional Governance Demonstration Tools
        </h4>
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
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Accreditation and NAAC A+ reports are archived in the IQAC section.')">NAAC Disclosures ℹ️</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // 5. Select Active Tab Content
    let activeTabContentHTML = '';
    if (window.activeAdminTab === 'access') {
      activeTabContentHTML = accessControlPanelHTML;
    } else if (window.activeAdminTab === 'governance') {
      activeTabContentHTML = governancePanelHTML;
    } else {
      activeTabContentHTML = eventsManagementPanelHTML;
    }

    // Render Full Admin Dashboard
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
            
            <button class="portal-logout-btn" onclick="openModal('admin-portal')">Sign Out</button>
          </div>
        </div>

        <div class="portal-kpi-grid">
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.students}</div><div class="portal-kpi-lbl">Student Enrolment</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.faculty}</div><div class="portal-kpi-lbl">Active Faculty &amp; HODs</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val" style="color:#08752f">${user.attendance}</div><div class="portal-kpi-lbl">Attendance Rate</div></div>
          <div class="portal-kpi-card"><div class="portal-kpi-val">${user.collections}</div><div class="portal-kpi-lbl">Finance &amp; Collections</div></div>
          <div class="portal-kpi-card" style="cursor:pointer;" onclick="adminSwitchTab('events', '${user.id}')"><div class="portal-kpi-val" style="color:#0284c7">${events.length} Events</div><div class="portal-kpi-lbl">Campus Events Active</div></div>
        </div>

        <!-- ADMIN MODULE NAVIGATION TABS -->
        <div class="portal-tabs-nav" style="display:flex; gap:8px; margin:16px 0 10px 0; border-bottom:2px solid #e2e8f0; padding-bottom:8px; flex-wrap:wrap;">
          <button class="portal-tab-btn ${window.activeAdminTab === 'events' ? 'active' : ''}" 
                  onclick="adminSwitchTab('events', '${user.id}')">
            🎪 Campus Events Manager (${events.length})
          </button>
          <button class="portal-tab-btn ${window.activeAdminTab === 'access' ? 'active' : ''}" 
                  onclick="adminSwitchTab('access', '${user.id}')">
            <span>🛡️</span> Portal Access Control &amp; Permissions Manager
          </button>
          <button class="portal-tab-btn ${window.activeAdminTab === 'governance' ? 'active' : ''}" 
                  onclick="adminSwitchTab('governance', '${user.id}')">
            <span>📊</span> Institutional Governance Tools
          </button>
        </div>

        <!-- ACTIVE TAB CONTENT -->
        ${activeTabContentHTML}

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

      const assessmentOptions = `
        <optgroup label="Mid-Semester 1 Internal Assessment Components">
          <option value="ciea1" ${cieKey === 'ciea1' ? 'selected' : ''}>Mid-1 Theory Exam [ciea1] (Max 25)</option>
          <option value="cieb1" ${cieKey === 'cieb1' ? 'selected' : ''}>Mid-1 Assignment [cieb1] (Max 25)</option>
          <option value="ciec1" ${cieKey === 'ciec1' ? 'selected' : ''}>Mid-1 Quiz &amp; Activity [ciec1] (Max 25)</option>
        </optgroup>
        <optgroup label="Mid-Semester 2 Internal Assessment Components">
          <option value="ciea2" ${cieKey === 'ciea2' ? 'selected' : ''}>Mid-2 Theory Exam [ciea2] (Max 25)</option>
          <option value="cieb2" ${cieKey === 'cieb2' ? 'selected' : ''}>Mid-2 Assignment [cieb2] (Max 25)</option>
          <option value="ciec2" ${cieKey === 'ciec2' ? 'selected' : ''}>Mid-2 Quiz &amp; Activity [ciec2] (Max 25)</option>
        </optgroup>
      `;

      const marksRowsHTML = classStudents.map((st, idx) => {
        const sMarks = window.getStudentMarks(st.roll);
        const storedScore = window.facultyMarksDB[marksStoreKey] ? window.facultyMarksDB[marksStoreKey][st.roll] : undefined;
        const defaultScore = storedScore !== undefined ? storedScore : (sMarks[cieKey] !== undefined ? sMarks[cieKey] : 22);
        
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

        // 1. STUDENT DETAILS TAB (Info + Academic Performance Record)
    if (activeTab === 'details') {
      const marks = window.getStudentMarks(studentUser.roll);
      const mid1Avg = ((marks.ciea1 + marks.cieb1 + marks.ciec1) / 3).toFixed(1);
      const mid2Avg = ((marks.ciea2 + marks.cieb2 + marks.ciec2) / 3).toFixed(1);
      const overallCie = ((parseFloat(mid1Avg) + parseFloat(mid2Avg)) / 2).toFixed(1);

      tabContentHTML = `
        <div class="erp-section-title">STUDENT PROFILE &amp; PERFORMANCE</div>

        <!-- 1. STUDENT INFO / BIO-DATA -->
        <div class="erp-accordion-item" style="border:1px solid #c8e4cf; border-radius:6px; margin-bottom:14px; overflow:hidden;">
          <div class="erp-accordion-header" style="background:#08752f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>👤</span> BIO-DATA &amp; STUDENT INFORMATION
            </span>
            <span style="font-size:11px; opacity:0.9;">Comprehensive Student Profile</span>
          </div>
          <div class="erp-accordion-body" style="display:block; padding:16px; background:#ffffff;">
            <div style="font-size:12px; font-weight:700; color:#166534; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
              Comprehensive Student Profile • Autonomous R22 Regulations
            </div>
            <div class="erp-profile-grid">
              <div><span class="lbl">Student Name:</span> <strong>${studentUser.name}</strong></div>
              <div><span class="lbl">Hall Ticket / Roll No:</span> <strong style="color:#08752f;">${studentUser.roll}</strong></div>
              <div><span class="lbl">Enrolment Program:</span> <strong>${studentUser.branch}</strong></div>
              <div><span class="lbl">Academic Standing:</span> <strong>${studentUser.yearSem}</strong></div>
              <div><span class="lbl">Assigned Section:</span> <strong>${studentUser.section}</strong></div>
              <div><span class="lbl">Counselling Code:</span> <strong>HITM (Autonomous)</strong></div>
              <div><span class="lbl">Date of Birth:</span> <strong>14-Aug-2005</strong></div>
              <div><span class="lbl">Gender:</span> <strong>Male</strong></div>
              <div><span class="lbl">Blood Group:</span> <strong>O+ve</strong></div>
              <div><span class="lbl">Mobile Number:</span> <strong>${studentUser.contact}</strong></div>
              <div><span class="lbl">Institutional Email:</span> <strong>${studentUser.roll.toLowerCase()}@hitam.org</strong></div>
              <div><span class="lbl">Assigned Faculty Mentor:</span> <strong>${studentUser.mentor}</strong></div>
              <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
              <div><span class="lbl">Examination Status:</span> <strong style="color:#15803d;">Verified (Autonomous Center)</strong></div>
              <div><span class="lbl">Cumulative CGPA:</span> <strong style="color:#08752f;">${studentUser.cgpa}</strong></div>
              <div><span class="lbl">Attendance Record:</span> <strong>${studentUser.attendance}</strong></div>
              <div><span class="lbl">Active Backlogs:</span> <strong>${studentUser.backlogs}</strong></div>
              <div><span class="lbl">Fee Clearance:</span> <strong>${studentUser.feeDue}</strong></div>
            </div>
          </div>
        </div>

        <!-- 2. ACADEMIC PERFORMANCE (LIVE CIE EVALUATION & SEMESTER RECORDS) -->
        <div class="erp-accordion-item" style="border:1px solid #c8e4cf; border-radius:6px; margin-bottom:16px; overflow:hidden;">
          <div class="erp-accordion-header" style="background:#013b1f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
              <span>📊</span> ACADEMIC PERFORMANCE SUMMARY &amp; CIE EVALUATION
            </span>
            <span style="font-size:11px; opacity:0.9;">Real-Time Faculty Sync</span>
          </div>
          <div class="erp-accordion-body" style="display:block; padding:16px; background:#fafffa;">
            <!-- Key Standing Pills -->
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; text-align:center; margin-bottom:14px;">
              <div class="erp-kpi-pill"><span class="val">8.84</span><span class="lbl">Current SGPA</span></div>
              <div class="erp-kpi-pill"><span class="val" style="color:#08752f;">${studentUser.cgpa.slice(0,4)}</span><span class="lbl">Cumulative CGPA</span></div>
              <div class="erp-kpi-pill"><span class="val">128 / 160</span><span class="lbl">Credits Earned</span></div>
              <div class="erp-kpi-pill"><span class="val" style="color:#15803d;">89.4%</span><span class="lbl">Attendance</span></div>
            </div>

            <!-- Live CIE Internal Marks Sync Box -->
            <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:12px; margin-bottom:12px;">
              <div style="font-weight:700; font-size:12.5px; color:#166534; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>🎯 Continuous Internal Evaluation (CIE) Marks — Live Faculty Roster</span>
                <span style="color:#08752f; font-weight:800;">CIE Average: ${overallCie} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px 10px;">
                  <strong style="color:#166534; font-size:12px; display:block; margin-bottom:4px;">Mid-Semester 1 (Average: ${mid1Avg}/25):</strong>
                  <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#334155;">
                    <span>ciea1: <b>${marks.ciea1}/25</b></span>
                    <span>cieb1: <b>${marks.cieb1}/25</b></span>
                    <span>ciec1: <b>${marks.ciec1}/25</b></span>
                  </div>
                </div>
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:8px 10px;">
                  <strong style="color:#166534; font-size:12px; display:block; margin-bottom:4px;">Mid-Semester 2 (Average: ${mid2Avg}/25):</strong>
                  <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#334155;">
                    <span>ciea2: <b>${marks.ciea2}/25</b></span>
                    <span>cieb2: <b>${marks.cieb2}/25</b></span>
                    <span>ciec2: <b>${marks.ciec2}/25</b></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Semester History Table -->
            <div style="font-size:12px; font-weight:700; color:#1e293b; margin:10px 0 6px 0;">Past Semester Results History:</div>
            <table class="ht-table" style="width:100%; font-size:11.5px;">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Year &amp; Session</th>
                  <th>Credits Registered</th>
                  <th>Credits Passed</th>
                  <th>SGPA</th>
                  <th>Result Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Semester I</td><td>2023-24 (Odd)</td><td>20</td><td>20</td><td>8.75</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester II</td><td>2023-24 (Even)</td><td>20</td><td>20</td><td>8.80</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester III</td><td>2024-25 (Odd)</td><td>22</td><td>22</td><td>8.90</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester IV</td><td>2024-25 (Even)</td><td>22</td><td>22</td><td>8.85</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester V</td><td>2025-26 (Odd)</td><td>22</td><td>22</td><td>8.80</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
                <tr><td>Semester VI</td><td>2025-26 (Even)</td><td>22</td><td>22</td><td>8.84</td><td><span style="color:#15803d; font-weight:700;">PASSED FIRST CLASS</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="erp-btn-row">
          <button type="button" class="erp-btn" onclick="window.print()">Print</button>
          <button type="button" class="erp-btn" onclick="showDemoNotice('Exporting Student Profile record to CSV/PDF format...')">Export</button>
          <button type="button" class="erp-btn" style="background:#0f5132;" onclick="studentShowHallTicket('${studentUser.roll}')">🎟️ View Autonomous Hall Ticket →</button>
          <button type="button" class="erp-btn" style="background:#334155;" onclick="studentApplyBonafide('${studentUser.roll}')">📄 Request Bonafide Guidelines</button>
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

    // 5. MARKS TAB (Live Synchronized Mid-1 & Mid-2 CIE Evaluations)
    else if (activeTab === 'marks') {
      const marks = window.getStudentMarks(studentUser.roll);
      const mid1Avg = ((marks.ciea1 + marks.cieb1 + marks.ciec1) / 3).toFixed(1);
      const mid2Avg = ((marks.ciea2 + marks.cieb2 + marks.ciec2) / 3).toFixed(1);
      const overallCie = ((parseFloat(mid1Avg) + parseFloat(mid2Avg)) / 2).toFixed(1);

      const marksRowsHTML = studentUser.subjects.map((s, idx) => {
        const delta = (idx % 3) - 1;
        const subCiea1 = Math.min(25, Math.max(0, marks.ciea1 + delta));
        const subCieb1 = Math.min(25, Math.max(0, marks.cieb1 + delta));
        const subCiec1 = Math.min(25, Math.max(0, marks.ciec1 + delta));
        const subMid1 = ((subCiea1 + subCieb1 + subCiec1) / 3).toFixed(1);

        const subCiea2 = Math.min(25, Math.max(0, marks.ciea2 + delta));
        const subCieb2 = Math.min(25, Math.max(0, marks.cieb2 + delta));
        const subCiec2 = Math.min(25, Math.max(0, marks.ciec2 + delta));
        const subMid2 = ((subCiea2 + subCieb2 + subCiec2) / 3).toFixed(1);

        const subOverall = ((parseFloat(subMid1) + parseFloat(subMid2)) / 2).toFixed(1);
        const gradeStr = subOverall >= 23 ? 'O (Outstanding)' : (subOverall >= 20 ? 'A+ (Excellent)' : 'A (Very Good)');

        return `
          <tr>
            <td><strong>${s.code}</strong></td>
            <td>${s.name}</td>
            <td>${subCiea1}</td>
            <td>${subCieb1}</td>
            <td>${subCiec1}</td>
            <td><strong style="color:#08752f;">${subMid1}</strong></td>
            <td>${subCiea2}</td>
            <td>${subCieb2}</td>
            <td>${subCiec2}</td>
            <td><strong style="color:#08752f;">${subMid2}</strong></td>
            <td><strong style="color:#013b1f; font-size:13px;">${subOverall} / 25</strong></td>
            <td>${s.credits}</td>
            <td><span style="font-size:11px; font-weight:700; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px;">${gradeStr}</span></td>
          </tr>
        `;
      }).join('');

      tabContentHTML = `
        <div class="portal-card-box">
          <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
            <span>📝</span> Continuous Internal Evaluation (CIE) Marks &amp; GPA Summary
          </h4>
          <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
            Live faculty evaluation sync: Mid-1 (ciea1, cieb1, ciec1) and Mid-2 (ciea2, cieb2, ciec2).
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-weight:700; color:#166534; font-size:13px; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>Mid-Semester 1 Internal Evaluation</span>
                <span style="color:#08752f;">Average: ${mid1Avg} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center;">
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciea1 (Exam)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.ciea1} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">cieb1 (Assignment)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.cieb1} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciec1 (Quiz / Viva)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.ciec1} / 25</strong>
                </div>
              </div>
            </div>

            <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:12px;">
              <div style="font-weight:700; color:#166534; font-size:13px; margin-bottom:8px; display:flex; justify-content:space-between;">
                <span>Mid-Semester 2 Internal Evaluation</span>
                <span style="color:#08752f;">Average: ${mid2Avg} / 25</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center;">
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciea2 (Exam)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.ciea2} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">cieb2 (Assignment)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.cieb2} / 25</strong>
                </div>
                <div style="background:#fff; border:1px solid #bbf7d0; border-radius:4px; padding:6px;">
                  <span style="font-size:11px; color:#64748b; display:block;">ciec2 (Quiz / Viva)</span>
                  <strong style="color:#0f172a; font-size:15px;">${marks.ciec2} / 25</strong>
                </div>
              </div>
            </div>
          </div>

          <div style="overflow-x:auto;">
            <table class="portal-data-table" style="font-size:11.5px;">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>ciea1</th>
                  <th>cieb1</th>
                  <th>ciec1</th>
                  <th>Mid-1</th>
                  <th>ciea2</th>
                  <th>cieb2</th>
                  <th>ciec2</th>
                  <th>Mid-2</th>
                  <th>CIE Total</th>
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

    // Render Full Student Portal View with HITAM ERP Reference Architecture
    const displayName = studentUser.name || 'STUDENT';

    body.innerHTML = `
      <div class="hitam-erp-wrap">
        <!-- 1. TOP GREEN BRAND HEADER (Matching Screenshot Reference) -->
        <div class="hitam-erp-header">
          <div class="hitam-erp-brand">
            <img src="assets/hitam-logo.png" alt="HITAM" class="hitam-erp-logo">
            <div class="hitam-erp-title-block">
              <div class="hitam-erp-counselling-code">
                <span>Counselling Code : <strong>HITM</strong></span>
                <span>Estd: 2001</span>
              </div>
              <div class="hitam-erp-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT</div>
              <div class="hitam-erp-accreditation">Accredited by NAAC, Affiliated to JNTUH, Approved by AICTE</div>
            </div>
          </div>
          <div class="hitam-erp-user-badge" style="background:#e8f5ec; color:#0b4f26; font-size:12px; font-weight:700; padding:8px 14px; border-radius:6px; border:1px solid #bbf7d0; display:flex; align-items:center; gap:6px;">
            <span>🎓</span> Autonomous Student
          </div>
        </div>

        <!-- 2. ANNOUNCEMENT TICKER (Matching Screenshot Reference) -->
        <div class="hitam-erp-marquee">
          <span>Welcome to 4th Day FDP on "Emerging Trends in AI &amp; Machine Learning" • Autonomous End-Semester Regular / Supplementary Registration Open • Hall Tickets Available for Download</span>
        </div>

        <!-- 3. GREEN USER ACTION BAR (Matching Screenshot Reference) -->
        <div class="hitam-erp-userbar">
          <div class="erp-user-greeting">Hi...${(studentUser.roll === '23E51A6619' && !(window.userCredentialStore && window.userCredentialStore[studentUser.roll] && window.userCredentialStore[studentUser.roll].alias)) ? 'BHUKYA VISHNU' : displayName}</div>
          <div class="erp-user-actions">
            <button type="button" class="erp-action-link" onclick="studentSwitchTab('credentials', '${studentUser.roll}')">Change Password</button>
            <span class="erp-separator">|</span>
            <button type="button" class="erp-action-link" onclick="openModal('student-portal')">Logout</button>
          </div>
        </div>

        <!-- 4. TOP QUICK NAV SHORTCUT TABS (Ensures full accessibility & test compliance) -->
        <div class="portal-nav-tabs" style="margin: 8px 12px 0 12px; border-bottom: none;">
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

        <!-- 5. TWO-COLUMN ERP MAIN BODY (Matching Screenshot Reference) -->
        <div class="hitam-erp-body">
          <!-- LEFT COLUMN: MENU SIDEBAR -->
          <aside class="hitam-erp-sidebar">
            <div class="erp-menu-header">MENU</div>
            <ul class="erp-menu-list">
              <li class="${activeTab === 'details' ? 'active' : ''}" onclick="studentSwitchTab('details', '${studentUser.roll}')"><span class="erp-menu-icon">👤</span> PROFILE DETAILS</li>
              <li class="${activeTab === 'attendance' ? 'active' : ''}" onclick="studentSwitchTab('attendance', '${studentUser.roll}')"><span class="erp-menu-icon">📊</span> ATTENDANCE</li>
              <li class="${activeTab === 'timetable' ? 'active' : ''}" onclick="studentSwitchTab('timetable', '${studentUser.roll}')"><span class="erp-menu-icon">🗓️</span> TIME TABLE</li>
              <li class="${activeTab === 'fees' ? 'active' : ''}" onclick="studentSwitchTab('fees', '${studentUser.roll}')"><span class="erp-menu-icon">💰</span> FEE DETAILS</li>
              <li class="${activeTab === 'marks' ? 'active' : ''}" onclick="studentSwitchTab('marks', '${studentUser.roll}')"><span class="erp-menu-icon">📝</span> MARKS (CIE)</li>
              <li class="${activeTab === 'feedback' ? 'active' : ''}" onclick="studentSwitchTab('feedback', '${studentUser.roll}')"><span class="erp-menu-icon">⭐</span> FEEDBACK</li>
              <li class="${activeTab === 'complaints' ? 'active' : ''}" onclick="studentSwitchTab('complaints', '${studentUser.roll}')"><span class="erp-menu-icon">📢</span> COMPLAINTS</li>
              <li class="${activeTab === 'credentials' ? 'active' : ''}" onclick="studentSwitchTab('credentials', '${studentUser.roll}')"><span class="erp-menu-icon">🔐</span> PASSWORD CHANGE</li>
            </ul>
          </aside>

          <!-- RIGHT COLUMN: CONTENT PANE -->
          <main class="hitam-erp-content">
            <div id="studentTabContainer">
              ${tabContentHTML}
            </div>
          </main>
        </div>

        <div id="modalToastSlot"></div>
      </div>
    `;
    return;
  }
};
/* ==========================================================================
   14. AUTONOMOUS EXAMINATION PORTAL (EXAM PORTAL)
   Includes:
   - 1. Notices About Important Dates & Examination Circulars
   - 2. Semester Results & Autonomous Grade Memos (SGPA/CGPA)
   - 3. Hall Ticket Download (Admit Card with Timetable & Barcode)
   - 4. Exam Fee Payment & Challan Receipts
   - 5. Internal Marks (Continuous Evaluation, Final Internal Marks & Percentage)
   ========================================================================== */

window.activeExamPortalTab = 'notices';

// Internal Marks & Final Percentage Calculator with live faculty sync
window.getStudentInternalMarksBreakdown = function(studentUser) {
  const roll = studentUser.roll;
  const marks = window.getStudentMarks ? window.getStudentMarks(roll) : {
    ciea1: 18, cieb1: 17, ciec1: 19,
    ciea2: 19, cieb2: 18, ciec2: 19
  };

  // Convert raw test/assignment/quiz inputs to 20-mark scaled Mid-1 and Mid-2
  const mid1Val1 = Math.min(20, parseFloat((((marks.ciea1 * 0.6) + (marks.cieb1 * 0.25) + (marks.ciec1 * 0.15))).toFixed(1)));
  const mid2Val1 = Math.min(20, parseFloat((((marks.ciea2 * 0.6) + (marks.cieb2 * 0.25) + (marks.ciec2 * 0.15))).toFixed(1)));
  const finalCie1 = parseFloat((mid1Val1 + mid2Val1).toFixed(1));
  const pct1 = ((finalCie1 / 40) * 100).toFixed(1);

  const mid1Val2 = 18.0;
  const mid2Val2 = 18.0;
  const finalCie2 = parseFloat((mid1Val2 + mid2Val2).toFixed(1));
  const pct2 = ((finalCie2 / 40) * 100).toFixed(1);

  const mid1Val3 = 19.0;
  const mid2Val3 = 19.0;
  const finalCie3 = parseFloat((mid1Val3 + mid2Val3).toFixed(1));
  const pct3 = ((finalCie3 / 40) * 100).toFixed(1);

  const mid1Val4 = 17.5;
  const mid2Val4 = 17.5;
  const finalCie4 = parseFloat((mid1Val4 + mid2Val4).toFixed(1));
  const pct4 = ((finalCie4 / 40) * 100).toFixed(1);

  const mid1Val5 = 18.0;
  const mid2Val5 = 18.5;
  const finalCie5 = parseFloat((mid1Val5 + mid2Val5).toFixed(1));
  const pct5 = ((finalCie5 / 40) * 100).toFixed(1);

  return [
    {
      code: '22AI501PC',
      title: 'Machine Learning Techniques',
      type: 'Core Theory',
      mid1: mid1Val1.toFixed(1),
      mid2: mid2Val1.toFixed(1),
      finalInternal: finalCie1.toFixed(1),
      maxInternal: 40,
      percentage: pct1 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22AI502PC',
      title: 'Deep Learning & Neural Networks',
      type: 'Core Theory',
      mid1: mid1Val2.toFixed(1),
      mid2: mid2Val2.toFixed(1),
      finalInternal: finalCie2.toFixed(1),
      maxInternal: 40,
      percentage: pct2 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS503PC',
      title: 'Computer Networks & Internet Protocols',
      type: 'Core Theory',
      mid1: mid1Val3.toFixed(1),
      mid2: mid2Val3.toFixed(1),
      finalInternal: finalCie3.toFixed(1),
      maxInternal: 40,
      percentage: pct3 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS504PC',
      title: 'Automata Theory & Compiler Design',
      type: 'Core Theory',
      mid1: mid1Val4.toFixed(1),
      mid2: mid2Val4.toFixed(1),
      finalInternal: finalCie4.toFixed(1),
      maxInternal: 40,
      percentage: pct4 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS505PE',
      title: 'Cloud Computing & Distributed Systems',
      type: 'Professional Elective',
      mid1: mid1Val5.toFixed(1),
      mid2: mid2Val5.toFixed(1),
      finalInternal: finalCie5.toFixed(1),
      maxInternal: 40,
      percentage: pct5 + '%',
      status: 'ELIGIBLE'
    },
    {
      code: '22AI506PC',
      title: 'Machine Learning Laboratory',
      type: 'Practical Lab',
      mid1: '19.5',
      mid2: '19.5',
      finalInternal: '39.0',
      maxInternal: 40,
      percentage: '97.5%',
      status: 'ELIGIBLE'
    },
    {
      code: '22CS507PC',
      title: 'Computer Networks Laboratory',
      type: 'Practical Lab',
      mid1: '19.0',
      mid2: '19.5',
      finalInternal: '38.5',
      maxInternal: 40,
      percentage: '96.3%',
      status: 'ELIGIBLE'
    }
  ];
};

window.getSemesterResults = function(studentUser, semNum = 5, isConsolidated = false) {
  const deptKey = studentUser.deptKey || 'CSM';
  const roll = studentUser.roll;
  
  // Retrieve live faculty CIE marks if available
  const liveMarks = window.getStudentMarks ? window.getStudentMarks(roll) : {
    ciea1: 18, cieb1: 17, ciec1: 19,
    ciea2: 19, cieb2: 18, ciec2: 19
  };

  const mid1Score1 = Math.round((liveMarks.ciea1 + liveMarks.ciea2) || 37);
  const mid1Score2 = Math.round((liveMarks.cieb1 + liveMarks.cieb2) || 36);
  const mid1Score3 = Math.round((liveMarks.ciec1 + liveMarks.ciec2) || 38);

  const semSubjectDB = {
    1: [
      { code: '22MA101BS', title: 'Matrices and Calculus', type: 'Professional Core (Theory)', cie: 36, see: 52, credits: 4.0 },
      { code: '22PH102BS', title: 'Applied Physics', type: 'Basic Science (Theory)', cie: 37, see: 50, credits: 4.0 },
      { code: '22CS103ES', title: 'Programming for Problem Solving (C)', type: 'Engineering Science (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22EN104HS', title: 'English for Skill Enhancement', type: 'Humanities & Social Sciences', cie: 38, see: 52, credits: 2.0 },
      { code: '22PH105BS', title: 'Applied Physics Laboratory', type: 'Basic Science (Lab)', cie: 38, see: 54, credits: 1.5 },
      { code: '22CS106ES', title: 'Programming for Problem Solving Lab', type: 'Engineering Science (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22ME107ES', title: 'Engineering Workshop Practice', type: 'Engineering Science (Lab)', cie: 38, see: 53, credits: 2.5 },
      { code: '22EN108HS', title: 'English Language & Communication Lab', type: 'Humanities (Lab)', cie: 39, see: 54, credits: 1.0 }
    ],
    2: [
      { code: '22MA201BS', title: 'Ordinary Differential Equations & Vector Calculus', type: 'Basic Science (Theory)', cie: 37, see: 51, credits: 4.0 },
      { code: '22CH202BS', title: 'Engineering Chemistry', type: 'Basic Science (Theory)', cie: 36, see: 49, credits: 4.0 },
      { code: '22CS203PC', title: 'Data Structures and Algorithms', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22EE204ES', title: 'Basic Electrical & Electronics Engineering', type: 'Engineering Science (Theory)', cie: 37, see: 50, credits: 3.0 },
      { code: '22ME205ES', title: 'Computer Aided Engineering Graphics', type: 'Engineering Science (Lab)', cie: 38, see: 54, credits: 3.0 },
      { code: '22CS206PC', title: 'Data Structures Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22CH207BS', title: 'Engineering Chemistry Laboratory', type: 'Basic Science (Lab)', cie: 38, see: 53, credits: 1.5 }
    ],
    3: [
      { code: '22CS301PC', title: 'Mathematical and Statistical Foundations', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22CS302PC', title: 'Computer Organization & Architecture', type: 'Professional Core (Theory)', cie: 37, see: 52, credits: 3.0 },
      { code: '22CS303PC', title: 'Object Oriented Programming through Java', type: 'Professional Core (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22CS304PC', title: 'Database Management Systems', type: 'Professional Core (Theory)', cie: 38, see: 54, credits: 3.0 },
      { code: '22EC305ES', title: 'Digital Logic Design & Microprocessors', type: 'Engineering Science (Theory)', cie: 36, see: 50, credits: 3.0 },
      { code: '22CS306PC', title: 'Java Programming Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22CS307PC', title: 'Database Management Systems Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22MC308GS', title: 'Gender Sensitization Laboratory', type: 'Mandatory Non-Credit Audit', cie: 38, see: 52, credits: 0.0 }
    ],
    4: [
      { code: '22CS401PC', title: 'Design and Analysis of Algorithms', type: 'Professional Core (Theory)', cie: 37, see: 51, credits: 3.0 },
      { code: '22CS402PC', title: 'Operating Systems & System Architecture', type: 'Professional Core (Theory)', cie: 38, see: 53, credits: 3.0 },
      { code: '22CS403PC', title: 'Software Engineering & Agile Methodologies', type: 'Professional Core (Theory)', cie: 38, see: 52, credits: 3.0 },
      { code: '22AI404PC', title: 'Artificial Intelligence Foundations', type: 'Professional Core (Theory)', cie: 39, see: 55, credits: 3.0 },
      { code: '22CS405PC', title: 'Python for Machine Learning', type: 'Professional Core (Theory)', cie: 39, see: 54, credits: 3.0 },
      { code: '22CS406PC', title: 'Operating Systems & Linux Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22AI407PC', title: 'AI & Problem Solving Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22MC408ES', title: 'Constitution of India', type: 'Mandatory Non-Credit Audit', cie: 38, see: 50, credits: 0.0 }
    ],
    5: [
      { code: '22AI501PC', title: 'Machine Learning Techniques', type: 'Professional Core (Theory)', cie: mid1Score1, see: 54, credits: 3.0 },
      { code: '22AI502PC', title: 'Deep Learning & Neural Networks', type: 'Professional Core (Theory)', cie: mid1Score2, see: 52, credits: 3.0 },
      { code: '22CS503PC', title: 'Computer Networks & Internet Protocols', type: 'Professional Core (Theory)', cie: mid1Score3, see: 53, credits: 3.0 },
      { code: '22CS504PC', title: 'Automata Theory & Compiler Design', type: 'Professional Core (Theory)', cie: 37, see: 51, credits: 3.0 },
      { code: '22CS505PE', title: 'Cloud Computing & Distributed Platforms', type: 'Professional Elective - I', cie: 38, see: 54, credits: 3.0 },
      { code: '22AI506PC', title: 'Machine Learning Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 56, credits: 1.5 },
      { code: '22CS507PC', title: 'Computer Networks Laboratory', type: 'Professional Core (Lab)', cie: 39, see: 55, credits: 1.5 },
      { code: '22MC508IP', title: 'Intellectual Property Rights & Ethics', type: 'Mandatory Non-Credit Audit', cie: 38, see: 52, credits: 0.0 }
    ]
  };

  const rawSubjects = semSubjectDB[semNum] || semSubjectDB[5];

  let totalGradePoints = 0;
  let totalCredits = 0;

  const subjects = rawSubjects.map(s => {
    const total = s.cie + s.see;
    let grade = 'O';
    let pts = 10;
    if (total < 90 && total >= 80) { grade = 'A+'; pts = 9; }
    else if (total < 80 && total >= 70) { grade = 'A'; pts = 8; }
    else if (total < 70 && total >= 60) { grade = 'B+'; pts = 7; }
    else if (total < 60 && total >= 50) { grade = 'B'; pts = 6; }
    else if (total < 50 && total >= 40) { grade = 'C'; pts = 5; }
    else if (total < 40) { grade = 'F'; pts = 0; }

    if (s.credits > 0) {
      totalGradePoints += pts * s.credits;
      totalCredits += s.credits;
    }

    return {
      code: s.code,
      title: s.title,
      type: s.type,
      cie: s.cie,
      see: s.see,
      total: total,
      grade: grade,
      gradePoints: pts,
      credits: s.credits.toFixed(1),
      result: (total >= 40 && s.see >= 21) ? 'PASS' : 'FAIL'
    };
  });

  const sgpa = (totalGradePoints / totalCredits).toFixed(2);
  const examSessions = {
    1: 'NOV / DEC 2023 (Regular Autonomous)',
    2: 'APR / MAY 2024 (Regular Autonomous)',
    3: 'NOV / DEC 2024 (Regular Autonomous)',
    4: 'APR / MAY 2025 (Regular Autonomous)',
    5: 'NOV / DEC 2025 (Regular Autonomous)'
  };

  return {
    sem: semNum,
    examSession: examSessions[semNum] || 'CURRENT AUTONOMOUS SESSION',
    sgpa: sgpa,
    cgpa: '8.82',
    totalCredits: totalCredits.toFixed(1),
    subjects: subjects,
    issueDate: '24-OCT-2026',
    memoRef: `HITM/AUTON/RES/${roll}/SEM-${semNum}`,
    semesters: [
      { sem: 1, period: 'Nov/Dec 2023', credits: '20.0', sgpa: '8.85' },
      { sem: 2, period: 'Apr/May 2024', credits: '20.0', sgpa: '8.80' },
      { sem: 3, period: 'Nov/Dec 2024', credits: '21.0', sgpa: '8.90' },
      { sem: 4, period: 'Apr/May 2025', credits: '21.0', sgpa: '8.75' },
      { sem: 5, period: 'Nov/Dec 2025', credits: '21.0', sgpa: sgpa }
    ]
  };
};

window.renderExamPortalDashboard = function(studentUser, activeTab = 'notices', selectedSem = 5) {
  const roll = studentUser.roll;
  window.activeExamPortalTab = activeTab;

  let activeTabContentHTML = '';

  // 1. TAB: NOTICES ABOUT IMPORTANT DATES
  if (activeTab === 'notices') {
    activeTabContentHTML = `
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>📢</span> NOTICES &amp; IMPORTANT EXAMINATION DATES
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Key academic dates, registration windows, and circulars issued by the Autonomous Examination Branch.
        </p>

        <!-- Milestones Schedule Table -->
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; overflow:hidden; margin-bottom:16px;">
          <div style="background:#08752f; color:#ffffff; padding:10px 14px; font-weight:700; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
            <span>🗓️ Autonomous Examination Milestones (Odd Semester 2026–2027)</span>
            <span style="font-size:11px; opacity:0.9;">Regulation: R22 Autonomous</span>
          </div>
          <table class="sem-memo-table" style="margin:0;">
            <thead>
              <tr>
                <th style="width:40px; text-align:center;">#</th>
                <th>Examination Event / Milestone</th>
                <th style="width:200px;">Scheduled Dates</th>
                <th style="width:130px; text-align:center;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align:center;">1</td>
                <td><strong>Examination Notification Issued</strong><br><span style="font-size:11px; color:#64748b;">Autonomous Semester End Examinations (SEE)</span></td>
                <td><strong>10-OCT-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge pass">COMPLETED</span></td>
              </tr>
              <tr style="background:#f0fdf4;">
                <td style="text-align:center;">2</td>
                <td><strong>Online Exam Fee Payment (Without Fine)</strong><br><span style="font-size:11px; color:#15803d;">Regular fee payment window for eligible candidates</span></td>
                <td><strong style="color:#15803d;">15-OCT-2026 to 02-NOV-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#0284c7; color:#fff;">ACTIVE NOW</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">3</td>
                <td><strong>Exam Fee Payment (With ₹100 Late Fee)</strong><br><span style="font-size:11px; color:#64748b;">Late registration for all branches</span></td>
                <td>03-NOV-2026 to 08-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#f59e0b; color:#fff;">UPCOMING</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">4</td>
                <td><strong>Exam Fee Payment (With ₹1,000 Super Late Fine)</strong><br><span style="font-size:11px; color:#64748b;">Final registration window</span></td>
                <td>09-NOV-2026 to 12-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">UPCOMING</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">5</td>
                <td><strong>Hall Ticket Download Portal Active</strong><br><span style="font-size:11px; color:#64748b;">Download admit card with room &amp; seat allotment</span></td>
                <td><strong>10-NOV-2026 onwards</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge pass">GENERATED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">6</td>
                <td><strong>Laboratory &amp; Practical Viva Examinations</strong><br><span style="font-size:11px; color:#64748b;">Internal &amp; external examiner assessments</span></td>
                <td>14-NOV-2026 to 21-NOV-2026</td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">7</td>
                <td><strong>Semester End Theory Examinations (SEE)</strong><br><span style="font-size:11px; color:#64748b;">Forenoon Session: 10:00 AM – 1:00 PM</span></td>
                <td><strong>24-NOV-2026 to 12-DEC-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
              <tr>
                <td style="text-align:center;">8</td>
                <td><strong>Provisional Results Declaration</strong><br><span style="font-size:11px; color:#64748b;">Grade memos &amp; SGPA ledger publication</span></td>
                <td><strong>28-DEC-2026</strong></td>
                <td style="text-align:center;"><span class="memo-status-badge" style="background:#64748b; color:#fff;">SCHEDULED</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Examination Circulars Grid -->
        <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <span>📜</span> Examination Branch Circulars &amp; Directives
        </div>
        <div class="modal-grid-features" style="margin-bottom:16px;">
          <div class="modal-feature-card">
            <strong>Circular #2026/08 — Odd Semester SEE Notification</strong>
            <span>Detailed regulation guidelines for B.Tech II, III, and IV Years regular and supplementary examination sessions.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Notification Circular #2026/08 downloaded.')">📄 View Circular</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/09 — Continuous Evaluation (CIE-2) Schedule</strong>
            <span>Faculty submission deadlines for Mid-2 exam, assignment, and quiz marks into autonomous database.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('CIE-2 assessment schedule verified.')">📄 View Schedule</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/07 — Digital Barcoded Evaluation Guidelines</strong>
            <span>Mandatory instructions regarding 32-page barcoded answer books and digital evaluation protocols.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-secondary" style="padding:4px 8px; font-size:11px;" onclick="showDemoNotice('Barcoded answer booklet instructions previewed.')">📄 View Guidelines</button>
            </div>
          </div>
          <div class="modal-feature-card">
            <strong>Circular #2026/06 — Fee Payment &amp; Challan Procedure</strong>
            <span>Step-by-step guidance for seamless net banking, UPI, and debit card exam fee payments.</span>
            <div style="margin-top:6px;">
              <button class="drill-action-btn drill-action-primary" style="padding:4px 8px; font-size:11px;" onclick="examPortalSwitchTab('${roll}', 'feepayment')">Proceed to Fee Payment →</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. TAB: RESULTS (SEMESTER RESULTS & GRADE MEMO)
  else if (activeTab === 'results') {
    const semNum = parseInt(selectedSem, 10);
    const isConsolidated = selectedSem === 'consolidated' || selectedSem === 'all';
    const semResultData = window.getSemesterResults(studentUser, isNaN(semNum) ? 5 : semNum, isConsolidated);

    const semButtonsHTML = [1, 2, 3, 4, 5].map(s => `
      <button class="sem-selector-pill ${(!isConsolidated && semNum === s) ? 'active' : ''}" 
              onclick="authenticateExamPortal('${roll}', 'results', ${s})">
        Semester ${s}
      </button>
    `).join('') + `
      <button class="sem-selector-pill ${(isConsolidated) ? 'active' : ''}" 
              onclick="authenticateExamPortal('${roll}', 'results', 'consolidated')">
        📊 Consolidated Memo
      </button>
    `;

    let tableRowsHTML = '';
    if (isConsolidated) {
      tableRowsHTML = semResultData.semesters.map((s, idx) => `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td><strong>Semester ${s.sem}</strong> (${s.period})</td>
          <td style="text-align:center;">${s.credits}</td>
          <td style="text-align:center;">${s.credits}</td>
          <td style="text-align:center; font-weight:700; color:#08752f;">${s.sgpa}</td>
          <td style="text-align:center;"><span class="memo-status-badge pass">PASS</span></td>
          <td style="text-align:center;">
            <button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="authenticateExamPortal('${roll}', 'results', ${s.sem})">View Memo →</button>
          </td>
        </tr>
      `).join('');
    } else {
      tableRowsHTML = semResultData.subjects.map((sub, idx) => `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td><strong style="color:#0f172a;">${sub.code}</strong></td>
          <td>
            <div style="font-weight:600; color:#1e293b;">${sub.title}</div>
            <span style="font-size:11px; color:#64748b;">${sub.type}</span>
          </td>
          <td style="text-align:center; font-weight:600;">${sub.cie} / 40</td>
          <td style="text-align:center; font-weight:600;">${sub.see} / 60</td>
          <td style="text-align:center; font-weight:700; color:#0f172a;">${sub.total} / 100</td>
          <td style="text-align:center;"><span class="grade-pill grade-${sub.grade}">${sub.grade}</span></td>
          <td style="text-align:center; font-weight:700;">${sub.gradePoints}</td>
          <td style="text-align:center; font-weight:600;">${sub.credits}</td>
          <td style="text-align:center;"><span class="memo-status-badge ${sub.result.toLowerCase()}">${sub.result}</span></td>
        </tr>
      `).join('');
    }

    activeTabContentHTML = `
      <div class="sem-result-memo-sheet">
        <div class="sem-memo-header">
          <div class="sem-memo-logo-row">
            <div class="sem-memo-crest">HITM</div>
            <div>
              <div class="sem-memo-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
              <div class="sem-memo-college-sub">An Autonomous Institution Conferred by UGC • Approved by AICTE • Accredited with 'A+' Grade by NAAC</div>
              <div class="sem-memo-branch-title">OFFICE OF THE CONTROLLER OF EXAMINATIONS</div>
            </div>
          </div>
          <div class="sem-memo-badge-line">
            <span>PROVISIONAL SEMESTER GRADE MEMORANDUM</span>
            <span class="regulation-tag">REGULATION: AUTONOMOUS R22</span>
          </div>
        </div>

        <div class="sem-memo-meta-grid">
          <div><span class="lbl">Student Name:</span> <strong>${studentUser.name}</strong></div>
          <div><span class="lbl">Hall Ticket / Roll No:</span> <strong style="color:#08752f; font-size:13.5px;">${studentUser.roll}</strong></div>
          <div><span class="lbl">Degree &amp; Program:</span> <strong>${studentUser.branch}</strong></div>
          <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
          <div><span class="lbl">Academic Standing:</span> <strong>${studentUser.yearSem}</strong></div>
          <div><span class="lbl">Examination Session:</span> <strong>${semResultData.examSession}</strong></div>
          <div><span class="lbl">Examination Center:</span> <strong>HITAM Autonomous Center (Code: HITM)</strong></div>
          <div><span class="lbl">Result Standing:</span> <strong style="color:#15803d;">PASSED IN FIRST CLASS WITH DISTINCTION</strong></div>
        </div>

        <div class="sem-selector-nav">
          <span style="font-size:12px; font-weight:700; color:#334155; margin-right:4px;">Select Examination:</span>
          ${semButtonsHTML}
        </div>

        <div style="overflow-x:auto; margin-top:12px;">
          ${isConsolidated ? `
            <table class="sem-memo-table">
              <thead>
                <tr>
                  <th style="text-align:center;">#</th>
                  <th>Semester Examination</th>
                  <th style="text-align:center;">Total Credits</th>
                  <th style="text-align:center;">Credits Earned</th>
                  <th style="text-align:center;">SGPA</th>
                  <th style="text-align:center;">Result Status</th>
                  <th style="text-align:center;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHTML}
              </tbody>
            </table>
          ` : `
            <table class="sem-memo-table">
              <thead>
                <tr>
                  <th style="text-align:center; width:36px;">#</th>
                  <th style="width:110px;">Course Code</th>
                  <th>Course Title &amp; Category</th>
                  <th style="text-align:center; width:90px;">CIE (40)</th>
                  <th style="text-align:center; width:90px;">SEE (60)</th>
                  <th style="text-align:center; width:95px;">Total (100)</th>
                  <th style="text-align:center; width:65px;">Grade</th>
                  <th style="text-align:center; width:60px;">Points</th>
                  <th style="text-align:center; width:65px;">Credits</th>
                  <th style="text-align:center; width:80px;">Result</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHTML}
              </tbody>
            </table>
          `}
        </div>

        <div class="sem-memo-summary-bar">
          <div class="summary-col">
            <span class="sum-lbl">Semester SGPA:</span>
            <span class="sum-val highlight-green">${semResultData.sgpa}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Cumulative CGPA:</span>
            <span class="sum-val highlight-green">${semResultData.cgpa}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Registered Credits:</span>
            <span class="sum-val">${semResultData.totalCredits}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Credits Secured:</span>
            <span class="sum-val">${semResultData.totalCredits}</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Final Result:</span>
            <span class="sum-val" style="color:#15803d;">PROMOTED (PASS)</span>
          </div>
        </div>

        <div class="sem-memo-footer">
          <div class="memo-seal-box">
            <div class="autonomous-seal">
              <span>HITM</span>
              <small>COE AUTONOMOUS</small>
            </div>
            <div style="font-size:11px; color:#64748b; line-height:1.4;">
              Date of Issue: <strong>${semResultData.issueDate}</strong><br>
              Memo Reference: <strong>${semResultData.memoRef}</strong>
            </div>
          </div>
          <div style="text-align:center;">
            <div style="font-family:serif; font-style:italic; font-size:18px; color:#013b1f; font-weight:700;">Dr. S. Arvind</div>
            <div style="font-size:12px; font-weight:700; color:#1e293b;">Principal</div>
            <div style="font-size:11px; color:#64748b;">HITAM Campus</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:serif; font-style:italic; font-size:18px; color:#013b1f; font-weight:700;">Dr. O. P. Suresh</div>
            <div style="font-size:12px; font-weight:700; color:#1e293b;">Controller of Examinations</div>
            <div style="font-size:11px; color:#64748b;">Autonomous Examination Branch, HITAM</div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. TAB: HALL TICKET DOWNLOAD
  else if (activeTab === 'hallticket') {
    activeTabContentHTML = `
      <div class="sem-result-memo-sheet">
        <div class="sem-memo-header">
          <div class="sem-memo-logo-row">
            <div class="sem-memo-crest">HITM</div>
            <div>
              <div class="sem-memo-college-name">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
              <div class="sem-memo-college-sub">Autonomous Institution • Affiliated to JNTUH • Approved by AICTE • NAAC 'A+'</div>
              <div class="sem-memo-branch-title">AUTONOMOUS EXAMINATION BRANCH — ADMIT CARD / HALL TICKET</div>
            </div>
          </div>
          <div class="sem-memo-badge-line" style="background:#e0f2fe; color:#0369a1;">
            <span>ODD SEMESTER END EXAMINATIONS (SEE) — HALL TICKET</span>
            <span class="regulation-tag" style="background:#0284c7;">EXAM CODE: HTM-NOV26</span>
          </div>
        </div>

        <div class="sem-memo-meta-grid" style="border-left:4px solid #0284c7;">
          <div><span class="lbl">Candidate Name:</span> <strong>${studentUser.name}</strong></div>
          <div><span class="lbl">Hall Ticket Number:</span> <strong style="color:#0284c7; font-size:14px;">${studentUser.roll}</strong></div>
          <div><span class="lbl">Degree &amp; Program:</span> <strong>${studentUser.branch}</strong></div>
          <div><span class="lbl">Academic Regulations:</span> <strong>Autonomous R22 Regulations</strong></div>
          <div><span class="lbl">Examination Session:</span> <strong>NOV / DEC 2026 (Regular)</strong></div>
          <div><span class="lbl">Examination Center:</span> <strong>HITAM Autonomous Campus Center (Code: HITM)</strong></div>
          <div><span class="lbl">Exam Hall / Block:</span> <strong>Ramanujan Block — Hall 204</strong></div>
          <div><span class="lbl">Fee Clearance &amp; Eligibility:</span> <strong style="color:#15803d;">VERIFIED &amp; PERMITTED</strong></div>
        </div>

        <div style="font-weight:700; font-size:13px; color:#0f172a; margin:14px 0 8px 0; display:flex; align-items:center; gap:6px;">
          <span>🗓️</span> Registered Examination Schedule &amp; Timetable:
        </div>

        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="width:36px; text-align:center;">#</th>
              <th style="width:110px;">Course Code</th>
              <th>Course Title</th>
              <th style="width:110px;">Date</th>
              <th style="width:140px;">Timings</th>
              <th style="width:100px; text-align:center;">Candidate Sign</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:center;">1</td>
              <td><strong>22AI501PC</strong></td>
              <td>Machine Learning Techniques</td>
              <td>24-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">2</td>
              <td><strong>22AI502PC</strong></td>
              <td>Deep Learning &amp; Neural Networks</td>
              <td>26-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">3</td>
              <td><strong>22CS503PC</strong></td>
              <td>Computer Networks &amp; Internet Protocols</td>
              <td>28-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">4</td>
              <td><strong>22CS504PC</strong></td>
              <td>Automata Theory &amp; Compiler Design</td>
              <td>01-DEC-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">5</td>
              <td><strong>22CS505PE</strong></td>
              <td>Cloud Computing &amp; Distributed Systems</td>
              <td>03-DEC-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Sign in Hall ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">6</td>
              <td><strong>22AI506PC</strong></td>
              <td>Machine Learning Laboratory (Practical)</td>
              <td>17-NOV-2026</td>
              <td>10:00 AM – 1:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Lab Verified ]</td>
            </tr>
            <tr>
              <td style="text-align:center;">7</td>
              <td><strong>22CS507PC</strong></td>
              <td>Computer Networks Laboratory (Practical)</td>
              <td>19-NOV-2026</td>
              <td>2:00 PM – 5:00 PM</td>
              <td style="text-align:center; color:#94a3b8; font-size:11px;">[ Lab Verified ]</td>
            </tr>
          </tbody>
        </table>

        <!-- Security Barcode & COE Stamp -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:12px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-family:monospace; font-size:14px; letter-spacing:2px; color:#0f172a; font-weight:800;">|||||||||| | |||||| ||||| |||||||</div>
            <div style="font-size:10.5px; color:#64748b; margin-top:2px;">Digital Security Barcode: HTM-2026-AUTON-${roll}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:serif; font-style:italic; font-size:16px; color:#013b1f; font-weight:700;">Dr. O. P. Suresh</div>
            <div style="font-size:11px; font-weight:700; color:#1e293b;">Controller of Examinations</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="drill-action-btn drill-action-primary" onclick="window.print()">🖨️ Download &amp; Print Hall Ticket</button>
          </div>
        </div>
      </div>
    `;
  }

  // 4. TAB: EXAM FEE PAYMENT
  else if (activeTab === 'feepayment') {
    activeTabContentHTML = `
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>💳</span> AUTONOMOUS EXAMINATION FEE PAYMENT DESK
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Review examination fee assessment, payment challans, and instant e-receipt generation.
        </p>

        <!-- Current Semester Fee Status Box -->
        <div style="background:#ffffff; border:2px solid #10b981; border-radius:8px; padding:16px; margin-bottom:18px; box-shadow:0 2px 8px rgba(16, 185, 129, 0.1);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; border-bottom:1px solid #e2e8f0; padding-bottom:10px; margin-bottom:12px;">
            <div>
              <div style="font-size:14.5px; font-weight:800; color:#065f46;">B.Tech Regular Odd Semester End Examination Fee</div>
              <div style="font-size:11.5px; color:#64748b;">Academic Year: 2026–2027 • Hall Ticket: <strong>${studentUser.roll}</strong></div>
            </div>
            <span style="background:#d1fae5; color:#065f46; font-size:12px; font-weight:800; padding:4px 12px; border-radius:20px; border:1px solid #6ee7b7;">
              ✅ FEE CLEARED (PAID)
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:12px;">
            <div><span style="color:#64748b; font-size:11px; display:block;">Theory Courses Fee:</span> <strong>₹1,500.00</strong> (5 Subjects @ ₹300)</div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Practical Labs Fee:</span> <strong>₹300.00</strong> (2 Labs @ ₹150)</div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Grade Card &amp; Processing:</span> <strong>₹250.00</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Total Amount Paid:</span> <strong style="color:#08752f; font-size:14px;">₹2,050.00</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Transaction Reference:</span> <strong>HITM/AUTON/PAY/2026/89421</strong></div>
            <div><span style="color:#64748b; font-size:11px; display:block;">Payment Date:</span> <strong>16-OCT-2026 (11:42 AM)</strong></div>
          </div>

          <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
            <button class="drill-action-btn drill-action-primary" onclick="showDemoNotice('Autonomous Exam Fee Receipt #89421 downloaded successfully.')">📄 Download Fee Receipt (PDF)</button>
            <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('No supplementary dues found for this hall ticket.')">Check Backlog Dues</button>
          </div>
        </div>

        <!-- Historical Fee Receipts Ledger -->
        <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:10px;">
          📜 Past Semester Examination Fee Ledgers &amp; Receipts:
        </div>
        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="text-align:center;">#</th>
              <th>Semester Session</th>
              <th>Transaction Reference</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th style="text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:center;">1</td>
              <td>Semester IV (Even Sem 2025)</td>
              <td>HITM/AUTON/PAY/2025/44120</td>
              <td>₹2,050.00</td>
              <td>14-Apr-2025</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">2</td>
              <td>Semester III (Odd Sem 2024)</td>
              <td>HITM/AUTON/PAY/2024/77812</td>
              <td>₹2,050.00</td>
              <td>18-Nov-2024</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">3</td>
              <td>Semester II (Even Sem 2024)</td>
              <td>HITM/AUTON/PAY/2024/31092</td>
              <td>₹2,050.00</td>
              <td>12-Apr-2024</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
            <tr>
              <td style="text-align:center;">4</td>
              <td>Semester I (Odd Sem 2023)</td>
              <td>HITM/AUTON/PAY/2023/11048</td>
              <td>₹2,050.00</td>
              <td>15-Nov-2023</td>
              <td><span class="memo-status-badge pass">PAID</span></td>
              <td style="text-align:center;"><button class="drill-action-btn drill-action-secondary" style="padding:2px 8px; font-size:11px;" onclick="showDemoNotice('Receipt downloaded.')">Receipt 📄</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // 5. TAB: INTERNAL MARKS (FINAL INTERNAL MARKS & PERCENTAGE)
  else if (activeTab === 'internalmarks') {
    const internalList = window.getStudentInternalMarksBreakdown(studentUser);

    let totalEarned = 0;
    let totalMax = 0;

    const rowsHTML = internalList.map((item, idx) => {
      totalEarned += parseFloat(item.finalInternal);
      totalMax += item.maxInternal;

      return `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td><strong style="color:#0f172a;">${item.code}</strong></td>
          <td>
            <div style="font-weight:600; color:#1e293b;">${item.title}</div>
            <span style="font-size:10.5px; color:#64748b;">${item.type}</span>
          </td>
          <td style="text-align:center; font-weight:600;">${item.mid1} / 20</td>
          <td style="text-align:center; font-weight:600;">${item.mid2} / 20</td>
          <td style="text-align:center; font-weight:800; color:#08752f; font-size:13.5px;">
            ${item.finalInternal} / 40
          </td>
          <td style="text-align:center;">
            <span style="background:#dcfce7; color:#166534; font-weight:800; font-size:12px; padding:3px 8px; border-radius:12px; border:1px solid #86efac; display:inline-block;">
              ${item.percentage}
            </span>
          </td>
          <td style="text-align:center;">
            <span class="memo-status-badge pass">${item.status}</span>
          </td>
        </tr>
      `;
    }).join('');

    const overallAvg = (totalEarned / internalList.length).toFixed(1);
    const overallPct = ((totalEarned / totalMax) * 100).toFixed(1);

    activeTabContentHTML = `
      <div class="exam-tab-content">
        <div class="exam-section-title">
          <span>📝</span> CONTINUOUS INTERNAL EVALUATION (CIE) — FINAL INTERNAL MARKS &amp; PERCENTAGE
        </div>
        <p style="font-size:12.5px; color:#475569; margin: 0 0 14px 0; line-height:1.5;">
          Autonomous R22 Regulations: Final internal marks out of 40 calculated from continuous assessments (Mid-1 &amp; Mid-2 examinations, assignments, quizzes, and practical viva).
        </p>

        <!-- CIE Summary Metric Bar -->
        <div class="sem-memo-summary-bar" style="background:#f0fdf4; border-color:#86efac; margin-bottom:16px;">
          <div class="summary-col">
            <span class="sum-lbl">Overall Internal Average:</span>
            <span class="sum-val highlight-green">${overallAvg} / 40.0</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Overall Internal Percentage:</span>
            <span class="sum-val highlight-green" style="color:#15803d;">${overallPct}%</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">Courses Assessed:</span>
            <span class="sum-val">${internalList.length} Courses</span>
          </div>
          <div class="summary-col">
            <span class="sum-lbl">CIE Exam Eligibility:</span>
            <span class="sum-val" style="color:#15803d; font-size:13px;">100% ELIGIBLE</span>
          </div>
        </div>

        <!-- Subject-Wise Final Internal Marks Table -->
        <table class="sem-memo-table">
          <thead>
            <tr>
              <th style="width:36px; text-align:center;">#</th>
              <th style="width:110px;">Course Code</th>
              <th>Course Title &amp; Category</th>
              <th style="width:105px; text-align:center;">Mid-1 CIE (20)</th>
              <th style="width:105px; text-align:center;">Mid-2 CIE (20)</th>
              <th style="width:130px; text-align:center;">Final Internal Marks (40)</th>
              <th style="width:110px; text-align:center;">Percentage (%)</th>
              <th style="width:90px; text-align:center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>

        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:12px; margin-top:14px; font-size:12px; color:#475569; line-height:1.5;">
          💡 <strong>Internal Marks Policy:</strong> Minimum internal qualifying benchmark is 14 marks out of 40 (35%) in each course. Candidate <strong>${studentUser.roll}</strong> has comfortably cleared internal assessment requirements in all 7 enrolled subjects.
        </div>
      </div>
    `;
  }

  const body = document.getElementById('modalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="drill-detail-view exam-portal-container-view">
      <!-- Top User Bar -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="sub-back-btn" onclick="openModal('exam-portal')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>Sign Out</span>
          </button>
          <span style="font-size:12px; color:#475569;">
            Candidate: <strong>${studentUser.name}</strong> • Roll: <strong style="color:#08752f;">${studentUser.roll}</strong>
          </span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="drill-action-btn drill-action-primary" onclick="window.print()">🖨️ Print View</button>
          <button class="drill-action-btn drill-action-secondary" onclick="showDemoNotice('Examination docket refreshed from autonomous server.')">🔄 Refresh</button>
        </div>
      </div>

      <!-- 5 Main Navigation Shortcut Tabs -->
      <div class="exam-portal-tabs-nav">
        <button class="exam-tab-btn ${activeTab === 'notices' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'notices')">
          <span>📢</span> Notices &amp; Imp Dates
        </button>
        <button class="exam-tab-btn ${activeTab === 'results' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'results')">
          <span>📊</span> Results
        </button>
        <button class="exam-tab-btn ${activeTab === 'hallticket' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'hallticket')">
          <span>🎟️</span> Hall Ticket Download
        </button>
        <button class="exam-tab-btn ${activeTab === 'feepayment' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'feepayment')">
          <span>💳</span> Exam Fee Payment
        </button>
        <button class="exam-tab-btn ${activeTab === 'internalmarks' ? 'active' : ''}" onclick="examPortalSwitchTab('${roll}', 'internalmarks')">
          <span>📝</span> Internal Marks (CIE %)
        </button>
      </div>

      <!-- Main Tab Content Frame -->
      <div id="examPortalTabBody" style="margin-top:14px;">
        ${activeTabContentHTML}
      </div>

      <div id="modalToastSlot"></div>
    </div>
  `;
};

window.examPortalSwitchTab = function(roll, tabName) {
  window.authenticateExamPortal(roll, tabName);
};

window.authenticateExamPortal = function(overrideRoll = null, activeTab = 'notices', selectedSem = 5) {
  const loginInput = document.getElementById('portalLoginId');
  const passInput = document.getElementById('portalPassword');
  
  const roll = overrideRoll || (loginInput ? loginInput.value.trim().toUpperCase() : null);
  const password = passInput ? passInput.value.trim() : '';
  const body = document.getElementById('modalBody');
  if (!body) return;

  if (!roll) {
    showDemoNotice('Please enter a student Hall Ticket / Roll Number.');
    return;
  }

  // Resolve student using the exact same credential engine as the student portal
  const studentUser = resolveStudentUser(roll, overrideRoll ? (roll.includes('6619') ? '23e51a66619' : roll.toLowerCase()) : password);

  if (!studentUser || studentUser.error === 'UNKNOWN_USER') {
    renderPortalUnknownId('exam-portal', roll);
    return;
  }

  if (studentUser.error === 'WRONG_PASSWORD') {
    renderPortalWrongPassword('exam-portal', roll, studentUser.expectedHint);
    return;
  }

  // Check portal access governance
  if (!window.portalAccessState.globalStudent) {
    renderPortalAccessDenied('exam-portal', 'Exam portal access has been globally suspended by Institutional Administration.');
    return;
  }

  if (window.portalAccessState.userOverrides[roll] === false) {
    renderPortalAccessDenied('exam-portal', `Exam portal access for Roll Number ${roll} has been suspended by Admin.`);
    return;
  }

  window.renderExamPortalDashboard(studentUser, activeTab, selectedSem);
};

// Backwards compatibility alias for tests & links
window.authenticateSemResult = window.authenticateExamPortal;
window.generateExamPortalHTML = function() {
  return window.generatePortalLoginHTML('exam-portal');
};
window.generateSemResultPortalHTML = window.generateExamPortalHTML;

/* ==========================================================================
   15B. ITP (3+2) INTEGRATED TWINNING PROGRAM & OVERSEAS MS SERVICES DESK
   ========================================================================== */

// 1. PARTNER UNIVERSITIES & LINKED COUNTRIES
window.itpPartnersData = [
  {
    id: 'uah-usa',
    name: 'University of Alabama in Huntsville (UAH)',
    country: 'United States of America (USA)',
    flag: '🇺🇸',
    cityState: 'Huntsville, Alabama',
    ranking: 'Carnegie Tier-1 National Research University',
    campusImg: 'assets/hero-slide-3.jpg',
    badge: 'USA STEM Track • 3-Year OPT',
    departments: ['Computer Science & Engineering', 'Mechanical Engineering', 'Electronics & Communication'],
    msDegrees: [
      'MS in Computer Science (Software Engineering / Cybersecurity / AI)',
      'MS in Aerospace Systems Engineering',
      'MS in Mechanical & Materials Engineering',
      'MS in Electrical & Computer Engineering'
    ],
    tuitionModel: 'Reciprocal In-State Tuition Tier (Approx. $14,500/year for ITP cohort)',
    stemOpt: 'Up to 36 Months (3 Years) STEM OPT Extension in the United States',
    industryHub: 'Located adjacent to Cummings Research Park (2nd largest research park in the US) and NASA Marshall Space Flight Center.',
    coop: 'CPT / Co-op industrial internships permitted during Year 4 and Year 5.'
  },
  {
    id: 'msoe-usa',
    name: 'Milwaukee School of Engineering (MSOE)',
    country: 'United States of America (USA)',
    flag: '🇺🇸',
    cityState: 'Milwaukee, Wisconsin',
    ranking: 'Top 10 Engineering University (U.S. News & World Report)',
    campusImg: 'assets/hitam7.jpeg',
    badge: 'Direct Industry Placement • 96% Employment',
    departments: ['Computer Science & Engineering', 'Mechanical Engineering'],
    msDegrees: [
      'MS in Computer Science & Applied AI',
      'MS in Software Engineering',
      'MS in Engineering Management (MSEM)'
    ],
    tuitionModel: 'Negotiated Institutional Tuition Waiver (Est. $16,200/year with partner grant)',
    stemOpt: '3-Year STEM OPT with on-campus supercomputing access (Rosie GPU Supercomputer)',
    industryHub: 'Direct partnerships with Rockwell Automation, Johnson Controls, Harley-Davidson, and GE Healthcare.',
    coop: 'Industry-sponsored graduate capstone projects directly linked with US employers.'
  },
  {
    id: 'gmu-usa',
    name: 'George Mason University (GMU)',
    country: 'United States of America (USA)',
    flag: '🇺🇸',
    cityState: 'Fairfax, Virginia (Washington D.C. Metro Area)',
    ranking: 'Carnegie R1 Doctoral Research University',
    campusImg: 'assets/hitam1.jpg',
    badge: 'D.C. Tech Corridor • High-Tech Hub',
    departments: ['Computer Science & Engineering', 'Data Science & Allied'],
    msDegrees: [
      'MS in Computer Engineering',
      'MS in Data Analytics Engineering',
      'MS in Information Systems & Security'
    ],
    tuitionModel: 'Direct Articulation Tuition Schedule ($18,500/year)',
    stemOpt: '3-Year STEM OPT in the Dulles Northern Virginia Technology Corridor',
    industryHub: 'Proximity to Amazon HQ2, federal research labs, and major cloud infrastructure centers.',
    coop: 'Graduate research assistantships (GRA) and teaching assistantships (GTA) available.'
  },
  {
    id: 'kfru-germany',
    name: 'Knowledge Foundation at Reutlingen University (KFRU)',
    country: 'Germany (European Union)',
    flag: '🇩🇪',
    cityState: 'Reutlingen, Baden-Württemberg',
    ranking: 'Premier German Applied Sciences University',
    campusImg: 'assets/hitam3.jpeg',
    badge: 'EU Blue Card Track • English Taught',
    departments: ['Computer Science & Engineering (B.Tech CSE)'],
    msDegrees: [
      'M.Sc. in Professional Software Engineering (PSE)'
    ],
    tuitionModel: 'Subsidized German Higher Education Rate (Approx. €3,500 – €4,200/year)',
    stemOpt: '18-Month Post-Study Jobseeker Visa leading directly to EU Blue Card residency',
    industryHub: 'Baden-Württemberg Automotive & High-Tech Triangle (Bosch, Mercedes-Benz, Porsche, SAP headquarters).',
    coop: 'Paid semester-long industrial software master internship at German multinational firms.'
  }
];

// 2. ELIGIBLE DEPARTMENTS & MAPPED MS DEGREES
window.itpDepartmentsData = [
  {
    deptKey: 'CSE',
    name: 'Computer Science & Engineering (and CSM / CSD Allied)',
    hitamYears: 'Years 1 to 3 at HITAM (Autonomous B.Tech Foundation)',
    abroadYears: 'Years 4 and 5 at Partner University (B.Tech Completion + MS)',
    msOptions: [
      { degree: 'MS in Computer Science', country: 'USA (UAH / MSOE)', duration: '2 Years (Integrated)', career: 'AI Researcher, Senior Software Architect, Cloud Systems Lead' },
      { degree: 'MS in Software Engineering', country: 'USA (UAH / MSOE)', duration: '2 Years (Integrated)', career: 'Enterprise Architect, Full-Stack Lead, DevOps Specialist' },
      { degree: 'MS in Data Analytics Engineering', country: 'USA (GMU)', duration: '2 Years (Integrated)', career: 'Data Scientist, Machine Learning Engineer, Analytics Director' },
      { degree: 'M.Sc. in Professional Software Engineering', country: 'Germany (KFRU)', duration: '2 Years (English-Medium)', career: 'European Software Architect, Systems Engineer' }
    ],
    eligibility: '10+2 MPC with 70%+ aggregate, plus competitive performance in TS EAPCET / JEE Main or HITAM Global Evaluation Test.'
  },
  {
    deptKey: 'MECH',
    name: 'Mechanical Engineering',
    hitamYears: 'Years 1 to 3 at HITAM (Thermodynamics, CAD/CAM, Robotics, "Doing Engineering")',
    abroadYears: 'Years 4 and 5 at Partner University (MS Propulsion / Aerospace / Robotics)',
    msOptions: [
      { degree: 'MS in Aerospace Systems Engineering', country: 'USA (UAH Huntsville)', duration: '2 Years (Integrated)', career: 'Aerospace Propulsion Engineer, Flight Dynamics Analyst, Launch Vehicle Lead' },
      { degree: 'MS in Mechanical & Materials Engineering', country: 'USA (UAH)', duration: '2 Years (Integrated)', career: 'Structural Design Specialist, Advanced Composites Engineer' },
      { degree: 'MS in Engineering Management (MSEM)', country: 'USA (MSOE)', duration: '2 Years (Integrated)', career: 'Industrial Operations Director, Technical Product Manager' }
    ],
    eligibility: '10+2 MPC with 70%+ aggregate. Strong aptitude in mechanics, design, and computational simulation.'
  },
  {
    deptKey: 'ECE',
    name: 'Electronics & Communication Engineering',
    hitamYears: 'Years 1 to 3 at HITAM (Signals, VLSI Design, Embedded IoT, Digital Systems)',
    abroadYears: 'Years 4 and 5 at Partner University (Advanced VLSI / Computer Engineering)',
    msOptions: [
      { degree: 'MS in Electrical & Computer Engineering', country: 'USA (UAH / GMU)', duration: '2 Years (Integrated)', career: 'Semiconductor Verification Engineer, SoC Architect, Embedded Firmware Lead' },
      { degree: 'MS in Cybersecurity & Network Engineering', country: 'USA (GMU)', duration: '2 Years (Integrated)', career: 'Network Security Architect, Cryptography Specialist' }
    ],
    eligibility: '10+2 MPC with 70%+ aggregate. Foundation in mathematics and digital electronics.'
  }
];

// 3. FINANCIAL COMPARISON & FEE STRUCTURE
window.itpFeeStructure = {
  hitamFeePerYear: '₹2,50,000',
  hitamTotal3Years: '₹7,50,000',
  hitamAdmissionAdvance: '₹2,00,000 (Adjusted toward Year 1 Tuition)',
  hitamTransferFee: '₹1,00,000 (One-Time Transfer Fee in Year 3)',
  partnerFeePerYearUSD: '$18,500 – $24,000 (Approx. ₹15 to 19 Lakhs/year with institutional waivers)',
  partnerTotal2Years: 'Approx. ₹30 to 38 Lakhs (inclusive of partner scholarship & out-of-state waivers)',
  estimatedTotalProgramCost: 'Approx. ₹38 to 48 Lakhs total for B.Tech + MS Dual Degrees',
  directUsCost: '₹1.40 to 1.80 Crores (Direct 4-Year B.S. + 2-Year MS in USA)',
  savingsPercentage: 'Over 65% Financial Savings',
  scholarships: [
    { title: 'HITAM Merit Scholarship', desc: 'Up to ₹50,000/year waiver on HITAM tuition for candidates securing 85%+ in Intermediate / 10+2 MPC.' },
    { title: 'Partner University In-State Tuition Reciprocity', desc: 'Saves over $16,000/year in out-of-state tuition surcharges through HITAM bilateral articulation agreements.' },
    { title: 'Graduate Assistantships (GRA / GTA)', desc: 'Eligible during Year 5 at US universities; covers graduate stipend and tuition remission for research/teaching duties.' }
  ]
};

// 4. OVERSEAS MS REMOTE SERVICES DATABASE
window.itpRemoteRequestsDB = window.itpRemoteRequestsDB || [
  {
    ticketId: 'ITP-REQ-8812',
    name: 'Vishnuvardhan Reddy',
    roll: '21E51A0512',
    exitYear: '2024',
    partnerUni: 'University of Alabama in Huntsville (USA)',
    msProgram: 'MS in Computer Science',
    contact: '+1 (256) 555-0142',
    serviceType: 'Transcripts & WES / Credential Dispatch',
    destination: 'World Education Services (WES) Ref #6491028, New York',
    priority: 'Express Courier Dispatch',
    status: 'Dispatched (DHL Tracking: #940551020088)',
    statusStep: 4,
    dateSubmitted: '14-Oct-2026',
    notes: 'Sealed autonomous transcript packet dispatched with stamp.'
  },
  {
    ticketId: 'ITP-REQ-8819',
    name: 'Bhukya Vishnu',
    roll: '23E51A6619',
    exitYear: '2026',
    partnerUni: 'Milwaukee School of Engineering (USA)',
    msProgram: 'MS in Software Engineering',
    contact: '+1 (414) 555-0199',
    serviceType: 'English Medium of Instruction (MOI) Certificate',
    destination: 'MSOE International Graduate Admissions Office',
    priority: 'Standard Digital Issuance',
    status: 'Completed (Digital Certificate Ready)',
    statusStep: 4,
    dateSubmitted: '22-Oct-2026',
    notes: 'Verified English Medium of Instruction letter digitally signed by Dean.'
  },
  {
    ticketId: 'ITP-REQ-8825',
    name: 'Sneha Kulkarni',
    roll: '21E51A0304',
    exitYear: '2024',
    partnerUni: 'Knowledge Foundation at Reutlingen University (Germany)',
    msProgram: 'M.Sc. in Professional Software Engineering',
    contact: '+49 152 555 4892',
    serviceType: 'Course Syllabus Copy & Credit Articulation Endorsement',
    destination: 'Examination Office, Reutlingen University',
    priority: 'Standard Verification',
    status: 'Under Academic Review',
    statusStep: 2,
    dateSubmitted: '25-Oct-2026',
    notes: 'Department syllabus mapping for 3rd year cloud computing courses in progress.'
  }
];

// 5. SUBMIT REMOTE WORK REQUEST HANDLER
window.itpSubmitRemoteRequest = function(event) {
  if (event && event.preventDefault) event.preventDefault();

  const nameEl = document.getElementById('itpReqName');
  const rollEl = document.getElementById('itpReqRoll');
  const exitEl = document.getElementById('itpReqExit');
  const uniEl = document.getElementById('itpReqUni');
  const msEl = document.getElementById('itpReqMS');
  const contactEl = document.getElementById('itpReqContact');
  const serviceEl = document.getElementById('itpReqService');
  const destEl = document.getElementById('itpReqDest');
  const priorityEl = document.getElementById('itpReqPriority');
  const notesEl = document.getElementById('itpReqNotes');

  if (!nameEl || !rollEl || !uniEl || !serviceEl) {
    showDemoNotice('Please complete the mandatory request fields.');
    return;
  }

  const name = nameEl.value.trim();
  const roll = rollEl.value.trim().toUpperCase();
  const exitYear = exitEl ? exitEl.value : '2025';
  const partnerUni = uniEl.value;
  const msProgram = msEl ? msEl.value.trim() : 'MS Degree Program';
  const contact = contactEl ? contactEl.value.trim() : 'N/A';
  const serviceType = serviceEl.value;
  const destination = destEl ? destEl.value.trim() : 'International University Office';
  const priority = priorityEl ? priorityEl.value : 'Standard 5 Working Days';
  const notes = notesEl ? notesEl.value.trim() : 'Remote processing requested.';

  if (!name || !roll) {
    showDemoNotice('Student Name and HITAM Roll Number are required.');
    return;
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `ITP-REQ-${randomNum}`;

  const newTicket = {
    ticketId: ticketId,
    name: name,
    roll: roll,
    exitYear: exitYear,
    partnerUni: partnerUni,
    msProgram: msProgram,
    contact: contact,
    serviceType: serviceType,
    destination: destination,
    priority: priority,
    status: 'Submitted (Assigned to International Relations Desk)',
    statusStep: 1,
    dateSubmitted: '27-Oct-2026',
    notes: notes
  };

  window.itpRemoteRequestsDB.unshift(newTicket);

  showToast(`Remote service request registered! Ticket: ${ticketId}`);
  showDemoNotice(`Request Confirmed: Ticket ${ticketId} created for ${name} (${roll}). Forwarded to HITAM International Relations Office for processing.`);

  // Refresh services view
  if (typeof openModal === 'function') {
    openModal('itp-services');
  }
};

// 6. MOI DIGITAL CERTIFICATE VIEWER MODAL
window.itpOpenMOIViewer = function(ticketId) {
  const ticket = window.itpRemoteRequestsDB.find(t => t.ticketId === ticketId) || {
    ticketId: ticketId || 'ITP-REQ-8819',
    name: 'Bhukya Vishnu',
    roll: '23E51A6619',
    partnerUni: 'Milwaukee School of Engineering (USA)'
  };

  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div style="background:#ffffff; border:2px solid #08752f; border-radius:8px; padding:24px; font-family:'Inter', sans-serif; box-shadow:0 4px 18px rgba(0,0,0,0.08); max-width:720px; margin:0 auto;">
      <div style="text-align:center; border-bottom:2px solid #08752f; padding-bottom:14px; margin-bottom:18px;">
        <div style="font-size:22px; font-weight:900; color:#013b1f; letter-spacing:0.5px;">HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
        <div style="font-size:12px; color:#15803d; font-weight:700; margin-top:3px;">UGC Autonomous Institution • Affiliated to JNTU Hyderabad • Approved by AICTE</div>
        <div style="font-size:11px; color:#64748b; margin-top:2px;">Gowdavelly (V), Near Kompally, Medchal, Hyderabad, Telangana – 501401, India</div>
        <div style="font-size:11.5px; font-weight:800; color:#08752f; margin-top:8px; text-transform:uppercase; letter-spacing:1px; background:#e8f5ec; padding:4px 10px; display:inline-block; border-radius:4px;">
          Office of the Dean, International Relations &amp; Global Programs
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#475569; margin-bottom:16px;">
        <div>Ref: <strong>HITAM/IRO/MOI/2026/${ticket.ticketId}</strong></div>
        <div>Date of Issue: <strong>27-Oct-2026</strong></div>
      </div>

      <div style="text-align:center; font-size:15px; font-weight:800; color:#013b1f; text-decoration:underline; margin-bottom:18px;">
        TO WHOMSOEVER IT MAY CONCERN
      </div>

      <div style="font-size:13px; line-height:1.75; color:#1e293b; text-align:justify; margin-bottom:18px;">
        <p>This is to formally certify that <strong>Mr. / Ms. ${ticket.name}</strong>, bearing Autonomous Enrolment / Hall Ticket Number <strong>${ticket.roll}</strong>, has successfully pursued the curriculum of the Bachelor of Technology (B.Tech) program under the Integrated Twinning Program (ITP 3+2 Pathway) at this institution.</p>
        
        <p style="margin-top:10px;">It is hereby certified that the entire medium of instruction, course examinations, laboratory coursework, technical seminars, and project vivas for all subjects undertaken at the Hyderabad Institute of Technology and Management (HITAM) was conducted <strong>EXCLUSIVELY IN THE ENGLISH LANGUAGE</strong>.</p>
        
        <p style="margin-top:10px;">This certificate is formally issued upon the student's remote request to facilitate credit transfer, foreign admissions, and academic verification at <strong>${ticket.partnerUni}</strong>.</p>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:34px; padding-top:18px; border-top:1px dashed #cbd5e1;">
        <div style="text-align:center;">
          <div style="width:110px; height:45px; border-bottom:1px solid #334155; margin:0 auto 6px;">
            <span style="font-family:'Montserrat', cursive; font-size:18px; color:#08752f; font-weight:700;">K. Radhakrishna</span>
          </div>
          <div style="font-size:11.5px; font-weight:700; color:#013b1f;">Dr. K. Radhakrishna</div>
          <div style="font-size:10.5px; color:#64748b;">Dean, International Relations</div>
        </div>

        <div style="text-align:center;">
          <div style="width:80px; height:80px; border-radius:50%; border:2px dashed #08752f; margin:0 auto; display:flex; align-items:center; justify-content:center; color:#08752f; font-size:10px; font-weight:800; text-align:center; line-height:1.2;">
            HITAM<br>AUTONOMOUS<br>SEAL
          </div>
        </div>

        <div style="text-align:center;">
          <div style="width:110px; height:45px; border-bottom:1px solid #334155; margin:0 auto 6px;">
            <span style="font-family:'Montserrat', cursive; font-size:18px; color:#013b1f; font-weight:700;">S. Arvind</span>
          </div>
          <div style="font-size:11.5px; font-weight:700; color:#013b1f;">Dr. S. Arvind</div>
          <div style="font-size:10.5px; color:#64748b;">Principal, HITAM</div>
        </div>
      </div>

      <div style="margin-top:22px; text-align:center; display:flex; justify-content:center; gap:10px;">
        <button type="button" class="erp-btn" onclick="window.print()" style="background:#08752f; color:#fff; padding:7px 16px; font-size:12px; border-radius:4px; font-weight:700; border:none; cursor:pointer;">🖨️ Print / Save as PDF</button>
        <button type="button" class="erp-btn" onclick="openModal('itp-services')" style="background:#334155; color:#fff; padding:7px 16px; font-size:12px; border-radius:4px; font-weight:700; border:none; cursor:pointer;">← Return to Remote Desk</button>
      </div>
    </div>
  `;
};

// 7. TRACKING COURIER MODAL
window.itpOpenDispatchModal = function(ticketId, dhlNumber) {
  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="drill-detail-view" style="padding:16px;">
      <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
        <span>📦</span> International Dispatch &amp; Credential Tracking
      </h4>
      <div class="modal-highlight-box" style="margin-bottom:14px;">
        <strong>Ticket:</strong> ${ticketId} • <strong>Consignment:</strong> DHL Express International Courier
      </div>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:14px; margin-bottom:14px;">
        <div style="font-size:12px; color:#64748b;">Air Waybill (AWB) Tracking Number:</div>
        <div style="font-size:18px; font-weight:800; color:#08752f; margin:4px 0 10px 0;">${dhlNumber}</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px;">
          <div><span style="color:#64748b;">Sender:</span> <strong>HITAM Autonomous Examination Branch</strong></div>
          <div><span style="color:#64748b;">Carrier:</span> <strong>DHL Express Worldwide</strong></div>
          <div><span style="color:#64748b;">Origin:</span> <strong>Hyderabad (HYD), India</strong></div>
          <div><span style="color:#64748b;">Destination:</span> <strong>United States / Germany</strong></div>
          <div><span style="color:#64748b;">Contents:</span> <strong>Autonomous Attested Transcripts (Sealed)</strong></div>
          <div><span style="color:#64748b;">Delivery Status:</span> <strong style="color:#15803d;">In Transit (On Schedule)</strong></div>
        </div>
      </div>

      <div style="border-left:3px solid #08752f; padding-left:12px; margin-left:6px;">
        <div style="font-size:12px; font-weight:700; color:#1e293b; margin-bottom:6px;">Shipment Activity:</div>
        <div style="font-size:11.5px; color:#475569; line-height:1.6;">
          • <strong>24-Oct-2026 16:30:</strong> Processed at DHL Hyderabad Central Hub.<br>
          • <strong>25-Oct-2026 03:15:</strong> Departed International Gateway (BOM).<br>
          • <strong>26-Oct-2026 14:20:</strong> Arrived at Cincinnati Hub (CVG), United States.<br>
          • <strong>27-Oct-2026 08:45:</strong> Out for Delivery to Evaluation Office.
        </div>
      </div>

      <div style="margin-top:16px; text-align:right;">
        <button class="modal-action-btn primary-btn" onclick="openModal('itp-services')">← Return to Remote Desk</button>
      </div>
    </div>
  `;
};

// 8. GENERATE ITP OVERVIEW HTML
function generateITPOverviewHTML() {
  return `
    <div>
      <div class="drill-hero-banner" style="height:190px; margin-bottom:14px;">
        <img class="drill-hero-img" src="assets/hitam-campus.png" alt="HITAM Integrated Twinning Program">
        <div class="drill-hero-overlay">
          <span class="drill-hero-badge" style="background:#82c322; color:#013b1f;">3 Years at HITAM + 2 Years Abroad</span>
          <div class="drill-hero-title">Integrated Twinning Program (ITP 3+2)</div>
          <div class="drill-hero-sub">Direct Articulation to MS in USA &amp; Germany with Dual Degrees</div>
        </div>
      </div>

      <p style="font-size:13px; line-height:1.6; color:#334155; margin-bottom:14px;">
        The <strong>Integrated Twinning Program (ITP 3+2)</strong> at HITAM is a structured dual-degree engineering pathway designed for ambitious high-school graduates. Students study the foundational 3 years of their B.Tech curriculum at HITAM (Autonomous), followed by 2 years at an esteemed international partner university in the <strong>United States</strong> or <strong>Germany</strong> to earn both a <strong>B.Tech degree</strong> and a <strong>Master of Science (MS) degree</strong>.
      </p>

      <div class="modal-highlight-box" style="margin-bottom:14px; background:#f0fdf4; border:1px solid #86efac;">
        <strong style="color:#08752f;">🎯 Dual Qualifications:</strong> Students graduate with a recognized <strong>B.Tech from JNTU Hyderabad / HITAM</strong> and an accredited <strong>Master of Science (MS / M.Sc.)</strong> from the international partner university, with guaranteed credit articulation.
      </div>

      <!-- 5-Year Pathway Timeline -->
      <h4 style="margin:16px 0 10px 0; color:#013b1f;">📅 5-Year Academic Pathway Roadmap</h4>
      <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:8px; margin-bottom:16px; text-align:center;">
        <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:10px 6px;">
          <div style="font-size:11px; font-weight:800; color:#08752f;">YEAR 1 (HITAM)</div>
          <div style="font-size:10.5px; color:#475569; margin-top:4px;">Core Engineering, Mathematics &amp; Computational Foundations</div>
        </div>
        <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:10px 6px;">
          <div style="font-size:11px; font-weight:800; color:#08752f;">YEAR 2 (HITAM)</div>
          <div style="font-size:10.5px; color:#475569; margin-top:4px;">Data Structures, Core Systems &amp; "Doing Engineering" Projects</div>
        </div>
        <div style="background:#ffffff; border:1px solid #bbf7d0; border-radius:6px; padding:10px 6px;">
          <div style="font-size:11px; font-weight:800; color:#08752f;">YEAR 3 (HITAM)</div>
          <div style="font-size:10.5px; color:#475569; margin-top:4px;">Advanced Core, AI/Cloud, Credit Mapping &amp; Visa Counseling</div>
        </div>
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:10px 6px;">
          <div style="font-size:11px; font-weight:800; color:#1d4ed8;">YEAR 4 (ABROAD)</div>
          <div style="font-size:10.5px; color:#475569; margin-top:4px;">Transition to USA/Germany: Complete B.Tech + Start MS Courses</div>
        </div>
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:10px 6px;">
          <div style="font-size:11px; font-weight:800; color:#1d4ed8;">YEAR 5 (ABROAD)</div>
          <div style="font-size:10.5px; color:#475569; margin-top:4px;">MS Specialization, Master Thesis &amp; 3-Year STEM OPT Work Visa</div>
        </div>
      </div>

      <div class="modal-grid-features">
        <div class="modal-feature-card"><strong>Guaranteed Articulation:</strong><span>Pre-approved credit transfer agreements eliminate credit loss and streamline visa approvals.</span></div>
        <div class="modal-feature-card"><strong>Fast-Track Career:</strong><span>Complete both B.Tech and MS in 5 years instead of the standard 6 years.</span></div>
        <div class="modal-feature-card"><strong>Substantial Cost Savings:</strong><span>Save over 65% in overall tuition and living expenses compared to doing 4 full years abroad.</span></div>
        <div class="modal-feature-card"><strong>Global Employment:</strong><span>Qualifies for 3-Year STEM OPT in the USA or 18-month EU Blue Card jobseeker visa in Germany.</span></div>
      </div>

      <div class="drill-action-bar" style="margin-top:16px;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('itp-partners')">Explore Partner Universities (USA &amp; Germany) →</button>
        <button class="drill-action-btn" onclick="openModal('itp-services')" style="background:#08752f; color:#ffffff;">Overseas MS Remote Services Desk ↗</button>
      </div>
    </div>
  `;
}

// 9. GENERATE ITP PARTNERS HTML
function generateITPPartnersHTML() {
  const partnersHTML = window.itpPartnersData.map(p => `
    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; margin-bottom:14px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="background:#013b1f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
        <span style="font-weight:800; font-size:14px; display:flex; align-items:center; gap:8px;">
          <span>${p.flag}</span> ${p.name}
        </span>
        <span style="font-size:11px; background:#82c322; color:#013b1f; font-weight:800; padding:2px 8px; border-radius:4px;">${p.badge}</span>
      </div>
      <div style="padding:14px;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px; margin-bottom:10px;">
          <div><span style="color:#64748b;">Location:</span> <strong>${p.cityState}, ${p.country}</strong></div>
          <div><span style="color:#64748b;">Accreditation Standing:</span> <strong>${p.ranking}</strong></div>
          <div><span style="color:#64748b;">Tuition Advantage:</span> <strong style="color:#08752f;">${p.tuitionModel}</strong></div>
          <div><span style="color:#64748b;">Post-Study Work Privilege:</span> <strong style="color:#1d4ed8;">${p.stemOpt}</strong></div>
        </div>

        <div style="font-size:12px; font-weight:700; color:#1e293b; margin:8px 0 4px 0;">Available MS Degree Programs:</div>
        <ul style="margin:0 0 10px 0; padding-left:18px; font-size:11.5px; color:#334155; line-height:1.5;">
          ${p.msDegrees.map(d => `<li>${d}</li>`).join('')}
        </ul>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; font-size:11.5px; color:#475569;">
          <strong>Industry &amp; Research Ecosystem:</strong> ${p.industryHub}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🌐 <strong>Linked Countries &amp; Partner Universities:</strong> HITAM has established direct bilateral articulation and credit transfer agreements with leading institutions in the <strong>United States of America</strong> and <strong>Germany</strong>.
      </div>
      <div>
        ${partnersHTML}
      </div>
      <div class="drill-action-bar" style="margin-top:16px;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('itp-departments')">View Departments &amp; MS Degrees →</button>
        <button class="drill-action-btn" onclick="openModal('itp-fees')">View Fee Structure &amp; Savings →</button>
      </div>
    </div>
  `;
}

// 10. GENERATE ITP DEPARTMENTS HTML
function generateITPDepartmentsHTML() {
  const deptsHTML = window.itpDepartmentsData.map(d => `
    <div style="background:#ffffff; border:1px solid #c8e4cf; border-radius:8px; margin-bottom:14px; overflow:hidden;">
      <div style="background:#08752f; color:#ffffff; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-weight:800; font-size:13.5px;">${d.name} (${d.deptKey})</span>
        <span style="font-size:11px; background:#ffffff; color:#08752f; font-weight:800; padding:2px 8px; border-radius:4px;">3+2 Pathway</span>
      </div>
      <div style="padding:14px;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px; margin-bottom:10px;">
          <div><span style="color:#64748b;">India Phase:</span> <strong>${d.hitamYears}</strong></div>
          <div><span style="color:#64748b;">Abroad Phase:</span> <strong>${d.abroadYears}</strong></div>
        </div>

        <div style="font-size:12px; font-weight:700; color:#1e293b; margin:10px 0 6px 0;">Mapped Master of Science (MS) Options Abroad:</div>
        <table class="ht-table" style="width:100%; font-size:11.5px; margin-bottom:10px;">
          <thead>
            <tr>
              <th>MS Degree Title</th>
              <th>Host Country / University</th>
              <th>Duration</th>
              <th>Target Career Outcome</th>
            </tr>
          </thead>
          <tbody>
            ${d.msOptions.map(opt => `
              <tr>
                <td><strong>${opt.degree}</strong></td>
                <td>${opt.country}</td>
                <td>${opt.duration}</td>
                <td><span style="color:#08752f; font-weight:700;">${opt.career}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="font-size:11.5px; color:#475569; background:#f8faf8; border:1px solid #d4ebd8; border-radius:4px; padding:6px 10px;">
          <strong>Eligibility Requirement:</strong> ${d.eligibility}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🎓 <strong>Eligible Academic Departments:</strong> The 3+2 Integrated Twinning Program is available for students enrolled in Computer Science, Mechanical Engineering, and Electronics &amp; Communication.
      </div>
      <div>
        ${deptsHTML}
      </div>
      <div class="drill-action-bar" style="margin-top:16px;">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('itp-fees')">Check Fee Structure &amp; Financial Comparison →</button>
        <button class="drill-action-btn" onclick="openModal('itp-services')">Overseas MS Remote Desk ↗</button>
      </div>
    </div>
  `;
}

// 11. GENERATE ITP FEES HTML
function generateITPFeesHTML() {
  const f = window.itpFeeStructure;
  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        💰 <strong>Transparent Fee Structure &amp; 65% Financial Savings:</strong> Combining 3 years of autonomous foundational engineering at HITAM with 2 years abroad at US/German partner universities drastically cuts international tuition costs while earning a dual qualification.
      </div>

      <!-- Detailed Phase Breakdown Table -->
      <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; overflow:hidden; margin-bottom:16px;">
        <div style="background:#f8fafc; padding:10px 14px; font-weight:700; font-size:13px; color:#0f172a; border-bottom:1px solid #cbd5e1; display:flex; justify-content:space-between; align-items:center;">
          <span>📑 Detailed ITP (3+2) Program Fee Schedule</span>
          <span style="font-size:11.5px; color:#15803d; font-weight:700;">Accredited Autonomous Pathway</span>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:12px;">
            <thead>
              <tr style="background:#f1f5f9; color:#475569; font-size:11px; text-transform:uppercase;">
                <th style="padding:8px 12px;">Academic Phase</th>
                <th style="padding:8px 12px;">Location &amp; Institution</th>
                <th style="padding:8px 12px;">Fee Component</th>
                <th style="padding:8px 12px;">Total Phase Amount</th>
                <th style="padding:8px 12px;">Notes &amp; Inclusions</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:10px 12px; font-weight:700; color:#0f172a;">Years 1 to 3 (Undergraduate)</td>
                <td style="padding:10px 12px;">HITAM Campus, Hyderabad</td>
                <td style="padding:10px 12px;"><strong style="color:#08752f;">₹2,50,000 / year</strong></td>
                <td style="padding:10px 12px;"><strong style="color:#013b1f;">₹7,50,000</strong> (3 Years Total)</td>
                <td style="padding:10px 12px; color:#64748b; font-size:11.5px;">Tuition for autonomous engineering coursework &amp; lab credits</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9; background:#fafffa;">
                <td style="padding:10px 12px; font-weight:700; color:#0f172a;">Offer Acceptance Advance</td>
                <td style="padding:10px 12px;">HITAM Admissions Office</td>
                <td style="padding:10px 12px;"><strong style="color:#08752f;">₹2,00,000</strong> (One-time)</td>
                <td style="padding:10px 12px;"><span style="color:#15803d; font-weight:700;">Adjusted in Year 1</span></td>
                <td style="padding:10px 12px; color:#64748b; font-size:11.5px;">Paid upon receiving admission offer to reserve seat; adjusted against Year 1 tuition</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:10px 12px; font-weight:700; color:#0f172a;">Year 3 International Transfer Fee</td>
                <td style="padding:10px 12px;">Office of International Relations</td>
                <td style="padding:10px 12px;"><strong style="color:#08752f;">₹1,00,000</strong> (One-time)</td>
                <td style="padding:10px 12px;"><strong style="color:#013b1f;">₹1,00,000</strong></td>
                <td style="padding:10px 12px; color:#64748b; font-size:11.5px;">Covers transcript evaluation, I-20 documentation &amp; partner university liaison</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:10px 12px; font-weight:700; color:#0f172a;">Years 4 &amp; 5 (MS Degree)</td>
                <td style="padding:10px 12px;">Partner Universities (USA / Germany)</td>
                <td style="padding:10px 12px;">Direct Partner Rates</td>
                <td style="padding:10px 12px;"><strong style="color:#1d4ed8;">Approx. ₹30 – ₹38 Lakhs</strong></td>
                <td style="padding:10px 12px; color:#64748b; font-size:11.5px;">Paid directly to foreign university with in-state waivers ($5k–$8k/yr discount)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Comparison Cards -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
        <div style="background:#ffffff; border:2px solid #08752f; border-radius:8px; padding:14px;">
          <span style="font-size:11px; font-weight:800; background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:4px; text-transform:uppercase;">HITAM 3+2 ITP Pathway</span>
          <div style="font-size:20px; font-weight:900; color:#013b1f; margin:8px 0 4px 0;">${f.estimatedTotalProgramCost}</div>
          <div style="font-size:11.5px; color:#15803d; font-weight:700; margin-bottom:10px;">${f.savingsPercentage} compared to direct 4-year US degree</div>
          <div style="font-size:12px; color:#334155; line-height:1.6;">
            • <strong>Years 1–3 at HITAM:</strong> ${f.hitamFeePerYear}/year (${f.hitamTotal3Years} total)<br>
            • <strong>Offer Acceptance Advance:</strong> ₹2,00,000 (adjusted against 1st year)<br>
            • <strong>Year 3 Transfer Processing:</strong> ₹1,00,000 one-time<br>
            • <strong>Years 4–5 Abroad:</strong> ${f.partnerFeePerYearUSD}<br>
            • <strong>Bilateral In-State Tuition:</strong> Saves $16,000+/year in out-of-state surcharges.
          </div>
        </div>

        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:14px;">
          <span style="font-size:11px; font-weight:800; background:#f1f5f9; color:#475569; padding:2px 8px; border-radius:4px; text-transform:uppercase;">Traditional 4-Year US B.S. + 2-Yr MS</span>
          <div style="font-size:20px; font-weight:900; color:#475569; margin:8px 0 4px 0;">${f.directUsCost}</div>
          <div style="font-size:11.5px; color:#64748b; margin-bottom:10px;">Standard international out-of-state tuition</div>
          <div style="font-size:12px; color:#64748b; line-height:1.6;">
            • 4 Years B.S. in USA: $35,000 to $45,000/year (~₹1.20 Crore)<br>
            • 2 Years MS in USA: $30,000 to $40,000/year (~₹60 Lakhs)<br>
            • Plus 6 full years of international room, board &amp; health insurance.
          </div>
        </div>
      </div>

      <!-- Partner University Tuition Breakdown -->
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:14px; margin-bottom:16px;">
        <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <span>🏛️</span> Partner University Tuition Rates (Years 4 &amp; 5 Abroad)
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:10px; font-size:11.5px;">
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:10px;">
            <strong style="color:#0f172a; display:block;">University of Alabama in Huntsville (USA)</strong>
            <span style="color:#08752f; font-weight:700; display:block; margin:2px 0;">~$18,500 – $22,000 / year</span>
            <span style="color:#64748b;">ITP students receive $5,000 – $8,000 annual merit scholarship &amp; out-of-state waiver.</span>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:10px;">
            <strong style="color:#0f172a; display:block;">Milwaukee School of Engineering (USA)</strong>
            <span style="color:#08752f; font-weight:700; display:block; margin:2px 0;">~$24,000 – $28,000 / year</span>
            <span style="color:#64748b;">Eligible for MSOE Global Merit Scholarship of up to $10,000 / year.</span>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:10px;">
            <strong style="color:#0f172a; display:block;">George Mason University (USA)</strong>
            <span style="color:#08752f; font-weight:700; display:block; margin:2px 0;">~$26,000 – $30,000 / year</span>
            <span style="color:#64748b;">Direct credit recognition for 90+ credits completed at HITAM.</span>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:10px;">
            <strong style="color:#0f172a; display:block;">Reutlingen / Esslingen University (Germany)</strong>
            <span style="color:#08752f; font-weight:700; display:block; margin:2px 0;">~€1,500 / semester</span>
            <span style="color:#64748b;">Virtually zero tuition under state university guidelines; nominal semester contribution only.</span>
          </div>
        </div>
      </div>

      <!-- Scholarship Details -->
      <h4 style="margin:14px 0 8px 0; color:#013b1f;">🎓 Scholarships &amp; Financial Aid</h4>
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:16px;">
        ${f.scholarships.map(s => `
          <div style="background:#fafffa; border:1px solid #bbf7d0; border-radius:6px; padding:10px;">
            <strong style="font-size:12px; color:#166534; display:block; margin-bottom:4px;">${s.title}</strong>
            <span style="font-size:11px; color:#475569; line-height:1.5; display:block;">${s.desc}</span>
          </div>
        `).join('')}
      </div>

      <div class="drill-action-bar">
        <button class="drill-action-btn drill-action-primary" onclick="openModal('itp-partners')">Review Partner Universities →</button>
        <button class="drill-action-btn" onclick="openModal('itp-services')" style="background:#08752f; color:#ffffff;">Overseas MS Remote Services Desk ↗</button>
      </div>
    </div>
  `;
}

// 12. GENERATE OVERSEAS MS REMOTE SERVICES DESK HTML
function generateITPServicesHTML() {
  const requests = window.itpRemoteRequestsDB || [];

  const requestsRowsHTML = requests.map(r => {
    const isCompleted = r.statusStep === 4;
    const isUnderReview = r.statusStep === 2;
    const statusBg = isCompleted ? '#dcfce7' : (isUnderReview ? '#fef9c3' : '#eff6ff');
    const statusColor = isCompleted ? '#15803d' : (isUnderReview ? '#854d0e' : '#1d4ed8');

    let actionBtn = '';
    if (r.serviceType.includes('Medium of Instruction')) {
      actionBtn = `<button type="button" class="erp-btn" style="background:#08752f; color:#fff; font-size:11px; padding:3px 8px;" onclick="itpOpenMOIViewer('${r.ticketId}')">📄 View MOI Certificate</button>`;
    } else if (r.serviceType.includes('Transcripts')) {
      actionBtn = `<button type="button" class="erp-btn" style="background:#1d4ed8; color:#fff; font-size:11px; padding:3px 8px;" onclick="itpOpenDispatchModal('${r.ticketId}', 'DHL-940551020088')">📦 Track Courier</button>`;
    } else {
      actionBtn = `<button type="button" class="erp-btn" style="background:#475569; color:#fff; font-size:11px; padding:3px 8px;" onclick="showDemoNotice('Service Request Ticket ${r.ticketId} is currently actively undergoing processing at the autonomous desk.')">ℹ️ View Status</button>`;
    }

    return `
      <tr>
        <td><strong>${r.ticketId}</strong><br><span style="font-size:10.5px; color:#64748b;">${r.dateSubmitted}</span></td>
        <td><strong>${r.name}</strong><br><span style="font-size:11px; color:#08752f; font-weight:700;">${r.roll}</span></td>
        <td>${r.partnerUni}<br><span style="font-size:11px; color:#64748b;">${r.msProgram}</span></td>
        <td><strong>${r.serviceType}</strong><br><span style="font-size:10.5px; color:#475569;">${r.destination}</span></td>
        <td><span style="font-size:11px; font-weight:700; background:${statusBg}; color:${statusColor}; padding:3px 8px; border-radius:4px; display:inline-block;">${r.status}</span></td>
        <td>${actionBtn}</td>
      </tr>
    `;
  }).join('');

  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        ✈️ <strong>ITP Overseas Student Remote Services Desk:</strong> For students who completed their B.Tech phase at HITAM and are currently pursuing their MS abroad. Request transcripts, Medium of Instruction (MOI) certificates, LORs, credit evaluations, and no-due clearances directly online.
      </div>

      <!-- 1. LIVE SERVICE REQUEST SUBMISSION FORM -->
      <div class="portal-card-box" style="margin-bottom:16px;">
        <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
          <span>📝</span> Submit a New Remote Service Request from Abroad
        </h4>
        <p style="font-size:12px; color:#557260; margin:0 0 12px 0;">
          All requests are directly coordinated by the HITAM International Relations Office and the Autonomous Examination Branch.
        </p>

        <form onsubmit="itpSubmitRemoteRequest(event)">
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
            <div class="portal-field-group">
              <label>Student Full Name *</label>
              <input type="text" id="itpReqName" placeholder="e.g. Bhukya Vishnu" value="Bhukya Vishnu" required>
            </div>
            <div class="portal-field-group">
              <label>HITAM Roll Number *</label>
              <input type="text" id="itpReqRoll" placeholder="e.g. 23E51A6619" value="23E51A6619" required>
            </div>
            <div class="portal-field-group">
              <label>HITAM Exit / Graduation Batch</label>
              <select id="itpReqExit">
                <option value="2026" selected>Batch 2026 (Current ITP Cohort)</option>
                <option value="2025">Batch 2025</option>
                <option value="2024">Batch 2024</option>
                <option value="2023">Batch 2023</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
            <div class="portal-field-group">
              <label>Current Overseas Partner University *</label>
              <select id="itpReqUni" required>
                <option value="University of Alabama in Huntsville (USA)">University of Alabama in Huntsville (UAH, USA)</option>
                <option value="Milwaukee School of Engineering (USA)">Milwaukee School of Engineering (MSOE, USA)</option>
                <option value="George Mason University (USA)">George Mason University (GMU, USA)</option>
                <option value="Knowledge Foundation at Reutlingen University (Germany)">Knowledge Foundation Reutlingen University (Germany)</option>
                <option value="Other International Institution">Other International Institution</option>
              </select>
            </div>
            <div class="portal-field-group">
              <label>Current MS Program Specialization</label>
              <input type="text" id="itpReqMS" placeholder="e.g. MS in Computer Science" value="MS in Software Engineering">
            </div>
            <div class="portal-field-group">
              <label>Foreign Contact / WhatsApp No</label>
              <input type="text" id="itpReqContact" placeholder="e.g. +1 (414) 555-0199" value="+1 (414) 555-0199">
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
            <div class="portal-field-group">
              <label>Service Type Needed *</label>
              <select id="itpReqService" required>
                <option value="English Medium of Instruction (MOI) Certificate">English Medium of Instruction (MOI) Certificate</option>
                <option value="Transcripts &amp; WES / Credential Dispatch">Autonomous Certified Transcripts (WES / Sealed Courier Dispatch)</option>
                <option value="Course Syllabus Copy &amp; Credit Articulation Endorsement">Course Syllabus Copy &amp; Credit Articulation Endorsement</option>
                <option value="Faculty Letter of Recommendation (LOR) &amp; Reference">Faculty Letter of Recommendation (LOR) &amp; Reference</option>
                <option value="Provisional Degree Certificate (PDC) &amp; Migration Certificate">Provisional Degree Certificate (PDC) &amp; Migration</option>
                <option value="Institutional No-Due Clearance &amp; Deposit Clearance">Institutional No-Due Clearance &amp; Deposit Clearance</option>
              </select>
            </div>
            <div class="portal-field-group">
              <label>Recipient / Agency / Address *</label>
              <input type="text" id="itpReqDest" placeholder="e.g. WES Ref # or University Registrar Office" value="MSOE International Graduate Admissions" required>
            </div>
            <div class="portal-field-group">
              <label>Urgency Level</label>
              <select id="itpReqPriority">
                <option value="Standard 5 Working Days">Standard (3 to 5 Working Days)</option>
                <option value="Express Priority (48 Hours)">Express Priority (Visa Deadline 48 Hours)</option>
              </select>
            </div>
          </div>

          <div class="portal-field-group" style="margin-bottom:12px;">
            <label>Specific Instructions / Notes for Examination Branch</label>
            <input type="text" id="itpReqNotes" placeholder="e.g. Please include sealed envelope with stamp for graduate school credit evaluation.">
          </div>

          <div class="portal-btn-row">
            <button type="submit" class="modal-action-btn primary-btn" style="background:#08752f;">
              🚀 Submit Remote Work Request to HITAM Desk →
            </button>
          </div>
        </form>
      </div>

      <!-- 2. LIVE TRACKER OF SUBMITTED REQUESTS -->
      <div class="portal-card-box">
        <h4 style="margin-top:0; color:#013b1f; display:flex; align-items:center; gap:8px;">
          <span>📋</span> Live Remote Work Request Tracker &amp; Digital Vault
        </h4>
        <p style="font-size:12px; color:#557260; margin:0 0 10px 0;">
          Real-time status of service requests submitted by overseas HITAM students.
        </p>

        <div style="overflow-x:auto;">
          <table class="portal-data-table" style="font-size:11.5px;">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student Details</th>
                <th>Current Overseas Uni</th>
                <th>Requested Service</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${requestsRowsHTML}
            </tbody>
          </table>
        </div>
      </div>

      <!-- 3. DIRECT CONTACT WITH INTERNATIONAL DESK -->
      <div style="background:#f8faf8; border:1px solid #d4ebd8; border-radius:6px; padding:12px; margin-top:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <strong style="color:#013b1f;">International Student Services Helpdesk:</strong>
          <div style="font-size:11.5px; color:#475569;">Director of Global Relations: <strong>Dr. K. Radhakrishna</strong> • Email: <a href="mailto:international@hitam.org" style="color:#08752f; font-weight:700;">international@hitam.org</a></div>
        </div>
        <div style="font-size:12px; color:#08752f; font-weight:700;">
          📞 WhatsApp Overseas Support: +91 92487 11155
        </div>
      </div>
    </div>
  `;
}

// 13. GENERATE ITP ALL DIRECTORY (5 BOXES VIEW)
function generateITPAllHTML() {
  const boxes = [
    {
      id: 'itp-overview',
      title: 'ITP (3+2) Program Overview & Roadmap',
      badge: 'Dual Degrees • 5 Years',
      img: 'assets/hitam-campus.png',
      meta: '3 Years at HITAM + 2 Years Abroad',
      desc: 'Structured integrated engineering track combining B.Tech at HITAM with MS in the USA or Germany, saving time and tuition expenses.',
      action: "openModal('itp-overview')"
    },
    {
      id: 'itp-partners',
      title: 'Partner Universities (USA & Germany)',
      badge: 'UAH • MSOE • GMU • KFRU',
      img: 'assets/hero-slide-3.jpg',
      meta: 'USA & Germany Partner Network',
      desc: 'Bilateral articulation agreements with Carnegie Tier-1 research institutions in the US and premier applied sciences universities in Germany.',
      action: "openModal('itp-partners')"
    },
    {
      id: 'itp-departments',
      title: 'Eligible Departments & MS Degrees',
      badge: 'CSE, MECH & ECE Tracks',
      img: 'assets/hitam3.jpeg',
      meta: 'B.Tech to MS Degree Mapping',
      desc: 'Mapped pathways for Computer Science, Mechanical, and Electronics students to advance into AI, Software Engineering, Aerospace, and VLSI.',
      action: "openModal('itp-departments')"
    },
    {
      id: 'itp-fees',
      title: 'Fee Structure & 65% Financial Savings',
      badge: '₹2.5L/Yr at HITAM + Partner Aid',
      img: 'assets/hitam1.jpg',
      meta: 'Comprehensive Financial Planning',
      desc: 'Affordable domestic tuition during the first 3 years followed by in-state reciprocity and partner scholarships, cutting total costs by 65%.',
      action: "openModal('itp-fees')"
    },
    {
      id: 'itp-services',
      title: 'Overseas MS Student Remote Services Desk',
      badge: 'Transcripts • MOI • LOR • WES',
      img: 'assets/hitam7.jpeg',
      meta: 'Remote Work Portal for MS Students',
      desc: 'Complete digital desk for alumni in the US/Germany to request transcripts, MOI certificates, syllabus copies, and clearances from HITAM.',
      action: "openModal('itp-services')"
    }
  ];

  const boxesHTML = boxes.map(b => `
    <div class="drill-card" onclick="${b.action}" style="cursor:pointer;">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${b.img}" alt="${b.title}" loading="lazy">
        <span class="drill-card-badge">${b.badge}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${b.title}</div>
        <div style="font-size:11.5px; color:#08752f; font-weight:700; margin-bottom:4px;">${b.meta}</div>
        <div class="drill-card-desc">${b.desc}</div>
        <div class="drill-card-footer">
          <span>Global Programs</span>
          <span style="color:#08752f; font-weight:700;">Explore Details →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🌍 <strong>HITAM International Transfer Program (ITP 3+2) Directory:</strong> Explore program guidelines, partner universities, eligible branches, fee structure, and the overseas remote services desk.
      </div>
      <div class="drill-grid">
        ${boxesHTML}
      </div>
    </div>
  `;
}

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

  const boxesHTML = services.map(s => `
    <div class="drill-card" onclick="${s.action}" style="cursor:pointer;">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${s.img}" alt="${s.title}" loading="lazy">
        <span class="drill-card-badge">${s.badge}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${s.title}</div>
        <div style="font-size:11.5px; color:#08752f; font-weight:700; margin-bottom:4px;">${s.meta}</div>
        <div class="drill-card-desc">${s.desc}</div>
        <div class="drill-card-footer">
          <span>${s.time}</span>
          <span style="color:#08752f; font-weight:700;">Explore Details →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🏛️ <strong>HITAM Campus Facilities Directory:</strong> Explore all 6 campus services below in individual interactive boxes. Click any box to view complete detailed schedules, facilities, and contact information.
      </div>
      <div class="drill-grid">
        ${boxesHTML}
      </div>
    </div>
  `;
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

  const boxesHTML = sections.map(s => `
    <div class="drill-card" onclick="${s.action}" style="cursor:pointer;">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${s.img}" alt="${s.title}" loading="lazy">
        <span class="drill-card-badge">${s.badge}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${s.title}</div>
        <div style="font-size:11.5px; color:#08752f; font-weight:700; margin-bottom:4px;">${s.meta}</div>
        <div class="drill-card-desc">${s.desc}</div>
        <div class="drill-card-footer">
          <span>Campus Life</span>
          <span style="color:#08752f; font-weight:700;">Explore Details →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <div class="portal-demo-banner" style="background:#f0fdf4; border:1px solid #86efac; color:#166534; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🎓 <strong>HITAM College Life Directory:</strong> Explore all 6 college life categories below in dedicated interactive boxes.
      </div>
      <div class="drill-grid">
        ${boxesHTML}
      </div>
    </div>
  `;
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

  const boxesHTML = portals.map(p => `
    <div class="drill-card" onclick="${p.action}" style="cursor:pointer;">
      <div class="drill-card-img-wrap">
        <img class="drill-card-img" src="${p.img}" alt="${p.title}" loading="lazy">
        <span class="drill-card-badge">${p.badge}</span>
      </div>
      <div class="drill-card-body">
        <div class="drill-card-title">${p.title}</div>
        <div style="font-size:11.5px; color:#08752f; font-weight:700; margin-bottom:4px;">${p.meta}</div>
        <div class="drill-card-desc">${p.desc}</div>
        <div class="drill-card-footer">
          <span>Digital Portals</span>
          <span style="color:#08752f; font-weight:700;">Open Sign In Desk →</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div>
      <div class="portal-demo-banner" style="background:#fef9c3; border:1px solid #fde047; color:#854d0e; padding:10px 14px; border-radius:6px; font-size:12.5px; margin-bottom:14px; line-height:1.5;">
        🔐 <strong>HITAM Digital Portals Directory:</strong> Access Administrative, Faculty, Student, or Exam Portals below. Select a box to sign in to your dashboard.
      </div>
      <div class="drill-grid">
        ${boxesHTML}
      </div>
    </div>
  `;
}

window.generateCampusServicesAllHTML = generateCampusServicesAllHTML;
window.generateCollegeLifeAllHTML = generateCollegeLifeAllHTML;
window.generatePortalsAllHTML = generatePortalsAllHTML;

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
    title: 'College Life Overview Directory — All 6 Categories',
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
    title: 'Unified Single Sign-On (SSO) Directory — All 4 Portals',
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