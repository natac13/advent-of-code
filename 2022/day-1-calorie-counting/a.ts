import fs from "fs";
import path from "path";

// read from input.txt
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

// number groups will be separated by a blank line
const groups = input.split("\n\n");

console.log(groups);

// find the group of numbers which has the highest sum
const maxGroup = groups.reduce((max: number, group: string) => {
  const sum = group.split("\n").reduce((sum, line) => sum + parseInt(line), 0);
  return sum > max ? sum : max;
}, 0);

console.log(maxGroup);

// console.log(maxGroup)
