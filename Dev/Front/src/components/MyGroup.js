import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card } from 'antd'

const { Title } = Typography;


class MyGroup extends Component {

    state = {

    }

    constructor(props){
        super(props);
        this.state = {
            menu : 0
        }
    }

    firstButtonClick = () => {
        this.setState( {
            menu : 1
        })
    }

    secondButtonClick = () => {
        this.setState( {
            menu : 2
        })
    }

    thirdButtonClick = () => {
        this.setState( {
            menu : 3
        })
    }

    fourthButtonClick = () => {
        this.setState( {
            menu : 4
        })
    }

    getContent = () => {
        if (this.state.menu === 1){
            return (<b>my Lab 생성 내용</b>)
        } else if (this.state.menu === 2){
            return (<b>멤버 초대 내용</b>)
        } else if (this.state.menu === 3){
            return (<b>Lab 가입 신청 내용</b>)
        } else if (this.state.menu === 4){
            return (<b>my Lab 탈퇴 내용</b>)
        } else {
            return (<b>member 리스트</b>)
        }
    }

    render() {
        return (
            <div>
                <br />
                <center><Title style={{ marginBottom: 50 }}>MyGroup</Title></center>

                {/* 버튼 4개 */}
                <Row style={{margin : 20}}>
                    <Col span={12}><center><Button type="primary" onClick={this.firstButtonClick}>my Lab 생성</Button></center></Col>
                    <Col span={12}><center><Button type="primary" onClick={this.secondButtonClick} >멤버 초대</Button></center></Col>
                </Row>

                <Row style={{margin : 20}}>
                    <Col span={12}><center><Button type="primary" onClick={this.thirdButtonClick} >Lab 가입 신청</Button></center></Col>
                    <Col span={12}><center><Button type="primary" onClick={this.fourthButtonClick} >my Lab 탈퇴</Button></center></Col>
                </Row>

                {/* 내용 */}
                <div>
                    <Card style={{margin : 20}}>
                        {this.getContent()}
                    </Card>
                </div>

            </div>
        );
    }
}

export default MyGroup;
