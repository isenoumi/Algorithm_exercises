// 题目描述
// 有一种特殊的加密算法，明文为一段数字串，经过密码本查找转换，生成另一段密文数字串。

// 规则如下：

// 明文为一段数字串由 0~9 组成
// 密码本为数字 0~9 组成的二维数组
// 需要按明文串的数字顺序在密码本里找到同样的数字串，密码本里的数字串是由相邻的单元格数字组成，上下和左右是相邻的，注意：对角线不相邻，同一个单元格的数字不能重复使用。
// 每一位明文对应密文即为密码本中找到的单元格所在的行和列序号（序号从0开始）组成的两个数宇。

// 如明文第 i 位 Data[i] 对应密码本单元格为 Book[x][y]，则明文第 i 位对应的密文为X Y，X和Y之间用空格隔开。
// 如果有多条密文，返回字符序最小的密文。

// 如果密码本无法匹配，返回"error"。

// 请你设计这个加密程序。

// 示例1：

// 密码本：

// 0 0 2

// 1 3 4

// 6 6 4

// 明文："3"，密文："1 1"

// 示例2：

// 密码本：

// 0 0 2

// 1 3 4

// 6 6 4

// 明文："0 3"，密文："0 1 1 1"

// 示例3：

// 密码本：

// 0 0 2 4

// 1 3 4 6

// 3 4 1 5

// 6 6 6 5

// 明文："0 0 2 4"，密文："0 0 0 1 0 2 0 3" 和 "0 0 0 1 0 2 1 2"，返回字典序最小的"0 0 0 1 0 2 0 3"

// 明文："8 2 2 3"，密文："error"，密码本中无法匹配

// 输入描述
// 第一行输入 1 个正整数 N，代表明文的长度（1 ≤ N ≤ 200）

// 第二行输入 N 个明文组成的序列 Data[i]（0 ≤ Data[i] ≤ 9）

// 第三行输入 1 个正整数 M，代表密文的长度

// 接下来 M 行，每行 M 个数，代表密文矩阵

// 输出描述
// 输出字典序最小密文，如果无法匹配，输出"error"

// 用例
// 输入	2
// 0 3
// 3
// 0 0 2
// 1 3 4
// 6 6 4 
// 输出	0 1 1 1
// 说明	无
// 输入	2
// 0 5
// 3
// 0 0 2
// 1 3 4
// 6 6 4
// 输出	error
// 说明	找不到 0 5 的序列，返回error
// 题目解析
// 题目关键说明如下：

// 需要按明文串的数字顺序在密码本里找到同样的数字串，密码本里的数字串是由相邻的单元格数字组成，上下和左右是相邻的

// 明文第 i 位 Data[i] 对应密码本单元格为 Book[x][y]，则明文第 i 位对应的密文为X Y

// 题目示例3图示



// 此时密码本多个路径可以对应为明文，分别为：

// (0,0) -> (0,1) -> (0,2) -> (0,3)
// (0,0) -> (0,1) -> (0,2) -> (1,2)
// 其中0 0 0 1 0 2 0 3字典序更小。

// 本题可以使用深度优先搜索DFS解题，思路如下：

// 首先，在密码本矩阵中找到元素值=明文第一个数字的所有元素位置，记录到集合starts中。

// 然后，遍历starts每一个位置，作为路径探索的起始位置：

// 此时，深搜方向顺序是有讲究的，需要按照上、左、右、下的顺序依次深搜，因为题目说：

// 如果有多条密文，返回字符序最小的密文

// 比如当前位置是 （x,y），而当前位置的上下左右位置的元素值均符合下一个明文数字，那么此时应该选择向哪个方向深搜最优呢？

// 由于题目要返回字符序最小的密文，对于：

// 上：x-1, y
// 左：x, y-1
// 右：x, y+1
// 下：x+1, y
// 可以发现，“上”位置的字符序是最小的，因此深搜的优先级应该是：上 > 左 > 右 > 下

// 这样的话，一旦深搜过程发现符合要求的路径，则必为最优解。

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void(async function () {
  // 明文数字个数
  const n = parseInt(await readline());
  // 明文
  const datas = (await readline()).split(" ").map(Number);

  // 密码本矩阵大小
  const m = parseInt(await readline());
  // 密码本
  const secrets = [];
  // 记录密码本中元素值等于“明文第一个数字”的所有元素的位置
  const starts = [];
  for (let i = 0; i < m; i++) {
    secrets.push((await readline()).split(" ").map(Number));
    for (let j = 0; j < m; j++) {
      if (secrets[i][j] == datas[0]) {
        starts.push([i, j]);
      }

    }
  }
  const offsets = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  console.log(getResult());

  function getResult() {
    for (let [x, y] of starts) {
      const visted = new Array(m).fill(0).map(() => new Array(m).fill(false))
      visted[x][y] = true

      const path = []
      path.push(`${x} ${y}`)
      if (dfs(x, y, 1, path, visted))

        return path.join(' ')
    }
    return 'error'
  }

  function dfs(x, y, index, path, visted) {
    if (index == n) {
      return true;
    }
    for (let [offX, offY] of offsets) {
      const newX = x + offX
      const newY = y + offY
      if (newX < 0 || newX >= m || newY < 0 || newY >= m) continue
      if (visted[newX][newY] || secrets[newX][newY] !== datas[index]) continue
      path.push(`${newX} ${newY}`)
      visted[newX][newY] = true
      if (dfs(newX, newY, index + 1, path, visted)) return true
      path.pop()
      visted[newX][newY] = false
    }
  }
  return false

})()