//          VALUES TO INITIALIZE        //

var stringOfLetters = "";
var letterArray = [];
var scoringGuidelines = "";
var nytScoringGuidelines = 
`Beginner (0)
Good Start (5)
Moving Up (11)
Good (18)
Solid (34)
Nice (57)
Great (92)
Amazing (115)
Genius (160) `;

var editor = "";

//          GENERAL VARIABLES          //

// Elements
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var credits = document.getElementById("edited-by-title");
var date = document.getElementById("date-title");
var wordDisplay = document.getElementById("word-entry");
var wordBank = document.getElementById("word-bank");
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



//Letters
/*var shuffleLetters = [];
for (var i = 0; i < letterArray.length; i++) {
    if (i != 3) {
        shuffleLetters.push(letterArray[i]);
    }
}*/

//Word
var string = '';
var firstWord = 0;

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
var points = 0;
var nytpoints = 0;
var pointCounter = document.getElementById("point-counter");
  



//              JAVASCRIPT                //


randomLetters();

//Adds a new letter to the current guess
function input(letter) {
    string += boxArray[letter - 1].innerHTML;
    wordDisplay.innerHTML = string;
    console.log(wordDisplay);
}

//Checks to see if submitted word contains more than 3 letters. 
//Notifies user if no word has been typed or if the word is less
//than four letters
function checkLength() {
    if (string.length == 0) {
        notification.innerHTML = "Type a word";
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    } else if (string.length < 4) {
        alert("Word is too short");
        string = '';
        wordDisplay.innerHTML = string;
    } else {
        checkRequiredLetter();        
    }
}

//Checks to see if submitted word includes the required letter. 
//Notifies user if word does not include required letter.
function checkRequiredLetter() {
    if (!string.includes(requiredLetter)) {
        notification.innerHTML = "Does not include center letter";
        string = '';
        wordDisplay.innerHTML = string;
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    } else {
        checkWord();
    }
}

//Checks if submitted word is legitimate, comparing it to dictionary
//passed in by user. Notifies user if word has already been found or
//if the word is not in the dictionary
function checkWord() {
    if (foundWords.includes(string)) {
        notification.innerHTML = "Already been found";
        string = '';
        wordDisplay.innerHTML = string;
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    } else if(possibleWords.includes(string)) {
        submitWord();
    } else {
        notification.innerHTML = "Not in word list";
        string = '';
        wordDisplay.innerHTML = string;
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    }  
}

//Calculates and adds score of a word, and adds word to found
//words bank
function submitWord() {
    if (firstWord != 0) {
        foundWordsString += ', ';
    }
    calculateScore();
    checkPangram = false;
    foundWords.push(string);
    foundWordsString += string;
    if(nyt){
        nytwords.push(string);
    }
    wordBank.innerHTML = foundWordsString;
    string = '';
    wordDisplay.innerHTML = string;
    firstWord++;
}

//Calculates a score for a submitted word
//      1 point if the word is 4 letters long
//      Points equal to word length if word is longer than 4 letters
//      Points equal to 7 plus word length if word is a pangram
function calculateScore() {
    isPangram();
    
    if (string.length == 4) {
        notification.innerHTML = '+1';
        points += 1;
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    } else if (checkPangram == true){
        notification.innerHTML = `Pangram! +${string.length + 7}`;
        points += string.length + 7;
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    } else if (string.length > 4) {
        notification.innerHTML = `+${string.length}`;
        points += string.length; 
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    }
    if(nyt){
        nytpoints = points;
    }
    pointCounter.innerHTML = points.toString();
}

//Checks whether current word is a pangram
function isPangram() {
    if (letterArray.every(letter => string.includes(letter))) {
        checkPangram = true;
    } else {
        checkPangram = false;
    }
}

//Removes a letter from the end of the current string
function deleteLetter() {
    string = string.slice(0, -1);
    wordDisplay.innerHTML = string;
}

//Creates an alert that shows the scoring threshholds 
function showScoringGuidelines() {
    alert(scoringGuidelines);
}



function init() {
    var letters = letterArray;
    
    boxArray[0].style.backgroundColor = "#f8dc24";
    boxArray[0].innerHTML = letters[0];
    
    for (var i = 0; i < boxArray.length; i++) {
        boxArray[i].innerHTML = letters[i];
        if(i == 0){
            boxArray[i].style.backgroundColor = "#f8dc24";
        } else {
            boxArray[i].style.backgroundColor = '#e8e4e4';
        }
    }   
    getDate();
    credits.innerHTML = editor;
    wordDisplay.innerHTML = '';
}

function shuffle() {
    var arrayNumber = 0;
    //var letters = shuffleLetters.slice();
    var boxValues = boxArray.slice();
    var letters = letterArray.slice();
    
    boxValues[0].style.backgroundColor = "#f8dc24";
    boxValues[0].innerHTML = letters[0];
    letters.splice(0,1);
    
    for (var i = 1; i < boxValues.length; i++) {
        arrayNumber = Math.floor(Math.random() * (letters.length));
        boxValues[i].innerHTML = letters[arrayNumber];
        
        boxValues[i].style.backgroundColor = '#e8e4e4';
        letters.splice(arrayNumber, 1);
    }
}

function randomLetters() {
    nyt = false;
    firstWord = 0;
    foundWordsString = "";
    wordBank.innerHTML = foundWordsString;
    
    points = 0;
    pointCounter.innerHTML = points;
    
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
    console.log("found random letters");
    findPossibleWords();
}

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(monthNames[today.getMonth()]);
    var yyyy = today.getFullYear();
    
    todaysDate = mm + ' ' + dd + ', ' + yyyy;
    
    date.innerHTML = todaysDate;
}



//Takes dictionary file and prunes it to smaller dictionary with 
//onlywords possible with the letter combination

function findPossibleWords() {
    var req = new XMLHttpRequest();
    req.onload = function(){
        var letters = letterArray;
        possibleWords = [];
        var tempPoints = 0;
        var pangramExists;

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
                            var newWord = temp.slice(0, temp.length - 1);
                            possibleWords.push(newWord);



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
            scoringGuidelines = `Possible points: ${tempPoints}`;

            if(possibleWords.length > 120) {
                init();
            } else {
                randomLetters();
            }

    };
req.open('GET', './newdict.txt');
req.send();


}


function scrape() {
    nyt = true;
    foundWords = nytwords.slice();
    foundWordsString = "";
    points = nytpoints;
    pointCounter.innerHTML = points;
    
    for(var i = 0; i < foundWords.length; i++){
        if(i == 0) {
            foundWordsString += foundWords[i];
        } else {
            foundWordsString += ", " + foundWords[i];
        }
    }
    
    
    wordBank.innerHTML = foundWordsString;
    
    var getLetters = new XMLHttpRequest();
    getLetters.onreadystatechange = function() {
    if(getLetters.readyState == 4) {
        if(getLetters.status == 200){
            console.log("loaded");
            
            
            var result = getLetters.responseText;
            console.log(result);

            
            result = result.split("gameData")[1];
            result = result.split("today\":")[1];
            result = result.split("yesterday")[0];
            result = result.slice(0, -2);
            var newResult = JSON.parse(result);
            console.log(newResult);
            
        
            
            stringOfLetters = "";
            letterArray = [];

            stringOfLetters += newResult.centerLetter.toUpperCase();
            for(var i = 0; i < newResult.outerLetters.length; i++){
                stringOfLetters += newResult.outerLetters[i].toUpperCase();
            }
            //console.log(stringOfLetters);
            letterArray = stringOfLetters.split("");
            //console.log(letterArray);
            requiredLetter = letterArray[0]
            editor = "Edited by " + newResult.editor;
            possibleWords = "";
            possibleWords = newResult.answers;
            for(var i = 0; i < possibleWords.length; i++){
                possibleWords[i] = possibleWords[i].toUpperCase();
            }
            console.log(possibleWords);
            
            var tempPoints = 0;
            possibleWords.forEach(word => {
                if (word.length == 4) {
                    tempPoints += 1;
                } else if (letterArray.every(letter => word.includes(letter))){
                    tempPoints += word.length + 7;
                } else if (word.length > 4) {
                    tempPoints += word.length; 
                }
            });
            

            scoringGuidelines = `Possible points : ${tempPoints}`;
            
            init();
            
        } else {
            alert(`Since NYT doesn't yet have a public games API, webscraping is the only method to get the official NYT letters.

The NYT server doesn't return any Allow-Cross-Allow-Origin headers, but it is possible to use an externsion ("Allow CORS: Access-Cross-Allow-Origin" extension from Muyor) to set this header to the server response for CHROME and FIREFOX

`);
        }
        
    } 
};


getLetters.open('GET', 'https://www.nytimes.com/puzzles/spelling-bee', 'false');
getLetters.send();
    
}





/*async function getLetters(url) {
        try {
            const browser = await puppeteer.launch();

            const page = await browser.newPage();
            await page.setExtraHTTPHeaders({
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
            });
            await page.goto(url);

            await page.waitForSelector('#pz-game-root > div > div.sb-controls-box > div > div.sb-hive > div > svg.hive-cell.center > text');

            const body = await page.evaluate(() => {
                var letterCollection = 'Letters: ';
                var letters = document.querySelectorAll('text.cell-letter');
                letters.forEach((letter) => {
                    var character = letter.textContent;
                    letterCollection += character;
                })
                return letterCollection;
            });

            console.log(body);

            await browser.close();
        } catch (err) {
            console.log(err);
        }
    
} */