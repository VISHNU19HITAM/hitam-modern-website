const fs = require('fs');
const readline = require('readline');

async function findOriginal() {
  const fileStream = fs.createReadStream('C:/Users/BHUKYAVISHNU/.gemini/antigravity/brain/ad66aa05-1864-4857-9615-c91c85c54982/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('section15_expanded.js') && line.includes('"Path"')) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.tool_calls) {
          for (const tc of parsed.tool_calls) {
            if (tc.name === 'write_file' && tc.args && tc.args.Path && tc.args.Path.includes('section15_expanded.js')) {
              console.log('Found write_file call with content length:', tc.args.Content.length);
              fs.writeFileSync('scratch/section15_clean_base.js', tc.args.Content, 'utf8');
              return;
            }
          }
        }
      } catch (e) {}
    }
  }
}

findOriginal();
