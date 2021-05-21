
import TransitionsCreatePostModal from './ModalCreatePost'
import ButtonSizes from './ButtonSizes'
import TransitionsAvatarModal from './ModalAvatar'

const Header = ({ authValues, setAuthValues, title, setTitle, description, setDescription, image, setImage, onPostCreated }) => {
    // const[post, setPost] = useState({
    //     title: '',
    //     description: '',
    //     image: '',
    //   });




    return (
        <header className='header'>

            <div className="header__left">
                <img src='img/icon-left-font-cropped.png' className="header-logo" alt="logo" />
            </div>

            <div className='header__middle'>
                <ButtonSizes variant="contained" text="Hot" color='primary' />
                <ButtonSizes variant="outlined" text="Popular" color='#4C7490' />
                <ButtonSizes variant="outlined" text="New" color='blue' />
            </div>

            <div className='header__right'>
                <TransitionsCreatePostModal
                    // post={post} setPost={setPost} 
                    title={title} setTitle={setTitle}
                    description={description} setDescription={setDescription}
                    image={image} setImage={setImage}
                    onPostCreated={onPostCreated}
                />
                <TransitionsAvatarModal
                    authValues={authValues}
                    setAuthValues={setAuthValues}
                />
            </div>



        </header>
    )
}

export default Header
