import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import ProdutosAbaixoQuantidadeSegura from './components/ProdutosAbaixoQuantidadeSegura';
import RecentTransactions from './components/RecentTransactions';
import ItensMaisVendidos from './components/ItensMaisVendidos';
import StockOverview from './components/StockOverview';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={7}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ProdutosAbaixoQuantidadeSegura />
              </Grid>
              <Grid item xs={15}>
                <StockOverview />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ItensMaisVendidos sx={{ height: '480px', width: '100%' }} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
