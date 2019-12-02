import React, {Component} from 'react';
import { Typography, Icon, Row, Col, Button, Modal, Divider, Table, Card, List, Input, Form, TimePicker, message } from 'antd'
import { Link } from "react-router-dom";
import moment from 'moment';
import { getUser, getLab } from '../authentication';


class ApparatusReservation extends Component{

    state = {
    }
    handleSubmit2 = e => {
        
        e.preventDefault();
        this.props.form.validateFields((err, values)=> {
            
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
                var newdayInfo = yy + mm + dd;
                console.log(newdayInfo)
                fetch('http://13.124.122.246:8080/schedule/' + getUser().id + '/' + this.props.apparatusId + '/' + newdayInfo + "/" + startTime + "/" + endTime, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values) //여기에다가 body 넣어주기
                }).then(response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        console.log("기기 예약 시간 중복") 
                        return 2
                    }
                }).then(response => {
                    if (response === 2){
                        console.log("here") 
                    } else {
                        this.props.plusReservation(response.schedules)
    
                    }
                })
            }
        });
        //this.props.앞에서새로만든함수(response로받은 리스트)
    };

  
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit2} className="form">
            <Form.Item>
                {getFieldDecorator('start', {
                    rules: [{ required: true, message: '예약 시작 시간을 입력하세요. ' }],
                })( 
                    <Input placeholder="new apparatue name?" />
                    //<center><TimePicker defaultValue={moment('12:00', this.state.format)} format={this.state.format} /></center>
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('end', {
                    rules: [{ required: true, message: '예약 끝 시간을 입력하세요. ' }],
                })(
                    <Input placeholder="new apparatue name?" />
                    //<center><TimePicker defaultValue={moment('14:00', this.state.format)} format={this.state.format} /></center>    
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="button">
                    예약 하기
                </Button>
            </Form.Item>
        </Form>
        )
    }
}


export default Form.create()(ApparatusReservation);