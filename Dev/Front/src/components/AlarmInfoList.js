import React, { Component } from 'react';
import AlarmInfo from './AlarmInfo1';

class AlarmInfoList extends Component {
    static defaultProps = {
        data: [],
        onRemove: () => console.warn('onRemove not defined'),
    }


    render() {
        const { onRemove } = this.props;
        return (
            <div>
                {this.props.data.map(info => {
                    return <AlarmInfo key={info.id} info={info} onRemove={onRemove} />
                })}
            </div>
        );
    }
}

export default AlarmInfoList;
