import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select ,Field,NumberPicker, Balloon, Radio, Checkbox, DatePicker,Table, Upload } from '@icedesign/base';

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
export default class FormRender extends Component {
  static displayName = 'FormRender';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {

    super(props);
    this.state = {
      value: {},
      Component :[],
    };
    this.field = new Field(this);
  }
  //渲染表单
  renderForm = (data)=>{
    // console.log(data)
    const  formList = [];
    if(data){
      data.map((item,index)=>{
        formList.push(
          <div className='info' key={index} id={item.name}>
            <h4 >{item.name}</h4>
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
  FromRender = (el,outIndex,inIndex)=>{
    if(el.hasAttachedFields){
      return (<div className="subsidiary-field" key={el.name}>
        {this.RenderField(el,outIndex,inIndex)}
      </div>)
    }
    return this.RenderField(el,outIndex,inIndex)
  }
  //渲染字段
  RenderField = (el,outIndex,inIndex)=>{
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
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <Input
            defaultValue={el.value}
            {...init(el.name,{
              rules: [{ required:  el.isRequired, message: "请填写"+el.label }],
              props:{ onBlur:()=> this.refuse(el.name) }
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
              rules: [{ required:  false, message: "请选择"+el.label }]
            })}
            dataSource={el.options}
          >
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
              rules: [{ required: el.isRequired, message: "请填写"+el.label}]
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
      var value = el.value+'';
      // console.log(typeof (value))
      // console.log(value)
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
        if( el.attached[value]) {
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
            dataSource = {el.options}
          >
          </CheckboxGroup>
        </FormItem>
      )
    }
    else if(el.type == 'DATE'){
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  {...formItemLayout}>
          <DatePicker
            defaultValue={el.value}
            format={"YYYY-MM-DD"}
            // formater={["YYYY-MM-DD"]}
            style={{width:"100%"}}
            {...init(el.name, {
              getValueFromEvent: this.formater
            },{
              rules: [{ required: el.isRequired, message: "请选择"+el.label }]
            })}
          />
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
    var name = this.props.detail.list[outIndex].fields[inIndex].name;
    this.props.detail.list[outIndex].fields[inIndex].value = this.field.getValue(name);
  }
  render() {
    const { data } = this.props;
    const init = this.field.init;
    return (
      this.renderForm(data)
  );
  }
}
