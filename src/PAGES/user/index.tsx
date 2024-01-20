import { ChangeEvent, Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { axios_user } from "./axios";
import { useNavigate, useParams } from "react-router-dom";
import { handleModalUser, handleSnackbar } from "../../REDUX/reducer_app";
import React from "react";
import DrawerList from "./component/drawer-list";
import TitleBreadcrumbs from "../../COMPONENTS/title-breadcrumbs";
import { Skeleton, Box, Avatar, Button, Paper, Grid, Typography, Divider, TextField, Tab, IconButton, makeStyles } from "@mui/material";
import './index.scss';
import setColor from "../../UTILS/set-color";
import generateLabel from "../../UTILS/avatar-label";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Padding } from "@mui/icons-material";
import background from '../../ASSETS/background.jpg';
import ProfileInfo from "./component/profile-info";
import FullWidthTabs from "./component/tab-panel-props";


const Profile = lazy(() => import('./component/index'));

const UserProfile = ()  => {
  
  const params = useParams();
  let slug = params?.slug;
  let view = params?.view;

  
  const {app}: any = useSelector((state) => state);
  const dispatch = useDispatch();

  const[userInfo, setUserInfo]: any = useState ({
    is_loading:true,
    data:null,
  });


  const navigate = useNavigate();

useEffect(() => {
  getUserData();

  return() => {
    setUserInfo({data:null, is_loading: true});
};
}, [slug]);

const paramsSearch = new URLSearchParams(location.search);
const userDetailsReload = paramsSearch.get('user-details');

React.useEffect (() => {
  if (userDetailsReload) {
    getUserData();
    paramsSearch.delete('user-details');
    navigate({ search: paramsSearch.toString() });
  }
}, [userDetailsReload]);

const getUserData =async () => {
  setUserInfo({...userInfo, is_loading:true});
  handleSnackbar({open:false});

  let moreURL = '';
  if (slug) {
    moreURL= `/${slug}/slug`;
  }

  const result: any = await axios_user ({
    moreUrl: `${moreURL}`,
    params: {
      filters: {
        withRole: true,
        withGender: true,

        withCountry: true,
        withNationality: true,
        rolePermission:true,

        withIdNumberInfo: true,
        withBankInfo: true,
      },
    },

  });

     if (result.status) {
        setUserInfo({data: result.data, is_loading: false})
      }
     else {
        setUserInfo({data:null, is_loading: false});
        dispatch(
        handleSnackbar({open:true, message: result.message, type:'error'})
    );
  };

};

const handleManageInfo = () => {
  dispatch(
    handleModalUser({open: true, type: 'MANAGE_USER', data: userInfo.data})
  );
};

const [value, setValue] = React.useState('one');

const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  setValue(newValue);
};


return(
  
<Box >
 <DrawerList />
    
  <Box position="relative">
  <img
      src={background}
      alt="Banner Image"
      style={{ width: '100%', height: '30vh', objectFit: 'cover' }}
    />

    <Grid
    container
    justifyContent='left'
    alignItems='flex-start'
    component="main"
    sx={{height: '90vh', width:'100vh', marginLeft:'20px'}}
    style={{
      position: 'absolute',
      top: 100,
      left: 20,
      zIndex: 1,
    }}
  >
   
   <Grid container>
   <Grid item xs={6}>
   <Paper
    elevation={4}
    sx={{
      position: 'relative',
      zIndex: 1, // Increase the zIndex value to bring the Paper component to the front
      marginTop: '50px',
      padding: '20px',
    }}
  >
    
    <Suspense fallback={<Skeleton />}>
      <Box marginTop={2}>
      {view === 'profile' && (
         <Profile
         handleManageInfo={handleManageInfo}
         userInfo={userInfo}
           />
         )}
        </Box>
      </Suspense>
      </Paper>
      </Grid>

      <Grid item xs={5} sx={{marginLeft:'30px'}}>
        
        <Box marginTop={20}>
          <FullWidthTabs />
        </Box>
        
          </Grid>
          </Grid>
          </Grid>
          
       
          </Box>
      </Box>
      
     

   );
};

export default UserProfile;