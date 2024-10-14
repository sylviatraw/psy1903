for (let block of conditions) {

    // Screen with instructions, indicating the two categories
    // and the expected keys to be pressed

    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    console.log('leftCategory: ' + leftCategory);
    console.log('rightCategory: ' + rightCategory);

    for (let trial of block.trial) {
        let example = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `...`,
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory
            },
            on_finish: function (data) {

                // if data.response == trial.expectedResponse {
                // data.correct = true
                // else
                // data.correct = false
            }
            timeline.push(example)

        }
        // Screen that displays trial.word in center
        // as well as the left/right categories
        // listening for key response (f, j)
        // on_finish: process the response, store the appropriate data
    }
}

timeline.push(example)