import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;
const Toast = Feedback.toast;
const formItemLayout = {
  labelCol: {
    span: 12
  },
  wrapperCol: {
    span: 12
  }
};
const dataSource = [
  {label:'全部', value:'ALL'},
  {label:'待签收', value:'CLAIM'},
  {label:'待审核', value:'SIGNED'},
  {label:'退回', value:'BACK'},
  {label:'拒绝', value:'REJECT'},
  {label:'通过', value:'PASS'},
]
//获取下拉
import { company_type } from '../../../config'
import { Feedback, Field } from '@icedesign/base/index';

export default class Filter extends Component {
    field = new Field(this);
    constructor() {
        super();

        // 搜索框表单的对应的值，可以设置默认值
        this.state = {
            value: {
              limit:20
            },
            endOpen: false
        };
    }


    filterFormChange = (value) => {
        this.setState({
            value: value,
        });
    }
    handleSubmit() {
        // const {submitStart, submitEnd} = this.state.value;
        // if(submitStart && submitEnd){
        //   if(submitEnd.getTime() <= submitStart.getTime()){
        //         Toast.help("申请开始时间不能大于申请结束时间");
        //         return;
        //   }
        // }
        this.props.onSubmit && this.props.onSubmit(this.state.value);
    }
    onStartChange(value) {
      this.onChange("submitStart", value);
    }
    onEndChange(value) {
      this.onChange("submitEnd", value);
    }
    onChange(field, value) {
      let d = this.state.value;
      d[field] = value
      this.setState({
        value: d
      });
    }
    handleEndOpenChange(open) {
      this.setState({ endOpen: open });
    }
    handleStartOpenChange(open) {
      if (!open) {
        this.setState({ endOpen: true });
      }
    }
    disabledEndDate(submitEnd) {
      const { submitStart } = this.state.value;
      if (!submitEnd || !submitStart) {
        return false;
      }
      return submitEnd.valueOf() <= submitStart.valueOf();
    }
    disabledStartDate(submitStart) {
      const { submitEnd } = this.state.value;
      if (!submitStart || !submitEnd) {
        return false;
      }
      return submitStart.valueOf() > submitEnd.valueOf();
    }

    render() {
        return (
            <div className="pch-condition">
                <IceFormBinderWrapper value={this.state.value} onChange={this.filterFormChange}>
                    <Form size="large" direction="hoz">
                      <Row wrap>
                        <Col s="6" l="6">
                          <FormItem {...formItemLayout} label="贷款编号：">
                            <IceFormBinder
                              name="code"
                            >
                              <Input size="large" placeholder="贷款编号" />
                            </IceFormBinder>
                          </FormItem>

                        </Col>
                        <Col s="6" l="6">
                          <FormItem {...formItemLayout} label="主贷人姓名：">
                            <IceFormBinder
                              name="borrowerName"
                            >
                              <Input size="large" placeholder="主贷人姓名" />
                            </IceFormBinder>
                          </FormItem>
                        </Col>
                        <Col s="6" l="6">
                          <FormItem {...formItemLayout} label="申请开始时间：">
                            <IceFormBinder
                              name="submitStart"
                              // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                              valueFormatter={(date, dateStr) => dateStr}
                            >
                              <DatePicker
                                disabledDate={this.disabledStartDate.bind(this)}
                                showTime
                                size="large"
                                placeholder="申请开始时间"
                                onChange={this.onStartChange.bind(this)}
                                onOpenChange={this.handleStartOpenChange.bind(this)}
                              />
                            </IceFormBinder>
                          </FormItem>
                        </Col>
                        <Col s="6" l="6">
                          <FormItem {...formItemLayout} label="申请结束时间：">
                            <IceFormBinder
                              name="submitEnd"
                              // 使用 RangePicker 组件输出的第二个参数字符串格式的日期
                              valueFormatter={(date, dateStr) => dateStr}
                            >
                              <DatePicker
                                disabledDate={this.disabledEndDate.bind(this)}
                                showTime
                                placeholder="申请结束时间"
                                onChange={this.onEndChange.bind(this)}
                                onOpenChange={this.handleEndOpenChange.bind(this)}
                              />
                            </IceFormBinder>
                          </FormItem>
                        </Col>
                        <Col s="6" l="6">
                          <FormItem {...formItemLayout} label="展厅名称：">
                            <IceFormBinder
                              name="exhibitionHallName"
                            >
                              <Input size="large" placeholder="展厅名称" />
                            </IceFormBinder>
                          </FormItem>
                        </Col>
                        <Col s="6" l="6">
                          <FormItem {...formItemLayout} label="状态：">
                            <IceFormBinder
                              name="status"
                            >
                              <Select dataSource={dataSource}></Select>
                            </IceFormBinder>
                          </FormItem>
                        </Col>
                        <Col s="6" l="6">

                        </Col>
                        <Col s="6" l="6">
                          <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
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
