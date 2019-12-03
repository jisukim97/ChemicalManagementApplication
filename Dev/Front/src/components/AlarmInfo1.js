import React, { Component } from 'react';
import { Col, Button, } from 'antd';
import { Modal } from 'antd';
import { getUser, getLab } from '../authentication';


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
    fetch('http://13.124.122.246:8080/alarm/' + getUser().id +"/"+ this.props.info.alarmType + "/" + this.props.info.id,  {
      method: 'DELETE', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' } //안고쳐도 됨
    }).then(response => {
      if (response.status === 200) {
        //이건 정상적으로 된 경우
        return response.json()
      } else {
        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
      }
    })
  }

  getMessage = () => {
    const { info, onRemove } = this.props;
    if (info.alarmType === 1) {
      return (

        <div style={{ fontSize: 18 }}>
          <Button type="link" onClick={this.showModal} style={{ fontSize: '20px' }}><b>{this.props.info.name}</b></Button>
          의 유효기간이 <b>{this.props.info.date}</b>일 남았습니다.
          <Button icon="delete" onClick={this.handleRemove}></Button>
          
          <Modal
            title="약품 정보"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {/* 정보 출력  */}
          </Modal>
        </div>
      )
    }
    else if (info.alarmType === 2) {
      if (this.props.info.volume === 0) {
        return (

          <div style={{ fontSize: 18 }}>
            <b>{this.props.info.place}</b>에 있는 <Button type="link" onClick={this.showModal} style={{ fontSize: '20px' }}><b>{this.props.info.name}</b></Button>의 양이 얼마남지 않았습니다.
                <Button icon="delete" onClick={this.handleRemove}></Button>

            <Modal
              title="약품 정보"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* 정보 출력  */}
            </Modal>
          </div>
        )
      }
      else{
        return (

          <div style={{ fontSize: 18 }}>
            <b>{this.props.info.place}</b>에 있는 <Button type="link" onClick={this.showModal} style={{ fontSize: '20px' }}><b>{this.props.info.name}</b></Button>이 전부 소진되었습니다.
                <Button icon="delete" onClick={this.handleRemove}></Button>

            <Modal
              title="약품 정보"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* 정보 출력  */}
            </Modal>
          </div>
        )
      }
    }
    else {
      return (

        <div style={{ fontSize: 18 }}>
          <Button type="link" onClick={this.showModal} style={{ fontSize: '20px' }}><b>{this.props.info.name}</b></Button>를 사용한지 <b>{this.props.info.period}</b>이 지났습니다. <b>{this.props.info.disease}</b>의 위험이 있습니다.
              <Button icon="delete" onClick={this.handleRemove}></Button>

          <Modal
            title="약품 정보"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {/* 정보 출력  */}
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
