import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import {
  Dialog,
  Input,
  Grid,
  Select,
  Button,
  DatePicker,
  Form,
  Checkbox
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
const { Group: CheckboxGroup } = Checkbox;

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
      visible:this.props.visible,
      value:['apple','pear','orange']
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      visible:props.visible
    })
  }
  onOk() {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if(errors) {
        return
      }
      this.props.submit();
      this.setState({
        visible:false
      })
    });
  }
  onClose() {
    this.setState({
      visible:false
    })
  }

  render() {
      const { dialogTitle } = this.props;
      const list = [
        {
          value: "apple",
          label: "苹果"
        },
        {
          value: "pear",
          label: "梨"
        },
        {
          value: "orange",
          label: "橙子"
        }
      ];
      return (
        <Dialog
          visible={this.state.visible}
          onCancel={()=>this.onClose()}
          onClose={()=>this.onClose()}
          className="contract-template-dialog-wrap"
          footer={[]}>
          <div className="pch-form contract-template-dialog-content">
            <IceFormBinderWrapper ref="form">
              <Form size="large" direction="hoz">
                <h2 className="title">{dialogTitle}</h2>
                <Row wrap>
                  <Col span={24}>
                    <FormItem {...formItemLayout}>
                      <IceFormBinder
                        required
                        message="请选择取消原因"
                        name="result">
                        <CheckboxGroup
                          className="check-group-style"
                          value={this.state.value}
                          dataSource={list}/>
                      </IceFormBinder>
                      <div><IceFormError name="result" /></div>
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
