import { useNavigate } from 'react-router-dom';
import '../css/table.scss'
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Data = () => {

    const navigate = useNavigate();

    const [datas, setDatas] = useState([]);
    // bien luu data da duoc loc
    const [datasFilter, setDatasFilter] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/data/all')
            .then(response => response.json())
            .then(data => {
                setDatas(data.reverse())
                setDatasFilter(data.reverse())
                console.log(datas)
            })
            .catch(err => console.log(err))
    }, [])

    // chuc nang loc theo nhiet do, do am, anh sang
    const [filterTemperature, setFilterTemperature] = useState('');
    const [filterHumidity, setFilterHumidity] = useState('');
    const [filterLight, setFilterLight] = useState('');

    const filterDatasByTemperature = (dataSet) => {
        return dataSet.filter(data => {
            return !filterTemperature || data.temperature === Number(filterTemperature)
        })
    }

    const filterDatasByHumidity = (dataSet) => {
        return dataSet.filter(data => {
            return !filterHumidity || data.humidity === Number(filterHumidity)
        })
    }

    const filterDatasByLight = (dataSet) => {
        return dataSet.filter(data => {
            return !filterLight || data.light === Number(filterLight)
        })
    }

    // chuc nang loc ngay gio
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filterDatasByDateTime = (dataSet) => {
        if (!startDate || !endDate) {
            return dataSet;
        }

        return dataSet.filter(data => {
            const dataDate = new Date(data.timeData);
            return dataDate >= startDate && dataDate <= endDate;
        });
    }

    const clearDateTime = () => {
        setStartDate('');
        setEndDate('');
    }
    // noi cac bo loc hoat dong
    useEffect(() => {
        let datasTmp = filterDatasByDateTime(datas);
        datasTmp = filterDatasByTemperature(datasTmp);
        datasTmp = filterDatasByHumidity(datasTmp);
        datasTmp = filterDatasByLight(datasTmp);
        setDatasFilter(datasTmp);
    }, [filterTemperature, filterHumidity, filterLight, startDate, endDate])

    // cac function sap xep
    const sortByTemperatureAscending = () => {
        setDatasFilter(datasFilter.slice().sort((a, b) => a.temperature - b.temperature))
    }
    const sortByTemperatureDescending = () => {
        setDatasFilter(datasFilter.slice().sort((a, b) => b.temperature - a.temperature))
    }
    const sortByHumidityAscending = () => {
        setDatasFilter(datasFilter.slice().sort((a, b) => a.humidity - b.humidity))
    }
    const sortByHumidityDescending = () => {
        setDatasFilter(datasFilter.slice().sort((a, b) => b.humidity - a.humidity))
    }
    const sortByLightAscending = () => {
        setDatasFilter(datasFilter.slice().sort((a, b) => a.light - b.light))
    }
    const sortByLightDescending = () => {
        setDatasFilter(datasFilter.slice().sort((a, b) => b.light - a.light))
    }

    // phan trang
    const [currentPage, setCurrentPage] = useState(1); // State lưu trữ trang hiện tại
    const itemsPerPage = 10; // Số phần tử trên mỗi trang

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datasFilter.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(datasFilter.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="tbl_container">
            <h1 className='tbl_title'>Dữ liệu</h1>
            <div className='tbl_filter'>

                <div className='box1'>
                    <div className='tbl_filter_temperature'>
                        <div className='label'><label htmlFor='temperature'>Nhiệt độ:</label></div>
                        <input id='temperature' type='number' placeholder='°C' value={filterTemperature} onChange={e => setFilterTemperature(e.target.value)} />
                    </div>
                    <div className='tbl_filter_humidity'>
                        <div className='label'><label htmlFor='humidity'>Độ ẩm:</label></div>
                        <input id='humidity' type='number' placeholder='%' value={filterHumidity} onChange={e => setFilterHumidity(e.target.value)} />
                    </div>
                    <div className='tbl_filter_light'>
                        <div className='label'><label htmlFor='light'>Ánh sáng:</label></div>
                        <input id='light' type='number' placeholder='Lux' value={filterLight} onChange={e => setFilterLight(e.target.value)} />
                    </div>
                </div>

                <div className='box2'>
                    <div className='label'><label>Thời gian bắt đầu:</label></div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        timeInputLabel="Time:"
                        dateFormat="yyyy-MM-dd hh:mm:ss aa"
                        timeFormat="hh:mm:ss"
                        showTimeInput
                        placeholderText='yyyy-MM-dd hh:mm:ss aa'
                    />

                    <div className='label'><label>Thời gian kết thúc:</label></div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        timeInputLabel="Time:"
                        dateFormat="yyyy-MM-dd hh:mm:ss aa"
                        timeFormat="hh:mm:ss"
                        showTimeInput
                        placeholderText='yyyy-MM-dd hh:mm:ss aa'
                    />

                    <button onClick={clearDateTime} >Clean</button>
                </div>
            </div>
            <table className="device-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>
                            <div className='icons_container'>
                                <span>Nhiệt độ (°C)</span>
                                <div className='icons'>
                                    <i className="fa-solid fa-sort-up" onClick={sortByTemperatureAscending}></i>
                                    <i className="fa-solid fa-sort-down" onClick={sortByTemperatureDescending}></i>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className='icons_container'>
                                <span>Độ ẩm (%)</span>
                                <div className='icons'>
                                    <i className="fa-solid fa-sort-up" onClick={sortByHumidityAscending}></i>
                                    <i className="fa-solid fa-sort-down" onClick={sortByHumidityDescending}></i>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className='icons_container'>
                                <span>Ánh sáng (Lux)</span>
                                <div className='icons'>
                                    <i className="fa-solid fa-sort-up" onClick={sortByLightAscending}></i>
                                    <i className="fa-solid fa-sort-down" onClick={sortByLightDescending}></i>
                                </div>
                            </div>
                        </th>
                        <th>Thời Gian</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map(data => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.temperature}</td>
                                    <td>{data.humidity}</td>
                                    <td>{data.light}</td>
                                    <td>{data.timeData}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='tbl_select'>
                <i class="fa-solid fa-angles-left" onClick={() => setCurrentPage(1)} ></i>
                <i class="fa-solid fa-angle-left" onClick={() => {
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                }} ></i>
                <select value={currentPage} onChange={(e) => { setCurrentPage(e.target.value) }}>
                    {
                        pages.map(page => {
                            return <option key={page} value={page}>{page}</option>
                        })
                    }
                </select>
                <i class="fa-solid fa-angle-right" onClick={() => {
                    if (currentPage < pages.length) setCurrentPage(currentPage + 1)
                }}></i>
                <i class="fa-solid fa-angles-right" onClick={() => setCurrentPage(pages.length)} ></i>
            </div>
            <div className='buttonx' onClick={() => { navigate('/') }}>Trang chủ</div>
        </div>
    )

}

export default Data;