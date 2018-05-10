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
      visible:this.props.visible
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      visible:props.visible
    })
  }
  onOk() {
    const { id, actionStatus } = this.props.templateObj;
    this.props.submit(id,actionStatus);
  }
  onClose() {
    this.setState({
      visible:false
    })
  }
  //渲染title
  dialogTitle (){
    let { actionStatus, isBind } = this.props.templateObj;
    switch(actionStatus) {
      case 1:
         if(isBind) {
           return '该模板已绑定以下产品，启用后均能生效，您确定要启用吗';
         } else {
           return '您确定要启用该模板吗?';
         }
         break;
      case 2:
         if(isBind) {
           return '该模板已绑定以下产品，您确定要停用吗';
         } else {
           return '您确定要停用该模板吗?';
         }
         break;
      case 999:
         if(isBind) {
           return '该模板目前已被以下产品绑定，您确定删除吗？';
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
      const { templateObj, productList } = this.props;
      //初始化checked
      const defaultValue =()=> (
        templateObj.productList.length>0 ?
        templateObj.productList.map((ele) => (
            ele.value
        ))
        :
        []
      )
      console.log(templateObj)

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
                <h2 className="title">{this.dialogTitle()}</h2>
                <Row wrap>
                  <Col span={24}>
                    <FormItem {...formItemLayout}>
                      <IceFormBinder
                        name="result">
                        <CheckboxGroup
                          className="check-group-style"
                          value={defaultValue()}
                          dataSource={templateObj.productList}
                          disabled>
                        </CheckboxGroup>
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
