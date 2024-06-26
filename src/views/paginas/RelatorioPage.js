import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, Snackbar, SnackbarContent, Typography, Collapse } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from 'date-fns/locale';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import LogService from '../../services/log.service';

const RelatorioPage = () => {
  const [logs, setLogs] = useState([]);
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    retrieveLogs();
  }, []);

  const retrieveLogs = () => {
    LogService.getAll()
      .then(response => {
        setLogs(response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      })
      .catch(() => setErrorMessage('Erro ao recuperar logs.'));
  };

  const handleDateChange = () => {
    if (!startDate) {
      setErrorMessage('Por favor, selecione a data de início.');
      return;
    }

    const start = startDate.toISOString().split('T')[0];
    const end = endDate ? endDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    LogService.getByDate(start, end)
      .then(response => {
        setLogs(response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        setSuccessMessage('Logs filtrados com sucesso.');
      })
      .catch(() => setErrorMessage('Erro ao filtrar logs.'));
  };

  const handleToggleExpand = (logId) => {
    setExpandedLogId(expandedLogId === logId ? null : logId);
  };

  const handleCloseSnackbar = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <PageContainer title="Relatórios" description="Página de relatórios">
      <DashboardCard title="Relatórios de Atividades">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Data Início"
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Data Fim"
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleDateChange}>
                Filtrar
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
        <Box mt={2}>
          {logs.length > 0 ? (
            logs.map(log => (
              <Box key={log.id} display="flex" flexDirection="column" p={2} borderBottom="1px solid #ccc">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6">{log.entity}</Typography>
                    <Typography variant="body2">{log.action}</Typography>
                    <Typography variant="body2">{new Date(log.timestamp).toLocaleString()}</Typography>
                  </Box>
                  <Button variant="outlined" color="primary" onClick={() => handleToggleExpand(log.id)}>
                    Ver Detalhes
                  </Button>
                </Box>
                <Collapse in={expandedLogId === log.id}>
                  <Box mt={2}>
                    {log.details.split(';').map((detail, index) => (
                      <Typography key={index} variant="body2">
                        {detail.trim()}
                      </Typography>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            ))
          ) : (
            <Typography variant="h7">Nenhum log registrado ainda.</Typography>
          )}
        </Box>
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <SnackbarContent message={errorMessage} style={{ backgroundColor: 'red' }} />
        </Snackbar>
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <SnackbarContent message={successMessage} style={{ backgroundColor: 'green' }} />
        </Snackbar>
      </DashboardCard>
    </PageContainer>
  );
};

export default RelatorioPage;
