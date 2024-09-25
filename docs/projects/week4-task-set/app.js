
// function celsiusToFahrenheit(temperature) {
//     let tempInFahrenheit = (temperature * 1.8) + 32;
//     return tempInFahrenheit;
// }pe

//console.log(celsiusToFahrenheit(10)); // Expected Output : 50



// function convertTemp(temperature, tempTy) {
//     let convertedTemp = 0
//     if (tempType != 'c' && tempType != 'f') {
//         alert('Error. Invalid data entered.')
//     }
//     else if (tempType == 'c') {
//         convertedTemp = (temperature * 1.8) + 32;
//     } else {
//         convertedTemp = (temperature - 32) / 1.8
//     }
//     return convertedTemp;
// }

// console.log(convertTemp(10, 'f')); // Expected Output : 50

//let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];

// function getWordLengths(words) {
//     let wordLengths = words.map(word => word.length)
//     return wordLengths
// }

// console.log(getWordLengths(words));

// longestWord = []

// function getLongestWord(words) {
//     for (let word of words) {
//         if (word.length > longestWord.length) {
//             longestWord = word
//         }
//     } return longestWord
// }
// console.log(getLongestWord(words));

randomNumbers = getRandomNumber(0, 20);

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}

// results = []

// function getOddNumbers(numbers) {
//     for (let number of numbers) {
//         if (number % 2 == 1) {
//             results.push(number)
//         }
//     } return results
// }

// console.log(getOddNumbers([4, 9, 53, 71, 54, 2]));


// results = [];

// function filterNumbers(numbers, numberType) {
//     if (numberType == 'odd') {
//         for (let number of numbers) {
//             if (number % 2 == 1) {
//                 results.push(number);
//             }
//         } return results;
//     } else if (numberType == 'even') {
//         for (let number of numbers) {
//             if (number % 2 == 0) {
//                 results.push(number);
//             }
//         } return results;
//     } else {
//         alert('Error, response invalid.');
//     }
// }

// console.log(filterNumbers([4, 9, 53, 71, 54, 2], 'even'));

alert(`Welcome to our Even/Odd Response Time Task! In a moment, you will be shown a single whole number and be asked to determine if the number is even or odd. If the number is even, type "e" and, if the number is odd, press "o." Please answer as quickly and accurately as possible.`)
let start = Date.now();

let response = '';
let results = [];
let grading = true;

for (let i = 0; i < 5; i++) {
    randomNumbers = getRandomNumber(1, 20);
    function getRandomNumber(min, max) {
        let randomNumber = Math.floor(Math.random() * max) + min;
        return randomNumber;
    }
    reply = prompt('Is the number ' + randomNumbers + ' even or odd?');
    if ((randomNumbers % 2 == 0 && reply == 'e') || (randomNumbers % 2 == 1 && reply == 'o')) {
        grading = true;
    } else {
        grading = false;
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

alert('Thank you for your time.');