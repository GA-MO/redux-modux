import { isOtherType, getActionName } from './helpers'

export default handlers => {
  return Object.keys(handlers).reduce((result, actionType) => {
    if (isOtherType(actionType)) return result

    const actionName = getActionName(actionType)
    let action = (payload = {}) => ({
      type: actionType,
      ...payload
    })

    action.actionType = actionType

    return { ...result, [actionName]: action }
  }, {})
}
