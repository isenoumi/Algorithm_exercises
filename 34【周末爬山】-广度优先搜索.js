// 题目描述
// 周末小明准备去爬山锻炼，0代表平地，山的高度使用1到9来表示，小明每次爬山或下山高度只能相差k及k以内，每次只能上下左右一个方向上移动一格，小明从左上角(0,0)位置出发

// 输入描述
// 第一行输入m n k(空格分隔)

// 代表m*n的二维山地图，k为小明每次爬山或下山高度差的最大值，
// 然后接下来输入山地图，一共m行n列，均以空格分隔。取值范围：

// 0 < m ≤ 500
// 0< n ≤ 500
// 0 < k < 5
// 输出描述
// 请问小明能爬到的最高峰多高，到该最高峰的最短步数，输出以空格分隔。

// 同高度的山峰输出较短步数。

// 如果没有可以爬的山峰，则高度和步数都返回0。

// 备注
// 所有用例输入均为正确格式，且在取值范围内，考生不需要考虑不合法的输入格式。

// 用例
// 输入	5 4 1
// 0 1 2 0
// 1 0 0 0
// 1 0 1 2
// 1 3 1 0
// 0 0 0 9
// 输出	2 2
// 说明	根据山地图可知，能爬到的最高峰在(0,2)位置，高度为2，最短路径为(0,0)-(0,1)-(0,2)，最短步数为2。
// 输入	5 4 3
// 0 0 0 0
// 0 0 0 0
// 0 9 0 0
// 0 0 0 0
// 0 0 0 9
// 输出	0 0
// 说明	根据山地图可知，每次爬山距离3，无法爬到山峰上，步数为0。
// 题目解析
// 本题可以使用广度优先搜索进行解题。

// 初始时，小明位于(0, 0)位置，此时走的步数step = 0，假设地图为matrix，则到高度matrix[0][0]的最短步数为step=0。

// 我们可以假设，爬山的最大高度为maxHeight，到达此高度的最小步数为minStep，则初始时，maxHeight = maxtrix[0][0]，minStep = 0。

// 对于任意当前位置(x, y)，假设其下一步位置是(newX, newY)

// 本题需要注意的是：向四个方向进行深搜时，需要注意当前位置的高度值，和下一个位置的高度值，之间的差值需要小于等于k，才能进入下一个位置继续广搜。

// 如果可以进入下一步，则step++，假设(newX, newY)位置的山高度为curHeight, 则：

// 如果 curHeight > maxHeight 的话，则爬到了更高的山，此时直接更新 maxHeight = curHeight，minStep = step；
// 如果 curHeight == maxHeight 的话，则需要继续比较step和minStep，我们需要保留step和minStep中较小步数作为 maxHeight（==curHeight）山高度的步数。
// 如果 curHeight < maxHeight 的话，则无需处理
// 在广搜过程，为了避免走回头路，我们应该记录走过的节点，我们可以定义一个visited数组来标记走过的路。

// 2023.11.2

// 输出描述中说：如果没有可以爬的山峰，则高度和步数都返回0。

// 其中“没有可以爬的山峰”，结合用例2来理解的话，应该是没有可爬的更高的山峰。即当只有可爬平级的山峰，也要高度和步数都返回0。

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void(async function () {
  // Write your code here
  const [m, n, k] = (await readline()).split(" ").map(Number);

  const matrix = [];
  for (let i = 0; i < m; i++) {
    matrix.push((await readline()).split(" ").map(Number));
  }
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]

  let maxHeight = matrix[0][0]
  let minStep = 0
  bfs()
  if (minStep == 0) {
    console.log('0 0');
  } else {
    console.log(`${maxHeight} ${minStep}`);
  }

  function bfs() {
    let queue = []
    const visited = new Array(m).fill(0).map(() => new Array(n).fill(false))
    queue.push([0, 0])
    visited[0][0] = true
    let step = 0
    while (queue.length > 0) {
      const newQueue = []
      step++
      for (let [x, y] of queue) {
        for (let [offsetX, offsetY] of offsets) {
          const newX = x + offsetX
          const newY = y + offsetY
          if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue
          if (visited[newX][newY]) continue
          const curHeight = matrix[newX][newY]
          if (Math.abs(curHeight - matrix[x][y]) <= k) {
            visited[newX][newY] = true
            if (curHeight > maxHeight || (curHeight == maxHeight && step < minStep)) {
              minStep = step
              maxHeight = curHeight
            }
            newQueue.push([newX, newY])
          }
        }
      }
      queue = newQueue
    }
  }
})()

//-------------------------------
// const rl = require("readline").createInterface({
//   input: process.stdin
// });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void(async function () {
//   // Write your code here
//   const [m, n, k] = (await readline()).split(" ").map(Number);

//   const matrix = [];
//   for (let i = 0; i < m; i++) {
//     matrix.push((await readline()).split(" ").map(Number));
//   }

//   const offsets = [
//     [-1, 0],
//     [1, 0],
//     [0, -1],
//     [0, 1],
//   ];

//   // 到达matrix[0][0]高度的山峰，最短步数是0
//   let maxHeight = matrix[0][0];
//   let minStep = 0;

//   // 广搜
//   bfs();

//   if (minStep == 0) {
//     // 输出描述：如果没有可以爬的山峰，则高度和步数都返回0。
//     console.log("0 0");
//   } else {
//     console.log(maxHeight + " " + minStep);
//   }

//   function bfs() {
//     // 广搜队列
//     let queue = [];
//     // 访问记录
//     const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

//     // 首先是(0,0)位置进入队列，且被标记为访问过
//     queue.push([0, 0]);
//     visited[0][0] = true;

//     // 此时消耗步数为0
//     let step = 0;

//     while (queue.length > 0) {
//       // 这里没有用queue.removeFirst来控制广搜，而是使用newQueue来控制广搜，因为这样更方便操作step
//       const newQueue = [];
//       step++;

//       // 遍历同一层的所有节点
//       for (let [x, y] of queue) {
//         const lastHeight = matrix[x][y];

//         // 四个方向位置
//         for (let [offsetX, offsetY] of offsets) {
//           const newX = x + offsetX;
//           const newY = y + offsetY;

//           // 新位置越界则无法继续广搜
//           if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;

//           // 新位置已访问过，则无需重复广搜
//           if (visited[newX][newY]) continue;

//           const curHeight = matrix[newX][newY];

//           // 前后位置高度差在k以内, 则可以进入新位置
//           if (Math.abs(curHeight - lastHeight) <= k) {
//             // 标记新位置已访问
//             visited[newX][newY] = true;

//             // 如果此时到达新位置高度的步数step更小，则更新对应高度的最小步数
//             if (
//               curHeight > maxHeight ||
//               (curHeight == maxHeight && step < minStep)
//             ) {
//               maxHeight = curHeight;
//               minStep = step;
//             }

//             // 新位置加入下一层广搜队列
//             newQueue.push([newX, newY]);
//           }
//         }
//       }

//       queue = newQueue;

//     }
//   }
// })();