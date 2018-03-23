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


import './addThree.scss';
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
export default class addThree extends Component {
  static displayName = 'addThree';

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
              <span className="legLine"></span>资金方信息
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>资金方</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">中国</Option>
                      <Option value="option2">美国</Option>
                      
                    </Select>
                  </IceFormBinder>
                </Col>
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
    height: '32px',
    lineHeight: '32px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    background: '#ec9d00',
    color: '#fff',
  },
  fieldBox: {
    margin: '0 15px',
    padding: '25px 0 0 0',
    borderTop: '1px solid #d8d8d8',
  },
};
