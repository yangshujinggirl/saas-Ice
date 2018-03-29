import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import  classNames from  'classnames'
import { Input, Grid, Form, Button, Select ,Field,NumberPicker, Balloon, Radio} from '@icedesign/base';
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
          <li key={index} className={btnClass}  onClick={this.titleClick.bind(this,index)}>{item.name}</li>
        )
      })
    }
    return list;
  }
  //渲染表单
  renderForm = (data)=>{
    console.log(data)
    const  formList = [];
    if(data.length){
      data.map((item,index)=>{
        formList.push(
          <div className='info' key={index}>
            <h4>{item.name}</h4>
            <div className='info-row'>
            {
              item.fields.map((el,i)=>{
                return(
                    this.FromRender(el,i)
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
  FromRender = (el,i)=>{
    const init = this.field.init;
    const arr = [];
    // console.log(el)
    if(el.type == "STRING"){
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                  hasFeedback {...formItemLayout}>
          <Input
            {...init(el.name,{
              rules: [{ required: true, message: "请填写"+el.label }]
            })}
            placeholder={"请输入"+el.label}
          />
        </FormItem>
      )
    }else if(el.type == "SELECT"){
      return(
        <FormItem  key={el.id} className='item' label={this.label(el.label)}
                    {...formItemLayout}>
          <Select
            placeholder={"请选择"+el.label}
            style={{width:"100%"}}
            {...init(el.name, {
              rules: [{ required: true, message: "请选择"+el.label }]
            })}
          >
            {
              el.options ? el.options.map((item,i)=>{
                  return <li value={item.value} key={i}>{item.label}</li>
                })
                : ''
            }
          </Select>
        </FormItem>
      );
    }
    else if(el.type == 'DECIMAL'){
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                   {...formItemLayout}>
          <Input
            htmlType="number"
            {...init(el.name,{
              rules: [{ required: true, message: "请填写"+el.label},
                      { validator: this.check }]
            })}
            placeholder={"请输入"+el.label}
          />
        </FormItem>
      )
    }
    else if(el.type == 'INT'){
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                   {...formItemLayout}>
          <NumberPicker
            value={el.value}
            min={0}
            max={el.maxValue}
            type="inline"
            {...init(el.name, {
              rules: [
                { required: true,message: "请填写"+el.label}
              ]
            })}
          />
        </FormItem>
      )
    }
    else if(el.type == 'RADIO'){
      return(
        <FormItem key={el.id} className='item' label={this.label(el.label)}
                   {...formItemLayout}>
            <RadioGroup
              {...init(el.name, {
                rules: [{ required: true, message: "请选择"+el.label }]
              })}
            >
              {
                el.options ? el.options.map((item,i)=>{
                    return <Radio value={item.value} key={i}>{item.label}</Radio>
                  })
                  : ''
              }
            </RadioGroup>
        </FormItem>
      )
    }
  }
  //
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
  render() {
    // const details = this.props.bindingData.details;
    const details = this.props.detail || {};
    console.log(details)
    // console.log(this.props.params);
    const init = this.field.init;

    return (
        <IceFormBinderWrapper
          value={this.state.value}
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

                </Form>
              </Col>
            </Row>
          </IceContainer>


        </IceFormBinderWrapper>
    );
  }
}

