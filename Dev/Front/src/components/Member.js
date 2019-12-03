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
                    <Icon type="smile" style={{fontSize : 30}} />
                </center>
                <center>
                    {this.props.members.name}
                </center>
            </span>
        );
    }
}

export default Member;
