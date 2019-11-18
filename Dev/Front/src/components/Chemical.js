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
                        여기에 사용량 업데이트 <br/>
                        장소수정 <br/>
                        폐가히기 버튼 추가하기
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