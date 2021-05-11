import './Header.css'
// import logo from './img/logo.svg';

const Header = () => {
    return (
        <header className='header'>
            <img src='img/icon.png' className="header-logo" alt="logo" />
            <div className='header-auth'>
                <div className='auth-btn btn-sober' id='signup'>signup</div>
                <div className='auth-btn btn-filled' id='login'>Login</div>
            </div>



        </header>
    )
}

export default Header
