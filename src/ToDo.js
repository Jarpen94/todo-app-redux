import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'


const ToDo = props => (
    <div>
        <TextField
            hintText='Add new task'
            value = {}
            onChange = {}
        />
        <RaisedButton
            label='Add new task'
            primary={false}
            onClick={}
        />
        <TextField
            hintText='Search for task'
        />
        <RaisedButton
            label='Show all tasks'
            primary={false}
        />
        <RaisedButton
            label='Uncompleted tasks'
            primary={false}
        />
        <RaisedButton
            label='Completed tasks'
            primary={false}
        />
    </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps(ToDo))