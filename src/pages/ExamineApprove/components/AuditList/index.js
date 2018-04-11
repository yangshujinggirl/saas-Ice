import React ,{ Component }from 'react';
import {hashHistory} from 'react-router';
import IceContainer from '@icedesign/container';
import {
  Form,
  Input,
  Button,
  Select,
  Field,
  DatePicker,
  Balloon,
  Icon,
  Grid,
  Table,
  Pagination,
  moment
 } from "@icedesign/base";
 import Req from '../../reqs/ExamineApproveReq';

import './index.scss';
const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
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

class AuditList extends Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }
  componentWillMount() {
    this.props.actions.aduitList()
  }
  //操作
  operationEvent(record) {
    if(record.status == 'claim') {
      // this.goClaim()
      hashHistory.push(`/examineapprove/detail/${record.productId}`)
    } else {
      hashHistory.push(`/examineapprove/detail/${record.productId}`)
    }
  }
  //去签收
  goClaim() {
    console.log('去签收')
  }
  //表格操作
  renderOperator = (value, index, record) => {
    return (
        <Button
          type='normal'
          shape="text"
          onClick = {()=>this.operationEvent(record)}
        >
          {record.status == "claim" ?'签收':'详情'}
        </Button>
    );
  };
  //提交查询
  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors,values) => {
      let startTime = this.field.getValue('submitStart');
      let endTime = this.field.getValue('submitEnd');
      startTime = startTime && moment(startTime).format('YYYY-MM-DD HH:mm:ss');
      endTime = endTime && moment(endTime).format('YYYY-MM-DD HH:mm:ss');
      this.field.setValue('submitStart', startTime);
      this.field.setValue('submitEnd', endTime);
      let params = this.field.getValues()
      if(errors) {
        return
      }
      this.props.actions.aduitList(params)
    })
  }
  render() {
    const { init } = this.field;
    const { list=[], limit, page, total} = this.props.pageData;

    return(
      <div className="audit-list-pages">
        <IceContainer title="查询列表" className="subtitle">
          <Form>
            <Row>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('贷款编号')}>
                 <Input
                   placeholder="请输入贷款名称"
                   style={styles.normalInput}
                   {...init('code')}
                 />
               </FormItem>
             </Col>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('主贷人姓名')} required>
                 <Input
                   placeholder="请输入主贷人姓名"
                   style={styles.normalInput}
                   {...init('borrowerName')}
                 />
               </FormItem>
             </Col>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('申请开始时间')}>
                 <DatePicker
                   style={styles.normalInput}
                   {...init('submitStart')}
                 />
               </FormItem>
             </Col>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('申请结束时间')}>
                 <DatePicker
                   style={styles.normalInput}
                   {...init('submitEnd')}
                 />
               </FormItem>
             </Col>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('展厅名称')}>
                 <Select
                   style={styles.normalInput}
                   {...init('exhibitionHallName')}
                   >
                   <div value="option1">option1</div>
                   <div value="option2">option2</div>
                   <div value="option3">option3</div>
                 </Select>
               </FormItem>
             </Col>

           </Row>
           <Row justify="center">
             <Col offset="10" className='botton-col'>
               <Button
                 type="primary"
                 onClick={this.handleSubmit.bind(this)}
                 className="search-btn"
                 >
                   查询
               </Button>
             </Col>
           </Row>
          </Form>
          <Table dataSource={list} className="table-list">
            <Table.Column title="编号" dataIndex="code"/>
            <Table.Column title="姓名" dataIndex="borrowerName"/>
            <Table.Column title="证件类型" dataIndex="borrowerIdType"/>
            <Table.Column title="证件号码" dataIndex="borrowerIdNo"/>
            <Table.Column title="手机号" dataIndex="borrowerMobile"/>
            <Table.Column title="金额" dataIndex="principalAmount"/>
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              lock="right"
              width={140}
            />
          </Table>
          {
            list.length>0 && <Pagination
                              className='pagination-wraps'
                              shape="arrow-only"
                              current={page}
                              pageSize={limit}
                              total={total}
                            />
          }
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  normalInput: {
    width:'130px'
  }
}

export default AuditList;
