import createActionHandler from './createActionHandler'
import createAction from './createAction'
import createReducer from './createReducer'
import getDefaultActionHandler from './getDefaultActionHandler'

const createModule = ({ moduleName, initialState, handlers }) => {
  if (typeof initialState === 'undefined') {
    console.error('@redux-modux: initialState is missing in createModule()')
    return
  }

  const handlerWithDefault = { ...handlers, ...getDefaultActionHandler(initialState) }

  const actionHandlers = createActionHandler({
    moduleName,
    initialState,
    handlers: handlerWithDefault
  })

  return {
    state: createReducer(initialState, actionHandlers),
    ...createAction(actionHandlers)
  }
}

export { createModule }
