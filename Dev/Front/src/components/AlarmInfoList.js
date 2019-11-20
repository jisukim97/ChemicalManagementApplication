import React, { Component } from 'react';
import AlarmInfo from './AlarmInfo1';

class AlarmInfoList extends Component {
  static defaultProps = {
    data: []
  }

  list = (data) => {
    return (data.map(
      (<AlarmInfo key={info.id} info={info}/>)
    ))
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        {this.list(data)}    
      </div>
    );
  }
}

export default AlarmInfoList;
