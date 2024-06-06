import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import ProdutoService from '../../../services/produto.service';

const SalesOverview = () => {
  const [month, setMonth] = useState('1');
  const [salesData, setSalesData] = useState([]);
  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  useEffect(() => {
    // Simulação de dados de vendas, idealmente buscar da API
    const fetchData = async () => {
      try {
        const response = await ProdutoService.getSalesData(month); // Adicione este método ao ProdutoService
        setSalesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [month]);

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 400, // Aumentar a altura do gráfico aqui
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: salesData.map(data => data.date),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    {
      name: 'Vendas',
      data: salesData.map(data => data.sales),
    },
  ];

  return (
    <DashboardCard title="Visão Geral de Vendas" action={
      <Select
        labelId="month-dd"
        id="month-dd"
        value={month}
        size="small"
        onChange={handleChange}
      >
        <MenuItem value={1}>Março 2023</MenuItem>
        <MenuItem value={2}>Abril 2023</MenuItem>
        <MenuItem value={3}>Maio 2023</MenuItem>
      </Select>
    }>
      <div style={{ height: '423px' }}> {/* Ajuste a altura aqui */}
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height="100%" // Garantir que o gráfico preencha 100% da altura do contêiner
        />
      </div>
    </DashboardCard>
  );
};

export default SalesOverview;
