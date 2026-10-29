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