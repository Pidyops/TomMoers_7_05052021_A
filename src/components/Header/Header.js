import ButtonSizes from './ButtonSizes'
import CreatePostModal from './modalCreatePost/CreatePostModal'
import ProfileMenu from './ProfileMenu'


const Header = ({ date, comment, authValues, setAuthValues, description, setDescription, image, setImage, onPostCreated, userId, userConnected }) => {

    return (
        <header className='header'>

            <div className="header__left">
                <img src="/assets/logo.png" className="header-logo" alt="logo" />
            </div>

            <div className='header__middle'>
                <ButtonSizes variant="contained" text="Hot" color='primary' />
                <ButtonSizes variant="outlined" text="Popular" />
                <ButtonSizes variant="outlined" text="New" />
            </div>

            <div className='header__right'>
                <CreatePostModal
                    // post={post} setPost={setPost} 
                    description={description} setDescription={setDescription}
                    // comment={comment} like={like}
                    image={image} setImage={setImage}
                    onPostCreated={onPostCreated}
                    date={date} userId={userId}
                    
                />

                <ProfileMenu 
                    authValues={authValues}
                    setAuthValues={setAuthValues}
                    userConnected={userConnected}
                />

            </div>
        </header>
    )
}

export default Header
