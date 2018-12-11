import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import { Checkbox } from 'material-ui'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'


import {
    addTaskAsyncAction,
    addTaskInputChange,
    toogleTasksAsyncAction,
    filterInputChange,
    deleteTaskAsyncAction,
    showCompleteTaskAction,
    showUncompleteTaskAction,
    showTasks
} from './state/toDo'

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
        <br />
        <TextField
            hintText='Search for task'
            onChange={props._filterInputChange}
        />
        <RaisedButton
            label='Show all tasks'
            secondary={true}
            onClick ={props._showTasks}
        />
        <RaisedButton
            label='Uncompleted tasks'
            secondary={true}
            onClick ={props._showUncompleteTaskAction}
        />
        <RaisedButton
            label='Completed tasks'
            secondary={true}
            onClick ={props._showCompleteTaskAction}
        />
        <List>
            {
                props._visibleToDos &&
                    props._visibleToDos.map ?
                    props._visibleToDos.map(todo =>
                        <ListItem
                            primaryText={todo.text}
                            key={todo.key}
                            style={todo.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
                            leftCheckbox={
                                <Checkbox
                                    defaultChecked={todo.completed}
                                    onCheck={() => props._toggleTasksAsyncAction(todo)}
                                />
                            }
                            rightIconButton={
                                <IconButton
                                    onClick={() => props._deleteTaskAsyncAction(todo.key)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                    )
                    : null
            }
        </List>
    </Paper>
)

const mapStateToProps = state => ({
    _textTask: state.toDo.textTask,
    _allToDos: state.toDo.allToDos,
    _visibleToDos: state.toDo.visibleToDos,
    _filter: state.toDo.filter

})

const mapDispatchToProps = dispatch => ({
    _addTaskAsyncAction: () => dispatch(addTaskAsyncAction()),
    _addTaskInputChange: (event) => dispatch(addTaskInputChange(event.target.value)),
    _toggleTasksAsyncAction: (task) => dispatch(toogleTasksAsyncAction(task)),
    _filterInputChange: event => dispatch(filterInputChange(event.target.value)),
    _showTasks:() => dispatch(showTasks()),
    _showCompleteTaskAction: () => dispatch(showCompleteTaskAction()),
    _showUncompleteTaskAction:() => dispatch(showUncompleteTaskAction()),
    _deleteTaskAsyncAction:(key) => dispatch(deleteTaskAsyncAction(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)