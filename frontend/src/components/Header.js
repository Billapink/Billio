import React, { useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from './UserContext';


function Header() {

    const navigate = useNavigate();
    const userData = useContext(UserContext);
    

    return (
        <div>
        <div className='fixed top-0 left-0 right-0 shadow-md'>
        <div className="flex justify-between relative z-50">
        <img className="m-5 w-[70px]" src="/images/billio-header.png" alt="Billio logo"/>
        <div>
        <img className='mr-8 mt-2 h-[40px] w-[40px] rounded-full' src={`/images/profile-icons/${userData.icon}.png`}/>
        </div>
        </div>
        </div>
        </div>
    );
}

export default Header;