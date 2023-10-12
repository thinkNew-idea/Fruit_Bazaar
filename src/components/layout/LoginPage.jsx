import React, { useState } from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../media/assets/icon/logo-no-background.png';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { validEmail } from "./Regex.js";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
const LoginPage = (props) => {
    const [email, setEmail] = useState();
    const [otpdata, setOtpdata] = useState();
    const [error, setError] = useState(null);
    const [statusOtp, setStatusOtp] = useState();
    const [MailAlertMge, setMailAlertMge] = React.useState("");
    const [loginSuccess, setloginSuccess] = useState();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleOTPChange = (newValue) => {
        setOtpdata(newValue);
    };
    const sendOTP = () => {
        if (email === "") {
            setMailAlertMge("Please enter your email");

        } else if (!validEmail.test(email)) {

            setMailAlertMge("Your email is invalid");
        } else {
            const apiUrl = 'https://sgamare32.pythonanywhere.com/api/v1/accounts/auth';
            const requestData = {
                email: email
            };
            Axios.post(apiUrl, requestData)
                .then(response => {
                    console.log("Data", response.data);
                    setError(null);
                    toast.success(response.data.message);
                    setStatusOtp(response.data.message);
                })
                .catch(error => {
                    console.error(error);
                    setError(error.message || 'An error occurred');
                });
        }



    }


    const handleLogin = () => {
        const url = 'https://sgamare32.pythonanywhere.com/api/v1/accounts/login';

        axios.post(url, {
            email: email,
            otp: otpdata
        })
            .then(response => {
                setloginSuccess(response.data.message);
                toast.success(response.data.message);

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
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
            {statusOtp == 'OTP sent' ? (
                <>
                    <MuiOtpInput
                        length={4}
                        value={otpdata}
                        onChange={handleOTPChange}
                        className='py-3'
                        display="flex"
                        gap={2}
                    />
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
                        LOGIN
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
                        onClick={sendOTP}
                    >
                        SEND OTP
                    </Button>

                    {error && <div className='text-center text-[15px] p-2' style={{ color: 'red' }}>{error}</div>}
                </>
            )}

        </>

    )
}

export default LoginPage