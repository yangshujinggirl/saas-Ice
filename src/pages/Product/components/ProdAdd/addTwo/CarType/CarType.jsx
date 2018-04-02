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


import './CarType.scss';
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;

export default class CarType extends Component {
  static displayName = 'CarType';
  constructor(props) {
    super(props);
    this.state = {
      value:{},
    };
  }
  componentDidMount(){
    let {actions,addTwoData} = this.props;
    actions.addTwoList()
  }

  CarBrand=(list)=>{
    console.log(list)
    const CarBrand=[]
      list.map((item,i)=>{
        CarBrand.push({
          label: <div style={styles.div}>
                  <span style={styles.SpaLeft}>品牌</span>
                  <span style={styles.SpaRight}>{item.brandName}</span>
                </div>,
          value: `${i}`,
        });
      })
      return CarBrand;
  }
  Car=(list)=>{
    console.log(list)
    const Car=[]
      list.map((item,i)=>{
        Car.push({
          label: <div style={styles.div}>
                  <span style={styles.SpaLeft}>车系</span>
                  <span style={styles.SpaRight}>{item.seriesGroupName}</span>
                </div>,
          value: `${i}`,
        });
      })
      return Car;
  }
  
  carType=(list)=>{
    console.log(list)
    const carType=[]
      list.map((item,i)=>{
        carType.push({
          label: <div style={styles.div}>
                  <span style={styles.SpaLeft}>车型</span>
                  <span style={styles.SpaRight}>{item.modelName}</span>
                </div>,
          value: `${i}`,
        });
      })
      return carType;
  }
  dataSource=(list,val)=>{
    console.log(val)
    if(val =='carBrand'){
      let testList = this.CarBrand(list)
      return testList 
    } else if(val =='Car'){
      let testList = this.Car(list)
      return testList 
    }else if (val == 'carType'){
      let testList = this.carType(list)
      return testList 
    }   
  }
LeftData=(value,data)=>{
  let {CarData} = this.props;
  let test = []
  test =  test.push(data)

  CarData.push(data)
  console.log(test)
}
 //查询
 CarBtn = () =>{
  let {actions, data} = this.props;
  this.formRef.validateAll((error, value) => {
    console.log('error', error, 'value', value);

    if (error) {
      // 处理表单报错
      return;
    }
    // 提交当前填写的数据
    actions.addTwoList(data,value) 
  });
};
  render() {
    let addTwoData = this.props.addTwoData || {}
    let val = this.props.data; 
    let list = addTwoData.data || {}
    list = list.list|| []
    let dataSource = this.dataSource(list,val)

    return (
      <IceFormBinderWrapper
      ref={(formRef) => {
        this.formRef = formRef;
      }}
      value={this.state.value}
      onChange={this.onFormChange}
      >
        <div>
          <IceContainer>
            <Row wrap style={styles.formItem}>
              <Col s="4" l="4" xxs={24} xs={12} l={8} style={styles.filterCol}>
                <IceFormBinder
                  name="carbrand"
                >
                  <Input style={{ width: '175px' }} placeholder="请输入查询名称" />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
              <Col s="4" l="4" xxs={24} xs={12} l={8} style={styles.filterCol}>
                <button style={styles.btns} type='submit' onClick={this.CarBtn}>
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
                  onChange={this.LeftData}
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
