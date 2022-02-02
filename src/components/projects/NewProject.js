import { useState, useContext } from "react";
import projectContext from "../../context/projects/projectContext";

const NewProject = () => {

    const projectsContext = useContext(projectContext)

    const {form, errorform, showForm, addProject, showError} = projectsContext;

    const [project, setProject] = useState({
        name: '',
    });

    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value,
        })
    }

    const {name} = project;

    const onSubmitProject = e => {
        e.preventDefault();
        
        if(name === '') {
            showError();
            return;
        }

        addProject(project);

        setProject({
            name: '',
        })
        
    }

    //show Add Project Form
    const onClickForm = () => {
        showForm();
    }

  return (
      <>
      <button type='button' className='btn btn-block btn-primary' onClick={onClickForm}>
      New Project</button>
     
      {
          form
          ? (
            <form onSubmit={onSubmitProject} className='form-new-project'>
            <input onChange={onChangeProject} value={name} type='text' className='input-text' placeholder="Project's Name" name='name'/>
            <input  type='submit' className='btn btn-primary btn-block' value='Add Project'/>
          </form>
          )
          : null
      }
      {errorform ? <p className="message error"> A name is required</p>  : null}
      </>
         
  );
};

export default NewProject;
