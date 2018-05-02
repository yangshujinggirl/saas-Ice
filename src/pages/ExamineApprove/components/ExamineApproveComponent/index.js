import React ,{ Component }from 'react';
import IceContainer from '@icedesign/container';
import {
  Form,
  Input,
  Select,
  Field,
  DatePicker,
  Balloon,
  Icon,
  Grid,
  Button,
  Table,
  Pagination,
  NumberPicker,
  Radio,
  CascaderSelect
 } from "@icedesign/base";
import Req from '../../reqs/ExamineApproveReq';
import FormModule from './FormModule';
import './index.scss';

const { Row, Col } = Grid;


class ExamineApproveComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
    const { proInstId, loanId } = this.props.params;
    // this.props.actions.approveLoanDetail(proInstId,loanId);
    this.props.actions.approveLoanDetail();
  }

  
  //锚点跳转，点击事件
  menuNav = (archer,index) => {
    if (archer) {
      let anchorElement = document.getElementById(archer);
      if(anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  }
  render() {
    const { list=[] } = this.props.pageData;
    return(
      <div className="examine-approve-pages">
        <IceContainer title="进件审批查询-审批（平常风控）-流程轨迹" className="subtitle">
          <Row align="stretch" className="content-wrap">
            <Col span={3}>
              <ul className="sidebar">
                <li className="item selected" onClick={()=> this.menuNav('process')}>流程轨迹</li>
                <li className="item" onClick={()=> this.menuNav('suggest')}>平常建议</li>
                <li className="item" onClick={()=> this.menuNav('customInfo')}>客户信息</li>
                <li className="item" onClick={()=> this.menuNav('busInfo')}>车辆信息</li>
                <li className="item" onClick={()=> this.menuNav('materials')}>材料提交</li>
                <li className="item" onClick={()=> this.menuNav('partner')}>合作方信息</li>
              </ul>
            </Col>
            <Col span={21} className="main-content-action">
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
              <div className="part-same part-suggest" id="suggest">
                <p className="module-name">平常建议</p>
                <div className="suggest-action">平常建议</div>
              </div>
              <div className="part-same part-partner" id="partner">
                <p className="module-name">合作方消息</p>
                <div className="partner-action">
                  <div className="item">
                    <p className="partner-name">客户经理-王1</p>
                    <div className="info-action">
                      <div className="table-row">
                        <span className="col"></span>
                        <span className="col">进件数</span>
                        <span className="col">通过率</span>
                        <span className="col">不良率</span>
                      </div>
                      <div className="row-list">
                        <div className="row">
                          <span className="col">月</span>
                          <span className="col">进件数</span>
                          <span className="col">通过率</span>
                          <span className="col">不良率</span>
                        </div>
                        <div className="row">
                          <span className="col">年</span>
                          <span className="col">进件数</span>
                          <span className="col">通过率</span>
                          <span className="col">不良率</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <p className="partner-name">客户经理-王1</p>
                    <div className="info-action">
                      <div className="table-row">
                        <span className="col"></span>
                        <span className="col">进件数</span>
                        <span className="col">通过率</span>
                        <span className="col">不良率</span>
                      </div>
                      <div className="row-list">
                        <div className="row">
                          <span className="col">月</span>
                          <span className="col">进件数</span>
                          <span className="col">通过率</span>
                          <span className="col">不良率</span>
                        </div>
                        <div className="row">
                          <span className="col">年</span>
                          <span className="col">进件数</span>
                          <span className="col">通过率</span>
                          <span className="col">不良率</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <FormModule list={list}/>
            </Col>
          </Row>
        </IceContainer>
      </div>
    )
  }
}

export default ExamineApproveComponent;
