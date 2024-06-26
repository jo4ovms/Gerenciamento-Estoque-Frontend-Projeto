import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProdutoService from '../../services/produto.service';

const ProdutosAbaixoQuantidadeSeguraPage = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    retrieveProdutosAbaixoDaQuantidadeSegura();
  }, []);

  const retrieveProdutosAbaixoDaQuantidadeSegura = () => {
    ProdutoService.getAbaixoDaQuantidadeSegura()
      .then(response => setProdutos(response.data))
      .catch(console.log);
  };

  const handleProductClick = (produtoId) => {
    navigate(`/produtos/${produtoId}/edit`);
  };

  return (
    <PageContainer title="Produtos Abaixo da Quantidade Segura" description="Página de produtos abaixo da quantidade segura">
      <DashboardCard title="Produtos Acabando!">
        <Grid container spacing={-5}>
          {produtos.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              Nenhum produto abaixo da quantidade segura.
            </Typography>
          ) : (
            produtos.map((produto) => (
              <Grid item xs={12} key={produto.id}>
                <Box display="flex" justifyContent="space-between" alignItems="center" onClick={() => handleProductClick(produto.id)}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: '#fdede8', width: 27, height: 27, mr: 2 }}>
                      <IconAlertTriangle width={20} color="#d32f2f" />
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
      </DashboardCard>
    </PageContainer>
  );
};

export default ProdutosAbaixoQuantidadeSeguraPage;
