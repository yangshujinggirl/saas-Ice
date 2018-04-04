import React, { Component } from 'react';
import {
  Form,Input,Button,Checkbox,Select,DatePicker,Switch,Radio,Grid,Field,
  Table,Transfer ,
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
      value:{},
      type:''
    };
  }
  componentDidMount(){
    console.log(this.props)
    let {actions,addTwoData} = this.props;
    let val = this.props.data; 
    this.state.type = val
      actions.addTwoList()
   
  }

  renderDataWithCar=(type, list)=>{
    let carType = CARTYPES[type];
    const tempData=[]
      list.map((item,i)=>{
        tempData.push({
          label: <div style={styles.div}>
                  <span style={styles.SpaLeft}>{carType.name}</span>
                  <span style={styles.SpaRight}>{item[carType.key]}</span>
                </div>,
          value: `${i}`,
        });
      })
      return tempData;
  }
leftData=(value,data)=>{
  let {CarData} = this.props;
  let val = this.props.data
  data.map((item,i)=>{
    CarData.productScopes.push({
      relatedId: item.value,
      relatedName: val=='1'?'品牌':(val=='2'?'车系':'车型'),
      relatedPath: "SP2",
      relatedPathName: "SP1关联",
      type:'CARS'
    })
  })
  console.log(CarData)
}
 //查询
 searchCar(){
  let {actions, data, getCarList} = this.props;
  let { name } = this.state.value;
  console.log(this.state.value)
  getCarList(data, name);
}
onFormChange(value){
  this.props.changeCarName && this.props.changeCarName(value.name);
  this.setState({
    value
  })
}
  render() {
    let addTwoData = this.props.addTwoData || {}
    let type = this.props.data; 
    let list = addTwoData.data || {}
    list = list.list|| []

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
              <Row wrap style={{marginBottom:"30px"}} >
                <Transfer 
                  titles={['选项',' 选项']}
                  dataSource={dataSource}
                  defaultLeftChecked={["0"]}
                  listStyle={{width:"500px",height:"320px"}}
                  onChange={this.leftData}
                >
                </Transfer>
              </Row>
          </IceContainer>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  div:{
    display:'inline-block',
    width:'100%',
  },
  SpaLeft:{
    marginLeft:'20px',
    display:'inline-block',
    width:'50px',
    textAlign:'center',
  },
  SpaRight:{
    display:'inline-block',
    width:'75%',
    textAlign:'center',
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
    background: '#ec9d00',
    color: '#fff',
    marginLeft:'20px'

  },
};
