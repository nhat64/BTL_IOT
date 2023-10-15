const Led = (props) => {

    let status = props.ledData.led_1 === 1 ? true : false;

    const changeSwitch = () => {
        const statusLed = {...props.ledData, led_1: status ? 0 : 1, isChanged: 1};
        fetch('http://localhost:8080/device/update', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(statusLed),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
            .then(response => { })
            .then(data => { })
            .catch(err => { })
    }


    return (
        <div className='action'>

            {
                status ? <img src='../image/light_on.png' className="action_img" alt="err"></img> : <img src='../image/light_off.png' className="action_img" alt="err"></img>
            }

            <div className={status ? 'switch on' : 'switch'} onClick={changeSwitch} >
                <div className="circle"></div>
            </div>
        </div>
    );
}

export default Led;