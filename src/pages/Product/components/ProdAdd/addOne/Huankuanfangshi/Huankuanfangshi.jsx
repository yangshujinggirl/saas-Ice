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
	Dialog,
	Feedback
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

	addNewList(data) {
		let percentageSetting = this.state.percentageSetting;
		percentageSetting.push({})
		this.setState({
			percentageSetting
		})
	}

	deleteItem(index) {
		let percentageSetting = this.state.percentageSetting
		percentageSetting.splice(index, 1);
		this.setState({
			percentageSetting
		});
	}

	//还款方式不可重复
	changeValue = (value, option) => {
		let { items, isFlag } = this.props
		let allArr = items;
		items.map((item, i) => {
			if (value == item.repaymentMethods) {
				Feedback.toast.show({
					type: 'error',
					content: '该还款方式已存在！',
					afterClose: () => {
						this.props.onChangeBoolean(false)
					},
					duration: 2000
				});
			} else {
				this.props.onChangeBoolean(true)
			}
		})

	}

	testChange2 = (rule, value, callback) => {
		let { items } = this.props

		if (rule.required && !value) {
			callback('固定金额必填');
			return;
		}

		let valLenght = value.split('.')[0]
		if(valLenght.length > 14){
			callback('金额不能超过14位')
		}
		
		//保留两位小数
		var dot = value.indexOf(".");
		if (dot != -1) {
			var dotCnt = value.substring(dot + 1, value.length);
			if (dotCnt.length > 2) {
				callback('小数范围是两位');
			}
		}
		callback();

	}

	testChange3 = (rule, value, callback) => {
		let { items } = this.props

		if (rule.required && !value) {
			callback('宽限期期限必填');
			return;
		}
		if(Number(value)>=10000){
			callback('最多四位')
		}

		var regex = /^\d+\.\d+$/;
		var b = regex.test(value);
		if (b) {
			callback('宽限期期限为整数')
		}
		callback();
	}

	renderCell1 = (value, index, record, context) => {
		let { data } = this.props;
		let repaymentMethods = data.repaymentMethods;
		return (
			<div>
				<IceFormBinder
					required
					name={`repaymentMethodsSetting[${index}].repaymentMethods`}
					message="还款方式必填"
				>
					<Select
						placeholder="还款方式"
						style={{ width: '200px' }}
						onChange={this.changeValue}
						size="large"
					>
						{
							repaymentMethods.map((item, i) => {
								return (
									<Option value={item.value} key={i}>{item.desc}</Option>
								)
							})
						}
					</Select>
				</IceFormBinder>
				<div style={{ display: 'inline' }}><IceFormError name={`repaymentMethodsSetting[${index}].repaymentMethods`} /></div>
			</div>
		);
	}

	renderCell2 = (value, index, record, context) => {
		return (
			<div>
				<IceFormBinder
					required
					name={`repaymentMethodsSetting[${index}].fixedAmount`}
					validator={this.testChange2}
				>
					<Input placeholder="固定金额" htmlType='number' size="large" />
				</IceFormBinder>
				<div style={{ display: 'inline' }}><IceFormError name={`repaymentMethodsSetting[${index}].fixedAmount`} /></div>
			</div>
		);
	}

	renderCell3 = (value, index, record, context) => {
		return (
			<div>
				<IceFormBinder
					required
					name={`repaymentMethodsSetting[${index}].gracePeriod`}
					validator={this.testChange3}
				>
					<Input placeholder="宽限期期限" htmlType='number' size="large" />
				</IceFormBinder>
				<div style={{ display: 'inline' }}><IceFormError name={`repaymentMethodsSetting[${index}].gracePeriod`} /></div>
			</div>
		);
	}

	renderCell4 = (value, index, record, context) => {
		let { data } = this.props;
		let repaymentMethods = data.repaymentMethods;
		return (
			<div>
				<IceFormBinder
					required
					name={`repaymentMethodsSetting[${index}].repaymentExpirationGracePeriod`}
					message="宽限期失效后还款方式必填"
				>
					<Select
						placeholder="宽限期失效后还款方式"
						style={{ width: '200px' }}
						size="large"
					>
						{
							repaymentMethods.map((item, i) => {
								return (
									<Option value={item.value} key={i}>{item.desc}</Option>
								)
							})
						}
					</Select>
				</IceFormBinder>
				<div style={{ display: 'inline' }}><IceFormError name={`repaymentMethodsSetting[${index}].repaymentExpirationGracePeriod`} /></div>
			</div>
		);
	}

	renderCell5 = (value, index, record, context) => {
		return (
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
				<BtnAddRow style={{ marginTop: 20 }} onClick={this.props.addItem.bind(this)} />

			</div>
		)
	}
}
