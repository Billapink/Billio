import {React} from 'react';
import {useNavigate} from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
        <div className='fixed top-0 left-0 right-0 shadow-md'>
        <button onClick={handleNavigation('/home')} >
        <img className='m-5 w-[70px]' src= '/images/billio-header.png'/>
        </button>
        </div>
        </div>
    );
}

export default Header;