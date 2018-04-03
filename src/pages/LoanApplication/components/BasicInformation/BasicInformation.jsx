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
      trigger={<span>{name}</span>}
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
      optionList:[],
      productId:this.props.params.id,
      dataSource:[],
      month:1
    };
    this.field = new Field(this)
  }
  componentWillMount() {
    this.getProductNum()
  }
  checkNum(rule, value, callback) {
    if(value && value.length>6) {
      callback("请输入合适的金额")
    }else {
      callback();
    }
  }
  getProductNum() {
    Req.getProductNumApi()
    .then((res) => {
      console.log(res)
      const { data } = res;
      const { list } = data;
      let dataSource = list.map((el) => {
        return {
          label:el.productCode,
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
    const { productId } = this.state;
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
        this.secondsfrom()
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
    const { pageData } = this.props;
    const { init } = this.field;

    let Mod;
    let InputMod = (ele) => {
      switch(ele.type) {
        case 'SELECT':
          return <Select
                    style={styles.select}
                    dataSource={this.state.dataSource}
                    {...init(ele.name,
                      { rules:[{ required: true, message: `${ele.label}不能为空` }]}
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
                  placeholder={ele.type}
                  htmlType='text'
                  {...init(ele.name,
                    {
                      rules:[{ required: true, message:`${ele.label}不能为空` }],
                      props:{ onBlur:()=> this.warnTips(ele.name) }
                    }
                  )}
                />
        case 'DECIMAL':
          return <Input
                  trim
                  style={styles.select}
                  hasLimitHint={true}
                  placeholder={ele.type}
                  htmlType='number'
                  {...init(ele.name,
                    {
                      rules:[
                        { required: true, message:`${ele.label}不能为空` ,min:2},
                        { validator: this.checkNum }
                      ]
                    }
                  )}
                />
        case 'INT':
          return <NumberPicker
                  value={this.state.month}
                  type="inline"
                  step={2}
                  min={1}
                  max={12}
                  {...init(ele.name,
                    { rules:[{ required: true, message: `${ele.label}不能为空` }] }
                  )}
                />
      }
    }
    return (
      <div className="content-editor">
        <IceFormBinderWrapper>
          <IceContainer title="车贷申请" className='subtitle'>
            <Form
              labelAlign="left"
              style={styles.form}
              field={this.field}>
              <Row  align="top" wrap>
                {
                  pageData.length>0 && pageData[0].fields.map((ele,index) => (
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
      </div>
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
