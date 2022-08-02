function getSearchValue(){
    const searchText = document.getElementById('search-field');
    searchTextValue = searchText.value;
    // clear input field
    searchText.value = '';
    if(searchTextValue == ''){
        alert('Please enter a valid food name')
    }
    else{
    // get search result
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTextValue}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
    }   
}

const displaySearchResult = meals =>{
    console.log(meals)
    const searchReuslt = document.getElementById('search-result');
    searchReuslt.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadFullDetails(${meal.idMeal})"  class="card w-100 h-50 text-center "> 
            <img width="200px" src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title my-3">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
               
            </div>
        </div>
        `;
        searchReuslt.appendChild(div)
    })
}

const loadFullDetails = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayFullDetails(data.meals[0]))
}

const displayFullDetails = mealDetail =>{
    const mealDetails = document.getElementById('full-details');
    const div = document.createElement('div');
    mealDetails.textContent= '';
    div.classList.add('card');
    div.innerHTML= `
        <img src="${mealDetail.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"> ${mealDetail.strMeal} </h5>
          <p class="card-text">${mealDetail.strInstructions.slice(0, 200)}}</p>
          <a href="${mealDetail.strYoutube}" class="btn btn-warning text-white w-50 text-center ">Video</a>
        </div>
    `;
    mealDetails.appendChild(div);
}