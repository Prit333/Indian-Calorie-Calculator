const express = require('express');
const app = express();
const port = 3000;

// Sample Indian food database (add more from ICMR-NIN data)
const foods = [
  {
    food: 'Roti',
    calories_kcal: 80,
    carbs_g: 15,
    protein_g: 2,
    fat_g: 1,
    iron_mg: 0.5,
    calcium_mg: 10
  },
  {
    food: 'Dal',
    calories_kcal: 120,
    carbs_g: 15,
    protein_g: 6,
    fat_g: 3,
    iron_mg: 1,
    calcium_mg: 20
  },
  {
    food: 'Masala Dosa',
    calories_kcal: 150,
    carbs_g: 20,
    protein_g: 4,
    fat_g: 6,
    iron_mg: 0.8,
    calcium_mg: 15
  }
];

app.use(express.json());

// Enable CORS for frontend connection
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API to get food data
app.get('/food/:name', (req, res) => {
  const food = foods.find(f => f.food === req.params.name);
  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ error: 'Food not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});