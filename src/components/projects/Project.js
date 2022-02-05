import {useContext} from 'react';
import projectContext from "../../context/projects/projectContext";
import TaskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

  const projectsContext = useContext(projectContext);
  const {currentProject} = projectsContext;
  const TasksContext = useContext(TaskContext);
  const {getTasks} = TasksContext;

  const selectProject = id => {
    currentProject(id);
    getTasks(id)
  }

  return (
    <li>
        <button onClick={() => selectProject(project._id)} type='button' className='btn btn-blank'>{project.name}
        </button>  
    </li>
  )
}

export default Project;
