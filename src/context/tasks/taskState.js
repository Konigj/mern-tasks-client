import { useReducer } from 'react'
import TaskContext from './taskContext'
import TaskReducer from './taskReducer'
import {v4 as uuidv4} from 'uuid'
import { TASKS_PROJECT, ADD_TASK,
    VALIDATE_TASK, DELETE_TASK, STATE_TASK,
    CURRENT_TASK, UPDATE_TASK, CLEAR_TASK } from '../../types'

const TaskState = props => {

    const initialState ={
        tasks:[
            {id:1, name: 'Choose Colors', state: false, projectId:2},
            {id:2, name: 'Choose Platform', state: true, projectId:1},
            {id:3, name: 'Choose Hosting', state: false, projectId:3},
            {id:4, name: 'Choose Payments', state: true, projectId:4},
            {id:5, name: 'Choose Platform', state: true, projectId:1},
            {id:6, name: 'Choose Colors', state: false, projectId:2},
            {id:7, name: 'Choose Hosting', state: false, projectId:3},
            {id:8, name: 'Choose Payments', state: true, projectId:4},
            {id:9, name: 'Choose Colors', state: false, projectId:2},
            {id:10, name: 'Choose Hosting', state: false, projectId:3},
            {id:11, name: 'Choose Payments', state: true, projectId:4},
        ],
        tasksProject:null,
        taskError: false,
        selectedTask: {},
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState)


    const getTasks = projectId => {
        dispatch({
            type: TASKS_PROJECT,
            payload: projectId,
        })
    }

    const addTask = task => {
        task.id = uuidv4();
        dispatch({
            type:ADD_TASK,
            payload: task,
        })
    }

    const validateTask = () => {
        dispatch({
            type:VALIDATE_TASK,
        })
    }

    const deleteTask = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id,
        })
    }

    const changeTaskState = task => {
        dispatch({
            type:STATE_TASK,
            payload:task,
        })
    }

    const setCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task,
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
            tasks:state.tasks,
            tasksProject:state.tasksProject,
            taskError: state.taskError,
            selectedTask:state.selectedTask,
            getTasks,
            addTask,
            validateTask,
            deleteTask,
            changeTaskState,
            setCurrentTask,
            updateTask,
            clearTask,
        }}>
            {props.children}
        </TaskContext.Provider>
    )

}

export default TaskState;