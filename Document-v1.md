# Redux Modux

Redux Modux is concept to create the module in redux app for Create reducer, action handler and actions in a single file. 

[![npm version](https://badge.fury.io/js/redux-modux.svg)](https://badge.fury.io/js/redux-modux)
[![build](https://circleci.com/gh/GA-MO/redux-modux/tree/master.svg?style=shield&circle-token=7f4e5cdf8e9a36fc1e11c3593e3e31ec24a1c5a8)](https://circleci.com/gh/GA-MO/redux-modux/tree/master.svg?style=shield&circle-token=7f4e5cdf8e9a36fc1e11c3593e3e31ec24a1c5a8)

[Todo App Demo](https://stackblitz.com/edit/redux-modux)


#### Installation:
```
$ npm install redux-modux --save
$ yarn add redux-modux
```

## Table of Contents
- [Source Structure](#app-structure)
- [Create Module](#create-module)
- [How to use a Module](#how-to-use-a-module)
  - [State](#state)
  - [Action](#action)
- [Handle Other Action Type](#handle-other-action-type)

## App Structure
```
src
  ...
  |-actions
  |-components
  |-containers
  |-modules
    |-moduleA
    |-moduleB
    |-index.js
  |-store
  ...
```
## Create Module
Create reducer, action handler and actions in a single file with `createModule`.

Example Create `user` module.

```js
// modules/user/index.js

import { createModule } from 'redux-modux'

const initialState = {
  firstName: '',
  lastName: '',
  age: '',
}

const updateValueUser = (state, action) => {
  return {
    ...state,
    firstName: action.firstName,
    lastName: action.lastName,
    age: action.age
  }
}

const handlers = {
  updateValueUser
}

export default createModule(initialState, handlers)
```
The output of `user` module
```js
  import user from './user'

  console.log('User', user)

  // The log is:
  // {
  //   state: reducer
  //   actions: {
  //     updateValueUser: action
  //   }
  // }
```

## How to use a module

`createModule` return `state` and `actions`

### State
```js
// modules/index.js

import { combineReducers } from 'redux'
import user from './user'

export default combineReducers({
  todo: todo.state,
  user: user.state,
})
```

### Action
```js
import React from 'react'
import { connect } from 'react-redux'
import user from '../modules/user'

class App extends React.Component {
  handleClickUpdateUser = () => {
    const userData = {
      firstName: 'Peter',
      lastName: 'Parker',
      age: '25'
    }

    this.props.dispatch(user.actions.updateValueUser(userData))
  }

  render() {
    return <button onClick={this.handleClickUpdateUser}>Update User Data</button>
  }
}

export default connect(null)(Home)
```

## Handle Other Action Type
How to handle action type that is not existing type in the module.

Add `handleOtherTypes` key to handlers parameter.
```js
// modules/user/index.js

import { createModule } from 'redux-modux'

const initialState = {
  firstName: '',
  lastName: '',
  age: '',
}

const updateValueUser = (state, action) => {
  return {
    ...state,
    firstName: action.firstName,
    lastName: action.lastName,
    age: action.age
  }
}

const handlers = {
  updateValueUser,
  handleOtherTypes: { // Example to handle other action types
    'INITIAL_DATA_FROM_SERVER': (state, action) => state,
    'APP_LOADING': (state, action) => state,
    'APP_ERROR': (state, action) => state,
  }
}

export default createModule(initialState, handlers)
```