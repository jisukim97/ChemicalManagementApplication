import React, { Component } from 'react';

//약품 정보 중에서 약품 특성에 대한 박스
class ChemicalInfo extends Component {

    state = {
    }

    constructor(props) {
        super(props);
        
        //this.state.chemical에는 화학약품에 대한 정보가 담겨 있음
        this.state = {
            chemical : this.props.chemical
        }
    }

    render() {

        return (
            <div style={{ margin: 10 }}>
                <b>{this.state.chemical.name}</b> <br />
                cas No : {this.state.chemical.casNo} <br />
                formula : {this.state.chemical.formula} <br />
                MW : {this.state.chemical.mw} <br />
                mp/bp : {this.state.chemical.mp}/{this.state.chemical.bp} <br />
            </div>
        );
    }
}

export default ChemicalInfo;