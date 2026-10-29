const fs = require('fs');

const lines = fs.readFileSync('scratch/section15_clean_base.js', 'utf8').split('\n');
const vm = require('vm');

for (let i = 1; i < lines.length; i++) {
  const chunk = lines.slice(0, i).join('\n');
  try {
    vm.runInNewContext(chunk + '\n;}catch(e){}', {
      window: {},
      document: { getElementById: () => ({ value: '' }) },
      showDemoNotice: () => {},
      openModal: () => {}
    });
  } catch (e) {
    if (e.message.includes('Unexpected identifier')) {
      console.log('Error around line', i, ':', lines[i - 1]);
      break;
    }
  }
}
