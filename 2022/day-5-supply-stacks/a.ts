import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

// input is a visualization of a stack of supplies. Each line is a layer of the stack, and each character is a supply.
// the moves are separated from the stack by a blank line and start with 'move'
// example:
/*
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
*/

const moveInstructions = input.split("\n\n")[1].split("\n");

const stackVisualization = input.split("\n\n")[0].split("\n");

// each stack is a column of the stack visualization. Each column is 3 characters wide, with a space in between.
// the last line is the stack number
const rows = stackVisualization.map((line) => {
  const row: string[] = [];
  for (let i = 0; i < line.length; i += 4) {
    row.push(line.slice(i, i + 3));
  }
  return row;
});

console.log(rows);

// using the last item of the rows array, we can loop through the columns and create a stack object
const stacks: { [key: string]: string[] } = {};
const lastRow = rows[rows.length - 1];
const allButLastRow = rows.slice(0, rows.length - 1);

for (let i = 0; i < lastRow.length; i++) {
  stacks[parseInt(lastRow[i], 0)] = allButLastRow
    .map((row) => row[i])
    .filter((item) => !!item.replace("   ", ""));
}

// using the move instructions we can move items from one stack to another.
// move instructions are in the format 'move 1 from 2 to 1'
// the first number is the number of items to move, the second number is the stack to move from, the third number is the stack to move to
moveInstructions.forEach((instruction) => {
  if (!instruction.startsWith("move")) {
    return;
  }
  const onlyNumberInstructions = instruction
    .replace("move ", "")
    .replace("from", "")
    .replace("to", "")
    .split(" ")
    .filter(Boolean);
  const numberOfItemsToMove = parseInt(onlyNumberInstructions[0], 0);
  const stackToMoveFrom = parseInt(onlyNumberInstructions[1], 0);
  const stackToMoveTo = parseInt(onlyNumberInstructions[2], 0);

  const itemsToMove = stacks[stackToMoveFrom].slice(0, numberOfItemsToMove);

  // moving items one at a time
  for (let i = 0; i < numberOfItemsToMove; i++) {
    stacks[stackToMoveFrom].shift();
    stacks[stackToMoveTo].unshift(itemsToMove[i]);
  }

  //   // remove the item(s) from the from stack
  //   stacks[stackToMoveFrom] = stacks[stackToMoveFrom].slice(numberOfItemsToMove);
  //   // add the item(s) to the to stack
  //   stacks[stackToMoveTo] = [...itemsToMove, ...stacks[stackToMoveTo]];
});

console.log(stacks);

// now we can print the first item of each stack to get the final result
let finalResult = "";
for (let i = 1; i <= Object.keys(stacks).length; i++) {
  finalResult += stacks[i][0];
}

console.log(finalResult);

// remove square brackets from the final result
const finalResultWithoutBrackets = finalResult.replace(/[\[\]]/g, "");

console.log(finalResultWithoutBrackets);
