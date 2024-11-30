// 题目描述
// 给定两个整数数组array1、array2，数组元素按升序排列。

// 假设从array1、array2中分别取出一个元素可构成一对元素，现在需要取出k对元素，

// 并对取出的所有元素求和，计算和的最小值。

// 注意：

// 两对元素如果对应于array1、array2中的两个下标均相同，则视为同一对元素。

// 输入描述
// 输入两行数组array1、array2，每行首个数字为数组大小size(0 < size <= 100);

// 0 < array1[i] <= 1000

// 0 < array2[i] <= 1000

// 接下来一行为正整数k

// 0 < k <= array1.size() * array2.size()

// 输出描述
// 满足要求的最小和

// 用例
// 输入	
// 3 1 1 2
// 3 1 2 3
// 2

// 输出	4
// 说明	
// 用例中，需要取2对元素

// 取第一个数组第0个元素与第二个数组第0个元素组成1对元素[1,1];

// 取第一个数组第1个元素与第二个数组第0个元素组成1对元素[1,1];

// 求和为1+1+1+1=4，为满足要求的最小和。

// 题目解析
// 本题很简单，双重for找出所有整数对，并记录整数对之和，然后排序整数对之和，取出前k个求和，就是题解。

// 输入的两个数组的长度均不大于100，因此双重for的O(n^2)复杂度也可以接受。

// 到网上找了一下，本题好像还有O(nlogn)时间复杂度的算法，是基于最小堆实现的，后面有机会实现一下。最小堆其实就是优先队列，基于完全二叉树，实现上浮，下沉操作即可。


const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
  const arr1 = (await readline()).split(' ').map(Number)
  const arr1_l = arr1.shift()
  const arr2 = (await readline()).split(' ').map(Number)
  const arr2_l = arr2.shift()
  const n = parseInt(await readline())
  let res_arr = []

  for (let i = 0; i < arr1_l; i++) {
    for (let j = 0; j < arr2_l; j++) {
      res_arr.push(arr1[i] + arr2[j])
    }
  }
  res_arr.sort((a, b) => a - b)
  let res = 0
  for (let i = 0; i < n; i++) {
    res += res_arr[i]
  }
  console.log(res);
}()