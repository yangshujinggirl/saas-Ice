import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
   FormBinderWrapper as IceFormBinderWrapper,
   FormBinder as IceFormBinder,
   FormError as IceFormError,
} from '@icedesign/form-binder';
import Req from '../../../../reqs/ProductReq'
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
   Feedback,
   TreeSelect
} from '@icedesign/base';
import { Title, BtnAddRow } from 'components';

const { Row, Col } = Grid;
const TreeNode = TreeSelect.Node;
// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据

export default class Chanpinlilv extends Component {

   constructor(props) {
      super(props);

      this.state = {
         percentageSetting: [],
         agencyData: []
      }
   }
   componentWillMount() {
      Req.getProdeuctAgency().then((res) => {
         this.getAgencyData(res.data);
        
      }).catch((res) => {

      })
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
   //渠道的值
   getAgencyData = (data) => {
      data.map((item, i) => {
         item.label = item.name;
         item.value = item.idPath + '/';
         if (item.children.length > 0) {
            this.getAgencyData(item.children)
         } else {
            item.label = item.name;
            item.value = item.idPath + '/';
         }
      })
      let agencyData = this.state.agencyData;
      this.setState({
         agencyData: data
      })
   }
   //渠道名称不可重复
   changeValue(value, option) {
      let { items, isFlag } = this.props
      let allArr = items;
      items.map((item, i) => {
         if (value == item.channelTypes) {
            Feedback.toast.show({
               type: 'error',
               content: '该集团已存在！',
               afterClose: () => {
                  this.props.onChangeBoolean(false)
               },
               duration: 2000
            });
         }else{
            this.props.onChangeBoolean(true)
         }
      })
      
   }

   testChange2 = (rule, value, callback) => {
      let { items ,Obj} = this.props
      let {interestRatesRangeMin} = Obj
      let oIndex = this.getArrIndex(items, { interestRatesRangeMin: value });
      let max = items[oIndex].interestRatesRangeMax;

      if (rule.required && !value) {
         callback('最小执行年利率必填');
         return;
      }
      if (value < 0) {
         callback('最小执行年利率必须大于0')
      }
      if (value >= 1000) {
         callback('最小执行年利率不能大于1000');
      }
      if (max) {
         if (Number(value) >=Number( max)) {
            callback('不能大于或等于后者')
         }
      }
      if(interestRatesRangeMin){
            if(Number(value) < interestRatesRangeMin){
                  callback('不在执行年利率范围内')
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

   testChange3 = (rule, value, callback) => {
      let { items,Obj } = this.props
      let {interestRatesRangeMax} = Obj
      let oIndex = this.getArrIndex(items, { interestRatesRangeMax: value });
      let min = items[oIndex].interestRatesRangeMin;

      if (rule.required && !value) {
         callback('最大执行年利率必填');
         return;
      }
      if (value < 0) {
         callback('最大执行年利率必须大于0')
      }
      if (value >= 1000) {
         callback('最大执行年利率不能大于1000')
      }
      if (min) {
         if (Number(value) <= min) {
            callback('不能小于或等于前者')
         }
      }
      if(interestRatesRangeMax){
            if(Number(value) > interestRatesRangeMax){
                  callback('不在执行年利率范围内')
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

   renderCell1 = (value, index, record, context) => {
      let { agencyData } = this.state
      return (
         <div>
            <IceFormBinder
               required
               name={`ratesSetting[${index}].channelTypes`}
            >
               <TreeSelect
                  // treeDefaultExpandAll
                  dataSource={agencyData}
                  // onChange={::this.handleChange}
                  style={{ width: 200 }}
                  // autoWidth
                  onChange={this.changeValue.bind(this)}
                  size="large"
               />
            </IceFormBinder>
         </div>
      );
   }

   renderCell2 = (value, index, record, context) => {
      return (
         <div>
            <IceFormBinder
               required
               name={`ratesSetting[${index}].interestRatesRangeMin`}
               validator={this.testChange2}
            >
               <Input placeholder="最小执行年利率" htmlType ='number'size="large"/>
            </IceFormBinder>
            <div style={{ display: 'inline' }}><IceFormError name={`ratesSetting[${index}].interestRatesRangeMin`} /></div>
         </div>
      );
   }

   renderCell3 = (value, index, record, context) => {
      return (
         <div>
            <IceFormBinder
               required
               name={`ratesSetting[${index}].interestRatesRangeMax`}
               validator={this.testChange3}
            >
               <Input placeholder="最大执行年利率" htmlType ='number' size="large"/>
            </IceFormBinder>
            <div style={{ display: 'inline' }}><IceFormError name={`ratesSetting[${index}].interestRatesRangeMax`} /></div>
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
            <BtnAddRow style={{ marginTop: 20 }} onClick={this.props.addItem.bind(this)} />
         </div>
      )
   }
}
