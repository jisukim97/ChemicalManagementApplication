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
                            <center >
                                <span style={{ color: 'white' }}>
                                    <Icon type="experiment" theme="filled" style={{ fontSize: '32px' }} /><br />
                                    Chemicals
                                </span>
                            </center>
                        </Link>
                    </Col>

                    <Col span={6}>
                        <Link to="/apparatus/0">
                            <center>
                                <span style={{ color: 'white' }}>
                                    <Icon type="hdd" theme="filled" style={{ fontSize: '32px' }} /><br />
                                    Apparatus
                                    </span>
                            </center>
                        </Link>
                    </Col>

                    <Col span={6}>
                        <Link to="/alarm">
                            <center>
                                <span style={{ color: 'white' }}>
                                    <Icon type="bell" theme="filled" style={{ fontSize: '32px' }} /><br />
                                    Alarm
                                    </span>
                            </center>

                        </Link>
                    </Col>

                    <Col span={6}>
                        <Link to="/mygroup">
                            <center>
                                <span style={{ color: 'white' }}>
                                    <Icon type="team" style={{ fontSize: '32px' }} /><br />
                                    my Lab
                                    </span>
                            </center>

                        </Link>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default MenuBar;