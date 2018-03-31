import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Table,
  Dialog
} from '@icedesign/base';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据

export default class Huankuanfangshi extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	percentageSetting: [{}]
    }
  }

  addNewList(data){
    let newData = this.state.percentageSetting;
    newData = newData.push({})
    this.setState({
      newData
    })
  }

  deleteItem(index){
    let oldData = this.state.percentageSetting
    if (oldData.length == 1) {
      return false
    } else {
      oldData.splice(index, 1);
      this.setState({
        oldData
      });
    }
  }

  renderCell1 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`repaymentMethodsSetting[${index}].repaymentMethods`}
	        >
	        	<Input placeholder="还款方式" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell2 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`repaymentMethodsSetting[${index}].fixedAmount`}
	        >
	        	<Input placeholder="固定金额" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell3 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`repaymentMethodsSetting[${index}].gracePeriod`}
	        >
	        	<Input placeholder="宽限期期限" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell4 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`repaymentMethodsSetting[${index}].repaymentExpirationGracePeriod`}
	        >
	        	<Input placeholder="宽限期失效后还款方式" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell5 = (value, index, record, context) => {
    return(
    	<div>
    		<Button
    			onClick={this.deleteItem.bind(this, index)} 
    			shape="text"
    			className="deleteBtn">删除</Button>
	    </div>
	);
  }

  render() {
  	let { styles } = this.props;
  	
    return (
    	<div>
	    	<div className="table-title">还款方式设置</div>
			<Table
				dataSource={this.state.percentageSetting}
				hasHeader
				className="table"
			>
				<Table.Column title="还款方式" cell={this.renderCell1} />
				<Table.Column title="固定金额(元)" cell={this.renderCell2} />
				<Table.Column title="宽限期期限(天)" cell={this.renderCell3} />
				<Table.Column title="宽限期失效后还款方式" cell={this.renderCell4} />
				<Table.Column title="操作" width={80} cell={this.renderCell5} />
				</Table>
			<div style={styles.addNew}>
			<Button onClick={this.addNewList.bind(this)} style={styles.addNewItem}>新增一行</Button>
			</div>
		</div>
    )
  }
}
