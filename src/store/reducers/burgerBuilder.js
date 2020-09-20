import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility'; 

const initialState = {
  ingredients: null,
  totalPrice: 100,
  building : false
};

const INGREDIENT_PRICES = {
  salad: 50,
  cheese: 25,
  meat: 100,
  bacon: 70,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      const updatedIngredient = {  [action.ingredientName]: state.ingredients[action.ingredientName] + 1  }
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients : updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building : true
      }
      return updateObject(state, updatedState)
    case actionTypes.REMOVE_INGREDIENTS:
      const updatedIng = {  [action.ingredientName]: state.ingredients[action.ingredientName] - 1  }
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedSt = {
        ingredients : updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building : true
      }
      return updateObject(state, updatedSt);
    case actionTypes.SET_INGREDIENTS:
      return updateObject (state, {
        ingredients: action.ingredients,
        totalPrice : 100,
        building : false
      })
    case actionTypes.RESET_BURGER:
      return updateObject(state, {
        ingredients : {
          salad : 0,
          bacon : 0,
          cheese : 0,
          meat : 0
        },
        totalPrice : 100
      })
    default:
      return state;
  }
};

export default reducer;
