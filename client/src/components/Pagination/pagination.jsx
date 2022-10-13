import React from 'react';
import styles from './pagination.module.css'



export default function Paginate({recPerPage,allRecipes,paginate}){
    const pageNumbers = []

    for (let i = 1; i<=Math.ceil(allRecipes/recPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className = 'paginate'>
                {
                    pageNumbers?.map(number => (
                        <li className={styles.list} key ={number}>
                            <button className={styles.btn} onClick={()=>paginate(number)}>{number}</button>

                        </li>
                    ))
            }

        </ul>
    </nav>
)

}