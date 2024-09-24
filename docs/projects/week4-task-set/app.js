
// function celsiusToFahrenheit(temperature) {
//     let tempInFahrenheit = (temperature * 1.8) + 32;
//     return tempInFahrenheit;
// }

//console.log(celsiusToFahrenheit(10)); // Expected Output : 50



function convertTemp(temperature, tempType) {
    let convertedTemp = 0
    if (tempType != 'c' && tempType != 'f') {
        alert('Error. Invalid data entered.')
    }
    else if (tempType == 'c') {
        convertedTemp = (temperature * 1.8) + 32;
    } else {
        convertedTemp = (temperature - 32) / 1.8
    }
    return convertedTemp;
}

console.log(convertTemp(10, 'f')); // Expected Output : 50
