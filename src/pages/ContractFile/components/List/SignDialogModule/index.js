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
  Upload,
  Feedback
} from '@icedesign/base';

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import './index.scss'
import { PchDialog } from 'components';
import { BaseComponent } from 'base';
import Req from '../../../reqs/ContractFileReq';

const {Row, Col} = Grid;

const FormItem = Form.Item;
const { ImageUpload } = Upload;

const Toast = Feedback.toast;

class SignDialogModule extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      value:{}
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      value:{
        fileIds:props.fileList
      }
    })
  }
  beforeUpload(file) {
    if(file.size > 1024 * 1024 * 5) {
      Toast.error('图片尺寸超过最大限制 5MB，请重新选择！');
      return false;
    }
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          resolve();
        }
        img.src = reader.result;
      }
      reader.readAsDataURL(file)
    })
  }
  //上传文件
  onOk(type) {
    this.refs.form.validateAll((errors, values) => {
      if(errors) {
        return
      };
      let getValues = this.refs.form.getter('fileIds');
      let fileList=[];
      if(getValues.fileList) {
        fileList = getValues.fileList;
      } else {
        fileList = getValues;
      }
      let params = fileList.map((el) => {
        return {
          fileName:el.fileName,
          type:el.type,
          location:el.imgURL
        }
      })
      //提交 or 保存
      if(type == 'submit') {
        this.props.submit(params);
      } else if (type == 'save') {
        this.props.save(params);
      }
    });
  }
  onChange(files) {
    const { fileList } =files;
    if(fileList.length == 0) {
      this.setState({
        value:{fileIds:null}
      })
    }
  }
  render() {
    const { value } = this.state;
    const { visible, onClose } =this.props;
      return (
        <PchDialog
          title={'上传签字文件'}
          submitText="提交"
          cancelText="保存"
          visible={visible}
          onOk={()=>this.onOk('submit')}
          onClose={()=>onClose()}
          onCancel={()=>this.onOk('save')}
          footer={[]}>
          <div className="contract-sign-dialog-content">
            <div className="pch-form">
              <IceFormBinderWrapper ref="form" value={value}>
                <Form size="large" direction="hoz">
                  <Row wrap>
                    <Col span={24}>
                      <FormItem className="upload-wrap">
                        <IceFormBinder
                          required
                          name="fileIds"
                          message="签字文件不能为空">
                          <ImageUpload
                            {...this.UPLOAD_CONFIG}
                            listType="picture-card"
                            className='upload'
                            action={`${this._config.CONTRACT_HOST}/contract/signed-paper-file/picture`}
                            onChange={this.onChange.bind(this)}
                            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                            defaultFileList={value.fileIds}
                            beforeUpload={this.beforeUpload}/>
                        </IceFormBinder>
                        <div><IceFormError name="fileIds" /></div>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </IceFormBinderWrapper>
            </div>
          </div>
        </PchDialog>
    );
  }
}

export default SignDialogModule;
