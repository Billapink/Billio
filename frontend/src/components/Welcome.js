import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import {useNavigate} from 'react-router-dom';
import billioLogoFront from '/Users/sadaf/Desktop/GitHubProjects/Billio/Billio/frontend/src/assets/logos/billio-front.png';

function Welcome() {
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };


    const fetchTasks = () =>  {
            fetch('https://billio-backend-376ef0cff770.herokuapp.com/api/tasks')
                .then((response) => {
                    console.log('Response status:', response.status);
                    console.log('Response body:', response);
                    return response.json();
                })
                .then((data) => {
                    console.log('Fetched tasks:', data);
                    setTasks(data);
                })
                .catch((error) => console.error('Error fetching tasks:', error));
        };
    

    useEffect(() => {
            fetchTasks();
    }, []);


    return (
        <div className="min-h-screen flex flex-col justify-between items-center bg-white">
            <div className="mx-auto flex justify-centre pt-40 ">
                <div className="grid gap-8">
                <div className="flex justify-center">
                <img className="justify-centre w-40 h-auto" src={billioLogoFront}></img>
                </div>
                <button className="p-3 px-20 bg-purple-500 text-white font-semibold rounded-full" type="button" onClick={()=> handleNavigation('/login')} >Log In</button>
                <button className="p-3 px-20 bg-purple-500 text-white font-semibold rounded-full" type="button" onClick={()=> handleNavigation('/signup')} >Sign Up</button>
                </div>
            </div>
            
        </div>
      );
    }

export default Welcome;
