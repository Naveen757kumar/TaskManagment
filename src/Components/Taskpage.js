import React, {useEffect,useState} from "react";
import {  useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { database } from '../firebase-config';
import { ref, onValue,remove } from 'firebase/database';
import { Link } from "react-router-dom";
import './Taskpage.css'
import { update } from "firebase/database";

const TaskPage = () => {
    
    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    const email = location.state?.email || 'User';
    const uid = location.state?.uid;
    const [filter, setFilter] = useState('all');
    const userName = email.split('@')[0];
    const Navigate = useNavigate('');
    
    const updateTask = (taskId) => {
        
        console.log(tasks);
        // Navigate to the form with the selected task details
        
        const foundObject = tasks.find(item => item.id === taskId);
        console.log("object",foundObject);


        Navigate("/update", { state: { email, uid, selectedTask: taskId,foundObject } });
    }

    
    const deleteTask = (taskId) => {
        // Remove the task from the database
        const taskRef = ref(database, `tasks/${uid}/${taskId}`);
        console.log(taskId)
        remove(taskRef);
    }

    useEffect(() => {
        // Ensure the user is logged in
        if (!uid) {
          console.error('User not authenticated');
          return;
        }
    
        console.log("task list",uid);
    
        // Set up a real-time listener for tasks
        const tasksRef = ref(database, `tasks/${uid}`);
        onValue(tasksRef, (snapshot) => {
       const data = snapshot.val();
       if (data) {
        // Convert the object into an array of tasks with added 'id' property
        const taskList = Object.entries(data).map(([id, task]) => ({
          id,
          ...task,
        }));
        setTasks(taskList);
       } else {
        setTasks([]);
             }
       });
       }, [uid]);

   const form = () => 
   {
        Navigate("/form",{ state: { email, uid }});
    } 

    const viewDetail = (taskId) => {
      
      const Object = tasks.find(item => item.id === taskId);
      Navigate("/task",{state: { Object,uid,email,taskId }});
    }

    const handleCheckboxChange = (taskId) => {
      // Find the task with the given taskId
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
  
      // Update the tasks in the state
      setTasks(updatedTasks);
  
      // Update the 'completed' property in the database
      const taskRef = ref(database, `tasks/${uid}/${taskId}`);
      update(taskRef, {
        completed: !tasks.find((task) => task.id === taskId)?.completed,
      });
    };


    const handleFilterChange = (selectedFilter) => {
      setFilter(selectedFilter);
    };
  
    // Filter tasks based on the selected filter
    const filteredTasks = filter === 'completed'
      ? tasks.filter((task) => task.completed)
      : filter === 'incomplete'
      ? tasks.filter((task) => !task.completed)
      : tasks;

   
     return (
        <div className="Taskpage">
            <h1>Task Management Application</h1>
            <h3 >Welcome, {userName}</h3>
            <Link className="log" to="/" >Logout</Link>
            <div className="ListPage">
            <h2>Task List</h2>
            <button className="but" onClick={form}>Create task</button>
            <label htmlFor="filter">Filter:</label>
            <select className="filter" id="filter" onChange={(e) => handleFilterChange(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
           </select>
           <ol>
          
           {filteredTasks.map((task) => (
            
             <li key={task.id}>
               <strong>{task.title}</strong>
               <div className="button">
               <button className="view"  onClick={() => viewDetail(task.id)}>View</button>
               <button className="update" style={{marginLeft:"10px"}} onClick={() => updateTask(task.id)}>Update</button>
               <button className="delete" style={{marginLeft:"10px"}} onClick={() => deleteTask(task.id)}>Delete</button>
               </div>
               <input
                className="check"
                type="checkbox"
                checked={task.completed || false}
                onChange={() => handleCheckboxChange(task.id)}
              />
               <br></br>
             </li>
           ))}
         </ol>
         </div>
         </div>
    );

}


export default TaskPage;

