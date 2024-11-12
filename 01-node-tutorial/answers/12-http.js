const { createServer } = require("http");

const server = createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.end("Welcome to our home page");
      break;
    case "/new-home":
      res.end("This is new home page");
      break;
    default:
      res.end(`
            <h1>Oops!</h1>
            <p>We can't seem to find the page you are looking for</p>
            <a href="/">back home</a>
            `);
      break;
  }
});

server.listen(3000);
