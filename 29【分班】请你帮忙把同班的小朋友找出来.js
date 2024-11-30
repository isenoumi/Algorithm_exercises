// 题目描述
// 幼儿园两个班的小朋友在排队时混在了一起，每位小朋友都知道自己是否与前面一位小朋友同班，请你帮忙把同班的小朋友找出来。

// 小朋友的编号是整数，与前一位小朋友同班用Y表示，不同班用N表示。

// 输入描述
// 输入为空格分开的小朋友编号和是否同班标志。

// 比如：6/N 2/Y 3/N 4/Y，表示4位小朋友，2和6同班，3和2不同班，4和3同班。

// 其中，小朋友总数不超过999，每个小朋友编号大于0，小于等于999。

// 不考虑输入格式错误问题。

// 输出描述
// 输出为两行，每一行记录一个班小朋友的编号，编号用空格分开，且：

// 编号需按照大小升序排列，分班记录中第一个编号小的排在第一行。
// 若只有一个班的小朋友，第二行为空行。
// 若输入不符合要求，则直接输出字符串ERROR。
// 用例
// 输入	1/N 2/Y 3/N 4/Y
// 输出	
// 1 2
// 3 4

// 说明	2的同班标记为Y，因此和1同班。
// 3的同班标记为N，因此和1、2不同班。
// 4的同班标记为Y，因此和3同班。
// 所以1、2同班，3、4同班，输出为
// 1 2
// 3 4
// 输入	1/N 2/Y 3/N 4/Y 5/Y
// 输出	
// 1 2
// 3 4 5

// 说明	无

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})
const lines = []
rl.on('line', line => {
  {
    lines.push(line)
    if (lines.length === 1) {

      class_fun(lines[0])
      lines.length = 0
    }
  }
})

function class_fun(s) {
  const stu = s.split(' ').map(v => v.split('/'))
  const class1 = []
  const class2 = []
  if (stu.length > 999 || stu.length <= 0) {
    console.log("ERROR");
    return
  }
  let isClass1 = true
  for (let i = 0; i < stu.length; i++) {
    if (parseInt(stu[i][0]) <= 0 || (stu[i][1] !== 'N' && stu[i][1] !== 'Y')) {
      console.log('ERROR')
      return
    }
    if (i == 0) {
      class1.push(stu[i][0])
    } else {
      if (stu[i][1] == 'N') {
        isClass1 ? class2.push(stu[i][0]) : class1.push(stu[i][0])
        isClass1 = !isClass1
      } else {
        isClass1 ? class1.push(stu[i][0]) : class2.push(stu[i][0])
      }
    }

  }
  class1.sort()
  class2.sort()
  if (class2.length == 0) {
    console.log(class1.join(' '));
    console.log();
  } else if (class1[0] <= class2[0]) {
    console.log(class1.join(' '));
    console.log(class2.join(' '));
  } else {
    console.log(class2.join(' '));
    console.log(class1.join(' '));
  }
}

//--------------------------
// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void (async function () {
//   const infos = (await readline()).split(" ").map((s) => s.split("/"));

//   // 小朋友总数不超过999
//   if (infos.length > 999) {
//     console.log("ERROR");
//     return;
//   }

//   let class1 = [];
//   let class2 = [];

//   let isClass1 = false;

//   for (let i = 0; i < infos.length; i++) {
//     let [id, flag] = infos[i];

//     id = parseInt(id);

//     // 每个小朋友编号大于0，小于等于999
//     if (id <= 0 || id > 999) {
//       console.log("ERROR");
//       return;
//     }

//     // 与前一位小朋友同班用Y表示，不同班用N表示
//     if (flag != "Y" && flag != "N") {
//       console.log("ERROR");
//       return;
//     }

//     // 第一个小朋友前面没有人，因此第一个小朋友不可能和前面不存在的人同班
//     // 实际考试可以去掉该校验试试
//     if (i == 0 && flag == "Y") {
//       console.log("ERROR");
//       return;
//     }

//     if ((flag == "Y" && isClass1) || (flag == "N" && !isClass1)) {
//       isClass1 = true;
//       class1.push(id);
//     } else {
//       isClass1 = false;
//       class2.push(id);
//     }
//   }

//   class1.sort((a, b) => a - b);
//   class2.sort((a, b) => a - b);

//   if (class1.length == 0 || (class2.length > 0 && class1[0] > class2[0])) {
//     const tmp = class1;
//     class1 = class2;
//     class2 = tmp;
//   }

//   console.log(class1.join(" "));
//   console.log(class2.join(" "));
// })();