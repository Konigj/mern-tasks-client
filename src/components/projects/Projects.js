import React from 'react';
import Bar from '../layout/Bar';
import Sidebar from '../layout/Sidebar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';

const Projects = () => {
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
