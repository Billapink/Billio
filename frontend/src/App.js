import './App.css';
import TaskList from './components/TaskList.js';
import { Routes, Route, Link } from 'react-router-dom';
import Chat from './components/Chat.js'
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (isLoggedIn){
      navigate('/home');
    }
    else {
      navigate('/welcome');
    };
    
  };

  return (
    <div className="bg-white text-white min-h-screen items-center">
      <button type="button" onClick={handleHomeClick} className="p-6" >
      </button>
      
      
      <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tasklist" element={<TaskList />} />
      </Routes>
  </div> 
  );
}

export default App;
