import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      // console.log(current(state).tasks);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      // console.log(current(state).tasks);
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      // Use map instead of findIndex and mutating the state directly
      state.tasks = state.tasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      // console.log(current(state).tasks);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;  // Sets all tasks (used for fetching tasks from backend)
      // console.log(current(state).tasks);
    },
  },
});

export const { addTask, removeTask, updateTask, setTasks} = taskSlice.actions;
export default taskSlice.reducer;
