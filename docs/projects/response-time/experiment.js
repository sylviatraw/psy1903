let jsPsych = initJsPsych();
//let jsPsych = initJsPsych();
let timeline = [];
//let timeline = [];

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Response Time Task!</h1> 
    <p>In this experiment, you will see a blue or orange circle on the screen</p>
    <p>If you see a blue circle, press the F key.</p>
    <p>If you see a orange circle, press the J key.</p>
    <p>Press SPACE to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);
//timeline.push(welcomeTrial);


for (let condition of conditions) {
    let conditionTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <img src='images/${condition}-circle.png'>
            `,
        data: {
            collect: true
        },
        choices: ['f', 'j'],
        on_finish: function (data) {
            if (data.response == 'f' && condition == 'blue') {
                data.correct = true;
            } else if (data.response == 'j' && condition == 'orange') {
                data.correct = true;
            } else {
                data.correct = false;
            }

        }
    };
    timeline.push(conditionTrial);

    let fixationTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `+`,
        trial_duration: 500, // 500 milliseconds = .5 seconds
        choices: ['NO KEY']
    }

    timeline.push(fixationTrial);
}
//How do we know to keep the fixation trial within the loop and how do we know to put it before or after stimulus

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
        let prefix = 'response-time';
        let dataPipeExperimentId = 'your-experiment-id-here';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
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
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: 'NO_KEYS',
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
};
//What is a 'call back' function again? when do you use this?
//also when we do jsPsych dot something is that referring to a function that is in the library or?
timeline.push(debriefTrial);

jsPsych.run(timeline);
//jsPsych.run(timeline);