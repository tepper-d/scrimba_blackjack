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

/* PLAYER VARS. Tepper, 22NOV2022 */
// DOM
let playerWhoisEl = document.getElementById("player_whois-el");
let playerMessageEl = document.getElementById("player_message-el"); // 14a
let playerSumEl = document.getElementById("player_sum-el"); // 15a
let playerCardsEl = document.getElementById("player_cards-el"); // 16a
// VALUES
let playerWhois = [];
let playerCards = [];
let playerBet = 0;
let playerSum = 0;
let playerHasBlackjack = false;
let playerIsAlive = false; // 8a
let playerHasBank = false;
let playerMsg = ""; //10a

/* DEALER VARS. Tepper, 22NOV2022*/
//DOM
let dealerCardsEl = document.getElementById("dealer_cards-el");
let dealerSumEl = document.getElementById("dealer_sum-el");
// VALUES
let dealerCards = [];
let dealerSum = 0;
let dealerHasBlackjack = false;
let dealerIsAlive = false;

/* PLAYER NAME & INITIAL BANKROLL (WHOIS). Tepper, 22NOV2022 */
const whoisPlayer = () => {
    let initialChips = 0;
    let playerName = prompt("Enter player name:");
    playerWhois.push(playerName);

    initialChips = parseInt(prompt("How much are you bankrolling?"));
        while (isNaN(initialChips)) {
            initialChips = parseInt(prompt("How much are you bankrolling?"));
        }
    playerWhois.push(initialChips);
    playerHasBank = true;
    console.log(playerWhois);

    playerMessageEl.textContent = "Hello " + playerName + "! Do you want to play a round of Black Jack?"
    playerWhoisEl.textContent = playerWhois[0] + ": $" + playerWhois[1] + " || Current bet: $";
}
whoisPlayer();

// BET MANIPULATION. Tepper, 22NOV2022
/* GET PLAYER BET. 
    Prompts the player to enter an amount that is equal to or less than their current bank roll amount. Paired with newGame(). 
Tepper, 22NOV2022 */
const getPlayerBet = () => {
    let playerNewBank = 0;
    let currentBet = 0;
    let playerBankroll = parseInt(playerWhois[1]);

    if (playerBankroll > 0) {
        currentBet = parseInt(prompt("How much will you bet for this game?"));
        
        do {
            if (isNaN(currentBet)) {
                currentBet = parseInt(prompt("Please enter a valid amount to bet."));
            }
            else if (currentBet > playerBankroll) {
                currentBet = parseInt(prompt("You bet amount must be less than or equal to your current bank roll."));
            }
        } 
        while (isNaN(currentBet) || currentBet > playerBankroll);
    }
    else if (playerBankroll <= 0) {
        playerHasBank = false;
    }
    
    playerMessageEl.textContent = playerMsg;
    playerBet = currentBet;
    playerNewBank = playerBankroll - currentBet;
    playerWhois[1] = playerNewBank;
    playerWhoisEl.textContent = playerWhois[0] + ": $" + playerWhois[1] + " || Current bet: $" + playerBet;
    console.log(playerWhois);
}

/* GENERATE RANDOM CARDS. Tepper, 22NOV2022 */
const getPlayerCard = () => {
    let playerRandomCard = Math.floor(Math.random() * 13) + 1;

    if (playerRandomCard > 10 ) {
        playerRandomCard = 10;
    }
    playerCards.push(playerRandomCard);
}

const getDealerCard = () => {
    let dealerRandomCard = Math.floor(Math.random() * 13) + 1;

    if (dealerRandomCard > 10 ) {
        dealerRandomCard = 10;
    }
    dealerCards.push(dealerRandomCard);
}

/* CHECK SUMS. Checks existing card sums and prompts user for next action.
Tepper, 22NOV2022 */

const checkPlayerSum = () => {
    if (playerSum === 21) {
        playerHasBlackjack = true;
        playerIsAlive = false;
        playerMsg = "Congratulations! You got black jack!";
    }
    else if (playerIsAlive === true) {
        if (playerSum <= 20) {
            playerIsAlive = true;
            playerMsg = "You have " + playerSum + ". Do you want to draw a new card?";
        }
        else if (playerSum > 21) {
            playerIsAlive = false;
            playerMsg = "Sorry, you're out of the game. House wins this round.";
        }
    }
    else if (playerIsAlive === false) {
        if (((playerSum <= 20) > (dealerSum <= 20)) < 21) {
            playerMsg = "Well done! You won this round!";
        }
        else if (((playerSum <= 20) < (dealerSum <= 20)) < 21) {
            playerMsg = "Sorry, the House wins this round.";
        }
    }
    playerMessageEl.textContent = playerMsg;
}




/* BUTTON FUNCTIONS. Tepper, 22NOV2022 */

/* HIT. Player draws a new card if 
        a. playerIsAlive = true
        b. playerHasBlackjack = false
    New card added to playerCards array.
Tepper, 22NOV2022 */
const hit = () => {
    let playerHitMsg = "";

    if (playerIsAlive === true) {
        getPlayerCard();
        checkPlayerSum();
    }
    else if (playerHasBlackjack === true) {
        playerMsg = "You have black jack. Can't draw more cards.";
    }
    else if (playerIsAlive === false) {
        playerHitMsg = "You're out for this round. Start a new game instead.";
    }
}

/* NEW GAME. This function will 
        1. Prompt the user to place a bet for the current game through getPlayerBet()
        2. Generate random numbers for both player and dealer
        3. Display player card values and sum
        4. Display the first dealer card and keep 2nd value & cards sum hidden
    <!> This function does not allow the player to add more to their current bank roll.
Tepper, 22NOV2022 */
const newGame = () => {
    let playerCardsSum = 0;
    let pcardsMsg = "";
    let dealerCardsSum = 0;
    let dcardsMsg = "";

    // get bet
    getPlayerBet();
    
    if (playerHasBank = false) {
        playerMsg = "Insufficient bankroll amount. Click 'Switch Player' to load new amount."
        playerMessageEl = playerMsg;
    }
    else {
        // reset values
        resetGame();

        // generate 2 cards
        getPlayerCard();
        getDealerCard();
        getPlayerCard();
        getDealerCard();

        // player and dealer are still in the game
        playerIsAlive = true;
        dealerIsAlive = true;

        for (let pIndex = 0; pIndex < playerCards.length; pIndex++) {
            pcardsMsg += playerCards[pIndex] + " ";
            playerCardsSum += playerCards[pIndex];
        }
        playerSum = playerCardsSum;
        playerCardsEl.textContent = "Player Cards: " + pcardsMsg;
        playerSumEl.textContent = "Player Sum: " + playerCardsSum;

        for (let dIndex = 0; dIndex < dealerCards.length; dIndex++) {
            dcardsMsg = dealerCards[dIndex] + " ";
            dealerCardsSum += dealerCards[dIndex];
        }
        dealerSum = dealerCardsSum;
        dealerCardsEl.textContent = "Dealer Cards: " + dealerCards[0] + " [hidden]";
        dealerSumEl.textContent = "Dealer Sum: [hidden]";

        console.log(dealerCards + " " + dealerSum);
        checkPlayerSum();
    }
}


/* SWITCH PLAYER. This function resets global vars and allows the player to
        1. Use a different player name
        2. Enter a new bank roll value
Tepper, 22NOV2022 */
const switchPlayer = () => {
    playerWhois = [];
    playerCards = [];
    playerBet = 0;
    playerSum = 0;
    playerHasBlackjack = false;
    playerIsAlive = false; // 8a
    playerMsg = ""; //10a

    //DEALER RESET
    dealerCards = [];
    dealerSum = 0;
    dealerHasBlackjack = false;
    dealerIsAlive = false;

    // refresh player info
    whoisPlayer();
}

/* EMPTY ARRAY. Removes array items from previous game. Tepper, 22NOV2022 */
const clearCards = () => {
    while ((playerCards.length > 0) && (dealerCards.length > 0)) {
        playerCards.splice(0);
        dealerCards.splice(0);
    }
}

/* RESET GAME. Resets some global vars to their default values. 
    To be used when starting a new black jack round while retaining the same player name and bank roll amount.
Tepper, 22NOV2022 */
const resetGame = () => {
    //PLAYER RESET
    playerCards = [];
    playerSum = 0;
    playerHasBlackjack = false;
    playerIsAlive = false; // 8a
    playerMsg = ""; //10a
    
    //DEALER RESET
    dealerCards = [];
    dealerSum = 0;
    dealerHasBlackjack = false;
    dealerIsAlive = false;
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

How to play references: 
    https://www.youtube.com/watch?v=PljDuynF-j0
    https://www.youtube.com/watch?v=VB-6MvXvsKo
*/

