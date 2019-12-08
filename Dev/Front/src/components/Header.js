import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { Link } from "react-router-dom";
import { history } from '../History';
import { logout, getUser } from '../authentication';

import './Header.css';
import './Box.css';
import { blockStatement } from '@babel/types';

class Header extends Component {

    state = {
        user: {}
    }
    //로그아웃
    logOut = () => {
        logout()
        history.push('/login')
    }

    toHome = () => {
        history.push('/')
    }

    render() {
        /**
         *     line-height: 60px;
    display: block;
    text-align: left;
    background: #2DB400;
    padding-left : 30px;
    padding-right : 30px;
    color: white;

         */


        return (
            <div style={{
                height: this.props.height, display: 'block', background: '#4B589F', textAlign: 'left',
                 display: 'table', width: this.props.width, padding: 10, paddingLeft: 20, borderColor : '#4B589F'
            }}>
                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    {/* 로고 텍스트 ( 클릭하면 메인으로 이동) */}
                    <div style={{display: 'inline', textAlign: 'left' }}>
                        <b style={{ fontSize: 20, fontFamily: 'Comic Sans MS' }}><Link to='/mylab' id='color'>SYLVY</Link></b>
                    </div>

                    {/* 로그인된 사용자 */}
                    <div style={{display: 'inline', textAlign : 'middle', marginLeft : 20, color : 'white'}}>
                        {getUser().name}님 환영합니다!
                    </div>

                    {/* 로그인 정보 + 프로필 변경 + 로그아웃 버튼 */}
                    <div style={{display: 'inline', float : 'right', margihTop: 30, marginRight : 10 }}>
                        {/* 로그아웃 버튼 */}
                        <Button type="danger" icon="poweroff" onClick={this.logOut} shape="circle" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;