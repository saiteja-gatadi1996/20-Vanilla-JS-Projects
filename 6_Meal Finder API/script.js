const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal")

async function searchMeal(e) {
  e.preventDefault()

  //Clear Single meal
  single_mealEl.innerHTML = ""

  //Get Search Term
  const term = search.value

  //Check for empty
  if (term.trim()) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    )
    const data = await res.json()
    console.log(data)
    resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`
    if (data.meals === null) {
      resultHeading.innerHTML = `<p>There are no search results. Try again! </p>`
    } else {
      mealsEl.innerHTML = data.meals
        .map(
          (meal) => `
        <div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="meal-info" data-mealID="${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
        </div>
        </div>`
        )
        .join("")
    }
    // Clear Search value
    search.value = ""
  } else {
    alert("Pleaseenter a search term")
  }

  single_mealEl.innerHTML
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0]

      addMealToDOM(meal)
    })
}

function addMealToDOM(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} -${meal[`strMeasure${i}`]}`
      )
    } else {
      break
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
  <div class = "single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>

  <ul>
  ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
  
  </ul>
  </div>
  `
}

submit.addEventListener("submit", searchMeal)
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info")
    } else {
      return false
    }
  })
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid")
    getMealById(mealID)
  }
})
