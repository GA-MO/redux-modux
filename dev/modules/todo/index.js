import { createModule } from '../../redux-modux'

const initialState = []

const addTodo = (state, action) => [
  ...state,
  {
    id: Date.now(),
    label: action.label
  }
]

const deleteTodo = (state, action) => {
  return state.filter(todo => todo.id !== action.id)
}

const handlers = {
  addTodo,
  deleteTodo
}

export default createModule(initialState, handlers)