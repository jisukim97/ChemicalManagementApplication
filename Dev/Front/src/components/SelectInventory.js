import React, { Component, Fragment } from 'react';

import { Select, Button, Modal, Popconfirm, message } from 'antd';
import { getUser, getLab } from '../authentication';
import { serverUrl } from '../setting'


const { confirm } = Modal;

const { Option } = Select;

class SelectInventory extends Component {

    //또 selectInventory라는 함수를 props로 받음
    constructor(props){
        super(props);

        this.state = {
            selectedInventory : '장소를 선택해 주세요',
            crash : false,
            crashWith : {}
        }

        /*
        suggest = [{
                id : "suggestInventory1",
                name : "보관함1",
                temperature : 20.0,
                humidity : 0,
                illuminance : false,
                oximeter : false,
                explosion : false
            }, {
                id : "suggestInventory2",
                name : "보관함2",
                temperature : 20.0,
                humidity : 0,
                illuminance : false,
                oximeter : false,
                explosion : false
            }, {
                id : "suggestInventory3",
                name : "보관함3",
                temperature : 20.0,
                humidity : 0,
                illuminance : false,
                oximeter : false,
                explosion : false
            }
            ],
            notSuggest = [{
                id : "notSuggestInventory1",
                name : "보관함4",
                temperature : 20.0,
                humidity : 0,
                illuminance : false,
                oximeter : false,
                explosion : false
            }, {
                id : "notSuggestInventory2",
                name : "보관함5",
                temperature : 20.0,
                humidity : 0,
                illuminance : false,
                oximeter : false,
                explosion : false
            }, {
                id : "notSuggestInventory3",
                name : "보관함6",
                temperature : 20.0,
                humidity : 0,
                illuminance : false,
                oximeter : false,
                explosion : false
            }

            ]
        */

    }
    /*
                        chemical: {
                            id: 30,
                            name : "name6",
                            status : 1,
                            meltingPoint : 20.0,
                            boilingPoint : 30.0
                        }
    */
 

    //select 바꼈을 때
    handleChange = (value) => {
        console.log(value)
        this.setState({
            selectedInventory : value
        }, () => {
            if (value !=='장소를 선택해 주세요'){
                const url = serverUrl + '/chemical/' + getUser().id + '/' + this.props.chemical.id + '/' + this.state.selectedInventory
                fetch(url, { // uri 넣어주기
                    method: 'GET', //'GET', 'POST', 'DELETE' 등등
                    headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
                }).then(response => {
                    if( response.status === 200){
                        //이건 정상적으로 된 경우
                            return response.json()
                    } else {
                        //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
                    }
                }).then(response => {
                    if (response.crash){
                        console.log("crash!")
                        this.setState({
                            crash : true,
                            crashWith : response.crashWith
                        })
                        //안되는 경우
                        /*
                        confirm({
                            title: '약품이 해당 장소에 두었을 경우 다음 약품과 상호작용이 일어날 수 있습니다. 괜찮습니까?',
                            content: response.crashWith.nickname + ' / ' + response.crashWith.chemical.name,
                            onOk() {
                                this.props.selectInventory(this.state.selectedInventory)
                            },
                            onCancel() { },
                        });
                        */
        
                    } else {
                        console.log("not crash!")
                        //되는 경우
                        //this.props.selectInventory(this.state.selectedInventory)
                        this.setState({
                            crash : false
                        })
        
                    }
                })
        
            }
        })
    }

    confirm = () => {
        this.props.selectInventory(this.state.selectedInventory)
    }
    
    cancle = () => {

    }
    

    render() {
        return (
            <Fragment>
                <Select defaultValue="장소를 선택해 주세요" style={{  }} onChange={this.handleChange}>
                    {
                        this.props.suggest.map(inventory => {
                            return <Option value={inventory.id}>{inventory.name} (추천)</Option>
                        })
                    }
                    {
                        this.props.notSuggest.map(inventory => {
                            return <Option value={inventory.id}>{inventory.name}</Option>
                        })
                    }
                </Select>

                <Popconfirm
                    title={this.state.crash===true ? "해당 약품은 " +this.state.crashWith.nickname + "/" + this.state.crashWith.chemical.name+"과 상호작용이 있습니다. 괜찮습니까?" 
                    : "해당 약품을 추가하시겠습니까?"}
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button > 선택완료 </Button>
                </Popconfirm>
            </Fragment>
        )
    }
}

export default SelectInventory;