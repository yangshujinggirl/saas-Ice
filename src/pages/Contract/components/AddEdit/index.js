import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

import {
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
import { Title, PchTable, PchPagination } from 'components';
import Req from '../../reqs/ContractReq';

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


class AddEit extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      textContent:'',
      editorStateTwo:EditorState.createEmpty()
    }
  }
  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleSubmit() {
    const { editorState } = this.state;
    const template_content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // console.log(template_content)
    this.refs.form.validateAll((errors, values) => {
      this.refs.form.setter('template_content',template_content);
      Req.addTemplatesApi(values)
      .then((res) => {
        console.log(res);
      })
    });
  }
  render() {
    const { columns } = this.props;
    const { editorState, editorStateTwo } = this.state;
    const testContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))||'';
    console.log(convertToRaw(editorState.getCurrentContent()))
    console.log(typeof testContent)
    return(
      <IceContainer className="pch-container contract-edit-pages">
          <Title title="合同新增" />
          <div className="pch-form">
            <IceFormBinderWrapper ref="form">
              <Form size="large" direction="hoz">
                <Row wrap justify="center">
                  <Col span={6}>
                    <FormItem
                      {...formItemLayout}
                      label="合同名称:">
                      <IceFormBinder
                        name="template_no"
                        required
                        message="合同名称不为空">
                          <Input size="large" placeholder="合同名称"/>
                      </IceFormBinder>
                      <div><IceFormError name="template_no" /></div>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem className="editor-wrap">
                      <IceFormBinder
                        name="template_content">
                        <Editor
                          editorState={editorState}
                          wrapperClassName="contract-template-add-wrapper"
                          editorClassName="contract-template-editor"
                          onEditorStateChange={this.onEditorStateChange}/>
                      </IceFormBinder>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <div className="btns-wrap">
                      <Button
                        onClick={this.handleSubmit.bind(this)}
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
                        onClick={this.handleSubmit.bind(this)}
                        type="secondary"
                        size="large">
                          预览
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </IceFormBinderWrapper>

          </div>
      </IceContainer>
    )
  }
}

export default AddEit;
