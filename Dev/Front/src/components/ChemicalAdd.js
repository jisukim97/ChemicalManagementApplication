import React, { Component } from 'react';
import { Modal, Button, Input, Form, Select, message, InputNumber, Row, Col, Icon } from 'antd';

import ChemicalInfo from './ChemicalInfo';
import SelectInventory from './SelectInventory';
import { serverUrl } from '../setting';
import { getUser } from '../authentication';

const { Search } = Input;


const { Option } = Select;

//화학 약품 하나에 대한 거 (my Lab 화면 중에)
class ChemicalAdd extends Component {

    state = {
        visible: false,
        chemical: {},
        nickname: "default",
        suggest: [],
        notSuggest: [],
        selectedInventory: null,
        number: 0,
        unit: 'g',
        expire: '',
        nicknameCheck: true
    }

    constructor(props) {
        super(props);
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = e => { //둘다 닫는다
        this.setState({
            visible: false,
        });
    };

    nickNameChange = (e) => {
        this.setState({
            nickname: e.target.value,
            nicknameCheck: false
        })
        if (e.target.value === '') {
            this.setState({
                nicknameCheck: true
            })
        }
    }

    setExpire = (e) => {
        this.setState({
            expire: e.target.value
        })
    }

    search = (chemicalName) => {
        chemicalName = chemicalName.replace(' ', '_')
        console.log(chemicalName)
        //여기에 fetch 들어가기
        const url = serverUrl + '/chemical/info/' + getUser().id
        fetch(url, { // uri 넣어주기
            method: 'POST', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
            body: JSON.stringify({
                name: chemicalName
            }) //여기에다가 body 넣어주기
        }).then(response => {
            if (response.status === 200) {
                //이건 정상적으로 된 경우
                response.json().then(response => {
                    console.log(23123)
                    console.log(response)
                    //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
                    //여기서 response라는걸 제대로 쓸 수 있음
                    this.setState({
                        chemical: response.chemical
                    }, () => {
                        this.getInventorySuggestList()
                    })
                })
            } else {
                message.error('약품을 찾을 수 없습니다!');
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        })

    }

    getInventorySuggestList = () => {
        //여기서 장소 추천을 받아준다
        //여기서 fetch
        const url = serverUrl + '/chemical/' + getUser().id + '/' + this.state.chemical.id
        fetch(url, { // uri 넣어주기
            method: 'GET', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response.status === 200) {
                //이건 정상적으로 된 경우
                return response.json()
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        }).then(response => {
            //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
            //여기서 response라는걸 제대로 쓸 수 있음
            console.log(response) // 이걸로 개발자모드에서 어떠한 응답이 왔는지 확인 가능
            //예를들면
            this.setState({
                suggest: response.suggest,
                notSuggest: response.notSuggest
            })
            if (response.suggest.length === 0) {
                message.warning('추천 장소가 없습니다. 기존 장소를 선택하거나 새로 장소를 추가하여 등록해주세요!')
            }
        })

    }

    resetState = () => {
        this.setState({
            visible: false,
            chemical: {},
            nickname: "default",
            suggest: [],
            notSuggest: [],
            selectedInventory: null,
            number: 0,
            unit: 'g',
            expire: '',
            nicknameCheck: true
        })
    }

    //날짜가 양식에 맞는지 체크
    checkExpire = () => {
        const date = this.state.expire
        if (date.length != 6) {
            return false;
        }
        var dateInt = parseInt(date);
        if (dateInt < 100101 || dateInt > 999999) {
            return false;
        }

        const year = parseInt(date.substring(0, 2)) + 2000
        const month = parseInt(date.substring(2, 4))
        if (month < 1 || month > 12) {
            return false;
        }
        const day = parseInt(date.substring(4, 6))
        if (day < 1 || day > 31) {
            return false;
        }
        try {
            var realDate = new Date()
            realDate.setFullYear(year)
            realDate.setMonth(month)
            realDate.setDate(day)
        } catch (e) {
            return false;
        }
        return true
    }

    selectInventory = (inventoryId) => {
        //여기서 fetch해줌
        this.setState({
            selectInventory: inventoryId
        })
        console.log(inventoryId)
        //여기서 state에 대한것들 추가해주기
        var gram = this.state.number
        if (this.state.unit === 'mL') {
            gram *= this.state.chemical.density
        }

        //this.state.expire이 6글자여야 함
        //TODO : expire 체크 

        if (this.state.nicknameCheck) {
            //여기서 날짜체크 해주기

            if (this.checkExpire()) {

                if (this.state.number < 0.01) {
                    message.error('초기 용량을 확인해 주세요!')
                } else {
                    //여기서 전체 inventory list중에서 inventoryId인걸 찾아줘야 함
                    var finish = false
                    for (var i = 0; i < this.state.suggest.length; i++) {
                        if (this.state.suggest[i].id === inventoryId) {
                            finish = true;
                            this.handleCancel()
                            this.resetState()
                            this.props.addChemical(this.state.chemical, inventoryId, gram, this.state.expire, this.state.nickname, this.state.suggest[i].name)
                        }
                    }
                    if (!finish) {
                        for (var i = 0; i < this.state.notSuggest.length; i++) {
                            if (this.state.notSuggest[i].id === inventoryId) {
                                this.handleCancel()
                                this.resetState()
                                this.props.addChemical(this.state.chemical, inventoryId, gram, this.state.expire, this.state.nickname, this.state.notSuggest[i].name)
                            }
                        }
                    }
                }


            } else {
                message.error('날짜를 양식에 맞게 입력해 주세요!')
            }

        } else {
            message.error('별칭 중복확인 버튼을 눌러 주세요!')

        }
        //여기에 nickname체크 해주기
        /*
        const nicknameUrl = serverUrl + '/chemical/nickname/' + getUser().id
        fetch(nicknameUrl, { // uri 넣어주기
            method: 'POST', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
            body: JSON.stringify({
                nickname : this.state.nickname
            }) //여기에다가 body 넣어주기
        }).then(response => {
            if( response.status === 200){
                this.props.addChemical(this.state.chemical, inventoryId, gram, this.state.expire, this.state.nickname)
            } else {
                message.error('닉네임이 겹칩니다')
            }
        })
        */
    }

    nicknameCheck = () => {
        const nicknameUrl = serverUrl + '/chemical/nickname/' + getUser().id
        fetch(nicknameUrl, { // uri 넣어주기
            method: 'POST', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
            body: JSON.stringify({
                nickname: this.state.nickname
            }) //여기에다가 body 넣어주기
        }).then(response => {
            if (response.status === 200) {
                message.success('사용 가능한 별칭입니다')
                this.setState({
                    nicknameCheck: true
                })
                //this.props.addChemical(this.state.chemical, inventoryId, gram, this.state.expire, this.state.nickname)
            } else {
                message.error('이미 존재하는 별칭입니다. 다시 한번 확인해주세요')
                this.setState({
                    nicknameCheck: false
                })
            }
        })
    }



    handleNumberChange = e => {
        console.log(e)
        const number = parseFloat(e).toFixed(2);
        if (isNaN(number)) {
            return;
        }
        if (!('value' in this.props)) {
            this.setState({ number });
        }
        this.triggerChange({ number });
    };

    handleUnitChange = unit => {
        if (!('value' in this.props)) {
            this.setState({ unit });
        }
        this.triggerChange({ unit });
    };


    triggerChange = changedValue => {
        // Should provide an event to pass value to Form.
        const { onChange } = this.props;
        if (onChange) {
            onChange({
                ...this.state,
                ...changedValue,
            });
        }
        console.log(this.state)
    };


    render() {
        const { size } = this.props;
        const { unit, number } = this.state;

        return (

            <span>
                <center>
                    {/* 버튼 */}
                    <Button Button shape="round" onClick={this.showModal} style={{ fontSize: '25px' }} size="large" > <Icon type="plus"/> </Button>
                    {/* 뜨는 창 */}
                    <Modal
                        title="약품 추가"
                        visible={this.state.visible}
                        onOk={this.handleCancel}
                        onCancel={this.handleCancel} //둘다 닫는다
                    >
                        {/* 검색 창 */}
                        <div>
                            <Search
                                placeholder="약품 이름을 입력 해 주세요"
                                enterButton="Search"
                                size="middle"
                                onSearch={value => this.search(value)}
                            />
                        </div>

                        {/* 정보 출력  */}
                        <div>
                            <ChemicalInfo chemical={this.state.chemical} />
                        </div>

                        {/* 그 아래것들 */}
                        <div style={{ marginTop: 10 }}>
                            {/* 별명 입력 창 */}
                            <div style={{ marginBottom: 10 }}>
                                <Row>
                                    <Col span={16} >
                                        <center>
                                            <Input placeholder="별칭을 입력 해 주세요" onChange={this.nickNameChange} />
                                        </center>
                                    </Col>
                                    <Col span={8} >
                                        <center>
                                            <Button onClick={this.nicknameCheck}>중복확인</Button>
                                        </center>
                                    </Col>
                                </Row>
                            </div>

                            {/* 처음 용량 & 유효기간 입력 */}
                            <div style={{ marginBottom: 10 }}>
                                <Row>
                                    <Col span={16} >
                                        <center>
                                            <InputNumber
                                                type="text"
                                                size={size}
                                                value={number}
                                                onChange={this.handleNumberChange}
                                                style={{ width: '95%' }}
                                            />

                                        </center>
                                    </Col>
                                    <Col span={8} >
                                        <center>
                                            <Select
                                                value={unit}
                                                size={size}
                                                style={{ width: '100%' }}
                                                onChange={this.handleUnitChange}
                                            >
                                                <Option value="g">g</Option>
                                                <Option value="mL">mL</Option>
                                            </Select>

                                        </center>
                                    </Col>
                                </Row>
                            </div>

                            <div style={{ marginBottom: 10 }}>
                                <center>


                                </center>
                            </div>

                            <div style={{ marginBottom: 10 }} >
                                <Input placeholder="유효기간을 입력 해 주세요(YYMMDD)" onChange={this.setExpire} />
                            </div>


                            {/* 장소 */}
                            <div style={{ marginBottom: 10 }}>
                                <SelectInventory suggest={this.state.suggest} notSuggest={this.state.notSuggest} selectInventory={this.selectInventory} chemical={this.state.chemical} />
                            </div>

                        </div>

                    </Modal>
                </center>
                <center>
                    약품 추가하기
                </center>
            </span>
        );
    }
}

export default ChemicalAdd;