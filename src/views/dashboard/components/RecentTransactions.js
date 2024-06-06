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
import { Typography } from '@mui/material';
import LogService from '../../../services/log.service';
import '../../../styles/RecentTransactions.css'; // Importando o arquivo CSS

const RecentTransactions = () => {
  const [logs, setLogs] = useState([]);

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

  const getDotColor = (action) => {
    switch (action) {
      case 'CREATE':
        return 'primary';
      case 'UPDATE':
        return 'warning';
      case 'DELETE':
        return 'error';
      default:
        return 'grey';
    }
  };

  return (
    <DashboardCard 
      title="Atividades Recentes"
      sx={{ height: '480px', width: '100%', maxWidth: '600px', overflowY: 'auto' }} // Ajuste a largura e altura aqui
    >
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: '-40px',
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
          <TimelineItem key={index}>
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
              <Typography variant="subtitle2" fontWeight="600">{log.entity}</Typography>
              <Typography variant="body2">{log.action}</Typography>
              <Typography variant="body2">{log.details}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentTransactions;
