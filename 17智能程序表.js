// 题目描述
// 小明来到某学校当老师，需要将学生按考试总分或单科分数进行排名，你能帮帮他吗？

// 输入描述
// 第 1 行输入两个整数，学生人数 n 和科目数量 m。

// 0 < n < 100
// 0 < m < 10
// 第 2 行输入 m 个科目名称，彼此之间用空格隔开。

// 科目名称只由英文字母构成，单个长度不超过10个字符。
// 科目的出现顺序和后续输入的学生成绩一一对应。
// 不会出现重复的科目名称。
// 第 3 行开始的 n 行，每行包含一个学生的姓名和该生 m 个科目的成绩（空格隔开）

// 学生不会重名。
// 学生姓名只由英文字母构成，长度不超过10个字符。
// 成绩是0~100的整数，依次对应第2行种输入的科目。
// 第n+2行，输入用作排名的科目名称。若科目不存在，则按总分进行排序。

// 输出描述
// 输出一行，按成绩排序后的学生名字，空格隔开。成绩相同的按照学生姓名字典顺序排序。

// 用例
// 输入	3 2
// yuwen shuxue
// fangfang 95 90
// xiaohua 88 95
// minmin 100 82
// shuxue
// 输出	xiaohua fangfang minmin
// 说明	按shuxue成绩排名，依次是xiaohua、fangfang、minmin
// 输入	3 2
// yuwen shuxue
// fangfang 95 90
// xiaohua 88 95
// minmin 90 95
// zongfen
// 输出	fangfang minmin xiaohua
// 说明	排序科目不存在，按总分排序，fangfang和minmin总分相同，按姓名的字典顺序，fangfang排在前面



const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value
void async function () {
  const [n, m] = (await readline()).split(' ').map(Number)
  const subjects = (await readline()).split(' ')
  const students = []
  for (let i = 0; i < n; i++) {
    let arr = (await readline()).split(' ')
    let total = 0
    let stu = {
      name: arr[0]
    }
    for (let j = 0; j < m; j++) {
      stu[subjects[j]] = parseInt(arr[j + 1])
      total += stu[subjects[j]]
    }
    students.push({
      ...stu,
      total
    })
  }
  const sub = await readline()
  if (subjects.includes(sub)) {
    students.sort((a, b) => {
      if (b[sub] == a[sub]) {
        return a.name.localeCompare(b.name) // 字典 升序
        // return b.name.localeCompare(a.name) // 字典 降序
      } else return b[sub] - a[sub]
    })
  } else {
    students.sort((a, b) => {
      if (b.total == a.total) {
        return a.name.localeCompare(b.name)
        // return b.name.localeCompare(a.name)
      } else return b.total - a.total
    })
  }
  const result = []
  students.map(v => {
    result.push(v.name)
  })
  console.log(result.join(' '))
}()