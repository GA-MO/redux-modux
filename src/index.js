import createActionHandler from './createActionHandler'
import createAction from './createAction'
import createReducer from './createReducer'

const createModule = (initialState, handlers) => {
  const actionHandlers = createActionHandler(handlers)

  return {
    state: createReducer(initialState, actionHandlers),
    actions: createAction(actionHandlers)
  }
}

export { createModule }
