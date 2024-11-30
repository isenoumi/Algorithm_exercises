// 题目描述
// C 语言有一个库函数： char *strstr(const char *haystack, const char *needle) ，实现在字符串 haystack 中查找第一次出现字符串 needle 的位置，如果未找到则返回 null。

// 现要求实现一个strstr的增强函数，可以使用带可选段的字符串来模糊查询，与strstr一样返回首次查找到的字符串位置。

// 可选段使用“[]”标识，表示该位置是可选段中任意一个字符即可满足匹配条件。比如“a[bc]”表示可以匹配“ab”或“ac”。

// 注意目标字符串中可选段可能出现多次。

// 输入描述
// 与strstr函数一样，输入参数是两个字符串指针，分别是源字符串和目标字符串。

// 输出描述
// 与strstr函数不同，返回的是源字符串中，匹配子字符串相对于源字符串地址的偏移（从0开始算），如果没有匹配返回-1。

// 补充说明：源字符串中必定不包含‘[]’；目标字符串中‘[]’必定成对出现，且不会出现嵌套。

// 输入的字符串长度在[1,100]之间。

// 用例
// 输入	abcd
// b[cd]
// 输出	1
// 说明	相当于是在源字符串中查找bc或者bd，bc子字符串相对于abcd的偏移是1
// 题目解析
// 本题最简单的解题策略是套皮正则表达式。

// 即将第二行输入的目标串直接当成正则表达式使用，因为其中[]的逻辑，刚好就是正则表达式“字符组”的功能。

// 根据考友反馈，本题输入的目标字符串中可能存在其他正则元字符，因此套皮正则表达式解法的结果可能会受到影响，实际考试套皮正则表达式可以拿95%通过率。

// 本题可以使用另一种比较稳健的解法，即将目标串分层，比如目标串 b[cd]，相当于两层：

// 第一层可选字符是：b
// 第二层可选字符是：cd
// 然后利用滑窗，滑窗长度就是目标串的层数，去在源字符串中滑动匹配，比如

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const lines = []
rl.on('line', line => {
  lines.push(line)
  if (lines.length === 2) {
    const goat_str = lines[0]
    const str = lines[1]
    const levels = []
    let level = new Set()
    let is_open = false
    for (let c of str) {
      if (c == '[') {
        is_open = true
      } else if (c == ']') {
        is_open = false
        levels.push(level)
        level = new Set()
      } else if (is_open) {
        level.add(c)
      } else {
        levels.push(new Set([c]))
      }
    }
    console.log(check(goat_str, levels));
    lines.length = 0;
  }

})

function check(goat_str, levels) {
  for (let i = 0; i <= goat_str.length - levels.length; i++) {
    let j = 0
    for (; j < levels.length; j++) {
      if (!levels[j].has(goat_str[i + j])) {
        break
      }
    }
    if (j == levels.length) {
      return i
    }
  }

  return -1
}

//-------------------------------------
// const rl = require("readline").createInterface({
//   input: process.stdin
// });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void(async function () {
//   const src = await readline();
//   const tar = await readline();

//   // 将tar字符串转化为levels多层结构，转化逻辑为：tar字符串中，每个[]包含的所有字符作为一层，未被[]包含的单个字符作为一层
//   const levels = [];
//   // level用于记录[]中的字符
//   let level = new Set();

//   let isOpen = false;
//   for (let c of tar) {
//     if (c == "[") {
//       isOpen = true;
//     } else if (c == "]") {
//       isOpen = false;
//       levels.push(level);
//       level = new Set();
//     } else if (isOpen) {
//       level.add(c);
//     } else {
//       levels.push(new Set([c]));
//     }
//   }

//   console.log(indexOf(src, levels));
// })();

// function indexOf(src, levels) {
//   // 滑动匹配levels.length长度的子串
//   for (let i = 0; i <= src.length - levels.length; i++) {
//     let j = 0;
//     for (; j < levels.length; j++) {
//       if (!levels[j].has(src[i + j])) {
//         break;
//       }
//     }

//     if (j == levels.length) {
//       return i;
//     }
//   }

//   return -1;
// }