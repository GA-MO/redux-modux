/* global , it, describe */

import chai, { assert } from 'chai'
import createActionHandler from '../src/createActionHandler'
import createAction from '../src/createAction'
import { createModule } from '../src'
import { create } from 'domain'
const expect = chai.expect

const initialState = []

const addTodo = (state, action) => state
const deleteTodo = (state, action) => state

const handlers = {
  addTodo,
  deleteTodo
}

const handleOtherTypes = {
  handleOtherTypes: {
    ADD_USER: (state) => state,
    REMOVE_USER: (state) => state
  }
}

describe('Test Create Module', () => {
  const actionHandlers = createActionHandler(handlers)
  const actions = createAction(actionHandlers)

  const actionHandleOtherTypes = createActionHandler(handleOtherTypes)
  const actionWithOtherTypes = createAction(actionHandleOtherTypes)

  const reduxModule = createModule(initialState, handlers)

  it('Create Action Handler', () => {
    expect(actionHandlers).to.have.all.keys(
      '@@reduxAction.addTodo',
      '@@reduxAction.deleteTodo'
    )

    expect(actionHandlers).to.have
      .property('@@reduxAction.addTodo')
      .that.is.a('function')

    expect(actionHandlers).to.have
      .property('@@reduxAction.deleteTodo')
      .that.is.a('function')

    assert.equal(Object.keys(actionHandlers).length, 2)
  })

  it('Create Action Handler with handleOtherTypes', () => {
    expect(actionHandleOtherTypes).to.have.all.keys('handleOtherTypes')

    expect(actionHandleOtherTypes).to.have
      .property('handleOtherTypes')
      .to.have.all.keys('ADD_USER', 'REMOVE_USER')

    expect(actionHandleOtherTypes).to.have
      .property('handleOtherTypes')
      .that.is.a('object')
      .to.have.property('ADD_USER')
      .that.is.a('function')

    expect(actionHandleOtherTypes).to.have
      .property('handleOtherTypes')
      .that.is.a('object')
      .to.have.property('REMOVE_USER')
      .that.is.a('function')

    assert.equal(Object.keys(actionHandleOtherTypes).length, 1)
  })

  it('Create Action', () => {
    expect(actions).to.have.all.keys('addTodo', 'deleteTodo')

    expect(actions).to.have.all.keys('addTodo', 'deleteTodo')

    expect(actions).to.have.property('addTodo').that.is.a('function')

    expect(actions).to.have.property('deleteTodo').that.is.a('function')

    assert.equal(Object.keys(actions).length, 2)
  })

  it('Create Action with Handle Other Type', () => {
    assert.equal(Object.keys(actionWithOtherTypes).length, 0)
  })

  it('Create Module', () => {
    expect(reduxModule).to.have.all.keys('state', 'actions')
    expect(reduxModule).to.have.property('state').that.is.a('function')
    expect(reduxModule).to.have
      .property('actions')
      .that.is.a('object')
      .to.have.all.keys('addTodo', 'deleteTodo')
  })
})
