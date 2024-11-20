import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { addTask } from '../taskSlice';
import { useDispatch } from 'react-redux';

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      id
      title
      description
      completed
    }
  }
`;

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const [createTaskMutation, { loading, error }] = useMutation(CREATE_TASK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTaskMutation({ variables: { title, description } });
      dispatch(addTask(data.createTask));  // Add task to Redux store
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="flex justify-center mb-4">
    <button
      type="submit"
      className="w-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
      disabled={loading}
    >
      {loading ? 'Creating...' : 'Create Task'}
    </button>
  </div>
      {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
    </form>
  );
};

export default CreateTask;
