import { createModule } from '../../redux-modux'

const initialState = {
  name: '',
  age: '',
  sex: ''
}

const updateUserData = (state, action) => ({
  ...state,
  [action.key]: action.value
})

const logOtherAction = (state, action) => {
  console.log('logOtherAction', action)
  return state
}

const handlers = {
  updateUserData,
  handleOtherTypes: {
    '@@reduxAction.addTodo': logOtherAction,
    'OTHER_ACTION': logOtherAction
  }
}

export default createModule(initialState, handlers)