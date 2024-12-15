const { readFile } = require("fs");

readFile("./input.txt", (err, buffer) => {
  if (err) {
    return;
  }

  const answer = solution(buffer.toString());
  console.log(answer);
});

const regexp = /(mul\(\d+,\d+\))|(don't\(\)|do\(\))/g;

const solution = (input) => {
  let enabled = true;

  const mapper = {
    "don't()": () => {
      enabled = false;
    },
    "do()": () => {
      enabled = true;
    },
  };

  return input.match(regexp).reduce((sum, expression) => {
    if (expression in mapper) {
      mapper[expression]();
      return sum;
    }

    if (!enabled) {
      return sum;
    }

    const [a, b] = expression
      .replaceAll(/\mul\(|\)/g, "")
      .split(",")
      .map(Number);

    return (sum += a * b);
  }, 0);
};
