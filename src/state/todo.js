const ADD_TODO = 'todo/ADD_TODO'

const INITIAL_STATE = {
    allTodos: [],
    visibleTodos: [],
    filter: '',
    textTask: ''
};





export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                textTask: action.text
            }
        default:
            return state
    }
}