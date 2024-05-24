import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const UserStatisticsChart = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Nombre d\'utilisateurs ajoutés',
        data: data,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      }
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { 
        title: { display: true, text: 'Date' },
        ticks: {
          maxTicksLimit: 10,
        }
      },
      y: { 
        title: { display: true, text: 'Nombre d\'utilisateurs' }, 
        beginAtZero: true 
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Nombre d\'utilisateurs ajoutés au fil du temps',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default UserStatisticsChart;
