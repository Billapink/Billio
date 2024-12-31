import './App.css';
import TaskList from './components/TaskList.js';

function App() {
  return (
    <div className="bg-gray-800 text-white min-h-screen items-center justify-center">
      <h1 className="p-6 max-w-md mx-auto text-4xl font-bold ">Billio</h1>
      <p className="p-2 max-w-md mx-auto text-2xl font-bold ">Your list of items:</p>
    <TaskList/>
  </div>
  );
}


export default App;
