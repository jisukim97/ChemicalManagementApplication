import React, { Component } from 'react'; 
import { Typography, Icon, Row, Col, Button, Modal, Divider, Table,Card, List, Input, Form, TimePicker, message} from 'antd'
import { Link } from "react-router-dom"; 
import moment from 'moment';
import { getUser, getLab } from '../authentication';


const { Title } = Typography; 

class Apparatus extends Component {
    state = {
        
    }
    constructor(props){
        super(props);
        const { apparatusId } = this.props.match.params;
        //현재 랩 id로 기기 리스트 받아와서 변수에 저장하기 
        //오늘 날짜 받아오기
        var today = new Date();
      
        this.state = {
            menu: apparatusId,
            todayDate: today,
            realReservationList: [],
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
            userId: getUser().id,
            labId: getLab().id,
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
                    date: 24,
                    startTime: 8,
                    endTime: 11,
                    user: 'Yeong mo'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 24,
                    startTime: 8,
                    endTime: 10,
                    user: 'Joo young'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 24,
                    startTime: 13,
                    endTime: 16,
                    user: 'Yeong mo'
                },
                {
                    apparatusId:1,
                    month:11,
                    date:24,
                    startTime: 11,
                    endTime: 13,
                    user: 'Eun mu'
                }, 

                {   
                    apparatusId: 1,
                    month: 11,
                    date: 25,
                    startTime: 8,
                    endTime: 10,
                    user: 'Ji su'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 25,
                    startTime: 11,
                    endTime: 13,
                    user: 'Hyeok ju'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 25,
                    startTime: 14,
                    endTime: 17,
                    user: 'Han bin'
                },
                {
                    apparatusId:1,
                    month:11,
                    date:25,
                    startTime: 16,
                    endTime: 18,
                    user: 'Yeong mo'
                }

                ,
                {   
                    apparatusId: 1,
                    month: 11,
                    date: 26,
                    startTime: 9,
                    endTime: 13,
                    user: 'Ji su'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 26,
                    startTime: 9,
                    endTime: 10,
                    user: 'Joo young'
                },
                {   
                    apparatusId: 2,
                    month: 11,
                    date: 26,
                    startTime: 10,
                    endTime: 11,
                    user: 'Hyeok ju'
                },
                {
                    apparatusId:4,
                    month:11,
                    date:26,
                    startTime: 11,
                    endTime: 12,
                    user: 'Yeong mo'
                }
            ],
           
         }     
    }    
    //'기기 삭제'버튼에 대한 메소드
    showModal_0 =()=> {
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

    //'등록하기'버튼에 대한 메소드
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
                    this.setStatus({
                        apparatusList: response
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
            this.setState(
                {
                    menu: apparatusId
                }, () => {
                    //클릭한 기기 ID에 대해서 예약 리스트 받아와서 STATE에 저장 
                    this.setState({
                        realReservationList: this.getRealReservationList()
                    })
                }
            )
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

        var newList = this.state.apparatusList.filter(one => one.id == n)
        if(newList.length>0){
            var m = newList[0].nickname
        }
        else { var m = ''} // 없어지는 순간의 오류를 막기 위한 else구문
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
    // 기기 삭제하는 함수
    handleRemove_2=()=>{
        var newList = [];
        newList = this.state.apparatusList.filter(one => one.id != this.state.menu);
        fetch('http://13.124.122.246:8080/apparatus/'+this.labId+'/'+this.state.menu ,{ 
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if(response === 200){
                return response.json()
            } else {
                // 오류 난 경우 처리 
            }
        }).then(response => { 
            this.setStatus({ 
                apparatusList : newList,
            })
        })
    }

    // 현재 날짜의 현재 기기 예약 중 내 예약이 있는지 없는지 
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

    //삭제하고자 하는 예약이 옛날 건지 확인 
    checkReservtionDate =()=> {
        var nowMonth = this.getMonth();
        var nowDate = this.getDate();
        var isPast = false;
        if(this.today.getMonth() >= nowMonth && this.today.getDate() > nowDate){
            isPast = true;
        }
        return(isPast)
    }

    render() { 
        const { getFieldDecorator } = this.props.form;
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
                                    <Link to={this.getUrl(item.id)}><Button type="primary" active>{item.nickname}</Button></Link>
                                </List.Item>
                            )}
                        />
                        <Form onSubmit={this.handleSubmit} className = "form">
                            {/*기기추가 창*/}
                            <Form.Item>
                                {getFieldDecorator('apparatusName', {
                                    rules: [{required:true, message: "Apparatus 등록"}],
                                })(
                                    <Input
                                        placeholder="new Apparatus 이름"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit' className="button">
                                    등록
                                </Button>
                            </Form.Item>
                        </Form>


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
                            <p>등록자: Yeong mo </p> {/*login user 정보 받으면 넣기*/}
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
                                    <p>예약자: Yeong mo</p> {/*login user 정보 받으면 넣기*/}
                                    <p>예약할 시간: (예약은 30분 단위로만 가능합니다) <br /><br />
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

export default Form.create()(Apparatus);
