import React from 'react';
import {useNavigate} from 'react-router-dom';

function Welcome() {

    const navigate = useNavigate();


    return (
        <div>
        <div className='flex place-content-center'>
        <img className='mt-40 w-[160px]' src='/images/billio-front.png' alt='billio logo'/>
        </div>
        <div className="min-h-screen flex flex-col justify-between items-center bg-white">
            <div className="mx-auto flex justify-centre pt-20 ">
                <div className="grid gap-8">
                <div className="flex justify-center">
                
                </div>
                <button className="p-3 px-20 bg-purple-500 text-white font-semibold rounded-full" type="button" onClick={()=> navigate('/login')}>
                    Log In
                </button>
                <button className="p-3 px-20 bg-purple-500 text-white font-semibold rounded-full" type="button" onClick={()=> navigate('/signup')}>
                    Sign Up
                </button>
                
                </div>
                
            </div>
            
        </div>
        </div>
      );
    }

export default Welcome;
