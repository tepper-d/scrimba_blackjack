/*
CIS 124: Introduction to JavaScript
Module 6: Scrimba Exercises
Build a Blackjack game, https://scrimba.com/playlist/p3py7U7
Dominique Tepper, 18NOV2022
*/

"use strict";

/* GLOBAL VARS. Tepper, 18NOV2022 */
let firstCard = 0;
let secondCard = 0;
let thirdCard = 0;
let sum = 0;
let hasBlackJack = false;
let isAlive = true; // Lesson 8a
let message = ""; // 10a

/* LESSON 2: Add vars firstCard, secondCard, sum
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
Tepper, 18NOV2022*/

/* TEST SPACE. Tepper, 21NOV2022 */
const startGame = () => {
    let messageEl = document.getElementById("message-el"); // 14a
    let sumEl = document.getElementById("sum-el"); // 15a
    let cardsEl = document.getElementById("cards-el"); // 16a

    let cardOne = Math.floor(Math.random() * 11) + 1;
    let cardTwo = Math.floor(Math.random() * 11) + 1;
    let cardTotal = cardOne + cardTwo;
    let blackjack = false;
    let inGame = true;
    let msg = "";

    console.log("btn click");
    if (cardTotal <= 20) {
        msg += "You have " + cardTotal + ". Do you want to draw a new card?";
    }
    else if (cardTotal === 21) {
        msg += "You have blackjack!";
        blackjack = true;
    }
    else {
        msg += "Sorry, you have " + cardTotal + " . You're out.";
        inGame = false;
    }
    console.log(msg);
    messageEl.textContent = msg; // 14b
    sumEl.textContent = "Sum:" + cardTotal; // 15b
    cardsEl.textContent = "Cards: " + cardOne + ", " + cardTwo; // 16b
}

const newCard = () => {
    console.log("Drawing a new card from the deck.");
}

/* FIRSTCARD FUNCTIONS. Tepper, 18NOV2022 */
// firstCard random value generator
const kort1 = () => {
    let korten1 = Math.floor(Math.random() * 11) + 1;
    firstCard = korten1;
}

// firstCard draw prompt
const getKort1 = () => {
    let getFirstCard = "";

    getFirstCard = prompt("Draw first card? (Y/N)", "Y");

    while (getFirstCard != "Y" || getFirstCard != "y") {
        if (getFirstCard === "y" || getFirstCard === "Y") {
            kort1();
        }
        else {
            getFirstCard = prompt("Ready for your first card? (Y/N)", "Y");
        }
    }
}


/* SECONDCARD FUNCTIONS. Tepper, 18NOV2022 */
// secondCard random value generator
const kort2 = () => {
    let korten2 = Math.floor(Math.random() * 11) + 1;
    secondCard = korten2;
}

// secondCard draw prompt
const getKort2 = () => {
    let getSecondCard = "";

    getSecondCard = prompt("Draw next card? (Y/N)", "Y");

    while (getSecondCard != "Y" || getSecondCard != "y") {
        if (getSecondCard === "y" || getSecondCard === "Y") {
            kort2();
        }
        else {
            getSecondCard = prompt("Dealer is ready. Draw next card? (Y/N)", "Y");
        }
    }
}


/* THIRDCARD FUNCTIONS. TEPPER, 21NOV2022 */
// secondCard random value generator
const kort3 = () => {
    let korten3 = Math.floor(Math.random() * 11) + 1;
    thirdCard = korten3;
}


// secondCard draw prompt
const getKort3 = () => {
    let getThirdCard = "";

    getThirdCard = prompt("Do you want to hit or stay? Hit = Y, Stay = N)", "Y");
    
    if (getThirdCard === "y" || getThirdCard === "Y") {
        kort3();
        sum += thirdCard;
    }
}


/* SUM FUNCTION. Tepper, 18NOV2022 */
const cardSums = () => {
    let pairSum = firstCard + secondCard;
    sum = pairSum;
}


/* LESSON 3: if-else Conditionals

Tepper, 18NOV2022 */

const validateSums = () => {
    if (sum <= 20) {
        console.log("Do you want to draw a new card?");
    }
    else if (sum === 21) {
        console.log("House folds. You've got Blackjack!");
        hasBlackJack = true; // 7B
    }
    else if(sum > 21) {
        console.log("House wins. Your cards are over 21.");
        isAlive = false; // 8B
    }
}


/* CHAINED FUNCTIONS. Tepper, 18NOV2022 */
const blackjackDealer = () => {
    kort1();
    kort2(); 

}


/*************** EXTRA CHALLENGES ***************/
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

