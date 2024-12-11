
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/menus", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Menu Schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
});
const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  items: [itemSchema],
});
const Menu = mongoose.model("Menu", menuSchema);

// API Endpoints
app.get("/api/menus", async (req, res) => {
  const menus = await Menu.find();
  res.json(menus);
});

app.post("/api/menus", async (req, res) => {
  const menu = new Menu(req.body);
  await menu.save();
  res.json(menu);
});

app.post("/api/menus/:menuId/items", async (req, res) => {
  const { menuId } = req.params;
  const menu = await Menu.findById(menuId);
  menu.items.push(req.body);
  await menu.save();
  res.json(menu);
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
