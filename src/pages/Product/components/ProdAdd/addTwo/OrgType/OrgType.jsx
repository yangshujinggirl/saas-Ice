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


// import './CarType.scss';
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;

const dataSource = (() => {
  const dataSource = [];

  for (let i = 0; i < 10; i++) {
    dataSource.push({
      label:`content${i+1}`,
      value: `${i}`,
    });
  }

  return dataSource;
})();
export default class OrgType extends Component {
  static displayName = 'OrgType';

  componentDidMount(){
    let {actions,addTwoData} = this.props;
    actions.addTwoList()
  }
dataSource=(list)=>{
  const dataSource = [];
    list.map((item,i)=>{
      dataSource.push({
        label: <div style={styles.div}>
                <span style={styles.SpaLeft}>{item.brandIndex}</span>
                <span style={styles.SpaRight}>{item.brandName}</span>
              </div>,
        value: `${i}`,
      });
    })
  
    return dataSource;
}


  render() {
    // let {addTwoData} =this.props
    // let addTwoData = this.props.addTwoData || {}
    // let list = addTwoData.data || {}
    // list = list.list|| []
    // console.log(list)
    // let dataSource = this.dataSource(list)
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <IceContainer>
            <Row wrap style={styles.formItem}>
              <Col s="4" l="4" xxs={24} xs={12} l={8} style={styles.filterCol}>
                <IceFormBinder
                  name="car-group"
                >
                  <Input style={{ width: '175px' }} placeholder="请输入查询名称" />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
              <Col s="4" l="4" xxs={24} xs={12} l={8} style={styles.filterCol}>
                <button style={styles.btns} type='submit' onClick={this.onSubmit}>
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
    // borderBottom:'1px solid #ec9d00'
  },
  SpaLeft:{
    marginLeft:'20px',
    display:'inline-block',
    width:'100px',
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
