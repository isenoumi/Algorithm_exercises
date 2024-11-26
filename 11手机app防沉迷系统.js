// 题目描述
// 智能手机方便了我们生活的同时，也侵占了我们不少的时间。

// “手机App防沉迷系统”能够让我们每天合理地规划手机App使用时间，在正确的时间做正确的事。

// 它的大概原理是这样的：

// 在一天24小时内，可以注册每个App的允许使用时段

// 一个时间段只能使用一个App，举例说明：不能同时在9:00-10:00注册App2和App3

// App有优先级，数值越高，优先级越高。注册使用时段时，如果高优先级的App时间和低优先级的时段有冲突，则系统会自动注销低优先级的时段，如果App的优先级相同，则后添加的App不能注册。

// 举例1：
// (1) 注册App3前


// (2) App3注册时段和App2有冲突


// (3) App3优先级高，系统接受App3的注册，自动注销App2的注册



// 举例2：
// (1) 注册App4


// (2) App4和App2及App3都有冲突，优先级比App2高，但比App3低，这种场景下App4注册不上，最终的注册效果如下

// 一个App可以在一天内注册多个时段

// 请编程实现，根据输入数据注册App，并根据输入的时间点，返回时间点使用的App名称，如果该时间点没有注册任何App，请返回字符串“NA”。

// 输入描述
// 输入分3部分：

// 第一行表示注册的App数量 N（N ≤ 100）
// 第二部分包括 N 行，每行表示一条App注册数据
// 最后一行输入一个时间点，程序即返回该时间点使用的App
// 2
// App1 1 09:00 10:00
// App2 2 11:00 11:30
// 09:30

// 数据说明如下：

// N行注册数据以空格分隔，四项数依次表示：App名称、优先级、起始时间、结束时间
// 优先级1~5，数字越大，优先级越高
// 时间格式 HH:MM，小时和分钟都是两位，不足两位前面补0
// 起始时间需小于结束时间，否则注册不上
// 注册信息中的时间段包含起始时间点，不包含结束时间点
// 输出描述
// 输出一个字符串，表示App名称，或NA表示空闲时间

// 备注
// 用例保证时间都介于 00:00 - 24:00 之间；
// 用例保证数据格式都是正确的，不用考虑数据输入行数不够、注册信息不完整、字符串非法、优先级超限、时间格式不正确的问题；
// 用例
// 输入	1
// App1 1 09:00 10:00
// 09:30
// 输出	App1
// 说明	App1注册在9点到10点间，9点半可用的应用名是App1
// 输入	2
// App1 1 09:00 10:00
// App2 2 09:10 09:30
// 09:20
// 输出	App2
// 说明	App1和App2的时段有冲突，App2优先级比App1高，注册App2后，系统将App1的注册信息自动注销后，09:20时刻可用应用名是App2
// 输入	2
// App1 1 09:00 10:00
// App2 2 09:10 09:30
// 09:50
// 输出	NA
// 说明	App1被注销后，09:50时刻没有应用注册，因此输出NA
// 题目解析
// 本题数量级较小，可以考虑暴力破解。

// 本题每注册一个App_registering前，都要去和已注册的所有App_registered进行比较：

// 注册时段是否有冲突？
// 如果没有冲突，则继续和下一个App_registered比较
// 如果有冲突，则比较优先级

// 2.1. App_registering 的优先级高于（>）App_registered，则App_registered需要被注销，此时不能直接进行注销动作，因为我们需要确保 App_registering 可以注册后，才能进行注销。

// 2.2. App_registering 的优先级不高于（≤）App_registered，则App_registering不能注册，即终止后续比较
// 本题比较两个App注册时段冲突的方式，可以将App的注册时段的时间点信息，转化为分钟数数值，比如：

// 10:29

// 可以转化为：

// 10 * 60 + 29 = 629

// 这样两个App的时段比较，其实判断两个区间是否有交集，假设两个时段分别为

// [s1, e1] 和 [s2, e2]

// 只要满足

// s1 >= e2 或者 s2 >= e1 即可说明两个区间无交集，注意根据题目说明

// 注册信息中的时间段包含起始时间点，不包含结束时间点

// 上面两个区间均为左闭右开区间。

// 且区间保证左边界>右边界，因为题目说明

// 起始时间需小于结束时间，否则注册不上

// 即，一个App是否可以注册需要先判断其左边界是否大于右边界

// 2024.03.17

// 解法一（上面解析的逻辑）中，我们基于输入顺序来注册App，此时“后注册的App”存在一个问题，那就是，如果和前面注册过的某个低优先级的App1存在时间冲突，那么此时不能直接武断地注App1，因为存在下面情况：

// App1 1 09:00 10:00
// App2 5 10:10 10:30
// App3 3 09:10 10:30

// 尝试注册App3时，发现和前面注册的App1冲突，且App1优先级更低，但是我们此时不能注销App1，因为App3还和后面App2冲突，但是App2优先级更高，因此App3注册不了。所以我们也不用注销App1。

// 这样的话，逻辑就很复杂了。

// 解法二，优化点在于，提前将输入的App按照优先级降序（对于优先级相同的App，保持输入顺序，即稳定排序），此时我们会先注册高优先级的App，这样的话，后注册的App只要和前面注册的App发生冲突，则必然无法注册，因为前面已注册App的优先级必然更高。

// 那么，排序操作，会改变App的注册结果吗?

// 答案是不会，比如输入的App注册顺序如下

// App1 1 09:00 10:00
// App2 5 10:10 10:30
// App3 3 09:10 10:30

// 按照优先级降序后，变为了

// App2 5 10:10 10:30
// App3 3 09:10 10:30

// App1 1 09:00 10:00

// 此时注册结果不变，因为我们可以发现：

// 如果不存在App_low和高优先级App_high有冲突，则高优先级App_high提前注册对结果无影响
// 如果存在App_low和高优先级App_high有冲突，则无论App_high在App_low前面注册，还是在App_low后面注册，结果都是App_low无法注册

// const rl = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })
// let iter = rl[Symbol.asyncIterator]()
// const readline = async () => (await iter.next()).value
// void async function () {
//   const n = await readline()
//   const app = []
//   for (let i = 0; i < n; i++) {
//     let arr = (await readline()).split(' ')

//     app.push({
//       name: arr[0],
//       priority: arr[1],
//       start: to_time(arr[2]),
//       end: to_time(arr[3])
//     })
//   }
//   let time = to_time(await readline())

//   app.sort((a, b) => a.priority - b.priority)
//   let app_now = {}
//   let arr = []
//   app.map((v, i) => {
//     app.map(v2 => {
//       if (!(v2.start > v.end || v2.end < v.start)) {
//         if (v.priority > v2.priority) {

//           arr.push(v)
//         }
//       }
//     })


//   })
//   console.log(arr);
// }()

// function to_time(time) {
//   return parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
// }

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

class App {
  constructor(name, priority, start, end) {
    this.name = name;
    this.priority = priority;
    this.start = start;
    this.end = end;
  }
}

function convert(time) {
  // 时间格式 HH:MM，小时和分钟都是两位，不足两位前面补0
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

void(async function () {
  const n = parseInt(await readline());

  // 需要注册的App
  const apps = [];
  for (let i = 0; i < n; i++) {
    const [name, priority, startTime, endTime] = (await readline()).split(" ");
    apps.push(
      new App(name, parseInt(priority), convert(startTime), convert(endTime))
    );
  }

  // 需要查询的时间点
  const queryTime = convert(await readline());

  console.log(getResult(apps, queryTime));
})();

function getResult(apps, queryTime) {
  // 记录已注册的App
  const registereds = [];

  // 按照注册优先级降序
  apps.sort((a, b) => b.priority - a.priority);

  outer: for (let app of apps) {
    // 起始时间>=结束时间，则注册不上
    if (app.start >= app.end) continue;

    for (let registered of registereds) {
      // 如果和前面注册的App注册时间有交集（冲突），由于已经按照优先级排序，因此后注册的优先级肯定不比前面高，因此发生冲突时，后注册的无法成功
      if (hasInterSection(app, registered)) {
        continue outer;
      }
    }

    // 如果和前面高优先级的App无注册时间冲突，则可以注册
    registereds.push(app);
  }

  let ans = "NA";

  for (let app of registereds) {
    if (queryTime >= app.start && queryTime < app.end) {
      ans = app.name;
      // 注册成功的App时段之间互不冲突，因此queryTime只会对应一个App
      break;
    }
  }

  return ans;
}

// 判断两个范围是否有交集
function hasInterSection(range1, range2) {
  const {
    start: s1,
    end: e1
  } = range1;
  const {
    start: s2,
    end: e2
  } = range2;

  if (s1 >= s2 && s1 < e2) {
    return true;
  }

  if (s2 >= s1 && s2 < e1) {
    return true;
  }

  return false;
}