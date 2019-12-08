import React, { Component } from 'react';

import {Typography} from 'antd';


const { Title } = Typography;

class MenuTitle extends Component {

    //props로 title을 보내줘야 함
    render() {
        return (
            <div style={{ height: 100, background: '#4B589F' }}>
                <center><br /><Title style={{ marginBottom: 35, fontSize: 29, color: 'white' }}>{this.props.title}</Title></center>
            </div>
        )
    }
}

export default MenuTitle;