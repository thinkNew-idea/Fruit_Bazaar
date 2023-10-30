import { ADD_TO_CART } from '../actions/actionTypes';

const initialState = {
    cartItems: [],
};



const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            console.log('Adding item to cart:', state);
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        default:
            return state;
    }
};

export default cartReducer;
