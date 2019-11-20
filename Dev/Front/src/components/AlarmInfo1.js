import React, { Component } from 'react';

class AlarmInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      date: '0',
      id: 0
    }
  }
  
  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const {
      name, date, id
    } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b>이 유효기간이 <b>{date}</b>일 남았습니다.</div>
      </div>
    );
  }
}

export default AlarmInfo;
