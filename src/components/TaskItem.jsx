/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { updateTask, removeTask } from '../taskSlice';
import { useDispatch } from 'react-redux';
import { UPDATE_TASK,DELETE_TASK } from '../queries';


function TaskItem({ task }) {
  // Apollo mutations for updating and deleting tasks
  const dispatch = useDispatch();
  const [updateTaskMutation] = useMutation(UPDATE_TASK);
  const [deleteTaskMutation] = useMutation(DELETE_TASK);

  // Handle marking task as completed or incomplete
  const handleComplete = async () => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTaskMutation({ variables: { id: task.id, completed: updatedTask.completed } });
    dispatch(updateTask(updatedTask));  // Update task in Redux store
  };

  // Handle deleting task
  const handleDelete = async () => {
    await deleteTaskMutation({ variables: { id: task.id } });
    dispatch(removeTask(task.id));  // Remove task from Redux store
  };

  return (
    <tr className={task.completed ? 'bg-green-100' : 'bg-red-100'}>
      <td className="border px-4 py-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleComplete(task.id)}
          className="form-checkbox h-5 w-5 text-green-500"
        />
      </td>

      <td className="border px-4 py-2">{task.title}</td>
      <td className="border px-4 py-2">{task.description}</td>
      <td className="border px-4 py-2 text-center">
        <span className={task.completed ? 'text-green-700' : 'text-red-700'}>
          {task.completed ? 'Completed' : 'Incomplete'}
        </span>
      </td>

      <td className="border px-4 py-2 text-center">
        <button
          onClick={() => handleDelete(task.id)}
          className="inline-flex items-center justify-center p-2 text-red-500 hover:text-red-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        >
         delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;

