import React, { Component } from 'react';
import { Icon } from 'antd';

//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class Member extends Component {

    state = {
        visible: false
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <center>
                    <Icon type="smile" theme="twoTone" twoToneColor="#5BC7AE" style={{fontSize : 35}} />
                </center>
                <center>
                <font size='2.5' font color='black'>{this.props.members.name}</font>
                </center>
            </span>
        );
    }
}

export default Member;
