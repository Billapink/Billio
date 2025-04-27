import './App.css';

import { Routes, Route, Link } from 'react-router-dom';
import Chat from './components/Chat.js'
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile.js";
import Achievements from "./components/Achievements.js";
import EditProfile from './components/EditProfile.js';
import Header from './components/Header.js'
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { UserContext } from './components/UserContext.js';

function App() {


  return (
    <div className="bg-white text-white min-h-screen items-center">
      <UserContext value={{}}>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/editProfile" element={<EditProfile />} />
        </Routes>
      </UserContext>
  </div> 
  );
}

export default App;
