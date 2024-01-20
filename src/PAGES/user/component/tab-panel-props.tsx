import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabList } from '@mui/lab';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const { app } = useSelector((state: any) => state);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'transparent', width:500}}>
      <AppBar position="static" sx={{ bgcolor: 'transparent' }}>
      <Tabs
       value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor='inherit'
        aria-label="User Tabs"
        sx={{
          color: app.is_dark_theme ? 'primary.light' : 'primary.dark',
        }}
        >
          <Tab label="Profile" {...a11yProps(0)} sx={{mx:'20px', textTransform: 'none'}}/>
          <Tab label="Progress" {...a11yProps(1)} sx={{marginRight: '20px', textTransform: 'none'}}/>
          <Tab label="Classes" {...a11yProps(2)} sx={{ marginRight: '20px', textTransform: 'none'}}/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >


        <TabPanel value={value} index={0} dir={theme.direction}>
          <Paper sx={{padding: 2}}>
            <Box>
              <Typography fontWeight={500}>
              Expiry Information
              </Typography>
            </Box>
          </Paper>
        </TabPanel>


        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>


        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>


      </SwipeableViews>
    </Box>
  );
}