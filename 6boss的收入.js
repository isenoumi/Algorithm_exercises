// 题目描述
// 一个XX产品行销总公司，只有一个boss，其有若干一级分销，一级分销又有若干二级分销，每个分销只有唯一的上级分销。

// 规定，每个月，下级分销需要将自己的总收入（自己的+下级上交的）每满100元上交15元给自己的上级。 

// 现给出一组分销的关系，和每个分销的收入，请找出boss并计算出这个boss的收入。

// 比如：

// 收入100元，上交15元；
// 收入199元（99元不够100），上交15元；
// 收入200元，上交30元。
// 输入：

// 分销关系和收入：[[分销id 上级分销id 收入], [分销id 上级分销id 收入], [分销id 上级分销id 收入]]

// 分销ID范围： 0..65535
// 收入范围：0..65535，单位元
// 提示：

// 输入的数据只存在1个boss，不存在环路

// 输出：

// [boss的ID, 总收入]

// 输入描述
// 第一行输入关系的总数量 N
// 第二行开始，输入关系信息，格式：

// 分销ID 上级分销ID 收入


// 比如：

// 5
// 1 0 100
// 2 0 199
// 3 0 200
// 4 0 200
// 5 0 200

// 输出描述
// 输出：

// boss的ID 总收入


// 比如：

// 0 120

// 备注
// 给定的输入数据都是合法的，不存在环路，重复的

// 用例
// 输入	5
// 1 0 100
// 2 0 199
// 3 0 200
// 4 0 200
// 5 0 200
// 输出	0 120
// 说明	
// 无

// 题目解析
// 本题的代理商结构其实就是一个树形结构，树根就是顶级代理商。

// 因此，本题要求顶级代理商的钱，其实就是一个深搜过程，即每个父级代理商的钱 要从其所有子级商汲取（每100元抽15元）。

// 本题的难点在于，不知道树根是哪个？即不知道顶级代理商号是多少。

// 我的解题思路如下：

// 定义一个income字典，其key是代理商号，val是该代理商赚的钱
// 定义一个agents集合来记录所有出现过的代理商号
// 定义一个ch_fa字典，其key是子级代理商，val是父级代理商
// 定义一个fa_ch字典，其key是父级代理商，val是一个集合，记录key的所有子级代理商
// 而顶级代理商必然没有父级，因此，我们只要遍历agents，用被遍历到的每一个agent去ch_fa中找，如果找不到，则说明对应的agent就是顶级代理商号root。

// 找到顶级代理商号root后，根据fa_ch，找到root代理商的所有子代理商chs，然后遍历chs，得到每一个ch的赚的钱，从每个ch赚的钱中100抽15，汲取到root代理商赚的钱中。

// 当然，每个ch赚的钱，也有来自于ch的子级代理商们，同样按照每100抽15的规则汲取。这是一个递归过程。

// 2024.9.5

// 本题的极端层级数可能很大，因此基于递归实现的深搜，可能会Stack Overflow。

// 除了递归这种自顶向下的策略外，我们还可以从最低级的代理商往上递推。对应的策略是拓扑排序，关于拓扑排序可以看下：

// LeetCode - 207 课程表（Java & JS & Python & C）_leetcode 课程-CSDN博客
// https://blog.csdn.net/qfc_128220/article/details/127804547?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522F57D4688-BE0A-4C04-9F5B-57159D12C1E4%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=F57D4688-BE0A-4C04-9F5B-57159D12C1E4&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-11-127804547-null-null.nonecase&utm_term=%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F&spm=1018.2226.3001.4450
// 本题，即将叶子节点代理商的入度看为0，然后不停剥离叶子代理商。

const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
const income = {}
const agents = new Set()
const ch_fa = {}
const fa_ch = {}
void async function () {
  const n = parseInt(await readline())
  for (let i = 0; i < n; i++) {
    const [ch_id, fa_id, ch_income] = (await readline()).split(' ')
    income[ch_id] = parseInt(ch_income)
    agents.add(ch_id)
    agents.add(fa_id)
    ch_fa[ch_id] = fa_id
    if (!fa_ch[fa_id]) fa_ch[fa_id] = []
    if (!fa_ch[ch_id]) fa_ch[ch_id] = []
    fa_ch[fa_id].push(ch_id)

  }
  console.log(income, agents, ch_fa, fa_ch);
  for (let agent of agents) {
    if (!ch_fa[agent]) {
      income[agent] = 0
      fun(agent)
      console.log(agent + ' ' + income[agent]);
    }
  }
}()

function fun(fa_id) {
  const chs = fa_ch[fa_id]
  if (chs.length > 0) {
    for (let i = 0; i < chs.length; i++) {
      fun(chs[i])
      income[fa_id] += parseInt(income[chs[i]] / 100) * 15
    }

  }
}

//--------------------------------------

/**
 * 输入：
 * 5
 * 1 0 100
 * 2 0 199
 * 3 0 200
 * 4 0 200
 * 5 0 200
 * 输出：
 * 0 120
 * 
 * 
const rl = require("readline").createInterface({
  input: process.stdin
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// income: 记录每个代理商赚的钱, key是代理商号, val是代理商赚的钱
const income = {};
// agents: 记录所有的代理商号
const agents = new Set();
// ch_fa: key是子级代理商号, val是父级代理商号
const ch_fa = {};
// fa_ch: key是父级代理上号, val是key的所有子级代理商号
const fa_ch = {};

void(async function () {
  const n = parseInt(await readline());

  for (let i = 0; i < n; i++) {
    // 子级代理商号,父级代理商号,子级代理商号赚的钱
    const [ch_id, fa_id, ch_income] = (await readline()).split(" ");

    income[ch_id] = parseInt(ch_income);

    agents.add(ch_id);
    agents.add(fa_id);

    ch_fa[ch_id] = fa_id;

    if (!fa_ch[fa_id]) fa_ch[fa_id] = [];
    if (!fa_ch[ch_id]) fa_ch[ch_id] = [];

    fa_ch[fa_id].push(ch_id);
  }

  console.log(getResult());
})();

function getResult() {
  for (let agent of agents) {
    // 顶级代理商号（根）没有父级
    if (!ch_fa[agent]) {
      // 设置顶级代理商号 初始金额 为0
      income[agent] = 0;
      // 开始深搜
      dfs(agent);
      return `${agent} ${income[agent]}`;
    }
  }
}

// 基于递归的深搜
function dfs(fa_id) {
  // 父级代理商号的所有子级代理商号chs
  const chs = fa_ch[fa_id];

  // 如果存在子级代理商, 则父级代理商从每一个子级代理商赚的钱中：每100元抽15元
  if (chs.length > 0) {
    for (let ch_id of chs) {
      dfs(ch_id);
      income[fa_id] += Math.floor(income[ch_id] / 100) * 15;
    }
  }
}
 */