import React, { Component } from 'react';
import {
  Form, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Field,
  Table, Transfer, Icon, Pagination
} from '@icedesign/base';

import IceContainer from '@icedesign/container';
// import CellEditor from './CellEditor';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Req from '../../../../reqs/ProductReq'

import './OrgType.scss';

const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;

//存储选中的数据
let arrayRightData = {
  jituan: [],
  qudao: [],
  tingdian: []
};//全局
let testarray = []; //右侧即将要渲染的数据

const CARTYPES = {
  '10': {
    name: '集团',
    key: 'group'
  },
  '30': {
    name: '渠道',
    key: 'channel'
  },
  '40': {
    name: '厅店',
    key: 'hallShop'
  }
}
export default class OrgType extends Component {
  static displayName = 'OrgType';
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      type: '',
      recordArray: [],//存储分页选中的数据
      dataSourceRight: [],//存储选中的数据，右侧数据源
      selectedRowKeys: [],//选中的复选框
      selectDate: [],
      rowSelection: {
        selectedRowKeys: [],
        // 表格发生勾选状态变化时触发
        onChange: (ids, array) => {
          let types = this.props.type;
          let recordArray = [ ...array];
          if (types == '10') {
            arrayRightData.jituan = recordArray
          } else if (types == '30') {
            arrayRightData.qudao  = recordArray
          } else {
            arrayRightData.tingdian = recordArray
          }

          let { rowSelection } = this.state;
          rowSelection.selectedRowKeys = ids;

          this.setState({
            rowSelection,
            recordArray,
            selectDate: arrayRightData
            
          })
          
        }
      }
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.type != this.props.type){
      let rowSelection = this.state.rowSelection;
      // rowSelection.selectedRowKeys = [];
      this.setState({rowSelection});
    }
  }
  componentWillMount() {
    let { actions } = this.props;
    let type = this.props.type;
    this.state.type = type
    actions.getGroupList(type,'')
  }

  componentWillUnmount(){
     //组件卸载，数据清空
    testarray = []
    arrayRightData =[]
  }

  renderDataWithGroup = (type, list) => {
    let groupType = CARTYPES[type];
    const tempData = []
    list.map((item, i) => {
      tempData.push({
        agencyType: groupType.name,
        agencyId: item.agencyId,
        agencyName: item.agencyName,
        idPath: item.idPath,
        namePath: item.namePath,
        relatedPath1:item.agencyType
        
      });
    })
    return tempData;
  }

  //查询
  searchCar() {
    let { actions, type, getGroupList } = this.props;
    let { name } = this.state.value;
    getGroupList(type, name);
  }
  onFormChange(value) {
    this.props.changeGroupName && this.props.changeGroupName(value.name);
    this.setState({
      value
    })
  }
  //向右移动
  onRight() {
    let GroupData = this.props.GroupData || {};
    GroupData.productScopes2 = []
    for (var key in arrayRightData) {
      for (var i = 0; i < arrayRightData[key].length; i++) {
        var flag = true;
        for (var j = 0; j < testarray.length; j++) {
          if (arrayRightData[key][i].agencyId == testarray[j].agencyId) {
            flag = false;
          }
        }

        if (flag) {
          testarray.push(arrayRightData[key][i]);
        }
      }
    }

    //去重后渲染
    let arra = testarray
    let dataSourceRight = this.state.dataSourceRight
    this.setState({
      dataSourceRight: arra
    })

    //右侧提交数据
    arra.map((item, i) => {
      GroupData.productScopes2.push({
        relatedId: item.agencyId,
        relatedName: item.agencyType == 'group' ? item.agencyName : (item.agencyType == 'channel' ? item.agencyName : item.agencyName),
        relatedPath: item.idPath + '/',
        relatedPath1:item.relatedPath1,
        relatedPathName: item.namePath + '/',
        type: 'GROUP'
      })
    })

  }
  //操作
  renderOperator = (value, index, record) => {
    return (
      <div>
        <a
          className='removeBtn'
          onClick={this.deleteItem.bind(this, index)}
        >
          删除
        </a>
      </div>
    );
  };
  //右侧删除一列
  deleteItem = (index) => {
    let data = this.state.dataSourceRight;
    let {GroupData={}} = this.props;

    data.splice(index, 1)
    if(data.length==0){
      GroupData.productScopes2=[]
    }
    this.setState({
      dataSourceRight: data
    })
    
  };
  //分页
  changePage = (currentPage) => {
    let { actions } = this.props;
    let { name2 } = this.state.value;
    let type = this.props.type;
    this.state.type = type;
    actions.getGroupList(type, name2, currentPage)
  };
  render() {
    let { groupData={}} = this.props;
    let type = this.props.type;
    let { list = [], page, limit, totalCount } = groupData
    
    let dataSource = this.renderDataWithGroup(type, list);
    // let dataSource =groupData
       
    return (
      <IceFormBinderWrapper
        ref={(formRef) => {
          this.formRef = formRef;
        }}
        value={this.state.value}
        onChange={this.onFormChange.bind(this)}
      >
        <div>
         
          <Row wrap className='formItem'>
            <Col s="4" l="4" xxs={24} xs={12} l={8}>
              <IceFormBinder
                name="name"
              >
                <Input size="large" style={{ width: '175px' }} placeholder="请输入查询名称" />
              </IceFormBinder>
              <IceFormError name="name" />
              <Button size="large" htmlType="submit" type="secondary" onClick={this.searchCar.bind(this)} style={{ marginLeft: 12 }}>
                查询
                </Button>
            </Col>
          </Row>

          <div className="table-center">
            <div className="table-left">
              <Table
                dataSource={dataSource}
                rowSelection={{
                  ...this.state.rowSelection
                }}
                maxBodyHeight={547}
                primaryKey='agencyId'
              >

                <Table.Column title="类型" dataIndex="agencyType" width={50} />
                <Table.Column title="名称" dataIndex="agencyName" width={200} />
              </Table>
              <div className='pagination'>
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={totalCount}
                  onChange={this.changePage}
                  shape="arrow-only"
                />
              </div>
            </div>
            <div className="btn-wrap">
              <Button className="table-center-btn add-btn" onClick={this.onRight.bind(this)}>>> </Button>
            </div>

            <div className="table-right">
              <Table
                dataSource={this.state.dataSourceRight}
                maxBodyHeight={430}
              >
                <Table.Column title="类型" dataIndex="agencyType" width={50} />
                <Table.Column title="名称" dataIndex="agencyName" width={300} />
                <Table.Column
                  title="操作"
                  cell={this.renderOperator}
                  lock="right"
                  width={50}
                />
              </Table>
            </div>
          </div>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

