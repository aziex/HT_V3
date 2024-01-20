import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import './index.scss';
import { LoadingButton, TabPanel } from '@mui/lab';

function ViewResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate ();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordMode, setPasswordMode] = useState(false);
    const [usernameEmail, setUsernameEmail ] = useState('');

    const[value, setValues]: any = useState({

      email: '',
      username:'',
      defaultPassword: 'abc123',

    });
    
    // const handleResetPassword = () => {
    //   if (email) || (username) 
    // };

  return (
    <Box sx={{ flexGrow: 1, marginRight:3, width:'90%', marginTop:'20px'}} > 
    <Grid
        container
        justifyContent='center'
        alignItems='flex-start'
        component="main"
        sx={{height: '110vh' }}
      >

        <Paper elevation={4} sx={{ padding: '32px', width:'80%'}}>
        <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant='h5'
                sx={{ marginBottom: '8px', fontWeight: 500 }}
              >
                Reset Password
              </Typography>

        </Box>
        <Divider />

        <Box sx={{textAlign:'center'}}>
              <Typography
                variant='body2'
                sx={{ my: '20px', fontWeight: 500, color: "#757575" }}
              >
                Find account using Username or Email here
              </Typography>
        </Box>


        <Box marginTop='10px' display="flex" justifyContent="flex-end">
        <TextField  
              fullWidth
              label="Username/Email"
              variant="outlined"
              value={usernameEmail}
              onChange={(e) => setUsernameEmail(e.target.value)}
               />

          <LoadingButton variant="text" style={{ marginLeft:'10px'}}>
            <Typography fontSize={14} bgcolor="primary.main" borderRadius={3} color="#FFF" sx={{ padding: '10px', mx:"8px", fontWeight: 500 }}>
              Search
              </Typography>
              </LoadingButton>
              </Box> 

              <Box bgcolor="#f3e5f5" marginTop='10px' display='flex' alignItems='center' padding={3} borderRadius="10px">
                <Typography sx={{ flexGrow: 1 }}>
                Natasya
                </Typography>
                
                {/* <Button sx={{ bgcolor:"primary.main", color:"#FFF", borderRadius:"30px"}} onClick={handleResetPassword}>
                  Reset
                </Button> */}
              </Box>     
        </Paper>
      </Grid>
    </Box>

  );
}

export default React.memo(ViewResetPassword);