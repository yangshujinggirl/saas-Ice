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

export default class TIqianhuankanfangshi extends Component {

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
      percentageSetting: percentageSetting
    })
  }

  deleteItem(index) {
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
  
  changValue1 = (rule, value, callback) => {
    let { items, isFlag,Obj } = this.props
    let {prepaymentPeriodsLimit} = Obj
    let oIndex = this.getArrIndex(items,{loanTermMin:value});
    let max = items[oIndex].loanTermMax;
    
    if (rule.required && !value) {
      callback('最小期限必填');
      return;
    }
    if (value < 0) {
      callback('最小期限必选大于0')
    }
    if(max){
      if(Number(value) >= max){
        callback('不能大于或等于后者')
      }
    }
    if(Obj){
      if(Number(value) >Obj){
        callback('不在提前还款期数内')
      }
    }
    var regex = /^\d+\.\d+$/;
		var b = regex.test(value);
		if (b) {
			callback('最小期限不能是小数')
		}
    for (var i = 0; i < items.length - 1; i++) {
      for (var j = i + 1; j < items.length; j++) {
        if ((items[i].loanTermMin == items[j].loanTermMin) && (items[i].loanTermMax == items[j].loanTermMax)) {
          Feedback.toast.show({
            type: 'error',
            content: '还款方式的最小、大期限不能同时相等！',
            afterClose: () => {
              this.props.onChangeBoolean(false)
            },
            duration: 3000
          });
        }else{
          this.props.onChangeBoolean(true)
        }
      }
    }
    callback()
  }

  changValue2 = (rule, value, callback) => {
    let { items, isFlag,Obj } = this.props;
    let oIndex = this.getArrIndex(items,{loanTermMax:value});
    let min = items[oIndex].loanTermMin;

    if (rule.required && !value) {
      callback('最大期限必填');
      return;
    }
    if (value < 0) {
      callback('最大期限必须大于0')
    }
    if(min){
      if(Number(value) <= min){
        callback('不能小于或等于前者')
      }
    }
    if(Obj){
      if(Number(value) > Obj){
        callback('不在提前还款期数内')
      }
    }

    var regex = /^\d+\.\d+$/;
		var b = regex.test(value);
		if (b) {
			callback('最大期限不能是小数')
		}
    for (var i = 0; i < items.length - 1; i++) {
      for (var j = i + 1; j < items.length; j++) {
        if ((items[i].loanTermMin == items[j].loanTermMin) && (items[i].loanTermMax == items[j].loanTermMax)) {
          Feedback.toast.show({
            type: 'error',
            content: '还款方式的最小、大期限不能同时相等！',
            afterClose: () => {
              this.props.onChangeBoolean(false)
            },
            duration: 3000
          });
        }else{
          this.props.onChangeBoolean(true)
        }
      }
    }
    callback()
  }

  changValue3 = (rule, value, callback) => {
    if (rule.required && !value) {
      callback('期限单位必填');
      return;
    }
    // if (value < 0) {
    //    callback('最大期限小于0')
    // }
    callback()
  }

  changValue4 = (rule, value, callback) => {
    if (rule.required && !value) {
      callback('违约金比例必填');
      return;
    }
    if (value < 0) {
      callback('违约金比例必须大于0')
    }
    if(value >=100000){
      callback('违约金比例不能大于100000')
    }
    //保留两位小数
		var dot = value.indexOf(".");
		if (dot != -1) {
			var dotCnt = value.substring(dot + 1, value.length);
			if (dotCnt.length > 2) {
				callback('小数范围是两位');
			}
		}
    callback()
  }
  renderCell1 = (value, index, record, context) => {
    return (
      <div>
        <IceFormBinder
          required
          name={`prepaymentSetting[${index}].loanTermMin`}
          validator={this.changValue1}
        >
          <Input placeholder="最小期限" htmlType ='number' size="large"/>
        </IceFormBinder>
        <div style={{ display: 'inline' }}><IceFormError name={`prepaymentSetting[${index}].loanTermMin`} /></div>
      </div>
    );
  }

  renderCell2 = (value, index, record, context) => {
    return (
      <div>
        <IceFormBinder
          required
          name={`prepaymentSetting[${index}].loanTermMax`}
          validator={this.changValue2}
        >
          <Input placeholder="最大期限" htmlType ='number' size="large"/>
        </IceFormBinder>
        <div style={{ display: 'inline' }}><IceFormError name={`prepaymentSetting[${index}].loanTermMax`} /></div>
      </div>
    );
  }

  renderCell3 = (value, index, record, context) => {
    return (
      <div>
        <IceFormBinder
          required
          name={`prepaymentSetting[${index}].termUnit`}
          validator={this.changValue3}
        >
          <Input placeholder="期限单位"  size="large"/>
        </IceFormBinder>
        <div style={{ display: 'inline' }}><IceFormError name={`prepaymentSetting[${index}].termUnit`} /></div>
      </div>
    );
  }

  renderCell4 = (value, index, record, context) => {
    return (
      <div>
        <IceFormBinder
          required
          name={`prepaymentSetting[${index}].penaltyPercentage`}
          validator={this.changValue4}
        >
          <Input placeholder="违约金比例" htmlType ='number' size="large"/>
        </IceFormBinder>
        <div style={{ display: 'inline' }}><IceFormError name={`prepaymentSetting[${index}].penaltyPercentage`} /></div>
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
        <div className="table-title">提前还款方式设置</div>
        <Table
          dataSource={items}
          hasHeader
          className="table"
        >
          <Table.Column title="最小期限" cell={this.renderCell1} />
          <Table.Column title="最大期限" cell={this.renderCell2} />
          <Table.Column title="期限单位" cell={this.renderCell3} />
          <Table.Column title="违约金比例(%)" cell={this.renderCell4} />
          <Table.Column title="操作" width={80} cell={this.renderCell5} />
        </Table>
        <BtnAddRow style={{ marginTop: 20 }} onClick={this.props.addItem.bind(this)} />
      </div>
    )
  }
}
