import {useContext, useEffect} from 'react';
import Project from './Project';
import projectContext from "../../context/projects/projectContext";
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import AlertContext from '../../context/alerts/alertsContext'

const ProjectList = () => {

  //Context - Projects
  const projectsContext = useContext(projectContext)
  const {message, projects, getProjects} = projectsContext;
  
  const alertContext = useContext(AlertContext);
  const {alert, showAlert} = alertContext
 

  useEffect(() => {

    if(message) {
      showAlert(message.msg, message.category);
    }
    
    getProjects()
    //eslint-disable-next-line
  }, [message]);
  
  
  // check if a project exists
  if (projects.length === 0 ) return <p>There are no projects, create one.</p>;


  return (
    <ul className='list-projects'>
    {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) :null}
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition timeout={200} classNames="project" key={project._id}>
            <Project project={project}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  )
};

export default ProjectList;
