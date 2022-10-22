import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import img from '../images/photo.webp';
import { postRecipes, getDiets } from "../../actions/actions";
import styles from './form.module.css'

export function validate(input) {
    let errors = {};
    if (!input.name) errors.name = 'Name is required!';
    if(!input.summary) errors.summary = "A summary of the recipe is required!"
    if(input.healthScore < 0 || input.healthScore > 100) errors.healthScore = "The health score of the recipe must be a number between 0 and 100!"
    return errors;
  };

  
export default function Form(props){
    const dispatch = useDispatch();
    const dietsState = useSelector(state => state.diets);
    const recipes = useSelector(state => state.recipes)

    const [input, setInput] = useState({
        name:"",
        summary:"",
        image:"",
        diets: [],
        healthScore:"",
        steps:""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getDiets())
     }, [])

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postRecipes(input))
        alert('Recipe successfully created')
        setInput({
            name:"",
            summary:"",
            image:"",
            diets: [],
            healthScore:"",
            steps:""
        })
    }

    function handleSelect(e){
        if(!input.diets.includes(e.target.value)){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        if(recipes.find(recipe => recipe.name.toLowerCase() === e.target.value.toLowerCase())){
            setErrors({
                ...input,
                [e.target.name]: 'This recipe already exists'
            })
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== e)
        })
    }

    console.log(errors)
    return(
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h3>¡Create a new recipe!</h3>
            
            <div className={styles.nameCont}>
            <input className={styles.inpName} type="text" value = {input.name} name = 'name' placeholder='Add name...' onChange = {e => handleChange(e)} />
            {errors.name && <span className={styles.errName}>{errors.name}</span>}
            </div>

            <div className={styles.sumCont}>  
            <textarea className={styles.inpSum} type="text" value = {input.summary} name = 'summary' 
              placeholder='Summary of your recipe...' onChange = {e => handleChange(e)} />
            {errors.summary && <span className={styles.errSum}>{errors.summary}</span>}  
            </div> 

            <div className={styles.healthCont}>     
            <input className={styles.inpHealth} type="number" value = {input.healthScore} name = 'healthScore' placeholder="Health score..."
               onChange = {e => handleChange(e)} />  
            {errors.healthScore && <span className={styles.errHealth}>{errors.healthScore}</span>}   
            </div>

            <textarea className={styles.inpSteps} type="text" value = {input.steps} name = 'steps' 
              placeholder='Steps to follow...' onChange = {e => handleChange(e)} />

            <input className={styles.img} type='text' value ={input.image} name = 'image' placeholder="Image url" onChange = {e => handleChange(e)}/>

            <select className={styles.diets} defaultValue='Diets' onChange={(e) => handleSelect(e)} >
                <option disabled>Diets</option>
                {dietsState?.map(diet => <option key={diet.name} value={diet.name}>{diet.name}</option>)}
            </select>

            <div className={styles.handleDiets}>
                {input.diets.map((el, index) => <div key={index}><li className={styles.diet}>{el}</li>
                <input type='button' className={styles.btnDelete} onClick={()=>handleDelete(el)} value='X'/>
                </div>)}
            </div>

            {!Object.keys(errors).length ? <button className={styles.btn} disabled={!input.name || !input.summary} type='submit'>Submit</button> : null}
            
        </form>
    )
}  