import React from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import ProdutosAbaixoQuantidadeSegura from './components/ProdutosAbaixoQuantidadeSegura';
import RecentTransactions from './components/RecentTransactions';
import ItensMaisVendidos from './components/ItensMaisVendidos';
import StockOverview from './components/StockOverview';

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          minHeight: '100vh', 
          padding: isSmallScreen ? theme.spacing(2) : theme.spacing(8),
        }}
      >
        <Grid container spacing={1} maxWidth={isSmallScreen ? '100%' : '100%'}>
          <Grid item xs={12} sm={15} lg={7}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={15} lg={12}>
                <ProdutosAbaixoQuantidadeSegura />
              </Grid>
              <Grid item xs={12} sm={15} lg={12}>
                <StockOverview />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={10} lg={4}>
            <RecentTransactions
              sx={{
                padding: isSmallScreen ? theme.spacing(1) : theme.spacing(2),
                backgroundColor: isSmallScreen ? 'lightgray' : 'white',
                border: isSmallScreen ? '1px solid #ccc' : 'none',
                height: isSmallScreen ? '200px' : 'auto', 
                width: isSmallScreen ? '100%' : 'auto', 
              }}
            />
          </Grid>
          <Grid item xs={12} sm={10} lg={8}>
            <ItensMaisVendidos
              sx={{
                height: '600px',
                width: isSmallScreen ? '100%' : '115.5%',
                mt: { xs: 2, lg: 0 },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
