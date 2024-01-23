// src/components/Register.js
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase-config';
import {Link} from 'react-router-dom'
import './Register.css'


const auth = getAuth(app);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess,setRegistrationSuccess] = useState('');
  const [emailError,setEmailError]=useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alreadyExit,setAlreadyExit]=useState('');

  const handleRegister = async () => {

    setEmailError('');
    setPasswordError('');
    setAlreadyExit('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if(!emailRegex.test(email))
    {
        setEmailError(true);
        return;
    }

    if (!passwordRegex.test(password)) {
        setPasswordError('Password must contain at least 8 characters, one alphabet, and one symbol');
        return;
      }

    


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration error:', error.message);
      setAlreadyExit(true);
    }
  };

  return (
    <div className='Reg'>
      <h1>Task Management Application</h1>
      <div className='R'>
      <h2>Register</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {emailError && (<p style={{color:"red"}}>Please enter a valid email address</p>)}

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

      <button onClick={handleRegister}>Register</button>
      { alreadyExit && (<p style={{color:"red"}}>Email Already Exists</p>)}
      {registrationSuccess && (
        <p style={{ color: 'green' }}>Registration successful! You can now <Link to="/">login</Link>.</p>
      )}
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
    </div>
  );
};

export default Register;
