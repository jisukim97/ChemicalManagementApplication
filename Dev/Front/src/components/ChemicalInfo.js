import React, { Component } from 'react';

import { Tabs, Descriptions } from 'antd';


class ChemicalInfo extends Component {
    

    callback = (key) => {
        console.log(key);
    }

    render() {
        const { TabPane } = Tabs;
        const {chemical} = this.props;

    /*
{
                        id: 30,
                        name : "name6",
                        casNo : 71-43-2,
                        formula : C6H6,
                        molecularWeight : 78.11,
                        status : 1,

                        meltingPoint : 20.0,
                        boilingPoint : 30.0,
                        pH : 7.0,
                        density : 3.5,
                        deliquescent : false,
                        efflorescence : false,

                        photoReaction : false,
                        flammability : false,
                        ignitability : true,
                        explosive : false,
                        combustibility : true,

                        classifiaction : 1,
                    }

    */
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
                            <Descriptions.Item label="mp/bp">{chemical.meltingPoint}/{chemical.boilingPoint}</Descriptions.Item>
                            <Descriptions.Item label="pH">{chemical.pH}</Descriptions.Item>
                            <Descriptions.Item label="density">{chemical.density}</Descriptions.Item>
                            <Descriptions.Item label="deliquescent">{chemical.deliquescent}</Descriptions.Item>
                            <Descriptions.Item label="efflorescence">{chemical.efflorescence}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane tab="특성 3" key="3">
                        <Descriptions bordered="true" size="small">
                            <Descriptions.Item label="photoReaction">{chemical.photoReaction}</Descriptions.Item>
                            <Descriptions.Item label="flammability">{chemical.flammability}</Descriptions.Item>
                            <Descriptions.Item label="ignitability">{chemical.ignitability}</Descriptions.Item>
                            <Descriptions.Item label="explosive">{chemical.explosive}</Descriptions.Item>
                            <Descriptions.Item label="combustibility">{chemical.combustibility}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ChemicalInfo;