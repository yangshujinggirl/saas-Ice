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
  TimePicker,
} from '@icedesign/base';
import Req from '../../../reqs/ReviewApproveReq';
import './FormRender.scss';

const { Group: CheckboxGroup } = Checkbox;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Combobox } = Select;
const { MonthPicker, YearPicker, RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 12 },
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
      // productList :[],
      overlay: '',
      brandList: [],//品牌列表
      carSystemList: [],//车系列表
      carModelList: [],//车型
    };
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
    if (el.type == 'STRING') {
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Input
            size = 'large'
            defaultValue={el.value}
            placeholder={'请输入' + el.label}
            disabled={el.isReadonly}
            maxLength={el.length ? el.length : null}
            addonAfter={el.append}
            {...init(el.name, {
              initValue: el.value ? el.value : '',
              rules: [{ required: el.isRequired, message: '请选择' + el.label }],
            })}
          />
        </FormItem>
      );
    } else if (el.type == 'SELECT') {
      var defaultOption = null;
      if (!el.value && el.options) {
        el.options.map((item, index) => {
          if (item.isDefault) {
            defaultOption = item.value;
          }
        });
      }
      if (el.name == 'car.id') {
        // console.log('this.state.carValue', this.state.carValue ? this.state.carValue : el.value);
        return (
          <FormItem key={el.id} className='item half' label={this.label(el.label)}
                    {...formItemLayoutCombobox}>
            <Select
              hasClear
              autoWidth
              size = 'large'
              overlay={this.state.overlay}
              // onClick={this.onInputFocus.bind(this)}
              // onSearch={this.onInputUpdate.bind(this)}
              // filterLocal={false}
              className="temp"
              // value={el.value ? el.value : this.state.carValue}
              disabled={el.isReadonly}
              placeholder={'请选择' + el.label}
              style={{ width: '100%' }}
              {...init(el.name, {
                initValue: this.state.carValue ? this.state.carValue : el.value,
                rules: [{ required: el.isRequired, message: '请选择' + el.label }],
                props: {
                  onClick: (value) => {
                    this.onInputFocus(value);
                  },
                },
              })}
              dataSource={this.state.carList ? this.state.carList : el.options}
            >
            </Select>
          </FormItem>
        );
      }
      else if (el.name == 'productCode') {
        return (<FormItem key={el.id} className='item' label={this.label(el.label)}
                          {...formItemLayout}>
          <Select
            size = 'large'
            defaultValue={el.value}
            disabled={el.isReadonly}
            placeholder={'请选择' + el.label}
            style={{ width: '100%' }}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: '请选择' + el.label }],
            })}
            dataSource={this.state.productList ? this.state.productList : this.props.productList}
          >
          </Select>
        </FormItem>);
      }
      else if (el.name == 'exhibitionHallHierarchy') {
        return (<FormItem key={el.id} className='item' label={this.label(el.label)}
                          {...formItemLayout}>
          <Select
            size = 'large'
            defaultValue={el.value}
            disabled={el.isReadonly}
            placeholder={'请选择' + el.label}
            style={{ width: '100%' }}
            // onChange={this.onSelect.bind(this)}
            {...init(el.name, {
              initValue: el.value,
              rules: [{ required: el.isRequired, message: '请选择' + el.label }],
              props: {
                onChange: (value) => {
                  this.onSelect(value);
                },
              },
            })}
            dataSource={el.options}
          >
          </Select>
        </FormItem>);
      }
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Select
            // defaultValue={el.value}
            size = 'large'
            disabled={el.isReadonly}
            placeholder={'请选择' + el.label}
            style={{ width: '100%' }}
            {...init(el.name, {
              initValue: el.value ? el.value : defaultOption,
              rules: [{ required: el.isRequired, message: '请选择' + el.label }],
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
              maxLength={el.length && (el.decimal || el.decimal == 0) ? (el.length + el.decimal + 1) : null}
              min={el.minValue}
              max={el.maxValue}
              {...init(el.name, {
                initValue: el.value ? parseFloat(el.value) : '',
                rules: [
                  { required: el.isRequired, message: el.label + '不能为空' },
                  { validator: this.checkNum.bind(this, el) },
                ],
                props: {
                  onChange: (value) => {
                    this.numberOnchange(el);
                  },
                },
              })}
            />
          </FormItem>
        );
      }
      return (
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Input
            size = 'large'
            disabled={el.isReadonly}
            placeholder={'请输入' + el.label}
            trim
            addonAfter={el.append}
            // htmlType='number'
            maxLength={el.length ? el.length : null}
            {...init(el.name, {
              initValue: el.value,
              rules: [
                { required: el.isRequired, message: el.label + '不能为空' },
                { validator: this.checkNum.bind(this, el) },
              ],
              props: {
                onChange: (value) => {
                  this.numberOnchange(el);
                },
              },
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
              step={1}
              disabled={el.isReadonly}
              placeholder={'请输入' + el.label}
              min={el.minValue}
              max={el.maxValue}
              {...init(el.name, {
                initValue: el.value ? parseFloat(el.value) : '',
                rules: [
                  { required: el.isRequired, message: el.label + '不能为空' },
                  { validator: this.checkInt.bind(this, el) },
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
            size = 'large'
            placeholder={'请输入' + el.label}
            disabled={el.isReadonly}
            addonAfter={el.append}
            maxLength={el.length ? el.length : null}
            {...init(el.name, {
              initValue: el.value ? parseInt(el.value) : '',
              rules: [
                { required: el.isRequired, message: el.label + '不能为空' },
                { validator: this.checkInt.bind(this, el) },
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
                 size = 'large'
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
            size = 'large'
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
  checkNum(el, rule, value, callback) {
    console.log(value);
    if (value == undefined || value == 'undefined') {
      callback();
    } else {
      if (value != '') {
        // value = parseFloat(value);
        if (value) {
          var ex = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
          if (!ex.test(value)) {
            callback(new Error('请填写数字'));
          }
          else {
            if (el.minValue && el.maxValue && (el.maxValue < value || el.minValue > value)) {
              callback(new Error(`填写的数字应在${el.minValue}~${el.maxValue}之间`));
            } else if (el.minValue && (el.minValue > value)) {
              callback(new Error(`填写的数字应大于${el.minValue}`));
            } else if (el.maxValue && (el.maxValue < value)) {
              callback(new Error(`填写的数字应大于${el.maxValue}`));
            }
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
  checkInt(el, rule, value, callback) {
    if (value == undefined || value == 'undefined') {
      callback();
    } else {
      if (value != '') {
        if (value) {
          var ex = /^([1-9]\d*|[0]{1,1})$/;
          if (!ex.test(value)) {
            callback(new Error('请填写整数'));
          }
          else {
            if (el.minValue && el.maxValue && (el.maxValue < value || el.minValue > value)) {
              callback(new Error(`填写的数字应在${el.minValue}~${el.maxValue}之间`));
            } else if (el.minValue && (el.minValue > value)) {
              callback(new Error(`填写的数字应大于${el.minValue}`));
            } else if (el.maxValue && (el.maxValue < value)) {
              callback(new Error(`填写的数字应大于${el.maxValue}`));
            }
          }
        } else if (isNaN(value)) {
          callback(new Error('请填写整数'));
        }
        callback();
      }
    }
    callback();
  }

  onDateChange(date, formateDate) {
    console.log(date);
    console.log(formateDate);

  }

  formatDateTime = (inputTime) => {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  };
  //改变value
  onChange = (value, option) => {
    // console.log(value)
    // console.log(option)
  };

  onInputFocus(e, value) {
    const productCode = this.props.field.getValue('productCode');
    var carList = {
      limit: 99999999,
      productCode: productCode,
      type: 1,
    };
    Req.getSelectList(carList)
      .then((res) => {
        console.log(res.data);

        var list = {};
        res.data && res.data.list ? res.data.list.map((item) => {
          if (!list[item.brandIndex]) {
            list[item.brandIndex] = [];
          }
          list[item.brandIndex].push(item);
        }) : '';
        console.log(list);
        this.setState({
          brandList: res.data && res.data.list ? res.data.list : '',
          titleBarList: list,
        });
        const overlay = (< div className="pch-from-select-overlay">

          {
            res.data && res.data.list ?
              (<div>
                <div className='title-bar'>
                  <ul>
                    {
                      this.renderTitleOptions(list)
                    }
                  </ul>
                </div>
                {
                  (
                    <div className='brand'>
                      <p>请选择品牌</p>
                      <div className='brand-options'>
                        <ul>
                          {
                            this.renderBrandOptions(list)
                          }
                        </ul>
                      </div>
                    </div>
                  )
                }
              </div>) : (<span></span>)
          }
        </div>);
        this.setState({
          overlay: overlay,
        });
      })
      .catch((error) => {

      });
  };

  //ABCD按钮
  renderTitleOptions = (data) => {
    var list = [];
    for (var key in data) {
      console.log(key);
      list.push(<li key={key}><a
        href="javascript:" className='active' onClick={this.scrollToAnchor.bind(this, key)}>{key}</a></li>);
    }
    return list;
  };
  //品牌
  renderBrandOptions = (data) => {
    var list = [];
    console.log(data);
    for (var key in data) {

      list.push(
        <div>
          <span className='title-bar' key={key} id={key}>{key}</span>
          {
            this.renderBrand(data[key])
          }
        </div>);
    }


    return list;
  };
  //渲染
  renderBrand = (data) => {
    var list = [];
    data.map((item, index) => {

      if (this.state.brandIndex && this.state.brandIndex == item.id) {
        list.push(<li key={item.id} onClick={this.carOnclick.bind(this, item.carId, item.id, item.brandName)}><a
          href="javascript:" className='active'>{item.brandName}</a></li>);
      } else {
        list.push(<li key={item.id} onClick={this.carOnclick.bind(this, item.carId, item.id, item.brandName)}><a
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
      list.push(<li key={index} onClick={this.CarModelOnclick.bind(this, item.id, item.modelName)}><a
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
      limit: 99999999,
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
            this.state.titleBarList ?
              (<div>
                <div className='title-bar'>
                  <ul>
                    {
                      this.renderTitleOptions(this.state.titleBarList)
                    }
                  </ul>
                </div>
                {
                  (
                    <div className='brand'>
                      <p>请选择品牌</p>
                      <div className='brand-options'>
                        <ul>
                          {
                            this.renderBrandOptions(this.state.titleBarList)
                          }
                        </ul>
                      </div>
                    </div>
                  )
                }
              </div>) : (<span></span>)

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
      limit: 99999999,
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
            this.state.titleBarList ?
              (<div>
                <div className='title-bar'>
                  <ul>
                    {
                      this.renderTitleOptions(this.state.titleBarList)
                    }
                  </ul>
                </div>
                {
                  (
                    <div className='brand'>
                      <p>请选择品牌</p>
                      <div className='brand-options'>
                        <ul>
                          {
                            this.renderBrandOptions(this.state.titleBarList)
                          }
                        </ul>
                      </div>
                    </div>
                  )
                }
              </div>) : (<span></span>)

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
  CarModelOnclick(id, text) {
    text && this.state.carSystemText && this.state.brandText ?
      this.setState({
        carList: [
          { label: this.state.brandText + '/' + this.state.carSystemText + '/' + text, value: id },
        ],
        carValue: id,
      }) : '';
    // this.field.setValues({ 'car.id': id});
    this.props.field.setValues({ 'car.id': id });
    this.setState({
      overlay: '',
    });
  }

  //展厅选择
  onSelect = (e, value) => {
    const exhibitionHallHierarchy = this.props.field.getValue('exhibitionHallHierarchy');
    const limit = 990;
    this.setState({
      productList: '',
    });
    this.props.field.setValues({ 'productCode': null });
    Req.getProductNumApi({
      limit: limit,
      exhibitionHallHierarchy: exhibitionHallHierarchy,
    })
      .then((res) => {
        const { data } = res;
        const { list } = data;
        let dataSource = list.map((el) => {
          return {
            id: el.id,
            label: el.name,
            value: el.productCode,
          };
        });
        this.setState({
          productList: dataSource,
        });
      }, (error) => {
        Req.tipError(error.msg);
      });
  };
  //跳转
  scrollToAnchor = (anchorName) => {
    console.log(anchorName);
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        console.log(anchorElement);
        anchorElement.scrollIntoView();
      }
    }
  };

  //计算公式
  numberOnchange = (el) => {
    if (el.name == 'principalAmount' || el.name == 'loanPercentage') {
      const carCarprice = this.props.field.getValue('car.carPrice');
      if (carCarprice) {
        const principalAmount = this.props.field.getValue('principalAmount');
        const loanPercentage = this.props.field.getValue('loanPercentage');
        if (el.name == 'principalAmount' && principalAmount) {
          var loanPercentage1 = (principalAmount / carCarprice * 100.00).toFixed(2);
          this.props.field.setValues({ 'loanPercentage': loanPercentage1 });
          return;
        }
        if (el.name == 'loanPercentage' && loanPercentage) {
          var principalAmount1 = (loanPercentage * carCarprice / 100.00).toFixed(2);
          this.props.field.setValues({ 'principalAmount': principalAmount1 });
          return;
        }
      }
    }
    if (el.name == 'car.carPrice') {
      const carCarprice = this.props.field.getValue('car.carPrice');
      const principalAmount = this.props.field.getValue('principalAmount');
      if (principalAmount && carCarprice) {
        var loanPercentage1 = (principalAmount / carCarprice * 100.00).toFixed(2);
        this.props.field.setValues({ 'loanPercentage': loanPercentage1 });
        return;
      }
    }


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
  //number 类型的研制输入长度
  checkLength = (value, number) => {
    console.log(value);
    console.log(number);
    if (number && number != null) {
      value = value.slice(0, 5);
    }
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
