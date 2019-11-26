import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import { history } from './History';
import { PrivateRoute } from './PrivateRoute';

import LoginAndRegister from './components/LoginAndRegister';
import Main from './components/Main';

import './App.css';

class App extends Component {
  
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            {/* 로그인 & 회원가입 */}
            <Route path='/login' exact component={LoginAndRegister} /> 
            <Route path='/register' exact component={LoginAndRegister} />

            {/* /로 시작하는 모든 경로는 Main으로 라우팅 */}
            <PrivateRoute path='/' component={Main} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
