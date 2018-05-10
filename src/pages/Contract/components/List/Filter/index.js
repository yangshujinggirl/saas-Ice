import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};
//获取下拉
import { company_type } from '../../../config'

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      value:{}
    }
  }
  //新增
  handleAdd() {
    let path = {
        pathname: 'contract/add',
        state: {
            code: '21',
            name: '22'
        }
    }
    hashHistory.push(path)
  }
  //查询
  handleSubmit() {
    this.refs.form.validateAll((errors, values) => {
      this.props.onSubmit && this.props.onSubmit(values);
    });
  }
  //重置
  resetSubmit() {
    this.setState({
      value:{
        templateCode:'',
        templateName:''
      }
    })
    this.props.onSubmit && this.props.onSubmit();
  }

  render() {
      return (
        <div className="pch-condition">
            <IceFormBinderWrapper ref="form" value={this.state.value}>
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col xxs={24} xs={12} l={8} xl={8}>
                    <FormItem {...formItemLayout} label="模板编号:">
                      <IceFormBinder name="templateCode">
                          <Input size="large" />
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col xxs={24} xs={12} l={8} xl={8}>
                    <FormItem {...formItemLayout} label="模板名称:">
                      <IceFormBinder name="templateName">
                          <Input size="large" />
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col xxs={24} xs={12} l={8} xl={8}>
                    <FormItem className="pch-condition-operate">
                      <Button onClick={this.handleSubmit.bind(this)} type="secondary">
                          查询
                      </Button>
                      <Button onClick={this.resetSubmit.bind(this)} type="secondary">
                          重置
                      </Button>
                    </FormItem>
                  </Col>
                  <Col xxs={24} xs={12} l={8} xl={8}>
                    <label className="next-col-6 next-form-item-label">
                      <Button onClick={this.handleAdd.bind(this)} type="primary">
                        新增
                      </Button>
                    </label>
                  </Col>
                </Row>
              </Form>
            </IceFormBinderWrapper>
        </div>
    );
  }
}

export default Filter;
