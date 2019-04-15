class University {
    constructor(
        public name: String,
        public dept: String) { }
    graduation(year: number) {
        console.log(`Graduating ${this.dept} ${year} students`);
    }
}

var mum = new University('MUM', 'Computer Science');
mum.graduation(2019);

