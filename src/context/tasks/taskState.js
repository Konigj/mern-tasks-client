import { useReducer } from 'react'
import TaskContext from './taskContext'
import TaskReducer from './taskReducer'
import clientAxios from '../../config/axios'

import { TASKS_PROJECT, ADD_TASK,
    VALIDATE_TASK, DELETE_TASK,
    CURRENT_TASK, UPDATE_TASK, CLEAR_TASK } from '../../types'

const TaskState = props => {

    const initialState ={
        tasksProject:[],
        taskError: false,
        selectedTask: null,
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState)


    const getTasks = async project => {

        try {
            const result = await clientAxios.get('/api/tasks', {params: {project}})
            
            dispatch({
                type: TASKS_PROJECT,
                payload: result.data.tasks,
            })
            
        } catch (error) {
            console.log(error)
        }

        
    }

    const addTask = async task => {
        
        try {
            const result = await clientAxios.post('/api/tasks', task)
            console.log(result)
            dispatch({
                type:ADD_TASK,
                payload: task,
            })

            
        } catch (error) {
            console.log(error)
        }

        
    }

    const validateTask = () => {
        dispatch({
            type:VALIDATE_TASK,
        })
    }

    const deleteTask = async (id, project) => {

        try {
            await clientAxios.delete(`/api/tasks/${id}`, {params:{project}})
            dispatch({
                type: DELETE_TASK,
                payload: id,
            })
            
        } catch (error) {
            
        }

        
    }

    const updateTask = async task => {

        try {
            
            const result = await clientAxios.put(`/api/tasks/${task._id}`, task)
            
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task,
            })
        } catch (error) {
            console.log(error)
        }
    }


    const setCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }


    const clearTask = () => {
        dispatch({
            type:CLEAR_TASK
        })
    }

    return (
        <TaskContext.Provider
        value={{
            tasksProject:state.tasksProject,
            taskError: state.taskError,
            selectedTask:state.selectedTask,
            getTasks,
            addTask,
            validateTask,
            deleteTask,
            setCurrentTask,
            updateTask,
            clearTask,
        }}>
            {props.children}
        </TaskContext.Provider>
    )

}

export default TaskState;