import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from "react-router-dom";

import Header from './Header';
import Buttons from './Buttons';
import Add from './Add';
import List from './List';

import './Main.css';

const { Footer, Content } = Layout;

class Main extends Component {

    render() {
        return (
            <div>
                <Layout>
                    <Header/>
                    <Content >
                        <div className='MarginTop'>
                        <Switch>
                            <Route path='/main' exact component={Buttons} />
                            <Route path='/add' exact component={Add} />
                            <Route path='/list' exact component={List} />
                        </Switch>
                        </div>
                    </Content>
                    <Footer>
                        <div className='footer'>
                            Copyright 2019. Team 3 All rights reserved.
                        </div>
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default Main;