let jsPsych = initJsPsych();

let timeline = [];

// Welcome
//to get info about the html and the properties applied to each element can be done w the inspect element
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class= 'instructions'>Welcome to the Lexical Decision Task</h1>
    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p class= 'instructions'>Press SPACE to begin the first part.</p>
    ` ,
    choices: [' '],
};
timeline.push(welcomeTrial);

// Showed word or pseudo word (on repeat)

for (let block of conditions) {

    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1>${block.title}</h1>
        <p>You are about to see a series of ${block.count} characters.</p>
        <p>If the characters make up a word, press the F key.</p>
        <p>If the characters do not make up a word, press the J key.</p>
        <p>Press SPACE to begin.</p>
        `,
        choices: [' '],
    };
    timeline.push(blockIntroTrial);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${condition.characters}</h1>`,
            choices: ['f', 'j'],
            data: {
                collect: true,
                characters: condition.characters,
                blockId: block.title
            },
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord == true) {
                    data.correct = true;
                } else if (data.response == 'j' && condition.isWord == false) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
}

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'lexical-decision';
        //will be prefixed on the file name of your results, should be like name of experiment
        let dataPipeExperimentId = 'your-experiment-id-here';
        //this is for when we are like actually sending data to OSF
        let forceOSFSave = false;
        //sometimes we can just change this to tru to export data for testing and stuff

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        //uses advanced javascript code to get the current time stamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        //I dont really understand how this isLocalHost variable is acting as a boolean
        let isLocalHost = window.location.href.includes('localhost');

        //so the '/save' is what we are setting as like the default url where we save data
        //the if statement is like if we are not using a local server or want to save to OSF
        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        //the fetch method is a built in javascript method that allows us to send some 
        //request of data to some destination or endpoint

        //for fetch method, we specify where destination is, what method we are going to use
        //include some technical information like the header information that the server can use
        //we have the body of the request which includes experiment ID and also telling it what we want the file name to be
        //the data of the results comes from the results we set above

        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
            //only after the fetch completes is when we can use the then request to check our data
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
            //the finish trial method can be invoked, which is what allows us to proceed from results trial to debrief trial
            //the async property that we set to false above is what combines with the fetch and then methods to make sure that all
            //of this is finished and complete before moving on to debrief
        })

    }
}
timeline.push(resultsTrial);
// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data)
    }
};

timeline.push(debriefTrial);

jsPsych.run(timeline);