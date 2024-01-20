import GridViewIcon from '@mui/icons-material/GridView';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import React, { Fragment, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import setColor from '../../../UTILS/set-color';
const DrawerList = (props: any) => {
  const theme = useTheme();

  const match = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const handleNavigate = (route: string) => {
    navigate(route);
  };
  const mainMenu = [
    {
      value: `/`,
      label: 'Home',
      icon: <HomeOutlinedIcon sx={{ color: 'inherit' }} />,
    },
  ];

  return (
    <Fragment>
      <List>
        <ListItem>
          <List
            sx={{
              width: '100%',
              padding: 0,
              margin: 0,
              '& .MuiListItemText-primary': {
                fontWeight: 500,
              },
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
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: setColor(item.label),
                        color: '#fff',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  </ListItemAvatar>
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
      />
      <List>
        {/* <ListSubheader
          sx={{
            backgroundColor: 'transparent',
            color: theme.palette.getContrastText(theme.palette.primary.main),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>YOUR PROFILE</Box>
          </Box>
        </ListSubheader> */}
        <ListItem>
          <List
            sx={{
              width: '100%',
              padding: 0,
              margin: 0,
              fontWeight: 500,
              '& .MuiListItemText-primary': {
                fontWeight: 500,
              },
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
          </List>
        </ListItem>
      </List>
    </Fragment>
  );
};

export default memo(DrawerList);
