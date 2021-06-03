import './signin.scss'
import { useHistory } from 'react-router-dom';
import ButtonLarge from '../utils/button/Button';
import Signup from '../Signup/Signup';
import { TextField } from '@material-ui/core';
import InputPassword from '../utils/button/InputPassword';
// import ModalAvatar from '../Header/ModalAvatar'


const Signin = ({ authValues, setAuthValues}) => {
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
    var cookieDate = new Date (Date.now() +  24 * 60 * 60 * 1000)

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
                    console.log('login (token)', res)
                    sessionStorage.setItem('jwt', res.token)
                    setAuthValues({
                        email: '',
                        password: ''
                        });
                    history.push('/Forum')

                } else {
                    console.log('login (no token)', res)
                    resMessage = res.message
                }
            })

            console.log({resMessage})

            // .then(() => {
                
            //     // console.log(authValues)
                
            // })
            // .then(() => )
    }

    return (
        <div className="signin">
            <div className="signin__wrapper">

                <div className="signin__wrapper__left">
                    <img src="/assets/logo.png" alt="logo" className="signin__wrapper__left--logo"/>
                    <div className="signin__wrapper__left--desc">
                        With Grouponamina Social Media, keep in touch with you collegues
                    </div>
                </div>

                <div className="signin__wrapper__right">
                    <form action="" className="signin__wrapper__right__form">
                    {/* <form action="" className="auth__form" onSubmit={actionAuth} > */}

                        <TextField
                            className="signin__wrapper__right__form--item"
                            label="Email" variant="outlined" 
                            size="small" margin='dense'  
                            id='email' 
                            type="email" 
                            name="email" 
                            className="form__inputs--input" 
                            placeholder="Enter your email"
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









{/* <div className="signin__wrapper__right__form--item">
<label htmlFor="email" className="signin__wrapper__right__form--item--label">
    Email
</label>
<input 
    id='email' 
    type="text" 
    name="email" 
    className="signin__wrapper__right__form--item--input" 
    placeholder="Enter your email"
    value= {authValues.email}
    // onChange={(e) => setAuthValues(e.target.value)}
    onChange={handleAuthChange}
/>
{errors.email && <p>{errors.email}</p>}

</div> */}



{/* <div className="signin__wrapper__right__form--item">
<label htmlFor="password" className="signin__wrapper__right__form--item--label">
    Password
</label>
<input 
    id='password'  
    type="password" 
    name="password" 
    className="signin__wrapper__right__form--item--input" 
    placeholder="Enter your password"
    value= {authValues.password}
    onChange={handleAuthChange}
/>
{errors.email && <p>{errors.email}</p>}
</div> */}

{/* <button className="signin__wrapper__right__form--btn" onClick={actionSignIn} </button> */}