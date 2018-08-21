import variables from './variables'

const isOtherType = (actionType) => actionType === variables.keyOtherTypeOption
const getActionName = (actionType) => actionType.split('.')[1]
const getHash = () => Math.random().toString(36).substr(2, 9).toUpperCase()

export { isOtherType, getActionName, getHash }
