
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

// randomNumbers = getRandomNumber(0, 100);
// console.log(randomNumbers)

// function getRandomNumber(min, max) {
//     let randomNumber = Math.floor(Math.random() * max) + min;
//     return randomNumber;
// }

// results = []

// function getOddNumbers(numbers) {
//     for (let number of numbers) {
//         if (number % 2 == 1) {
//             results.push(number)
//         }
//     } return results
// }

// console.log(getOddNumbers([4, 9, 53, 71, 54, 2]));


results = [];

function filterNumbers(numbers, numberType) {
    if (numberType == 'odd') {
        for (let number of numbers) {
            if (number % 2 == 1) {
                results.push(number);
            }
        } return results;
    } else if (numberType == 'even') {
        for (let number of numbers) {
            if (number % 2 == 0) {
                results.push(number);
            }
        } return results;
    } else {
        alert('Error, response invalid.');
    }
}

console.log(filterNumbers([4, 9, 53, 71, 54, 2], 'evn'));
