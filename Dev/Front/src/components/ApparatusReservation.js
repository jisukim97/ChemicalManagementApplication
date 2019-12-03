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
                if(dd<10){ dd="0"+dd}
                var newdayInfo = yy + mm + dd;
                console.log(newdayInfo)
                if(startTime >= endTime) { message.error("끝 시간이 시작 시간보다 빠릅니다.")}

                else {
                fetch('http://13.124.122.246:8080/schedule/' + getUser().id + '/' + this.props.apparatusId + '/' + newdayInfo + "/" + startTime + "/" + endTime, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(values)
                }).then(response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        message.warning('예약 시간이 중복되었습니다.');
                    }
                }).then(response => {
                        this.props.plusReservation(response.schedules)
                })
            }
        }
        });
    };

  
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
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