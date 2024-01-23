import React, { useState } from "react";
import {   useLocation, useNavigate } from 'react-router-dom'
import { database } from "../firebase-config";
import { update, ref } from "firebase/database";



const Taskupdate = () => {

    const location = useLocation();
    const email = location.state?.email || 'User';
    const uid = location.state?.uid;
    
    const selectedTask = location.state?.selectedTask || null;
   
    const object = location.state?.foundObject;
    console.log("tasks update",object,selectedTask);

    const [title, setTitle] = useState(object?.title || '');
    const [description, setDescription] = useState(object?.description || '');
    const [dueDate, setDueDate] = useState(object?.dueDate || '');


    const Navigate = useNavigate('');


   


    const handleUpdateTask = () => {
        // Update the selected task in Firebase
        if (selectedTask) {
          const taskRef = ref(database, `tasks/${uid}/${selectedTask}`);
          update(taskRef, {
            title,
            description,
            dueDate,
          }); }
    
        
         Navigate("/welcome",{ state : {email,uid}});
    }





    return (
        <div>
       
        <div className="Create">
        <h2>Update Task</h2>
        
        <label>Title:</label>
        <input className="tit" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <p>Description:</p>
        <textarea className="desc" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="date">
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <button style={{backgroundColor:"chocolate"}} onClick={handleUpdateTask}>Update</button>

      </div>
        
      </div>
    );


}

export default Taskupdate;