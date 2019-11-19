import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from "react-router-dom";

class MenuBar extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Link to="/mylab">
                            <center>
                                <Icon type="home" theme="filled" style={{ fontSize: '32px' }} /><br />
                                My Lab
                            </center>
                        </Link>
                    </Col>

                    <Col span={6}>
                        <Link to="/apparatus/0">
                            <center>
                                <Icon type="experiment" theme="filled" style={{ fontSize: '32px' }} /><br />
                                Apparatus
                            </center>
                        </Link>                    
                    </Col>

                    <Col span={6}>
                        <Link to="/alarm">
                            <center>
                                <Icon type="bell" theme="filled" style={{ fontSize: '32px' }} /><br />
                                Alarm
                            </center>
                        </Link>                    
                    </Col>

                    <Col span={6}>
                        <Link to="/mygroup">
                            <center>
                                <Icon type="team" style={{ fontSize: '32px' }} /><br />
                                My Group
                            </center>
                        </Link>                    
                    </Col>

                </Row>
            </div>
        );
    }
}

export default MenuBar;