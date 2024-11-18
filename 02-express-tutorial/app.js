const express = require("express");
const app = express();
const { products } = require("./data");

app.use(express.static("./public"));

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
