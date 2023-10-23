import React, { useEffect, useState } from 'react';
import Header from '../layout/Header'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';

const fadeImages = [
    {
        url: 'https://ofruity-store-demo.myshopify.com/cdn/shop/files/slideshow-v2.jpg?v=1614306185',
        caption: `Nature's Bounty`,
        decrip: "Fresh Fruits Delivered To Your Doorstep"
    },
    {
        url: 'https://ofruity-store-demo.myshopify.com/cdn/shop/files/slideshow-v1.jpg?v=1614306185',
        caption: `From Orchard To You`,
        decrip: " Taste The Difference !"
    },
    {
        url: 'https://ofruity-store-demo.myshopify.com/cdn/shop/articles/Blog5_1024x1024.jpg?v=1589525645',
        caption: `Elevate Your Plate`,
        decrip: "Vibrant, Wholesome, and Delicious"
    }
];





const Home = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const handleShowNow = () => {
        navigate(`/product`);
    }
    React.useEffect(() => {

        axios.get('https://sgamare32.pythonanywhere.com/api/v1/products/product-list?products=6')
            .then(response => {
                const productList = response.data.results.product_list;
                setProducts(productList);

            })
            .catch(error => {
                console.error('Error:', error);

            });


    }, []);
    const handleViewProductPage = (pname, pid) => {
        if (pid != null) {
            navigate(`/productdetails?name=${pname}&variant=${pid + 1}`);
        } else {
            alert("Product id not get")
        }
    }

    return (
        <>
            <div className='flex flex-col'>
                <Header />
                <div className="slide-container">
                    <Fade
                        duration={5000}
                        indicators={{}}
                        arrows={false}
                        autoplay={true}
                    >
                        {fadeImages.map((fadeImage, index) => (
                            <div className='relative h-[800px]' key={index}>
                                <img style={{ width: '100%' }} src={fadeImage.url} draggable={false} />
                                <div className='absolute top-0 left-[3rem] flex flex-col justify-center w-[50%] h-full'>
                                    <div className='font-[400] text-[#3d3839] text-[98px]'>
                                        {fadeImage.caption}
                                    </div>
                                    <div className='text[24px] ml-[10px]'>
                                        {fadeImage.decrip}
                                    </div>
                                    <div onClick={handleShowNow} className={`cursor-pointer ml-[10px]  mt-[20px] py-[6px] px-5 flex border-[#3d3839] border-[1px] text-[#3d3839]  border-solid hover:bg-[#3d3839] hover:text-[#fff] w-max`}>

                                        <span className=' uppercase ml-[7px] font-[500] text-[17px] tracking-[1px]'>Shop Now</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Fade>
                </div>
                <div className='our_best_seller w-full'>
                    <h1 className='title_heading'>Our Best Seller</h1>

                    <div className={`flex flex-wrap py-[2rem] px-[2rem]`}>
                        {
                            products.map((product, index) => (
                                <div className='md:w-1/3 lg:w-1/5 w-1/1 p-[10px] flex flex-col mb-[30px] cursor-pointer productCard' key={index}>
                                    <div className='w-full border border-solid border-[#ececec] relative insideCard'>
                                        <span className='absolute m-2 text-[12px] text-[#fff] bg-[#ff4949] py-[3px] px-[10px] left-0' >- {(((product.mrp - product.sale_price) / product.mrp) * 100).toFixed(0)} %</span>
                                        <img className='object-contain' onClick={() => handleViewProductPage(product.product_name, index)} src={product.product_image} alt={product.product_name} draggable={false} />
                                        <div className='absolute fadeInUp bottom-[13px] flex flex-row justify-center items-center w-full gap-3 actionbtnCard'>
                                            <Tooltip title="View product" arrow placement="top">
                                                <span onClick={() => handleViewProductPage(product.product_name, index)} className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                                    <RemoveRedEyeRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Add to cart" arrow placement="top">
                                                <span className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                                    <AddShoppingCartRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Add to wishlist" arrow placement="top">
                                                <span className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                                    <FavoriteBorderRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <h4 onClick={() => handleViewProductPage(product.product_name, index)} className="des-font hover:text-[#0bc217]">
                                        {product.product_name}
                                    </h4>
                                    <p onClick={() => handleViewProductPage(product.product_name, index)} className='price'><CurrencyRupeeRoundedIcon className="custom-icon" />{product.mrp}</p>
                                </div>
                            ))
                        }
                    </div>

                </div>


            </div>
        </>
    )
}

export default Home