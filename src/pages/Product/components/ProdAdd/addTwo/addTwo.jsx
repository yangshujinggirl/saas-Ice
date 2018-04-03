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


import './addTwo.scss';
import CarType from './CarType' ;
import OrgType from './OrgType'
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;



const list = [
  [{
    value: "carBrand",
    label: "品牌",
  },
  {
    value: "Car",
    label: "车系"
  },
  {
    value: "carType",
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
  }],
];
export default class addTwo extends Component {
  static displayName = 'addTwo';

  constructor(props) {
    super(props);
    this.state = {
      value:[],
      value1:'carBrand',
      value2:'carGroup'
    };
  }

  componentDidMount(){
   console.log(this.props)
  }
  changeView = () =>  {
  let {actions} = this.props
    actions.save();
    // this.props.changeView('addThree')
    
  }
  onFormChange=()=>{
    this.setState({
      value
    })
  }
  onTypeChange=(value)=> {
    this.setState({
      value1: value
    });
    console.log(value)
  }
  onNestChange=(value)=>{
    this.setState({
      value2: value
    });
    console.log(value)
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
            <legend className="legend">
              <span className="legLine"></span>按品牌/车厂/车系/车型
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <RadioGroup 
                    dataSource={list[0]} 
                    defaultValue={"carBrand"}
                    value={this.state.value1}                    
                    onChange={this.onTypeChange}
                    />
                </Col>
              </Row>
             
              <Row wrap style={{marginBottom:"30px"}} >
              <IceFormBinder
                    name="CarTypeBrand"
                  >
                     <CarType {...this.props} data={this.state.value1} CarData={this.state.value}/>
                  </IceFormBinder>
                  <IceFormError name="CarTypeBrand" />
               

              </Row>
          </div>
            <legend className="legend">
              <span className="legLine"></span>按集团/渠道/厅店
            </legend>
            <div className="f-box">
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
                {/* <OrgType {...this.props} data={this.state.value2}/> */}
              </Row>
            </div>
           
           
            <div className="next-btn-box">
              <div className="next-btn-lx" onClick={this.changeView}>保存</div>
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
