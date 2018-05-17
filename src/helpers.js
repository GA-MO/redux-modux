import variables from './variables'

const isOtherType = (actionType) => actionType === variables.keyOtherTypeOption
const getActionName = (actionType) => actionType.split('.')[1]

export { isOtherType, getActionName }
