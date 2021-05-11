import React from 'react'
import { useState } from 'react'
import Button from './Button';
import Signup from './Signup';


// ??? Why can"t I console.log(e) in the return()?
// ??? Sometimes, I can't type text in my input (in the client) (problem solved, but don't know why)
// ??? When using my Component react developper tool, I see that my setAuthValues is not updating my AuthValues

const Signin = () => {
    const clikou = () => {
        console.log('Clickou')
        console.log()
    }
    const bioup = () => {
        console.log('Bioup')
        console.log()
    }

    const[authValues, setAuthValues] = useState({
        email: '',
        password: ''
    });

    const handleAuthChange = e => {
        const { name, value } = e.target;
        console.log(e)

        setAuthValues({
            ...authValues,
            // [e.target.name]: e.target.value // the name of the form
            [name]: value
        });
    };

    // ??? When I was using this mehod, they where overwritting each other (don't undestand why)
    // const[email, setEmail] = useState('')
    // const[password, setPassword] = useState('')

    const actionAuth = e => {
        e.preventDefault();

        if(!authValues.email) {
            alert('Please add email')
            return
        }

        if(!authValues.password) {
            alert('Please add password')
            return
        }

        console.log(authValues)

        fetch('http://localhost:5000/accounts', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(authValues)

            // ????? Why isn't it working?
            // setAuthValues.email('')
            // setAuthValues.password('')

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
            <form action="" className="auth__form" onSubmit={actionAuth} >
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
                        // ????? What do you think of it?
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

                

                <Button className="auth__login-btn" color='green' text='Log In' onClick={clikou} />
                <a className="auth__forgotten" href='top'>Forgotten password?</a>
                <Button className="auth__signup-btn" color='blue' text='Create New Account' onClick={bioup} />
                <input className='btn btn-block' type='submit' value='Save Task' />
            
                <Button variant="contained" color="primary" disableElevation>
                Disable elevation
                </Button>

                {/* <Signup /> */}
                
            </form>
            
            
        </div>
        
    )
}


export default Signin
