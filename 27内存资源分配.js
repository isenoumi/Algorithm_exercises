// 题目描述
// 有一个简易内存池，内存按照大小粒度分类，每个粒度有若干个可用内存资源，用户会进行一系列内存申请，需要按需分配内存池中的资源返回申请结果成功失败列表。

// 分配规则如下：

// 分配的内存要大于等于内存的申请量，存在满足需求的内存就必须分配，优先分配粒度小的，但内存不能拆分使用；
// 需要按申请顺序分配，先申请的先分配。
// 有可用内存分配则申请结果为true，没有可用则返回false。
// 注意：不考虑内存释放

// 输入描述
// 输入为两行字符串：

// 第一行为内存池资源列表，包含内存粒度数据信息，粒度数据间用逗号分割，一个粒度信息内用冒号分割，冒号前为内存粒度大小，冒号后为数量

// 资源列表不大于1024
// 每个粒度的数量不大于4096
// 第二行为申请列表，申请的内存大小间用逗号分割

// 申请列表不大于100000
// 如

// 64:2,128:1,32:4,1:128

// 50,36,64,128,127

// 输出描述
// 输出为内存池分配结果

// 如：

// true,true,true,false,false

// 用例
// 输入	
// 64:2,128:1,32:4,1:128
// 50,36,64,128,127
// 输出	true,true,true,false,false
// 说明	内存池资源包含：64K共2个、128K共1个、32K共4个、1K共128个的内存资源；
// 针对50,36,64,128,127的内存申请序列，分配的内存依次是：64,64,128,NULL,NULL,
// 第三次申请内存时已经将128分配出去，因此输出结果是：
// true,true,true,false,false
// 题目解析
// 本题数量级稍大，暴力可能会超时。

// 因此我们可以：

// 先将内存资源列表，按照内存粒度大小，进行升序
// 遍历申请列表
// 在有序的内存资源列表中，二分查找要申请的内存大小（找到大于等于要申请的内存大小即可）
// 如果可以找到，则打印true，并且对应内存资源数量减1，如果内存资源数量变为0，则删除对应内存资源
// 如果找不到，则打印false

//-----------------循环遍历----------------
// const rl = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })
// const iter = rl[Symbol.asyncIterator]()
// const readline = async () => (await iter.next()).value;
// void async function () {
//   const arr = (await readline()).split(',').map(v => v.split(':').map(Number))
//   const request = (await readline()).split(',').map(Number)
//   arr.sort((a, b) => a[0] - b[0])
//   const result = []
//   request.forEach(v => {
//     let i = 0
//     for (; i < arr.length; i++) {
//       if (v <= arr[i][0] && arr[i][1] > 0) {
//         arr[i][1]--
//         result.push(true)
//         break
//       }
//     }
//     if (i == arr.length) result.push(false)
//   })
//   console.log(result.join(','));  
// }()



//-----------------------------
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void (async function () {
//   const memories = (await readline())
//     .split(",")
//     .map((s) => s.split(":").map(Number));

//   const requests = (await readline())
//     .split(",")
//     .filter((s) => s.length != 0)
//     .map(Number);

//   // 按照内存粒度大小升序
//   memories.sort((a, b) => a[0] - b[0]);

//   // 记录结果
//   const res = [];

//   // 遍历申请列表
//   for (let req of requests) {
//     // 二分查找（找到大于等于request的内存资源）
//     const i = binarySearch(memories, req);

//     if (i < memories.length) {
//       // 如果找到>=申请大小的内存池资源
//       res.push("true");

//       // 移除数量为0的内存池资源
//       if (--memories[i][1] == 0) {
//         memories.splice(i, 1);
//       }
//     } else {
//       // 如果找不到
//       res.push("false");
//     }
//   }

//   console.log(res.join(","));
// })();

// function binarySearch(arr, target) {
//   let l = 0;
//   let r = arr.length - 1;

//   while (l <= r) {
//     const mid = (l + r) >> 1;
//     const midVal = arr[mid][0];

//     if (midVal > target) {
//       r = mid - 1;
//     } else if (midVal < target) {
//       l = mid + 1;
//     } else {
//       return mid;
//     }
//   }

//   return l;
// }