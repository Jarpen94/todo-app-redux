import { database } from '../firebaseConfig'
import  {filterArray}  from '../utils'

const ADD_TODO_INPUT = 'todo/ADD_TODO_INPUT'
const RENDER_LIST = 'todo/RENDER_LIST'
const DELETE_TASK = 'todo/DELETE_TASK'
const SHOW_TASKS = 'todo/SHOW_TASKS'
const SHOW_COMPLETE_TASK = 'todo/SHOW_COMPLETE_TASK'
const SHOW_UNCOMPLETE_TASK = 'todo/SHOW_UNCOMPLETE_TASK'
const FILTER_INPUT = 'todo/FILTER_INPUT'

const INITIAL_STATE = {
    allToDos: null,
    visibleToDos: null,
    currentFilter: '',
    textTask: ''
};

export const addTaskAsyncAction = () => (dispatch, getState) => {
    const newTask = getState().toDo.textTask
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).push({
        text: newTask,
        completed: false
    })
}

export const deleteTaskAsyncAction = (key) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).child(key).remove()
}

export const toogleTasksAsyncAction = (task) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks/${task.key}`).update({
        completed: !task.completed
    })
}


export const tasksListAsyncAction = () => (dispatch, getState) => {
    const uuid = getState().auth.user.uid
    database.ref(`users/${uuid}/tasks`).on(
        'value',
        snapshot => {
            if (snapshot.val()) {
                const tasks = Object.entries(
                    snapshot.val()
                ).map(entry => ({
                    ...entry[1],
                    key: entry[0]
                }))
                dispatch(renderTaskList(tasks))
            } else {
                dispatch(renderTaskList(null))
            }
        }

    )
}

export const addTaskInputChange = text => ({
    type: ADD_TODO_INPUT,
    text
})


const renderTaskList = tasks => ({
    type: RENDER_LIST,
    tasks
})

export const showCompleteTaskAction = () => ({
    type: SHOW_COMPLETE_TASK
})

export const showUncompleteTaskAction = () => ({
    type: SHOW_UNCOMPLETE_TASK
})

export const showTasks = () => ({
    type: SHOW_TASKS
})

export const filterInputChange = text => ({
    type: FILTER_INPUT,
    text
})





export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TODO_INPUT:
            return {
                ...state,
                textTask: action.text
            }
        case RENDER_LIST:
            return {
                ...state,
                allToDos: action.tasks,
                visibleToDos: filterArray(action.tasks, state.currentFilter)
            }
            case FILTER_INPUT:
            return{
                ...state,
                filterToDo: action.text,
                visibleToDos: filterArray(state.allToDos, action.text)
            }
        case DELETE_TASK:
            return {
                ...state,
                textTask: ''
            }
        case SHOW_TASKS:
            return {
                ...state,
                visibleToDos: filterArray(state.allToDos, state.currentFilter)
            }
        case SHOW_COMPLETE_TASK:
            return {
                ...state,
                visibleToDos: filterArray(state.allToDos
                    .filter(todo => todo.completed === true),
                    state.currentFilter)
            }
        case SHOW_UNCOMPLETE_TASK:
            return {
                ...state,
                visibleToDos: filterArray(state.allToDos
                    .filter(todo => todo.completed === false),
                    state.currentFilter)
            }
        default:
            return state
    }
}