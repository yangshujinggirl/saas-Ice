import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import  classNames from  'classnames'
import { Input, Grid, Form, Button, Select ,Field,NumberPicker, Balloon, Radio, Checkbox, DatePicker,Table, Upload } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder/lib/index';
import {browserHistory, hashHistory} from 'react-router';
import  './LoanModify.scss'
import FormRender from  './FormRender'
import MaterialSubmit from  './MaterialSubmit'

const { Row, Col } = Grid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { DragUpload } = Upload;


const tableList =[

]
export default class LoanModify extends Component {
  static displayName = 'LoanModify';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      index : 0,
      tableList:[]
    };
    // 请求参数缓存
    this.queryCache = {};
  }
  componentDidMount() {
    this.queryCache.id = this.props.params.id;
    this.fetchData();
  }
  //请求数据
  fetchData = (flag) => {
    let {actions} = this.props;
    actions.getDetail(this.props.params.id);
  };
  //标题点击
  titleClick = (index,name)=>{
    // e.preventDefault();
    this.setState({
      index:index
    })
    this.scrollToAnchor(name)
  }
  //渲染标题
  renderTitle = (data) =>{
    const  list = [];
    if(data){
      data.map((item,index)=>{
        var btnClass = classNames({
          'active': this.state.index == index,
        });
        list.push(
          <a  key={index} className={btnClass}  onClick={this.titleClick.bind(this,index,item.name)}>{item.name}</a>
        )
      })
    }
    return list;
  }

  //跳转
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }
  //submit 提交
  submit = (e)=>{

  }
  //save
  save = (e)=>{
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (errors) {
        console.log("Errors in form!!!");
        return;
      }
      console.log("Submit!!!");
      // console.log(values);
      for(var key in values){
        if(values[key] != undefined){
          if(values[key] != 'undefined'){
            this.queryCache[key] = values[key];
          }
        }
      }
      console.log(this.queryCache)
      this.props.actions.saveFrom(this.queryCache);
    });
  }
  //cancel 提交
  cancel = (e)=>{
    e.preventDefault();
    hashHistory.push('/entryQuery');
  }
  //调用秒拒功能
  refuse = (name)=>{
    if(name == 'coBorrower.name' || name == 'coBorrower.idNo'|| name == 'coBorrower.mobile'){
      const  coBorrowerName = this.field.getValue('coBorrower.name');
      const  coBorrowerIdNo = this.field.getValue('coBorrower.idNo');
      const  coBorrowerMobile = this.field.getValue('coBorrower.mobile');
      if(coBorrowerName && coBorrowerIdNo && coBorrowerMobile){
        alert('123')
      }
    }
    if(name == 'guarantor.name' || name == 'guarantor.idNo'|| name == 'guarantor.mobile'){
      const  guarantorName = this.field.getValue('guarantor.name');
      const  guarantorIdNo = this.field.getValue('guarantor.idNo');
      const  guarantorMobile = this.field.getValue('guarantor.mobile');
      if(guarantorName && guarantorIdNo && guarantorMobile){
        alert('123')
      }
    }
  }
  render() {
    // const details = this.props.bindingData.details;
    const details = this.props.detail || {};
    // console.log(details)
    // console.log(this.props.params);
    const init = this.field.init;
    const borrowerName = this.field.getValue('borrowerName');
    tableList.push({id:'borrowerName',title:12313})
    return (
        <IceFormBinderWrapper
          value={this.state}
          onChange={this.formChange}
          style
        >
          <IceContainer title="车贷申请" className='subtitle' style={styles.bg}>
            <Row  className='modify-page'>
              <Col span="3">
                <div className='title'>
                  <ul>
                    {this.renderTitle(details.list)}
                  </ul>
                </div>
              </Col>
              <Col span="21" className='modify-form'>
                <Form
                  labelAlign= "left"
                  field={this.field}
                >
                  <FormRender {...this.props} data={details.list}></FormRender>
                  <div className='info' id='material'>
                    <h4>材料提交</h4>
                    <MaterialSubmit {...this.props} data={tableList}></MaterialSubmit>
                    <div className='button-box'>
                      <Button onClick={this.submit}>提交</Button>
                      <Button onClick={this.save}>保存</Button>
                      <Button onClick={this.cancel}>取消</Button>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </IceContainer>

        </IceFormBinderWrapper>
    );
  }
}
const styles = {
  bg:{
    backgroundColor:'#fffffB'
  }
};
