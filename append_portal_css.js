// scratch/append_portal_css.js
const fs = require('fs');

const cssToAdd = `
/* ==========================================================================
   17. EXPANDED PORTAL NAVIGATION TABS & MODULE STYLING
   ========================================================================== */

.portal-nav-tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 8px 4px;
  margin-bottom: 16px;
  border-bottom: 2px solid #e2ece4;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

.portal-nav-tabs::-webkit-scrollbar {
  height: 5px;
}

.portal-nav-tabs::-webkit-scrollbar-thumb {
  background: #c5dcc9;
  border-radius: 4px;
}

.portal-tab-btn {
  background: #f1f8f3;
  border: 1px solid #c8e4cf;
  color: #086d2a;
  padding: 7px 13px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
}

.portal-tab-btn:hover {
  background: #08752f;
  color: #ffffff;
  border-color: #08752f;
}

.portal-tab-btn.active {
  background: #013b1f;
  color: #ffffff;
  border-color: #013b1f;
  box-shadow: 0 2px 6px rgba(1, 59, 31, 0.25);
}

.portal-filter-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  background: #f4fbf5;
  border: 1px solid #d4ebd8;
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
  align-items: center;
}

.portal-filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #0b4f26;
  min-width: 120px;
}

.portal-filter-select {
  padding: 6px 10px;
  border: 1px solid #bfe0c7;
  border-radius: 4px;
  font-size: 12.5px;
  background: #ffffff;
  color: #123620;
  font-family: inherit;
}

.portal-filter-select:focus {
  outline: none;
  border-color: #08752f;
  box-shadow: 0 0 0 2px rgba(8, 117, 47, 0.2);
}

.portal-data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid #d4ebd8;
  border-radius: 6px;
  overflow: hidden;
}

.portal-data-table th {
  background: #013b1f;
  color: #ffffff;
  padding: 9px 12px;
  text-align: left;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.portal-data-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e5ede7;
  color: #1e293b;
}

.portal-data-table tr:last-child td {
  border-bottom: none;
}

.portal-data-table tr:hover {
  background: #f7fbf8;
}

.portal-card-box {
  background: #ffffff;
  border: 1px solid #d4ebd8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.cie-marks-input {
  width: 64px;
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  font-weight: 700;
  color: #0b4f26;
}

.cie-marks-input:focus {
  outline: none;
  border-color: #08752f;
  box-shadow: 0 0 0 2px rgba(8, 117, 47, 0.2);
}

.timetable-grid-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11.5px;
  margin: 10px 0;
}

.timetable-grid-table th {
  background: #013b1f;
  color: #ffffff;
  padding: 8px 6px;
  text-align: center;
  font-size: 11px;
}

.timetable-grid-table td {
  border: 1px solid #cce3d1;
  padding: 6px 8px;
  text-align: center;
  vertical-align: middle;
  background: #ffffff;
}

.timetable-grid-table td.day-col {
  background: #eef7f0;
  font-weight: 800;
  color: #013b1f;
  text-align: left;
  white-space: nowrap;
}

.timetable-slot-cell {
  padding: 4px 6px;
  border-radius: 4px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  display: block;
}

.timetable-slot-cell.lab {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.timetable-slot-sub {
  font-weight: 700;
  color: #0f172a;
  display: block;
}

.timetable-slot-meta {
  font-size: 10px;
  color: #64748b;
  display: block;
  margin-top: 2px;
}

.complaint-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #08752f;
  border-radius: 6px;
  padding: 12px 14px;
  margin-bottom: 10px;
  transition: box-shadow 0.2s;
}

.complaint-card:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

.complaint-card.high {
  border-left-color: #f59e0b;
}

.complaint-card.urgent {
  border-left-color: #ef4444;
}

.complaint-badge {
  display: inline-block;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.complaint-badge.resolved {
  background: #dcfce7;
  color: #15803d;
}

.complaint-badge.in-progress {
  background: #dbeafe;
  color: #1d4ed8;
}

.complaint-badge.under-review {
  background: #fef3c7;
  color: #b45309;
}

.rating-stars-row {
  display: flex;
  gap: 6px;
  align-items: center;
  margin: 6px 0 12px;
  flex-wrap: wrap;
}

.rating-chip {
  padding: 4px 10px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.15s;
}

.rating-chip:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.rating-chip.active {
  background: #fef08a;
  border-color: #eab308;
  color: #854d0e;
  font-weight: 800;
}

.portal-credential-form {
  background: #ffffff;
  border: 1px solid #d4ebd8;
  border-radius: 8px;
  padding: 18px 20px;
  max-width: 520px;
  margin: 10px auto;
}

@media (max-width: 768px) {
  .portal-filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .portal-filter-group {
    width: 100%;
  }
}
`;

let currentCSS = fs.readFileSync('css/style.css', 'utf8');

// Only append if not already present
if (!currentCSS.includes('EXPANDED PORTAL NAVIGATION TABS & MODULE STYLING')) {
  currentCSS += '\n' + cssToAdd;
  fs.writeFileSync('css/style.css', currentCSS, 'utf8');
  console.log('Appended portal CSS to css/style.css');
} else {
  console.log('Portal CSS already present in css/style.css');
}
