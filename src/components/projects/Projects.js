import {useContext, useEffect} from 'react';
import Bar from '../layout/Bar';
import Sidebar from '../layout/Sidebar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import AuthContext from '../../context/auth/authContext';

const Projects = () => {

  //extract auth data
  const authContext = useContext(AuthContext)
  const {authUser} = authContext

  useEffect(()=> {
    authUser();
    //eslint-disable-next-line
  }, [])


  return (
      <div className='container-app'>
        <Sidebar/>

        <div className='section-principal'>
            <Bar/>

            <main>
                <TaskForm/>
                <div className='container-tasks'>
                    <TaskList/>
                </div>
            </main>
        </div>
      </div>
  )
};

export default Projects;
