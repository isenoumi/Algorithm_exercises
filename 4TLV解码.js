// 题目描述
// TLV编码是按 [Tag Length Value] 格式进行编码的，一段码流中的信元用 Tag 标识，Tag 在码流中唯一不重复，Length 表示信元Value的长度，Value 表示信元的值。

// 码流以某信元的 Tag 开头，Tag 固定占一个字节，Length 固定占两个字节，字节序为小端序。

// 现给定 TLV 格式编码的码流，以及需要解码的信元 Tag，请输出该信元的 Value。

// 输入码流的 16 进制字符中，不包括小写字母，且要求输出的 16 进制字符串中也不要包含小写字母；码流字符串的最大长度不超过 50000 个字节。

// 输入描述
// 输入的第一行为一个字符串，表示待解码信元的Tag；

// 输入的第二行为一个字符串，表示待解码的 16 进制码流，字节之间用空格分隔。

// 输出描述
// 输出一个字符串，表示待解码信元以 16 进制表示的 Value。

// 用例
// 输入	31
// 32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC
// 输出	32 33
// 说明	
// 需要解析的信元的Tag是31，

// 从码流的起始处开始匹配，

// 第一个信元的Tag是32，信元长度为1（01 00，小端序表示为1）；

// 第二个信元的Tag是90，其长度为2；

// 第三个信元的Tag是30，其长度为3；

// 第四个信元的Tag是31，其长度为2（02 00），

// 所以返回长度后面的两个字节即可，即32 33。

// 题目解析
// 本题题目可能比较难理解，但是大概意思如下：

// 第二行输入的码流，是由多个信元组成的，每个信元又是由tag、len、val组成

// 其中tag占一个字节，len占两个字节，而val占的的字节数由len决定，因此上面用例的第二行输入如下图：



// 可能这样大家就一目了然了吧。 

// 现在要找tag为31信元的val，从上图可以看出val为32 33
const rl = require('readline').createInterface({
  input: process.stdin
})
let iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value
void async function () {
  var tag = parseInt(await readline())
  var stream = await readline()
  console.log(tag, stream);
}()