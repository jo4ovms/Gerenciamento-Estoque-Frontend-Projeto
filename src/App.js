import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, Snackbar, Box, Typography } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { baselightTheme } from "./theme/DefaultColors";
import AuthService from './services/auth.service';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const [showReloginMessage, setShowReloginMessage] = useState(false);

  useEffect(() => {
    // Função para verificar se o token expirou
    const checkTokenExpiration = () => {
      const user = AuthService.getCurrentUser();
      if (user && user.accessToken) {
        const tokenExpirationDate = new Date(user.tokenExpirationDate);
        const now = new Date();

        if (tokenExpirationDate < now) {
          setShowReloginMessage(true);
        }
      }
    };

    // Verificar a expiração do token a cada minuto
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseSnackbar = () => {
    setShowReloginMessage(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
      <Snackbar
        open={showReloginMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box>
          <Typography color="error">Sua sessão expirou. Por favor, relogue.</Typography>
        </Box>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
