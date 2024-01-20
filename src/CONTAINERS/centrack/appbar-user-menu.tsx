import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelIcon from '@mui/icons-material/Settings';
import { Avatar, Button, ButtonGroup, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Menu, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleIsAutoTheme, handleIsDarkTheme } from '../../REDUX/reducer_app';
import generateLabel from '../../UTILS/avatar-label';
import setColor from '../../UTILS/set-color';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const UserMenu = () => {
  const beforeLogin = [{ label: 'Login', to: '/login', icon:<PowerSettingsNewIcon/> }];
  const afterLogin = [
    { label: 'Logout', to: '/logout', icon: <LogoutIcon /> },
  ];

  const { user, app }: any = useSelector((state) => state);
  // const navigate = useNavigate(); // Use the useNavigate hook from React Router

  const rolePermissions: any = user.session?.data?.role_permissions;

  if (rolePermissions && rolePermissions['admin.user.view']) {
    afterLogin.unshift({
      label: 'Admin Panel',
      to: '/admin/users',
      icon: <AdminPanelIcon />,
    });
  }

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();

  const changeTheme = (theme: string) => {
    if (theme === 'auto') {
      dispatch(handleIsAutoTheme({ is_auto_theme: true }));
      handleCloseUserMenu();
      return;
    }
    dispatch(handleIsAutoTheme({ is_auto_theme: false }));
    dispatch(handleIsDarkTheme({ is_dark_theme: theme === 'dark' ? true : false }));

    handleCloseUserMenu();
  };

  

  return (
    <Box>
      <Tooltip title='Open Profile'>
        <IconButton
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenUserMenu}
          edge={'end'}
          size='small'
        >
          <Avatar
            sx={{
              backgroundColor: setColor(user.session.data?.fullname),
              fontWeight: 500,
              color: app.is_dark_theme ? 'primary.light' : 'primary.dark',
              // fontSize: '12px',
            }}
            src={user.session?.data?.avatar?.small}
          >
            {user.session.data ? (
              generateLabel(user.session.data?.fullname, 1)
            ) : (
              <PersonOutlineIcon />
            )}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        id="menu-appbar"
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            minWidth: '300px',
            maxWidth: '300px',
            '& .MuiAvatar-root': {
              width: 75,
              height: 75,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 16,
              width: 10,
              height: 12,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

       {!user.is_login ? (
    beforeLogin.map((menu) => (
      <ListItem key={menu.to} component={Link} to={menu.to}>
    <ListItemIcon>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.label} />
      </ListItem>
    ))
  ) : (
    <ListItem component={Link} to ={'/user/profile'} sx={{ justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton sx={{marginBottom:'5px'}}>
      <Avatar 
      sx={{
            backgroundColor: setColor(user.session.data?.fullname),
            fontWeight: 500,
            color: app.is_dark_theme ? 'primary.light' : 'primary.dark',
            width: 60, 
            height: 60,
            fontSize:'35px'
          }}
        alt={user.session?.data?.fullname}
        src={user.session?.data?.avatar?.small}

      >
          {generateLabel(user.session?.data?.fullname, 1)}
        </Avatar>
      </IconButton>
      <Typography
      variant="body1"
      color="text.primary"
      sx={{ fontWeight: 500}}
    >
      {user.session?.data?.fullname}
    </Typography>
    <Typography color='text.secondary' variant='body2'> 
        ID : {user.session?.data?.member_id}
    </Typography>

      </Box>
    </ListItem>
    
  ) }       
        
        {/* {user.is_login? (
          <Fragment>
            <Divider />
            <ListItem > 
              <Typography sx={{fontWeight:500}}>Account</Typography>
            </ListItem>
            <Divider />
          </Fragment>
        ) : null} */}
        
        <ListItem>
          <Typography sx={{ fontWeight: 500 }}>Settings</Typography>
        </ListItem>

        <ListItem sx={{marginBottom:'20px'}}>
          <Box sx={{ width: '100%' }}>
            <Typography
              component={'div'}
              sx={{ marginTop: '0px', marginBottom: '5px', fontWeight: 500 }}
              color='text.secondary'
              variant='caption'
            >
              Mode:
            </Typography>

            
            <ButtonGroup
              sx={{ width: '100%' }}
              variant='outlined'
              aria-label='outlined button group'
            >
            
              <Button
                sx={{ width: '100%' }}
                {...(app.is_dark_theme == false && !app.is_auto_theme
                  ? { variant: 'contained' }
                  : {})}
                onClick={() => changeTheme('light')}
              >
                Light
              </Button>
              <Button
                sx={{ width: '100%' }}
                {...(app.is_dark_theme && !app.is_auto_theme
                  ? { variant: 'contained' }
                  : {})}
                onClick={() => changeTheme('dark')}
              >
                Dark
              </Button>
              <Button
                sx={{ width: '100%' }}
                {...(app.is_auto_theme ? { variant: 'contained' } : {})}
                onClick={() => changeTheme('auto')}
              >
                Auto
              </Button>
            </ButtonGroup>
          </Box>
        </ListItem>
            <Divider />
            
            <ListItem>       
      {user.is_login ? (
         afterLogin.map((menu) => (
         <ListItem key={menu.to} component={Link} to={menu.to}>
         <ListItemIcon>{menu.icon}</ListItemIcon>
         <ListItemText primary={menu.label} />
          </ListItem>
      ))
      ) : null}
      </ListItem>
      </Menu>
    </Box>
  );
};

export default memo(UserMenu);

