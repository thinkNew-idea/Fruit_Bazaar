import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import logo from '../media/assets/icon/logo-no-background.png';
import Modal from '@mui/material/Modal';
import LoginPage from './LoginPage';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    background: '#fff',
    padding: 50
};
const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log("cartItems", cartItems);
    const handleClickHome = () => {
        navigate('/');
    };
    const handleClickProduct = () => {
        navigate('/product');
    };

    const statusClick = () => {
        setOpen(false);
    }
    const handleCartpage = () => {
        navigate('/cart');
    }
    return (
        <>

            <div className='flex flex-row justify-between bg-[#fff] text-[#4a4844] border-solid border-b' id='header'>
                <div className='font-[500]  w-[13rem] cursor-pointer' onClick={handleClickHome}>

                    <img src={logo} alt="logo" />

                </div>
                <div className='font-[600] uppercase text-[1rem] flex flex-row items-center'>
                    <span className='p-1 mx-[18px] cursor-pointer hover:text-[#0bc217]' onClick={handleClickHome}>
                        Home
                    </span>
                    <span className='p-1 mx-[18px] cursor-pointer hover:text-[#0bc217]' onClick={handleClickProduct}>
                        Product
                    </span>
                    <span className='p-1 mx-[18px] cursor-pointer hover:text-[#0bc217]'>
                        Blogs
                    </span>

                </div>
                <div className='flex flex-row items-center gap-[5px] text-[#4a4844]'>
                    <SearchRoundedIcon className='!text-[30px]  mx-[6px] cursor-pointer' />
                    <FavoriteBorderOutlinedIcon className='!text-[30px]  mx-[6px] cursor-pointer' />
                    <div className='relative'><LocalMallOutlinedIcon className='!text-[30px]  mx-[6px] cursor-pointer' onClick={handleCartpage} />
                        {cartItems.length > 0 ? <div className='w-[14px] h-[14px] bg-[#0bc217] text-[#fff] absolute right-0 rounded-full bottom-0 flex items-center justify-center text-[10px] front-[500]'>{cartItems.length}</div> : ``}
                    </div>

                    <PermIdentityOutlinedIcon className='!text-[30px]  mx-[6px] cursor-pointer' onClick={handleOpen} />

                </div>

            </div>


            {/* login model */}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='noFocusOutline' style={style}>
                    <LoginPage statusClick={statusClick} />
                    <div className='closebtn cursor-pointer' onClick={handleClose}><CloseRoundedIcon /></div>
                </div>
            </Modal>

        </>
    )
}

export default Header