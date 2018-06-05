import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select ,Field,NumberPicker, Balloon, Radio, Checkbox, DatePicker,Table, Uploadm,TimePicker } from '@icedesign/base';
import Req from '../../../reqs/ReviewApproveReq';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
const { Group: CheckboxGroup } = Checkbox;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Combobox } = Select;

const formItemLayout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 13 }
};
const formItemLayoutR = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const formItemLayoutCombobox = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 }
};
const formItemLayoutTEXT = {
  labelCol: { span: 3},
  wrapperCol: { span: 21 }
};
const formItemLayoutCHECKBOX = {
  labelCol: { span: 6},
  wrapperCol: { span: 21 }
};
const  List = [
  {value:'productCode', name:'产品名称'},
  {value:'borrowerName', name:'主贷款人姓名'},
  {value:'borrowerIdType', name:'主贷款人证件类型'},
  {value:'borrowerIdNo', name:'主贷款人证件号码'},
  {value:'exhibitionHallName', name:'展厅名称'},
  {value:'lenderId', name:'资方'},
  {value:'car.id', name:'品牌/车系/车型'},
  {value:'hasCoBorrower', name:'是否有共同贷款人'},
  {value:'coBorrower.name', name:'共同贷款人姓名'},
  {value:'coBorrower.idType', name:'共同贷款人证件类型'},
  {value:'coBorrower.idNo', name:'共同贷款人证件号码'},
  {value:'coBorrower.mobile', name:'共同贷款人手机号码'},
  {value:'coBorrower.relationshipWithBorrower', name:'共同贷款人与主贷人关系'},
  {value:'hasGuarantor', name:'是否有担保人'},
  {value:'guarantor.idType', name:'担保人证件类型'},
  {value:'guarantor.idNo', name:'担保人证件号码'},
  {value:'guarantor.mobile', name:'担保人手机号码'},
  {value:'guarantor.relationshipWithBorrower', name:'担保人与主贷人关系'},
]


export default class FormRender extends Component {
  static displayName = 'FormRender';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {

    super(props);
    this.state = {
      value: {},
      Component :[],
      list:[],
      dataSource:[],
      filedList:[
        {value:'productCode', name:'产品名称'},
        {value:'borrowerName', name:'主贷款人姓名'},
        {value:'borrowerIdType', name:'主贷款人证件类型'},
        {value:'borrowerIdNo', name:'主贷款人证件号码'},
        {value:'exhibitionHallName', name:'展厅名称'},
        {value:'lenderId', name:'资方'},
        {value:'car.id', name:'品牌/车系/车型'},
        {value:'hasCoBorrower', name:'是否有共同贷款人'},
        {value:'coBorrower.name', name:'共同贷款人姓名'},
        {value:'coBorrower.idType', name:'共同贷款人证件类型'},
        {value:'coBorrower.idNo', name:'共同贷款人证件号码'},
        {value:'coBorrower.mobile', name:'共同贷款人手机号码'},
        {value:'coBorrower.relationshipWithBorrower', name:'共同贷款人与主贷人关系'},
        {value:'hasGuarantor', name:'是否有担保人'},
        {value:'guarantor.idType', name:'担保人证件类型'},
        {value:'guarantor.idNo', name:'担保人证件号码'},
        {value:'guarantor.mobile', name:'担保人手机号码'},
        {value:'guarantor.relationshipWithBorrower', name:'担保人与主贷人关系'},
      ],
      overlay: '',
      brandList: [],//品牌列表
      carSystemList: [],//车系列表
      carModelList: [],//车型
    };
  }
  //渲染表单
  renderForm = (data)=>{
    const  formList = [];
    if(data){
      data.map((item,index)=>{
        formList.push(
          <div className='info' key={index} id={item.name}>
            <span className='title-text'>{item.name}</span>
            <div className='info-row'>
              {
                item.fields.map((el,i)=>{
                  return(
                    this.FromRender(el,index,i)
                  )
                })
              }
            </div>
          </div>
        )
      })
    }
    return formList;
  }
  //区块分类渲染
  FromRender = (el, outIndex, inIndex) => {
    if (el.hasAttachedFields) {
      return (<div className="subsidiary-field" key={el.name}>
        {this.RenderField(el, outIndex, inIndex)}
      </div>);
    }
    else if (el.type == 'CHECKBOX' || el.type == 'RADIO' || el.type == 'ADDRESS') {
      return (<div className="subsidiary-field" key={el.name}>
        {this.RenderField(el, outIndex, inIndex)}
      </div>);
    }
    else if (el.line == '1') {
      return (<div className="subsidiary-field" key={el.name}>
        {this.RenderField(el, outIndex, inIndex)}
      </div>);
    }
    return this.RenderField(el, outIndex, inIndex);
  };

  //渲染字段
  RenderField = (el, outIndex, inIndex) => {
    const init = this.props.field.init;
    this.state.filedList.map((item)=>{
      if(el.name == item.value){
        el.isReadonly = true
      }
    })
    if (el.type == 'STRING') {
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Input
            defaultValue={el.value}
            placeholder={'请输入' + el.label}
            disabled={el.isReadonly}
            maxLength={el.length ? el.length : null}
            addonAfter={el.append}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: '请选择' + el.label }],
            })}
          />
        </FormItem>
      );
    } else if (el.type == 'SELECT') {
      if (el.name == 'car.id') {
        const overlay = (< div className="pch-from-select-overlay">
          <div className='brand'>
            <h5>请选择品牌</h5>
            <div className='brand-options'>
              <ul>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4" className='active'>奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4" className='active'>奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4" className='active'>奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
              </ul>
            </div>
          </div>
          <div className='carsystem'>
            <h5>请选择车系</h5>
            <div className='carsystem-options'>
              <ul>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪A4L</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪A4L</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪A4L</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4" className='active'>奥迪A4L</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪A4L</a></li>
              </ul>
            </div>
          </div>
          <div className='carmodel'>
            <h5>请选择车型</h5>
            <div className='carmodel-options'>

              <ul>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪A4L</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪A4L</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪A4L</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4" className='active'>奥迪A4L</a></li>
                <li><a href="javascript:" data-parentid="536" data-carid="4">奥迪A4L</a></li>
              </ul>
            </div>
          </div>
        </div>);
        console.log('this.state.carValue',this.state.carValue ?  this.state.carValue: el.value)
        return (
          <FormItem key={el.id} className='item half' label={this.label(el.label)}
                    {...formItemLayoutCombobox}>
            <Select
              hasClear
              autoWidth
              overlay={this.state.overlay}
              onClick={this.onInputFocus.bind(this)}
              // onSearch={this.onInputUpdate.bind(this)}
              // filterLocal={false}
              className="temp"
              // value={el.value ? el.value : this.state.carValue}
              disabled={el.isReadonly}
              placeholder={'请选择' + el.label}
              style={{ width: '100%' }}
              {...init(el.name, {
                initValue: this.state.carValue ?  this.state.carValue: el.value,
                rules: [{ required: el.isRequired, message: '请选择' + el.label }],
              })}
              dataSource={this.state.carList ?this.state.carList :  el.options}
            >
            </Select>
          </FormItem>
        );
      }
      else if (el.name == 'productCode') {
        return (<FormItem key={el.id} className='item' label={this.label(el.label)}
                          {...formItemLayout}>
          <Select
            defaultValue={el.value}
            disabled={el.isReadonly}
            placeholder={'请选择' + el.label}
            style={{ width: '100%' }}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: '请选择' + el.label }],
            })}
            dataSource={this.props.productList || []}
          >
          </Select>
        </FormItem>);
      }
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Select
            // defaultValue={el.value}
            disabled={el.isReadonly}
            placeholder={'请选择' + el.label}
            style={{ width: '100%' }}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
            })}
            dataSource={el.options}
          >
          </Select>
        </FormItem>
      );
    }
    else if (el.type == 'DECIMAL') {
      if (el.minValue || el.maxValue) {

        return (
          <FormItem key={el.id} className='item' label={this.label(el.label)}
                    {...formItemLayout}>
            <NumberPicker
              step={0.01}
              disabled={el.isReadonly}
              placeholder={'请输入' + el.label}
              maxLength={el.length && (el.decimal || el.decimal ==0) ? (el.length + el.decimal + 1) : null}
              min={el.minValue}
              max={el.maxValue}
              {...init(el.name, {
                initValue: el.value ? parseFloat(el.value) : '',
                rules: [
                  { required: el.isRequired, message: el.label + '不能为空' },
                ],
              })}
            />
          </FormItem>
        );
      }
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Input
            disabled={el.isReadonly}
            placeholder={'请输入' + el.label}
            trim
            addonAfter={el.append}
            // htmlType='number'
            maxLength={el.length ? el.length  : null}
            {...init(el.name, {
              initValue: el.value,
              rules: [
                { required: el.isRequired, message: el.label + '不能为空' },
                { validator: this.checkNum.bind(this, el.isRequired) },
              ],
            })}
            placeholder={'请输入' + el.label}
          />
        </FormItem>
      );
    }
    else if (el.type == 'INT' || el.type == 'LONG') {
      if (el.minValue || el.maxValue) {
        return (
          <FormItem key={el.id} className='item' label={this.label(el.label)}
                    {...formItemLayout}>
            <NumberPicker
              step={0.01}
              disabled={el.isReadonly}
              placeholder={'请输入' + el.label}
              min={el.minValue}
              max={el.maxValue}
              {...init(el.name, {
                initValue: el.value ? parseFloat(el.value) : '',
                rules: [
                  { required: el.isRequired, message: el.label + '不能为空' },
                ],
              })}
            />
          </FormItem>
        );
      }
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Input
            trim
            placeholder={'请输入' + el.label}
            disabled={el.isReadonly}
            addonAfter={el.append}
            maxLength={el.length ? el.length : null}
            {...init(el.name, {
              initValue: el.value ? parseInt(el.value) : '',
              rules: [
                { required: el.isRequired, message: el.label + '不能为空' },
                { validator: this.checkInt.bind(this, el.isRequired) },
              ],
            })}
          />
        </FormItem>
      );
    }
    else if (el.type == 'RADIO') {
      var Fields = [];
      var Default = '';
      if (el.options) {
        el.options.map((item, index) => {
          if (item.isDefault) {
            Default = item.value;
          }
        });
      }
      if (el.hasAttachedFields) {
        var value = '';
        value = el.value == undefined || el.value == '' || el.value == 'undefined' ? Default : el.value;
        Fields.push(<FormItem key={el.id} className='item single-line' label={this.label(el.label)}
                              {...formItemLayoutR}>
          <RadioGroup
            disabled={el.isReadonly}
            defaultValue={value + ''}
            {...init(el.name, {
              initValue: value + '',
              rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
              props: {
                onChange: () => {
                  this.isChange(outIndex, inIndex);
                },
              },
            })}
            dataSource={el.options}
          >
          </RadioGroup>
        </FormItem>);
        if (el.attached[value]) {
          el.attached[value].map((item, index) => {
            Fields.push(this.FromRender(item));
          });
          return (Fields);
        }
      }
      else {
        var setValue = '';
        setValue = el.value == undefined || el.value == '' || el.value == 'undefined' ? Default : el.value;
        Fields.push(<FormItem key={el.id} style={{ width: '100%' }} label={this.label(el.label)}
                              {...formItemLayoutR}>
          <RadioGroup
            defaultValue={setValue + ''}
            disabled={el.isReadonly}
            dataSource={el.options}
            {...init(el.name, {
              initValue: setValue + '',
              rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
            })}
          >
          </RadioGroup>
        </FormItem>);
      }
      return (Fields);
    } else if (el.type == 'CHECKBOX') {
      // console.log(el.value)
      // el.isReadonly = this.isFixedCheck(el.isFixed, el.isReadonly);

      var str = el.value;
      var arr1 = [];
      if (str && str.indexOf(',') >= 0) {
        el.value = str.split(',');
      }
      el.options.map(item => {
        if (item.isDefault) {
          arr1.push(item.value);
        }
      });

      return (

        <FormItem key={el.id} style={{ width: '100%' }} label={this.label(el.label)}
                  {...formItemLayoutR}>
          <CheckboxGroup
            className='CheckboxGroup'
            style={{ width: '100%' }}
            // defaultValue={el.value}
            disabled={el.isReadonly}
            {...init(el.name, {
              initValue: el.value ? el.value : arr1,
              rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
            })}
            dataSource={el.options}
          >
          </CheckboxGroup>
        </FormItem>
      );
    }
    else if (el.type == 'DATE') {
      // console.log(el.value)
      // el.isReadonly = this.isFixedCheck(el.isFixed, el.isReadonly);
      if (el.dateFormat == 'yyyy-MM-dd HH:mm:ss') {
        return (
          <FormItem key={el.id} className='item' label={this.label(el.label)}
                    {...formItemLayout}  >
            <DatePicker
              disabled={el.isReadonly}
              showTime
              style={{ width: '100%' }}
              {...init(el.name, {
                initValue: el.value,
                rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
              })}
            />
          </FormItem>

        );
      }
      else if (el.dateFormat == 'HH:mm:ss') {
        return (
          <FormItem key={el.id} className='item' label={this.label(el.label)}
                    {...formItemLayout}  >
            <TimePicker
              disabled={el.isReadonly}
              style={{ width: '100%' }}
              {...init(el.name, {
                initValue: el.value,
                rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
              })}
            />
          </FormItem>
        );
      }
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}  >
          <DatePicker
            disabled={el.isReadonly}
            formater={['YYYY-MM-DD']}
            style={{ width: '100%' }}
            // onChange={this.onDateChange.bind(this)}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
            })}
          />
        </FormItem>
      );
    } else if (el.type == 'TEXT') {
      return (
        <FormItem key={el.id} style={{ width: '90%' }} className='item' label={this.label(el.label)}
                  {...formItemLayoutTEXT}>
          <Input multiple='6'
                 placeholder={'请输入' + el.label}
                 style={{ width: '100%' }}
                 disabled={el.isReadonly}
                 maxLength={el.length ? el.length : null}
                 {...init(el.name, {
                   initValue: el.value,
                   rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
                 })}
          />
        </FormItem>
      );
    }
    else if (el.type == 'ADDRESS') {
      return (
        <FormItem key={el.id} style={{ width: '70%' }} className='item' label={this.label(el.label)}
                  {...formItemLayoutR}>
          <Input
            placeholder={'请输入' + el.label}
            style={{ width: '100%' }}
            disabled={el.isReadonly}
            maxLength={el.length ? el.length : null}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
            })}
          />
        </FormItem>
      );
    }
  };

  //验证数字
  checkNum(flag, rule, value, callback) {
    console.log(value)
    if (value == undefined || value == 'undefined') {
      callback();
    } else {
      if (value != '') {
        value = parseInt(value);
        if (value) {
          var ex = /^[0-9]\d*$/;
          if (!ex.test(value)) {
            callback(new Error('请填写数字'));
          }
        } else if (isNaN(value)) {
          callback(new Error('请填写数字'));
        }
        callback();
      }
    }
    callback();
  }

  //验证非负数
  checkInt(flag, rule, value, callback) {
    if (value == undefined || value == 'undefined') {
      callback();
    } else {
      if (value != '') {
        value = parseInt(value);
        if (value) {
          var ex = /^([1-9]\d*|[0]{1,1})$/;
          if (!ex.test(value)) {
            callback(new Error('请填写整数'));
          }
        } else if (isNaN(value)) {
          callback(new Error('请填写整数'));
        }
        callback();
      }
    }
    callback();
  }


  onInputFocus(e, value) {
    const productCode = this.props.field.getValue('productCode');
    var carList = {
      productCode: productCode,
      type: 1,
    };
    Req.getSelectList(carList)
      .then((res) => {
        console.log(res.data);
        this.setState({
          brandList: res.data.list,
        });
        const overlay = (< div className="pch-from-select-overlay">

          {
            res.data && res.data.list ?
              (
                <div className='brand'>
                  <h5>请选择品牌</h5>
                  <div className='brand-options'>
                    <ul>
                      {
                        this.renderBrandOptions(res.data && res.data.list)
                      }
                    </ul>
                  </div>
                </div>
              ): (<span></span>)
          }
        </div>);
        this.setState({
          overlay: overlay,
        });
      })
      .catch((error) => {

      });
  };

  //品牌
  renderBrandOptions = (data) => {
    var list = [];
    data.map((item, index) => {
      if (this.state.brandIndex && this.state.brandIndex == item.id) {
        list.push(<li key={index} onClick={this.carOnclick.bind(this, item.carId, item.id, item.brandName)}><a
          href="javascript:" className='active'>{item.brandName}</a></li>);
      } else {
        list.push(<li key={index} onClick={this.carOnclick.bind(this, item.carId, item.id, item.brandName)}><a
          href="javascript:">{item.brandName}</a></li>);
      }
    });
    return list;
  };
  //车系
  renderCarSystemOptions = (data) => {
    var list = [];
    data.map((item, index) => {
      if (this.state.carSystemIndex && this.state.carSystemIndex == item.id) {
        list.push(<li key={index} onClick={this.carSystemOnclick.bind(this, item.carId, item.id, item.seriesName)}><a
          href="javascript:" className='active'>{item.seriesName}</a></li>);
      } else {
        list.push(<li key={index} onClick={this.carSystemOnclick.bind(this, item.carId, item.id, item.seriesName)}><a
          href="javascript:">{item.seriesName}</a></li>);
      }
    });
    return list;
  };
  //车车型
  renderCarModelOptions = (data) => {
    var list = [];
    data.map((item, index) => {
      list.push(<li key={index} onClick={this.CarModelOnclick.bind(this, item.id,item.modelName)}><a
        href="javascript:">{item.modelName}</a></li>);
    });
    return list;
  };
  //点击品牌
  carOnclick(id, index, text) {
    const productCode = this.props.field.getValue('productCode');
    var carList = {
      productCode: productCode,
      parentId: id,
      type: 2,
    };
    this.setState({
      brandIndex: index,
      brandText: text,
    });

    Req.getSelectList(carList)
      .then((res) => {
        console.log(res.data);
        const overlay = (< div className="pch-from-select-overlay">
          {
            this.state.brandList ?
              (
                <div className='brand'>
                  <h5>请选择品牌</h5>
                  <div className='brand-options'>
                    <ul>
                      {
                        this.renderBrandOptions(this.state.brandList)
                      }
                    </ul>
                  </div>
                </div>
              ) : (<span></span>)

          }
          {
            res.data.list ? (
              <div className='carsystem'>
                <h5>请选择车系</h5>
                <div className='carsystem-options'>
                  <ul>
                    {this.renderCarSystemOptions(res.data.list)}
                  </ul>
                </div>
              </div>
            ) : (<span></span>)
          }
        </div>);
        this.setState({
          carSystemList: res.data.list,
        });
        this.setState({
          overlay: overlay,
        });
      })
      .catch((error) => {

      });
  }
  //点击车系
  carSystemOnclick(id, index, text) {
    const productCode = this.props.field.getValue('productCode');
    var carList = {
      productCode: productCode,
      parentId: id,
      type: 3,
    };
    this.setState({
      carSystemIndex: index,
      carSystemText: text,
    });
    Req.getSelectList(carList)
      .then((res) => {
        console.log(res.data);
        const overlay = (< div className="pch-from-select-overlay">
          {
            this.state.brandList ?
              (
                <div className='brand'>
                  <h5>请选择品牌</h5>
                  <div className='brand-options'>
                    <ul>
                      {
                        this.renderBrandOptions(this.state.brandList)
                      }
                    </ul>
                  </div>
                </div>
              ) : (<span></span>)
          }
          {
            res.data.list ? (
              <div className='carsystem'>
                <h5>请选择车系</h5>
                <div className='carsystem-options'>
                  <ul>
                    {this.renderCarSystemOptions(this.state.carSystemList)}
                  </ul>
                </div>
              </div>
            ) : (<span></span>)
          }
          {res.data.list ? (
            <div className='carmodel'>
              <h5>请选择车型</h5>
              <div className='carmodel-options'>
                <ul>
                  {this.renderCarModelOptions(res.data.list)}
                </ul>
              </div>
            </div>
          ) : (<span></span>)

          }
        </div>);
        this.setState({
          overlay: overlay,
        });
      })
      .catch((error) => {

      });
  }
  //点击车型
  CarModelOnclick(id,text) {
    text && this.state.carSystemText && this.state.brandText ?
      this.setState({
        carList :[
          {label:this.state.brandText + '/' + this.state.carSystemText + '/' + text, value: id},
        ],
        carValue: id,
      }) : '';
    this.props.field.setValues({ 'car.id': id});
    this.setState({
      overlay: '',
    });
  }
  //label的提示
  label = (label) =>{
    var  labelName= <span> {label}:</span>
    return(
      <Balloon
        type="primary"
        trigger={labelName}
        closable={false}
      >
        {label}
      </Balloon>
    )
  }
  //更改渲染附属字段
  isChange = (outIndex,inIndex)=>{
    var name = this.props.detail.list[outIndex].fields[inIndex].name;
    this.props.detail.list[outIndex].fields[inIndex].value = this.props.field.getValue(name);
  }
  //调用秒拒功能
  refuse = (name)=>{
    //担保人材料上传列表增加一列
    if(name == 'guarantor.name'){
      const  guarantorName = this.props.field.getValue('guarantor.name');
      var guarantorNameData = {id:'guarantorName',title:guarantorName ,draggable:true}
      this.props.addColumn(guarantorNameData);
    }
    //共同贷款人材料上传列表增加一列
    if(name == 'coBorrower.name'){
      const  coBorrowerName = this.props.field.getValue('coBorrower.name');
      var coBorrowerData = {id:'coBorrowerName',title:coBorrowerName ,draggable:true}
      this.props.addColumn(coBorrowerData);
    }
    //共同贷款人秒拒
    if(name == 'coBorrower.name' || name == 'coBorrower.idNo'|| name == 'coBorrower.mobile'){
      const  coBorrowerName = this.props.field.getValue('coBorrower.name');
      const  coBorrowerIdNo = this.props.field.getValue('coBorrower.idNo');
      const  coBorrowerMobile = this.props.field.getValue('coBorrower.mobile');
      if(coBorrowerName && coBorrowerIdNo && coBorrowerMobile){
        // alert('123')
      }
    }
    //担保人秒拒
    if(name == 'guarantor.name' || name == 'guarantor.idNo'|| name == 'guarantor.mobile'){
      const  guarantorName = this.props.field.getValue('guarantor.name');
      const  guarantorIdNo = this.props.field.getValue('guarantor.idNo');
      const  guarantorMobile = this.props.field.getValue('guarantor.mobile');
      if(guarantorName && guarantorIdNo && guarantorMobile){
        // alert('123')
      }
    }
  }
  //日期格式修改
  formater = (val, str)=>{
    return str;
  }
  render() {
    const { data, init, productList} = this.props;
    return (
      this.renderForm(data)
    );
  }
}
