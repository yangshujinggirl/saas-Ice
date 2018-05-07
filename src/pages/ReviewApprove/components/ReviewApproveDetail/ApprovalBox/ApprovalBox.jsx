import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Loading, Select} from '@icedesign/base';
import { Field } from '@icedesign/base/index';
import Req from '../../../reqs/ReviewApproveReq';
import  './ApprovalBox.scss'
const FormItem = Form.Item;
const dataSource = [
  {label:'option1', value:'option1'},
  {label:'option2', value:'option2'},
]
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 18 }
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
      dataSource: [],
    };
  }
  componentDidMount(){
    // this.getLoanUpload(this.props.params.id);
    console.log(this.props)
  }
  render() {
    let { trackList } = this.state;
    const init = this.field.init;
    console.log(trackList)
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
              {...init('www', {
                rules: [{ required:  true, message: "请选择审查结果" }]
              })}
              dataSource={dataSource}
            >
            </Select>
          </FormItem>
          <FormItem  className='item' label="审查意见:"
                     {...formItemLayout}>
            <Input  multiple
                    className="text"
                    maxLength={500}
                    placeholder="请填写审查意见"
                    {...init('www', {
                      rules: [{ required:  true, message: "审查意见" }]
                    })}/>
          </FormItem>
          <FormItem  className='item' label=""
                     {...formItemLayout}>
            <button >提交</button>
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
