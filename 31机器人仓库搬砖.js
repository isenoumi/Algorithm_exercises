// 题目描述
// 机器人搬砖，一共有 N 堆砖存放在 N 个不同的仓库中，第 i 堆砖中有 bricks[i] 块砖头，要求在 8 小时内搬完。

// 机器人每小时能搬砖的数量取决于有多少能量格，机器人一个小时中只能在一个仓库中搬砖，机器人的能量格只在这一个小时有效，为使得机器人损耗最小化，应尽量减小每次补充的能量格数。

// 为了保障在 8 小时内能完成搬砖任务，请计算每小时给机器人充能的最小能量格数。

// 无需考虑机器人补充能力格的耗时；
// 无需考虑机器人搬砖的耗时；
// 机器人每小时补充能量格只在这一个小时中有效；
// 输入描述
// 第一行为一行数字，空格分隔

// 输出描述
// 机器人每小时最少需要充的能量格，若无法完成任务，输出 -1

// 用例
// 输入	30 12 25 8 19
// 输出	15
// 说明	无
// 输入	10 12 25 8 19 8 6 4 17 19 20 30
// 输出	-1
// 说明	砖的堆数为12堆存放在12个仓库中，机器人一个小时内只能在一个仓库搬砖，不可能完成任务。
// 题目解析
// 本题有个关键说明：

// 机器人一个小时中只能在一个仓库中搬砖

// 另外：

// 机器人搬砖，一共有 N 堆砖存放在 N 个不同的仓库中，第 i 堆砖中有 bricks[i] 块砖头，要求在 8 小时内搬完

// 机器人一个小时只能在一个仓库干活，那么在8小时内，机器人最多干完8个仓库。

// 如果bricks.length > 8，那么机器人肯定不可能在8小时内干完。
// 如果bricks.length <= 8，此时我们可以通过二分法求解最少每小时充电量；

// 假设机器人每个小时需要 k 格能量
// 如果只有一个仓库一堆砖，那么这堆砖就可以平分到8小时内搬，这样才能保证每小时搬最少的砖，消耗最少的能量，即每小时可以充最少的能量。如果这堆砖头足够少，比如只有1块，那么此时机器人每小时只需要充1块能量即可。因此 k 的最小值取 1。
// 如果有8个仓库，那么机器人每小时的能量格数至少就是 max(bricks)，这样才能保证一个小时干完砖头数量最多的那个仓库。因此 k 的最大值取max(bricks)。
// 求出 k 的取值范围后，我们可以通过二分取中值的方式，不停尝试可能解mid：

// 如果mid能量块可以满足8小时内搬完所有仓库，那么mid就是一个可能解，但不一定是最优解，此时我们应该尝试充更少的能量，即缩小k的右边界范围到 = mid - 1
// 如果mid能量块不能满足8小时内搬完所有仓库，那么说明每小时充mid能力太少了，我们应该尝试充更多能量，即增大k的左边界范围到 = mid + 1

// const rl = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// const lines = []
// rl.on('line', line => {
//   lines.push(line)
//   if (lines.length == 1) {
//     const bricks = lines[0].split(' ').map(Number)
//     console.log(getResult(bricks));
//     lines.length = 0
//   }
// })

// function getResult(bricks) {
//   if (bricks.length > 8 || bricks.length == 0) {
//     return -1
//   }
// if (bricks.length == 8) {
//   return max;
// }

//   let max = Math.max(...bricks)
//   let cost = 0
//   while (1) {
//     cost = 0
//     bricks.map(v => {
//       cost += Math.ceil(v / max)
//     })
//     console.log(cost, max);
//     if (cost == 9) return max + 1
//     max--
//     // console.log(cost, max);
//   }
//   return max

// }

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void(async function () {
  const bricks = (await readline()).split(" ").map(Number);
  console.log(getResult(bricks));
})();

function getResult(bricks) {
  // 机器人每小时只能在一个仓库干活，因此给定8小时，最多只能搬完8个仓库，如果仓库数量超过8，那么肯定干不完
  if (bricks.length > 8) {
    return -1;
  }

  // 每小时最多需要的能量块
  let max = Math.max(...bricks);

  // 如果有8个仓库，那么只能1个小时干1个仓库，且机器人每小时需要能量至少是max(bricks)，这样才能保证1个小时内把最多砖块的那个仓库搬完
  if (bricks.length == 8) {
    return max;
  }

  // 如果仓库数少于8个，那么此时每小时能量max(bricks)必然能在8小时内搬完所有仓库，但不是最优解
  let ans = max;

  // 每小时最少需要的能量块
  let min = 1;

  // 二分法
  while (min <= max) {
    // 取中间值
    const mid = (min + max) >> 1;

    if (check(mid, 8, bricks)) {
      // 如果每小时充mid格能量，就能在8小时内，搬完所有砖头，则mid就是一个可能解
      ans = mid;
      // 但mid不一定是最优解，因此继续尝试更小的能量块
      max = mid - 1;
    } else {
      // 如果每小时充mid能量块，无法在8小时能完成工作，则说明每天能量块充少了，下次应该尝试充更多能量块
      min = mid + 1;
    }
  }

  return ans;
}

/**
 *
 * @param {*} energy 每小时可以使用的能量块数量
 * @param {*} limit 限制几小时内干完
 * @param {*} bricks 要搬的几堆砖头
 * @returns 是否可以在limit小时内已指定energy能量搬完所有bricks
 */
function check(energy, limit, bricks) {
  // 已花费的小时数
  let cost = 0;

  for (let brick of bricks) {
    cost += Math.ceil(brick / energy);

    // 如果搬砖过程中发现，花费时间已经超过限制，则直接返回false
    if (cost > limit) {
      return false;
    }
  }

  return true;
}