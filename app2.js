//          VALUES TO INITIALIZE        //

var stringOfLetters = "";
var letterArray = [];
var editor = "";


//          GENERAL VARIABLES           //

// Elements
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var credits = document.getElementById("edited-by-title");
var date = document.getElementById("date-title");
var wordDisplay = document.getElementById("word-entry");
//var wordSubmission = document.getElementById("wordBank");
var notification = document.getElementById("notification-box");

var boxArray = [];
var shuffleBoxArray = [];

var firstBox = document.getElementById("firstBox");
var secondBox = document.getElementById("secondBox");
var thirdBox = document.getElementById("thirdBox");
var fourthBox = document.getElementById("fourthBox");
var fifthBox = document.getElementById("fifthBox");
var sixthBox = document.getElementById("sixthBox");
var seventhBox = document.getElementById("seventhBox");

//Word
var string = '';
var firstWord = false;

// Checks
var requiredLetter;
var possibleWords = [];
var checkPangram = false;
var nyt;

// Display
var foundWordsString = '';
var foundWords = [];
var nytwords = [];

// Points
//var points = 0;
//var nytpoints = 0;
//var pointCounter = document.getElementById("pointCounter");



//      on start        //

boxArray.push(firstBox);
boxArray.push(secondBox);
boxArray.push(thirdBox);
boxArray.push(fourthBox);
boxArray.push(fifthBox);
boxArray.push(sixthBox);
boxArray.push(seventhBox);
shuffleBoxArray.push(firstBox);
shuffleBoxArray.push(secondBox);
shuffleBoxArray.push(thirdBox);
shuffleBoxArray.push(fifthBox);
shuffleBoxArray.push(sixthBox);
shuffleBoxArray.push(seventhBox);

randomLetters();


//      FUNCTIONS       //

function input(letter) {
    string ++ letter;
    wordDisplay.innerHTML = string;
}


//      random letters      //

function randomLetters() {
    nyt = false;
    firstWord = false;
    //foundWordsString = "";
    //wordBank.innerHTML = foundWordsString;
    
    //points = 0;
    //pointCounter.innerHTML = points;
    
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    letterArray = [];
    
    for(var i = 0; i < 7; i++){
        letterArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        alphabet = alphabet.replace(letterArray[i], '');
        if(letterArray[i] == 'Q'){
            if(!letterArray.includes('U')){
                if(i == 6) {
                    letterArray[5] = 'U';
                } else {
                    letterArray[i + 1] = 'U';
                    i++;
                }
            }
            
        }
        console.log("done getting letters");
    }
    console.log("checking for vowel");
    if(!letterArray.includes('A') &&
           !letterArray.includes('E') && 
           !letterArray.includes('I') && 
           !letterArray.includes('O') && 
           !letterArray.includes('U')) {
            
            const vowels = 'AEIOU';
            letterArray[0] = vowels[Math.floor(Math.random() * vowels.length)];
           }
    requiredLetter = letterArray[0];
    editor = "Randomly Generated Puzzle";
    findPossibleWords();
}

//Takes dictionary file and prunes it to smaller dictionary with 
//onlywords possible with the letter combination

function findPossibleWords() {
    var req = new XMLHttpRequest();
    req.onload = function(){
    var letters = letterArray;
    possibleWords = [];
    var tempPoints = 0;
        
        var lines = this.responseText.split('\n');
            for(var line = 0; line < lines.length; line++){
                var temp = lines[line].toUpperCase();
                for(var letterCount = 0; letterCount < temp.length; letterCount++) {
                    if(temp.charAt(letterCount) != letters[0] &&
                    temp.charAt(letterCount) != letters[1] &&
                    temp.charAt(letterCount) != letters[2] &&
                    temp.charAt(letterCount) != letters[3] &&
                    temp.charAt(letterCount) != letters[4] &&
                    temp.charAt(letterCount) != letters[5] &&
                    temp.charAt(letterCount) != letters[6]
                    ) {
                        letterCount = 99;
                    } else if (letterCount == temp.length - 2 && temp.includes(requiredLetter)) {
                        possibleWords.push(temp.slice(0, temp.length - 1));
    
                        if (temp.length == 4) {
                            tempPoints += 1;
                        } else if (letterArray.every(letter => temp.includes(letter))){
                            tempPoints += temp.length + 7;
                        } else if (temp.length > 4) {
                            tempPoints += temp.length; 
                        }
                    }
                
                }
            }
        console.log(possibleWords);
        console.log("required letterrrrr" + requiredLetter);    
        scoringGuidelines = `Possible points: ${tempPoints}`;
        
        if(possibleWords.length > 50) {
            init();
        } else {
            randomLetters();
            console.log("notenoughwords")
        }

};
req.open('GET', './newdict.txt');
req.send();


}

function init() {
    var letters = letterArray;
    console.log(boxArray);
    
    for (var i = 0; i < boxArray.length; i++) {
        boxArray[i].innerHTML = letters[i];
        boxArray[i].style.backgroundColor = 'white';
        if (letters[i] == requiredLetter) {
            boxArray[i].style.backgroundColor = "gold";
        }
    }   
    getDate();
    credits.innerHTML = editor;
}

