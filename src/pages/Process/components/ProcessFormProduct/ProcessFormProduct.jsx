import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';

import { Title, PchTable, PchPagination } from 'components';
import FilterItem from './Filter'
import {
   Button,
   Grid,
   Table,
   Pagination
} from "@icedesign/base";

const { Row, Col } = Grid;

import './ProcessFormProduct.scss';

export default class ProcessFormProduct extends BaseApp {
   constructor(props) {
      super(props);
      this.state = {
         visible: this.props.visible,
         dataSourceRight: [],
         selectedRowOne: [],
         productType:[],

      }
      this.rowSelection = {
         onChange: (selectedRowKeys, records) => {
            let selectedRowOne = [];
            selectedRowOne.push(...records);
            this.setState({
               selectedRowOne
            });
         }
      }
   }


   componentWillMount() {
    
   }
   componentDidMount() {
      this.fetchData();
   }
   fetchData = (condition) => {
      this._condition = Object.assign(this._condition, condition);
      this.props.actions.getProcessProdList(this._condition);
   }
   //点击分页
   changePage = (currentPage) => {
     console.log(currentPage)
      this._condition.page = currentPage;
      this.props.actions.getProcessProdList(this._condition);
   }
   componentWillReceiveProps(props) {
      this.setState({
         visible: this.props.visible
      })
   }
   //右侧增加数据
   addItem() {
      let dataSourceRight = [];
      // dataSourceRight.push(...this.state.selectedRowTwo, ...this.state.selectedRowOne)
      dataSourceRight.push(...this.state.selectedRowOne)
      this.setState({
         dataSourceRight
      })
   }
   //删除
   deleteEvent(index) {
      const { dataSourceRight } = this.state;
      dataSourceRight.splice(index, 1)
      this.setState({
         dataSourceRight
      })
   }
   renderOperation(value, index, record) {
      return (
         <Button
            type='normal'
            shape="text"
            onClick={() => this.deleteEvent(index)}
         >
            删除
        </Button>
      );
   }
   //产品类型
   renderType(value, index, record) {
      return record.productType
   }
   //左侧 名称
   renderName(value, index, record) {
      return record.name
   }
   //保存
   handleSave = () => {
     let data = this.state.dataSourceRight
      this.props.actions.ProcessProdSave(data)
   }
   /**
    * 渲染
    */
   render() {
      const { dataSourceRight, visible, productType} = this.state;
      let { formData } = this.props;
      return (
         <IceContainer className="pch-container">
            <Title title="流程配置产品" />
            <FilterItem onSubmit={this.fetchData} typedata={productType}/>
            <div className="edit-permission-dialog-contents">
               <div className="table-list">
                  <div className="part-l">
                     <p>查询结果</p>
                     <Table
                        dataSource={formData.list}
                        // primaryKey="key"
                        style={{ width: '100%' }}
                        isTree
                        rowSelection={{ ...this.rowSelection }}
                     >
                        <Table.Column title="产品类型" cell={this.renderType} />
                        <Table.Column title="名称" cell={this.renderName} />
                     </Table>
                     <PchPagination dataSource={formData} onChange={this.changePage} />
                  </div>
                  <div className="btn-wrap">
                     <Button className="add-btn" onClick={() => this.addItem()}>>> </Button>
                  </div>
                  <div className="part-r">
                     <p>已选产品</p>
                     <Table
                        dataSource={dataSourceRight}
                        fixedHeader
                        style={{ width: '100%' }}
                        maxBodyHeight={370}
                     >
                        <Table.Column title="编码" dataIndex="productType" />
                        <Table.Column title="名称" dataIndex="name" />
                        <Table.Column title="操作" cell={() => this.renderOperation()} />
                     </Table>
                  </div>
               </div>
               <div className="container">
                  <div className="next-btn-box pch-form-buttons">
                     <Button type="primary" className="return-btn buttonsBack" onClick={this.handleSave}>
                        保存
                     </Button>
                  </div>
               </div>
            </div>
         </IceContainer>
      )
   }
}
