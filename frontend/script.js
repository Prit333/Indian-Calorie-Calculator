let foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];

// Fetch food list for autocomplete
async function loadFoodList() {
  try {
    const response = await fetch(`https://indian-calorie-calculator-backend.onrender.com/food/${food}`);
    if (!response.ok) throw new Error('Failed to fetch food list');
    const foods = await response.json();
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

// Render entries
function renderEntries() {
  const foodList = document.getElementById('foodList');
  foodList.innerHTML = '';
  let totals = { calories: 0, carbs: 0, protein: 0, fat: 0, iron: 0, calcium: 0 };
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
      <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
    `;
    foodList.appendChild(row);
    totals.calories += entry.nutrients.calories;
    totals.carbs += entry.nutrients.carbs;
    totals.protein += entry.nutrients.protein;
    totals.fat += entry.nutrients.fat;
    totals.iron += entry.nutrients.iron;
    totals.calcium += entry.nutrients.calcium;
  });
  document.getElementById('totalCalories').textContent = totals.calories.toFixed(1);
  document.getElementById('totalCarbs').textContent = totals.carbs.toFixed(1);
  document.getElementById('totalProtein').textContent = totals.protein.toFixed(1);
  document.getElementById('totalFat').textContent = totals.fat.toFixed(1);
  document.getElementById('totalIron').textContent = totals.iron.toFixed(1);
  document.getElementById('totalCalcium').textContent = totals.calcium.toFixed(1);

  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      foodEntries.splice(index, 1);
      localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
      renderEntries();
    });
  });
}

// Load food list and render entries on page load
document.addEventListener('DOMContentLoaded', () => {
  loadFoodList();
  renderEntries();
});

// Food form submission
document.getElementById('foodForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const food = document.getElementById('foodInput').value.trim().replace(/\s+/g, ' ');
  console.log('Food input:', food);
  console.log('Fetching URL:', `https://indian-calorie-calculator-backend.onrender.com/food/${food}`);
  const portion = parseFloat(document.getElementById('portion').value);
  
  if (!portion || isNaN(portion) || portion <= 0) {
    alert('Please enter a valid portion size (e.g., 2)');
    return;
  }
  
  try {
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

// Custom food form submission
document.getElementById('customFoodForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const food = document.getElementById('customFoodName').value;
  const portion = 1;
  const nutrients = {
    calories: parseFloat(document.getElementById('customCalories').value),
    carbs: parseFloat(document.getElementById('customCarbs').value),
    protein: parseFloat(document.getElementById('customProtein').value),
    fat: parseFloat(document.getElementById('customFat').value),
    iron: parseFloat(document.getElementById('customIron').value),
    calcium: parseFloat(document.getElementById('customCalcium').value)
  };

  if (Object.values(nutrients).some(val => isNaN(val) || val < 0)) {
    alert('Please enter valid nutrient values');
    return;
  }

  foodEntries.push({ food, portion, nutrients });
  localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
  renderEntries();
  document.getElementById('customFoodForm').reset();
});

// Clear logs
document.getElementById('clearLogs').addEventListener('click', () => {
  foodEntries = [];
  localStorage.removeItem('foodEntries');
  renderEntries();
});