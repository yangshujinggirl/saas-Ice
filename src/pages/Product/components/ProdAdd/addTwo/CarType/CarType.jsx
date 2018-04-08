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

import './CarType.scss';
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;

const arrayRightData = [];//全局

const CARTYPES = {
  '1': {
    name: '品牌',
    key: 'brandName'
  },
  '2': {
    name: '车系',
    key: 'seriesGroupName'
  },
  '3': {
    name: '车型',
    key: 'modelName'
  }
}

export default class CarType extends Component {
  static displayName = 'CarType';
  constructor(props) {
    super(props);

    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids,array) => {
        let arra = []
        arrayRightData.push(...array)
        this.setState({
          selectDate: arrayRightData
        })
        
        console.log('ids', array);
        this.setState({
          selectedRowKeys: ids,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
      },
    };

    this.state = {
      value: {},
      type: '',
      dataSourceRight:[],//存储选中的数据，渲染右侧
      selectedRowKeys: [],//选中的复选框
      selectDate: []
    };
   
  }
  componentDidMount() {
    console.log(this.props)
    let { actions, addTwoData } = this.props;
    let val = this.props.data;
    this.state.type = val
    actions.addTwoList(val, '')

  }

  renderDataWithCar = (type, list) => {
    let carType = CARTYPES[type];
    const tempData = []
    list.map((item, i) => {
      tempData.push({
        type:carType.name,
        id:item.id,
        name:item.name
      });
    })
    return tempData;
  }
  
  //查询
  searchCar() {
    let { actions, data, getCarList } = this.props;
    let { name } = this.state.value;
    getCarList(data, name);
  }
  onFormChange(value) {
    this.props.changeCarName && this.props.changeCarName(value.name);
    this.setState({
      value
    })
  }
  //向右移动
  onRight(){
    let CarData = this.props.CarData || {};
    CarData.productScopes = []
    let testarray = []
    for(var i=0;i<arrayRightData.length;i++){
      　　var flag = true;
      　　for(var j=0;j<testarray.length;j++){
      　　　　if(arrayRightData[i].id == testarray[j].id){
      　　　　　　flag = false;
      　　　　};
      　　}; 
      　　if(flag){
        testarray.push(arrayRightData[i]);
      　　};
    };
      //去重后渲染
    let arra = testarray
      this.setState({
        dataSourceRight: arra
      })

    //右侧提交数据
    testarray.map((item,i)=>{
      CarData.productScopes.push({
        relatedId:item.id,
        relatedName:item.type,
        relatedPath:'',
        relatedPathName:'',
        type:'CARS'
      })
    })
  }
  //操作
  renderOperator = (value, index, record) => {
    return (
      <div>
        <a
          style={styles.removeBtn}
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
  console.log(index);
  
  data.splice(index,1)
  this.setState({
    dataSourceRight: data
  })
};
//分页
changePage = (currentPage) => {
  let { actions, addTwoData } = this.props;
  let { name } = this.state.value;
  let val = this.props.data;
  this.state.type = val
  actions.addTwoList(val, name,currentPage)
};
  render() {
    let addTwoData = this.props.addTwoData || {};
    let type = this.props.data;
    let list = addTwoData.data || {};
    let page = list.page;
    let limit = list.limit ;
    let total = list.total;
        list = list.list || [];

    let dataSource = this.renderDataWithCar(type, list);

    return (
      <IceFormBinderWrapper
        ref={(formRef) => {
          this.formRef = formRef;
        }}
        value={this.state.value}
        onChange={this.onFormChange.bind(this)}
      >
        <div>
          <IceContainer>
            <Row wrap style={styles.formItem}>
              <Col s="4" l="4" xxs={24} xs={12} l={8} style={styles.filterCol}>
                <IceFormBinder
                  name="name"
                >
                  <Input style={{ width: '175px' }} placeholder="请输入查询名称" />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
              <Col s="4" l="4" xxs={24} xs={12} l={8} style={styles.filterCol}>
                <button style={styles.btns} type='submit' onClick={this.searchCar.bind(this)}>
                  查询
                </button>
              </Col>
            </Row>
            {/* <Row wrap style={{marginBottom:"30px"}} >
                <Transfer 
                  titles={['选项',' 选项']}
                  dataSource={dataSource}
                  defaultLeftChecked={["0"]}
                  listStyle={{width:"500px",height:"320px"}}
                  onChange={this.leftData}
                >
                </Transfer>
              </Row>*/}
          </IceContainer>
          <IceContainer>
            <div className="table-center">
              <div className="table-left">
                <Table
                  dataSource={dataSource}
                  rowSelection={{
                    ...this.rowSelection,
                    selectedRowKeys: this.state.selectedRowKeys,
                  }}
                >
                 
                  <Table.Column title="类型" dataIndex="type" width={50} />
                  <Table.Column title="名称" dataIndex="name" width={200} />
                </Table>
                <div style={styles.pagination}>
                  <Pagination 
                    current={page}
                    pageSize={limit}
                    total={total}
                    onChange={this.changePage}
                    />
                </div>
              </div>

              <div className="table-center-btn">
                  <button onClick={this.onRight.bind(this)}>>></button>
              </div>

              <div className="table-right">
                <Table
                  dataSource={this.state.dataSourceRight}
                  fixedHeader={true}
                  maxBodyHeight={400}
                >
                  <Table.Column title="类型" dataIndex="type" width={50} />
                  <Table.Column title="名称" dataIndex="name" width={300} />
                  <Table.Column
                    title="操作"
                    cell={this.renderOperator}
                    lock="right"
                    width={50}
                  />
                </Table>
              </div>
            </div>
          </IceContainer>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  removeBtn:{
    background: '#fff',
    color: '#1AA8F0 ',
    cursor: 'pointer'
  },
  div: {
    display: 'inline-block',
    width: '100%',
  },
  SpaLeft: {
    marginLeft: '20px',
    display: 'inline-block',
    width: '50px',
    textAlign: 'center',
  },
  SpaRight: {
    display: 'inline-block',
    width: '75%',
    textAlign: 'center',
  },
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  btns: {
    width: '90px',
    height: '30px',
    lineHeight: '30px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    background: '#FC9E25',
    color: '#fff',
    marginLeft: '20px'

  },
  pagination:{
    marginTop:'10px'
  }
};
