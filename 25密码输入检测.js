// 题目描述与示例
// 题目描述
// 给定用户密码输入流 input，输入流中字符'<'表示退格，可以清除前一个输入的字符，请你编写程序，输出最终得到的密码字符，并判断密码是否满足如下的密码安全要求。

// 密码安全要求如下：

// 密码长度>=8;
// 密码至少需要包含 1 个大写字母;
// 密码至少需要包含 1 个小写字母;
// 密码至少需要包含 1 个数字;
// 密码至少需要包含 1 个字母和数字以外的非空白特殊字符
// 注意空串退格后仍然为空串，且用户输入的字符串不包含'<'字符和空白字符。

// 输入描述
// 用一行字符串表示输入的用户数据，输入的字符串中'<'字符标识退格，用户输入的字符串不包含空白字符，例如：ABC<c89%000<

// 输出描述
// 输出经过程序处理后，输出的实际密码字符串，并输出改密码字符串是否满足密码安全要求。两者间由','分隔， 例如：ABc89%00,true

// 示例
// 输入
// ABC<c89%000<
// 输出
// ABc89%00,true
// 解题思路
// 本题分为两个步骤：

// 对输入的密码进行退格处理，这显然可以使用栈来完成。
// 对处理完毕之后的密码进行各个条件的判断，直接调用各种字符串相关的API即可完成。

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const lines = []
rl.on('line', line => {
  lines.push(line)
  if (lines.length === 1) {
    const str = lines[0]

    console.log(check(str));
    lines.length = 0
  }
})

function check(str) {
  const arr = []

  for (let i = 0; i < str.length; i++) {
    if (str[i] == '<') {
      arr.pop()
    } else {
      arr.push(str[i])
    }
  }
  let flag = arr.length >= 8 ? true : false
  let a_n = 0
  let A_n = 0
  let n_n = 0
  let c_n = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 'A' && arr[i] <= 'Z') A_n++
    else if (arr[i] >= 'a' && arr[i] <= 'z') a_n++
    else if (arr[i] >= '0' && arr[i] <= '9') n_n++
    else if (arr[i] != ' ') c_n++
  }
  if (flag && a_n > 0 && A_n > 0 && n_n > 0 && c_n > 0) flag = true
  else flag = false

  return `${arr.join('')},${flag}`
}