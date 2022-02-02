import {useContext, useEffect} from 'react';
import Project from './Project';
import projectContext from "../../context/projects/projectContext";
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const ProjectList = () => {

  //Context - Projects
  const projectsContext = useContext(projectContext)
  const {projects, getProjects} = projectsContext;
  
 

  useEffect(() => {
    getProjects()
    //eslint-disable-next-line
  }, []);
  
  
  // check if a project exists
  if (projects.length === 0 ) return <p>There are no projects, create one.</p>;


  return (
    <ul className='list-projects'>
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition timeout={200} classNames="project" key={project.id}>
            <Project project={project}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  )
};

export default ProjectList;
