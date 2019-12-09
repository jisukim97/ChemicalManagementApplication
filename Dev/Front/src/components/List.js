import React, { Component } from 'react';
import { Table, Modal } from 'antd';
import { Link } from "react-router-dom";
import { serverUrl } from '../setting'

import { getUser } from '../authentication';

import './Box.css'

class List extends Component {


    state = { visible: false };

    state = {
        
        data : []
    }

    columns = [
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
            render: text => (
                <a>
                    <Link to='#' onClick={this.showModal}>
                        {text}
                    </Link>
                    <Modal
                        title="MSDS"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>
                            <h3>위험</h3>
                            H290 : 금속을 부식시킬 수 있음<br/>
                            H314 : 피부에 심한 화상과 눈 손상을 일으킴<br/>
                            H318 : 눈에 심한 손상을 일으킴<br/>
                            H330 : 흡입하면 치명적임<br/>
                            H350 : 암을 일으킬 수 있음<br/>
                        </p>
                        <p>
                            <h3>주의</h3>
                            P201 : 사용 전 취급 설명서를 확보하시오.<br/>
                            P202 : 모든 안전 예방조치 문구를 읽고 이해하기 전에는 취급하지 마시오.<br/>
                            P234 : 원래의 용기에만 보관하시오.<br/>
                            P260 : (분진·흄·가스·미스트·증기·스프레이)를(을) 흡입하지 마시오.<br/>
                        </p>
                        <p>등등..</p>
                    </Modal>
                </a>),
        },
        {
          title: '보관장소',
          dataIndex: 'place',
          key: 'place',
        },
        {
          title: '생성일',
          dataIndex: 'putDate',
          key: 'putDate',
          render : date => date.year + '/' + date.monthValue + '/' + date.dayOfMonth
        }
    ]
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    componentWillMount = () => {
        fetch(serverUrl + '/chemical/list/' + getUser().id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                const result = response.status;
                if (result === 200) {
                    //성공하였을 경우 
                    console.log(response)
                    response.json().then(response => {
                        console.log(response);
                        this.setState({data : response})
                    })
                } else {
                    //내부 오류
                }
            })
    }

    render() {
        return (
            <div id='box'>
                <Table columns={this.columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default List;