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
  Upload
} from '@icedesign/base';

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import './index.scss'
import { PchDialog } from 'components';

const {Row, Col} = Grid;

const FormItem = Form.Item;
const { ImageUpload } = Upload;

class SignDialogModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:this.props.visible,
      value:{},
      uploadList:[]
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
      if(errors) {
        return
      };
      let params = {
        files:this.state.uploadList,
        contractId:this.props.contractId
      }
      this.props.submit(params);
    });
  }
  //上传成功回调
  upLoadSuccess(values) {
    let { uploadList } = this.state;
    let uploadFile = `${values.fileName}@@@${values.fileURL}@@@${values.fileType}`;
    uploadList.push(uploadFile);
    this.setState({
      uploadList
    })
  }
  render() {
    const { value, visible } = this.state;
      return (
        <PchDialog
          title={'上传签字文件'}
          visible={visible}
          onOk={()=>this.onOk()}
          onClose={()=>this.onClose()}
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
                            listType="picture-card"
                            className='upload'
                            action="/contractApi/contract/contract/signed_paper_file/upload"
                            onSuccess={(res)=>this.upLoadSuccess(res)}
                            formatter={(res) => {
                              return {
                                  code: res.code==200?'0':'1',
                                  fileName:res.filename,
                                  imgURL: res.fileUrl,
                                  fileURL: res.fileUrl,
                                  fileType:res.fileType,
                                  downloadURL:"https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                                }
                             }}
                            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                            />
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
