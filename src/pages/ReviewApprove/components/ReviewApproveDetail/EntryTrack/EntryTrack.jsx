import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {  Table } from '@icedesign/base';
import Req from '../../../reqs/ReviewApproveReq';
import  './EntryTrack.scss'
import  classNames from  'classnames'
export default class EntryTrack extends Component {
  static displayName = 'EntryTrack';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component :[],
      dataSource: [],
      trackList:[]
    };
  }
  componentDidMount(){
    let {actions} = this.props;
    console.log(this.props)

    Req.getTrackDetail({
      proInstId : this.props.params.proInstId,
      isApproveInfo :true
    }).then((res)=>{
      if(res.data && res.code == 200){
        this.setState({
          trackList : res.data.proTrack ? res.data.proTrack : []
        })
      }else {

      }
    });
  }
  render() {
    let { trackList } = this.state;
    console.log(trackList)
    return (
      <div className="part-same part-process info review-detail" id='流程轨迹'>
                  <span  className='name'>流程轨迹</span>
                  <div className="process-action">
                        {

                          trackList.map((item,index)=>{
                            var status = classNames({
                              'circle status-error': item.status == '拒绝',
                              'circle status-success': item.status == '通过',
                              'circle status-return': item.status == '退回中行审查',
                              'circle status-manpower': item.status == '',
                            });

                            return (
                              <div className="item" key={index}>
                                <div className={status}>{item.status}</div>
                                  <div className="status-title"><b>{item.taskName}</b></div>
                                <div className="status-desc">
                                  <span>申请金额:10000 <i>(7000)</i></span>
                                  <span>申请金额:10000 <i>(7000)</i></span>
                                  <span>审查意见:驰名商标是否具有明确含义的，并且与汉字形成一一对应的关系</span>
                                </div>
                                {/*<div className="content">*/}
                                  {/*<p className="opinion">评审意见:<span>{item.approveMsg}</span></p>*/}
                                {/*</div>*/}
                                <div className="content">
                                  <p><b>办理人:</b>&nbsp;&nbsp;{item.operatorName}（{item.operatorNum}）</p>
                                </div>

                                <div className="content">
                                  <p className='time'>时间：{item.approveDate}</p>
                                </div>

                            </div>)
                        })
                        }
                  </div>
      </div>

    );
  }
}
