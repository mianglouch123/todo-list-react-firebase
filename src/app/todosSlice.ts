import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Itask } from '../types/task';
import { RootState } from './store';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
   updateDoc 
  } from 'firebase/firestore';
  
import { db } from '../firebase/firebase';



interface TasksState {
  todos: Itask[];
}

const initialState: TasksState = {
  todos: [],
};

const tasksSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Itask[]>) => {
      state.todos = action.payload;
    },
    addTask: (state, action: PayloadAction<Itask>) => {
      state.todos.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Itask>) => {
      const index = state.todos.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    toggleTask: (state, action: PayloadAction<string>) => {
        const task = state.todos.find((task) => task.id === action.payload);
        if (task) {
          task.isCompleted = !task.isCompleted;
        }
      },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask , toggleTask } = tasksSlice.actions;

export default tasksSlice.reducer;

export const fetchTasks = () => async (dispatch : any) => {
    try {
      const tasksCollection = await getDocs(collection(db, 'tasks'));
      const tasks = tasksCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Itask));
      dispatch(setTasks(tasks));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  export const addTaskToFirebase = (task: Itask) => async (dispatch : any) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), task);
      dispatch(addTask({ ...task, id: docRef.id }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  export const updateTaskInFirebase = (task: Itask) => async (dispatch : any) => {
    try {
      await setDoc(doc(db, 'tasks', task.id), task);
      dispatch(updateTask(task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  
  export const toggleTaskInFirebase = (taskId: string) => async (dispatch : any, getState : any) => {
    try {
      const state = getState();
      const task = state.todos.todos.find((task : Itask) => task.id === taskId);
  
      if (task) {
        const updatedTask = { ...task, isCompleted: !task.isCompleted };
        await updateDoc(doc(db, 'tasks', taskId), updatedTask);
        dispatch(toggleTask(taskId));
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };


  export const deleteTaskFromFirebase = (taskId: string) => async (dispatch : any) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  



// Selectors
export const selectAllTasks = (state : RootState) => state.todos.todos
