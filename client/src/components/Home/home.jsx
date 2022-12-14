import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getRecipes, getDiets} from '../../actions/actions'
import styles from './home.module.css'
import Recipes from '../Recipes/recipes'
import Paginate from '../Pagination/pagination';
import Filter from '../Filter/filter';
import Loading from '../Loading/loading';
import SearchBar from '../SearchBar/searchBar';


export default function Home(){
const dispatch = useDispatch();
const allRecipes = useSelector(state => state.recipes);
const allDiets = useSelector(state => state.diets)
const err = useSelector(state => state.error)
const [order, setOrder] = useState('')
const [currPage, setCurrPage] = useState(1)
const [recPerPage] = useState(9)
const indexLastRecipe = currPage * recPerPage;
const indexFirstRecipe = indexLastRecipe - recPerPage;
const currentRec = allRecipes.slice(indexFirstRecipe, indexLastRecipe);
const paginate = (pageNumber) => {
  setCurrPage(pageNumber)
} 
const getPrevious  = () => {
  setCurrPage(currPage - 1)
}
const getNext  = () => {
  setCurrPage(currPage + 1)
}


useEffect(() => {
  dispatch(getRecipes());
  }, []);

useEffect(()=>{
  dispatch(getDiets());
}, [])


if(Object.keys(err).length){
  return (<h1 className={styles.er}>Oops.. The recipe was not found
  <br></br>
  Please refresh the page 
  <br></br>
  or go to Create recipe 
  <br />
  to create it yourself!
  </h1>)
}
else if(currentRec.length){

return(
      <div className={styles.home}>
        <div className={styles.search}>
        <SearchBar
        setCurrPage={setCurrPage}
      />
        </div>
      <Filter
      allDiets={allDiets}
      setOrder={setOrder}
      setCurrPage={setCurrPage}
      createdInDb={allRecipes?.map(e => e.createdInDb)}
      />
      <div className={styles.card}>
                  {currentRec?.map(el => {
                    return <Recipes
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    diets={el.diets}
                    createdInDb={el.createdInDb}
                    healthScore={el.healthScore}
                    />
                  })}
                </div>
                <div className={styles.pagCont}>
         {allRecipes.length > 9 && <Paginate recPerPage={recPerPage} allRecipes={allRecipes.length} paginate={paginate} />}
         {currPage > 1 ? <button className={styles.prev} onClick={e => getPrevious(e)}>PREV</button> : null}
         {allRecipes.length > currPage * recPerPage ? <button className={styles.next} onClick={e => getNext(e)}>NEXT</button> : null}
         </div>
              </div>
    )
  }else{
    return(<Loading/>)
  }
}