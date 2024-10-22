# Outside Resources Log - Week 7


## AI Prompts
if i send you a picture of a desktop can you tell me the css code i need to make it look like that desktop
okay so basically I have the following code:

let timeline = [];

let welcomePage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: <h1>Welcome to our IAT </h1>
    <p class = 'instruct'> In task 1 you will be asked to read a short story.
    In task 2 you will be asked to categorize a series of words.
    In task 3 you will answer a brief set of questions.</p>
    <p class = 'welcomeInstruct'>Press the <span class = 'key'>SPACE</span> key to begin</p>,
    //space needs to look like a key
    choices: [' ']
};

timeline.push(welcomePage);

I want the part of the code that tells the user about each part to be in its own light gray rounded-corner box on the screen and as a bulleted list

with this code, there is too much space between the bullet and the start of the sentence. how do i make the words closer to the bullet points

they are closer now but there is a different space between the bullet point and the words on each line and i want them to be uniformly spaced from the bullet points

this is my css code: .instruction-box {
    background-color: #f0f0f0;
    /* Light gray background */
    border-radius: 10px;
    /* Rounded corners */
    padding: 20px;
    /* Space inside the box */
    margin: 20px 0;
    /* Space outside the box */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    /* Slight shadow */
}

.instruction-box ul {
    list-style-type: disc;
    /* Bulleted list */
    padding-left: 20px;
    /* Indent the list */
    margin: 0;
    /* Remove default margin */
}

.instruction-box li {
    margin: 5px 0;
    /* Space between list items */
    padding-left: 20px;
    /* Space between bullet and text */
    list-style-position: outside;
    /* Ensures bullets are outside the text */
}

I want the part of the code that tells the user about each part to be in its own light gray rounded-corner box on the screen and as a bulleted list but I want the box to be centered but not the text to be centered within the box, I want the bullet points to be on the left side of the box and the text to align closely to each of the bullet points


## Outside sites
none!