import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";

import Second from './Second.js';
import Third from './Third.js';
import Fourth from './Fourth.js';

class Test extends Component {

    render() {
        console.log(this.props.match.params)
        if (this.props.match.params.id==="1") {
            return (
                <div>
                    <Link to='/test/2'><Button type="primary">2</Button></Link>
                    <Link to='/test/3'><Button type="primary">3</Button></Link>
                    <Link to='/test/4'><Button type="primary">4</Button></Link>
                    <Link to='/test/5'><Button type="primary">5</Button></Link>
                </div>
            )
        } else if (this.props.match.params.id==="2") {
            return (
                <div>
                    <Second/>
                </div>
            )
        } else if (this.props.match.params.id==="3") {
            return (
                <div>
                    <Third/>
                </div>
            )
        } else {
            return (
                <div>
                    <Fourth/>
                </div>
            )
        }
    }
}

export default Test;
