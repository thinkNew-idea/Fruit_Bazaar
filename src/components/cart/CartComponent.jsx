import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../actions/cartActions';
import Header from '../layout/Header';
const CartComponent = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();


    const handleDelete = (index) => {
        dispatch(removeFromCart(index));
    };
    return (
        <div className='flex flex-col'>
            <Header />
            <div className='px-[10rem] py-[2rem]'>
                <table>
                    <thead>
                        <tr className='hederingoftable'>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>

                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index} className='hederingoftable'>
                                <td className='flex'>{item.product_img}{item.product_name}</td>
                                <td>{item.mrp}</td>
                                <td>{item.size}</td>

                                <td>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartComponent;
