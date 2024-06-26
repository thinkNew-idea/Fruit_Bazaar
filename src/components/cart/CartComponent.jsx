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
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const CartComponent = () => {
    const location = useLocation();
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
            {/* <Header /> */}
            <div className='list_of_cart_mob px-[1rem] py-[1rem] min-[950px]:hidden'>
                {cartItems.map((item, index) => (
                    <div key={index} className='hederingoftable mt-2 p-[12px] flex flex-row'>
                        <img src={item?.product?.photos} alt={item?.product?.title} className='product-image w-[135px] border border-solid border-[#ececec]' />
                        <div className='flex flex-col w-full justify-between p-[10px]'>
                            <div className='flex flex-row justify-between pl-4'>
                                <div className='items-center font-[500] text-[18px] text-[#3d3839]'>
                                    {item?.product?.title}
                                </div>
                                <div><button onClick={() => handleDelete(index)}><CloseRoundedIcon /></button></div>
                            </div>

                            <div className='flex flex-row justify-between pl-4'>
                                <div className='flex flex-row bg-[#dcdcdc] rounded-[5px]'>
                                    <button className='qty_plus_mob' onClick={() => handlePlus(index)}>
                                        <span><AddRoundedIcon /></span>
                                    </button>
                                    <input
                                        className='qtyvalue_mob'
                                        type='text'
                                        onChange={(e) => handleqtyValue(e, index)}
                                        value={item.product_quantity_real ?? ''}
                                    />
                                    <button className='qty_minus_mob' onClick={() => handleMinus(index)}>
                                        <span><RemoveRoundedIcon /></span>
                                    </button>
                                </div>
                                <div className='font-[500] text-[18px] text-[#3d3839]'>Rs {calculateTotal(item)}</div>
                            </div>


                        </div>


                    </div>
                ))}
            </div>
            <div className='px-[10rem] py-[2rem] max-[950px]:px-[1rem] max-[950px]:py-[1rem]'>
                {cartItems && cartItems.length > 0 ? (
                    <>
                        <table className='max-[950px]:hidden'>
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
                                            <img src={item?.product?.photos} alt={item?.product?.title} className='product-image w-[135px] border border-solid border-[#ececec]' />
                                            {item?.product?.title}
                                        </td>
                                        <td>{item?.product?.price}</td>
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
                        <div className="total-section hederingoftable mt-5 p-[41px]">
                            <div>
                                <h2 className="font-[600] productTotal">PRODUCT TOTALS</h2>
                                <div className=' pt-[20px]  pb-[40px] flex flex-row justify-between'>
                                    <p className="font-[500] text-[18px] text-[#3d3839]">Total: </p>
                                    <p className="font-[500] text-[18px] text-[#3d3839]">Rs. {calculateCartTotal()}</p>

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

                        </div>
                    </>
                ) : (
                    <>
                        <div className='text-center'>Your cart is currently empty.</div>
                        <div className='text-center'>Continue browsing here.</div></>
                )}

            </div>
        </div>
    );
};

export default CartComponent;
