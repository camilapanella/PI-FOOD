import React from 'react'
import styles from './filter.module.css'
import { filterRecipesByDiet, orderByName, orderByScore, getCreatedRecipes } from '../../actions/actions'
import { useDispatch } from 'react-redux'

export default function Filter({allDiets, setCurrPage, setOrder, createdInDb}){
    const dispatch = useDispatch();

    function handleFiltDiets(e){
        dispatch(filterRecipesByDiet(e.target.value))
        setCurrPage(1)
        setOrder(`${e.target.value}`)
    }

    function handleOrderName(e){
        
        dispatch(orderByName(e.target.value))
        setCurrPage(1)
        setOrder(`${e.target.value}`)
    }

    function handleOrderScore(e){
        
        dispatch(orderByScore(e.target.value))
        setCurrPage(1)
        setOrder(`${e.target.value}`)
    }

    function handleFilterByCreated(e) {
       
        dispatch(getCreatedRecipes(e.target.value));
        setCurrPage(1);
        setOrder(`${e.target.value}`)
    }
   
    return(
        <div className={styles.container}>
            <select defaultValue='Order by alphabet' className={styles.name} placeholder='Order by alphabet' onChange={e => handleOrderName(e)}>
            <option disabled>Order by alphabet</option>
                <option key= 'asc' value = 'asc'>A-Z</option>
                <option key= 'desc' value = 'desc'>Z-A</option>
            </select>
            <select defaultValue='Order by score' className={styles.score} placeholder='Order by score' onChange={e => handleOrderScore(e)}>
                <option disabled>Order by score</option>
                <option key= 'high' value= 'high'>Highest health score</option>
                <option key= 'low' value= 'low'>Lowest health score</option>
            </select>
            <select defaultValue='Filter by diet' className={styles.diet} placeholder='Filter by diet' onChange={e => handleFiltDiets(e)}>
            <option disabled>Filter by diet</option>
            <option value='all'>All diets</option>
            {allDiets?.map(diet => <option key={diet.name}>{diet.name}</option>)}
            </select>

            <select defaultValue='Show recipes' className={styles.created} placeholder='Show recipes...' onChange={e => handleFilterByCreated(e)}>
              <option disabled>Show recipes</option>
              <option value="all">All recipes</option>
              <option value="api">Api recipes</option>
              {createdInDb.includes(true) ? <option value="created">Your recipes</option> : <option disabled value="created">Your recipes</option>}
            </select>
        </div>

    )
}