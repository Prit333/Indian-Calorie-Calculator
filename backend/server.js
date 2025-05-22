const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

const foods = JSON.parse(fs.readFileSync('./foods.json'));

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/food/:name', (req, res) => {
  console.log('Requested food:', req.params.name); // Debug log
  const food = foods.find(f => {
    console.log('Comparing:', f.food, req.params.name); // Debug log
    return f.food.toLowerCase() === req.params.name.toLowerCase();
  });
  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ error: 'Food not found', requested: req.params.name });
  }
});

app.get('/foods', (req, res) => {
  res.json(foods);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});