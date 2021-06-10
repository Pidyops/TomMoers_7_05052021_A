import './signin.scss'
import { useHistory } from 'react-router-dom';
import ButtonLarge from '../utils/button/Button';
import Signup from '../Signup/Signup';
import { TextField } from '@material-ui/core';
import InputPassword from '../utils/button/InputPassword';
import { useState } from 'react';
// import ModalAvatar from '../Header/ModalAvatar'


const Signin = ({ authValues, setAuthValues, userConnected, setUserConnected}) => {
    const history = useHistory()
    let resMessage = ''

    const handleAuthChange = e => {
        const { name, value } = e.target;
        // console.log(e.target)

        setAuthValues({
            ...authValues,
            // [e.target.name]: e.target.value // the name of the form
            [name]: value
        });
    };

    const [errorMessage, setErrorMessage] = useState('')

    const actionSignIn = e => {
        e.preventDefault();
        console.log('hey')

        if(!authValues.email) {
            alert('Please add email')
            return
        }
        if(!authValues.password) {
            alert('Please add password')
            return
        }

        // fetch('http://localhost:5000/accounts', {
        fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(authValues)

        })  
            .then((res) => {
                console.log('login: first then')
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

                    // .then((res) => {

                    // })

                } else {
                    console.log('login (no token)', res)
                    setErrorMessage(res.message)
                }
                
            })
            .then((res) => {
                console.log({userConnected})
                console.log(errorMessage)

                // if(res.token) {
                //     history.push('/Forum')
                // } else {

                // }
            })


    }

    return (
        <div className="signin">
            <div className="signin__wrapper">
            <div>{errorMessage}</div>
            {/* <div>{userConnected}</div> */}
                <div className="signin__wrapper__left">
                    <img src="/assets/logo.png" alt="logo" className="signin__wrapper__left--logo"/>
                    <div className="signin__wrapper__left--desc">
                        With Grouponamina Social Media, keep in touch with you collegues
                    </div>
                    <div>
                        {userConnected}
                    </div>
                    
                </div>

                <div className="signin__wrapper__right">
                    <form action="" className="signin__wrapper__right__form">
                    {/* <form action="" className="auth__form" onSubmit={actionAuth} > */}

                        <TextField
                            className="signin__wrapper__right__form--item form__inputs--input"
                            label="Email" variant="outlined" 
                            size="small" margin='dense'  
                            id='email' 
                            type="email" 
                            name="email" 
                            className="form__inputs--input" 
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
                            labelWidth={90}   
                        />

                        <div className="signin__wrapper__right__form--btn">
                            <ButtonLarge fullWidth='fullWidth'  color='primary' text='Sign In' className="signin__wrapper__right__form--btn" onClick={actionSignIn}/>
                        </div>
                        
                        <a className="signin__wrapper__right__form--forgot" href='top'>Forgot your password?</a>

                        <hr className="signin__wrapper__right__form--hr"/>

                        <Signup color='secondary' className="signin__wrapper__right__form--signup" authValues={authValues} handleAuthChange={handleAuthChange} setAuthValues={setAuthValues} text='Sign Up' />
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Signin

