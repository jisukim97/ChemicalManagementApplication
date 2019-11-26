import React, { Component } from 'react';
import { Col, Button, } from 'antd';
import { Modal } from 'antd';


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
    else {
      return (

        <div style={{ fontSize: 18 }}>
          <Button type="link" onClick={this.showModal} style={{ fontSize: '20px' }}><b>{this.props.info.name}</b></Button>를 사용한지 <b>{this.props.info.use}</b>이 지났습니다. <b>{this.props.info.disease}</b>의 위험이 있습니다.
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
