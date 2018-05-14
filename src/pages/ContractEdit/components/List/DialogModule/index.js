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

import { PchDialog } from 'components';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 14
    }
};
const label =(name) => (
  <span><span className="label-required">*</span>{name}:</span>
);

const dataSource = [
        {label:'客户取消贷款', value:'客户取消贷款', type:'cancel'},
        {label:'客户更改贷款产品', value:'客户更改贷款产品', type:'change'},
        {label:'其他', value:'其他',type:'other'}
      ]
class DialogModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:this.props.visible,
      otherReason:false,
      value:{}
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
      if(errors) {
        return
      }
      let params = Object.assign(values, { action:status,contractId });
      this.props.submit(params);
    });
  }
  onClose() {
    this.setState({
      visible:false
    })
  }
  selectedEvent(value,option) {
    if(option.type == 'other') {
      this.setState({
        otherReason:true
      })
    } else {
      this.setState({
        otherReason:false
      })
    }
  }
  render() {
      const { dialogObj } = this.props;
      const { visible, otherReason, value } = this.state;
      return (
        <PchDialog
          title={'合同取消'}
          visible={visible}
          onOk={()=>this.onOk()}
          onClose={()=>this.onClose()}
          footer={[]}>
          <div className="pch-form">
            <IceFormBinderWrapper ref="form" value={value}>
              <Form size="large" direction="hoz">
                <Row wrap>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label={label('请选择取消原因')}>
                      <IceFormBinder
                        required
                        message="请选择取消原因"
                        name="reason">
                          <Select
                            dataSource={dataSource}
                            size="large"
                            onChange={this.selectedEvent.bind(this)}/>
                      </IceFormBinder>
                      <div><IceFormError name="reason" /></div>
                    </FormItem>
                  </Col>
                  {
                    otherReason && <Col span={24}>
                                      <FormItem {...formItemLayout} label={label('请输入(200字符)')}>
                                        <IceFormBinder
                                          required
                                          message="请输入具体原因"
                                          name="memo">
                                            <Input size="large" multiple maxLength={200} hasLimitHint />
                                        </IceFormBinder>
                                        <div><IceFormError name="memo" /></div>
                                      </FormItem>
                                    </Col>
                  }
                </Row>
              </Form>
            </IceFormBinderWrapper>
          </div>
        </PchDialog>
    );
  }
}

export default DialogModule;
