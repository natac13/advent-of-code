import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

// input is list of section assignments for each elf in each group. These are in pairs separated by a blank line
// example 2-4,6-8 means elf 1 is assigned to section 2-4, elf 2 is assigned to section 6-8

const nonNullable = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

// create a function to find how many section assignments overlap fully.
// example 6-6,4-6 has a fully overlapping section of 6-6 within 4-6
function findFullyOverlappingSections(sections: string[]): number {
  const sectionAssignments = sections
    .map((section) => {
      return section
        .split(",")
        .map((section) => {
          const [start, end] = section.split("-");
          if (!start || !end) {
            return null;
          }
          return { start: parseInt(start), end: parseInt(end) };
        })
        .filter(nonNullable);
    })
    ?.filter((section) => section.length === 2);

  let fullyOverlappingSections = 0;

  for (let i = 0; i < sectionAssignments.length; i++) {
    const elf1 = sectionAssignments[i][0];
    const elf2 = sectionAssignments[i][1];

    if (elf1.start >= elf2.start && elf1.end <= elf2.end) {
      fullyOverlappingSections++;
    } else if (elf2.start >= elf1.start && elf2.end <= elf1.end) {
      fullyOverlappingSections++;
    }
  }

  return fullyOverlappingSections;
}

// part 2

// find the number of sections that overlap at all
function findPartialOverlappingSections(sections: string[]): number {
  const sectionAssignments = sections
    .map((section) => {
      return section
        .split(",")
        .map((section) => {
          const [start, end] = section.split("-");
          if (!start || !end) {
            return null;
          }
          return { start: parseInt(start), end: parseInt(end) };
        })
        .filter(nonNullable);
    })
    ?.filter((section) => section.length === 2);

  let partiallyOverlappingSections = 0;

  for (let i = 0; i < sectionAssignments.length; i++) {
    const elf1 = sectionAssignments[i][0];
    const elf2 = sectionAssignments[i][1];

    if (
      (elf1.start >= elf2.start && elf1.start <= elf2.end) ||
      (elf1.end >= elf2.start && elf1.end <= elf2.end)
    ) {
      partiallyOverlappingSections++;
    } else if (
      (elf2.start >= elf1.start && elf2.start <= elf1.end) ||
      (elf2.end >= elf1.start && elf2.end <= elf1.end)
    ) {
      partiallyOverlappingSections++;
    }
  }

  return partiallyOverlappingSections;
}

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
const test = findPartialOverlappingSections(testInput.split("\n"));
console.log(test);
const answer = findPartialOverlappingSections(input.split("\n"));

console.log(answer);
