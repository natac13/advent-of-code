import fs from "fs";
import path from "path";

// read from input.txt
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

// number groups will be separated by a blank line
const groupsOfNumber = input.split("\n\n");

// total number of calories in the each groupsOfNumber
const totalCalories = groupsOfNumber.map((group) => {
  const numbers = group.split("\n").map(Number);

  return numbers.reduce((acc, num) => acc + num, 0);
});

const topThree = totalCalories.sort((a, b) => b - a).slice(0, 3);
console.log("The top three calorie counts are:", topThree.join(", "));

console.log(topThree.reduce((acc, num) => acc + num, 0));
