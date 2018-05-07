import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Loading, Select} from '@icedesign/base';
// import  Detail from './Detail/index'
// import  MaterialSubmit from './MaterialSubmit/index'
import  EntryTrack from './EntryTrack/index'
import  ApprovalBox from './ApprovalBox/index'
import  './ReviewApproveDetail.scss'
import {browserHistory, hashHistory} from 'react-router';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import classNames from 'classnames';
import { Field } from '@icedesign/base/index';
const { Row, Col } = Grid;
const FormItem = Form.Item;



export default class ReviewApproveDetail extends Component {
  static displayName = 'ReviewApproveDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      index : 0,
      value: {},
      dataList:{},
      result :{}
    };
  }
  componentDidMount() {
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
    hashHistory.push('/reviewApprove');
  }
  //请求数据
  fetchData = () => {
    let {actions} = this.props;
    console.log(this.props)

    actions.getDetail({
      loanId : this.props.params.loanId,
      proInstId : this.props.params.proInstId
    });
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
    const init = this.field.init;
    return (
      <IceContainer title="进件审批查询-审批（平常风控）-流程轨迹" className='subtitle' style={styles.bg}>
            <Row>
                <Col span="19" className='review-form'>
                  <div className='review-page'>
                    <div className='title'>
                      <ul>
                        {this.renderTitle(details.list)}
                      </ul>
                    </div>
                  </div>

                  <div className="rcontent-edito">
                    <EntryTrack {...this.props}></EntryTrack>
                    <EntryTrack {...this.props}></EntryTrack>
                    {/*<Detail dataSource={details.list} ></Detail>*/}
                    {/*<MaterialSubmit {...this.props}></MaterialSubmit>*/}

                    <div className='botton-box'>
                      <Button className='botton' onClick={this.back}>返回</Button>
                    </div>
                  </div>
                </Col>
                <Col span="5" className='audit-information'>
                  <ApprovalBox {...this.props}></ApprovalBox>
                </Col>
            </Row>

      </IceContainer>
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
