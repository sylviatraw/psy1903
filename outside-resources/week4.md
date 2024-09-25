# Outside Resources Log - Week 4


## AI Prompts
how do I count the lengths of words in an array in JavaScript 

This is my code: 
let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
longestWord = []
for (let word of words; longestWord.length > word.length) {
    if (word > longestWord) {
        longestWord = word
    }
}
console.log(longestWord)

Why am I getting the following error code?
app.js:37 Uncaught SyntaxError: Unexpected token ';' (at app.js:37:23)

what are the rules about using the return function in for loops

how do you prepare a variable that will eventually have a boolean value

in my for loop currently, I am trying to generate a new random number each time that the loop runs. Right now, however, my loop keeps using the same number. Are there any functions or tools that can make this randomization restart with each loop?

This is my current code:
randomNumbers = getRandomNumber(0, 20);

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}
alert(Welcome to our Even/Odd Response Time Task! In a moment, you will be shown a single whole number and be asked to determine if the number is even or odd. If the number is even, type "e" and, if the number is odd, press "o." Please answer as quickly and accurately as possible.) 
let start = Date.now();

let response = ''
let results = []
let grading = true

for (let i = 0; i < 5; i++) {
    reply = prompt('Is the number ' + randomNumbers + ' even or odd?');
    if (randomNumbers % 2 == 0 && reply == 'e') {
        grading = true
    }
    end = Date.now();
    results.push({
        number: randomNumbers,
        response: reply,
        correct: grading,
        responseTime: ((end - start) / 1000)

    })
}

console.log(results);

I want to make it generate a new random number each time the loop is executed, but I dont know how to do this

## Outside sites
none!