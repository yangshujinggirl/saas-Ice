import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import  classNames from  'classnames'
import { Input, Grid, Form, Button, Select ,Field,NumberPicker, Balloon, Radio,Checkbox} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder/lib/index';
import {browserHistory, hashHistory} from 'react-router';
import  './LoanModify.scss'
import FormRender from  './FormRender'

const { Row, Col } = Grid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 13 }
};
const formItemLayoutR = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};

@DataBinder({
  details: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/loan/derails',
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
})



export default class LoanModify extends Component {
  static displayName = 'LoanModify';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      index : 0
    };
    // 请求参数缓存
    this.queryCache = {};
  }
  componentDidMount() {
    this.fetchData();
  }
  //请求数据
  fetchData = () => {
    let {actions} = this.props;
    actions.getDetail(this.props.params.id);
    // this.props.updateBindingData('details', {
    //   data:this.queryCache ,
    // });
  };
  //标题点击
  titleClick = (index)=>{
    // e.preventDefault();
    this.setState({
      index:index
    })
    console.log(index);
  }
  //渲染标题
  renderTitle = (data) =>{
    const  list = [];
    if(data.length){
      data.map((item,index)=>{
        var btnClass = classNames({
          'active': this.state.index == index,
        });
        list.push(
          <a href={'#'+item.name} key={index} className={btnClass}  onClick={this.titleClick.bind(this,index)}>{item.name}</a>
        )
      })
    }
    return list;
  }
  //渲染表单
  renderForm = (data)=>{
    // console.log(data)
    const  formList = [];
    if(data.length){
      data.map((item,index)=>{
        formList.push(
          <div className='info' key={index} id={item.name}>
            <h4>{item.name}</h4>
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
  //
  FromRender = (el,outIndex,inIndex)=>{
    const init = this.field.init;
    const arr = [];
    var   disabled ;
    // console.log(el)
    if(el.type == "STRING"){
      if(el.isFixed){
        disabled = true
      }else{
        disabled = false
      }
      console.log('string value', el.name, el.value)
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  hasFeedback {...formItemLayout}>
          <Input
            defaultValue={el.value}
            {...init(el.name,{
              rules: [{ required: true, message: "请填写"+el.label }]
            })}
            placeholder={"请输入"+el.label}
            disabled={disabled}
          />
        </FormItem>
      )
    }else if(el.type == "SELECT"){
      if(el.isFixed){
        disabled = true
      }else{
        disabled = false
      }
      return(
        <FormItem  key={el.id} className='item' label={this.label(el.label)}
                    {...formItemLayout}>
          <Select
            defaultValue={el.value}
            disabled={disabled}
            placeholder={"请选择"+el.label}
            style={{width:"100%"}}
            {...init(el.name, {
              rules: [{ required: el.isRequired, message: "请选择"+el.label }]
            })}
          >
            {
              el.options ? el.options.map((item,i)=>{
                  return <Option  value={item.value} key={i}>{item.label}</Option>
                })
                : ''
            }
          </Select>
        </FormItem>
      );
    }
    else if(el.type == 'DECIMAL'){
      if(el.isFixed){
        disabled = true
      }else{
        disabled = false
      }
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                   {...formItemLayout}>
          <Input
            defaultValue={el.value}
            disabled={disabled}
            htmlType="number"
            {...init(el.name,{
              rules: [{ required: el.isRequired, message: "请填写"+el.label},
                      { validator: this.check }]
            })}
            placeholder={"请输入"+el.label}
          />
        </FormItem>
      )
    }
    else if(el.type == 'INT'){
      if(el.isFixed){
        disabled = true
      }else{
        disabled = false
      }
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                   {...formItemLayout}>
          <NumberPicker
            disabled={disabled}
            defaultValue={el.value}
            min={0}
            max={el.maxValue}
            type="inline"
            {...init(el.name, {
              rules: [
                { required: el.isRequired,message: "请填写"+el.label}
              ]
            })}
          />
        </FormItem>
      )
    }
    else if(el.type == 'RADIO'){
      var value = el.value ;
      var Fields  =[];
      if(el.hasAttachedFields){
        Fields.push(<FormItem key={el.id} className='item single-line' label={this.label(el.label)}
                              {...formItemLayoutR}>
                            <RadioGroup
                              defaultValue ={value}
                              {...init(el.name, {
                                rules: [{ required: el.isRequired, message: "请选择"+el.label }],
                                props:{
                                  onChange:()=> {
                                    this.isChange(outIndex,inIndex);
                                  }
                                }
                              })}

                              dataSource={el.options}
                            >
                            </RadioGroup>
                   </FormItem>)
        if(  el.attached[value]) {
          el.attached[value].map((item,index)=>{
            Fields.push(this.FromRender(item))
          })
          return(Fields)
        }
      }
      else{
        Fields.push(<FormItem key={el.id} className='item' label={this.label(el.label)}
                              {...formItemLayout}>
          <RadioGroup
            defaultValue ={value}
            {...init(el.name, {
              rules: [{ required: el.isRequired, message: "请选择"+el.label }]
            })}
            dataSource={el.options}
          >
          </RadioGroup>
        </FormItem>)
      }
      return(Fields)
    }else if(el.type == 'CHECKBOX'){
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <CheckboxGroup
            defaultValue ={el.value}
            {...init(el.name, {
              rules: [{ required: el.isRequired, message: "请选择"+el.label }]
            })}
          >
            {
              el.options ? el.options.map((item,i)=>{
                  return <Checkbox value={item.value} key={item.value}>{item.label}</Checkbox>
                })
                : ''
            }
          </CheckboxGroup>
        </FormItem>
      )
    }
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
    console.log(this.props.detail[outIndex].fields[inIndex])
    console.log(this.field.getValues())
    var name = this.props.detail[outIndex].fields[inIndex].name;
    this.props.detail[outIndex].fields[inIndex].value = this.field.getValue(name);
  }
  render() {
    // const details = this.props.bindingData.details;
    const details = this.props.detail || {};
    console.log(details)
    // console.log(this.props.params);
    const init = this.field.init;

    return (
        <IceFormBinderWrapper
          value={this.state}
          onChange={this.formChange}
          style
        >
          <IceContainer title="车贷申请" className='subtitle'>
            <Row  className='modify-page'>
              <Col span="3">
                <div className='title'>
                  <ul>
                    {this.renderTitle(details)}
                  </ul>
                </div>
              </Col>

              <Col span="21" className='modify-form'>
                <Form
                  labelAlign= "left"
                  field={this.field}
                >
                  {this.renderForm(details)}
                  <div className='info'>
                    <h4>材料提交</h4>
                  </div>
                </Form>
              </Col>
            </Row>
          </IceContainer>

        </IceFormBinderWrapper>
    );
  }
}

