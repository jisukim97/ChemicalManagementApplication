import React, { Component } from 'react';
import { List, Avatar } from 'antd'
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
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.data}
                    renderItem={info => (
                        <List.Item>
                            <AlarmInfo key={info.id} info={info} onRemove={onRemove} />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default AlarmInfoList;   
