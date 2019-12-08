import React, { Component } from 'react';
import { Typography, Icon, Row, Col, Button, Modal, Divider, Table, Card, List, Input, Form, TimePicker, message } from 'antd'
import { Link } from "react-router-dom";
import moment from 'moment';
import { getUser, getLab } from '../authentication';
import { history } from '../History';


class ApparatusReservation extends Component {

    state = {
    }

    handleSubmit2 = e => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {


            if (!err) {
                var startTime = values['start']
                var endTime = values['end']
                var newday = this.props.todayDate;
                console.log(newday)
                var yy = newday.getFullYear();
                yy += ''
                yy = yy.substring(2, 4);
                var mm = newday.getMonth() + 1
                var dd = newday.getDate()
                if (dd < 10) { dd = "0" + dd }
                var newdayInfo = yy + mm + dd;
                
                var reservationList = this.props.reservationList
                var duplicated = false; //시간 중복 체커
                for (var i = 0; i < reservationList.length; i++) { //예약된 것중 시작시간ㅇ
                    var sh = reservationList[i].startTime.hour
                    var sm = +reservationList[i].startTime.minute
                    if (sh < 10) { sh = "0" + sh } else { sh +="" }
                    if (sm < 10) { sm = "0" + sm } else { sm +="" }
                    
                    var eh = ""+reservationList[i].endTime.hour
                    var em = reservationList[i].endTime.minute
                    if (eh < 10) { eh = "0" + eh } else { eh +="" }
                    if (em < 10) { em = "0" + em } else { em +="" }
                    
                    var reservStart = sh+sm
                    var reservEnd = eh+em 
                    if(startTime == reservStart && endTime == reservEnd) { console.log(1) ;duplicated =true; break;}
                    else if((startTime<reservStart)&&(reservStart<endTime) ){ console.log(2) ; duplicated=true; break;}
                    else if(startTime>reservStart && endTime<reservEnd){console.log(3) ;duplicated=true; break;}
                    else if(startTime<reservEnd && reservEnd<endTime)  { console.log(4) ;duplicated=true; break;}   
                }

                
                var past = false; //지난 시간 예약 체커
                var now = new Date();
                if( startTime.substring(0,2)<now.getHours() && mm == (now.getMonth()+1) && dd == now.getDate()) {past=true;}
                if(startTime.substring(0,2) == now.getHours() && startTime.substring(2,4)<now.getMinutes() && mm == (now.getMonth()+1) && dd == now.getDate()) {past=true}

                if (startTime >= endTime) { message.error("끝 시간이 시작 시간보다 빠릅니다!") }
                else if (past) { message.error("지난 시간은 예약할 수 없습니다!")}
                else if (getLab() === null) {
                    message.error("가입된 lab이 없습니다!")
                    history.push('/mygroup')
                }
                else if ( !((startTime.substring(2,4) === "00") || (startTime.substring(2,4)==="30")) || !((endTime.substring(2,4) === "00") || (endTime.substring(2,4)==="30")) ) {
                    message.error("예약시간 끝자리를 00 또는 30으로 맞춰주세요!")
                }
                else if(duplicated) { message.error("예약 시간이 중복됩니다!")}
                else {
                    fetch('http://13.124.122.246:8080/schedule/' + getUser().id + '/' + this.props.apparatusId + '/' + newdayInfo + "/" + startTime + "/" + endTime, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values)
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(
                                response => {
                                    try {
                                        this.props.plusReservation(response.schedules)
                                    }
                                    catch (e) {
                                        message.warning("등록된 기기가 없습니다")
                                    }
                                }
                            )
                        } else {
                            console.log(this.props.apparatusId) //선택된 기계가 없는데 예약하려는 경우
                            message.warning('예약 오류입니다. ');
                        }
                    })
                }
            }
        });

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit2} className="form">
                <Form.Item>
                    {getFieldDecorator('start', {
                        rules: [{ required: true, message: '예약 시작 시간을 입력하세요. ' }],
                    })(
                        <Input placeholder="ex: 1000 " />
                        //<center><TimePicker defaultValue={moment('12:00', this.state.format)} format={this.state.format} /></center>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('end', {
                        rules: [{ required: true, message: '예약 끝 시간을 입력하세요. ' }],
                    })(
                        <Input placeholder="ex: 1200" />
                        //<center><TimePicker defaultValue={moment('14:00', this.state.format)} format={this.state.format} /></center>    
                    )}
                </Form.Item>
                <Form.Item>
                    <center>
                        <Button type="primary" htmlType="submit" className="button">
                            예약 하기
                    </Button>
                    </center>
                </Form.Item>
            </Form>
        )
    }
}


export default Form.create()(ApparatusReservation);