import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, Divider, Grid, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import './index.scss';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function ViewExtendSubscription() {
  const { user, app } = useSelector((state: any) => state);
  const match = useParams();

  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
                Extend User Subscription
              </Typography>

        </Box>
        <Divider />

        <Box>

              <Typography
                variant='body2'
                sx={{ my: '20px', fontWeight: 500 }}
              >
                Extend user subscription by activation code or username
                
                <Typography
                color='text.secondary'
                variant='body2'
                sx={{ marginTop:0.2, fontWeight: 400 }}
              >
                You can choose one option only to extend user subscription duration.

              </Typography>
              
              </Typography>

        </Box>

        <Box sx={{ typography: 'body1' }}>

        <TabContext value={value}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        <TabList 
        onChange={handleChange} 
        value={value}
        aria-label="lab API tabs"
        sx={{
          fontWeight: 500,
          color: app.is_dark_theme ? 'primary.light' : 'primary.dark',
        }}
        >

            <Tab label="Activation Code" value="1" />
            <Tab label="Username" value="2" />

          </TabList>

        </Box>

        <TabPanel value="1">

        <TextField fullWidth label='Enter activation code' variant='outlined' />
        <Box marginTop='10px' display="flex" justifyContent="flex-end">
          <LoadingButton variant="text" endIcon={<NavigateNextIcon />}>
            <Typography sx={{ fontWeight: 500 }}>
              Next
              </Typography>
              </LoadingButton>
              </Box>
              </TabPanel>


        <TabPanel value="2">

        <TextField fullWidth label='Enter username' variant='outlined' />
        <Box marginTop='10px' display="flex" justifyContent="flex-end">
          <LoadingButton variant="text" endIcon={<NavigateNextIcon />}>
            <Typography sx={{ fontWeight: 500 }}>
              Next
              </Typography>
              </LoadingButton>
              </Box>

        </TabPanel>

      </TabContext>
        
          </Box>
          
        </Paper>
      </Grid>
    </Box>

  )
}

export default React.memo(ViewExtendSubscription);
