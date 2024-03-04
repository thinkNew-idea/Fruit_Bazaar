import { Button, TextField } from '@mui/material'
import React from 'react';
import fruitimg from '../media/assets/icon/pngwing.com.png';
import { validEmail } from './Regex';
import { ApiCallSendOtp } from '../../Utils/api';
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
    const [email, setEmail] = React.useState('');
    const [MailAlertMge, setMailAlertMge] = React.useState("");
    const [otpum, setOtpum] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [secondName, setSecondName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [mobileNumber, setMobileNumber] = React.useState('');
    const [addressOne, setAddressOne] = React.useState('');
    const [addressTwo, setAddressTwo] = React.useState('');



    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpNum = (event) => {
        setOtpum(event.target.value);
    };
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleSecondName = (event) => {
        setSecondName(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleMobileNumber = (event) => {
        setMobileNumber(event.target.value);
    };
    const handleAddressOne = (event) => {
        setAddressOne(event.target.value);
    };
    const handleAddressTwo = (event) => {
        setAddressTwo(event.target.value);
    };
    const handleSubmit = async () => {
        // Define messages for empty fields
        const emptyFieldMessages = {
            email: 'Please enter your email',
            otpum: 'Please enter your OTP',
            firstName: 'Please enter your first name',
            secondName: 'Please enter your second name',
            password: 'Please enter your password',
            mobileNumber: 'Please enter your mobile number',
            addressOne: 'Please enter your address (line 1)',
            addressTwo: 'Please enter your address (line 2)',
        };

        // Iterate through fields and check if any are empty
        for (const field in emptyFieldMessages) {
            if (!eval(field)) { // Check if the field is empty
                toast.error(emptyFieldMessages[field]); // Display the respective message
                return; // Exit the function if any field is empty
            }
        }

        // If all fields are filled, proceed with form submission logic
        try {
            // Your form submission logic here
        } catch (error) {
            toast.error('An error occurred during form submission');
        }
    };


    const handleSendOtp = async () => {
        if (email === "") {
            setMailAlertMge("Please enter your email");

        } else if (!validEmail.test(email)) {

            setMailAlertMge("Please enter your valid email");
        } else {
            try {
                const response = await ApiCallSendOtp("post", 'sendOtp', { email: email })
                if (response.status == 200) {
                    if (response.data.ok === true) {
                        toast.success(response.data.message + " to your email");
                    } else if (response.data.ok === false) {
                        toast.error(response.data.message);
                    }

                }
            } catch (error) {
                toast.error("An error occurred during otp send.");

            }
        }

    }
    return (
        <div className='pt-[2rem] px-[2rem] gap-4 flex flex-col'>
            <div className='flex justify-center relative mb-3'><h1 className='text-[#3d3839] text-[36px] font-[500]'>Register Your Details</h1>
            </div>
            <div class="grid grid-cols-2 gap-4 flex-1 custom-shadow p-[4rem] relative">
                <div className='flex flex-col'>
                    <div className='flex flex-row  items-center gap-2 justify-between'>
                        <TextField
                            fullWidth
                            label="Enter Gmail"
                            size="normal"
                            margin="dense"
                            type='email'
                            variant="outlined"
                            InputLabelProps={{ required: true }}
                            style={{ borderRadius: 0 }}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <Button
                            style={{
                                width: '200px',
                                padding: '14px',
                                fontSize: '16px',
                                fontWeight: 600,
                                backgroundColor: '#3d3839',
                                borderRadius: 0,
                                marginTop: 2
                            }}
                            size="normal"
                            variant="contained"
                            onClick={handleSendOtp}
                        >
                            Send Otp
                        </Button>
                    </div>


                    {MailAlertMge && <div className='text-[13px]' style={{ color: 'red' }}>{MailAlertMge}</div>}

                </div>
                <TextField
                    fullWidth
                    label="Enter Otp "
                    size="normal"
                    margin="dense"
                    type='number'
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    style={{ borderRadius: 0 }}
                    value={otpum}
                    onChange={handleOtpNum}
                />
                <TextField
                    fullWidth
                    label="First Name"
                    size="normal"
                    margin="dense"
                    type='text'
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    style={{ borderRadius: 0 }}
                    value={firstName}
                    onChange={handleFirstName}
                />
                <TextField
                    fullWidth
                    label="Second Name"
                    size="normal"
                    margin="dense"
                    type='text'
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    style={{ borderRadius: 0 }}
                    value={secondName}
                    onChange={handleSecondName}
                />
                <TextField
                    fullWidth
                    label="Set Password"
                    size="normal"
                    margin="dense"
                    type='password'
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    style={{ borderRadius: 0 }}
                    value={password}
                    onChange={handlePassword}
                />
                <TextField
                    fullWidth
                    label="Mobile Number"
                    size="normal"
                    margin="dense"
                    type='number'
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    style={{ borderRadius: 0 }}
                    value={mobileNumber}
                    onChange={handleMobileNumber}
                />
                <TextField
                    fullWidth
                    className='col-span-2'
                    id="address"
                    label="Address 1"
                    variant="outlined"
                    size="normal"
                    margin="dense"
                    type='text'
                    InputLabelProps={{ required: true }}
                    style={{ borderRadius: 0 }}
                    value={addressOne}
                    onChange={handleAddressOne}
                />
                <TextField
                    fullWidth
                    className='col-span-2 z-[11]'
                    id="address"
                    label="Address 2"
                    variant="outlined"
                    size="normal"
                    margin="dense"
                    type='text'
                    InputLabelProps={{ required: true }}
                    style={{ borderRadius: 0 }}
                    value={addressTwo}
                    onChange={handleAddressTwo}
                />
                <div className='absolute bottom-[-10rem] left-0 z-[10]'><img className='w-[374px]' src={fruitimg} alt="" /></div>

            </div>
            <div className='flex justify-end '>
                <Button
                    style={{
                        width: '200px',
                        padding: '14px',
                        fontSize: '16px',
                        fontWeight: 600,
                        backgroundColor: '#0bc217',
                        borderRadius: 0,
                        marginTop: 3
                    }}
                    size="normal"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>

        </div>
    )
}

export default RegisterPage