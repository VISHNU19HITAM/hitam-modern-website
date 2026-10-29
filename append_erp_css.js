const fs = require('fs');

const cssToAppend = `
/* ==========================================================================
   HITAM ERP Portal Reference Theme (Green ERP Architecture)
   ========================================================================== */

.hitam-erp-wrap {
  border: 1px solid #c2e2c8;
  border-radius: 6px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
}

.hitam-erp-header {
  background: #237834;
  background: linear-gradient(135deg, #1d6a2c 0%, #29823b 100%);
  color: #ffffff;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 2px solid #82c322;
}

.hitam-erp-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.hitam-erp-logo {
  height: 46px;
  width: auto;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.95);
  padding: 3px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.hitam-erp-title-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.hitam-erp-counselling-code {
  font-size: 11px;
  font-weight: 700;
  color: #e2fbe8;
  letter-spacing: 0.5px;
  display: flex;
  gap: 16px;
}

.hitam-erp-counselling-code strong {
  color: #ffffff;
}

.hitam-erp-college-name {
  font-size: 15.5px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #ffffff;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.25;
}

.hitam-erp-accreditation {
  font-size: 10px;
  color: #d1fad7;
  font-weight: 500;
}

.hitam-erp-user-photo {
  width: 58px;
  height: 72px;
  border: 2px solid #ffffff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
  background: #e2e8f0;
}

.hitam-erp-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hitam-erp-marquee {
  background: #ffffff;
  border-bottom: 1px solid #d4ebd8;
  padding: 4px 12px;
  font-size: 11px;
  color: #b91c1c;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
}

.hitam-erp-userbar {
  background: #287a38;
  color: #ffffff;
  padding: 6px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  border-bottom: 1px solid #1e662c;
}

.erp-user-greeting {
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.erp-user-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.erp-action-link {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
}

.erp-action-link:hover {
  color: #dcfce7;
}

.erp-separator {
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
}

.hitam-erp-body {
  display: grid;
  grid-template-columns: 215px 1fr;
  gap: 14px;
  padding: 12px 14px;
  background: #fbfdfb;
  min-height: 480px;
}

.hitam-erp-sidebar {
  border: 1px solid #cce5d1;
  border-radius: 4px;
  background: #ffffff;
  overflow: hidden;
  align-self: start;
}

.erp-menu-header {
  background: #287a38;
  color: #ffffff;
  font-weight: 800;
  font-size: 12px;
  text-align: center;
  padding: 6px 10px;
  letter-spacing: 1.5px;
}

.erp-menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 10.5px;
  font-weight: 700;
  color: #1e3a29;
  max-height: 520px;
  overflow-y: auto;
}

.erp-menu-list li {
  padding: 6px 9px;
  border-bottom: 1px solid #edf5ee;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s ease, color 0.15s ease;
  line-height: 1.25;
}

.erp-menu-list li:hover {
  background: #eaf6ec;
  color: #166534;
}

.erp-menu-list li.active {
  background: #287a38;
  color: #ffffff;
}

.erp-menu-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #e0f2e3;
  color: #1b632c;
  font-size: 10px;
  font-weight: 900;
  line-height: 1;
  flex-shrink: 0;
}

.erp-menu-list li.active .erp-menu-icon {
  background: #ffffff;
  color: #287a38;
}

.hitam-erp-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.erp-section-title {
  color: #166534;
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 6px;
  border-bottom: 1.5px dashed #86efac;
  margin: 0 0 8px 0;
}

.erp-accordion-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.erp-accordion-item {
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #bbf7d0;
}

.erp-accordion-header {
  background: #287a38;
  color: #ffffff;
  padding: 7px 12px;
  font-size: 11.5px;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  transition: background 0.15s ease;
}

.erp-accordion-header:hover {
  background: #206b30;
}

.erp-accordion-header .arrow {
  display: inline-block;
  font-size: 9px;
  font-weight: 900;
  width: 14px;
}

.erp-accordion-body {
  background: #ffffff;
  padding: 12px 14px;
  font-size: 12px;
  color: #1f2937;
  border-top: 1px solid #dcfce7;
}

.erp-profile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 16px;
  font-size: 12px;
  line-height: 1.45;
}

.erp-profile-grid .lbl {
  color: #475569;
  font-weight: 600;
  margin-right: 4px;
}

.erp-kpi-pill {
  background: #f8faf8;
  border: 1px solid #d4ebd8;
  border-radius: 6px;
  padding: 8px 10px;
}

.erp-kpi-pill .val {
  display: block;
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
}

.erp-kpi-pill .lbl {
  display: block;
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 700;
}

.erp-btn-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.erp-btn {
  background: #287a38;
  color: #ffffff;
  border: 1px solid #1e612c;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s ease;
}

.erp-btn:hover {
  background: #1f642d;
}

@media (max-width: 860px) {
  .hitam-erp-body {
    grid-template-columns: 1fr;
  }
  .hitam-erp-sidebar {
    max-height: 160px;
  }
  .hitam-erp-header {
    flex-wrap: wrap;
  }
  .erp-profile-grid {
    grid-template-columns: 1fr;
  }
}
`;

fs.appendFileSync('css/style.css', cssToAppend);
console.log('Appended ERP styles to css/style.css successfully!');
