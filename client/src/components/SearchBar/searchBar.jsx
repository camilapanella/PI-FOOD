import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions/actions";
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
    setName("");
    if(!name) return alert('Please enter a recipe name')
    var result = dispatch(getRecipesByName(name.toLowerCase()))
    if(!result.length) alert('Recipe not found')
    return result
  }

  
    
  return (
    <form>
      <input className={styles.inputName} type="text" placeholder="Search recipe..." onChange={(e) => handleInputChange(e)} />
      <button className={styles.buttonSearch} type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </form>
  );
}