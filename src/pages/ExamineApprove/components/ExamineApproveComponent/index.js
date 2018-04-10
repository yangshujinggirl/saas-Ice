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
  Radio
 } from "@icedesign/base";
import './index.scss';
import Req from '../../reqs/ExamineApproveReq';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const { Group: RadioGroup } = Radio;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const formItemLayoutR = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
};

const label =(name)=> (
  <span>
    <Balloon
      type="primary"
      trigger={<span>{name}:</span>}
      closable={false}
      triggerType="hover">
      {name}
    </Balloon>
  </span>
);

class ExamineApproveComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadDetail:[]
    }
    this.field = new Field(this);
  }
  componentWillMount() {
    this.getLoanDetail('208')
  }
  //获取进件详情
  getLoanDetail(id) {
    Req.getLoanDetailApi(id)
    .then((res) => {
      const { data } = res;
      const { list } = data;
      this.setState({ loadDetail: list})
    },(error) => {
      console.log(error)
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors,values) => {
      console.log(values);
      if(errors) {
        return
      }
    })
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
    const { loadDetail } = this.state;
    const { init } = this.field;
    let InputMod = (ele) => {
      switch(ele.type) {
        case 'SELECT':
          return <Select
                    style={{width:"100%"}}
                    dataSource={this.state.dataSource}
                    disabled={ele.isFixed? true: false}
                    {...init(ele.name,
                      {'initValue':ele.isFixed? ele.value: ''},
                      { rules:[{ required: true, message: `${ele.label}不能为空` }] }
                    )}>
                    {
                      ele.options && ele.options.map((opt,ide) => (
                        <div value={opt.value} key={ide}>{opt.label}</div>
                      ))
                    }
                  </Select>
        case 'STRING':
          return <Input
                  trim
                  style={styles.select}
                  placeholder={ele.type}
                  htmlType='text'
                  disabled={ele.isFixed? true: false}
                  {...init(ele.name,
                    {'initValue':ele.isFixed? ele.value: ''},
                    { rules:[{ required: true, message:`${ele.label}不能为空` }]}
                  )}
                />
        case 'DECIMAL':
          return <Input
                  trim
                  style={styles.select}
                  hasLimitHint={true}
                  placeholder={ele.type}
                  disabled={ele.isFixed? true: false}
                  htmlType='number'
                  {...init(ele.name,
                    {'initValue':ele.isFixed? ele.value: ''},
                    {
                      rules:[
                        { required: true, message:`${ele.label}不能为空` ,min:2},
                        { validator: this.checkNum }
                      ]
                    }
                  )}
                />
        case 'INT':
          return <NumberPicker
                  disabled={ele.isFixed? true: false}
                  type="inline"
                  step={2}
                  min={1}
                  max={12}
                  {...init(ele.name,
                    {'initValue':ele.isFixed? ele.value: 0},
                    { rules:[{ required: true, message: `${ele.label}不能为空` }] }
                  )}
                />
        case 'ADDRESS':
          return <CascaderSelect
                    expandTrigger={this.state.trigger}
                    dataSource={addressDataSource}
                    onChange={this.handleChange}
                  />
        case 'RADIO':
          return <RadioGroup dataSource={ele.options} value={1}/>
        case 'DATE':
          return <DatePicker onChange={(val, str) => console.log(val, str)} style={{width:"100%"}}/>
      }
    }
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
              <Form
                labelAlign= "left"
                field={this.field}
                >
              {
                loadDetail.length>0 && loadDetail.map((ele,index) => (
                  <div className="part-same part-base-info" id={ele.name}  key={index}>
                    <p className="module-name">{ele.name}</p>
                    <div className="row-action">
                        {
                          ele.fields && ele.fields.map((flf,idx) => (
                            <FormItem
                              key={idx}
                              labelCol={{span: flf.type == 'RADIO'?2:8}}
                              wrapperCol={{span: 14 }}
                              label={label(flf.label)}
                              className={`item ${flf.type == 'RADIO'?'full-line':''}`}
                              >
                              {
                                InputMod(flf)
                              }
                            </FormItem>
                          ))
                        }
                    </div>
                  </div>
                ))
              }
              </Form>

            </Col>
          </Row>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  normalInput: {
    width:'140px'
  }
}

export default ExamineApproveComponent;
