// 题目描述与示例
// 题目描述
// 小王设计了一个简单的猜字谜游戏，游戏的谜面是一个错误的单词，比如nesw，玩家需要猜出谜底库中正确的单词。猜中的要求如下：

// 对于某个谜面和谜底单词，满足下面任一条件都表示猜中：

// 变换顺序以后一样的，比如通过变换w和e的顺序，"nwes"跟"news"是可以完全对应的；
// 字母去重以后是一样的，比如"woood"和"wood"是一样的，它们去重后都是"wod"
// 请你写一个程序帮忙在谜底库中找到正确的谜底。谜面是多个单词，都需要找到对应的谜底，如果找不到的话，返回"not found"

// 输入描述
// 谜面单词列表，以","分隔
// 谜底库单词列表，以","分隔
// 输出描述
// 匹配到的正确单词列表，以","分隔
// 如果找不到，返回"not found"
// 备注
// 单词的数量N的范围：0 < N < 1000
// 词汇表的数量M的范围：0 < M < 1000
// 单词的长度P的范围：0 < P < 20
// 输入的字符只有小写英文字母，没有其他字符
// 示例一
// 输入
// conection
// connection,today
// 1
// 2
// 输出
// connection
// 1
// 示例二
// 输入
// bdni,wooood
// bind,wrong,wood
// 1
// 2
// 输出
// bind,wood
// 1
// 解题思路
// 谜面和谜底如何匹配
// 首先考虑谜面单词变量riddle和谜底单词变量answer如何进行匹配。

// 谜面和谜底的匹配必须遵循两个条件

// 两个单词均自身去重
// 两个单词去重后的所有字母出现次数均相等
// 第二点也可以换另一种表述，即两个单词去重后再进行排序后的结果完全相等。

// 因此我们可以构造出这样一个函数check()，来检查某个riddle和某个answer是否一致

// def check(riddle, answer):
//     r = "".join(sorted(set(riddle)))
//     a = "".join(sorted(set(answer)))
//     return r == a
// 1
// 2
// 3
// 4
// 显然，set()在此处去到去重的作用。我们对去重后的结果进行排序得到列表，再合并为字符串得到r和a。

// 通过比较r和a是否完全一致，来判断answer是否为riddle的谜底。

// 这个函数的时间复杂度为O(RlogR+AlogA)，其中R和A分别为riddle和answer的长度。

// 暴力匹配所有谜底
// 输入的第一行是若干的谜面，输入的第二行是若干谜底。

// 显然，对于任意一个谜面riddle，我们希望它能够跟每一个谜底answer进行比较，以找到匹配的那个谜底。

// 这种直观的穷举的写法如下

// riddles = input().split(",")
// answers = input().split(",")

// res = list()

// # 遍历每一个谜面单词riddle
// for riddle in riddles:
//     # 先假设riddle找不到谜底，设置一个flag为False
//     flag = False
//     # 遍历所有谜底answer
//     for answer in answers:
//         # 如果匹配，则将answer加入res
//         # 且标记flag为True，表示找到了谜底
//         # 同时退出循环
//         if check(riddle, answer):
//             res.append(answer)
//             flag = True
//             break
//     # 如果上述内层循环结束后，仍然没有找到谜底，则
//     # 往res中加入"not found"
//     if not flag:
//         res.append("not found")

// print(",".join(res))
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 这种写法使用了双重for循环的写法，如果谜面和谜底数组的长度分别为n和m，在每一次循环中我们都要调用check()函数，那么总时间复杂度就为O(nm(RlogR+AlogA))。

// 谜底库哈希表的构建
// 考虑到n和m的最大值均为1000，而R和A的最大值为20。

// O(nm(RlogR+AlogA))的最大值可以到大约O(10^8)，所以上述做法很可能会超时。

// 需要考虑时间复杂度更加优秀的解法。

// 很容易发现，即使对于不同的谜面riddle，实际上匹配的都是同一个谜底库answers。

// 假设有两个不同的谜面riddle1和riddle2，对同一个谜底answer进行匹配操作check，那么answer的去重和排序操作需要重复进行两遍。

// 显然这里的重复操作是冗余的。

// 容易想到，我们可以对谜底库answers进行预处理，构建一个用哈希表表示的谜底库answers_dic。

// answers_dic = dict()
// for answer in answers:
//     a = "".join(sorted(set(answer)))
//     answers_dic[a] = answer
// 1
// 2
// 3
// 4
// 其中，谜底库answers_dic的key是每一个answer去重再排序后的结果a，而value是谜底answer本身。

// 构建这样谜底库的好处是，对于任意一个谜面riddle，我们都可以通过其去重后排序的结果r，来迅速定位到谜底库中是否存在对应的谜底。

// 换句话说，对于特定的谜面riddle，我们可以用排序后的结果r和a来作为桥梁，迅速找到谜底answer。

// 因此，对应的代码如下

// for riddle in riddles:
//     r = "".join(sorted(set(riddle)))
//     if r in answers_dic:
//         res.append(answers_dic[r])
//     else:
//         res.append("not found")

// 甚至无需构建check()函数，在代码层面上也更加简洁。

// 该种解法的总时间复杂度为O(nRlogR+mAlogA)。

// 其中O(mAlogA)是构建谜底库answers_dic的开销，O(nRlogR)是上述遍历过程的开销。

// const rl = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })
// var iter = rl[Symbol.asyncIterator]()
// const readline = async () => (await iter.next()).value

// void async function () {
//   let riddles = (await readline()).split(',')
//   let answer = (await readline()).split(',')
//   let riddles_set = []
//   let answer_set = []
//   riddles.forEach(v => {

//     riddles_set.push([...new Set([...v])].sort().join(''))
//   });
//   answer.forEach(v => {
//     answer_set.push([...new Set([...v])].sort().join(''))
//   });
//   const result = []
//   answer_set.forEach((v, i) => {
//     riddles_set.forEach(vv => {
//       if (v === vv) {
//         result.push(answer[i])
//       }
//     })
//   })
//   console.log(result.length > 0 ? result.join(',') : 'not found');
// }()

//-------------------------------------------
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
var iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value

void async function () {
  let riddles = (await readline()).split(',')
  let answer = (await readline()).split(',')
  let riddles_set = []
  let answer_Dic = {}
  answer.forEach(v => {
    let a = [...new Set([...v])].sort().join('')
    answer_Dic[a] = v
  });
  const result = []
  riddles.forEach(v => {
    let r = [...new Set([...v])].sort().join('')
    if (answer_Dic[r]) {
      result.push(answer_Dic[r])
    }
  });


  console.log(result.length > 0 ? result.join(',') : 'not found');
}()

//----------------------------------------
// const readline = require("readline");

// // 创建接口用于读取输入
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // 读取输入并解析
// rl.question('', (input1) => {
//     rl.question('', (input2) => {
//         const riddles = input1.trim().split(",");
//         const answers = input2.trim().split(",");
//         const res = [];

//         // 构建谜底库answers_dic，其中key为每个谜底去重并排序的结果，value为谜底本身
//         const answersDic = {};
//         answers.forEach(answer => {
//             const a = [...new Set(answer)].sort().join("");
//             answersDic[a] = answer;
//         });

//         // 遍历每个谜面
//         riddles.forEach(riddle => {
//             // 对谜面去重并排序
//             const r = [...new Set(riddle)].sort().join("");
//             // 检查r是否在谜底库中
//             if (answersDic[r]) {
//                 res.push(answersDic[r]);
//             } else {
//                 res.push("not found");
//             }
//         });

//         // 输出结果
//         console.log(res.join(","));
//         rl.close();
//     });
// });

//----------------------------------------------
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void (async function () {
//   const issues = (await readline()).split(",");
//   const answers = (await readline()).split(",");

//   const ans = [];

//   for (let issue of issues) {
//     const s1 = [...new Set([...issue])].sort().join("");
//     let isNotFind = true;

//     for (let answer of answers) {
//       const s2 = [...new Set([...answer])].sort().join("");

//       if (s1 == s2) {
//         isNotFind = false;
//         ans.push(answer);
//       }
//     }

//     if (isNotFind) {
//       ans.push("not found");
//     }
//   }

//   console.log(ans.join(","));
// })();