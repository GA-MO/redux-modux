import { isOtherType } from './helpers'

export default (initialState, handlers) => {
  return (state = initialState, action) => {
    const handleAction = (actionHandlers) => {
      for (let actionType in actionHandlers) {
        const handler = actionHandlers[actionType]

        if (actionType === action.type) return handler(state, action)
        if (isOtherType(actionType)) return handleAction(handler)
      }

      return state
    }

    return handleAction(handlers)
  }
}
