import { useContext, useState, useEffect } from "react";
import projectContext from "../../context/projects/projectContext";
import TaskContext from '../../context/tasks/taskContext';
    
const TaskForm = () => {

  const projectsContext = useContext(projectContext);
  const {project} = projectsContext;

  const TasksContext = useContext(TaskContext);
  const {selectedTask, addTask, taskError, 
    validateTask, getTasks, updateTask, clearTask} = TasksContext;

  

  useEffect(() => {
        if(selectedTask !== null){
          setTask(selectedTask)
        } else {
          setTask({
            name: '',
          })
        }
        
  }, [selectedTask]);

  const [task, setTask] = useState({
    name: '', 
  })

  const {name} = task;

  
  
  const handleChange = e => {

    setTask({
      ...task, 
      [e.target.name]: e.target.value,
    })
  }

  

  


  if(!project) return null;

  const [currentProject] = project;

  const onSubmitTask = e => {
    e.preventDefault();

    if (name.trim() === '') {
      validateTask();
      return;
    }

    if(selectedTask === null){
    // adding task
    task.projectId = currentProject.id;
    task.state = false;
    addTask(task)
       
    } else {
      updateTask(task)
      clearTask()
    }
    

    //get and filter tasks of actual project
    getTasks(currentProject.id);

    // reset form
    setTask({
      name: '',
    })
    
  }

 
  



  return (
    <div className='form' onSubmit={onSubmitTask}>
      <form>
        <div className='container-input'>
            <input onChange={handleChange} value={name} type='text' className='input-text' placeholder="Task's Name" name='name'/>
        </div>
        <div className='container-input'>
            <input type='submit' className='btn btn-primary btn-submit btn-block' 
            value={selectedTask? "Edit Task"  : "Add Task" }/>
        </div>
      </form>
      {taskError ? <p className="message error">A name is required</p> :null}
    </div>
  )
};

export default TaskForm;
