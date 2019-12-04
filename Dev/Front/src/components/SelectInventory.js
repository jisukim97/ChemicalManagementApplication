import React, { Component, Fragment } from 'react';

import { Select, Button } from 'antd';

const { Option } = Select;

class SelectInventory extends Component {

    //또 selectInventory라는 함수를 props로 받음
    constructor(props){
        super(props);

        this.state = {
            selectedInventory : ''
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
        })
    }

    //선택 버튼 클릭했을 때
    handleClick = () => {
        console.log('hhhh')
        console.log(this.state.selectedInventory)
        this.props.selectInventory(this.state.selectedInventory)
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
                <Button onClick={this.handleClick}> 선택완료 </Button>
            </Fragment>
        )
    }
}

export default SelectInventory;