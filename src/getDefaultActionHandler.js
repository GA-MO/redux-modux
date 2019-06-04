function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object
}

export default initialState => ({
  set: (state, action) => {
    if (!isObject(initialState)) {
      console.error('@redux-modux: Cannot use set because initialState is not an Object')
      return state
    }

    if (!action.key || (!action.value && action.value !== '')) {
      console.error(`@redux-modux: set is require "key" and "value"`)
      return state
    }

    if (!initialState.hasOwnProperty(action.key)) {
      console.error(`@redux-modux: ${action.key} is not defined in initialState`)
      return state
    }

    return { ...state, [action.key]: action.value }
  },
  resetDefault: () => initialState
})
