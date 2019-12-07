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

  //볼륨 바꿀 경우
  changeVolume = (stockId, change, unit) => {
    //여기서 fetch 해준다
    //volume 바꿔주는걸로
    const url = serverUrl + '/chemical/' + getUser().id + '/' + stockId
    fetch(url, { // uri 넣어주기
      method: 'PUT', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
      body: JSON.stringify({ volume: change }) //여기에다가 body 넣어주기
    }).then(response => {
      if (response.status === 200) {
        //이건 정상적으로 된 경우
        response.json().then(response => {
          //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
          //여기서 response라는걸 제대로 쓸 수 있음
          var stock = response.stock
          //여기서 다썼거나, 조금남았으면 표시 후 알람 발생
          if (stock.remainingVolume === 0.0) {
            //다씀
            message.warning('약품을 전부 사용했습니다!')
            this.makeVolumeAlarm(stockId)
          } else if (stock.remainingVolume / stock.volume <= 0.2) {
            //쪼금남음
            message.warning('약품이 얼마 남지 않았습니다!')
            this.makeVolumeAlarm(stockId)
          } else {
            message.success('성공적으로 반영 되었습니다')
          }
          this.getInventories()
        })
      } else {
        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
      }
    })
  }  

  
  //인벤토리 바꾸기
  changeInventory = (stockId, newInventoryId) => {
    //여기서 fetch 해주기
    console.log(stockId, newInventoryId)
    const url = serverUrl + '/inventory/' + getUser().id + '/' + stockId + '/' + newInventoryId
    fetch(url, { // uri 넣어주기
      method: 'PUT', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
    }).then(response => {
      if (response.status === 200) {
        //이건 정상적으로 된 경우
        return response.json()
      } else {
        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
      }
    }).then(response => {
      this.getInventories()
    })
  }

  //재고 삭제하기
  deleteStock = (stockId) => {
    //여기서 fetch 해주기
    const url = serverUrl + '/chemical/' + stockId
    fetch(url, { // uri 넣어주기
      method: 'DELETE', //'GET', 'POST', 'DELETE' 등등
      headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
    }).then(response => {
      if (response.status === 200) {
        //이건 정상적으로 된 경우
        message.success('성공적으로 페기 되었습니다!')
        this.setState({
          inventories: [],
          isInventoryExist: false
        }, () => {
          this.getInventories()
        })
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
            <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
              changeInventory={this.changeInventory} />
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
              <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                changeInventory={this.changeInventory} />
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
              <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                changeInventory={this.changeInventory} />
            </Modal>
          </div>
        )
      }
    }
    else {
      if (this.props.info.plag === 1) {
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
              <StockInfoAlarm stock={this.props.info.stockInfo} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                changeInventory={this.changeInventory} />
            </Modal>

          </div>
        )
      }
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
