import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";
import { history } from '../History';
import { logout, getUser } from '../authentication';

import './Header.css';
import './Box.css';

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
        history.push('/home/' + getUser().userID)
    }

    render() {
        return (
            <div className='Header'>
                {/* 로고 텍스트 ( 클릭하면 메인으로 이동) */}
                <div className="left-box">
                    <b className='logo'><Link to='/main' id='color'>SYLVY</Link></b>
                </div>

                {/* 로그인 정보 + 프로필 변경 + 로그아웃 버튼 */}
                <div className="right-box">
                    {/* 로그아웃 버튼 */}
                    <span id='margin'><Button type="danger" icon="poweroff" onClick={this.logOut} shape="circle" /></span>
                </div>
                
            </div>
        );
    }
}

export default Header;