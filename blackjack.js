/*
CIS 124: Introduction to JavaScript
Module 6: Scrimba Exercises
Build a Blackjack game, https://scrimba.com/playlist/p3py7U7
Dominique Tepper, 18NOV2022
*/

"use strict";

/* LESSON 2: Add vars firstCard, secondCard, sum
        A. firstCard and secondCard - set value to random number between 2-11
        B. sum = firstCard + secondCard
    LESSON 7: var hasBlackJack
    LESSON 8: var isAlive
        A. Create var isAlive with value "true"
        B. Flip value to "false" in appropriate code block
Tepper, 18NOV2022*/


/* GLOBAL VARS. Tepper, 18NOV2022 */
let firstCard = 0;
let secondCard = 0;
let sum = 0;
let hasBlackJack = false;
let isAlive = true; // Lesson 8A


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
        hasBlackJack = true; // Lesson 7
    }
    else if(sum > 21) {
        console.log("House wins. Your cards are over 21.");
    }
}


/* CHAINED FUNCTIONS. Tepper, 18NOV2022 */
const blackjackDealer = () => {
    

}


/*************** EXTRA CHALLENGES ***************/

/* Lesson 5: IF/ELSE...IF/ELSE STATEMENT
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

/* Lesson 4: First if-else statements
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