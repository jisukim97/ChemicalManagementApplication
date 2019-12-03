import React, { Component, Fragment } from 'react';
import { Input, Modal, Button, Radio, Checkbox, Icon } from 'antd';

class InventoryAdd extends Component {

    state = {
        visible: false,
        name: "",
        temperature: 0,
        humidity: 0,
        illuminance: false,
        oximeter: true,
        explosion: false,
        plainOptions : ['채광', '산소', '폭발방지']
    };

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

    nameChange = (name) => {
        this.setState({
            name: name.target.value
        })
    }

    temperatureChange = (temperature) => {
        this.setState({
            temperature: temperature.target.value
        })
    }

    humidityChange = e => {
        this.setState({ humidity: e.target.value });
        console.log(e.target.value)
    };

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        if( checkedValues.some(x => x===this.state.plainOptions[0])){
            this.setState({
                illuminance : true
            })
        } else {
            this.setState({
                illuminane : false 
            })
        }

        if( checkedValues.some(x => x===this.state.plainOptions[1])){
            this.setState({
                oximeter : true
            })
        } else {
            this.setState({
                oximeter : false 
            })
        }

        if( checkedValues.some(x => x===this.state.plainOptions[2])){
            this.setState({
                explosion : true
            })
        } else {
            this.setState({
                explosion : false 
            })
        }

    }

    submit = () => {
        this.props.addInventory(
            this.state.name, this.state.temperature, this.state.humidity, this.state.illuminance, this.state.oximeter, this.state.explosion
        )
        this.handleOk()
    }


    render() {


        return (
            <span>
                <Button type="primary" onClick={this.showModal} size="small" icon="plus" shape="circle"/>
                <Modal
                    title="보관 장소 추가"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    이름 :  <Input placeholder="보관장소 이름" onChange={this.nameChange} />
                    온도 :  <Input placeholder="보관장소 온도" onChange={this.temperatureChange} />
                    습도 :  <Radio.Group value={this.state.humidity} onChange={this.humidityChange}>
                        <Radio.Button value={-1}>없음(~3%)</Radio.Button>
                        <Radio.Button value={0}>보통</Radio.Button>
                        <Radio.Button value={1}>높음(71%~)</Radio.Button>
                    </Radio.Group>
                    <br/>
                    기타옵션 : 
            <Checkbox.Group options={this.state.plainOptions} defaultValue={['산소']} onChange={this.onChange} />

                <Button onClick={this.submit} > 추가하기 </Button>
                </Modal>
            </span>
        );
    }

}

export default InventoryAdd;
