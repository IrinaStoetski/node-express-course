const { writeFileSync, readFileSync } = require("fs");

writeFileSync(
  "./temporary/fileA.txt",
  "I wrote this file using fs.writeFileSync"
);

const fileA = readFileSync("./temporary/fileA.txt", "utf8");

console.log(fileA);
