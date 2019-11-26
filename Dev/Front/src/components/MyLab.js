import React, { Component } from 'react';
import { List, Typography } from 'antd'

import Chemical from './Chemical';
import ChemicalAdd from './ChemicalAdd';
import { array } from 'prop-types';

const { Title } = Typography;

//마이 랩
class MyLab extends Component {

    state = {

    }

    constructor(props) {
        super(props);
        //Mylab의 this.state에는 현재 확인중인 인벤토리의 아이디인 inventoryId와 해당 인벤토리에 들어있는 stock의 id의 리스트!!!가 들어있음
        this.state = {
            inventoryId : 1,
            stocks : [
                1, 2, 3, 4, 5, 6, 7, 8
            ]
        }
    }

    render() {
        return (
            <div>
                {/* 약품 목록에서 각각 하나의 원소에 대한 Chemical 클래스 */}
                <br />
                <center><Title style={{ marginBottom: 50 }}>My Lab</Title></center>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={this.state.stocks}
                    renderItem={stockId => (
                        <List.Item>
                            <Chemical stockId={stockId} /> {/* Chemical 컴포넌트에 stockId를 전해줌*/}
                        </List.Item>
                    )}
                />
                <div style={{ marginTop: 100 }}>
                    <ChemicalAdd />
                </div>
            </div>
        );
    }
}

export default MyLab;
