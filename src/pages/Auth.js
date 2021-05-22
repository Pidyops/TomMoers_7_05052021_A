import SignIn from '../components/signIn/SignIn'

const Auth = ({authValues, setAuthValues}) => {



    return (
        <div>
            <SignIn 
                authValues={authValues} 
                setAuthValues={setAuthValues} 
            />
        </div>
    )
}

export default Auth
