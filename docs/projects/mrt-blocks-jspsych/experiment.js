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
        <p>Press SPACE to begin.</p>
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