import {React, useContext, useEffect, useState} from 'react';
import { useParams } from "react-router";
import {useNavigate} from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header';
import { UserContext } from './UserContext';

function Profile() {
    const { id } = useParams();
    const userData = useContext(UserContext);
    const [userId, setUserId] = useState(null);

    const [message, setMessage] = useState();

    const [friendStat, setFriendStat] = useState('Add Friend');
    const [user, setUser] = useState();
    const [icon, setIcon] = useState();
    const [bio, setBio] = useState();

    const navigate = useNavigate();

    const log_out = () => {
        userData.userId = null;
        userData.username = null;
        userData.icon = null;

        navigate('/');
    }

    useEffect(() => {
        const user_id = id || userData.userId;
        setUserId(user_id);

        fetch(`https://billio-backend-376ef0cff770.herokuapp.com/api/get_profile?user_id=${user_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())

            .then((data) => {
                setBio(data.bio);
                setUser(data.username);
                setIcon(data.icon);
            });
    }, [])

    const add_friend = () => {
        fetch(`https://billio-backend-376ef0cff770.herokuapp.com/api/friend_request`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'userId': userData.userId, 'friendId': id })
        })
            .then((response) => response.json())

            .then((data) => {
                setMessage(data.message)

                if (data.friendStat == 'accepted') {
                    setFriendStat('Friends')
                } else if (data.friendStat == 'pending') {
                    setFriendStat('Pending')
                }
                

            });

    };

    return (
        <div>
        <Header/>   
        <div className="mt-[100px] p-10 flex justify-center w-1/3 mx-auto col-auto bg-white rounded-xl shadow-md space-y-4 ">
            <div className='text-black gap-4 flex flex-col'>
            <div className='flex gap-4'>
            <div className='text-black font-bold text-3xl flex justify-center' >Profile</div>
            { userId === userData.userId && (<button 
            className='w-[100px] text-white font-bold text-sm bg-purple-600 mx-auto rounded-full p-2'
            onClick={log_out}
            >Log Out</button>) }
            </div>
            <img className='mt-[60px] w-[150px] h-[150px]' src={`/images/profile-icons/${icon}.png`} />
            <div className='text-black font-bold flex justify-center'>{user}</div>
            <div className='text-black flex justify- p-3 bg-gray-100 rounded-xl'>{bio}</div>
            {id && (<button className='w-[100px] text-white font-bold text-sm bg-purple-600 mx-auto rounded-full p-2' onClick={add_friend}>{friendStat}</button>)}
            <div>{message}</div>
            </div>
        </div>
        
        <NavBar/>
        </div>
    );
}

export default Profile;