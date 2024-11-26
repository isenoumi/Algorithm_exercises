// 题目描述
// 给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，并用‘-’分隔。
// 对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；
// 反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换。

// 输入描述
// 输入为两行，第一行为参数K，第二行为字符串S。

// 输出描述
// 输出转换后的字符串。

// 用例
// 输入	3
// 12abc-abCABc-4aB@
// 输出	12abc-abc-ABC-4aB-@
// 说明	
// 子串为12abc、abCABc、4aB@，第一个子串保留，

// 后面的子串每3个字符一组为abC、ABc、4aB、@，

// abC中小写字母较多，转换为abc，

// ABc中大写字母较多，转换为ABC，

// 4aB中大小写字母都为1个，不做转换，

// @中没有字母，连起来即12abc-abc-ABC-4aB-@

// 输入	12
// 12abc-abCABc-4aB@
// 输出	12abc-abCABc4aB@
// 说明	
// 子串为12abc、abCABc、4aB@，第一个子串保留，

// 后面的子串每12个字符一组为abCABc4aB@，

// 这个子串中大小写字母都为4个，不做转换，

// 连起来即12abc-abCABc4aB@

// 题目解析
// 此题应该就是考察字符串的操作能力的，只要熟练掌握字符串操作即可。

// 本题比较困惑的是，第一个子串是否要做大小写转换？看用例说明的意思，应该是不用做的。

// 下面代码中，我把大小写转换抽出成一个方法，考试时可以根据自行使用。

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void(async function () {
  let k = parseInt(await readline())
  let s = await readline()
  const arr = s.split('-')
  let str = ''
  let str_temp = ''
  const str_arr = [arr[0]]
  arr.map((v, i) => {
    if (i > 0) {
      str += v
    }
  })
  for (let i = 0; i < str.length; i += k) {
    str_arr.push(change(str.slice(i, i + k)))
  }
  console.log(str_arr.join('-'));
})();

function change(str) {
  let ups = 0
  let lows = 0
  for (let s of str) {
    if (s >= 'A' && s <= 'Z') ups++
    else if (s >= 'a' && s <= 'z') lows++

  }
  if (ups > lows) str = str.toUpperCase()
  else if (ups < lows) str = str.toLowerCase()

  return str
}

//-----------------------------------
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
//     let k = parseInt(lines[0]);
//     let s = lines[1];
//     console.log(getResult(s, k));
//     lines.length = 0;
//   }
// });

// function getResult(s, k) {
//   const arr = s.split("-");

//   const ans = [];
//   // ans.push(convert(arr[0]));// 看用例说明，对应第一个子串是不需要做大小写转换的，但是也拿不准，考试时可以都试下
//   ans.push(arr[0]);

//   // 剩余子串重新合并为一个新字符串，每k个字符一组
//   const newStr = arr.slice(1).join("");
//   for (let i = 0; i < newStr.length; i += k) {

//     // 子串中小写字母居多，则整体转为小写字母，大写字母居多，则整体转为大写字母
//     ans.push(convert(subStr));
//   }

//   return ans.join("-");
// }

// function convert(s) {
//   let lowerCount = 0;
//   let upperCount = 0;

//   for (let i = 0; i < s.length; i++) {
//     if (s[i] >= "a" && s[i] <= "z") lowerCount++;
//     else if (s[i] >= "A" && s[i] <= "Z") upperCount++;
//   }

//   if (lowerCount > upperCount) return s.toLowerCase();
//   else if (lowerCount < upperCount) return s.toUpperCase();
//   else return s;
// }