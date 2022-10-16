import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from '../images/photo.webp';
import { postRecipes, getDiets } from "../../actions/actions";
import styles from './form.module.css'

export function validate(input) {
    let errors = {};
    if (!input.name) errors.name = 'Name is required';
    if(!input.summary) errors.summary = "A summary of the recipe is required"
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
        setInput("")
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


    return(
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <input className={styles.inpName} type="text" value = {input.name} name = 'name' placeholder='Add name...'
               onChange = {e => handleChange(e)} />
            <textarea className={styles.inpSum} type="text" value = {input.summary} name = 'summary' 
              placeholder='Summary of your recipe...' onChange = {e => handleChange(e)} />   
            <input className={styles.inpHealth} type="number" value = {input.healthScore} name = 'healthScore' placeholder="Health score..."
               onChange = {e => handleChange(e)} />  
            <textarea className={styles.inpSteps} type="text" value = {input.steps} name = 'steps' 
              placeholder='Steps to follow...' onChange = {e => handleChange(e)} />
            <input className={styles.img} type='file' value = {input.image} name = 'image'
             onChange = {e => handleChange(e)}
            />  
            <select className={styles.diets} defaultValue='Diets' onChange={(e) => handleSelect(e)}>
                <option disabled>Diets</option>
                {dietsState?.map(diet => <option key={diet.name} value={diet.name}>{diet.name}</option>)}
            </select>
            <button className={styles.btn} disabled={!input.name || !input.summary}>Submit</button>

        </form>
    )
}  