/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  Table,
  Pagination,
  Field,
  Form,
  Grid,
  Select,
  Button,
  Input
 } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import FontConfigReq from './../../reqs/FontConfigReq.js'
import './FilterTable.scss';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 7 },
};

class  SearchForm extends Component {
  constructor(props) {
    super(props)
    this.field = new Field(this)
  }
  //提交表单
  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      let parmas = this.field.getValues();
      console.log(parmas)
      if (errors) {
        return;
      }
      // this.addLoanApi(parmas)
    });
  }
  render() {
    const { init } = this.field;
    return(
        <IceFormBinderWrapper>
          <Form
            labelAlign="left"
            className="search-form"
            field={this.field}>
            <Row  align="top" justify="space-between">
              <Col span={4} >
                <FormItem {...formItemLayout} label='资方'>
                  <Select
                    name="size"
                    placeholder="请选择"
                    style={styles.filterTool}
                    {...init('zifang',
                      { rules:[{ required: true, message: `资方不能为空` }]}
                    )}
                  >
                  </Select>
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem {...formItemLayout} label='业务类型'>
                  <Select
                    name="size"
                    defaultValue='贷款业务'
                    style={styles.filterTool}
                    {...init('yewu',
                      { rules:[{ required: true, message: `业务类型不能为空` }]}
                    )}
                  >
                  </Select>
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem {...formItemLayout} label='功能模块'>
                  <Select
                    name="size"
                    defaultValue='进件'
                    style={styles.filterTool}
                    {...init('gongneng',
                      { rules:[{ required: true, message: `功能模块不能为空` }]}
                    )}
                  >
                  </Select>
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem {...formItemLayout} label='流程名称'>
                  <Select
                    name="size"
                    defaultValue='全部'
                    style={styles.filterTool}
                    {...init('process',
                      { rules:[{ required: true, message: `流程名称不能为空` }]}
                    )}
                  >
                  </Select>
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem {...formItemLayout} label='页面名称'>
                  <Input
                    placeholder='请输入'
                    {...init('input',
                      { rules:[{ required: true, message: `页面名称不能为空` }]}
                    )}/>
                </FormItem>
              </Col>
              <Col span={4}>
                <div>
                  <Button
                    type="normal"
                    className='next-btn-search'
                    onClick={(e)=>this.handleSubmit(e)}
                    >
                    查询
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: '10px' }}
                  >
                    新增
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </IceFormBinderWrapper>
    )
  }

}


export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filterFormValue: {},
      currentPage:1
    };
  }

  componentWillMount() {
    this.props.actions.search();
  }

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <a href="#" target="_blank" className='operate-btn'>
          详情
        </a>
      </div>
    );
  };

  //分页
  changePage = (currentPage) => {
    this.setState({
      currentPage
    })
    this.props.actions.search({page:currentPage});
  };

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    this.fetchData();
  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };
  toggleAddFont = () => {
    this.props.router.push('/font/add')
  };
  render() {
    const { list, total, limit, page } = this.props.pageData;
    const { filterFormValue } = this.state;
    return (
      <div className="filter-table">
        <IceContainer title="字段配置" className='subtitle' style={styles.marb0}>
          <SearchForm />
          <Table
            dataSource={list}
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column
              title="业务类型"
              dataIndex="name"
              width={320}
            />
            <Table.Column title="功能模块" dataIndex="type" width={85} />
            <Table.Column
              title="页面名称"
              dataIndex="name"
              width={150}
            />
            <Table.Column
              title="流程"
              dataIndex="id"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column
              title="最后修改时间"
              dataIndex="createdAt"
              width={150}
            />
            <Table.Column
              title="操作"
              width={150}
              cell={this.renderOperations}
              lock='right'
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={this.state.currentPage}
              pageSize={limit}
              total={total}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
  marb0: {
    marginBottom: '0',
    borderRadius: '0'
  },
  filterTool: {
    width: '160px',
  }
};
