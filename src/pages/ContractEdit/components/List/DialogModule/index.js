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
        span: 10
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
  onOk() {
    const { status, contractId } = this.props.dialogObj;
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if(errors) {
        return
      }
      let params = {
        action:status,
        contractId,
        reason:this.refs.form.getter('reason'),
        memo:this.refs.form.getter('memo')
      }
      this.props.submit(params);
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
  //渲染title
  dialogLabel (){
    let { status } = this.props.dialogObj;
    switch(status) {
      case 2:
      return {
        labelOne:'请选择取消原因',
        labelTwo:'请输入(200字符)'
      }
         break;
      case 3:
         return {
           labelOne:'请选退回步骤',
           labelTwo:'请输入退回原因'
         }
         break;
       default:
        return {};
        break;
    }
  }

  render() {
      const { dialogObj } = this.props;
      return (
        <Dialog
          visible={this.state.visible}
          onCancel={()=>this.onClose()}
          onClose={()=>this.onClose()}
          className="contract-edit-dialog-wrap"
          footer={[]}
        >
          <div className="pch-form contract-edit-dialog-content">
            <IceFormBinderWrapper ref="form">
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={label(this.dialogLabel().labelOne)}>
                      <IceFormBinder
                        required
                        message="请选择取消原因"
                        name="reason">
                          <Select dataSource={dialogObj.dataSource} size="large"/>
                      </IceFormBinder>
                      <div><IceFormError name="reason" /></div>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={label(this.dialogLabel().labelTwo)}>
                      <IceFormBinder
                        required
                        message="请输入字符"
                        name="memo">
                          <Input size="large" multiple maxLength={200} hasLimitHint />
                      </IceFormBinder>
                      <div><IceFormError name="memo" /></div>
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
