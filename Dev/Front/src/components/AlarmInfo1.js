import React, { Component } from 'react';
import { Col, Button, message } from 'antd';
import { Modal } from 'antd';
import { getUser, getLab } from '../authentication';
import StockInfoAlarm from './StockInfoAlarm.js'
import { serverUrl } from '../setting'

class AlarmInfo extends Component {

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


  handleRemove = () => {
    // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id, info.alarmType);
    this.deleteFetch();
  }

  deleteFetch = () => {
    fetch(serverUrl + '/alarm/' + getUser().id +'/'+ this.props.info.alarmType + '/' + this.props.info.id,  {
      method: 'DELETE', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' } //안고쳐도 됨
    }).then(response => {
      if (response.status === 200) {
        //이건 정상적으로 된 경우
      } else {
        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
      }
    })
  }
  

  getMessage = () => {
    const { info, onRemove } = this.props;
    if (info.alarmType === 1) {
      if (this.props.info.date > 0) {
        return (

          <div style={{ fontSize: 16 }}>
            <Button type="link" onClick={this.showModal} style={{ fontSize: '18px' }}><b>{this.props.info.name}</b></Button>
            <br />유효기간이 <b>{this.props.info.date}</b>일 남았습니다.
          <span style={{ marginLeft: 10 }}><Button icon="close" onClick={this.handleRemove}></Button></span>

            <Modal
              title="약품 정보"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* 정보 출력  */}
              <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                changeInventory={this.changeInventory} />
            </Modal>
          </div>
        )
      }
      else if (this.props.info.date === 0){
        return (

          <div style={{ fontSize: 16 }}>
            <Button type="link" onClick={this.showModal} style={{ fontSize: '18px' }}><b>{this.props.info.name}</b></Button>
            <br />유효기간이 <b>오늘</b>까지 입니다.
          <span style={{ marginLeft: 10 }}><Button icon="close" onClick={this.handleRemove}></Button></span>

            <Modal
              title="약품 정보"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* 정보 출력  */}
              <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                changeInventory={this.changeInventory} />
            </Modal>
          </div>
        )
      }
      else {
        return (

          <div style={{ fontSize: 16 }}>
            <Button type="link" onClick={this.showModal} style={{ fontSize: '18px' }}><b>{this.props.info.name}</b></Button>
            <br />유효기간이 <b>지났습니다.</b>
            <span style={{ marginLeft: 10 }}><Button icon="close" onClick={this.handleRemove}></Button></span>

            <Modal
              title="약품 정보"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* 정보 출력  */}
              <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                changeInventory={this.changeInventory} />
            </Modal>
          </div>
        )
      }
    }
    else if (info.alarmType === 2) {
      if (this.props.info.volume !== 0) {
        return (

          <div style={{ fontSize: 16 }}>
            <Button type="link" onClick={this.showModal} style={{ fontSize: '18px' }}><b>{this.props.info.name}</b></Button>
            <br/>장소 : <b>{this.props.info.place}</b>
            <br/>양이 얼마 남지 않았습니다.
            <span style={{marginLeft : 10}}>  <Button icon="close" onClick={this.handleRemove}></Button></span>

            <Modal
              title="약품 정보"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* 정보 출력  */}
              <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                changeInventory={this.changeInventory} />
            </Modal>
          </div>
        )
      }
      else{
        return (

          <div style={{ fontSize: 16 }}>
            <Button type="link" onClick={this.showModal} style={{ fontSize: '18px' }}><b>{this.props.info.name}</b></Button>
            <br/>장소 : <b>{this.props.info.place}</b>
            <br/>전부 소진되었습니다.
            <span style={{marginLeft : 10}}>   <Button icon="close" onClick={this.handleRemove}></Button></span>

            <Modal
              title="약품 정보"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* 정보 출력  */}
              <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                changeInventory={this.changeInventory} />
            </Modal>
          </div>
        )
      }
    }
    else {
     
      return (

        <div style={{ fontSize: 16 }}>
          <Button type="link" onClick={this.showModal} style={{ fontSize: '18px' }}><b>{this.props.info.name}</b></Button>
          <br /> 사용한지 <b>{this.props.info.period}</b>개월이 지났습니다.
            <br /> 특수 건강진단을 받아야 합니다.
            <span style={{ marginLeft: 10 }}><Button icon="close" onClick={this.handleRemove}></Button></span>

          <Modal
            title="약품 정보"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {/* 정보 출력  */}
            <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
              changeInventory={this.changeInventory} />
          </Modal>

        </div>
      )
    }
  }

  

  render() {

    return (
      <div >
        {this.getMessage()}
      </div>
    );
  }
}

export default AlarmInfo;
