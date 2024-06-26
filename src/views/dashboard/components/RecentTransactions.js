import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography, Fab, Box } from '@mui/material';
import { IconArrowRight } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import LogService from '../../../services/log.service';
import '../../../styles/RecentTransactions.css';

const RecentTransactions = () => {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    retrieveLogs();
  }, []);

  const retrieveLogs = () => {
    LogService.getAll()
      .then((response) => {
        const sortedLogs = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
        setLogs(sortedLogs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getDotColor = (action) => {
    switch (action) {
      case 'CREATE':
        return 'primary';
      case 'UPDATE':
        return 'warning';
      case 'DELETE':
        return 'error';
      case 'VENDIDO':
        return 'success';
      default:
        return 'grey';
    }
  };

  const handleViewReportClick = () => {
    navigate('/relatorios');
  };

  return (
    <DashboardCard
      title="Atividades Recentes"
      action={
        <Fab
          color="secondary"
          size="medium"
          sx={{ color: '#ffffff' }}
          onClick={handleViewReportClick}
        >
          <IconArrowRight width={24} />
        </Fab>
      }
      sx={{ height: '600px', width: '100%', maxWidth: '600px', overflow: 'hidden' }}
    >
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&:hover': { overflowY: 'scroll' },
        }}
      >
        {logs.length > 0 ? (
          <Timeline
            className="theme-timeline"
            sx={{
              p: 0,
              mb: '-10px',
              '& .MuiTimelineConnector-root': {
                width: '1px',
                backgroundColor: '#efefef',
              },
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.5,
                paddingLeft: 0,
              },
            }}
          >
            {logs.slice(0, 5).map((log, index) => (
              <TimelineItem key={index} sx={{ mb: 2 }}>
                <TimelineOppositeContent sx={{ paddingRight: '12px' }}>
                  <Typography color="textSecondary" variant="body2">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={getDotColor(log.action)} variant="outlined" />
                  {index < logs.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ paddingLeft: '12px', paddingRight: '12px' }}>
                  <Typography variant="subtitle2" fontWeight="600">
                    {log.entity}
                  </Typography>
                  <Typography variant="body2">{log.action}</Typography>
                  <Typography variant="body2">{log.details}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Nenhuma atividade recente
          </Typography>
        )}
      </Box>
    </DashboardCard>
  );
};

export default RecentTransactions;
