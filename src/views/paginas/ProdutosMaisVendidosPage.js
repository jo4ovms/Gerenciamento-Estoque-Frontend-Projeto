import React, { useState, useEffect } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import VendaService from '../../services/venda.service';

const ProdutosMaisVendidosPage = () => {
  const [itensMaisVendidos, setItensMaisVendidos] = useState([]);

  useEffect(() => {
    fetchItensMaisVendidos();
  }, []);

  const fetchItensMaisVendidos = () => {
    VendaService.getItensMaisVendidos()
      .then(response => setItensMaisVendidos(response.data))
      .catch(console.log);
  };

  return (
    <PageContainer title="Produtos Mais Vendidos" description="Página de produtos mais vendidos">
      <DashboardCard title="Produtos Mais Vendidos">
        <Box sx={{ overflow: 'auto', width: '100%' }}>
          {itensMaisVendidos.length > 0 ? (
            <Table
              aria-label="tabela de produtos mais vendidos"
              sx={{ whiteSpace: "nowrap", mt: 2 }}
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
                      <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
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
            <Typography variant="body2" sx={{ mt: 2 }}>Nenhum produto vendido ainda.</Typography>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProdutosMaisVendidosPage;
