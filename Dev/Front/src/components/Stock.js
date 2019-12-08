import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import StockInfo from './StockInfo';

//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class Stock extends Component {


    constructor(props) {
        super(props);

        this.state = {
            chemicalInfoVisible: false
        }
    }

    showModal = () => {
        this.setState({
            chemicalInfoVisible: true,
        });
    };

    handleOk = e => { //두번쩨걸 닫고 첫번째 창을 켠다
        this.setState({
            chemicalInfoVisible: false,
        });
    };

    render() {
        const {stock} = this.props; //stock을 props로 넣어 주어야 함

        //고체는 gold, 액체는 experiment, 기체는 cloud

        const status = stock.chemical.status.toLowerCase()

        const iconType = (status.match("liquid") || status.match("solution")) ? "experiment" : status.match("gas") ? "cloud" : "gold"
        return (
            <span>
                <center>
                    {/* 버튼 */}
                    <Button Button icon={iconType} onClick={this.showModal} style={{ fontSize: '25px' }} size="large" shape="circle" />
                    {/* 뜨는 창 */}
                    <Modal
                        title={stock.nickname+" 약품 정보"}
                        visible={this.state.chemicalInfoVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleOk}
                    >
                        {/* 정보 출력  */}
                        <StockInfo stock={stock} changeVolume={this.props.changeVolume} deleteStock={this.props.deleteStock}
                        changeInventory={this.props.changeInventory} />
                    </Modal>
                </center>
                <center>
                    {/* 버튼 아래 약품 이름 */}
                    {stock.nickname}
                </center>
            </span>
        );
    }
}

export default Stock;