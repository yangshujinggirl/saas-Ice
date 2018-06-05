import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const dataSource = [
  {label:'全部', value:'ALL'},
  {label:'待签收', value:'CLAIM'},
  {label:'待审核', value:'SIGNED'},
  {label:'退回', value:'BACK'},
  {label:'拒绝', value:'REJECT'},
  {label:'通过', value:'PASS'},
]
import { Feedback, Field } from '@icedesign/base/index';

export default class Filter extends BaseCondition {
    field = new Field(this);
    constructor() {
        super();

        // 搜索框表单的对应的值，可以设置默认值
        this.state = {
            value: {
              limit:10,
            },
            submitStart: null,
            submitEnd: null,
            endOpen: false
        };
    }

    handleSubmit() {
        const {submitStart, submitEnd} = this.state.value;
        if(submitStart){
          var value = this.formatDateTime(submitStart)
          this.onChange1("submitStart", value);
        }
        if(submitEnd){
          var value = this.formatDateTime(submitEnd)
          this.onChange1("submitEnd", value);
        }
        this.props.onSubmit && this.props.onSubmit(this.state.value);
    }
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
      this.onChange("submitStart", value);
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
    disabledEndDate(submitEnd) {
      const { submitStart } = this.state;
      if (!submitEnd || !submitStart) {
        return false;
      }
      return submitEnd.valueOf() <= submitStart.valueOf();
    }
    disabledStartDate(submitStart) {
      const { submitEnd } = this.state;
      if (!submitStart || !submitEnd) {
        return false;
      }
      return submitStart.valueOf() > submitEnd.valueOf();
    }

    render() {
      const { submitStart, submitEnd } = this.state.value;
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
                              name="submitStart"
                              // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                              // valueFormatter={(date, dateStr) => dateStr}
                            >
                              <DatePicker
                                format={'YYYY-MM-DD HH:mm:ss'}
                                disabledDate={this.disabledStartDate.bind(this)}
                                size="large"
                                showTime
                                value={submitStart}
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
                              name="submitEnd"
                              // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                              // valueFormatter={(date, dateStr) => dateStr}
                            >
                              <DatePicker
                                format={'YYYY-MM-DD HH:mm:ss'}
                                showTime
                                size="large"
                                disabledDate={this.disabledEndDate.bind(this)}
                                placeholder="申请结束时间"
                                value={submitEnd}
                                onChange={this.onEndChange.bind(this)}
                                // onOpenChange={this.handleEndOpenChange.bind(this)}
                              />
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
                          <FormItem {...this.formItemLayout} label="状态：">
                            <IceFormBinder
                              name="status"
                            >
                              <Select size="large" dataSource={dataSource}></Select>
                            </IceFormBinder>
                          </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                          <FormItem {...this.formItemLayout} label="&nbsp;" className="pch-condition-operate">
                            <Button onClick={this.handleSubmit.bind(this)} type="secondary">
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
