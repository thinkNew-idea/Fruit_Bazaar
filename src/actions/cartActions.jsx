import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY, INCREASE_CART_ITEM_QUANTITY, DECREASE_CART_ITEM_QUANTITY } from './actionTypes';
export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product,
    };
};
export const removeFromCart = (index) => {
    return {
        type: REMOVE_FROM_CART,
        payload: index,
    };
};
export const updateCartItemQuantity = (index, quantity) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { index, quantity },
});
export const increaseCartItemQuantity = (index) => ({
    type: INCREASE_CART_ITEM_QUANTITY,
    payload: { index },
});

export const decreaseCartItemQuantity = (index) => ({
    type: DECREASE_CART_ITEM_QUANTITY,
    payload: { index },
});