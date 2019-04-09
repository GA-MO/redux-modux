# Redux Modux

Redux Modux is concept to create the module in redux app for Create reducer, action handler and actions in a single file.

[![npm version](https://badge.fury.io/js/redux-modux.svg)](https://badge.fury.io/js/redux-modux)
[![build](https://circleci.com/gh/GA-MO/redux-modux/tree/master.svg?style=shield&circle-token=7f4e5cdf8e9a36fc1e11c3593e3e31ec24a1c5a8)](https://circleci.com/gh/GA-MO/redux-modux/tree/master.svg?style=shield&circle-token=7f4e5cdf8e9a36fc1e11c3593e3e31ec24a1c5a8)

Document for version 1 [see](https://github.com/GA-MO/redux-modux/blob/master/Document-v1.md)

[Todo App Demo](https://stackblitz.com/edit/redux-modux-v2)

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
- [Default Action handler](#default-action-handler)
- [Get action type string](#get-action-type-string)
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

Example Create `profile` module.

```js
// modules/profile/index.js

import { createModule } from 'redux-modux';

const initialState = {
  firstName: '',
  lastName: '',
  age: ''
};

const updateProfileValue = (state, action) => {
  return {
    ...state,
    firstName: action.firstName,
    lastName: action.lastName,
    age: action.age
  };
};

const handlers = {
  updateProfileValue
};

export default createModule({
  moduleName: 'Profile', // Optional (Prefix when console.log  action's type)
  initialState,
  handlers
});
```

The output of `profile` module

```js
import profile from './profile';

console.log('Profile', profile);

// The log is:
// {
//   state: reducer
//   updateProfileValue: action
// }
```

## How to use a module

`createModule` return `state` and key of actions

### State

```js
// modules/index.js

import { combineReducers } from 'redux';
import profile from './profile';

export default combineReducers({
  todo: todo.state,
  profile: profile.state
});
```

### Action

```js
import React from 'react';
import { connect } from 'react-redux';
import profile from '../modules/profile';

class App extends React.Component {
  handleClickUpdateProfile = () => {
    const newProfile = {
      firstName: 'Peter',
      lastName: 'Parker',
      age: '25'
    };

    this.props.dispatch(profile.updateProfileValue(newProfile));
  };

  render() {
    return <button onClick={this.handleClickUpdateProfile}>Update Profile</button>;
  }
}

export default connect(null)(Home);
```

## Default Action handler

<details>
<summary>set</summary>

> Suport with object state only

```js
import someModule from '../modules/someModule';

dispatch(
  someModule.set({
    key: '',
    value: ''
  })
);
```

</details>

<details>
<summary>resetDefault</summary>

Reset module state to intital state

```js
import someModule from '../modules/someModule';

dispatch(someModule.resetDefault());
```

</details>

## Get action type string

You can get action type from action

```js
import someModule from '../modules/someModule';

someModule.updateProfileValue.actionType; // @@reduxAction_moduleName.updateProfileValue
```

## Handle Other Action Type

How to handle action type that is not existing type in the module.

Add `handleOtherTypes` key to handlers parameter.

```js
// modules/profile/index.js
...

const handlers = {
  updateProfileValue,
  handleOtherTypes: { // Example to handle other action types
    'INITIAL_DATA_FROM_SERVER': (state, action) => state,
    'APP_LOADING': (state, action) => state,
    'APP_ERROR': (state, action) => state,
  }
}

...
```
