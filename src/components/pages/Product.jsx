import React, { useEffect, useState } from 'react';
import Header from '../layout/Header'
import axios from 'axios';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
const Product = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterDiv, setFilterDiv] = useState(false);
    const handleFilter = () => {
        setFilterDiv(true);

    }

    const handleAddToCart = (product, product_quantity_real) => {
        const product_detail = { product, product_quantity_real }
        dispatch(addToCart(product_detail));
        console.log('Item added to cart:', product_detail); // Add this line
    };
    console.log("filterDiv", filterDiv);
    var widthdiv = "w-[100%]"
    var filterdivopen = "";
    useEffect(() => {
        axios.get('https://sgamare32.pythonanywhere.com/api/v1/products/product-list?products=800')
            .then(response => {
                const productList = response.data.results.product_list;
                setProducts(productList);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });


    }, []);
    const navigate = useNavigate();
    const handleViewProductPage = (pname, pid) => {
        if (pid != null) {
            navigate(`/productdetails?name=${pname}&variant=${pid + 1}`);
        } else {
            alert("Product id not get")
        }
    }


    if (filterDiv === true) {
        widthdiv = "w-[80%]";
        filterdivopen = "w-[20%]";

    } else {
        widthdiv = "w-[100%]";
    }
    return (
        <>
            <div className='flex flex-col'>
                <Header />

                <div className='flex flex-row pt-[2rem] px-[2rem]'>
                    <div onClick={handleFilter} className={`cursor-pointer ml-[10px] py-[6px] px-5 flex border-[#3d3839] border-[1px] text-[#3d3839]  border-solid hover:bg-[#3d3839] hover:text-[#fff] ${filterDiv === true ? "bg-[#3d3839] text-[#fff]" : "bg-[#fff]"}`}>
                        <span><FilterListRoundedIcon className='!text-[22px]' /></span>
                        <span className=' uppercase ml-[7px] font-[500] text-[17px] tracking-[1px]'>Filter</span>
                    </div>
                </div>
                <div className={`w-full flex justify-end`}>

                    {filterDiv === true ? (
                        <div className={`bg-gary-500 pl-[2rem] py-[2rem] ${filterdivopen}`}>
                            <div className='p-[10px] text-[17px] text-[#3d3839] font-[500]'>Size Options</div>
                            <ul className='flex gap-2 font-[500] pl-[10px]'>
                                {['1KG', '2KG', '3KG'].map((e) => <li className='border border-[2px] text-[14px] p-[10px] hover:bg-[#3d3839] hover:text-[#fff]' value={1}>{e}</li>)}
                            </ul>
                        </div>
                    ) : null
                    }


                    <div className={`flex flex-wrap py-[2rem] px-[2rem] ${widthdiv}`}>

                        {loading ? (
                            // Render the Material-UI Skeleton while loading
                            Array.from({ length: 10 }).map((_, index) => (
                                <div className='md:w-1/3 lg:w-1/5 w-1/1 p-[10px] flex flex-col mb-[30px] cursor-pointer' key={index}>
                                    <Skeleton variant="rectangular" width="100%" height={250} />
                                    <Skeleton width="100%" style={{ marginTop: '10px' }} />
                                    <Skeleton width="100%" style={{ marginTop: '10px' }} />
                                </div>
                            ))
                        ) : (
                            products.map((product, index) => (
                                <div className='md:w-1/3 lg:w-1/5 w-1/1 p-[10px] flex flex-col mb-[30px] cursor-pointer productCard' key={index}>
                                    <div className='w-full border border-solid border-[#ececec] relative insideCard'>
                                        <span className='absolute m-2 text-[12px] text-[#fff] bg-[#ff4949] py-[3px] px-[10px] left-0' >- {(((product.mrp - product.sale_price) / product.mrp) * 100).toFixed(0)} %</span>
                                        <img className='object-contain' onClick={() => handleViewProductPage(product.product_name, index)} src={product.product_image} alt={product.product_name} />
                                        <div className='absolute fadeInUp bottom-[13px] flex flex-row justify-center items-center w-full gap-3 actionbtnCard'>
                                            <Tooltip title="View product" arrow placement="top">
                                                <span onClick={() => handleViewProductPage(product.product_name, index)} className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                                    <RemoveRedEyeRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Add to cart" arrow placement="top">
                                                <span onClick={() => handleAddToCart(product, 1)} className='bg-[#fff] box-color rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
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
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product