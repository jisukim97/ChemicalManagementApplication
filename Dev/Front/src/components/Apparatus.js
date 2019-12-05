import React, { Component } from 'react';
import { Typography, Icon, Row, Col, Button, Modal, Divider, Table, Card, List, Input, Form, TimePicker, message } from 'antd'
import { history } from '../History';
import { Link } from "react-router-dom";

import { getUser, getLab } from '../authentication';
import moment from 'moment';
import ApparatusReservation from './ApparatusReservation';

const { Title } = Typography;

class Apparatus extends Component {
    state = {
    }
    constructor(props) {
        super(props);
        const { apparatusId } = this.props.match.params;
        //오늘 날짜 받아오기
        var today = new Date();
        this.state = {
            visible_0: false, // '기기 삭제' 모달
            visible_1: false, //'기기등록하기' 모달
            visible_2: false, // '기기예약하기' 모달
            visible_3: false, // '본인 예약 삭제확인' 모달
            visible_4: false, // '예약 중복' 모달
            visible_5: false, // '예약 삭제 오류 - 지난 날짜 삭제 안됨' 모달 
            format: 'HH:mm',
            columns: [
                {
                    title: 'Time',
                    dataIndex: 'time',
                    key: 'time',
                },
                {
                    title: 'User',
                    dataIndex: 'user',
                    key: 'user',
                },
                {
                    title: 'Button',
                    dataIndex: 'deleteButton',
                    key: 'deleteButton'
                }
            ],
            menu: apparatusId, // 처음들어오면 menu가 0임
            apparatusList: [],
            realReservationList: [],
            reservationDataSource: [], // 예약정보 받아와서 시작 끝 시간 파싱 적절히 해서 column형식 만들어서 넣기
            // 예약 등록 직후에 반영 되는건 어떻게?
            todayDate: today, //Date형식
        }

    }

    //0. 아래에 있는 곳에서 state의 변수들을 참조하므로, 변수들을 미리 선언 해 놓고, fetch를 해줘야 하네여
    // 순서가 fetch되고 난 결과는 너무 늦게 나타나기 때문에 아래에 함수들에서 undefined된걸 읽어버려서 오류가 난것 같아요
    // 그래서 그냥 state에다 변수이름과 타입정도만 미리 다 알려주고 난 후에 fetch된 실제 결과를 setState 해주기
    // 그런데 constructor에서는 setState 할 수 없으니까 componentDidMount를 써줌
    componentDidMount() {
        fetch('http://13.124.122.246:8080/apparatus/' + getUser().id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => {
            var newList = []
            if (response != undefined) {
                newList = response.apparatuses
            }
            this.setState({
                apparatusList: newList
            }, () => {
                    var apparatusId = 0
                    if (this.state.apparatusList.length > 0) {
                        var today = this.state.todayDate;
                        var yy = today.getFullYear();
                        yy += ''
                        yy = yy.substring(2, 4);
                        var mm = today.getMonth() + 1
                        var dd = today.getDate()
                        if (dd < 10) { dd = '0' + dd }
                        var todayInfo = yy + mm + dd;
                        var url = 'schedule/' + this.state.apparatusList[0].id + '/' + todayInfo
                        console.log(url)
                        console.log(this.state.apparatus[0].id)
                        apparatusId = this.state.apparatus[0].id
                    }
                    else { var url = 'apparatus/' + getUser().id }
                    fetch('http://13.124.122.246:8080/' + url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
                }).then(response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        // 오류 난 경우 처리 
                    }
                }).then(response => {
                    var newList = []
                    if (response == undefined) {
                        this.makeDataSource([])
                    }
                    else {
                        this.makeDataSource(response.schedules)
                        newList = response.schedules
                    }
                    this.setState({
                        menu: apparatusId,
                        realReservationList: newList
                    })
                }
                )
            }
            )
        }
        )
    }

//'기기 삭제'버튼에 대한 메소드
showModal_0 = () => {
    console.log(this.state.visible_0)
    this.setState({
        visible_0: true
    })
}
handleOk_0 = e => {
    console.log(e);
    this.handleRemove_2();
    this.setState({
        visible_0: false,
    })
}
handleCancel_0 = e => {
    console.log(e);
    this.setState({
        visible_0: false,
    })
}

//'기기 등록하기' 버튼 메소드
showModal_1 = () => {
    console.log(this.state.visible_1)
    this.setState({
        visible_1: true,
    })

}
handleOk_1 = e => {
    console.log(e); 
    this.setState({
        visible_1: false,
    })
}
handleCancel_1 = e => {
    console.log(e);
    this.setState({
        visible_1: false,
    })
}

//'등록하기'버튼 입력받기?
handleSubmit = e => {
    console.log(1)
    console.log(e)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        console.log(err)
        if (!err) {
            console.log(values)
            try {
            fetch('http://13.124.122.246:8080/apparatus/' + getLab().id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }).then(response => {
                if (response.status === 200) {
                    console.log('no problem')
                    return response.json()
                } else {
                    console.log('?')
                    message.warning('기기 이름이 중복되었습니다.');
                }
            }).then(response => {
                    console.log('newAPp')
                    console.log(response)
                    var newList = this.state.apparatusList
                    newList.push(response.apparatus)
                    this.setState({
                        apparatusList: newList,
                    })
            }) }
            catch (e) { 
                message.warning('가입된 lab이 없습니다.')
                history.push('/mygroup')
            }
    }})
    this.handleOk_1() 
};

//기기예약 버튼 이후 예약 리스트 업데이트
plusReservation = (list) => {
    this.setState({
        realReservationList: list
    })
    this.makeDataSource(list)
    this.handleOk_2()
}

//'예약하기'버튼에 대한 메소드
showModal_2 = () => {
    console.log(this.state.visible_2)
    this.setState({
        visible_2: true
    })
}
handleOk_2 = e => {
    console.log(e);
    this.setState({
        visible_2: false,
    })
}
handleCancel_2 = e => {
    console.log(e);
    this.setState({
        visible_2: false,
    })
}
//'본인 예약 삭제'버튼에 대한 메소드
showModal_3 = () => {
    console.log(this.state.visible_3)
    this.setState({
        visible_3: true
    })
}
handleOk_3 = e => {
    console.log(e);
    this.handleRemove();
    this.setState({
        visible_3: false,
    })
}
handleCancel_3 = e => {
    console.log(e);
    this.setState({
        visible_3: false,
    })
}
shouldComponentUpdate(props) {
    return true
}

//현재 페이지 내에서 파라미터만 변경되었을 경우
componentWillReceiveProps(newProps) {
    var today = this.state.todayDate;
    var yy = today.getFullYear();
    yy += ''
    yy = yy.substring(2, 4);
    var mm = today.getMonth() + 1
    var dd = today.getDate()
    if (dd < 10) { dd = '0' + dd }
    var todayInfo = yy + mm + dd;
    if (this.props.match.params !== newProps.match.params) {
        const { apparatusId } = this.props.match.params;

        fetch('http://13.124.122.246:8080/schedule/' + this.state.menu + '/' + todayInfo, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => {
            var newList = []
            if (response == undefined) {
                this.makeDataSource([])
            }
            else {
                this.makeDataSource(response.schedules)
                newList = response.schedules
            }

            this.setState({
                menu: apparatusId,
                realReservationList: newList
            })

        })
    }
}

getUrl = (id) => {
    const url = '/apparatus/' + id;
    return (url)
}

//날짜 왼쪽으로 이동하면 해당 날짜에 해당하는 새로운 표출할 예약 필터링
goToLeft = () => {
    var newday = this.state.todayDate;
    newday.setDate(newday.getDate() - 1);
    var yy = newday.getFullYear();
    yy += ''
    yy = yy.substring(2, 4);
    var mm = newday.getMonth() + 1
    var dd = newday.getDate()
    if (dd < 10) { dd = '0' + dd }
    var newdayInfo = yy + mm + dd;

    fetch('http://13.124.122.246:8080/schedule/' + this.state.menu + '/' + newdayInfo, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            // 오류 난 경우 처리 
        }
    }).then(response => {
        var newList = []
        if (response == undefined) {
            this.makeDataSource([]);
        }
        else {
            this.makeDataSource(response.schedules);
            newList = response.schedules
        }
        this.setState({
            todayDate: newday,
            realReservationList: newList,
        })
    })
    }
    //날짜 오른쪽 으로 이동하면 해당 날짜에 해당하는 새로운 표출할 예약 필터링
    goToRight = () => {
        var newday = this.state.todayDate;
        newday.setDate(newday.getDate() + 1);
        var yy = newday.getFullYear();
        yy += ''
        yy = yy.substring(2, 4);
        var mm = newday.getMonth() + 1
        var dd = newday.getDate()
        if (dd < 10) { dd = '0' + dd }
        var newdayInfo = yy + mm + dd;

        fetch('http://13.124.122.246:8080/schedule/' + this.state.menu + '/' + newdayInfo, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => {
            var newList = []
            if (response == undefined) {
                this.makeDataSource([]);
            }
            else {
                this.makeDataSource(response.schedules);
                newList = response.schedules
            }
            this.setState({
                todayDate: newday,
                realReservationList: newList,
            })
        })
    }

    //예약 삭제
    deleteReservation = (event) => {
        //console.log(this.props.value)
        const { param } = event.target.dataset;

        //realReservationList 업데이트
        var toDelete = 0
        var newArray = this.state.realReservationList
        for (var i = 0; i < newArray.length; i++) {
            if (newArray[i].id == param) {
                toDelete = i
            }
        }
        newArray.splice(toDelete, 1)

        //reservationDataSource 업데이트
        var newList = this.state.reservationDataSource;
        for (var i = 0; i < newList.length; i++) {
            console.log(newList[i])
            if (newList[i].id == param) {
                console.log('hereeee')
                newList[i].user = ''
                newList[i].deleteButton = ''
            }
        }
        fetch('http://13.124.122.246:8080/schedule/' + this.state.menu + '/' + param, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response.status === 200) {
                console.log("success")
                this.setState({
                    realReservationList: newArray,
                    reservationDataSource: newList
                })
            } else {
                // 오류 난 경우 처리 
            }
        })
    }

    // DataSource형식으로 정제하는 함수
    makeDataSource = (list) => {
        if (list == undefined) {
            list = []
        }
        var newList = list;
        var result = []
        var startHour, startMinute, endHour, endMinute, reserver;
        for (var h = 8, m = true; h <= 22 && m <= 30; h++) {
            var checker = 0;

            while (checker <= 1) {
                var oneBlock = {}
                var hh, mm; //h,m은 숫자형식의 시간단위, hh,mm은 두음절 짜리 string시간단위
                if (m) { mm = "00" } else { mm = "30" }
                if (h < 10) { hh = "0" + h } else { hh = "" + h }
                var time = hh + ":" + mm
                oneBlock['time'] = time;
                oneBlock['user'] = ''
                oneBlock['deleteButton'] = (<span></span>)
                oneBlock['id'] = 0

                result.push(oneBlock)
                checker++
                m = (!m)
            }
        }

        for (var i = 0; i < newList.length; i++) {

            startHour = list[i].startTime['hour']
            startMinute = list[i].startTime['minute']
            endHour = list[i].endTime['hour']
            endMinute = list[i].endTime['minute']
            reserver = list[i].reservation['name']


            console.log("list[i].id : " + list[i].id)

            var checker2 = false;
            var m2;
            for (var j = 0, h = 8, m = true; h <= 22; h++) { //m 이 true면 00분
                var checker = 0;
                while (checker <= 1) {
                    if (m) { mm = "00"; m2 = 0 } else { mm = "30"; m2 = 30 }

                    if (startHour == h && startMinute == m2) { //시작 시간이 예약시간과 같으면
                        checker2 = true; //checker2 ON
                    }
                    if (endHour == h && endMinute == m2) { //끝시간이 같으면 
                        checker2 = false; //checker2 OFF
                    }
                    if (checker2) {
                        result[j]['user'] = reserver
                        if (reserver === getUser().name) {
                            result[j]['deleteButton'] = ((!this.checkReservtionDate()) && <Button id='deleteButton' data-param={list[i].id} onClick={this.deleteReservation} > X </Button>)
                        }
                        result[j]['id'] = list[i].id
                    }
                    checker++; j++
                    m = (!m)
                }
            }
        }
        this.setState({
            reservationDataSource: result
        })
    }

    makeMonth = () => {
        console.log(this.state)
        var newday = new Date();
        newday = this.state.todayDate;
        return (newday.getMonth() + 1)
    }

    makeDate = () => {
        var newday = new Date();
        newday = this.state.todayDate;
        return (newday.getDate())
    }
    // 현재 누른 기기의 이름을 받아오는 함수
    getApparNameNow = () => {
        try {
            for (let i = 0; i < this.state.apparatusList.length; i++) {
                if (this.state.apparatusList[i].id == this.state.menu) {
                    return this.state.apparatusList[i].name
                }
            }
            return "선택 없음"

        } catch (e) {
            return "waiting"
        }
    }
    // 본인 예약 삭제할 수 있는 함수 
    // handleRemove=()=>{
    //     var newList = [];
    //     newList = this.state.reservationList;
    //     var del = 0;
    //     for(var i = 0; i < newList.length; i++){
    //         if (newList[i].user == getUser().name ){ //유저 네임은 로그인 정보 받아오는 걸로 바꾸기
    //             del = i; break;
    //         }
    //     }
    //     newList.splice(del, 1)
    //     this.setState({
    //         reservationList: newList,
    //     }, () => {
    //         this.setState({
    //             realReservationList: this.getRealReservationList(),
    //         })
    //     })
    // }

    // 기기 삭제하는 함수
    handleRemove_2 = () => {
        var newList = [];
        newList = this.state.apparatusList.filter(one => one.id != this.state.menu);
        if(getLab() == null) {
            message.error('가입된 lab이 없습니다.')
            history.push('/mygroup')
        }
        else {
        fetch('http://13.124.122.246:8080/apparatus/' + getLab().id + '/' + this.state.menu, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response === 200) {
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => {
            this.setState({
                apparatusList: newList,
            })
        }) }
    }

    // 현재 날짜의 현재 기기 예약 중 내 예약이 있는지 없는지 -> my 예약 삭제하기 버튼을 표출할지 안할지 정하기 위함
    // checkMyReservation = () => {
    //     var newList = [];
    //     newList = this.state.realReservationList;

    //     var present = false;
    //     for (var i = 0; i < newList.length; i++) {
    //         if (newList[i].reservation['name'] == getUser().name) { //login user정보 오면 넣기
    //             present = true; break;
    //         }

    //     }
    //     return (present)
    // }


    //하고자 하는 예약 or 삭제하고자 하는 예약이 옛날 건지 확인 
    checkReservtionDate = () => {
        var realToday = new Date();
        var nowMonth = realToday.getMonth() + 1
        var nowDate = realToday.getDate();
        var isPast = false;

        if (this.state.todayDate.getMonth() + 1 < nowMonth) { isPast = true }
        else if (this.state.todayDate.getMonth() + 1 == nowMonth && this.state.todayDate.getDate() < nowDate) {
            isPast = true;
        }
        return (isPast)
    }

    //기계 클릭하면 페이지 바뀌게 하기
    clickApparatus = (event) => {
        const { param } = event.target.dataset;

        var today = new Date(); //새로운 기기 누르면 어쨋거나 '오늘'기준으로 데이터 보여주기
        var yy = today.getFullYear();
        yy += ''
        yy = yy.substring(2, 4);
        var mm = today.getMonth() + 1
        var dd = today.getDate()
        if (dd < 10) { dd = '0' + dd }
        var todayInfo = yy + mm + dd;
        console.log('apparatus id: ', param)
        fetch('http://13.124.122.246:8080/schedule/' + param + '/' + todayInfo, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => {
            var newList = []
            if (response == undefined) {
                this.makeDataSource([])
            }
            else {
                this.makeDataSource(response.schedules)
                newList = response.schedules
            }
            this.setState({
                menu: param,
                realReservationList: newList
            })
        }
        )
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <br />
                <center><Title style={{ marginBottom: 35 }}>Apparatus</Title></center>

                <Row >
                    <Col span={6} style={{ margin: 10 }}>
                        {/* 기기들 목록 */} 현재 기기: {this.getApparNameNow()}
                        <p></p>
                        <List
                            grid={{ gutter: 16, column: 1 }}
                            dataSource={this.state.apparatusList}
                            renderItem={item => (
                                <List.Item>
                                    <Button type="primary" id='appartus' data-param={item.id} onClick={this.clickApparatus} >{item.name}</Button>
                                </List.Item>
                            )}
                        />

                        <Button onClick={this.showModal_1} active>
                            기기 등록
                    </Button>
                        <Modal
                            title="new Apparatus 등록 하기"
                            visible={this.state.visible_1}

                            onOk={this.handleOk_1}
                            onCancel={this.handleCancel_1}

                        >
                            <Form onSubmit={this.handleSubmit} className="form">
                                <Form.Item>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '등록할 기기 이름을 입력하세요. ' }],
                                    })(
                                        <Input placeholder="new apparatue name?" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="button">
                                        등록 하기
                                </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        <p></p>
                        <Button onClick={this.showModal_0} > {/*기기 삭제 버튼*/}
                            기기 삭제
                    </Button>
                        <Modal
                            title="Apparatus 삭제 하기"
                            visible={this.state.visible_0}
                            onOk={this.handleOk_0}
                            onCancel={this.handleCancel_0}
                        >
                            <p> ---------- 해당 기기를 삭제하시겠습니까? ---------</p>
                            <p>선택한 기기: {this.getApparNameNow()} </p>
                            <p></p>
                            <p></p>

                        </Modal>
                    </Col>
                    <Col span={16} >
                        {/* 기기들 상세 창 */}
                        <Card>
                            <Row span={3}>
                                <center>
                                    <Button type="link" onClick={this.goToLeft}><Icon type="arrow-left" /></Button>
                                    {this.makeMonth()}월 {this.makeDate()}일
                                <Button type="link" onClick={this.goToRight}><Icon type="arrow-right" /></Button>
                                </center>
                            </Row>
                            <Row span={18}>
                                {/*시간과 예약현황을 표로 나타내기*/}
                                <Table size='small' dataSource={this.state.reservationDataSource} columns={this.state.columns} scroll={{ y: 240 }} pagination={{ pageSize: 50 }} />
                            </Row>
                            <Row span={2}>
                                {(!this.checkReservtionDate()) &&
                                    <div>
                                        <center>
                                            <Button onClick={this.showModal_2} >
                                                예약 하기
                                    </Button>
                                        </center>

                                        <Modal
                                            title=" Apparatus 예약 하기"
                                            visible={this.state.visible_2}
                                            onOk={this.handleOk_2}
                                            onCancel={this.handleCancel_2}
                                        >
                                            <p>* 예약할 기기: {this.getApparNameNow()} </p>
                                            <p>* 예약자: {getUser().name}</p>
                                            <p>* 예약할 시간: </p>

                                            {/*</Modal><Form onSubmit={this.handleSubmit2()} className="form">
                            원래 이렇게 돼있었는데 
                            1. 함수를 파라미터로 전달해줄때는 () 없음
                            2. 함수를 호출할때는 () 있음
                            이렇게 두개를 잘 구분해서 써야 함!!
                            원래처럼 () 써버리면 무한루프
                            */}
                                            <ApparatusReservation apparatusId={this.state.menu} todayDate={this.state.todayDate} plusReservation={this.plusReservation} />

                                            <center><p> 주의 사항 </p></center>
                                            <center><p> 1. 예약은 오전8시부터 밤 10시까지 가능합니다. </p></center>
                                            <center><p>            2. 예약은 삼십분 단위로만 가능합니다.        </p> </center>

                                        </Modal>
                                    </div>}
                                {/* <Divider type="vertical" />
                            {(this.checkMyReservation()) && (
                                <div>
                                    <Button onClick={this.showModal_3} >
                                        my예약 삭제하기
                                </Button>
                                    <Modal
                                        title="my 예약 삭제하기"
                                        visible={this.state.visible_3}
                                        onOk={this.handleOk_3}
                                        onCancel={this.handleCancel_3}

                                    >   <p> ---- 아래 정보의 예약을 삭제 하시겠습니까? ----</p>
                                        <p>예약 기기: {this.getApparNameNow()} </p>
                                        <p>예약자: {getUser().name}</p>
                                        <p>예약 시간: </p>
                                    </Modal>
                                </div>)
                            } */}
                            </Row>
                        </Card>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default Form.create()(Apparatus);
