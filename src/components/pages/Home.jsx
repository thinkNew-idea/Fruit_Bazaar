import React from 'react'
import Header from '../layout/Header'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from "react-router-dom";

const fadeImages = [
    {
        url: 'https://ofruity-store-demo.myshopify.com/cdn/shop/files/slideshow-v2.jpg?v=1614306185',
        caption: `Nature's Bounty`,
        decrip: "Fresh Fruits Delivered to Your Doorstep"
    },
    {
        url: 'https://ofruity-store-demo.myshopify.com/cdn/shop/files/slideshow-v1.jpg?v=1614306185',
        caption: `From Orchard to You`,
        decrip: " Taste the Difference !"
    },
    {
        url: 'https://ofruity-store-demo.myshopify.com/cdn/shop/articles/Blog5_1024x1024.jpg?v=1589525645',
        caption: `Elevate Your Plate`,
        decrip: "Vibrant, Wholesome, and Delicious"
    }
];



const Home = () => {
    const navigate = useNavigate();
    const handleShowNow = () => {
        navigate(`/product`);
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
                                <img style={{ width: '100%' }} src={fadeImage.url} />
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


            </div>
        </>
    )
}

export default Home