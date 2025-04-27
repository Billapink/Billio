import React, { useContext, useState } from 'react';

import {useNavigate} from 'react-router-dom';
import { UserContext } from './UserContext';

function Login() { 
    const userData = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const log_in = (e) => {
        e.preventDefault();

        fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/log_in', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username, password})
        })
        
        .then((response)=> response.json())

        .then((data) => {
            setMessage(data.message);
            if (data.status === 'success') {
                userData.userId = data.
                if (data.profile_complete == 'true'){
                    setTimeout(() => (navigate('/home')), 1000)
            } 
                else {
                    setTimeout(() => (navigate('/editProfile', {
                        state: {message: 'Please add your bio and choose an icon.'
                    }})), 1000)
                }
            }
        })
    }

    return (
        <div>
        <div className='flex place-content-center'>
        <img className='mt-12 w-[140px]' src='/images/billio-front.png' alt='billio logo'/>
        </div>
        <div className="p-6 max-w-80 mx-auto col-auto bg-white rounded-xl shadow-md space-y-4 my-20">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Log In</h2>
        <form className='text-center' onSubmit={log_in} >
            <p className=' pd-4 text-gray-600 text-left pl-12' >Username: </p>
            <input
            className=' px-4 text-black bg-gray-100 h-10 rounded-full'
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            />
            <p className=' pt-4 text-gray-600 text-left pl-12'>Password: </p>
            <input
            type='password'
            className='px-4 text-black bg-gray-100 w-md h-10 rounded-full'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
            <div>
            <button 
            type='submit'
            className='text-white mt-8 mb-6 w-[190px] bg-purple-600 rounded-full w-2/5 h-10 hover:bg-purple-900'>LOG IN</button>
            </div>
        </form>
        <div>
            <p className='pd-3 text-black bg-white' >{message}</p>
        </div>
        <div className='flex place-content-left'>
            <button className='m-2 bg-purple-600 rounded-full' onClick={() => (navigate('/'))} >
                <img className='w-[35px]' src='/images/back-arrow.png' />
            </button>
        </div>
    </div>
    </div>
    );
}

export default Login;
