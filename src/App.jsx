import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';
import { useEffect } from 'react';
import { useQuery} from '@apollo/client';
import { setTasks } from './taskSlice';  // Import the Redux action
import { useDispatch } from 'react-redux';  // Import the dispatch hook
import { GET_TASKS } from './queries';


function App() {

  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(GET_TASKS);  // Fetch tasks using Apollo
console.log("APP rendered")
  useEffect(() => { 
    if (data) { 
      dispatch(setTasks(data.tasks)); 
    }

   }, [data, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">To-Do App</h1>
        <CreateTask />
        <Tasks />
      </div>
    </div>
  );
}

export default App;
