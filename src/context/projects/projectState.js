import { useReducer } from 'react'
import projectContext from './projectContext'
import projectReducer from './projectReducer'
import clientAxios from '../../config/axios'

import {FORM_PROJECT, GET_PROJECTS, 
    ADD_PROJECT, VALIDATE_FORM, CURRENT_PROJECT,
    DELETE_PROJECT, ERROR_PROJECT} from '../../types'

const ProjectState = props => {
    const initialState = {
        form: false,
        projects: [],
        errorform: false,
        project: null,
        message:null,
    }

    // dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // functions for CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT,

        })
    }

    // show the projects array
    const getProjects = async () => {

        try {
            const result = await clientAxios.get('/api/projects')

            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'There is an error',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }
        
    }
    
    //Add a new project

    const addProject = async project => {

        try {
            const result = await clientAxios.post('/api/projects', project)
            console.log(result)
            dispatch({
                type: ADD_PROJECT,
                payload:result.data
            })
            
        } catch (error) {
            const alert = {
                msg: 'There is an error',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })

        }
        
        
    }

    //valid add project form
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

    const deleteProject = async projectId => {

        try {
            await clientAxios.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload:projectId,
            })
            
        } catch (error) {
            const alert = {
                msg: 'There is an error',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }

        
    }
 

    return (
        <projectContext.Provider value={{
            form: state.form,
            projects:state.projects,
            errorform: state.errorform,
            project: state.project,
            message: state.message,
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