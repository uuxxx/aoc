const { createReadStream } = require("fs");
const { stdout } = require("process");
const readline = require("readline");

const rl = readline.createInterface({
  input: createReadStream("./input.txt"),
  output: stdout,
});

const list1 = [];
const list2 = [];

rl.on("line", (line) => {
  const value = line.split(" ");
  list1.push(+value[0]);
  list2.push(+value[value.length - 1]);
});

rl.on("close", () => {
  const answer = solution();
  console.log(answer);
});

const solution = () => {
  let answer = 0;
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  for (let i = 0; i < list1.length; i++) {
    answer += Math.abs(list1[i] - list2[i]);
  }

  return answer;
};
