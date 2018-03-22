import { isOtherType } from './helpers'
import variables from './variables'

export default (funcs) => {
  return Object.keys(funcs).reduce((result, actionType) => {
    let key = `${variables.prefixActionType}.${actionType}`

    if (isOtherType(actionType)) {
      key = variables.keyOtherTypeOption
    }

    return { ...result, [key]: funcs[actionType] }
  }, {})
}
