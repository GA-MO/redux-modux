import { isOtherType, getHash } from './helpers'
import variables from './variables'

export default ({ moduleName = false, handlers = {} }) => {
  return Object.keys(handlers).reduce((result, actionType) => {
    const name = moduleName || getHash()

    let type = `${variables.prefixActionType}_${name}.${actionType}`

    if (isOtherType(actionType)) {
      type = actionType
    }

    const actionHandler = handlers[actionType]

    return { ...result, [type]: actionHandler }
  }, {})
}
