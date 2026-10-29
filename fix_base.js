const fs = require('fs');

let code = fs.readFileSync('scratch/section15_clean_base.js', 'utf8');

// Replace \` with `
code = code.split('\\`').join('`');
// Replace \${ with ${
code = code.split('\\${').join('${');

fs.writeFileSync('scratch/section15_clean_base.js', code, 'utf8');
console.log('Successfully unescaped scratch/section15_clean_base.js!');

const vm = require('vm');
try {
  vm.runInNewContext(code, {
    window: {},
    document: { getElementById: () => ({ value: '' }) },
    showDemoNotice: () => {},
    openModal: () => {}
  });
  console.log('Syntax is 100% valid in clean base!');
} catch (e) {
  console.log('Error in clean base:', e.message);
}
