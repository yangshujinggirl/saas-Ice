import React, { Component } from 'react';
import {
  Form,Input,Button,Checkbox,Select,DatePicker,Switch,Radio,Grid,Field,
  Table,Transfer ,
} from '@icedesign/base';

import IceContainer from '@icedesign/container';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';


import './searchEditer.scss';
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;

const { MonthPicker, YearPicker, RangePicker } = DatePicker;


const getDataSearch = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      id: 100 + i,
      title: {
        name: `宝马 ${3 + i}.0`,
      },
      type: 'demo示例',
      template: '流程',
      status: '已发布',
      publisher: '小马',
      rate: '5',
      time: 2000 + i,
    });
  }
  return result;
};
export default class searchEditer extends Component {
  static displayName = 'searchEditer';

  constructor(props) {
    super(props);
    this.state = {
      dataSource:getDataSearch(),
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
              <span className="legLine"></span>产品编辑
            </legend>
            <div className="f-box">
              <Row wrap style={styles.formItem}>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>产品名称：</label>
                  <IceFormBinder
                    name="productName"
                  >
                    <Input placeholder="产品名称" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>生效日期：</label>
                  <RangePicker style={{width:"220px"}} />
                </Col>
              </Row>
             
              <Row wrap style={styles.formItem} >
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>清单类型：</label>
                  <IceFormBinder
                    name="productCode"
                  >
                    <Select
                    name="size"
                    placeholder="请选择"
                    style={styles.filterTool}
                  >
                    <Option value="option1">产品进件</Option>
                  </Select>
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}>清单名称：</label>
                  <IceFormBinder
                    name="listtName"
                  >
                    <Input placeholder="清单名称" style={{width:"220px"}}
                     />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row wrap style={styles.formItem} >
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}></label>
                  <Button>返回</Button>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                 <label style={styles.filterTitle}></label>
                 <Button>确定</Button>
                </Col>
              </Row>
              <Row wrap >
                <Table
                  dataSource={this.state.dataSource}
                  isLoading={this.state.isLoading}
                >
                  <Table.Column title="版本" dataIndex="id" width={120} />
                  <Table.Column title="生效日期" dataIndex="title.name" width={250} />
                  <Table.Column title="状态" dataIndex="type" width={160} />
                  <Table.Column title="流程" dataIndex="template" width={100} />
                  <Table.Column title="时间" dataIndex="status" width={120} />
                  <Table.Column title="操作人" dataIndex="rate" width={120} />
              </Table>
              </Row>
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
