const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  await writeFile(
    "./temporary/output.txt",
    `This is line 1
     This is line 2
     This is line 3`
  );
};

const reader = async () => {
  const value = await readFile("./temporary/output.txt", "utf8");
  console.log(value);
};

try {
  writer();
  reader();
} catch (error) {
  console.log("Error: ", error);
}
