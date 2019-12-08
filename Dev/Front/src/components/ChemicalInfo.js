import React, { Component } from 'react';

import { Tabs, Descriptions } from 'antd';


class ChemicalInfo extends Component {
    

    callback = (key) => {
        console.log(key);
    }

    getBooleanToString = (value) => {
        if (value===true){
            return "true";
        } else {
            return "false"
        }
    }

    render() {
        const { TabPane } = Tabs;
        const {chemical} = this.props;

        return (
            <div >
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="특성 1" key="1">
                        <Descriptions bordered="true" size="small">
                            <Descriptions.Item label="Name">{chemical.name}</Descriptions.Item>
                            <Descriptions.Item label="CAS No.">{chemical.casNo}</Descriptions.Item>
                            <Descriptions.Item label="Formula">{chemical.formula}</Descriptions.Item>
                            <Descriptions.Item label="MW">{chemical.molecularWeight}</Descriptions.Item>
                            <Descriptions.Item label="status">{chemical.status}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane tab="특성 2" key="2">
                        <Descriptions bordered="true" size="small">
                            <Descriptions.Item label="mp/bp">{chemical.meltingPoint} / {chemical.boilingPoint}</Descriptions.Item>
                            <Descriptions.Item label="pH">{chemical.ph}</Descriptions.Item>
                            <Descriptions.Item label="density">{chemical.density}</Descriptions.Item>
                            <Descriptions.Item label="deliquescent">{this.getBooleanToString(chemical.deliquescent)}</Descriptions.Item>
                            <Descriptions.Item label="efflorescence">{this.getBooleanToString(chemical.efflorescence)}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane tab="특성 3" key="3">
                        <Descriptions bordered="true" size="small">
                            <Descriptions.Item label="photoReaction">{this.getBooleanToString(chemical.photoReaction)}</Descriptions.Item>
                            <Descriptions.Item label="flammability">{this.getBooleanToString(chemical.flammability)}</Descriptions.Item>
                            <Descriptions.Item label="ignitability">{this.getBooleanToString(chemical.ignitability)}</Descriptions.Item>
                            <Descriptions.Item label="explosive">{this.getBooleanToString(chemical.explosive)}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ChemicalInfo;