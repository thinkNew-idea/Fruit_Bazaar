import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import logo from '../media/assets/icon/logo-no-background.png';
import { validEmail } from "./Regex.js";
import toast, { Toaster } from "react-hot-toast";
import { ApiCall, Loginapicall } from "../../Utils/api";
const LoginPage = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userId, setUserId] = useState('');
    const [otpdata, setOtpdata] = useState();
    const [error, setError] = useState(null);
    const [verifyemailMess, setVerifyemailMess] = useState();
    const [MailAlertMge, setMailAlertMge] = React.useState("");
    const [PassAlertMge, setPassAlertMge] = React.useState("");
    const [loginSuccess, setloginSuccess] = useState();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleOTPChange = (newValue) => {
        setOtpdata(newValue);
    };

    const handleLogin = async () => {
        if (!password.trim()) {
            setPassAlertMge('Please enter your password');
        } else {
            try {
                const response = await Loginapicall("post", 'login', { email: email, password: password });
                if (response.status === 200) {
                    if (response.data.ok === true) {
                        toast.success(response.data.message);
                        localStorage.setItem('token', response.data.meta?.token);
                        setToken(token);
                        setUserId(response.data.data._id);
                        localStorage.setItem('userID', userId);
                    } else if (response.data.ok === false) {
                        toast.error(response.data.message);
                    }
                } else {
                    console.error("Unexpected response status:", response.status);
                }
            } catch (error) {
                toast.error("An error occurred during login.");

            }
        }
    };
    const handleVerifyEmail = async () => {
        if (email === "") {
            setMailAlertMge("Please enter your email");

        } else if (!validEmail.test(email)) {

            setMailAlertMge("Your email is invalid");
        } else {
            const response = await ApiCall("post", 'VerfiyEmail', { email: email })
            if (response.status == 200) {
                if (response.data.message == 'User already exits with given Email!') {
                    toast.success('Hello, Welcome');
                } else if (response.data.message == 'New User') {
                    toast.error('You have not registered, please register first');
                    navigate('/register-page');
                    props.handleClose();
                }
                setVerifyemailMess(response.data.message);
            } else {
                setError('An error occurred');
            }
        }
    }

    if (loginSuccess == "Success") {
        props.statusClick(false)
    }

    return (
        <>
            <div className='flex justify-center border-solid border-b pb-5' >
                <div className='w-[13rem]'>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className='text-center font-[500] text-[#4a4844] text-[17px] pt-3 pb-3'>It's wonderful to have you back!</div>
            {verifyemailMess == 'User already exits with given Email!' ? (
                <>
                    {/* <MuiOtpInput
                        length={6}
                        value={otpdata}
                        onChange={handleOTPChange}
                        className='py-3'
                        display="flex"
                        gap={2}
                    />
                    */}
                    <TextField
                        fullWidth
                        id="outlined-multiline-flexible"
                        label="Email adress"
                        size="normal"
                        margin="dense"
                        type='email'
                        variant="outlined"
                        InputLabelProps={{ required: true }}
                        style={{ borderRadius: 0 }}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        fullWidth
                        id="outlined-multiline-flexible"
                        label="Password"
                        size="normal"
                        margin="dense"
                        type='password'
                        variant="outlined"
                        InputLabelProps={{ required: true }}
                        style={{ borderRadius: 0 }}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {PassAlertMge && <div className='text-center     text-[13px]' style={{ color: 'red' }}>{PassAlertMge}</div>}

                    <Button
                        style={{
                            width: '100%',
                            padding: '13px 16px',
                            fontSize: '16px',
                            fontWeight: 600,
                            backgroundColor: '#000',
                            borderRadius: 0,
                            marginTop: 10
                        }}
                        size="normal"
                        variant="contained"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </>
            ) : (
                <>
                    <TextField
                        fullWidth
                        id="outlined-multiline-flexible"
                        label="Email adress"
                        size="normal"
                        margin="dense"
                        required
                        variant="outlined"
                        InputLabelProps={{ required: true }}
                        style={{ borderRadius: 0 }}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {MailAlertMge && <div className='text-center     text-[13px]' style={{ color: 'red' }}>{MailAlertMge}</div>}

                    <Button
                        style={{
                            width: '100%',
                            padding: '13px 16px',
                            fontSize: '16px',
                            fontWeight: 600,
                            backgroundColor: '#000',
                            borderRadius: 0,
                            marginTop: 10
                        }}
                        size="normal"
                        variant="contained"
                        onClick={handleVerifyEmail}
                    >
                        Login / Signup
                    </Button>

                    {error && <div className='text-center text-[15px] p-2' style={{ color: 'red' }}>{error}</div>}
                </>
            )}

        </>

    )
}

export default LoginPage