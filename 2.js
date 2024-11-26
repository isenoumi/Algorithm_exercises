 const rl = require('readline').createInterface({
   input: process.stdin
 })
 let iter = rl[Symbol.asyncIterator]()
 const readline = async () => (await iter.next()).value
 void async function () {
   const [n, e] = (await readline()).split(' ').map(Number)
   const launches = new Array(n).fill(20001);
   for (let i = 0; i < e; i++) {
     const [t, p] = (await readline()).split(' ').map(Number)
     launches[p] = t
   }
   for (let i = 0; i < n; i++) {
     for (let j = 0; j < n; j++) {
       const inner = Math.abs(i - j)
       const outer = n - inner
       const dis = Math.min(inner, outer)
       launches[j] = Math.min(launches[j], launches[i] + dis)
     }
   }
   console.log(launches);
   let max = 0
   let last = []
   launches.map((v, index) => {
     if (v < max)
       return
     if (v > max) {
       max = v
       last = []
     }

     last.push(index)

   })
   console.log(last.length);
   console.log(last.sort((a, b) => a - b).join(' '));
 }()