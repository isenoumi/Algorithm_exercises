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
      // 如果密码本(i,j)位置元素指等于明文第一个数字值，则记录(i,j)作为一个出发位置
      if (secrets[i][j] == datas[0]) {
        starts.push([i, j]);
      }
    }
  }

  function getResult() {
    // 出发位置(x,y)
    for (let [x, y] of starts) {
      // used[i][j]用于记录密码本(i,j)元素是否已使用
      const used = new Array(m).fill(0).map(() => new Array(m).fill(false));
      // 出发点位置元素已使用
      used[x][y] = true;

      // 记录结果路径各节点位置
      const path = [];
      // 出发点位置记录
      path.push(`${x} ${y}`);

      // 开始深搜
      if (dfs(x, y, 1, path, used)) {
        return path.join(" ");
      }
    }

    return "error";
  }

  // 上，左，右，下偏移量，注意这里的顺序是有影响的，即下一步偏移后产生的密文的字符序必然是：上 < 左 < 右 < 下
  const offsets = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  /**
   *
   * @param {*} x 当前位置横坐标
   * @param {*} y 当前位置纵坐标
   * @param {*} index datas[index]是将要匹配的明文数字
   * @param {*} path 路径
   * @param {*} used 密码本各元素使用情况
   * @returns 是否找到符合要求的路径
   */
  function dfs(x, y, index, path, used) {
    // 已找到明文最后一个数字，则找到符合要求的路径
    if (index == n) {
      return true;
    }

    // 否则，进行上、左、右、下四个方向偏移，注意这里的顺序是有影响的，即下一步偏移后产生的密文的字符序必然是：上 < 左 < 右 < 下
    for (let [offsetX, offsetY] of offsets) {
      // 新位置
      const newX = x + offsetX;
      const newY = y + offsetY;

      // 新位置越界，或者新位置已使用，或者新位置不是目标值，则跳过
      if (
        newX < 0 ||
        newX >= m ||
        newY < 0 ||
        newY >= m ||
        used[newX][newY] ||
        secrets[newX][newY] != datas[index]
      ) {
        continue;
      }

      // 递归进入新位置
      path.push(`${newX} ${newY}`);
      used[newX][newY] = true;

      // 如果当前分支可以找到符合要求的路径，则返回
      if (dfs(newX, newY, index + 1, path, used)) {
        return true;
      }

      // 否则，回溯
      used[newX][newY] = false;
      path.pop();
    }

    return false;
  }

  console.log(getResult());
})();