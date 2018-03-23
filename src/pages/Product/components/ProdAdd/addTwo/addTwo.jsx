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
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;

const dataSource = (() => {
  const dataSource = [];

  for (let i = 0; i < 10; i++) {
    dataSource.push({
      label: `content${i+1}`,
      value: `${i}`,
      disabled: i % 4 === 0
    });
  }

  return dataSource;
})();

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
      
    };
  }

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <IceContainer>
            <legend className="legend">
              <span className="legLine"></span>按品牌/车厂/车系/车型
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <RadioGroup dataSource={list[0]} defaultValue={"carBrand"} />
                </Col>
              </Row>
              <Row wrap style={styles.formItem}>
                <Col s="4" l="4">
                  <IceFormBinder
                    name="car-brand"
                  >
                    <Input style={{ width: '175px' }} placeholder="请输入查询名称" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col>
                  <button style={styles.btns} type='submit' onClick={this.onSubmit}>
                    查询
                  </button>
                </Col>
              </Row>
              <Row wrap>
                <Transfer  
                defaultValue={["3"]}
                dataSource={dataSource}
                defaultLeftChecked={["1"]}/>
              </Row>
          </div>
            <legend className="legend">
              <span className="legLine"></span>按集团/渠道/厅店
            </legend>
            <div className="f-box">
             <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <RadioGroup dataSource={list[1]} defaultValue={"carGroup"} />
                </Col>
              </Row>
              <Row wrap >
                <Col s="4" l="4" xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <IceFormBinder
                    name="car-group"
                  >
                    <Input style={{ width: '175px' }} placeholder="请输入查询名称" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col>
                  <button style={styles.btns} type='submit' onClick={this.onSubmit}>
                    查询
                  </button>
                </Col>
              </Row>
              <Row wrap>
                <Transfer  
                  defaultValue={["3"]}
                  dataSource={dataSource}
                  defaultLeftChecked={["1"]}/>
              </Row>
            </div>
           
            <legend className="legend">
              <span className="legLine"></span>SP设置
            </legend>
            <div className="f-box">
              <Row wrap style={styles.formItem}>
                <Col s="4" l="4">
                  <IceFormBinder
                    name="SP"
                  >
                    <Input style={{ width: '175px' }} placeholder="请输入查询名称" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col>
                  <button style={styles.btns} type='submit' onClick={this.onSubmit}>
                    查询
                  </button>
                </Col>
              </Row>
              <Row wrap>
                <Transfer  
                  defaultValue={["3"]}
                  dataSource={dataSource}
                  defaultLeftChecked={["1"]}/>
              </Row>
            </div>

             <legend className="legend">
              <span className="legLine"></span>机构设置
            </legend>
            <div className="f-box">
              <Row wrap style={styles.formItem}>
                <Col s="4" l="4">
                  <IceFormBinder
                    name="mechanism"
                  >
                    <Input style={{ width: '175px' }} placeholder="请输入查询名称" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col>
                  <button style={styles.btns} type='submit' onClick={this.onSubmit}>
                    查询
                  </button>
                </Col>
              </Row>
              <Row wrap>
                <Transfer  
                  defaultValue={["3"]}
                  dataSource={dataSource}
                  defaultLeftChecked={["1"]}/>
              </Row>
            </div>
            <div className="next-btn-box">
              <div className="next-btn-lx">提交</div>
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

  filterTitle: {
    width: '140px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  filterTool: {
    width: '200px',
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
  fieldBox: {
    margin: '0 15px',
    padding: '25px 0 0 0',
    borderTop: '1px solid #d8d8d8',
  },
};
