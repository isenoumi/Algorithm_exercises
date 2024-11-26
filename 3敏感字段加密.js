// 题目描述
// 给定一个由多个命令字组成的命令字符串：

// 字符串长度小于等于127字节，只包含大小写字母，数字，下划线和偶数个双引号；
// 命令字之间以一个或多个下划线 _ 进行分割；
// 可以通过两个双引号 "" 来标识包含下划线 _ 的命令字或空命令字（仅包含两个双引号的命令字），双引号不会在命令字内部出现；
// 请对指定索引的敏感字段进行加密，替换为******（6个*），并删除命令字前后多余的下划线_。

// 如果无法找到指定索引的命令字，输出字符串ERROR。

// 输入描述
// 输入为两行，第一行为命令字索引 K（从 0 开始），第二行为命令字符串 S。

// 输出描述
// 输出处理后的命令字符串，如果无法找到指定索引的命令字，输出字符串ERROR

// 用例
// 输入	1
// password__a12345678_timeout_100
// 输出	password_******_timeout_100
// 说明	无
// 输入	2
// aaa_password_"a12_45678"_timeout__100_""_
// 输出	aaa_password_******_timeout_100_""
// 说明	无


// 题目解析
// 本题只要考虑清楚一个问题就行：

// 什么样的 '_' 是命令字分隔符？

// 根据题意我们可以知道：

// 不在双引号内的 '_' 是命令字的分隔符

// 因此，我们遍历输入串s的每个字符c时：

// 若 c == '_'，且 c 不在双引号范围内，则此时 c 是命令字分隔符，可以截断命令字。
// 其余情况，c 都可以当成命令字的组成字符。
// 那么如何判断 '_' 是否在双引号范围内呢？

// 我们可以定义一个哨兵变量 isQuotaOpen，

// 若 isQuotaOpen == true，则说明当前双引号处于开启状态，后面遇到的字符都是双引号内部的。
// 若 isQuotaOpen == false，则说明当前双引号处于闭合状态，后面遇到的字符不在双引号内部
// 在我们遍历输入串 s 的过程中，每当遇到双引号字符，则对 isQuotaOpen 取反即可。

const rl = require('readline').createInterface({
  input: process.stdin
})
let iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value
void async function () {
  const num = parseInt(await readline())
  const str = await readline()
  const arrs = []
  let arr = []
  let flag = false
  str += '_'
  console.log(str);
  for (let i = 0; i < str.length; i++) {
    let v = str[i]
    if (v === '"') flag = !flag
    // if (v !== '_' && v !== '"') {
    //   arr.push(v)
    // } else if (v === '_' && flag === false && arr.length > 0) {
    //   arrs.push(arr.join(''))
    //   arr = []
    // }
    if (v != '_' || flag) {
      arr.push(v)
    } else if (arr.length > 0) {
      arrs.push(arr.join(''))
      arr = []
    }
  }

  console.log(arrs);
  if (num > arrs.length) console.log('ERROR');
  else {
    let res = ''
    arrs[num] = '******'
    console.log(arrs.join('_'));
  }
}()

//============================================
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void (async function () {
//   const k = parseInt(await readline());
//   const s = await readline();

//   console.log(solution(s, k));
// })();

// function solution(s, k) {
//   const commands = [];

//   // 双引号是否处于开启状态
//   let isQuataOpen = false;

//   // 避免收尾操作, s 尾部追加一个 '_' 不影响结果
//   s += "_";

//   let command = [];

//   for (let i = 0; i < s.length; i++) {
//     const c = s[i];

//     // 如果遇到双引号, 则先将 isQuotaOpen 取反
//     if (c == '"') {
//       isQuataOpen = !isQuataOpen;
//     }

//     if (c != "_" || isQuataOpen) {
//       // 如果遇到的 c 不是 '_' 或者是双引号里面的 '_', 则此时 c 不是命令字分隔符, 而是命令字一部分
//       command.push(c);
//     } else if (command.length > 0) {
//       // 如果 c 是命令字分隔符, 且 command 命令字不为空, 则命令字被截断
//       commands.push(command.join(""));
//       // 清空command, 用于下个命令字的收集
//       command.length = 0;
//     }
//   }

//   if (k >= commands.length) {
//     // 如果无法找到指定索引的命令字，输出字符串ERROR
//     return "ERROR";
//   } else {
//     // 对指定索引的敏感字段进行加密，替换为******（6个*），并删除命令字前后多余的下划线_
//     commands[k] = "******";
//     return commands.join("_");
//   }
// }