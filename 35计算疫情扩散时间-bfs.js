// 题目描述
// 在一个地图中（地图由 n * n 个区域组成），有部分区域被感染病菌。

// 感染区域每天都会把周围（上下左右）的4个区域感染。

// 请根据给定的地图计算，多少天以后，全部区域都会被感染。

// 如果初始地图上所有区域全部都被感染，或者没有被感染区域，返回 -1

// 输入描述
// 一行 N * N 个数字（只包含0，1，不会有其他数字）表示一个地图，数字间用 "," 分割，

// 0 表示未感染区域
// 1 表示已经感染区域
// 每 N 个数字表示地图中一行，输入数据共表示 N 行 N 列的区域地图。例如输入：

// 1,0,1,0,0,0,1,0,1

// 表示地图

// 1,0,1
// 0,0,0
// 1,0,1



// 输出描述
// 一个整数，表示经过多少天以后，全部区域都被感染

// 备注
// 1 ≤ N < 200
// 用例
// 输入	1,0,1,0,0,0,1,0,1
// 输出	2
// 说明	1天以后，地图中仅剩余中心点未被感染；2天以后，全部被感染。
// 输入	0,0,0,0
// 输出	-1
// 说明	无感染区域
// 输入	1,1,1,1,1,1,1,1,1
// 输出	-1
// 说明	全部都感染

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout

})
const lines = []
rl.on('line', line => {
  lines.push(line)
  if (lines.length == 1) {
    const arr = lines[0].split(',').map(Number)
    const n = Math.sqrt(arr.length)
    const matrix = []
    for (let i = 0; i < arr.length; i++) {
      if (i % n === 0) {
        matrix.push(arr.slice(i, i + n))
      }

    }
    console.log(getResult(matrix, n));
    lines.length = 0
  }
})

function getResult(matrix, n) {
  let queue = []
  let day = 0
  let heathly = n * n
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == 1) {
        heathly--
        queue.push([i, j])
      }
    }
  }
  if (queue.length == 0) return -1
  else if (queue.length == Math.pow(n, 2)) return -1
  const offset = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]
  while (queue.length > 0 && heathly > 0) {
    const newQueue = []
    day++
    for (let [x, y] of queue) {
      for (let [offX, offY] of offset) {
        let newX = x + offX
        let newY = y + offY

        if (newX < 0 || newX >= n || newY < 0 || newY >= n) continue
        if (matrix[newX][newY] == 0) {
          matrix[newX][newY] = day
          heathly--
          newQueue.push([newX, newY])
        }
      }
    }
    queue = newQueue
  }
  return day
}

//------------------------
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void (async function () {
//   const nums = (await readline()).split(",").map(Number);
//   console.log(getResult(nums));
// })();

// function getResult(nums) {
//   // 题目说会输入n*n个值
//   const n = Math.sqrt(nums.length);

//   // 将一维arr输入转为二维矩阵matrix
//   const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));

//   // 将矩阵中所有感染区域位置记录到queue中,这里选择queue先进先出的原因是保证当天的感染区域并发扩散
//   let queue = [];

//   // 还原矩阵, 并记录感染区位置到queue中
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n; j++) {
//       matrix[i][j] = nums[i * n + j];

//       if (matrix[i][j] == 1) {
//         queue.push([i, j]);
//       }
//     }
//   }

//   // 全是感染区，或全是健康区
//   if (queue.length == 0 || queue.length == nums.length) {
//     return -1;
//   }

//   // 健康区个数
//   let healthy = nums.length - queue.length;

//   // 上下左右位置偏移量
//   const offsets = [
//     [-1, 0], // 上
//     [1, 0], // 下
//     [0, -1], // 左
//     [0, 1], // 右
//   ];

//   // day用于统计感染全部花费的时间
//   let day = 0;

//   // 如果健康区个数为0，说明感染完了
//   while (queue.length > 0 && healthy > 0) {
//     // size 表示当前层感染区数量
//     const size = queue.length;

//     // 遍历当前层的感染区位置, 并进行扩散
//     for (let i = 0; i < size; i++) {
//       // 当前层感染区位置
//       const [x, y] = queue.shift();

//       // 四个方向进行扩散
//       for (let [offsetX, offsetY] of offsets) {
//         const newX = x + offsetX;
//         const newY = y + offsetY;

//         if (
//           newX >= 0 &&
//           newX < n &&
//           newY >= 0 &&
//           newY < n &&
//           matrix[newX][newY] === 0
//         ) {
//           // 标记(newX, newY)已被感染
//           matrix[newX][newY] = 1; // 在入队前标记
//           // 健康区数量-1
//           healthy--;
//           // 新增感染区属于新层
//           queue.push([newX, newY]);
//         }
//       }
//     }

//     // 一层遍历完就是一天
//     day++;
//   }

//   return day;
// }