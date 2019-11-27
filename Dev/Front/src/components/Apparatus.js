import React, { Component } from 'react';
import { Typography, Icon, Row, Col, Button, Modal, Divider, Table, Card, List, Input, Form, TimePicker, message } from 'antd'
import { Link } from "react-router-dom";
import moment from 'moment';
import { getUser, getLab } from '../authentication';


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
            ],
            menu: apparatusId, // 처음들어오면 menu가 0임
            apparatusList : [],
            realReservationList : [],
            todayDate : today
        }

    }

    //0. 아래에 있는 곳에서 state의 변수들을 참조하므로, 변수들을 미리 선언 해 놓고, fetch를 해줘야 하네여
    // 순서가 fetch되고 난 결과는 너무 늦게 나타나기 때문에 아래에 함수들에서 undefined된걸 읽어버려서 오류가 난것 같아요
    // 그래서 그냥 state에다 변수이름과 타입정도만 미리 다 알려주고 난 후에 fetch된 실제 결과를 setState 해주기
    // 그런데 constructor에서는 setState 할 수 없으니까 componentDidMount를 써줌
    componentDidMount(){
        fetch('http://13.124.122.246:8080/apparatus/' + getUser().id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (response.status === 200) { //1. 여기 response가 200이 아니라 response.status가 200이여야함!! 아래도 다 고쳐주세여 
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => {
            this.setState({
                apparatusList: response.apparatuses // 2.백엔드의 response형식대로 불러와줘야 함 그냥 response가 아니라 response.apparatuses
            }, () => {
                console.log(123123123123123)
                console.log(this.state)
            })
        })

    }

    //'기기 삭제'버튼에 대한 메소드
    showModal_0 = () => {
        console.log(this.state.visible_0)
        this.setState({
            visible_0: true
        })
    }
    handleOk_0 =e=> {
        console.log(e);
        this.handleRemove_2();
        this.setState({
            visible_0: false,
        })
    }
    handleCancel_0 =e=> {
        console.log(e);
        this.setState({
            visible_0: false,
        })
    }
    //'기기 등록하기' 버튼 메소드
    showModal_1 =()=> {
        console.log(this.state.visible_1)
        this.setState({
            visible_1:true,
        })

    }
    handleOk_1 =e=> {
        console.log(e);
        this.handleSubmit();
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

    //'등록하기'버튼 입력받기?
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values)=> {
            if (!err) {
                console.log(values)
                fetch('http://13.124.122.246:8080/apparatus/'+this.state.menu, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(values) //여기에다가 body 넣어주기
                }).then(response => {
                    if (response === 200) {
                        return response.json()
                    } else {
                        // 오류 난 경우 처리 
                    }
                }).then(response => {
                    this.state.apparatusList.push(response)
                    this.setState({
                        apparatusList: this.state.apparatusList
                    })
                })
            }
        });
    };

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
            var newday = new Date();
            newday = this.state.todayDate;
            var yy = newday.getFullYear();
            yy+=''
            yy = yy.substring(2,4);
            var mm = newday.getMonth()
            var dd = newday.getDate()
            var todayInfo = yy+mm+dd ;
            console.log("todayInfo = " + todayInfo)
            fetch('http://13.124.122.246:8080/schedule/apparatus/'+this.state.menu+'/'+todayInfo ,{ 
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
            }).then(response => {
                if(response.statue === 200){
                    return response.json()
                } else {
                    // 오류 난 경우 처리 
                }
            }).then(response => { 
                console.log(4)
                console.log(response)
                this.setStatus({
                    menu: apparatusId,
                    realReservationList: response
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
        var newday = new Date();
        newday = this.state.todayDate;
        newday.setDate(newday.getDate()-1);
        var yy = newday.getFullYear();
        yy+=''
        yy = yy.substring(2,4);
        var mm = newday.getMonth()
        var dd = newday.getDate()
        var todayInfo = yy+mm+dd ;
        fetch('http://13.124.122.246:8080/schedule/apparatus/'+this.state.menu+'/'+todayInfo ,{ 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if(response === 200){
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => { 
            this.setStatus({ 
                todayDate : newday,
                realReservationList: response
            })
        })
    }
    //날짜 오른쪽 으로 이동하면 해당 날짜에 해당하는 새로운 표출할 예약 필터링
    goToRight = () => { 
        var newday = new Date();
        newday = this.state.todayDate;
        newday.setDate(newday.getDate()+1);
        var yy = newday.getFullYear();
        yy+=''
        yy = yy.substring(2,4);
        var mm = newday.getMonth()
        var dd = newday.getDate()
        var todayInfo = yy+mm+dd ;
        fetch('http://13.124.122.246:8080/schedule/apparatus/'+this.state.menu+'/'+todayInfo ,{ 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if(response === 200){
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => { 
            this.setStatus({ 
                todayDate : newday,
                realReservationList: response
            })
        })
    }

    makeMonth = () => {
        console.log(this.state)
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
        try {
            console.log("test")
            console.log(this.state.apparatusList)
            for (let i=0 ; i<this.state.apparatusList.length ; i++){
                if (this.state.apparatusList[i].id === this.state.menu){
                    return this.state.apparatusList[i].name
                }
            }
            return "error"
    
        } catch (e) {
            return "waiting"
        }
    }
    // 본인 예약 삭제할 수 있는 함수 
    handleRemove=()=>{
        var newList = [];
        newList = this.state.reservationList;
        var del = 0;
        for(var i = 0; i < newList.length; i++){
            if (newList[i].user == getUser().name ){ //유저 네임은 로그인 정보 받아오는 걸로 바꾸기
                del = i; break;
            }
        }
        newList.splice(del, 1)
        this.setState({
            reservationList: newList,
        }, () => {
            this.setState({
                realReservationList: this.getRealReservationList(),
            })
        })
    }
    // 기기 삭제하는 함수
    handleRemove_2 = () => {
        var newList = [];
        newList = this.state.apparatusList.filter(one => one.id != this.state.menu);
        fetch('http://13.124.122.246:8080/apparatus/' + this.labId + '/' + this.state.menu, {
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
        })
    }

    // 현재 날짜의 현재 기기 예약 중 내 예약이 있는지 없는지 
    checkMyReservation = () => {
        var newList = [];
        newList = this.state.realReservationList;
        var present = false;
        for (var i = 0; i < newList.length; i++) {
            if (newList[i].user == getUser().name) { //login user정보 오면 넣기
                present = true; break;
            }
        }
        return (present)
    }

    //삭제하고자 하는 예약이 옛날 건지 확인 
    checkReservtionDate = () => {
        var nowMonth = this.getMonth();
        var nowDate = this.getDate();
        var isPast = false;
        if (this.today.getMonth() >= nowMonth && this.today.getDate() > nowDate) {
            isPast = true;
        }
        return (isPast)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <br />
                <center><Title style={{ marginBottom: 35 }}>Apparatus</Title></center>

                <Row >
                    <Col span={6} style={{ margin: 10 }} >
                        {/* 기기들 목록 */} 현재 기기: {this.getApparNameNow()}
                        <List
                            grid={{ gutter: 16, column: 1 }}
                            dataSource={this.state.apparatusList}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={this.getUrl(item.id)}><Button type="primary" active>{item.name}</Button></Link>
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
                        <Button onClick={this.showModal_0} active> {/*기기 삭제 버튼*/}
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
                                <Table size='small' dataSource={this.state.realReservationList} columns={this.state.columns} scroll={{ y: 240 }} pagination={{ pageSize: 50 }} />
                            </Row>
                            <Row span={2}>
                                <Button onClick={this.showModal_2} active>
                                    예약 하기
                                    </Button>
                                <Modal
                                    title="my Apparatus 예약 하기"
                                    visible={this.state.visible_2}
                                    onOk={this.handleOk_2}
                                    onCancel={this.handleCancel_2}
                                >
                                    <p>예약할 기기: {this.getApparNameNow()} </p>
                                    <p>예약자: {getUser().name}</p>
                                    <p>예약할 시간: (예약은 한시간 단위로만 가능합니다) <br /><br />
                                        from <TimePicker defaultValue={moment('12:00', this.state.format)} format={this.state.foramt} /> to <TimePicker defaultValue={moment('14:00', this.state.format)} format={this.state.foramt} /></p>
                                </Modal>
                                <Divider type="vertical" />
                                {(this.checkMyReservation()) && (
                                    <div>
                                        <Button onClick={this.showModal_3} active>
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
                                }
                            </Row>
                        </Card>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default Form.create()(Apparatus);
