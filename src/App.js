import Register from './Components/Register';
import Login from './Components/Login.js'
import PasswordReset from './Components/PasswordReset';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Taskpage from './Components/Taskpage.js';
import Taskupdate from './Components/Taskupdate';
import Taskform from './Components/Taskform.js';
import TaskDetails from './Components/TaskDetails.js';
import React from 'react';

function App() {
  const MyComponent = React.lazy(() => import('./Components/Login.js'));
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<PasswordReset/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/welcome" element={<Taskpage/>}></Route>
        <Route path="/update" element={<Taskupdate/>}></Route>
        <Route path="/task" element={<TaskDetails />} />
        <Route path="/form" element={<Taskform/>}></Route>
        <Route path="/" component={MyComponent} />

      </Routes>
    </Router>
    
  );
}

export default App;
