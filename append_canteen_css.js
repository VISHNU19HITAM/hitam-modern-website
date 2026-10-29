const fs = require('fs');

const canteenCSS = `
/* ==========================================================================
   Canteen Stock Management, Complaint Box & Feedback Architecture
   ========================================================================== */

.stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  padding: 2.5px 8px;
  border-radius: 4px;
  line-height: 1.25;
}

.stock-badge.in-stock {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #86efac;
}

.stock-badge.low-stock {
  background: #fef9c3;
  color: #854d0e;
  border: 1px solid #fde047;
}

.stock-badge.out-of-stock {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.canteen-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 8px;
}

.canteen-tab-pill {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.canteen-tab-pill:hover {
  background: #e2fbe8;
  color: #166534;
  border-color: #86efac;
}

.canteen-tab-pill.active {
  background: #287a38;
  border-color: #1e612c;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(40, 122, 56, 0.25);
}

.canteen-tab-pill.active:hover {
  background: #20662e;
  color: #ffffff;
}

@media (max-width: 640px) {
  .canteen-tabs {
    flex-direction: column;
  }
  .canteen-tab-pill {
    width: 100%;
    justify-content: center;
  }
}
`;

fs.appendFileSync('css/style.css', canteenCSS);
console.log('Successfully appended canteen styles to css/style.css');
