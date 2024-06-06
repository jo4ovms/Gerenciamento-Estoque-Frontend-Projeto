import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import ProdutoService from '../../services/produto.service';

const ProdutosAdequados = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    retrieveProdutosAdequados();
  }, []);

  const retrieveProdutosAdequados = () => {
    ProdutoService.getAdequados()
      .then(response => {
        setProdutos(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="700" mb={3}>
        Produtos com Estoque Adequado
      </Typography>
      <Grid container spacing={2}>
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
    </Box>
  );
};

export default ProdutosAdequados;
