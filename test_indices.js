const fs = require('fs');
let code = fs.readFileSync('scratch/section15_pristine.js', 'utf8').replace(/\r\n/g, '\n');
const startDetails = code.indexOf('// 1. STUDENT DETAILS TAB');
const endDetails = code.indexOf('// 2. ATTENDANCE TAB');
console.log('startDetails:', startDetails, 'endDetails:', endDetails);

const startOuter = code.indexOf('// Render Full Student Portal View');
const endOuter = code.lastIndexOf('<div id="modalToastSlot"></div>');
console.log('startOuter:', startOuter, 'endOuter:', endOuter);
