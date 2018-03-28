import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select ,Field} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder/lib/index';
import {browserHistory, hashHistory} from 'react-router';
import  './LoanModify.scss'
import  classNames from  'classnames'
const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
};

@DataBinder({
  details: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/loan/derails',
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
})



export default class LoanModify extends Component {
  static displayName = 'LoanModify';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      index : 0
    };
    // 请求参数缓存
    this.queryCache = {};
  }
  componentDidMount() {
    this.fetchData();
  }
  //请求数据
  fetchData = () => {
    let {actions} = this.props;
    actions.getDetail(this.props.params.id);
    // this.props.updateBindingData('details', {
    //   data:this.queryCache ,
    // });
  };
  //标题点击
  titleClick = (e,index,)=>{
    e.preventDefault();
    this.state.index = index;
    console.log(index)
  }

  renderTitle = (data) =>{
    console.log(data)
    const  list = [];
    if(data.length){
      data.forEach((item,index)=>{
        var btnClass = classNames({
          'active': this.state.index == index,
        });
        list.push(
          <li key={index} className={btnClass}  onClick={this.titleClick(event,index)}>{item.name}</li>
        )
      })
    }
    return list;
  }
  render() {
    // const details = this.props.bindingData.details;
    const details = this.props.detail || {};
    console.log(details)
    // console.log(this.props.params);
    const init = this.field.init;

    return (
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          style
        >
          <IceContainer title="车贷申请" className='subtitle'>
            <Row  className='modify-page'>
              <Col span="3">
                <div className='title'>
                  <ul>
                    {this.renderTitle(details)}
                  </ul>
                </div>
              </Col>

              <Col span="21" className='modify-form'>
                <Form
                  labelAlign= "left"
                  field={this.field}
                >
                <div className='info'>
                  <h4>基本信息</h4>
                  <div className='info-row'>
                    <FormItem className='item' label="密码：" required {...formItemLayout}>
                      <Input
                        htmlType="password"
                        {...init("1")}
                        placeholder="请输入密码"
                      />
                    </FormItem>
                    <FormItem className='item' label="密码：" required {...formItemLayout}>
                      <Input
                        htmlType="password"
                        {...init("2")}
                        placeholder="请输入密码"
                      />
                    </FormItem>
                    <FormItem  className='item' label="密码：" required {...formItemLayout}>
                      <Input
                        htmlType="password"
                        {...init("3")}
                        placeholder="请输入密码"
                      />
                    </FormItem>
                    <FormItem className='item' label="密码：" required {...formItemLayout}>
                      <Input
                        htmlType="password"
                        {...init("pass")}
                        placeholder="请输入密码"
                      />
                    </FormItem>
                    <FormItem className='item' label="密码：" required {...formItemLayout}>
                      <Input
                        htmlType="password"
                        {...init("pasws")}
                        placeholder="请输入密码"
                      />
                    </FormItem>
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

