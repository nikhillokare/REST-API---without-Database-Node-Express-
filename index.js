const express = require("express");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
const app = express();
const port = 7575;
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.ip, req.hostname, new Date());
  next();
});

// Create API(POST API)
app.post("/products", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.send(req.body);
});

// GET API Products(Read API)
app.get("/products", (req, res) => {
  res.send(products);
});
// GET API Products/:id(Read API)
app.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  if (!product) {
    res.send("Product is not available");
  }
  res.status(200).send(product);
});

// Update Product (PUT API)
app.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json(req.body);
});

// Patch API
app.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json(req.body);
});

// Delete Product
app.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  products.splice(product, 1);
  res.status(202).json(product);
});

app.listen(port, () => {
  console.log(`server is running fine on ${port}`);
});
