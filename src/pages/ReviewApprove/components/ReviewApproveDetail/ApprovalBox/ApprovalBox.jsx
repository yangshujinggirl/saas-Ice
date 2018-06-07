import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Loading, Select, Feedback} from '@icedesign/base';
import { Field } from '@icedesign/base/index';
import Req from '../../../reqs/ReviewApproveReq';
import  './ApprovalBox.scss'
const FormItem = Form.Item;
const Toast = Feedback.toast;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 }
};
export default class ApprovalBox extends Component {
  static displayName = 'ApprovalBox';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      value: {},
      Component :[],
      dataSource: [

      ]
    };
  }
  componentDidMount(){
    // this.getLoanUpload(this.props.params.id);
    console.log(this.props)
  }
  //判断Json是否为kong
  isEmptyObject(e) {
    var t;
    for (t in e)
      return false;
    return true;
  }
  //提交
  submit = (e)=>{
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (errors) {
        console.log("Errors in form!!!");
        return;
      }
      let { choose, approveMsg} = values;

      console.log(approveMsg)
      if(approveMsg == 'undefined'  || approveMsg == undefined){
        Toast.show({
          type: "help",
          content: "请填写审查意见～",
        });
        return;
      }
      if(choose == 'undefined' || choose == undefined){
        Toast.show({
          type: "help",
          content: "请填写审查结果～",
        });
        return;
      }
      console.log(233333)
      this.props.submit(e,values);
    });
  }
  render() {
    let { dataSource } = this.state;
    const init = this.field.init;
    let { reviewList } = this.props  || [];
    console.log(reviewList)
    if(!this.isEmptyObject(reviewList)){
      var arr = [];
      for (var i in reviewList){
        arr.push({label:reviewList[i], value: i})
      }
    }
    return (
      <div className='information'>
        <b>审批信息</b>
        <p className='review-result' style={styles.informationBG}>审批结果</p>
        <Form labelAlign='top'  className='review-smallfrom'>
          <FormItem  className='item' label="审查结果:"
                     {...formItemLayout}>
            <Select
              className = 'select'
              placeholder="请选择审查结果"
              {...init('choose', {
                rules: [{ required:  false, message: "请选择审查结果" }]
              })}
              dataSource={arr}
            >
            </Select>
          </FormItem>
          <FormItem  className='item' label="审查意见:"
                                {...formItemLayout}>
          <Input  multiple
                  className="text"
                  maxLength={500}
                  placeholder="请填写审查意见"
                  {...init('approveMsg', {
                    rules: [{ required:  false, message: "审查意见" }]
                  })}/>
        </FormItem>
          <FormItem  className='item' label=""
                     {...formItemLayout}>
            <Button  disabled={ this.props.disabled} onClick={this.submit.bind(this)}>提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const styles = {
  widthbg:{
    backgroundColor:'#fffffB'
  },
  informationBG:{
    background: '#FFFCF7',
    paddingBottom: 0,
  },
  width:{
    width:'100%'
  }
};
