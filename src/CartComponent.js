import React from 'react';
import { useSelector } from 'react-redux';

const CartComponent = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log("cartItems", cartItems);
    return (
        <div>
            {cartItems.map((item, index) => (
                <div key={index}>
                    <div>Name: {item.product_name}</div>
                    <div>Size: {item.size}</div>
                    <div>Sale Price: {item.sale_price}</div>
                    <div>MRP: {item.mrp}</div>
                </div>
            ))}
        </div>
    );
};

export default CartComponent;
