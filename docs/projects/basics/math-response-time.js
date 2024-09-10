alert('In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.')

let start = Date.now();
let randomNum1A = Math.floor(Math.random() * 10) + 1;
let randomNum1B = Math.floor(Math.random() * 10) + 1;
let question1 = prompt("What is " + randomNum1A + " + " + randomNum1B + " ?");
let end = Date.now();
let responseTime1 = ((end - start) / 1000);



alert("You answered " + question1 + "in " + responseTime1 + " seconds!");

let start2 = Date.now();
let randomNum2A = Math.floor(Math.random() * 10) + 1;
let randomNum2B = Math.floor(Math.random() * 10) + 1;
let question2 = prompt("What is " + randomNum2A + " + " + randomNum2B + " ?");
let end2 = Date.now();
let responseTime2 = ((end2 - start2) / 1000);

alert("You answered " + question2 + "in " + responseTime2 + " seconds!");

let start3 = Date.now();
let randomNum3A = Math.floor(Math.random() * 10) + 1;
let randomNum3B = Math.floor(Math.random() * 10) + 1;
let question3 = prompt("What is " + randomNum3A + " + " + randomNum3B + " ?");
let end3 = Date.now();
let responseTime3 = ((end3 - start3) / 1000);

alert("You answered " + question3 + "in " + responseTime3 + " seconds!");

alert("Thank you for your participation!")


