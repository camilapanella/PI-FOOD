import {GET_RECIPES, GET_BY_NAME, GET_BY_ID, GET_DIETS, FILTER_BY_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, POST_RECIPE} from '../actions/actions'

const initialState = {
recipes: [],
details: [],
diets: [],
allRecipes: []
}


export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RECIPES: 
        return{
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
        }
        case GET_BY_NAME:
        return{
            ...state,
            recipes: action.payload
        }
        case GET_BY_ID:
        return{
            ...state,
            details: action.payload
        }
        case GET_DIETS:
        return{
            ...state,
            diets: action.payload
        }
        case POST_RECIPE:
        return{
          ...state
        }
        case FILTER_BY_DIET:
          const allRecipes1 = state.allRecipes; 

          let diets1 = action.payload === "All" ? allRecipes1 : allRecipes1.filter(el => 
            el.diets.find(e => e.includes(action.payload)));   
        return{
            ...state,
            recipes: diets1
        }
        case ORDER_BY_NAME:
            let sortedArr =
            action.payload === "asc" ? state.recipes.sort(function (a, b) {
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (b.name > a.name) {
                    return -1;
                  }
                  return 0;
                })
              : state.recipes.sort(function (a, b) {
                  if (a.name > b.name) {
                    return -1;
                  }
                  if (b.name > a.name) {
                    return 1;
                  }
                  return 0;
                });
          return {
            ...state,
            recipes: sortedArr,
          };
        case ORDER_BY_SCORE:
            let sortedByScore =
        action.payload === "high" ? state.recipes.sort(function (a, b) {
              return b.healthScore - a.healthScore;
            })
        : state.recipes.sort(function (a, b) {
              return a.healthScore - b.healthScore;
            });
        return {
        ...state,
        recipes: sortedByScore
        };
        default: return {...state}
    }
}

