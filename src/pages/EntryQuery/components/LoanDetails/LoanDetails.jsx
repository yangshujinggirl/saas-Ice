import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Loading } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder';
import DataBinder from '@icedesign/data-binder/lib/index';
import  Detail from './Detail/index'
import  MaterialSubmit from './MaterialSubmit/index'
import  EntryTrack from './EntryTrack/index'
import  './LoanDetails.scss'
import {browserHistory, hashHistory} from 'react-router';
import classNames from 'classnames';
const { Row, Col } = Grid;



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
    const  titleList = [];
    if(!this.isEmptyObject(data)){
      var materialsFalg = false;//材料标志falg
      var trackFalg = false;//轨迹标志falg
      data.map((el,i)=>{
        if(el.name == '材料提交'){
          materialsFalg = true;
        }
        if(el.name == '流程轨迹'){
          trackFalg = true;
        }
        titleList.push(el);
      })
      if(!trackFalg){
        titleList.unshift({name:'流程轨迹',fields:[]})
      }
      if(!materialsFalg){
        titleList.push({name:'材料提交',fields:[]})
      }

      titleList.map((item,index)=>{
        var btnClass = classNames({
          'active': this.state.index == index,
        });
        list.push(
          <li><a  key={index} className={btnClass}  onClick={this.titleClick.bind(this,index,item.name)}>{item.name}</a></li>
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
    actions.getDetail({
      id:this.props.params.id,
      // step:1
    });
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
    return (
      <IceContainer className="loan-details">
        <legend className="pch-legend">
          <span className="pch-legend-legline"></span>车贷申请
        </legend>
        <div className='pch-form'>
          <Row>
            <Col className='review-form'>
              <div className='review-page'>
                <div className='title'>
                  <ul>
                    {this.renderTitle(details.list)}
                  </ul>
                </div>
              </div>
              <div className="rcontent-edito modify-form">
                <div className='review-detail' id='流程轨迹'>
                  <span className='name'>流程轨迹</span>
                  <EntryTrack {...this.props} dataSource={details.list}></EntryTrack>
                </div>

                <Detail dataSource={details.list} ></Detail>

                <div className='review-detail' id='材料提交'>
                  <span className='name'>材料提交</span>
                  <MaterialSubmit {...this.props}></MaterialSubmit>
                </div>
                <div className='botton-box pch-form-buttons'>
                  <Button size="large" type="secondary" onClick={this.back}>返回</Button>
                </div>
              </div>


            </Col>
          </Row>

        </div>
      </IceContainer>




    );
  }
}

const styles = {
  bg:{
    backgroundColor:'#fffffB'
  },
  Bottom: {
    marginBottom: '10px',
  },
};
