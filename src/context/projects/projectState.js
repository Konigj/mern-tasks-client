import { useReducer } from 'react'
import {v4 as uuidv4} from 'uuid'

import projectContext from './projectContext'
import projectReducer from './projectReducer'

import {FORM_PROJECT, GET_PROJECTS, 
    ADD_PROJECT, VALIDATE_FORM, CURRENT_PROJECT,
    DELETE_PROJECT} from '../../types'

const ProjectState = props => {
    const initialState = {
        form: false,
        projects: [],
        errorform: false,
        project: null,
    }

    // dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // functions for CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT,

        })
    }

    const projects = [
        {id: 1, name: 'Store'},
        {id:2 ,name: 'Design Web'},
        {id: 3, name: 'Portfolio'},
    ]

    // show the projects array
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }
    
    //Add a new project

    const addProject = project => {
        project.id = uuidv4();
        dispatch({
            type: ADD_PROJECT,
            payload:project,
        })
    }

    //valid add project fomr
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM,
        })
    }

    // select current project
    const currentProject = projectId => {
        dispatch({
            type:CURRENT_PROJECT,
            payload: projectId,
        })
    }

    const deleteProject = projectId => {
        dispatch({
            type: DELETE_PROJECT,
            payload:projectId,
        })
    }
 

    return (
        <projectContext.Provider value={{
            form: state.form,
            projects:state.projects,
            errorform: state.errorform,
            project: state.project,
            showForm,
            getProjects,
            addProject,
            showError,
            currentProject,
            deleteProject,
        }}>
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;