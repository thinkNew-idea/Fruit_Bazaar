import React from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import toast from 'react-hot-toast';

const addProductWishlist = (props) => {

    const handleAddWishlistPage = (_id) => {
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userID');
        axios.post('https://fruitsbazarapis.onrender.com/api/addWishList', {
            user_id: userid,
            product_id: _id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Wishlist item added successfully:', response.data);
                toast.success(response.data.message);
            })
            .catch(error => {
                console.error('Error adding wishlist item:', error);
                toast.error(error);
            });
    }
    return (

        <Tooltip title="Add to wishlist" arrow placement="top">
            <span className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center' onClick={() => handleAddWishlistPage(props.productID)}>
                <FavoriteBorderRoundedIcon className='hover:text-[#fff] !text-[20px]' />
            </span>
        </Tooltip>
    )
}

export default addProductWishlist