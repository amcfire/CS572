var University1 = /** @class */ (function () {
    function University(name, dept) {
        this.name = name;
        this.dept = dept;
    }
    University1.prototype.graduation = function (year) {
        console.log("Graduating " + this.dept + " " + year + " students");
    };
    return University1;
}());
var mum = new University1('MUM', 'Computer Science');
mum.graduation(2019);
