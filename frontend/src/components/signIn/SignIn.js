import { useState, useEffect } from 'react';
import './signin.scss'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom';
import ButtonLarge from '../utils/button/Button';
import Signup from '../Signup/Signup';
import { TextField } from '@material-ui/core';
import InputPassword from '../utils/button/InputPassword';
import { toast } from 'react-toastify'
import Toast from '../utils/toast/Toast';


const Signin = ({ authValues, setAuthValues, userConnected, setUserConnected}) => {
    const history = useHistory()

    const handleAuthChange = e => {
        const { name, value } = e.target;

        setAuthValues({
            ...authValues,
            [name]: value
        });
    };

    const [errorMessage, setErrorMessage] = useState('')

    const actionSignIn = e => {
        e.preventDefault();
        

        if(!authValues.email) {
            alert('Please add email')
            return
        }
        if(!authValues.password) {
            alert('Please add password')
            return
        }

        fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(authValues)
        })  
            .then((res) => {
                // console.log('login: first then')
                return res.json()})

            .then((res) => {
                if(res.token) {
                    sessionStorage.setItem('jwt', res.token)
                    sessionStorage.setItem('userConnectedId', res.userConnected.id)
                    
                    setUserConnected(res.userConnected.id)
                    
                    setAuthValues({
                        email: '',
                        password: ''
                        })

                    history.push('/Forum')

                } else {
                    if(res.message) {
                        
                        setErrorMessage(res.message)
                    } else {
                        setErrorMessage(res)
                    }
                }
            })
    }


    useEffect(() => {
        if (errorMessage){
            toast.error(errorMessage, {className:'toast--error'} )
            setErrorMessage('')
        }

    }, [errorMessage])


    return (
        <div className="signin">
            <Toast />

            <div className="signin__wrapper">
                <div className="signin__wrapper__left">
                    <img src="/assets/logo-grey.jpg" alt="logo from Groupoimania" className="signin__wrapper__left--logo"/>
                    <div className="signin__wrapper__left--desc">
                        With Grouponamina Social Media, keep in touch with your collegues
                    </div>
                    <div>
                        {userConnected}
                    </div>
                    
                </div>

                <div className="signin__wrapper__right">
                    <form action="" className="signin__wrapper__right__form">

                        <TextField
                            className="signin__wrapper__right__form--item form__inputs--input"
                            label="Email" variant="outlined" 
                            size="small" margin='dense'  
                            id='email' 
                            type="email" 
                            name="email" 
                            value= {authValues.email}
                            onChange={handleAuthChange}
                        />

                        <InputPassword
                            className="signin__wrapper__right__form--item"
                            htmlFor='password'
                            id='password'
                            name='password'
                            text='Password'
                            authValues={authValues.password} 
                            handleAuthChange={handleAuthChange}
                            setAuthValues={setAuthValues}
                        />

                        <div className="signin__wrapper__right__form--btn">
                            <ButtonLarge fullwidth='fullwidth'  color='primary' text='Sign In' className="signin__wrapper__right__form--btn" onClick={actionSignIn}/>
                        </div>
                        
                        <a className="signin__wrapper__right__form--forgot" href="mailto:account@groupomania.com">Forgot your password?</a>

                        <hr className="signin__wrapper__right__form--hr"/>

                        <Signup color='secondary' className="signin__wrapper__right__form--signup" authValues={authValues} handleAuthChange={handleAuthChange} setAuthValues={setAuthValues} text='Sign Up' />
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Signin

