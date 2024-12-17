const express = require("express");
const app = express();
const { products } = require("./data");
const peopleRouter = require("./routes/people");

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

app.use(logger);

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/people", peopleRouter);

app.get("/api/v1/test", (req, res) => res.json({ message: "It worked!" }));

app.get("/api/v1/products", (req, res) => res.json(products));

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, hasImages } = req.query;

  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  if (hasImages === "true") {
    filteredProducts = filteredProducts.filter((product) => !!product.image);
  }

  res.json(filteredProducts);
});

app.all("*", (req, res) => res.status(404).send("Page not found"));

app.listen(3000, () => console.log("Server is running on port 3000"));
