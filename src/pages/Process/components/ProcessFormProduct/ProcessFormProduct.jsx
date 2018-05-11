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

let arrayRightData = [];
const testarray = []; //右侧即将要渲染的数据
export default class ProcessFormProduct extends BaseApp {
  constructor(props) {
    super(props);

    this.rowSelection = {
      onChange: (selectedRowKeys, records) => {
        arrayRightData = [...records];
        console.log(arrayRightData)

        // let selectedRowOne = [];
        // selectedRowOne.push(...records);
        // this.setState({
        //    selectedRowOne
        // });
        this.setState({
          selectedRowKeys: selectedRowKeys,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
      },
    }
    let { formOldData=[] } = this.props
    this.state = {
      visible: this.props.visible,
      dataSourceRight: [],
      saveDataRight:[],
      selectedRowKeys: [],
      selectedRowOne: [],
      productType: [],

    }
  }


  componentWillMount() {
    this.props.actions.getProcessProdOldList()
    
  }
  componentDidMount() {
    this.fetchData();
    // this.fetchOldData();
  }
  
  fetchData = (condition) => {
    this._condition = Object.assign(this._condition, condition);
    this.props.actions.getProcessProdList(this._condition);
    
  }
  //点击分页
  changePage = (currentPage) => {
    this._condition.page = currentPage;
    this.props.actions.getProcessProdList(this._condition);
  }
  componentWillReceiveProps(props) {
    this.setState({
      visible: props.visible,
      dataSourceRight: props.formOldData
    })
  }
  //右侧增加数据
  addItem() {
    let { params } = this.props;
    
    for (var key in arrayRightData) {
      for (var i = 0; i < arrayRightData.length; i++) {
        var flag = true;
        for (var j = 0; j < testarray.length; j++) {
          if (arrayRightData[key].id == testarray[j].id) {
            flag = false;
          }
        }

        if (flag) {
          testarray.push(arrayRightData[key]);
        }
      }
    }

    //去重后渲染
    let arra = [];
    testarray.map((item,i)=>{
      arra.push({
        productId: item.id,
        productName: item.name,
        productType: item.productType,
        processDefId: params.id,
        status: item.status,
        businessTypeId: 1,
        businessTypeName: "贷款业务",
        tenantId: 123,

      })
    })
    this.setState({
      dataSourceRight: arra,
      saveDataRight:arra
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
  handleCancel = () => {
    hashHistory.push('/process')
  }
  //保存
  handleSave = () => {
    let data = this.state.saveDataRight;
    console.log(data)
    this.props.actions.saveProcessConfigProduct(data)
  }
  /**
   * 渲染
   */
  render() {
    const { dataSourceRight, visible, productType } = this.state;
    
    let { formData,params } = this.props;
    return (
      <IceContainer className="pch-container">
        <FilterItem onSubmit={this.fetchData} typedata={productType} params={params} />
        <div className="pch-form edit-permission-dialog-contents">
          <div className="table-list">
            <div className="part-l">
              <p>查询结果</p>
              <Table
                dataSource={formData.list}
                // primaryKey="key"
                style={{ width: '100%' }}
                isTree
                rowSelection={{
                  ...this.rowSelection,
                  selectedRowKeys: this.state.selectedRowKeys
                }}
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
                <Table.Column title="编码" dataIndex="productId" />
                <Table.Column title="名称" dataIndex="productName" />
                <Table.Column title="操作" cell={() => this.renderOperation()} />
              </Table>
            </div>
          </div>
          <div className="next-btn-box pch-form-buttons">
              <Button type="normal" size="large" onClick={this.handleCancel}>
                  返回
              </Button>
              <Button type="secondary" className="return-btn buttonsBack" onClick={this.handleSave}>
                保存
              </Button>
          </div>
        </div>
      </IceContainer>
    )
  }
}
