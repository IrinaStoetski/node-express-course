const { createReadStream } = require("fs");

let chunkCount = 0;

const readStream = createReadStream("./content/big.txt", {
  highWaterMark: 200,
  encoding: "utf8",
});

readStream.on("data", (chunk) => {
  chunkCount++;
  console.log(`Chunk ${chunkCount}:\n`, chunk);
});

readStream.on("end", () => {
  console.log(`\nTotal number of chunks received: ${chunkCount}`);
});

readStream.on("error", (error) => {
  console.error("Error reading file:", error);
});
