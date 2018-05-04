import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';

import {
  Input,
  Button,
  Select,
  Grid,
  Table,
  Form,
  Upload
} from '@icedesign/base';

import FormModule from './FormModule';
import './index.scss'

const { Row, Col } = Grid;

class Bind extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow:[],
      dataSourceRight:[]
    }
  }
  addItem() {
    let dataSourceRight=[];

    dataSourceRight.push(...this.state.selectedRow);
    this.setState({
      dataSourceRight
    })
  }
  deleteItem(index) {
    let { dataSourceRight }=this.state;
    dataSourceRight.splice(index,1);
    this.setState({
      dataSourceRight
    })
  }
  onChange =(selectedRowKeys,records)=> {
   let selectedRow=[];
   selectedRow.push(...records);
   this.setState({
     selectedRow
   })
  }
  //操作
  renderOperator = (value, index, record) => {
    return (
        <Button
          type="primary"
          shape="text"
          onClick={this.deleteItem.bind(this, index)}>
          删除
        </Button>
    );
  };
  render() {
    const { columns } = this.props;
    const dataSourceOne =[
      {
        type:'1001',
        name:'产品1',
        id:0
      },
      {
        type:'1002',
        name:'产品2',
        id:1
      },
    ]
    console.log(this.state.selectedRow)
    return(
      <IceContainer className="pch-container contract-bind-page">
          <IceFormBinderWrapper ref="form">
            <div className="pch-form">
              <Form
                size="large"
                labelAlign="left">
                <Title title="选择产品" />
                <div className="change-product">
                  <Table
                    primaryKey="id"
                    dataSource={dataSourceOne}
                    rowSelection={{ onChange: this.onChange }}
                    className="part-left">
                    <Table.Column title="产品类型" dataIndex="type" />
                    <Table.Column title="产品名称" dataIndex="name" />
                  </Table>
                  <div className="btn-wrap">
                    <Button className="add-btn" onClick={()=>this.addItem()}>>> </Button>
                  </div>
                  <Table dataSource={this.state.dataSourceRight} className="part-right">
                    <Table.Column title="产品类型" dataIndex="type" />
                    <Table.Column title="产品名称" dataIndex="name" />
                    <Table.Column title="操作" cell={this.renderOperator} />
                  </Table>
                </div>
                <Title title="选择字段" />
                <div className="action-block">
                  <FormModule />
                </div>
              </Form>
            </div>
          </IceFormBinderWrapper>
      </IceContainer>
    )
  }
}

export default Bind;
