// Exercise 1 using ES6 Features

const function1= function (arrayForbidenWords){
		let  tempArray=this.split(" ")
    .map(e=>{
    		if(arrayForbidenWords.find(a=>a===e,false))
      		return "*****";
        else
        	return e;
    }).reduce((j,k)=>j+" "+k,"") ;
    return tempArray;
	}
  
String.prototype.filterwords=function1;
console.log("This House is Nice".filterwords(["House","Nice"]));


// Exercise 1 Promises

const function2=function (arrayForbidenWords) {
  return new Promise((resolve, reject) => {
    let  tempArray=this.split(" ")
    .map(e=>{
    		if(arrayForbidenWords.find(b=>b===e,false))
      		return "*****";
        else
        	return e;
    }).reduce((j,k)=>j+" "+k,"") ;
    resolve(tempArray);
    reject("error");
  });
}


String.prototype.filterWordsPromises=function2;
console.log("step1");
console.log("This House is Nice".filterWordsPromises(["House","Nice"]).then( e=> console.log(e) ));
console.log("step2");

// Exercise 1 Async

const function3=async function(arrayForbidenWords){
		try{
			let  tempArray= await this.split(" ")
			.map(e=>{
					if(arrayForbidenWords.find(b=>b===e,false))
					return "*****";
				else
					return e;
			}).reduce((j,k)=>j+" "+k,"") ;
			
			return tempArray;
		}
		catch(error){
			return "error";
		}
	}
  
String.prototype.filterwords=function3;
console.log("step1");
console.log("this House is Nice".filterwords( ['House','Nice']).then(e=> console.log(e)));
console.log("step2");

// Exercise 1 Observables

const function4=async function(arrayForbidenWords){
	const { Observable, of, from } = rxjs;
	const { map, reduce } = rxjs.operators;
	let  tempArray= await this.split(" ");
	from(tempArray)
		.pipe(
			map(obj => {
      	if(arrayForbidenWords.find(b=>b===obj,false))
 				{
					return "***"
				} else {
					return obj
				}
			}),
			reduce((w1,w2)=> w1+' ' +w2)
			
			)
		.subscribe((x) => console.log(x))
} 

String.prototype.filterwords=function4;
console.log("step1");
console.log("this House is Nice".filterwords( ['House','Nice']));
console.log("step2");

// Exercise 2

function isWeekend(){
  const todayDate = new Date();
  const day = todayDate.getDay();
  const TypeDays = ['weekEnd','weekDay','weekDay','weekDay','weekDay','weekDay','weekEnd']; 
  return TypeDays[day];
}

console.log("Day Type:",isWeekend());

// Exercise 3

item = {
 name: "avocado",
 type: "fruit",
 category:"food",
 price: 200
 
}

let applyCupon = element => discount => element.price=element.price*(1-discount);
console.log(applyCupon(item)(0.1));
console.log(item.price===180);

