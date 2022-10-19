import axios from 'axios'; 

export const GET_RECIPES = 'GET_RECIPES';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_BY_ID = 'GET_BY_ID';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const POST_RECIPE = 'POST_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes`);
        return dispatch({
            type : GET_RECIPES,
            payload: json.data
        })
    }
}

export function getRecipesByName (name){  
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    return dispatch( {
        type : GET_BY_NAME,
        payload: json.data
    })
}
}

export function getRecipesById (id){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch( {
        type : GET_BY_ID,
        payload: json.data
    })
}
}

export function getDiets (){ 
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/diets`);
         console.log(json.data);
        return dispatch( {
            type : GET_DIETS,
            payload: json.data
        })
    }
}

export function filterRecipesByDiet (payload){
    return {
        type : FILTER_BY_DIET,
        payload
    }
}

export function getCreatedRecipes(payload) {
    return {
      type: FILTER_BY_CREATED,
      payload,
    };
  }

export function orderByName (payload){
    return {
        type : ORDER_BY_NAME,
        payload
    }
}

export function orderByScore (payload){
    return {
        type : ORDER_BY_SCORE,
        payload
    }
}

export function postRecipes (payload){
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/recipes`,payload);
        return json
    }
}

export function deleteRecipe (payload){
    return async function(dispatch){
        let deleted = await axios.delete(`http://localhost:3001/recipes/${payload}`)
        return{
            type: DELETE_RECIPE,
            payload
        }
    }
}