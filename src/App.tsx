import React, { useState } from 'react';
import { useAppDispatch } from './app/hooks';
import {addTaskToFirebase } from './app/todosSlice';
import TodoList from './components/TodoList';
import { Itask } from './types/task';


const App: React.FC = () => {

  const [newTaskText, setNewTaskText] = useState<string>('');
  const dispatch = useAppDispatch();


  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask: Itask = {
        id: Math.random().toString(16),
        task: newTaskText,
        isCompleted: false,
      };
      dispatch(addTaskToFirebase(newTask));
      setNewTaskText(''); // Clear the input after adding task
    }
  };


  return (
    <div className='flex justify-center items-center gap-4  flex-col mt-12'>
      <h1 className="text-4xl text-blue-400 font-semibold">Todo App</h1>
      <div className='flex text-black/90 gap-2 '>
      <input
        type="text"
        value={newTaskText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskText(e.target.value)}
        placeholder="Enter a new task"
        className='p-2 w-[300px]'
      />
      <button className='bg-blue-500 text-white p-4 rounded-[15px] font-bold ' onClick={handleAddTask} >add task</button>
      </div>
      <TodoList />
    </div>
  );
};

export default App;
