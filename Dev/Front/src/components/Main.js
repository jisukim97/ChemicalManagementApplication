import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Header from './Header';
import MenuBar from './MenuBar'

import MyLab from './MyLab';
import Apparatus from './Apparatus';
import Alarm from './Alarm';
import MyGroup from './MyGroup';


class Main extends Component {


    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    render() {

        const header = 60;
        const menubar = 80;
        const body = this.state.height - header - menubar

        const heights = {
            header: header,
            menubar: menubar,
            body: body
        }

        return (
            <div>
                {/* 헤더 */}
                <Header height={heights.header} width={this.state.width} />

                {/* 바디 background : 'rgb(35, 41, 48)' */}
                <div style={{ overflowX: 'auto', height: heights.body, padding: 10, background : 'white' }}>
                    <Switch>
                        <Route path='/mylab' component={MyLab} />
                        <Route path='/apparatus/:apparatusId' component={Apparatus} />
                        <Route path='/alarm' component={Alarm} />
                        <Route path='/mygroup' component={MyGroup} />
                    </Switch>
                </div>

                {/* 메뉴바 */}
                <div style={{borderTop : 'solid 15px', borderBottom : 'solid 15px',borderColor : 'rgb(35, 41, 48)', background: 'rgb(35, 41, 48)'}}>
                    <MenuBar />
                </div>
            </div>
        );
    }
}

export default Main;