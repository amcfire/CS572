class University1 {
    constructor(
        public name: String,
        public dept: String) { }
    graduation(year: number) {
        console.log(`Graduating ${this.dept} ${year} students`);
    }
}

var mum = new University1('MUM', 'Computer Science');
mum.graduation(2019);

