import { TASKS_PROJECT, ADD_TASK, VALIDATE_TASK,
     DELETE_TASK, STATE_TASK, CURRENT_TASK, UPDATE_TASK, CLEAR_TASK } from '../../types'

export default (state, action) => {
    switch (action.type) {
    
        case TASKS_PROJECT:
            return{
                ...state,
                tasksProject: state.tasks.filter(task => task.projectId === action.payload)
            }
        case ADD_TASK:
            return{
                ...state,
                tasks: [action.payload, ...state.tasks],
                taskError: false,
            }
        case VALIDATE_TASK:
            return{
                ...state,
                taskError: true,
            }
        case DELETE_TASK:
            return{
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            }
        case UPDATE_TASK:
        case STATE_TASK:
            return{
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
            }
        case CURRENT_TASK:
            return{
                ...state,
                selectedTask: action.payload,
            }
        case CLEAR_TASK:
            return{
                ...state,
                selectedTask: null,
            }

        default:
            return state;
    }
}