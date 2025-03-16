import './App.css';
import TaskList from './components/TaskList.js';
import { Routes, Route, Link } from 'react-router-dom';
import Chat from './components/Chat.js'
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";


function App() {
  return (
    <div className="bg-white text-white min-h-screen items-center justify-center">
      <div className="max-w-md mx-auto flex">
      <h1 className="p-6  text-4xl text-purple-500 font-bold justify-centre">Billio</h1>
      </div>
      <nav>
      <Link to="/welcome">Welcome</Link> | <Link to="/home">Home</Link> | <Link to="/signup">Sign Up</Link> | <Link to="/login">Log In</Link> | <Link to="/tasklist">Task List</Link> | <Link to="/chat">Chat</Link> 
      </nav>
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
