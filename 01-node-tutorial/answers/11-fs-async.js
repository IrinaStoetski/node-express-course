const { writeFile } = require("fs");
console.log("at start");
writeFile("./temporary/output.txt", "This is line 1\n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    console.log("All good");
  }
});
console.log("at end");
