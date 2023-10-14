import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const History = () => {

    const navigate = useNavigate();

    const [datas, setDatas] = useState([]);
    // bien luu data da duoc loc
    const [datasFilter, setDatasFilter] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/device/all')
            .then(response => response.json())
            .then(data => {
                setDatas(data.reverse())
                setDatasFilter(data.reverse())
            })
            .catch(err => console.log(err))
    }, [])
    // loc theo trang thai
    const [statusDevice, setStatusDivice] = useState('');

    const filterDatasByStatusDevice = (dataSet) => {
        return dataSet.filter(data => {
            return data.statusDevice === Number(statusDevice) || !statusDevice
        })
    }
    // chuc nang loc theo thiet bi
    const [device, setDevice] = useState('');

    const filterDatasByDevice = (dataSet) => {
        return dataSet.filter(data => {
            return !device || data.nameDevice === device
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
            const dataDate = new Date(data.timeDevice);
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
        datasTmp = filterDatasByDevice(datasTmp);
        datasTmp = filterDatasByStatusDevice(datasTmp);
        setDatasFilter(datasTmp);
    }, [startDate, endDate, device, statusDevice])

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
            <h1 className='tbl_title'>Lịch sử</h1>
            <div className='tbl_filter'>
                <div className='box1'>
                    <div className='tbl_filter_temperature'>
                        <div className='label'><label htmlFor='temperature'>Thiết bị:</label></div>
                        <select value={device} onChange={(e) => setDevice(e.target.value)}>
                            <option selected value={''}></option>
                            <option value={'led_1'}>led_1</option>
                            <option value={'led_2'}>led_2</option>
                        </select>
                    </div>
                    <div className='tbl_filter_temperature'>
                        <div className='label'><label htmlFor='temperature'>Trạng thái:</label></div>
                        <select value={statusDevice} onChange={(e) => setStatusDivice(e.target.value)}>
                            <option selected value={''}></option>
                            <option value={1}>Bật</option>
                            <option value={0}>Tắt </option>
                        </select>
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
                        <th>Tên</th>
                        <th>Thay đổi</th>
                        <th>Thời Gian</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map(data => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.nameDevice}</td>
                                    <td>{data.statusDevice ? 'Bật' : 'Tắt'}</td>
                                    <td>{data.timeDevice}</td>
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

export default History;

