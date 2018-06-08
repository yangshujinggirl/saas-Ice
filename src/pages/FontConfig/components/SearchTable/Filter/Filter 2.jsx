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
          <Row wrap>
          <Col xxs={24} xs={12} l={5} style={styles.filterCol}>
              <label style={styles.filterTitle}>姓名</label>
              <IceFormBinder>
                <Input name="name" placeholder='请输入'/>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={5} style={styles.filterCol}>
              <label style={styles.filterTitle}>证件号码</label>
              <IceFormBinder>
                <Input name="commentId" placeholder='请输入'/>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={5} style={styles.filterCol}>
              <label style={styles.filterTitle}>手机号</label>
              <IceFormBinder>
                <Input name="phone" placeholder='请输入'/>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={4} style={styles.filterCol}>
              <div>
                <Button onClick={this.props.onReset} type="normal" className='next-btn-search'>
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
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  }
};
