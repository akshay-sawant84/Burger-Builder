import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type : actionTypes.ADD_INGREDIENTS,
        ingredientName : name
    }
}

export const removeIngredient = (name) => {
    return {
        type : actionTypes.REMOVE_INGREDIENTS,
        ingredientName : name
    }
}

export const resetBurger = (ingredients) => {
    return {
        type : actionTypes.RESET_BURGER,
        ingredients : ingredients
    }
}

export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
} 

export const initIngredients = () => {
    return (dispatch) => {
        axios
        .get("https://react-burger-76a19.firebaseio.com/ingredients.json")
        .then((res) => {
          dispatch (setIngredients(res.data));
          dispatch (resetBurger(res.data));
        });
    }
}