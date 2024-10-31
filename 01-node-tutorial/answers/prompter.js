const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

let bgColor = "white";
let fontSize = "16";

const form = () => {
  return `
  <body style="background-color:${bgColor};font-size:${fontSize}px;">
  <p>BG color: ${bgColor}</p>
   <p>Font size: ${fontSize}</p>
  <form method="POST">
  <label>Bg color
 <select name="background" >
 <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
 </select>
 </label>
 <label>Font Size
 <select name="fontSize" value="${fontSize}">
 <option value="18">18</option>
  <option value="20">20</option>
  <option value="24">24</option>
 </select>
 </label>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      bgColor = body["background"] || "white";
      fontSize = body["fontSize"] || "black";
      res.writeHead(303, {
        Location: "/",
      });
      res.end(form());
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
