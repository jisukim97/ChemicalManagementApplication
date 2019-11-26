import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card, List } from 'antd'
import AlarmInfoList from './AlarmInfoList';

const { Title } = Typography;

class Alarm extends Component {

    state = {
    }
    
    
  
    constructor(props){
        super(props);
        var information = [
            {
                id: 0,
                name: 'Hexane',
                date: '15',
                alarmType : 1
              },
              {
                id: 1,
                name: 'Benzene',
                date: '7',
                alarmType : 1
              },
              {
                id: 2,
                name: 'Benzeqwene',
                date: '10',
                alarmType : 1
              },
              {
                id: 3,
                name: 'Hexane',
                place : '냉장고',
                alarmType : 2
              },
              {
                 id: 4,
                 name: 'Benzene',
                 place : '오븐',
                 alarmType : 2
              },
              {
                 id: 5,
                 name: 'Benzeqwene',
                 place : '가방',  
                 alarmType : 2
              },
              {
                  id: 6,
                  name: 'Benzenecwqwsd',
                  use : '3개월',
                  disease : "간암",
                  alarmType : 3
               },
               {
                  id: 7,
                  name: 'Benzeqweneefefccv',
                  use : '6개월',  
                  disease : "췌장암",
                  alarmType : 3
               }
        ]
        this.state = {
            type : 1,
            information: information,
            alarm1Count : information.filter( value => value.alarmType === 1).length,
            alarm2Count : information.filter( value => value.alarmType === 2).length,
            alarm3Count : information.filter( value => value.alarmType === 3).length
            
        }
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
