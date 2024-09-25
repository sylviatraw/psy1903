//let feedback = "correct";
//let responseTime = 2.4;
//let answer = 25

//alert(`You are ${feedback}. Answer: ${answer}. Response time: ${responseTime}.`);
//let num1 = getRandomNumber(1, 10);
//let num2 = getRandomNumber(0, 100);

//console.log(num1);
//console.log(num2);

//displayRandomNumber();

//function getRandomNumber(min, max) {
//  let randomNumber = Math.floor(Math.random() * max) + min;
// return randomNumber;
//}

//function displayRandomNumber() {
//  alert(getRandomNumber(1, 10));

//}

// An Array of Numbers
//let ages = [45, 23, 28, 35, 35];

// An Array of Strings
//           0         1        2      3
//let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];
//console.log(names[0]); // 'Alice'
//names[1] = 'Bob';
//names.unshift('Sara');
//console.log(names);

// An Array can contain other Arrays
//let numbers = [1, 2, 3, [8, 9, 10]];

// An Array of mixed data types
//let mixed = ['a', 'b', 1, 2, [true, false]];

//let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

//let namesThatStartWithA = [];

for (let name of names) {
    if (name.charAt(0) == 'A') {
        namesThatStartWithA.push(name);
    }
}

//console.log(namesThatStartWithA);

//let results = [];

//for (let i = 0; i < 3; i++) {
//let start = Date.now();
//let randomNum1A = getRandomNumber(1, 10);
//let randomNum1B = getRandomNumber(1, 10);
// let question1 = prompt("What is " + randomNum1A + " + " + randomNum1B + " ?");
// let end = Date.now();
//let responseTime1 = ((end - start) / 1000);

//let rightAnswer1 = randomNum1A + randomNum1B;
//let grading1 = '';

//if (question1 == rightAnswer1) {
//grading1 = "correct.";
//} else { grading1 = "incorrect." };

//results.push([grading1, responseTime1]);

//alert("You answered " + question1 + " in " + responseTime1 + " seconds. This response is " + grading1);

//}

//console.log(results);

//function getRandomNumber(min, max) {
//let randomNumber = Math.floor(Math.random() * max) + min;
//return randomNumber;
//}

//Part 5: Objects

// let participantA = ['Alice', 21, true]

// let participantB = {
//     name: 'Alice',
//     age: 21,
//     consent: true
// }
// participantB.consent = false;
// participantB.startTime = '2:00pm';
// delete participantB.age;
// console.log(participantB)

// if (participantA[2]) {
//     //...
// };

// if (participantB.consent) {
//     //...
// };

// let person = {
//     // Strings
//     firstName: 'Elliot',
//     lastName: 'Brown',

//     // Number
//     age: 30,

//     // Array
//     hobbies: ['reading', 'gaming', 'hiking'],

//     // Nested Object
//     address: {
//         street: '324 Western Ave',
//         city: 'Cambridge',
//         zipCode: '02139'
//     },

//     // Functions
//     // Observe how the keyword *this* is used in functions to reference other properties within this object
//     getFullName: function () {
//         return `${this.firstName} ${this.lastName}`;
//     },

//     greet: function () {
//         return `Hello, my name is ${this.getFullName()} and I am ${this.age} years old.`;
//     },

//     getAddress: function () {
//         return `I live at ${this.address.street}, ${this.address.city} ${this.address.zipCode}`;
//     },

//     getHobbies: function () {
//         return `My hobbies include ${this.hobbies.join(', ')}`;
//     }
// };

// // Testing the functions, accessed via dot notation and invoked with parenthesis
// console.log(person.greet()); // Hello, my name is Elliot Brown and I am 30 years old.

// console.log(person.getAddress()); // I live at 324 Western Ave, Cambridge 02139
// console.log(person.getHobbies()); // My hobbies include reading, gaming, hiking

// // Testing the properties
// console.log(person.firstName); // Elliot
// console.log(person.age); // 30


let results = [];

for (let i = 0; i < 3; i++) {
    let start = Date.now();
    let randomNum1A = getRandomNumber(1, 10);
    let randomNum1B = getRandomNumber(1, 10);
    let question1 = prompt("What is " + randomNum1A + " + " + randomNum1B + " ?");
    let end = Date.now();
    let responseTime1 = ((end - start) / 1000);

    let rightAnswer1 = randomNum1A + randomNum1B;
    let grading1 = '';

    if (question1 == rightAnswer1) {
        grading1 = "correct.";
    } else { grading1 = "incorrect." };

    results.push({
        response: question1,
        answer: rightAnswer1,
        feedback: grading1,
        time: responseTime1
    });

    alert("You answered " + question1 + " in " + responseTime1 + " seconds. This response is " + grading1);

}

console.log(results);

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}