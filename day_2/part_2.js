const { createReadStream } = require("fs");
const { stdout } = require("process");
const readline = require("readline");

const rl = readline.createInterface({
  input: createReadStream("./input.txt"),
  output: stdout,
});

const matrix = [];

rl.on("line", (line) => {
  const value = line.split(" ").map(Number);
  matrix.push(value);
});

rl.on("close", () => {
  const answer = solution();
  console.log(answer);
});

const getType = (a, b) => {
  if (Math.abs(a - b) < 1 || Math.abs(a - b) > 3) {
    return "invalid";
  }

  if (a > b) {
    return "decreasing";
  }

  return "increasing";
};

// TODO: rewrite in a smart way
const bruteForceCheckLevel = (level) => {
  for (let i = 0; i < level.length; i++) {
    if (
      checkLevel(
        level.filter((_, index) => {
          return index !== i;
        })
      )
    ) {
      return true;
    }
  }

  return false;
};

const checkLevel = (level) => {
  if (level.length < 2) {
    return true;
  }

  const type = getType(level[0], level[1]);

  if (type === "invalid") {
    return false;
  }

  for (let i = 1; i < level.length - 1; i++) {
    if (getType(level[i], level[i + 1]) !== type) {
      return false;
    }
  }

  return true;
};

const solution = () => {
  let answer = 0;

  for (let i = 0; i < matrix.length; i++) {
    const isSafe = checkLevel(matrix[i]) || bruteForceCheckLevel(matrix[i]);
    answer += Number(isSafe);
  }

  return answer;
};
