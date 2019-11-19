import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card, List } from 'antd'
import { Link } from "react-router-dom";

const { Title } = Typography;

class Apparatus extends Component {

    state = {
    }

    constructor(props){
        super(props);
        const { apparatusId } = this.props.match.params;
        this.state = {
            menu : apparatusId,
            apparatusList: [
                {
                    id: 1,
                    name: "apparatus1"
                }, {
                    id: 2,
                    name: "apparatus2"
                }, {
                    id: 3,
                    name: "apparatus3"
                }, {
                    id: 4,
                    name: "apparatus4"
                }, {
                    id: 5,
                    name: "apparatus5"
                }
            ]
        }
    }

    shouldComponentUpdate(props) {
        return true
    }

    //현재 페이지 내에서 파라미터만 변경되었을 경우
    componentWillReceiveProps(newProps){
        if (this.props.match.params !== newProps.match.params){
            const { apparatusId } = this.props.match.params;
            this.setState({menu : apparatusId})
        }
    }


    getUrl = (id) => {
        const url = '/apparatus/' + id;
        return (url)
    }

    render() {
        return (
            <div>
                <br />
                <center><Title style={{ marginBottom: 50 }}>Apparatus</Title></center>

                <Row >
                    <Col span={8} style={{margin : 10}} >
                        {/* 기기들 목록 */}
                        <List
                            grid={{ gutter: 16, column: 1 }}
                            dataSource={this.state.apparatusList}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={this.getUrl(item.id)}><Button type="primary">{item.name}</Button></Link>
                                </List.Item>
                            )}
                        />
                        <Button >기기 추가</Button>
                    </Col>
                    <Col span={13} >
                        {/* 기기들 상세 창 */}
                        <Card>
                            {this.state.menu} 번의 예약 정보
                        </Card>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default Apparatus;
