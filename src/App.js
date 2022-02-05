import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 

import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Projects from './components/projects/Projects'
import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/PrivateRoute'
//check if there is a token

const token = localStorage.getItem('token')
if(token) {
  tokenAuth(token);
}

function App() {

  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Routes>
                <Route path='/' element={<Login />}  />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/projects' element={
                  <PrivateRoute>
                    <Projects/>
                  </PrivateRoute>
                }/>
                
                </Routes>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
