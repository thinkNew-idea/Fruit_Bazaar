import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../actions/cartActions';
import {
    updateCartItemQuantity,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
} from '../../actions/cartActions';
import Header from '../layout/Header';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

const CartComponent = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const handleDelete = (index) => {
        dispatch(removeFromCart(index));
    };

    const handleqtyValue = (event, index) => {
        const inputValue = parseInt(event.target.value);

        if (!isNaN(inputValue) && inputValue > 0) {
            dispatch(updateCartItemQuantity(index, inputValue));
        } else {

            dispatch(updateCartItemQuantity(index, 1));
        }
    };
    const handlePlus = (index) => {
        dispatch(increaseCartItemQuantity(index));
    };

    const handleMinus = (index) => {
        dispatch(decreaseCartItemQuantity(index));
    };


    const calculateTotal = (item) => {
        return (item.product_quantity_real || 0) * parseFloat(item.product.mrp);
    };
    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemTotal = (item.product_quantity_real || 0) * parseFloat(item.product.mrp);
            return total + itemTotal;
        }, 0);
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (

                            <tr key={index} className='hederingoftable'>
                                <td className='flex items-center font-[500] gap-3'>
                                    <img src={item.product.product_image} alt={item.product.product_name} className='product-image w-[135px] border border-solid border-[#ececec]' />
                                    {item.product.product_name}
                                </td>
                                <td>{item.product.mrp}</td>
                                <td className='w-[119px]'>
                                    <div className='flex border border-[2px] border-[#3d3839] w-[90px] relative'>
                                        <input
                                            className='qtyvalue'
                                            type='text'
                                            onChange={(e) => handleqtyValue(e, index)}
                                            value={item.product_quantity_real ?? ''}
                                        />
                                        <div className='flex flex-col'>
                                            <button className='qty_plus' onClick={() => handlePlus(index)}>
                                                <span><AddRoundedIcon /></span>
                                            </button>
                                            <button className='qty_minus' onClick={() => handleMinus(index)}>
                                                <span><RemoveRoundedIcon /></span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>{calculateTotal(item)}</td>
                                <td>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <div className="total-section">
                    <p>Total: {calculateCartTotal()}</p>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
