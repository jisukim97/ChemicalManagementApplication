import React, { Component } from 'react';
import { Modal, Button } from 'antd';

//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class Chemical extends Component {


    constructor(props) {
        super(props);

        //props로 넘어온 stockId에 해당하는 stock의 정보를 불러와준다
        let stockId = this.props.stockId
        //여기서 백엔드에서 받아와서 이렇게 stock을 만들어 주면 됨
        let stock = {
            id : stockId,
            nickname : "닉네임",
            putDate : "2019/10/31",
            expireDate : "2019/10/31",
            volume : 100,
            remainingVolume: 50,
            chemical: {
                pH: 7,
                name: "벤젠",
                casNo: "71-43-2",
                formula: "C8H6",
                mw: 78.11,
                mp: 5.5,
                bp: 80.1
            }
        }
        this.state = {
            visible: false,
            visible2: false,
            stock : stock
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
                        <div style={{ margin: 10 }}>
                            <h3>이 약품에 대한 정보</h3>
                            <b>{this.state.stock.chemical.name}</b> <br />
                            cas No : {this.state.stock.chemical.casNo} <br />
                            formula : {this.state.stock.chemical.formula} <br />
                            MW : {this.state.stock.chemical.mw} <br />
                            mp/bp : {this.state.stock.chemical.mp}/{this.state.stock.chemical.bp} <br />
                        </div>

                        <div style={{ margin: 10 }}>
                            <h3>이 재고에 대한 정보</h3>
                            넣은날짜 : {this.state.stock.putDate} <br />
                            유효기간 : {this.state.stock.expireDate} <br />
                            남은용량 : {this.state.stock.volume} <br/>
                        </div>

                        {/* 이부분 antd로 바꾸기 */}
                        {/*
                        <input
                            type="text"
                            name="사용량"
                            placeholder="사용량을 적으세요"
                            value={this.state.volume} //이만큼이 까일 것이다.
                            onChange={this.handleChange}>
                        </input>
                        <button onClick={this.handleUpdate}  >사용량 업데이트</button><br />
                        */}
                        <div>
                            사용량 업데이트 폼
                        </div>
                        
                        <span>
                            <Button onClick={this.handleChoosePlace} >장소 수정</Button><br />
                            <Modal title="장소 수정"
                                visible={this.state.visible2}
                                onOk={this.handleOk}>
                                ok를 눌러서 창을 닫으세요
                            </Modal>
                        </span>
                        <button onClick={this.handleRemove}>폐기 하기</button>
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