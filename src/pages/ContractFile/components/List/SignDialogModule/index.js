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

const {Row, Col} = Grid;

const FormItem = Form.Item;
const { ImageUpload } = Upload;

class SignDialogModule extends Component {
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
      return (
        <Dialog
          visible={this.state.visible}
          onCancel={()=>this.onClose()}
          onClose={()=>this.onClose()}
          className="contract-sign-dialog-wrap"
          footer={[]}>
          <div className="pch-form contract-sign-dialog-content">
            <IceFormBinderWrapper ref="form">
              <Form size="large" direction="hoz">
                <h2 className="upload-title">上传签字文件</h2>
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
                          action="/contractApi/contract/signed_paper_file/upload"
                          data={{'path':'path/to/file'}}
                          formatter={(res) => {return { code: res.length>0? '0' : '1', imgURL: res[0].downloadUrl} }}
                          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                          />
                      </IceFormBinder>
                      <div><IceFormError name="fileIds" /></div>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <div className="btns-wrap">
                      <Button
                        type="secondary"
                        size="large"
                        onClick={()=>this.onOk()}
                        className="dialog-btn">
                          保存
                      </Button>
                      <Button
                        type="secondary"
                        size="large"
                        onClick={()=>this.onClose()}
                        className="dialog-btn">
                          提交
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

export default SignDialogModule;
