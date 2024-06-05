import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Collapse } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import LogService from '../../services/log.service';

const RelatorioPage = () => {
  const [logs, setLogs] = useState([]);
  const [expandedLogId, setExpandedLogId] = useState(null);

  useEffect(() => {
    retrieveLogs();
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
      </DashboardCard>
    </PageContainer>
  );
};

export default RelatorioPage;
