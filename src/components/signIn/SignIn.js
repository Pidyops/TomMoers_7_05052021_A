import './signin.scss'
import { useHistory } from 'react-router-dom';
import Button from '../utils/button/Button';
import Signup from '../Auth/Signup';
// import ModalAvatar from '../Header/ModalAvatar'


const Signin = ({ authValues, setAuthValues}) => {
    const history = useHistory()

    const handleAuthChange = e => {
        const { name, value } = e.target;
        console.log(e.target)

        setAuthValues({
            ...authValues,
            // [e.target.name]: e.target.value // the name of the form
            [name]: value
        });
    };

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

        fetch('http://localhost:5000/accounts', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(authValues)

            }).then(() => {
                setAuthValues({
                email: '',
                password: ''
                });
            }).then(() => history.push('/Forum'))
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
                        <div className="signin__wrapper__right__form--item">
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
                            {/* {errors.email && <p>{errors.email}</p>} */}
                            
                        </div>
                        <div className="signin__wrapper__right__form--item">
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
                            {/* {errors.email && <p>{errors.email}</p>} */}
                        </div>

                        

                        <button className="signin__wrapper__right__form--btn" onClick={actionSignIn} >
                            Sign In
                        </button>

        
                        <a className="signin__wrapper__right__form--forgot" href='top'>Forgot your password?</a>

                        <hr className="signin__wrapper__right__form--hr"/>


                        <Signup className="signin__wrapper__right__signup" authValues={authValues} handleAuthChange={handleAuthChange} setAuthValues={setAuthValues} />
                        
                    </form>
                
                
                </div>
            </div>
            
            
        </div>
        
        
    )
}


export default Signin
