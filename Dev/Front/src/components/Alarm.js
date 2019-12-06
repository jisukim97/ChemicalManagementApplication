import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card, List } from 'antd'
import AlarmInfoList from './AlarmInfoList';
import { getUser, getLab } from '../authentication';
const { Title } = Typography;

class Alarm extends Component {

    /** state 그냥 초기화를 여기서 시켜줬습니다..**/
    state = {
        type : 1,
        information : [],
        alarm1Count : 0,
        alarm2Count : 0,
        alarm3Count : 0
    }

   constructor(props) {
        super(props);
        
        /*
        var information = [
            {
                id: 0,
                name: 'Hexane',
                date: '15',
                alarmType : 1
              },
              {
                id: 2,
                name: 'Benzeqwene',
                date: '10',
                volume : 5,
                alarmType : 1
              },
              {
                id: 3,
                name: 'Hexane',
                place : '냉장고',
                volume : 0,
                alarmType : 2
              },
              {
                 id: 4,
                 name: 'Benzene',
                 place : '오븐',
                 alarmType : 2
              },
              {
                  id: 6,
                  name: 'Benzenecwqwsd',
                  use : '3개월',
                  disease : "간암",
                  alarmType : 3
               },
        ] 
        */
        
        fetch('http://13.124.122.246:8080/alarm/' + getUser().id, {
            method: 'GET', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response.status === 200) {
                //이건 정상적으로 된 경우
                console.log(33333333333)
                response.json().then(response => {
                    var list = response.alarms
                    var Qinformation = []
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].alarmType === 1) {
                            var a = {
                                alarmType: list[i].alarmType,
                                id: list[i].stock.id,
                                name: list[i].stock.chemical.name,
                                date: list[i].left
                            }
                            Qinformation.push(a)
                        }
                        else if (list[i].alarmType === 2) {
                            var a = {
                                alarmType: list[i].alarmType,
                                id: list[i].stock.id,
                                name: list[i].stock.chemical.name,
                                place: list[i].inventory.name,
                                volume: list[i].stock.remainingVolume
                            }
                            Qinformation.push(a)
                        }
                        else {
                            if(list[i].stock.chemical.illness === null){
                                var a = {
                                    plag : 0,
                                    alarmType: list[i].alarmType,
                                    id: list[i].stock.id,
                                    name: list[i].stock.chemical.name,
                                }
                            }
                            else {
                                var a = {
                                    plag : 1,
                                    alarmType: list[i].alarmType,
                                    id: list[i].stock.id,
                                    name: list[i].stock.chemical.name,
                                    period: list[i].stock.chemical.illness.period,
                                    disease: list[i].stock.chemical.illness.name
                                }
                            }
                            Qinformation.push(a)
                        }
                    }
                    console.log(Qinformation)
                    console.log('filter test')
                    console.log(Qinformation.filter(value => value.alarmType === 1).length)
                    this.setState({
                        type: 1,
                        information: Qinformation,
                        alarm1Count: Qinformation.filter(value => value.alarmType === 1).length,
                        alarm2Count: Qinformation.filter(value => value.alarmType === 2).length,
                        alarm3Count: Qinformation.filter(value => value.alarmType === 3).length

                    })
                })
            } else {
                //가져올 알람이 없을 경우
                
            }
        })
    }

    handleRemove = (id, alarmType) => {
        const { information } = this.state;
        var type1Count = this.state.alarm1Count;
        var type2Count = this.state.alarm2Count;
        var type3Count = this.state.alarm3Count;
        if (alarmType===1){
            type1Count -= 1;
        }
        else if (alarmType===2){
            type2Count -= 1;
        }
        else if (alarmType===3){
            type3Count -= 1;
        }
        const new_information = information.filter(info => info.id !==id )
        this.setState({
            information : new_information,
            alarm1Count : type1Count,
            alarm2Count : type2Count,
            alarm3Count : type3Count
        })
    }


    
    makeTypeOne = () => {
        this.setState({type : 1})
    }

    makeTypeTwo = () => {
        this.setState({type : 2})
    }

    makeTypeThree = () => {
        this.setState({type : 3})
    }

    function = (value) =>{
        return value.alarmType 
    }
    
    getContent = () => {
        return (<div><AlarmInfoList data={this.state.information.filter( value => value.alarmType === this.state.type )} onRemove={this.handleRemove}/></div>)
    }


    render() {
       
        return (
            <div>
                <br />
                <center><Title style={{ marginBottom: 50 }}>Alarm</Title></center>
                
                <Row style={{marginBottom : 30}}>
                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeOne} style={{ fontSize: '25px' }} size="large"/><br/>
                        유효기간 {this.state.alarm1Count}
                    </center></Col>

                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeTwo} style={{ fontSize: '25px' }} size="large"/><br/>
                        재고소진 {this.state.alarm2Count}
                    </center></Col>

                    <Col span={8}><center>
                        <Button Button shape="circle" icon="bell" onClick={this.makeTypeThree} style={{ fontSize: '25px' }} size="large"/><br/>
                        의심질병 {this.state.alarm3Count}
                    </center></Col>
                </Row>

                <Card style={{margin : 10}}>
                    {this.getContent()}
                </Card>
            </div>
        );
    }
}

export default Alarm;
