import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName, getRecipes } from "../../actions/actions";
import styles from "./searchBar.module.css";



 export default function SearchBar({setCurrPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  
  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!name) alert('Please enter a recipe name')
    dispatch(getRecipesByName(name.toLowerCase()))
    setName("")
    setCurrPage(1)
    
  }

  function handleReset(){
    dispatch(getRecipes());
  }

  
  return (
    <form>
      <input className={styles.inputName} type="text" placeholder="Search recipe..." value={name} onChange={(e) => handleInputChange(e)} />
      <button className={styles.buttonSearch} type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
      <button className={styles.btnAll} onClick={(e) => handleReset(e)}>Refresh</button>
    </form>
  );
}
