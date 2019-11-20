import React, { Component } from 'react';
import AlarmInfo from './AlarmInfo1';

class AlarmInfoList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data } = this.props;
    const list = data.map(
      info => (<AlarmInfo key={info.id} info={info}/>)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default AlarmInfoList;
