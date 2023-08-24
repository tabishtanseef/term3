const MASTER_DB = {
	
	CONFIG: {
		MAX_INPUT: 100,						// max length of typing
		MAX_ATTEMPT_ANS: 2,					// attempts for showing answer button
		INPUT_FILTER_STATUS: false,
		INPUT_FILTER: [84, 116, 70, 102],	//T AND F
		
		INPUT_TRANSFORM: 'default',		// uppercase | lowercase | default
		INPUT_TEXT_CODE: '[<>]',

		FEEDBACK_TIME: 2500
	},
	
	TITLE: '',
	INSTRUCTION: 'Match the animals with their homes.',
	QUESTIONS: [
		{
			feedback: {
				positive: '<img src="img/correct_Img.gif" alt="" />',
				negative: '<img src="img/incorrect_Img.gif" alt="" />'
			}
		}
	],
	
	ANSWERS: {
		INSTRUCTION: 'Answers'
	}
}

var tempJsonObj =
{
	"LeftHeading"  : "",
	"RightHeading" : "",
     "Left": [
		"<img src='img/1.jpg'>",
        "<img src='img/2.jpg'>",
		"<img src='img/3.jpg'>",
		"<img src='img/4.jpg'>",
		"<img src='img/5.jpg'>"
	   
    ],
    "Right": [
		"<img src='img/44.jpg'>",
		"<img src='img/33.jpg'>",
        "<img src='img/11.jpg'>",
		"<img src='img/55.jpg'>",
		"<img src='img/22.jpg'>"		
    ],
    "Answer": [
        "l1_r3",
        "l2_r5",
        "l3_r2",
        "l4_r1",
        "l5_r4"       
    ],
    "text": "Click on an option in Column A and then click on the correct answer in Column B.<br /> <br /> After completing, click on Submit.<br /> <br />To check answer, click on Show Answer."
}
var button_text={
	"1" : "Submit",
	"2" : "Show Answers"
}
var language_code={
 "1":"0"//0 for english and 1 for hindi
}
var information_text={
	"1": "Information",
	"2": "Audio"
}