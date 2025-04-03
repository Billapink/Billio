import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar(){

    return(
        <nav className='flex justify-around'>
        <Link className="text-black" to="/home">Home</Link> | <Link className="text-black" to="/chat">Chat</Link> | <Link className="text-black" to="/achievements">Achievements</Link> | <Link className="text-black" to="/profile">Profile</Link> 
        </nav>
    );

}

export default NavBar;