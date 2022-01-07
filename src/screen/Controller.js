import React, { Component } from 'react';
import Home from './home/Home';
import Login from './login/Login';
import Profile from './profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {
  constructor() {
    super();
    this.note = "Triggered from router";
  }
  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Login {...props}  note={this.note}  />} />
          <Route path='/home' render={(props) => <Home {...props} note={this.note}  />} />
          <Route path='/profile' render={(props) => <Profile {...props} note={this.note}  />} />
        </div>
      </Router>
    )
  }
}

export default Controller;