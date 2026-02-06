`use strict`;

//#region Constructors 
    //Constructors are writen with a captial first letter. 
    const Person = function(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }


//#endregion

//#region Prototyes
    Person.prototype.calcAge = function() {
        const today = new Date; 
        age = (today.getFullYear() - this.birthYear); 
        return age; 
    }

    Person.prototype.species = `Homo Sapiens`; 
    const john = new Person(`John`, 1991);
    const mia = new Person(`Mia`, 1994);

    console.log(john.calcAge())
    console.log()


    console.log(john instanceof Person); 
    console.log(john.hasOwnProperty('firstName')); 
    console.log(john.__proto__);

    const arr = [2, 5,3,21,5,6]; 

    console.log(arr.__proto__); 

//#endregion 

//#region Coding Challenge 1
    const Car = function(make, speed){
        this.make = make; 
        this.speed = speed; 
    }
    Car.prototype.accelerate = function(){
        this.speed += 10; 
        console.log(`${this.speed} km/h`)
    }
    Car.prototype.break = function(){
        this.speed -= 5; 
        if(this.speed < 0) this.speed = 0; 
        console.log(`${this.speed} km/h`)
    }

    const car1 = new Car(`BMW`, 120)
    const car2 = new Car(`Mercedes`, 95);

    // car1.accelerate();
    // car2.break();
    // car1.accelerate();
    // car2.break();
    // car1.accelerate();
    // car2.accelerate();
    // car1.break();
    // car2.accelerate();
    // car1.break();
    // car2.accelerate();
    // car1.break();
    // car2.accelerate();

//#endregion

//#region ES6 Classes

    // 1. Classes are NOT hoisted (can't be used before they are declaired)
    // 2. Classes are first-class citizens (can be passed and returned from functions)
    // 3. Classes are executed in strict mode

    // Class declaration
    class PersonCl{
        constructor(fullName, birthYear){
            this.fullName = fullName;
            this.birthYear = birthYear; 
        }

        // Instance method (All instances will have this function added to their prototypes)
        calcAge(){
            const today = new Date
            console.log(today.getFullYear() - this.birthYear);
        }

        get firstIntial(){
            return this._fullName[0]; 
        }

        set fullName(name){
            if(name.includes(' ')) this._fullName = name; 
            else console.log(`Not a full name`);
        }

        get fullName(){
            return this._fullName; 
        }

        // Can not be access by instances of the class
        static hey(){
            console.log(`This is a static method and can only be called on the Person constructor! `)
        }
    }

    const bradley = new PersonCl('bradley Foster', 2018); 
    bradley.calcAge();
    console.log(bradley.firstIntial); 

//#endregion

//#region Getters and Setters
    const account = {
        owner: `John`,
        movements: [200, 530, 120,300],
        
        get latest(){
            return this.movements.slice(-1).pop();
        },

        set latest(mov){
            this.movements.push(mov);
        }
    };

    console.log(account.latest);
    account.latest = 15; 
    console.log(account.latest);
//#endregion

//#region Static Methods

Person.hey = function(){
    console.log(`hey there`);
}
//#endregion

//#region Coding Challenge 2. 
    class CarCL {
        constructor(make, speed){
            this.make = make;
            this.speed = speed
        }

        accelerate(){
            this.speed += 10; 
            console.log(`${this.make} is going ${this.speed} mph`);
        }

        brake(){
            this.speed = this.speed - 5 > 0 ? this.speed - 5: 0; 
            console.log(`${this.make} is going ${this.speed} mph`);
        }

        get speedKPH(){
            return this.speed * 1.6
        }

        set speedKPH(speed){
            this.speed = speed * 1.6; 
        }
    }

    const ford = new  CarCL(`Ford`, 120)
    console.log(ford.speedKPH);
    ford.accelerate();
    ford.accelerate();
    ford.accelerate();
    ford.brake();
    ford.speedKPH = 50; 
    console.log(ford);

//#endregion 

//#region Inheritance Between Classes
    const Student = function (firstName, birthYear, course){
        Person.call(this, firstName, birthYear )
        this.course = course;
    }

    Student.prototype = Object.create(Person.prototype); 

    Student.prototype.introuduce = function(){
        console.log(`My name is ${this.firstName} and I study ${this.course}`)
    }

    const mike = new Student(`mike`, 2020, `Computer Scince`); 
    mike.introuduce(); 
    console.log(mike.calcAge()); 

    class StudentCL extends PersonCl{
        constructor(fullName, birthYear, course){
            super(fullName, birthYear);
            this.course = course
        }

        introuduce(){
            console.log(`My name is ${this.fullName} and I study ${this.course}`)
        }

        calcAge(){
            let thisYear = new Date().getFullYear(); 
            console.log(`I'm ${thisYear - this.birthYear} but I feel more like ${thisYear - this.birthYear + 10}`)
        }
    }

    const sophia = new StudentCL(`Sophia Foster`, 2023, `Coloring`);
    sophia.introuduce(); 
    sophia.calcAge(); 

    class Account {
        constructor(owner, currency, pin){
            this.owner = owner; 
            this.currency = currency; 
            this.pin = pin; 
            this.movements = [];
            this.locale = navigator.language; 

            console.log(`Thanks for opening an account ${this.owner}`); 
        }

        deposit(val){
            this.movements.push(val);
        }

        withdrawl(val){
            this.deposit(-val);
        }

        appoveLoan(val){
            return true; 
        }

        requestLoan(val){   
            if(this.appoveLoan(val)){
                this.deposit(val);
                console.log(`Loan approved`); 
            }
        }
    }

    const acc1 = new Account(`John`, `US`, 1111); 
    acc1.deposit(250); 
    acc1.withdrawl(140); 
    acc1.requestLoan(1000); 
    console.log(acc1); 
//#endregion

//#region Coding Challenge 3
    const EV = function(make, speed, charge){
        Car.call(this, make, speed)
        this.charge = charge; 
    }

    EV.prototype = Object.create(Car.prototype);

    EV.prototype.chargeBattery = function(chargeTo){
        this.charge = chargeTo > 100 ? 100: chargeTo < 0 ? 0 : chargeTo;
    }

    EV.prototype.accelerate = function(){
        this.speed += 20; 
        this.charge = charge - 1 > 0 ? charge - 1 : 0; 
        console.log(`${this.make} is going ${this.speed} mph, with a charge of ${this.charge}`);
    }

    const tesla = new EV(`Tesla`, 120, 23); 
    tesla.chargeBattery(120); 
    console.log(tesla); 
//#endregion

