import React from "react";
import { Link } from "react-router-dom";
import styles from './recipes.module.css'

export default function Recipes({image,name,id,diets,recipes}){

return(
    
    <div className={styles.recipes}>
     <Link to={`home/${id}`}>
        <div className={styles.info}>
     <h2>{name}</h2>
     <img className={styles.img} src={image} alt="Not found" />
     <div className={styles.diets}>
        <h3>Diets :</h3>
        {diets.map(el => {
            return(
                <h5 key={el}> {el.name ? el.name : el} </h5>
            )
        })}
     </div>
     </div>
     </Link>
    </div>
)
}