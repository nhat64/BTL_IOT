import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import 'chart.js/auto';

const WeatherChartB = (props) => {

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
                    text: 'Bụi (ppm)'
                },
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
    };

    return (
        <CDBContainer>
            <h3 style={{ textAlign: 'center' }} > Biểu đồ Bụi</h3>
            <Line data={props.chartBuiData} options={options} />
        </CDBContainer>
    );
};

export default WeatherChartB;


