import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import NavBar from './NavBar';
import Header from './Header';


function Home() {
    const [userData, setUserData] = useState({'username':'Billapink', 'icon':'/images/profile-icons/cat-black-smile.png', 'bio':'Sam Smith is king.'});
    
    useEffect(() => {
            fetchTasks();
    }, []);

    return (
        <div>
        <Header/>
        <div className="mx-auto w-2/3" >
        <div className='pt-[100px] text-black font-bold text-2xl' >Home</div>
        <div className=' pt-[50px] text-black font-bold text-2xl'>Friends</div>
        <div>{
            userData.map((userData)=> (
                <div className='flex space-between'>
                    <img className='pd-3' src={userData.icon}/>
                </div>
            ))
            }</div>
        </div>
        <NavBar/>
        </div>
    );
}

export default Home;
