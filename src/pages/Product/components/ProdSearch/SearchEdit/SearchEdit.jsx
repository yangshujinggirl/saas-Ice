import React, { Component } from 'react';
import { Router, Route, Link ,hashHistory} from 'react-router';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import './SearchEdit.scss';

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Table,
  Pagination,
  Form,
} from '@icedesign/base';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
//组件引入
// import SearchEditer from './searchEditer/searchEditer';
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: {
    span: 12
  }
};

export default class SearchEdit extends Component {
  static displayName = 'SearchEdit';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      values:{
        
      }
    };

  }
  componentWillMount(){ 
  
  }
  componentDidMount() {
    let {actions,prodInfo, params} = this.props;
    this.props.actions.edit(params.id);
    actions.getDetail(params.id);
    console.log(this.props)
    
  }
  upData=()=>{
    let {actions,pageData,params} = this.props;
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
        return;
      }
      // 提交当前填写的数据
      value.effectiveDate=value.time[0]
      value.expirationDate=value.time[1]
      this.props.actions.prodrevise(value);//
      location.reload ()
    });
  }
  render() {
    let prodInfo = this.props.prodInfo;
    let {formData} = this.props
    let name = formData.product|| {}
        name= name.name ||''
    console.log(name)
    let dataSource = [];
    if(prodInfo){
      dataSource = prodInfo.data;
    }
    dataSource && dataSource.map((item) => {
      let temptime = [];
      if (item.times){
        item.temptime = item.times.join('~')
      }
      switch (item.status) {
        case 1:
          item.status ='生效'
          break;
        case 0:
        item.status ='关闭'
        break;
        case 2:
        item.status ='失效'
        break;
      
        default:
          break;
      }
    })

    return (
      <div className="create-activity-form" style={styles.container}>
        <IceContainer className="pch-container">
          <legend className="pch-legend">
            <span className="pch-legend-legline"></span>产品编辑
          </legend>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={{
                    name:name,
                    id:this.props.params.id,
                    status:undefined}}
          >
            <div className="pch-form">
              <Form
                style={{width: '80%'}}
                size="large"
                labelAlign="left">
                <Row wrap>
                  <Col s={12} l={12}>
                  <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>产品名称</span>}>
                    <IceFormBinder
                      name="name"
                      message="产品名称必填"
                    >
                      <Input size="large" placeholder="产品名称" value={name} className="custom-input" />
                    </IceFormBinder>
                    <div><IceFormError name="name" /></div>
                    </FormItem>
                  </Col>
                  <Col s={12} l={12}>
                  <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>生效期限</span>}>
                    <IceFormBinder
                      name="time"
                      required
                      message="生效日期必填"
                      valueFormatter={(date, dateStr) => dateStr}
                    >
                      <RangePicker size="large" format={"YYYY-MM-DD"} className="custom-select"/> 
                    </IceFormBinder>
                    <div><IceFormError name="time" /></div>
                   </FormItem>
                  </Col>
                  <Col s={12} l={12}>
                  <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>流程名称</span>}>
                    <IceFormBinder
                        name="lineName"
                        required
                        message="流程名称必填"
                      >
                        <Select
                          placeholder="请选择"
                          className="custom-select"
                          hasClear={true}
                          size="large"
                        >
                          <Option value="ONE">1</Option>
                          <Option value="TWO">2</Option>
                        </Select>
                      </IceFormBinder>
                      <div><IceFormError name="lineName" /></div>
                      </FormItem>
                  </Col>
                  <Col s={12} l={12}>
                  <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>状态</span>}>
                    <IceFormBinder
                        name="status"
                        required
                        message="状态必填"
                      >
                        <Select
                          className="custom-select"
                          hasClear={true}
                          placeholder="请选择"
                          size="large"
                        >
                          <Option value="1">生效</Option>
                          <Option value="0">关闭</Option>
                          <Option value="2">失效</Option>
                      </Select>
                    </IceFormBinder>
                    <div><IceFormError name="status" /></div>
                    </FormItem>
                  </Col>
                  <Col s={12} l={12}></Col>
                  <Col s={12} l={12}>
                    <FormItem {...formItemLayout} label="&nbsp;">
                      <Button type="secondary" onClick={this.upData}>确定</Button>
                      <Button onClick={()=>{javascript:history.back(-1);}} style={{marginLeft: 8}}>返回</Button>
                    </FormItem>
                  </Col>
                </Row>
                </Form>
                <Table
                  dataSource={dataSource}
                  isLoading={this.state.isLoading}
                  style={{width:"80%"}}
                  sort={{id :'=desc'}}
                >
                  <Table.Column title="版本" dataIndex="id" width={120} />
                  <Table.Column title="生效期限" dataIndex="temptime" width={250} />
                  <Table.Column title="状态" dataIndex="status" width={160} />
                  <Table.Column title="流程" dataIndex="template" width={100} />
                  <Table.Column title="时间" dataIndex="operateAt" width={120} />
                  <Table.Column title="操作人" dataIndex="operateName" width={120} />
              </Table>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>    
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  legend: {
    marginLeft: 0,
    paddingLeft: '15px',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: '#fff',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '25px',
  },
  legLine: {
    display: 'inline-block',
    zoom: 1,
    verticalAlign: 'top',
    marginRight: '12px',
    width: '4px',
    height: '25px',
    backgroundColor: '#ec9d00',
  },
  fieldBox: {
    margin: '0 15px',
    padding: '25px 0 0 0',
    borderTop: '1px solid #d8d8d8',
  },
  formItem: {
    height: '28px',
    lineHeight: '33px',
    marginBottom: '25px',
  },
  formLabel: {
    marginLeft: '85px',
    textAlign: 'right',
  },
  btns: {
    width: '90px',
    height: '32px',
    lineHeight: '32px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    color: '#fff',
    backgroundColor:'#ec9d00'
  },
  searchTable: {
    width: '1400px',
    margin: '25px',
  },
  pagination: {
    textAlign: 'left',
    paddingTop: '26px',
  },
};
