import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Req from '../../../reqs/ProductReq'
import {
  Form,Input,Button,Checkbox,Select,DatePicker,Switch,Radio,Grid,Field,Dialog,
  Table,Transfer,Feedback
} from '@icedesign/base';
import IceContainer from '@icedesign/container';
// import CellEditor from './CellEditor';
// form binder 详细用法请参见官方文档
import {
   FormBinderWrapper as IceFormBinderWrapper,
   FormBinder as IceFormBinder,
   FormError as IceFormError,
} from '@icedesign/form-binder';


import './addThree.scss';
const { Row, Col } = Grid;
const { Option } = Select;

const FormItem = Form.Item;
const formItemLayout = {
   labelCol: { span: 8 }
};
export default class addThree extends Component {
   static displayName = 'addThree';

   constructor(props) {
      super(props);
      this.state = {
         value: {},
         list: [],
         show:false,
         processList:[],
         processId:'',//流程名称的Id

      };
   }
   componentDidMount() {
     console.log(this.props)
      let { actions, htmlData,params } = this.props
      //页面名称获取
      Req.htmlName({ limit: 999 }).then((data) => {
         let html = this.state.list
         html = data.data.list
         this.setState({ list: html }, function () {
         })
      });
      //流程名称获取
      Req._processList().then((data)=>{
        let temp = this.state.processList;
            temp = data.data;
            this.setState({processList:temp},function(){})
      })
      //产品详情
      if(params.id){
        actions.getDetail(params.id)
      }
      
   }

   onsubmit = () => {
      let { actions, params,formData } = this.props;
      let {product={}} = formData
      let id = params.id;
      this.formRef.validateAll((error, value) => {
         if (error) {
            return;
         }
         let boolean = true;
         if(product.status == 1 && value.processName == undefined){
            Feedback.toast.show({
               type: 'error',
               content: '请选择流程名称',
            });
            boolean = false
         }
         if (!boolean) return
         // 提交当前填写的数据
         this.props.actions.prodHtmlSave(value, id);
      });
   }

   onFormChange = (value) => {
      this.setState({
         value
      })
   }
   //流程名称的id值
   onChangeProcess(value){
      this.setState({
         processId:value,
         show:true
      })
   }
   //新增流程
   handleSubmitAddnew() {
      hashHistory.push('/process/add');
   }
   //流程详情
   handleSubmitDetail() {
      let id = this.state.processId;
      if(id){
         hashHistory.push(`/process/detail/${id}`)
      }
     
   }
   render() {
     let {formData} = this.props;
     let {product={}} = formData
      let test =[{'name':1,'key':1},{'name':2,'key':2}];//流程名称数据
      return (
         <IceFormBinderWrapper
            ref={(formRef) => {
               this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
         >
            <div>
               <IceContainer>
                  <div className="pch-condition form ">
                     <Form
                        size="large" direction="hoz">
                        <legend className="pch-legend">
                           <span className="pch-legend-legline"></span>页面名称
                        </legend>
                        <div className="pch-form">
                           <Row wrap>
                              <Col xxs={24} xs={12} l={8} xl={6}>
                                 <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>页面名称:</span>}>
                                    <IceFormBinder
                                       name="id"
                                       className="select"
                                       required
								                        message="页面名称必选"
                                    >
                                    
                                       <Select size="large" placeholder="请选择" className="select">
                                          {
                                             this.state.list.map((item, i) => {
                                                return (
                                                   <Option value={item.id} key={i} >{item.name}</Option>
                                                )
                                             })
                                          }

                                       </Select>
                                    </IceFormBinder>
                                    <div><IceFormError name="id" /></div>
                                 </FormItem>
                              </Col>
                           </Row>
                        </div>
                        <legend className="pch-legend">
                           <span className="pch-legend-legline"></span>流程设置
                           </legend>
                        <div className="pch-form">
                           <Row wrap >
                              <Col xxs={24} xs={12} l={8} xl={6}>
                                 <FormItem {...formItemLayout} label="业务类型：">
                                    <label className="process-lable">车贷业务</label>
                                 </FormItem>
                              </Col>
                              <Col xxs={24} xs={12} l={8} xl={6}>
                                 <FormItem {...formItemLayout} label="资方：">
                                    <IceFormBinder name="zifang">
                                    <label className="process-lable">中国银行</label>
                                    </IceFormBinder>
                                 </FormItem>
                              </Col>
                              <Col xxs={24} xs={12} l={8} xl={6}>
                                 <FormItem {...formItemLayout} label="产品类型：">
                                    <IceFormBinder name="prodType" >
                                        <label className="process-lable">{product.productType}</label>
                                    </IceFormBinder>
                                 </FormItem>
                              </Col>
                              <Col xxs={24} xs={12} l={8} xl={6}>
                                 <FormItem {...formItemLayout} label="产品名称：">
                                    <IceFormBinder name="prodName" >
                                       <label className="process-lable">{product.name}</label>
                                    </IceFormBinder>
                                 </FormItem>
                              </Col>
                              <Col xxs={24} xs={12} l={8} xl={6}>
                                 <FormItem {...formItemLayout} label="流程名称：">
                                    <IceFormBinder name="processName">
                                       <Select 
                                          size="large" 
                                          placeholder="请选择" 
                                          className="select"
                                          onChange={this.onChangeProcess.bind(this)}
                                          >
                                          {
                                             test.map((item,i)=>{
                                                return (
                                                   <Option value={item.name} key={i}>{item.name}</Option>
                                                )
                                             })
                                          }
                                       </Select>
                                    </IceFormBinder>
                                 </FormItem>
                              </Col>
                              <Col xxs={24} xs={12} l={8} xl={6}>
                                 <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
                                    <Button onClick={this.handleSubmitAddnew.bind(this)} type="secondary" style={{ 'background': '#1AA8F0' }}>
                                       新增流程
                                    </Button>
                                 </FormItem>
                              </Col>
                              <Col xxs={24} xs={12} l={8} xl={6} style={{display: this.state.show==true?'':'none'}}>
                                 <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate" >
                                    <Button onClick={this.handleSubmitDetail.bind(this)} type="secondary" style={{ 'background': '#1AA8F0' }}>
                                       查看流程详情
                                    </Button>
                                 </FormItem>
                              </Col>
                           </Row>
                        </div>
                        <div className="next-btn-box">
                           <Button type="secondary" size="large" onClick={this.onsubmit}>保存</Button>
                        </div>
                     </Form>
                  </div>
               </IceContainer>
            </div>
         </IceFormBinderWrapper>
      );
   }
}
const styles = {
   filterTool: {
      width: '200px',
   },
   filterCol: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
   },

   btns: {
      width: '90px',
      height: '30px',
      lineHeight: '30px',
      border: 'none',
      fontSize: '16px',
      borderRadius: 'none !important',
      background: '#ec9d00',
      color: '#fff',
      marginLeft: '20px'

   },
};
