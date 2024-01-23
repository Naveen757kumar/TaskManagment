// src/components/Login.js
import {  useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase-config';
import {Link, useNavigate} from 'react-router-dom';
import './Login.css'

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');
  const [errorInvalid,setErrorInvalid]=useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {

    setError('');
    setErrorInvalid('');

    if(!email  || !password)
    {
      setError("Please enter both email and password");
      return;
    }


    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      const user = userCredential.user;
      const userUID = user.uid; 
      console.log(userUID);

      navigate("/welcome", { state: { email, uid: user.uid }});


    } catch (error) {
      console.error('Login error:', error.message);
      
      setErrorInvalid("Email or Password invalid. Please try again ");
    }
  };

  return (
    <div className='Lo'>
      <h1>Task Management Application</h1>
      <div className='L'>
      <h2>Login</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {
        error && (<p style={{color:"red"}}>{error} </p>
      )}
      {
        errorInvalid && (<p style={{color:"red"}}>{errorInvalid} </p>
      )}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      </div>
    </div>
  );
};

export default Login;
