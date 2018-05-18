import React, { Component } from 'react';
import { Form, Input, Grid, Select, Button, DatePicker,Feedback,Field} from '@icedesign/base';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base';

const { Row, Col } = Grid;
const { Option } = Select;
const FormItem = Form.Item;

const dataSource = [
  {label:'待提交', value:'DRAFT'},
  {label:'退回', value:'RETURNED'},
  {label:'提交', value:'SUBMIT'},
  {label:'审查审批', value:'AUDIT'},
  {label:'补录', value:'MAKEUP'},
  {label:'审批拒绝', value:'REJECTED'},
  {label:'面签', value:'INTERVIEW'},
  {label:'出账申请', value:'LENDING_APPLY'},
  {label:'出账审核', value:'LENDING_AUDIT'},
  {label:'已放款', value:'LENDING'},
]

export default class Filter extends BaseCondition {
  static displayName = 'Filter';
  field = new Field(this);
  constructor() {
    super();

    // 搜索框表单的对应的值，可以设置默认值
    this.state = {
      value: {
        limit : 10,
      },
      to : null,
      from : null
    };
  }

  handleSubmit = () =>{
    const {to, from} = this.state.value;
    if(to){
      var value = this.formatDateTime(to)
      this.onChange1("to", value);
    }
    if(from){
      var value = this.formatDateTime(from)
      this.onChange1("from", value);
    }

    this.props.onSubmit && this.props.onSubmit(this.state.value);

  }
  // filterFormChange = (value) => {
  //   this.setState({
  //     value: value,
  //   });
  // }
  formatDateTime =(inputTime) => {
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
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  };
  onStartChange(value) {
    this.onChange("from", value);
  }
  onEndChange(value) {
    this.onChange("submitEnd", value);
  }
  onChange1(field, value) {
    let d = this.state.value;
    d[field] = value
    this.setState({
      value: d
    });
    console.log(this.state.value)
  }
  onChange(field, value) {
    this.setState({
      [field]: value
    });
  }
  disabledEndDate(to) {
    const { from } = this.state;
    if (!to || !from) {
      return false;
    }
    return to.valueOf() <= from.valueOf();
  }
  disabledStartDate(from) {
    const { to } = this.state;
    if (!from || !to) {
      return false;
    }
    return from.valueOf() > to.valueOf();
  }
  render() {
    return (
      <div className="pch-condition">
        <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange.bind(this)}>
          <Form size="large" direction="hoz">
            <Row wrap>
              <Col {...this.colspans}>
                <FormItem {...this.formItemLayout} label="贷款编号：">
                  <IceFormBinder
                    name="code"
                  >
                    <Input size="large" placeholder="贷款编号" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col {...this.colspans}>
                <FormItem {...this.formItemLayout} label="主贷人姓名：">
                  <IceFormBinder
                    name="borrowerName"
                  >
                    <Input size="large" placeholder="主贷人姓名" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col {...this.colspans}>
                <FormItem {...this.formItemLayout} label="申请开始时间：">
                  <IceFormBinder
                    name="from"
                  >
                    <DatePicker
                      size="large"
                      format={'YYYY-MM-DD HH:mm:ss'}
                      disabledDate={this.disabledStartDate.bind(this)}
                      showTime
                      style={{width:"100%"}}
                      placeholder="申请开始时间"
                      onChange={this.onStartChange.bind(this)}
                      // onOpenChange={this.handleStartOpenChange.bind(this)}
                    />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col {...this.colspans}>
                <FormItem {...this.formItemLayout} label="申请结束时间：">
                  <IceFormBinder
                    name="to"
                  >
                    <DatePicker
                      size="large"
                      format={'YYYY-MM-DD HH:mm:ss'}
                      showTime
                      disabledDate={this.disabledEndDate.bind(this)}
                      placeholder="申请结束时间"
                      style={{width:"100%"}}
                      onChange={this.onEndChange.bind(this)}
                      // onOpenChange={this.handleEndOpenChange.bind(this)}
                    />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col {...this.colspans}>
                <FormItem {...this.formItemLayout} label="贷款状态：">
                  <IceFormBinder
                    name="status"
                  >
                    <Select size="large" dataSource={dataSource}></Select>
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col {...this.colspans}>
                <FormItem {...this.formItemLayout} label="展厅名称：">
                  <IceFormBinder
                    name="exhibitionHallName"
                  >
                    <Input size="large" placeholder="展厅名称" />
                  </IceFormBinder>
                </FormItem>
              </Col>
              <Col {...this.colspans}>
                <FormItem {...this.formItemLayout} label="&nbsp;" className="pch-condition-operate">
                  <Button onClick={this.handleSubmit.bind(this)} type="secondary" htmlType="submit">
                    查询
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </IceFormBinderWrapper>
      </div>
    );
  }
}
