let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
let equation = document.getElementById("equation");

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');


num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

//equation.innerHTML = "What is " + num1 + " + " + num2 + "?";

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission
    event.preventDefault();

    //Stop the timer

    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    results.innerHTML = 'Hello ' + response + '!';

    //Hide the form (including the instructions!)
    form.style.display = 'none';
});