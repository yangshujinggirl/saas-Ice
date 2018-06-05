import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseComponent } from 'base';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Cookie from '../../../../base/utils/Cookie';

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

class AddEit extends BaseComponent {
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
    let contractContent = localStorage.getItem('contractContent');
    if(this.props.params.id) {
      this.getDetail(this.props.params.id);
    } else if(contractContent) {
      this.getCookieContract(contractContent);
    }
  }
  //新增----获取超时保存模板内容；
  getCookieContract(contractContent) {
    contractContent = JSON.parse(contractContent);
    let { templateContent, templateName } = contractContent;
    //解决编辑器内容第一个元素必须这P的问题
    templateContent = templateContent.replace(/^<img/g,'<p></p><img');
    const blocksFromHTML = htmlToDraft(templateContent);
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
  }
  //编辑api
  getDetail(id) {
    Req.templateDetailApi(id)
    .then((res) => {
      const { code, data, msg } = res;
      if(code != 200 || !data) {
        Toast.error(msg);
        return;
      }
      let { templateContent,templateName } = data;
      if(templateContent=='') {
        return
      }
      //解决编辑器内容第一个元素必须这P的问题
      templateContent = templateContent.replace(/^<img/g,'<p></p><img');
      const blocksFromHTML = htmlToDraft(templateContent);
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
      //解决编辑器内容第一个元素必须这P的问题
      templateContent = templateContent.replace(/^<img/g,'<p></p><img');
      this.refs.form.setter('templateContent',templateContent);
      //新增or编辑or复制
      if(this.props.params.id) {
        //复制
        if(this.props.location.query.action) {
          this.addTemplate(values);
        } else {
          this.editTemplate(values)
        }
      } else {
        this.addTemplate(values);
      }
    });
  }
  //提交新增api
  addTemplate(params) {
    localStorage.setItem('contractContent',JSON.stringify(params));
    Req.addTemplatesApi(params)
    .then(r => {
      Req.tipSuccess({
        content: this.props.location.query.action?'复制成功':'新增成功',
        afterClose(){
          localStorage.clear('contractContent');
          hashHistory.push('contract')
        }
      })
    }).catch(e=>e)
  }
  //提交编辑api
  editTemplate(params) {
    params = Object.assign(params,{id:this.props.params.id})
    Req.editTemplatesApi(params)
    .then(r => {
      Req.tipSuccess({
        content: '修改成功',
        afterClose(){
          hashHistory.push('contract')
        }
      })
    }).catch(e=>e)
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

      return new Promise(
        (resolve, reject) => {
          if(file.size > 1024*1024*5) {
            Toast.error('图片尺寸超过最大限制 5MB，请重新选择！');
            return;
          }
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/contract/contract/signed-paper-file/picture');
          xhr.setRequestHeader('Authorization', `PCTOKEN ${Cookie.get('PCTOKEN')}`);
          const data = new FormData();
          data.append('file', file);
          xhr.send(data);
          xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            //处理返回数据
            let formdata = {
              data: {
                link: response.data.fileUrl
              }
            }
            resolve(formdata)
          });
          xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText);
            reject(error);
          });
        }
      );
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
                              urlEnabled: true,
                              uploadEnabled: true,
                              alignmentEnabled: true,
                              uploadCallback: this.uploadImageCallBack,
                              previewImage: true,
                              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                              alt: { present: false, mandatory: false },
                            }
                          }}/>
                      </IceFormBinder>
                      <IceFormError name="templateContent" />
                      {/*<textarea style={{'width':'100%', 'resize':'vertical'}} disabled value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}/>*/}
                  </Col>
                  <Col span={24}>
                    <div className="btns-wrap">
                      <Button
                        onClick={this.cancelSubmit.bind(this)}
                        type="normal"
                        size="large">
                          取消
                      </Button>
                      <Button
                        onClick={this.handleSubmit.bind(this)}
                        type="primary"
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
