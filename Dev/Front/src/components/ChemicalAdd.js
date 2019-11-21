import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import ChemicalInfo from './ChemicalInfo';
import StockInfo from './StockInfo';

//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class ChemicalAdd extends Component {

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
                    <Button Button shape="circle" icon="plus" onClick={this.showModal} style={{ fontSize: '25px' }} size="large"/>
                    {/* 뜨는 창 */}
                    <Modal
                        title="약품 추가"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        {/* 약품 검색  */}
                        여기에 약품이름 검색창 <br/>
                        <Button Button shape="circle" icon="search" onClick={this.showModal} /> <br/>
                        검색된거 정보 <br/>
                        <ChemicalInfo chemical={{ chemicalName : "added chemical"}} />
                        
                        {/*별칭 설정*/}
                        <Button icon="search">Search</Button>
                        <Button>중복확인</Button> <br/>

                        {/*장소 선택*/}
                        <Button icon="search">Search</Button>
                        <Button>선택</Button> <br/>

                    </Modal>
                </center>
                <center>
                    약품 추가하기
                </center>
            </span>
        );
    }
}

export default ChemicalAdd;