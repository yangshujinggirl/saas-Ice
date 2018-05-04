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
        span: 8
    },
    wrapperCol: {
        span: 12
    }
};
//获取下拉
import { company_type } from '../../../config'

class Filter extends Component {
  constructor() {
    super();
  }

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

  filterFormChange = (value) => {
    this.setState({
        value: value,
    });
  }

  handleSubmit() {
    this.refs.form.validateAll((errors, values) => {
      this.props.onSubmit && this.props.onSubmit(values);
    });
  }

  render() {
      return (
        <div className="pch-condition">
            <IceFormBinderWrapper ref="form">
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col xxs={24} xs={12} l={8} xl={6}>
                    <FormItem {...formItemLayout} label="模板编号:">
                      <IceFormBinder name="templateName">
                          <Input size="large" />
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col xxs={24} xs={12} l={8} xl={6}>
                    <FormItem {...formItemLayout} label="模板名称:">
                      <IceFormBinder name="templateCode">
                          <Input size="large" />
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col xxs={24} xs={12} l={8} xl={6}>
                    <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
                      <Button onClick={this.handleSubmit.bind(this)} type="secondary">
                          查询
                      </Button>
                      <Button onClick={this.handleAdd.bind(this)} type="primary">
                          新增
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

export default Filter;
