import {React, useContext, useEffect, useState} from 'react';
import { useParams } from "react-router";
import NavBar from './NavBar';
import Header from './Header';
import { UserContext } from './UserContext';

function Profile() {
    const { id } = useParams();
    const userData = useContext(UserContext);

    const [user, setUser] = useState();
    const [icon, setIcon] = useState();
    const [bio, setBio] = useState();

    useEffect(() => {
        const user_id = id || userData.userId;

        fetch(`https://billio-backend-376ef0cff770.herokuapp.com/api/get_profile?user_id=${user_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())

            .then((data) => {
                setBio(data.bio);
                setUser(data.username);
                setIcon(data.icon);
            })
    }, [])

    return (
        <div>
        <Header/>    
        <div className='pt-[20px] flex justify-center'>
            <div className='flex flex-col'>
            <img className='w-15 h-15' src={`/images/profile-icons/${icon}.png`} />
            <div className=''>{user}</div>
            {bio}
            </div>
        </div>
        
        <NavBar/>
        </div>
    );
}

export default Profile;