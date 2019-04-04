const MyMachine = require('os');
const { Observable } = require("rxjs");

function checkSystem() {
    return Observable.create(function (observer) {
        console.log('Checking your System...');
        if (MyMachine.freemem < 4e9) {
            //console.log('free memory', MyMachine.freemem);
            observer.error('This app needs at least 4 GB of RAM');
        }
        if (MyMachine.cpus().length < 2) {
            observer.error('Processor not supported');
        }
        observer.next('System is checked succesfully');
    })
}
checkSystem().subscribe(res => console.log(res), err => console.log(err));

