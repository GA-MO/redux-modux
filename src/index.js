import createActionHandler from './createActionHandler'
import createAction from './createAction'
import createReducer from './createReducer'

const createModule = ({ moduleName, initialState, handlers }) => {
  if (typeof initialState === 'undefined') {
    console.error('@redux-modux: initialState is required and should be a Object or Array in createModule()')
    return
  }

  if (typeof handlers === 'undefined') {
    console.error('@redux-modux: handlers is required and should be a Object in createModule()')
    return
  }

  const actionHandlers = createActionHandler({ moduleName, handlers })

  return {
    state: createReducer(initialState, actionHandlers),
    ...createAction(actionHandlers)
  }
}

export { createModule }
