import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTheme } from '@mui/system';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import AppbarUserMenu from './appbar-user-menu';
const drawerWidth = 280;

function ElevationScroll(props: any) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function AppbarPrivate(props: any) {
  const { window } = props;

  const navigate = useNavigate();

  const { user, app }: any = useSelector((state) => state);

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const mainMenu = [
    {
      value: `/`,
      label: 'Home',
      icon: <HomeOutlinedIcon sx={{ color: 'inherit' }} />,
    },
  ];

  const location = useLocation();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ gap: 1 }}>
        <Typography
          onClick={handleLogoClick}
          variant='h6'
          sx={{ fontWeight: 'bold', color: '#fff', textTransform: 'initial' }}
          noWrap
          component={Button}
        >
          HomeTutor CenTrack
        </Typography>
      </Toolbar>
      <Divider
        sx={{
          backgroundColor: 'rgba(255,255,255,0.3)',
        }}
      />
      {/* <List>
        <ListItem>
          <List
            sx={{
              width: '100%',
              padding: 0,
              margin: 0,
              '& .Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.3) !important',
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                },
              },
              '& .MuiListItemIcon-root': {
                minWidth: 32,
                marginRight: 1,
                color: 'inherit',
              },
            }}
          >
            {mainMenu.map((item: any, index: number) => (
              <ListItem
                onClick={() => handleNavigate(item.value)}
                key={index}
                disablePadding
              >
                <ListItemButton sx={{ borderRadius: '10px' }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
      <Divider
        sx={{
          backgroundColor: 'rgba(255,255,255,0.3)',
        }}
      /> */}
      {props.drawerList}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box id={`centrack_${props.id}`} sx={{ display: 'flex' }}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          color='default'
          position='fixed'
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              {props.title}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <AppbarUserMenu />
          </Toolbar>
          <Divider />
        </AppBar>
      </ElevationScroll>

      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          color='primary'
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
            '& .MuiPaper-root': {
              color: theme.palette.getContrastText(
                app.is_dark_theme
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main
              ),
              backgroundColor: app.is_dark_theme
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
              mode: 'dark',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          color='primary'
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
            '& .MuiPaper-root': {
              color: theme.palette.getContrastText(
                app.is_dark_theme
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main
              ),
              backgroundColor: app.is_dark_theme
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
              mode: 'dark',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {props.children}
      </Box>
    </Box>
  );
}
