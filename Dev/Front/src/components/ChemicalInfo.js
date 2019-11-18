import React, { Component } from 'react';

//약품 정보 중에서 약품 특성에 대한 박스
class ChemicalInfo extends Component {

    state = {

    }

    constructor(props){
        super(props);
        // this.props.chemical.stockId에 해당되는거 백엔드에서 읽어와서 저장해주기
        this.state = {
            name : this.props.chemical.chemicalName,
            casNo : "71-43-2",
            formula : "C8H6",
            mw : 78.11,
            mp : 5.5,
            bp : 80.1
        }
    }

    render() {
        return(
            <div style={{ margin : 10}}>
                <b>{this.state.name}</b> <br/>
                cas No : {this.state.casNo} <br/>
                formula : {this.state.formula} <br/>
                MW : {this.state.mw} <br/>
                mp/bp : {this.state.mp}/{this.state.bp} <br/>
            </div>
        );
    }
}

export default ChemicalInfo;