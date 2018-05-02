import React, { Component } from 'react';

import {
  Button,
  Grid,
  Table,
  Dialog,
  Pagination
 } from "@icedesign/base";

const { Row, Col } = Grid;

import './index.scss';

const data = [
  [
    {
      key: 1,
      name: "总部-上海分公司",
      age: 32,
      children: []
    },
    {
      key: 2,
      name: "浦东营业部",
      age: 32,
      children: [
        {
          key: 21,
          name: "浦东营业部-角色1",
          secondName: "浦东营业部-角色1",
          age: 33,
        },
        {
          key: 22,
          name: "浦东营业部-角色2",
          secondName: "浦东营业部-角色2",
          age: 33,
        }
      ]
    },
    {
      key: 3,
      name: "浦西营业部",
      age: 32,
      children: [
        {
          key: 31,
          name: "浦西营业部-角色1",
          secondName: "浦西营业部-角色1",
          age: 33,
        },
        {
          key: 32,
          name: "浦西营业部-角色2",
          secondName: "浦西营业部-角色2",
          age: 33,
        }
      ]
    }
  ],
  [
    {
      key: 4,
      name: "总部-深圳分公司",
      age: 32,
      children: []
    },
    {
      key: 5,
      name: "龙华营业部",
      age: 32,
      children: [
        {
          key: 51,
          name: "龙华营业部-角色1",
          secondName: "龙华营业部-角色1",
          age: 33,
        },
        {
          key: 52,
          name: "龙华营业部-角色2",
          secondName: "龙华营业部-角色2",
          age: 33,
        }
      ]
    },
    {
      key: 6,
      name: "南山营业部",
      age: 32,
      children: [
        {
          key: 61,
          name: "角色1",
          secondName: "南山营业部-角色1",
          age: 33,
        },
        {
          key: 62,
          name: "角色2",
          secondName: "南山营业部-角色2",
          age: 33,
        }
      ]
    }
  ]
];

class EditPermissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:this.props.visible,
      dataSourceRight:[],
      selectedRowOne:[],
      selectedRowTwo:[],
      current:1
    }
    this.rowSelection = {
      onChange:(selectedRowKeys,records) => {
        let selectedRowOne=[];
        selectedRowOne.push(...records);
        this.setState({
          selectedRowOne
        });
      }
    }
    this.rowSelectionTwo = {
      onChange:(selectedRowKeys,records) => {
        let selectedRowTwo=[];
        selectedRowTwo.push(...records);
        this.setState({
          selectedRowTwo
        });
      }
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      visible:this.props.visible
    })
  }
  onClose() {
    Dialog.confirm({
      content: "取消后本次操作将不被保存，您确定吗？",
      onOk: () => {
        this.setState({
          visible:false
        })
      }
    });
  }
  onOk() {
    this.setState({
      visible:false
    })
  }

  addItem() {
    let dataSourceRight =[];
    dataSourceRight.push(...this.state.selectedRowTwo,...this.state.selectedRowOne)
    this.setState({
      dataSourceRight
    })
  }
  deleteEvent(index) {
    const { dataSourceRight } = this.state;
    dataSourceRight.splice(index,1)
    this.setState({
      dataSourceRight
    })
  }
  renderOperation(value, index, record) {
    return (
        <Button
          type='normal'
          shape="text"
          onClick = {()=>this.deleteEvent(index)}
        >
          删除
        </Button>
    );
  }
  renderLevel(value, index, record) {
    return record.name
  }
  changePage(current) {
    this.setState({
      current
    })
  }

  render() {
    const { dataSourceRight, current, visible } = this.state;
    const renderFooter = (
              <div className="permission-btn-list">
                <Button className="submit-btn" onClick={()=>this.onOk()}>提交 </Button>
                <Button className="cancel-btn" onClick={()=>this.onClose()}>取消</Button>
              </div>
          )
    return (
      <div>
        <Dialog
          visible={visible}
          onOk={()=>this.onClose()}
          onCancel={()=>this.onClose()}
          onClose={()=>this.onClose()}
          className="edit-dialog-wrap"
          footer={renderFooter}
          className="edit-permission-dialog-wrap"
        >
          <div className="edit-permission-dialog-content">
            <div className="table-list">
              <div className="part-l">
                <Table
                  dataSource={data[0]}
                  primaryKey="key"
                  style={{width:'100%'}}
                  isTree
                  rowSelection={{...this.rowSelection}}
                  >
                    <Table.Column title="机构" cell={this.renderLevel}/>
                </Table>
                <Table
                  dataSource={data[1]}
                  primaryKey="key"
                  style={{width:'100%'}}
                  isTree
                  rowSelection={{...this.rowSelectionTwo}}
                  >
                    <Table.Column title="其他机构" dataIndex="name" />
                </Table>
              </div>
              <div className="btn-wrap">
                <Button className="add-btn" onClick={()=>this.addItem()}>>> </Button>
              </div>
              <div className="part-r">
                <Table
                  dataSource={dataSourceRight}
                  fixedHeader
                  style={{width:'100%'}}
                  maxBodyHeight={370}
                  >
                    <Table.Column title="权限" dataIndex="name" />
                  <Table.Column title="操作" cell={()=>this.renderOperation()}/>
                </Table>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default EditPermissions;
