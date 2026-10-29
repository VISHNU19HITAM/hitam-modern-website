const fs = require('fs');
const readline = require('readline');

async function extractAndRun() {
  const fileStream = fs.createReadStream('C:/Users/BHUKYAVISHNU/.gemini/antigravity/brain/ad66aa05-1864-4857-9615-c91c85c54982/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let count = 0;
  for await (const line of rl) {
    count++;
    if (count === 1009) {
      const obj = JSON.parse(line);
      for (const tc of obj.tool_calls) {
        if (tc.args && tc.args.Content) {
          fs.writeFileSync('scratch/build_portals_expansion.js', tc.args.Content, 'utf8');
          console.log('Saved build_portals_expansion.js! Size:', tc.args.Content.length);
          return;
        }
      }
    }
  }
}

extractAndRun();
