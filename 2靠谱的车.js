// 题目描述
// 程序员小明打了一辆出租车去上班。出于职业敏感，他注意到这辆出租车的计费表有点问题，总是偏大。

// 出租车司机解释说他不喜欢数字4，所以改装了计费表，任何数字位置遇到数字4就直接跳过，其余功能都正常。

// 比如：

// 23再多一块钱就变为25；
// 39再多一块钱变为50；
// 399再多一块钱变为500；
// 小明识破了司机的伎俩，准备利用自己的学识打败司机的阴谋。

// 给出计费表的表面读数，返回实际产生的费用。

// 输入描述
// 只有一行，数字N，表示里程表的读数。

// (1<=N<=888888888)。

// 输出描述
// 一个数字，表示实际产生的费用。以回车结束。

// 用例
// 输入	5
// 输出	4
// 说明	
// 5表示计费表的表面读数。

// 4表示实际产生的费用其实只有4块钱。

// 输入	17
// 输出	15
// 说明	
// 17表示计费表的表面读数。

// 15表示实际产生的费用其实只有15块钱。

// 输入	100
// 输出	81
// 说明	
// 100表示计费表的表面读数。

// 81表示实际产生的费用其实只有81块钱。

// 题目解析
// 看到题目提示输入数字N的取值范围1<=N<=888888888，我陷入了沉思，这是要我们设计一个O(1)时间复杂度的算法呀，因为就算是O(n)也遭不住9个8的数量级啊。

// 原型题应该是：算法 - 里程表故障_某辆车的里程表出现了故障:它总是跳过数字3和数字8。也就是说,当前显示已走过两公-CSDN博客

// 本题的解题思路类似，但是不是八进制，而是九进制



// 也就是说：

// 比如，

// 计费表费用是13的话，那么对应的真实费用是 1 * 9^1 + 3 * 9^0 = 12

// 计费表费用是15的话，那么对应真实费用就是 1 * 9^1 + (5-1) * 9^0 = 13

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on("line", (line) => {
  const arr = line.split("").map((ele) => parseInt(ele));
  console.log(arr);
  let num = 0
  arr.map((v, index) => {
    if (v < 4) {
      num += v * Math.pow(9, arr.length - index - 1)
    } else {
      num += (v - 1) * Math.pow(9, arr.length - index - 1)
    }
  })
  console.log(num);
})

//----------------------------
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on("line", (line) => {
//   const arr = line.split("").map((ele) => parseInt(ele));

//   let correct = 0;
//   for (let i = 0; i < arr.length; i++) {
//     // 遍历输入数的每一位
//     let fault = arr[i];
//     if (fault > 4) {
//       // 如果本位数比4大，则相当于跳过1次，则需要将本位数-1
//       fault--;
//     }

//     for (let j = arr.length - i - 1; j > 0; j--) {
//       // 将本位转成十进制
//       fault *= 9;
//     }

//     correct += fault; // 累加各位对应十进制数
//   }
//   console.log(correct);
// });