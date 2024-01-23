import React, { useState } from "react";
import {  useLocation, useNavigate } from 'react-router-dom'
import { database } from "../firebase-config";
import { push, ref } from "firebase/database";
import './Taskform.css'


const Taskform = () => {

    const location = useLocation();
    const email = location.state?.email || 'User';
    const uid = location.state?.uid;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error,setError] = useState('');
    const Navigate = useNavigate('');


   


    const handleCreateTask = () => {

    if(!title)
    {
        setError("Please enter a title");
        return;
        
    }

    console.log(uid);
    
    push(ref(database,`tasks/${uid}`),{
        title,
        description,
        dueDate,
        completed: false,

    });

    
    setTitle('');
    setDescription('');
    setDueDate('');
    Navigate("/welcome",{ state : {email,uid}});




    }

    return (
        <div className="Taskform">
       
        <div className="Create">
        <h2>Create Task</h2>
        { error &&  (<p style={{color:"red"}}>{error} </p>)}
        <label className="title">Title:</label>
        <input className="tit" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br></br>
        <p>Description:</p>
        <label></label>
        <textarea className="desc" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="date">
        <label>Due Date:  </label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <button class="button" onClick={handleCreateTask}>Create Task</button>
      </div>
        
      </div>
    );
}

export default Taskform;