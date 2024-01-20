import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  useTheme,
} from '@mui/material';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import setColor from '../../../UTILS/set-color';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PasswordIcon from '@mui/icons-material/Password';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const DrawerList = ({ view }: any) => {
  const theme = useTheme();

  const match = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const menuList = [
    {
      value: 'extend-subscription',
      label: 'Extend Subscription',
      icon: <AccessTimeIcon />, 
    },
    {
      value: 'reset-password',
      label: 'Reset Password',
      icon: <PasswordIcon />
    },
    {
      value: 'change-package',
      label: 'Change Package',
      icon: <ChangeCircleIcon />
    },
  ];

  return (
    <List>
      <ListSubheader
        sx={{
          backgroundColor: 'transparent',
          color: theme.palette.getContrastText(theme.palette.primary.main),
        }}
      ></ListSubheader>
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
          {menuList.map((item: any, index: number) => (
            <ListItem key={index} disablePadding 
            >
              <ListItemButton
                onClick={() =>
                  handleNavigate(`/centrack/settings-demo/${item.value}`)
                }
                selected={item.value === view ? true : false}
                sx={{
                  borderRadius: '10px',
                }}
              >
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
    
  );
};

export default memo(DrawerList);
