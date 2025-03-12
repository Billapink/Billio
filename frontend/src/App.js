import './App.css';
import TaskList from './components/TaskList.js';
import { Routes, Route, Link } from 'react-router-dom';
import Chat from './components/Chat.js'

function App() {
  return (
    <div className="bg-gray-800 text-white min-h-screen items-center justify-center">
      <h1 className="p-6 max-w-md mx-auto text-4xl font-bold ">Billio</h1>
      <nav>
          <Link to="/">Task List</Link> | <Link to="/chat">Chat</Link> | <Link to="/home">Home</Link>
      </nav>
      <Routes>
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/home" element={<Home />} />
      </Routes>
  </div>
  );
}

export default App;
