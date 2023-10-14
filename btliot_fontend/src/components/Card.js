// import { useEffect, useState } from "react";

import { useState } from "react";


const Card = (props) => {
    
    const data = [
        {
            title: 'temperature',
            titleVn: 'Nhiệt độ',
            icon: 'icon fa-solid fa-temperature-three-quarters',
            unit: '°C',
            low: 'low-temperature',
            mid: 'mid-temperature' ,
            hight: 'hight-temperature',
            value: 0
        },
        {
            title: 'humidity',
            titleVn: 'Độ ẩm',
            icon: 'icon fa-solid fa-droplet',
            unit: '%',
            low: 'low-humidity',
            mid: 'mid-humidity' ,
            hight: 'hight-humidity',
            value: 0
        },
        {
            title: 'light',
            titleVn: 'Ánh sáng',
            icon: 'icon fa-regular fa-sun',
            unit: 'Lux',
            low: 'low-light',
            mid: 'mid-light' ,
            hight: 'hight-light',
            value: 0
        },
        {
            title: 'bui',
            titleVn: 'Bui',
            icon: 'icon fa-regular fa-sun',
            unit: 'ppm',
            low: 'low-bui',
            mid: 'mid-bui' ,
            hight: 'hight-bui',
            value: 0
        }
    ]


    const value = props.value;

    let check = () => {
        

        switch(props.myKey) {
            case 0:
                if(value < 15) return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].low;
                else if(value > 15 && value < 40) return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].mid;
                else return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].hight;
            case 1:
                if(value < 30) return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].low;
                else if(value > 30 && value < 60) return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].mid;
                else return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].hight;
            case 2:
                if(value < 200) return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].low;
                else if(value > 200 && value < 1000) return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].mid;
                else return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].hight;
            case 3:
                if(value < 50) return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].low;
                else if(value > 50 && value < 80) return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].mid;
                else return props.valueBui >= 70 ? 'card waring' : 'card ' + data[props.myKey].hight;
            default:
        }

    }

    return (
        <div className={check()}>
            <div className='infor'>
                <i className={data[props.myKey].icon}></i>
                <p>{data[props.myKey].titleVn}</p>
            </div>
            <p className='detail'>{value} {data[props.myKey].unit}</p>
        </div>
    )
}

export default Card;


    // const [value, setValue] = useState(50);

    // useEffect(() => {
    //     // gọi API lấy giá trị value theo loại giá trị cần lấy theo props.myKey (thứ tự 0 1 2 là 3 loại giá trị nhiệt độ, độ ẩm, ánh sáng)

    //     const updateRandomValue = () => {
    //         let randomValue = 0;
    //         if(props.myKey === 3) randomValue = Math.floor(Math.random() * 1001); // Giá trị ngẫu nhiên từ 0 đến 1000
    //         else randomValue = Math.floor(Math.random() * 101);
    //         setValue(randomValue);
    //     };

    //     // Gọi hàm đầu tiên khi component được hiển thị
    //     updateRandomValue();

    //     // Sử dụng setInterval để cập nhật giá trị mỗi 5 giây
    //     const intervalId = setInterval(updateRandomValue, 2000);

    //     // Xóa interval khi component bị hủy
    //     return () => clearInterval(intervalId);

    // }, []);