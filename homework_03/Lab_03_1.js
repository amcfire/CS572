const dns = require('dns');
const {promisify} = require('util')
const { from } = require("rxjs");
let ipId = promisify(dns.resolve4);

let promise1 = ipId('www.mum.edu').then(
    (r)=> r
)

async function ipIdentify(){
    let ans = await ipId('mum.edu')
    console.log("IP Address of MUM:", ans)
}

ipIdentify();

from(promise1).subscribe((e) => console.log(e), null ,() => console.log('Process Terminated'));