import React, { useContext, useEffect, useState } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import {useNavigate} from 'react-router-dom';
import { UserContext } from './UserContext';

function Requests() { 
    const userData = useContext(UserContext);
    const [friendRequests, setFriendRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/get_friend_requests', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userId: userData.userId
            })
        })
        .then((response)=> response.json())
        .then((data) => {setFriendRequests(data.data)})
        },
      []);

      const rejectRequest = (friendId) => {
        fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/respond_request', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userId: userData.userId,
                friendId: friendId,
                response: 'reject'

            })
            .then(
                setFriendRequests(prev =>
                    prev.filter(request => request.userid !== friendId)
                )
            )
        })
      };

      const acceptRequest = (friendId) => {
        fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/respond_request', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userId: userData.userId,
                friendId: friendId,
                response: 'accept'

            })
            .then(
                setFriendRequests(prev =>
                    prev.filter(request => request.userid !== friendId)
                )
            )
        })
      };


    return (
    <div>
        <Header/>
        <div className="mx-auto w-1/2" >
        <div className='flex justify-center'>
        <div className='p-7 pt-[100px] text-black font-bold text-3xl' >Friend Requests</div>
        </div>
        {/* Section to map friend name and icon in notification section*/}
        <div className='flex flex-col gap-y-3'>
            {friendRequests.map((friend)=> (
        <div className='flex justify-between px-3 py-1 border-[1px] rounded-xl border-radius border-gray-200 shadow-sm'>
        <div className='flex '>
        <img className='m-3 w-7 h-7' src={`/images/profile-icons/${friend.icon}.png`}/>
        <div className='text-black text-md p-3'>
            {friend.name}
        </div>
        </div>
        {/* Section for buttons accepting or rejecting friend request and corresponding api call function*/}
        <div className='flex'>
            <button onClick={()=>rejectRequest(friend.userid)}>
            <img className='m-3 w-7 h-7' src='/images/billio-cross.png'/>
            </button>
            <button onClick={()=>acceptRequest(friend.userid)}>
            <img className='m-2 w-8 h-8' src='/images/billio-tick.png'/>
            </button>
        </div>
        </div>
            ))}
        </div>
        </div>
        <NavBar/>
    </div>
    );
}

export default Requests;
