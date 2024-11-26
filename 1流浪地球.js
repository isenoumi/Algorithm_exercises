// 题目描述
// 流浪地球计划在赤道上均匀部署了 N 个转向发动机，按位置顺序编号为 0 ~ N

// 初始状态下所有的发动机都是未启动状态
// 发动机启动的方式分为“手动启动”和“关联启动”两种方式
// 如果在时刻 1 一个发动机被启动，下一个时刻 2 与之相邻的两个发动机就会被“关联启动”
// 如果准备启动某个发动机时，它已经被启动了，则什么都不用做
// 发动机 0 与发动机 N-1 是相邻的
// 地球联合政府准备挑选某些发动机在某些时刻进行“手动启动”。当然最终所有的发动机都会被启动。哪些发动机最晚被启动呢？

// 输入描述
// 第一行两个数字 N 和 E，中间有空格

// N 代表部署发动机的总个数，1 < N ≤ 1000
// E 代表计划手动启动的发动机总个数，1 ≤ E ≤ 1000，E ≤ N
// 接下来共 E 行，每行都是两个数字 T 和 P，中间有空格

// T 代表发动机的手动启动时刻，0 ≤ T ≤ N
// P 代表次发动机的位置编号，0 ≤ P < N
// 输出描述
// 第一行一个数字 N， 以回车结束

// N 代表最后被启动的发动机个数
// 第二行 N 个数字，中间有空格，以回车结束

// 每个数字代表发动机的位置编号，从小到大排序
// 用例
// 输入	8 2
// 0 2
// 0 6
// 输出	2
// 0 4
// 说明	8个发动机；
// 时刻0启动（2,6）;
// 时刻1启动（1,3,5,7）（其中1,3被2关联启动，5,7被6关联启动）；
// 时刻2启动（0,4）（其中0被1,7关联启动，4被3,5关联启动）；
// 至此所有发动机都被启动，最后被启动的有2个，分别是0和4。
// 题目解析
// 本题数量级不大，可以考虑暴力破解。思路如下：

// 假设编号 i 的发动机，手动启动时刻是 ti，那么编号 i 的发动机关联启动到编号 j 的发动机，由于

// 发动机 0 与发动机 N-1 是相邻的，即形成一个环

// 因此有两种关联方向，我们可以定义为内关联和外关联，其中：



// 内关联 innerDis：需要间隔 abs(i - j) 单位时间
// 外关联 outerDis：需要间隔 n - abs(i - j) 单位时间
// 即编号 j 会在 ti + min(innerDis, outerDis) 时刻被关联启动。

// 按此逻辑，我们可以求出每个发动机，被其余发动机关联启动的时刻，我们只需要保留每个发动机最早启动时刻即可。

// 我们可以定义一个数组 launches 记录每个发动机的启动时刻，初始时，假设每个发动机都是在 一个极大 2001 时刻启动（0 ≤ T ≤ N ≤ 1000），这样后续，我们就可以比较保留下较小值。
const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void(async function () {
  // 发动机的总个数, 计划手动启动的发动机总个数
  const [n, e] = (await readline()).split(" ").map(Number);

  // 记录每个发动机的最终启动时刻, 初始化为极大值，方便后面取最早启动时刻
  const launches = new Array(n).fill(2001);
  for (let i = 0; i < e; i++) {
    // 发动机的手动启动时刻, 发动机的位置编号
    const [t, p] = (await readline()).split(" ").map(Number);
    // p号发动机在t时刻手动启动
    launches[p] = t;
  }

  // 从编号 i 的发动机手动启动后, 关联启动到编号 j
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 内关联距离
      const innerDis = Math.abs(i - j);
      // 外关联距离
      const outerDis = n - innerDis;
      // 最短关联距离
      const dis = Math.min(innerDis, outerDis);

      launches[j] = Math.min(launches[j], launches[i] + dis);
    }
  }

  let maxT = 0; // 最晚启动时刻
  const last = []; // 最晚启动的发动机编号集合

  for (let p = 0; p < launches.length; p++) {
    const t = launches[p]; // 当前发动机启动时刻

    if (t < maxT) continue; // 不是最晚启动的发动机

    // 更晚启动的时刻
    if (t > maxT) {
      maxT = t;
      last.length = 0;
    }

    last.push(p); // 记录该发动机编号
  }

  console.log(last.length);
  console.log(last.sort((a, b) => a - b).join(" "));
})();