import React, {Component} from 'react';
import {history} from './History';
import { Router, Route, Switch } from "react-router-dom";

import LoginAndRegister from './components/LoginAndRegister';
import Main from './components/Main';

import './App.css';

import 

class App extends Component {
  
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path='/login' exact component={LoginAndRegister} /> 
            <Route path='/register' exact component={LoginAndRegister} />
            <Route path='/main' exact component={Main}/>
            <Route path='/add' exact component={Main}/>
            <Route path='/list' exact component={Main}/>
            <Route path='/test/:id' component={Test} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
