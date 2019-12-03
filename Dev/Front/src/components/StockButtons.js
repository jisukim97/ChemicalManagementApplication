import React, { Component, Fragment } from 'react';

import { Form, Input, Select, Button, message } from 'antd';

const { Option } = Select;

class PriceInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            number: value.number || 0,
            unit: value.unit || 'g',
        };
    }

    handleNumberChange = e => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
            return;
        }
        if (!('value' in this.props)) {
            this.setState({ number });
        }
        this.triggerChange({ number });
    };

    handleUnitChange = unit => {
        if (!('value' in this.props)) {
            this.setState({ unit });
        }
        this.triggerChange({ unit });
    };

    triggerChange = changedValue => {
        // Should provide an event to pass value to Form.
        const { onChange } = this.props;
        if (onChange) {
            onChange({
                ...this.state,
                ...changedValue,
            });
        }
    };

    render() {
        const { size } = this.props;
        const { unit, number } = this.state;
        return (
            <Fragment>
                    <Input
                        type="text"
                        size={size}
                        value={number}
                        onChange={this.handleNumberChange}
                        style={{ width: '40%', marginRight: '3%' }}
                    />
                    <Select
                        value={unit}
                        size={size}
                        style={{ width: '40%' }}
                        onChange={this.handleUnitChange}
                    >
                        <Option value="g">g</Option>
                        <Option value="mL">mL</Option>
                    </Select>
            </Fragment>
        );
    }
}


class StockButtons extends Component {

    constructor(props){
        super(props)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // 값 : values.value.number
                // 단위 : values.value.unit
                const unit = values.value.unit
                var change = values.value.number
                if (unit ==='mL'){
                    change *= this.props.stock.chemical.density
                }
                if (change > this.props.stock.volume){
                     message.error('너무 많이 입력하셨습니다');
                } else {
                    this.props.changeVolume(change, unit);
                }        
            }
        });

    };

    checkNumber = (rule, value, callback) => {
        if (value.number > 0) {
            callback();
            return;
        } 
        if (this.props.remainingVolume < value.number){
            callback('너무 큰 수를 입력하셨습니다!')
            return;
        }
        callback('0보다 큰 수를 입력 해 주세요!');
    };

    clickDeleteButton = () => {
        this.props.deleteStock();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>

            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item style={{marginRight : '1.5%'}}>
                    {getFieldDecorator('value', {
                        initialValue: { number: 0, unit: 'g' },
                        rules: [{ validator: this.checkNumber }],
                    })(<PriceInput />)}
                </Form.Item>
                <Form.Item style={{marginLeft : '1.5%'}}>
                    <Button type="primary" htmlType="submit">
                        사용
                    </Button>
                </Form.Item>
            </Form>
            <div style={{margin : 10}}>
                <span style={{marginLeft : 10, marginRight : 10}}>
                    <Button type="primary" onClick={this.clickDeleteButton}> 폐기하기 </Button>
                </span>
                <span style={{marginLeft : 10, marginRight : 10}}>
                    <Button type="primary" onClick={this.props.showInventoryChangeButton}> 장소수정 </Button>
                </span>
            </div>
            </Fragment>
        );
    }
}

export default Form.create()(StockButtons);