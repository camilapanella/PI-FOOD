import { React , useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getDiets, getRecipesById} from '../../actions/actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from './recipeDetail.module.css'



export default function RecipeDetail(){
const dispatch = useDispatch();
const details = useSelector(state => state.details);


const { id } = useParams()
useEffect(() => {
    dispatch(getRecipesById(id));
    dispatch(getDiets)
}, [dispatch, id]);


    return(
        <div className={styles.dtBg}>
          <Link to="/home">
            <button className={styles.btnHome}>Home </button>
          </Link>
            <div className={styles.info}>
              {details.length ? (
                <div>
                  <Link to="/home">
                  <button className={styles.btnX}>X </button>
                  </Link>
                <div className={styles.detail}>
                <h2 className={styles.name}>Name: {details[0].name}</h2>
                <img className={styles.img} src={details[0].image} alt="not found" />
                <h3>Health Score: {details[0].healthScore}</h3>
                <h3 className={styles.diets}>
                  Diets: 
                    {details[0].diets &&
                    details[0].diets.map(diet => diet.name ? diet.name : diet)}
                  </h3>
                  <h3 className={styles.summary}>Summary: {details[0].summary ? details[0].summary.replace(/<[^>]+>/g, "") : null}</h3>     
                 </div>
                 <h4 className={styles.steps}>
                    Steps: {details[0].steps}
                 </h4>
              </div>
          ) : null}
        </div>
      </div>
    )
}
