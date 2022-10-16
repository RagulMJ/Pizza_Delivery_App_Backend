const express = require('express');
const users = require('../models/userModel');
const pizzas = require('../models/pizzaModel');
const pizza = require('../pizzasdata');

const seedRoute = express.Router();

seedRoute.get('/', async (req, res) => {
  await pizzas.remove({});
  const createdProducts = await pizzas.insertMany(pizza.data);
  await users.remove({});
  const createdUsers = await users.insertMany(pizza.user);
  res.send({ createdProducts, createdUsers });
});

module.exports = seedRoute;
