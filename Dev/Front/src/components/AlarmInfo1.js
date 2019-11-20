import React, { Component } from 'react';

class AlarmInfo extends Component {
  

    handleRemove = () => {
        // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
        const { info, onRemove } = this.props;
        onRemove(info.id);
      }
        
    
  render() {
    const style = {
        border: '1px solid black',
        padding: '8px',
        margin: '8px',
        fontSize: '20px'
      };
  
  
      return (
        <div style={style}>
            <div>
                <b>{this.props.info.name}</b>의 유효기간이 <b>{this.props.info.date}</b>일 남았습니다.
                <button onClick={this.handleRemove}> X </button>

            </div>
        </div>
    );
  }
}

export default AlarmInfo;
