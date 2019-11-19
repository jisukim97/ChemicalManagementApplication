import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Header from './Header';
import MenuBar from './MenuBar'

import MyLab from './MyLab';
import Apparatus from './Apparatus';
import Alarm from './Alarm';
import MyGroup from './MyGroup';


class Main extends Component {

    render() {
        return (
            <div>
                {/* 헤더 */}
                <Header />

                {/* 바디 */}
                <div style={{ height : 550 }}>
                    <Switch>
                        <Route path='/mylab' component={MyLab} />
                        <Route path='/apparatus/:apparatusId' component={Apparatus} />
                        <Route path='/alarm' component={Alarm} />
                        <Route path='/mygroup' component={MyGroup} />
                    </Switch>
                </div>

                {/* 메뉴바 */}
                <MenuBar />
            </div>
        );
    }
}

export default Main;