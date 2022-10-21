import React from 'react'
import styles from './filter.module.css'
import { filterRecipesByDiet, orderByName, orderByScore, getCreatedRecipes } from '../../actions/actions'
import { useDispatch } from 'react-redux'

export default function Filter({allDiets, setCurrPage, setOrder}){
    const dispatch = useDispatch();

    function handleFiltDiets(e){
        dispatch(filterRecipesByDiet(e.target.value));
        setCurrPage(1)
        setOrder(`${e.target.value}`)
    }

    function handleOrderName(e){
        //e.preventDefault;
        dispatch(orderByName(e.target.value))
        setCurrPage(1)
        setOrder(`${e.target.value}`)
    }

    function handleOrderScore(e){
        //e.preventDefault;
        dispatch(orderByScore(e.target.value))
        setCurrPage(1)
        setOrder(`${e.target.value}`)
    }

    function handleFilterByCreated(e) {
        // e.preventDefault();
        dispatch(getCreatedRecipes(e.target.value));
        setCurrPage(1);
        setOrder(`${e.target.value}`)
    }
    return(
        <div className={styles.container}>
            <select className={styles.name} placeholder='Order by alphabet' onChange={e => handleOrderName(e)}>
            <option>Order by alphabet</option>
                <option key= 'asc' value = 'asc'>A-Z</option>
                <option key= 'desc' value = 'desc'>Z-A</option>
            </select>
            <select className={styles.score} placeholder='Order by score' onChange={e => handleOrderScore(e)}>
                <option>Order by score</option>
                <option key= 'high' value= 'high'>Highest health score</option>
                <option key= 'low' value= 'low'>Lowest health score</option>
            </select>
            <select className={styles.diet} placeholder='Filter by diet' onChange={e => handleFiltDiets(e)}>
            <option>Filter by diet</option>
            {allDiets?.map(diet => <option key={diet.name}>{diet.name}</option>)}
            </select>

            <select className={styles.created} placeholder='Show recipes...' onChange={e => handleFilterByCreated(e)}>
              <option>Show recipes</option>
              <option value="all">All recipes</option>
              <option value="api">Api recipes</option>
              <option value="created">Your recipes</option>
            </select>
        </div>

    )
}