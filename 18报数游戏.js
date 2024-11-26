// 题目描述
// 100个人围成一圈，每个人有一个编码，编号从1开始到100。

// 他们从1开始依次报数，报到为M的人自动退出圈圈，然后下一个人接着从1开始报数，直到剩余的人数小于M。

// 请问最后剩余的人在原先的编号为多少？

// 输入描述
// 输入一个整数参数 M

// 输出描述
// 如果输入参数M小于等于1或者大于等于100，输出“ERROR!”；

// 否则按照原先的编号从小到大的顺序，以英文逗号分割输出编号字符串

// 用例
// 输入	3
// 输出	58,91
// 说明	输入M为3，最后剩下两个人。
// 输入	4
// 输出	34,45,97
// 说明	输入M为4，最后剩下三个人。
// 题目解析
// 本题是经典的约瑟夫环问题，约瑟夫环主要是模拟环，这里的环可以使用循环链表，双端队列模拟，也可以基于数组结构，使用特定逻辑模拟环向运动。

// 但是最简单最通用的还是使用双端队列。

// 循环链表
// const rl = require("readline").createInterface({
//   input: process.stdin
// });
// const lines = []
// rl.on('line', line => {
//   lines.push(line)
//   const n = lines[0]

//   console.log(baoshu(n));
//   lines.length = 0

// })

// function create_node(value) {
//   return {
//     value,
//     next: ''
//   }
// }

// function baoshu(n) {
//   if (n <= 1 || n >= 100) {
//     return 'ERROR'
//   }
//   let total = 100
//   let head = create_node(1)
//   let node = head
//   for (let i = 2; i <= total; i++) {
//     node.next = create_node(i)
//     node = node.next
//   }
//   node.next = head
//   node = head
//   while (total >= n) {
//     for (let i = 1; i <= n - 1; i++) {
//       if (i == n - 1) {
//         node.next = node.next.next
//         total--
//       }
//       node = node.next
//     }
//   }
//   const result = []
//   for (let i = 0; i < n - 1; i++) {
//     result.push(node.value)
//     node = node.next
//   }
//   return result.sort().join(',')
// }

//------------双端队列----------

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void(async function () {
  const m = parseInt(await readline());

  // 如果输入参数M小于等于1或者大于等于100，输出“ERROR!”
  if (m <= 1 || m >= 100) {
    console.log("ERROR!");
    return;
  }

  // 使用数组模拟双端队列, 使用双端队列模拟约瑟夫环
  const queue = new Array(100).fill(0).map((_, i) => i + 1);

  let num = 1;
  while (queue.length >= m) {
    // 编号id的人报数num
    const id = queue.shift();

    if (num == m) {
      num = 1;
    } else {
      num++;
      queue.push(id);
    }
  }

  console.log(queue.sort((a, b) => a - b).join(","));
})();