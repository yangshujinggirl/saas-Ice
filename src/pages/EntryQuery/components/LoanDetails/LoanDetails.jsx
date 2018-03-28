import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Loading } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder/lib/index';
import  Detail from './Detail/index'
import  './LoanDetails.scss'
import {browserHistory, hashHistory} from 'react-router';
const { Row, Col } = Grid;


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


export default class LoanDetails extends Component {
  static displayName = 'LoanDetails';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      dataList:{}
    };
    // 请求参数缓存
    this.queryCache = {};
  }
  componentDidMount() {
    // this.queryCache.id = this.props.params.id;
    this.fetchData();

  }
  //返回
  back = (e)=>{
    e.preventDefault();
    hashHistory.push('/entryQuery');
  }
  //请求数据
  fetchData = () => {
    let {actions} = this.props;
    actions.getDetail(this.props.params.id);
    // this.props.updateBindingData('details', {
    //   data:this.queryCache ,
    // });
  };
  render() {
    // const details = this.props.bindingData.details;
    const details = this.props.detail || {};
    console.log(details)
    console.log(this.props.params);
    return (
      <div className="rcontent-edito">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <Detail dataSource={details}></Detail>

        </IceFormBinderWrapper>
        <div className='botton-box'>
        <Button className='botton' onClick={this.back}>返回</Button>
      </div>

      </div>
    );
  }
}

