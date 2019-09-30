import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';

import './Box.css'

class Buttons extends Component {
    render() {
        return (
            <div id="box">
                <div className='middle'> <Link to='/add' id='color'><Button type="primary" size='large'>ADD</Button></Link> </div>
                <div className='middle'> <Link to='/list' id='color'><Button type="primary" size='large'>LIST</Button></Link> </div>
            </div>
        );
    }
}

export default Buttons;