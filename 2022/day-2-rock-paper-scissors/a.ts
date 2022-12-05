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

const rockMe = "X";
const paperMe = "Y";
const scissorMe = "Z";

// rounds of the game are separated by a blank line
const rounds = input.split("\n");

console.log(rounds);

// for each round, determine my score. Each round is a string of 2 characters separated by a space. First is the opponent, second is me.
const myScores = rounds.map((round) => {
  const [opponent, me] = round.split(" ");

  // determine the score for each round based on the outcome and my selected symbol
  if (opponent === rockOpponent && me === rockMe) {
    return tie + rock;
  } else if (opponent === rockOpponent && me === paperMe) {
    return win + paper;
  } else if (opponent === rockOpponent && me === scissorMe) {
    return lose + scissor;
  } else if (opponent === paperOpponent && me === rockMe) {
    return lose + rock;
  } else if (opponent === paperOpponent && me === paperMe) {
    return tie + paper;
  } else if (opponent === paperOpponent && me === scissorMe) {
    return win + scissor;
  } else if (opponent === scissorOpponent && me === rockMe) {
    return win + rock;
  } else if (opponent === scissorOpponent && me === paperMe) {
    return lose + paper;
  } else if (opponent === scissorOpponent && me === scissorMe) {
    return tie + scissor;
  } else {
    return 0;
  }
});

console.log("My scores are:", myScores.join(", "));

// find my total score from all rounds
const myTotalScore = myScores.reduce(
  (acc: number, num: number) => acc + num,
  0
);

console.log(myTotalScore);
