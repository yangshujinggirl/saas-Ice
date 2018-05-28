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

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据

export default class Chanpinlilv extends Component {

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

	//获取数组的索引
	getArrIndex = (arr, obj) => {
		let index = null;
		let key = Object.keys(obj)[0];
		arr.every(function (value, i) {
			if (value[key] === obj[key]) {
				index = i;
				return false;
			}
			return true;
		});
		return index;
	};

	//渠道名称不可重复
	changeValue(value, option){
		let {items,boolean} = this.props
		let allArr = items;
		items.map((item,i)=>{
			if(value==item.channelTypes){
				Feedback.toast.show({
					type: 'error',
					content: '该集团已存在！',
					afterClose: () => {
						this.props.onChangeBoolean(false)
					},
					duration: 2000
			});
			}
		})
	}

	testChange2 = (rule, value, callback) => {
		let {items} = this.props
		let oIndex = this.getArrIndex(items,{interestRatesRangeMin:value});
		let max = items[oIndex].interestRatesRangeMax;

		if (rule.required && !value) {
			callback('最小执行年利率必填');
			return;
		}
		if (value < 0 ) {
			callback('最小执行年利率必须大于0')
		}
		if(max){
			if(Number(value) >= max ){
				callback('不能大于或等于后者')
			}
		}
		
		callback();
	}

	testChange3 = (rule, value, callback) => {
		let {items} = this.props
		let oIndex = this.getArrIndex(items,{interestRatesRangeMax:value});
		let min = items[oIndex].interestRatesRangeMin;

		if (rule.required && !value) {
			callback('最小执行年利率必填');
			return;
		}
		if (value < 0 ) {
			callback('最小执行年利率必须大于0')
		}
		if(min){
			if(Number(value) <= min){
				callback('不能小于或等于前者')
			}
		}
		
		callback();
	}

  renderCell1 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`ratesSetting[${index}].channelTypes`}
	        >
	        	<Select 
						placeholder="渠道" 
						style={{width:'200px'}}
						onChange={this.changeValue.bind(this)}
					>
						<Option value='集团A'>集团A</Option>
						<Option value='集团B'>集团B</Option>
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
					name={`ratesSetting[${index}].interestRatesRangeMin`}
					validator={this.testChange2}
	        >
	        	<Input  placeholder="最小执行年利率" />
	        </IceFormBinder>
					<div style={{ display: 'inline' }}><IceFormError name={`ratesSetting[${index}].interestRatesRangeMin`} /></div>
	    </div>
	);
  }

  renderCell3 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
					name={`ratesSetting[${index}].interestRatesRangeMax`}
					validator={this.testChange3}
	        >
	        	<Input placeholder="最大执行年利率" />
	        </IceFormBinder>
					<div style={{ display: 'inline' }}><IceFormError name={`ratesSetting[${index}].interestRatesRangeMax`} /></div>
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
    	<div className="chanpinchengshu">
	    	<div className="table-title">产品利率设置</div>
			<Table
				dataSource={items}
				hasHeader
				className="table"
			>
				<Table.Column title="渠道" cell={this.renderCell1} />
				<Table.Column title="最小执行年利率(%)" cell={this.renderCell2} />
				<Table.Column title="最大执行年利率(%)" cell={this.renderCell3} />
				<Table.Column title="操作" width={80} cell={this.renderCell5} />
				</Table>
        <BtnAddRow style={{marginTop: 20}} onClick={this.props.addItem.bind(this)} />
		</div>
    )
  }
}
