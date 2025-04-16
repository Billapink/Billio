import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import NavBar from './NavBar';
import Header from './Header';


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
        <Header/>
        <div className='p-20 text-black font-bold font-size-10' >Home</div>
        <NavBar/>
        </div>
    );
}

export default Home;
