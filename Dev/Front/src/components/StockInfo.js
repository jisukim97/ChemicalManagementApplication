import React, { Component } from 'react';
import { Typography, Descriptions } from 'antd';

import ChemicalInfo from './ChemicalInfo';
import StockButtons from './StockButtons';
import StockInventoryChangeButton from './StockInventoryChangeButton';

const { Title } = Typography;


//약품 정보 중에서 약품 특성에 대한 박스
class StockInfo extends Component {

    state = {
        showStockInventoryChangeButton : false,
        suggest : [],
        notSugget : []
    }

    constructor(props) {
        super(props);
        console.log(this.props.stock)
        
    }

    //사용
    changeVolume = (change, unit) => {
        this.props.changeVolume(this.props.stock.id, change, unit);
    }

    //삭제
    deleteStock = () => {
        this.props.deleteStock(this.props.stock.id)
    }

    //장소변경 버튼 보여주기
    showInventoryChangeButton = () => {
        //여기서 장소 추천을 받아준다
        //여기서 fetch
        var suggest = [{
            id : "id3",
            name : "보관함1",
            temperature : 20.0,
            humidity : 0,
            illuminance : false,
            oximeter : false,
            explosion : false
        }, {
            id : "suggestInventory2",
            name : "보관함2",
            temperature : 20.0,
            humidity : 0,
            illuminance : false,
            oximeter : false,
            explosion : false
        }, {
            id : "suggestInventory3",
            name : "보관함3",
            temperature : 20.0,
            humidity : 0,
            illuminance : false,
            oximeter : false,
            explosion : false
        }]
        var notSuggest = [{
            id : "notSuggestInventory1",
            name : "보관함4",
            temperature : 20.0,
            humidity : 0,
            illuminance : false,
            oximeter : false,
            explosion : false
        }, {
            id : "notSuggestInventory2",
            name : "보관함5",
            temperature : 20.0,
            humidity : 0,
            illuminance : false,
            oximeter : false,
            explosion : false
        }, {
            id : "notSuggestInventory3",
            name : "보관함6",
            temperature : 20.0,
            humidity : 0,
            illuminance : false,
            oximeter : false,
            explosion : false
        }]

        this.setState({
            showStockInventoryChangeButton : true,
            suggest : suggest,
            notSuggest : notSuggest
        })

    }

    //장소변경 버튼 없애기
    blindInventoryChangeButton = () => {
        this.setState({
            showStockInventoryChangeButton : false
        })
    }

    //장소 변경
    changeInventory = (newInventoryId) => {
        this.props.changeInventory(this.props.stock.id, newInventoryId)
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
                        {
                            !this.state.showStockInventoryChangeButton && <StockButtons changeVolume={this.changeVolume} 
                            remainingVolume={stock.remainingVolume} deleteStock={this.deleteStock} showInventoryChangeButton={this.showInventoryChangeButton}/>
                        }
                        {
                            this.state.showStockInventoryChangeButton && <StockInventoryChangeButton changeInventory={this.changeInventory} 
                            chemical={stock.chemical} blindInventoryChangeButton={this.blindInventoryChangeButton} suggest={this.state.suggest}
                            notSuggest={this.state.notSuggest}/>
                        }

                    </center>

                </div>
            </div>
        );
    }
}

export default StockInfo;