import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';

import ChemicalInfo from './ChemicalInfo';

const { Search } = Input;


//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class ChemicalAdd extends Component {

    state = {
        visible: false,
        chemical : {}
    }

    constructor(props) {
        super(props);
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = e => { //둘다 닫는다
        this.setState({
            visible: false,
        });
    };

    search = (chemicalName) => {
        console.log(chemicalName)
        var chemical = {
            id: 30,
            name : "name6",
            casNo : "71-43-2",
            formula : "C6H6",
            molecularWeight : 78.11,
            status : 1,

            meltingPoint : 20.0,
            boilingPoint : 30.0,
            pH : 7.0,
            density : 3.5,
            deliquescent : false,
            efflorescence : false,

            photoReaction : false,
            flammability : false,
            ignitability : true,
            explosive : false,
            combustibility : true,

            classifiaction : 1,
        }
        this.setState({chemical : chemical})

    }

    render() {

        return (
            
            <span>
                <center>
                    {/* 버튼 */}
                    <Button Button shape="circle" icon="fire" onClick={this.showModal} style={{ fontSize: '25px' }} size="large" />
                    {/* 뜨는 창 */}
                    <Modal
                        title="약품 추가"
                        visible={this.state.visible}
                        onOk={this.handleCancel}
                        onCancel={this.handleCancel} //둘다 닫는다
                    >
                        {/* 검색 창 */}
                        <Search
                            placeholder="약품 이름을 입력 해 주세요"
                            enterButton="Search"
                            size="middle"
                            onSearch={value => this.search(value)}
                        />

                        {/* 정보 출력  */}
                        <ChemicalInfo chemical={this.state.chemical} />

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