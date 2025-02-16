import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
/* paginas */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
/*---------------------------------------------*/
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
