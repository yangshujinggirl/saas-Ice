import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base'
import { Title, PchTable, PchPagination } from 'components';
import { PROCESS_VIEW } from '../../../constants/ProcessViewConstant';

import {
  Button,
  Grid,
  Table,
  Dialog,
  Pagination,
  Form
} from "@icedesign/base";

const { Row, Col } = Grid;

import './ProcessAuthEdit.scss';

export default class ProcessAuthEdit extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      dataSourceRight:this.props.data,
      selectedRowOne: [],
      selectedRowTwo: [],
      current: 1
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
    this.rowSelectionTwo = {
      onChange: (selectedRowKeys, records) => {
        let selectedRowTwo = [];
        selectedRowTwo.push(...records);
        this.setState({
          selectedRowTwo
        });
      }
    }
  }
  componentDidMount(){
  }
  componentWillReceiveProps(props) {
    this.setState({
      visible: this.props.visible,
      dataSourceRight:this.props.data
    })
  }
  onClose() {
    const { visibled, changeView } = this.props;
    Dialog.confirm({
      content: "取消后本次操作将不被保存，您确定吗？",
      onOk: () => {
        this.setState({
          visible: false
        })
        changeView(PROCESS_VIEW.EDITFORM);
      }
    });
  }
  //确定
  submit(){
    let dataArry =  this.state.dataSourceRight
    let datatemp = [];
    for (var key in dataArry){
      datatemp.push({
        roleId: dataArry[key].roleId,
        orgId: dataArry[key].orgId,
        orgName: dataArry[key].orgName,
        roleName: dataArry[key].roleName,
        departmentId: dataArry[key].departmentId,
        departmentName:dataArry[key].departmentName
      })
    }
    this.props.onSave(datatemp)
  }

  addItem() {
    let dataSourceRight = [];
    dataSourceRight.push(...this.state.selectedRowTwo, ...this.state.selectedRowOne)
    this.setState({
      dataSourceRight
    })
  }
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
  renderLevel(value, index, record) {
    return record.departmentName
  }
  changePage(current) {
    this.setState({
      current
    })
  }

  /**
   * 渲染
   */
  render() {
    const { dataSourceRight, current } = this.state;
    const { visible, changeView, formData,orgsData } = this.props;
    return (
      <IceContainer className="pch-container" style={{ display: visible ? '' : 'none' }}>
        <Title title="权限编辑" />
        <div className="pch-form edit-permission-dialog-content pch-condition">
          <Form size="large" direction="hoz">
            <Row className="row">
              <Col span={6}>
                业务类型:{formData.businessTypeName}
              </Col>
              <Col span={6}>
                资方:{formData.tenantName}
              </Col>
              <Col span={6}>
                流程名称:{formData.processName}
              </Col>
            </Row>
          </Form>
          <div className='center'>审查-权限配置</div>
          <div className="table-list">
            <div className="part-l">
              <Table
                dataSource={orgsData.departments}
                primaryKey="key"
                style={{ width: '100%' }}
                isTree
                rowSelection={{ ...this.rowSelection }}
              >
                <Table.Column title="机构" cell={this.renderLevel} />
              </Table>
              <Table
                dataSource={orgsData.otherOrgs}
                // primaryKey="key"
                style={{ width: '100%' }}
                isTree
                rowSelection={{ ...this.rowSelectionTwo }}
              >
                <Table.Column title="其他机构" dataIndex="departmentName" />
              </Table>
            </div>
            <div className="btn-wrap">
              <Button className="add-btn" onClick={() => this.addItem()}>>> </Button>
            </div>
            <div className="part-r">
              <Table
                dataSource={dataSourceRight}
                fixedHeader
                style={{ width: '100%' }}
                maxBodyHeight={370}
              >
                <Table.Column title="权限" dataIndex="orgName" />
                <Table.Column title="操作" cell={() => this.renderOperation()} />
              </Table>
            </div>
          </div>
          <div className="container">
            <div className="next-btn-box pch-form-buttons">

              {/* <Button type="primary" className="return-btn buttonsBack" onClick={changeView.bind(this, PROCESS_VIEW.EDITFORM)}> */}
              <Button type="normal" className="return-btn buttonsBack" onClick={() => this.onClose()}>
                取消
              </Button>
              <Button type="secondary" className="buttonsSure" onClick={() => this.submit()}>
                确定
              </Button>
            </div>
          </div>
        </div>
      </IceContainer>
    )
  }
}
