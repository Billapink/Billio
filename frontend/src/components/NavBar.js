import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar(){

    return(
        <nav>
        <Link className="text-black" to="/home">Home</Link> | <Link className="text-black" to="/signup">Sign Up</Link> | <Link className="text-black" to="/login">Log In</Link> | <Link className="text-black" to="/tasklist">Task List</Link> | <Link className="text-black" to="/chat">Chat</Link> 
        </nav>
    );

}

export default NavBar;