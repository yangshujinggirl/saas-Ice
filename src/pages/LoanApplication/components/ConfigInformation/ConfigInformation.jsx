import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Selec, Upload } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import  './configInfo.scss'

const { Row, Col } = Grid;
const FormItem = Form.Item;
const { DragUpload } = Upload;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

export default class ConfigInformation extends Component {
  static displayName = 'ConfigInformation';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        title: '',
        desc: '',
        author: '',
        body: null,
        cats: [],
      },
    };
  }


  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  onDragOver= ()=> {
    console.log("dragover callback");
  }
  onDrop = (fileList) =>{
    console.log("drop callback : ", fileList);
  }

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      // ajax values
    });
  };

  render() {
    return (
      <div className="content-editor">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer title="车贷申请" className='subtitle'>
            <Row  className='config-page'>
              <Col span="3">
                <div className='title'>

                </div>

              </Col>
              <Col span="21" className='config-form'>
                  <div className='info'>
                    <h4>基本信息</h4>
                  </div>
                  <div className='info'>
                    <h4>材料提交</h4>
                    <DragUpload
                      className='upload'
                      action="//next-upload.shuttle.alibaba.net/upload" // 该接口仅作测试使用，业务请勿使用
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      // onDragOver={onDragOver}
                      // onDrop={onDrop}
                    />
                  </div>

              </Col>

            </Row>

          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
