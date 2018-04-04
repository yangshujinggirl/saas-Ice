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

const { Options } = Select;
const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
};
const labels =(name)=> (
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
    const limit = 20;
    Req.getProductNumApi(limit)
    .then((res) => {
      const { data } = res;
      const { list } = data;
      let dataSource = list.map((el) => {
        return {
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
    },(error)=> {
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
  render() {
    const { list=[] } = this.props.pageData;
    const { init } = this.field;
    const { productId } = this.state;
    let Mod;
    let InputMod = (ele) => {
      switch(ele.type) {
        case 'SELECT':
          return <Select
                    style={styles.select}
                    dataSource={this.state.dataSource}
                    disabled={ele.isReadonly}
                    placeholder={"请输入"+ele.label}
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
                  style={styles.select}
                  placeholder={"请输入"+ ele.label}
                  htmlType='text'
                  disabled={ele.isReadonly}
                  {...init(ele.name,
                    {
                      rules:[{ required: ele.isRequired, message:`${ele.label}不能为空` }],
                      props:{ onBlur:()=> this.warnTips(ele.name) }
                    }
                  )}
                />
        case 'DECIMAL':
          return <Input
                  trim
                  disabled={ele.isReadonly}
                  style={styles.select}
                  hasLimitHint={true}
                  placeholder={"请输入"+ele.label}
                  htmlType='number'
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
      !productId ?  <div className="content-editor">
        <IceFormBinderWrapper>
          <IceContainer title="车贷申请" className='subtitle'>
            <Form
              labelAlign="left"
              style={styles.form}
              field={this.field}>
              <Row  align="top" wrap>
                {
                  list.length>0 && list[0].fields && list[0].fields.map((ele,index) => (
                    <Col span={6} key={index}>
                      <FormItem {...formItemLayout} label={labels(ele.label)}>
                        {
                          InputMod(ele)
                        }

                      </FormItem>
                    </Col>
                    ))
                  }
              </Row>
              <Row style={{ marginTop: 24 }} >
                <Col offset="10" className ='botton-col'>
                  <Button
                    type="primary" onClick={this.handleSubmit.bind(this)}>
                    下一步
                  </Button>
                </Col>
              </Row>
            </Form>
          </IceContainer>
        </IceFormBinderWrapper>
      </div> : <div>接口未提供暂时未开发</div>
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
