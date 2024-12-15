const { readFile } = require("fs");

readFile("./input.txt", (err, buffer) => {
  if (err) {
    return;
  }

  const answer = solution(buffer.toString());
  console.log(answer);
});

const regexp = /mul\(\d+,\d+\)/g;

const solution = (input) => {
  return input.match(regexp).reduce((sum, expression) => {
    const [a, b] = expression
      .replaceAll(/\mul\(|\)/g, "")
      .split(",")
      .map(Number);

    return (sum += a * b);
  }, 0);
};
