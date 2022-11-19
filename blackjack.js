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
Tepper, 18NOV2022*/

let firstCard = 0;
let secondCard = 0;
let sum = 0;

// firstCard
const kort1 = () => {
    let korten1 = Math.floor(Math.random() * 11) + 1;
    firstCard = korten1;
}

// secondCard
const kort2 = () => {
    let korten2 = Math.floor(Math.random() * 11) + 1;
    secondCard = korten2;
}

// sum
const cardSums = () => {
    let pairSum = firstCard + secondCard;
    sum = pairSum;
}

/* LESSON 3: if-else Conditionals

Tepper, 18NOV2022 */

const validateSums = () => {
    if (sum < 21) {
        document.write("Do you want to draw a new card?")
    }
    else if (sum === 21) {
        document.write("House folds. You've got Blackjack!")
    }
    else if(sum > 21) {
        document.write("House wins. Your cards are over 21.")
    }
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