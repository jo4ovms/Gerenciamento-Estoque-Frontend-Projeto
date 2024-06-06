import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Collapse, TextField, Grid, Snackbar } from '@mui/material';
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
        const sortedLogs = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(sortedLogs);
      })
      .catch(e => {
        console.log(e);
        setErrorMessage('Erro ao recuperar logs.');
      });
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
        const sortedLogs = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(sortedLogs);
        setSuccessMessage('Logs filtrados com sucesso.');
      })
      .catch(e => {
        console.log(e);
        setErrorMessage('Erro ao filtrar logs.');
      });
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
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Data Início"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Data Fim"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
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
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Box>
            <Typography color="error">{errorMessage}</Typography>
          </Box>
        </Snackbar>
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Box>
            <Typography color="success">{successMessage}</Typography>
          </Box>
        </Snackbar>
      </DashboardCard>
    </PageContainer>
  );
};

export default RelatorioPage;
