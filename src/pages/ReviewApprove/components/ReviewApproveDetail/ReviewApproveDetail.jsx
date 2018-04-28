import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Loading } from '@icedesign/base';
// import  Detail from './Detail/index'
// import  MaterialSubmit from './MaterialSubmit/index'
import  EntryTrack from './EntryTrack/index'
import  './ReviewApproveDetail.scss'
import {browserHistory, hashHistory} from 'react-router';
import classNames from 'classnames';
const { Row, Col } = Grid;


export default class ReviewApproveDetail extends Component {
  static displayName = 'ReviewApproveDetail';

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
    // this.fetchData();

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
      var materialsFalg = false;//材料标志falg
      var trackFalg = false;//轨迹标志falg
      data.map((el,i)=>{
        if(el.name == '材料提交'){
          materialsFalg = true;
        }
        if(el.name == '流程轨迹'){
          trackFalg = true;
        }
      })
      if(!materialsFalg){
        data.push({name:'材料提交',fields:[]})
      }
      if(!trackFalg){
        data.push({name:'流程轨迹',fields:[]})
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
                <Col span="16" className='modify-form'>
                  <div className="rcontent-edito">
                    {/*<Detail dataSource={details.list} ></Detail>*/}
                    {/*<MaterialSubmit {...this.props}></MaterialSubmit>*/}
                    <EntryTrack {...this.props}></EntryTrack>
                    <div className='botton-box'>
                      <Button className='botton' onClick={this.back}>返回</Button>
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
