/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import {browserHistory, hashHistory} from 'react-router';

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/loans/lists',
    params: {
      page: 1,
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
})
export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.queryCache.pageSize = 10;
    this.fetchData();
  }

  fetchData = () => {
    let {actions} = this.props;
    actions.search(this.queryCache);
    // this.props.updateBindingData('tableData', {
    //   data: this.queryCache,
    // });
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
    console.log(record);
    console.log(this.props)
    // this.props.code(record);
  };
  detal = (record, e)=>{
    e.preventDefault();
    hashHistory.push('/entryQuery/detail/'+record.id);

  }
  //修改和详情按钮
  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <a
          href="#"
          target="_blank"
          onClick={this.editItem.bind(this, record)}
          className='operate-btn operate-btn-two'
        >
          修改
        </a>
        <a
          href="#"
          target="_blank"
          className='operate-btn'
           onClick={this.detal.bind(this, record)}
        >
          详情
        </a>
      </div>
    );
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };
  //改变页码
  changePage = (currentPage) => {
    this.queryCache.page = currentPage;

    this.fetchData();
  };

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTables = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    console.log(this.queryCache)
    this.fetchData(this.queryCache);

  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };

  render() {
    // const tableData = this.props.bindingData.tableData;
    const tableData = this.props.pageData || {};
    const { filterFormValue } = this.state;
    return (
      <div className="filter-table">
        <IceContainer title="查询" className='subtitle'>
          <FilterForm
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTables}
            onReset={this.resetFilter}
          />
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="编号"
              width={85}
              align={'center'}
              dataIndex="code"
            />
            <Table.Column title="姓名" dataIndex="borrowerName" width={85}  align={'center'}/>
            <Table.Column
              title="证件类型"
              dataIndex="borrowerIdType"
              width={85}
              align={'center'}
            />
            <Table.Column
              title="证件号码"
              dataIndex="borrowerIdNo"
              width={85}
              cell={this.renderStatus}
              align={'center'}
            />

            <Table.Column
              title="手机号"
              dataIndex="borrowerMobile"
              width={85}
              cell={this.renderStatus}
              align={'center'}
            />
            <Table.Column
              title="金额"
              dataIndex="principalAmount"
              width={85}
              cell={this.renderStatus}
              align={'center'}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={85}
              cell={this.renderOperations}
              align={'center'}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
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
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
