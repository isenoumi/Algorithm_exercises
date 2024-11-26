// 题目描述与示例
// 题目描述
// 所谓水仙花数，是指一个n位的正整数，其各位数字的n次方和等于该数本身。

// 例如153是水仙花数，153是一个3位数，并且153=1^3+5^3+3^3。

// 输入描述
// 第一行输入一个整数n，表示一个n位的正整数。n在3到7之间，包含3和7。

// 第二行输入一个整数m，表示需要返回第m个水仙花数。

// 输出描述
// 返回长度是n的第m个水仙花数。个数从0开始编号。

// 若m大于水仙花数的个数，返回最后一个水仙花数和m的乘积。

// 若输入不合法，返回-1。

// 示例一
// 输入
// 3
// 0
// 1
// 2
// 输出
// 153
// 1
// 说明
// 153是第一个水仙花数.

// 示例二
// 输入
// 9
// 1
// 1
// 2
// 输出
// -1
// 1
// 说明
// 9超出范围

// 解题思路
// 水仙花数的计算
// 对于特定的n位数num，我们可以通过以下函数来判断其是否为一个水仙花数。

// # 检查某个数字num是否为水仙花数的函数
// def check(num):
//     # 将num转化为字符串s
//     s = str(num)
//     # 计算位数n
//     n = len(s)
//     # 使用推导式计算各个数位的n次方的和，并与原先的num进行比较
//     # 如果相等则返回True说明num是一个水仙花数
//     return num == sum(int(ch) ** n for ch in s)
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 如果我们想要知道某个特定范围的水仙花数有哪些，则可以在循环中对这个范围的数字进行遍历，每一个数字都进行check()函数的检查。

// 譬如，如果我们想知道所有7位数的水仙花数有哪些，可以用如下的方式进行储存。

// ans = list()
// n = 7
// # 遍历所有的7位数
// for num in range(10**(n-1), 10**n):
//     # 如果num是水仙花数，则加入到ans中
//     if check(num):
//         ans.append(num)
// print(ans)
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 这样我们就可以计算得到所有的7位数的水仙花数为[1741725, 4210818, 9800817, 9926315]。

// 打表法输出
// n的取值范围为[3, 7]，这意味着最大的位数可能是7位数。

// 如果我们每一次计算水仙花数，都去遍历所有的7位数，那么时间复杂度为O(10^7)，必然超时。

// 很显然，对于某一个特定的n位数而言，其水仙花数是固定的。

// 所以我们可以使用打表法来完成这个题目。

// 所谓打表法，就是对一些已知的固定结果，进行预处理，而避免在题目中进行重复计算导致超时。

// 对于上述代码，我们只需要通过调整n，就可以分别知道3、4、5、6、7位数的水仙花数是哪些。即

// # 检查某个数字num是否为水仙花数的函数
// def check(num):
//     # 将num转化为字符串s
//     s = str(num)
//     # 计算位数n
//     n = len(s)
//     # 使用推导式计算各个数位的n次方的和，并与原先的num进行比较
//     # 如果相等则返回True说明num是一个水仙花数
//     return num == sum(int(ch) ** n for ch in s)

// # 遍历所有n位数
// for n in range(3, 8):
//     # 新建一个数组，储存n位数的水仙花数
//     ans = list()
//     # 遍历所有n位数
//     for num in range(10**(n-1), 10**n):
//         # 如果num是水仙花数，则储存在ans中
//         if check(num):
//             ans.append(num)
//     # 打印所有n位的水仙花数
//     print(ans)

// # 打印结果为
// # [153, 370, 371, 407]
// # [1634, 8208, 9474]
// # [54748, 92727, 93084]
// # [548834]
// # [1741725, 4210818, 9800817, 9926315]
// # 分别是所有的3-7位的水仙花数
// # 将这里的输出结果储存在后续的res哈希表中
// 我们把这些结果储存在一个哈希表res中。

// res = {
//     3: [153, 370, 371, 407],
//     4: [1634, 8208, 9474],
//     5: [54748, 92727, 93084],
//     6: [548834],
//     7: [1741725, 4210818, 9800817, 9926315]
// }

// 剩下的内容就非常简单了。首先需要判断输入是否存在违法数据，使用try-except语句来完成。

// # 在try中进行输入
// try:
//     n = int(input())
//     m = int(input())
//     # 如果m小于len(res[n])，说明是在编号内水仙花数，输出该数字
//     if m < len(res[n]):
//         print(res[n][m])
//     # 否则，说明编号m已经越界，输出最后一个n位水仙花数和m的乘积
//     else:
//         print(res[n][-1] * m)
// # 如果在try中出现了任何错误，则直接输出-1
// except:
//     print(-1)

//
const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void(async function () {
  var n = (await readline())
  var m = (await readline())
  if (n < 3 || n > 7 || m < 0) {
    console.log(-1)
    return
  }
  const arr = check(n)
  if (m < arr.length) {
    console.log(arr[m])
  } else {
    console.log(arr[arr.length - 1] * m)
  }


})()

function check(n) {
  const arr = []
  for (let i = Math.pow(10, parseInt(n - 1)); i < Math.pow(10, parseInt(n)); i++) {
    let str = i.toString()
    let res = 0
    str.split('').forEach(item => {
      res += Math.pow(parseInt(item), n)
    })

    if (i == res) {
      arr.push(res)
    }
  }
  return arr
}

//=========================
// const readline = require("readline");

// // 创建读取接口
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // 水仙花数打表
// const res = {
//     3: [153, 370, 371, 407],
//     4: [1634, 8208, 9474],
//     5: [54748, 92727, 93084],
//     6: [548834],
//     7: [1741725, 4210818, 9800817, 9926315]
// };

// // 读取输入
// let inputs = [];
// rl.on("line", (input) => {
//     inputs.push(parseInt(input));
//     if (inputs.length === 2) {
//         const n = inputs[0];
//         const m = inputs[1];
//         try {
//             if (res[n] && m < res[n].length) {
//                 // 如果编号 m 在范围内，输出对应的水仙花数
//                 console.log(res[n][m]);
//             } else if (res[n]) {
//                 // 如果编号 m 越界，输出最后一个水仙花数和 m 的乘积
//                 console.log(res[n][res[n].length - 1] * m);
//             } else {
//                 // 如果 n 不在打表范围内，输出 -1
//                 console.log(-1);
//             }
//         } catch (e) {
//             console.log(-1);
//         }
//         rl.close();
//     }
// });