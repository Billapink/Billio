import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import NavBar from './NavBar';


function Home() {
    const [tasks, setTasks] = useState([]);

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
        <div className='min-h-screen flex items-end '>
        <div className="m-4 p-6 w-2/3 mx-auto rounded-xl shadow-md space-y-4">
        <NavBar/>
        </div>
        </div>
        
    );
}

export default Home;
