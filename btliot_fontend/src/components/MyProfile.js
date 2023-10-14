import { useNavigate } from 'react-router-dom';
import '../css/myprofile.scss'


const MyProfile = () => {

    const navigate = useNavigate();

    return (
        <div className="infoContainer">
            <div className='info'>
                <h1>Thông Tin Cá Nhân</h1>
                <div className='detail'>
                    <div className='title'>Tên</div>
                    <p>: Nguyễn Đức Nhật</p>
                </div>
                <div className='detail'>
                    <div className='title'>Mã sinh viên</div>
                    <p>: B20DCCN483</p>
                </div>
                <div className='detail'>
                    <div className='title'>Email</div>
                    <p>: ducnhat123@gmail.com</p>
                </div>
            </div>

            <div className='button' onClick={() => {navigate('/')}}>Trang chủ</div>
        </div>
    );
}

export default MyProfile;