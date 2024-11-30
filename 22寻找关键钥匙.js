// 题目描述与示例
// 题目描述
// 小强正在参加《密室逃生》游戏，当前关卡要求找到符合给定密码 K（升序的不重复小写字母组成）的箱子，并给出箱子编号，箱子编号为 1~N。

// 每个箱子中都有一个字符串 s，字符串由大写字母，小写字母，数字，标点符号，空格组成，需要在这些字符串中找出所有的字母，忽略大小写且去重后排列出对应的密码串，并返回匹配密码的箱子序号。

// 注意：满足条件的箱子不超过 1 个。

// 输入描述
// 第一行为表示密码 K 的字符串

// 第二行为一系列箱子 boxes，为字符串数组样式，以空格分隔

// 箱子 N 数量满足 1<=N<=10000，代表每一个箱子的字符串 s 的长度满足 0 <= s.length <= 50，密码为仅包含小写字母的升序字符串，且不存在重复字母，密码 K 长度满足1 <= K.length <= 26

// 输出描述
// 返回对应箱子编号，如不存在符合要求的密码箱，则返回-1

// 补充说明
// 箱子中字符拼出的字符串与密码的匹配忽略大小写，且要求与密码完全匹配，如密码 abc 匹配 aBc，但是密码 abc 不匹配 abcd

// 示例 1
// 输入
// abc
// s,sdf134 A2c4b
// 输出
// 说明
// 第 2 个箱子中的 Abc，符合密码 abc

// 示例 2
// 输入
// abc
// s,sdf134 A2c4bd 523[]
// 输出
// -1
// 说明
// 第 2 个箱子中的 Abcd，与密码不完全匹配，不符合要求。

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value
void async function () {
  const key = (await readline()).toLowerCase()

  const arr = (await readline()).split(' ')
  let hash = {}
  for (let i = 0; i < arr.length; i++) {
    hash[toString(arr[i])] = i + 1

  }
  console.log(hash[key] ? hash[key] : -1);

}()

function toString(str) {
  str = str.toLowerCase()
  let s = []
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= 'a' && str[i] <= 'z') {
      s.push(str[i])
    }
  }

  return [...new Set(s)].sort().join('')
}

//===========================================
// const readline = require('readline');

// // 读取输入
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let inputLines = [];
// rl.on('line', (line) => {
//   inputLines.push(line);
//   if (inputLines.length === 2) {
//     rl.close();
//   }
// });

// rl.on('close', () => {
//   const K = inputLines[0]; // 密码字符串K
//   const boxes = inputLines[1].split(' '); // 箱子字符串数组boxes

//   const K_set = new Set([...K.toLowerCase()]); // 密码字符串的集合
//   let ans = -1;

//   for (let i = 0; i < boxes.length; i++) {
//     const box = boxes[i];
//     const box_set = new Set(
//       [...box].filter((ch) => /[a-zA-Z]/.test(ch)).map((ch) => ch.toLowerCase())
//     );

//     if (eqSet(K_set, box_set)) {
//       ans = i + 1; // 箱子编号从1开始
//       break;
//     }
//   }

//   console.log(ans);

//   // 比较两个集合是否相等的辅助函数
//   function eqSet(a, b) {
//     if (a.size !== b.size) return false;
//     for (const val of a) {
//       if (!b.has(val)) return false;
//     }
//     return true;
//   }
// });