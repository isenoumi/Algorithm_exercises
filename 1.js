const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void(async function () {
  const steps = JSON.parse(await readline());
  const count = parseInt(await readline());

  console.log(getResult(steps, count));
})();

function getResult(steps, count) {
  const map = {};

  let minIdxSum = Infinity;
  let ans = "";

  for (let idx1 = 0; idx1 < steps.length; idx1++) {
    const step1 = steps[idx1];
    const step2 = count - step1;

    if (map[step2] != undefined) {
      const idx2 = map[step2];
      const idxSum = idx1 + idx2;
      if (idxSum < minIdxSum) {
        minIdxSum = idxSum;
        ans = `[${step2}, ${step1}]`;
      }
    } else {
      if (map[step1] == undefined) {
        map[step1] = idx1;
      }
    }
  }

  return ans;
}