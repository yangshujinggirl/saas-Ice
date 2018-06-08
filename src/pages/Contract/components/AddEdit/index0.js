import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseComponent } from 'base';
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
import E from 'wangeditor';

import Cookie from '../../../../base/utils/Cookie';
import { Title, PchTable, PchPagination } from 'components';
import Req from '../../reqs/ContractReq';
import Preview from './Preview';

import './index.scss';
import '../../../../base/scss/tableEdtor.scss';


const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;
const Toast = Feedback.toast;
const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

let editor;
class AddEit extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      moduleStatus:0,
      value: {},
      editorContent: ''
    }
  }
  componentDidMount() {
    this.initEdtor(this.initPage)
  }
  //初始化编辑器
  initEdtor(callback) {
    const elem = this.refs.editorElem;
    editor = new E(elem);
    editor.customConfig.menus = [
                                    'head',  // 标题
                                    'bold',  // 粗体
                                    'fontSize',  // 字号
                                    'fontName',  // 字体
                                    'italic',  // 斜体
                                    'underline',  // 下划线
                                    'strikeThrough',  // 删除线
                                    'foreColor',  // 文字颜色
                                    'backColor',  // 背景颜色
                                    'link',  // 插入链接
                                    'justify',  // 对齐方式
                                    'emoticon',  // 表情
                                    'image',  // 插入图片
                                    'table',  // 表格
                                    'undo',  // 撤销
                                    'redo'  // 重复
                                ]
    editor.customConfig.zIndex = 100;
    editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;
    editor.customConfig.uploadImgHeaders = {
      'Authorization':`PCTOKEN ${Cookie.get('PCTOKEN')}`
    }
    editor.customConfig.uploadFileName = 'file';
    editor.customConfig.customAlert = function (info) {
       if(info.indexOf('图片验证未通过') != -1) {
         Toast.error('图片尺寸超过最大限制 5MB，请重新选择！');
       }
    }
    editor.customConfig.uploadImgHooks = {
       before: function (xhr, editor, files) {},
       success: function (xhr, editor, result) {},
       error: function (xhr, editor) {
           let response = JSON.parse(xhr.response);
           Toast.error(response.msg);
       },
       customInsert: function (insertImg, result, editor) {
         const { code, data } = result;
         if( code != 200 ) {
           return;
         }
         var url = data.fileUrl
         insertImg(url)
       }
    }
    editor.customConfig.uploadImgServer = '/contract/contract/signed-paper-file/picture';
    editor.customConfig.showLinkImg = false;
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html,
        value:Object.assign(this.state.value,{templateContent:html})
      })
    }
    editor.create();
    'function' == typeof callback && callback()
  }
  initPage=()=> {
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
    //解决编辑器内容第一个元素必须是P的问题
    templateContent = templateContent.replace(/^<img/g,'<p></p><img');
    editor.txt.html(templateContent)
    this.setState({
      editorContent:templateContent,
      value:{
        templateContent,
        templateName
      }
    })
  }
  //获取详情
  getDetail(id) {
    Req.templateDetailApi(id)
    .then((res) => {
      const { code, data, msg } = res;
      if(code != 200 || !data) {
        Toast.error(msg);
        return;
      }
      let { templateContent,templateName } = data;
      editor.txt.html(templateContent)
      this.setState({
        editorContent:templateContent,
        value:{
          templateName,
          templateContent
        }
      })
    },error=> {
      Req.tipError(error.msg)
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
      let { editorContent } = this.state;
      editorContent = editorContent.replace(/(<script[\s\S]*?<\/script>)/i,'');
      //解决编辑器内容第一个元素必须是P的问题
      editorContent = editorContent.replace(/^<img/g,'<p></p><img');
      this.refs.form.setter('templateContent',editorContent);
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
    },error=> {
      Req.tipError(error.msg)
    })
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
    },error=> {
      Req.tipError(error.msg)
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

  render() {
    const { value, moduleStatus } = this.state;
    const { templateContent, templateName } = this.state.value;
    return(
      <IceContainer className="pch-container contract-edit-pages">
          <Title title="合同新增" />
          <div className="pch-form">
            <div style={{'display':moduleStatus == 0?'block':'none'}}>
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
                          <div ref="editorElem" id="editorElem"></div>
                        </IceFormBinder>
                        <IceFormError name="templateContent" />
                        {/* <textarea style={{'width':'100%', 'resize':'vertical'}} disabled value={this.state.editorContent}/> */}
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
            </div>
            <Preview
              display={moduleStatus == 1?'block':'none'}
              templateContent={templateContent}
              templateName={templateName}
              onClick={(moduleStatus)=>this.previewStatus(moduleStatus)}/>
          </div>
      </IceContainer>
    )
  }
}

export default AddEit;
