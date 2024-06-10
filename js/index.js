const apiKey = "d3ab270b-1be3-4c9b-9db9-8112cd6db2ba";
const req = new XMLHttpRequest();
const searchInput = document.querySelector("#search");
searchInput.addEventListener("change", function () {
  getRecipes(searchInput.value);
});

async function getRecipes(rec) {
  const apiKey = "d3ab270b-1be3-4c9b-9db9-8112cd6db2ba";
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${rec}&key=${apiKey}`
  );
  const result = await res.json();
  const allRecipes = result.data.recipes;
  console.log(allRecipes);
  if (res.status == 200) {
    displayRecipes(allRecipes);
  }
}

function displayRecipes(arr) {
  let bBox = "";
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    bBox += `
      <div class="col-lg-3 col-md-4">
        <div class="recipy bg-body-tertiary">
          <img src="${ele.image_url}" class="w-100 img-fluid h-25" alt="" />
          <h3>${ele.title}</h3>
          <span>${ele.publisher}</span>
          <button type="button" class="btn btn-primary show-ingredients" data-id="${ele.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Show ingredients
          </button>
        </div>
      </div>`;
  }
  document.querySelector("#recipes").innerHTML = bBox;
  getIngredients();
}

function getIngredients() {
  const buttons = document.querySelectorAll(".show-ingredients");
  buttons.forEach((button) => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      await displayIngrediant(id);
    });
  });
}

async function displayIngrediant(id) {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${apiKey}`
  );
  const result = await res.json();
  const recipe = result.data.recipe;
  let ingredientsHTML = "<ul>";
  recipe.ingredients.forEach((ingredient) => {
    ingredientsHTML += `<li>${ingredient.quantity || ""} ${
      ingredient.unit || ""
    } ${ingredient.description}</li>`;
  });
  ingredientsHTML += "</ul>";

  document.querySelector(
    ".modal-title"
  ).textContent = `Ingredients of ${recipe.title}`;
  document.querySelector(".modal-body").innerHTML = ingredientsHTML;
}

function displayError() {
  console.log("Error");
}
