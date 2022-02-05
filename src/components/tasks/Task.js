import {useContext} from 'react';
import projectContext from "../../context/projects/projectContext";
import TaskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {

  const projectsContext = useContext(projectContext);
  const {project} = projectsContext;
  const [currentProject] = project;


  const TasksContext = useContext(TaskContext);
  const {deleteTask, getTasks,updateTask,  setCurrentTask} = TasksContext;

  const onClickDeleteTask = id => {
    deleteTask(id, currentProject._id)
    getTasks(currentProject.id);
  }

  const changeState = task => {
    if(task.state) {
      task.state=false;
    } else {
      task.state = true;
    }
    updateTask(task);
  }

  const selectTask = task => {
    setCurrentTask(task)
  }

  return (
      <li className='task shadow'>
        <p>{task.name}</p>
        <div className='state'>
            {task.state 
            ? ( <button onClick={()=>changeState(task)} type='button' className='complete'>Complete</button>)
            : ( <button onClick={()=>changeState(task)} type='button' className='incomplete'>Incomplete</button>)
            }
        </div>

        <div className='actions'>
            <button onClick={()=> selectTask(task)} type='button' className='btn btn-primary'>Edit</button>
            <button onClick={() =>onClickDeleteTask(task._id)}  type='button' className='btn btn-secondary'>Delete</button>
        </div>
      </li>
  )
};

export default Task;
