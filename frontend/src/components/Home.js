import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import Header from './Header';
import { UserContext } from './UserContext';


function Home() {
    const userData = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/get_friends', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user_id: userData.userId
            })
        })
        .then((response)=> response.json())
        .then((data) => {
            console.log('Friends', data);
            setFriends(data.data);
        });
    }, []);
    


    return (
        <div>
        <Header/>
        <div className="mx-auto w-2/3" >
        <div className='pt-[100px] text-black font-bold text-2xl' >{userData.username}'s Home</div>
            <div className='flex flex-col pt-[50px] text-black font-bold text-2xl'>Friends</div>
            {
                friends.map((friend) => (
                    <div> 
                        <img className="w-8 h-8" src={`/images/profile-icons/${friend.icon}.png`}/>
                        {friend.username}
                    </div>
                ))
            }
            </div>
        <NavBar/>
        </div>
    );
}

export default Home;
