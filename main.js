let player_one = document.querySelector(".players .one span");
let player_two = document.querySelector(".players .two span");

// get players name from local storage
let playerOneLocal = document.querySelector(".playerOneLocal");
let playerTwoLocal = document.querySelector(".playerTwoLocal");
let tic_toe = document.querySelector(".tic-toe");
document.forms[0].onsubmit = function (e) {
  // check any of player is empty
  e.preventDefault();
  if (playerOneLocal.value != "" && playerTwoLocal.value != "") {

    localStorage.setItem("player_one", playerOneLocal.value);
    localStorage.setItem("player_two", playerTwoLocal.value);
    player_one.innerHTML = localStorage.getItem("player_one");
    player_two.innerHTML = localStorage.getItem("player_two");
    document.forms[0].classList.remove("active");  // disable form
    tic_toe.classList.add("active");  // active game
  }
};

let next = document.querySelector(".title").childNodes[1]; // get text "Game" and change it to "turn"
next.nodeValue = " turn";
let nextTurnText = document.querySelector(".title span");

// choose who is turn Randomly
let X_O = ["x", "o"];
let turn = X_O[Math.floor(Math.random() * 2)];
nextTurnText.innerHTML = turn.toUpperCase(); //


let squares = document.querySelectorAll(".grid");
let squaresText = document.querySelectorAll(".grid span");
let show_message = document.querySelector(".message_winning");
let message_winning = document.querySelector(".message_winning .winner");
let newGame = document.querySelector(".message_winning .newGame");
let restart = document.querySelector(".message_winning .restart");

let board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]; // Array check
let board_full = false; // to know the all square is full or not

// every click apply function "game"
squares.forEach((e) => {
  e.addEventListener("click", game);
});

function game(e) {
  let element = document.getElementById(this.id).firstElementChild; // e.target.id
  // console.log(element);
  let value = element.getAttribute("data-value"); // get current index from data-value attrubite
  if (turn == "x" && element.innerHTML == "") {
    element.innerHTML = turn;
    element.classList.add("x"); // add class x to span to active style
    board[value] = "x"; // add current index to array
    turn = "o"; // swap turn
    nextTurnText.innerHTML = `O`; //
  } else if (turn == "o" && element.innerHTML == "") {
    element.innerHTML = turn;
    element.classList.add("o");
    board[value] = "o";
    turn = "x";
    nextTurnText.innerHTML = `X`;
  }
  isWinner();
  check_board_complete();
  if (board_full) {
    show_message.classList.add("show"); // show containers with default value "draw"
  }
}

function isWinner() {
  // check rows
  if (
    (board[0] == board[1] && board[1] == board[2]) ||
    (board[3] == board[4] && board[4] == board[5]) ||
    (board[6] == board[7] && board[7] == board[8]) ||
    // check columns
    (board[0] == board[3] && board[3] == board[6]) ||
    (board[1] == board[4] && board[4] == board[7]) ||
    (board[2] == board[5] && board[5] == board[8]) ||
    // check Diagonals
    (board[0] == board[4] && board[4] == board[8]) ||
    (board[2] == board[4] && board[4] == board[6])
  ) {
    let winner = turn == "x" ? "o" : "x";
    message_winning.innerHTML = `${winner.toUpperCase()} is win`; // show message who is winner
    board_full = true;
    show_message.classList.add("show"); // show the containers that contains message and button
  }
}

function check_board_complete() {
  let flag = true;
  board.forEach((element) => {
    if (element != "x" && element != "o") {
      flag = false; // game not finished yet
    }
  });
  board_full = flag; // game is finished
}

// Restart the game and reset All things
restart.onclick = function (e) {
  squaresText.forEach((element) => {
    element.innerHTML="";
    element.classList.remove("x");
    element.classList.remove("o");
    message_winning.innerHTML = "Draws!";
  });
  show_message.classList.remove("show");
  board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]; // Array check
};

// reload page when click start
newGame.onclick = function (e) {
  location.reload();
};
