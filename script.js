const searchKeyword = document.getElementById("search"),
  searchBtn = document.getElementById("search-btn"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  resultHeading = document.getElementById("result-heading"),
  mealsEl = document.getElementById("meals"),
  singleMealEl = document.getElementById("single-meal");

function displayMealDetails(meal) {
  console.log(meal);
  let ingredients = [];
  for (i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMealEl.innerHTML = `
  <div class='single-meal'>
  <h1>${meal.strMeal}</h1>
  <h3>${meal.strCategory}</h3>
  <h4>${meal.strArea}</h4>
  <div class='info'>
  <img src=${meal.strMealThumb}>
  <ul>
   <h2>Ingridients</h2>
   ${ingredients.map((ingridient) => `<li>${ingridient}</li>`)}
  </ul>
  </div>
  <p>${meal.strInstructions}</p>
  </div>
  `;
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
}

const searchMeal = (e) => {
  e.preventDefault();

  //clearing singleMeal space
  singleMealEl.innerHTML = "";

  //Search Value
  const searchTerm = searchKeyword.value;

  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h3>Search result for ${searchTerm}:</h3>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>No items found with name ${searchTerm}, Please try again.</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class= 'meal'>
          <img  src= ${meal.strMealThumb}>
          <div class="meal-info" data-mealId="${meal.idMeal}">
            <h4>${meal.strMeal}</h4>
            <h6>
            <i class="fas fa-map-marker" ></i>
               ${meal.strArea} 
            </h6>
          </div>
          </div>
            `
            )
            .join("");
        }
        //clear search text
        searchKeyword.value = "";
      });
  } else {
    alert("Please Enter Value");
  }
};

//Event Listners
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealId");
    getMealById(mealId);
  }
});
submit.addEventListener("submit", searchMeal);
