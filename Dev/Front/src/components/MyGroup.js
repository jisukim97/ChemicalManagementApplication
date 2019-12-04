import React, { Component } from 'react';
import { Typography, Row, Col, Button, Card } from 'antd'

const { Title } = Typography;


class MyGroup extends Component {

    state = {

    }

    constructor(props){
        super(props);
        this.state = {
            menu : 0
        }
        members.push(a)
      }

      this.setState({
        members: members

      })
      //이렇게 응답받은 실제 결과를 status로 저장해 줄 수 있음
    })
  }

//그룹 생성하고 나서 정보 새로고침 해주
  afterGroupGenerate = (id) => {
    console.log(id)
    this.setState( {
      menu : 0,
      labexists : id === null ? false : true
    })
    this.getGroupMembers()
  }

  afterGroupWithdraw = () => {
    console.log(333)
    this.setState( {
      menu : 0,
      labexists : false
    })
    //this.getGroupMembers()
  }


  firstButtonClick = () => {
    this.setState( {
      menu : 1
    })
  }

  firstButtonClick2 = () => {
    this.setState( {
      menu : 1
    })
    this.getGroupMembers()
  }

  secondButtonClick = () => {
    this.setState( {
      menu : 2
    })
  }

  thirdButtonClick = () => {
    this.setState( {
      menu : 3
    })
  }

    firstButtonClick = () => {
        this.setState( {
            menu : 1
        })
    }

    secondButtonClick = () => {
        this.setState( {
            menu : 2
        })
    }

    thirdButtonClick = () => {
        this.setState( {
            menu : 3
        })
    }

    fourthButtonClick = () => {
        this.setState( {
            menu : 4
        })
    }

      getContent = () => {
        if (!this.state.labexists && this.state.menu === 1){
          return (
            <div>
            <MyGroupGenerate afterGroupGenerate={this.afterGroupGenerate}/>
            </div>
          )
        } else if (this.state.labexists && this.state.menu === 2){
          return (
            <div>
            <MyGroupInvite />
            </div>
          )
        } else if (!this.state.labexists && this.state.menu === 3){
          return (
            <div>
            <MyGroupRegister enrollLab={this.enrollLab} afterGroupGenerate={this.afterGroupGenerate}/>
            </div>
          )
        } else if (this.state.labexists && this.state.menu === 4){
          return (
            <div>
            <MyGroupWithdraw afterGroupWithdraw={this.afterGroupWithdraw} count={this.state.members.length}/>
            </div>
          )
        } else {
            return (<b>member 리스트</b>)
        }
    }

    render() {
        return (
            <div>
                <br />
                <center><Title style={{ marginBottom: 50 }}>MyGroup</Title></center>

                {/* 버튼 4개 */}
                <Row style={{margin : 20}}>
                    <Col span={12}><center><Button type="primary" onClick={this.firstButtonClick}>my Lab 생성</Button></center></Col>
                    <Col span={12}><center><Button type="primary" onClick={this.secondButtonClick} >멤버 초대</Button></center></Col>
                </Row>

                <Row style={{margin : 20}}>
                    <Col span={12}><center><Button type="primary" onClick={this.thirdButtonClick} >Lab 가입 신청</Button></center></Col>
                    <Col span={12}><center><Button type="primary" onClick={this.fourthButtonClick} >my Lab 탈퇴</Button></center></Col>
                </Row>

                {/* 내용 */}
                <div>
                    <Card style={{margin : 20}}>
                        {this.getContent()}
                    </Card>
                </div>

            </div>
        );
    }
}

export default MyGroup;
