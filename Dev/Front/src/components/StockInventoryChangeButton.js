import React, { Component, Fragment } from 'react';
import { Button } from 'antd';

import SelectInventory from './SelectInventory';

class StockInventoryChangeButton extends Component {

    render() {
        return(
            <Fragment>
                <SelectInventory selectInventory={this.props.changeInventory} suggest={this.props.suggest}
                notSuggest={this.props.notSuggest}/>
                <div>
                    <Button onClick={this.props.blindInventoryChangeButton} type="primary"> 취소 </Button>
                </div>
            </Fragment>
        );
    }
}

export default StockInventoryChangeButton;