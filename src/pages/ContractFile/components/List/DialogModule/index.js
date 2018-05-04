import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {
  Dialog,
  Input,
  Grid,
  Select,
  Button,
  DatePicker,
  Form
} from '@icedesign/base';

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import './index.scss'

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 7
    },
    wrapperCol: {
        span: 14
    }
};
const label =(name) => (
  <span><span className="label-required">*</span>{name}:</span>
);

class DialogModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:this.props.visible
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      visible:props.visible
    })
  }
  onClose() {
    this.setState({
      visible:false
    })
  }
  onOk() {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if(errors) {
        return
      };
      this.props.submit();
      this.setState({
        visible:false
      })
    });
  }
  render() {
      const { dialogObj } = this.props;
      return (
        <Dialog
          visible={this.state.visible}
          onCancel={()=>this.onClose()}
          onClose={()=>this.onClose()}
          className="contract-edit-dialog-wrap"
          footer={[]}>
          <div className="pch-form contract-edit-dialog-content">
            <IceFormBinderWrapper ref="form">
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={label(dialogObj.labelOne)}>
                      <IceFormBinder
                        required
                        message="请选择取消原因"
                        name="result">
                          <Select dataSource={dialogObj.dataSource} size="large"/>
                      </IceFormBinder>
                      <div><IceFormError name="result" /></div>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={label(dialogObj.labelTwo)}>
                      <IceFormBinder
                        required
                        message="请输入字符"
                        name="text">
                          <Input size="large" multiple maxLength={200} hasLimitHint />
                      </IceFormBinder>
                      <div><IceFormError name="text" /></div>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <div className="btns-wrap">
                      <Button
                        type="secondary"
                        size="large"
                        onClick={()=>this.onOk()}
                        className="dialog-btn">
                          确认
                      </Button>
                      <Button
                        type="secondary"
                        size="large"
                        onClick={()=>this.onClose()}
                        className="dialog-btn">
                          取消
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </IceFormBinderWrapper>
          </div>
        </Dialog>
    );
  }
}

export default DialogModule;
