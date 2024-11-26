const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
  const arr = (await readline()).split(',')
  const obj = {}
  const obj_arr = []
  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i]] == undefined) {
      obj[arr[i]] = 1
    } else {
      obj[arr[i]] += 1
    }
  }
  for (let key in obj) {
    obj_arr.push([key, obj[key]])
  }
  obj_arr.sort((a, b) => b[1] - a[1])
  let res = []
  obj_arr.map(v => {
    res.push(v[0])
  })
  console.log(res.join(','));
}()

// 1,3,3,3,2,2,4,4,4,5