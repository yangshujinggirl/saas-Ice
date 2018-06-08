import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker } from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { BaseCondition } from 'base';

const { Row, Col } = Grid;
const { Option } = Select;

export default class Filter extends BaseCondition {
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
              <label style={styles.filterTitle}>业务类型</label>
              <IceFormBinder>
                <Select
                  name="size"
                  placeholder="请选择"
                  defaultValue='贷款业务'
                  style={styles.filterTool}
                >
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={5} style={styles.filterCol}>
              <label style={styles.filterTitle}>功能模块</label>
              <IceFormBinder>
                <Select name="status"
                  style={styles.filterTool}
                  defaultValue='进件'
                  >
                </Select>
              </IceFormBinder>
            </Col>

            <Col xxs={24} xs={12} l={5} style={styles.filterCol}>
              <label style={styles.filterTitle}>流程名称</label>
              <IceFormBinder>
                <Select
                  name="isStick"
                  style={styles.filterTool}
                  defaultValue='全部'
                >
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={5} style={styles.filterCol}>
              <label style={styles.filterTitle}>页面名称</label>
              <IceFormBinder>
                <Input name="commentId" placeholder='请输入'/>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={4} style={styles.filterCol}>
              <div>
                <Button  type="normal" className='next-btn-search'>
                  查询
                </Button>
                <Button
                  onClick={this.props.toggleAddFont}
                  type="primary"
                  style={{ marginLeft: '10px' }}
                >
                  新增
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
