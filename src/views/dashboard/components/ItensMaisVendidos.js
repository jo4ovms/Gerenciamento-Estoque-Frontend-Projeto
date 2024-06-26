import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Fab,
  Box,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';
import { IconArrowRight } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import VendaService from '../../../services/venda.service';

const ItensMaisVendidos = ({ sx }) => {
  const [itensMaisVendidos, setItensMaisVendidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItensMaisVendidos();
  }, []);

  const fetchItensMaisVendidos = () => {
    VendaService.getItensMaisVendidos()
      .then((response) => setItensMaisVendidos(response.data.slice(0, 8)))
      .catch(console.log);
  };

  const handleViewAllClick = () => navigate('/produtos/mais-vendidos');

  return (
    <DashboardCard
      title="Itens Mais Vendidos"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }} onClick={handleViewAllClick}>
          <IconArrowRight width={24} />
        </Fab>
      }
      sx={{ height: '600px', width: '100%', maxWidth: '800px', ...sx }}
    >
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        {itensMaisVendidos.length > 0 ? (
          <Table aria-label="tabela de itens mais vendidos" sx={{ whiteSpace: 'nowrap', mt: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Produto
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Quantidade Vendida
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itensMaisVendidos.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
                      {item.produto}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">{item.quantidade}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>Nenhum produto vendido.</Typography>
        )}
      </Box>
    </DashboardCard>
  );
};

export default ItensMaisVendidos;
