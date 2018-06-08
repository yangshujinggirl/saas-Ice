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
import { PchDialog } from 'components';
import './index.scss';

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

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
  }
  onOk() {
    const { actionStatus } = this.props.templateObj;
    this.props.submit(actionStatus);
  }
  //渲染title
  dialogTitle (){
    let { actionStatus, isBind } = this.props.templateObj;
    switch(actionStatus) {
      case 1:
         if(isBind) {
           return '该模板已绑定以下产品，启用后均能生效，您确定要启用吗?';
         } else {
           return '您确定要启用该模板吗?';
         }
         break;
      case 2:
         if(isBind) {
           return '该模板已绑定以下产品，您确定要停用吗?';
         } else {
           return '您确定要停用该模板吗?';
         }
         break;
      case 999:
         if(isBind) {
           return '该模板目前已被以下产品绑定，您确定删除吗?';
         } else {
           return '您确定删除该模板吗？';
         }
         break;
       default:
        return '';
        break;
    }
  }

  render() {
      const { templateObj, onCancel, visible } = this.props;
      //初始化checked
      const defaultValue =()=> (
        templateObj.productList.map((ele) => (
            ele.value
        ))
      )
      return (
        <PchDialog
          title={this.dialogTitle()}
          submitText="确认"
          cancelText="取消"
          visible={visible}
          onOk={()=>this.onOk()}
          onCancel={()=>onCancel()}
          footer={[]}>
          {
            templateObj.productList.length>0 &&
              <div className="pch-form contract-template-dialog-content">
                  <Row wrap className="check-group-list">
                    <Col span={24}>
                      <CheckboxGroup
                        className="check-group-style"
                        value={defaultValue()}
                        dataSource={templateObj.productList}
                        disabled>
                      </CheckboxGroup>
                    </Col>
                  </Row>
              </div>
            }
        </PchDialog>
    );
  }
}

export default DialogModule;
