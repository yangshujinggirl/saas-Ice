import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Loading } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder/lib/index';
import  Detail from './Detail/index'
import  MaterialSubmit from './MaterialSubmit/index'
import  './LoanDetails.scss'
import {browserHistory, hashHistory} from 'react-router';
import classNames from 'classnames';
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
      index : 0,
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
    if(!this.isEmptyObject(data)){
      var falg = false;
      data.map((el,i)=>{
        if(el.name == '材料提交'){
          falg = true;
        }
      })
      if(!falg){
        data.push({name:'材料提交',fields:[]})
      }
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

  //title跳转
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView(); }
    }
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
  //判断Json是否为kong
  isEmptyObject(e) {
    var t;
    for (t in e)
      return false;
    return true;
  }

  render() {
    // const details = this.props.bindingData.details;
    const details = this.props.detail || {};
    console.log(details.list)
    console.log(details)
    console.log(this.props.params);
    return (
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
                  <div className="rcontent-edito">
                    <Detail dataSource={details.list} ></Detail>
                    <MaterialSubmit {...this.props}></MaterialSubmit>
                    <div className='botton-box'>
                      <Button className='botton' onClick={this.back}>返回</Button>
                    </div>
                  </div>

                  <div className="part-same part-process" id="process">
                    <p className="module-name">流程轨迹</p>
                    <div className="process-action">
                      <div className="item">
                        <div className="circle status-error">审查</div>
                        <div className="status-title">初审</div>
                        <div className="status-desc">
                          申请金额:10000 (7000)评审意见：未通过
                          审查意见:信誉良好 资料基本吻合
                        </div>
                        <div className="content">
                          <p>办理人：龚伟东（126007）</p>
                          <p className="time">时间：2018-07-20</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="circle status-success">审查</div>
                        <div className="status-title">初审</div>
                        <div className="status-desc">
                          申请金额:10000 (7000)评审意见：通过
                          审查意见:信誉良好 资料基本吻合
                        </div>
                        <div className="content">
                          <p>办理人：龚伟东（126007）</p>
                          <p className="time">时间：2018-07-20</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="circle status-return">审查</div>
                        <div className="status-title">初审</div>
                        <div className="status-desc">
                          申请金额:10000 (7000)评审意见：通回
                          审查意见:信誉良好 资料基本吻合
                        </div>
                        <div className="content">
                          <p>办理人：龚伟东（126007）</p>
                          <p className="time">时间：2018-07-20</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="circle status-manpower">审查</div>
                        <div className="status-title">初审</div>
                        <div className="status-desc">
                          申请金额:10000 (7000)评审意见：转人工
                          审查意见:信誉良好 资料基本吻合
                        </div>
                        <div className="content">
                          <p>办理人：龚伟东（126007）</p>
                          <p className="time">时间：2018-07-20</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
            </Row>

      </IceContainer>
    );
  }
}

const styles = {
  bg:{
    backgroundColor:'#fffffB'
  }
};
