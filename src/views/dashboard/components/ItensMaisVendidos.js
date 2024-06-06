import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Fab
} from '@mui/material';
import { IconArrowRight } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
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
      .then(response => {
        setItensMaisVendidos(response.data.slice(0, 5)); // Limitar a 5 produtos
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleViewAllClick = () => {
    navigate('/produtos/mais-vendidos');
  };

  return (
    <DashboardCard
      title="Itens Mais Vendidos"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }} onClick={handleViewAllClick}>
          <IconArrowRight width={24} />
        </Fab>
      }
      sx={sx}
    >
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="tabela de itens mais vendidos"
          sx={{
            whiteSpace: "nowrap",
            mt: 2
          }}
        >
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
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
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
      </Box>
    </DashboardCard>
  );
};

export default ItensMaisVendidos;
