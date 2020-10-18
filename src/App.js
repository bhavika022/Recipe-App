import React, { useEffect , useState } from 'react';
import './App.css';
import Recipe from "./Recipe";

const App =() =>{

  const APP_ID ="28324a90";
  const APP_KEY ="6eabb066a303cbab1a616fecea0452d2";

  const [recipes, setRecipes]  = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState('chicken');
   
  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    } 

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
       <div className="container">
        <h1>Recipe App</h1>
      </div>
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}></input>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.key}
        title={recipe.recipe.label} 
        calories = {recipe.recipe.calories} 
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
