import {React} from 'react';
import {useNavigate} from 'react-router-dom';


function Header() {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        console.log('Button Clicked');
        navigate(path);
    };

    return (
        <div>
        <div className='fixed top-0 left-0 right-0 shadow-md'>
        <div className="relative z-50">
        <button onClick={() => handleNavigation('/home')}>
            <img
            className="m-5 w-[70px]"
            src="/images/billio-header.png"
            alt="Billio logo"
            />
        </button>
        </div>
        </div>
        </div>
    );
}

export default Header;