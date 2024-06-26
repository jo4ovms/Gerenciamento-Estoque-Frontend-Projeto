import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import ProdutoService from '../../services/produto.service';

const ProdutosAdequados = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    retrieveProdutosAdequados();
  }, []);

  const retrieveProdutosAdequados = () => {
    ProdutoService.getAdequados()
      .then(response => setProdutos(response.data))
      .catch(console.log);
  };

  return (
    <DashboardCard title="Produtos com Estoque Adequado">
      <Grid container spacing={-5}>
        {produtos.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            Nenhum produto com estoque adequado.
          </Typography>
        ) : (
          produtos.map((produto) => (
            <Grid item xs={12} key={produto.id}>
              <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px" border="1px solid #ccc" borderRadius="8px">
                <Typography variant="subtitle2">{produto.nome}</Typography>
                <Typography variant="subtitle2" color="textSecondary">Quantidade: {produto.quantidade}</Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </DashboardCard>
  );
};

export default ProdutosAdequados;
