import { isOtherType } from './helpers'

export default (handlers) => {
  return Object.keys(handlers).reduce((result, actionType) => {
    if (isOtherType(actionType)) return result

    const actionName = handlers[actionType].name
    const action = (payload = {}) => ({
      type: actionType,
      payload
    })

    return { ...result, [actionName]: action }
  }, {})
}
