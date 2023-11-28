import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY, INCREASE_CART_ITEM_QUANTITY, DECREASE_CART_ITEM_QUANTITY } from '../actions/actionTypes';
import toast, { Toaster } from 'react-hot-toast';
const initialState = {
    cartItems: [],
};
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // Check if the product is already in the cart
            const existingProductIndex = state.cartItems.findIndex(
                item => item.product._id === action.payload.product._id
            );
            if (existingProductIndex !== -1) {
                // If the product is already in the cart, show an alert
                toast.error('You already added this item to your cart');
                return state; // Return the current state without modifying it
            } else {
                // If the product is not in the cart, add it
                toast.success('Your item was added to the cart successfully');

                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item, index) => index !== action.payload),
            };
        case UPDATE_CART_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((item, index) =>
                    index === action.payload.index ? { ...item, product_quantity: action.payload.quantity } : item
                ),
            };
        case INCREASE_CART_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((item, index) =>
                    index === action.payload.index
                        ? {
                            ...item,
                            product_quantity_real: (item.product_quantity_real || 0) + 1,
                        }
                        : item
                ),
            };
        case DECREASE_CART_ITEM_QUANTITY:
            console.log(`Decreasing quantity for item at index ${action.payload.index}`);
            return {
                ...state,
                cartItems: state.cartItems.map((item, index) =>
                    index === action.payload.index
                        ? {
                            ...item,
                            product_quantity_real: Math.max((item.product_quantity_real || 0) - 1, 1)
                        }
                        : item
                ),
            };
        default:
            return state;
    }
};


export default cartReducer;
