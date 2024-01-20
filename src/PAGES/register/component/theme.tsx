import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

const studentTheme = createTheme({
  palette: {
    primary: {
      main: '#0197D6',

    },
    // Add other theme configurations specific to the student theme
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily:'Outfit, san-serif'
  }
  // Add other theme configurations if needed
});

const parentTheme = createTheme({
  palette: {
    primary: {
      main: '#9C27B0',
    },
    // Add other theme configurations specific to the parent theme
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily:'Outfit, san-serif'
  }
  // Add other theme configurations if needed
});

const tutorTheme = createTheme({
  palette: {
    primary: {
      main: '#2DA2A4',
    },
    // Add other theme configurations specific to the tutor theme
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily:'Outfit, san-serif'
  }
  // Add other theme configurations if needed
});



export { studentTheme, parentTheme, tutorTheme };
