
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

let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];

// function getWordLengths(words) {
//     let wordLengths = words.map(word => word.length)
//     return wordLengths
// }

// console.log(getWordLengths(words));

longestWord = []

function getLongestWord(words) {
    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word
        }
    } return longestWord
}
console.log(getLongestWord(words));