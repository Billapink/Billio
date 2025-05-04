import {React, useState} from 'react';
import {useLocation} from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header';

function Profile() {
    const { state } = useLocation();
    const [user, setUser] = useState(state.name);
    const [icon, setIcon] = useState(state.icon);
    const [bio, setBio] = useState(state.bio);

    return (
        <div>
        <Header/>    
        <div className='pt-[20px] flex justify-center'>
            <div className='flex flex-col'>
            <img className='w-15 h-15' src={`/images/profile-icons/${icon}.png`} />
            <div className=''>{user}</div>
            </div>
        </div>
        
        <NavBar/>
        </div>
    );
}

export default Profile;