// Initialize an empty array you will populate with your conditions

let conditions = [];

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * ((max - min) + 1) + min);
    return randomNumber;
};

for (let i = 0; i < 3; i++) {

    let numbers = [];

    for (let j = 0; j < 3; j++) {
        let min = i * 10;
        let max = min + 10;

        let number1 = getRandomNumber(min, max);
        let number2 = getRandomNumber(min, max);
        numbers.push({
            num1: number1,
            num2: number2,
            answer: number1 + number2
        })
    }
    conditions.push({
        title: `Part ${i + 1}`,
        questions: numbers,
        min: i * 10,
        max: (i * 10) + 10

    });
}

// Output the resulting conditions array to make sure it is set up correctly
//console.log(conditions);