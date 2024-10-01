let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Demo</h1>
    <p>In this experiment, you will be given a simple addition problem and asked to input your answer as quickly and accurately as possible.</p>
    <p>You will be given 3 math problems.</p>
    <p>Press SPACE to begin the first part.</p>
    ` ,
    choices: [' '],
};

timeline.push(welcomeTrial);

//Math problems
for (let condition of conditions) {
    let conditionTrial = {
        type: jsPsychSurveyHtmlForm,
        html: `<p>What is ${condition.num1} + ${condition.num2}?
        <input type='text' name='userInput' id='userInput'></p>`,
        autofocus: 'userInput',
        button_label: 'Submit Answer',
        data: {
            collect: true,
            num1: condition.num1,
            num2: condition.num2,
            correctAnswer: condition.answer
        },
        on_finish: function (data) {
            if (data.response.userInput == condition.answer) {
                data.correct = true;
            } else {
                data.correct = false;
            }
        }
    }
    timeline.push(conditionTrial);
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