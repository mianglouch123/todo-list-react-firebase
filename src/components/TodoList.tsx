import React, { useEffect , useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Itask } from '../types/task'
import {FILTER_TASKS} from '../types/filters'

import { fetchTasks, selectAllTasks, deleteTaskFromFirebase, toggleTaskInFirebase, updateTaskInFirebase} from '../app/todosSlice'

const TodoList = () => {
    const [isUpdateTask , setUpdateTask] = useState<string>("")
    const [newText , setNewText] = useState<string>("")
    const [filterTask , setFilterTask] = useState<string>(FILTER_TASKS.all)


    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    
    const filteredTasks = filterTask === FILTER_TASKS.all
    ? tasks
    : filterTask === FILTER_TASKS.pending
    ? tasks.filter((task : Itask) => !task.isCompleted)
    : tasks.filter((task : Itask) => task.isCompleted)
 

    
    useEffect(() => {
     dispatch(fetchTasks());
      }, [dispatch]);
    

      const handleToggleComplete = (taskId: string) => {
        dispatch(toggleTaskInFirebase(taskId));
      };
      
      const handleUpdateTask = (taskId: string, newTaskText: string) => {
        const updatedTask: Itask = {
          id: taskId,
          task: newTaskText,
          isCompleted: false, // You can set this to true if needed
        };
        dispatch(updateTaskInFirebase(updatedTask));
        setUpdateTask(""); // Clear the editing state
        setNewText("")

    };
    
      const handleDeleteTask = (taskId: string) => {
        dispatch(deleteTaskFromFirebase(taskId));
      };

    

  return (
    <div className='mt-4'>
      <div className='flex justify-center items-center gap-4'>
      <button onClick={()=> setFilterTask(FILTER_TASKS.all)} className='bg-blue-400 font-bold text-white w-24 p-2 rounded-[7px]'>All</button>
      <button onClick={()=> setFilterTask(FILTER_TASKS.completed)} className='bg-blue-400 font-bold text-white w-24 p-2 rounded-[7px]'>Completed</button>
      <button onClick={()=> setFilterTask(FILTER_TASKS.pending)} className='bg-blue-400 font-bold text-white w-24 p-2 rounded-[7px]'>Pending</button>

      </div>
        <ul className='mt-10 flex flex-col gap-4 font-normal text-[20px]'>
        {filteredTasks.map((task : Itask) => (
          <li className='flex gap-3' key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggleComplete(task.id)}
            />
                  
               {isUpdateTask === task.id && (
              
                <div className='flex gap-2'>
                <input
                  className='border border-black/80'
                  type="text"
                  value={newText}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setNewText(e.target.value)}
                />
                <button className='font-normal p-1 text-white bg-green-500' onClick={() => handleUpdateTask(task.id, newText)}>Save</button>
                <button className='font-normal p-1 text-white bg-red-500' onClick={() => setUpdateTask("")}>Cancel</button>
                </div>
                )}
                         
            <p className='flex gap-2'>{task.task} - <p className={`${task.isCompleted ? 'text-green-300' : 'text-yellow-300'}`}>{task.isCompleted ? 'completed' : 'pending'}</p></p>
            <button className='font-normal bg-red-600 p-3 rounded-lg text-white text-[15px]' 
            onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={()=> setUpdateTask(task.id)} className='font-normal p-3 rounded-lg text-white bg-gray-500 text-[15px]'>Edit</button>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList