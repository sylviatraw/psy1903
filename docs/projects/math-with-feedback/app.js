//Math Thingy

alert('In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.')

//Trial 1

let start = Date.now();
let randomNum1A = Math.floor(Math.random() * 10) + 1;
let randomNum1B = Math.floor(Math.random() * 10) + 1;
let question1 = prompt("What is " + randomNum1A + " + " + randomNum1B + " ?");
let end = Date.now();
let responseTime1 = ((end - start) / 1000);

let rightAnswer1 = randomNum1A + randomNum1B;
let grading1 = '';

if (question1 == rightAnswer1) {
    grading1 = "correct.";
} else { grading1 = "incorrect." };

alert("You answered " + question1 + " in " + responseTime1 + " seconds. This response is " + grading1);

//Trial 2

let start2 = Date.now();
let randomNum2A = Math.floor(Math.random() * 10) + 1;
let randomNum2B = Math.floor(Math.random() * 10) + 1;
let question2 = prompt("What is " + randomNum2A + " + " + randomNum2B + " ?");
let end2 = Date.now();
let responseTime2 = ((end2 - start2) / 1000);

let rightAnswer2 = randomNum2A + randomNum2B;
let grading2 = '';

if (question2 == rightAnswer2) {
    grading2 = "correct.";
} else { grading2 = "incorrect." };

alert("You answered " + question2 + " in " + responseTime2 + " seconds. This response is " + grading2);

//Trial 3

let start3 = Date.now();
let randomNum3A = Math.floor(Math.random() * 10) + 1;
let randomNum3B = Math.floor(Math.random() * 10) + 1;
let question3 = prompt("What is " + randomNum3A + " + " + randomNum3B + " ?");
let end3 = Date.now();
let responseTime3 = ((end3 - start3) / 1000);

let rightAnswer3 = randomNum3A + randomNum3B;
let grading3 = '';

if (question3 == rightAnswer3) {
    ;
    grading3 = "correct.";
} else { grading3 = "incorrect." };

alert("You answered " + question3 + " in " + responseTime3 + " seconds. This response is " + grading3);

alert("Thank you for your participation!")