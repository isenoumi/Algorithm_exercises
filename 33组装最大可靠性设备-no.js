// 题目描述
// 一个设备由 N 种类型元器件组成（每种类型元器件只需要一个，类型 type 编号从 0~N-1），

// 每个元器件均有可靠性属性 reliability，可靠性越高的器件其价格 price 越贵。

// 而设备的可靠性由组成设备的所有器件中可靠性最低的器件决定。

// 给定预算 S，购买 N 种元器件（每种类型元器件都需要购买一个），在不超过预算的情况下，请给出能够组成的设备的最大可靠性。

// 输入描述
// S N // S总的预算，N元器件的种类

// total // 元器件的总数，每种型号的元器件可以有多种;

// 此后有total行具体器件的数据

// type reliability price // type 整数类型，代表元器件的类型编号从 0 ~ N-1; reliabilty 整数类型 ，代表元器件的可靠性; price 整数类型 ，代表元器件的价格

// 输出描述
// 符合预算的设备的最大可靠性，如果预算无法买齐 N 种器件，则返回 -1

// 备注
// 0 ≤ S,price ≤ 10000000
// 0 ≤ N ≤ 100
// 0 ≤ type ≤ N-1
// 0 ≤ total ≤ 100000
// 0 < reliability ≤ 100000
// 用例
// 输入	500 3
// 6
// 0 80 100
// 0 90 200
// 1 50 50
// 1 70 210
// 2 50 100
// 2 60 150
// 输出	60
// 说明	
// 预算500，设备需要3种元件组成，方案

// 类型0的第一个(可靠性80),

// 类型1的第二个(可靠性70),

// 类型2的第二个(可靠性60),

// 可以使设备的可靠性最大 60

// 输入	100 1
// 1
// 0 90 200
// 输出	-1
// 说明	组成设备需要1个元件，但是元件价格大于预算，因此无法组成设备，返回-1
// 题目解析
// 本题很像是分组背包问题，但是细看却不是，因为题目描述中说：

// 每种类型元器件都需要购买一个

// 我的解题思路是二分。

// 首先，不分种类，收集所有器件出现过的可靠性到一个Set集合中，收集完后，进行升序排序，升序后可靠性数组设为maybe，即maybe数组里面的可靠性都有可能是题解。

// 之后，将所有器件按类型统计，由于题目输入已经给出了种类数n，因此可以定义一个长度为n的数组kinds，即为种类数组，kinds[type]下记录对应类型的所有器件。统计完后，我们需要遍历每一个kinds[type]，然后将它按照器件的可靠性进行升序，如果可靠性相同，则按照价格升序。

// 预备处理如上。

// 接下来我们需要在maybe中二分取中间值maybe[mid]，作为一个可能的题解，即设备最大可靠性。然后遍历kinds，在每一个种类的器件中，找到一个可靠性>=maybe[mid]，且最接近maybe[mid]的器件，这里需要想清楚两点：

// 题目描述：而设备的可靠性由组成设备的所有器件中可靠性最低的器件决定。因此，maybe[mid]作为题解的话，则每一个种类中选取的器件的可靠性要大于等于maybe[mid]才行。
// 题目描述还说：可靠性越高的器件其价格price越贵。因此，按照贪心原则，我们选取一个大于等于且最接近maybe[mid]可靠性的器件，是花费最少的。这样省下来的钱就可以买其他器件。
// 由于之前，已经对kinds[type]进行了排序，因此这里可以二分查找：可靠性>=maybe[mid]，且最接近maybe[mid]且价格最低的器件。

// 这里又涉及到二分查找的目标位置和有序插入位置的知识，具体可以看：

// 算法设计 - 二分法和三分法，洛谷P3382_伏城之外的博客-CSDN博客

// 当找到所有kinds[type]中可靠性>=maybe[mid]，且最接近maybe[mid]的器件后，对这些器件的price进行求和，得到sumPrice：

// 如果sumPrice <= 总预算s，那么说明，当前maybe[mid]真的是一个可能解，但不一定是最优解，我们需要继续二分找到更大
// 如果sumPrice > 总预算s，那么说明，当前maybe[mid]选大了，我们下次二分应该选更小一点的来尝试
// 按此二分逻辑，将最后一次符合要求的maybe[mid]可能解返回即可，如果没有符合要求的maybe[mid]，则返回-1。

/* JavaScript Node ACM模式 控制台输入获取 */
const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

class Device {
  constructor(reliability, price) {
    this.reliability = reliability;
    this.price = price;
  }
}

void(async function () {
  // 总预算, 器件的种类数
  const [s, n] = (await readline()).split(" ").map(Number);

  // 之后输入total行具体器件的数据
  const total = parseInt(await readline());

  const kinds = new Array(n).fill(0).map(() => new Array()); // 各种器件集合
  const reliabilities = new Set(); // 收集所有器件的可靠性（去重）

  for (let i = 0; i < total; i++) {
    // 器件种类, 器件可靠性, 器件价值
    const [type, reliability, price] = (await readline())
    .split(" ")
      .map(Number);

    // 收集器件的可靠性
    reliabilities.add(reliability);
    // 将器件加入到对应的种类中
    kinds[type].push(new Device(reliability, price));
  }
  console.log(kinds, reliabilities);

  function solution() {
    // ans记录题解
    let ans = -1;

    // 将每个种类内的器件按照可靠性升序, 可靠性相同，则继续按照价格升序
    for (let kind of kinds) {
      kind.sort((a, b) =>
        a.reliability != b.reliability ?
        a.reliability - b.reliability :
        a.price - b.price
      );
    }

    // 将所有器件的可靠性集合，变为数组
    const maybe = [...reliabilities].sort((a, b) => a - b);

    // 二分选取可能的最大可靠性maybe
    let low = 0;
    let high = maybe.length - 1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      const midVal = maybe[mid];

      // 如果maybe[mid]可靠性可以保证所有种类器件都能选到，且价格之和小于s
      if (check(midVal)) {
        // 则maybe[mid]可靠性就是一个可能解
        ans = midVal;
        // 继续尝试更优解，即找更大的可靠性
        low = mid + 1;
      } else {
        // 否则，说明可靠性选高了，我们应该继续尝试更低的可靠性
        high = mid - 1;
      }
    }

    return ans;
  }

  function check(maxReliability) {
    let sum = 0;

    for (let kind of kinds) {
      // 注意kind内的器件已经按照可靠性升序, 可靠性相同的，则继续按照价格升序
      // 我们需要在该kind种类内找到一个可靠性>=maxReliability,且价格最低的器件
      let idx = binarySearch(kind, maxReliability);

      // 如果idx<0，则说明idx是一个插入位置
      if (idx < 0) {
        idx = -idx - 1;
      }

      // 如果idx==kind.size()则说明kind内所有器件的可靠性都低于maxReliability，因此此kind器件选取不到，可以直接返回false
      if (idx == kind.length) return false;

      // 否则，选取对应idx位置的器件，并计入价格到总价
      sum += kind[idx].price;
    }

    // 如果最终总价小于总预算s，则此maxReliability可行
    return sum <= s;
  }

  function binarySearch(kind, target) {
    let low = 0;
    let high = kind.length - 1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      const device = kind[mid];

      if (device.reliability > target) {
        high = mid - 1;
      } else if (device.reliability < target) {
        low = mid + 1;
      } else {
        return mid;
      }
    }

    return -low - 1;
  }

  console.log(solution());
})();