import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Form,
  Button,
  Select,
  Field,
  NumberPicker,
  Balloon,
  Radio,
  Checkbox,
  DatePicker,
  Table,
  Upload,
  TimePicker
} from '@icedesign/base';
import Req from '../../reqs/CreditInformationReq';
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
  wrapperCol: { span: 13 },
};
const formItemLayoutR = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayoutCombobox = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const formItemLayoutTEXT = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const formItemLayoutCHECKBOX = {
  labelCol: { span: 6 },
  wrapperCol: { span: 21 },
};

export default class FormRender extends Component {
  static displayName = 'FormRender';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {

    super(props);
    this.state = {
      value: {},
      Component: [],
      list: [],
      dataSource: [],
    };
  }

  componentWillMount() {
    // this.fetchData()
    this.SelectList();
  }

  //渲染表单
  renderForm = (data) => {
    const formList = [];
    if (data) {
      data.map((item, index) => {
        formList.push(
          <div className='info review-detail' key={index} id={item.name}>
            <span className='name'>{item.name}</span>
            <div className='info-row'>
              {
                item.fields.map((el, i) => {
                  return (
                    this.FromRender(el, index, i)
                  );
                })
              }
            </div>
          </div>,
        );
      });
    }
    return formList;
  };
  //区块分类渲染
  FromRender = (el, outIndex, inIndex) => {
    if (el.hasAttachedFields) {
      return (<div className="subsidiary-field" key={el.name}>
        {this.RenderField(el, outIndex, inIndex)}
      </div>);
    }
    else if (el.type == 'CHECKBOX' || el.type == 'RADIO') {
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
  //selectList
  SelectList = () => {

  };
  isFixedCheck = (isFixed, isReadonly) => {
    if (isFixed) {
      isReadonly = true;
    }
    return isReadonly;
  };

  //渲染字段
  RenderField = (el, outIndex, inIndex) => {
    const init = this.props.field.init;
    const arr = [];
    var disabled;
    el.isReadonly = true;
    // console.log(el)
    if (el.type == 'STRING') {
      // el.isReadonly = this.isFixedCheck(el.isFixed, el.isReadonly);
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Input
            defaultValue={el.value}
            placeholder={'请输入' + el.label}
            disabled={el.isReadonly}
            maxLength={el.length?el.length:null}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: '请选择' + el.label }],
            })}
          />
        </FormItem>
      );
    } else if (el.type == 'SELECT') {
      // el.isReadonly = this.isFixedCheck(el.isFixed, el.isReadonly);
      if (el.name == 'car.id') {
        return (
          <FormItem key={el.id} className='item half' label={this.label(el.label)}
                    {...formItemLayoutCombobox}>
            <Select
              hasClear
              showSearch
              dataSource={this.state.list}
              onSearch={this.onInputUpdate.bind(this)}
              filterLocal={false}
              className="temp"


              value={el.value}
              disabled={el.isReadonly}
              placeholder={'请选择' + el.label}
              style={{ width: '100%' }}
              {...init(el.name, {
                initValue: el.value,
                rules: [{ required: el.isRequired, message: '请选择' + el.label }],
              })}
              // dataSource={ this.props.productList || []}
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
            defaultValue={el.value}
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
      // el.isReadonly = this.isFixedCheck(el.isFixed, el.isReadonly);
      if (el.minValue || el.maxValue) {
        return (
          <FormItem key={el.id} className='item' label={this.label(el.label)}
                    {...formItemLayout}>
            <NumberPicker
              step={0.01}
              disabled={el.isReadonly}
              placeholder={'请输入' + el.label}
              // defaultValue={el.value ? parseInt(el.value) : el.value}
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
            defaultValue={el.value}
            disabled={el.isReadonly}
            placeholder={'请输入' + el.label}
            htmlType="number"
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
            })}
            placeholder={'请输入' + el.label}
          />
        </FormItem>
      );
    }
    else if (el.type == 'INT' || el.type == 'LONG') {
      // el.isReadonly = this.isFixedCheck(el.isFixed, el.isReadonly);
      if (el.minValue || el.maxValue) {
        return (
          <FormItem key={el.id} className='item' label={this.label(el.label)}
                    {...formItemLayout}>
            <NumberPicker
              step={0.01}
              disabled={el.isReadonly}
              placeholder={'请输入' + el.label}
              // defaultValue={el.value ? parseInt(el.value) : el.value}
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
            htmlType="number"
            placeholder={'请输入' + el.label}
            disabled={el.isReadonly}
            // defaultValue={el.value ? parseInt(el.value) : el.value}
            {...init(el.name, {
              initValue: el.value ? parseInt(el.value) : '' ,
              rules: [
                { required: el.isRequired, message: el.label + '不能为空' },
              ],
            })}
          />
        </FormItem>
      );
    }
    else if (el.type == 'RADIO') {
      // el.isReadonly = this.isFixedCheck(el.isFixed, el.isReadonly);
      var Fields = [];
      var Default = '';
      if (el.options) {
        el.options.map((item, index) => {
          if (item.isDefault) {
            Default = item.value;
            // console.log(Default)
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
        // console.log(Default)
        // console.log(setValue)
        Fields.push(<FormItem key={el.id} style={{ width: '100%' }} label={this.label(el.label)}
                              {...formItemLayoutTEXT}>
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
      var arr1 =[];
      if (str && str.indexOf(',') >= 0) {
        el.value = str.split(',');
      }
      el.options.map(item=>{
        if(item.isDefault){
          arr1.push(item.value)
        }
      })

      return (

        <FormItem key={el.id} style={{ width: '100%' }} label={this.label(el.label)}
                  {...formItemLayoutTEXT}>
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
      if(el.dateFormat == 'yyyy-MM-dd HH:mm:ss'){
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

        )
      }
      else if(el.dateFormat == 'HH:mm:ss'){
        return(
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
        )
      }
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}  >
          <DatePicker
            disabled={el.isReadonly}
            format={'YYYY-MM-DD'}
            style={{ width: '100%' }}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
            })}
          />
        </FormItem>
      );
    } else if (el.type == 'TEXT') {
      // el.isReadonly = this.isFixedCheck(el.isFixed, el.isReadonly);
      return (
        <FormItem key={el.id} style={{ width: '90%' }} className='item' label={this.label(el.label)}
                  {...formItemLayoutTEXT}>
          <Input multiple='6'
                 placeholder={'请输入' + el.label}
                 style={{ width: '85%' }}
                 disabled={el.isReadonly}
                 {...init(el.name, {
                   initValue: el.value,
                   rules: [{ required: el.isRequired, message: el.label + '不能为空' }],
                 })}
          />
        </FormItem>
      );
    }
  };
  //改变value
  onChange = (value, option) => {
    // console.log(value)
    // console.log(option)
  };
  onInputUpdate = (value) => {
    const productCode = this.props.field.getValue('productCode');
    var carList = {
      productCode: productCode,
      name: value,
    };
    console.log(carList);
    Req.getSelectList(carList)
      .then((res) => {
        if (res && res.code == 200) {
          const dataSource = res.data.list.map((item, index) => {
            return {
              label: item.brandName   ,
              value: item.id,
            };
          });
          this.setState({
            list: dataSource,
          });
        }
      })
      .catch((error) => {

      });
  };
  //label的提示
  label = (label) => {
    var labelName = <span> {label}:</span>;
    return (
      <Balloon
        type="primary"
        trigger={labelName}
        closable={false}
      >
        {label}
      </Balloon>
    );
  };
  //更改渲染附属字段
  isChange = (outIndex, inIndex) => {
    var name = this.props.data[outIndex].fields[inIndex].name;
    this.props.data[outIndex].fields[inIndex].value = this.props.field.getValue(name);
  };
  //调用秒拒功能
  refuse = (name) => {
    //担保人材料上传列表增加一列
    if (name == 'guarantor.name') {
      const guarantorName = this.props.field.getValue('guarantor.name');
      var guarantorNameData = { id: 'guarantorName', title: guarantorName, draggable: true };
      this.props.addColumn(guarantorNameData);
    }
    //共同贷款人材料上传列表增加一列
    if (name == 'coBorrower.name') {
      const coBorrowerName = this.props.field.getValue('coBorrower.name');
      var coBorrowerData = { id: 'coBorrowerName', title: coBorrowerName, draggable: true };
      this.props.addColumn(coBorrowerData);
    }
    //共同贷款人秒拒
    if (name == 'coBorrower.name' || name == 'coBorrower.idNo' || name == 'coBorrower.mobile') {
      const coBorrowerName = this.props.field.getValue('coBorrower.name');
      const coBorrowerIdNo = this.props.field.getValue('coBorrower.idNo');
      const coBorrowerMobile = this.props.field.getValue('coBorrower.mobile');
      if (coBorrowerName && coBorrowerIdNo && coBorrowerMobile) {
        // alert('123')
      }
    }
    //担保人秒拒
    if (name == 'guarantor.name' || name == 'guarantor.idNo' || name == 'guarantor.mobile') {
      const guarantorName = this.props.field.getValue('guarantor.name');
      const guarantorIdNo = this.props.field.getValue('guarantor.idNo');
      const guarantorMobile = this.props.field.getValue('guarantor.mobile');
      if (guarantorName && guarantorIdNo && guarantorMobile) {
        // alert('123')
      }
    }
  };
  //日期格式修改
  formater = (val, str) => {
    return str;
  };

  render() {
    const { data, init, productList } = this.props;
    return (
      this.renderForm(data)
    );
  }
}
