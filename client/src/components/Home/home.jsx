import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getRecipes} from '../../actions/actions'
import styles from './home.module.css'
import Recipes from '../Recipes/recipes'
import Paginate from '../Pagination/pagination';


export default function Home(){
const dispatch = useDispatch();
const allRecipes = useSelector(state => state.recipes);
const [currPage, setCurrPage] = useState(1)
const [recPerPage] = useState(9)
const indexLastRecipe = currPage * recPerPage;
const indexFirstRecipe = indexLastRecipe - recPerPage;
const currentRec = allRecipes.slice(indexFirstRecipe, indexLastRecipe);
const paginate = pageNumber => {
  setCurrPage(pageNumber)
} 


useEffect(() => {
  dispatch(getRecipes());
  }, []);


return(
      <div className={styles.home}>
      <div className={styles.card}>
                  {currentRec?.map(el => {
                    return <Recipes
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    diets={el.diets}
                    />
                  })}
                </div>
         {allRecipes.length > 9 && <Paginate recPerPage={recPerPage} allRecipes={allRecipes.length} paginate={paginate} />}
              </div>
    )
}