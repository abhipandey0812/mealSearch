const searchKeyword = document.getElementById("search"),
  searchBtn = document.getElementById("search-btn"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  resultHeading = document.getElementById("result-heading"),
  mealsEl = document.getElementById("meals"),
  singleMealEl = document.getElementById("single-meal");

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
submit.addEventListener("submit", searchMeal);
