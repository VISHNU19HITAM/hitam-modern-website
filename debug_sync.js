const fs = require('fs');

function makeElement(id = '') {
  return {
    id: id,
    innerHTML: '',
    innerText: '',
    textContent: '',
    value: '',
    style: {},
    classList: {
      _classes: new Set(),
      contains(cls) { return this._classes.has(cls); },
      add(cls) { this._classes.add(cls); },
      remove(cls) { this._classes.delete(cls); }
    },
    setAttribute() {},
    getAttribute() { return null; },
    appendChild() {},
    focus() {},
    remove() {}
  };
}

global.window = global;
global.document = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = makeElement(id);
    }
    return this.elements[id];
  },
  createElement(tag) {
    return makeElement(tag);
  },
  querySelectorAll() { return []; },
  querySelector() { return null; },
  addEventListener() {},
  body: makeElement('body')
};

global.showToast = function(msg) {};
global.showDemoNotice = function(msg) {};
global.openModal = function(key) {};

const code = fs.readFileSync('js/main.js', 'utf8');
eval(code);

// Set filters
window.currentFacultyFilters.branch = 'CSM';
window.currentFacultyFilters.year = '23';
window.currentFacultyFilters.section = 'B';
window.currentFacultyFilters.cieAssessment = 'ciea1';

console.log('Class students:');
const students = window.getStudentsForClass('CSM', '23', 'B');
console.log(students.map(s => s.roll));

// Check if 23E51A6619 is in students
const found = students.find(s => s.roll === '23E51A6619');
console.log('Found 23E51A6619 in class students:', !!found);

// Set value and save
document.getElementById('marks_23E51A6619').value = '25';
window.facultySaveMarks('CSMHOD');

console.log('window.studentMarksDB:', window.studentMarksDB['23E51A6619']);
