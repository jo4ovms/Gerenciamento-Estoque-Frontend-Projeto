import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Avatar, Fab, Box } from '@mui/material';
import { IconAlertTriangle } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import ProdutoService from '../../../services/produto.service';

const ProdutosAbaixoQuantidadeSegura = () => {
  const [produtos, setProdutos] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
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

  const handleProductClick = (produtoId) => {
    navigate(`/produtos/${produtoId}/edit`);
  };

  const handleViewAllClick = () => {
    navigate('/produtos/abaixo-da-quantidade-segura');
  };

  return (
    <DashboardCard
      title="Produtos Acabando!"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }} onClick={handleViewAllClick}>
          <IconAlertTriangle width={24} />
        </Fab>
      }
      sx={{ height: '282px', width: '125%', maxWidth: '600px' }} // Ajuste a largura e altura aqui
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
        <Typography variant="h4" fontWeight="700" mb={1}>
          {produtos.length} Produtos
        </Typography>
        <Grid container spacing={2} style={{ overflowY: 'auto', maxHeight: '300px' }}>
          {produtos.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              Nenhum produto abaixo da quantidade segura.
            </Typography>
          ) : (
            produtos.map((produto) => (
              <Grid item xs={12} key={produto.id} onClick={() => handleProductClick(produto.id)} style={{ cursor: 'pointer' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px" border={`1px solid ${theme.palette.divider}`} borderRadius="8px" mb={1}>
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
      </Box>
    </DashboardCard>
  );
};

export default ProdutosAbaixoQuantidadeSegura;
