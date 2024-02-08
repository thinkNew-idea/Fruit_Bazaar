import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const [pid, setPid] = useState(null);
    const [product_details, setProduct_Details] = useState(null);
    const [currentQtyValue, setCurrentQtyValue] = useState(1);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartItems);
    const isProductInCart = Array.isArray(cart) && cart.find((item) => item.product._id === (product_details && product_details._id)); // Check if product_details is not null
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pidFromUrl = params.get('variant');

        if (pidFromUrl) {
            setPid(pidFromUrl);
        }
        if (pid != null) {
            axios.get(`https://fruitsbazarapis.onrender.com/api/getProducts/${pid}`)
                .then(response => {
                    const product_details = response.data.data;
                    setProduct_Details(product_details);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [pid]);

    const handleqtyValue = (event) => {
        if (event.target.value === 0) {
            alert("not type 0 or less then 0");
        } else if (event?.target?.value?.length <= 1) {
            setCurrentQtyValue(1);
        } else {
            setCurrentQtyValue(parseInt(event.target.value));
        }
    };

    const handlePlus = () => {
        const qtyplus = currentQtyValue + 1;
        setCurrentQtyValue(qtyplus);
    };

    const handleMinus = () => {
        const qtyminus = currentQtyValue - 1;
        if (qtyminus <= 0) {
            setCurrentQtyValue(qtyminus + 1);
        } else {
            setCurrentQtyValue(qtyminus);
        }
    };

    const handleAddToCart = (product_add, product_quantity_real) => {
        const product = {
            _id: product_add._id,
            title: product_add.title,
            description: product_add.description,
            productCount: product_add.productCount,
            photos: product_add.photos,
            price: product_add.price,
            inStock: product_add.inStock,
            createdAt: product_add.createdAt,
            __v: product_add.__v
        };
        const product_detail = { product, product_quantity_real };
        if (!isProductInCart) { // If product is not already in cart
            dispatch(addToCart(product_detail));
        }
    };

    return (
        <div className='flex flex-col'>
            <Header />
            <div className='flex flex-row w-full gap-5 py-[2rem] px-[2rem]'>
                <div className='w-[35%]'>
                    {product_details ? (
                        <div className='border border-solid border-[#ececec] min-h-[100%] flex justify-between'>
                            <img className='w-full' src={product_details.photos} style={{ objectFit: "contain" }} />                        </div>
                    ) : (
                        <Skeleton variant="rectangular" className='w-full' height={600} />

                    )}
                </div>
                <div className='w-[65%] gap-5 flex flex-row'>
                    <div className='w-[60%] flex flex-col justify-between'>
                        {product_details ? (
                            <div>
                                <div className='flex flex-row justify-between items-center pb-2'>
                                    <h3 className="text-[24px] font-[500] text-[#3d3839]">{product_details.title} </h3>
                                    <span className='bg-[#fff] border border-solid border-[#e9e9e9]  rounded-full hover:bg-[#0bc217] p-[0.60rem] flex justify-center'>
                                        <FavoriteBorderRoundedIcon className='hover:text-[#fff] !text-[20px]' />
                                    </span>
                                </div>
                                <div className='border-b border-[#e7e7e7] pb-[24px]'>
                                    <p className='pricePdtail !text-start !text-[20px] font-[500]'><CurrencyRupeeRoundedIcon className="mb-3px] !text-[20px]" />{product_details.price}</p>
                                </div>
                                <div className='text-[15px] text-[#a8a8a8] font-[400] leading-[28px]  pt-[22px]'>
                                    <p>{product_details.description}</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Skeleton variant="text" width={300} height={30} />
                                <Skeleton variant="text" width={500} height={30} />
                                <Skeleton variant="text" width={400} height={100} />
                            </div>
                        )}
                        <div>
                            {product_details && ( // Check if product_details is not null
                                <div className='flex flex-col'>
                                    <div className='flex flex-row text-[16px] text-[#3d3839] items-center gap-4 my-5'>
                                        <span className='font-[500] border-b-2'>SIZE</span>
                                        <ul className='flex gap-2 font-[500]'>
                                            {['1KG', '2KG', '3KG'].map((e, i) => <li className='border border-[2px] text-[14px] p-[10px] hover:bg-[#3d3839] hover:text-[#fff]' value={e} key={i}>{e}</li>)}
                                        </ul>
                                    </div>
                                    <div className='flex gap-4 w-full'>
                                        <div className='flex border border-[2px] border-[#3d3839] w-[90px] relative'>
                                            <input className='qtyvalue' type='text' onChange={handleqtyValue} value={currentQtyValue.toString()} />
                                            <div className='flex flex-col'>
                                                <button className='qty_plus' onClick={handlePlus}><span><AddRoundedIcon /></span></button>
                                                <button className='qty_minus' onClick={handleMinus}><span><RemoveRoundedIcon /></span></button>
                                            </div>
                                        </div>
                                        <div className='w-[calc(100%-90px)]'>
                                            {isProductInCart ? (
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
                                                    onClick={() => navigate('/cart')}
                                                >
                                                    Go to Cart
                                                </Button>
                                            ) : (
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
                                                    onClick={() => handleAddToCart(product_details, currentQtyValue)}
                                                >
                                                    Add to Cart
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-4'>
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
                            )}
                        </div>
                    </div>
                    <div className='w-[40%]'>
                        <div className='flex flex-col gap-5'>
                            <div className='content_box'>
                                <div className='content_text'>
                                    <h3 className="title">Why Choose Us ?</h3>
                                    <div className="text">Choose us for farm-fresh, diverse fruits delivered to your doorstep. Quality and convenience are our top priorities</div>
                                </div>
                            </div>
                            <div className='content_box'>
                                <div className='content_text'>
                                    <h3 className="title">Returns</h3>
                                    <div className="text">We stand by the quality of our products. If you're not completely satisfied with your purchase, let us know within 2-3 hours for a hassle-free return or exchange. Your satisfaction is our priority.</div>
                                </div>
                            </div>
                            <div className='content_box'>
                                <div className='content_text'>
                                    <h3 className="title">Shipping </h3>
                                    <div className="text">Free Shipping: Available on select items as indicated.
                                        Standard Shipping - ₹50: Flat-rate fee for most orders within India (up to 10 items).
                                        Express Shipping - ₹150: Opt for speedy delivery in 1-2 business days.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
