import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

function Welcome() {
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
        <div className="min-h-screen flex flex-col justify-between items-center bg-white">
          {/* Top Logo */}
          <div className="w-full flex justify-start p-4">
            <img src="../assets/logos/billio-header.png" alt="Billio Logo" className="h-10" />
          </div>
    
          {/* Main Content */}
          <div className="flex flex-col items-center space-y-6">
            {/* Central Logo */}
            <div className="bg-yellow-400 rounded-full p-6">
              <img src="../assets/logos/billio-small.png" alt="Billio Logo" className="h-16" />
            </div>
    
            {/* Tagline */}
            <p className="text-purple-500 text-lg font-semibold text-center">
              Game, Socialise and Learn
            </p>
    
            {/* Buttons */}
            <div className="flex flex-col space-y-4 w-64">
              <button className="bg-purple-500 text-white rounded-full py-3 text-lg font-medium">
                Login
              </button>
              <button className="bg-purple-500 text-white rounded-full py-3 text-lg font-medium">
                Sign-up
              </button>
            </div>
          </div>
    
          {/* Bottom Navigation */}
          <div className="w-full flex justify-around p-4 bg-white">
            <button className="text-purple-500">
              <i className="fas fa-home text-2xl"></i>
            </button>
            <button className="text-purple-500">
              <i className="fas fa-comments text-2xl"></i>
            </button>
            <button className="text-purple-500">
              <i className="fas fa-trophy text-2xl"></i>
            </button>
            <button className="text-purple-500">
              <i className="fas fa-user text-2xl"></i>
            </button>
          </div>
        </div>
      );
    }

export default Welcome;
