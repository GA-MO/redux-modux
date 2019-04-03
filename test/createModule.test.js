/* global , it, describe */

import chai, { assert } from 'chai'
import { getActionName } from '../src/helpers'
import createActionHandler from '../src/createActionHandler'
import createAction from '../src/createAction'
import getDefaultActionHandler from '../src/getDefaultActionHandler'
import { createModule } from '../src'

const expect = chai.expect

const initialState = []

const addTodo = (state, action) => state
const deleteTodo = (state, action) => state

const handlers = {
  addTodo,
  deleteTodo,
  ...getDefaultActionHandler(initialState)
}

const handleOtherTypes = {
  handleOtherTypes: {
    ADD_USER: state => state,
    REMOVE_USER: state => state
  }
}

describe('Test Create Module', () => {
  const actionHandlers = createActionHandler({ handlers })
  const actions = createAction(actionHandlers)

  const actionHandleOtherTypes = createActionHandler({ handlers: handleOtherTypes })
  const actionWithOtherTypes = createAction(actionHandleOtherTypes)

  const actionHandleWithModuleName = createActionHandler({ moduleName: 'myModule', handlers })

  const reduxModule = createModule({ initialState, handlers })

  it('Create Action Handler', () => {
    for (let key in actionHandlers) {
      assert.include(`${key}`, `@@reduxAction_`, `${getActionName(key)}`)
      expect(actionHandlers)
        .to.have.property(key)
        .that.is.a('function')
    }

    const handlerSizeBefore = Object.keys(handlers).length
    const handlerSizeAfter = Object.keys(actionHandlers).length

    assert.equal(handlerSizeBefore, handlerSizeAfter)
  })

  it('Create Action Handler with moduleName', () => {
    for (let key in actionHandleWithModuleName) {
      assert.include(`${key}`, `@@reduxAction_myModule`, `${getActionName(key)}`)
    }
  })

  it('Create Action Handler with handleOtherTypes', () => {
    expect(actionHandleOtherTypes).to.have.all.keys('handleOtherTypes')

    expect(actionHandleOtherTypes)
      .to.have.property('handleOtherTypes')
      .to.have.all.keys('ADD_USER', 'REMOVE_USER')

    expect(actionHandleOtherTypes)
      .to.have.property('handleOtherTypes')
      .that.is.a('object')
      .to.have.property('ADD_USER')
      .that.is.a('function')

    expect(actionHandleOtherTypes)
      .to.have.property('handleOtherTypes')
      .that.is.a('object')
      .to.have.property('REMOVE_USER')
      .that.is.a('function')

    assert.equal(Object.keys(actionHandleOtherTypes).length, 1)
  })

  it('Create Action', () => {
    expect(actions)
      .to.have.property('addTodo')
      .that.is.a('function')

    expect(actions)
      .to.have.property('deleteTodo')
      .that.is.a('function')

    const handlerSizeBefore = Object.keys(actionHandlers).length
    const handlerSizeAfter = Object.keys(actions).length

    assert.equal(handlerSizeBefore, handlerSizeAfter)
  })

  it('Get default Action handler', () => {
    const defaultActionHandler = getDefaultActionHandler(initialState)
    expect(defaultActionHandler)
      .to.have.property('set')
      .that.is.a('function')

    expect(defaultActionHandler)
      .to.have.property('resetDefault')
      .that.is.a('function')
  })

  it('Create Action with Handle Other Type', () => {
    assert.equal(Object.keys(actionWithOtherTypes).length, 0)
  })

  it('Create Module', () => {
    expect(reduxModule).to.have.all.keys('state', 'addTodo', 'deleteTodo', 'set', 'resetDefault')
    expect(reduxModule)
      .to.have.property('state')
      .that.is.a('function')
  })
})
