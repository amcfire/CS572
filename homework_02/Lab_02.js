Array.prototype.even = function () {
    let tempArray = this;
    setTimeout(() => {
        let ans = tempArray.filter((e) => e % 2 === 0)
        console.log(ans);
    }, 0);
}

Array.prototype.odd = function () {
    let tempArray = this;
    setImmediate(() => {
        let ans = tempArray.filter((e) => e % 2 !== 0)
        console.log(ans);
    });
}

console.log('start');
[1, 2, 3, 4, 5, 6, 7, 8].even();
[1, 2, 3, 4, 5, 6, 7, 8].odd();
console.log('end');