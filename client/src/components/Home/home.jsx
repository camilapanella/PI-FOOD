import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getRecipes, getDiets} from '../../actions/actions'
import styles from './home.module.css'
import Recipes from '../Recipes/recipes'
import Paginate from '../Pagination/pagination';
import Filter from '../Filter/filter';
import Loading from '../Loading/loading';


export default function Home(){
const dispatch = useDispatch();
const allRecipes = useSelector(state => state.recipes);
const allDiets = useSelector(state => state.diets)
const [order, setOrder] = useState('')
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

useEffect(()=>{
  dispatch(getDiets());
}, [])  

const getPrevious  = () => {
  setCurrPage(currPage - 1)
}
const getNext  = () => {
  setCurrPage(currPage + 1)
}

if(currentRec.length){

return(
      <div className={styles.home}>
      <Filter
      allDiets={allDiets}
      setOrder={setOrder}
      setCurrPage={setCurrPage}
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