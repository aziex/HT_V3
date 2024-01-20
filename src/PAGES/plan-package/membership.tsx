import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Link, Tab, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import img_student_default from '../../ASSETS/img-student.png';
import img_student_small from '../../ASSETS/img-student-2.png';
import img_tutor_default from '../../ASSETS/img-tutor.png';
import img_tutor_small from '../../ASSETS/img-tutor-2.png';
import img_parent_default from '../../ASSETS/img-parent.png';
import img_parent_small from '../../ASSETS/img-parent-2.png';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SchoolIcon from '@mui/icons-material/School';
import { yellow } from '@mui/material/colors';



const MembershipPlanPage = () => {
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

//   function getTheme(role: keyof typeof themeColor) {
//     switch (role) {
//         case 'student':
//             return studentTheme;
//         case 'parent':
//             return parentTheme;
//          case 'tutor':
//             return tutorTheme;
//         default:
//             return studentTheme;
//     }
// }

const tabStyle = (color: string) => ({
    '&.Mui-selected': {
        color: color,
        '.MuiTabs-indicator': {
            backgroundColor: color
        }
    }
});


return (
 
  <Grid container style={{ minHeight: '100vh', overflowY: 'hidden'
}}>
    
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
              // backgroundColor:'#F0F0F0',
              borderRadius: '30px',
              paddingY: 0.5
              }} >
                <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs"
                    sx={{
                      maxHeight:'82px',
                      bgcolor: 'transparent',
                      '& .Mui-selected': {
                        backgroundColor: '#F4F5F8', // Set the background color
                        WebkitBorderTopRightRadius: '10px',
                        WebkitBorderTopLeftRadius: '10px',
                      },
                      "& .MuiTabs-indicator": {
                        display: "none",
                      }
                  }}
                    centered>
                <Tab
                value="student" 
                label= {
                  <Box 
                  display='flex' 
                  alignItems='center' 
                  bgcolor='#000000'
                  sx={{ borderRadius:'10px'}}>
                    <Typography margin='5px' fontSize='12px' color='#FCC000'>
                      DELUXE 
                      </Typography>  
                           
                    </Box>
                } 
                style={{fontWeight:'bold', textTransform: 'none'}}
                />
                <Tab 
                value="parent" 
                label={
                  <Box display='flex' alignItems='center' >
                    <span style={{marginLeft:'5px'}}> Parent </span>
                  </Box>
                } 
                style={{fontWeight:'bold', textTransform: 'none'}}/>
                <Tab 
                value="tutor" 
                label={
                  <Box display='flex' alignItems='center' >
                    <span style={{marginLeft:'5px'}}> Tutor </span>
                  </Box>
                }
                style={{fontWeight:'bold', textTransform: 'none'}}/>
                </TabList>
            </Box>

            <TabPanel value="student" sx={{maxWidth:'500px', marginTop:1}} style={{justifyContent: 'center', alignItems: 'center', }}>
            </TabPanel>

            <TabPanel value="parent" sx={{maxWidth:'500px', marginTop:1}} style={{ justifyContent: 'center', alignItems: 'center'}}>
            </TabPanel>

            <TabPanel value="tutor" sx={{maxWidth:'500px', marginTop:1}} style={{ justifyContent: 'center', alignItems: 'center'}}>
            </TabPanel>
           
        </TabContext>
        </Box>
    </Box>
</Grid>

  );
}

export default MembershipPlanPage;
