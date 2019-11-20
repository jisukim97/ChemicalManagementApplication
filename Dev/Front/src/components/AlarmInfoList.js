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
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <AlarmInfo key={item.id} info={item} onRemove={onRemove} />
                        </List.Item>
                    )}
                />


                {this.props.data.map(info => {
                    return <AlarmInfo key={info.id} info={info} onRemove={onRemove} />
                })}
            </div>
        );
    }
}

export default AlarmInfoList;   
