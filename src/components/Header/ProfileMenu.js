import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AvatarModal from '../AvatarModal/AvatarModal';
import EditProfile from './EditProfile';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
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

export default function ProfileMenu({authValues, setAuthValues, userConnected}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

      <PersonIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      />

      
        {/* <AvatarModal
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
        /> */}
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
            />
        </StyledMenuItem>

        <StyledMenuItem>
            <ChangePassword 
                authValues={authValues}
                setAuthValues={setAuthValues}
                userConnected={userConnected}
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