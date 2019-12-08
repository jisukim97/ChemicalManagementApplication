import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import './LoginAndRegister.css';

class LoginAndRegister extends Component {

    render() {
        return (
            <div style= {{marginTop: 150}}>
                <div className='login' >
                    <h1 id='loginHeadline' style={{color : '#5BC7AE'}}>SYLVY</h1>
                    <div style={{ margin: '10px 0' }}>
                        <Switch >
                            <Route path='/login' exact component={Login} />
                            <Route path='/register' excat component={Register} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginAndRegister;