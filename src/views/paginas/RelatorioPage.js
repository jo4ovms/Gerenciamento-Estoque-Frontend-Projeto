import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Collapse } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import LogService from '../../services/log.service';
import VendaService from '../../services/venda.service';

const RelatorioPage = () => {
  const [logs, setLogs] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [expandedLogId, setExpandedLogId] = useState(null);

  useEffect(() => {
    retrieveLogs();
    retrieveVendas();
  }, []);

  const retrieveLogs = () => {
    LogService.getAll()
      .then(response => {
        const sortedLogs = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(sortedLogs);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveVendas = () => {
    VendaService.getAll()
      .then(response => {
        const sortedVendas = response.data.sort((a, b) => new Date(b.dataVenda) - new Date(a.dataVenda));
        setVendas(sortedVendas);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleToggleExpand = (logId) => {
    setExpandedLogId(expandedLogId === logId ? null : logId);
  };

  return (
    <PageContainer title="Relatórios" description="Página de relatórios">
      <DashboardCard title="Relatórios de Atividades">
        {logs.map(log => (
          <Box key={log.id} display="flex" flexDirection="column" p={2} borderBottom="1px solid #ccc">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6">{log.entity}</Typography>
                <Typography variant="body2">{log.action}</Typography>
                <Typography variant="body2">{new Date(log.timestamp).toLocaleString()}</Typography>
              </Box>
              <Box>
                <Button variant="outlined" color="primary" onClick={() => handleToggleExpand(log.id)}>
                  Ver Detalhes
                </Button>
              </Box>
            </Box>
            <Collapse in={expandedLogId === log.id}>
              <Box mt={2}>
                <Typography variant="body2">{log.details}</Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
        {vendas.map(venda => (
          <Box key={venda.id} display="flex" flexDirection="column" p={2} borderBottom="1px solid #ccc">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6">Venda</Typography>
                <Typography variant="body2">Produto ID: {venda.produtoId}</Typography>
                <Typography variant="body2">Quantidade: {venda.quantidade}</Typography>
                <Typography variant="body2">{new Date(venda.dataVenda).toLocaleString()}</Typography>
              </Box>
              <Box>
                <Button variant="outlined" color="primary" onClick={() => handleToggleExpand(venda.id)}>
                  Ver Detalhes
                </Button>
              </Box>
            </Box>
            <Collapse in={expandedLogId === venda.id}>
              <Box mt={2}>
                <Typography variant="body2">ID da Venda: {venda.id}</Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
      </DashboardCard>
    </PageContainer>
  );
};

export default RelatorioPage;
