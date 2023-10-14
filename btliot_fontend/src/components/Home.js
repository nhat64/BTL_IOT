import { useNavigate } from 'react-router-dom';
import '../css/demo.scss'
import Card from './Card';
import Led from './Led';
import WeatherChart from './WeatherChart';
import Wing from './Wing';

import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import WeatherChartB from './WeatherChartB';

const Home = () => {

    const navigate = useNavigate();
    const [ledData, setLedData] = useState(
        {
            "led_1": 1,
            "led_2": 1,
            "isChanged": null
        }
    )
    const [dhtData, setDhtData] = useState(
        {
            "id": 0,
            "temperature": 0,
            "humidity": 0,
            "light": 0,
            "bui": 0,
            "timeData": "2023-09-28 13:36:11"
        }
    )
    const [chartData, setChartData] = useState(
        {
            labels: ['lable 1', 'lable 2', 'lable 3', 'lable 4', 'lable 5', 'lable 6', 'lable 7', 'lable 8'],
            datasets: [
                {
                    label: 'Độ ẩm',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: 'blue',
                    backgroundColor: 'rgba(80, 176, 214, 0.2)',
                    yAxisID: 'y',
                    fill: true
                },
                {
                    label: 'Nhiệt độ',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: 'red',
                    backgroundColor: 'rgba(233, 11, 90, 0.2)',
                    yAxisID: 'y',
                    fill: true
                },
                {
                    label: 'Ánh sáng',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: 'yellow',
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    yAxisID: 'y1',
                    fill: true
                }
            ]
        }
    );
    const setDataForChart = (data) => {
        setChartData(chartData => {
            const newLabels = [...chartData.labels.slice(1), data.timeData];

            const newDatasets = chartData.datasets.map(dataset => {
                let newData;
                switch (dataset.label) {
                    case "Nhiệt độ":
                        newData = [...dataset.data.slice(1), data.temperature];
                        break;
                    case "Độ ẩm":
                        newData = [...dataset.data.slice(1), data.humidity];
                        break;
                    case "Ánh sáng":
                        newData = [...dataset.data.slice(1), data.light];
                        break;
                    default:
                        newData = dataset.data;
                }
                return { ...dataset, data: newData };
            });

            return { ...chartData, labels: newLabels, datasets: newDatasets };
        });
    };
    //////////////////////////////////////////
    const [chartBuiData, setChartBuiData] = useState(
        {
            labels: ['lable 1', 'lable 2', 'lable 3', 'lable 4', 'lable 5', 'lable 6', 'lable 7', 'lable 8'],
            datasets: [
                {
                    label: 'Bụi',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: 'blue',
                    backgroundColor: 'rgba(80, 176, 214, 0.2)',
                    yAxisID: 'y',
                    fill: true
                }
            ]
        }
    );
    const setBuiDataForChart = (data) => {
        setChartBuiData(chartBuiData => {
            const newLabels = [...chartBuiData.labels.slice(1), data.timeData];

            const newDatasets = chartBuiData.datasets.map(dataset => {
                let newData;
                newData = [...dataset.data.slice(1), data.bui]
                return { ...dataset, data: newData };
            });

            return { ...chartBuiData, labels: newLabels, datasets: newDatasets };
        });
    };
    //////////////////////////////////////////
    useEffect(() => {
        // kết nối và sub websocket
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        client.connect({}, () => {

            client.subscribe('/topic/dht', message => {
                const receivedMessage = JSON.parse(message.body);
                setDataForChart(receivedMessage);
                setBuiDataForChart(receivedMessage);
                setDhtData(receivedMessage);
            })

            client.subscribe('/topic/led', message => {
                const receivedMessage = JSON.parse(message.body);
                setLedData(receivedMessage);
            })

        });
        return () => {
            // ngắt kết nối websocket
            client.disconnect();
        };
    }, []);


    return(
        <div className="home">
            <div className='bar'>
                <div className='profile barItem' onClick={() => { navigate('/profile') }}>
                    <i className="fa-solid fa-user"></i>
                    <span>Profile</span>
                </div>
                <div className='profile barItem' onClick={() => { navigate('/data') }}>
                    <i className="fa-solid fa-database"></i>
                    <span>Data</span>
                </div>
                <div className='profile barItem' onClick={() => { navigate('/history') }}>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <span>History</span>
                </div>
            </div>

            <div className='main'>
                <div className='listCard'>
                    <Card myKey={0} value={dhtData.temperature} valueBui={dhtData.bui}/>
                    <Card myKey={1} value={dhtData.humidity} valueBui={dhtData.bui}/>
                    <Card myKey={2} value={dhtData.light} valueBui={dhtData.bui}/>
                    <Card myKey={3} value={dhtData.bui} valueBui={dhtData.bui}/>
                </div>
                <div className='grid'>
                    <div className='chart'>
                        <WeatherChart chartData={chartData}/>
                        <WeatherChartB chartBuiData={chartBuiData}/>
                    </div>
                    <div className='actions'>
                        <Led ledData={ledData} setLedData={setLedData}/>
                        <Wing ledData={ledData} setLedData={setLedData}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;