import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import ChemicalInfo from './ChemicalInfo';
import StockInfo from './StockInfo';
import MyLab from './MyLab';
import { tsImportEqualsDeclaration } from '@babel/types';

//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class Chemical extends Component {

    state = {
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible2: false,
            volume: '',
            chemical : this.props.chemical,
            remainingVolume : ''
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
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



    handleRemove = (id) => {
        // 삭제 버튼이 클릭되면 MyLab에서 해당되는 stockId를 찾아 그것을 삭제한다.
        alert("폐기하기를 누르셨습니다.");
        /*  const chemicals = MyLab.state;
          if (MyLab.state.chemicals === id.chemicals) //내가 눌렀던 약품의 chemicals.StockId를 찾는다.
              //slice 전후로 데이터를 복사하고, 우리가 찾는 index (누른 index)는 제외시킨다.
              this.setState({
                  chemicals: [
                      ...chemicals.slice(0, 4),
                      ...chemicals.slice(4 + 1, chemicals.lenght)
                  ]
              });
          */
    }


    handleChoosePlace = () => {
        this.setState({
            visible: false,
            visible2: true,
        })
        alert("보관장소를 선택합니다.");
    }

    handleInsert = () => {
        const { chemicals, input } = MyLab.state;

        const newChem = {
            name: "aa",
            casNo: "bb",
            formula: "cc",
            mw: 1,
            mp: 2,
            bp: 3
        };
        MyLab.setState({
            chemicals: [...chemicals, newChem],
            input: ''
        });
    }

    handleChange = (e) => {
        this.setState({
            volume: e.target.value
        })
    }

    handleUpdate = (e) => {
        alert(this.state.volume + "만큼을 줄입니다.");
        console.log(this.state.volume)
        this.setState({
         volume : 3
        })
    }

    render() {
        const { input, data, onRemove } = this.props;
        const {
            handleOk,
            handleCancle,
            handleRemove
        } = this;



        return (
            <span>
                <center>
                    {/* 버튼 */}
                    <Button Button shape="circle" icon="fire" onClick={this.showModal} style={{ fontSize: '25px' }} size="large" />
                    {/* 뜨는 창 */}
                    <Modal
                        title="약품 정보"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        {/* 정보 출력  */}
                        <ChemicalInfo chemical={this.props.chemical} />
                        <StockInfo stockInfo={this.state.chemical.stockInfo} />
                        <input
                            type="text"
                            name="사용량"
                            placeholder="사용량을 적으세요"
                            value={this.state.volume}
                            onChange={this.handleChange}>

                        </input>
                        <button onClick={this.handleUpdate}  >사용량 업데이트</button><br />
                        
                        <span>
                            <Button onClick={this.handleChoosePlace} >장소 수정</Button><br />

                            <Modal title="장소 수정"

                                visible={this.state.visible2}

                                onOk={this.handleOk}>
                                ok를 눌러서 창을 닫으세요
                            </Modal>


                        </span>
                        <button onClick={handleRemove}>폐기 하기</button>
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