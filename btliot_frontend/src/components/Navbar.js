import { useNavigate } from "react-router-dom";
import '../css/demo.scss'
const Navbar = () => {

    const navigate = useNavigate();
    return (
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
        </div>
    )
}

export default Navbar;