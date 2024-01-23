import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TaskDetails.css';

const TaskDetails = () => {


    const location = useLocation();
    const object = location.state?.Object;
    const email = location.state?.email;
    const uid = location.state?.uid;
    const taskId=location.state?.taskId;
    const Navigate = useNavigate('');

    console.log("taskId",taskId);
    
   const Edit = () => 
   {
    Navigate("/update", { state:{foundObject:object,email,uid,selectedTask:taskId}});
   }


    return (
        <div className="Details">
            <h2 style={{textAlign:'center'}}>Task Details</h2>
            <h3>Title: </h3>
            <p>{object.title}</p>
            <h3>Description: </h3>
            <p style={{whiteSpace:"pre-wrap"}}>{object.description}</p>
            <h3>Due Date: </h3>
            <p>{object.dueDate}</p>
            <button className='edit' onClick={() => {Edit()}}>Edit</button>
        </div>
    );



}

export default TaskDetails;