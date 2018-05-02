import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Button,
  Grid,
  Table,
 } from "@icedesign/base";
 import EditPermissions from './components/EditPermissions';

const { Row, Col } = Grid;

class CheckAuthority extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataSource =[
      {
        num:0,
        name:'主贷人征信评分'
      },
      {
        num:1,
        name:'主贷人征信评分'
      },
      {
        num:2,
        name:'主贷人征信评分'
      },
      {
        num:3,
        name:'主贷人征信评分'
      },
    ]
    return (
      <div className="check-detail-page">
        <IceContainer title="查看权限配置" className="subtitle">
          <Row className="row">
            <Col span={6}>业务类型:贷款业务类型</Col>
            <Col span={6}>资方:中国银行</Col>
            <Col span={6}>产品类型:新车贷</Col>
            <Col span={6}>产品名称:豪华车1</Col>
          </Row>
          <Table dataSource={dataSource} className="table-list">
            <Table.Column title="序号" dataIndex="num"/>
            <Table.Column title="名称" dataIndex="name"/>
          </Table>
          <Button type="primary" className="return-btn">返回</Button>
        </IceContainer>
        <EditPermissions visible={true}/>
      </div>
    );
  }
}

export default CheckAuthority;
