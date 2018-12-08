import React, { Component } from 'react';
import ToDo from './ToDo'
import Auth from './Auth'

class App extends Component {
  render() {
    return (
      <Auth>
      <ToDo />
      </Auth>
    );
  }
}

export default App
