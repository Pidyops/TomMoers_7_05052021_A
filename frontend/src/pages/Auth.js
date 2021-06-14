import SignIn from '../components/signIn/SignIn'

const Auth = ({authValues, setAuthValues, setUserConnected, userConnected}) => {

    return (
        <div>
            <SignIn 
                authValues={authValues} 
                setAuthValues={setAuthValues} 
                setUserConnected={setUserConnected}
                userConnected={userConnected}
            />
        </div>
    )
}

export default Auth
