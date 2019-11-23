import React, { Component } from 'react';
import { List, Typography } from 'antd'

import Chemical from './Chemical';
import ChemicalAdd from './ChemicalAdd';
import { array } from 'prop-types';

const { Title } = Typography;

//마이 랩
class MyLab extends Component {

    state = {
        chemicals: [
            {
                nickname: "benzene 2",
                stockId: 3,
                chemicalName: "benzene",
                inventory: "냉장고1",
                stockInfo: {
                    inventory: '냉장고1',
                    putDate: "2019/10/31",
                    expireDate: "2019/10/31",
                    volume: 100,
                    remainingVolume: 50
                }
            },
            {
                nickname: "acetone 1",
                stockId: 4,
                chemicalName: "acetone",
                inventory: "시약장2",
                stockInfo: {
                    inventory: '냉장고1',
                    putDate: "2019/10/31",
                    expireDate: "2019/10/31",
                    volume: 100,
                    remainingVolume: 50
                }
            },
            {
                nickname: "something-A",
                stockId: 5,
                chemicalName: "something",
                inventory: "시약장2",
                stockInfo: {
                    inventory: '냉장고1',
                    putDate: "2019/10/31",
                    expireDate: "2019/10/31",
                    volume: 100,
                    remainingVolume: 50
                }
            },
            {
                nickname: "something-B",
                stockId: 6,
                chemicalName: "something",
                inventory: "시약장2",
                stockInfo: {
                    inventory: '냉장고1',
                    putDate: "2019/10/31",
                    expireDate: "2019/10/31",
                    volume: 100,
                    remainingVolume: 50
                }
            },
            {
                nickname: "something-C",
                stockId: 7,
                chemicalName: "something",
                inventory: "시약장2",
                stockInfo: {
                    inventory: '냉장고1',
                    putDate: "2019/10/31",
                    expireDate: "2019/10/31",
                    volume: 100,
                    remainingVolume: 50
                }
            },
            {
                nickname: "something-D",
                stockId: 8,
                chemicalName: "something",
                inventory: "시약장2",
                 stockInfo: {
                    inventory: '냉장고1',
                    putDate: "2019/10/31",
                    expireDate: "2019/10/31",
                    volume: 100,
                    remainingVolume: 50
                }
            }
        ]
    }

    constructor(props) {
        super(props);
    }

    changeVolume = (stockId, change) => {
        const chemicalArray = [];

        for(let i = 0 ; i < this.state.chemicals.length ; i++){
            if (this.state.chemicals.stockId === stockId){
                this.state.chemicals.remainingVolume = this.state.chemicals.remainingVolume - change 
                chemicalArray.push(this.state.chemicals)
            } 
            this.setState({chemicals : chemicalArray})
        }

        console.log(chemicalArray)
        //state에 있는 배열 탐색하면서 그거의 stockId가 stockId인거 찾기
        //나머지들은 바로 chemicalArray에 넣어주고
        //찾은거면 그거의 stockInfo.volume에서 change만큼을 뺴준다
        //그리고 그걸 chemicalArray에 넣어주기
        //탐색 끝나면 this.setState({chemicals : chemicalArray})
    }

    render() {
        return (
            <div>
                {/* 약품 목록에서 각각 하나의 원소에 대한 Chemical 클래스 */}
                <br />
                <center><Title style={{ marginBottom: 50 }}>My Lab</Title></center>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={this.state.chemicals}
                    renderItem={item => (
                        <List.Item>
                            <Chemical chemical={item} />
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
