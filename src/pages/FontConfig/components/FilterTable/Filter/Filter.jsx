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
              <label style={styles.filterTitle}>业务类型</label>
              <IceFormBinder>
                <Select
                  name="size"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="small">Small</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="large">Large</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={5} style={styles.filterCol}>
              <label style={styles.filterTitle}>功能模块</label>
              <IceFormBinder>
                <Select name="status" style={styles.filterTool}  placeholder="请选择">
                  <Option value="success">成功</Option>
                  <Option value="failed">失败</Option>
                </Select>
              </IceFormBinder>
            </Col>
            
            <Col xxs={24} xs={12} l={5} style={styles.filterCol}>
              <label style={styles.filterTitle}>流程名称</label>
              <IceFormBinder>
                <Select
                  name="isStick"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="all">不限</Option>
                  <Option value="stick">置顶</Option>
                  <Option value="not-stick">不置顶</Option>
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
                <Button onClick={this.props.toggleCompont} type="normal" className='next-btn-search'>
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
