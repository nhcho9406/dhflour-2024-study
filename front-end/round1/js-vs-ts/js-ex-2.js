function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function() {
    console.log(`Hello, ${this.name}`);
};

function Employee(name, position) {
    Person.call(this, name);
    this.position = position;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.sayHello = function() {
    Person.prototype.sayHello.call(this);
    console.log(`My position is ${this.position}`);
};

const employee = new Employee('Jane', 'Developer');
employee.sayHello(); // "Hello, Jane" & "My position is Developer"
