// 题目描述
// 公司用一个字符串来表示员工的出勤信息

// absent：缺勤
// late：迟到
// leaveearly：早退
// present：正常上班
// 现需根据员工出勤信息，判断本次是否能获得出勤奖，能获得出勤奖的条件如下：

// 缺勤不超过一次；
// 没有连续的迟到/早退；
// 任意连续7次考勤，缺勤/迟到/早退不超过3次。
// 输入描述
// 用户的考勤数据字符串

// 记录条数 >= 1；
// 输入字符串长度 < 10000；
// 不存在非法输入；
// 如：

// 2
// present
// present absent present present leaveearly present absent

// 输出描述
// 根据考勤数据字符串，如果能得到考勤奖，输出”true”；否则输出”false”，
// 对于输入示例的结果应为：

// true false

// 用例
// 输入	2
// present
// present present
// 输出	true true
// 说明	无
// 输入	2
// present
// present absent present present leaveearly present absent
// 输出	true false
// 说明	无
//-----------------------------------------------------------
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
  const n = parseInt(await readline())
  const arr = []
  const result = []
  for (let i = 0; i < n; i++) {
    arr.push((await readline()))

  }

  arr.map(v => result.push(check(v)))
  console.log(result.join(' '));
}()

function check(str) {
  let arr = str.split(' ')
  let absent_n = 0
  let present_n = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 'absent') {
      absent_n++
      if (absent_n > 1) return false
    }
    if ((arr[i] == 'late' || arr[i] == 'leaveearly') && ((arr[i + 1] == 'late' || arr[i + 1] == 'leaveearly'))) {
      console.log(545);
      return false
    }
    if (i >= 7) {
      const temp = arr.slice(i - 6, i)

      temp.map(v => {
        if (v == 'present') {
          present_n++
        }
      })
      if (temp.length - present_n > 3) return false
    } else {
      const temp = arr.slice(0, i)
      temp.map(v => {
        if (v == 'present') {
          present_n++
        }
      })
      if (temp.length - present_n > 3) return false
    }
  }
  return true
}


//---------------------------------------------
// const rl = require("readline").createInterface({
//   input: process.stdin
// });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// void(async function () {
//   const n = parseInt(await readline());
//   const records = [];

//   for (let i = 0; i < n; i++) {
//     records.push((await readline()).split(" "));
//   }

//   getResult(records);
// })();

// function getResult(records) {
//   const res = [];
//   for (let record of records) {
//     res.push(isAward(record));
//   }

//   console.log(res.join(" "));
// }

// function isAward(record) {
//   // 总缺勤次数
//   let absent = 0;

//   // 滑窗内正常上班的次数
//   let present = 0;

//   // 记录前一次的考勤记录
//   let preRecord = "";

//   for (let i = 0; i < record.length; i++) {
//     // 滑窗长度最大为7，如果超过7，则滑窗的左边界需要右移, 滑窗失去的部分record[i - 7]
//     // 如果失去部分是present，则更新滑窗内present次数
//     if (i >= 7) {
//       if ("present" == record[i - 7]) present--;
//     }

//     // 当前的考勤记录
//     const curRecord = record[i];

//     switch (curRecord) {
//       case "absent":
//         // 缺勤不超过一次
//         if (++absent > 1) return false;
//         break;
//       case "late":
//       case "leaveearly":
//         // 没有连续的迟到/早退
//         if ("late" == preRecord || "leaveearly" == preRecord) return false;
//         break;
//       case "present":
//         present++;
//         break;
//     }

//     preRecord = curRecord;

//     // 任意连续7次考勤，缺勤/迟到/早退不超过3次, 相当于判断： 滑窗长度 - present次数 <= 3
//     const window_len = Math.min(i + 1, 7);
//     if (window_len - present > 3) return false;
//   }

//   return true;
// }