const Wing = (props) => {

    let status = props.ledData.led_2 === 1 ? true : false;

    const changeSwitch = () => {
        const statusLed = {...props.ledData, led_2: status ? 0 : 1, isChanged: 2};
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
                status ? <img src='../image/wing.png' className="action_img rotate" alt="err"></img> : <img src='../image/wing.png' className="action_img" alt="err"></img>
            }

            <div className={status ? 'switch on' : 'switch'} onClick={changeSwitch}>
                <div className="circle"></div>
            </div>
        </div>
    );

}

export default Wing;