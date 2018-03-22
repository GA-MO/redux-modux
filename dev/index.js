import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import createStore from './store'
import Home from './containers/home';
import './style.css';

const store = createStore()

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

render(<Root />, document.getElementById('root'));
