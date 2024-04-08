import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import Tooltip from '@mui/material/Tooltip';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import axios from 'axios';
import toast from 'react-hot-toast';

const Wishlistpage = () => {
    const navigate = useNavigate();
    const [wishlistData, setWishlistData] = useState([]);
    console.log("wishlistData", wishlistData);
    useEffect(() => {
        fetchWishlistData();
    }, []);

    const fetchWishlistData = () => {
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userID');

        let data = JSON.stringify({
            "user_id": userid
        });

        let config = {
            method: 'post',
            url: 'https://fruitsbazarapis.onrender.com/api/getCart',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setWishlistData(response.data.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleViewProductPage = (pname, pid) => {
        console.log(pname, pid);
        if (pid) {
            navigate(`/productdetails`, { state: { pname: pname, pid: pid } });
        } else {
            alert("Product id not obtained");
        }
    };

    const handleDeleteWishlistPage = (productId) => {
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userID');
        axios.post('https://fruitsbazarapis.onrender.com/api/removeWishList', {
            user_id: userid,
            product_id: productId,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                toast.success(response.data.message);
                fetchWishlistData();
            })
            .catch(error => {
                console.error('Error removing wishlist item:', error);
                toast.error(error);
            });
    };

    return (
        <div className='flex flex-col'>
            <div className={`flex flex-wrap py-[2rem] px-[2rem]`}>
                {wishlistData.map((data, index) => (
                    <div key={index} className='md:w-1/3 lg:w-1/5 w-1/1 p-[10px] flex flex-col mb-[30px] cursor-pointer productCard'>
                        <div className='w-full border border-solid border-[#ececec] relative insideCard'>
                            <img className='object-contain' src={data.photo} />
                            <div className='absolute fadeInUp bottom-[13px] flex flex-row justify-center items-center w-full gap-3 actionbtnCard'>
                                <Tooltip title="View product" arrow placement="top">
                                    <span onClick={() => handleViewProductPage(data.title, data.product_id)} className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                        <RemoveRedEyeRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                    </span>
                                </Tooltip>
                                <Tooltip title="Delete" arrow placement="top">
                                    <span onClick={() => handleDeleteWishlistPage(data.product_id)} className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                        <DeleteRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                        <h4 onClick={() => handleViewProductPage()} className="des-font hover:text-[#0bc217]">
                            {data.title}
                        </h4>
                        <p onClick={() => handleViewProductPage()} className='price'><CurrencyRupeeRoundedIcon className="custom-icon" />{data.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlistpage;
