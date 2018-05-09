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
      value: {
        templateName:''
      },
      editorState: EditorState.createEmpty()
    }
  }
  componentWillMount() {
    this.initPage()
  }
  initPage() {
    if(this.props.params.id) {
      this.getDetail(this.props.params.id);
    }
  }
  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  //编辑，调用详情api
  getDetail(id) {
    Req.templateDetailApi(id)
    .then((res) => {
      let { templateContent,templateName } = res.data;
      if(templateContent=='') {
        return
      }
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
  //提交保存
  handleSubmit() {
    const { editorState } = this.state;
    let templateContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.refs.form.validateAll((errors, values) => {
      if(errors) {
        return
      }
      this.refs.form.setter('templateContent',templateContent);
      if(this.props.params.id) {
        this.editTemplate(values)
      } else {
        this.addTemplate(values);
      }

    });
  }
  //新增api
  addTemplate(params) {
    Req.addTemplatesApi(params)
    .then((res) => {
      const { status,msg } =res.data;
      if(status!=200) {
        Toast.success(msg);
        return;
      }
      hashHistory.push(`contract`)
    })
  }
  //编辑api
  editTemplate(params) {
    params = Object.assign(params,{id:this.props.params.id})
    Req.editTemplatesApi(params)
    .then((res) => {
      const { status,msg } =res.data;
      if(status!=200) {
        Toast.success(msg);
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
    console.log(this.state)
    this.setState({
      moduleStatus
    })
  }
  render() {
    const { editorState } = this.state;
    const { templateContent, templateName } = this.state.value;
    return(
      <IceContainer className="pch-container contract-edit-pages">
          <Title title="合同新增" />
          <div className="pch-form">
          { this.state.moduleStatus == 0?
            <IceFormBinderWrapper  value={this.state.value} ref="form">
              <Form size="large">
                <Row wrap justify="center">
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="合同名称:">
                      <IceFormBinder
                        name="templateName"
                        required
                        message="合同名称不为空">
                          <Input size="large" placeholder="合同名称"/>
                      </IceFormBinder>
                      <div><IceFormError name="templateName" /></div>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem className="editor-wrap">
                      <IceFormBinder
                        name="templateContent"
                        required
                        message="合同内容不为空">
                        <Editor
                          editorState={editorState}
                          wrapperClassName="contract-template-add-wrapper"
                          editorClassName="contract-template-editor"
                          onEditorStateChange={this.onEditorStateChange}/>
                      </IceFormBinder>
                      <div><IceFormError name="templateContent" /></div>
                    </FormItem>
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
