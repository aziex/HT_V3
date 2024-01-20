import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Link, Tab, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormRegister from './component/form';
import img_student_default from '../../ASSETS/img-student.png';
import img_student_small from '../../ASSETS/img-student-2.png';
import img_tutor_default from '../../ASSETS/img-tutor.png';
import img_tutor_small from '../../ASSETS/img-tutor-2.png';
import img_parent_default from '../../ASSETS/img-parent.png';
import img_parent_small from '../../ASSETS/img-parent-2.png';
import LanguageIcon from '@mui/icons-material/Language';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SchoolIcon from '@mui/icons-material/School';
import xcelearn from '../../ASSETS/xcelearn-logo.png';
import { studentTheme, parentTheme, tutorTheme } from './component/theme'; // Import the themes
import { NavLink } from 'react-router-dom';


const SignUpPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  // Retrieve the last selected tab value from local storage, or default to '1'
  const storedValue = localStorage.getItem('seletedTab')

  const [value, setValue] = React.useState(storedValue || 'student');

  useEffect(() => {

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768); // Change this threshold as needed
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };

    // Store the selected tab value in local storage when it changes
    localStorage.setItem('selectedTab', value);
}, [value])

interface Images {
    [key: string]: string;
    student: string;
    parent: string;
    tutor: string;
  }  

const images:Images = {
    student: isMobileView ? img_student_small : img_student_default,
    parent: isMobileView ? img_parent_small : img_parent_default,
    tutor: isMobileView ? img_tutor_small : img_tutor_default,
};

const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
};

interface ThemeColor {
    [key: string]: string;
    student: string;
    parent: string;
    tutor: string;
  }

const themeColor:ThemeColor = {
    student: "#0197D6",
    parent: "#9C27B0",
    tutor: "#2DA2A4"
}

  function getTheme(role: keyof typeof themeColor) {
    switch (role) {
        case 'student':
            return studentTheme;
        case 'parent':
            return parentTheme;
         case 'tutor':
            return tutorTheme;
        default:
            return studentTheme;
    }
}

const tabStyle = (color: string) => ({
    '&.Mui-selected': {
        color: color,
        '.MuiTabs-indicator': {
            backgroundColor: color
        }
    }
});


return (
  <ThemeProvider theme={getTheme(value)}> 
  <Grid container style={{ minHeight: '100vh', overflowY: 'hidden'
}}>

  {/* Left side: Image */}
  <Grid item xs={12} sm={6}>
      
      {/* Button at the top right */}
      <Box
          position="absolute"
          top="30px"
          right="70px"
          marginBottom="50px"
          display="flex"
          alignItems="center"
          zIndex={1}
      >
          <LanguageIcon fontSize='small'/>

          <Typography sx={{ marginLeft:'10px',  marginRight: '15px', fontSize: '14px' }}>
              English
          </Typography>
          <Button
        onClick={() =>('/register')}
        variant='outlined'
        sx={{
          backgroundColor: '#FFF',
          color: '#14171A',
          borderRadius: '50px',
          padding: '12px',
          fontSize: '12px',
          width: '88px',
          height: '37px',
          border: '1px solid #0F6CA7',
          fontWeight:900,
          borderColor:'#0197D6'
        }}
        component={NavLink}
        to='/login'
      >
        
        SIGN IN
      </Button> 
      </Box>
  <Box style={{ position: 'relative', height: '100vh' }}>
  <Box
          position="absolute"
          top="10px"
          left="20px"
          zIndex={1} // Ensure it's above the image
      >
        <img src={xcelearn} style={{ height: 'auto', maxWidth: '170px', marginTop:'20px', marginLeft: '25px'}} />
      </Box>
      <img
          src={images[value]}
          alt="Image"
          style={{
              objectFit: 'cover', // To cover the entire space
              width: '100%', // Adjust to your desired width
              height: '100%', // Full-page view
          }}
      />
  </Box>
  </Grid>
    
    {/* Right side: Form */}
    <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
    <Box style={{ 
        flex: 6, 
        position: 'relative', 
        maxWidth: '450px', // Adjust the width as needed
        margin: '0 auto',
        }}>
        
        <Box marginTop={8}>
        <TabContext value={value}>
            <Box 
            marginX='70px'
            maxWidth='325px'
            sx={{
              borderBottom: 0, 
              borderColor: 'transparent', 
              backgroundColor:'#F0F0F0',
              borderRadius: '30px',
              paddingY: 0.5
              }} >
                <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs"
                    sx={{
                      height:'10px',
                      bgcolor: 'transparent',
                      '& .Mui-selected': {
                        color: '#FFFFFF !important',
                        backgroundColor: themeColor[value], // Set the background color
                        borderRadius: '30px',
                        fontSize: '14px', // Adjust font size
                      },
                      "& .MuiTabs-indicator": {
                        display: "none",
                      }
                  }}
                    centered>
                <Tab 
                value="student" 
                label= {
                  <Box display='flex' alignItems='center' >
                    <LocalLibraryIcon fontSize='small' />
                    <span style={{marginLeft:'5px'}}> Student </span>
                  </Box>
                } 
                style={{fontWeight:'bold', textTransform: 'none'}}
                />
                <Tab 
                value="parent" 
                label={
                  <Box display='flex' alignItems='center' >
                    <Diversity1Icon fontSize='small' />
                    <span style={{marginLeft:'5px'}}> Parent </span>
                  </Box>
                } 
                style={{fontWeight:'bold', textTransform: 'none'}}/>
                <Tab 
                value="tutor" 
                label={
                  <Box display='flex' alignItems='center' >
                    <SchoolIcon fontSize='small' />
                    <span style={{marginLeft:'5px'}}> Tutor </span>
                  </Box>
                }
                style={{fontWeight:'bold', textTransform: 'none'}}/>
                </TabList>
            </Box>

            <TabPanel value="student" sx={{maxWidth:'500px', marginTop:1}} style={{justifyContent: 'center', alignItems: 'center', }}>
                <FormRegister />
                
            </TabPanel>

            <TabPanel value="parent" sx={{maxWidth:'500px', marginTop:1}} style={{ justifyContent: 'center', alignItems: 'center'}}>
                <FormRegister />
            </TabPanel>

            <TabPanel value="tutor" sx={{maxWidth:'500px', marginTop:1}} style={{ justifyContent: 'center', alignItems: 'center'}}>
                <FormRegister />
            </TabPanel>
           
        </TabContext>
        </Box>

        <Box textAlign="center" my="20px">
        <Typography variant='subtitle2' fontWeight="bold"> 
        Already have an account?&nbsp;
      <Typography sx={{
                    textDecoration:'none',
                  }} 
                color= {themeColor[value]}
                variant='subtitle2'
                fontWeight= '600'
                component={NavLink}
                to='/login'
              >
                Sign In
                  </Typography>
        </Typography>
        </Box>

        <Box textAlign="center" marginTop="30px">
        <Typography variant='caption' sx = {{ borderColor: 'transparent'}}> 
        By signing up, I accept HomeTutor's&nbsp;
        <Link
        color="#14171A"
        fontStyle="bold"
        >
        Terms & Condition
      </Link>
        </Typography>
        </Box>
    </Box>
</Grid>
</Grid>
</ThemeProvider>
  );
}

export default SignUpPage;
