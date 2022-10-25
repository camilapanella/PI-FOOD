import {GET_RECIPES, GET_BY_NAME, GET_BY_ID, GET_DIETS, FILTER_BY_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, POST_RECIPE, DELETE_RECIPE, FILTER_BY_CREATED, CLEAR_DETAIL} from '../actions/actions'

const initialState = {
recipes: [],
details: [],
diets: [],
allRecipes: [],
error: {}
}


export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RECIPES: 
        return{
            ...state,
            recipes: action.payload,
            allRecipes: action.payload,
            error: {}
        }
        case GET_BY_NAME:
          if(action.payload.msg){
            return{
              ...state,
              error: action.payload
            }
          }else{
            return{
            ...state,
            recipes: action.payload,
            error: {}
            }
          }
        case GET_BY_ID:
        return{
            ...state,
            details: action.payload
        }
        case CLEAR_DETAIL:
          return{
            ...state,
            details: []
          }
        case GET_DIETS:
        return{
            ...state,
            diets: action.payload
        }
        case POST_RECIPE:
        return{
          ...state, 
          error: {}
        }
        case FILTER_BY_DIET:
          let allR = state.allRecipes
          let diets1; 
          if(action.payload === 'vegetarian'){ 
            diets1 = allR.filter(el => el.diets.includes(`lacto ovo ${action.payload}`) || el.diets.find(e => e.name === action.payload))
          }else{
              diets1 = allR.filter(el => el.diets.includes(action.payload) || el.diets.find(e => e.name === action.payload));
            }
          
        return{
            ...state,
            recipes: action.payload === 'all' ? allR : diets1
        
        }
        case FILTER_BY_CREATED:
           var createdRecipes = action.payload === "created" ? state.allRecipes.filter((e) =>
            e.createdInDb) : state.allRecipes.filter((e) => !e.createdInDb);
          if (action.payload === "all") createdRecipes = state.allRecipes;
        
        return {
        ...state,
        recipes: createdRecipes,
        };
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
            let sortedByScore = action.payload === "high" ? state.recipes.sort(function (a, b) {
              return b.healthScore - a.healthScore;
            }) : state.recipes.sort(function (a, b) {
              return a.healthScore - b.healthScore;
            });
        return {
        ...state,
        recipes: sortedByScore
        };
        case DELETE_RECIPE:
          return{
            ...state,
            allRecipes: state.allRecipes.filter(e => e.id !== action.payload),
            recipes: state.recipes.filter(e => e.id !== action.payload)
          }
        default: return {...state}
    }
}

