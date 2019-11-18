import React, { Component } from 'react';

//약품 정보 중에서 stock에 관한 정보
class StockInfo extends Component {

    state = {

    }

    constructor(props){
        super(props);
        this.state = {
            stockId : this.props.chemical.stockId, //이걸로 백엔드에서 stock 정보 받아오기
            inventory : this.props.chemical.inventory,
            putDate : "2017/10/9",
            expireDate : "2019/10/9",
            volume : 100,
            remainingVolume : 50
        }
    }

    render() {
        return(
            <div style={{margin : 10}}>
                보관 장소 : {this.state.inventory} <br/>
                약품 등록일 : {this.state.putDate} <br/>
                약품 유효기간 : {this.state.expireDate} <br/>
                사용 후 남은 양 : {this.state.remainingVolume}/{this.state.volume}
            </div>
        )
    }
}

export default StockInfo;