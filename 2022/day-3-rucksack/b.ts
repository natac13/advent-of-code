/**
 * As you finish identifying the misplaced items, the Elves come to you with another issue.

For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.

The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.

Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.

Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
And the second group's rucksacks are the next three lines:

wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?
 * Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52.
 */

import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

// split the input into rucksacks
const rucksacks = input.split("\n");

// break the rucksacks into groups of three
const groups: string[][] = [];
for (let i = 0; i < rucksacks.length; i += 3) {
  // do not add the last group if it is incomplete
  if (i + 2 >= rucksacks.length) break;
  groups.push(rucksacks.slice(i, i + 3));
}

// for each group find the item type that appears in all three rucksacks
const priorities = groups.map((group) => {
  const items = group.map((rucksack) => rucksack.split(""));
  const commonItem = items[0].filter((item) =>
    items.every((rucksack) => rucksack.includes(item))
  )[0];
  const code = commonItem.charCodeAt(0);
  const priority = code >= 97 ? code - 96 : code - 38;
  return priority;
});

// sum the priorities
const sum = priorities.reduce((a, b) => a + b, 0);

console.log(sum);
