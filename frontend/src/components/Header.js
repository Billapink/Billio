import {React} from 'react';
import {useNavigate} from 'react-router-dom';


function Header() {

    const navigate = useNavigate();

    

    return (
        <div>
        <div className='fixed top-0 left-0 right-0 shadow-md'>
        <div className="relative z-50">
        <img className="m-5 w-[70px]" src="/images/billio-header.png" alt="Billio logo"/>
        </div>
        </div>
        </div>
    );
}

export default Header;