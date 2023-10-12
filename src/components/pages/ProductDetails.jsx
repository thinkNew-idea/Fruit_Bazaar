import React, { useEffect, useState } from 'react';
import Header from '../layout/Header'
import axios from 'axios';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Button from '@mui/material/Button';
const ProductDetails = () => {
    const [pid, setPid] = useState(null);
    const [product_details, setProduct_Details] = useState([]);
    const [currentQtyValue, setCurrentQtyValue] = useState(1);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pidFromUrl = params.get('variant');

        if (pidFromUrl) {
            setPid(pidFromUrl);
        }
        if (pid != null) {
            axios.get(`https://sgamare32.pythonanywhere.com//api/v1/products/product-detail?id=${pid}`)
                .then(response => {
                    const product_details = response.data.product_details
                    setProduct_Details(product_details)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }, [pid]);
    const handleqtyValue = (event) => {
        if (event.target.value === 0) {
            alert("not type 0 or less then 0");
        }
        else {
            setCurrentQtyValue(event.target.value);
        }

    };
    const handlePlus = () => {
        const qtyplus = currentQtyValue + 1
        setCurrentQtyValue(qtyplus)

    }
    const handleMinus = () => {

        const qtyminus = currentQtyValue - 1
        if (qtyminus <= 0) {
            setCurrentQtyValue(qtyminus + 1)
        } else {
            setCurrentQtyValue(qtyminus)
        }


    }
    console.log("currentQtyValue", currentQtyValue);
    return (
        <div className='flex flex-col'>
            <Header />
            <div className='flex flex-row w-full py-[2rem] px-[2rem]'>
                <div className='w-[30%]'>

                    <div className='border border-solid border-[#ececec] '><img className='w-full' src={product_details.product_image} /></div>
                </div>
                <div className='w-[70%] pl-4'>
                    <div className='w-[50%]'>
                        <div className='flex flex-row justify-between items-center pb-2'>
                            <h3 class="text-[24px] font-[500] text-[#3d3839]">{product_details.product_name} </h3>
                            <span className='bg-[#fff] border border-solid border-[#e9e9e9]  rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                <FavoriteBorderRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                            </span>
                        </div>
                        <div className='border-b border-[#e7e7e7] pb-[24px]'>
                            <p className='pricePdtail !text-start !text-[20px] font-[500]'><CurrencyRupeeRoundedIcon className="mb-3px] !text-[20px]" />{product_details.mrp}</p>

                        </div>
                        <div className='text-[15px] text-[#a8a8a8] font-[400] leading-[28px]  pt-[22px]'>
                            <p>{product_details.product_desc}</p>
                        </div>
                        <div className='flex flex-row text-[17px] text-[#3d3839] items-center gap-4 my-5'>
                            <span className='font-[500] border-b-2'>SIZE</span>
                            <ul className='flex gap-2 font-[500]'>
                                <li className='border border-[2px] p-3 hover:bg-[#3d3839] hover:text-[#fff]' value={1}>1KG</li>
                                <li className='border border-[2px] p-3 hover:bg-[#3d3839] hover:text-[#fff]' value={2}>2KG</li>
                                <li className='border border-[2px] p-3 hover:bg-[#3d3839] hover:text-[#fff]' value={3}>3KG</li>
                                <li className='border border-[2px] p-3 hover:bg-[#3d3839] hover:text-[#fff]' value={4}>4KG</li>
                            </ul>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex gap-4 w-full'>
                                <div className='flex border border-[2px] border-[#3d3839] w-[90px] relative'>
                                    <input className='qtyvalue' type='text' onChange={handleqtyValue} value={currentQtyValue} />
                                    <div className='flex flex-col'>
                                        <button className='qty_plus' onClick={handlePlus}><span><AddRoundedIcon /></span></button>
                                        <button className='qty_minus' onClick={handleMinus}><span><RemoveRoundedIcon /></span></button>
                                    </div>

                                </div>
                                <div className='w-[calc(100%-90px)]'>
                                    <Button
                                        style={{
                                            width: '100%',
                                            padding: '13px 4rem',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            backgroundColor: '#0bc217',
                                            borderRadius: 0,

                                        }}
                                        size="normal"
                                        variant="contained"

                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                            <div className='my-4'>
                                <Button
                                    style={{
                                        width: '100%',
                                        padding: '13px 4rem',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        backgroundColor: '#3d3839',
                                        borderRadius: 0,

                                    }}
                                    size="normal"
                                    variant="contained"

                                >
                                    Buy it now
                                </Button>
                            </div>
                        </div>

                    </div>
                    <div className='w-[50%]'></div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails