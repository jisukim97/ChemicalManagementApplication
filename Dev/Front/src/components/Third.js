import React, { Component } from 'react';
import { Button, List, Avatar,Typography } from 'antd';

const { Text } = Typography;

class Third extends Component {
    state = {
        size : 'large',
        data : [
            {
                title: 'Ant Design Title 1',
                description : 'description'
                
            },
            {
                title: 'Ant Design Title 2',
                description : 'hello world!'
            },
            {
                title: 'Ant Design Title 3',
                description : 'front end'
            },
            {
                title: 'Ant Design Title 4',
                description : 'hyukju'
            },
        ]
    }
    onClick = () => {
        alert("You clicked button");
    }

    render() {
        return (
            <div>
                <Button type="dashed" onClick={this.onClick} >Cilck here</Button>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://naver.com">{item.title}</a>}
                               
                                description= {<Text delete>{item.description}</Text>}
                                
                            />
                        </List.Item>
                    )}
                />,
            </div>

        );
    }
}

export default Third;
