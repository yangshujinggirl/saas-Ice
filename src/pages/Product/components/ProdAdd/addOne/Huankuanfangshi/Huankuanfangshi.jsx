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
import { Title, BtnAddRow } from 'components';

const { Row, Col } = Grid;
const { Option } = Select;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据

export default class Huankuanfangshi extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	percentageSetting: []
    }
  }
	
  addNewList(data){
    let percentageSetting = this.state.percentageSetting;
    percentageSetting.push({})
    this.setState({
      percentageSetting
    })
  }

  deleteItem(index){
    let percentageSetting = this.state.percentageSetting
      percentageSetting.splice(index, 1);
      this.setState({
        percentageSetting
      });
  }

  renderCell1 = (value, index, record, context) => {
		let { data } = this.props;
		let repaymentMethods = data.repaymentMethods;
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`repaymentMethodsSetting[${index}].repaymentMethods`}
	        >
					<Select 
						placeholder="还款方式" 
						style={{width:'200px'}}
					>
						{
								repaymentMethods.map((item,i)=>{
								return(
									<Option value={item.value} key={i}>{item.desc}</Option>
								)
							})
						}
					</Select>
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
		let { data } = this.props;
		let repaymentMethods = data.repaymentMethods;
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`repaymentMethodsSetting[${index}].repaymentExpirationGracePeriod`}
	        >
						<Select 
							placeholder="宽限期失效后还款方式" 
							style={{width:'200px'}}
							>
							{
								repaymentMethods.map((item,i)=>{
									return(
										<Option value={item.value} key={i}>{item.desc}</Option>
									)
								})
							}
						</Select>
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell5 = (value, index, record, context) => {
    return(
    	<div>
    		<Button
    			onClick={this.props.removeItem.bind(this, index)} 
    			shape="text"
    			className="deleteBtn">删除</Button>
	    </div>
	);
  }

  render() {
  	let { styles, items } = this.props;
  	
    return (
    	<div>
	    	<div className="table-title">还款方式设置</div>
			<Table
				dataSource={items}
				hasHeader
				className="table"
			>
				<Table.Column title="还款方式" cell={this.renderCell1} />
				<Table.Column title="固定金额(元)" cell={this.renderCell2} />
				<Table.Column title="宽限期期限(天)" cell={this.renderCell3} />
				<Table.Column title="宽限期失效后还款方式" cell={this.renderCell4} />
				<Table.Column title="操作" width={80} cell={this.renderCell5} />
				</Table>
        <BtnAddRow style={{marginTop: 20}} onClick={this.props.addItem.bind(this)} />
			
		</div>
    )
  }
}
