// 题目描述
// 给定一个字符串，只包含大写字母，求在包含同一字母的子串中，长度第 k 长的子串的长度，相同字母只取最长的那个子串。

// 输入描述
// 第一行有一个子串(1<长度<=100)，只包含大写字母。

// 第二行为 k的值

// 输出描述
// 输出连续出现次数第k多的字母的次数。

// 用例
// 输入	
// AAAAHHHBBCDHHHH
// 3

// 输出	2
// 说明	
// 同一字母连续出现的最多的是A和H，四次；

// 第二多的是H，3次，但是H已经存在4个连续的，故不考虑；

// 下个最长子串是BB，所以最终答案应该输出2。

// 输入	
// AABAAA
// 2

// 输出	1
// 说明	
// 同一字母连续出现的最多的是A，三次；

// 第二多的还是A，两次，但A已经存在最大连续次数三次，故不考虑；

// 下个最长子串是B，所以输出1。

// 输入	ABC
// 4
// 输出	-1
// 说明	只含有3个包含同一字母的子串，小于k，输出-1
// 输入	ABC
// 2
// 输出	1
// 说明	三个子串长度均为1，所以此时k = 1，k=2，k=3这三种情况均输出1。特此说明，避免歧义。
// 题目解析
// 本题第一个用例感觉也有歧义。

// 用例1，要求“AAAAHHHBBCDHHHH”中  重复度第3大的子串。其中：

// 重复度第1大子串是：AAAA和HHHH
// 重复度第2大子串是：HHH，由于字母H已经有了更大的重复度，因此HHH子串不计入比较
// 接下来是，实际上的第3大，名义上的第2大子串：BB

// 而用例1输出的第k=3大重复度的子串的长度是2，那就肯定是指BB子串。即要求“实际”第k大？而不是“名义”第k大？

// 但是用例2，要求“AABAAA”中，重复度第2大的子串。其中：

// 重复度第1大子串是：AAA
// 重复度第2大子串是：AA，由于字母A已经有了更大的重复度，因此HHH子串不计入比较
// 接下来是，实际上的第3大，名义上的第2大子串：B

// 而用例1输出的第k=2大重复度的子串的长度是1，这里又是取名义上第k大了？

// 或者本题还有另一种思路，那就是第k大，就是单纯按重复度降序后的第k个。

// 比如用例1： A:4，H:4，B:2，C:1，D:1

// 这里第k=3大，那就是B，子串长度为2

// 比如用例2：A:3，B:1

// 这里第k=2大，那就是B，子串长度为1

// 下面代码就是按照这个思路实现的。


const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void(async function () {
  const arr = (await readline()).split('');
  const num = parseInt(await readline());
  const dict = {}
  let n = 0
  for (let i = 0; i < arr.length; i++) {
    n++
    if (i != 0 && arr[i] != arr[i + 1]) {
      if (dict[arr[i]]) {
        if (dict[arr[i]] < n) {
          dict[arr[i]] = n
        }
      } else {
        dict[arr[i]] = n
      }
      n = 0
    }

  }
  let dict_arr = []
  for (let s in dict) {
    dict_arr.push(dict[s])
  }
  dict_arr.sort((a, b) => b - a)

  if (num > dict_arr.length) {
    console.log(-1);
  } else {
    console.log(dict_arr[num - 1]);
  }


})();

// =---------------
/* JavaScript Node ACM模式 控制台输入获取 */
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const lines = [];
// rl.on("line", (line) => {
//   lines.push(line);

//   if (lines.length === 2) {
//     console.log(getResult(lines[0], lines[1]));
//     lines.length = 0;
//   }
// });

// /* 算法逻辑 */
// function getResult(s, k) {
//   if (k <= 0) return -1;

//   s += "0";

//   let count = {};

//   let b = s[0];
//   let len = 1;

//   for (let i = 1; i < s.length; i++) {
//     const c = s[i];

//     if (b == c) {
//       len++;
//     } else {
//       if (count[b] == undefined || count[b] < len) {
//         count[b] = len;
//       }
//       len = 1;
//       b = c;
//     }
//   }

//   const arr = Object.values(count);

//   if (k > arr.length) {
//     return -1;
//   } else {
//     arr.sort((a, b) => b - a);
//     return arr[k - 1];
//   }
// }