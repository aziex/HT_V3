import { List, ListItem, ListSubheader, useTheme } from '@mui/material';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DrawerList = (props: any) => {
  const theme = useTheme();

  const match = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

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
        ></List>
      </ListItem>
    </List>
  );
};

export default memo(DrawerList);
