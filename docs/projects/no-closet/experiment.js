// Initialize the jsPsych library
let jsPsych = initJsPsych();

// Define the timeline as an empty array where we will add all our trials
let timeline = [];

// Define a welcome screen
// Uses the jsPsychHtmlKeyboardResponse plugin
// Includes a welcome message with the following content: 
/*Welcome to our IAT!
In this experiment, you will complete the following three tasks:
In task 1 you will be asked to read a short story.
In task 2 you will answer a brief set of questions.
In task 3 you will be asked to categorize a series of words. 
Press the SPACE key to begin
*/
// Use CSS and <span> to make the word “space” look like a key
// Adds the welcome screen to the timeline


let primeOptions = [
    {
        title: 'Queer',
        story: `<p class = 'instruct'>A genderfluid bisexual person has been having a very difficult time with their mental health recently. 
        She has been having feelings of impending doom and persistent negative thoughts about herself, 
        which leads to greater feelings of sadness and worry. They have also been experiencing physical manifestations of 
        these feelings such as chest tightness and overwhelming fatigue. She has had some of these symptoms for most of her 
        life, but has noticed an increased intensity lately. Overall, the anxiety and depression they have been facing have been 
        challenging to manage.</p>` //the 'instruct' class is to designate line spacing for body text of instructions screens
    },
    {
        title: 'CisHet',
        story: `<p class = 'instruct'>A cisgender straight person has been having a very difficult time with her mental health recently. She has been
         having feelings of impending doom and persistent negative thoughts about herself, which leads to greater feelings of sadness
         and worry. She has also been experiencing physical manifestations of these feelings such as chest tightness and overwhelming fatigue. 
         She has had some of these symptoms for most of her life, but has noticed an increased intensity lately. Overall, the anxiety and 
         depression she has been facing have been challenging to manage.</p>`
    },
    {
        title: 'Control',
        story: `<p class = 'instruct'>A person has been having a very difficult time with their mental health recently. The person has been having feelings 
        of impending doom and persistent negative self-thoughts, which leads to greater feelings of sadness and worry. 
        This person has also been experiencing physical manifestations of these feelings such as chest tightness and overwhelming fatigue. 
        The person has had some of these symptoms for most of their life, but has noticed an increased intensity lately. 
        Overall, the anxiety and depression this person has been facing have been challenging to manage.</p>`
    }
];

let primer = primeOptions[getRandomNumber(0, 2)];

let primingTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1>Task 1 of 3</h1>
        <p class = 'please'> Please read the following story. When you are done, press the <span class = 'key'>SPACE</span> key to move to the next task. </p>
        <p> ${primer.story}
        `,
    choices: [' '],
    data: {
        collect: true,
        whichPrime: primer.title,
    },
};

timeline.push(primingTrial);
//this is where I stopped

//Define a task 3 welcome page
//Uses jsPsychHtmlKeyboardResponse plugin
//Includes the H1 task 3 of 3
let iatWelcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1> Task 2 of 3</h1>
    <p> in this final task, you will be shown a series of words and asked to sort them into categories.</p>
    <p> Press the <span class = 'key'>SPACE</span> key to begin. </p> 
    `,
    choices: [' '],
};

timeline.push(iatWelcome);

/*Includes the text “in this final task, you will be shown a series of words and asked to sort them into categories. Press the SPACE key to begin.”
// Use CSS and <span> to make the word “space” look like a key
// Add the task 3 welcome page to the timeline 

//Use a for loop to iterate through each block in the conditions
/*Start by defining the variables leftCategory and rightCategory and accessing the category in block.categories[] */
//Define a variable count that should be set to 1 and will be used for each part

//Define an instructions page
//Uses jsPsychHtmlKeyboardResponse plugin
/*Includes the instructions: 
Part *count*
In this part the two categories will be: *leftCategory* and *rightCategory*
If the word you see in the middle of the screen should be sorted into the *left category* press the F key.
If the word should be sorted into the *rightCategory* press the J key.
Press the SPACE key to begin… 
*/
/*the word “space” and the letters “F” and “J” should use CSS and the span element to look like keys*/
//Add the instructions to the timeline 
//count++;

//Add another for loop to iterate through block.trials 
//Define a trial
//Uses jsPsychKeyboardResponse plugin
//The stimulus is the trial.word
//The key choices are F and J 
//reminder with left category (press F) and the right category (press J) should be in the left and right corners and above the word using css
/*Add a data: {} with collect: true, trialType: ‘iat’, word: trial.word,              expectedCategory: trial.expectedCategory, expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed, leftCategory: leftCategory,rightCategory: rightCategory, whichPrime: it.title */
//This will make it so that the data for the trial is collected and add the other categories
//Add an on_finish function
//Includes an if statement
//If data.response == trial.expectedResponse
//data.correct = true
//Else data.correct = false
//Add the trial to the timeline 

//Define a fixation trial
//Uses jsPsychHtmlKeyboardResponse plugin 
//The stimulus is a + 
//Set the trial_duration to 250 ms
//Set the choices to ‘NO KEY’
//Push the fixation trial to the timeline
/*this will repeat 36 times before moving on to the next block (change this in conditions file)*/



//Define a variable named “likertScale” which includes likert scale response options
//Define a questionnaire section
//Uses the jsPsychSurveyLikert 
/*Use the Preamble parameter to add the H1 “task 2 of 3” and the instructions “Please answer the following questions.”*/
/*Define the questions parameter which contains an array of objects that have the question and sets the labels using the likertScale variable*/
//Set data collect to true 
//Push the questionnaire section to the timeline 



/*Next there will be a results trial which will generate a page that tells the participant to please wait while we are saving the results of their input. It will also have a spiny thing on the page. This will use the code given to us for the results trial*/

//Define a debrief trial
/*instructions will say Thank You! The experiment is now complete; you can close this tab*/
// Choices should be NO KEY
//Push the debrief trial to the timeline

jsPsych.run(timeline);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}