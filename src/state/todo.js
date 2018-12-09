import { database } from '../firebaseConfig'

const ADD_TODO_INPUT = 'todo/ADD_TODO_INPUT'
const RENDER_LIST = 'todo/RENDER_LIST'

const INITIAL_STATE = {
    allTodos: null,
    visibleTodos: [],
    filter: '',
    textTask: ''
};

export const addTaskAsyncAction = () => (dispatch, getState) => {
    const newTask = getState().todo.textTask
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

export const addTaskInputChange = text => ({
    type: ADD_TODO_INPUT,
    text
})

const renderTaskList = tasks => ({
    type: RENDER_LIST,
    tasks
})

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
                allTodos: action.tasks
            }
        default:
            return state
    }
}