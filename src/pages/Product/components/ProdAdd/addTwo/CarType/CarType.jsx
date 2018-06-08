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

//存储选中的数据
let arrayRightData = {
   chexing: [],
   chexi: [],
   pinpai: []
};//全局
let testarray = []; //右侧即将要渲染的数据

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
               let types = this.props.data;
               let recordArray = [...array];
               if (types == '1') {
                  arrayRightData.pinpai = recordArray
               } else if (types == '2') {
                  arrayRightData.chexi = recordArray
               } else {
                  arrayRightData.cehxing = recordArray
               }

               let { rowSelection } = this.state;
               rowSelection.selectedRowKeys = ids;

               this.setState({
                  recordArray,
                  selectDate: arrayRightData
               })
            }
         }
      }

   }
   componentDidMount() {
      let { actions, addTwoData } = this.props;
      let val = this.props.data;
      this.state.type = val
      actions.addTwoList(val, '')

   }
   componentWillUnmount(){ 
     //组件卸载，数据清空
     testarray =[];
     arrayRightData =[]
   }
   renderDataWithCar = (type, list) => {
      let carType = CARTYPES[type];
      const tempData = []
      list.map((item, i) => {
         tempData.push({
            type: carType.name,
            id: item.id,
            name: item.name
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
   onRight() {
      let CarData = this.props.CarData || {};
      CarData.productScopes = []
      for (var key in arrayRightData) {
         for (var i = 0; i < arrayRightData[key].length; i++) {
            var flag = true;
            for (var j = 0; j < testarray.length; j++) {
               if (arrayRightData[key][i].id == testarray[j].id) {
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
      this.setState({
         dataSourceRight: arra
      })

      //右侧提交数据
      arra.map((item, i) => {
         CarData.productScopes.push({
            relatedId: item.id,
            relatedName: item.type == '品牌' ? item.name : (item.type == '车系' ? item.name : item.name),
            relatedPath: '',
            relatedPathName: '',
            type: 'CARS'
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
      let {CarData={}} = this.props;
      
      data.splice(index, 1);
      
      if(data.lenght==0){
        CarData.productScopes = []
      }
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
      actions.addTwoList(val, name, currentPage)
   };
   render() {
      let addTwoData = this.props.addTwoData || {};
      let type = this.props.data;
      let { list = [], page, limit, total } = addTwoData

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
               <Row wrap style={styles.formItem}>
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
            </div>
         </IceFormBinderWrapper>
      );
   }
}

const styles = {
   removeBtn: {
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
      marginBottom: '24px',
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
   pagination: {
      marginTop: '10px'
   }
};
