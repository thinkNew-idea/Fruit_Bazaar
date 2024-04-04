import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import logo from '../media/assets/icon/logo-no-background.png';
import Modal from '@mui/material/Modal';
import LoginPage from './LoginPage';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [openModel, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const [isOpen, setIsOpen] = React.useState(false)
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    let timeout;
    useEffect(() => {
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    const debounce = useCallback((fun, time) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fun()
        }, time);
    }, [])
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleClickTo_OpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSerachChange = (event) => {
        setSearch(event.target.value);
        if (search?.length >= 4) {
            debounce(async () => {
                console.log("searching");
                try {
                    setIsLoading(true);
                    const response = await axios.get(`https://fruitsbazarapis.onrender.com/api/getProducts=${search}`);
                    setSearchResults(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                }
            }, 400)
        } else {
            setSearchResults([]);
        }
    };

    const handleClickHome = () => {
        navigate('/');
    };
    const handleClickProduct = () => {
        navigate('/product');
    };

    const handleOpenRegisterPage = () => {
        navigate('/register-page');
    };
    const statusClick = () => {
        setOpen(false);
    }
    const handleCartpage = () => {
        navigate('/cart');
    }
    const handleWishlistPage = () => {
        navigate('/wishlist');
    }

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const handleViewProductPage = (pname, pid) => {
        if (pid != null) {
            navigate(`/productdetails`, { state: { pname: pname, pid: pid } });
        } else {
            alert("Product id not get")
        }
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
                    <SearchRoundedIcon onClick={toggleDrawer} className='!text-[30px]  mx-[6px] cursor-pointer' />
                    <FavoriteBorderOutlinedIcon className='!text-[30px]  mx-[6px] cursor-pointer' onClick={() => { handleWishlistPage() }} />
                    <div className='relative'><LocalMallOutlinedIcon className='!text-[30px]  mx-[6px] cursor-pointer' onClick={() => { handleCartpage() }} />
                        {cartItems.length > 0 ? <div className='w-[14px] h-[14px] bg-[#0bc217] text-[#fff] absolute right-0 rounded-full bottom-0 flex items-center justify-center text-[10px] front-[500]'>{cartItems.length}</div> : ``}
                    </div>
                    <PermIdentityOutlinedIcon className='!text-[30px]  mx-[6px] cursor-pointer' onClick={handleClickTo_OpenMenu} />
                </div>
            </div>
            {/* login menu start */}
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 3,
                        ml: -4,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 8,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                MenuListProps={{
                    "aria-labelledby": "account-menu"
                }}
            >
                <MenuItem onClick={handleOpen}>Login</MenuItem>
                <MenuItem onClick={handleOpenRegisterPage}>Register</MenuItem>
                <MenuItem >Logout</MenuItem>
            </Menu>
            {/* login menu end */}
            {/* login model */}
            <Modal
                open={openModel}
                onClose={handleClose}
            >
                <div className='noFocusOutline' style={style}>
                    <LoginPage statusClick={statusClick} handleClose={handleClose} />
                    <div className='closebtn cursor-pointer' onClick={handleClose}><CloseRoundedIcon /></div>
                </div>
            </Modal>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                zIndex={9999}
                size={"30%"}
                className='p-[15px] rounded-0'
            >
                <div className='closebtn cursor-pointer' onClick={toggleDrawer}><CloseRoundedIcon /></div>
                <TextField
                    fullWidth
                    size="normal"
                    margin="dense"
                    id="outlined-search"
                    label="Search anything"
                    type="search"
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    style={{ borderRadius: 0 }}
                    value={search}
                    onChange={handleSerachChange}
                />
                {isLoading ? <div><LinearProgress color="success" /></div> : (
                    <div className='grid grid-cols-1'>
                        {searchResults.data?.map((result, index) => (
                            <div className='product_info cursor-pointer' onClick={() => handleViewProductPage(result.title, result._id)}>
                                <div>
                                    <img className="w-100 img-responsive" src={result.photos} />
                                </div>
                                <div className='flex flex-col'>
                                    <span className="hover:text-[#0bc217]">{result.title}</span>
                                    <span>Rs. {result.price}</span>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
                {search?.length < 4 && <div>You must enter at least 4 characters.</div>}
            </Drawer>

        </>
    )
}

export default Header