let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;
let answer = (num1 + num2);


let response = prompt('What is ' + num1 + " + " + num2 + "?");

let feedback = '';

if (response == answer) {
    feedback = 'Correct!';
} else if (response == (answer - 1) || response == (answer + 1)) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + ' The expected answer is ' + answer + ".");

let age = prompt('How old are you?');
if (age <= 12) {
    alert('Child');
}
if (age > 12 && age <= 17) {
    alert('Teenager');
}
if (age >= 18) {
    alert('Adult');
}

let ptC_feedback = '';
let ptC_response = prompt('Enter a whole number.');

if (ptC_response % 2 == 0) {
    ptC_feedback = 'The number you entered was even.';
} else {
    ptC_feedback = 'The number you entered was odd.';
}

alert(ptC_feedback);