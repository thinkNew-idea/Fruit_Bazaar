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
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const CartComponent = () => {
    const location = useLocation();
    const Type= location?.state?.type
    const cartItems = useSelector(state => state?.cart?.cartItems);
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
        return (item?.product_quantity_real || 0) * parseFloat(item?.product?.price);
    };
    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemTotal = (item?.product_quantity_real || 0) * parseFloat(item?.product?.price);
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
                           {!Type&& <th>Quantity</th>}
                           {!Type&& <th>Total</th>}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (

                            <tr key={index} className='hederingoftable'>
                                <td className='flex items-center font-[500] gap-3'>
                                    <img src={item?.product?.photos} alt={item?.product?.title} className='product-image w-[135px] border border-solid border-[#ececec]' />
                                    {item?.product?.title}
                                </td>
                                <td>{item?.product?.price}</td>
                                {!Type&&<td className='w-[119px]'>
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
                                </td>}
                               {!Type&&<td>{calculateTotal(item)}</td>}
                                <td>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                {!Type &&<div className="total-section hederingoftable mt-5 p-[41px]">
                    <div>
                        <h2 className="font-[600] productTotal">PRODUCT TOTALS</h2>
                        <div className=' pt-[20px]  pb-[40px] flex flex-row justify-between'>
                            <p className="font-[600]">Total: </p>
                            <p className="font-[600]">Rs. {calculateCartTotal()}</p>

                        </div>
                        <div className='flex justify-end'><Button

                            style={{
                                width: 'auto',
                                padding: '13px 4rem',
                                fontSize: '16px',
                                fontWeight: 600,
                                backgroundColor: '#0bc217',
                                borderRadius: 0,

                            }}
                            size="normal"
                            variant="contained"

                        >
                            Proceed to checkout
                        </Button></div>
                    </div>

                </div>}
            </div>
        </div>
    );
};

export default CartComponent;
