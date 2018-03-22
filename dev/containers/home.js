import React from 'react'
import { connect } from 'react-redux'
import todo from '../modules/todo'

class Home extends React.Component {
  handleClickAdd = () => {
    this.props.dispatch(todo.actions.addTodo({
      label: 'Todo Item'
    }))
  }

  render() {
    console.log('props', this.props)
    return (
      <div><button onClick={this.handleClickAdd}>Add</button></div>
    )
  }
}

const mapState = (state) => ({
  todo: state.todo
})

export default connect(mapState)(Home)