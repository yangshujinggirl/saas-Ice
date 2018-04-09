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
  Pagination
 } from "@icedesign/base";

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
  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors,values) => {
      console.log(values);
      if(errors) {
        return
      }
    })
  }
  render() {
    const { init } = this.field;
    const dataSource = [
      {
        num:'0',
        name:'平平',
        idType:'身份证',
        idCard:'413026199008255778',
        phoneNum:'13652345556',
        money:'99999',
      },
      {
        num:'1',
        name:'平安',
        idType:'身份证',
        idCard:'413026199008255778',
        phoneNum:'13652345556',
        money:'99999',
      },
      {
        num:'2',
        name:'平宝',
        idType:'身份证',
        idCard:'413026199008255778',
        phoneNum:'13652345556',
        money:'99999',
      },
      {
        num:'3',
        name:'平福',
        idType:'身份证',
        idCard:'413026199008255778',
        phoneNum:'13652345556',
        money:'99999',
      },
    ]
    return(
      <div className="audit-list-pages">
        <IceContainer title="查询列表" className="subtitle">
          <Form>
            <Row>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('贷款名称')}>
                 <Input
                   placeholder="请输入贷款名称"
                   style={styles.normalInput}
                   {...init('loanName')}
                 />
               </FormItem>
             </Col>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('主贷人姓名')} required>
                 <Input
                   placeholder="请输入主贷人姓名"
                   style={styles.normalInput}
                   {...init('userName')}
                 />
               </FormItem>
             </Col>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('申请开始时间')}>
                 <DatePicker
                   style={styles.normalInput}
                   {...init('startTime')}
                 />
               </FormItem>
             </Col>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('申请结束时间')}>
                 <DatePicker
                   style={styles.normalInput}
                   {...init('endTime')}
                 />
               </FormItem>
             </Col>
             <Col span="1p5">
               <FormItem {...formItemLayout} label={label('展厅名称')}>
                 <Select
                   style={styles.normalInput}
                   {...init('exhibitionName')}
                   >
                   <div value="option1">option1</div>
                   <div value="option2">option2</div>
                   <div disabled>disabled</div>
                 </Select>
               </FormItem>
             </Col>

           </Row>
           <Row justify="center">
             <Col offset="10" className='botton-col'>
               <Button
                 type="primary"
                 onClick={this.handleSubmit.bind(this)}
                 >
                   查询
               </Button>
             </Col>
           </Row>
          </Form>
          <Table dataSource={dataSource} className="table-list">
            <Table.Column title="编号" dataIndex="num"/>
            <Table.Column title="姓名" dataIndex="name"/>
            <Table.Column title="证件类型" dataIndex="idType"/>
            <Table.Column title="证件号码" dataIndex="idCard"/>
            <Table.Column title="手机号" dataIndex="phoneNum"/>
            <Table.Column title="金额" dataIndex="money"/>
          </Table>
          <Pagination
            className='pagination-wraps'
            shape="arrow-only"
            current={0}
            pageSize={4}
            total={20}
          />
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
