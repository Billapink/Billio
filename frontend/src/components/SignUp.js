import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function SignUp() {
    {/* Creating a state variable 'message' to display in the frontend when the JSON response has been returned to the frontend. 
        With status either 'success' or 'error'. */}
    const [message, setMessage] = useState('');

    {/* Creating state variables for the new username and password they want to use for their account. Using the updating function 
        to update thier values once input in the UI. */}
    const [newUsername,setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const navigate = useNavigate();

    {/* Function to sign up by using the API QUERY 'api/sign_up' which will handle the logic
         of handling with the database then return appropriate responses given the conditions met. */}
    const sign_up = (e) => {
        e.preventDefault();

        if (verifyPassword == newPassword){

            fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/sign_up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                //Parsing in the new username and password variables to the body of the API to send to the backend.
                body: JSON.stringify({newUsername, newPassword}),
            })
            .then((response) => response.json())

            //Dealing with response after the API query has been executed and parses back a message in JSON format 
            //and setting that as the message to be displayed in the UI using the update function 'setMessage'.
            .then((data) => {
                    setMessage(data.message);    
            })
        } else {setMessage("Your passwords do not match.")}
    }
    


    return (
        <div>
        <div className='flex place-content-center'>
        <img className='mt-12 w-[140px]' src='/images/billio-front.png' alt='billio logo'/>
        </div>
        <div className="p-6 max-w-80 mx-auto col-auto bg-white rounded-xl shadow-md space-y-4 my-20">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
            {/* Main div 'form' that contains the input boxes. Once pressed the 'submit' type button, it will send the values 
            last stored in the input boxes to the 'sign_up' function and execute it. */}
            <form className='text-center' onSubmit={sign_up} >
                <p className=' pd-4 text-gray-600 text-left pl-12' >Create a username: </p>
                {/**/}
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
                <p className=' pt-4 text-gray-600 text-left pl-12'>Verify password: </p>
                <input
                type='password'
                className=' px-4 text-black bg-gray-100 w-md h-10 rounded-full'
                value={verifyPassword}
                onChange={(e)=> setVerifyPassword(e.target.value)}
                />
                <div>
                <button 
                type='submit'
                className='text-white mt-8 mb-6 w-[190px] bg-purple-600 rounded-full w-2/5 h-10 hover:bg-purple-900'>SIGN UP</button>
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

export default SignUp;
