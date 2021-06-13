import CreatePostModal from './CreatePostModal'
import ProfileMenu from './ProfileMenu'


const Header = ({ date, authValues, setAuthValues, description, setDescription, image, setImage, onPostCreated, userId, userConnected }) => {

    return (
        <header className='header'>

            <div className="header__left">
                <img src="/assets/logo.png" className="header-logo" alt="logo" />
            </div>

            {/* <div className='header__middle'>
                <ButtonSizes variant="contained" text="Hot" color='primary' />
                <ButtonSizes variant="outlined" text="Popular" />
                <ButtonSizes variant="outlined" text="New" />
            </div> */}

            <div className='header__right'>
                <CreatePostModal
                    description={description} setDescription={setDescription}
                    image={image} setImage={setImage}
                    onPostCreated={onPostCreated}
                    date={date} userId={userId}
                    
                />

                <ProfileMenu 
                    authValues={authValues}
                    setAuthValues={setAuthValues}
                    userConnected={userConnected}
                    onPostCreated={onPostCreated}
                />

            </div>
        </header>
    )
}

export default Header
