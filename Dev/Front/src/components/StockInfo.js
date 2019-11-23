import React, { Component } from 'react';
//약품 정보 중에서 stock에 관한 정보
class StockInfo extends Component {

    state = {
    }

    constructor(props) {
        super(props);
        this.state = {
            information: this.props.stockInfo,
        }
        console.log(this.props.stockInfo)
    }

    render() {

        const remainingVolume = this.state.information.remainingVolume
        return (
            <div style={{ margin: 10 }}>
                사용 후 남은 양 (ml) : {remainingVolume}/{this.state.information.volume}
            </div>
        )
    }
}

export default StockInfo;