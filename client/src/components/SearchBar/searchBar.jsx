import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName, getRecipes } from "../../actions/actions";
import styles from "./searchBar.module.css";



export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!name) alert('Please enter a recipe name')
    else
    dispatch(getRecipesByName(name.toLowerCase()))
    setName("")
  }

  function handleReset(e){
    e.preventDefault();
    dispatch(getRecipes());
  }

  
    
  return (
    <form>
      <input className={styles.inputName} type="text" placeholder="Search recipe..." onChange={(e) => handleInputChange(e)} />
      <button className={styles.buttonSearch} type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
      <button className={styles.btnAll} onClick={(e) => handleReset(e)}>Show all recipes</button>
    </form>
  );
}