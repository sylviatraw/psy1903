// Modify the following `blocksA`, `blocksB`, and `words` arrays with appropriate values for your experiment
let blocksA = [
    ['LGBTQ+', 'Cishet'],
    ['Mental illness', 'Physical illness']
];

let blocksB = [
    ['Mental illness or LGBTQ+', 'Physical illness or Cishet'],
    ['Mental illness or Cishet', 'Physical illness or LGBTQ+']
];

// There should be 10 words per category
let words = {
    LGBTQ: ['Bisexual', 'Pansexual', 'Nonbinary', 'Queerness', 'Genderqueer', 'Transgender', 'Fluidity', 'Inclusivity', 'Diversity', 'Androgynous'],
    Cishet: ['Straight', 'Cisgendered', 'Heterosexual', 'Heteronormative', 'Cissexual', 'Hetero', 'Vanilla', 'Conformity', 'Traditional', 'Biological'],
    MentalIllness: ['Depression', 'Anorexia', 'Schizophrenia', 'Anxiety', 'Psychosis', 'Autism', 'Bipolar Disorder', 'Panic Disorder', 'OCD', 'PTSD'],
    PhysicalIllness: ['Pneumonia', 'Arthritis', 'Diabetes', 'Asthma', 'Migraine', 'Epilepsy', 'Leukemia', 'Meningitis', 'Influenza', 'Common Cold'],
};



// Your final experiment should show 36 words per category; 
// when developing your experiment you can reduce this number
// to expedite the process of testing the experiment
// Always set the count to an even number
let count = 4;



// The following code will process the above information into a `conditions` array you 
// can use to structure your experiment. 
// 
// !! DO NOT MODIFY ANY OF THE FOLLOWING CODE !!
// 
let conditions = generateConditions();
console.log(conditions);

function generateConditions() {

    let conditions = [];

    let blocks = shuffle(blocksA).concat(shuffle(blocksB));

    for (let categories of blocks) {

        let trials = [];

        for (let category of shuffle(categories)) {

            let wordChoices = [];

            if (category.includes('or')) {
                let parts = category.split(' or ');
                wordChoices = shuffle(words[parts[0]].concat(words[parts[1]]));
            } else {
                wordChoices = shuffle(words[category]);
            }

            let wordsLeft = [...wordChoices];

            for (let i = 0; i < count / 2; i++) {

                if (wordsLeft.length == 0) {
                    wordsLeft = shuffle([...wordChoices]);
                }

                let word = sample(wordsLeft);
                remove(wordsLeft, (element) => element === word);

                if (categories[0] == category) {
                    expectedResponse = 'f';
                } else {
                    expectedResponse = 'j';
                }

                trials.push({
                    word: word,
                    expectedCategory: searchObject(words, word),
                    expectedCategoryAsDisplayed: category,
                    expectedResponse: expectedResponse
                })
            }
        }

        conditions.push({
            categories: categories,
            trials: shuffle(trials)
        });
    }

    return conditions;
}


/**
* The following are miscellaneous array functions utilized in the above code
*/
// Shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Remove an element from an array
function remove(array, predicate) {
    const index = array.findIndex(predicate);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

// Select a random element from an array
function sample(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

// Search an object for a string
function searchObject(haystack, needle) {
    for (let key in haystack) {
        if (haystack[key].includes(needle)) {
            return key; // Return the key where the string was found
        }
    }
}