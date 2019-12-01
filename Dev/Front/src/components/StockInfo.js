import React, { Component } from 'react';
import { Typography, Descriptions } from 'antd';

import ChemicalInfo from './ChemicalInfo';
import StockButtons from './StockButtons';

const { Title } = Typography;


//약품 정보 중에서 약품 특성에 대한 박스
class StockInfo extends Component {

    state = {
    }

    constructor(props) {
        super(props);
        console.log(this.props.stock)
        
    }


    changeVolume = (change, unit) => {
        this.props.changeVolume(this.props.stock.id, change, unit);
    }

    deleteStock = () => {
        this.props.deleteStock(this.props.stock.id)
    }

    render() {

        {/*
            stocks 모양
        {
                        id: 3,
                        nickname: "nickname6",
                        putDate : Date.now(),
                        expireDate : Date.now(),
                        volume : 300,
                        remainingVolume : 300,
                        chemical: {
                            id: 30,
                            name : "name6",
                            status : 1,
                            meltingPoint : 20.0,
                            boilingPoint : 30.0
                        }
        */}
        const {stock} = this.props;

        return (
            <div>
                {/* 화학적 특성 정보*/}
                <ChemicalInfo chemical={stock.chemical} />
                {/* 재고 정보 */}
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <Descriptions bordered="true" size="small" >
                        <Descriptions.Item label="약품 등록일">{stock.putDate}</Descriptions.Item>
                        <Descriptions.Item label="약품 유효기간">{stock.expireDate}</Descriptions.Item>
                        <Descriptions.Item label="사용 후 남은 양">{stock.remainingVolume}/{stock.volume}</Descriptions.Item>
                    </Descriptions>
                </div>
                {/* 버튼들 */}
                <div>
                    <center>
                        <StockButtons changeVolume={this.changeVolume} remainingVolume={stock.remainingVolume} deleteStock={this.deleteStock}/>

                    </center>

                </div>
            </div>
        );
    }
}

export default StockInfo;