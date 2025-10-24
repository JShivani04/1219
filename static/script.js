let allRecipes = [];

async function fetchRecipes() {
  const res = await fetch('/recipes');
  allRecipes = await res.json();
  populateCategories();
  displayRecipes(allRecipes);
}

function populateCategories() {
  const select = document.getElementById('categoryFilter');
  const categories = [...new Set(allRecipes.map(r => r.category))];
  select.innerHTML = '<option value="">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function displayRecipes(recipes) {
  const container = document.getElementById('recipes');
  container.innerHTML = '';

  if (recipes.length === 0) {
    container.innerHTML = '<p>No recipes found 🍴</p>';
    return;
  }

  recipes.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h2>${r.name}</h2>
      <p><b>Category:</b> ${r.category}</p>
      <p><b>Ingredients:</b> ${r.ingredients}</p>
      <p><b>Steps:</b> ${r.steps}</p>
      <button onclick="deleteRecipe(${r.id})">🗑️ Delete</button>
    `;
    container.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', () => filterRecipes());
document.getElementById('categoryFilter').addEventListener('change', () => filterRecipes());

function filterRecipes() {
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const filtered = allRecipes.filter(r =>
    r.name.toLowerCase().includes(search) &&
    (category === '' || r.category === category)
  );
  displayRecipes(filtered);
}

async function deleteRecipe(id) {
  if (confirm('Are you sure you want to delete this recipe?')) {
    await fetch(`/recipes/${id}/delete`, { method: 'POST' });
    fetchRecipes();
  }
}

fetchRecipes();
