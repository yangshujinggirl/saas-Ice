import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import {
  Input,
  Grid,
  Select,
  Button,
  DatePicker,
  Form,
  Feedback
} from '@icedesign/base';
import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { Title, PchTable, PchPagination } from 'components';
import Req from '../../reqs/ContractReq';
import Preview from './Preview';

import './index.scss';
const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};
const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;
const Toast = Feedback.toast;

class AddEit extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      moduleStatus:0,
      value: {},
      editorState: EditorState.createEmpty()
    }
  }
  componentWillMount() {
    this.initPage()
  }
  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  initPage() {
    if(this.props.params.id) {
      this.getDetail(this.props.params.id);
    }
  }
  //编辑api
  getDetail(id) {
    Req.templateDetailApi(id)
    .then((res) => {
      const { code, data, msg } = res;
      if(code != 200 ) {
        Toast.error(msg);
        return;
      }
      let { templateContent,templateName } = data;
      if(templateContent=='') {
        return
      }
      //debugger;
      const blocksFromHTML = convertFromHTML(templateContent);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      this.setState({
        editorState:EditorState.createWithContent(state),
        value:{
          templateName,
          templateContent
        }
      })
    })
  }
  //校验表单
  validEditor(callback){
    this.refs.form.validateAll((errors, values) => {
      if(errors) {
        return
      }
      
      'function' == typeof callback && callback(values)

    });
  }
  //提交保存
  handleSubmit() {
    this.validEditor(values=>{
      const { editorState } = this.state;
      let templateContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      templateContent = templateContent.replace(/(<script[\s\S]*?<\/script>)/i,'');
      this.refs.form.setter('templateContent',templateContent);
      //新增or编辑
      if(this.props.params.id) {
        //debugger
        this.editTemplate(values)
      } else {
        //debugger
        this.addTemplate(values);
      }
    });
  }
  //提交新增api
  addTemplate(params) {
    Req.addTemplatesApi(params)
    .then((res) => {
      const { code, msg } =res;
      if(code != 200) {
        Toast.error(msg);
        return;
      }
      hashHistory.push(`contract`)
    })
  }
  //提交编辑api
  editTemplate(params) {
    params = Object.assign(params,{id:this.props.params.id})
    Req.editTemplatesApi(params)
    .then((res) => {
      const { code, msg } =res;
      if(code != 200) {
        Toast.error(msg);
        return;
      }
      hashHistory.push(`contract`)
    })
  }
  //取消
  cancelSubmit() {
    hashHistory.push('contract')
  }
  //预览状态
  previewStatus(moduleStatus) {
    if(!moduleStatus){
      return this.setState({
        moduleStatus
      })
    }
    this.validEditor(values=>{
      this.setState({
        moduleStatus
      })
    })
  }
  //上传图片
  uploadImageCallBack(file) {
    // return new Promise(
    //   (resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'http://172.16.0.218:8080/file/upload');
    //     xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    //     const data = new FormData();
    //     data.append('image', file);
    //     xhr.send(data);
    //     debugger
    //     xhr.addEventListener('load', () => {
    //       const response = JSON.parse(xhr.responseText);
    //       resolve(response);
    //     });
    //     xhr.addEventListener('error', () => {
    //       const error = JSON.parse(xhr.responseText);
    //       reject(error);
    //     });
    //   }
    // );
    return new Promise(
        (resolve, reject) => {
            const formData = new FormData();
            formData.append('pic-upload', file);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://172.16.0.210:8080/contract/contract/signed_paper_file/upload');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            xhr.send(formData);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status >= 200 || xhr.status < 300 || xhr.status === 304) {
                    let result = JSON.parse(xhr.responseText)
                    console.log(result);
                    if(result.length == 0) {
                      return
                    }
                    resolve({
                        data: {
                            link: result.data.link
                        }
                    });
                } else {
                    reject(xhr.status)
                }
              }
            }
    })
  }
  render() {
    const { editorState, value, moduleStatus } = this.state;
    const { templateContent, templateName } = this.state.value;
    return(
      <IceContainer className="pch-container contract-edit-pages">
          <Title title="合同新增" />
          <div className="pch-form">
          { moduleStatus == 0?
            <IceFormBinderWrapper  value={value} ref="form">
              <Form size="large">
                <Row wrap justify="center">
                  <Col span="6">
                    <FormItem {...formItemLayout} label="合同名称:">
                      <IceFormBinder
                        name="templateName"
                        required
                        message="合同名称不为空">
                          <Input size="large" placeholder="合同名称"/>
                      </IceFormBinder>
                      <IceFormError name="templateName" />
                    </FormItem>
                  </Col>
                  <Col span={20}>
                      <IceFormBinder
                        name="templateContent"
                        required
                        message="合同内容不为空">
                        <Editor
                          editorState={editorState}
                          wrapperClassName="contract-template-add-wrapper"
                          editorClassName="contract-template-editor"
                          onEditorStateChange={this.onEditorStateChange}
                          toolbar={{
                            image: {
                              uploadEnabled:true,
                              uploadCallback: this.uploadImageCallBack,
                              alt: { present: true, mandatory: true },
                              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
                            }
                          }}/>
                      </IceFormBinder>
                      <IceFormError name="templateContent" />
                      <textarea style={{'width':'100%', 'resize':'vertical'}} disabled value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}/>
                  </Col>
                  <Col span={24}>
                    <div className="btns-wrap">
                      <Button
                        onClick={this.cancelSubmit.bind(this)}
                        type="secondary"
                        size="large">
                          取消
                      </Button>
                      <Button
                        onClick={this.handleSubmit.bind(this)}
                        type="secondary"
                        size="large">
                          保存
                      </Button>
                      <Button
                        onClick={()=>this.previewStatus(1)}
                        type="secondary"
                        size="large">
                          预览
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </IceFormBinderWrapper>
            :
            <Preview templateContent={templateContent} templateName={templateName} onClick={(moduleStatus)=>this.previewStatus(moduleStatus)}/>
          }
          </div>
      </IceContainer>
    )
  }
}

export default AddEit;
