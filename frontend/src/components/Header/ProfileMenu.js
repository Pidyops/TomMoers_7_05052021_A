import React from 'react';
import './profileMenu.scss';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditProfile from './EditProfile';
import PersonIcon from '@material-ui/icons/Person';
import ChangePassword from './ChangePassword';
import Logout from './Logout';
import DeleteAccount from './DeleteAccount';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ProfileMenu({authValues, setAuthValues, userConnected, onPostCreated}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='header__right--container'>

      <PersonIcon
        className='header__right--person'
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      />

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
            <EditProfile 
                authValues={authValues}
                setAuthValues={setAuthValues}
                userConnected={userConnected}
                anchorClose={handleClose}
                onPostCreated={onPostCreated}
            />
        </StyledMenuItem>

        <StyledMenuItem>
            <ChangePassword 
                authValues={authValues}
                setAuthValues={setAuthValues}
                userConnected={userConnected}
                anchorClose={handleClose}
            />
        </StyledMenuItem>

        <StyledMenuItem>
            <Logout
                authValues={authValues}
                setAuthValues={setAuthValues}
                userConnected={userConnected}
            />
        </StyledMenuItem>

        <StyledMenuItem>
            <DeleteAccount
                authValues={authValues}
                setAuthValues={setAuthValues}
                userConnected={userConnected}
            />
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
}