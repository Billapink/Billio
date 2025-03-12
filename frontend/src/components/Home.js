import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

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
        <div className="p-6 max-w-md mx-auto bg-pink rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-centre">Home</h2>
            <ul className="list-disc pl-5 space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="text-gray-700 hover:text-blue-500 transition-all duration-200"
                    >
                        {task.description}
                    </li>
                ))}
                
            </ul>
            <TaskForm onTaskAdded={fetchTasks}/>
        </div>
    );
}

export default Home;
