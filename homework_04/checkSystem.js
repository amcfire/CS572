const MyMachine = require('os');
const { Observable } = require("rxjs");

function checkSystem() {
    const objObservable = Observable.create(function (observer) {
        console.log('Checking your System...');
        if (MyMachine.freemem < 4e9) {
            //console.log('free memory', MyMachine.freemem);
            console.log('This app needs at least 4 GB of RAM');
        }
        if (MyMachine.cpus().length < 2) {
            console.log('Processor not supported');
        }
    });
    objObservable.subscribe();
}

checkSystem();
