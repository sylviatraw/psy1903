let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
let equation = document.getElementById("equation");

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

let start = Date.now();

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

let rightAnswer1 = num1 + num2

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission
    event.preventDefault();

    //Stop the timer
    let end = Date.now();
    let responseTime1 = ((end - start) / 1000);

    // Collect the response
    let response = form.elements['response'].value;

    let grading1 = '';
    if (response == rightAnswer1) {
        grading1 = "correct.";
    } else { grading1 = "incorrect." };


    // Report the results
    results.innerHTML = 'You answered ' + response + " in " + responseTime1 + " seconds. This response is " + grading1;

    //Hide the form (including the instructions!)
    form.style.display = 'none';
});