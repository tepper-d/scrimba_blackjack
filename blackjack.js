"use strict";
/* CIS 124: Introduction to JavaScript
    Module 6: Scrimba Exercises
    Build a Blackjack game, https://scrimba.com/playlist/p3py7U7
Dominique Tepper, 18NOV2022 */

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
let playerEarns = 0;
let playerHasBlackjack = false;
let playerIsAlive = false; // 8a
let playerHasBank = false;
let playerStays = false;
let playerWin = false;
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
let dealerStays = false;
let dealerCanHit = false;
let dealerWin = false;
let itsAPush = false;


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


/* GET PLAYER BET. 
    Prompts the player to enter an amount that is equal to or less than their current bank roll amount. Paired with newGame(). 
Tepper, 22NOV2022 */
const getPlayerBet = () => {
    let playerNewBank = 0;
    let currentBet = 0;
    let playerBankroll = parseInt(playerWhois[1]);

    if (playerBankroll <= 0) {
        playerHasBank = false;
    }
    else {
        playerHasBank = true;
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

/* ARRAY INDEXING. Controls player and dealer elements textContent output:
        a. cards in array
        b. sum of array
        c. hidden & revealed dealer array output
Tepper, 23NOV2022 */

// PLAYER INDEXING. Tepper, 23NOV2022.
const playerIndexing = () => {
    let pcardsMsg = "";
    let playerCardsSum = 0;

    for (let i = 0; i < playerCards.length; i++) {
        pcardsMsg += playerCards[i] + " ";
        playerCardsSum += playerCards[i];
    }

    playerSum = playerCardsSum;
    playerCardsEl.textContent = "Player Cards: " + pcardsMsg;
    playerSumEl.textContent = "Player Sum: " + playerCardsSum;

    console.log("player|| cards: " + playerCards + " sum: " + playerSum);
}

// DEALER INDEXING. Tepper, 23NOV2022.
const dealerIndexing = () => {
    let dealerCardsSum = 0;
    let dcardsMsg = "";
    let dsumMsg = "";

    for (let i = 0; i < dealerCards.length; i++) {
        dcardsMsg = dealerCards[i] + " ";
        dealerCardsSum += dealerCards[i];
    }
    dealerSum = dealerCardsSum;

    // dealer's hand remains hidden
    if (playerStays === false) {
        dcardsMsg = "Dealer Cards: " + dealerCards[0] + " [hidden]";
        dsumMsg = "Dealer Sum: [hidden]";
    }
    // dealer's hand is revealed
    else if (playerStays === true) {
        dcardsMsg = "Dealer Cards: " + dcardsMsg;
        dsumMsg = "Dealer Sum: " + dealerCardsSum;
    }

    console.log("dealer|| cards: " + dealerCards + " sum: " + dealerSum);
    dealerCardsEl.textContent = dcardsMsg;
    dealerSumEl.textContent = dsumMsg;
}

// VALIDATION FUNCTIONS. Tepper, 23NOV2022.

const dealerCanHitToggle = () => {
    if (dealerSum <= 16 && dealerIsAlive === true) {
        dealerCanHit = true;
        dealerStays = false;
    }
    else if ((dealerSum > 16) < 21) {
        if (dealerCanHit === true) {
            dealerCanHit = false;
            dealerStays = true;
        }
    }
}

// GAME IN PROGRESS. Chains Indexing and dealer hit toggle in a single fxn for brevity. Tepper, 23NOV2022.
const gameInProgress = () => {
    playerIndexing();
    dealerIndexing();
    dealerCanHitToggle();
}

/* WIN CONDITIONS. 
    Conditionals and boolean toggles that determine player and dealer win or loss. 
Tepper, 23NOV2022 */
const winConditions = () => {
    if (playerIsAlive === true) {
        if (playerSum <= 20 && playerStays === false) {
            playerIsAlive = true;
            playerMsg = "You have " + playerSum + ". Do you want to draw a new card?";
        }
        else if (playerSum <= 20 && playerStays === true) {
            playerIsAlive = false;

            if ((playerSum > dealerSum) < 21) {
                playerWin = true;
            }
            else if ((playerSum < dealerSum) < 21) {
                dealerWin = true;
            }
        }
        else if ((playerSum > 21 && playerStays === true) || (playerSum > 21 && playerStays === false)) {
            dealerWin = true;
        }
        else if ((playerSum == dealerSum) <= 20 && (playerStays === true && dealerStays === true)) {
            playerWin = false;
            dealerWin = false;
            itsAPush = true;
        }
    }
    else if (playerIsAlive === false) {
        if (((playerSum <= 20) > (dealerSum <= 20)) < 21) {
            playerWin = true;
        }
        else if (((playerSum <= 20) < (dealerSum <= 20)) < 21) {
            dealerWin = true;
        }
    }
    playerMessageEl.textContent = playerMsg;

    endGamePayout();
}

// CALCULATE WINNINGS.
// BLACKJACK! Player wins 3:2 if they get a blackjack. Tepper, 23NOV2022
const blackjack = () => {
    if (playerSum === 21) {
        playerHasBlackjack = true;
        playerIsAlive = false;
        playerStays = false;
        playerWin = true;

        dealerHasBlackjack = false;
        dealerIsAlive = false;
        dealerStays = false;
        dealerCanHit = false;
        dealerWin = false;

        console.log("player blackjack!");
        
        let payout = 0;
        let payoutWrite = "";
        let newGameAsk = "";

        payout = playerBet + (playerBet / 2);
        playerWhois[1] += payout;
        payoutWrite = playerWhois[0] + ": $" + playerWhois[1] + " || Current bet: $" + playerBet; +  " || Winnings: $" + payout;
        playerWhoisEl.textContent = payoutWrite;

        newGameAsk = prompt("Congratulations, you got blackjack! Do you want to start a new game? Y/N", "y");
        if (newGameAsk === "y" || newGameAsk === "Y") {
            newGame();
        }
    }
}

// END GAME PAYOUT. Calculates Winnings if player wins but != blackjack or play loss. Tepper, 23NOV2022
const endGamePayout = () => {
    let payout = 0;
    let payoutWrite = ""; 

    if (playerWin === true) {
        payout = playerBet * 2;
        playerMsg = "You win! " + payout + " goes back to your bank roll. Start new game?"
    }
    else if (dealerWin === true) {
        playerMsg = "Sorry, the house wins this round. Do you want to try again?"
    }
    else if (itsAPush === true) {
        payout = playerBet;
        playerMsg = "It's a push. You get original bet back."
    }

    playerWhois[1] += payout;
    payoutWrite = playerWhois[0] + ": $" + playerWhois[1] + " || Current bet: $" + playerBet; +  " || Winnings: $" + payout;
    playerWhoisEl.textContent = payoutWrite;
    playerMessageEl.textContent = playerMsg;
}

 

// BUTTON FUNCTIONS. Tepper, 22NOV2022

/* HIT / NEW CARD. Player draws a new card if 
        a. playerIsAlive = true
        b. playerHasBlackjack = false
    New card added to playerCards array.
Tepper, 22NOV2022 */
const newCard = () => {
    console.log("hit");

    if (playerIsAlive === true) {
        getPlayerCard();
        playerIndexing();
        checkPlayerSum();
    }
    else if (playerHasBlackjack === true) {
        alert("You have black jack. Can't draw more cards.");
    }
    else if (playerCards.length === 0) {
        alert("You must start a new game first.");
    }
    else if (playerIsAlive === false) {
        alert("You're out for this round. Start a new game instead.");
    }
    playerMessageEl.textContent = playerMsg;

    blackjack();
}

/* STAY / PASS. Player uses stay() to skip drawing a card.
        This function forces the dealer to 
            a. reveal their hand, or 
            b. draw a card if their card sum <= 16 
Tepper, 22NOV2022 */

const stay = () => {
    console.log("stay");
    playerIsAlive = false;
    playerStays = true;

    if (playerCards.length === 0) {
        alert("You must start a new game first.");
    }
    else if (dealerIsAlive === true) {
        if (dealerSum <= 16) {
            getDealerCard();
            console.log(dealerCards);
            checkPlayerSum();
        }
        else if ((dealerSum > 16) < 21) {
            checkPlayerSum();
        }
        dealerIsAlive = false;
    }
    else if (dealerIsAlive === false) {
        alert("The game is concluded. Please start a new game.");
    }
    console.log("player|| cards: " + playerCards + " sum: " + playerSum);
    console.log("dealer|| cards: " + dealerCards + " sum: " + dealerSum);
}

/* NEW GAME. This function will --
        1. Prompt the user to place a bet for the current game through getPlayerBet()
        2. Generate random numbers for both player and dealer
        3. Display player card values and sum
        4. Display the first dealer card and keep 2nd value & cards sum hidden
    <!> This function does not allow the player to add more to their current bank roll.
Tepper, 22NOV2022 */
const newGame = () => {
    console.log("new game");

    // get bet
    getPlayerBet();

    if (playerHasBank === false) {
        alert("Insufficient bankroll amount. Click 'Switch Player' to load new amount.");
    }
    else if (playerHasBank === true) {
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

        // textContent print
        playerIndexing();
        dealerIndexing();
    }
    blackjack();
    checkPlayerSum();
}


/* SWITCH PLAYER. This function resets global vars and allows the player to
        1. Use a different player name
        2. Enter a new bank roll value
Tepper, 22NOV2022 */
const switchPlayer = () => {
    console.log("switch player");
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


/* RESET GAME. Resets some global vars to their default values. 
    To be used when starting a new black jack round while retaining the same player name and bank roll amount.
Tepper, 22NOV2022 */
const resetGame = () => {
    // PLAYER RESET
    playerCards = [];
    playerBet = 0;
    playerSum = 0;
    playerEarns = 0;
    playerHasBlackjack = false;
    playerIsAlive = false; // 8a
    playerStays = false;
    playerMsg = ""; //10a
    
    // DEALER RESET
    dealerCards = [];
    dealerSum = 0;
    dealerHasBlackjack = false;
    dealerIsAlive = false;
    dealerStays = false;
    dealerCanHit = false;
    dealerWin = false;
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

