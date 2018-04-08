import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker } from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;

export default class Filter extends Component {
  static displayName = 'Filter';

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <Row wrap  style={styles.formItem}>
            <Col xxs="6" s="2" l="2" style={styles.formLabel}>
              姓名：
            </Col>
            <Col s="4" l="4">
              <IceFormBinder>
                <Input name="borrowerName" className="custom-input" placeholder="姓名"/>
              </IceFormBinder>
            </Col>


            <Col xxs="6" s="2" l="2" style={styles.formLabel}>
              身份证号：
            </Col>
            <Col s="4" l="4">
              <IceFormBinder>
                <Input name="borrowerIdNo" className="custom-input" placeholder="身份证号"/>
              </IceFormBinder>
            </Col>

             <Col xxs="6" s="2" l="2" style={styles.formLabel}>
             手机号：
            </Col>
            <Col s="4" l="4">
              <IceFormBinder>
                <Input name="borrowerMobile" className="custom-input" placeholder="手机号"/>
              </IceFormBinder>
            </Col>
          </Row>
          <Row wrap  style={styles.formItem}>
            <Col xxs="6" s="2" l="2" style={styles.formLabel}></Col>
            <Col s="4" l="4"></Col>
            <Col xxs="6" s="2" l="2" style={styles.formLabel}></Col>
            <Col s="4" l="4"></Col>
            <Col xxs="6" s="2" l="2" style={styles.formLabel}></Col>
            <Col  s="4" l="4">
              <div>
                <Button onClick={this.props.onSubmit} type="normal" className='next-btn-search'>
                  查询
                </Button>
              </div>
            </Col>
          </Row>

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
    width: '68px',
    textAlign: 'left',
    marginRight: '12px',
    fontSize: '14px',
    marginLeft:'10px',
  },

  filterTool: {
    width: '200px',
  },
  formItem: {
    height: '33px',
    lineHeight: '33px',
    marginBottom:'28px'
  },
  formLabel: {
    marginLeft: '85px',
    textAlign: 'right',
  },
};
