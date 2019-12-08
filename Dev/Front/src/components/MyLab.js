import React, { Component } from 'react';
import { List, Typography, Radio, Button, message, Modal } from 'antd'

import Stock from './Stock';
import ChemicalAdd from './ChemicalAdd';
import InventoryAdd from './InventoryAdd';
import { history } from '../History';
import MenuTitle from './MenuTitle';

import { serverUrl } from '../setting'
import { getUser, getLab } from '../authentication';

const { Title } = Typography;

const { confirm } = Modal;

//마이 랩
class MyLab extends Component {

    state = {
    }

    constructor(props) {
        super(props);

        this.state = {
            inventories: [],//inventories, //인벤토리 배열 
            inventory: 0, //firstInventoryId, //현재 인벤토리 아이디
            inventoryName: '',//inventories[0].name, //현재 인벤토리 이름
            isInventoryExist: false
            //realInventory : inventories.filter(inventory => inventory.id===firstInventoryId) //현재 인벤토리에 있는 것들만
        }
        this.getInventories()

    }

    getInventories = () => {
        const url = serverUrl + '/chemical/' + getUser().id
        console.log(url)
        fetch(url, { // uri 넣어주기
            method: 'GET', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response.status === 200) {
                //이건 정상적으로 된 경우
                return response.json()
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        }).then(response => {
            //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
            //여기서 response라는걸 제대로 쓸 수 있음
            console.log(response) // 이걸로 개발자모드에서 어떠한 응답이 왔는지 확인 가능
            try {
                this.setState({
                    inventories: response.inventories,
                    inventory: response.inventories.length>0 ? response.inventories[0].id : 0,
                    inventoryName: response.inventories.length>0 ?response.inventories[0].name : '',
                    isInventoryExist: response.inventories.length > 0 ? true : false
                })
            } catch (e){
                message.warning('가입된 lab이 없습니다!')
                history.push('/mygroup')
            }
           
        })
    }

    //인벤토르 바꿨을 경우
    handleInventoryChange = e => {
        this.state.inventories.forEach(inventory => {
            console.log(inventory)
            if (inventory.id === e.target.value) {
                this.setState({
                    inventory: inventory.id,
                    inventoryName: inventory.name,
                    //realInventory : inventory
                })
            }
        })
    };

    //볼륨 바꿀 경우
    changeVolume = (stockId, change, unit) => {
        //여기서 fetch 해준다
        //volume 바꿔주는걸로
        const url = serverUrl + '/chemical/' + getUser().id + '/' + stockId 
        
        console.log('before precision : ' + change)
        change = Math.floor(change*100)/100
        console.log('after precision ')
        fetch(url, { // uri 넣어주기
            method: 'PUT', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
            body: JSON.stringify({volume : change}) //여기에다가 body 넣어주기
        }).then(response => {
            if (response.status === 200) {
                //이건 정상적으로 된 경우
                response.json().then( response => {
                    //여기서 response로 온 값들을 state로 저장 하던가 해서 쓰면 됨
                    //여기서 response라는걸 제대로 쓸 수 있음
                    var stock = response.stock
                    //여기서 다썼거나, 조금남았으면 표시 후 알람 발생
                    if (stock.remainingVolume === 0.0){
                        //다씀
                        message.warning('약품을 전부 사용했습니다!')
                        //this.makeVolumeAlarm(stockId)
                    } else if (stock.remainingVolume / stock.volume <= 0.2){
                        //쪼금남음
                        message.warning('약품이 얼마 남지 않았습니다!')
                        //this.makeVolumeAlarm(stockId)
                    } else {
                        message.success('성공적으로 반영 되었습니다')
                    }
                    this.getInventories()
                })
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
                this.getInventories()
            }
        })
    }

    makeVolumeAlarm = (stockId) => {
        const url = serverUrl + '/alarm/' + getUser().id + '/' + stockId;
        fetch(url, { // uri 넣어주기
            method: 'PUT', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if( response.status === 200){
                //이건 정상적으로 된 경우
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        })
    }

    //재고 삭제하기
    deleteStock = (stockId) => {
        //여기서 fetch 해주기
        const url = serverUrl + '/chemical/' + stockId
        fetch(url, { // uri 넣어주기
            method: 'DELETE', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if (response.status === 200) {
                //이건 정상적으로 된 경우
                message.success('성공적으로 폐기 되었습니다!')
                this.setState({
                    inventories : [],
                    isInventoryExist : false
                }, () => {
                    this.getInventories()
                })
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        })
    }

    //인벤토리 바꾸기
    changeInventory = (stockId, newInventoryId) => {
        //여기서 fetch 해주기
        console.log(stockId, newInventoryId)
        const url = serverUrl + '/inventory/' + getUser().id + '/' + stockId + '/' + newInventoryId
        fetch(url, { // uri 넣어주기
            method: 'PUT', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if( response.status === 200){
                //이건 정상적으로 된 경우
                    return response.json()
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        }).then(response => {
            this.getInventories()
        })
    }


    //추가 해주기
    addChemical = (chemical, inventoryId, put, expire, nickname, inventoryName) => {
        if (nickname === "" || nickname === " ") {
            nickname = "default";
        }
        //chemical을 inventoryId에 추가
        //각각 validation check해 준 뒤에 추가
        console.log("추가")
        console.log(chemical, inventoryId, put, expire)
        //그리고 추가 해주기

        console.log(nickname)
        const url = serverUrl + '/chemical/' + getUser().id + '/' + chemical.id + '/' + inventoryId + '/' + expire
        const body = {
            nickname : nickname==='' ? null : nickname,
            volume : put
        }
        fetch(url, { // uri 넣어주기
            method: 'POST', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
            body: JSON.stringify(body) //여기에다가 body 넣어주기
        }).then(response => {
            if( response.status === 200){
                //이건 정상적으로 된 경우
                    return response.json()
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        }).then(response => {
            try {
                var stocks = response.stocks
                for (var i=0; i<stocks.length; i++){
                    if( stocks[i].chemical.id === chemical.id){
                        const successMessage = '' + chemical.name +  ' / ' + stocks[i].nickname + '이 ' + inventoryName + '에 추가되었습니다!'
                        message.success(successMessage)
                        break;
                    }
                }
                this.getInventories()
                //window.location.reload();    
            }
            catch (e){
                console.log(e)
                message.error('오류가 발생했습니다. 새로고침 후 다시 진행 해 주세요')
            }

        })
        
    }
/*
    addChemical = (chemical, inventoryId, put, expire, nickname) => {
        const url = serverUrl + '/chemical/' + getUser().id + '/' + chemical.id + '/' + inventoryId
        fetch(url, { // uri 넣어주기
            method: 'GET', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
        }).then(response => {
            if( response.status === 200){
                //이건 정상적으로 된 경우
                    return response.json()
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        }).then(response => {
            if (response.crash){
                //안되는 경우
                confirm({
                    title: '약품이 해당 장소에 두었을 경우 다음 약품과 상호작용이 일어날 수 있습니다. 괜찮습니까?',
                    content: response.crashWith.nickname + ' / ' + response.crashWith.chemical.name,
                    onOk() {
                        this.addChemicalTwo(chemical, inventoryId, put, expire, nickname);
                    },
                    onCancel() { },
                });

            } else {
                //되는 경우
                this.addChemicalTwo(chemical, inventoryId, put, expire, nickname);

            }
        })


        confirm({
            title: 'Do you want to delete these items?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
        
        
    }

*/

    addInventory = (name, temperature, humidity, illuminance, oximeter, explosion) => {
        console.log(name, temperature, humidity, illuminance, oximeter, explosion)
        const url = serverUrl + '/inventory/' + getUser().id
        const body = {
            "name" : name,
            "temperature" : temperature,
            "humidity" : humidity,
            "illuminance" : illuminance,
            "oximeter" : oximeter,
            "explosion" : explosion
        }
        fetch(url, { // uri 넣어주기
            method: 'POST', //'GET', 'POST', 'DELETE' 등등
            headers: { 'Content-Type': 'application/json' }, //안고쳐도 됨
            body: JSON.stringify(body) //여기에다가 body 넣어주기
        }).then(response => {
            if( response.status === 200){
                //이건 정상적으로 된 경우
                message.success('보관장소가 성공적으로 추가되었습니다!')
                this.getInventories()    
            } else {
                //이건 오류난 경우 -> 여기서 뭐뭐를 처리해 준다
            }
        })
        
    }

    render() {

        return (

            <div>
                {/* 약품 목록에서 각각 하나의 원소에 대한 Chemical 클래스 */}
                <MenuTitle title="my Lab" />

                {
                    this.state.isInventoryExist && 
                    <div style={{paddingTop : 20}}>
                    <div><center> {/* 인벤토리 고르는 곳 */}
                        <Radio.Group value={this.state.inventory} onChange={this.handleInventoryChange} size="small" style={{margin : 10}}>
                            {
                                this.state.inventories.map(inventory => {
                                    return (<Radio.Button value={inventory.id}>{inventory.name}</Radio.Button>)
                                })
                            }
                        </Radio.Group>
                        <InventoryAdd addInventory={this.addInventory} />
                    </center>
                    </div>

                    <br />

                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={this.state.inventories.filter(inventory => inventory.id === this.state.inventory)[0].stocks}
                        renderItem={stock => ( 
                            <List.Item>
                                <Stock stock={stock} changeVolume={this.changeVolume} deleteStock={this.deleteStock}
                                    changeInventory={this.changeInventory} /> {/* Chemical 컴포넌트에 stock을 전해줌*/}
                            </List.Item>
                        )}
                    />



                    {/* 약품 추가*/}
                    <div style={{ marginTop: 100 }}>
                        <ChemicalAdd addChemical={this.addChemical} />
                    </div>
                </div>
                }

                {
                    !this.state.isInventoryExist  &&
                    
                    <div>
                        <center>
                            <br></br>
                        <b>등록된 장소가 하나도 없습니다! </b> 
                        <InventoryAdd addInventory={this.addInventory} />
                        </center>
                    </div>
                }

            </div>
        );
    }
}

export default MyLab;
