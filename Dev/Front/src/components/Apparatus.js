import React, { Component } from 'react'; 
import { Typography, Icon, Row, Col, Button, Modal, Divider, Table,Card, List, Input, TimePicker} from 'antd'
import { Link } from "react-router-dom"; 
import moment from 'moment';

const { Title } = Typography; 

class Apparatus extends Component {
    state = {
    }
    constructor(props){
        super(props);
        const { apparatusId } = this.props.match.params;
        //오늘 날짜 받아오기
        var today = new Date();
        this.state = {
            visible_1: false, //'등록하기' 모달
            visible_2: false, // '예약하기' 모달
            visible_3: false, // '본인 예약 삭제확인' 모달
            menu: apparatusId,
            format: 'HH:mm',
            apparatusList: [
                {
                    id: 1,
                    nickname: "apparatus1" 
                }, {
                    id: 2,
                    nickname: "apparatus2"
                }, {
                    id: 3,
                    nickname: "apparatus3"
                }, {
                    id: 4,
                    nickname: "apparatus4"
                }, {
                    id: 5,
                    nickname: "apparatus5"
                }
            ],
            reservationList:[
                {   
                    apparatusId: 1,
                    month: 11,
                    date: 23,
                    startTime: 8,
                    endTime: 11,
                    user: 'Yeong mo'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 23,
                    startTime: 8,
                    endTime: 10,
                    user: 'Joo young'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 23,
                    startTime: 13,
                    endTime: 16,
                    user: 'Yeong mo'
                },
                {
                    apparatusId:1,
                    month:11,
                    date:22,
                    startTime: 11,
                    endTime: 13,
                    user: 'Eun mu'
                }, 

                {   
                    apparatusId: 1,
                    month: 11,
                    date: 22,
                    startTime: 8,
                    endTime: 10,
                    user: 'Ji su'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 22,
                    startTime: 11,
                    endTime: 13,
                    user: 'Hyeok ju'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 22,
                    startTime: 14,
                    endTime: 17,
                    user: 'Han bin'
                },
                {
                    apparatusId:1,
                    month:11,
                    date:22,
                    startTime: 16,
                    endTime: 18,
                    user: 'Yeong mo'
                }

                ,
                {   
                    apparatusId: 1,
                    month: 11,
                    date: 24,
                    startTime: 9,
                    endTime: 13,
                    user: 'Ji su'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 24,
                    startTime: 9,
                    endTime: 10,
                    user: 'Joo young'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 24,
                    startTime: 10,
                    endTime: 11,
                    user: 'Hyeok ju'
                },
                {
                    apparatusId:4,
                    month:11,
                    date:24,
                    startTime: 11,
                    endTime: 12,
                    user: 'Yeong mo'
                }
            ],
            columns : [
                {
                    title: 'Time',
                    dataIndex: 'time', 
                    key: 'time',
                },
                {
                    title: 'User',
                    dataIndex:'user',
                    key:'user',
                },
             ],
            todayDate : today,   
            realReservationList: []
         }     
    }    
    //'등록하기'버튼에 대한 메소드
    showModal_1 =()=> {
        console.log(this.state.visible_1)
        this.setState({
            visible_1: true
        })
    }
    handleOk_1 =e=> {
        console.log(e);
        this.setState({
            visible_1: false,
        })
    }
    handleCancel_1 =e=> {
        console.log(e);
        this.setState({
            visible_1: false,
        })
    }
    //'예약하기'버튼에 대한 메소드
    showModal_2 =()=> {
        console.log(this.state.visible_2)
        this.setState({
            visible_2: true
        })
    }
    handleOk_2 =e=> {
        console.log(e);
        this.setState({
            visible_2: false,
        })
    }
    handleCancel_2 =e=> {
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
        if (this.props.match.params !== newProps.match.params) {
            const { apparatusId } = this.props.match.params;
            this.setState(
                {
                    menu: apparatusId
                }, () => {
                    this.setState({
                        realReservationList: this.getRealReservationList()
                    })
                }
            )
        }
    }
    //기기별 리스트: 새롭게 선택한 기기를 예약한 사람들 뽑아서 리스트 만들기    
    getbyApparList = () => {
        var byAppar = []
        for (var i = 0; i < this.state.reservationList.length; i++) {
            var one = {}
            one = this.state.reservationList[i]
            if (one.apparatusId == this.state.menu) {
                byAppar.push(one);
            }
        }
        return (byAppar)
    }
    // 해당 기기 하나를 선택 후 그 기기 예약자만 뽑아서 
    // newList의 각 시간행에 맞게 예약자 이름을 열에 저장하는 함수 
    
    //Todo : 오늘 날짜인 것들만 뽑아주기
    getRealReservationList = () => {
        var newList = [];
        var byApparList = []
        byApparList = this.getbyApparList().filter( one => one.month==this.makeMonth() && one.date==this.makeDate());

        for (var i = 0; i < 15; i++) {
            var newOne = {}
            var time = i + 8;
            newOne['time'] = time
            newOne['user'] = ''
            for (var j = 0; j < byApparList.length; j++) {
                var one = {}
                one = byApparList[j]
                var start = one.startTime
                var end = one.endTime
                if (start <= time && time < end) {
                    newOne['user'] = one.user;
                    break;
                }
            }
            newList.push(newOne)
        }
        return (newList)
    }
    getUrl = (id) => {
        const url = '/apparatus/' + id;
        return (url)
    }
    //날짜 왼쪽으로 이동하면 해당 날짜에 해당하는 새로운 표출할 예약 필터링
    goToLeft = () => {
        var newday = new Date();
        newday = this.state.todayDate;
        newday.setDate(newday.getDate()-1);
        this.setState({
            todayDate :  newday
        }, () => {
            this.setState({realReservationList : this.getRealReservationList()})
        })
    }
    //날짜 오른쪽 으로 이동하면 해당 날짜에 해당하는 새로운 표출할 예약 필터링
    goToRight = () => { 
        var newday = new Date();
        newday = this.state.todayDate;
        newday.setDate(newday.getDate()+1);
        this.setState({
            todayDate :  newday,
        }, () => {
            this.setState({realReservationList : this.getRealReservationList()})
        })
    }

    makeMonth = () => {
        var newday = new Date();
        newday = this.state.todayDate;
        return (newday.getMonth()+1)
    }
    makeDate = () => {
        var newday = new Date();
        newday = this.state.todayDate;
        return (newday.getDate())
    }
    // 현재 누른 기기의 이름을 받아오는 함수
    getApparNameNow =()=>{
        var n = this.state.menu;
        if (n!=0){
            //처음 눌렀을 때는 아님
            n-=1;
        }
        var m = this.state.apparatusList[n].nickname
        return (m)
    }
    // 본인 예약 삭제할 수 있는 함수 
    handleRemove=()=>{
        var newList = [];
        newList = this.state.reservationList;
        var del = 0;
        for(var i = 0; i < newList.length; i++){
            if (newList[i].user == 'Yeong mo'){ //유저 네임은 로그인 정보 받아오는 걸로 바꾸기
                del = i; break;
            }
        }
        newList.splice(del,1)
        this.setState({
            reservationList: newList,
        }, () => {
            this.setState({
                realReservationList: this.getRealReservationList(),
            })    
        })
    }

    checkMyReservation=()=>{
        var newList = [];
        newList = this.state.realReservationList;
        var present = false;
        for(var i=0; i<newList.length; i++){
            if(newList[i].user == 'Yeong mo'){ //login user정보 오면 넣기
                present = true; break;
            }
        }
        return (present)
    }

    render() { 
        return (
            <div>
                <br/>
                <center><Title style={{ marginBottom: 35 }}>Apparatus</Title></center>

                <Row >
                    <Col span={6} style={{margin : 10}} >
                        {/* 기기들 목록 */}
                        <List
                            grid={{ gutter: 16, column: 1 }}
                            dataSource={this.state.apparatusList}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={this.getUrl(item.id)}><Button type="primary">{item.nickname}</Button></Link>
                                </List.Item>
                            )}
                        />
                        <Button onClick={this.showModal_1}>
                            기기 추가
                        </Button>
                        <Modal
                            title="my Apparatus 기기 등록"
                            visible={this.state.visible_1}
                            onOk={this.handleOk_1}
                            onCancel={this.handleCancel_1}
                        >
                            <p>기기이름: <Input placeholder="등록할 기기?" /></p>
                            <p>등록자: Yeong mo </p> {/*login user 정보 받으면 넣기*/}
                        </Modal>
                    </Col>
                    <Col span={16} >
                        {/* 기기들 상세 창 */}
                            <Card>
                            <Row span={3}>
                                <Button type="link" onClick={this.goToLeft}><Icon type="arrow-left" /></Button>
                                {this.makeMonth()}월 {this.makeDate()}일
                                <Button type="link" onClick={this.goToRight}><Icon type="arrow-right" /></Button>
                            </Row>
                            <Row span={18}>
                                {/*시간과 예약현황을 표로 나타내기*/}
                                <Table size='small' dataSource={this.state.realReservationList} columns={this.state.columns} scroll={{ y: 240 }} pagination={{ pageSize: 50 }} />
                            </Row>
                            <Row span={2}>
                                <Button onClick={this.showModal_2}>
                                    예약 하기
                                    </Button>
                                <Modal
                                    title="my Apparatus 예약 하기"
                                    visible={this.state.visible_2}
                                    onOk={this.handleOk_2}
                                    onCancel={this.handleCancel_2}
                                >
                                    <p>예약할 기기: {this.getApparNameNow()} </p>
                                    <p>예약자: 김지수</p> {/*login user 정보 받으면 넣기*/}
                                    <p>예약할 시간: (예약은 30분 단위로만 가능합니다) <br /><br />
                                        from <TimePicker defaultValue={moment('12:00', this.state.format)} format={this.state.foramt} /> to <TimePicker defaultValue={moment('14:00', this.state.format)} format={this.state.foramt} /></p>
                                </Modal>
                                <Divider type="vertical" />
                                {(this.checkMyReservation()) && (
                                    <div>
                                        <Button onClick={this.showModal_3}>
                                            my예약 삭제하기
                                    </Button>
                                        <Modal
                                            title="my 예약 삭제하기"
                                            visible={this.state.visible_3}
                                            onOk={this.handleOk_3}
                                            onCancel={this.handleCancel_3}

                                        >   <p> ---- 아래 정보의 예약을 삭제 하시겠습니까? ----</p>
                                            <p>예약 기기: {this.getApparNameNow()} </p>
                                            <p>예약자: Yeong mo</p> {/*login user 정보 받으면 넣기*/}
                                            <p>예약 시간: </p>
                                        </Modal>
                                    </div>)
                                }

                            </Row>
                        </Card>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default Apparatus;
