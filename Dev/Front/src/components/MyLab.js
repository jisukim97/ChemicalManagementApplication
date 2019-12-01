import React, { Component } from 'react';
import { List, Typography, Radio } from 'antd'

import Stock from './Stock';
import ChemicalAdd from './ChemicalAdd';

const { Title } = Typography;

//마이 랩
class MyLab extends Component {

    state = {
    }

    constructor(props) {
        super(props);
        //state에는 

        let inventories = [
            {
                id: "id1",
                name: "name1",
                temperature : 27.5,
                humidity : 0,
                illuminance : false,
                oximeter : true,
                explosion : true,
                stocks: [
                    {
                        id: 2,
                        nickname: "nickname1",
                        putDate : Date.now(),
                        expireDate : Date.now(),
                        volume : 300,
                        remainingVolume : 300,
                        chemical: {
                            id: 10,
                            name : "name1",
                            status : 1,
                            meltingPoint : 20.0,
                            boilingPoint : 30.0,
                            deliquescent : false,
                            efflorescence : false,
                            photoReaction : false,
                            flammability : false,
                            ignitability : true,
                            explosive : false,
                            combustibility : true,
                            pH : 7.0,
                            classifiaction : 1,
                            density : 3.5,
                            casNo : "71-43-2",
                            formula : "C6H6",
                            molecularWeight : 78.11
                        }
                    },
                    {
                        id: 3,
                        nickname: "nickname2",
                        putDate : Date.now(),
                        expireDate : Date.now(),
                        volume : 300,
                        remainingVolume : 300,
                        chemical: {
                            id: 20,
                            name : "name2",
                            status : 1,
                            meltingPoint : 20.0,
                            boilingPoint : 30.0,
                            deliquescent : false,
                            efflorescence : false,
                            photoReaction : false,
                            flammability : false,
                            ignitability : true,
                            explosive : false,
                            combustibility : true,
                            pH : 7.0,
                            classifiaction : 1,
                            density : 3.5,
                            casNo : "71-43-2",
                            formula : "C6H6",
                            molecularWeight : 78.11
                                                }
                    }
                ]
            },
            {
                id: "id2",
                name: "name2",
                temperature : 27.5,
                humidity : 0,
                illuminance : false,
                oximeter : true,
                explosion : true,
                stocks: [
                    {
                        id: 2,
                        nickname: "nickname3",
                        putDate : Date.now(),
                        expireDate : Date.now(),
                        volume : 300,
                        remainingVolume : 300,
                        chemical: {
                            id: 30,
                            name : "name3",
                            status : 1,
                            meltingPoint : 20.0,
                            boilingPoint : 30.0,
                            deliquescent : false,
                            efflorescence : false,
                            photoReaction : false,
                            flammability : false,
                            ignitability : true,
                            explosive : false,
                            combustibility : true,
                            pH : 7.0,
                            classifiaction : 1,
                            density : 3.5,
                            casNo : "71-43-2",
                            formula : "C6H6",
                            molecularWeight : 78.11                     
                           }
                    },
                    {
                        id: 3,
                        nickname: "nickname4",
                        putDate : Date.now(),
                        expireDate : Date.now(),
                        volume : 300,
                        remainingVolume : 300,
                        chemical: {
                            id: 40,
                            name : "name4",
                            status : 1,
                            meltingPoint : 20.0,
                            boilingPoint : 30.0,
                            deliquescent : false,
                            efflorescence : false,
                            photoReaction : false,
                            flammability : false,
                            ignitability : true,
                            explosive : false,
                            combustibility : true,
                            pH : 7.0,
                            classifiaction : 1,
                            density : 3.5,
                            casNo : "71-43-2",
                            formula : "C6H6",
                            molecularWeight : 78.11                       
                         }
                    }
                ]
            },
            {
                id: "id3",
                name: "name3",
                temperature : 27.5,
                humidity : 0,
                illuminance : false,
                oximeter : true,
                explosion : true,
                stocks: [
                    {
                        id: 2,
                        nickname: "nickname5",
                        putDate : Date.now(),
                        expireDate : Date.now(),
                        volume : 300,
                        remainingVolume : 300,
                        chemical: {
                            id: 50,
                            name : "name5",
                            status : 1,
                            meltingPoint : 20.0,
                            boilingPoint : 30.0,
                            deliquescent : false,
                            efflorescence : false,
                            photoReaction : false,
                            flammability : false,
                            ignitability : true,
                            explosive : false,
                            combustibility : true,
                            pH : 7.0,
                            classifiaction : 1,
                            density : 3.5,
                            casNo : "71-43-2",
                            formula : "C6H6",
                            molecularWeight : 78.11                       
                         }
                    },
                    {
                        id: 3,
                        nickname: "nickname6",
                        putDate : Date.now(),
                        expireDate : Date.now(),
                        volume : 300,
                        remainingVolume : 300,
                        chemical: {
                            id: 60,
                            name : "name6",
                            status : 1,
                            meltingPoint : 20.0,
                            boilingPoint : 30.0,
                            deliquescent : false,
                            efflorescence : false,
                            photoReaction : false,
                            flammability : false,
                            ignitability : true,
                            explosive : false,
                            combustibility : true,
                            pH : 7.0,
                            classifiaction : 1,
                            density : 3.5,
                            casNo : "71-43-2",
                            formula : "C6H6",
                            molecularWeight : 78.11                       
                         }
                    }
                ]
            },
        ]

        let firstInventoryId = inventories[0].id

        this.state = {
            inventories : inventories, //인벤토리 배열 
            inventory: firstInventoryId, //현재 인벤토리 아이디
            inventoryName: inventories[0].name, //현재 인벤토리 이름
            //realInventory : inventories.filter(inventory => inventory.id===firstInventoryId) //현재 인벤토리에 있는 것들만
        }
    }

    //인벤토르 바꿨을 경우
    handleInventoryChange = e => {
        this.state.inventories.forEach(inventory => {
            console.log(inventory)
            if (inventory.id===e.target.value){
                this.setState({
                    inventory : inventory.id,
                    inventoryName : inventory.name,
                    //realInventory : inventory
                })
            }
        })
    };

    //볼륨 바꿀 경우
    changeVolume = (stockId, change, unit) => {
        //여기서 fetch 해준다
        //volume 바꿔주는걸로
        let inventories = this.state.inventories;
        for (var i=0 ; i<inventories.length; i++){
            for (var j=0 ; j<inventories[i].stocks.length; j++){
                if (inventories[i].stocks[j].id===stockId){
                    if (unit === 'mL'){
                        change *= inventories[i].stocks[j].chemical.density;
                    }
                    inventories[i].stocks[j].remainingVolume -= change;
                    break;
                }
            }
        }
        this.setState({inventories : inventories})
    }

    //재고 삭제하기
    deleteStock = (stockId) => {
        //여기서 fetch 해주기
        let inventories = this.state.inventories;
        for (var i=0; i<inventories.length; i++){
            if(inventories[i].id===this.state.inventory){
                inventories[i].stocks=inventories[i].stocks.filter(stock => stock.id!==stockId)
            }
        }
        this.setState({
            inventories : inventories
        })
    }

    render() {  

        return (
            <div>
                {/* 약품 목록에서 각각 하나의 원소에 대한 Chemical 클래스 */}
                <br />
                <center><Title style={{ marginBottom: 50 }}>My Lab</Title></center>
                <div><center> {/* 인벤토리 고르는 곳 */}
                    <Radio.Group value={this.state.inventory} onChange={this.handleInventoryChange}>
                        {
                            this.state.inventories.map( inventory => {
                                return (<Radio.Button value={inventory.id}>{inventory.name}</Radio.Button>)
                            })
                        }
                    </Radio.Group>
                    </center>
                </div>

                <br />

                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={this.state.inventories.filter(inventory => inventory.id===this.state.inventory)[0].stocks}
                    renderItem={stock => (
                        <List.Item>
                            <Stock stock={stock} changeVolume={this.changeVolume} deleteStock={this.deleteStock}/> {/* Chemical 컴포넌트에 stock을 전해줌*/}
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
