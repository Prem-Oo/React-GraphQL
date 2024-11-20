
import {  useSelector } from 'react-redux';
import TaskItem from './TaskItem'; 

//   query GetTasks {
//     tasks {
//       id
//       title
//       description
//       completed
//     }
//   }
// `;

const Tasks = () => {
  
  const tasks = useSelector((state) => state.tasks.tasks); // Get tasks from Redux store
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 py-2 px-4 text-center">Status</th>
            <th className="w-1/3 py-2 px-4 text-center">Title</th>
            <th className="w-1/3 py-2 px-4 text-center">Description</th>
            <th className="w-1/3 py-2 px-4 text-center">Status</th>
            <th className="w-1/3 py-2 px-4 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} /> // Rendering tasks from Redux
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
