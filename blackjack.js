"use strict";
/*
CIS 124: Introduction to JavaScript
Module 6: Scrimba Exercises
Build a Blackjack game, https://scrimba.com/playlist/p3py7U7

    LESSON 2: Add vars firstCard, secondCard, sum
        a. firstCard and secondCard - set value to random number between 2-11
        b. sum = firstCard + secondCard
    LESSON 7: var hasBlackJack
        a. Create var hasBlackJack with value "false"
        b. Flip value to "true" in appropriate code block
    LESSON 8: var isAlive
        a. Create var isAlive with value "true"
        b. Flip value to "false" in appropriate code block
    LESSON 10: Add var message
        a. declare var message with value = ""
        b. reassign var message value to appropriate string
        c. log to console
    LESSON 13. Make the Start buttonn work
        a. Create a startGame() function
        b. Move conditionals inside startGame() body
    LESSON 14. Display the message
        a. store the message-el <p> in var messageEl
        b. display messageEl content using messageEl.textContent
    LESSON 15. Display the sum
        a. store sum-el <p> in var sumEl
        b. display sumEl using sumEl.textContent
    LESSON 16. Display the cards
        a. store cards-el in var cardsEl
        b. display cards values in cardsEl.textContent
    LESSON 17. New card button
        Create newCard() that logs "Drawing a new cad form the deck"
    LESSON 18. Add to the sum when newCard is clicked
        a. create a card var (2-11)
        b. add new card to var sum
        c. call startGame()
    LESSON 19. Rename startGame()
        create a new function called startGame() that calls renderGames()
Dominique Tepper, 18NOV2022*/

/* GLOBAL VARS. Tepper, 18NOV2022 */
let messageEl = document.getElementById("message-el"); // 14a
let sumEl = document.getElementById("sum-el"); // 15a
let cardsEl = document.getElementById("cards-el"); // 16a

let firstCard = 0;
let secondCard = 0;
let thirdCard = 0;
let sum = 0;
let hasBlackJack = false;
let isAlive = true; // Lesson 8a
let message = ""; // 10a
let hasThirdCard = false;


/* GAME RESET. Tepper, 21NOV2022 */
const reset = () => {
    firstCard = 0;
    secondCard = 0;
    thirdCard = 0;
    sum = 0;
    hasBlackJack = false;
    isAlive = true;
    message = "";
    hasThirdCard = false;
}


/* GENERATE CARDS. Tepper, 21NOV2022 */

// first & secondCard random generator for START GAME
const generateRandomCards = () => {
    console.log("Generating random first and second cards...");

    let randomCardOne = Math.floor(Math.random() * 11) + 1;
    let randomCardTwo = Math.floor(Math.random() * 11) + 1;

    firstCard = randomCardOne;
    secondCard = randomCardTwo;
    sum = firstCard + secondCard;

    sumEl.textContent = "Sum:" + sum; // 15b
    cardsEl.textContent = "Cards: " + firstCard + ", " + secondCard; // 16b
}

// thirdCard random generator
const generateThirdCard = () => {
    console.log("Generating new card from deck...");

    let randomCardThree = Math.floor(Math.random() * 11) + 2; // 18a
    
    thirdCard = randomCardThree;
    hasThirdCard = true;
    let sumThreeCards = sum + thirdCard;

    sum = sumThreeCards;

    sumEl.textContent = "Sum:" + sum; // 15b
    cardsEl.textContent = "Cards: " + firstCard + ", " + secondCard + ", " + thirdCard; // 16b
}


/* CARD SUM CHECK AND DRAW PROMPTS. Tepper, 21NOV2022 */
const checkCardSums = () => {
    if ((isAlive === true) && (hasThirdCard === false)) {
        if (sum === 21) { // player automatically wins
            message = "You have blackjack!";
            hasBlackJack = true;
        }
        else if (sum <= 20) {
            message = "You have " + sum + ". Do you want to draw a new card?";
        }
        else if (sum <= 20) {
            message = "Sorry, you have " + sum + ". You're out.";
            isAlive = false;
        }
    }
    else {
        if (sum === 21) {
            message = "You have blackjack!";
            hasBlackJack = true;
        }
        else {
            message = "Sorry, you have " + sum + " . You're out.";
            isAlive = false;
        }
    }
    console.log(message);
    messageEl.textContent = message; // 14b
}


/* BUTTON FUNCTIONS. Tepper, 21NOV2022 */
// START GAME
const startGame = () => {
    reset();
    generateRandomCards();
    checkCardSums();
}

// NEW CARD
const newCard = () => {
    generateThirdCard();
    checkCardSums();
}

/*************** EXTRA CHALLENGES ***************/
/* LESSON 23: ARRAYS WITH MULTIPLE DATA TYPES
    Create an array that uses the three primitive data types (num, string, boolean)
Tepper, 21NOV2022 */
/* let spno = ["Snooper Dooper", 11, true];

console.log("Lesson 23 output:\n" + spno); */

/* LESSON 21: INTRO TO ARRAYS
        a. Create an array that lists something
        b. Items in the array should be strings
    LESSON 22: ARRAY INDEXES
        Log array items to console individually.
    LESSON 24: ADDING AND REMOVING ITEMS FROM ARRAYS
        Push a new item into an existing array and log
    LESSON 28. WRITE YOUR FIRST LOOP
        a. Create a for loop that counts from 10 to 100 in steps of 10
        b. Log to console
    LESSON 30. WRITE AN ARRAY-BASED FOR LOOP
    LESSON 31. FOR LOOPS, ARRAYS, AND DOM
        Render an array in an HTML element using a for loop and .textContent
Tepper, 21NOV2022 */
/* let boardgamesEl = document.getElementById("boardgames-el");
let arrayPushEl = document.getElementById("array_push-el");
let arraySpliceEl = document.getElementById("array_splice-el");
let writeBoardgames = "";
let itemNum = 1;

let boardgames = ["Terraforming Mars", "Dice Throne", "Pandemic", "Munchkin", "King of Tokyo","Verdant", "Calico"]

    // creates a numbered list of array items to log to console
    for (let i = 0; i < boardgames.length; i++) {
        writeBoardgames += itemNum + ". " + boardgames[i] + " ";
        itemNum++;
    }
    // counts from 10 to 100 in increments of 10
    for (let i = 10; i < 101; i += 10) { // Lesson 28
        console.log(i);
    }

    // logs array to console as a "numbered list". Tepper, 22NOV2022
    console.log("Lesson 21: Arrays (Output) \nSome of the boardgames I own: \n" + boardgames);
    // writes array items in an HTML body element. Tepper, 22NOV2022
    boardgamesEl.textContent = "I have " + boardgames.length + " board games on my list and they are: " + writeBoardgames;

// adds a new item to the array. Tepper, 22NOV2022
boardgames.push("Machina Arcana"); // 24a
let moreBoardgames = "";
let itemNum2 = 1;
    for (let i = 0; i < boardgames.length; i++) {
        moreBoardgames += itemNum2 + ". " + boardgames[i] + "\n";
        itemNum2++;
    }
    // logs updated array to console
    console.log("After adding another board game, the array now has " + boardgames.length + " items. The final item is " + boardgames[boardgames.length - 1] + " and the updated list is now: \n" + writeBoardgames);
    // writes updated array in HTML body element. Tepper, 22NOV2022
    arrayPushEl.textContent = "After adding another board game, the array now has " + boardgames.length + " items. The final item is " + boardgames[boardgames.length - 1] + " and the updated list is now: \n" + moreBoardgames;

// removes a random item from the array
let sellGames = boardgames.splice((Math.floor(Math.random() * 8)),1);

    // logs updated array items to console
    console.log(sellGames + " was sold. Remaining board games are:\n" + boardgames);
    // writes updated array in HTML body element. Tepper, 22NOV2022
    arraySpliceEl.textContent = sellGames + " was sold. Remaining board games are:\n" + boardgames; */
//console.log("Original array created in Lesson 21: " + boardgames.length + "\n" + boardgames);
//console.log("Lesson 22 Output: \n" + writeBoardgames);
//console.log("Number of items in the boardgames array is " + boardgames.length + ".");

/* LESSON 9. PRACTICE BOOLEAN CONDITIONS. Tepper, 21NOV2022 */
/* console.log(4 === 3) // F
console.log(5 > 2) // T
console.log(12 > 12) // F
console.log(3 < 0) // F
console.log(3 >= 3) // T
console.log(11 <= 11) // T
console.log(3 <= 2) // F */

/* LESSON 5: IF/ELSE...IF/ELSE STATEMENT
    Check if the person is eligible for a birthday card from the King
Tepper, 18NOV2022 */
/* const centennial = () => {
    let recipientAge = parseInt(prompt("How old are you?"));

    if (isNaN(recipientAge)) {
        console.error("Non-numeric input.")
        recipientAge = parseInt(prompt("Age IS a number. Please enter your age."));
    }
    else {
        if (recipientAge < 100) {
        console.log("Sorry, you're only " + recipientAge + ", thus, ineligible for a birthday card from the King at this time.");
        }
        else if (recipientAge > 100) {
            console.log("You already received a card " + (recipientAge - 100) + " years ago.");
        }
        else if (recipientAge == 100) {
            console.log("Your birthday card from the King will arrive in 5-7 business days. Happy birthday!")
        }
    }
}
centennial(); */

/* LESSON 4: First if-else statements
    1. Check if person's age is 21 or over.
    2. Log message to console
Tepper, 18NOV2022 */
/* const bouncer = () => {
    let clubgoer = parseInt(prompt("How old are you?"));

    if (isNaN(clubgoer) || clubgoer < 21) {
        console.log("Sorry, you're only " + clubgoer + ". Party's for 21+ only.");
    }
    else if (clubgoer >= 21) {
        console.log("You said you were " + clubgoer + ". Welcome and enjoy the party!");
    }
}
bouncer(); */

/* FOOTER. Tepper, 06NOV2022 *******************************************/
const today = new Date();
let footerEl = document.getElementById("footer-el");

function footer() {
    // local variables
    let studentName = "tepper-d, ";
    let whatisToday = today.toDateString() + ".";
    
    const footerStr = studentName + whatisToday;
    footerEl.textContent = footerStr;
}
footer();

/* NOTES / REMINDERS
    1. Player and dealer is dealt 2 cards
        a. player goes first
        b. dealer only 'shows' value of 1 of 2 cards
    2. If player "hit" => draw 3rd card; else, "stay" == keep sumCards; 3 cards max
    3. results calculated as:
        a. player < dealer <= 21 == house wins
        b. dealer < player <= 21 == player wins
        c. (player == dealer) <= 21 == 'push' (neither win or lose)

How to play reference: https://www.youtube.com/watch?v=PljDuynF-j0
*/

