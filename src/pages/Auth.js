import Signin from '../components/Auth/Signin'

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
