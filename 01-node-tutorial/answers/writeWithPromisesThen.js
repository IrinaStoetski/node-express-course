const { writeFile, readFile } = require("fs").promises;

writeFile("./temporary/output.txt", `This is line 1`)
  .then(() =>
    writeFile("./temporary/output.txt", "This is line 2", { flag: "a+" })
  )
  .then(() =>
    writeFile("./temporary/output.txt", "This is line 3", { flag: "a+" })
  )
  .then(() => {
    readFile("./temporary/output.txt", "utf8").then((value) => {
      console.log(value);
    });
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });
