import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import {useNavigate} from 'react-router-dom';

function SignUp() {
    const [message, setMessage] = useState('');
    
    const [newUsername,setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path);
    };

    {/* Creating the function to sign up by using the API QUERY 'api/sign_up' which will handle the logic
         of handling with the database then return appropriate responses given the conditions met. */}
    
    const sign_up = (e) => {
        e.preventDefault();

        fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/sign_up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({newUsername, newPassword}),
        })
            .then((response) => response.json())

            .then((data) => {
                    setMessage(data.message);    
            })
        }
    


    return (
        <div className="p-6 max-w-80 mx-auto col-auto bg-white rounded-xl shadow-md space-y-4 my-20">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
            <form className='text-center' onSubmit={sign_up} >
                <p className=' pd-4 text-gray-600 text-left pl-12' >Create a username: </p>
                <input
                className=' px-4 text-black bg-gray-100 h-10 rounded-full'
                value={newUsername}
                onChange={(e)=> setNewUsername(e.target.value)}
                />
                <p className=' pt-4 text-gray-600 text-left pl-12'>Create a password: </p>
                <input
                type='password'
                className='px-4 text-black bg-gray-100 w-md h-10 rounded-full'
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
                />
                <div>
                <button 
                type='submit'
                className='text-white mt-8 mb-6 w-[190px] bg-purple-600 rounded-full w-2/5 h-10 hover:bg-purple-900'>SIGN UP</button>
                </div>
            </form>
            <div>
                <p className='pd-3 text-black bg-white' >Status:{message}</p>
            </div>
        </div>
    );
}

export default SignUp;
