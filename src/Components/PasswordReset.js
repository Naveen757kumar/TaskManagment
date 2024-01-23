// src/components/PasswordReset.js
import { useState } from 'react';
import {getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../firebase-config';
import { Link } from 'react-router-dom';
import './Reset.css'


const auth = getAuth(app);

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [success,setSuccess] = useState('');
  const [failure,setFailure]=useState('');
  

  const handleResetPassword = async () => {
    
    setSuccess("");
    setFailure("");

    try {

      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
      setSuccess(true)
    } catch (error) {
      console.error('Password reset error:', error.message);
      setFailure(true);
    }
  };

  return (
    <div className='res'>
      <h1>Task Management Application</h1>
    <div className='Re'>
      <h2>Password Reset</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      {
        failure && ( <p style={{color:"red"}}>Please enter valid email</p>)
      }
      <button onClick={handleResetPassword}>Reset Password</button>
      {
        success && ( <p style={{color:"green"}}>Sucessfully password reset email sent</p>)
      }
      <p>
        Remember your password? <Link to="/">Login</Link>
      </p>
    </div>
    </div>
  );
};

export default PasswordReset;
