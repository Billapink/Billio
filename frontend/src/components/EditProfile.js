import React, { useEffect, useState } from 'react';

import {useLocation, useNavigate} from 'react-router-dom';

const iconOptions = [
    'cat-black-smile',
    'cat-brown-swag',
    'cat-ginger-smile'
];

function EditProfile() {
    const { state } = useLocation();
    const message = state.message;

    const [bio,setBio] = useState('');
    const [icon, setIcon] = useState('');

    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path);
    };

    {/* Creating the function to sign up by using the API QUERY 'api/sign_up' which will handle the logic
         of handling with the database then return appropriate responses given the conditions met. */}
    
    const sign_up = (e) => {
        e.preventDefault();

        fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/update_profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bio, icon}),
        })
            .then((response) => response.json())

            .then((data) => {
                navigate('/home')  
            })
        }
    


    return (
        <div>
        <div className='flex place-content-center'>
        <img className='mt-12 w-[140px]' src='/images/billio-front.png' alt='billio logo'/>
        </div>
        <div className="p-6 max-w-80 mx-auto col-auto bg-white rounded-xl shadow-md space-y-4 my-20">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Edit Profile</h2>
            <div>
                <p className='pd-3 text-black bg-white' >{message}</p>
            </div>
            <form className='text-center' onSubmit={sign_up} >
                <p className=' pd-4 text-gray-600 text-left pl-12' >Add your bio: </p>
                <textarea
                className=' px-4 text-black bg-gray-100 rounded-xl'
                row="10"
                value={bio}
                onChange={(e)=> setBio(e.target.value)}
                />
                <p className=' pt-4 text-gray-600 text-left pl-12'>Select your icon: </p>
                <div
                className='flex flex-row gap-4 justify-center px-4 mx-6 text-black bg-gray-100 w-md rounded-full'
                >
                    {iconOptions.map((opt) => {
                        const extraClasses = opt === icon ? "border-2 border-purple-900 rounded-full " : "";
                        return (
                            <button type="button" onClick={(e)=> setIcon(opt)} className={`${extraClasses} p-2`}>
                                <img className="w-5 h-5" src={`/images/profile-icons/${opt}.png`}/>
                            </button>
                        );
                    })}
                </div>
                <div>
                <button 
                type='submit'
                className='text-white mt-8 mb-6 w-[190px] bg-purple-600 rounded-full w-2/5 h-10 hover:bg-purple-900'>SUBMIT</button>
                </div>
            </form>
            <div className='flex place-content-left'>
            <button className='m-2 bg-purple-600 rounded-full' onClick={() => (handleNavigation('/'))} >
                <img className='w-[35px]' src='/images/back-arrow.png' />
            </button>
            </div>
        </div>
        </div>
    );
}

export default EditProfile;
