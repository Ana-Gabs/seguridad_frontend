import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, Button, Box, Typography } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
      const checkTokenExpiration = () => {
          const token = localStorage.getItem('token');
          const tokenExpiration = localStorage.getItem('tokenExpiration');
  
          if (!token || (tokenExpiration && Date.now() > parseInt(tokenExpiration, 10))) {
              setOpenSnackbar(true);
              localStorage.removeItem('token');
              localStorage.removeItem('tokenExpiration');
  
              setTimeout(() => {
                  navigate('/login');
              }, 2000);
          }
      };
  
      checkTokenExpiration();
      const interval = setInterval(checkTokenExpiration, 5000);
      return () => clearInterval(interval);
  }, [navigate]);
  

    return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4">Bienvenido al Home</Typography>
            <Button variant="contained" color="secondary" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                navigate('/login');
            }}>
                Cerrar sesión
            </Button>

            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
                    Tu sesión ha expirado, serás redirigido al Login.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Home;
