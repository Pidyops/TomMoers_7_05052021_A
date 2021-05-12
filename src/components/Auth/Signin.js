import React from 'react'
import { useState } from 'react'
import Button from './Button';
import Signup from './Signup';
import Toforum from './Toforum';


const Signin = () => {
    // const clikou = () => {
    //     console.log('Clickou')
    //     console.log()
    // }

    const[authValues, setAuthValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    });

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
          })
        
        // ????? What are the advantage and how could I use const x = async ...
        // const postLogger = async (authValues) => {
        //     const res = await fetch('http://localhost:5000/accounts', {
        //       method: 'POST',
        //       headers: {
        //         'Content-type': 'application/json'
        //       },
        //       body: JSON.stringify(authValues)
        //     })
        
        //     // const data = await res.json()
        
        //     // setTasks([...tasks, data])
        // }
    
    }

    return (
        <div className="auth__container-right">
            <form action="" className="auth__form">
            {/* <form action="" className="auth__form" onSubmit={actionAuth} > */}
                <div className="auth__inputs">
                    <label htmlFor="email" className="auth__inputs--label">
                        Email
                    </label>
                    <input 
                        id='email' 
                        type="text" 
                        name="email" 
                        className="form__inputs--input" 
                        placeholder="Enter your email"
                        value= {authValues.email}
                        // onChange={(e) => setAuthValues(e.target.value)}
                        onChange={handleAuthChange}
                    />
                    {/* {errors.email && <p>{errors.email}</p>} */}
                    
                </div>
                <div className="auth__inputs">
                    <label htmlFor="password" className="auth__inputs--label">
                        Password
                    </label>
                    <input 
                        id='password'  
                        type="password" 
                        name="password" 
                        className="auth__inputs--input" 
                        placeholder="Enter your password"
                        value= {authValues.password}
                        onChange={handleAuthChange}
                    />
                    {/* {errors.email && <p>{errors.email}</p>} */}
                </div>

                

                <Button className="auth__login-btn" color='green' text='Log In' onClick={actionSignIn} />

                <Toforum />
                <a className="auth__forgotten" href='top'>Forgotten password?</a>

                <Signup className="auth__signup-btn" authValues={authValues} handleAuthChange={handleAuthChange} setAuthValues={setAuthValues} />
                
            </form>
            
            
        </div>
        
    )
}


export default Signin
