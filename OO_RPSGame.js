/*
rock beats scissors
scissors beats paper
paper beats rock
same moves means tie

nouns: player, move, rule
verbs: choose, compare

Player:
  -choose
Move
Rules

???
  -compare
*/
const p = console.log;
const readline = require(`readline-sync`);

function createPlayer() {
  return {
    move: null,
  };
}

function createHuman(name) {
  let playerObject = createPlayer();
  let humanObject = {
    choose() {
      let choice;

      while (true) {
        p(`Please choose rock, paper, or scissors:\n R   P   S`);
        choice = readline.question();
        if ([`R`, `P`, `S`].includes(choice)) break;
        p(`Sorry, invalid choice.`);
      }
      this.move = choice;
    },
  };
  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ["rock", "paper", "scissors"];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

let compare = function (move1, move2) {};

const RPSGame = {
  human: createPlayer(`Teddy`),
  computer: createComputer(),
  playerWon: false,

  displayWelcomeMessage() {
    p(`Welcome, ${this.human.name}, to RPS!`);
  },

  displayGoodbyeMessage() {
    p(
      `Thanks for playing RPS!\n${
        this.playerWon ? `You're a pro!` : `Better luck next time!`
      }`
    );
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    p(`You chose: ${this.human.move}.`);
    p(`The computer chose: ${this.computer.move}.`);

    if (
      (humanMove === "R" && computerMove === "S") ||
      (humanMove === "P" && computerMove === "R") ||
      (humanMove === "S" && computerMove === "P")
    ) {
      console.log("You win!");
      this.playerWon = true;
    } else if (
      (humanMove === "R" && computerMove === "P") ||
      (humanMove === "P" && computerMove === "S") ||
      (humanMove === "S" && computerMove === "R")
    ) {
      console.log("Computer wins!");
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    p(`Would you like to play again? (y/n)`);
    let answer = readline.question();
    return answer.toLowerCase()[0] === `y` ? true : false;
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
