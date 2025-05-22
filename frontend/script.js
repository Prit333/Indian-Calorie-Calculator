document.getElementById('foodForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const food = document.getElementById('foodSelect').value;
  const portion = parseFloat(document.getElementById('portion').value);
  
  // Validate portion
  if (!portion || isNaN(portion) || portion <= 0) {
    alert('Please enter a valid portion size (e.g., 2)');
    return;
  }
  
  try {
    // Fetch nutrient data from backend
    const response = await fetch(`https://glowing-eureka-56p954w5q66f7jrg-3000.app.github.dev/food/${food}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Backend response:', data); // Debug log
    
    // Check for error response
    if (data.error) {
      alert(data.error);
      return;
    }
    
    // Validate nutrient data
    if (!data.calories_kcal || !data.carbs_g || !data.protein_g || !data.fat_g) {
      alert('Invalid nutrient data from server');
      return;
    }
    
    // Calculate nutrients
    const nutrients = {
      calories: data.calories_kcal * portion,
      carbs: data.carbs_g * portion,
      protein: data.protein_g * portion,
      fat: data.fat_g * portion,
      iron: data.iron_mg * portion,
      calcium: data.calcium_mg * portion
    };
    
    // Add to table
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${food}</td>
      <td>${portion}</td>
      <td>${nutrients.calories.toFixed(1)}</td>
      <td>${nutrients.carbs.toFixed(1)}</td>
      <td>${nutrients.protein.toFixed(1)}</td>
      <td>${nutrients.fat.toFixed(1)}</td>
      <td>${nutrients.iron.toFixed(1)}</td>
      <td>${nutrients.calcium.toFixed(1)}</td>
    `;
    document.getElementById('foodList').appendChild(row);
    
    // Update total
    const totalCalories = parseFloat(document.getElementById('totalCalories').textContent) + nutrients.calories;
    document.getElementById('totalCalories').textContent = totalCalories.toFixed(1);
  } catch (error) {
    console.error('Error fetching food data:', error);
    alert('Failed to fetch food data. Check console for details.');
  }
});