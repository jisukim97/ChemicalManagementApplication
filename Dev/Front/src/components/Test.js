import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";

import { Second } from './Second.js';
import { Thrid } from './Thrid.js';
import { Fourth } from './Fourth.js';

class Test extends Component {

    render() {
        if (match.params.name===1) {
            return (
                <div>
                    <Link to='/test/2'><Button type="primary">2</Button></Link>
                    <Link to='/test/3'><Button type="primary">3</Button></Link>
                    <Link to='/test/4'><Button type="primary">4</Button></Link>
                    <Link to='/test/5'><Button type="primary">5</Button></Link>
                </div>
            )
        } else if (match.params.name===2) {
            return (
                <div>
                    <Second/>
                </div>
            )
        } else if (match.params.name===3) {
            return (
                <div>
                    <Thrid/>
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
