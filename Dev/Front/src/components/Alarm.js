import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card, List } from 'antd'

const { Title } = Typography;


class Alarm extends Component {

    state = {

    }

    constructor(props){
        super(props);
        this.state = {
            type : 1
        }
    }

    makeTypeOne = () => {
        this.setState({type : 1})
    }

    makeTypeTwo = () => {
        this.setState({type : 2})
    }

    makeTypeThree = () => {
        this.setState({type : 3})
    }
    
    getContent = () => {
        if (this.state.type===1){
            return (<div>유효기간 알림들</div>)
        } else if (this.state.type===2) {
            return (<div>재고소진 알림들</div>)
        } else {
            return (<div>의심질병 알림들</div>)
        }
    }


    render() {
        return (
            <div>
                <br />
                <center><Title style={{ marginBottom: 50 }}>Alarm</Title></center>
                
                <Row style={{marginBottom : 30}}>
                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeOne} style={{ fontSize: '25px' }} size="large"/><br/>
                        유효기간
                    </center></Col>

                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeTwo} style={{ fontSize: '25px' }} size="large"/><br/>
                        재고소진
                    </center></Col>

                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeThree} style={{ fontSize: '25px' }} size="large"/><br/>
                        의심질병
                    </center></Col>
                </Row>

                <Card style={{margin : 10}}>
                    {this.getContent()}
                </Card>
            </div>
        );
    }
}

export default Alarm;