import React, { Component } from 'react';
import './App.css';
import BookList from './BookList'

class App extends Component {

  render() {
    return (
      <div>
        <h1>Books on Books on Books on Books</h1>
        <BookList/>
      </div>
    );
  }
}

export default App;
