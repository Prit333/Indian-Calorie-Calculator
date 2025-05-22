let foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];

document.addEventListener('DOMContentLoaded', () => {
  loadFoodList();
  renderEntries();
});

async function loadFoodList() {
  try {
    const response = await fetch('https://indian-calorie-calculator-backend.onrender.com/foods');
    if (!response.ok) throw new Error('Failed to fetch food list');
    const foods = await response.json();
    console.log('Foods fetched:', foods.map(f => f.food));
    const datalist = document.getElementById('foodList');
    foods.forEach(food => {
      const option = document.createElement('option');
      option.value = food.food;
      datalist.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading food list:', error);
  }
}

document.getElementById('foodForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const food = document.getElementById('foodInput').value.trim().replace(/\s+/g, ' ');
  console.log('Food input:', food);
  const portion = parseFloat(document.getElementById('portion').value);

  if (!portion || isNaN(portion) || portion <= 0) {
    alert('Please enter a valid portion size (e.g., 2)');
    return;
  }

  try {
    console.log('Fetching URL:', `https://indian-calorie-calculator-backend.onrender.com/food/${food}`);
    const response = await fetch(`https://indian-calorie-calculator-backend.onrender.com/food/${food}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Backend response:', data);
    if (data.error) {
      alert(`Error: ${data.error}`);
      return;
    }
    if (!data.calories_kcal || !data.carbs_g || !data.protein_g || !data.fat_g) {
      alert('Invalid nutrient data from server');
      return;
    }
    const nutrients = {
      calories: data.calories_kcal * portion,
      carbs: data.carbs_g * portion,
      protein: data.protein_g * portion,
      fat: data.fat_g * portion,
      iron: data.iron_mg * portion,
      calcium: data.calcium_mg * portion
    };
    foodEntries.push({ food, portion, nutrients });
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
    renderEntries();
  } catch (error) {
    console.error('Error fetching food data:', error);
    alert(`Failed to fetch food data: ${error.message}`);
  }
});

document.getElementById('customFoodForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const food = document.getElementById('customFoodName').value.trim();
  const calories = parseFloat(document.getElementById('customCalories').value);
  const carbs = parseFloat(document.getElementById('customCarbs').value);
  const protein = parseFloat(document.getElementById('customProtein').value);
  const fat = parseFloat(document.getElementById('customFat').value);
  const iron = parseFloat(document.getElementById('customIron').value);
  const calcium = parseFloat(document.getElementById('customCalcium').value);

  if (isNaN(calories) || isNaN(carbs) || isNaN(protein) || isNaN(fat) || isNaN(iron) || isNaN(calcium)) {
    alert('Please enter valid nutrient values');
    return;
  }

  const nutrients = { calories, carbs, protein, fat, iron, calcium };
  foodEntries.push({ food, portion: 1, nutrients });
  localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
  renderEntries();
});

document.getElementById('clearLogs').addEventListener('click', () => {
  foodEntries = [];
  localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
  renderEntries();
});

function renderEntries() {
  const tbody = document.getElementById('foodTableBody');
  tbody.innerHTML = ''; // Clear existing rows

  // Render each food entry
  foodEntries.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.food}</td>
      <td>${entry.portion}</td>
      <td>${entry.nutrients.calories.toFixed(1)}</td>
      <td>${entry.nutrients.carbs.toFixed(1)}</td>
      <td>${entry.nutrients.protein.toFixed(1)}</td>
      <td>${entry.nutrients.fat.toFixed(1)}</td>
      <td>${entry.nutrients.iron.toFixed(1)}</td>
      <td>${entry.nutrients.calcium.toFixed(1)}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    tbody.appendChild(row);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      deleteEntry(index);
    });
  });

  // Update totals
  const totals = foodEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.nutrients.calories,
      carbs: acc.carbs + entry.nutrients.carbs,
      protein: acc.protein + entry.nutrients.protein,
      fat: acc.fat + entry.nutrients.fat,
      iron: acc.iron + entry.nutrients.iron,
      calcium: acc.calcium + entry.nutrients.calcium
    }),
    { calories: 0, carbs: 0, protein: 0, fat: 0, iron: 0, calcium: 0 }
  );

  document.getElementById('totalCalories').textContent = totals.calories.toFixed(1);
  document.getElementById('totalCarbs').textContent = totals.carbs.toFixed(1);
  document.getElementById('totalProtein').textContent = totals.protein.toFixed(1);
  document.getElementById('totalFat').textContent = totals.fat.toFixed(1);
  document.getElementById('totalIron').textContent = totals.iron.toFixed(1);
  document.getElementById('totalCalcium').textContent = totals.calcium.toFixed(1);
}

function deleteEntry(index) {
  foodEntries.splice(index, 1);
  localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
  renderEntries();
}