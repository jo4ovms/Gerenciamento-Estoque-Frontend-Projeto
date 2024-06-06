import React, { useState, useEffect } from 'react';
import { Stack, Typography, Avatar, Fab, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconAlertTriangle, IconCheck, IconBox } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import ProdutoService from '../../../services/produto.service';

const StockOverview = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState(0);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = () => {
    ProdutoService.getAll()
      .then(response => {
        const produtos = response.data;
        const total = produtos.length;
        const lowStock = produtos.filter(produto => produto.quantidade > 0 && produto.quantidade < 5).length;
        const outOfStock = produtos.filter(produto => produto.quantidade === 0).length;
        setTotalItems(total);
        setLowStockItems(lowStock);
        setOutOfStockItems(outOfStock);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const theme = useTheme();
  const errorlight = '#fdede8';
  const warninglight = '#fff8e1';
  const successlight = '#e8f5e9';

  return (
    <DashboardCard
      title="Visão Geral do Estoque"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconBox width={24} />
        </Fab>
      }
      sx={{ height: '248px', width: '103%', maxWidth: '650px' }} // Ajuste a largura e altura aqui
    >
      <>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="700" mt="-10px">
            {totalItems} Itens
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Total em Estoque
          </Typography>
        </Box>
        <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: warninglight, width: 40, height: 40, mr: 2 }}>
              <IconAlertTriangle width={24} color={theme.palette.warning.main} />
            </Avatar>
            <Box>
              <Typography variant="h5">{lowStockItems}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Baixo Estoque
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: errorlight, width: 40, height: 40, mr: 2 }}>
              <IconAlertTriangle width={24} color={theme.palette.error.main} />
            </Avatar>
            <Box>
              <Typography variant="h5">{outOfStockItems}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Fora de Estoque
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 40, height: 40, mr: 2 }}>
              <IconCheck width={24} color={theme.palette.success.main} />
            </Avatar>
            <Box>
              <Typography variant="h5">{totalItems - lowStockItems - outOfStockItems}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Estoque Adequado
              </Typography>
            </Box>
          </Box>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default StockOverview;
