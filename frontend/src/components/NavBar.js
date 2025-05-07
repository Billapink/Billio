import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(){

    return(
        <div className='fixed bottom-0 left-0 right-0'>
        <div className="m-4 p-6 w-2/3 mx-auto rounded-xl shadow-md space-y-4">
        <nav className='flex justify-around'>
        <Link className="text-black" to="/home"><img className='w-[30px]' src='/images/billio-home.png' /></Link> | 
        <Link className="text-black" to="/chat"><img className='w-[30px]' src='/images/billio-chat.png' /></Link> | 
        <Link className="text-black" to="/achievements"><img className='w-[30px]' src='/images/billio-achievements.png' /></Link> | 
        <Link className="text-black" to="/profile"><img className='w-[30px]' src='/images/billio-profile.png' /></Link> 
        </nav>
        </div>
        </div>
    );

}

export default NavBar;