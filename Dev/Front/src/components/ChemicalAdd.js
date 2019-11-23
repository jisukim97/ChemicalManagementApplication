import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import ChemicalInfo from './ChemicalInfo';
import StockInfo from './StockInfo';

//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class ChemicalAdd extends Component {

    state = {
        visible: false,
        visible2: false,
        information: '',
        keyword: ''
    }

    constructor(props) {
        super(props);
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => { //두번쩨걸 닫고 첫번째 창을 켠다
        console.log(e);
        this.setState({
            visible: true,
            visible2: false,
        });
    };

    handleCancel = e => { //둘다 닫는다
        console.log(e);
        this.setState({
            visible: false,
            visible2: false,
        });
    };

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value,
        });
    }


    handleAdd = () => {
        alert("약품을 추가합니다.");
    }

    handleNickname = () => {
        alert("별칭을 설정합니다.");
    }

    handleChoosePlace = () => {
        this.setState({
            visible: false,
            visible2: true,
        })
        alert("보관장소를 선택합니다.");
    }

    handleChooseChem = () => {
        alert("시약을 선택합니다.");
    }

    render() {


        const { keyword } = this.state;


        const ChemicalAdd = ({ value, onChamge, onInsert }) => {
            const handleKeyPress = (e) => {
                if (e.key === 'Enter') {
                    onInsert();
                }
            }
        }


        return (
            
            <span>
                <center>
                    {/* 버튼 */}
                    <Button Button shape="circle" icon="fire" onClick={this.showModal} style={{ fontSize: '25px' }} size="large" />
                    {/* 뜨는 창 */}
                    <Modal
                        title="약품 추가"
                        visible={this.state.visible}
                        onCancel={this.handleCancel} //둘다 닫는다
                    >
                        {/* 정보 출력  */}
                        <input
                            placeholder="검색 할 이름을 입력하세요.."
                            onChange={this.handleChange}
                            value={keyword}
                        /> <br />
                        <br />
                        <ChemicalInfo chemical={{ chemicalName: "added chemical" }} />

                        <button onClick={this.handleChooseChem} >시약 선택</button><br />
                        <input placeholder="별칭을 설정하세요" /> <button onClick={this.handleNickname}>별칭 설정</button><br />

                        <span>
                            <Button onClick={this.handleChoosePlace} >보관 장소 선택</Button><br />

                            <Modal title="장소 설정"

                                visible={this.state.visible2}

                                onOk={this.handleOk}>
                                ok를 눌러서 창을 닫으세요
                            </Modal>


                        </span>
                        <button onClick={this.handleAdd} >추가하기</button><br />

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