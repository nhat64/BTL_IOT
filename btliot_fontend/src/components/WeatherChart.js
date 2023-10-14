import React from 'react';
import { Line } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import 'chart.js/auto';

const WeatherChart = (props) => {
  
  // Cấu hình cho biểu đồ
  const options = {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    responsive: true,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Độ ẩm ( % ) - Nhiệt độ ( °C )'
        },
        suggestedMin: 0,
        suggestedMax: 100
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Ánh sáng ( lux )'
        },
        suggestedMin: 0,
        suggestedMax: 1000,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <CDBContainer>
      <h3 style={{ textAlign: 'center' }} > Biểu đồ </h3>
      <Line data={props.chartData} options={options} />
    </CDBContainer>
  );
};

export default WeatherChart;