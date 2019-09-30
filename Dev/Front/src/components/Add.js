import React, { Component } from 'react';
import { Input, Select, message } from 'antd';
import { serverUrl } from '../setting'
import { getUser } from '../authentication';

import { history } from '../History';

import './Box.css'

const { Search } = Input;
const { Option } = Select;

class Add extends Component {

    state = {
        visibleChemicalName: true,
        visiblePlaceSelect: false,
        chemicalName :"",
        place:"",
        placeList : []
    }

    chemicalNameForm = () => {
        return (
            <div>
                <Search
                    placeholder="약품 이름을 입력해주세요"
                    enterButton="검색"
                    size="large"
                    onSearch={value => {
                        fetch(serverUrl + '/chemical/request', {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        })
                            .then(response => {
                                const result = response.status;
                                if (result === 200) {
                                    //성공하였을 경우 : 리스트에 저장
                                    response.json().then(response => {
                                        console.log(response)
                                        this.setState({placeList : response})
                                        this.setState({visiblePlaceSelect : true, chemicalName : value})
                                    })
                                } else {
                                    //내부 오류
                                }
                            })                
                        }
                    }
                />    
            </div>
        )
    }

    getPlaceSuggest = () => {
        return (
            <div>
                <Select defaultValue="추천된 장소 중 선택해주세요" style={{ width: 300 }} onChange={this.handleChange}>
                    <Option value={this.state.placeList[0]}>{this.state.placeList[0]}</Option>
                    <Option value={this.state.placeList[1]}>{this.state.placeList[1]}</Option>
                    <Option value={this.state.placeList[2]}>{this.state.placeList[2]}</Option>
                </Select>
            </div>
        )
    }

    handleChange = (value) => {
        console.log(value)
        console.log(getUser().id)
        
        fetch(serverUrl + '/chemical/add/' + getUser().id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({name : this.state.chemicalName, place : value})
        })
            .then(response => {
                const result = response.status;
                if (result === 200) {
                    //성공하였을 경우 
                    message.success('성공적으로 추가되었습니다');
                    history.push('/main')
                } else {
                    //내부 오류
                }
            })                
        }


    render() {
        return (
            <div id='box'>
                <div className='middle'> {this.state.visibleChemicalName && this.chemicalNameForm()} </div>
                <div className='middle'> {this.state.visiblePlaceSelect && this.getPlaceSuggest()} </div>
                
            </div>
        );
    }
}

export default Add;