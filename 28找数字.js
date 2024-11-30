// 题目描述
// 给一个二维数组 nums，对于每一个元素 nums[i]，找出距离最近的且值相等的元素，

// 输出横纵坐标差值的绝对值之和，如果没有等值元素，则输出-1。

// 例如：

// 输入数组 nums 为

// 0 3 5 4 2
// 2 5 7 8 3
// 2 5 4 2 4

// 输出为：

// -1 4 2 3 3
// 1 1 -1 -1 4
// 1 1 2 3 2

// 对于 nums[0][0] = 0，不存在相等的值。
// 对于 nums[0][1] = 3，存在一个相等的值，最近的坐标为 nums[1][4]，最小距离为 4。
// 对于 nums[0][2] = 5，存在两个相等的值，最近的坐标为 nums[1][1]，故最小距离为 2。
// ...
// 对于 nums[1][1] = 5，存在两个相等的值，最近的坐标为 nums[2][1]，故最小距离为1。
// ...
// 输入描述
// 输入第一行为二维数组的行

// 输入第二行为二维数组的列

// 输入的数字以空格隔开。

// 输出描述
// 数组形式返回所有坐标值。

// 备注
// 针对数组 nums[i][j]，满足 0 < i ≤ 100，0 < j ≤ 100
// 对于每个数字，最多存在 100 个与其相等的数字
// 用例
// 输入	3
// 5
// 0 3 5 4 2
// 2 5 7 8 3
// 2 5 4 2 4
// 输出	[[-1, 4, 2, 3, 3], [1, 1, -1, -1, 4], [1, 1, 2, 3, 2]]
// 说明	无
// 题目解析
// 我的解题思路如下：

// 首先遍历输入的矩阵，将相同数字的位置整理到一起。

// 然后再遍历一次输入的矩阵，找到和遍历元素相同的其他数字（通过上一步统计结果快速找到），求距离，并保留最小的距离。

// 上面逻辑的算法复杂度为O(n*m*k)，其中n是输入矩阵行，m是输入矩阵列，k是每组相同数字的个数，可能会达到O(N^3)的时间复杂度。

// 有一个优化点就是，遍历元素 A 找其他相同数字 B 时计算的距离可以缓存，这样的话，当遍历元素B时找其他相同数字A时，就可以从缓存中读取已经计算好的距离了，而不是重新计算。但是这样会浪费较多空间。

// 实际机试时，可以看用例数量级来决定是否要做上面这个优化。如果数量级很小，则无需上面优化。如果数量级较大，则有优化的必要。

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void(async function () {
  const l = parseInt(await readline())
  const k = parseInt(await readline())
  const nums = []
  const result = []
  let obj = {}
  for (let i = 0; i < l; i++) {
    nums.push((await readline()).split(' ').map(Number))
  }
  // 取出相同数字
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < k; j++) {
      if (obj[nums[i][j]]) {
        obj[nums[i][j]].push([i, j])
      } else {
        obj[nums[i][j]] = [
          [i, j]
        ]
      }
    }
  }
  let result_obj = {}
  console.log(nums, obj, result_obj);
  // 挨个比较相同数字之间的距离
  for (let o in obj) {
    if (obj[o].length === 1) {
      result_obj[o] = [-1]
      continue
    } else {
      for (let i = 0; i < obj[o].length; i++) {
        let min = Infinity
        for (let j = 0; j < obj[o].length; j++) {
          if (i !== j) {
            min = (Math.min(min, (Math.abs(obj[o][j][0] - obj[o][i][0]) + Math.abs(obj[o][j][1] - obj[o][i][1]))))
          }
        }
        if (result_obj[o]) {
          result_obj[o].push(min)
        } else {
          result_obj[o] = [min]
        }
      }
    }


  }
  // console.log(nums, obj, result_obj);
  for (let i = 0; i < l; i++) {
    let arr = []
    for (let j = 0; j < k; j++) {
      arr.push(result_obj[nums[i][j]].shift())
    }
    result.push(arr)
  }

  console.log(result);
})()

// -----------------------------
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void (async function () {
//   const n = parseInt(await readline());
//   const m = parseInt(await readline());

//   const matrix = [];
//   for (let i = 0; i < n; i++) {
//     matrix.push((await readline()).split(" ").map(Number));
//   }

//   // 统计输入矩阵中，相同数字的位置
//   const nums = {};

//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       const num = matrix[i][j];
//       nums[num] ? nums[num].push([i, j]) : (nums[num] = [[i, j]]);
//     }
//   }

//   // 遍历矩阵每一个元素，和其他相同数字的位置求距离，取最小距离
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       const num = matrix[i][j];
//       let minDis = Infinity;

//       for (let [i1, j1] of nums[num]) {
//         if (i1 != i || j1 != j) {
//           minDis = Math.min(minDis, Math.abs(i1 - i) + Math.abs(j1 - j));
//         }
//       }

//       matrix[i][j] = minDis == Infinity ? -1 : minDis;
//     }
//   }

//   console.log(JSON.stringify(matrix).replace(/,/g, ", "));
// })();