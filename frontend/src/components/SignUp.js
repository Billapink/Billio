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
    
    const sign_up = () => {
        fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/sign_up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({newUsername, newPassword}),
        })
            .then((response) => {
                console.log('Response Status: ',response.status);
                console.log('Response Body: ', response);
                return response.json();
            })

            .then((data) => {
                if (data.status == 'error'){
                    if (data.error_type == 'already user'){
                        setMessage(data.message);
                        handleNavigation('/login');
                    }
                    if (data.error_type == 'username taken'){
                        setMessage(data.message);
                    }
                } else {
                    setMessage(data.message);
                    handleNavigation('/home');
                }

            })
    }
    
    


    return (
        <div className="p-6 max-w-md mx-auto col-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-centre">Sign Up</h2>
            <form onSubmit={sign_up} >
                <p>Enter new username: </p>
                <input
                className='pd-4'
                value={newUsername}
                onChange={(e)=> setNewUsername(e.target.value)}
                />
                <p>Enter new password: </p>
                <input
                className='pd-4'
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
                />
                <button 
                type='submit'
                className='text-white bg-red rounded-lg pd-3'>Sign Up</button>
            </form>
            <div>
                <p className='pd-3 text-black bg-white' >{message}</p>
            </div>
        </div>
    );
}

export default SignUp;
