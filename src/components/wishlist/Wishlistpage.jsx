import React from 'react'
import Header from '../layout/Header'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import Tooltip from '@mui/material/Tooltip';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import axios from 'axios';
import toast from 'react-hot-toast';
const wishlistpage = () => {
    const handleViewProductPage = () => {
        alert("Product id not get")
    }
    const handleDeleteWishlistPage = () => {
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userID');
        axios.post('https://fruitsbazarapis.onrender.com/api/removeWishList', {
            user_id: userid,
            product_id: "65d3551605a6995653d32171"
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
        <div className='flex flex-col'>
            {/* <Header /> */}
            <div className={`flex flex-wrap py-[2rem] px-[2rem]`}>
                <div className='md:w-1/3 lg:w-1/5 w-1/1 p-[10px] flex flex-col mb-[30px] cursor-pointer productCard'>
                    <div className='w-full border border-solid border-[#ececec] relative insideCard'>
                        <img className='object-contain' src={"http://res.cloudinary.com/drcennglp/image/upload/v1708348562/q0ovqtkrynzwxvxyc7gm.jpg"} />
                        <div className='absolute fadeInUp bottom-[13px] flex flex-row justify-center items-center w-full gap-3 actionbtnCard'>
                            <Tooltip title="View product" arrow placement="top">
                                <span onClick={() => handleViewProductPage()} className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                    <RemoveRedEyeRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                </span>
                            </Tooltip>
                            <Tooltip title="Delete" arrow placement="top">
                                <span onClick={() => handleDeleteWishlistPage()} className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                    <DeleteRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <h4 onClick={() => handleViewProductPage()} className="des-font hover:text-[#0bc217]">
                        {"Apple"}
                    </h4>
                    <p onClick={() => handleViewProductPage()} className='price'><CurrencyRupeeRoundedIcon className="custom-icon" />{149}</p>
                </div>
            </div>
        </div>
    )
}

export default wishlistpage