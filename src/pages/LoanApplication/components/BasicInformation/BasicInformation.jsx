import React, { Component } from 'react';
import {hashHistory} from 'react-router';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Form,
  Button,
  Select,
  Field,
  NumberPicker,
  Dialog,
  Balloon
 } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';


import Req from '../../reqs/LoanApplicationReq'

import  './basicInfo.scss'
import classNames from 'classnames';

const { Options } = Select;
const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
};
const labels =(name) => (
  <span>
    <Balloon
      type="primary"
      trigger={<span>{name}:</span>}
      closable={false}
      triggerType="hover">
      {name}
    </Balloon>
  </span>
);
const value = {};
class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId:this.props.params.id,
      dataSource:[],
      month:1
    };
    this.field = new Field(this)
  }
  componentWillMount() {
    this.getProductNum()
    this.actionType()
  }

  actionType() {
    const { productId } = this.state;
    if(productId) {
      this.changeInfomation(productId)
    } else {
      this.props.actions.search({isFixed:true});
    }
  }

  changeInfomation(productId) {

  }

  getProductNum() {
    const limit = 990;
    Req.getProductNumApi(limit)
    .then((res) => {
      const { data } = res;
      const { list } = data;
      let dataSource = list.map((el) => {
        return {
          id : el.id,
          label:el.name,
          value:el.productCode,
        }
      });
      this.setState({
        dataSource
      })
    },(error) => {

    })
  }
  //提交表单
  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      let parmas = this.field.getValues();
      if (errors) {
        return;
      }
      this.addLoanApi(parmas)
    });
  }

  //增加进件
  addLoanApi(parmas) {
    Req.addLoanApi(parmas)
    .then((data) => {
      let { code, message } = data;
      if(data && code == 200 ) {
        let { id } = data.data;
        hashHistory.push(`/entryQuery/update/${id}`)
      }
    },(error) => {
      console.log(error)
    })
  }
  //秒拒提示
  warnTips(name) {
    const { borrowerName, borrowerIdNo, borrowerMobile } = this.field.getValues();
    if(name== 'borrowerName' || name== 'borrowerIdNo' || name== 'borrowerMobile') {
      if(borrowerName && borrowerIdNo && borrowerMobile) {
        // this.secondsfrom()
      }
    } else {
      return
    }

  }
  secondsfrom() {
    Dialog.confirm({
      content: '秒拒功能',
      locale: {
        ok: "确认"
      }
    });
  }

  formChange(){

  }
  //渲染
  renderTitle = (data) =>{
    const  list = [];
    if(data){
      data.map((item,index)=>{
        var btnClass = classNames({
          'active': this.state.index == index,
        });
        list.push(
          <a  key={index} className={btnClass}  onClick={this.titleClick.bind(this,index,item.name)}>{item.name}</a>
        )
      })
    }
    return list;
  }

  render() {
    const { list=[] } = this.props.pageData;
    const { init } = this.field;
    const { productId } = this.state;
    let Mod;
    let InputMod = (ele) => {
      switch(ele.type) {
        case 'SELECT':
          return <Select
                    size="large"
                    dataSource={this.state.dataSource}
                    disabled={ele.isReadonly}
                    placeholder={"请输入"+ele.label}
                    className="custom-select"
                    {...init(ele.name,
                      { rules:[{ required: ele.isRequired, message: `${ele.label}不能为空` }]}
                    )}>
                    {
                      ele.options && ele.options.map((opt,ide) => (
                        <div value={opt.value} key={ide}>{opt.label}</div>
                      ))
                    }
                  </Select>
        case 'STRING':
          return <Input
                  trim
                  size="large"
                  placeholder={"请输入"+ ele.label}
                  disabled={ele.isReadonly}
                  className='custom-input'
                  {...init(ele.name,
                    {
                      rules:[{ required: ele.isRequired, message:`${ele.label}不能为空` }],
                      props:{ onBlur:() => this.warnTips(ele.name) }
                    }
                  )}
                />
        case 'DECIMAL':
          return <Input
                  trim
                  size="large"
                  disabled={ele.isReadonly}
                  hasLimitHint={true}
                  placeholder={"请输入"+ele.label}
                  htmlType='number'
                  className='custom-input'
                  {...init(ele.name,
                    {
                      rules:[
                        { required: ele.isRequired, message:`${ele.label}不能为空`}
                      ]
                    }
                  )}
                />
        case 'INT':
          return <NumberPicker
                  size="large"
                  disabled={ele.isReadonly}
                  value={this.state.month}
                  type="inline"
                  placeholder={"请输入"+ele.label}
                  {...init(ele.name,
                    { rules:[{ required: ele.isRequired, message: `${ele.label}不能为空` }] }
                  )}
                />
      }
    }
    console.log(list)
    return (
      !productId ?
        <IceContainer className="pch-container">
          <legend className="pch-legend" >
            <span className="pch-legend-legline"></span>车贷申请
          </legend>
          <IceFormBinderWrapper value={value} onChange={this.formChange} className='loan'>
            <Row  className='modify-page'>
              <Col span="3">
                <div className='title'>
                  <ul>{this.renderTitle()}</ul>
                </div>
              </Col>
              <Col span="21" className='modify-form pch-form'>
                  1231
              </Col>
            </Row>
          </IceFormBinderWrapper>
        </IceContainer> : <div>接口未提供暂时未开发</div>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
  botton:{
    backgroundColor :'#FC9E25'
  },
  select:{
    width:'200px'
  }
};


export default BasicInformation;
