import Signin from '../components/Auth/Signin'
import { useState } from 'react'

const Auth = ({authValues, setAuthValues}) => {



    return (
        <div>
            <Signin 
                authValues={authValues} 
                setAuthValues={setAuthValues} 
            />
        </div>
    )
}

export default Auth
