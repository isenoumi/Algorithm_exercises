// 题目描述
// 给定一个数组X和正整数K，请找出使表达式：

// X[i] - X[i + 1] -  ... - X[i + K - 1]

// 结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i.

// 其中，数组中位数：长度为N的数组，按照元素的值大小升序排列后，下标为 N/2 元素的值

// 输入描述
// 无

// 输出描述
// 无

// 备注
// 数组X的元素均为正整数
// X的长度n取值范围：2 ≤ n ≤ 1000
// K大于0目小于数组的大小
// i 的取值范围: 0 ≤ i < 1000
// 题目的排序数组X[N]的中位数是X[N/2]
// 用例
// 输入	[50,50,2,3],2
// 输出	1
// 说明	
// 中位数为50：[50,50,2,3]升序排序后变成[2,3,50,50]，中位数为下标4/2=2的元素50
// 计算结果为1：X [50,50,2,3] 根据题目计算X[i] - ... - X[i + k - 1] 得出三个数0 (X[0] - X[1] = 50 - 50) 、48 (X[1] - X[2] = 50 - 2) 和 -1 (X[2]-X[3] = 2 - 3) ，其中48最接近50，因此返回下标1。


const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const i = line.lastIndexOf(",");

  const x = line
    .slice(1, i - 1)
    .split(",")
    .map(Number);

  const k = parseInt(line.slice(i + 1));

  console.log(getResult(x, k));
});

function getResult(x, k) {
  const nums = JSON.parse(JSON.stringify(x))
  nums.sort()
  const mid = nums[Math.floor(nums.length / 2)]
  let min = Infinity
  let res = 0
  for (let i = 0; i <= x.length - k; i++) {
    const arr = x.slice(i, i + k)
    let n = 0
    arr.forEach(v => n += v)
    if (Math.abs(mid - n) < min) {
      res = i
      min = Math.abs(mid - n)
    }
  }
  return res
}

//---------------------------
/* JavaScript Node ACM模式 控制台输入获取 */
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on("line", (line) => {
//   const i = line.lastIndexOf(",");

//   const x = line
//     .slice(1, i - 1)
//     .split(",")
//     .map(Number);

//   const k = parseInt(line.slice(i + 1));

//   console.log(getResult(x, k));
// });

// function getResult(x, k) {
//   const n = x.length;

//   const midIdx = Math.floor(n / 2);
//   // x数组的中位数
//   const mid = [...x].sort((a, b) => a - b)[midIdx];

//   // 初始化滑窗0~k-1, window为滑窗内部元素的表达式计算结果
//   let window = x[0];
//   for (let i = 1; i < k; i++) {
//     window -= x[i];
//   }

//   // window和中位数的差距
//   let minDiff = Math.abs(mid - window);
//   // window滑窗起始索引
//   let idx = 0;

//   // 滑窗右移
//   for (let i = 1; i <= n - k; i++) {
//     // 右移一格后，新滑窗的表达式计算结果
//     window += -x[i - 1] + 2 * x[i] - x[i + k - 1];

//     // 新滑窗window值和中位数的差距
//     const diff = Math.abs(mid - window);

//     // 结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i
//     if (diff <= minDiff) {
//       minDiff = diff;
//       idx = i;
//     }
//   }

//   return idx;
// }