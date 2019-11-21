import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import ChemicalInfo from './ChemicalInfo';
import StockInfo from './StockInfo';


//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class Chemical extends Component {

    state = {
        visible: false
    }

    constructor(props) {
        super(props);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <span>
                <center>
                    {/* 버튼 */}
                    <Button Button shape="circle" icon="fire" onClick={this.showModal} style={{ fontSize: '25px' }} size="large"/>
                    {/* 뜨는 창 */}
                    <Modal
                        title="약품 정보"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        {/* 정보 출력  */}
                        <ChemicalInfo chemical={this.props.chemical} />
                        <StockInfo chemical={this.props.chemical} />

                        {/* 사용량 업데이트 */}
                        <input id="data" size="10"></input>
                        <Button id="btn">Update</Button>
                        <div id="display"></div>
                        <script src="get_value_of_input_box.js"></script>

                        {/*Login꺼 배낀거*/}
                        <Form onSubmit={this.handleSubmit} className="form">
                            {/* 이메일 폼*/}
                            <Form.Item>
                                {getFieldDecorator('email', {
                                rules: [{ required: true, message: '이메일을 입력 해 주세요!' }],
                            })(
                                    <Input
                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Email"
                                    />,
                                )}
                            </Form.Item>

                    
                        <Button type="Update">Update</Button> <br/> {/*사용량 업데이트*/}
                        <Button type="장소수정">Change</Button> <br/>
                        <Button type="폐기하기">Discard</Button>
                    </Modal>
                </center>
                <center>
                    {this.props.chemical.nickname}
                </center>
            </span>
        );
    }
}

export default Chemical;