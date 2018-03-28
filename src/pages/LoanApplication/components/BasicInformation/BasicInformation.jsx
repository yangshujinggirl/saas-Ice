import React, { Component } from 'react';
import {hashHistory} from 'react-router';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, Field } from '@icedesign/base';
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
  wrapperCol: { span: 16 }
};

const dataList = {
  "fields": [
        {
          "name": "自定义区域",
          "fields": [{
              "id": 1808,
              "name": "custom.field2557089287270354937398",
              "label": "单元测试新增界面方案-自定义字段",
              "fieldset": "自定义区域",
              "isFixed": false,
              "isOptional": false,
              "isCustom": true,
              "isRequired": false,
              "isRepeatable": false,
              "orderId": 1,
              "fieldsetOrder": 10,
              "screenSchemeId": 255,
              "fieldId": 1444
          }]
        },
        {
            "name": "基本信息",
            "fields": [
              {
                "id": 1807,
                "name": "borrowerIdType",
                "label": "展厅名称",
                "fieldset": "基本信息",
                "type": "SELECT",
                "isFixed": true,
                "isOptional": false,
                "isCustom": false,
                "isRequired": true,
                "isRepeatable": false,
                "orderId": 4,
                "options": [
                  {
                    "id": 1000018,
                    "label": "身份证",
                    "value": "身份证",
                    "status": 1,
                    "version": 1
                  },
                  {
                      "id": 1000019,
                      "label": "户口簿",
                      "value": "户口簿",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000020,
                      "label": "中国护照",
                      "value": "中国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000021,
                      "label": "士兵证",
                      "value": "士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000022,
                      "label": "港澳居民往来内地通行证",
                      "value": "港澳居民往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000023,
                      "label": "台湾同胞往来内地通行证",
                      "value": "台湾同胞往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000024,
                      "label": "临时身份证",
                      "value": "临时身份证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000025,
                      "label": "外国人居留证",
                      "value": "外国人居留证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000026,
                      "label": "警官证",
                      "value": "警官证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000027,
                      "label": "军人文职干部证",
                      "value": "军人文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000028,
                      "label": "武警士兵证",
                      "value": "武警士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000029,
                      "label": "武警文职干部证",
                      "value": "武警文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000030,
                      "label": "外国护照",
                      "value": "外国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000031,
                      "label": "营业执照",
                      "value": "营业执照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000032,
                      "label": "组织机构代码证",
                      "value": "组织机构代码证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000033,
                      "label": "其他个人证件",
                      "value": "其他个人证件",
                      "status": 1,
                      "version": 1
                  }],
                  "fieldsetOrder": 1,
                  "screenSchemeId": 255,
                  "fieldId": 1003
              },
              {
                "id": 1808,
                "name": "proIdType",
                "label": "证件类型",
                "fieldset": "基本信息",
                "type": "SELECT",
                "isFixed": true,
                "isOptional": false,
                "isCustom": false,
                "isRequired": true,
                "isRepeatable": false,
                "orderId": 4,
                "options": [
                  {
                    "id": 1000018,
                    "label": "身份证",
                    "value": "身份证",
                    "status": 1,
                    "version": 1
                  },
                  {
                      "id": 1000019,
                      "label": "户口簿",
                      "value": "户口簿",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000020,
                      "label": "中国护照",
                      "value": "中国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000021,
                      "label": "士兵证",
                      "value": "士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000022,
                      "label": "港澳居民往来内地通行证",
                      "value": "港澳居民往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000023,
                      "label": "台湾同胞往来内地通行证",
                      "value": "台湾同胞往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000024,
                      "label": "临时身份证",
                      "value": "临时身份证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000025,
                      "label": "外国人居留证",
                      "value": "外国人居留证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000026,
                      "label": "警官证",
                      "value": "警官证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000027,
                      "label": "军人文职干部证",
                      "value": "军人文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000028,
                      "label": "武警士兵证",
                      "value": "武警士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000029,
                      "label": "武警文职干部证",
                      "value": "武警文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000030,
                      "label": "外国护照",
                      "value": "外国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000031,
                      "label": "营业执照",
                      "value": "营业执照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000032,
                      "label": "组织机构代码证",
                      "value": "组织机构代码证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000033,
                      "label": "其他个人证件",
                      "value": "其他个人证件",
                      "status": 1,
                      "version": 1
                  }],
                  "fieldsetOrder": 1,
                  "screenSchemeId": 255,
                  "fieldId": 1003
              },
              {
                "id": 1808,
                "name": "cIdType",
                "label": "证件类型",
                "fieldset": "基本信息",
                "type": "SELECT",
                "isFixed": true,
                "isOptional": false,
                "isCustom": false,
                "isRequired": false,
                "isRepeatable": false,
                "orderId": 4,
                "options": [
                  {
                    "id": 1000018,
                    "label": "身份证",
                    "value": "身份证",
                    "status": 1,
                    "version": 1
                  },
                  {
                      "id": 1000019,
                      "label": "户口簿",
                      "value": "户口簿",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000020,
                      "label": "中国护照",
                      "value": "中国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000021,
                      "label": "士兵证",
                      "value": "士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000022,
                      "label": "港澳居民往来内地通行证",
                      "value": "港澳居民往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000023,
                      "label": "台湾同胞往来内地通行证",
                      "value": "台湾同胞往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000024,
                      "label": "临时身份证",
                      "value": "临时身份证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000025,
                      "label": "外国人居留证",
                      "value": "外国人居留证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000026,
                      "label": "警官证",
                      "value": "警官证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000027,
                      "label": "军人文职干部证",
                      "value": "军人文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000028,
                      "label": "武警士兵证",
                      "value": "武警士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000029,
                      "label": "武警文职干部证",
                      "value": "武警文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000030,
                      "label": "外国护照",
                      "value": "外国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000031,
                      "label": "营业执照",
                      "value": "营业执照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000032,
                      "label": "组织机构代码证",
                      "value": "组织机构代码证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000033,
                      "label": "其他个人证件",
                      "value": "其他个人证件",
                      "status": 1,
                      "version": 1
                  }],
                  "fieldsetOrder": 1,
                  "screenSchemeId": 255,
                  "fieldId": 1003
              },
              {
                "id": 1808,
                "name": "dIdType",
                "label": "证件类型",
                "fieldset": "基本信息",
                "type": "SELECT",
                "isFixed": true,
                "isOptional": false,
                "isCustom": false,
                "isRequired": true,
                "isRepeatable": false,
                "orderId": 4,
                "options": [
                  {
                    "id": 1000018,
                    "label": "身份证",
                    "value": "身份证",
                    "status": 1,
                    "version": 1
                  },
                  {
                      "id": 1000019,
                      "label": "户口簿",
                      "value": "户口簿",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000020,
                      "label": "中国护照",
                      "value": "中国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000021,
                      "label": "士兵证",
                      "value": "士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000022,
                      "label": "港澳居民往来内地通行证",
                      "value": "港澳居民往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000023,
                      "label": "台湾同胞往来内地通行证",
                      "value": "台湾同胞往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000024,
                      "label": "临时身份证",
                      "value": "临时身份证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000025,
                      "label": "外国人居留证",
                      "value": "外国人居留证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000026,
                      "label": "警官证",
                      "value": "警官证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000027,
                      "label": "军人文职干部证",
                      "value": "军人文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000028,
                      "label": "武警士兵证",
                      "value": "武警士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000029,
                      "label": "武警文职干部证",
                      "value": "武警文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000030,
                      "label": "外国护照",
                      "value": "外国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000031,
                      "label": "营业执照",
                      "value": "营业执照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000032,
                      "label": "组织机构代码证",
                      "value": "组织机构代码证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000033,
                      "label": "其他个人证件",
                      "value": "其他个人证件",
                      "status": 1,
                      "version": 1
                  }],
                  "fieldsetOrder": 1,
                  "screenSchemeId": 255,
                  "fieldId": 1003
              },
              {
                "id": 1808,
                "name": "mIdType",
                "label": "证件类型",
                "fieldset": "基本信息",
                "type": "SELECT",
                "isFixed": true,
                "isOptional": false,
                "isCustom": false,
                "isRequired": true,
                "isRepeatable": false,
                "orderId": 4,
                "options": [
                  {
                    "id": 1000018,
                    "label": "身份证",
                    "value": "身份证",
                    "status": 1,
                    "version": 1
                  },
                  {
                      "id": 1000019,
                      "label": "户口簿",
                      "value": "户口簿",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000020,
                      "label": "中国护照",
                      "value": "中国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000021,
                      "label": "士兵证",
                      "value": "士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000022,
                      "label": "港澳居民往来内地通行证",
                      "value": "港澳居民往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000023,
                      "label": "台湾同胞往来内地通行证",
                      "value": "台湾同胞往来内地通行证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000024,
                      "label": "临时身份证",
                      "value": "临时身份证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000025,
                      "label": "外国人居留证",
                      "value": "外国人居留证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000026,
                      "label": "警官证",
                      "value": "警官证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000027,
                      "label": "军人文职干部证",
                      "value": "军人文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000028,
                      "label": "武警士兵证",
                      "value": "武警士兵证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000029,
                      "label": "武警文职干部证",
                      "value": "武警文职干部证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000030,
                      "label": "外国护照",
                      "value": "外国护照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000031,
                      "label": "营业执照",
                      "value": "营业执照",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000032,
                      "label": "组织机构代码证",
                      "value": "组织机构代码证",
                      "status": 1,
                      "version": 1
                  },
                  {
                      "id": 1000033,
                      "label": "其他个人证件",
                      "value": "其他个人证件",
                      "status": 1,
                      "version": 1
                  }],
                  "fieldsetOrder": 1,
                  "screenSchemeId": 255,
                  "fieldId": 1003
              }
            ]
        }]
}

class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedInfoList:(dataList.fields)[1],
      productId:this.props.params.id
    };
    this.field = new Field(this)
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
      hashHistory.push(`/loanapplication/config/${productId}`)
    },(error)=> {
      console.log(error)
    })
    hashHistory.push(`/loanapplication/config/${productId}`)
  }

  render() {
    const { fixedInfoList } = this.state;
    const { init } = this.field;

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
                  fixedInfoList.fields.map((ele,index) => (
                    <Col span={6} key={index}>
                      <FormItem {...formItemLayout} label={ele.label}>
                        <Select
                          style={styles.select}
                          {...init(ele.name,
                            { rules:[{ required: true, message: "请填写信息" }] }
                          )}>
                          {
                            ele.options.map((opt,ide) => (
                              <div value={opt.label} key={ide}>{opt.label}</div>
                            ))
                          }
                        </Select>
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
