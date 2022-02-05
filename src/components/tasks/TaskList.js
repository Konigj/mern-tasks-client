import { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import TaskContext from '../../context/tasks/taskContext';
import Task from "./Task";
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const TaskList = () => {

    const projectsContext = useContext(projectContext);
    const {project, deleteProject} = projectsContext;

    const TasksContext = useContext(TaskContext);
    const {tasksProject} = TasksContext;

   
    if(!project) return <h2>Select a project</h2>;

    const [currentProject] = project;

    //if there are not selected project
    
    const onClickDelete = () => {
        deleteProject(currentProject._id);
    }

  return (
      <>
        <h2>Project: {currentProject.name}</h2>
        
        <ul className='list-tasks'>
            {tasksProject.length === 0
                ? (<li className='task'><p>No Tasks</p></li>)
                :<TransitionGroup>
                {
                    tasksProject.map(task => (
                        <CSSTransition timeout={200} classNames="task" key={task._id}>
                            <Task  task={task}/>
                        </CSSTransition>
                    ))
                }
                </TransitionGroup>

            }
        </ul>

        <button onClick={onClickDelete} className="btn btn-delete">Delete Project &times;</button>
      </>
  )
};

export default TaskList;
