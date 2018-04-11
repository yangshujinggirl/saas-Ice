import React, { Component } from 'react';

import {
  Button,
  Grid,
  Table,
  Dialog,
  Transfer,
  Tree
 } from "@icedesign/base";
const { Node: TreeNode } = Tree;
const { Row, Col } = Grid;

import './index.scss';

const data = [
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
        name: "角色1",
        age: 33,
      },
      {
        key: 22,
        name: "角色2",
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
        name: "角色1",
        age: 33,
      },
      {
        key: 32,
        name: "角色2",
        age: 33,
      }
    ]
  }
];
const data2 = [
  {
    name:'lllll'
  },
  {
    name:'ffff'
  },
  {
    name:'eeee'
  },
  {
    name:'ssss'
  }
]

class EditPermissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:true
    }
  }
  onClose() {

  }
  
  addItem() {

  }
  render() {
    return (
      <div>
        <Dialog
          visible={this.state.visible}
          onOk={this.onClose.bind(this)}
          onCancel={this.onClose.bind(this)}
          onClose={this.onClose.bind(this)}
          className="edit-dialog-wrap"
          style={{width:'80%'}}
        >
          <div className="edit-permission-dialog">
            <div className="table-list">
              <Table
                dataSource={data}
                primaryKey="key"
                isTree
                rowSelection={{ onChange: (selectedRowKeys,records) => {console.log(records)} }}
                className="table-l"
                >
                  <Table.Column title="机构" dataIndex="name" />
              </Table>
              <div className="btn-wrap">
                <Button className="add-btn" onClick={()=>this.addItem()}>>> </Button>
              </div>
              <Table
                dataSource={data2}
                primaryKey="key"
                isTree
                rowSelection={{ onChange: () => {} }}
                className="table-r"
                >
                  <Table.Column title="权限" dataIndex="name" />
                  <Table.Column title="操作" dataIndex="name" />
              </Table>
            </div>
          </div>

        </Dialog>
      </div>
    );
  }
}

export default EditPermissions;
