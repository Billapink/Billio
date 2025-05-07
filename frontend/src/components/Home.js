import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header';
import { UserContext } from './UserContext';


function Home() {
    const userData = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResults] = useState([]);

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

    const navigate = useNavigate();

    const handleSearch = () => {
        fetch(`https://billio-backend-376ef0cff770.herokuapp.com/api/search_users?query=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())

            .then((data) => {
                setSearchResults(data.data);
            });
    };

    return (
        <div>
        <Header/>
        <div className="mx-auto w-2/3" >
        
        <div className=' pt-[100px] flex justify-center'>
            <div className=' text-black font-bold text-3xl' >Home</div>
        </div>
        <div className=' pt-[100px] gap-2 flex justify-center'>
            <input
                className='px-4 text-black bg-gray-100 h-10 rounded-full' 
                value={searchQuery} 
                placeholder='Search username'
                onChange={(e) => setSearchQuery(e.target.value)}/>
            <button className='px-4 text-black bg-gray-100 h-10 rounded-full' onClick={handleSearch}>Search</button>
        </div>
        {searchResult && (<div className=' pt-[100px] flex flex-col justify-center gap-2'>
            <div className='text-black font-bold text-xl' >Search Results</div>
            {
                searchResult.map((user) => (
                    <div>
                        <Link to={`/profile/${user.id}`} className="text-black flex flex-row justify-between w-1/2">
                            <img className="w-8 h-8" src={`/images/profile-icons/${user.icon}.png`}/>
                            {user.name}
                        </Link> 
                    </div>
                ))
            }
        </div>)}
        <div className=' pt-[50px] flex justify-between'>
            <div className='flex  text-black font-bold text-2xl'>Friends</div>
            <button onClick={()=>(navigate('/Requests'))}>
                <img className='m-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full p-1' src='/images/billio-notification.png'/>
            </button>
        </div>
        <div className='flex gap-x-3 py-3'>
            {
                friends.map((friend) => (
                    <div className="text-black">
                        <Link to={`/profile/${friend.id}`}>
                            <img className="w-8 h-8" src={`/images/profile-icons/${friend.icon}.png`}/>
                            {friend.name}
                        </Link>
                    </div>
                ))
            }
        </div>
        </div>
        <NavBar/>
        </div>
    );
}

export default Home;
