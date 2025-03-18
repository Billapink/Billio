import './App.css';
import TaskList from './components/TaskList.js';
import { Routes, Route, Link } from 'react-router-dom';
import Chat from './components/Chat.js'
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import billioLogo from '/Users/sadaf/Desktop/GitHubProjects/Billio/Billio/frontend/src/assets/logos/billio-header.png';


function App() {
  return (
    <div className="bg-white text-white min-h-screen items-center">
      <div className="p-6" >
        <img className="w-20 h-auto" src={billioLogo}></img>
      </div>
      
      
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
