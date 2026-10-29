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
