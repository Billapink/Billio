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
        <div>
        <div className='fixed bottom-0 left-0 right-0'>
        <NavBar/>
        </div>
        </div>
    );
}

export default Home;
