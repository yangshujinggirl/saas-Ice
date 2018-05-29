import React, { Component } from 'react';
import {hashHistory} from 'react-router';

import {
  Form,Input,Button,Checkbox,Select,DatePicker,Switch,Radio,Grid,Field,Dialog,
  Table,Transfer ,Feedback
} from '@icedesign/base';

import IceContainer from '@icedesign/container';
// import CellEditor from './CellEditor';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';


import './addTwo.scss';
import CarType from './CarType' ;
import OrgType from './OrgType'
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;



const list = [
  [{
    value: "1",
    label: "品牌",
  },
  {
    value: "2",
    label: "车系"
  },
  {
    value: "3",
    label: "车型"
  }],
    [{
      value: "carGroup",
      label: "集团",
      disabled: false
    },
    {
      value: "carChannel",
      label: "渠道"
    },
    {
      value: "carStore",
      label: "厅店"
    }
],
];
export default class addTwo extends Component {
  static displayName = 'addTwo';

  constructor(props) {
    super(props);
    this.state = {
      value:{
          productScopes: []
          },
      type: '1',
      name: undefined,
      value2:'carGroup',
      visible: false
    };
  }

  componentDidMount(){
   console.log(this.props)
  }
  onsubmit = () =>  {
    let {actions,params} = this.props;
    let {productScopes} = this.state.value;
    let id = params.id;
    console.log(id)
    if(productScopes.length==0){
      Feedback.toast.show({
        type: 'error',
        content: '请选择品牌／车系／车型',
      });
    }else{
      actions.productsave(this.state.value,id);
    }
  }

  onFormChange=() => {
    this.setState({
      value
    })
  }
  onTypeChange=(value) => {
    this.setState({
      type: value
    });
    this.getCarList(value, this.state.value.name)
  }
  onNestChange=(value) =>{
    this.setState({
      value2: value
    });
    console.log(value)
  }

  getCarList(type, name){
    let {actions} = this.props;
    actions.addTwoList(type,name);
  }

  changeCarName(name){

    let value = this.state.value;
    value.name = name;
    this.setState({value: value});
  }

  render() {
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
            <legend className="pch-legend">
              <span className="pch-legend-legline"></span>按品牌/车系/车型
            </legend>
            <div className="pch-form">
              <Form
                size="large"
                labelAlign="left">
                <Row wrap>
                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                    <RadioGroup 
                      dataSource={list[0]} 
                      defaultValue={'1'}
                      value={this.state.type}                    
                      onChange={this.onTypeChange}
                      />
                  </Col>
                </Row>
                <Row wrap style={{marginBottom:"30px"}} >
                  <IceFormBinder
                      name="CarTypeBrand"
                    >
                      <CarType {...this.props} data={this.state.type} CarData={this.state.value} getCarList={this.getCarList.bind(this)} changeCarName={this.changeCarName.bind(this)}/>
                    </IceFormBinder>
                    <IceFormError name="CarTypeBrand" />
                </Row>
                {/* <legend className="pch-legend">
                <span className="pch-legend-legline"></span>按集团/渠道/厅店
              </legend>
              <div className="pch-condition">
              <Row wrap >
                  <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                    <RadioGroup 
                      dataSource={list[1]}
                      defaultValue={"carGroup"} 
                      value={this.state.value2}                    
                      onChange={this.onNestChange}
                      />
                  </Col>
                </Row>
              
                <Row wrap style={{marginBottom:"30px"}} >
                <OrgType {...this.props} data={this.state.value2}/> 
                </Row>
              </div> */}
            
            
              <div className="next-btn-box">
                <Button type="secondary" size="large" onClick={this.onsubmit}>下一步</Button>
              </div>
              </Form>
            </div>
          </IceContainer>
        </div>
      </IceFormBinderWrapper>
    );
  }


}

const styles = {
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
