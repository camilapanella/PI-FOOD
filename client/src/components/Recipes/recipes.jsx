import React from "react";
import { Link } from "react-router-dom";
import styles from './recipes.module.css'
import { deleteRecipe } from "../../actions/actions";
import { useDispatch } from 'react-redux';

export default function Recipes({image,name,id,diets,createdInDb}){

    const dispatch = useDispatch()

    function handleDelete() {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
          dispatch(deleteRecipe(id));
          document.location.reload();
        }
      }    

return(
    
    <div className={styles.recipes}>
        {createdInDb ? <button className={styles.delete} onClick={(e) => handleDelete(e)}>Delete</button> : null}
     <Link to={`home/${id}`} className={styles.link}>
    <div className={styles.info}>
     <h2 className={styles.name}>{name}</h2>
     <img className={styles.img} src={image} alt="Not found" />
     <div className={styles.diets}>
        <h3>Diets :</h3>
        {diets.map(el => {
            return(
                <li className={styles.listDiet} key={el}> {el.name ? el.name : el} </li>
                
            )
        })}
     </div>
     </div>
     </Link>
    </div>
)
}