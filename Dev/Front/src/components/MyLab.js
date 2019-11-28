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
