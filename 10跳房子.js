// 题目描述
// 跳房子，也叫跳飞机，是一种世界性的儿童游戏。

// 游戏参与者需要分多个回合按顺序跳到第1格直到房子的最后一格。

// 跳房子的过程中，可以向前跳，也可以向后跳。

// 假设房子的总格数是count，小红每回合可能连续跳的步教都放在数组steps中，请问数组中是否有一种步数的组合，可以让小红两个回合跳到量后一格?

// 如果有，请输出索引和最小的步数组合。


// 注意：

// 数组中的步数可以重复，但数组中的元素不能重复使用。
// 提供的数据保证存在满足题目要求的组合，且索引和最小的步数组合是唯一的。
// 输入描述
// 第一行输入为房子总格数count，它是int整数类型。
// 第二行输入为每回合可能连续跳的步数，它是int整数数组类型。

// 输出描述
// 返回索引和最小的满足要求的步数组合（顺序保持steps中原有顺序）

// 备注
// count ≤ 1000
// 0 ≤ steps.length ≤ 5000
// -100000000 ≤ steps[i] ≤ 100000000
// 用例
// 输入	[1,4,5,2,2]
// 7
// 输出	[5, 2]
// 说明	无
// 输入	[-1,2,4,9,6]
// 8
// 输出	[-1, 9]
// 说明	此样例有多种组合满足两回合跳到最后，譬如：[-1,9]，[2,6]，其中[-1,9]的索引和为0+3=3，[2,6]的索和为1+4=5，所以索引和最小的步数组合[-1,9]
// 题目解析
// 本题其实就是两数之和：

// LeetCode - 1 两数之和-CSDN博客
// https://fcqian.blog.csdn.net/article/details/141686729?spm=1001.2014.3001.5502
// 的变种题。

// 即有一个数组steps，要在其中找到一个二元组，让其和等于count。

// 和leetcode两数之和的区别在于，本题最终解二元组可能有多个解，我们需要在这多个解中找到索引和最小的作为最终解，即我们不仅要求二元组元素之和，还要求二元组索引之和。

// 本题解析可以参考上面链接博客。

// 2023.08.24

// 新增一个用例

// [1,2,9,9,9,1,9,9,3,2]

// 4

// 我们需要注意的是，第二个1的索引要大于第一个1的索引，因此后面遇到3时，我们应该让3和第一个1进行匹配，而不是第二个1。

// const rl = require("readline").createInterface({
//   input: process.stdin
// });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void(async function () {
//   const steps = JSON.parse(await readline());
//   const count = parseInt(await readline());

//   let steps_map = {}
//   steps.map((v, i) => {
//     steps_map[i] = v
//   })
//   let index = 10001
//   let res = ''
//   for (let i = 0; i < steps.length; i++) {
//     for (let j = 0; j < steps.length; j++) {
//       if (count - steps_map[i] === steps_map[j] && i != j) {
//         if (i + j < index) {

//           index = i + j
//           console.log(index);
//           res = [steps_map[i], steps_map[j]]
//         }
//       }

//     }
//   }
//   console.log(JSON.stringify(res));
// })();
//-------------------------------------------
const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void(async function () {
  const steps = JSON.parse(await readline());
  const count = parseInt(await readline());

  let steps_map = {}

  let index = 10001
  for (let i = 0; i < steps.length; i++) {
    const step1 = steps[i]
    const step2 = count - step1
    if (steps_map[step2]) {
      const i2 = steps_map[step2]
      if (i + i2 < index) {
        index = i + i2
        res = [step2, step1]
      }
    } else {
      if (steps_map[step1] == undefined) {
        steps_map[step1] = i
      }
    }
  }

  console.log(JSON.stringify(res));
})();

//----------------------------------
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void (async function () {
//   const steps = JSON.parse(await readline());
//   const count = parseInt(await readline());

//   console.log(getResult(steps, count));
// })();

// function getResult(steps, count) {
//   const map = {};

//   let minIdxSum = Infinity;
//   let ans = "";

//   for (let idx1 = 0; idx1 < steps.length; idx1++) {
//     const step1 = steps[idx1];
//     const step2 = count - step1;

//     if (map[step2] != undefined) {
//       const idx2 = map[step2];
//       const idxSum = idx1 + idx2;
//       if (idxSum < minIdxSum) {
//         minIdxSum = idxSum;
//         ans = `[${step2}, ${step1}]`;
//       }
//     } else {
//       if (map[step1] == undefined) {
//         map[step1] = idx1;
//       }
//     }
//   }

//   return ans;
// }