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
	Form,
	Feedback
} from '@icedesign/base';


import Chanpinchengshu from './Chanpinchengshu';
import Chanpinlilv from './Chanpinlilv';
import Huankuanfangshi from './Huankuanfangshi';
import Tiqianhuankuanfangshi from './Tiqianhuankuanfangshi';
import ProductReq from '../../../reqs/ProductReq';
 import {SpDataSource} from 'utils'
import { BaseCondition } from 'base';
import './addOne.scss';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const formItemLayout = {
	labelCol: { span: 8 },
};

export default class addOne extends BaseCondition {
	static displayName = 'addOne';

	static defaultProps = {};

	constructor(props) {
		super(props);

		this.state = {
			value: {
				tenantId: SpDataSource.defaultValue,
				tenantName: SpDataSource.defaultLabel,
				name: '',
				contractDisplayName: undefined,
				productType: undefined,
				serviceFormType: null,
				collectionDetailListId: undefined,
				effectiveDate: [],
				isPermittedDiscount: undefined,
				status: undefined,
				enable: 0,
				isRetainage: undefined,
				purposeOfLoan: ['BUY_CAR'],
				guaranteeMethodType: ['CREDIT'],
				paymentOfLoan: undefined,
				description: '',
				loanTermChange: ['ALLOW_DELAY'],
				principalAmountMin: '',
				principalAmountMax: '',
				loanTermRangeMin: '',
				loanTermRangeMax: '',
				loanPercentageMin: '',
				loanPercentageMax: '',
				interestLoanRateChange: ['ALLOW_CHANGE_RATE_ADJUST'],
				interestRateRules: undefined,
				interestRateModel: undefined,
				interestRatesRangeMin: '',
				interestRatesRangeMax: '',
				interestRateBaseDate: undefined,
				repaymentAccountChange: ['ALLOW_CHANGE'],
				repaymentPeriodFrequency: ['MONTH'],
				repaymentPeriodFrequencySubmit: [],
				repaymentDateChange: 'true',
				gracePeriodChange: 'true',
				repaymentMethodChange: 'true',
				isEarlyRepaymentAllowed: 'true',
				prepaymentAmountMin: '',
				prepaymentPeriodsLimit: '',
				penaltyBasicAmount: undefined,
				penaltyCalculationType: undefined,
				percentageSetting: [],
				ratesSetting: [],
				repaymentMethodsSetting: [],
				prepaymentSetting: [],
				productScope: []
			},
			isFlag:true
		};
	}
	onChangeBoolean=(isFlag)=>{
		this.setState({
			isFlag:isFlag
		})
	}
	onFormChange = (value) => {

		this.setState({
			value,
		});
	};
	AllValue = (value) => {
		return (
			{
				product: {
					tenantId: value.tenantId,
					tenantName: value.tenantName,
					name: value.name,
					contractDisplayName: value.contractDisplayName,
					productType: value.productType,
					serviceFormType: value.serviceFormType,
					collectionDetailListId: value.collectionDetailListId,
					effectiveDate: value.effectiveDate,
					expirationDate: value.expirationDate,
					isPermittedDiscount: value.isPermittedDiscount,
					status: value.status,
					enable: value.enable,
					isRetainage: value.isRetainage,
					purposeOfLoan: value.purposeOfLoan,
					guaranteeMethodType: value.guaranteeMethodType,
					paymentOfLoan: value.paymentOfLoan,
					description: value.description,
					loanTermChange: value.loanTermChange,
					principalAmountMin: value.principalAmountMin,
					principalAmountMax: value.principalAmountMax,
					loanTermRangeMin: value.loanTermRangeMin,
					loanTermRangeMax: value.loanTermRangeMax,
					loanPercentageMin: value.loanPercentageMin,
					loanPercentageMax: value.loanPercentageMax,
					interestLoanRateChange: value.interestLoanRateChange,
					interestRateRules: value.interestRateRules,
					interestRateModel: value.interestRateModel,
					interestRatesRangeMin: value.interestRatesRangeMin,
					interestRatesRangeMax: value.interestRatesRangeMax,
					interestRateBaseDate: value.interestRateBaseDate,
					repaymentAccountChange: value.repaymentAccountChange,
					repaymentPeriodFrequency: this.removeAllChoice(value.repaymentPeriodFrequency),
					repaymentDateChange: value.repaymentDateChange,
					gracePeriodChange: value.gracePeriodChange,
					repaymentMethodChange: value.repaymentMethodChange,
					isEarlyRepaymentAllowed: value.isEarlyRepaymentAllowed,
					prepaymentAmountMin: value.prepaymentAmountMin,
					prepaymentPeriodsLimit: value.prepaymentPeriodsLimit,
					penaltyBasicAmount: value.penaltyBasicAmount,
					penaltyCalculationType: value.penaltyCalculationType,
				},
				percentageSetting: value.percentageSetting,
				ratesSetting: value.ratesSetting,
				repaymentMethodsSetting: value.repaymentMethodsSetting,
				prepaymentSetting: value.prepaymentSetting,
				productScope: value.productScope
			}
		)
	}
	//全选还款周期方式
	removeAllChoice = (data) => {
		if (data.length == 7) {
			data.map((item, i) => {
				if (item == 'ALL_CHOICE') {
					data.splice(i, 1)
				}
			})
			return data
		} else {
			return data;
		}
	}
	//数据校验
	dataVerif = (value) => {
		console.log(value)
	}
	submit = () => {
		this.formRef.validateAll((error, value) => {
			console.log(error, value);
			let {isFlag} = this.state;
			let msg = '';
			if (error) {
				// 处理表单报错
				return;
			}
			// 提交当前填写的数据
			value.effectiveDate = value.time[0];
			value.expirationDate = value.time[1]
			
			//渠道不能重复
			for (var i = 0; i < value.ratesSetting.length - 1; i++) {
				for (var j = i + 1; j < value.ratesSetting.length; j++) {
					if ((value.ratesSetting[i].channelTypes == value.ratesSetting[j].channelTypes)) {
						return	ProductReq.tipError('渠道不能重复！')
				
					}
				}
			}

			//至少选择一种还款方式
			if(value.repaymentMethodsSetting.length==0){
				return	ProductReq.tipError('至少选择一种还款方式！')
			 }
			//还款方式不能重复 
			for (var i = 0; i < value.repaymentMethodsSetting.length - 1; i++) {
				for (var j = i + 1; j < value.repaymentMethodsSetting.length; j++) {
					if ((value.repaymentMethodsSetting[i].repaymentMethods == value.repaymentMethodsSetting[j].repaymentMethods)) {
						return	ProductReq.tipError('还款方式不能重复！')
					}
				}
			}

			if(!isFlag) return	ProductReq.tipError(msg)
			
			let AllValue = this.AllValue(value);
			this.dataVerif(value);
			this.props.actions.save(AllValue);
		});
	};
	componentDidMount() {
		let { actions } = this.props
		console.log(this.props)
		actions.prodActions();

	}
	addNewItem(key) {
		let newData = this.state.value[key];
		newData.push({})
		this.setState({
			newData
		})
	}

	removeItem(key, index) {
		let oldData = this.state.value[key]
		oldData.splice(index, 1);
		this.setState({
			oldData
		});
	}
	Option = (data) => {
		let coll = [];
		let test = []
		for (var i = 0; i < data.length; i++) {
			data.map((val, j) => {
				coll.push({
					id: val.id,
					name: val.name,
				})
			})
		}
		//去重
		for (var i = 0; i < coll.length; i++) {
			var flag = true;
			for (var j = 0; j < test.length; j++) {
				if (coll[i].name == test[j].name) {
					flag = false;
				};
			};
			if (flag) {
				test.push(coll[i]);
			};
		};
		return test;
	}

	//提前还款为否
	isEarlyDisabld = (checked, e) => {
		let lilvSett = this.state.value;
		if (checked == 'false') {
			//prepaymentAmountMin 最小还款金额  prepaymentPeriodsLimit 最小提前还款期数  penaltyBasicAmount 违约金计算基础  penaltyCalculationType 违约金计算方式
			//  prepaymentSetting 还款方式

			lilvSett.prepaymentAmountMin = '';
			lilvSett.prepaymentPeriodsLimit = '';
			lilvSett.penaltyBasicAmount = null;
			lilvSett.penaltyCalculationType = null;
			lilvSett.prepaymentSetting = [];
		}
		this.setState({
			lilvSett
		})
	}
	//是否提前还款
	tiQian = (data) => {
		return (
			<div>
				<Row wrap className='pch-adjust-next-col-size'>
					<Col xxs={24} xs={12} l={8} >
						<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>最小提前还款金额:</span>}>
							<IceFormBinder
								name="prepaymentAmountMin"
								required
								validator={this.prepaymentAmountMinChange}

							>
								<Input size="large" placeholder="最小提前还款金额" className="custom-input" htmlType ='number'/>
							</IceFormBinder>
							<div> <IceFormError name="prepaymentAmountMin" /></div>
						</FormItem>
					</Col>
					<Col xxs={24} xs={12} l={8} >
						<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>最早提前还款期数:</span>}>
							<IceFormBinder
								name="prepaymentPeriodsLimit"
								required
								validator={this.prepaymentPeriodsLimitChange}
							>

								<Input size="large" placeholder="最早提前还款期数" className="custom-input" htmlType ='number'/>
							</IceFormBinder>
							<div><IceFormError name="prepaymentPeriodsLimit" /></div>
						</FormItem>
					</Col>
				</Row>
				<Row wrap className='pch-adjust-next-col-size'>
					<Col xxs={24} xs={12} l={8} >
						<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>违约金计算基础:</span>}>
							<IceFormBinder
								name="penaltyBasicAmount"
								required
								message="违约金计算基础必填"
							>
								<Select
									size="large"
									name="penaltyBasicAmount"
									placeholder="请选择"
									style={styles.filterTool}
									className="custom-select"
								>
									{data.penaltyBasicAmount && data.penaltyBasicAmount.map((val, i) => {
										return (
											<Option value={val.value} key={i}>{val.desc}</Option>
										)
									})}
								</Select>
							</IceFormBinder>
							<div><IceFormError name="penaltyBasicAmount" /></div>
						</FormItem>
					</Col>
					<Col xxs={24} xs={12} l={8} >
						<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>违约金计算方式:</span>}>
							<IceFormBinder
								name="penaltyCalculationType"
								required
								message="违约金计算方式必填"
							>
								<Select
									size="large"
									name="penaltyCalculationType"
									placeholder="请选择"
									style={styles.filterTool}
									className="custom-select"
								>
									{data.penaltyCalculationType && data.penaltyCalculationType.map((val, i) => {
										return (
											<Option value={val.value} key={i}>{val.desc}</Option>
										)
									})}
								</Select>
							</IceFormBinder>
							<div><IceFormError name="penaltyCalculationType" /></div>
						</FormItem>
					</Col>
				</Row>
				<Tiqianhuankuanfangshi
					styles={styles}
					items={this.state.value.prepaymentSetting}
					Obj={this.state.value.prepaymentPeriodsLimit}
					addItem={this.addNewItem.bind(this, 'prepaymentSetting')}
					removeItem={this.removeItem.bind(this, 'prepaymentSetting')}
					isFlag= {this.state.isFlag}
					onChangeBoolean={this.onChangeBoolean}
				/>
			</div>
		)
	};
	
	//贷款期限不允许变更时其他不可被选
	loanTermChange = (data) => {
		data.map((item, i) => {
			if (item == 'NOT_ALLOW_CHANGE') {
				this.state.value.loanTermChange = ['NOT_ALLOW_CHANGE']
			}
		})
	};

	//贷款利率不允许变更时其他不可被选
	interestLoanRateChange = (data) => {
		data.map((item, i) => {
			if (item == 'NOT_ALLOW_CHANGE_ACCOUNT') {
				this.state.value.interestLoanRateChange = ['NOT_ALLOW_CHANGE_ACCOUNT']
			}
		})
	};

	//还款账户不允许变更时其他不可被选
	repaymentAccountChange = (data) => {
		data.map((item, i) => {//
			if (item == 'NOT_ALLOW_CHANGE') {
				this.state.value.repaymentAccountChange = ['NOT_ALLOW_CHANGE']
			}
		})
	};

	//还款周期全选
	repaymentPeriodFrequency = (data, e) => {
		let values = this.state.value
		if (e.target.value == 'ALL_CHOICE') {
			values.repaymentPeriodFrequency = ["ALL_CHOICE", "MONTH", "SEASON", "YEAR", "ONCE", "TWO_WEEK", "HALF_YEAR"]
			if (data.length > 5) {
				values.repaymentPeriodFrequency = ["MONTH"]
			}
			this.setState({
				value: values
			})
		} else {
			let index = data.findIndex((data) => data == "ALL_CHOICE")
			index != -1 ? data.splice(index, 1) : '';

			values.repaymentPeriodFrequency = data
			this.setState({
				value: values
			})
		}
		// let allDate = [...values.repaymentPeriodFrequency];
		// let index = allDate.findIndex((data) => data == "ALL_CHOICE");
		// index != -1 ? allDate.splice(index, 1) : ''
		// this.state.value.repaymentPeriodFrequencySubmit = allDate
		// console.log(this.state.value.repaymentPeriodFrequencySubmit);
	}
	checkOnChange = (value, e) => {

	}

	//产品名称是否已存在
	prdNameChange = (rule, value, callback) => {
		if (rule.required && !value) {
			callback('产品名称必填')
			return;
		}
		ProductReq.productNameRepeat(value).then((res) => {
			if (res.data) {
				callback("产品名已存在")
			}
			callback()
		})
	}

	//申请金额范围 
	principalAmountMinChange = (rule, value, callback) => {
		let min = this.state.value;
		if (rule.required && !value) {
			callback('申请金额必填');
			return;
		}
		if (value < 0) {
			callback('申请金额不能小于0')
		}
		if(min.principalAmountMax){
			if (Number(value) > min.principalAmountMax) {
				callback('必须小于后者')
			}
		}
		//范围
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
	principalAmountMaxChange = (rule, value, callback) => {
		let min = this.state.value;

		if (rule.required && !value) {
			callback('申请金额必填');
			return;
		}
		if (value < 0) {
			callback('申请金额不能小于0')
		}
		if (Number(value) < min.principalAmountMin) {
			callback('必须大于前者')
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

	//额度期限设置->期限范围
	loanTermRangeMinChange = (rule, value, callback) => {
		let min = this.state.value;
		if (rule.required && !value) {
			callback('期限范围必填');
			return;
		}
		if (value < 0) {
			callback('期限范围不能小于0')
		}
		if(min.loanTermRangeMax){
			if (Number(value) > min.loanTermRangeMax) {
				callback('必须小于后者')
			}
		}
		if( Number(value) >= 10000){
			callback('期限不能超出四位')
		}
		var regex = /^\d+\.\d+$/;
		var b = regex.test(value);
		if (b) {
			callback('期限范围不能是小数')
		}
		callback();
	}
	loanTermRangeMaxChange = (rule, value, callback) => {
		let min = this.state.value;
		if (rule.required && !value) {
			callback('期限范围必填');
			return;
		}
		if (value < 0) {
			callback('期限范围不能小于0')
		}

		if (Number(value) < min.loanTermRangeMin) {
			callback('必须大于前者')
		}
		if( Number(value) >= 10000){
			callback('期限不能超出四位')
		}
		var regex = /^\d+\.\d+$/;
		var b = regex.test(value);
		if (b) {
			callback('期限范围不能是小数')
		}
		callback();
	}

	// 贷款比率
	loanPercentageMinChange = (rule, value, callback) => {
		let min = this.state.value;
		if (rule.required && !value) {
			callback('贷款比率必填');
			return;
		}
		if (value < 0) {
			callback('贷款比率必须大于0')
		}
		if( value >= 1000){
			callback('比率不能大于1000')
		}
		if(min.loanPercentageMax){
			if (Number(value) > min.loanPercentageMax) {
				callback('必须小于后者')
			}
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
	loanPercentageMaxChange = (rule, value, callback) => {
		let min = this.state.value
		if (rule.required && !value) {
			callback('贷款比率必填');
			return;
		}
		if (value < 0 ) {
			callback('贷款比率必选大于0')
		}
		if( value >= 1000){
			callback('比率不能大于1000')
		}
		if (Number(value) < min.loanPercentageMin) {
			callback('必须大于前者')
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

	//最小提前还款金额
	prepaymentAmountMinChange = (rule, value, callback) => {
		if (rule.required && !value) {
			callback('最小提前还款金额必填');
			return;
		}
		if (value < 0) {
			callback('最小提前还款金额不能小于0');
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

	//最早提前还款期数
	prepaymentPeriodsLimitChange = (rule, value, callback) => {
		let min = this.state.value;
		this.setState({
			value: min
		})
		if (rule.required && !value) {
			callback('最早提前还款期数必填');
			return;
		}
		if (value < 0) {
			callback('最早提前还款期数小于0');
		}
		if (value >= 10000) {
			callback('还款期数不能超过10000')
		}
		var regex = /^\d+\.\d+$/;
		var b = regex.test(value);
		if (b) {
			callback('还款期数不能是小数')
		}
		callback();
	}

	//执行年利率
	interestRatesRangeMinChange = (rule, value, callback) => {
		let min = this.state.value
		if (rule.required && !value) {
			callback('执行年利率必填');
			return;
		}
		if (value < 0  ) {
			callback('利率范围必须大于0');
		}
		if(value >= 1000){
			callback('利率不能大于1000');
		}
		if(min.interestRatesRangeMax){
			if (Number(value) > min.interestRatesRangeMax) {
				callback('必须小于后者');
			}
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
	interestRatesRangeMaxChange = (rule, value, callback) => {
		let allValues = this.state.value;

		if (rule.required && !value) {
			callback('执行年利率必填');
			return;
		}
		if (value < 0  ) {
			callback('利率范围必须大于0');
		}
		if(value >= 1000){
			callback('利率不能大于1000');
		}
		if (Number(value) < allValues.interestRatesRangeMin) {
			callback('必须大于前者');
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

	//资方
	handleTenantChange(v, data) {
		let value = this.state.value;
		value.tenantName = data.label;

		this.setState({ value });
	}
	
	//
	validateForm(){
		// console.log('percentageSetting[0].loanPercentageMax')
		// this.formRef.validate('percentageSetting[0].loanPercentageMax');
	}
	render() {
		let {actions} = this.props;
		let data = this.props.prodActions || {}
		let fileData = this.props.fileData || {}
		fileData = fileData.data || {}
		fileData = fileData.list || []
		let collData = this.Option(fileData);
		return (
			<IceContainer className="pch-container">
				<legend className="pch-legend">
					<span className="pch-legend-legline"></span>基本信息
        </legend>
				<IceFormBinderWrapper
					ref={(formRef) => {
						this.formRef = formRef;
					}}
					value={this.state.value}
					onChange={this.onFormChange}
				>
					<div className="pch-form">
						<Form
							size="large"
							labelAlign="left">
							<div>
								<Row wrap>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>资金方:</span>}>
											<IceFormBinder name="tenantId">
												<Select size="large"
													placeholder="请选择"
													className="custom-input"
													dataSource={SpDataSource.dataSource}
													onChange={this.handleTenantChange.bind(this)} />
											</IceFormBinder>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>产品名称:</span>}>
											<IceFormBinder
												name="name"
												required
												validator={this.prdNameChange}

											>
												<Input size="large" placeholder="产品名称"
													className="custom-input"
													maxLength="50"
												/>
											</IceFormBinder>
											<div><IceFormError name="name" /></div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>产品类型:</span>}>
											<IceFormBinder
												name="productType"
											>
												<Select
													size="large"
													name="productType"
													required
													message="产品类型必填"
													placeholder="请选择"
													style={styles.filterTool}
													className="custom-select"
												>
													{data.productType && data.productType.map((val, i) => {
														return (
															<Option value={val.value} key={i}>{val.desc}</Option>
														)
													})}
												</Select>
											</IceFormBinder>
											<div><IceFormError name="productType" /></div>
										</FormItem>
									</Col>
								</Row>
								<Row wrap>
								
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>生效期限:</span>}>
											<IceFormBinder
												name="time"
												required
												message="生效日期必填"
												// 使用 RangePicker 组件输出的第二个参数字符串格式的日期
												valueFormatter={(date, dateStr) => dateStr}
											>
												<RangePicker format={"YYYY-MM-DD"} style={{ width: "200px" }} style={{ width: '220px', height: '34px', lineHeight: '32px' }} />
											</IceFormBinder>
											<div><IceFormError name="time" /></div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>允许贴息:</span>}>
											<IceFormBinder
												name="isPermittedDiscount"
											>
												<Select
													size="large"
													name="isPermittedDiscount"
													required
													message="允许贴息必填"
													placeholder="请选择"
													style={styles.filterTool}
													className="custom-select"
												>
													<Option value="true">是</Option>
													<Option value="false">否</Option>
												</Select>
											</IceFormBinder>
											<div> <IceFormError name="isPermittedDiscount" /></div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>状态:</span>}>
											<IceFormBinder
												name="status"
											>
												<Select
													size="large"
													name="status"
													required
													message="状态必填"
													placeholder="请选择"
													style={styles.filterTool}
													className="custom-select"
												>
													<Option value={'1'.toString()}>生效</Option>
													<Option value={'0'.toString()}>关闭</Option>
													{/* <Option value={'2'.toString()}>失效</Option> */}
												</Select>
											</IceFormBinder>
											<div><IceFormError name="status" /></div>
										</FormItem>
									</Col>
								</Row>
								<Row wrap>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>尾款产品:</span>}>
											<IceFormBinder
												name="isRetainage"
											>
												<Select
													size="large"
													required
													message="尾款产品必填"
													placeholder="请选择"
													style={styles.filterTool}
													className="custom-select"
												>
													<Option value="true">是</Option>
													<Option value="false">否</Option>
												</Select>
											</IceFormBinder>
											<div><IceFormError name="isRetainage" /></div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>支付方式:</span>}>
											<IceFormBinder
												name="paymentOfLoan"
											>
												<Select
													size="large"
													name="paymentOfLoan"
													required
													message="支付方式必填"
													placeholder="请选择"
													style={styles.filterTool}
													className="custom-select"
												>
													{data.paymentOfLoan && data.paymentOfLoan.map((val, i) => {
														return (
															<Option value={val.value} key={i}>{val.desc}</Option>
														)
													})}
												</Select>
											</IceFormBinder>
											<div><IceFormError name="paymentOfLoan" /></div>
										</FormItem>
									</Col>
								</Row>

								<Row wrap className='pch-adjust-next-col-size-13'>
									<Col xxs={24} xs={12} l={20} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>贷款用途:</span>}>
											<IceFormBinder name="purposeOfLoan" >
												<CheckboxGroup
													className="next-form-text-align test " >
													{data.purposeOfLoan && data.purposeOfLoan.map((val, i) => {
														return (
															<Checkbox value={val.value} key={i} className="checkboxCurr">{val.desc}</Checkbox>
														)
													})}
												</CheckboxGroup>
											</IceFormBinder>
											<div><IceFormError name="purposeOfLoan" /></div>
										</FormItem>
									</Col>
								</Row>
								<Row wrap>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>担保方式:</span>}>
											<IceFormBinder name="guaranteeMethodType" >
												<CheckboxGroup
													className="next-form-text-align" >
													{data.guaranteeMethodType && data.guaranteeMethodType.map((val, i) => {
														return (
															<Checkbox value={val.value} key={i}>{val.desc}</Checkbox>
														)
													})}
												</CheckboxGroup>
											</IceFormBinder>
											<div>
												<IceFormError name="guaranteeMethodType" />
											</div>
										</FormItem>
									</Col>
								</Row>
								<Row wrap>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span>产品描述:</span>}>
											<IceFormBinder
												name="description"
											>
												<Input size="large" multiple style={{ width: '500px' }} />
											</IceFormBinder>
											<div><IceFormError name="description" /></div>
										</FormItem>
									</Col>
								</Row>
							</div>
							<legend className="pch-legend">
								<span className="pch-legend-legline"></span>额度期限设置
          		</legend>
							<div className="pch-product-sep">
								<Row wrap className='pch-adjust-next-col-size-18'>
									<Col xxs={24} xs={12} l={20} >
										<FormItem {...formItemLayout} label={<span><span className="label-required">*</span>贷款期限变更:</span>}>
											<IceFormBinder name="loanTermChange" >
												<CheckboxGroup
													className="next-form-text-align">
													{data.loanTermChange && data.loanTermChange.map((val, i) => {
														return (
															<Checkbox value={val.value} key={i} onChange={this.loanTermChange(this.state.value.loanTermChange)}>{val.desc}</Checkbox>
														)
													})}
												</CheckboxGroup>
											</IceFormBinder>
											<div>
												<IceFormError name="loanTermChange" />
											</div>
										</FormItem>
									</Col>
								</Row>
								<Row wrap className='pch-adjust-next-col-size'>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>申请金额范围(元):</span>}>
											<div className='box'>
												<div className='box1'>
													<IceFormBinder
														name="principalAmountMin"
														required
														validator={this.principalAmountMinChange}
													>
														<Input size="large" 
															className="addone-input" 
															htmlType ='number'
															/>
													</IceFormBinder>
													<div><IceFormError name="principalAmountMin" /></div>
												</div>
												<div className="lx-mid-line">—</div>
												<div className='box2'>
													<IceFormBinder
														name="principalAmountMax"
														required
														validator={this.principalAmountMaxChange}
													>
														<Input size="large" 
														className="addone-input" 
														htmlType ='number'
														/>

													</IceFormBinder>
													<div ><IceFormError name="principalAmountMax" /></div>
												</div>
											</div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>期限范围(月):</span>}>
											<div className='box'>
												<div className='box1'>
													<IceFormBinder
														name="loanTermRangeMin"
														required
														validator={this.loanTermRangeMinChange}
													>
														<Input size="large" className="addone-input" htmlType ='number' />
													</IceFormBinder>
													<div><IceFormError name="loanTermRangeMin" /></div>
												</div>
												<div className="lx-mid-line">—</div>
												<div className='box2'>
													<IceFormBinder
														name="loanTermRangeMax"
														required
														validator={this.loanTermRangeMaxChange}
													>
														<Input size="large" className="addone-input" htmlType ='number'/>
													</IceFormBinder>
													<div><IceFormError name="loanTermRangeMax" /></div>
												</div>
											</div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>贷款比率(%):</span>}>
											<div className='box'>
												<div className='box1'>
													<IceFormBinder
														name="loanPercentageMin"
														required
														validator={this.loanPercentageMinChange}
													>
														<Input size="large" className="addone-input" htmlType ='number'/>
													</IceFormBinder>
													<div><IceFormError name="loanPercentageMin" /></div>
												</div>
												<div className="lx-mid-line">—</div>
												<div className='box2'>

													<IceFormBinder
														name="loanPercentageMax"
														required
														validator={this.loanPercentageMaxChange}
													>
														<Input size="large" className="addone-input" htmlType ='number'/>

													</IceFormBinder>
													<div><IceFormError name="loanPercentageMax" /></div>
												</div>
											</div>
										</FormItem>
									</Col>
								</Row>
								<Chanpinchengshu
									styles={styles}
									items={this.state.value.percentageSetting}
									Obj={{
										loanTermRangeMin:this.state.value.loanTermRangeMin,
										loanTermRangeMax:this.state.value.loanTermRangeMax,
										loanPercentageMin: this.state.value.loanPercentageMin,
										loanPercentageMax: this.state.value.loanPercentageMax
											}}
									addItem={this.addNewItem.bind(this, 'percentageSetting')}
									removeItem={this.removeItem.bind(this, 'percentageSetting')}
									isFlag= {this.state.isFlag}
									onChangeBoolean={this.onChangeBoolean}
									validateForm={this.validateForm.bind(this)}
								/>
							</div>

							<legend className="pch-legend">
								<span className="pch-legend-legline"></span>利率设置
          </legend>
							<div className="pch-product-sep">
								<Row wrap className='pch-adjust-next-col-size-18'>
									<Col xxs={24} xs={12} l={20} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>贷款利率变更:</span>}>
											<IceFormBinder name="interestLoanRateChange" >
												<CheckboxGroup
													className="next-form-text-align">
													{data.interestLoanRateChange && data.interestLoanRateChange.map((val, i) => {
														return (
															<Checkbox value={val.value} key={i} onChange={this.interestLoanRateChange(this.state.value.interestLoanRateChange)}>{val.desc}</Checkbox>
														)
													})}
												</CheckboxGroup>
											</IceFormBinder>
											<div>
												<IceFormError name="interestLoanRateChange" />
											</div>
										</FormItem>
									</Col>
								</Row>
								<Row wrap className='pch-adjust-next-col-size'>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>定价利率规则:</span>}>
											<IceFormBinder
												name="interestRateRules"
												required
												message="定价利率规则必填">
												<Select
													size="large"
													name="interestRateRules"
													placeholder="请选择"
													style={styles.filterTool}
													className="custom-select"
												>
													{data.interestRateRules && data.interestRateRules.map((val, i) => {
														return (
															<Option value={val.value} key={i}>{val.desc}</Option>
														)
													})}
												</Select>
											</IceFormBinder>
											<div><IceFormError name="interestRateRules" /></div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>利率模式:</span>}>
											<IceFormBinder
												name="interestRateModel"
												required
												message="利率模式必填"
											>
												<Select
													size="large"
													name="interestRateModel"
													placeholder="请选择"
													style={styles.filterTool}
													className="custom-select"
												>
													{data.interestRateModel && data.interestRateModel.map((val, i) => {
														return (
															<Option value={val.value} key={i}>{val.desc}</Option>
														)
													})}
												</Select>
											</IceFormBinder>
											<div><IceFormError name="interestRateModel" /></div>
										</FormItem>
									</Col>
								</Row>
								<Row wrap className='pch-adjust-next-col-size'>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>执行年利率范围(%):</span>}>
											<div className='box'>
												<div className='box1'>
													<IceFormBinder
														name="interestRatesRangeMin"
														required
														validator={this.interestRatesRangeMinChange}
													>
														<Input size="large" className="addone-input" htmlType ='number'/>
													</IceFormBinder>
													<div><IceFormError name="interestRatesRangeMin" /></div>
												</div>
												<div className="lx-mid-line">—</div>
												<div className='box2'>
													<IceFormBinder
														name="interestRatesRangeMax"
														required
														validator={this.interestRatesRangeMaxChange}
													>
														<Input size="large" className="addone-input" htmlType ='number'/>
													</IceFormBinder>
													<div><IceFormError name="interestRatesRangeMax" /></div>
												</div>
											</div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={8} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>利率基准日:</span>}>
											<IceFormBinder
												name="interestRateBaseDate"
												required
												message="利率基准日必填"
											>
												<Select
													size="large"
													name="interestRateBaseDate"
													placeholder="请选择"
													style={styles.filterTool}
													className="custom-select"
												>
													{data.interestRateBaseDate && data.interestRateBaseDate.map((val, i) => {
														return (
															<Option value={val.value} key={i}>{val.desc}</Option>
														)
													})}
												</Select>
											</IceFormBinder>
											<div><IceFormError name="interestRateBaseDate" /></div>
										</FormItem>
									</Col>
								</Row>
								<Chanpinlilv
									styles={styles}
									items={this.state.value.ratesSetting}
									Obj={{interestRatesRangeMax:this.state.value.interestRatesRangeMax,interestRatesRangeMin:this.state.value.interestRatesRangeMin}}
									addItem={this.addNewItem.bind(this, 'ratesSetting')}
									removeItem={this.removeItem.bind(this, 'ratesSetting')}
									isFlag= {this.state.isFlag}
									onChangeBoolean={this.onChangeBoolean}
									getProdeuctAgency={actions.getProdeuctAgency}
								/>
							</div>
							<legend className="pch-legend">
								<span className="pch-legend-legline"></span>还款设置
              </legend>
							<div className="pch-product-sep">
								<Row wrap className='pch-adjust-next-col-size-13'>
									<Col xxs={24} xs={12} l={20} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>还款账户变更:</span>}>
											<IceFormBinder name="repaymentAccountChange" >
												<CheckboxGroup
													className="next-form-text-align"
												>
													{data.repaymentAccountChange && data.repaymentAccountChange.map((val, i) => {
														return (
															<Checkbox value={val.value} key={i} onChange={this.repaymentAccountChange(this.state.value.repaymentAccountChange)}>{val.desc}</Checkbox>
														)
													})}
												</CheckboxGroup>
											</IceFormBinder>
											<div>
												<IceFormError name="repaymentAccountChange" />
											</div>
										</FormItem>
									</Col>
								</Row>
								<Row wrap className='pch-adjust-next-col-size-13 '>
									<Col xxs={24} xs={12} l={20} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>还款周期:</span>}>

											<CheckboxGroup
												className="next-form-text-align"
												onChange={this.repaymentPeriodFrequency}
												value={this.state.value.repaymentPeriodFrequency}
											>

												{data.repaymentPeriodFrequency && data.repaymentPeriodFrequency.map((val, i) => {
													return (
														<Checkbox value={val.value} key={i}>{val.desc}</Checkbox>
													)
												})}
											</CheckboxGroup>

											<div>
												<IceFormError name="repaymentPeriodFrequency" />
											</div>
										</FormItem>
									</Col>
								</Row>

								<Row wrap className='pch-adjust-next-col-size-40'>
									<Col xxs={24} xs={12} l={6} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>还款日变更:</span>}>
											<IceFormBinder name="repaymentDateChange" >
												<RadioGroup
													className="next-form-text-align"
													dataSource={[
														{ label: '是', value: 'true' },
														{ label: '否', value: 'false' },
													]}
												/>
											</IceFormBinder>
											<div>
												<IceFormError name="repaymentDateChange" />
											</div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={6} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>宽限期变更:</span>}>
											<IceFormBinder name="gracePeriodChange" >
												<RadioGroup
													className="next-form-text-align"
													dataSource={[
														{ label: '是', value: 'true' },
														{ label: '否', value: 'false' },
													]}
												/>
											</IceFormBinder>
											<div>
												<IceFormError name="gracePeriodChange" />
											</div>
										</FormItem>
									</Col>
									<Col xxs={24} xs={12} l={6} >
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>还款方式变更:</span>}>
											<IceFormBinder name="repaymentMethodChange" >
												<RadioGroup
													className="next-form-text-align"
													dataSource={[
														{ label: '是', value: 'true' },
														{ label: '否', value: 'false' },
													]}
												/>
											</IceFormBinder>
											<div>
												<IceFormError name="repaymentMethodChange" />
											</div>
										</FormItem>
									</Col>
								</Row>
								<Huankuanfangshi
									styles={styles}
									items={this.state.value.repaymentMethodsSetting}
									data={data}
									addItem={this.addNewItem.bind(this, 'repaymentMethodsSetting')}
									removeItem={this.removeItem.bind(this, 'repaymentMethodsSetting')}
									isFlag= {this.state.isFlag}
									onChangeBoolean={this.onChangeBoolean}
								/>
								<Row wrap className='pch-adjust-next-col-size-18'>
									<Col xxs={24} xs={12} l={20} className='m-t-24'>
										<FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>提前还款:</span>}>
											<IceFormBinder name="isEarlyRepaymentAllowed" >
												<RadioGroup
													className="next-form-text-align"
													dataSource={[
														{ label: '是', value: 'true' },
														{ label: '否', value: 'false' },
													]}
													onChange={this.isEarlyDisabld}
												/>
											</IceFormBinder>
											<div>
												<IceFormError name="isEarlyRepaymentAllowed" />
											</div>
										</FormItem>
									</Col>
								</Row>
								{this.state.value.isEarlyRepaymentAllowed == 'true' ? this.tiQian(data) : ''}

								<div className="next-btn-box">
									<Button type="secondary" size="large" onClick={this.submit}>下一步</Button>
								</div>
							</div>
						</Form>
					</div>
				</IceFormBinderWrapper>
			</IceContainer>
		);
	}
}


const styles = {
	container: {
		paddingBottom: 0,
	},
	formItem: {
		height: '28px',
		lineHeight: '28px',
		marginBottom: '25px',
	},
	formLabel: {
		textAlign: 'right',
	},
	btns: {
		margin: '25px 0',
	},
	resetBtn: {
		marginLeft: '20px',
	},


	filterTitle: {
		width: '140px',
		textAlign: 'right',
		marginRight: '12px',
		fontSize: '14px',
	},

	filterTool: {
		width: '200px',
	},
	addNew: {
		marginTop: '10px',
		textAlign: 'right',
	},
	addNewItem: {
		hiegth: '30px',
		borderRadius: 0,
		border: 'none',
		background: '#FC9E25',
		color: '#fff',
	},
	batchBtn: {
		// marginRight: '10px',
		float: 'none',
	},
	removeBtn: {
		marginLeft: 10,
		border: 'none',
		background: '#ec9d00',
		color: '#fff',

	},
	pagination: {
		textAlign: 'right',
		paddingTop: '26px',
	},
};

