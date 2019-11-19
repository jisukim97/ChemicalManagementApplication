import React, { Component } from 'react';
import { List, Typography} from 'antd'

import Chemical from './Chemical';
import Chemicaladd from './ChemicalAdd';
import ChemicalAdd from './ChemicalAdd';

const { Title } = Typography;

//마이 랩
class MyLab extends Component {

    state = {
        chemicals : [
            {
                nickname : "benzene 2",
                stockId : 3,
                chemicalName : "benzene",
                inventory : "냉장고1"
            },
            {
                nickname : "acetone 1",
                stockId : 4,
                chemicalName : "acetone",
                inventory : "시약장2"
            }, 
            {
                nickname : "something-A",
                stockId : 5,
                chemicalName : "something",
                inventory : "시약장2"
            }, 
            {
                nickname : "something-B",
                stockId : 6,
                chemicalName : "something",
                inventory : "시약장2"
            }, 
            {
                nickname : "something-C",
                stockId : 7,
                chemicalName : "something",
                inventory : "시약장2"
            }, 
            {
                nickname : "something-D",
                stockId : 8,
                chemicalName : "something",
                inventory : "시약장2"
            }
        ]
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                {/* 약품 목록에서 각각 하나의 원소에 대한 Chemical 클래스 */}
                <br/>
                <center><Title style={{marginBottom : 50}}>My Lab</Title></center>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={this.state.chemicals}
                    renderItem={item => (
                        <List.Item>
                            <Chemical chemical={item}/>
                        </List.Item>
                    )}
                />
                <div style={{ marginTop : 100}}>
                    <ChemicalAdd />
                </div>
            </div>
        );
    }
}

export default MyLab;
