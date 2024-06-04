import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Avatar, Fab, Box } from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import ProdutoService from '../../../services/produto.service';

const ProdutosAbaixoQuantidadeSegura = () => {
  const [produtos, setProdutos] = useState([]);
  const theme = useTheme();
  const errorlight = '#fdede8';
  const primary = theme.palette.primary.main;

  useEffect(() => {
    retrieveProdutosAbaixoDaQuantidadeSegura();
  }, []);

  const retrieveProdutosAbaixoDaQuantidadeSegura = () => {
    ProdutoService.getAbaixoDaQuantidadeSegura()
      .then(response => {
        setProdutos(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <DashboardCard
      title="Produtos em Falta"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconAlertTriangle width={24} />
        </Fab>
      }
    >
      <>
        <Typography variant="h4" fontWeight="700" mt="-20px" mb={2}>
          {produtos.length} Produtos
        </Typography>
        <Grid container spacing={2}>
          {produtos.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              Nenhum produto abaixo da quantidade segura.
            </Typography>
          ) : (
            produtos.map((produto) => (
              <Grid item xs={12} key={produto.id}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27, mr: 2 }}>
                      <IconAlertTriangle width={20} color={primary} />
                    </Avatar>
                    <Typography variant="subtitle2">{produto.nome}</Typography>
                  </Box>
                  <Typography variant="subtitle2" color="error">
                    Quantidade: {produto.quantidade}
                  </Typography>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </>
    </DashboardCard>
  );
};

export default ProdutosAbaixoQuantidadeSegura;
