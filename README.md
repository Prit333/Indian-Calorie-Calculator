# Indian-Calorie-Calculator
Indian Calorie Calculator
A web application to track nutritional information for Indian foods, addressing the lack of comprehensive nutrient trackers for Indian cuisine. Users can log 100 Indian foods (e.g., Almonds, Roti, Dal) and custom entries, viewing calories, carbs, protein, fat, iron, and calcium. Built with a Node.js/Express backend and HTML/CSS/JavaScript frontend, deployed on Render (backend) and Vercel (frontend).
Features

Food Database: 100 Indian foods across categories (Dry Fruits, Juices, Roti, Rice, Dal, Vegetables, Chicken, Mutton, Egg, State-specific dishes).
Nutrient Tracking: Log portions and view totals for calories, carbs, protein, fat, iron, and calcium.
Searchable Interface: Autocomplete input for easy food selection.
Custom Foods: Add user-defined foods with nutrient details.
Persistent Storage: Logs saved in browser’s local storage.
Case-Insensitive Search: Backend handles variations (e.g., “almonds” or “Almonds”).
Responsive Design: Clean UI with a table for logged foods and totals.

Tech Stack

Backend: Node.js, Express, foods.json database.
Frontend: HTML, CSS, JavaScript (vanilla).
Deployment: Render (backend), Vercel (frontend).
Development: GitHub Codespaces.

Setup
Prerequisites

Node.js (v16 or higher).
GitHub account.
Render and Vercel accounts for deployment.
GitHub Codespaces access.

Local Setup in Codespaces

Clone the Repository:git clone https://github.com/username/Indian-Calorie-Calculator.git
cd Indian-Calorie-Calculator


Backend Setup:
Navigate to backend:cd backend
npm install


Ensure foods.json exists with 100 foods (e.g., Almonds: 579 kcal/100g).
Run the backend:node server.js


Test: https://glowing-eureka-56p954w5q66f7jrg-3000.app.github.dev/food/Almonds.


Frontend Setup:
Navigate to frontend:cd ../frontend
npm install serve


Run the frontend:npx serve


Open: https://glowing-eureka-56p954w5q66f7jrg-5000.app.github.dev.


Verify:
Add “Almonds” (1 portion) → Table shows 579 kcal, 21.6g carbs.
Test autocomplete and custom food logging.



Deployment
Backend (Render)

Push code to GitHub:git add .
git commit -m "Update backend with latest fixes"
git push origin main


In Render Dashboard (render.com):
Create a Node.js service, link to username/Indian-Calorie-Calculator.
Set Root Directory: backend.
Set Start Command: node server.js.
Enable auto-deploy for main branch.


Test: https://indian-calorie-calculator-backend.onrender.com/food/Almonds.

Frontend (Vercel)

In Vercel Dashboard (vercel.com):
Import username/Indian-Calorie-Calculator.
Set Root Directory: frontend.
No build command needed (static site).
Enable auto-deploy.


Test: Open Vercel URL, add “Almonds” and verify nutrient table.

Usage

Add Food:
Type a food (e.g., “Almonds”) in the search input.
Select from autocomplete suggestions.
Enter portion size (e.g., 1 for 100g).
Click “Add Food” → View nutrients in the table.


Add Custom Food:
Enter food name and nutrient values (kcal, carbs, etc.).
Click “Add Custom Food”.


Manage Entries:
View totals for all nutrients.
Delete entries with the “Delete” button.
Clear all logs with “Clear Logs”.


Example:
Add “Almonds” (1 portion) → 579 kcal, 21.6g carbs, 21.2g protein.
Add “Roti” (2 portions) → 160 kcal, 30g carbs.



