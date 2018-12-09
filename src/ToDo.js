import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List } from 'material-ui/List'
import { MenuItem } from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'

import { addTaskAsyncAction, addTaskInputChange, toogleTasksAsyncAction } from './state/todo'

const ToDo = props => (
    <Paper>
        <TextField
            hintText='Add new task'
            value={props._textTask}
            onChange={props._addTaskInputChange}
        />
        <RaisedButton
            label='Add new task'
            secondary={true}
            onClick={props._addTaskAsyncAction}
        />
        <TextField
            hintText='Search for task'
        />
        <RaisedButton
            label='Show all tasks'
            secondary={true}
        />
        <RaisedButton
            label='Uncompleted tasks'
            secondary={true}
        />
        <RaisedButton
            label='Completed tasks'
            secondary={true}
        />
        <List>
            {
                props.allTodos &&
                    props._allTodos.map ?
                    props._allTodos.map(todo =>
                        <MenuItem
                            primaryText={todo.task}
                        />
                    )
                    : null
            }
        </List>
    </Paper>
)

const mapStateToProps = state => ({
    _textTask: state.todo.textTask,
    _allTodos: state.todo.allTodos,

})

const mapDispatchToProps = dispatch => ({
    _addTaskAsyncAction: () => dispatch(addTaskAsyncAction()),
    _addTaskInputChange: (event) => dispatch(addTaskInputChange(event.target.value)),
    _toggleTasksAsyncAction: (task) => dispatch(toogleTasksAsyncAction(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)