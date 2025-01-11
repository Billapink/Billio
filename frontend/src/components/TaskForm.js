import React, {useState} from 'react';

function TaskForm({onTaskAdded}) {

    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        fetch('https://billio-backend.herokuapp.com/api/add_task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Task added:', data);
                onTaskAdded(); // Refresh task list
                setDescription(''); // Clear input field
            })
    };

    return (
        <form onSubmit={handleSubmit} className='space-x-4'>
            <input
            className= 'bg-gray-100 rounded-md h-8 text-black'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            />
            <button type= 'submit' className= 'p-3 bg-blue-950 text-white rounded-xl hover:bg-blue-400'>Add Task</button>
            
        </form>
    )
}

export default TaskForm;