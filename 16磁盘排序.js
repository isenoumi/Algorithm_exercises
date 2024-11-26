// 题目描述
// 磁盘的容量单位常用的有 M，G，T 这三个等级，它们之间的换算关系为：

// 1T = 1024G
// 1G = 1024M
// 现在给定 n 块磁盘的容量，请对它们按从小到大的顺序进行稳定排序。

// 例如给定5块盘的容量：

// 1T，20M，3G，10G6T，3M12G9M

// 排序后的结果为：

// 20M，3G，3M12G9M，1T，10G6T

// 注意单位可以重复出现，上述 3M12G9M 表示的容量即为：3M+12G+9M，和 12M12G 相等。

// 输入描述
// 输入第一行包含一个整数 n，表示磁盘的个数

// 2 ≤ n ≤ 100
// 接下的 n 行，每行一个字符串（长度大于2，小于30），表示磁盘的容量，由一个或多个格式为mv的子串组成，其中 m 表示容量大小，v 表示容量单位，例如：20M，1T，30G，10G6T，3M12G9M。

// 磁盘容量 m 的范围为 1 到 1024 的正整数
// 容量单位 v 的范围只包含题目中提到的 M，G，T 三种，换算关系如题目描述
// 输出描述
// 输出 n 行，表示 n 块磁盘容量排序后的结果。

// 用例
// 输入	
// 3
// 1G
// 2G
// 1024M

// 输出	
// 1G
// 1024M
// 2G

// 说明	1G和1024M容量相等，稳定排序要求保留它们原来的相对位置，故1G在1024M之前。
// 输入	
// 3
// 2G4M
// 3M2G
// 1T

// 输出	
// 3M2G
// 2G4M
// 1T

// 说明	1T的容量大于2G4M，2G4M的容量大于3M2G。


// 题目解析
// 本题主要考察：自定义排序，稳定排序，字符串解析。

// 所谓稳定排序，即对于数组中等价的两个元素a，b来说，如果排序前，a 在 b 之前，那么排序后也要保证 a 在 b 之前。

// 比如题目自带的用例1中：1G 和 1024M 是等价的，但是输入顺序中 1G 在 1024M 之前，所以输出顺序中 1G 也应该在 1024M 之前。

// 我们常用的快速排序是不稳定的。而大部分编程语言的sort函数底层都是用的快速排序。

// 想要基于快速排序实现稳定排序的话，一般的话，需要给数组元素带上原始索引位置信息，比如

// disks = ["1G", "2G", "1024M"]

// 可以变为

// disks = [{capcity: "1G", index: 0}, {capacity:"2G", index:1}, {capacity:"1024M", index:3}]

// 当两个元素的 capacity 相同时，则继续按照 index 升序。

// 但是，目前Java,JS,Python的sort函数在指定比较器后都能实现稳定排序。C++有stable_sort函数实现稳定排序。只有C语言需要上述转换。

// 为了方便比较，我们还需要将 "1G2T3M" 这种容量，全部转为 M 单位。具体解析策略可以是普通的字符串解析，或者正则解析。

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
  const num = await readline()
  const arr = []
  const disks = []
  for (let i = 0; i < num; i++) {
    arr.push(await readline())
  }
  arr.map(v => {
    disks.push([toM(v), v])
  })
  disks.sort((a, b) => a[0] - b[0])
  disks.map(v => {
    console.log(v[1]);
  })
}()

function toM(s) {
  let res = 0
  let num = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] <= '9' && s[i] >= '0') {
      num += s[i]

    } else {
      if (s[i] == "T") {
        res += parseInt(num) * 1024 * 1024
        num = ''
      } else if (s[i] == "G") {
        res += parseInt(num) * 1024
        num = ''
      } else if (s[i] == "M") {
        res += parseInt(num)
        num = ''

      }
    }


  }

  return res
}