import fs from "fs";
import path from "path";

// read from input.txt
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

// rock, paper, scissor values
const rock = 1;
const paper = 2;
const scissor = 3;

// value for round outcome
const win = 6;
const lose = 0;
const tie = 3;

// rock, paper, scissor symbols
const rockOpponent = "A";
const paperOpponent = "B";
const scissorOpponent = "C";

const loseOutcome = "X";
const tieOutcome = "Y";
const winOutcome = "Z";

// rounds of the game are separated by a blank line
const rounds = input.split("\n");

console.log(rounds);

// for each round of the game, determine my score. Each round is a string of 2 characters separated by a space. First is the opponent, second is the outcome of the round. Therefore based on the outcome of the round and the opponent's symbol, determine my symbol.
const myScores = rounds.map((round) => {
  const [opponent, outcome] = round.split(" ");

  // determine the score for each round based on the outcome and the opponents symbol. Therefore the symbol to add to the outcome value is the symbol which would result in the outcome. Rock beats scissor, scissor beats paper, paper beats rock.
  if (opponent === rockOpponent && outcome === loseOutcome) {
    return lose + scissor;
  } else if (opponent === rockOpponent && outcome === tieOutcome) {
    return tie + rock;
  } else if (opponent === rockOpponent && outcome === winOutcome) {
    return win + paper;
  } else if (opponent === paperOpponent && outcome === loseOutcome) {
    return lose + rock;
  } else if (opponent === paperOpponent && outcome === tieOutcome) {
    return tie + paper;
  } else if (opponent === paperOpponent && outcome === winOutcome) {
    return win + scissor;
  } else if (opponent === scissorOpponent && outcome === loseOutcome) {
    return lose + paper;
  } else if (opponent === scissorOpponent && outcome === tieOutcome) {
    return tie + scissor;
  } else if (opponent === scissorOpponent && outcome === winOutcome) {
    return win + rock;
  } else {
    return 0;
  }
});

console.log("My scores are:", myScores.join(", "));

console.log(myScores.reduce((acc, num) => acc + num, 0));
