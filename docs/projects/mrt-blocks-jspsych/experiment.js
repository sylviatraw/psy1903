let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class = 'special'>Welcome to the Math Response Time Task</h1>
    <p>In this experiment, you will be given a series of simple addition problems and asked to input your answer as quickly and accurately as possible.</p>
    <p>You will be given a total of 9 math problems.</p>
    <p>Press <span class = 'key'>SPACE</span> to begin the first part.</p>
    ` ,
    choices: [' '],
};

timeline.push(welcomeTrial);

let likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

let questionnaire = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", name: 'MathEnjoyment', labels: likert_scale },
        { prompt: "I find math easy.", name: 'Easy', labels: likert_scale },
    ],
    data: { collect: true },
};

timeline.push(questionnaire);

//Math problems
for (let block of conditions) {

    let blockQuestions = jsPsych.randomization.repeat(block.questions, 1);

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1>${block.title}</h1>
        <p>You are about to be given three addition problems</p>
        <p>The terms that are being summed will be between ${block.min} and ${block.max}.</p>
        <p>Please answer as quickly and as accurately as you can.</p>
        <p>Press <span class = 'key'>SPACE</span> to begin.</p>
        `,
        choices: [' '],
    };
    timeline.push(blockIntroTrial);

    for (let question of blockQuestions) {

        let blockConditionTrial = {
            type: jsPsychSurveyHtmlForm,
            html: `<p class = 'equation'>What is <span class = 'yellow'>${question.num1}</span> + <span class = 'yellow'>${question.num2}</span>?
        <input type='text' name='userInput' id='userInput'></p>`,
            autofocus: 'userInput',
            button_label: 'Submit Answer',
            data: {
                collect: true,
                num1: question.num1,
                num2: question.num2,
                correctAnswer: question.answer,
                blockNum: block.title
            },
            on_finish: function (data) {
                if (data.response.userInput == question.answer) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(blockConditionTrial);
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
        let prefix = 'mrt';
        let dataPipeExperimentId = 'SzVuh0HavIsX';
        let forceOSFSave = true;

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
            .ignore(['trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data)
    }
};

timeline.push(debriefTrial);

jsPsych.run(timeline);